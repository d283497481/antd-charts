import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import { Skeleton } from 'antd';
import request from './dashboard/request';
import { groupBy } from './dashboard/utils';

export const LineChart = ({ dataInfo, searchTime }: any) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getDetail = async (project: string, items: any) => {
      try {
        const res: any = await request.post('/zzyDashboard-d1d1', {
          project,
        });
        let total = 0;
        const list: any = [];
        (res?.data || []).map((item: any) => {
          if (item?.date && item?.date !== '0000-00-00') {
            total += Number(item?.consumed || 0);
            list.push({
              date: item?.date,
              name: items?.name,
              value: Number(item?.estimate || 0) - total,
            });
          }
        });
        return list;
      } catch (error) {
        console.error(error);
        return [];
      }
    };
    if (dataInfo) {
      const postApi: any[] = [];

      for (let i = 0; i < dataInfo.length; i++) {
        postApi.push(getDetail(dataInfo[i]?.id, dataInfo[i]));
      }
      const getApi = async () => {
        const res = await Promise.all(postApi);
        let list = res.flat(1);
        list = groupBy(list, 'name', 'date', searchTime);
        // console.log(JSON.stringify(list));
        setData(list);
        setLoading(false);
      };
      getApi();
    }
  }, [dataInfo]);
  const config = {
    data,
    xField: 'date',
    yField: 'value',
    autoFit: true,
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
    smooth: true,
    // connectNulls: false,
    // point: {
    //   shape: () => {
    //     return 'circle';
    //   },
    // },
  };
  return !loading ? <Line {...config} /> : <Skeleton />;
};
