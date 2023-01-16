import React from 'react';
import { Pie } from '@ant-design/plots';

export const PieChart = ({ dataInfo }: any) => {
  const config = {
    appendPadding: 10,
    theme: 'custom-theme',
    data: dataInfo,
    angleField: 'consumed',
    colorField: 'role',
    radius: 0.75,
    tooltip: {
      formatter: (datum: any) => {
        return {
          name: datum.role,
          value: `${(Number(datum.consumed || 0) / 8).toFixed(1)}人/天`,
        };
      },
    },
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};
