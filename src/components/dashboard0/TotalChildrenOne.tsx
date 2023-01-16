import React, { useContext } from 'react';
import {
  Card,
  CardTable,
  DashCardHeader,
  PieChartOne,
  TableListPieOne,
} from '../index';
import { MyContext } from '../dashboard/context';

export const TotalChildrenOne = () => {
  const { state } = useContext(MyContext);
  const rowInfo = state;
  console.log(rowInfo);
  return rowInfo?.projectname ? (
    <div className="flex mt-2 w-full px-5">
      <Card
        maxW="lg"
        className="m-3 min-w-[48%] "
        header={
          <DashCardHeader title={`${rowInfo?.projectname}项目已消耗人力分析`} />
        }
      >
        <PieChartOne dataInfo={rowInfo?.dataList || []} />
      </Card>
      <CardTable
        maxW="lg"
        className="m-3 min-w-[48%]"
        header={
          <DashCardHeader
            title={`${rowInfo?.projectname}项目已消耗人力数据表格`}
          />
        }
      >
        <TableListPieOne dataInfo={rowInfo?.dataList || []} />
      </CardTable>
    </div>
  ) : (
    <></>
  );
};
