import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/wack-a-mole")({
  component: RouteComponent,
});

const grid = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

function RouteComponent() {
  const [currentActive, setCurrentActive] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    setInterval(() => {
      const [rowIndex, colIndex] = chooseRandomCell();
      setCurrentActive(`${rowIndex}${colIndex}`);
      setTimeout(() => {
        setCurrentActive("");
      }, 1000);
    }, 2000);
  }, []);

  function chooseRandomCell() {
    const rowIndex = Math.floor(Math.random() * 4);
    const colIndex = Math.floor(Math.random() * 4);

    return [rowIndex, colIndex];
  }

  function handleClick(value: string) {
    if (value === currentActive) {
      setScore((prev) => prev + 1);
      setCurrentActive("");
    }
  }

  return (
    <div className="h-screen w-screen flex gap-5 justify-center items-center">
      <div className="flex flex-col items-center gap-10">
        <div className="font-semibold text-2xl">Score: {score}</div>
        <div className="grid grid-rows-4 grid-cols-4 h-[550px] w-[550px] gap-4">
          {grid.map((row, rowIndex) =>
            row.map((_, colIndex) => (
              <button
                key={`${rowIndex}${colIndex}`}
                onClick={() => handleClick(`${rowIndex}${colIndex}`)}
                className="border-2 border-gray-300 rounded-md"
              >
                {currentActive === `${rowIndex}${colIndex}` ? (
                  <span className="text-5xl">🐹</span>
                ) : (
                  ""
                )}
              </button>
            )),
          )}
        </div>
      </div>
    </div>
  );
}
