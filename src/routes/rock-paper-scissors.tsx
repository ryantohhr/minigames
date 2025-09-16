import { createFileRoute } from "@tanstack/react-router";
import {
  BrickWall,
  Handshake,
  Scissors,
  Scroll,
  Trash,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/rock-paper-scissors")({
  component: RouteComponent,
});

type Weapon = "rock" | "paper" | "scissors";
const weapons = ["rock", "paper", "scissors"] as const;

function RouteComponent() {
  const [playerChoice, setPlayerChoice] = useState<Weapon | null>(null);
  const [comChoice, setComChoice] = useState<Weapon | null>(null);
  const [gameState, setGameState] = useState<
    "win" | "lose" | "tie" | "selecting"
  >("selecting");

  useEffect(() => {
    if (playerChoice) determineWinner();
  }, [comChoice]);

  function handlePlayerChoice(choice: Weapon) {
    setPlayerChoice(choice);
    const randomIndex = Math.floor(Math.random() * weapons.length);
    setComChoice(weapons[randomIndex]);
  }

  function determineWinner() {
    if (playerChoice === comChoice) {
      setGameState("tie");
    } else if (
      (playerChoice === "rock" && comChoice === "scissors") ||
      (playerChoice === "paper" && comChoice === "rock") ||
      (playerChoice === "scissors" && comChoice === "paper")
    ) {
      setGameState("win");
    } else {
      setGameState("lose");
    }
  }

  function getResult() {
    if (playerChoice === comChoice) {
      return (
        <>
          <h3 className="font-semibold text-lg">It's a tie!</h3>
          <span>
            Your {playerChoice} tied with computer's {comChoice}
          </span>
          <Handshake size={36} />
        </>
      );
    } else if (
      (playerChoice === "rock" && comChoice === "scissors") ||
      (playerChoice === "paper" && comChoice === "rock") ||
      (playerChoice === "scissors" && comChoice === "paper")
    ) {
      return (
        <>
          <h3 className="font-semibold text-lg">You win!</h3>
          <span>
            Your {playerChoice} beat computer's {comChoice}
          </span>
          <Trophy size={36} />
        </>
      );
    } else {
      return (
        <>
          <h3 className="font-semibold text-lg">You lose!</h3>
          <span>
            Your {playerChoice} lost to computer's {comChoice}
          </span>{" "}
          <Trash size={36} />
        </>
      );
    }
  }

  function resetGame() {
    setPlayerChoice(null);
    setComChoice(null);
    setGameState("selecting");
  }

  return (
    <div className="p-2 w-full h-screen flex items-center justify-center">
      {gameState === "selecting" && (
        <div className="flex flex-col gap-10 items-center">
          <h1 className="font-bold text-lg">Pick your weapon</h1>
          <div className="flex gap-4">
            <div
              onClick={() => handlePlayerChoice("rock")}
              className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-md min-h-80 min-w-60 cursor-pointer"
            >
              <BrickWall size={36} />
              Rock
            </div>
            <div
              onClick={() => handlePlayerChoice("paper")}
              className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-md min-h-80 min-w-60 cursor-pointer"
            >
              <Scroll size={36} />
              Paper
            </div>
            <div
              onClick={() => handlePlayerChoice("scissors")}
              className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-md min-h-80 min-w-60 cursor-pointer"
            >
              <Scissors size={36} />
              Scissors
            </div>
          </div>{" "}
        </div>
      )}
      {gameState !== "selecting" && (
        <div className="flex flex-col items-center gap-3">
          {getResult()}
          <button onClick={resetGame} className="">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
