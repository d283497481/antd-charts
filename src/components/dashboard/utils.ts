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
