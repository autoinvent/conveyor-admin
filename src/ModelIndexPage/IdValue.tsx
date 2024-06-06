import { useFormContext } from '@autoinvent/conveyor';
import { Link } from '@tanstack/react-router';

import { useConveyor } from '@/Conveyor';

export const IdValue = ({ model }: { model: string }) => {
  const fieldName = 'id';
  const { getValues } = useFormContext() ?? {};
  const value = getValues?.(fieldName);
  const { selected: rootPath } = useConveyor((state) => state.rootPath);
  return (
    <Link
      to={`/${rootPath}/${model}/${value}`}
      className="text-cyan-600 underline underline-offset-1"
    >
      {value}
    </Link>
  );
};
