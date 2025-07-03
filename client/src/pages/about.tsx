import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Award, Users, Calendar, Shield } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-solar-green to-solar-green-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About SolarTech Solutions
            </h1>
            <p className="text-xl text-white">
              Leading the renewable energy revolution with professional solar installation and distribution services for over 15 years.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-6">
                Powering a Sustainable Future
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                With over 15 years of experience in renewable energy, we're committed to making solar energy accessible and affordable for everyone. Our team of certified professionals ensures every installation meets the highest standards of quality and safety.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We've helped thousands of homeowners and businesses transition to clean, renewable energy, reducing their carbon footprint while saving money on energy costs.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-solar-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span className="text-lg">Over 2,000 successful installations</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-solar-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span className="text-lg">NABCEP certified installers</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-solar-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span className="text-lg">25-year warranty on all installations</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-solar-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span className="text-lg">Licensed and insured</span>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Professional solar technicians installing panels" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <Card>
              <CardContent className="p-8">
                <div className="text-solar-orange mb-4">
                  <Users className="h-12 w-12 mx-auto" />
                </div>
                <div className="text-3xl font-bold text-neutral-dark mb-2">2,000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8">
                <div className="text-solar-green mb-4">
                  <Calendar className="h-12 w-12 mx-auto" />
                </div>
                <div className="text-3xl font-bold text-neutral-dark mb-2">15+</div>
                <div className="text-gray-600">Years Experience</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8">
                <div className="text-solar-orange mb-4">
                  <Award className="h-12 w-12 mx-auto" />
                </div>
                <div className="text-3xl font-bold text-neutral-dark mb-2">50+</div>
                <div className="text-gray-600">Awards Won</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8">
                <div className="text-solar-green mb-4">
                  <Shield className="h-12 w-12 mx-auto" />
                </div>
                <div className="text-3xl font-bold text-neutral-dark mb-2">25</div>
                <div className="text-gray-600">Year Warranty</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-8">Our Mission</h2>
            <p className="text-xl text-gray-600 mb-8">
              To accelerate the world's transition to sustainable energy by making solar power accessible, affordable, and reliable for everyone.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-solar-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">Customer First</h3>
                <p className="text-gray-600">We prioritize customer satisfaction and provide exceptional service throughout the entire process.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-solar-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">Quality Excellence</h3>
                <p className="text-gray-600">We use only the highest quality equipment and maintain the strictest installation standards.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-solar-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">Reliable Service</h3>
                <p className="text-gray-600">Our comprehensive warranties and ongoing support ensure your solar investment is protected.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-solar-orange to-solar-orange-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Go Solar?
            </h2>
            <p className="text-xl text-white mb-8">
              Join thousands of satisfied customers who've made the switch to clean, renewable energy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="bg-white text-solar-orange hover:bg-gray-100" asChild>
                <Link href="/quote">Get Free Quote</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-solar-orange hover:bg-gray-100" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
