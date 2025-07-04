import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { CardBuilder } from "@/components/CardBuilder";
import { ContactsList } from "@/components/ContactsList";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  const [activeTab, setActiveTab] = useState("welcome");

  const renderContent = () => {
    switch (activeTab) {
      case "welcome":
        return <WelcomeScreen />;
      case "cards":
        return <CardBuilder />;
      case "contacts":
        return <ContactsList />;
      case "settings":
        return (
          <div className="min-h-screen bg-background flex items-center justify-center p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Settings</h2>
              <p className="text-muted-foreground">Customize your experience</p>
            </div>
          </div>
        );
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="relative">
      {renderContent()}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
