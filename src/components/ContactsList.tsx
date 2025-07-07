import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { User, Building, Mail, Phone, Calendar as CalendarIcon, MapPin, Mic, MicOff, CalendarPlus } from "lucide-react";
import { format } from "date-fns";

interface Contact {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  location: string;
  lastInteraction: string;
  notes: string;
  leadScore: number;
  tags: string[];
}

const sampleContacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Marketing Director",
    company: "TechFlow Solutions",
    email: "sarah.j@techflow.com",
    phone: "+1 (555) 234-5678",
    industry: "Technology",
    location: "San Francisco, CA",
    lastInteraction: "2024-01-15",
    notes: "Interested in our enterprise package. Follow up next week.",
    leadScore: 85,
    tags: ["Hot Lead", "Enterprise"]
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Product Manager",
    company: "InnovateCorp",
    email: "m.chen@innovate.com",
    phone: "+1 (555) 345-6789",
    industry: "Software",
    location: "New York, NY",
    lastInteraction: "2024-01-12",
    notes: "Met at tech conference. Wants demo of our new features.",
    leadScore: 72,
    tags: ["Warm Lead", "Demo Requested"]
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    title: "CEO",
    company: "StartupXYZ",
    email: "emma@startupxyz.com",
    phone: "+1 (555) 456-7890",
    industry: "Fintech",
    location: "Austin, TX",
    lastInteraction: "2024-01-10",
    notes: "Looking for digital business card solution for her team.",
    leadScore: 91,
    tags: ["Hot Lead", "CEO", "Team Solution"]
  },
  {
    id: "4",
    name: "David Kim",
    title: "Sales Director",
    company: "Global Dynamics",
    email: "d.kim@globaldynamics.com",
    phone: "+1 (555) 567-8901",
    industry: "Manufacturing",
    location: "Chicago, IL",
    lastInteraction: "2024-01-08",
    notes: "Traditional company, needs convincing about digital solutions.",
    leadScore: 45,
    tags: ["Cold Lead", "Traditional"]
  },
  {
    id: "5",
    name: "Lisa Wang",
    title: "HR Manager",
    company: "PeopleFirst Inc.",
    email: "lisa.wang@peoplefirst.com",
    phone: "+1 (555) 678-9012",
    industry: "Human Resources",
    location: "Seattle, WA",
    lastInteraction: "2024-01-05",
    notes: "Interested in bulk pricing for employee onboarding.",
    leadScore: 78,
    tags: ["Warm Lead", "Bulk Purchase"]
  }
];

export const ContactsList = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [followUpDate, setFollowUpDate] = useState<Date>();
  const [followUpNotes, setFollowUpNotes] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingText, setRecordingText] = useState("");

  const getLeadScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "Hot Lead":
        return "bg-red-100 text-red-800";
      case "Warm Lead":
        return "bg-yellow-100 text-yellow-800";
      case "Cold Lead":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">My Contacts</h1>
        <div className="text-sm text-muted-foreground">
          {sampleContacts.length} contacts
        </div>
      </div>

      <div className="space-y-4">
        {sampleContacts.map((contact) => (
          <Card key={contact.id} className="p-4 shadow-card">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-primary text-white text-sm font-semibold">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{contact.name}</h3>
                    <div 
                      className={`w-2 h-2 rounded-full ${getLeadScoreColor(contact.leadScore)}`}
                      title={`Lead Score: ${contact.leadScore}`}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {contact.title} at {contact.company}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      {contact.industry}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {contact.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3" />
                      {contact.lastInteraction}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {contact.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className={`text-xs ${getTagColor(tag)}`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedContact(contact)}
                    >
                      View CRM Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-primary text-white text-sm font-semibold">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {contact.name} - CRM Details
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Contact Information */}
                    <div>
                      <h4 className="font-semibold mb-3">Contact Information</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{contact.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{contact.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{contact.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Lead Score & Tags */}
                    <div>
                      <h4 className="font-semibold mb-3">Lead Information</h4>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm">Lead Score:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${getLeadScoreColor(contact.leadScore)}`}
                              style={{ width: `${contact.leadScore}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{contact.leadScore}%</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {contact.tags.map((tag, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className={getTagColor(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <h4 className="font-semibold mb-3">Notes</h4>
                      <Card className="p-3 bg-muted/50">
                        <p className="text-sm">{contact.notes}</p>
                      </Card>
                    </div>

                    {/* Recording Section */}
                    <div>
                      <h4 className="font-semibold mb-3">Context Recording</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant={isRecording ? "destructive" : "outline"}
                            size="sm"
                            onClick={() => setIsRecording(!isRecording)}
                          >
                            {isRecording ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                            {isRecording ? "Stop Recording" : "Start Recording"}
                          </Button>
                          {isRecording && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                              Recording...
                            </div>
                          )}
                        </div>
                        <Textarea
                          placeholder="Recording transcription will appear here or add manual notes..."
                          value={recordingText}
                          onChange={(e) => setRecordingText(e.target.value)}
                          className="min-h-[80px]"
                        />
                      </div>
                    </div>

                    {/* Follow-up Calendar */}
                    <div>
                      <h4 className="font-semibold mb-3">Schedule Follow-up</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="sm">
                                <CalendarPlus className="w-4 h-4 mr-2" />
                                {followUpDate ? format(followUpDate, "PPP") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={followUpDate}
                                onSelect={setFollowUpDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <Label htmlFor="followUpNotes">Follow-up Notes</Label>
                          <Textarea
                            id="followUpNotes"
                            placeholder="Add notes for follow-up reminder..."
                            value={followUpNotes}
                            onChange={(e) => setFollowUpNotes(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <Button size="sm" className="w-full">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          Schedule Follow-up Reminder
                        </Button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button size="sm" className="flex-1">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Schedule Meeting
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </div>
                </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm">
                  <Mic className="w-4 h-4 mr-2" />
                  Record Context
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Hear Context
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};