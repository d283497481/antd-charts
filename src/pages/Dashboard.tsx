import {
  Card,
  DashCardHeader,
  LineChart,
  MultiLineChart,
  PercentageAreaChart,
  StackedAreaChart,
} from "../components";

type Props = {};

export const Dashboard = (props: Props) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xl font-bold mt-5">Dashboard</span>
      {/* line charts */}
      <div className="flex mt-2">
        <Card
          className="m-3 min-w-[48%]"
          maxW="lg"
          header={<DashCardHeader title="# Line chart" />}
        >
          <div className="w-full">
            <LineChart />
          </div>
        </Card>
        <Card
          maxW="lg"
          className="m-3 min-w-[48%]"
          header={<DashCardHeader title="# Multi Line chart" />}
        >
          <MultiLineChart />
        </Card>
      </div>
      {/* area charts */}
      <div className="flex mt-2">
        <Card
          className="m-3 min-w-[48%]"
          maxW="lg"
          header={
            <DashCardHeader color="violet" title="# Percentage Area chart" />
          }
        >
          <div className="w-full">
            <PercentageAreaChart />
          </div>
        </Card>
        <Card
          maxW="lg"
          className="m-3 min-w-[48%]"
          header={<DashCardHeader color="red" title="# Stacked Area chart" />}
        >
          <StackedAreaChart />
        </Card>
      </div>
    </div>
  );
};
