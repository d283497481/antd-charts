import { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import { Skeleton } from 'antd';
import request from '../dashboard/request';
// import { groupBy } from '../dashboard/utils';

export const MultiLineChartOne = ({ dataInfo, searchTime }: any) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getDetail = async () => {
      try {
        const res: any = await request.post('/zzyDashboard-d1d2', {
          project: dataInfo?.id,
        });
        let total: any = {};
        const list: any = [];
        res &&
          res?.data?.[0] &&
          res?.data.map((item: any) => {
            if (item?.date && item?.date !== '0000-00-00') {
              if (!total[item?.stagename]) {
                total[item?.stagename] = Number(item?.consumed || 0);
              } else {
                total[item?.stagename] += Number(item?.consumed || 0);
              }

              list.push({
                date: item.date,
                stagename: item?.stagename,
                value: Number(item?.estimate || 0) - total[item?.stagename],
              });
            }
          });
        // const list: any = groupBy(dataInfos, 'stagename', 'date', searchTime);
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
    theme: 'custom-theme',
    autoFit: true,
    seriesField: 'stagename',
    xAxis: {
      type: 'time',
    },
    slider: {
      start: 0.1,
      end: 0.5,
    },
    yAxis: {
      label: {
        // formatting values as thousands 1500=> 1,500
        formatter: (v: string) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`),
      },
    },
  };
  return !loading ? <Line {...config} /> : <Skeleton />;
};
