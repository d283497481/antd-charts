import React, { useEffect, useState } from 'react';
import request from '../dashboard/request';
import { Skeleton } from 'antd';
import {
  Card,
  CardTable,
  DashCardHeader,
  PieChartOne,
  TableListPieOne,
} from '../index';

export const TotalChildrenOne = ({ dataInfo }: any) => {
  const [loading, setLoading] = useState(true);

  const [dataList, setData] = useState<any[]>([]);
  useEffect(() => {
    setLoading(true);
    const getDetail = async () => {
      try {
        const res: any = await request.post('/zzyDashboard-d1d7', {
          project: dataInfo.id,
        });
        const list =
          res && res?.data?.[0]
            ? res?.data?.map((i: any) => {
                return {
                  ...i,
                  consumed: Number(i.consumed || 0),
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
    if (dataInfo) {
      getDetail();
    }
  }, [dataInfo]);

  return !loading ? (
    <div className="flex mt-2 w-full px-5">
      <Card
        maxW="lg"
        className="m-3 min-w-[48%] "
        header={
          <DashCardHeader title={`${dataInfo?.name}项目已消耗人力分析`} />
        }
      >
        <PieChartOne dataInfo={dataList || []} />
      </Card>
      <CardTable
        maxW="lg"
        className="m-3 min-w-[48%]"
        header={
          <DashCardHeader title={`${dataInfo?.name}项目已消耗人力数据表格`} />
        }
      >
        <TableListPieOne dataInfo={dataList || []} />
      </CardTable>
    </div>
  ) : (
    <Skeleton />
  );
};
