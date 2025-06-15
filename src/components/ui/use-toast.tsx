'use client'

import * as React from 'react'
import { useReducer, ReactNode } from 'react'

interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
  action?: ReactNode
  open?: boolean
}

type ToastState = {
  toasts: Toast[]
}

type ToastAction = 
  | { type: 'ADD_TOAST'; toast: Omit<Toast, 'id'>; toastId: string }
  | { type: 'DISMISS_TOAST'; toastId?: string }
  | { type: 'REMOVE_TOAST'; toastId?: string }

const toastReducer = (
  state: ToastState,
  action: ToastAction
): ToastState => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [
          ...state.toasts,
          {
            ...action.toast,
            id: action.toastId,
            open: true,
          },
        ],
      }
    case 'DISMISS_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toastId || action.toastId === undefined
            ? { ...t, open: false }
            : t
        ),
      }
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: action.toastId
          ? state.toasts.filter((t) => t.id !== action.toastId)
          : [],
      }
    default:
      return state
  }
}

export interface ToastContextValue {
  state: ToastState
  dispatch: React.Dispatch<ToastAction>
}

export const ToastContext = React.createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] })

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return {
    toast: (props: Omit<Toast, 'id'> & { id?: string }) => {
      const id = props.id || Math.random().toString(36).substring(2, 9)
      context.dispatch({
        type: 'ADD_TOAST',
        toast: {
          ...props
        },
        toastId: id,
      })

      setTimeout(() => {
        context.dispatch({ type: 'DISMISS_TOAST', toastId: id })
      }, 3000)
    },
    state: context.state
  }
}
