import type { SquareValue } from "@/features/tictactoe/model/types";

export const Square = ({
  value,
  onSquareClick,
}: {
  value: SquareValue;
  onSquareClick: () => void;
}) => {
  return (
    <button
      className="w-full h-full aspect-square sm:w-24 sm:h-24 bg-white border border-gray-300 rounded-md text-2xl font-semibold 
             flex items-center justify-center hover:bg-gray-100 transition-colors"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};
