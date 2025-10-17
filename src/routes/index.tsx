import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const minigames = [
    {
      path: "/rock-paper-scissors",
      title: "Rock Paper Scissors",
    },
    {
      path: "/stopwatch",
      title: "Stopwatch",
    },
    {
      path: "/dice",
      title: "Dice",
    },
    {
      path: "/traffic-light",
      title: "Traffic Light",
    },
    {
      path: "/quote-generator",
      title: "Quote Generator",
    },
    {
      path: "/gradient",
      title: "Gradient",
    },
    {
      path: "/tic-tac-toe",
      title: "Tic Tac Toe",
    },
    {
      path: "/wack-a-mole",
      title: "Wack A Mole",
    },
    {
      path: "/quiz",
      title: "Quiz",
    },
    {
      path: "/expenses",
      title: "Expenses",
    },
    {
      path: "/calculator",
      title: "Calculator",
    },
    {
      path: "/hangman",
      title: "Hangman",
    },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-rows-5 grid-cols-4 h-3/5 w-3/5 gap-5 p-2">
        {minigames.map((game) => (
          <Link
            to={game.path}
            key={game.path}
            className="px-8 py-3 bg-gray-400 text-black font-semibold rounded-md text-center"
          >
            {game.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
