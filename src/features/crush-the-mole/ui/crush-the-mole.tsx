import { useCrushTheMole } from "@/features/crush-the-mole/model/useCrushTheMole";

const elements = Array(16).fill(0);

export function CrushTheMole() {
  const { randomIndex, hitIndex, isStarted, score, toggleGame, handleHit } =
    useCrushTheMole();

  return (
    <div className="flex flex-col justify-center w-fit">
      <p className="text-2xl font-bold text-center my-4">Score: {score}</p>
      <button
        className="mb-4 px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold transition hover:cursor-pointer"
        onClick={toggleGame}
      >
        {isStarted ? "Stop Game" : "Start Game"}
      </button>

      <div className="grid grid-cols-4 gap-4 mt-4">
        {elements.map((_, index) => {
          const isMole = index === randomIndex;
          const isHit = index === hitIndex;

          return (
            <div
              key={index}
              className={`relative w-20 h-20 flex items-center justify-center rounded-full text-3xl transition-all duration-200 select-none border-2 overflow-hidden
          ${
            isHit
              ? "bg-red-500 text-white animate-ping"
              : isMole
              ? "bg-yellow-200 shadow-lg hover:scale-110 cursor-pointer animate-bounce"
              : "bg-gray-800 text-black shadow-inner"
          }`}
              onClick={() => {
                if (isStarted && isMole) {
                  handleHit();
                }
              }}
            >
              {isHit ? "💥" : isMole ? "🐹" : "🕳️"}
            </div>
          );
        })}
      </div>
    </div>
  );
}
