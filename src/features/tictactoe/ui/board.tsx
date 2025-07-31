import { Square } from "@/features/tictactoe/ui";
import type { Squares } from "@/features/tictactoe/model/types";

export const Board = ({
  squares,
  onMove,
}: {
  squares: Squares;
  onMove: (index: number) => void;
}) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-2 w-full max-w-xs aspect-square">
        {squares.map((squareValue, i) => (
          <Square key={i} value={squareValue} onSquareClick={() => onMove(i)} />
        ))}
      </div>
    </>
  );
};
