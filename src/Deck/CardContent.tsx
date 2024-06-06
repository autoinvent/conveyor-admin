import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={twMerge(
      'relative flex max-h-[200px] w-[300px] flex-wrap items-center overflow-hidden px-6 transition-all duration-300 ease-in-out group-hover:h-[200px] group-hover:overflow-y-auto',
      className,
    )}
    ref={ref}
    {...props}
  />
));
CardContent.displayName = 'CardContent';
