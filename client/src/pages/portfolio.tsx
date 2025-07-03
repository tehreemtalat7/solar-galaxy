import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Calendar,
  Zap,
  Home,
  Building,
  Users,
  TrendingUp,
  Eye,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Link } from "wouter";
import type { Project } from "@shared/schema";

export default function Portfolio() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  // Sample featured projects if database is empty
  const featuredProjects = [
    {
      id: 1,
      title: "Luxury Residential Estate",
      description: "50kW rooftop solar system for a modern estate in Austin, featuring premium panels and smart monitoring.",
      location: "Austin, TX",
      systemSize: "50kW",
      energyGenerated: "75,000 kWh/year",
      type: "Residential",
      completionDate: "2024-01-15",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Green Tech Office Complex",
      description: "200kW commercial solar installation with battery storage for a sustainable office building.",
      location: "Dallas, TX",
      systemSize: "200kW",
      energyGenerated: "300,000 kWh/year",
      type: "Commercial",
      completionDate: "2023-12-10",
      image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Sustainable Warehouse",
      description: "500kW industrial solar array providing clean energy for logistics operations.",
      location: "Houston, TX",
      systemSize: "500kW",
      energyGenerated: "750,000 kWh/year",
      type: "Industrial",
      completionDate: "2023-11-22",
      image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Family Home Solar",
      description: "15kW residential system with net metering, reducing energy bills by 95%.",
      location: "San Antonio, TX",
      systemSize: "15kW",
      energyGenerated: "22,500 kWh/year",
      type: "Residential",
      completionDate: "2024-02-08",
      image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const displayProjects = projects && projects.length > 0 ? projects : featuredProjects;

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'residential': return 'bg-solar-orange text-white';
      case 'commercial': return 'bg-solar-green text-white';
      case 'industrial': return 'bg-blue-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'residential': return <Home className="h-4 w-4" />;
      case 'commercial': return <Building className="h-4 w-4" />;
      case 'industrial': return <Zap className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-neutral-dark via-neutral-dark/90 to-neutral-dark text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-solar-orange/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 right-32 w-60 h-60 bg-solar-green/10 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in">
              <h1 className="text-6xl md:text-7xl font-bold mb-8">
                Our <span className="text-gradient">Portfolio</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12">
                Discover our successful solar installations across residential, commercial, 
                and industrial projects. Real results for real customers.
              </p>
              
              <div className="grid grid-cols-3 gap-8 mt-16">
                <div className="text-center">
                  <div className="text-4xl font-bold text-solar-orange mb-2">2,500+</div>
                  <div className="text-gray-300">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-solar-green mb-2">50MW+</div>
                  <div className="text-gray-300">Total Capacity</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-solar-orange mb-2">98%</div>
                  <div className="text-gray-300">Customer Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl font-bold text-neutral-dark mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Showcasing our most impactful solar installations across different sectors
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12">
              {displayProjects.map((project, index) => (
                <Card key={project.id} className="hover-lift border-0 shadow-2xl overflow-hidden animate-slide-up" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="relative h-80">
                    <img 
                      src={(project as any).image || (project as any).imageUrl || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Type Badge */}
                    <Badge className={`absolute top-4 left-4 ${getTypeColor((project as any).type || (project as any).projectType || 'residential')} flex items-center gap-2`}>
                      {getTypeIcon((project as any).type || (project as any).projectType || 'residential')}
                      {(project as any).type || (project as any).projectType || 'Residential'}
                    </Badge>
                    
                    {/* Quick Stats Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="glass p-4 rounded-2xl">
                        <div className="grid grid-cols-2 gap-4 text-white">
                          <div>
                            <div className="text-2xl font-bold text-solar-orange">{project.systemSize}</div>
                            <div className="text-sm opacity-90">System Size</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-solar-green">{(project as any).energyGenerated || '25,000 kWh/year'}</div>
                            <div className="text-sm opacity-90">Annual Generation</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-neutral-dark mb-4">{project.title}</h3>
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">{project.description}</p>
                    
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 text-solar-orange mr-3" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-5 w-5 text-solar-green mr-3" />
                        <span>Completed {new Date((project as any).completionDate || (project as any).completedAt || new Date()).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full btn-modern hover-glow">
                      <Eye className="h-4 w-4 mr-2" />
                      View Project Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Types */}
      <section className="section-padding bg-gradient-to-br from-neutral-light to-white">
        <div className="container-custom">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl font-bold text-neutral-dark mb-6">
              Project Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We deliver solar solutions across all sectors
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                type: "Residential",
                icon: <Home className="h-16 w-16" />,
                description: "Custom solar solutions for homeowners looking to reduce energy costs and increase property value",
                projects: "1,800+ Projects",
                color: "text-solar-orange",
                bgColor: "bg-orange-50"
              },
              {
                type: "Commercial", 
                icon: <Building className="h-16 w-16" />,
                description: "Scalable solar systems for businesses aiming to reduce operational costs and carbon footprint",
                projects: "600+ Projects",
                color: "text-solar-green",
                bgColor: "bg-green-50"
              },
              {
                type: "Industrial",
                icon: <Zap className="h-16 w-16" />,
                description: "Large-scale solar installations for manufacturing and industrial facilities",
                projects: "100+ Projects", 
                color: "text-blue-600",
                bgColor: "bg-blue-50"
              }
            ].map((category, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg animate-slide-up text-center" style={{animationDelay: `${index * 0.2}s`}}>
                <CardContent className="p-10">
                  <div className={`${category.bgColor} ${category.color} w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 hover-glow`}>
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-dark mb-4">{category.type}</h3>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">{category.description}</p>
                  <Badge className={`${category.color.replace('text-', 'bg-')} text-white text-sm px-4 py-2`}>
                    {category.projects}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section-padding bg-neutral-dark text-white">
        <div className="container-custom">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl font-bold mb-6">
              Our Environmental Impact
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Making a measurable difference for our planet through clean energy
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                number: "125,000", 
                unit: "tons", 
                label: "CO₂ Reduced",
                icon: <TrendingUp className="h-8 w-8" />,
                description: "Equivalent to planting 150,000 trees"
              },
              { 
                number: "50", 
                unit: "MW", 
                label: "Total Capacity",
                icon: <Zap className="h-8 w-8" />,
                description: "Powering 8,000+ homes annually"
              },
              { 
                number: "$15M", 
                unit: "", 
                label: "Customer Savings",
                icon: <CheckCircle className="h-8 w-8" />,
                description: "Total energy cost savings to date"
              },
              { 
                number: "2,500", 
                unit: "+", 
                label: "Happy Customers",
                icon: <Users className="h-8 w-8" />,
                description: "98% customer satisfaction rate"
              }
            ].map((stat, index) => (
              <div key={index} className="text-center animate-scale-in hover-lift" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="glass p-8 rounded-3xl bg-white/5">
                  <div className="text-solar-orange mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.number}
                    <span className="text-2xl text-solar-green">{stat.unit}</span>
                  </div>
                  <div className="text-gray-300 font-semibold mb-2">{stat.label}</div>
                  <div className="text-sm text-gray-400">{stat.description}</div>
                </div>
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
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Let us design a custom solar solution for your property and start saving on energy costs
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                className="bg-white text-solar-orange hover:bg-gray-100 text-lg px-12 py-6 hover-lift"
                asChild
              >
                <Link href="/quote">Get Your Quote</Link>
              </Button>
              
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-12 py-6 hover-lift"
                asChild
              >
                <Link href="/contact">Schedule Site Visit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}