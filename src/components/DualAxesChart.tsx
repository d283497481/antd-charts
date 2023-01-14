import React, { useState, useEffect } from 'react';
import { DualAxes } from '@ant-design/plots';
import { Skeleton } from 'antd';
import request from './dashboard/request';

export const DualAxesChart = ({ dataInfo = [], searchTime }: any) => {
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
      const postApi = [];

      for (let i = 0; i < dataInfo.length; i++) {
        postApi.push(getDetail(dataInfo[i]?.id));
      }

      Promise.all(postApi).then(res => {
        const list: any = [];
        const totalList: any = []; //res.flat(1);
        for (let i = 0; i < dataInfo.length; i++) {
          let total = 0;
          res?.[i] &&
            res?.[i].forEach((item: any) => {
              total += Number(item?.consumed || 0);
              list.push({
                ...(item || {}),
                value: Number(item?.consumed || 0),
              });
            });
          totalList.push({
            项目合计: total,
            projectname: dataInfo[i].name,
          });
        }

        setUvBillData(list);
        setTransformData(totalList);
        setLoading(false);
      });
    }
  }, [searchTime, dataInfo]);

  const config = {
    data: [uvBillData, transformData],
    xField: 'projectname',
    yField: ['value', '项目合计'],
    xAxis: {
      label: {
        formatter: function (value: any) {
          let valueTxt = '';
          if ((dataInfo || []).length > 1 && value.length > 5) {
            valueTxt = value.substring(0, 5) + '...';
          } else {
            valueTxt = value;
          }
          return valueTxt;
        },
      },
    },
    geometryOptions: [
      {
        geometry: 'column',
        isGroup: true,
        seriesField: 'role',
      },
      {
        geometry: 'line',
        lineStyle: {
          lineWidth: 2,
        },
      },
    ],
  };
  return !loading ? <DualAxes {...config} /> : <Skeleton />;
};
