import { useFormContext } from 'react-hook-form';
import { ModelIndex } from '@autoinvent/conveyor';
import { Link } from '@tanstack/react-router';

export const IdCell = ({ model }: { model: string }) => {
  const fieldName = 'id';
  const { getValues } = useFormContext();
  const value = getValues(fieldName);

  return (
    <ModelIndex.Table.Cell fieldName={fieldName}>
      <Link
        to={`/${model}/${value}`}
        className="text-cyan-600 underline underline-offset-1"
      >
        {value}
      </Link>
    </ModelIndex.Table.Cell>
  );
};
