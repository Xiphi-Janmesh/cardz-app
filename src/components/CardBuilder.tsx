import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { QrCode, Share, Edit, User, Linkedin, Instagram, MessageCircle, DollarSign } from "lucide-react";

interface CardData {
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

export const CardBuilder = () => {
  const [cardData, setCardData] = useState<CardData>({
    name: "John Doe",
    title: "Senior Product Manager",
    company: "TechCorp Inc.",
    email: "john.doe@techcorp.com",
    phone: "+1 (555) 123-4567",
    socialHandles: {
      linkedin: "@johndoe",
      instagram: "@john.doe",
      meta: "@johndoe",
      x: "@johndoe"
    },
    paymentModes: {
      paypal: "@johndoe",
      venmo: "@john-doe"
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  const updateCardData = (field: keyof CardData, value: string) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const updateSocialHandle = (platform: keyof CardData['socialHandles'], value: string) => {
    setCardData(prev => ({
      ...prev,
      socialHandles: { ...prev.socialHandles, [platform]: value }
    }));
  };

  const updatePaymentMode = (mode: keyof CardData['paymentModes'], value: string) => {
    setCardData(prev => ({
      ...prev,
      paymentModes: { ...prev.paymentModes, [mode]: value }
    }));
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">My Business Card</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit className="w-4 h-4 mr-2" />
          {isEditing ? "Done" : "Edit"}
        </Button>
      </div>

      {/* Card Preview */}
      <Card className="p-6 mb-6 shadow-card border-none bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        <div className="relative z-10">
          <div className="flex items-start space-x-4 mb-4">
            <Avatar className="w-16 h-16 border-2 border-white/30">
              <AvatarFallback className="bg-white/20 text-white text-lg font-semibold">
                {cardData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">{cardData.name}</h2>
              <p className="text-white/90 font-medium mb-1">{cardData.title}</p>
              <p className="text-white/80 text-sm">{cardData.company}</p>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <p className="text-white/90 text-sm">{cardData.email}</p>
            <p className="text-white/90 text-sm">{cardData.phone}</p>
          </div>
          
          {/* Social Handles */}
          <div className="flex items-center gap-3 mb-3">
            <Linkedin className="w-4 h-4" />
            <Instagram className="w-4 h-4" />
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs text-white/70">@{cardData.socialHandles.x}</span>
          </div>
          
          {/* Payment Methods */}
          <div className="flex items-center gap-3">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs text-white/70">PayPal: {cardData.paymentModes.paypal}</span>
            <span className="text-xs text-white/70">Venmo: {cardData.paymentModes.venmo}</span>
          </div>
        </div>
      </Card>

      {/* Edit Form */}
      {isEditing && (
        <Card className="p-6 mb-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Edit Card Details</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={cardData.name}
                onChange={(e) => updateCardData('name', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                value={cardData.title}
                onChange={(e) => updateCardData('title', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={cardData.company}
                onChange={(e) => updateCardData('company', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={cardData.email}
                onChange={(e) => updateCardData('email', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={cardData.phone}
                onChange={(e) => updateCardData('phone', e.target.value)}
                className="mt-1"
              />
            </div>
            
            {/* Social Handles Section */}
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">Social Handles</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={cardData.socialHandles.linkedin}
                    onChange={(e) => updateSocialHandle('linkedin', e.target.value)}
                    placeholder="@username"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={cardData.socialHandles.instagram}
                    onChange={(e) => updateSocialHandle('instagram', e.target.value)}
                    placeholder="@username"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="meta">Meta</Label>
                  <Input
                    id="meta"
                    value={cardData.socialHandles.meta}
                    onChange={(e) => updateSocialHandle('meta', e.target.value)}
                    placeholder="@username"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="x">X (Twitter)</Label>
                  <Input
                    id="x"
                    value={cardData.socialHandles.x}
                    onChange={(e) => updateSocialHandle('x', e.target.value)}
                    placeholder="@username"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
            
            {/* Payment Modes Section */}
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">Payment Methods</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="paypal">PayPal</Label>
                  <Input
                    id="paypal"
                    value={cardData.paymentModes.paypal}
                    onChange={(e) => updatePaymentMode('paypal', e.target.value)}
                    placeholder="@username"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="venmo">Venmo</Label>
                  <Input
                    id="venmo"
                    value={cardData.paymentModes.venmo}
                    onChange={(e) => updatePaymentMode('venmo', e.target.value)}
                    placeholder="@username"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button size="lg" className="w-full h-12">
          <QrCode className="w-5 h-5 mr-2" />
          Generate QR Code
        </Button>
        <Button variant="minimal" size="lg" className="w-full h-12">
          <Share className="w-5 h-5 mr-2" />
          Share Card
        </Button>
      </div>
    </div>
  );
};