import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        'group relative m-2 inline-block h-[300px] w-[300px] justify-center overflow-hidden rounded-lg border border-[--border-color] border-solid bg-[--bg-color] p-4 text-[--text-color] shadow-sm transition-all duration-300 ease-in-out hover:h-[300px]}',
        className,
      )}
      {...props}
    />
  );
});

Card.displayName = 'Card';
