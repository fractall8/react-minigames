import { memo } from "react";
import { Cell } from "features/wordle/ui/cell";
import type { Guess } from "features/wordle/model/types";

export const Row = memo(
  ({
    guess,
    wordLength,
  }: {
    guess?: Guess;

    wordLength: number;
  }) => {
    return (
      <div className="flex gap-2">
        {[...Array(wordLength)].map((_, i) => (
          <Cell key={i} status={guess?.[i]?.status} letter={guess?.[i]?.key} />
        ))}
      </div>
    );
  }
);
