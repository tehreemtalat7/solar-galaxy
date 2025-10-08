import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { trackEvent } from "@/lib/analytics";
import { Calculator, CheckCircle, Home, Zap, Battery, Shield } from "lucide-react";
import { insertQuoteSchema } from "@shared/schema";
import { z } from "zod";

const quoteFormSchema = insertQuoteSchema.extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  propertyType: z.string().min(1, "Property type is required"),
  monthlyBill: z.string().min(1, "Monthly bill range is required"),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

interface QuoteResults {
  systemSize: number;
  estimatedCost: number;
  monthlySavings: number;
  paybackPeriod: number;
}

export default function Quote() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<QuoteFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyType: "",
    monthlyBill: "",
    homeSize: undefined,
    roofType: "",
    systemSize: "",
    estimatedCost: "",
    monthlySavings: "",
    paybackPeriod: "",
  });
  
  const [quoteResults, setQuoteResults] = useState<QuoteResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const submitQuoteMutation = useMutation({
    mutationFn: async (data: QuoteFormData) => {
      await apiRequest('POST', '/api/quotes', data);
    },
    onSuccess: () => {
      trackEvent('quote_submitted', 'conversion', 'quote_form');
      toast({
        title: "Quote Request Submitted!",
        description: "We'll contact you within 24 hours with a detailed proposal.",
      });
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        propertyType: "",
        monthlyBill: "",
        homeSize: undefined,
        roofType: "",
        systemSize: "",
        estimatedCost: "",
        monthlySavings: "",
        paybackPeriod: "",
      });
      setShowResults(false);
      setQuoteResults(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const calculateQuote = () => {
    if (!formData.monthlyBill || !formData.homeSize) {
      toast({
        title: "Missing Information",
        description: "Please fill in monthly bill and home size to calculate quote.",
        variant: "destructive",
      });
      return;
    }

    trackEvent('quote_calculated', 'engagement', 'quote_calculator');

    // Simple calculation logic based on monthly bill range
    let systemSize = 0;
    let estimatedCost = 0;
    let monthlySavings = 0;

    switch(formData.monthlyBill) {
      case '15000-25000':
        systemSize = 4.5;
        estimatedCost = 3200000; // PKR 3.2M
        monthlySavings = 20000; // PKR 20,000
        break;
      case '25000-40000':
        systemSize = 6.5;
        estimatedCost = 4600000; // PKR 4.6M
        monthlySavings = 30000; // PKR 30,000
        break;
      case '40000-60000':
        systemSize = 8.5;
        estimatedCost = 6000000; // PKR 6M
        monthlySavings = 40000; // PKR 40,000
        break;
      case '60000-85000':
        systemSize = 12;
        estimatedCost = 8500000; // PKR 8.5M
        monthlySavings = 55000; // PKR 55,000
        break;
      case '85000+':
        systemSize = 15;
        estimatedCost = 10600000; // PKR 10.6M
        monthlySavings = 75000; // PKR 75,000
        break;
    }

    const paybackPeriod = parseFloat((estimatedCost / (monthlySavings * 12)).toFixed(1));

    const results = {
      systemSize,
      estimatedCost,
      monthlySavings,
      paybackPeriod,
    };

    setQuoteResults(results);
    setFormData(prev => ({
      ...prev,
      systemSize: systemSize.toString(),
      estimatedCost: estimatedCost.toString(),
      monthlySavings: monthlySavings.toString(),
      paybackPeriod: paybackPeriod.toString(),
    }));
    setShowResults(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Remove empty calculated fields before submission
      const submitData = { ...formData };
      if (!submitData.systemSize) delete submitData.systemSize;
      if (!submitData.estimatedCost) delete submitData.estimatedCost;
      if (!submitData.monthlySavings) delete submitData.monthlySavings;
      if (!submitData.paybackPeriod) delete submitData.paybackPeriod;
      
      const validatedData = quoteFormSchema.parse(submitData);
      submitQuoteMutation.mutate(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive",
        });
      }
    }
  };

  const handleInputChange = (field: keyof QuoteFormData, value: string | number | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-solar-orange to-solar-orange-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
              Get Your Free Solar Quote
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white">
              Calculate your potential savings and get a personalized solar proposal in minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Calculator */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center text-lg sm:text-xl md:text-2xl text-neutral-dark">
                  <Calculator className="mr-2 sm:mr-3 h-6 w-6 sm:h-8 sm:w-8 text-solar-orange flex-shrink-0" />
                  Solar Quote Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Personal Information */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input 
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input 
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Property Information */}
                  <div>
                    <Label htmlFor="propertyType">Property Type *</Label>
                    <Select value={formData.propertyType} onValueChange={(value) => handleInputChange("propertyType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Property Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="monthlyBill">Average Monthly Electric Bill *</Label>
                    <Select value={formData.monthlyBill} onValueChange={(value) => handleInputChange("monthlyBill", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Bill Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15000-25000">PKR 15,000 - 25,000</SelectItem>
                        <SelectItem value="25000-40000">PKR 25,000 - 40,000</SelectItem>
                        <SelectItem value="40000-60000">PKR 40,000 - 60,000</SelectItem>
                        <SelectItem value="60000-85000">PKR 60,000 - 85,000</SelectItem>
                        <SelectItem value="85000+">PKR 85,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="homeSize">Home Size (Square Feet)</Label>
                    <Input 
                      id="homeSize"
                      type="number"
                      value={formData.homeSize || ""}
                      onChange={(e) => handleInputChange("homeSize", e.target.value ? parseInt(e.target.value) : undefined)}
                      placeholder="e.g., 2000"
                    />
                  </div>

                  <div>
                    <Label htmlFor="roofType">Roof Type</Label>
                    <Select value={formData.roofType || ""} onValueChange={(value) => handleInputChange("roofType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Roof Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flat-concrete">Flat Concrete (RCC)</SelectItem>
                        <SelectItem value="sloped-concrete">Sloped Concrete</SelectItem>
                        <SelectItem value="clay-tile">Clay Tile</SelectItem>
                        <SelectItem value="metal-sheet">Metal Sheet (Galvanized)</SelectItem>
                        <SelectItem value="asbestos">Asbestos Sheet</SelectItem>
                        <SelectItem value="tin-sheet">Tin Sheet</SelectItem>
                        <SelectItem value="concrete-tile">Concrete Tile</SelectItem>
                        <SelectItem value="brick-terrace">Brick Terrace</SelectItem>
                        <SelectItem value="shed-roof">Shed Roof (Industrial)</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quote Results */}
                  {showResults && quoteResults && (
                    <Card className="bg-solar-green bg-opacity-10 border-solar-green">
                      <CardContent className="p-4 sm:p-6">
                        <h4 className="text-base sm:text-lg font-semibold text-neutral-dark mb-3 sm:mb-4">
                          Estimated Solar System Quote
                        </h4>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <div className="text-xs sm:text-sm text-gray-600">Recommended System Size</div>
                            <div className="text-lg sm:text-xl md:text-2xl font-bold text-solar-green">
                              {quoteResults.systemSize} kW
                            </div>
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm text-gray-600">Estimated Cost</div>
                            <div className="text-lg sm:text-xl md:text-2xl font-bold text-solar-orange">
                              ${quoteResults.estimatedCost.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm text-gray-600">Monthly Savings</div>
                            <div className="text-lg sm:text-xl md:text-2xl font-bold text-solar-green">
                              ${quoteResults.monthlySavings}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm text-gray-600">Payback Period</div>
                            <div className="text-lg sm:text-xl md:text-2xl font-bold text-solar-orange">
                              {quoteResults.paybackPeriod} years
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-white rounded-lg">
                          <p className="text-sm text-gray-600 mb-2">This estimate includes:</p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-solar-green mr-2" />
                              High-efficiency solar panels
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-solar-green mr-2" />
                              Smart inverter system
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-solar-green mr-2" />
                              Professional installation
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-solar-green mr-2" />
                              25-year warranty
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-solar-green mr-2" />
                              Net metering setup
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      type="button" 
                      onClick={calculateQuote}
                      className="flex-1 bg-solar-orange hover:bg-solar-orange-light text-white"
                    >
                      Calculate Quote
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 bg-solar-green hover:bg-solar-green-light text-white"
                      disabled={submitQuoteMutation.isPending}
                    >
                      {submitQuoteMutation.isPending ? "Submitting..." : "Submit Quote Request"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-dark mb-3 md:mb-4">
              Why Choose Solar?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the benefits of switching to clean, renewable solar energy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="text-solar-green mb-3 sm:mb-4">
                  <Home className="h-10 w-10 sm:h-12 sm:w-12 mx-auto" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-neutral-dark mb-2">Increase Home Value</h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Solar installations can increase your home's value by up to 15%.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="text-solar-orange mb-3 sm:mb-4">
                  <Zap className="h-10 w-10 sm:h-12 sm:w-12 mx-auto" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-neutral-dark mb-2">Lower Energy Bills</h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Reduce or eliminate your monthly electricity bills.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="text-solar-green mb-3 sm:mb-4">
                  <Battery className="h-10 w-10 sm:h-12 sm:w-12 mx-auto" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-neutral-dark mb-2">Energy Independence</h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Generate your own clean energy and reduce grid dependence.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="text-solar-orange mb-3 sm:mb-4">
                  <Shield className="h-10 w-10 sm:h-12 sm:w-12 mx-auto" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-neutral-dark mb-2">Environmental Impact</h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Reduce your carbon footprint and help protect the environment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
