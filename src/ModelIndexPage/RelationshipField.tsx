import {
  DataLens,
  type Field,
  Lens,
  ModelFormValue,
  ModelFormInput,
  useModelIndex,
  useFormContext,
} from '@autoinvent/conveyor';
import { Link } from '@tanstack/react-router';

import { useConveyor } from '@/Conveyor';

export const RelationshipField = ({ field }: { field: Field }) => {
  const fieldName = field.name;
  const methods = useFormContext();
  const { selected } = useModelIndex((state: any) => ({
    onOpenFieldSelect: state.onOpenFieldSelect,
  }));
  const value = methods?.getValues(fieldName);
  const { selected: rootPath } = useConveyor((state) => state.rootPath);

  return (
    <>
      <Lens lens={DataLens.DISPLAY}>
        {value?.id ? (
          <Link to={`/${rootPath}/${field.type}/${value.id}`}>
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
    </>
  );
};
