import { FC } from "react";

const colors = ["red", "violet", "emerald", "orange", "amber"] as const;

const headerColorsDict = [
  "text-red-600 bg-red-200",
  "text-violet-600 bg-violet-200",
  "text-emerald-600 bg-emerald-200",
  "text-orange-600 bg-orange-200",
  "text-amber-600 bg-amber-200",
] as const;
interface Props {
  title: string;
  color?: typeof headerColorsDict[number];
}

export const DashCardHeader: FC<Props> = ({ title, color }) => {
  return (
    <span
      className={`${
        color ? color : "text-blue-600 bg-blue-200"
      }  mb-1 font-mono  px-3 py-2 rounded-t block capitalize`}
    >
      {title}
    </span>
  );
};
