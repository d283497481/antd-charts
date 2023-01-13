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
} from '../components';
import request from '../components/dashboard/request';
import dayjs from 'dayjs';
// import data from './mock/d1';
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
        let formData = new FormData();
        for (let key in searchTime) {
          formData.append(key, searchTime[key]);
        }
        res = await request.post('/zzyDashboard-d1', formData);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
      const list = res
        ? (res ?? []).map((item: any) => {
            values.push(item?.id);
            return {
              ...(item || {}),
              label: item?.name,
              value: item?.id,
            };
          })
        : [];
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
  const dataInfo = options.filter((item: any) => value.includes(item.value));
  console.log(dataInfo);
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
          header={
            <DashCardHeader
              color="text-amber-600 bg-amber-200"
              title="项目燃尽图"
            />
          }
        >
          <div className="w-full">
            <LineChart dataInfo={dataInfo} />
          </div>
        </Card>
        <Card
          maxW="lg"
          className="m-3 min-w-[48%]"
          header={
            <DashCardHeader
              color="text-amber-600 bg-amber-200"
              title="项目驻场工程师统计"
            />
          }
        >
          <ColumnChart project={value} />
        </Card>
      </div>
      {dataInfo?.length === 1 && (
        <div className="flex mt-2 w-full px-5">
          <Card
            maxW="lg"
            className="m-3 min-w-[48%]"
            header={
              <DashCardHeader
                color="text-violet-600 bg-violet-200"
                title="阶段数据燃尽图"
              />
            }
          >
            <MultiLineChart dataInfo={dataInfo} />
          </Card>
          <Card
            maxW="lg"
            className="m-3 min-w-[48%]"
            header={
              <DashCardHeader
                color="text-violet-600 bg-violet-200"
                title="阶段数据表格"
              />
            }
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
          header={
            <DashCardHeader
              color="text-violet-600 bg-violet-200"
              title="项目人力规划与预计"
            />
          }
        >
          <div className="w-full">
            <TableListTotal dataInfo={dataInfo} searchTime={searchTime} />
          </div>
        </Card>
      </div>
    </div>
  );
};
