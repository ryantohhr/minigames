import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/quote-generator")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending, isError, isSuccess, data, error, refetch } = useQuery({
    queryKey: ["quotes"],
    queryFn: getNewQuote,
    refetchOnMount: false,
  });

  async function getNewQuote() {
    const res = await fetch("https://api.gameofthronesquotes.xyz/v1/random");
    if (!res.ok) {
      throw new Error("Error fetching quote");
    }
    const data = await res.json();
    return data.sentence;
  }

  if (isError) return `Error: ${error}`;

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex flex-col items-center justify-center gap-12 p-5 w-3/5 h-2/5 border-2 border-gray-300 rounded-lg">
        <h1 className="text-center font-semibold text-lg">
          {isPending && "..."}
          {isSuccess && data}
        </h1>
        <button
          onClick={() => refetch()}
          className="rounded-md bg-gray-300 text-black px-5 py-2 font-semibold"
        >
          Get Quote
        </button>
      </div>
    </div>
  );
}
