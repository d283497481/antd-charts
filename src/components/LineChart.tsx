import React, { useState, useEffect } from 'react';
import { ShowDataContainer } from './dashboard';
import { Line } from '@ant-design/plots';
import data from './dashboard/data';

export const LineChart: React.FC = () => {
  const COLOR_PLATE_10 = [
    '#5B8FF9',
    '#5AD8A6',
    '#5D7092',
    '#F6BD16',
    '#E8684A',
    '#6DC8EC',
    '#9270CA',
    '#FF9D4D',
    '#269A99',
    '#FF99C3',
  ];
  const config = {
    data,
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v: any) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`),
      },
    },
    slider: {
      start: 0.1,
      end: 0.5,
    },
    color: COLOR_PLATE_10,
    point: {
      shape: ({ category }: any) => {
        return category === 'Gas fuel' ? 'square' : 'circle';
      },
      style: ({ year }: any) => {
        return {
          r: Number(year) % 4 ? 0 : 3, // 4 个数据示一个点标记
        };
      },
    },
  };
  return <Line {...config} />;
};
