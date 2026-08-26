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
      'https://wa.me/15551234567?text=Hi,%20I\'m%20interested%20in%20solar%20installation%20from%20Solar%20Galaxy',
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
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 shadow-2xl hover-lift animate-float"
          size="icon"
        >
          {isOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <MessageCircle className="h-7 w-7" />
          )}
        </Button>

        {/* Chat Window */}
        {isOpen && (
          <Card className="absolute bottom-20 left-0 w-80 shadow-2xl glass animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white mr-4 hover-lift">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-dark">Solar Galaxy Support</div>
                  <div className="text-sm text-green-600 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Online
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Hi there! 👋 How can we help you with your solar energy needs? Get instant answers to your questions!
              </p>
              
              <Button 
                onClick={handleStartChat}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl hover-lift shadow-lg"
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
