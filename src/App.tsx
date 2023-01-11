import { ConfigProvider } from 'antd';
import { Index } from './pages/Index';
import zhCN from 'antd/locale/zh_CN';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Index />
    </ConfigProvider>
  );
}

export default App;
