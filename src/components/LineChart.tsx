import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import request from '../components/dashboard/request';
const defaultData = [
  { date: '2021-07-01', project: '413', estimate: '8934', consumed: '176' },
  { date: '2021-08-03', project: '413', estimate: '8934', consumed: '211' },
  { date: '2021-10-05', project: '413', estimate: '8934', consumed: '120' },
  { date: '2021-10-13', project: '413', estimate: '8934', consumed: '120' },
  { date: '2021-10-29', project: '413', estimate: '8934', consumed: '240' },
  { date: '2022-06-01', project: '413', estimate: '8934', consumed: '100' },
  { date: '2022-07-01', project: '413', estimate: '8934', consumed: '176' },
  { date: '2022-07-02', project: '413', estimate: '8934', consumed: '31' },
  { date: '2022-07-29', project: '413', estimate: '8934', consumed: '744' },
  { date: '2022-08-01', project: '413', estimate: '8934', consumed: '369' },
  { date: '2022-08-02', project: '413', estimate: '8934', consumed: '816' },
  { date: '2022-08-08', project: '413', estimate: '8934', consumed: '88' },
  { date: '2022-08-12', project: '413', estimate: '8934', consumed: '64' },
  { date: '2022-08-15', project: '413', estimate: '8934', consumed: '3' },
  { date: '2022-09-01', project: '413', estimate: '8934', consumed: '204' },
  { date: '2022-09-23', project: '413', estimate: '8934', consumed: '8' },
  { date: '2022-09-30', project: '413', estimate: '8934', consumed: '279' },
  { date: '2022-10-10', project: '413', estimate: '8934', consumed: '56' },
  { date: '2022-10-12', project: '413', estimate: '8934', consumed: '8' },
  { date: '2022-10-31', project: '413', estimate: '8934', consumed: '220' },
  { date: '2022-11-01', project: '413', estimate: '8934', consumed: '58' },
  { date: '2022-11-02', project: '413', estimate: '8934', consumed: '59' },
  { date: '2022-11-03', project: '413', estimate: '8934', consumed: '59' },
  { date: '2022-11-04', project: '413', estimate: '8934', consumed: '57' },
  { date: '2022-11-06', project: '413', estimate: '8934', consumed: '0' },
  { date: '2022-11-07', project: '413', estimate: '8934', consumed: '59' },
  { date: '2022-11-08', project: '413', estimate: '8934', consumed: '51' },
  { date: '2022-11-09', project: '413', estimate: '8934', consumed: '51' },
  { date: '2022-11-10', project: '413', estimate: '8934', consumed: '51' },
  { date: '2022-11-11', project: '413', estimate: '8934', consumed: '51' },
  { date: '2022-11-14', project: '413', estimate: '8934', consumed: '51' },
  { date: '2022-11-15', project: '413', estimate: '8934', consumed: '51' },
  { date: '2022-11-16', project: '413', estimate: '8934', consumed: '51' },
  { date: '2022-11-17', project: '413', estimate: '8934', consumed: '51' },
  { date: '2022-11-18', project: '413', estimate: '8934', consumed: '51' },
  { date: '2022-11-21', project: '413', estimate: '8934', consumed: '43' },
  { date: '2022-11-22', project: '413', estimate: '8934', consumed: '35' },
  { date: '2022-11-23', project: '413', estimate: '8934', consumed: '43' },
  { date: '2022-11-24', project: '413', estimate: '8934', consumed: '43' },
  { date: '2022-11-25', project: '413', estimate: '8934', consumed: '43' },
  { date: '2022-11-28', project: '413', estimate: '8934', consumed: '35' },
  { date: '2022-11-29', project: '413', estimate: '8934', consumed: '35' },
  { date: '2022-11-30', project: '413', estimate: '8934', consumed: '39' },
  { date: '2022-12-01', project: '413', estimate: '8934', consumed: '48' },
  { date: '2022-12-02', project: '413', estimate: '8934', consumed: '48' },
  { date: '2022-12-05', project: '413', estimate: '8934', consumed: '58' },
  { date: '2022-12-06', project: '413', estimate: '8934', consumed: '58' },
  { date: '2022-12-07', project: '413', estimate: '8934', consumed: '58' },
  { date: '2022-12-08', project: '413', estimate: '8934', consumed: '58' },
  { date: '2022-12-09', project: '413', estimate: '8934', consumed: '58' },
  { date: '2022-12-12', project: '413', estimate: '8934', consumed: '62' },
  { date: '2022-12-13', project: '413', estimate: '8934', consumed: '64' },
  { date: '2022-12-14', project: '413', estimate: '8934', consumed: '64' },
  { date: '2022-12-15', project: '413', estimate: '8934', consumed: '64' },
  { date: '2022-12-16', project: '413', estimate: '8934', consumed: '64' },
  { date: '2022-12-19', project: '413', estimate: '8934', consumed: '64' },
  { date: '2022-12-20', project: '413', estimate: '8934', consumed: '64' },
  { date: '2022-12-21', project: '413', estimate: '8934', consumed: '64' },
  { date: '2022-12-22', project: '413', estimate: '8934', consumed: '64' },
  { date: '2022-12-23', project: '413', estimate: '8934', consumed: '64' },
  { date: '2022-12-26', project: '413', estimate: '8934', consumed: '66' },
  { date: '2022-12-27', project: '413', estimate: '8934', consumed: '66' },
  { date: '2022-12-28', project: '413', estimate: '8934', consumed: '64' },
  { date: '2022-12-29', project: '413', estimate: '8934', consumed: '66' },
  { date: '2022-12-30', project: '413', estimate: '8934', consumed: '66' },
  { date: '2022-12-31', project: '413', estimate: '8934', consumed: '8' },
  { date: '2023-01-03', project: '413', estimate: '8934', consumed: '48' },
  { date: '2023-01-04', project: '413', estimate: '8934', consumed: '48' },
  { date: '2023-01-05', project: '413', estimate: '8934', consumed: '48' },
  { date: '2023-01-06', project: '413', estimate: '8934', consumed: '48' },
  { date: '2023-01-09', project: '413', estimate: '8934', consumed: '8' },
  { date: '2023-01-10', project: '413', estimate: '8934', consumed: '8' },
  { date: '2023-01-11', project: '413', estimate: '8934', consumed: '8' },
  { date: '2023-01-12', project: '413', estimate: '8934', consumed: '8' },
];
export const LineChart = ({ dataInfo = [] }: any) => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const getDetail = async (project: string, items: any) => {
      try {
        let formData = new FormData();
        formData.append('project', project);
        const res = await request.post('/zzyDashboard-d1d1', formData);
        let total = 0;
        return (res?.data || []).map((item: any, index: number) => {
          total += Number(item.consumed);
          return {
            date: item.date,
            name: items.name,
            value: Number(item.estimate) - total,
          };
        });
      } catch (error) {
        console.error(error);
        // let total = 0;
        // return defaultData.map((item: any, index: number) => {
        //   total += Number(item.consumed);
        //   return {
        //     date: item.date,
        //     name: items.name,
        //     value: Number(item.estimate) - total,
        //   };
        // });
        return [];
      }
    };
    if (dataInfo) {
      const postApi = [];

      for (let i = 0; i < dataInfo.length; i++) {
        postApi.push(getDetail(dataInfo[i]?.id, dataInfo[i]));
      }

      Promise.all(postApi).then(res => {
        setData(res.flat(1));
      });
    }
  }, [dataInfo]);
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
    xField: 'date',
    yField: 'value',
    seriesField: 'name',
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
  };
  return <Line {...config} />;
};
