import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/dice")({
  component: RouteComponent,
});

function RouteComponent() {
  const [roll, setRoll] = useState<number>(6);

  function handleRoll() {
    setRoll(Math.ceil(Math.random() * 6));
  }

  function renderDie() {
    switch (roll) {
      case 1:
        return (
          <div className="bg-white flex justify-center items-center rounded-md w-24 h-24">
            <Dot />
          </div>
        );
      case 2:
        return (
          <div className="bg-white flex justify-center items-center rounded-md w-24 h-24">
            <div className="flex justify-center items-end h-full w-full p-4">
              <Dot />
            </div>
            <div className="flex justify-center items-start h-full w-full p-4">
              <Dot />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="bg-white flex justify-center items-center rounded-md w-24 h-24">
            <div className="flex justify-center items-end h-full w-full pb-4 pl-4">
              <Dot />
            </div>
            <div className="flex justify-center items-center h-full w-full">
              <Dot />
            </div>
            <div className="flex justify-center items-start h-full w-full pt-4 pr-4">
              <Dot />
            </div>{" "}
          </div>
        );
      case 4:
        return (
          <div className="bg-white flex flex-col justify-center items-center rounded-md w-24 h-24">
            <div className="flex justify-between items-center p-4 h-full w-full">
              <Dot />
              <Dot />
            </div>
            <div className="flex justify-between items-center p-4 h-full w-full">
              <Dot />
              <Dot />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="bg-white flex flex-col justify-center items-center rounded-md w-24 h-24">
            <div className="flex justify-between items-center h-full w-full pt-4 px-4">
              <Dot />
              <Dot />
            </div>
            <div className="flex justify-center items-center h-full w-full">
              <Dot />
            </div>
            <div className="flex justify-between items-center h-full w-full pb-4 px-4">
              <Dot />
              <Dot />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="bg-white flex justify-center items-center rounded-md w-24 h-24">
            <div className="flex flex-col justify-between items-center p-4 h-full w-full">
              <Dot />
              <Dot />
              <Dot />
            </div>
            <div className="flex flex-col justify-between items-center p-4 h-full w-full">
              <Dot />
              <Dot />
              <Dot />
            </div>
          </div>
        );
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full h-screen justify-center items-center">
      <button onClick={handleRoll}>Roll</button>
      {renderDie()}
    </div>
  );
}

function Dot() {
  return <div className="bg-black rounded-full h-4 w-4"></div>;
}
