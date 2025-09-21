import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/gradient")({
  component: RouteComponent,
});

function RouteComponent() {
  const [from, setFrom] = useState("#ffffff");
  const [to, setTo] = useState("#000000");
  const [direction, setDirection] = useState("right");

  return (
    <div className="w-screen h-screen p-20 flex gap-10 ">
      <div className="rounded-md bg-gray-800 p-5 gap-5 w-3/10 flex flex-col">
        <div>
          <h2 className="font-semibold">From Hex</h2>
          <input onChange={(e) => setFrom(e.target.value)} type="text" />
        </div>
        <div>
          <h2 className="font-semibold">To Hex</h2>
          <input onChange={(e) => setTo(e.target.value)} type="text" />
        </div>
        <div>
          <h2 className="font-semibold">Direction</h2>
          <select
            onChange={(e) => setDirection(e.target.value)}
            className="w-full"
          >
            <option value="right">Left to Right</option>
            <option value="left">Right to Left</option>
            <option value="bottom">Top to Bottom</option>
            <option value="top">Bottom to Top</option>
          </select>
        </div>
      </div>
      <div
        className={`rounded-md flex grow`}
        style={{
          backgroundImage: `linear-gradient(to ${direction}, ${from}, ${to})`,
        }}
      ></div>
    </div>
  );
}
