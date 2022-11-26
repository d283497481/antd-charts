import { FC } from "react";

interface Props {
  title: string;
}

export const DashCardHeader: FC<Props> = ({ title }) => {
  return (
    <span className="mb-1 font-mono text-blue-600 bg-blue-200 px-3 py-2 rounded-t block ">
      {title}
    </span>
  );
};
