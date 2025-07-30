export type Status = "wrong" | "almost" | "correct" | "unchecked";
export type Letter = { key: string, status: Status }
export type Guess = Letter[]
export type UsedLetters = { [key: string]: string }; 