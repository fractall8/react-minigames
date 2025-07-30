import { Wordle } from "@/features/wordle";

export const WordlePage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl text-center mb-4">Wordle</h1>
        <p className="mb-4 max-w-xl text-center text-lg">
          Wordle game is a fun and challenging word puzzle where you have six
          attempts to guess a hidden five-letter word. After each guess, you’ll
          get color-coded feedback to help you narrow down the correct answer.
        </p>
      </div>
      <Wordle />
    </>
  );
};
