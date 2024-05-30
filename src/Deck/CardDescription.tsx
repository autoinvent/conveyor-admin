import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    className={twMerge(
      'mb-2 min-h-0 flex-shrink-0 text-stone-400 text-xs group-hover:translate-y-[215px] group-hover:items-center',
      className,
    )}
    ref={ref}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';
