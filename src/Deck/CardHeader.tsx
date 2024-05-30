import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={twMerge(
      'flex max-h-16 translate-y-[200px] transform flex-col items-center justify-center gap-1.5 border-0 bg-transparent p-0 group-hover:translate-y-0',
      className,
    )}
    ref={ref}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';
