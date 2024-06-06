import { Alert, type AlertProps } from '@autoinvent/conveyor';
import { twMerge } from 'tailwind-merge';

export const CustomAlert = ({ className, ...rest }: AlertProps) => {
  return <Alert {...rest} className={twMerge('overflow-auto', className)} />;
};
