import { useEffect, useRef, useState } from "react";


export const useCrushTheMole = () => {
    const [randomIndex, setRandomIndex] = useState<number>(0);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [hitIndex, setHitIndex] = useState<number | null>(null);

    const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        return () => {
            if (timerId.current) clearTimeout(timerId.current);
        };
    }, []);

    function generateRandomIndex(exclude: number, max: number = 15) {
        if (max === 0) return 0;
        let newIndex = exclude;
        while (newIndex === exclude) {
            newIndex = Math.floor(Math.random() * (max + 1));
        }

        return newIndex;
    }

    function generateRandomTime(min = 500, max = 1000) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function showMole() {
        const delay = generateRandomTime();
        timerId.current = setTimeout(() => {
            setRandomIndex((prev) => generateRandomIndex(prev));
            showMole();
        }, delay);
    }

    function startGame() {
        setScore(0);
        showMole();
    }

    function stopGame() {
        if (timerId.current) clearTimeout(timerId.current);
    }

    function handleHit() {
        setHitIndex(randomIndex);

        setScore((prev) => ++prev);

        if (timerId.current) {
            clearTimeout(timerId.current);
        }

        setRandomIndex((prev) => generateRandomIndex(prev));
        setTimeout(() => setHitIndex(null), 300);
        showMole();
    }

    function toggleGame() {
        if (isStarted) {
            stopGame();
        } else {
            startGame();
        }
        setIsStarted((prev) => !prev);
    }

    return { randomIndex, hitIndex, score, toggleGame, isStarted, handleHit }
};

