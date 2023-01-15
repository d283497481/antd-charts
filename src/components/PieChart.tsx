import React, { memo } from 'react';
import { Pie } from '@ant-design/plots';

export const PieChart = memo(({ dataInfo }: any) => {
  const config = {
    appendPadding: 10,
    data: dataInfo,
    angleField: 'consumed',
    colorField: 'role',
    radius: 0.8,
    label: {
      type: 'outer',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
});