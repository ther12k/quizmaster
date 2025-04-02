import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Trophy, Medal, Star, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface Achievement {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface QuizResult {
  id: string;
  category: string;
  score: number;
  totalQuestions: number;
  date: string;
}

interface UserProgressCardProps {
  username?: string;
  profileImage?: string;
  level?: number;
  xp?: number;
  xpToNextLevel?: number;
  achievements?: Achievement[];
  recentQuizzes?: QuizResult[];
}

const UserProgressCard = ({
  username = "QuizMaster",
  profileImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=quiz123",
  level = 5,
  xp = 350,
  xpToNextLevel = 500,
  achievements = [
    { id: "1", name: "Quiz Champion", icon: <Trophy className="h-4 w-4" /> },
    { id: "2", name: "Science Expert", icon: <Medal className="h-4 w-4" /> },
    { id: "3", name: "Perfect Score", icon: <Star className="h-4 w-4" /> },
  ],
  recentQuizzes = [
    {
      id: "1",
      category: "Science",
      score: 8,
      totalQuestions: 10,
      date: "2023-06-15",
    },
    {
      id: "2",
      category: "Geography",
      score: 7,
      totalQuestions: 10,
      date: "2023-06-10",
    },
  ],
}: UserProgressCardProps) => {
  const xpPercentage = Math.round((xp / xpToNextLevel) * 100);

  return (
    <Card className="w-full max-w-md bg-white shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-blue-500">
            <AvatarImage src={profileImage} alt={username} />
            <AvatarFallback className="bg-blue-100 text-blue-700">
              {username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl font-bold text-gray-800">
              Welcome back, {username}!
            </CardTitle>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                <Award className="mr-1 h-3 w-3" /> Level {level}
              </Badge>
              <span className="text-sm text-gray-500">
                {xp}/{xpToNextLevel} XP
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="mb-1 flex justify-between text-xs text-gray-500">
            <span>Progress to Level {level + 1}</span>
            <span>{xpPercentage}%</span>
          </div>
          <Progress value={xpPercentage} className="h-2 bg-gray-100" />
        </div>

        <div className="mb-4">
          <h3 className="mb-2 text-sm font-medium text-gray-700">
            Achievements
          </h3>
          <div className="flex flex-wrap gap-2">
            {achievements.map((achievement) => (
              <Badge
                key={achievement.id}
                variant="secondary"
                className="flex items-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                {achievement.icon}
                {achievement.name}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-700">
            Recent Quiz Results
          </h3>
          <div className="space-y-2">
            {recentQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className={cn(
                  "flex items-center justify-between rounded-md border p-2",
                  quiz.score / quiz.totalQuestions >= 0.7
                    ? "border-green-100 bg-green-50"
                    : "border-amber-100 bg-amber-50",
                )}
              >
                <div>
                  <p className="font-medium text-gray-800">{quiz.category}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(quiz.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={cn(
                      "font-bold",
                      quiz.score / quiz.totalQuestions >= 0.7
                        ? "text-green-600"
                        : "text-amber-600",
                    )}
                  >
                    {quiz.score}/{quiz.totalQuestions}
                  </p>
                  <p className="text-xs text-gray-500">
                    {Math.round((quiz.score / quiz.totalQuestions) * 100)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProgressCard;
