import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function StickyContact() {
  const handleCallClick = () => {
    trackEvent('call_button_clicked', 'engagement', 'sticky_contact');
  };

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_button_clicked', 'engagement', 'sticky_contact');
  };

  const handleEmailClick = () => {
    trackEvent('email_button_clicked', 'engagement', 'sticky_contact');
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="flex flex-col space-y-3">
        {/* Call Button */}
        <Button
          asChild
          className="bg-gradient-to-r from-solar-orange to-orange-500 hover:from-orange-500 hover:to-solar-orange text-white rounded-full w-14 h-14 shadow-2xl hover-lift animate-float"
          size="icon"
          onClick={handleCallClick}
        >
          <a href="tel:+15551234567">
            <Phone className="h-6 w-6" />
          </a>
        </Button>
        
        {/* WhatsApp Button */}
        <Button
          asChild
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full w-14 h-14 shadow-2xl hover-lift animate-float"
          size="icon"
          onClick={handleWhatsAppClick}
          style={{animationDelay: '1s'}}
        >
          <a href="https://wa.me/15551234567?text=Hi,%20I\'m%20interested%20in%20solar%20installation%20from%20Solar%20Galaxy" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-6 w-6" />
          </a>
        </Button>
        
        {/* Email Button */}
        <Button
          asChild
          className="bg-gradient-to-r from-solar-green to-green-600 hover:from-green-600 hover:to-solar-green text-white rounded-full w-14 h-14 shadow-2xl hover-lift animate-float"
          size="icon"
          onClick={handleEmailClick}
          style={{animationDelay: '2s'}}
        >
          <a href="mailto:solargalaxy.co@gmail.com">
            <Mail className="h-6 w-6" />
          </a>
        </Button>
      </div>
    </div>
  );
}
