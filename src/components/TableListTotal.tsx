import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import request from '../components/dashboard/request';

export const TableListTotal = ({ dataInfo = [], searchTime }: any) => {
  const columns: ColumnsType<any> = [
    {
      title: '项目名称',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: '开始时间',
      dataIndex: 'begin',
      width: 150,
    },
    {
      title: '计划结束时间',
      dataIndex: 'end',
      width: 150,
    },
    {
      title: '当期进展（工时）',
      dataIndex: 'curconsumed',
      width: 150,
    },
    {
      title:
        '档期进展（%）（1- 所有任务总的剩余工时/项目所有的任务的计划时间）',
      dataIndex: 'progress',
      render: val => `${(Number(val || 0) * 100).toFixed(2)}%`,
      width: 400,
    },
    {
      title: '已消耗工时（项目所有的任务的消耗工时累加）',
      dataIndex: 'consumed',
      width: 300,
    },
    {
      title: '剩余预计工时',
      dataIndex: 'left',
      width: 150,
    },
    {
      title:
        '总计划工时（项目所有的任务的计划时间，某任务计划0的话，就是总投入+最后剩余）',
      dataIndex: 'estimate',
      width: 400,
    },
    {
      title: '已消耗工时占比（%）（已消耗工时/项目所有的任务的计划时间）',
      dataIndex: 'consumedper',
      render: val => `${(Number(val || 0) * 100).toFixed(2)}%`,
      width: 300,
    },
    {
      title: '当前项目工程师数目',
      dataIndex: 'teamnum',
      width: 200,
    },
  ];
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const getDetail = async (project: string, items: any) => {
      try {
        let formData = new FormData();
        for (let key in searchTime) {
          formData.append(key, searchTime[key]);
        }
        formData.append('project', project);
        const res = await request.post('/zzyDashboard-d1d5', formData);
        return { ...items, ...(res?.data?.[0] || {}) };
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
        setData(res);
      });
    }
  }, [searchTime, dataInfo]);

  return (
    <Table
      rowKey="name"
      columns={columns}
      dataSource={data}
      scroll={{ y: 3080 }}
    />
  );
};
