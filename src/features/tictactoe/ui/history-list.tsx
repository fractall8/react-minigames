import type { Squares } from "@/features/tictactoe/model/types";
import { MoveRight } from "lucide-react";

export const HistoryList = ({
  history,
  jump,
}: {
  history: Squares[];
  jump: (move: number) => void;
}) => {
  return (
    <ul className="flex flex-col gap-2 max-w-xs mt-4">
      {history.map((_, move) =>
        move > 0 ? (
          <li
            key={move}
            onClick={() => jump(move)}
            className={`flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-md cursor-pointer 
                   hover:bg-gray-100 hover:border-gray-300 transition-colors`}
          >
            <MoveRight size="1rem" />
            <p>Go to move №{move}</p>
          </li>
        ) : null
      )}
    </ul>
  );
};
