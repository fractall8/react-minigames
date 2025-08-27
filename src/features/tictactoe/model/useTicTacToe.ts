import { useCallback, useEffect, useReducer } from "react";
import type { SquareValue, Squares, TicTacToeState, TicTacToeAction, TicTacToeBot } from "features/tictactoe/model/types"

const INITIAL_BOARD = new Array(9).fill(null);

function calculateWinner(squares: Squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// Difficulty: easy
const randomBot: TicTacToeBot = (board) => {
    const free = board
        .map((v, i) => (v ? null : i))
        .filter((v) => v !== null);
    return free[Math.floor(Math.random() * free.length)];
};

// If bot tries to place his mark in corners first - Difficulty: hard
// If in sides - Difficulty: medium
const findBestMoveBot: TicTacToeBot = (board, botMark) => {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            const temp = board.slice();
            temp[i] = botMark;
            if (calculateWinner(temp) === botMark) return i;
        }
    }

    const playerMark = botMark === "X" ? "O" : "X";
    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            const temp = board.slice();
            temp[i] = playerMark;
            if (calculateWinner(temp) === playerMark) return i;
        }
    }

    if (board[4] === null) return 4;

    // place mark in one of corners
    for (const i of [0, 2, 6, 8]) {
        if (board[i] === null) return i;
    }

    // place mark in one of sides
    for (const i of [1, 3, 5, 7]) {
        if (board[i] === null) return i;
    }

    return -1;
};

function minmax(
    board: Squares,
    botMark: SquareValue,
    isBotTurn: boolean
): { score: number; move: number } {
    const winner = calculateWinner(board);
    const playerMark = botMark === "X" ? "O" : "X";

    if (winner === botMark) return { score: 1, move: -1 };
    if (winner && winner !== botMark) return { score: -1, move: -1 };
    if (board.every(Boolean)) return { score: 0, move: -1 };

    let bestScore = isBotTurn ? -Infinity : Infinity;
    let bestMove = -1;

    for (let i = 0; i < board.length; i++) {
        if (board[i] !== null) continue;

        const next = [...board];
        next[i] = isBotTurn ? botMark : playerMark;

        const { score } = minmax(next, botMark, !isBotTurn);

        if (isBotTurn && score > bestScore) {
            bestScore = score;
            bestMove = i;
        }
        if (!isBotTurn && score < bestScore) {
            bestScore = score;
            bestMove = i;
        }
    }

    return { score: bestScore, move: bestMove };
}

const impossibleBot: TicTacToeBot = (board, botMark) => {
    const index = minmax(board, botMark, true).move;

    return index;
};

function gameReducer(state: TicTacToeState, action: TicTacToeAction): TicTacToeState {
    switch (action.type) {
        case "MOVE": {
            const { history, currentMove } = state;
            const nextSquares = history[currentMove].slice();
            if (calculateWinner(nextSquares) || nextSquares[action.index])
                return state;

            const isXNext = currentMove % 2 === 0;
            nextSquares[action.index] = isXNext ? "X" : "O";
            const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
            return { ...state, currentMove: currentMove + 1, history: nextHistory };
        }
        case "JUMP": {
            return { ...state, currentMove: action.move };
        }
        case "RESET": {
            return {
                ...state,
                currentMove: 0,
                history: [INITIAL_BOARD],
                botMark: "O",
            };
        }
        case "SET_BOT_MARK": {
            return { ...state, botMark: action.mark };
        }
        case "SET_IS_BOT_ENABLED": {
            return { ...state, isBotEnabled: action.isBotEnabled };
        }
        default:
            return state;
    }
}

const useTicTacToe = (defaultBotEnabled: boolean = true) => {
    const initialState: TicTacToeState = {
        currentMove: 0,
        history: [INITIAL_BOARD],
        isBotEnabled: defaultBotEnabled,
        botMark: "O",
    };
    const [{ history, currentMove, botMark, isBotEnabled }, dispatch] =
        useReducer(gameReducer, initialState);

    const isXNext = currentMove % 2 === 0;
    const isBotMove =
        isBotEnabled &&
        ((botMark === "O" && !isXNext) || (botMark === "X" && isXNext));

    const playerMove = useCallback(
        (index: number) => {
            if (isBotMove) return;
            dispatch({ type: "MOVE", index });
        },
        [isBotMove]
    );

    const botMove = useCallback(
        (index: number) => dispatch({ type: "MOVE", index }),
        []
    );

    const jump = useCallback(
        (move: number) => dispatch({ type: "JUMP", move }),
        []
    );
    const reset = useCallback(() => dispatch({ type: "RESET" }), []);
    const setBotMark = useCallback(
        (mark: "X" | "O") => dispatch({ type: "SET_BOT_MARK", mark }),
        []
    );
    const setIsBotEnabled = useCallback(
        (isBotEnabled: boolean) =>
            dispatch({ type: "SET_IS_BOT_ENABLED", isBotEnabled }),
        []
    );

    useEffect(() => {
        if (
            (botMark === "O" && isXNext) ||
            (botMark === "X" && !isXNext) ||
            !isBotEnabled
        )
            return;
        const index = impossibleBot(history[currentMove], botMark);
        setTimeout(() => {
            if (index !== -1) botMove(index);
        }, 300);
    }, [currentMove, history, botMove, isXNext, botMark, isBotEnabled]);

    return {
        history,
        currentMove,
        playerMove,
        jump,
        reset,
        isXNext,
        dispatch,
        calculateWinner,
        setBotMark,
        isBotEnabled,
        setIsBotEnabled,
    };
};

export default useTicTacToe;
