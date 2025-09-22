import { createFileRoute } from "@tanstack/react-router";
import { X, Circle } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/tic-tac-toe")({
  component: RouteComponent,
});

type Counter = "X" | "O" | "";

const emptyBoard: Counter[][] = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function RouteComponent() {
  const [board, setBoard] = useState<Counter[][]>(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState<boolean>(true);
  const [gameState, setGameState] = useState<"playing" | "done">("playing");
  const [winner, setWinner] = useState<Counter>("");

  useEffect(() => {
    if (checkState()) setGameState("done");
  }, [board]);

  function updateBoard(row: number, col: number) {
    setBoard((prevBoard) => {
      const newBoard = structuredClone(prevBoard);
      if (currentPlayer) newBoard[row][col] = "X";
      else newBoard[row][col] = "O";

      return newBoard;
    });
  }

  function checkState() {
    if (checkWinner()) return true;

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "") return false;
      }
    }
    return true;
  }

  function checkLine(line: Counter[]) {
    console.log(line);
    if (line[0] !== "" && line[0] === line[1] && line[1] === line[2]) {
      setWinner(line[0]);
      return true;
    }
    return false;
  }

  function checkWinner() {
    console.log("mark");
    for (let i = 0; i < board.length; i++) {
      if (checkLine(board[i])) return true;
      if (checkLine([board[0][i], board[1][i], board[2][i]])) return true;
    }
    checkLine([board[0][0], board[1][1], board[2][2]]);
    checkLine([board[0][2], board[1][1], board[2][0]]);
    return false;
  }

  function handleGridClick(row: number, col: number) {
    if (board[row][col] || gameState === "done") return;
    updateBoard(row, col);
    setCurrentPlayer((prev) => !prev);
  }

  return (
    <div className="h-screen w-screen flex flex-col gap-10 justify-center items-center">
      {gameState === "done" && (
        <h1 className="font-semibold text-xl flex gap-1">
          {winner === "" ? (
            "It's a draw!"
          ) : winner === "X" ? (
            <>
              <X /> <span>wins!</span>
            </>
          ) : (
            <>
              <Circle /> <span>wins!</span>
            </>
          )}
        </h1>
      )}
      <div className="h-[400px] w-[400px] grid grid-cols-3 grid-rows-3 bg-gray-700 rounded-md p-5 gap-5">
        {board.map((row, rowIndex) =>
          row.map((_, colIndex) => (
            <button
              key={`${rowIndex}${colIndex}`}
              onClick={() => handleGridClick(rowIndex, colIndex)}
              className="flex justify-center items-center bg-white rounded-md"
            >
              {!board[rowIndex][colIndex] ? (
                ""
              ) : board[rowIndex][colIndex] === "X" ? (
                <X color="black" size={64} />
              ) : (
                <Circle color="black" size={64} />
              )}
            </button>
          )),
        )}
      </div>
    </div>
  );
}
