import { useState } from "react";
import { Navigation } from "@/components/Dashboard/Navigation";
import { HeroSection } from "@/components/Dashboard/HeroSection";
import { StatsCards } from "@/components/Dashboard/StatsCards";
import { LessonModal } from "@/components/Dashboard/Modals/LessonModal";
import { ChallengeModal } from "@/components/Dashboard/Modals/ChallengeModal";
import { AnnouncementModal } from "@/components/Dashboard/Modals/AnnouncementModal";
import { GamificationControls } from "@/components/Dashboard/Sections/GamificationControls";
import { AnalyticsDashboard } from "@/components/Dashboard/Sections/AnalyticsDashboard";
import { ApprovalsSection } from "@/components/Dashboard/Sections/ApprovalsSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    
    // Handle modal openings for specific sections
    if (section === "lessons") {
      setIsLessonModalOpen(true);
      setActiveSection("dashboard"); // Keep dashboard as active while modal is open
    } else if (section === "challenges") {
      setIsChallengeModalOpen(true);
      setActiveSection("dashboard");
    } else if (section === "announcements") {
      setIsAnnouncementModalOpen(true);
      setActiveSection("dashboard");
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "approvals":
        return <ApprovalsSection />;
      case "analytics":
        return <AnalyticsDashboard />;
      case "gamification":
        return <GamificationControls />;
      case "profile":
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Profile Settings</h2>
            <p className="text-muted-foreground">Faculty profile management would be implemented here.</p>
          </div>
        );
      default:
        return (
          <>
            <HeroSection />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <StatsCards />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange} 
      />
      
      <main className="pb-8">
        {renderActiveSection()}
      </main>

      {/* Modals */}
      <LessonModal 
        isOpen={isLessonModalOpen} 
        onClose={() => setIsLessonModalOpen(false)} 
      />
      
      <ChallengeModal 
        isOpen={isChallengeModalOpen} 
        onClose={() => setIsChallengeModalOpen(false)} 
      />
      
      <AnnouncementModal 
        isOpen={isAnnouncementModalOpen} 
        onClose={() => setIsAnnouncementModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
