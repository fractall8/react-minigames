import { Fragment } from "react/jsx-runtime";
import { letters } from "features/wordle/model/constants";
import type { UsedLetters } from "features/wordle/model/types";
import { cn } from "@/shared/utils";
import { Delete } from "lucide-react";

export const Keyboard = ({ usedLetters }: { usedLetters: UsedLetters }) => {
  function handleKeyClick(key: string) {
    document.dispatchEvent(new KeyboardEvent("keydown", { key }));
  }

  return (
    <div className="flex flex-col gap-2 items-center select-none">
      {letters.map((keyRow: string[], i: number) => (
        <div className="flex gap-2" key={`keyRow-${i}`}>
          {keyRow.map((key, j) => (
            <Fragment key={`key-${j}`}>
              <div
                onClick={() => handleKeyClick(key)}
                className={cn(
                  "flex items-center justify-center rounded-md text-sm font-semibold uppercase transition-colors duration-200 ease-in-out",
                  "border border-neutral-300 shadow-sm hover:brightness-95 active:scale-95 hover:cursor-pointer",
                  key === "Enter" || key === "Backspace"
                    ? "w-16 h-12 bg-neutral-300"
                    : "w-10 h-12",
                  usedLetters?.[key] === "correct" && "bg-green-500 text-white",
                  usedLetters?.[key] === "almost" && "bg-yellow-400 text-white",
                  usedLetters?.[key] === "wrong" && "bg-gray-400 text-white",
                  !usedLetters?.[key] && "bg-neutral-100 text-black"
                )}
              >
                {key === "Backspace" ? <Delete /> : key}
              </div>
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};
