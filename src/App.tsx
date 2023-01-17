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
  console.log(import.meta.env.MODE);
  return (
    <ConfigProvider locale={zhCN}>
      {import.meta.env.MODE === 'index_0' && <Index />}
      {import.meta.env.MODE === 'index_1' && <IndexOne />}
      {import.meta.env.MODE === 'index_2' && <IndexTwo />}
    </ConfigProvider>
  );
}

export default App;
