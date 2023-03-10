import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import request from '../dashboard/request';

export const TableListOne = ({ dataInfo, searchTime }: any) => {
  const columns: ColumnsType<any> = [
    {
      title: '项目名称',
      dataIndex: 'projectname',
      ellipsis: true,
      width: 400,
    },
    {
      title: '阶段名称',
      dataIndex: 'stagename',
      ellipsis: true,
      width: 120,
    },
    {
      title: '任务名称',
      dataIndex: 'name',
      ellipsis: true,
      width: 100,
    },
    {
      title: '计划开始时间',
      dataIndex: 'estStarted',
      ellipsis: true,
      render: val => (val === '0000-00-00' ? '' : val),
      width: 118,
    },
    {
      title: '计划结束时间',
      dataIndex: 'deadline',
      render: val => (val === '0000-00-00' ? '' : val),
      ellipsis: true,
      width: 118,
    },
    {
      title: '实际开始时间',
      dataIndex: 'realStarted',
      ellipsis: true,
      render: val => (val === '0000-00-00 00:00:00' ? '' : val),
      width: 118,
    },
    {
      title: '实际结束时间',
      dataIndex: 'finishedDate',
      render: val => (val === '0000-00-00 00:00:00' ? '' : val),
      ellipsis: true,
      width: 118,
    },
    {
      title: '当前状态',
      dataIndex: 'od',
      ellipsis: true,
      render: (row: any) => {
        if (`${row}` === '0') {
          return <Tag color="#135200">已完成</Tag>;
        }
        if (`${row}` === '1') {
          return <Tag color="#52c41a">已完成</Tag>;
        }
        if (`${row}` === '3') {
          return <Tag color="#595959">待开始</Tag>;
        }
        if (`${row}` === '2') {
          return <Tag color="#faad14">进行中</Tag>;
        }
        if (`${row}` === '4') {
          return <Tag>其他</Tag>;
        }
        return '-';
      },
      width: 140,
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
      render: val => `${(Number(val || 0) * 100).toFixed(1)}%`,
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
    const getDetail = async () => {
      try {
        const res: any = await request.post('/zzyDashboard-d1d3', {
          ...searchTime,
          project: dataInfo?.id,
        });
        setData(res?.data || []);
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

  return (
    <Table
      bordered
      loading={loading}
      columns={columns}
      dataSource={data}
      scroll={{ y: 444 }}
      pagination={false}
      rowClassName={(row: any) => {
        if (`${row.od}` === '3') {
          return 'bg-[#fafafa]';
        }
        if (`${row.od}` === '1') {
          return 'bg-[#d9f7be]';
        }
        if (`${row.od}` === '2') {
          return 'bg-[#fff1b8]';
        }
        if (`${row.od}` === '0') {
          return 'bg-[#b7eb8f]';
        }
        return '';
      }}
    />
  );
};
