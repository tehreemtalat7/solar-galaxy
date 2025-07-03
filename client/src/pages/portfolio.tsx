import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import type { Project } from "@shared/schema";

export default function Portfolio() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-solar-orange mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-solar-green to-solar-green-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Solar Projects
            </h1>
            <p className="text-xl text-white">
              Explore our portfolio of successful solar installations across residential and commercial properties.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-solar-orange mb-2">
                {projects?.length || 0}
              </div>
              <div className="text-gray-600">Completed Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-solar-green mb-2">
                {projects?.reduce((acc, p) => acc + parseFloat(p.systemSize.replace(/[^\d.]/g, '') || '0'), 0).toFixed(1)}kW
              </div>
              <div className="text-gray-600">Total Capacity</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-solar-orange mb-2">
                {projects?.filter(p => p.projectType === 'residential').length || 0}
              </div>
              <div className="text-gray-600">Residential</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-solar-green mb-2">
                {projects?.filter(p => p.projectType === 'commercial').length || 0}
              </div>
              <div className="text-gray-600">Commercial</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          {projects && projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                    <img 
                      src={project.imageUrl || "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <Badge 
                        variant={project.projectType === 'residential' ? 'default' : 'secondary'}
                        className={project.projectType === 'residential' ? 'bg-solar-orange' : 'bg-solar-green'}
                      >
                        {project.projectType}
                      </Badge>
                      <Badge variant="outline" className="text-solar-green">
                        {project.systemSize}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-neutral-dark mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {project.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      {project.location && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {project.location}
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        Completed: {format(new Date(project.completedAt), 'MMMM yyyy')}
                      </div>
                    </div>
                    
                    <Button 
                      variant="link" 
                      className="text-solar-orange hover:text-solar-orange-light p-0"
                    >
                      View Details <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Calendar className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Projects Available
              </h3>
              <p className="text-gray-500">
                Our portfolio is currently being updated. Check back soon for our latest projects.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Project Types Filter */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">
              Project Types
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We handle solar installations of all sizes, from residential rooftops to large commercial facilities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-solar-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">R</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">Residential</h3>
                <p className="text-gray-600 mb-4">
                  Home solar installations from small rooftop systems to large ground-mount arrays.
                </p>
                <div className="text-2xl font-bold text-solar-orange">
                  {projects?.filter(p => p.projectType === 'residential').length || 0} Projects
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-solar-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">Commercial</h3>
                <p className="text-gray-600 mb-4">
                  Business and industrial solar installations with custom energy management solutions.
                </p>
                <div className="text-2xl font-bold text-solar-green">
                  {projects?.filter(p => p.projectType === 'commercial').length || 0} Projects
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-solar-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">I</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">Industrial</h3>
                <p className="text-gray-600 mb-4">
                  Large-scale industrial solar installations for manufacturing and distribution facilities.
                </p>
                <div className="text-2xl font-bold text-solar-orange">
                  {projects?.filter(p => p.projectType === 'industrial').length || 0} Projects
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-solar-orange to-solar-orange-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl text-white mb-8">
              Let us help you create your own solar success story with a custom installation designed for your needs.
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
