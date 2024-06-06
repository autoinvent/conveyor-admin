import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export const CircleCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Event handlers for mouse enter and leave
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={ref}
      className={twMerge(
        'group relative m-2 inline-block h-[300px] w-[300px] justify-center overflow-hidden rounded-lg border border-[--border-color] border-solid bg-[--bg-color] p-4 text-[--text-color] shadow-sm transition-all duration-300 ease-in-out hover:h-[300px]}',
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="-translate-x-1/2 -translate-y-[70%] group-hover:-translate-y-1/2 absolute top-1/2 left-1/2 flex h-[175px] w-[175px] transform items-center justify-center rounded-[100px] bg-[--border-color] transition-all duration-300 group-hover:h-full group-hover:w-full group-hover:rounded-lg">
        {/* Render the content always */}
        <div className="box-border scale-[60%] transition-all duration-300 ease-in-out group-hover:scale-100">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              if (!isHovered) {
                if (
                  child.type &&
                  (child.type as any).displayName !== 'CardHeader' &&
                  (child.type as any).displayName !== 'CardTitle'
                ) {
                  return React.cloneElement(child);
                }
              } else if (child.type) {
                return React.cloneElement(child);
              }
            }
            return null;
          })}
        </div>
      </div>
      {/* Render title and description below circle */}
      {!isHovered &&
        React.Children.map(children, (child) => {
          if (
            React.isValidElement(child) &&
            ((child.type as any).displayName === 'CardHeader' ||
              (child.type as any).displayName === 'CardTitle')
          ) {
            return React.cloneElement(child);
          }
          return null;
        })}
    </div>
  );
});

CircleCard.displayName = 'CircleCard';
