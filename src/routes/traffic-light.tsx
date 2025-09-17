import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/traffic-light")({
  component: RouteComponent,
});

type Color = "red" | "yellow" | "green";

function RouteComponent() {
  const [onLight, setOnLight] = useState<Color>("green");

  useEffect(() => {
    setInterval(() => {
      setOnLight("green");
    }, 7000);

    setTimeout(() => {
      setOnLight("yellow");
      setInterval(() => {
        setOnLight("yellow");
      }, 7000);
    }, 3000);

    setTimeout(() => {
      setOnLight("red");
      setInterval(() => {
        setOnLight("red");
      }, 7000);
    }, 4000);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="rounded-full bg-black opacity-75 p-3 flex flex-col gap-2">
        <div
          className={`rounded-full w-24 h-24 ${onLight === "red" ? "bg-red-500" : "bg-red-950"}`}
        ></div>
        <div
          className={`rounded-full w-24 h-24 ${onLight === "yellow" ? "bg-yellow-400" : "bg-yellow-950"}`}
        ></div>
        <div
          className={`rounded-full w-24 h-24 ${onLight === "green" ? "bg-green-400" : "bg-green-950"}`}
        ></div>
      </div>
    </div>
  );
}
