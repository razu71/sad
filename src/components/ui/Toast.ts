import { useToast as useToastification } from 'vue-toastification'
import type { ToastOptions } from '@/types/Toast'

function toOptions(options?: ToastOptions): Record<string, unknown> {
  return {
    timeout: options?.timeout ?? 4000,
  }
}

export function useToast() {
  const toast = useToastification()

  return {
    success(message: string, options?: ToastOptions) {
      return toast.success(options?.title ? `${options.title}: ${message}` : message, toOptions(options))
    },
    error(message: string, options?: ToastOptions) {
      return toast.error(options?.title ? `${options.title}: ${message}` : message, toOptions(options))
    },
    info(message: string, options?: ToastOptions) {
      return toast.info(options?.title ? `${options.title}: ${message}` : message, toOptions(options))
    },
    warning(message: string, options?: ToastOptions) {
      return toast.warning(options?.title ? `${options.title}: ${message}` : message, toOptions(options))
    },
  }
}
