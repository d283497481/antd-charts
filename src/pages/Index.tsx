import React, { useState, useEffect } from 'react';
import type { SelectProps } from 'antd';
import { Button, DatePicker, Form, Select, Empty } from 'antd';
import {
  Card,
  DashCardHeader,
  LineChartOne,
  MultiLineChartOne,
  TableListOne,
  TotalChildrenOne,
  CardTable,
} from '../components';
import request from '../components/dashboard/request';
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
// import data from '../components/mock/d1';

const { RangePicker } = DatePicker;

const initialValues: any = {
  dateTime: [dayjs().subtract(7, 'day'), dayjs()], // 在职
};
const Index = () => {
  const [form] = Form.useForm();
  const [oldValue, setOldValue] = useState<any>(null); //项目选择
  const [value, setValue] = useState<any>(null); //项目选择

  const [searchTime, setSearchTime] = useState<any>({
    from: initialValues.dateTime[0].format('YYYY-MM-DD'),
    to: initialValues.dateTime[1].format('YYYY-MM-DD'),
  });
  const [options, setOptions] = useState<any>([]);
  useEffect(() => {
    const getDetail = async () => {
      let res: any = [];
      try {
        res = await request.post('/zzyDashboard-d1', searchTime);
      } catch (error) {
        console.error(error);
      }
      // res = { data };
      const list =
        res && res?.data
          ? res?.data?.map((item: any) => {
              return {
                ...(item || {}),
                label: item?.name,
                value: item?.id,
              };
            })
          : [];
      setOldValue(list[0]?.value ?? null);
      setValue(list[0]?.value ?? null);
      setOptions(list);
      form.setFieldValue('project', list[0]?.value ?? null);
    };
    getDetail();
  }, [searchTime]);
  // 初始值
  const changeTime = (rangeValue: any) => {
    setSearchTime({
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
    form.setFieldValue('project', oldValue);
  };
  const onSearch = () => {
    const values = form.getFieldValue('project') ?? oldValue;
    setValue(!values ? oldValue : values);
  };
  const selectProps: SelectProps = {
    style: { width: '300px' },
    options,
    value,
    placeholder: '请选择',
  };

  const dataInfo = options.filter(
    (item: any) => (value || oldValue) === item.value
  )?.[0];
  console.log(dataInfo);
  return (
    <div className="flex flex-col items-center">
      <span className="flex text-xl font-bold mt-5">
        <Form initialValues={initialValues} layout="inline" form={form}>
          <Form.Item name="dateTime" label="时间范围">
            <RangePicker onChange={changeTime} locale={locale} />
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
      {dataInfo ? (
        <>
          {/* line charts */}
          <div className="flex mt-2 w-full px-5">
            <Card
              className="m-3 min-w-[48%]"
              maxW="lg"
              header={<DashCardHeader title="项目燃尽图" />}
            >
              <LineChartOne dataInfo={dataInfo} />
            </Card>
            <Card
              maxW="lg"
              className="m-3 min-w-[48%] "
              header={<DashCardHeader title="阶段数据燃尽图" />}
            >
              <MultiLineChartOne dataInfo={dataInfo} searchTime={searchTime} />
            </Card>
          </div>
          <div className="flex mt-2 w-full px-5">
            <CardTable
              maxW="lg"
              className="m-3 min-w-[100%]"
              header={<DashCardHeader title="阶段数据表格" />}
            >
              <TableListOne dataInfo={dataInfo} searchTime={searchTime} />
            </CardTable>
          </div>
          {/* area charts */}
          <TotalChildrenOne dataInfo={dataInfo} />
        </>
      ) : (
        <div className="flex justify-center items-center h-[80vh]">
          <Empty />
        </div>
      )}
    </div>
  );
};
export default Index;
