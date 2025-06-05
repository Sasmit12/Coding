import React from "react";
import { cn } from "../../lib/utils"; // Adjust path if your utils file is elsewhere

const Avatar = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    >
      {children}
    </div>
  );
});
Avatar.displayName = "Avatar";

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn("absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-medium", className)}
      {...props}
    />
  );
});
AvatarFallback.displayName = "AvatarFallback";

export const AvatarInitials = AvatarFallback;

export { Avatar, AvatarFallback };