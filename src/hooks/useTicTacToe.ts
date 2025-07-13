import { useCallback, useReducer } from "react";

export type SquareValue = "X" | "O" | null;
export type Squares = SquareValue[];

type State = { currentMove: number; history: SquareValue[][] };

type Action =
    | { type: "MOVE"; index: number }
    | { type: "JUMP"; move: number }
    | { type: "RESET" };


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

function gameReducer(state: State, action: Action): State {
    switch (action.type) {
        case "MOVE": {
            const { history, currentMove } = state;
            const nextSquares = history[currentMove].slice();
            if (calculateWinner(nextSquares) || nextSquares[action.index])
                return state;

            const isXNext = currentMove % 2 === 0;
            nextSquares[action.index] = isXNext ? "X" : "O";
            const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
            return { currentMove: currentMove + 1, history: nextHistory };
        }
        case "JUMP": {
            return { ...state, currentMove: action.move };
        }
        case "RESET": {
            return { currentMove: 0, history: [INITIAL_BOARD] };
        }
        default:
            return state;
    }
}

const useTicTacToe = () => {
    const initialState: State = { currentMove: 0, history: [INITIAL_BOARD] };
    const [{ history, currentMove }, dispatch] = useReducer(gameReducer, initialState);

    const isXNext = currentMove % 2 === 0;
    const move = useCallback((index: number) => dispatch({ type: "MOVE", index }), []);
    const jump = useCallback((move: number) => dispatch({ type: "JUMP", move }), []);
    const reset = useCallback(() => dispatch({ type: "RESET" }), []);

    return { history, currentMove, move, jump, reset, isXNext, dispatch, calculateWinner }
}

export default useTicTacToe