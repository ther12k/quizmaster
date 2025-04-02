import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Clock, AlertCircle } from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

const QuizDetail = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  // Mock quiz data
  const mockQuizzes: Record<string, { title: string; questions: Question[] }> =
    {
      "science-1": {
        title: "Basic Physics",
        questions: [
          {
            id: "q1",
            text: "What is the SI unit of force?",
            options: ["Watt", "Newton", "Joule", "Pascal"],
            correctAnswer: 1,
          },
          {
            id: "q2",
            text: "Which of these is NOT a state of matter?",
            options: ["Plasma", "Gas", "Energy", "Solid"],
            correctAnswer: 2,
          },
          {
            id: "q3",
            text: "What is the speed of light in vacuum?",
            options: [
              "300,000 km/s",
              "150,000 km/s",
              "3,000 km/s",
              "30,000 km/s",
            ],
            correctAnswer: 0,
          },
        ],
      },
      "geo-1": {
        title: "World Capitals",
        questions: [
          {
            id: "q1",
            text: "What is the capital of Australia?",
            options: ["Sydney", "Melbourne", "Canberra", "Perth"],
            correctAnswer: 2,
          },
          {
            id: "q2",
            text: "Which city is the capital of Canada?",
            options: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
            correctAnswer: 3,
          },
          {
            id: "q3",
            text: "What is the capital of Brazil?",
            options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
            correctAnswer: 2,
          },
        ],
      },
      "prog-1": {
        title: "JavaScript Basics",
        questions: [
          {
            id: "q1",
            text: "Which of the following is NOT a JavaScript data type?",
            options: ["String", "Boolean", "Float", "Symbol"],
            correctAnswer: 2,
          },
          {
            id: "q2",
            text: "What will console.log(typeof []) output?",
            options: ["'array'", "'object'", "'list'", "'undefined'"],
            correctAnswer: 1,
          },
          {
            id: "q3",
            text: "Which method adds an element to the end of an array?",
            options: ["push()", "pop()", "shift()", "unshift()"],
            correctAnswer: 0,
          },
        ],
      },
    };

  // Get current quiz data
  const quiz = quizId ? mockQuizzes[quizId] : null;
  const questions = quiz?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  // Handle answer selection
  const handleAnswerSelect = (value: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: parseInt(value),
    });
  };

  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  // Navigate to previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Calculate score
  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    return {
      score: correctCount,
      total: questions.length,
      percentage: Math.round((correctCount / questions.length) * 100),
    };
  };

  // Format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // If quiz not found
  if (!quiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="mb-4 h-16 w-16 text-red-500" />
            <h3 className="text-xl font-semibold text-gray-700">
              Quiz Not Found
            </h3>
            <p className="mt-2 text-center text-gray-500">
              The quiz you're looking for doesn't exist or has been removed.
            </p>
            <Button
              onClick={() => navigate(-1)}
              className="mt-6 bg-blue-600 hover:bg-blue-700"
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Quiz results screen
  if (quizCompleted) {
    const result = calculateScore();
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-blue-700">
              Quiz Results
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full border-8 border-blue-100 text-4xl font-bold text-blue-700">
              {result.percentage}%
            </div>

            <h3 className="mb-2 text-xl font-semibold">
              You scored {result.score} out of {result.total}
            </h3>

            <p className="mb-6 text-center text-gray-600">
              {result.percentage >= 80
                ? "Excellent! You've mastered this topic."
                : result.percentage >= 60
                  ? "Good job! You have a solid understanding."
                  : "Keep practicing to improve your knowledge."}
            </p>

            <div className="flex w-full flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setSelectedAnswers({});
                  setQuizCompleted(false);
                }}
                variant="outline"
                className="flex-1"
              >
                Retry Quiz
              </Button>
              <Button
                onClick={() => navigate("/")}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Quiz question screen
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Exit Quiz
        </Button>
        <div className="flex items-center text-gray-600">
          <Clock className="mr-2 h-5 w-5" />
          <span className="font-medium">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <div className="flex flex-col space-y-2">
            <CardTitle className="text-xl font-bold text-blue-700">
              {quiz.title}
            </CardTitle>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span>
                {Object.keys(selectedAnswers).length} of {questions.length}{" "}
                answered
              </span>
            </div>
            <Progress
              value={(currentQuestionIndex / (questions.length - 1)) * 100}
              className="h-2"
            />
          </div>
        </CardHeader>
        <CardContent className="py-6">
          <div className="mb-6">
            <h3 className="mb-4 text-lg font-medium">{currentQuestion.text}</h3>
            <RadioGroup
              value={selectedAnswers[currentQuestionIndex]?.toString() || ""}
              onValueChange={handleAnswerSelect}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 rounded-md border p-3 hover:bg-gray-50"
                >
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer py-1"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {currentQuestionIndex === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizDetail;
