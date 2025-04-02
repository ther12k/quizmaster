import React from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import {
  Book,
  Globe,
  Trophy,
  Microscope,
  Brain,
  Code,
  Music,
  Film,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  quizCount: number;
  color: string;
}

interface CategoryGridProps {
  categories?: Category[];
  onCategoryClick?: (categoryId: string) => void;
}

const CategoryGrid = ({
  categories = [
    {
      id: "science",
      name: "Science",
      icon: <Microscope className="w-8 h-8 text-white" />,
      quizCount: 12,
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
    },
    {
      id: "geography",
      name: "Geography",
      icon: <Globe className="w-8 h-8 text-white" />,
      quizCount: 8,
      color: "bg-gradient-to-br from-green-500 to-green-700",
    },
    {
      id: "sports",
      name: "Sports",
      icon: <Trophy className="w-8 h-8 text-white" />,
      quizCount: 10,
      color: "bg-gradient-to-br from-orange-500 to-orange-700",
    },
    {
      id: "biology",
      name: "Biology",
      icon: <Brain className="w-8 h-8 text-white" />,
      quizCount: 6,
      color: "bg-gradient-to-br from-purple-500 to-purple-700",
    },
    {
      id: "literature",
      name: "Literature",
      icon: <Book className="w-8 h-8 text-white" />,
      quizCount: 9,
      color: "bg-gradient-to-br from-pink-500 to-pink-700",
    },
    {
      id: "programming",
      name: "Programming",
      icon: <Code className="w-8 h-8 text-white" />,
      quizCount: 7,
      color: "bg-gradient-to-br from-cyan-500 to-cyan-700",
    },
    {
      id: "music",
      name: "Music",
      icon: <Music className="w-8 h-8 text-white" />,
      quizCount: 5,
      color: "bg-gradient-to-br from-red-500 to-red-700",
    },
    {
      id: "movies",
      name: "Movies",
      icon: <Film className="w-8 h-8 text-white" />,
      quizCount: 11,
      color: "bg-gradient-to-br from-yellow-500 to-yellow-700",
    },
  ],
  onCategoryClick,
}: CategoryGridProps) => {
  const navigate = useNavigate();

  // Handle category click - navigate to quizzes for that category
  const handleCategoryClick = (categoryId: string) => {
    if (onCategoryClick) {
      onCategoryClick(categoryId);
    } else {
      navigate(`/quizzes/${categoryId}`);
    }
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quiz Categories</h2>
        <p className="text-sm text-gray-500">
          {categories.length} categories available
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            icon={category.icon}
            name={category.name}
            quizCount={category.quizCount}
            color={category.color}
            onClick={() => handleCategoryClick(category.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
