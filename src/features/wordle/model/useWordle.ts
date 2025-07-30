import { useCallback, useEffect, useRef, useState } from "react";
import type { Letter, Guess, UsedLetters } from "features/wordle/model/types";
import { WORDS } from "features/wordle/model/constants";

export const useWordle = (winningGuess: string, setNewWinningGuess: () => void) => {
    console.log("winning word:", winningGuess)
    const NUMBER_OF_GUESSES = 6;
    const WORD_LENGTH = 5;

    const [isWin, setIsWin] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);

    const [usedLetters, setUsedLetters] = useState<UsedLetters>({})
    const [currentGuess, setCurrentGuess] = useState<Letter[]>([]);
    const [guesses, setGuesses] = useState<Guess[]>([]);

    const [errorMsg, setErrorMsg] = useState<string>("");

    const currentGuessRef = useRef(currentGuess);
    const guessesRef = useRef(guesses);

    useEffect(() => {
        currentGuessRef.current = currentGuess;
        guessesRef.current = guesses;
    }, [currentGuess, guesses]);

    const getLetterStatus = useCallback(({ pos, letter }: { pos: number, letter: string }) => {
        if (winningGuess[pos] === letter) return "correct";
        if (winningGuess.includes(letter)) return "almost";
        return "wrong";
    }, [winningGuess])

    const checkGuess = useCallback(() => {
        const guess = currentGuessRef.current;

        if (guess.length < 5) {
            setErrorMsg("Word must be at least 5 chars long!")
            return
        };

        const guessString = guess.reduce((acc, letter) => acc += letter.key, "").toLowerCase();
        if (!WORDS.includes(guessString)) {
            setErrorMsg("Word not found in dictionary!")
            return;
        }

        const checkedGuess = guess.map((letterObj, i) => ({ ...letterObj, status: getLetterStatus({ pos: i, letter: letterObj.key }) })) as Letter[]

        setUsedLetters((prev) => {
            const newLetters = {} as UsedLetters;
            checkedGuess.forEach((letter) => {
                if (!Object.keys(prev).includes(letter.key)) {
                    newLetters[letter.key] = letter.status
                }
            });

            return { ...prev, ...newLetters }
        })


        const guesses = guessesRef.current;
        setGuesses([...guesses, checkedGuess]);
        if (checkedGuess.every((letter) => letter.status === "correct")) {
            setIsWin(true);
            setShowModal(true)
            return;
        }
        console.log(guesses.length)
        if (guesses.length + 1 === NUMBER_OF_GUESSES) {
            setShowModal(true)
            return;
        }

        setCurrentGuess([]);
    }, [getLetterStatus])

    function deleteLetter() {
        const guess = currentGuessRef.current;
        setCurrentGuess(guess.slice(0, guess.length - 1));
    }

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (guessesRef.current.length === NUMBER_OF_GUESSES) return;

            const key = event.key;
            console.log(key);
            if (key === "Backspace") {
                deleteLetter();
                return;
            }

            if (key === "Enter") {
                checkGuess();
                return;
            }

            const isLetter = /^[a-zA-Z]$/.test(key);
            const guess = currentGuessRef.current;

            if (isLetter && guess.length < WORD_LENGTH) {
                setCurrentGuess((prev) => [...prev, { key: key.toLowerCase(), status: "unchecked" }]);
            }
        }

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [checkGuess]);


    function resetGame() {
        setShowModal(false);
        setGuesses([]);
        setCurrentGuess([]);
        setIsWin(false)
        setUsedLetters({})
        setNewWinningGuess()
    }

    function clearErrorMsg() {
        setErrorMsg("")
    }

    return { currentGuess, guesses, usedLetters, isWin, showModal, resetGame, errorMsg, clearErrorMsg, NUMBER_OF_GUESSES, WORD_LENGTH }
}