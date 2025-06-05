"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"

// Minimal cva replacement for JS
function toggleVariants({ variant = "default", size = "default", className = "" } = {}) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2"
  const variants = {
    variant: {
      default: "bg-transparent",
      outline:
        "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
    },
    size: {
      default: "h-10 px-3 min-w-10",
      sm: "h-9 px-2.5 min-w-9",
      lg: "h-11 px-5 min-w-11",
    },
  }
  return [
    base,
    variants.variant[variant] || variants.variant.default,
    variants.size[size] || variants.size.default,
    className,
  ]
    .filter(Boolean)
    .join(" ")
}

import { cn } from "@/lib/utils"

const Toggle = React.forwardRef(function Toggle(
  { className, variant, size, ...props }, ref
) {
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
})

export { Toggle, toggleVariants }