"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "../../lib/utils" // Adjust path as needed

// cva utility for class variance authority replaced by a simple function for plain JS projects
function labelVariants() {
  return "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
}

const Label = React.forwardRef(function Label(
  { className, ...props }, ref
) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
  )
})
Label.displayName = LabelPrimitive.Root.displayName

export { Label }