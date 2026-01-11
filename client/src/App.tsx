import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import { useAuth } from "./hooks/useAuth";

// Pages
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import Portfolio from "@/pages/portfolio";
import Blog from "@/pages/blog";
import Contact from "@/pages/contact";
import Quote from "@/pages/quote";
import NetMetering from "@/pages/net-metering";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

// Layout components
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import WhatsAppChat from "@/components/widgets/whatsapp-chat";
import StickyContact from "@/components/widgets/sticky-contact";

function Router() {
  // Track page views when routes change
  useAnalytics();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/blog" component={Blog} />
          <Route path="/contact" component={Contact} />
          <Route path="/quote" component={Quote} />
          <Route path="/net-metering" component={NetMetering} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <WhatsAppChat />
      <StickyContact />
    </div>
  );
}

function App() {
  // Initialize Google Analytics when app loads
  useEffect(() => {
    // Verify required environment variable is present
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
