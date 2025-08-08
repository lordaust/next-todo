'use client'

import { ReactNode } from 'react'

export type BadgeVariant = 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink'

export interface SmallPillWithBorderProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  gray: 'bg-gray-50 text-gray-600 inset-ring inset-ring-gray-500/10',
  red: 'bg-red-50 text-red-700 inset-ring inset-ring-red-600/10',
  yellow: 'bg-yellow-50 text-yellow-800 inset-ring inset-ring-yellow-600/20',
  green: 'bg-green-50 text-green-700 inset-ring inset-ring-green-600/20',
  blue: 'bg-blue-50 text-blue-700 inset-ring inset-ring-blue-700/10',
  indigo: 'bg-indigo-50 text-indigo-700 inset-ring inset-ring-indigo-700/10',
  purple: 'bg-purple-50 text-purple-700 inset-ring inset-ring-purple-700/10',
  pink: 'bg-pink-50 text-pink-700 inset-ring inset-ring-pink-700/10',
}

export function SmallPillWithBorder({ 
  children, 
  variant = 'gray', 
  className = '' 
}: SmallPillWithBorderProps) {
  const baseClasses = 'inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium'
  const variantClasses = variantStyles[variant]
  
  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  )
}
