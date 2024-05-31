import { useFormContext } from 'react-hook-form';
import { Link } from '@tanstack/react-router';

export const IdCell = ({ model }: { model: string }) => {
  const fieldName = 'id';
  const { getValues } = useFormContext() ?? {};
  const value = getValues?.(fieldName);
  console.log(getValues);
  return (
    <Link
      to={`/${model}/${value}`}
      className="text-cyan-600 underline underline-offset-1"
    >
      {value}
    </Link>
  );
};
