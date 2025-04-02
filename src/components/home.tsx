import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryGrid from "./dashboard/CategoryGrid";
import LeaderboardPreview from "./dashboard/LeaderboardPreview";
import UserProgressCard from "./dashboard/UserProgressCard";
import AuthModal from "./auth/AuthModal";
import Navbar from "./layout/Navbar";

interface HomeProps {
  isAuthenticated?: boolean;
}

const Home = ({ isAuthenticated = false }: HomeProps) => {
  const [showAuthModal, setShowAuthModal] = useState(!isAuthenticated);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const navigate = useNavigate();

  // Mock function to handle category selection
  const handleCategoryClick = (categoryId: string) => {
    console.log(`Selected category: ${categoryId}`);
    navigate(`/quizzes/${categoryId}`);
  };

  // Close auth modal when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setShowAuthModal(false);
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar isAuthenticated={isAuthenticated} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab={activeTab}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Welcome Header */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-blue-700 mb-2">
              Welcome to the Quiz Platform
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Test your knowledge across various categories, compete with
              others, and track your progress on our interactive quiz platform.
            </p>
          </div>

          {/* Dashboard Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area (Categories) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Categories Section */}
              <CategoryGrid onCategoryClick={handleCategoryClick} />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* User Progress Card */}
              <UserProgressCard />

              {/* Leaderboard Preview */}
              <LeaderboardPreview />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2023 Quiz Platform. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Terms
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Privacy
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Help
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
