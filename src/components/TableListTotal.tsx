import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import request from './dashboard/request';

export const TableListTotal = ({ dataInfo, searchTime, rowClick }: any) => {
  const columns: ColumnsType<any> = [
    {
      title: '项目名称',
      dataIndex: 'name',
      ellipsis: true,
      width: 400,
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
      ellipsis: true,
      dataIndex: 'curconsumed',
      render: val => `${(Number(val || 0) / 8).toFixed(1)}`,
      width: 120,
    },
    {
      title: '项目进展(按工时%)',
      dataIndex: 'progress',
      ellipsis: true,
      render: val => `${(Number(val || 0) * 100).toFixed(1)}%`,
      width: 120,
    },
    {
      title: '项目进展(按阶段%)',
      dataIndex: 'percent',
      ellipsis: true,
      render: val => `${(Number(val || 0) * 100).toFixed(1)}%`,
      width: 120,
    },
    {
      title: '已消耗工时(人天)',
      dataIndex: 'consumed',
      ellipsis: true,
      render: val => `${(Number(val || 0) / 8).toFixed(1)}`,
      width: 120,
    },
    {
      title: '剩余预计工时(人天)',
      dataIndex: 'left',
      ellipsis: true,
      render: val => `${(Number(val || 0) / 8).toFixed(1)}`,
      width: 130,
    },
    {
      title: '总计划工时(人天)',
      dataIndex: 'estimate',
      ellipsis: true,
      render: val => `${(Number(val || 0) / 8).toFixed(1)}`,
      width: 120,
    },
    {
      title: '已消耗工时占比(%)',
      dataIndex: 'consumedper',
      ellipsis: true,
      render: val => `${(Number(val || 0) * 100).toFixed(1)}%`,
      width: 120,
    },
    {
      title: '现场+远程人数',
      dataIndex: 'teamnum',
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
      const postApi: any[] = [];

      for (let i = 0; i < dataInfo.length; i++) {
        postApi.push(getDetail(dataInfo[i]?.id, dataInfo[i]));
      }
      const getApi = async () => {
        const res = await Promise.all(postApi);
        setData(res);
        setLoading(false);
      };
      getApi();
    }
  }, [dataInfo]);

  const clickRow = async (record: any) => {
    try {
      const res: any = await request.post('/zzyDashboard-d1d7', {
        project: record.project,
      });
      const dataList = res
        ? (res?.data || []).map((i: any) => {
            return { ...i, consumed: Number(i?.consumed || 0) };
          })
        : [];
      rowClick({
        projectname: record.projectname,
        dataList: dataList,
      });
    } catch (error) {
      console.error(error);
      rowClick({
        projectname: record.projectname,
        dataList: [],
      });
    }
  };
  return (
    <Table
      onRow={record => {
        return {
          onClick: () => {
            clickRow(record);
          }, // 点击行
        };
      }}
      rowKey="name"
      bordered
      loading={loading}
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ y: 400 }}
    />
  );
};
