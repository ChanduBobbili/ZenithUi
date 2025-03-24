import { lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { registerToast } from './toast';
import {
  Toast,
  ToastOptions,
  ToastProviderProps,
  ToastType,
} from '../lib/types';
import { ToastContext } from '../hooks/use-toast';
import { useTheme, cn } from '@zenithui/utils';
import './../index.css';

// Lazy load the ToastContainer
const ToastContainer = lazy(() => import('./toast-container/toast-container'));

export default function ToastProvider({
  position = 'bottom-right',
  animation = 'fade',
  theme = 'auto',
  duration = 5000,
  maxToasts = 5,
  X_Offset = 0,
  Y_Offset = 0,
  richColors = false,
  disableAutoDismiss = false,
  enableQueueSystem = false,
  showCloseButton = false,
  classNames,
  children,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [queue, setQueue] = useState<Toast[]>([]);

  const hookTheme = useTheme();

  // Memoized theme class
  const themeClass = useMemo(() => {
    if (theme === 'auto') return hookTheme;
    return theme === 'dark' ? 'dark' : '';
  }, [theme, hookTheme]);

  // Add toast function
  const addToast = useCallback(
    (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      message: string | Promise<any>,
      type: ToastType,
      options?: ToastOptions,
    ) => {
      const id = Math.random().toString(36).substring(2, 11);
      const newToast: Toast = { id, type, message, remove: false, options };

      setQueue((prev) => (enableQueueSystem ? [...prev, newToast] : prev));
      setToasts((prev) => (!enableQueueSystem ? [...prev, newToast] : prev));
    },
    [enableQueueSystem],
  );

  // Remove toast function
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Manage toast queue processing
  useEffect(() => {
    if (enableQueueSystem && queue.length > 0 && toasts.length < maxToasts) {
      setQueue((prev) => prev.slice(1));
      setToasts((prev) => [...prev, queue[0]]);
    }
  }, [queue, enableQueueSystem, maxToasts, toasts]);

  // Register toast callback
  useEffect(() => {
    registerToast(addToast);
  }, [addToast]);

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      addToast,
      removeToast,
      setToasts,
      richColors,
      position,
      animation,
      showCloseButton,
      disableAutoDismiss,
      duration,
      X_Offset,
      Y_Offset,
      classNames,
    }),
    [
      addToast,
      removeToast,
      richColors,
      position,
      animation,
      showCloseButton,
      disableAutoDismiss,
      duration,
      X_Offset,
      Y_Offset,
      classNames,
    ],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} className={cn(themeClass)} />
    </ToastContext.Provider>
  );
}
