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
      <div className="flex flex-col space-y-2">
        {/* Call Button */}
        <Button
          asChild
          className="bg-solar-orange hover:bg-solar-orange-light text-white rounded-full w-12 h-12 shadow-lg"
          size="icon"
          onClick={handleCallClick}
        >
          <a href="tel:+15551234567">
            <Phone className="h-5 w-5" />
          </a>
        </Button>
        
        {/* WhatsApp Button */}
        <Button
          asChild
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12 shadow-lg"
          size="icon"
          onClick={handleWhatsAppClick}
        >
          <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-5 w-5" />
          </a>
        </Button>
        
        {/* Email Button */}
        <Button
          asChild
          className="bg-solar-green hover:bg-solar-green-light text-white rounded-full w-12 h-12 shadow-lg"
          size="icon"
          onClick={handleEmailClick}
        >
          <a href="mailto:info@solartechsolutions.com">
            <Mail className="h-5 w-5" />
          </a>
        </Button>
      </div>
    </div>
  );
}
