import { useFormContext } from 'react-hook-form';
import {
  DataLens,
  type Field,
  Lens,
  ModelFormValue,
  ModelFormInput,
  ModelIndex,
  useModelIndex,
} from '@autoinvent/conveyor';
import { Link } from '@tanstack/react-router';

export const RelationshipCell = ({ field }: { field: Field }) => {
  const fieldName = field.name;
  const { getValues } = useFormContext();
  const { selected } = useModelIndex((state: any) => ({
    onOpenFieldSelect: state.onOpenFieldSelect,
  }));
  const value = getValues(fieldName);

  return (
    <ModelIndex.Table.Cell fieldName={fieldName}>
      <Lens lens={DataLens.DISPLAY}>
        {value?.id ? (
          <Link to={`/${field.type}/${value.id}`}>
            <span className="h-full w-full p-1.5 text-start align-baseline text-cyan-600 underline underline-offset-1">
              {value.id}
            </span>
          </Link>
        ) : (
          <span className="h-full w-full p-1.5 text-start align-baseline">
            none
          </span>
        )}
      </Lens>
      <Lens lens={DataLens.EDITING}>
        {field.editable ? (
          <ModelFormInput
            field={field}
            onOpenFieldSelect={selected.onOpenFieldSelect}
          />
        ) : (
          <ModelFormValue field={field} />
        )}
      </Lens>
    </ModelIndex.Table.Cell>
  );
};
