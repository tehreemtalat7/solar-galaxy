import { Link } from "wouter";
import { Sun, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Sun className="h-8 w-8 text-solar-orange" />
              <span className="text-xl font-bold">Solar Galaxy</span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional solar installation and distribution services for residential and commercial properties.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-solar-orange transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-solar-orange transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-solar-orange transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-solar-orange transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Residential Solar</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Commercial Solar</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Battery Storage</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Maintenance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Net Metering</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p>1234 Solar Ave</p>
              <p>Austin, TX 78701</p>
              <p>(555) 123-4567</p>
              <p>info@solargalaxy.com</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 Solar Galaxy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
