import { cn } from '@zenithui/utils';
import { ButtonProps } from '../../lib/types';
import './button.css';

export default function Button({
  btntype,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button {...props} className={cn('zenithui-toast-btn', btntype, className)}>
      {children}
    </button>
  );
}
