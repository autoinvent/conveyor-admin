import { useFormContext } from '@autoinvent/conveyor';
import { Link } from '@tanstack/react-router';

export const IdValue = ({ model }: { model: string }) => {
  const fieldName = 'id';
  const { getValues } = useFormContext() ?? {};
  const value = getValues?.(fieldName);
  return (
    <Link
      to={`/${model}/${value}`}
      className="text-cyan-600 underline underline-offset-1"
    >
      {value}
    </Link>
  );
};
