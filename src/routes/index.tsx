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
  ];

  return (
    <div className="p-2">
      {minigames.map((game) => (
        <Link to={game.path} key={game.path}>
          {game.title}
        </Link>
      ))}
    </div>
  );
}
