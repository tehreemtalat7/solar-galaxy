import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Phone, Mail, MapPin } from "lucide-react";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";

const contactFormSchema = insertContactSubmissionSchema.extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const submitContactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      await apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = contactFormSchema.parse(formData);
      submitContactMutation.mutate(validatedData);
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

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-solar-green to-solar-green-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
              Get in Touch
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white">
              Ready to start your solar journey? Contact us for a free consultation and quote.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-dark mb-6 md:mb-8">Contact Information</h2>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center">
                  <div className="bg-solar-orange text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base text-neutral-dark">Phone</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-600">0333 4214007</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-solar-green text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base text-neutral-dark">Email</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-600 break-all">solargalaxy.co@gmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-solar-orange text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base text-neutral-dark">Address</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-600">17-H Block, Commercial Area DHA Phase, Lahore</div>
                  </div>
                </div>
              </div>
              
              {/* Google Maps Integration */}
              <div className="mt-6 md:mt-8">
                <h3 className="text-base sm:text-lg font-semibold text-neutral-dark mb-3 md:mb-4">Find Us</h3>
                <div className="bg-gray-200 rounded-lg h-48 sm:h-56 md:h-64 flex items-center justify-center">
                  <div className="text-center px-4">
                    <MapPin className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 md:mb-4" />
                    <p className="text-sm sm:text-base text-gray-600">Interactive Google Map</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">17-H Block, Commercial Area DHA Phase, Lahore</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="mt-8 md:mt-0">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-dark mb-6 md:mb-8">Send us a Message</h2>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input 
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input 
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone"
                        type="tel"
                        value={formData.phone || ""}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="0333 1234567"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea 
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us about your solar needs..."
                        rows={4}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-solar-orange hover:bg-solar-orange-light text-white"
                      disabled={submitContactMutation.isPending}
                    >
                      {submitContactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-12 md:py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-dark mb-6 md:mb-8">Business Hours</h2>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-8">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-dark mb-3 sm:mb-4">Office Hours</h3>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span className="font-medium">10:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span className="font-medium">12:00 PM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-dark mb-3 sm:mb-4">Emergency Service</h3>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span>24/7 Support:</span>
                      <span className="font-medium">Available</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Emergency Line:</span>
                      <span className="font-medium">0333 4214007</span>
                    </div>
                    <div className="text-gray-600 text-xs mt-2">
                      For urgent system issues only
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
