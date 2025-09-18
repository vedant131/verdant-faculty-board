import { 
  BookOpen, 
  Trophy, 
  CheckCircle, 
  BarChart3, 
  Gamepad2, 
  Megaphone, 
  User,
  Leaf
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { icon: BookOpen, label: "Assign Lessons", id: "lessons" },
  { icon: Trophy, label: "Assign Challenges", id: "challenges" },
  { icon: CheckCircle, label: "Approvals", id: "approvals" },
  { icon: BarChart3, label: "Reports & Analytics", id: "analytics" },
  { icon: Gamepad2, label: "Gamification Controls", id: "gamification" },
  { icon: Megaphone, label: "Announcements", id: "announcements" },
  { icon: User, label: "Profile", id: "profile" },
];

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  return (
    <nav className="bg-card border-b border-border eco-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">EcoEdu</h1>
              <p className="text-sm text-muted-foreground">Faculty Dashboard</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map(({ icon: Icon, label, id }) => (
              <Button
                key={id}
                variant={activeSection === id ? "default" : "ghost"}
                onClick={() => onSectionChange(id)}
                className={`
                  flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg
                  transition-all duration-200
                  ${activeSection === id 
                    ? "bg-primary text-primary-foreground eco-shadow" 
                    : "text-foreground hover:bg-secondary hover:text-secondary-foreground"
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden lg:inline">{label}</span>
              </Button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}