import type { Status } from "features/wordle/model/types";
import clsx from "clsx";

export const Cell = ({
  status,
  letter,
}: {
  status?: Status;
  letter?: string;
}) => {
  return (
    <div
      className={clsx(
        "w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center border-2 rounded font-bold text-2xl uppercase select-none transition-colors duration-500 ease-in-out transform",
        status === "correct" && "bg-green-500 text-white border-green-500",
        status === "almost" && "bg-yellow-500 text-white border-yellow-500",
        status === "wrong" && "bg-gray-500 text-white border-gray-500",
        (!status || status === "unchecked") &&
          "bg-white text-black border-gray-300"
      )}
    >
      {letter}
    </div>
  );
};
