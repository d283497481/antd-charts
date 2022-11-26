import { useState, useEffect } from "react";
import { Area, AreaConfig } from "@ant-design/plots";
import { ShowDataContainer } from "./dashboard";

export const StackedAreaChart = () => {
  const [data, setData] = useState([]);

  const [showData, setIsEdit] = useState(false);
  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config: AreaConfig = {
    data,
    xField: "year",
    yField: "value",
    seriesField: "category",
    color: [
      "#6897a7",
      "#8bc0d6",
      "#60d7a7",
      "#dedede",
      "#fedca9",
      "#fab36f",
      "#d96d6f",
    ],
    xAxis: {
      type: "time",
      mask: "YYYY",
    },
    yAxis: {
      label: {
        // formats 1000 -> 1,
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    legend: {
      position: "top",
    },
  };

  return (
    <ShowDataContainer data={data}>
      <Area {...config} />
    </ShowDataContainer>
  );
};

// percentage chart
export const PercentageAreaChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/67ef5751-b228-417c-810a-962f978af3e7.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config: AreaConfig = {
    data,
    xField: "year",
    yField: "value",
    seriesField: "country",
    color: ["#82d1de", "#cb302d", "#e3ca8c"],
    areaStyle: {
      fillOpacity: 0.7,
    },
    appendPadding: 10,
    isPercent: true,
    yAxis: {
      label: {
        formatter: (value) => {
          return +value * 100;
        },
      },
    },
  };

  return (
    <ShowDataContainer data={data}>
      <Area {...config} />
    </ShowDataContainer>
  );
};
