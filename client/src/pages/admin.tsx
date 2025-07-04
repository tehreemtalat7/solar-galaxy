import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, MessageSquare, FileText, Mail, Users, TrendingUp } from "lucide-react";
import TestimonialManagement from "@/components/admin/testimonial-management";
import QuoteManagement from "@/components/admin/quote-management";
import BlogManagement from "@/components/admin/blog-management";

export default function Admin() {
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You need to log in to access the admin panel.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-solar-orange mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-neutral-light pt-20">
      {/* Header */}
      <section className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-dark">Admin Panel</h1>
              <p className="text-gray-600">Manage your solar business operations</p>
            </div>
            <a 
              href="/api/logout"
              className="bg-solar-orange text-white px-4 py-2 rounded-lg hover:bg-solar-orange-light transition-colors"
            >
              Logout
            </a>
          </div>
        </div>
      </section>

      {/* Dashboard Stats */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Total Quotes</div>
                    <div className="text-2xl font-bold text-solar-orange">--</div>
                  </div>
                  <Calculator className="h-8 w-8 text-solar-orange" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Active Projects</div>
                    <div className="text-2xl font-bold text-solar-green">--</div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-solar-green" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Blog Posts</div>
                    <div className="text-2xl font-bold text-blue-600">--</div>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Testimonials</div>
                    <div className="text-2xl font-bold text-green-600">--</div>
                  </div>
                  <MessageSquare className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Management Tabs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-6 w-6" />
                Business Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="quotes" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="quotes">Quotes</TabsTrigger>
                  <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                  <TabsTrigger value="blog">Blog Posts</TabsTrigger>
                  <TabsTrigger value="contacts">Contacts</TabsTrigger>
                </TabsList>
                
                <TabsContent value="quotes" className="mt-6">
                  <QuoteManagement />
                </TabsContent>
                
                <TabsContent value="testimonials" className="mt-6">
                  <TestimonialManagement />
                </TabsContent>
                
                <TabsContent value="blog" className="mt-6">
                  <BlogManagement />
                </TabsContent>
                
                <TabsContent value="contacts" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center py-12">
                        <Mail className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">
                          Contact Management
                        </h3>
                        <p className="text-gray-500">
                          Contact submission management coming soon.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
