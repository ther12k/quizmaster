import React, { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/AuthContext";

function AppContent() {
  const { isAuthenticated } = useAuth();

  // Lazy load components
  const QuizList = React.lazy(() => import("./components/quiz/QuizList"));
  const QuizDetail = React.lazy(() => import("./components/quiz/QuizDetail"));

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route
            path="/"
            element={<Home isAuthenticated={isAuthenticated} />}
          />
          <Route path="/quizzes/:categoryId" element={<QuizList />} />
          <Route path="/quiz/:quizId" element={<QuizDetail />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
