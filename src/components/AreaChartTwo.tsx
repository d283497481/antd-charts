import { useState, useEffect } from 'react';
import { Area } from '@ant-design/plots';
import { Skeleton } from 'antd';
import request from './dashboard/request';

export const AreaChartTwo = ({ searchTime }: any) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const getDetail = async () => {
      try {
        const res: any = await request.post('/zzyDashboard-d1d8', searchTime);
        const list = res
          ? (res?.data || [])?.map((item: any) => {
              return {
                ...(item || {}),
                value: Number(item?.usertotal || 0),
              };
            })
          : [];
        setData(list);
      } catch (error) {
        console.error(error);
        setData([]);
      }
      setLoading(false);
    };
    if (searchTime) {
      getDetail();
    }
  }, [searchTime]);
  const config = {
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'projectname',
    slider: {
      start: 0.1,
      end: 0.9,
    },
  };

  return !loading ? <Area {...config} /> : <Skeleton />;
};