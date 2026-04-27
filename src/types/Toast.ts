export type ToastType = "success" | "info" | "warning" | "error"

export interface ToastOptions {
  title?: string
  message: string
  type?: ToastType
  timeout?: number
}
