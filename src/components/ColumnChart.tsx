import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';
import { each, groupBy } from '@antv/util';
import request from '../components/dashboard/request';

export const ColumnChart = (project: any) => {
  // const data = [
  //   {
  //     year: '1991',
  //     value: 3,
  //     type: 'Lon',
  //   },
  //   {
  //     year: '1992',
  //     value: 4,
  //     type: 'Lon',
  //   },
  //   {
  //     year: '1993',
  //     value: 3.5,
  //     type: 'Lon',
  //   },
  //   {
  //     year: '1994',
  //     value: 5,
  //     type: 'Lon',
  //   },
  //   {
  //     year: '1995',
  //     value: 4.9,
  //     type: 'Lon',
  //   },
  //   {
  //     year: '1996',
  //     value: 6,
  //     type: 'Lon',
  //   },
  //   {
  //     year: '1997',
  //     value: 7,
  //     type: 'Lon',
  //   },
  //   {
  //     year: '1998',
  //     value: 9,
  //     type: 'Lon',
  //   },
  //   {
  //     year: '1999',
  //     value: 13,
  //     type: 'Lon',
  //   },
  //   {
  //     year: '1991',
  //     value: 3,
  //     type: 'Bor',
  //   },
  //   {
  //     year: '1992',
  //     value: 4,
  //     type: 'Bor',
  //   },
  //   {
  //     year: '1993',
  //     value: 3.5,
  //     type: 'Bor',
  //   },
  //   {
  //     year: '1994',
  //     value: 5,
  //     type: 'Bor',
  //   },
  //   {
  //     year: '1995',
  //     value: 4.9,
  //     type: 'Bor',
  //   },
  //   {
  //     year: '1996',
  //     value: 6,
  //     type: 'Bor',
  //   },
  //   {
  //     year: '1997',
  //     value: 7,
  //     type: 'Bor',
  //   },
  //   {
  //     year: '1998',
  //     value: 9,
  //     type: 'Bor',
  //   },
  //   {
  //     year: '1999',
  //     value: 13,
  //     type: 'Bor',
  //   },
  // ];
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const getDetail = async () => {
      try {
        const res = await request.post('/zzyDashboard-d1d4');
      } catch (error) {
        console.error(error);
      }
      const data = [
        {
          root: '349',
          role: 'AE',
          c: '2',
          projectname:
            '[FXMTMDT2021016-2A] XMTM T18 FDC Implementation Project',
        },
        {
          root: '349',
          role: 'PM',
          c: '1',
          projectname:
            '[FXMTMDT2021016-2A] XMTM T18 FDC Implementation Project',
        },
        {
          root: '350',
          role: 'AE',
          c: '1',
          projectname:
            '[FXMTMDT2022009-2A] XMTM T18 R2R Implementation Project',
        },
        {
          root: '350',
          role: 'PM',
          c: '1',
          projectname:
            '[FXMTMDT2022009-2A] XMTM T18 R2R Implementation Project',
        },
        {
          root: '350',
          role: 'SE',
          c: '1',
          projectname:
            '[FXMTMDT2022009-2A] XMTM T18 R2R Implementation Project',
        },
        {
          root: '413',
          role: 'AE',
          c: '6',
          projectname:
            '[BCDDT2021014-2A]ICRD-eFDC/eR2R Strategy Project(PD/CON)',
        },
        {
          root: '413',
          role: 'PM',
          c: '1',
          projectname:
            '[BCDDT2021014-2A]ICRD-eFDC/eR2R Strategy Project(PD/CON)',
        },
        {
          root: '435',
          role: 'AE',
          c: '2',
          projectname:
            '[FBJSLIT2022019-2A] Silex Beijing FDC implementation project',
        },
        {
          root: '435',
          role: 'PM',
          c: '1',
          projectname:
            '[FBJSLIT2022019-2A] Silex Beijing FDC implementation project',
        },
        {
          root: '453',
          role: 'AE',
          c: '2',
          projectname:
            '[FBJSLIT2022019-2B] Silex Beijing R2R implementation project',
        },
        {
          root: '453',
          role: 'PM',
          c: '1',
          projectname:
            '[FBJSLIT2022019-2B] Silex Beijing R2R implementation project',
        },
        {
          root: '453',
          role: 'TAG',
          c: '1',
          projectname:
            '[FBJSLIT2022019-2B] Silex Beijing R2R implementation project',
        },
        {
          root: '453',
          role: 'TPS',
          c: '1',
          projectname:
            '[FBJSLIT2022019-2B] Silex Beijing R2R implementation project',
        },
        {
          root: '530',
          role: 'AE',
          c: '2',
          projectname:
            '[FSXSMDS2022020-XX] SMEC(ShaoXing) eFDC Phase5 Implementation Project',
        },
        {
          root: '530',
          role: 'PM',
          c: '1',
          projectname:
            '[FSXSMDS2022020-XX] SMEC(ShaoXing) eFDC Phase5 Implementation Project',
        },
        {
          root: '601',
          role: 'AE',
          c: '1',
          projectname: '[FCDCHIT2021018-2B]CHJS APC Project',
        },
        {
          root: '601',
          role: 'PM',
          c: '2',
          projectname: '[FCDCHIT2021018-2B]CHJS APC Project',
        },
        {
          root: '601',
          role: 'SE',
          c: '2',
          projectname: '[FCDCHIT2021018-2B]CHJS APC Project',
        },
        {
          root: '620',
          role: 'PM',
          c: '2',
          projectname: '[FCDCHIT2021018-2A]CHJS FDC Project',
        },
        {
          root: '636',
          role: 'AE',
          c: '3',
          projectname: '[FZZCRIT2022021-2A]CRRC FDC Project 2022',
        },
        {
          root: '636',
          role: 'PM',
          c: '1',
          projectname: '[FZZCRIT2022021-2A]CRRC FDC Project 2022',
        },
        {
          root: '636',
          role: '\u8f6f\u4ef6\u5de5\u7a0b\u5e08',
          c: '2',
          projectname: '[FZZCRIT2022021-2A]CRRC FDC Project 2022',
        },
      ];
      const list = data.map((item: any) => {
        return {
          ...item,
          value: Number(item.c),
        };
      });
      setData(list);
    };
    getDetail();
  }, [project]);
  // 也可以在项目中直接使用 lodash
  const annotations: {
    type: string;
    position: any[];
    content: string;
    style: { textAlign: string; fontSize: number; fill: string };
    offsetY: number;
  }[] = [];
  each(groupBy(data, 'projectname'), (values, k) => {
    const value = values.reduce((a: any, b: { value: any }) => a + b.value, 0);
    annotations.push({
      type: 'text',
      position: [k, value],
      content: `${value}`,
      style: {
        textAlign: 'center',
        fontSize: 14,
        fill: 'rgba(0,0,0,0.85)',
      },
      offsetY: -10,
    });
  });
  const config: any = {
    data,
    isStack: true,
    xField: 'projectname',
    yField: 'value',
    seriesField: 'role',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'bottom',
      // 'top', 'bottom', 'middle'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
    xAxis: {
      label: {
        autoRotate: false,
        labelEmit: true,
        formatter: function (value: any) {
          let valueTxt = '';
          if (value.length > 3) {
            valueTxt = value.substring(0, 4) + '...';
          } else {
            valueTxt = value;
          }
          return valueTxt;
        },
      },
    },
    // 使用 annotation （图形标注）来展示：总数的 label
    annotations,
    columnBackground: {
      style: {
        fill: 'rgba(0,0,0,0.1)',
      },
    },
  };

  return <Column {...config} />;
};
