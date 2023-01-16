import { ConfigProvider } from 'antd';
import Index from './pages/Index';
import { G2 } from '@ant-design/plots';
import IndexTwo from './pages/IndexTwo';
import { ColorList } from './components/dashboard/utils';
import zhCN from 'antd/locale/zh_CN';

function App() {
  const { registerTheme } = G2;
  registerTheme('custom-theme', ColorList);
  return (
    <ConfigProvider locale={zhCN}>
      {/* <Index /> */}
      <IndexTwo />
    </ConfigProvider>
  );
}

export default App;
