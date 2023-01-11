import {
  Card,
  DashCardHeader,
  // GaugeChart,
  LineChart,
  // MeterGauge,
  ColumnChart,
  // PercentageAreaChart,
  // PieChartWithLabelAction,
  // SimplePieChart,
  // StackedAreaChart,
  TableList,
} from '../components';

export const Index = () => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xl font-bold mt-5">数据统计</span>
      {/* line charts */}
      <div className="flex mt-2 w-full px-5">
        <Card
          className="m-3 min-w-[48%]"
          maxW="lg"
          header={
            <DashCardHeader
              color="text-amber-600 bg-amber-200"
              title="项目燃尽图"
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
              title="项目人力规划与预计"
            />
          }
        >
          <TableList />
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
              title="项目驻场工程师统计"
            />
          }
        >
          <div className="w-full">
            <ColumnChart />
          </div>
        </Card>
        <Card
          maxW="lg"
          className="m-3 min-w-[48%]"
          header={
            <DashCardHeader
              color="text-violet-600 bg-violet-200"
              title="阶段数据表格"
            />
          }
        >
          <TableList />
        </Card>
      </div>
      {/* pie charts */}
      {/* <div className="flex mt-2 w-full px-5">
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
      </div> */}
      {/* gauge */}
      {/* <div className="flex mt-2 w-full px-5">
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
      </div> */}
    </div>
  );
};
