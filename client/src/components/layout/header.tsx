import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Net Metering", href: "/net-metering" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300 glass backdrop-blur-lg bg-white/90 shadow-lg">
      <nav className="container-custom px-4">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 hover-lift">
            <div className="relative">
              <Sun className="h-8 w-8 sm:h-10 sm:w-10 text-solar-orange animate-float" />
              <div className="absolute inset-0 bg-solar-orange/20 rounded-full blur-xl"></div>
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-dark">
              Solar Galaxy
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className={`relative font-medium transition-all duration-300 hover:scale-105 ${
                  isActive(item.href) 
                    ? 'text-solar-orange'
                    : 'text-neutral-dark hover:text-solar-orange'
                }`}>
                  {item.name}
                  {isActive(item.href) && (
                    <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-solar-orange to-solar-green rounded-full animate-scale-in"></div>
                  )}
                </span>
              </Link>
            ))}
            
            <Button 
              className="btn-modern hover-glow ml-4"
              asChild
            >
              <Link href="/quote">Get Quote</Link>
            </Button>
          </div>
          
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover-lift text-neutral-dark hover:text-solar-orange"
                  data-testid="mobile-menu-button"
                >
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass backdrop-blur-lg w-[280px] sm:w-[350px]">
                <div className="flex flex-col space-y-4 sm:space-y-6 mt-8 sm:mt-12">
                  {navigation.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className={`block text-base sm:text-lg font-medium py-2 sm:py-3 transition-all duration-300 hover:scale-105 hover:text-solar-orange ${
                        isActive(item.href) 
                          ? 'text-solar-orange' 
                          : 'text-neutral-dark'
                      }`}>
                        {item.name}
                      </span>
                    </Link>
                  ))}
                  
                  <Button 
                    className="btn-modern w-full mt-4 sm:mt-6"
                    onClick={() => setIsOpen(false)}
                    asChild
                  >
                    <Link href="/quote">Get Quote</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}