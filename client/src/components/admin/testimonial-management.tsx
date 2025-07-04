import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Plus, Edit, Trash2, Star, MessageSquare } from "lucide-react";
import type { Testimonial, InsertTestimonial } from "@shared/schema";

export default function TestimonialManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<InsertTestimonial>({
    name: "",
    location: "",
    content: "",
    rating: 5,
    isActive: true,
  });

  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/admin/testimonials'],
    retry: false,
  });

  const createTestimonialMutation = useMutation({
    mutationFn: async (data: InsertTestimonial) => {
      await apiRequest('POST', '/api/admin/testimonials', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
      toast({
        title: "Success",
        description: "Testimonial created successfully.",
      });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to create testimonial.",
        variant: "destructive",
      });
    },
  });

  const updateTestimonialMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertTestimonial> }) => {
      await apiRequest('PUT', `/api/admin/testimonials/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
      toast({
        title: "Success",
        description: "Testimonial updated successfully.",
      });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update testimonial.",
        variant: "destructive",
      });
    },
  });

  const deleteTestimonialMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/admin/testimonials/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
      toast({
        title: "Success",
        description: "Testimonial deleted successfully.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete testimonial.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      content: "",
      rating: 5,
      isActive: true,
    });
    setEditingTestimonial(null);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      location: testimonial.location || "",
      content: testimonial.content,
      rating: testimonial.rating,
      isActive: testimonial.isActive ?? true,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTestimonial) {
      updateTestimonialMutation.mutate({
        id: editingTestimonial.id,
        data: formData,
      });
    } else {
      createTestimonialMutation.mutate(formData);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      deleteTestimonialMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-solar-orange mx-auto"></div>
        <p className="text-gray-600 mt-2">Loading testimonials...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-neutral-dark">Testimonial Management</h3>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-solar-green hover:bg-solar-green-light text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Customer Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Lahore, Pakistan"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="content">Testimonial Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  rows={4}
                  required
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Select 
                    value={formData.rating.toString()} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, rating: parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="isActive">Status</Label>
                  <Select 
                    value={formData.isActive ? "true" : "false"} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, isActive: value === "true" }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-solar-green hover:bg-solar-green-light text-white"
                  disabled={createTestimonialMutation.isPending || updateTestimonialMutation.isPending}
                >
                  {editingTestimonial ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {testimonials && testimonials.length > 0 ? (
        <div className="grid gap-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="flex text-solar-orange mr-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        testimonial.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {testimonial.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <h4 className="font-semibold text-neutral-dark">{testimonial.name}</h4>
                    {testimonial.location && (
                      <p className="text-sm text-gray-500 mb-2">{testimonial.location}</p>
                    )}
                    <p className="text-gray-600 text-sm">"{testimonial.content}"</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(testimonial)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(testimonial.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No Testimonials Yet
            </h3>
            <p className="text-gray-500">
              Start adding customer testimonials to showcase your work.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
