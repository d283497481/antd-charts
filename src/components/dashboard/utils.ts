import dayjs from 'dayjs';

export const timeList = (searchTime: { from: string; to: string }) => {
  if (searchTime.from && searchTime.to) {
    const num = dayjs(searchTime.to).diff(searchTime.from, 'day');
    const numList = new Array(num + 1)
      .fill('')
      .map((_n, i) =>
        dayjs(searchTime.from).add(i, 'day').format('YYYY-MM-DD')
      );
    return numList;
  }
  return [];
};

export const groupBy = (
  objectArray: any[],
  property: string,
  key: string,
  searchTime: { from: string; to: string }
) => {
  const list = objectArray.reduce(function (
    acc: { [x: string]: any[] },
    obj: { [x: string]: any }
  ) {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  },
  {});
  if (searchTime) {
    const newList: any = [];
    const timeData = timeList(searchTime);
    for (let keys in list) {
      const items = list[keys] || [];
      if (items.length) {
        timeData.forEach(tm => {
          const newObj = items.filter((i: any) => i[key] === tm)?.[0] || {};
          newList.push({
            [property]: keys,
            [key]: tm,
            ...newObj,
          });
        });
      }
    }
    return newList;
  }

  return Object.values(list).flat(1);
};

export const ColorList = {
  colors10: [
    '#025DF4',
    '#DB6BCF',
    '#2498D1',
    '#BBBDE6',
    '#4045B2',
    '#21A97A',
    '#FF745A',
    '#007E99',
    '#FFA8A8',
    '#2391FF',
  ],
  colors20: [
    '#025DF4',
    '#DB6BCF',
    '#2498D1',
    '#BBBDE6',
    '#4045B2',
    '#21A97A',
    '#FF745A',
    '#007E99',
    '#FFA8A8',
    '#2391FF',
    '#FFC328',
    '#A0DC2C',
    '#946DFF',
    '#626681',
    '#EB4185',
    '#CD8150',
    '#36BCCB',
    '#327039',
    '#803488',
    '#83BC99',
  ],
};
