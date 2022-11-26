import { FC } from "react";

interface Props {
  title: string;
  color?: string;
}

export const DashCardHeader: FC<Props> = ({ title, color }) => {
  return (
    <span
      className={`${
        color
          ? `text-${color}-600 bg-${color}-200`
          : "text-blue-600 bg-blue-200"
      }  mb-1 font-mono  px-3 py-2 rounded-t block `}
    >
      {title}
    </span>
  );
};
