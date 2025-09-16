import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

export const Route = createFileRoute("/stopwatch")({
  component: RouteComponent,
});

function RouteComponent() {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function handleStart() {
    const intervalId = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    intervalRef.current = intervalId;
    setStarted(true);
  }

  function handleStop() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setStarted(false);
  }

  function reset() {
    setTimeElapsed(0);
  }

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-4 border-2 border-gray-300 rounded-md w-1/4 h-1/4">
        <h1>
          <span>{timeElapsed}</span> seconds elapsed
        </h1>
        <div className="flex gap-2 justify-center items-center w-4/5">
          {started ? (
            <>
              <button
                onClick={handleStop}
                className="bg-red-400 hover:bg-red-600 text-black rounded-md px-3 py-1 w-3/8"
              >
                Pause
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleStart}
                className="bg-green-400 hover:bg-green-600 text-black rounded-md px-3 py-1 w-3/8"
              >
                Start
              </button>
              {timeElapsed ? (
                <button
                  onClick={reset}
                  className="bg-gray-400 hover:bg-gray-600 text-black rounded-md px-3 py-1 w-3/8"
                >
                  Reset
                </button>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
