import React from 'react';
import { useReducer } from 'react';

// 导出 context
export const MyContext = React.createContext<any>({
  state: {},
  dispatch: (value: any) => {},
});

// 第一个 reducer
const reducer = (state: any, action: any) => {
  const { type } = action;

  switch (type) {
    case 'add':
      return { ...state, ...action };
    default:
      return state;
  }
};

// 导出 Provider
export const MyProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, {});

  const values = {
    state,
    dispatch,
  };

  return <MyContext.Provider value={values}>{children}</MyContext.Provider>;
};
