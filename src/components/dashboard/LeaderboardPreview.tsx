import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface LeaderboardUser {
  id: string;
  username: string;
  score: number;
  avatarUrl?: string;
  rank: number;
}

interface LeaderboardPreviewProps {
  users?: LeaderboardUser[];
  title?: string;
}

const LeaderboardPreview = ({
  users = [
    {
      id: "1",
      username: "QuizMaster",
      score: 980,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=QuizMaster",
      rank: 1,
    },
    {
      id: "2",
      username: "BrainGenius",
      score: 875,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=BrainGenius",
      rank: 2,
    },
    {
      id: "3",
      username: "TriviaKing",
      score: 820,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=TriviaKing",
      rank: 3,
    },
    {
      id: "4",
      username: "QuizWhiz",
      score: 790,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=QuizWhiz",
      rank: 4,
    },
    {
      id: "5",
      username: "KnowledgeNinja",
      score: 760,
      avatarUrl:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=KnowledgeNinja",
      rank: 5,
    },
  ],
  title = "Top Performers",
}: LeaderboardPreviewProps) => {
  return (
    <Card className="w-full max-w-md bg-white shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl font-bold text-blue-700">
          <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-semibold">
                  {user.rank}
                </div>
                <Avatar>
                  <AvatarImage src={user.avatarUrl} alt={user.username} />
                  <AvatarFallback className="bg-blue-200 text-blue-700">
                    {user.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{user.username}</span>
              </div>
              <span className="font-semibold text-blue-700">{user.score}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button
            asChild
            variant="outline"
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
          >
            <Link to="/leaderboard" className="flex items-center">
              View Full Leaderboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardPreview;
