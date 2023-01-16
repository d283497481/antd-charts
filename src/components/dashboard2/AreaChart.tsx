import { useState, useEffect } from 'react';
import { Area } from '@ant-design/plots';
import { Skeleton } from 'antd';
import request from '../dashboard/request';
import { groupBy } from '../dashboard/utils';

export const AreaChart = ({ searchTime }: any) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const getDetail = async () => {
      try {
        const res: any = await request.post('/zzyDashboard-d2d2', searchTime);
        let list = res
          ? (res?.data || [])?.map((item: any) => {
              return {
                ...(item || {}),
                value: Number(item?.usertotal || 0),
              };
            })
          : [];
        list = groupBy(list, 'role', 'ndate', searchTime);

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
    xField: 'ndate',
    yField: 'value',
    seriesField: 'role',
    isStack: true,
    smooth: true,
    slider: {
      start: 0.1,
      end: 0.9,
    },
    theme: 'custom-theme',
  };

  return !loading ? <Area {...config} /> : <Skeleton />;
};
