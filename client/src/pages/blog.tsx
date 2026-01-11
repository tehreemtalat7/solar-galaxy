import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-solar-orange mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-solar-green to-solar-green-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Solar Energy Blog
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white">
              Stay informed about solar energy trends, government incentives, and maintenance tips from our experts.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                    <img 
                      src={post.imageUrl || "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <Badge 
                        variant="secondary"
                        className={
                          post.category === 'Solar Technology' 
                            ? 'bg-solar-orange text-white' 
                            : post.category === 'Government Incentives'
                            ? 'bg-solar-green text-white'
                            : 'bg-blue-100 text-blue-800'
                        }
                      >
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.createdAt ? format(new Date(post.createdAt), 'MMM dd, yyyy') : 'Recent'}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-neutral-dark mb-3">
                      {post.title}
                    </h3>
                    
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 text-sm">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <Button 
                      variant="link" 
                      className="text-solar-orange hover:text-solar-orange-light p-0"
                    >
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <BookOpen className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Blog Posts Available
              </h3>
              <p className="text-gray-500">
                Our blog is currently being updated. Check back soon for the latest solar energy insights and tips.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">
              Blog Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore articles covering various aspects of solar energy and renewable power solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-solar-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">Solar Technology</h3>
                <p className="text-gray-600 mb-4">
                  Latest advancements in solar panel technology, efficiency improvements, and innovations.
                </p>
                <div className="text-2xl font-bold text-solar-orange">
                  {posts?.filter(p => p.category === 'Solar Technology').length || 0} Articles
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-solar-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">Government Incentives</h3>
                <p className="text-gray-600 mb-4">
                  Updates on federal and state incentives, tax credits, and rebates for solar installations.
                </p>
                <div className="text-2xl font-bold text-solar-green">
                  {posts?.filter(p => p.category === 'Government Incentives').length || 0} Articles
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">Maintenance Tips</h3>
                <p className="text-gray-600 mb-4">
                  Essential maintenance guides to keep your solar system running at peak performance.
                </p>
                <div className="text-2xl font-bold text-blue-600">
                  {posts?.filter(p => p.category === 'Maintenance Tips').length || 0} Articles
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-solar-orange to-solar-orange-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-white mb-8">
              Subscribe to our newsletter for the latest solar energy news, tips, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <Button size="lg" variant="outline" className="bg-white text-solar-orange hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
