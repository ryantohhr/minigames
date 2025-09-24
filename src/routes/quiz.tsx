import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { optional } from "zod/v4";

export const Route = createFileRoute("/quiz")({
  component: RouteComponent,
});

type Question = {
  question: string;
  options: string[];
  answer: number;
};

const questions: Question[] = [
  {
    question: "Which programming language was used to build this app?",
    options: ["Lua", "C", "TypeScript", "Python"],
    answer: 2,
  },
  {
    question: "What's the name of the framework used to build this app?",
    options: ["LangChain", "TanStack Start", "Django", "Next.js"],
    answer: 1,
  },
  {
    question: "How is this app hosted?",
    options: ["AWS", "Google Cloud", "Vercel", "Github"],
    answer: 3,
  },
];

function RouteComponent() {
  const [quizState, setQuizState] = useState<"start" | "quizzing" | "end">(
    "start",
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const currentQuestion = questions[currentQuestionIndex];

  function handleSubmit() {
    if (selectedOption === currentQuestion.answer) setScore((prev) => prev + 1);
    if (currentQuestionIndex === questions.length - 1) setQuizState("end");
    else setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedOption(null);
  }

  function resetQuiz() {
    setQuizState("start");
    setCurrentQuestionIndex(0);
    setScore(0);
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {quizState === "start" && (
        <div className="flex flex-col gap-10">
          <h1 className="font-semibold text-5xl">Mini Quiz</h1>
          <button
            onClick={() => setQuizState("quizzing")}
            className="px-5 py-2 rounded-md bg-gray-200 text-black text-2xl font-semibold"
          >
            Play
          </button>
        </div>
      )}
      {quizState === "quizzing" && (
        <div className="flex flex-col gap-10 justify-center items-center">
          <h1 className="font-semibold text-2xl">{currentQuestion.question}</h1>
          <div className="flex gap-3">
            {currentQuestion.options.map((option, optionIndex) => (
              <button
                onClick={() => {
                  setSelectedOption(optionIndex);
                }}
                className={`px-5 py-16 rounded-md w-64 text-black font-semibold text-xl ${optionIndex === selectedOption ? "bg-blue-300" : "bg-gray-200"}`}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="font-semibold w-32 py-4 bg-gray-200 text-black rounded-md"
          >
            Submit
          </button>
        </div>
      )}
      {quizState === "end" && (
        <div className="flex flex-col gap-5">
          <h1 className="font-semibold text-3xl">Score: {score}</h1>
          <button
            onClick={resetQuiz}
            className="bg-gray-200 px-5 py-3 text-black font-semibold rounded-md"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
