import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Calendar, DollarSign, Home, Zap, Calculator } from "lucide-react";
import { format } from "date-fns";
import type { Quote } from "@shared/schema";

export default function QuoteManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: quotes, isLoading } = useQuery<Quote[]>({
    queryKey: ['/api/admin/quotes'],
    retry: false,
  });

  const updateQuoteStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      await apiRequest('PUT', `/api/admin/quotes/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/quotes'] });
      toast({
        title: "Success",
        description: "Quote status updated successfully.",
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
        description: "Failed to update quote status.",
        variant: "destructive",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (quoteId: number, newStatus: string) => {
    updateQuoteStatusMutation.mutate({ id: quoteId, status: newStatus });
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-solar-orange mx-auto"></div>
        <p className="text-gray-600 mt-2">Loading quotes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-neutral-dark">Quote Management</h3>
        <div className="text-sm text-gray-600">
          Total Quotes: {quotes?.length || 0}
        </div>
      </div>

      {quotes && quotes.length > 0 ? (
        <div className="grid gap-4">
          {quotes.map((quote) => (
            <Card key={quote.id}>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Customer Info */}
                  <div>
                    <h4 className="font-semibold text-neutral-dark mb-2">
                      {quote.firstName} {quote.lastName}
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>📧 {quote.email}</div>
                      <div>📞 {quote.phone}</div>
                      <div className="flex items-center">
                        <Home className="h-4 w-4 mr-1" />
                        {quote.propertyType}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {format(new Date(quote.createdAt), 'MMM dd, yyyy')}
                      </div>
                    </div>
                  </div>

                  {/* Quote Details */}
                  <div>
                    <h5 className="font-medium text-neutral-dark mb-2">Quote Details</h5>
                    <div className="space-y-1 text-sm">
                      <div>Monthly Bill: {quote.monthlyBill}</div>
                      {quote.homeSize && <div>Home Size: {quote.homeSize} sq ft</div>}
                      {quote.roofType && <div>Roof Type: {quote.roofType}</div>}
                      {quote.systemSize && (
                        <div className="flex items-center">
                          <Zap className="h-4 w-4 mr-1 text-solar-green" />
                          System: {quote.systemSize} kW
                        </div>
                      )}
                      {quote.estimatedCost && (
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-solar-orange" />
                          Cost: ${Number(quote.estimatedCost).toLocaleString()}
                        </div>
                      )}
                      {quote.monthlySavings && (
                        <div>Monthly Savings: ${Number(quote.monthlySavings)}</div>
                      )}
                      {quote.paybackPeriod && (
                        <div>Payback: {Number(quote.paybackPeriod)} years</div>
                      )}
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div>
                    <div className="mb-3">
                      <Badge className={getStatusColor(quote.status || 'pending')}>
                        {quote.status || 'pending'}
                      </Badge>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-neutral-dark mb-2 block">
                        Update Status
                      </label>
                      <Select 
                        value={quote.status || 'pending'} 
                        onValueChange={(value) => handleStatusChange(quote.id, value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No Quotes Yet
            </h3>
            <p className="text-gray-500">
              Quote requests will appear here when customers submit them.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
