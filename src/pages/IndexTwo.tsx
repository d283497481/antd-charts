import React, { useState, useEffect } from 'react';
import type { SelectProps } from 'antd';
import { Button, DatePicker, Form, Select } from 'antd';
import {
  Card,
  DashCardHeader,
  AreaChartTwo,
  AreaChartOne,
  AreaChart,
  DualAxesChart,
} from '../components';
import request from '../components/dashboard/request';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const selectOption = [
  { label: 'AE', value: 'AE' },
  { label: 'PM', value: 'PM' },
  { label: 'SE', value: 'SE' },
  { label: 'TAG', value: 'TAG' },
  { label: 'TPS', value: 'TPS' },
  { label: '软件工程师', value: '软件工程师' },
];
const defaultRoleList = ['AE', 'PM', 'SE', 'TAG', 'TPS', '软件工程师'];
const selectRoleProps: SelectProps = {
  mode: 'multiple',
  style: { width: '120px' },
  options: selectOption,
  placeholder: '请选择',
};
const initialValues: any = {
  dateTime: [dayjs(), dayjs().add(30, 'day')],
};
const IndexTwo = () => {
  const [form] = Form.useForm();
  const [oldValue, setOldValue] = useState<string[]>([]); //项目选择
  const [value, setValue] = useState<string[]>([]); //项目选择

  const [roleValue, setRoleValue] = useState<string[]>(defaultRoleList); //角色选择
  const [searchTime, setSearchTime] = useState<any>({
    from: initialValues.dateTime[0].format('YYYY-MM-DD'),
    to: initialValues.dateTime[1].format('YYYY-MM-DD'),
  });
  const [options, setOptions] = useState<any>([]);
  useEffect(() => {
    const getDetail = async () => {
      const values: any = [];
      let res: any = [];
      try {
        res = await request.post('/zzyDashboard-d1', searchTime);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
      const list = res
        ? (res?.data ?? []).map((item: any) => {
            values.push(item?.id);
            return {
              ...(item || {}),
              label: item?.name,
              value: item?.id,
            };
          })
        : [];
      setOldValue(values);
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
    setValue(oldValue);
    setRoleValue(defaultRoleList);
    form?.resetFields();
  };
  const onSearch = () => {
    const values = form.getFieldValue('project') ?? oldValue;
    const valueRole = form.getFieldValue('roleList') ?? defaultRoleList;
    setValue(values);
    setRoleValue(valueRole);
  };
  const selectProps: SelectProps = {
    mode: 'multiple',
    style: { width: '300px' },
    options,
    placeholder: '请选择',
  };
  const dataInfo = options.filter((item: any) =>
    (value || oldValue).includes(item.value)
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
          <Form.Item name="roleList" label="选择角色">
            <Select {...selectRoleProps} />
          </Form.Item>
        </Form>
        <Button type="primary" danger onClick={onSearch}>
          搜索
        </Button>
        <Button danger className="ml-5" onClick={onReset}>
          重置
        </Button>
      </span>
      {/* area charts */}
      <div className="flex mt-2 w-full px-5">
        <Card
          className="m-3 min-w-[48%]"
          maxW="lg"
          header={<DashCardHeader title="项目人力情况分布（按项目）" />}
        >
          <AreaChartTwo searchTime={searchTime} project={value} />
        </Card>
        <Card
          className="m-3 min-w-[48%]"
          maxW="lg"
          header={<DashCardHeader title="空闲人员按角色分布" />}
        >
          <AreaChart
            searchTime={{ ...searchTime, role: roleValue.join(',') }}
          />
        </Card>
      </div>
      {/* area charts */}
      <div className="flex mt-2 w-full px-5">
        <Card
          className="m-3 min-w-[48%]"
          maxW="lg"
          header={<DashCardHeader title="项目人力投入" />}
        >
          <DualAxesChart dataInfo={dataInfo} searchTime={searchTime} />
        </Card>
        <Card
          className="m-3 min-w-[48%]"
          maxW="lg"
          header={<DashCardHeader title="项目人力情况分布（按角色）" />}
        >
          <AreaChartOne
            searchTime={{ ...searchTime, role: roleValue.join(',') }}
          />
        </Card>
      </div>
    </div>
  );
};
export default IndexTwo;