import { letters } from "features/wordle/model/constants";
import { Fragment } from "react/jsx-runtime";
import type { UsedLetters } from "features/wordle/model/types";

export const Keyboard = ({ usedLetters }: { usedLetters: UsedLetters }) => {
  function handleKeyClick(key: string) {
    document.dispatchEvent(new KeyboardEvent("keydown", { key }));
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      {letters.map((keyRow, i) => (
        <div className="flex gap-2" key={`keyRow-${i}`}>
          {keyRow.map((key, i) => (
            <Fragment key={`key-${i}`}>
              {key === "Enter" || key === "Backspace" ? (
                <div
                  onClick={() => handleKeyClick(key)}
                  className="flex items-center justify-center w-20 h-12 bg-gray-100 border-b-black border-1 rounded-lg hover:cursor-pointer"
                >
                  {key}
                </div>
              ) : (
                <div
                  className={`capitalize flex items-center justify-center w-12 h-12 bg-gray-100 border-b-black border-1 rounded-lg hover:cursor-pointer ${
                    usedLetters?.[key] ? usedLetters[key] : ""
                  }`}
                  onClick={() => handleKeyClick(key)}
                >
                  {key}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};
