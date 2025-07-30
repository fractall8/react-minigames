import { Grid } from "features/wordle/ui/grid";
import { useWordle } from "features/wordle/model/useWordle";
import { Keyboard } from "features/wordle/ui/keyboard";
import { Modal } from "./modal";
import { WORDS } from "../model/constants";
import { useEffect, useState } from "react";

// Temporary constant, will be received from backend

export function Wordle() {
  const [solution, setSolution] = useState<string>("");

  function getRandomWord() {
    const RIGHT_GUESS_STRING = WORDS[Math.floor(Math.random() * WORDS.length)];
    setSolution(RIGHT_GUESS_STRING);
  }

  useEffect(() => {
    getRandomWord();
  }, []);

  const {
    currentGuess,
    guesses,
    usedLetters,
    showModal,
    isWin,
    resetGame,
    WORD_LENGTH,
    NUMBER_OF_GUESSES,
  } = useWordle(solution, getRandomWord);

  return (
    <>
      <Grid
        currentGuess={currentGuess}
        guesses={guesses}
        wordLength={WORD_LENGTH}
        numberOfGuesses={NUMBER_OF_GUESSES}
      />
      {showModal && (
        <Modal
          isWin={isWin}
          resetGame={resetGame}
          solution={solution}
          turn={guesses.length}
        />
      )}
      <Keyboard usedLetters={usedLetters} />
    </>
  );
}
