import { ConfigProvider } from 'antd';
import Index from './pages/Index';
import { G2 } from '@ant-design/plots';
import IndexTwo from './pages/IndexTwo';
import IndexOne from './pages/IndexOne';
import { ColorList } from './components/dashboard/utils';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';

function App() {
  const { registerTheme } = G2;
  registerTheme('custom-theme', ColorList);
  return (
    <ConfigProvider locale={zhCN}>
      <Index />
      {/* <IndexOne /> */}
      {/* <IndexTwo /> */}
    </ConfigProvider>
  );
}

export default App;
