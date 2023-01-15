import React, { memo } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export const TableListPie = memo(({ dataInfo }: any) => {
  const columns: ColumnsType<any> = [
    {
      title: '角色',
      dataIndex: 'role',
      width: 80,
    },
    {
      title: '已消耗人力',
      dataIndex: 'consumed',
      render: val => `${(Number(val || 0) / 8).toFixed(1)}`,
      width: 120,
    },
    {
      title: '计划人力(人天)',
      dataIndex: 'estimte',
      render: val => `${(Number(val || 0) / 8).toFixed(1)}`,
      width: 140,
    },
    {
      title: '剩余人力(人天)',
      dataIndex: 'left',
      render: val => `${(Number(val || 0) / 8).toFixed(1)}`,
      width: 140,
    },
  ];
  return (
    <Table
      bordered
      columns={columns}
      dataSource={dataInfo}
      scroll={{ y: 400 }}
      pagination={false}
    />
  );
});
