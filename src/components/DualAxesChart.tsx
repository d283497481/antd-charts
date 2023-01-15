import React, { useState, useEffect, memo } from 'react';
import { DualAxes } from '@ant-design/plots';
import { Skeleton } from 'antd';
import request from './dashboard/request';

export const DualAxesChart = memo(({ dataInfo = [], searchTime }: any) => {
  const [loading, setLoading] = useState(true);
  const [uvBillData, setUvBillData] = useState<any[]>([]);
  const [transformData, setTransformData] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    const getDetail = async (project: string) => {
      try {
        const res: any = await request.post('/zzyDashboard-d1d6', {
          ...searchTime,
          project,
        });
        return res && res?.data ? res?.data : [];
      } catch (error) {
        console.error(error);
        return [];
      }
    };
    if (dataInfo) {
      const postApi: any[] = [];
      for (let i = 0; i < dataInfo.length; i++) {
        postApi.push(getDetail(dataInfo[i]?.id));
      }
      const getApi = async () => {
        const res = await Promise.all(postApi);
        console.log(res);
        const list: any = [];
        const totalList: any = []; //res.flat(1);
        for (let i = 0; i < dataInfo.length; i++) {
          let total = 0;
          res?.[i] &&
            res?.[i].forEach((item: any) => {
              if (item?.role) {
                total += Number(item?.consumed || 0);
                list.push({
                  ...(item || {}),
                  role: !item?.role ? '-' : item?.role,
                  value: Number(item?.consumed || 0),
                });
              }
            });
          totalList.push({
            total: total,
            porjectname: dataInfo[i].name,
          });
        }

        setUvBillData(list);
        setTransformData(totalList);
        setLoading(false);
      };
      getApi();
    }
  }, [dataInfo]);

  const config = {
    data: [uvBillData, transformData],
    xField: 'porjectname',
    yField: ['value', 'total'],
    xAxis: {
      label: {
        formatter: function (value: any) {
          let valueTxt = '';
          if (value.length > 5) {
            valueTxt = value.substring(0, 5) + '...';
          } else {
            valueTxt = value;
          }
          return valueTxt;
        },
      },
    },
    // slider: {
    //   start: 0.1,
    //   end: 0.9,
    // },
    geometryOptions: [
      {
        geometry: 'column',
        isGroup: true,
        seriesField: 'role',
      },
      {
        geometry: 'line',
        // smooth: true,
        lineStyle: {
          lineWidth: 2,
        },
      },
    ],
  };
  return !loading ? <DualAxes {...config} /> : <Skeleton />;
});
