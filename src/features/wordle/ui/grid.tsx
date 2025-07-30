import { Row } from "features/wordle/ui";
import type { Guess } from "features/wordle/model/types";

export function Grid({
  currentGuess,
  guesses,
  wordLength,
  numberOfGuesses,
}: {
  currentGuess: Guess;
  guesses: Guess[];
  wordLength: number;
  numberOfGuesses: number;
}) {
  return (
    <div className="flex flex-col gap-2 w-fit">
      {guesses.length !== numberOfGuesses ? (
        <>
          {guesses.map((guess, i) => (
            <Row key={`row-${i}`} guess={guess} wordLength={wordLength} />
          ))}
          {[...Array(numberOfGuesses - guesses.length)].map((_, i) => (
            <Row
              key={`empty-row-${i}`}
              guess={i === 0 && currentGuess ? currentGuess : []}
              wordLength={wordLength}
            />
          ))}
        </>
      ) : (
        <>
          {guesses.map((guess, i) => (
            <Row key={`row-${i}`} guess={guess} wordLength={wordLength} />
          ))}
        </>
      )}
    </div>
  );
}
