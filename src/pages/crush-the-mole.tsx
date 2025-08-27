import { CrushTheMole } from "@/features/crush-the-mole/ui/crush-the-mole";

export const CrushTheMolePage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="title mb-4">Crush the Mole</h1>
      <p className="description-text mb-2">
        Crush the Mole is a fast-paced reaction game where moles randomly pop
        out of holes on a 4×4 grid — and your job is to hit them as fast as you
        can! The faster you react, the higher your score. Play solo, challenge
        your reflexes, and see how many moles you can crush before time runs
        out!
      </p>
      <CrushTheMole />
    </div>
  );
};
