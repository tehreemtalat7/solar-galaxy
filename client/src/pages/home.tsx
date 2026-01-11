import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
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
  Award,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Link } from "wouter";
import { trackEvent } from "@/lib/analytics";
import type { Testimonial, Project } from "@shared/schema";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  const { data: projects } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const handleGetQuoteClick = () => {
    trackEvent('get_quote_click', 'engagement', 'hero_section');
  };

  const handleViewProjectsClick = () => {
    trackEvent('view_projects_click', 'engagement', 'hero_section');
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Modern Hero Section */}
      <section className="relative min-h-screen py-12 md:py-20 flex items-center justify-center hero-parallax">
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 leading-tight px-4">
                Power Your Future
                <br />
                <span className="text-gradient bg-gradient-to-r from-solar-orange to-solar-green bg-clip-text text-transparent">
                  with Solar
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl mb-8 md:mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed px-4">
                Experience the future of energy with Solar Galaxy's cutting-edge solar solutions. 
                Join thousands who've made the switch to clean, renewable power.
              </p>
            </div>

            <div className="flex justify-center animate-slide-up px-4">
              <Button 
                onClick={handleGetQuoteClick}
                className="btn-modern text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 hover-glow w-full sm:w-auto"
                asChild
              >
                <Link href="/quote">Get Free Quote</Link>
              </Button>
            </div>

            {/* Stats Counter */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 md:mt-16 px-4">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-solar-orange mb-2">2,500+</div>
                <div className="text-sm sm:text-base text-gray-300">Installations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-solar-green mb-2">15+</div>
                <div className="text-sm sm:text-base text-gray-300">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-solar-orange mb-2">98%</div>
                <div className="text-sm sm:text-base text-gray-300">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-20 animate-fade-in px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-dark mb-4 md:mb-6">
              Why Choose <span className="text-solar-orange font-bold">Solar Galaxy</span>?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're Lahore's leading solar installer with over 15 years of experience delivering 
              advanced solar technology, professional installation, and unmatched customer service 
              that has earned us a 98% customer satisfaction rate.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
            {[
              {
                icon: <Zap className="h-10 w-10 sm:h-12 sm:w-12" />,
                title: "Advanced Technology",
                description: "Latest solar panel technology with maximum efficiency and durability",
                color: "text-solar-orange"
              },
              {
                icon: <Shield className="h-10 w-10 sm:h-12 sm:w-12" />,
                title: "25-Year Warranty",
                description: "Comprehensive warranty coverage for complete peace of mind",
                color: "text-solar-green"
              },
              {
                icon: <TrendingUp className="h-10 w-10 sm:h-12 sm:w-12" />,
                title: "Maximize Savings",
                description: "Reduce your energy bills by up to 90% with our efficient systems",
                color: "text-solar-orange"
              }
            ].map((feature, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg animate-slide-up" style={{animationDelay: `${index * 0.2}s`}}>
                <CardContent className="p-6 md:p-8 text-center">
                  <div className={`${feature.color} mb-4 md:mb-6 flex justify-center`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-dark mb-3 md:mb-4">{feature.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gradient-to-br from-neutral-light to-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="animate-fade-in px-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-dark mb-6 md:mb-8">
                Complete Solar Solutions
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 md:mb-12">
                From residential rooftops to commercial installations, we provide end-to-end solar solutions tailored to your needs.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                {[
                  { icon: <HomeIcon className="h-8 w-8" />, title: "Residential", desc: "Perfect for homes" },
                  { icon: <Building className="h-8 w-8" />, title: "Commercial", desc: "Scalable business solutions" },
                  { icon: <Bolt className="h-8 w-8" />, title: "Battery Storage", desc: "Store excess energy" },
                  { icon: <Calculator className="h-8 w-8" />, title: "Free Quotes", desc: "No obligation estimates" }
                ].map((service, index) => (
                  <div key={index} className="flex items-start space-x-3 md:space-x-4 hover-lift">
                    <div className="text-solar-orange bg-orange-50 p-2 md:p-3 rounded-2xl flex-shrink-0">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-neutral-dark mb-1">{service.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-scale-in mt-8 lg:mt-0 px-4">
              <div className="glass p-4 md:p-8 rounded-3xl">
                <img 
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Solar Installation"
                  className="w-full h-60 md:h-80 object-cover rounded-2xl"
                />
              </div>
              
              {/* Floating stats - hidden on mobile */}
              <div className="hidden md:block absolute -top-8 -right-8 glass p-4 md:p-6 rounded-2xl animate-float">
                <div className="text-2xl md:text-3xl font-bold text-solar-orange mb-2">$0</div>
                <div className="text-xs md:text-sm text-gray-600">Down Payment</div>
              </div>
              
              <div className="hidden md:block absolute -bottom-8 -left-8 glass p-4 md:p-6 rounded-2xl animate-float" style={{animationDelay: '2s'}}>
                <div className="text-2xl md:text-3xl font-bold text-solar-green mb-2">90%</div>
                <div className="text-xs md:text-sm text-gray-600">Avg. Savings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials && testimonials.length > 0 && (
        <section className="section-padding bg-neutral-dark text-white">
          <div className="container-custom">
            <div className="text-center mb-12 md:mb-20 animate-fade-in px-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
                What Our Customers Say
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                Join thousands of satisfied customers who've made the switch to solar
              </p>
            </div>

            <div className="relative">
              {/* Left Arrow - hidden on mobile */}
              <Button
                onClick={scrollLeft}
                className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white border-0 rounded-full w-10 h-10 md:w-12 md:h-12 backdrop-blur-sm shadow-lg items-center justify-center"
                size="icon"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </Button>

              {/* Right Arrow - hidden on mobile */}
              <Button
                onClick={scrollRight}
                className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white border-0 rounded-full w-10 h-10 md:w-12 md:h-12 backdrop-blur-sm shadow-lg items-center justify-center"
                size="icon"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </Button>

              {/* Scrollable Container */}
              <div 
                ref={scrollRef}
                className="overflow-x-auto scrollbar-none mx-0 sm:mx-12 px-4 sm:px-0"
              >
                <div className="flex gap-8 min-w-max">
                  {testimonials.map((testimonial, index) => (
                    <Card key={testimonial.id} className="bg-white/5 border-white/10 hover-lift animate-slide-up flex-shrink-0 w-80" style={{animationDelay: `${index * 0.2}s`}}>
                      <CardContent className="p-8">
                        <div className="flex items-center mb-6">
                          {[...Array(testimonial.rating || 5)].map((_, i) => (
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
            </div>
          </div>
        </section>
      )}

      {/* Premium Technology Partner Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-20 animate-fade-in px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-dark mb-4 md:mb-6">
              Powered by <span className="text-solar-orange font-bold">SolarMax</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              We're proud to be an authorized distributor of SolarMax's premium solar panels, inverters, and energy storage solutions. Since 2007, SolarMax has been Pakistan's leading renewable energy brand, delivering maximum efficiency and reliability for homes and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center mb-12 md:mb-20">
            <div className="animate-fade-in px-4">
              <div className="glass p-4 md:p-8 rounded-3xl">
                <img 
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="SolarMax Solar Panels Installation"
                  className="w-full h-60 md:h-80 object-cover rounded-2xl"
                />
              </div>
            </div>

            <div className="animate-slide-up px-4">
              <div className="mb-6 md:mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-dark mb-3 md:mb-4">Why SolarMax?</h3>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 md:mb-6">
                  As Pakistan's premier renewable energy company with 16+ years of experience, SolarMax combines proven technology with exceptional service, making them our trusted partner for complete solar solutions.
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                {[
                  {
                    title: "100% Performance Guarantee",
                    description: "Highly efficient panels delivering maximum solar production year-round",
                    icon: <Zap className="h-6 w-6" />
                  },
                  {
                    title: "Complete Solar Solutions",
                    description: "One-stop solution for panels, inverters, batteries, and installation",
                    icon: <Shield className="h-6 w-6" />
                  },
                  {
                    title: "Proven Track Record",
                    description: "3,000+ satisfied customers across 6 countries since 2007",
                    icon: <TrendingUp className="h-6 w-6" />
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 md:space-x-4">
                    <div className="text-solar-orange bg-orange-50 p-2 md:p-3 rounded-xl flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-neutral-dark mb-1 md:mb-2">{feature.title}</h4>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technology Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 text-center px-4">
            {[
              { stat: "16+", label: "Years Experience" },
              { stat: "3,000+", label: "Happy Customers" },
              { stat: "100%", label: "Performance Rated" }
            ].map((item, index) => (
              <div key={index} className="animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="glass p-4 md:p-6 rounded-2xl hover-lift">
                  <div className="text-2xl sm:text-3xl font-bold text-solar-orange mb-1 md:mb-2">{item.stat}</div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-600">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-20 animate-fade-in px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-dark mb-4 md:mb-6">
              Featured Projects
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              See how we've transformed homes and businesses across Pakistan with cutting-edge solar solutions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 px-4 max-w-4xl mx-auto">
            {[
              {
                title: "Luxury Lahore Estate",
                type: "Residential",
                size: "50kW",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                savings: "95% reduction"
              },
              {
                title: "Lahore Business Plaza",
                type: "Commercial", 
                size: "200kW",
                image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                savings: "PKR 1.5M/month"
              }
            ].map((project, index) => (
              <Card key={index} className="hover-lift border-0 shadow-xl overflow-hidden animate-slide-up" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="relative h-40 sm:h-48">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <Badge className="absolute top-3 left-3 md:top-4 md:left-4 bg-solar-orange text-white text-xs md:text-sm">
                    {project.type}
                  </Badge>
                  <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 text-white">
                    <div className="text-xl sm:text-2xl font-bold text-solar-green">{project.size}</div>
                    <div className="text-xs md:text-sm opacity-90">System Size</div>
                  </div>
                </div>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-dark mb-2">{project.title}</h3>
                  <div className="flex items-center justify-between text-sm md:text-base">
                    <span className="text-gray-600">Energy Savings:</span>
                    <span className="font-semibold text-solar-orange">{project.savings}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-solar-orange to-solar-green text-white">
        <div className="container-custom text-center px-4">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8">
              Ready to Go Solar?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-8 md:mb-12 opacity-90">
              Get your free solar quote today and start saving on your energy bills immediately
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button 
                onClick={handleGetQuoteClick}
                className="bg-white text-solar-orange hover:bg-gray-100 text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 hover-lift w-full sm:w-auto"
                asChild
              >
                <Link href="/quote">Get Free Quote</Link>
              </Button>
              
              <Button 
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white hover:text-solar-orange text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 hover-lift w-full sm:w-auto"
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