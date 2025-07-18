
export type SquareValue = "X" | "O" | null;
export type Squares = SquareValue[];

export type TicTacToeState = {
    currentMove: number;
    history: SquareValue[][];
    isBotEnabled: boolean;
    botMark: "X" | "O";
};

export type TicTacToeAction =
    | { type: "MOVE"; index: number }
    | { type: "JUMP"; move: number }
    | { type: "RESET" }
    | { type: "SET_BOT_MARK"; mark: "X" | "O" }
    | { type: "SET_IS_BOT_ENABLED"; isBotEnabled: boolean };

export type TicTacToeBot = (board: Squares, mark: "X" | "O") => number;