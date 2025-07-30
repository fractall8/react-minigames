import { useEffect, useState } from "react";
import { Grid, Keyboard, Modal } from "@/features/wordle/ui";
import { useWordle } from "@/features/wordle/model/useWordle";
import { WORDS } from "@/features/wordle/model/constants";

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
    errorMsg,
    clearErrorMsg,
    WORD_LENGTH,
    NUMBER_OF_GUESSES,
  } = useWordle(solution, getRandomWord);

  useEffect(() => {
    if (!errorMsg) return;

    const timer = setTimeout(() => clearErrorMsg(), 2500);

    return () => clearTimeout(timer);
  }, [errorMsg, clearErrorMsg]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
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
      {errorMsg && (
        <div className="fixed top-8 left-[50%] translate-x-[-50%] z-10 bg-black/80 rounded-lg text-white flex items-center px-4 py-2 gap-4">
          <p>{errorMsg}</p>
          <button className="hover:cursor-pointer" onClick={clearErrorMsg}>
            x
          </button>
        </div>
      )}
      <Keyboard usedLetters={usedLetters} />
    </div>
  );
}
