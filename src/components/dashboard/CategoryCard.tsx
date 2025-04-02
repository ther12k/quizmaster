import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

interface CategoryCardProps {
  icon?: React.ReactNode;
  name?: string;
  quizCount?: number;
  color?: string;
  onClick?: () => void;
}

const CategoryCard = ({
  icon = (
    <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-700">
      ?
    </div>
  ),
  name = "Category Name",
  quizCount = 5,
  color = "bg-gradient-to-br from-blue-500 to-blue-700",
  onClick = () => console.log("Category clicked"),
}: CategoryCardProps) => {
  return (
    <Card
      className={`w-full max-w-[220px] h-[180px] overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${color} text-white`}
      onClick={onClick}
    >
      <CardContent className="p-6 flex flex-col items-center justify-center h-full">
        <div className="mb-4 mt-2">{icon}</div>

        <h3 className="text-xl font-bold mb-2 text-center">{name}</h3>

        <Badge className="bg-white/20 hover:bg-white/30 text-white">
          {quizCount} {quizCount === 1 ? "Quiz" : "Quizzes"}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
