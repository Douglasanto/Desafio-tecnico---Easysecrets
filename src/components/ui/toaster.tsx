'use client'

import * as React from 'react'
import { Toast } from './toast'
import { useToast } from './use-toast'

export function Toaster() {
  const { state } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {state.toasts
        .filter((toast) => toast.open !== false)
        .map((toast) => (
          <Toast
            key={toast.id}
            title={toast.title}
            description={toast.description}
            variant={toast.variant}
          >
            {toast.action}
          </Toast>
        ))}
    </div>
  )
}
