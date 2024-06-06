import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export const CardField = React.forwardRef<
  HTMLPreElement,
  React.HTMLAttributes<HTMLPreElement>
>(({ className, ...props }, ref) => (
  <pre
    ref={ref}
    className={twMerge(
      'mb-2 w-[250px] flex-shrink-0 overflow-auto font-normal',
      className,
    )}
    {...props}
  />
));
CardField.displayName = 'CardField';
