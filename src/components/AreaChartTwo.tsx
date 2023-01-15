import { useState, useEffect } from 'react';
import { Area } from '@ant-design/plots';
import { Skeleton } from 'antd';
import request from './dashboard/request';
import { groupBy } from './dashboard/utils';

export const AreaChartTwo = ({ searchTime, project }: any) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const getDetail = async () => {
      try {
        const res: any = await request.post('/zzyDashboard-d2d1', searchTime);
        let list: any = [];
        res &&
          (res?.data || [])?.map((item: any) => {
            if (!project || (project || []).includes(`${item.project}`)) {
              list.push({
                ...(item || {}),
                value: Number(item?.usertotal || 0),
              });
            }
          });
        list = groupBy(list, 'projectname', 'date', searchTime);
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
  }, [searchTime, project]);
  const config = {
    data,
    xField: 'date',
    yField: 'value',
    isStack: true,
    smooth: true,
    seriesField: 'projectname',
    slider: {
      start: 0.1,
      end: 0.9,
    },
  };

  return !loading ? <Area {...config} /> : <Skeleton />;
};
