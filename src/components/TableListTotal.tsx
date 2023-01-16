import React, { useEffect, useState, useContext } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Card, DashCardHeader } from '../components';
import request from './dashboard/request';
import { MyContext } from './dashboard/context';

export const TableListTotal = ({ dataInfo, searchTime }: any) => {
  const { dispatch } = useContext(MyContext);
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
      title: '当期进展(人天)',
      ellipsis: true,
      dataIndex: 'curconsumed',
      render: val => `${(Number(val || 0) / 8).toFixed(1)}`,
      width: 120,
    },
    {
      title: '项目进展(按工时%)',
      dataIndex: 'progress',
      ellipsis: true,
      render: val => `${Number(val || 0).toFixed(1)}%`,
      width: 120,
    },
    // {
    //   title: '项目进展(按阶段%)',
    //   dataIndex: 'percent',
    //   ellipsis: true,
    //   render: val => `${Number(val || 0).toFixed(1)}%`,
    //   width: 120,
    // },
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
        dispatch({
          type: 'add',
          projectname: null,
          dataList: [],
        });
        setLoading(false);
      };
      getApi();
    }
  }, [dataInfo]);

  const clickRow = async (record: any) => {
    try {
      const res: any = await request.post('/zzyDashboard-d1d7', {
        project: record.id,
      });
      const dataList =
        res && res?.data?.[0]
          ? res?.data?.map((i: any) => {
              return {
                ...i,
                consumed: Number(i.consumed || 0),
              };
            })
          : [];
      dispatch({
        type: 'add',
        projectname: record.name,
        dataList: dataList,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'add',
        projectname: record.projectname,
        dataList: [],
      });
    }
  };
  return (
    <div className="flex mt-2 w-full px-5">
      <Card
        className="m-3 min-w-[100%]"
        maxW="lg"
        header={<DashCardHeader title="项目人力规划与预计" />}
      >
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
      </Card>
    </div>
  );
};
