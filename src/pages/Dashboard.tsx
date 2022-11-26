import {
  Card,
  DashCardHeader,
  GaugeChart,
  LineChart,
  MeterGauge,
  MultiLineChart,
  PercentageAreaChart,
  PieChartWithLabelAction,
  SimplePieChart,
  StackedAreaChart,
} from "../components";

type Props = {};

export const Dashboard = (props: Props) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xl font-bold mt-5">Dashboard</span>
      {/* line charts */}
      <div className="flex mt-2 w-full px-5">
        <Card
          className="m-3 min-w-[48%]"
          maxW="lg"
          header={
            <DashCardHeader
              color="text-amber-600 bg-amber-200"
              title="# Line chart"
            />
          }
        >
          <div className="w-full">
            <LineChart />
          </div>
        </Card>
        <Card
          maxW="lg"
          className="m-3 min-w-[48%]"
          header={
            <DashCardHeader
              color="text-amber-600 bg-amber-200"
              title="# Multi Line chart"
            />
          }
        >
          <MultiLineChart />
        </Card>
      </div>
      {/* area charts */}
      <div className="flex mt-2 w-full px-5">
        <Card
          className="m-3 min-w-[48%]"
          maxW="lg"
          header={
            <DashCardHeader
              color="text-violet-600 bg-violet-200"
              title="# Percentage Area chart"
            />
          }
        >
          <div className="w-full">
            <PercentageAreaChart />
          </div>
        </Card>
        <Card
          maxW="lg"
          className="m-3 min-w-[48%]"
          header={
            <DashCardHeader
              color="text-violet-600 bg-violet-200"
              title="# Stacked Area chart"
            />
          }
        >
          <StackedAreaChart />
        </Card>
      </div>
      {/* pie charts */}
      <div className="flex mt-2 w-full px-5">
        <Card
          className="m-3 min-w-[48%]"
          maxW="lg"
          header={
            <DashCardHeader
              color="text-orange-600 bg-orange-200"
              title="# Pie chart"
            />
          }
        >
          <div className="w-full">
            <SimplePieChart />
          </div>
        </Card>
        <Card
          maxW="lg"
          className="m-3 min-w-[48%]"
          header={
            <DashCardHeader
              color="text-orange-600 bg-orange-200"
              title="# Pie chart with label actions"
            />
          }
        >
          <PieChartWithLabelAction />
        </Card>
      </div>
      {/* gauge */}
      <div className="flex mt-2 w-full px-5">
        <Card
          className="m-3 min-w-[48%]"
          maxW="lg"
          header={
            <DashCardHeader
              color="text-emerald-600 bg-emerald-200"
              title="# gauge chart"
            />
          }
        >
          <div className="w-full">
            <GaugeChart />
          </div>
        </Card>
        <Card
          maxW="lg"
          className="m-3 min-w-[48%]"
          header={
            <DashCardHeader
              color="text-emerald-600 bg-emerald-200"
              title="# Gauge meter chart"
            />
          }
        >
          <MeterGauge />
        </Card>
      </div>
    </div>
  );
};
