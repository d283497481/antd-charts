import { ConfigProvider } from 'antd';
import Index from './pages/Index';
import IndexTwo from './pages/IndexTwo';

import zhCN from 'antd/locale/zh_CN';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Index />
      {/* <IndexTwo /> */}
    </ConfigProvider>
  );
}

export default App;
