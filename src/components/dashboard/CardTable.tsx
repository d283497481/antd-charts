import { FC, ReactElement, ReactNode, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

interface CardProps {
  children: ReactNode;
  maxW: 'xs' | 'sm' | 'lg' | 'md';
  className?: string;
  header: ReactElement;
}

export const CardTable: FC<CardProps> = ({
  children,
  maxW,
  className,
  header,
}) => {
  const [full, setFull] = useState(false);
  // 创建一个fullScreen的handle
  const handle = useFullScreenHandle();
  return (
    <div className={`relative max-w-${maxW}  ${className}`}>
      {header}
      <span style={{ position: 'absolute', top: '6px', right: '10px' }}>
        {!full && (
          <Tooltip title="全屏">
            <FullscreenOutlined
              style={{ fontSize: 16 }}
              onClick={() => {
                // 点击设置full为true，接着调用handle的enter方法，进入全屏模式
                setFull(true);
                handle.enter();
              }}
            />
          </Tooltip>
        )}
      </span>
      <div className="shadow-lg p-4">
        <FullScreen
          handle={handle}
          className="max-h-[500px]"
          onChange={setFull}
        >
          {full && (
            <Tooltip title="退出全屏">
              <FullscreenExitOutlined
                style={{ fontSize: 16, marginLeft: 16 }}
                // 退出全屏模式并把full设置为false
                onClick={() => {
                  setFull(false);
                  handle.exit();
                }}
              />
            </Tooltip>
          )}
          {children}
        </FullScreen>
      </div>
    </div>
  );
};
