import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QrCode, Share, Linkedin, Instagram, MessageCircle, DollarSign, Briefcase, Heart, Users, Plus, X } from "lucide-react";

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
  const [cards, setCards] = useState<CardData[]>(cardTemplates);
  const [selectedQrCard, setSelectedQrCard] = useState<CardData | null>(null);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState<CardData>({
    id: "",
    type: "Professional",
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    socialHandles: {
      linkedin: "",
      instagram: "",
      meta: "",
      x: ""
    },
    paymentModes: {
      paypal: "",
      venmo: ""
    }
  });

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

  const handleAddCard = () => {
    const cardId = Date.now().toString();
    const cardToAdd = { ...newCard, id: cardId };
    setCards([...cards, cardToAdd]);
    setNewCard({
      id: "",
      type: "Professional",
      name: "",
      title: "",
      company: "",
      email: "",
      phone: "",
      socialHandles: {
        linkedin: "",
        instagram: "",
        meta: "",
        x: ""
      },
      paymentModes: {
        paypal: "",
        venmo: ""
      }
    });
    setIsAddingCard(false);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">My Business Cards</h1>
        <div className="flex items-center gap-3">
          <Button onClick={() => setIsAddingCard(true)} className="h-10">
            <Plus className="w-4 h-4 mr-2" />
            Add New Card
          </Button>
          <Badge variant="secondary" className="px-3 py-1">
            {cards.length} Cards
          </Badge>
        </div>
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
                  
                  {/* QR Code Placeholder - Clickable */}
                  <div className="bg-white/20 p-3 rounded-lg">
                    <button 
                      onClick={() => setSelectedQrCard(card)}
                      className="w-16 h-16 bg-white/30 rounded flex items-center justify-center hover:bg-white/40 transition-colors cursor-pointer"
                    >
                      <QrCode className="w-8 h-8 text-white/80" />
                    </button>
                    <p className="text-xs text-white/70 mt-1 text-center">QR Code</p>
                    {/* Share Button - Moved here */}
                    <Button 
                      variant="minimal" 
                      size="sm" 
                      className="mt-2 w-full h-8 text-xs bg-white/10 hover:bg-white/20 text-white border-white/20"
                    >
                      <Share className="w-3 h-3 mr-1" />
                      Share
                    </Button>
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
          </div>
        ))}
      </div>

      {/* QR Code Modal */}
      {selectedQrCard && (
        <Dialog open={!!selectedQrCard} onOpenChange={() => setSelectedQrCard(null)}>
          <DialogContent className="max-w-full max-h-full w-screen h-screen bg-black/95 border-none p-0 flex items-center justify-center">
            <div className="relative flex flex-col items-center">
              {/* Large QR Code */}
              <div className="bg-white p-8 rounded-lg shadow-2xl">
                <div className="w-64 h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-gray-600" />
                </div>
              </div>
              
              {/* Card Info */}
              <div className="text-center mt-6 text-white">
                <h3 className="text-xl font-bold">{selectedQrCard.name}</h3>
                <p className="text-white/80">{selectedQrCard.type} Card</p>
              </div>
              
              {/* Close Button */}
              <Button 
                onClick={() => setSelectedQrCard(null)}
                variant="outline" 
                size="sm" 
                className="mt-8 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <X className="w-4 h-4 mr-2" />
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add New Card Modal */}
      <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Business Card</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Card Type */}
            <div>
              <Label htmlFor="cardType">Card Type</Label>
              <Select value={newCard.type} onValueChange={(value: "Professional" | "Personal" | "Social") => setNewCard({...newCard, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Social">Social</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newCard.name}
                  onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newCard.title}
                  onChange={(e) => setNewCard({...newCard, title: e.target.value})}
                  placeholder="Product Manager"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={newCard.company}
                  onChange={(e) => setNewCard({...newCard, company: e.target.value})}
                  placeholder="TechCorp Inc."
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newCard.email}
                  onChange={(e) => setNewCard({...newCard, email: e.target.value})}
                  placeholder="john@techcorp.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={newCard.phone}
                onChange={(e) => setNewCard({...newCard, phone: e.target.value})}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Social Handles */}
            <div>
              <Label className="text-base font-semibold">Social Handles</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={newCard.socialHandles.linkedin}
                    onChange={(e) => setNewCard({...newCard, socialHandles: {...newCard.socialHandles, linkedin: e.target.value}})}
                    placeholder="@johndoe"
                  />
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={newCard.socialHandles.instagram}
                    onChange={(e) => setNewCard({...newCard, socialHandles: {...newCard.socialHandles, instagram: e.target.value}})}
                    placeholder="@johndoe"
                  />
                </div>
                <div>
                  <Label htmlFor="meta">Meta</Label>
                  <Input
                    id="meta"
                    value={newCard.socialHandles.meta}
                    onChange={(e) => setNewCard({...newCard, socialHandles: {...newCard.socialHandles, meta: e.target.value}})}
                    placeholder="@johndoe"
                  />
                </div>
                <div>
                  <Label htmlFor="x">X (Twitter)</Label>
                  <Input
                    id="x"
                    value={newCard.socialHandles.x}
                    onChange={(e) => setNewCard({...newCard, socialHandles: {...newCard.socialHandles, x: e.target.value}})}
                    placeholder="@johndoe"
                  />
                </div>
              </div>
            </div>

            {/* Payment Modes */}
            <div>
              <Label className="text-base font-semibold">Payment Methods</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <Label htmlFor="paypal">PayPal</Label>
                  <Input
                    id="paypal"
                    value={newCard.paymentModes.paypal}
                    onChange={(e) => setNewCard({...newCard, paymentModes: {...newCard.paymentModes, paypal: e.target.value}})}
                    placeholder="@johndoe"
                  />
                </div>
                <div>
                  <Label htmlFor="venmo">Venmo</Label>
                  <Input
                    id="venmo"
                    value={newCard.paymentModes.venmo}
                    onChange={(e) => setNewCard({...newCard, paymentModes: {...newCard.paymentModes, venmo: e.target.value}})}
                    placeholder="@john-doe"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsAddingCard(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddCard}
                disabled={!newCard.name || !newCard.email}
                className="flex-1"
              >
                Create Card
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};