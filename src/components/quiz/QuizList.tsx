import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Quiz {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  timeLimit: number;
  difficulty: "easy" | "medium" | "hard";
}

interface QuizListProps {
  quizzes?: Quiz[];
}

const QuizList = ({ quizzes }: QuizListProps) => {
  const { categoryId } = useParams<{ categoryId: string }>();

  // Mock data for different categories
  const mockQuizzes: Record<string, Quiz[]> = {
    science: [
      {
        id: "science-1",
        title: "Basic Physics",
        description: "Test your knowledge of fundamental physics concepts",
        questionCount: 10,
        timeLimit: 15,
        difficulty: "medium",
      },
      {
        id: "science-2",
        title: "Chemistry Fundamentals",
        description: "Explore the world of atoms and molecules",
        questionCount: 12,
        timeLimit: 20,
        difficulty: "hard",
      },
    ],
    geography: [
      {
        id: "geo-1",
        title: "World Capitals",
        description: "How well do you know the capitals of the world?",
        questionCount: 15,
        timeLimit: 10,
        difficulty: "medium",
      },
      {
        id: "geo-2",
        title: "Natural Wonders",
        description:
          "Test your knowledge of Earth's most amazing natural features",
        questionCount: 8,
        timeLimit: 12,
        difficulty: "easy",
      },
    ],
    sports: [
      {
        id: "sports-1",
        title: "Olympic History",
        description: "Test your knowledge of Olympic Games history",
        questionCount: 10,
        timeLimit: 15,
        difficulty: "medium",
      },
      {
        id: "sports-2",
        title: "Football Legends",
        description: "How well do you know the greatest football players?",
        questionCount: 12,
        timeLimit: 18,
        difficulty: "hard",
      },
    ],
    biology: [
      {
        id: "bio-1",
        title: "Human Anatomy",
        description: "Test your knowledge of the human body",
        questionCount: 15,
        timeLimit: 20,
        difficulty: "hard",
      },
      {
        id: "bio-2",
        title: "Animal Kingdom",
        description: "Explore the diversity of animal life",
        questionCount: 10,
        timeLimit: 15,
        difficulty: "medium",
      },
    ],
    literature: [
      {
        id: "lit-1",
        title: "Classic Novels",
        description: "Test your knowledge of classic literature",
        questionCount: 12,
        timeLimit: 18,
        difficulty: "hard",
      },
      {
        id: "lit-2",
        title: "Famous Authors",
        description: "How well do you know the world's most famous writers?",
        questionCount: 10,
        timeLimit: 15,
        difficulty: "medium",
      },
    ],
    programming: [
      {
        id: "prog-1",
        title: "JavaScript Basics",
        description: "Test your knowledge of JavaScript fundamentals",
        questionCount: 15,
        timeLimit: 20,
        difficulty: "medium",
      },
      {
        id: "prog-2",
        title: "Python Challenge",
        description: "Advanced Python programming concepts",
        questionCount: 12,
        timeLimit: 25,
        difficulty: "hard",
      },
    ],
    music: [
      {
        id: "music-1",
        title: "Music Theory",
        description: "Test your knowledge of music theory basics",
        questionCount: 10,
        timeLimit: 15,
        difficulty: "medium",
      },
      {
        id: "music-2",
        title: "Music History",
        description: "Explore the evolution of music through the ages",
        questionCount: 12,
        timeLimit: 18,
        difficulty: "hard",
      },
    ],
    movies: [
      {
        id: "movies-1",
        title: "Oscar Winners",
        description: "Test your knowledge of Academy Award winning films",
        questionCount: 15,
        timeLimit: 20,
        difficulty: "medium",
      },
      {
        id: "movies-2",
        title: "Film Directors",
        description: "How well do you know famous film directors?",
        questionCount: 10,
        timeLimit: 15,
        difficulty: "hard",
      },
    ],
  };

  // Get quizzes for the current category or use provided quizzes
  const displayQuizzes =
    quizzes || (categoryId ? mockQuizzes[categoryId] || [] : []);

  // Get category name based on ID
  const getCategoryName = (id: string) => {
    const categories: Record<string, string> = {
      science: "Science",
      geography: "Geography",
      sports: "Sports",
      biology: "Biology",
      literature: "Literature",
      programming: "Programming",
      music: "Music",
      movies: "Movies",
    };
    return categories[id] || "Quiz Category";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center">
        <Link to="/" className="mr-4">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-blue-700">
          {categoryId ? getCategoryName(categoryId) : "All"} Quizzes
        </h1>
      </div>

      {displayQuizzes.length === 0 ? (
        <Card className="bg-white">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <HelpCircle className="mb-4 h-16 w-16 text-blue-300" />
            <h3 className="text-xl font-semibold text-gray-700">
              No quizzes available
            </h3>
            <p className="mt-2 text-center text-gray-500">
              There are no quizzes available for this category yet.
              <br />
              Please check back later or try another category.
            </p>
            <Button asChild className="mt-6 bg-blue-600 hover:bg-blue-700">
              <Link to="/">Browse Categories</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayQuizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className="overflow-hidden bg-white transition-shadow hover:shadow-md"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-xl font-bold text-blue-700">
                    {quiz.title}
                  </CardTitle>
                  <Badge className={getDifficultyColor(quiz.difficulty)}>
                    {quiz.difficulty.charAt(0).toUpperCase() +
                      quiz.difficulty.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">{quiz.description}</p>
                <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <HelpCircle className="mr-1 h-4 w-4" />
                    {quiz.questionCount} questions
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {quiz.timeLimit} minutes
                  </div>
                </div>
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Link to={`/quiz/${quiz.id}`}>Start Quiz</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizList;
