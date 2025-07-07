import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { QrCode, Share, Linkedin, Instagram, MessageCircle, DollarSign, Briefcase, Heart, Users } from "lucide-react";

interface CardData {
  id: string;
  type: "Professional" | "Personal" | "Social";
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  socialHandles: {
    linkedin: string;
    instagram: string;
    meta: string;
    x: string;
  };
  paymentModes: {
    paypal: string;
    venmo: string;
  };
}

const cardTemplates: CardData[] = [
  {
    id: "1",
    type: "Professional",
    name: "John Doe",
    title: "Senior Product Manager",
    company: "TechCorp Inc.",
    email: "john.doe@techcorp.com",
    phone: "+1 (555) 123-4567",
    socialHandles: {
      linkedin: "@johndoe-pro",
      instagram: "",
      meta: "",
      x: "@johndoe_biz"
    },
    paymentModes: {
      paypal: "",
      venmo: ""
    }
  },
  {
    id: "2",
    type: "Personal",
    name: "John Doe",
    title: "Travel Enthusiast",
    company: "Freelancer",
    email: "john.personal@email.com",
    phone: "+1 (555) 123-4567",
    socialHandles: {
      linkedin: "",
      instagram: "@john.doe.travels",
      meta: "@johndoe",
      x: "@johndoe"
    },
    paymentModes: {
      paypal: "@johndoe",
      venmo: "@john-doe"
    }
  },
  {
    id: "3",
    type: "Social",
    name: "John Doe",
    title: "Content Creator",
    company: "Social Media Influencer",
    email: "collabs@johndoe.com",
    phone: "+1 (555) 123-4567",
    socialHandles: {
      linkedin: "@johndoe-creator",
      instagram: "@johndoe.creator",
      meta: "@johndoe.official",
      x: "@johndoe_creates"
    },
    paymentModes: {
      paypal: "@johndoe.creator",
      venmo: "@john-creator"
    }
  }
];

export const CardBuilder = () => {
  const [cards] = useState<CardData[]>(cardTemplates);

  const getCardIcon = (type: string) => {
    switch (type) {
      case "Professional":
        return <Briefcase className="w-4 h-4" />;
      case "Personal":
        return <Heart className="w-4 h-4" />;
      case "Social":
        return <Users className="w-4 h-4" />;
      default:
        return <Briefcase className="w-4 h-4" />;
    }
  };

  const getCardGradient = (type: string) => {
    switch (type) {
      case "Professional":
        return "bg-gradient-primary";
      case "Personal":
        return "bg-gradient-to-br from-green-500 to-teal-600";
      case "Social":
        return "bg-gradient-to-br from-purple-500 to-pink-600";
      default:
        return "bg-gradient-primary";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">My Business Cards</h1>
        <Badge variant="secondary" className="px-3 py-1">
          {cards.length} Cards
        </Badge>
      </div>

      {/* Cards Grid */}
      <div className="space-y-6">
        {cards.map((card) => (
          <div key={card.id} className="space-y-4">
            {/* Card Type Header */}
            <div className="flex items-center gap-2">
              {getCardIcon(card.type)}
              <h2 className="text-lg font-semibold text-foreground">{card.type} Card</h2>
            </div>

            {/* Card Preview */}
            <Card className={`p-6 shadow-card border-none ${getCardGradient(card.type)} text-white relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16 border-2 border-white/30">
                      <AvatarFallback className="bg-white/20 text-white text-lg font-semibold">
                        {card.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{card.name}</h3>
                      <p className="text-white/90 font-medium mb-1">{card.title}</p>
                      <p className="text-white/80 text-sm">{card.company}</p>
                    </div>
                  </div>
                  
                  {/* QR Code Placeholder */}
                  <div className="bg-white/20 p-3 rounded-lg">
                    <div className="w-16 h-16 bg-white/30 rounded flex items-center justify-center">
                      <QrCode className="w-8 h-8 text-white/80" />
                    </div>
                    <p className="text-xs text-white/70 mt-1 text-center">QR Code</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-white/90 text-sm">{card.email}</p>
                  <p className="text-white/90 text-sm">{card.phone}</p>
                </div>
                
                {/* Social Handles - only show if they exist */}
                {(card.socialHandles.linkedin || card.socialHandles.instagram || card.socialHandles.meta || card.socialHandles.x) && (
                  <div className="flex items-center gap-3 mb-3">
                    {card.socialHandles.linkedin && <Linkedin className="w-4 h-4" />}
                    {card.socialHandles.instagram && <Instagram className="w-4 h-4" />}
                    {card.socialHandles.meta && <MessageCircle className="w-4 h-4" />}
                    {card.socialHandles.x && <span className="text-xs text-white/70">@{card.socialHandles.x}</span>}
                  </div>
                )}
                
                {/* Payment Methods - only show if they exist */}
                {(card.paymentModes.paypal || card.paymentModes.venmo) && (
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4" />
                    {card.paymentModes.paypal && <span className="text-xs text-white/70">PayPal: {card.paymentModes.paypal}</span>}
                    {card.paymentModes.venmo && <span className="text-xs text-white/70">Venmo: {card.paymentModes.venmo}</span>}
                  </div>
                )}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button size="lg" className="h-12">
                <QrCode className="w-5 h-5 mr-2" />
                Generate QR Code
              </Button>
              <Button variant="minimal" size="lg" className="h-12">
                <Share className="w-5 h-5 mr-2" />
                Share {card.type} Card
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};