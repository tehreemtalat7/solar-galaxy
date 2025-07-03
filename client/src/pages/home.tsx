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
  Star
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-solar-green to-solar-green-light py-20">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" 
             style={{backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"}}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Power Your Future with <span className="text-solar-orange">Solar Energy</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Professional solar panel installation and distribution services. Join thousands of satisfied customers who've made the switch to clean, renewable energy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-solar-orange hover:bg-solar-orange-light text-white"
                onClick={handleGetQuoteClick}
                asChild
              >
                <Link href="/quote">
                  <Calculator className="mr-2 h-5 w-5" />
                  Get Free Quote
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white text-solar-green hover:bg-gray-100"
                onClick={handleViewProjectsClick}
                asChild
              >
                <Link href="/portfolio">
                  <Eye className="mr-2 h-5 w-5" />
                  View Projects
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">Our Solar Solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From consultation to installation, we provide comprehensive solar energy solutions for residential and commercial properties.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="text-solar-orange text-4xl mb-4">
                  <HomeIcon className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-4">Residential Solar</h3>
                <p className="text-gray-600 mb-6">
                  Complete solar solutions for homes, including rooftop installations, ground-mount systems, and battery storage options.
                </p>
                <Button variant="link" className="text-solar-orange hover:text-solar-orange-light p-0">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
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
                <Button variant="link" className="text-solar-green hover:text-solar-green-light p-0">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
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
                <Button variant="link" className="text-solar-orange hover:text-solar-orange-light p-0">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Net Metering Section */}
          <Card className="mt-16">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-dark mb-4">Net Metering Benefits</h3>
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
      </section>

      {/* Recent Projects Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">Recent Projects</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our latest solar installations across residential and commercial properties.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {projects?.slice(0, 3).map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                  <img 
                    src={project.imageUrl || "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-neutral-dark mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-solar-green">
                      {project.systemSize}
                    </Badge>
                    <Button variant="link" className="text-solar-orange hover:text-solar-orange-light p-0">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="bg-solar-green hover:bg-solar-green-light text-white">
              <Link href="/portfolio">
                View All Projects
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Read testimonials from satisfied customers who've made the switch to solar energy.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials?.slice(0, 3).map((testimonial) => (
              <Card key={testimonial.id}>
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="flex text-solar-orange">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                    <div>
                      <div className="font-semibold text-neutral-dark">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
