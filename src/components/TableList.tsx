import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import request from './dashboard/request';

export const TableList = ({ dataInfo, searchTime }: any) => {
  const columns: ColumnsType<any> = [
    {
      title: '项目名称',
      dataIndex: 'projectname',
      ellipsis: true,
      width: 100,
    },
    {
      title: '阶段名称',
      dataIndex: 'stagename',
      ellipsis: true,
      width: 100,
    },
    {
      title: '任务名称',
      dataIndex: 'name',
      ellipsis: true,
      width: 100,
    },
    {
      title: '开始时间',
      dataIndex: 'estStarted',
      ellipsis: true,
      width: 118,
    },
    {
      title: '计划结束时间',
      dataIndex: 'deadline',
      ellipsis: true,
      width: 118,
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      ellipsis: true,
      render: (row: any) => {
        if (row === 'wait') {
          return <Tag color="#595959">{row}</Tag>;
        }
        if (row === 'done') {
          return <Tag color="#52c41a">{row}</Tag>;
        }
        if (row === 'doing') {
          return <Tag color="#faad14">{row}</Tag>;
        }
        if (row === 'closed') {
          return <Tag color="#135200">{row}</Tag>;
        }
        return <Tag>{row}</Tag>;
      },
      width: 100,
    },
    {
      title: '当期进展(工时)',
      dataIndex: 'consumed',
      ellipsis: true,
      width: 132,
    },
    {
      title: '剩余工时',
      dataIndex: 'left',
      ellipsis: true,
      width: 90,
    },
    {
      title: '预计总工时',
      dataIndex: 'estimate',
      ellipsis: true,
      width: 106,
    },

    {
      title: '任务进展(%)',
      ellipsis: true,
      dataIndex: 'progress',
      render: val => `${(Number(val || 0) * 100).toFixed(2)}%`,
      width: 118,
    },
    {
      title: '描述',
      dataIndex: 'doc',
      ellipsis: true,
      width: 80,
    },
  ];
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    setLoading(true);
    const getDetail = async (project: string) => {
      try {
        const res: any = await request.post('/zzyDashboard-d1d3', {
          ...searchTime,
          project,
        });
        setData(res?.data || []);
      } catch (error) {
        console.error(error);
        // const data = [
        //   {
        //     id: '191',
        //     name: 'Kick-off Meeting',
        //     project: '351',
        //     projectname: 'FDC template',
        //     stage: '353',
        //     stagename: '01.Preparation',
        //     estimate: '0',
        //     curconsumed: '0',
        //     consumed: '0',
        //     estStarted: '2022-09-28',
        //     deadline: '2022-09-28',
        //     status: 'wait',
        //     progress: null,
        //     left: '0',
        //   },
        //   {
        //     id: '192',
        //     name: 'Project Plan',
        //     project: '351',
        //     projectname: 'FDC template',
        //     stage: '353',
        //     stagename: '01.Preparation',
        //     estimate: '0',
        //     curconsumed: '0',
        //     consumed: '0',
        //     estStarted: '2022-09-29',
        //     deadline: '2022-09-29',
        //     status: 'wait',
        //     progress: null,
        //     left: '0',
        //   },
        //   {
        //     id: '669',
        //     name: 'ddd',
        //     project: '351',
        //     projectname: 'FDC template',
        //     stage: '355',
        //     stagename: '03. Development &amp; Test',
        //     estimate: '4',
        //     curconsumed: '0',
        //     consumed: '5',
        //     estStarted: '2022-12-06',
        //     deadline: '2022-12-07',
        //     status: 'done',
        //     progress: '1',
        //     left: '0',
        //   },
        //   {
        //     id: '722',
        //     name: '测试修改子项目工时',
        //     project: '351',
        //     projectname: 'FDC template',
        //     stage: '671',
        //     stagename: '测试修改子阶段时间是否被移除',
        //     estimate: '112',
        //     curconsumed: '0',
        //     consumed: '3',
        //     estStarted: '2022-10-01',
        //     deadline: '2022-10-14',
        //     status: 'doing',
        //     progress: '0.0267857142857143',
        //     left: '109',
        //   },
        //   {
        //     id: '737',
        //     name: '测试子阶段不超过阶段时间',
        //     project: '351',
        //     projectname: 'FDC template',
        //     stage: '672',
        //     stagename: '测试子阶段不超过阶段时间',
        //     estimate: '56',
        //     curconsumed: '0',
        //     consumed: '5',
        //     estStarted: '2022-10-01',
        //     deadline: '2022-10-07',
        //     status: 'doing',
        //     progress: '0.0892857142857143',
        //     left: '51',
        //   },
        // ];
        setData([]);
      }
      setLoading(false);
    };
    if (dataInfo) {
      getDetail(dataInfo[0]?.id);
    }
  }, [searchTime, dataInfo]);

  return (
    <Table
      bordered
      loading={loading}
      columns={columns}
      dataSource={data}
      scroll={{ y: 400 }}
      pagination={false}
      rowClassName={(row: any) => {
        if (row.status === 'wait') {
          return 'bg-[#fafafa]';
        }
        if (row.status === 'done') {
          return 'bg-[#d9f7be]';
        }
        if (row.status === 'doing') {
          return 'bg-[#fff1b8]';
        }
        if (row.status === 'closed') {
          return 'bg-[#b7eb8f]';
        }
        return '';
      }}
    />
  );
};
