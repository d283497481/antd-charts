import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import request from '../components/dashboard/request';

export const TableList = ({ dataInfo, searchTime }: any) => {
  const columns: ColumnsType<any> = [
    {
      title: '项目名称',
      dataIndex: 'projectname',
      width: 300,
    },
    {
      title: '阶段名称',
      dataIndex: 'stagename',
      width: 150,
    },
    {
      title: '任务名称',
      dataIndex: 'name',
      width: 400,
    },
    {
      title: '开始时间',
      dataIndex: 'estStarted',
      width: 150,
    },
    {
      title: '计划结束时间',
      dataIndex: 'deadline',
      width: 150,
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      width: 100,
    },
    {
      title: '当期进展（工时）',
      dataIndex: 'consumed',
      width: 160,
    },
    {
      title: '任务进展（%）',
      dataIndex: 'progress',
      render: val => `${(Number(val || 0) * 100).toFixed(2)}%`,
      width: 160,
    },
    {
      title: '描述',
      dataIndex: 'doc',
      width: 200,
    },
  ];
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const getDetail = async (project: string) => {
      try {
        const res: any = await request.post('/zzyDashboard-d1d3', {
          ...searchTime,
          project,
        });
        setData(res?.data || []);
      } catch (error) {
        console.error(error);
        setData([]);
      }
    };
    if (dataInfo) {
      getDetail(dataInfo[0]?.id);
    }
  }, [searchTime, dataInfo]);

  return <Table columns={columns} dataSource={data} scroll={{ y: 400 }} />;
};
