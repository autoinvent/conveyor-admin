import { type ID, camelToSnakeCase } from '@autoinvent/conveyor';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useConveyor } from '@/Conveyor';
import { getDeleteFieldParams } from '@/utils';

export interface useModelDeleteMutationProps {
  model: string;
  fieldNames: string[];
  mutationKeys?: string[];
}

export const useModelDeleteMutation = ({
  model,
  fieldNames,
  mutationKeys,
}: useModelDeleteMutationProps) => {
  const queryClient = useQueryClient();
  const queryName = camelToSnakeCase(model);
  const operationName = `${queryName}_delete`;
  const {
    selected: { fetcher, models },
  } = useConveyor((state) => state);
  const fieldParams = getDeleteFieldParams(model, fieldNames, models);
  const document = `
        mutation (${fieldParams.inputVariables.join(',')}) {
            ${operationName} (${fieldParams.queryArgs.join(',')})
        }
    `;
  const mutation = useMutation({
    mutationKey: mutationKeys ?? [model, operationName],
    mutationFn: (id: ID) => {
      return fetcher({ operationName, document, variables: { id } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [model] });
    },
  });
  return { ...mutation, operationName };
};
