import { useCallback, useEffect, useRef, useState } from 'react';
import { Toast } from '../../lib/types';
import { useToast } from '../../hooks/use-toast';
import { getToastAnimation, getToastTheme } from '../../lib/utils';
import './toast-item.css';
import Button from '../button/button';
import { ICONS, ToastAsset } from '../toast-asset/toast-asset';
import { cn } from '@zenithui/utils';

interface ToastItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The Instance Item of Toast.
   */
  toast: Toast;
}

export default function ToastItem({ toast, ...props }: ToastItemProps) {
  const {
    richColors,
    animation,
    position,
    showCloseButton,
    disableAutoDismiss,
    duration,
    classNames: globalClassNames,
    removeToast,
    setToasts,
  } = useToast();

  const { options } = toast;

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );
  const [message, setMessage] = useState<string>(
    options?.loading ?? 'Loading...',
  );

  // useRef to store timeout reference
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setTimer = useCallback(() => {
    if (
      !(options?.disableAutoDismiss
        ? options.disableAutoDismiss
        : disableAutoDismiss)
    ) {
      timeoutRef.current = setTimeout(
        () => {
          setToasts((prev) =>
            prev.map((t) => (t.id === toast.id ? { ...t, remove: true } : t)),
          );
        },
        options?.duration ? options?.duration : duration,
      );
    }
  }, []);

  const trackPromise = useCallback(async () => {
    try {
      const promiseData = await toast.message;
      setStatus('success');
      setMessage(
        typeof options?.success === 'function'
          ? options.success(promiseData)
          : (options?.success ?? 'Success !!'),
      );
    } catch (error) {
      setStatus('error');
      setMessage(
        typeof options?.error === 'function'
          ? options.error(error)
          : (options?.error ?? 'Error !!'),
      );
    } finally {
      setTimer();
    }
  }, []);

  // Auto-dismiss toast after duration
  useEffect(() => {
    if (toast.type === 'promise' && typeof toast.message !== 'string') {
      trackPromise();
    }
    // Clear timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      {...props}
      role="alert"
      aria-live="assertive"
      tabIndex={0}
      data-type={toast.type}
      data-animation={options?.animation ? options.animation : animation}
      data-rich-colors={options?.richColors ? options.richColors : richColors}
      className={cn(
        'zenithui-toast-wrapper',
        options?.richColors
          ? options.richColors
            ? getToastTheme(toast.type)
            : ''
          : richColors
            ? getToastTheme(toast.type)
            : '',
        getToastAnimation(
          options?.animation ? options.animation : animation,
          options?.position ? options.position : position,
          !toast.remove,
        ),
        options?.classNames
          ? typeof options.classNames === 'string'
            ? options?.classNames
            : (options?.classNames?.className ?? '')
          : (globalClassNames?.className ?? ''),
      )}
      onAnimationEnd={() => {
        if (toast.type !== 'promise' && typeof toast.message === 'string') {
          setTimer();
        }
        if (toast.remove) {
          removeToast(toast.id);
        }
      }}
    >
      <div data-icon={toast.type}>
        {options?.icon ? (
          options.icon
        ) : (
          <ToastAsset
            type={toast.type !== 'promise' ? toast.type : status}
            className={cn(
              options?.classNames
                ? typeof options.classNames !== 'string'
                  ? (options?.classNames?.icon ?? '')
                  : ''
                : (globalClassNames?.icon ?? ''),
            )}
          />
        )}
      </div>
      <div
        data-wrapper-zenithui
        data-expand={
          (options?.animation ? options.animation : animation) ===
          'enter-with-icon'
        }
      >
        <div
          data-content={true}
          style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <span
            className={cn(
              options?.classNames
                ? typeof options.classNames !== 'string'
                  ? (options?.classNames?.title ?? '')
                  : ''
                : (globalClassNames?.title ?? ''),
            )}
          >
            {toast.type === 'promise'
              ? message || ''
              : toast?.options?.title || toast.message}
          </span>
          {toast?.options?.description ? (
            <span
              className={cn(
                options?.classNames
                  ? typeof options.classNames !== 'string'
                    ? (options?.classNames?.description ?? '')
                    : ''
                  : (globalClassNames?.description ?? ''),
              )}
            >
              {toast.options.description}
            </span>
          ) : null}
        </div>
        {/* action btn */}
        {options?.action ? (
          <options.action {...options.action} btntype="action" />
        ) : (
          <>
            {options?.onAction ? (
              <Button
                btntype="action"
                className={cn(
                  options?.classNames
                    ? typeof options.classNames !== 'string'
                      ? (options?.classNames?.actionButton ?? '')
                      : ''
                    : (globalClassNames?.actionButton ?? ''),
                )}
                onClick={options.onAction}
              >
                Action
              </Button>
            ) : null}
          </>
        )}
        {/* cancel btn */}
        {options?.cancel ? (
          <options.cancel {...options.action} btntype="action" />
        ) : (
          <>
            {options?.onCancel ? (
              <Button
                btntype="cancel"
                className={cn(
                  'cancel',
                  options?.classNames
                    ? typeof options.classNames !== 'string'
                      ? (options?.classNames?.cancelButton ?? '')
                      : ''
                    : (globalClassNames?.cancelButton ?? ''),
                )}
                onClick={(e) => {
                  options?.onCancel?.(e);
                  setToasts((prev) =>
                    prev.map((t) =>
                      t.id === toast.id ? { ...t, remove: true } : t,
                    ),
                  );
                }}
              >
                Cancel
              </Button>
            ) : null}
          </>
        )}
      </div>
      {/* close btn */}
      {options?.close ? (
        <options.close {...options.action} btntype="close" />
      ) : (
        <>
          {options?.showCloseButton || showCloseButton ? (
            <button
              className={cn(
                'zenithui-toast-close',
                options?.richColors
                  ? options.richColors
                    ? `${getToastTheme(toast.type)} zenithui-toast-close-rich`
                    : ''
                  : richColors
                    ? `${getToastTheme(toast.type)} zenithui-toast-close-rich`
                    : '',
                options?.classNames
                  ? typeof options.classNames !== 'string'
                    ? (options?.classNames?.closeButton ?? '')
                    : ''
                  : (globalClassNames?.closeButton ?? ''),
              )}
              onClick={(e) => {
                options?.onClose?.(e);
                if (timeoutRef.current) {
                  // Clear timeout on manual close
                  clearTimeout(timeoutRef.current);
                }
                removeToast(toast.id);
              }}
            >
              <ICONS.CloseIcon />
            </button>
          ) : null}
        </>
      )}
    </div>
  );
}
