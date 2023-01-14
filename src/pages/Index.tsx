import React, { useState, useEffect } from 'react';
import type { SelectProps } from 'antd';
import { Button, DatePicker, Form, Select } from 'antd';
import {
  Card,
  DashCardHeader,
  LineChart,
  ColumnChart,
  TableListTotal,
  MultiLineChart,
  TableList,
  AreaChartTwo,
  AreaChartOne,
  AreaChart,
  DualAxesChart,
} from '../components';
import request from '../components/dashboard/request';
import dayjs from 'dayjs';
import data from './mock/d1';
const { RangePicker } = DatePicker;

const initialValues: any = {
  dateTime: [dayjs().subtract(7, 'day'), dayjs()], // 在职
};
export const Index = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState<string[]>([]); //项目选择
  const [searchTime, setSearchTime] = useState<any>({
    from: initialValues.dateTime[0].format('YYYY-MM-DD'),
    to: initialValues.dateTime[1].format('YYYY-MM-DD'),
  });
  const [options, setOptions] = useState<any>([]);
  useEffect(() => {
    const values: any = [];
    let res: any = [];
    const getDetail = async () => {
      try {
        res = await request.post('/zzyDashboard-d1', searchTime);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
      // const list = res
      //   ? (res?.data ?? []).map((item: any) => {
      //       values.push(item?.id);
      //       return {
      //         ...(item || {}),
      //         label: item?.name,
      //         value: item?.id,
      //       };
      //     })
      //   : [];
      const list = data.map((item: any) => {
        values.push(item?.id);
        return {
          ...(item || {}),
          label: item?.name,
          value: item?.id,
        };
      });
      setValue(values);
      setOptions(list);
    };
    getDetail();
  }, [searchTime]);
  // 初始值
  const changeTime = (rangeValue: any) => {
    console.log(rangeValue);
    setSearchTime({
      ...searchTime,
      from: rangeValue[0].format('YYYY-MM-DD'),
      to: rangeValue[1].format('YYYY-MM-DD'),
    });
  };
  const onReset = () => {
    setSearchTime({
      from: initialValues.dateTime[0].format('YYYY-MM-DD'),
      to: initialValues.dateTime[1].format('YYYY-MM-DD'),
    });
    form?.resetFields();
  };
  const onSearch = () => {
    const values = form.getFieldValue('project');
    setValue(values);
  };
  const selectProps: SelectProps = {
    mode: 'multiple',
    style: { width: '500px' },
    options,
    placeholder: '请选择',
  };
  const dataInfo = options.filter((item: any) =>
    (value || []).includes(item.value)
  );
  return (
    <div className="flex flex-col items-center">
      <span className="flex text-xl font-bold mt-5">
        <Form initialValues={initialValues} layout="inline" form={form}>
          <Form.Item name="dateTime" label="时间范围">
            <RangePicker onChange={changeTime} />
          </Form.Item>
          <Form.Item name="project" label="选择项目">
            <Select {...selectProps} />
          </Form.Item>
        </Form>
        <Button type="primary" danger onClick={onSearch}>
          搜索
        </Button>
        <Button danger className="ml-5" onClick={onReset}>
          重置
        </Button>
      </span>
      {/* line charts */}
      <div className="flex mt-2 w-full px-5">
        <Card
          className="m-3 min-w-[48%]"
          maxW="lg"
          header={<DashCardHeader title="项目燃尽图" />}
        >
          <LineChart dataInfo={dataInfo} />
        </Card>
        <Card
          maxW="lg"
          className="m-3 min-w-[48%]"
          header={<DashCardHeader title="项目驻场工程师统计" />}
        >
          <ColumnChart project={value} />
        </Card>
      </div>
      {dataInfo?.length === 1 && (
        <div className="flex mt-2 w-full px-5">
          <Card
            maxW="lg"
            className="m-3 min-w-[48%] "
            header={<DashCardHeader title="阶段数据燃尽图" />}
          >
            <MultiLineChart dataInfo={dataInfo} />
          </Card>
          <Card
            maxW="lg"
            className="m-3 min-w-[48%]"
            header={<DashCardHeader title="阶段数据表格" />}
          >
            <TableList dataInfo={dataInfo} searchTime={searchTime} />
          </Card>
        </div>
      )}
      {/* area charts */}
      <div className="flex mt-2 w-full px-5">
        <Card
          className="m-3 min-w-[100%]"
          maxW="lg"
          header={<DashCardHeader title="项目人力规划与预计" />}
        >
          <TableListTotal dataInfo={dataInfo} searchTime={searchTime} />
        </Card>
      </div>

      {/* area charts */}
      <div className="flex mt-2 w-full px-5">
        <Card
          className="m-3 min-w-[48%]"
          maxW="lg"
          header={<DashCardHeader title="项目人力情况分布（按项目）" />}
        >
          <AreaChartTwo searchTime={searchTime} />
        </Card>
        <Card
          className="m-3 min-w-[48%]"
          maxW="lg"
          header={<DashCardHeader title="空闲人员按角色分布" />}
        >
          <AreaChart searchTime={searchTime} />
        </Card>
      </div>
      {/* area charts */}
      <div className="flex mt-2 w-full px-5">
        {/* <Card
          className="m-3 min-w-[48%]"
          maxW="lg"
          header={<DashCardHeader title="项目人力投入" />}
        >
          <DualAxesChart dataInfo={dataInfo} searchTime={searchTime} />
        </Card> */}
        <Card
          className="m-3 min-w-[48%]"
          maxW="lg"
          header={<DashCardHeader title="项目人力情况分布（按角色）" />}
        >
          <AreaChartOne searchTime={searchTime} />
        </Card>
      </div>
    </div>
  );
};
