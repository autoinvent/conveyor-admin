import { DataType, camelToSnakeCase } from '@autoinvent/conveyor';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useConveyor } from '@/Conveyor';
import { getUpdateFieldParams } from '@/utils';

export interface UseModelUpdateMutationProps {
  model: string;
  fieldNames: string[];
  mutationKeys?: string[];
}

export const useModelUpdateMutation = ({
  model,
  fieldNames,
  mutationKeys,
}: UseModelUpdateMutationProps) => {
  const queryClient = useQueryClient();
  const queryName = camelToSnakeCase(model);
  const operationName = `${queryName}_update`;
  const {
    selected: { fetcher, models },
  } = useConveyor((state) => state);
  const fieldParams = getUpdateFieldParams(model, fieldNames, models);
  const document = `
        mutation (${fieldParams.inputVariables.join(',')}) {
            ${operationName} (${fieldParams.queryArgs.join(',')}) {
                id
            }
        }
    `;
  const mutation = useMutation({
    mutationKey: mutationKeys ?? [model, operationName],
    mutationFn: (updateValues: DataType) => {
      return fetcher({ operationName, document, variables: updateValues });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [model] });
    },
  });
  return { ...mutation, operationName };
};
