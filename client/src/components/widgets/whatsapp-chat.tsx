import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      trackEvent('whatsapp_widget_opened', 'engagement', 'whatsapp_widget');
    }
  };

  const handleStartChat = () => {
    trackEvent('whatsapp_chat_started', 'conversion', 'whatsapp_widget');
    window.open(
      'https://wa.me/15551234567?text=Hi,%20I\'m%20interested%20in%20solar%20installation',
      '_blank'
    );
  };

  return (
    <div className="fixed bottom-4 left-4 z-40">
      {/* Chat Widget */}
      <div className="relative">
        {/* Chat Bubble */}
        <Button
          onClick={handleToggle}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg"
          size="icon"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>

        {/* Chat Window */}
        {isOpen && (
          <Card className="absolute bottom-16 left-0 w-80 shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white mr-3">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-dark">SolarTech Support</div>
                  <div className="text-sm text-green-600">Online</div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                Hi there! 👋 How can we help you with your solar energy needs?
              </p>
              
              <Button 
                onClick={handleStartChat}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                Start Chat on WhatsApp
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
