import { useState } from "react";
import { Card } from "@/components/ui/card";
import { User, QrCode, Users, Settings } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: "welcome", icon: User, label: "Home" },
    { id: "cards", icon: QrCode, label: "Cards" },
    { id: "contacts", icon: Users, label: "Contacts" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <Card className="fixed bottom-4 left-4 right-4 p-1 shadow-card border-none bg-card/95 backdrop-blur-sm">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <tab.icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
};