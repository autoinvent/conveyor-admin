import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    className={twMerge(
      'max-h-16 min-h-8 overflow-hidden break-all font-semibold text-2xl tracking-tighter',
    )}
    ref={ref}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';
