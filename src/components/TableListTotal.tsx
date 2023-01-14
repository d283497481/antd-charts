import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import request from './dashboard/request';

export const TableListTotal = ({ dataInfo = [], searchTime }: any) => {
  const columns: ColumnsType<any> = [
    {
      title: '项目名称',
      dataIndex: 'name',
      ellipsis: true,
      width: 100,
    },
    {
      title: '开始时间',
      dataIndex: 'begin',
      ellipsis: true,
      width: 116,
    },
    {
      title: '计划结束时间',
      dataIndex: 'end',
      ellipsis: true,
      width: 118,
    },
    {
      title: '当期进展(工时)',
      dataIndex: 'curconsumed',
      ellipsis: true,
      render: val => `${(Number(val || 0) / 8).toFixed(1)}`,
      width: 128,
    },
    {
      title: '档期进展(%)',
      dataIndex: 'progress',
      ellipsis: true,
      render: val => `${(Number(val || 0) * 100).toFixed(1)}%`,
      width: 114,
    },
    {
      title: '已消耗工时(人天)',
      dataIndex: 'consumed',
      ellipsis: true,
      render: val => `${(Number(val || 0) / 8).toFixed(1)}`,
      width: 143,
    },
    {
      title: '剩余预计工时(人天)',
      dataIndex: 'left',
      ellipsis: true,
      render: val => `${(Number(val || 0) / 8).toFixed(1)}`,
      width: 156,
    },
    {
      title: '总计划工时(人天)',
      dataIndex: 'estimate',
      ellipsis: true,
      render: val => `${(Number(val || 0) / 8).toFixed(1)}`,
      width: 143,
    },
    {
      title: '已消耗工时占比(%)',
      dataIndex: 'consumedper',
      ellipsis: true,
      render: val => `${(Number(val || 0) * 100).toFixed(1)}%`,
      width: 155,
    },
    {
      title: '现场+远程人数',
      dataIndex: 'teamnum',
      // render: (val, record) => `${val ?? 0}+${record?.teamnum1 ?? 0}`,
      ellipsis: true,
      width: 138,
    },
  ];
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    setLoading(true);
    const getDetail = async (project: string, items: any) => {
      try {
        const res: any = await request.post('/zzyDashboard-d1d5', {
          ...searchTime,
          project,
        });
        return res ? { ...items, ...(res?.data?.[0] || {}) } : items;
      } catch (error) {
        console.error(error);
        return items;
      }
    };
    if (dataInfo) {
      const postApi = [];

      for (let i = 0; i < dataInfo.length; i++) {
        postApi.push(getDetail(dataInfo[i]?.id, dataInfo[i]));
      }

      Promise.all(postApi).then(res => {
        setLoading(false);
        setData(res);
      });
    }
  }, [searchTime, dataInfo]);

  return (
    <Table
      rowKey="name"
      bordered
      loading={loading}
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ y: 380 }}
    />
  );
};
