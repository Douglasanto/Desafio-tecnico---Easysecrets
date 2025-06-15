'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const toastVariants = cva(
  'relative w-full rounded-lg border p-4 shadow-lg transition-all',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string
  description?: string
  id?: string
}

export function Toast({ className, variant, title, description, id, ...props }: ToastProps) {
  return (
    <div className={cn(toastVariants({ variant }), className)} id={id} {...props}>
      <div className="space-y-1">
        {title && <h3 className="font-medium">{title}</h3>}
        {description && <p className="text-sm">{description}</p>}
      </div>
    </div>
  )
}

export const ToastAction = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none group-hover:opacity-100',
      className
    )}
    {...props}
  />
))
ToastAction.displayName = 'ToastAction'
