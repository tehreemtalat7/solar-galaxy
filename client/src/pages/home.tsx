import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home as HomeIcon, 
  Building, 
  Bolt, 
  Calculator, 
  Eye,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Shield,
  TrendingUp,
  Sun,
  Users,
  Award
} from "lucide-react";
import { Link } from "wouter";
import { trackEvent } from "@/lib/analytics";
import type { Testimonial, Project } from "@shared/schema";

export default function Home() {
  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  const { data: projects } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const handleGetQuoteClick = () => {
    trackEvent('get_quote_click', 'engagement', 'hero_section');
  };

  const handleViewProjectsClick = () => {
    trackEvent('view_projects_click', 'engagement', 'hero_section');
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Modern Hero Section */}
      <section className="relative h-screen flex items-center justify-center hero-parallax">
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent"></div>
        
        {/* Floating particles animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-4 h-4 bg-white/20 rounded-full animate-float"></div>
          <div className="absolute top-40 right-32 w-6 h-6 bg-solar-orange/30 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 left-40 w-3 h-3 bg-solar-green/40 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-6xl mx-auto text-center text-white">
            <div className="animate-fade-in">
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                Power Your Future
                <br />
                <span className="text-gradient bg-gradient-to-r from-solar-orange to-solar-green bg-clip-text text-transparent">
                  with Solar
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Experience the future of energy with Solar Galaxy's cutting-edge solar solutions. 
                Join thousands who've made the switch to clean, renewable power.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up">
              <Button 
                onClick={handleGetQuoteClick}
                className="btn-modern text-lg px-12 py-6 hover-glow"
                asChild
              >
                <Link href="/quote">Get Free Quote</Link>
              </Button>
              
              <Button 
                onClick={handleViewProjectsClick}
                variant="outline"
                className="glass text-white border-white/30 hover:bg-white/10 text-lg px-12 py-6 hover-lift"
                asChild
              >
                <Link href="/portfolio">View Projects</Link>
              </Button>
            </div>

            {/* Stats Counter */}
            <div className="grid grid-cols-3 gap-8 mt-16 animate-scale-in">
              <div className="text-center">
                <div className="text-4xl font-bold text-solar-orange mb-2">2,500+</div>
                <div className="text-gray-300">Installations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-solar-green mb-2">15+</div>
                <div className="text-gray-300">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-solar-orange mb-2">98%</div>
                <div className="text-gray-300">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl font-bold text-neutral-dark mb-6">
              Why Choose <span className="text-gradient">Solar Galaxy</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced technology, professional installation, and unmatched customer service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Zap className="h-12 w-12" />,
                title: "Advanced Technology",
                description: "Latest solar panel technology with maximum efficiency and durability",
                color: "text-solar-orange"
              },
              {
                icon: <Shield className="h-12 w-12" />,
                title: "25-Year Warranty",
                description: "Comprehensive warranty coverage for complete peace of mind",
                color: "text-solar-green"
              },
              {
                icon: <TrendingUp className="h-12 w-12" />,
                title: "Maximize Savings",
                description: "Reduce your energy bills by up to 90% with our efficient systems",
                color: "text-solar-orange"
              }
            ].map((feature, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg animate-slide-up" style={{animationDelay: `${index * 0.2}s`}}>
                <CardContent className="p-8 text-center">
                  <div className={`${feature.color} mb-6 flex justify-center`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-dark mb-4">{feature.title}</h3>
                  <p className="text-gray-600 text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gradient-to-br from-neutral-light to-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="text-5xl font-bold text-neutral-dark mb-8">
                Complete Solar Solutions
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                From residential rooftops to commercial installations, we provide end-to-end solar solutions tailored to your needs.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                {[
                  { icon: <HomeIcon className="h-8 w-8" />, title: "Residential", desc: "Perfect for homes" },
                  { icon: <Building className="h-8 w-8" />, title: "Commercial", desc: "Scalable business solutions" },
                  { icon: <Bolt className="h-8 w-8" />, title: "Battery Storage", desc: "Store excess energy" },
                  { icon: <Calculator className="h-8 w-8" />, title: "Free Quotes", desc: "No obligation estimates" }
                ].map((service, index) => (
                  <div key={index} className="flex items-start space-x-4 hover-lift">
                    <div className="text-solar-orange bg-orange-50 p-3 rounded-2xl">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-dark mb-1">{service.title}</h4>
                      <p className="text-gray-600">{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="glass p-8 rounded-3xl">
                <img 
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Solar Installation"
                  className="w-full h-80 object-cover rounded-2xl"
                />
              </div>
              
              {/* Floating stats */}
              <div className="absolute -top-8 -right-8 glass p-6 rounded-2xl animate-float">
                <div className="text-3xl font-bold text-solar-orange mb-2">$0</div>
                <div className="text-sm text-gray-600">Down Payment</div>
              </div>
              
              <div className="absolute -bottom-8 -left-8 glass p-6 rounded-2xl animate-float" style={{animationDelay: '2s'}}>
                <div className="text-3xl font-bold text-solar-green mb-2">90%</div>
                <div className="text-sm text-gray-600">Avg. Savings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials && testimonials.length > 0 && (
        <section className="section-padding bg-neutral-dark text-white">
          <div className="container-custom">
            <div className="text-center mb-20 animate-fade-in">
              <h2 className="text-5xl font-bold mb-6">
                What Our Customers Say
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Join thousands of satisfied customers who've made the switch to solar
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <Card key={testimonial.id} className="bg-white/5 border-white/10 hover-lift animate-slide-up" style={{animationDelay: `${index * 0.2}s`}}>
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-solar-orange to-solar-green rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-gray-400">{testimonial.location}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-solar-orange to-solar-green text-white">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-5xl font-bold mb-8">
              Ready to Go Solar?
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Get your free solar quote today and start saving on your energy bills immediately
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                onClick={handleGetQuoteClick}
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
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}