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
    systemSize: undefined,
    estimatedCost: undefined,
    monthlySavings: undefined,
    paybackPeriod: undefined,
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
        systemSize: undefined,
        estimatedCost: undefined,
        monthlySavings: undefined,
        paybackPeriod: undefined,
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
      case '50-100':
        systemSize = 4.5;
        estimatedCost = 11250;
        monthlySavings = 75;
        break;
      case '100-150':
        systemSize = 6.5;
        estimatedCost = 16250;
        monthlySavings = 110;
        break;
      case '150-200':
        systemSize = 8.5;
        estimatedCost = 21250;
        monthlySavings = 145;
        break;
      case '200-300':
        systemSize = 12;
        estimatedCost = 30000;
        monthlySavings = 200;
        break;
      case '300+':
        systemSize = 15;
        estimatedCost = 37500;
        monthlySavings = 275;
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
      systemSize: systemSize,
      estimatedCost: estimatedCost,
      monthlySavings: monthlySavings,
      paybackPeriod: paybackPeriod,
    }));
    setShowResults(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = quoteFormSchema.parse(formData);
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
      <section className="py-20 bg-gradient-to-r from-solar-orange to-solar-orange-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get Your Free Solar Quote
            </h1>
            <p className="text-xl text-white">
              Calculate your potential savings and get a personalized solar proposal in minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Calculator */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-neutral-dark">
                  <Calculator className="mr-3 h-8 w-8 text-solar-orange" />
                  Solar Quote Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-4">
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

                  <div className="grid md:grid-cols-2 gap-4">
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
                        <SelectItem value="50-100">$50 - $100</SelectItem>
                        <SelectItem value="100-150">$100 - $150</SelectItem>
                        <SelectItem value="150-200">$150 - $200</SelectItem>
                        <SelectItem value="200-300">$200 - $300</SelectItem>
                        <SelectItem value="300+">$300+</SelectItem>
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
                        <SelectItem value="asphalt">Asphalt Shingle</SelectItem>
                        <SelectItem value="metal">Metal</SelectItem>
                        <SelectItem value="tile">Tile</SelectItem>
                        <SelectItem value="flat">Flat</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quote Results */}
                  {showResults && quoteResults && (
                    <Card className="bg-solar-green bg-opacity-10 border-solar-green">
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold text-neutral-dark mb-4">
                          Estimated Solar System Quote
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-600">Recommended System Size</div>
                            <div className="text-2xl font-bold text-solar-green">
                              {quoteResults.systemSize} kW
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Estimated Cost</div>
                            <div className="text-2xl font-bold text-solar-orange">
                              ${quoteResults.estimatedCost.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Monthly Savings</div>
                            <div className="text-2xl font-bold text-solar-green">
                              ${quoteResults.monthlySavings}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Payback Period</div>
                            <div className="text-2xl font-bold text-solar-orange">
                              {quoteResults.paybackPeriod} years
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 p-4 bg-white rounded-lg">
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
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">
              Why Choose Solar?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the benefits of switching to clean, renewable solar energy.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-solar-green mb-4">
                  <Home className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-dark mb-2">Increase Home Value</h3>
                <p className="text-gray-600 text-sm">
                  Solar installations can increase your home's value by up to 15%.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-solar-orange mb-4">
                  <Zap className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-dark mb-2">Lower Energy Bills</h3>
                <p className="text-gray-600 text-sm">
                  Reduce or eliminate your monthly electricity bills.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-solar-green mb-4">
                  <Battery className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-dark mb-2">Energy Independence</h3>
                <p className="text-gray-600 text-sm">
                  Generate your own clean energy and reduce grid dependence.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-solar-orange mb-4">
                  <Shield className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-dark mb-2">Environmental Impact</h3>
                <p className="text-gray-600 text-sm">
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
