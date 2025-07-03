import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Building, 
  Bolt, 
  Battery, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Calculator,
  Shield
} from "lucide-react";
import { Link } from "wouter";

export default function Services() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-solar-green to-solar-green-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Solar Services
            </h1>
            <p className="text-xl text-white">
              Comprehensive solar energy solutions from consultation to installation and ongoing maintenance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="text-solar-orange text-4xl mb-4">
                  <Home className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-4">Residential Solar</h3>
                <p className="text-gray-600 mb-6">
                  Complete solar solutions for homes, including rooftop installations, ground-mount systems, and battery storage options.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-solar-green mr-2" />
                    Rooftop installations
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-solar-green mr-2" />
                    Ground-mount systems
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-solar-green mr-2" />
                    Battery storage options
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-solar-green mr-2" />
                    Net metering setup
                  </li>
                </ul>
                <Button className="bg-solar-orange hover:bg-solar-orange-light text-white w-full">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="text-solar-green text-4xl mb-4">
                  <Building className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-4">Commercial Solar</h3>
                <p className="text-gray-600 mb-6">
                  Large-scale solar installations for businesses, warehouses, and industrial facilities with customized energy solutions.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-solar-green mr-2" />
                    Large-scale installations
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-solar-green mr-2" />
                    Custom energy solutions
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-solar-green mr-2" />
                    Commercial financing
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-solar-green mr-2" />
                    Energy management systems
                  </li>
                </ul>
                <Button className="bg-solar-green hover:bg-solar-green-light text-white w-full">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="text-solar-orange text-4xl mb-4">
                  <Bolt className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-4">Maintenance & Repair</h3>
                <p className="text-gray-600 mb-6">
                  Professional maintenance services to ensure your solar system operates at peak efficiency for years to come.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-solar-green mr-2" />
                    Regular inspections
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-solar-green mr-2" />
                    Panel cleaning
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-solar-green mr-2" />
                    System monitoring
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-solar-green mr-2" />
                    Emergency repairs
                  </li>
                </ul>
                <Button className="bg-solar-orange hover:bg-solar-orange-light text-white w-full">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">Additional Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We offer a complete range of solar-related services to meet all your energy needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-solar-green mb-4">
                  <Battery className="h-10 w-10 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-dark mb-2">Battery Storage</h3>
                <p className="text-gray-600 text-sm">
                  Store excess energy for use during peak hours or power outages.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-solar-orange mb-4">
                  <Zap className="h-10 w-10 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-dark mb-2">Smart Inverters</h3>
                <p className="text-gray-600 text-sm">
                  Advanced inverters with monitoring and grid-tie capabilities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-solar-green mb-4">
                  <Calculator className="h-10 w-10 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-dark mb-2">Energy Audits</h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive analysis of your energy usage and solar potential.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-solar-orange mb-4">
                  <Shield className="h-10 w-10 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-dark mb-2">Warranty Support</h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive warranty coverage and ongoing support services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Net Metering Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <Badge className="mb-4 bg-solar-green text-white">Net Metering</Badge>
                    <h3 className="text-2xl font-bold text-neutral-dark mb-4">Maximize Your Solar Investment</h3>
                    <p className="text-gray-600 mb-6">
                      With net metering, you can sell excess solar energy back to the grid, reducing your electricity bills and maximizing your solar investment.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CheckCircle className="text-solar-green mr-3 h-5 w-5" />
                        <span>Reduce monthly electricity costs</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="text-solar-green mr-3 h-5 w-5" />
                        <span>Earn credits for excess energy production</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="text-solar-green mr-3 h-5 w-5" />
                        <span>Contribute to grid stability</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img 
                      src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                      alt="Solar panels connected to electrical grid" 
                      className="rounded-lg shadow-lg w-full h-auto"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From initial consultation to final installation, we make going solar simple and stress-free.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-solar-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-neutral-dark mb-2">Consultation</h3>
              <p className="text-gray-600 text-sm">
                We assess your energy needs and evaluate your property's solar potential.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-solar-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-neutral-dark mb-2">Design</h3>
              <p className="text-gray-600 text-sm">
                Our engineers create a custom solar system design optimized for your property.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-solar-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-neutral-dark mb-2">Installation</h3>
              <p className="text-gray-600 text-sm">
                Our certified technicians professionally install your solar system.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-solar-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-semibold text-neutral-dark mb-2">Activation</h3>
              <p className="text-gray-600 text-sm">
                We handle all inspections and utility connections to get your system running.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-solar-orange to-solar-orange-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white mb-8">
              Let us help you harness the power of the sun and start saving on your energy bills today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="bg-white text-solar-orange hover:bg-gray-100" asChild>
                <Link href="/quote">Get Free Quote</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-solar-orange hover:bg-gray-100" asChild>
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
