import { Gauge, GaugeConfig } from "@ant-design/plots";
import { ShowDataContainer } from "./dashboard";

export const GaugeChart = () => {
  const config: GaugeConfig = {
    percent: 0.75,
    range: {
      color: "#30BF78",
    },
    indicator: {
      pointer: {
        style: {
          stroke: "#D0D0D0",
        },
      },
      pin: {
        style: {
          stroke: "#D0D0D0",
        },
      },
    },
    axis: {
      label: {
        formatter(v) {
          return Number(v) * 100;
        },
      },
      subTickLine: {
        count: 3,
      },
    },
    statistic: {
      content: {
        formatter: (datum) => `Rate: ${(datum?.percent * 100).toFixed(0)}%`,
        style: {
          color: "rgba(0,0,0,0.65)",
          fontSize: "48",
        },
      },
    },
  };
  return (
    <ShowDataContainer data={{ percentage: 0.75 }}>
      <Gauge {...config} />
    </ShowDataContainer>
  );
};

export const MeterGauge = () => {
  const config = {
    percent: 0.75,
    type: "meter",
    innerRadius: 0.8,
    range: {
      ticks: [0, 1 / 3, 2 / 3, 1],
      color: ["#F4664A", "#FAAD14", "#30BF78"],
    },
    indicator: {
      pointer: {
        style: {
          stroke: "#D0D0D0",
        },
      },
      pin: {
        style: {
          stroke: "#613939",
        },
      },
    },
    statistic: {
      content: {
        style: {
          fontSize: "2rem",
          lineHeight: "2rem",
        },
      },
    },
  };
  return (
    <ShowDataContainer data={{ percentage: 0.75 }}>
      <Gauge {...config} />
    </ShowDataContainer>
  );
};
