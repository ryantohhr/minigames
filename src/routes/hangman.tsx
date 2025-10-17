import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/hangman")({
  component: RouteComponent,
});

const blankWord = Array(5).fill("");

const wordBank = ["hello", "adieu", "scope"];

type Word = {
  word: string;
  guess: string[];
  answer: string[];
};

function RouteComponent() {
  const randomIndex = Math.floor(Math.random() * wordBank.length);
  const chosenWord = wordBank[randomIndex];
  const [gameState, setGameState] = useState<"playing" | "win" | "lose">(
    "playing",
  );
  const [word, setWord] = useState<Word>({
    word: chosenWord,
    guess: Array(5).fill(""),
    answer: chosenWord.split(""),
  });
  const [guessed, setGuessed] = useState<string>("");
  const [guessCount, setGuessCount] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<string>("");

  useEffect(() => {
    function updateWord() {
      setWord({
        ...word,
        guess: word.answer.map((letter) =>
          guessed.includes(letter) ? letter : "",
        ),
      });
    }

    updateWord();
  }, [guessed]);

  useEffect(() => {
    function checkWin() {
      if (word.answer[0] !== "" && word.guess.join("") == word.word)
        setGameState("win");
      else if (guessCount >= 5) setGameState("lose");
      else return;
    }

    checkWin();
  }, [word]);

  function handleGuess() {
    setGuessed((prev) => prev + currentGuess);
    setGuessCount((prev) => prev + 1);
    setCurrentGuess("");
  }

  function resetGame() {
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    const chosenWord = wordBank[randomIndex];

    setGameState("playing");
    setWord({
      word: chosenWord,
      guess: Array(5).fill(""),
      answer: chosenWord.split(""),
    });
    setGuessed("");
    setGuessCount(0);
    setCurrentGuess("");
  }

  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-col items-center gap-5">
        {gameState === "playing" ? (
          <>
            <div className="flex gap-3 justify-center">
              {word.guess.map((letter, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center bg-gray-400 rounded-md w-16 h-16 text-black text-xl font-semibold text-center"
                >
                  {letter}
                </div>
              ))}
            </div>
            <div className="flex gap-10">
              <input
                type="text"
                value={currentGuess}
                onChange={(e) => setCurrentGuess(e.target.value)}
                maxLength={1}
                className="px-5 w-20 text-center font-semibold rounded-md"
              />
              <button
                value={currentGuess}
                onClick={handleGuess}
                className="bg-gray-400 text-black rounded-md px-5 py-2"
              >
                Guess
              </button>
            </div>
            <div>Guesses remaining: {5 - guessCount}</div>
          </>
        ) : (
          <>
            <div className="flex gap-3 justify-center">
              {word.answer.map((letter, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center bg-gray-400 rounded-md w-16 h-16 text-black text-xl font-semibold text-center"
                >
                  {letter}
                </div>
              ))}
            </div>
            <h2 className="font-semibold text-2xl">
              You {gameState === "win" ? "won" : "lost"}! The word is "
              {word.word}"
            </h2>
            <button
              onClick={resetGame}
              className="bg-gray-400 text-black px-5 py-3 rounded-md"
            >
              Play Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
