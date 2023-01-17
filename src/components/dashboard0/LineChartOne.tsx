import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import { Skeleton } from 'antd';
import request from '../dashboard/request';

export const LineChartOne = ({ dataInfo }: any) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getDetail = async () => {
      try {
        const res: any = await request.post('/zzyDashboard-d1d1', {
          project: dataInfo?.id,
        });
        let total = 0;
        const list: any = [];
        (res?.data || []).map((item: any) => {
          if (item?.date && item?.date !== '0000-00-00') {
            total += Number(item?.consumed || 0);
            let value = Number(item?.estimate || 0) - total;
            // value = value < 0 ? 0 : value;
            list.push({
              date: dataInfo?.date,
              name: dataInfo?.name,
              value,
              estimate: Number(item?.estimate || 0),
            });
          }
        });
        list.push({
          date: dataInfo?.begin ?? list?.[0]?.date,
          name: '参考',
          value: list?.[0]?.estimate ?? 0,
        });
        list.push({
          date: dataInfo?.end ?? list?.[list.length - 1]?.date,
          name: '参考',
          value: 0,
        });
        setData(list);
      } catch (error) {
        console.error(error);
        setData([]);
      }
      setLoading(false);
    };
    if (dataInfo) {
      getDetail();
    }
  }, [dataInfo]);
  const config = {
    data,
    xField: 'date',
    yField: 'value',
    autoFit: true,
    theme: 'custom-theme',
    seriesField: 'name',
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v: any) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`),
      },
    },
    color: ({ name }: any) => {
      return name === '参考' ? '#626681' : '#F4664A';
    },
    slider: {
      start: 0.1,
      end: 0.5,
    },
    lineStyle: ({ name }: any) => {
      if (name === '参考') {
        return {
          lineDash: [4, 4],
          opacity: 1,
        };
      }

      return {
        opacity: 0.5,
      };
    },
  };
  return !loading ? <Line {...config} /> : <Skeleton />;
};
