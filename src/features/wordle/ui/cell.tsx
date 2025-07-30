import type { Status } from "features/wordle/model/types";

export const Cell = ({
  status,
  letter,
}: {
  status?: Status;
  letter?: string;
}) => {
  return (
    <div
      className={`flex items-center justify-center text-lg capitalize w-12 h-12 border-2 border-gray-400 ${status}`}
    >
      {letter}
    </div>
  );
};
