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
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Sun className="h-8 w-8 text-solar-orange" />
            <span className="text-xl font-bold text-neutral-dark">SolarTech Solutions</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className={`font-medium transition-colors hover:text-solar-orange ${
                  isActive(item.href) 
                    ? 'text-solar-orange' 
                    : 'text-neutral-dark'
                }`}>
                  {item.name}
                </span>
              </Link>
            ))}
            <Button 
              className="bg-solar-orange hover:bg-solar-orange-light text-white"
              asChild
            >
              <Link href="/quote">Get Quote</Link>
            </Button>
          </div>
          
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className={`block font-medium py-2 transition-colors hover:text-solar-orange ${
                        isActive(item.href) 
                          ? 'text-solar-orange' 
                          : 'text-neutral-dark'
                      }`}>
                        {item.name}
                      </span>
                    </Link>
                  ))}
                  <Button 
                    className="bg-solar-orange hover:bg-solar-orange-light text-white w-full mt-4"
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
