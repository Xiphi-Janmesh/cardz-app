import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QrCode, Share, Users, User } from "lucide-react";

export const WelcomeScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-primary flex flex-col">
      {/* Header */}
      <div className="text-center pt-16 pb-8 px-6">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <QrCode className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">CardConnect</h1>
        <p className="text-white/90 text-lg max-w-sm mx-auto leading-relaxed">
          Create and share professional digital business cards that leave a lasting impression
        </p>
      </div>

      {/* Features */}
      <div className="flex-1 bg-background rounded-t-3xl p-6 space-y-6">
        <div className="grid gap-4">
          <FeatureCard
            icon={<User className="w-6 h-6 text-primary" />}
            title="Personal Branding"
            description="Create multiple cards for different roles and purposes"
          />
          <FeatureCard
            icon={<Share className="w-6 h-6 text-primary" />}
            title="Instant Sharing"
            description="Share via QR code, NFC, or custom link"
          />
          <FeatureCard
            icon={<Users className="w-6 h-6 text-primary" />}
            title="Team Management"
            description="Branded cards for your entire organization"
          />
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3 pt-8">
          <Button size="lg" className="w-full h-12 text-base font-semibold">
            Get Started
          </Button>
          <Button 
            variant="minimal" 
            size="lg" 
            className="w-full h-12 text-base font-medium"
          >
            View Demo
          </Button>
        </div>

        <p className="text-center text-muted-foreground text-sm pt-4">
          Trusted by 50,000+ professionals worldwide
        </p>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <Card className="p-4 border-none shadow-card hover:shadow-lg transition-all duration-200">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
};