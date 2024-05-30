import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge(
      'mb-0.5 flex min-h-0 flex-shrink-0 items-center p-1.5 text-stone-400 text-xs',
      className,
    )}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';
