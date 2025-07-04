import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home as HomeIcon, 
  Building, 
  Battery, 
  Settings,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Sun,
  Clock,
  Award,
  Calculator,
  Users
} from "lucide-react";
import { Link } from "wouter";

export default function Services() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-neutral-dark via-neutral-dark/90 to-neutral-dark text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-32 left-32 w-40 h-40 bg-solar-orange/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 right-20 w-60 h-60 bg-solar-green/10 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in">
              <h1 className="text-6xl md:text-7xl font-bold mb-8">
                Solar <span className="bg-gradient-to-r from-solar-orange to-solar-green bg-clip-text text-transparent font-extrabold">Services</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12">
                Comprehensive solar solutions for every need. From residential rooftops to 
                large commercial installations, we deliver excellence at every scale.
              </p>
              
              <Button 
                className="btn-modern text-lg px-12 py-6 hover-glow"
                asChild
              >
                <Link href="/quote">Get Free Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl font-bold text-neutral-dark mb-6">
              Complete Solar Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert installation, premium equipment, and ongoing support for all your solar energy needs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Residential Solar */}
            <Card className="hover-lift border-0 shadow-2xl overflow-hidden animate-slide-up">
              <div className="relative h-64">
                <img 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Residential Solar Installation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <Badge className="absolute top-4 left-4 bg-solar-orange text-white">Most Popular</Badge>
              </div>
              <CardContent className="p-10">
                <div className="flex items-center mb-6">
                  <div className="bg-solar-orange text-white rounded-2xl w-16 h-16 flex items-center justify-center mr-6">
                    <HomeIcon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-neutral-dark">Residential Solar</h3>
                    <p className="text-solar-orange font-semibold">For Homeowners</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Transform your home into a clean energy powerhouse. Our residential solar systems 
                  are designed to maximize savings while enhancing your property value.
                </p>
                
                <div className="space-y-4 mb-8">
                  {[
                    "Custom roof design & engineering",
                    "High-efficiency solar panels",
                    "25-year performance warranty",
                    "Net metering setup",
                    "Smart monitoring system"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-solar-orange mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="btn-modern flex-1" asChild>
                    <Link href="/quote">Get Quote</Link>
                  </Button>
                  <Button variant="outline" className="flex-1 hover-lift">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Commercial Solar */}
            <Card className="hover-lift border-0 shadow-2xl overflow-hidden animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="relative h-64">
                <img 
                  src="https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Commercial Solar Installation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <Badge className="absolute top-4 left-4 bg-solar-green text-white">Enterprise</Badge>
              </div>
              <CardContent className="p-10">
                <div className="flex items-center mb-6">
                  <div className="bg-solar-green text-white rounded-2xl w-16 h-16 flex items-center justify-center mr-6">
                    <Building className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-neutral-dark">Commercial Solar</h3>
                    <p className="text-solar-green font-semibold">For Businesses</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Reduce operational costs and demonstrate environmental leadership. Our commercial 
                  solutions scale from small businesses to large industrial facilities.
                </p>
                
                <div className="space-y-4 mb-8">
                  {[
                    "Comprehensive energy assessment",
                    "Scalable system design",
                    "Tax incentive optimization",
                    "Power purchase agreements",
                    "24/7 performance monitoring"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-solar-green mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="btn-modern flex-1" asChild>
                    <Link href="/quote">Get Quote</Link>
                  </Button>
                  <Button variant="outline" className="flex-1 hover-lift">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-gradient-to-br from-neutral-light to-white">
        <div className="container-custom">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl font-bold text-neutral-dark mb-6">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions to maximize your solar investment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Battery className="h-12 w-12" />,
                title: "Battery Storage",
                description: "Store excess energy for use during peak hours or power outages",
                color: "text-solar-orange"
              },
              {
                icon: <Settings className="h-12 w-12" />,
                title: "Maintenance",
                description: "Professional cleaning, inspection, and performance optimization",
                color: "text-solar-green"
              },
              {
                icon: <Calculator className="h-12 w-12" />,
                title: "Financing",
                description: "Flexible payment options including $0 down solar loans",
                color: "text-solar-orange"
              },
              {
                icon: <Award className="h-12 w-12" />,
                title: "Warranty",
                description: "Comprehensive 25-year warranty on equipment and workmanship",
                color: "text-solar-green"
              }
            ].map((service, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg animate-slide-up text-center" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-8">
                  <div className={`${service.color} mb-6 flex justify-center`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-dark mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl font-bold text-neutral-dark mb-6">
              Our Installation Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From initial consultation to system activation, we make going solar simple
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "Free energy assessment and custom system design",
                icon: <Users className="h-8 w-8" />
              },
              {
                step: "02", 
                title: "Permitting",
                description: "We handle all permits and utility interconnection",
                icon: <CheckCircle className="h-8 w-8" />
              },
              {
                step: "03",
                title: "Installation",
                description: "Professional installation by certified technicians",
                icon: <Settings className="h-8 w-8" />
              },
              {
                step: "04",
                title: "Activation",
                description: "System testing, monitoring setup, and activation",
                icon: <Zap className="h-8 w-8" />
              }
            ].map((step, index) => (
              <div key={index} className="text-center animate-slide-up" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="relative mb-8">
                  <div className="glass w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 hover-lift">
                    <div className="text-solar-orange">
                      {step.icon}
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-solar-orange to-solar-green rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-neutral-dark mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-solar-orange to-solar-green text-white">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-5xl font-bold mb-8">
              Ready to Start Your Solar Journey?
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Get a free, no-obligation assessment and see how much you can save with solar
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                className="bg-white text-solar-orange hover:bg-gray-100 text-lg px-12 py-6 hover-lift"
                asChild
              >
                <Link href="/quote">Get Free Quote</Link>
              </Button>
              
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-12 py-6 hover-lift"
                asChild
              >
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}