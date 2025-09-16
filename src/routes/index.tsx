import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const minigames = [
    {
      path: "/rock-paper-scissors",
      title: " Rock Paper Scissors",
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
