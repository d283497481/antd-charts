import { Card, DashCardHeader, LineChart } from "../components";

type Props = {};

export const Dashboard = (props: Props) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xl font-bold mt-5">Dashboard</span>

      <div className="min-w-full">
        <div className="m-3">
          <Card maxW="lg" header={<DashCardHeader title="# Line chart" />}>
            <LineChart />
          </Card>
        </div>
      </div>
    </div>
  );
};
