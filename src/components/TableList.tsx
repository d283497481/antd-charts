import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

export const TableList: React.FC = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: '项目',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: '名称',
      dataIndex: 'age',
      width: 150,
    },
    {
      title: '耗时',
      dataIndex: 'address',
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
  return <Table columns={columns} dataSource={data} scroll={{ y: 280 }} />;
};
