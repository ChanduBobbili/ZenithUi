import SuccessIcon from '@/assets/success.svg?react';
import InfoIcon from '@/assets/info.svg?react';
import ErrorIcon from '@/assets/error.svg?react';
import WarningIcon from '@/assets/warning.svg?react';
import { ToastType } from '../../lib/types';
import { cn } from '../../lib/utils';
import './toast-asset.css';

export const ToastAsset: React.FC<{ type: ToastType; className: string }> = ({
  type,
  className,
}) => {
  switch (type) {
    case 'success':
      return <SuccessIcon className={cn(className)} />;
    case 'info':
      return <InfoIcon className={cn(className)} />;
    case 'error':
      return <ErrorIcon className={cn(className)} />;
    case 'warning':
      return <WarningIcon className={cn(className)} />;
    case 'loading':
      return <Loader visible={true} className={cn(className)} />;
    default:
      return <SuccessIcon className={cn(className)} />;
  }
};

const bars = Array(12).fill(0);

const Loader = ({
  visible,
  className,
}: {
  visible: boolean;
  className?: string;
}) => {
  return (
    <div
      className={['zenithui-loading-wrapper', className]
        .filter(Boolean)
        .join(' ')}
      data-visible={visible}
    >
      <div className="zenithui-spinner">
        {bars.map((_, i) => (
          <div
            className="zenithui-loading-bar"
            key={`zenithui-spinner-bar-${i}`}
          />
        ))}
      </div>
    </div>
  );
};
