import { type ComponentType, type ReactNode, useEffect } from 'react';
import {
  LoadingScreen,
  camelToSnakeCase,
  useAlerts,
} from '@autoinvent/conveyor';
import { useQuery } from '@tanstack/react-query';

import { useConveyor } from '@/Conveyor';
import type { MQLFieldType } from '@/types';

import type { MQLType } from './types';
import { extractMQLBaseType, extractMQLType } from './utils';

export interface FetchHandler {
  onSuccess?: (data: any) => void;
  onError?: (err: Error) => void;
}

export interface MQLQueryField {
  name: string;
  args: {
    name: string;
    type: MQLType;
  }[];
  type: {
    name: string;
    fields: {
      type: MQLType;
      name: string;
    }[];
  };
}

export interface IntrospectionProviderProps extends FetchHandler {
  LoadingFallback?: ComponentType;
  children?: ReactNode;
}

export const IntrospectionProvider = ({
  LoadingFallback = LoadingScreen,
  onSuccess,
  onError,
  children,
}: IntrospectionProviderProps) => {
  const { addAlert } = useAlerts();
  const { selected: fetcher, setConveyor } = useConveyor(
    (state) => state.fetcher,
  );
  const operationName = 'introspection';
  const { data, error, isLoading, isSuccess, isError } = useQuery({
    queryKey: [operationName],
    queryFn: () => {
      return fetcher({ operationName, document: IntrospectionDocument });
    },
  });

  useEffect(() => {
    if (!isLoading) {
      if (isSuccess) {
        onSuccess
          ? onSuccess(data)
          : addAlert({
              content: 'Succesfully fetched introspection!',
              expires: 2000,
              className: 'success',
            });
        setConveyor((state) => {
          const models = Object.assign({}, state.models);
          const FIELDS = 'fields';
          // Extract models from query types
          const queryFields: MQLQueryField[] = data.__schema.queryType.fields;
          // biome-ignore lint/complexity/noForEach: to be reconfigured in v2
          queryFields
            .filter(({ name }) => name.endsWith('_item'))
            .forEach(({ type, args }) => {
              const modelName = type.name;
              // biome-ignore lint/complexity/noForEach: to be reconfigured in v2
              args.forEach(({ type: argType, name: fieldName }) => {
                const operation = 'item';
                if (!models[modelName]) {
                  models[modelName] = {};
                }
                if (!models[modelName][FIELDS]) {
                  models[modelName][FIELDS] = {};
                }
                // biome-ignore lint/style/noNonNullAssertion: To be replaced using immer and nullish assignment in v2
                if (!models[modelName][FIELDS]![fieldName]) {
                  // biome-ignore lint/style/noNonNullAssertion: To be replaced using immer and nullish assignment in v2
                  models[modelName][FIELDS]![fieldName] = {};
                }
                // biome-ignore lint/style/noNonNullAssertion: To be replaced using immer and nullish assignment in v2
                if (!models[modelName][FIELDS]![fieldName][operation]) {
                  // biome-ignore lint/style/noNonNullAssertion: To be replaced using immer and nullish assignment in v2
                  models[modelName][FIELDS]![fieldName][operation] =
                    extractMQLType(argType);
                }
              });

              // biome-ignore lint/complexity/noForEach: to be reconfigured in v2
              type.fields.forEach(({ type: fieldType, name: fieldName }) => {
                const operation = 'baseType';
                // biome-ignore lint/style/noNonNullAssertion: To be replaced using immer and nullish assignment in v2
                if (!models[modelName][FIELDS]![fieldName]) {
                  // biome-ignore lint/style/noNonNullAssertion: To be replaced using immer and nullish assignment in v2
                  models[modelName][FIELDS]![fieldName] = {};
                }
                // biome-ignore lint/style/noNonNullAssertion: To be replaced using immer and nullish assignment in v2
                if (!models[modelName][FIELDS]![fieldName][operation]) {
                  // biome-ignore lint/style/noNonNullAssertion: To be replaced using immer and nullish assignment in v2
                  models[modelName][FIELDS]![fieldName][operation] =
                    extractMQLBaseType(fieldType);
                }
              });
            });
          const mutationFields: Omit<MQLQueryField, 'type'>[] =
            data.__schema.mutationType.fields;
          // biome-ignore lint/complexity/noForEach: to be reconfigured in v2
          Object.keys(models).forEach((modelName) => {
            const queryName = camelToSnakeCase(modelName);
            const regexp = new RegExp(`${queryName}_[^_]*$`, 'g');
            // biome-ignore lint/complexity/noForEach: to be reconfigured in v2
            mutationFields
              .filter(({ name }) => name.match(regexp))
              .forEach(({ name, args }) => {
                const operation = name.substring(
                  queryName.length + 1,
                ) as keyof MQLFieldType;
                // biome-ignore lint/complexity/noForEach: to be reconfigured in v2
                args.forEach(({ type: argType, name: fieldName }) => {
                  // biome-ignore lint/style/noNonNullAssertion: To be replaced using immer and nullish assignment in v2
                  if (!models[modelName][FIELDS]![fieldName][operation]) {
                    // biome-ignore lint/style/noNonNullAssertion: To be replaced using immer and nullish assignment in v2
                    models[modelName][FIELDS]![fieldName][operation] =
                      extractMQLType(argType);
                  }
                });
              });
          });
          return {
            ...state,
            models,
          };
        });
      } else if (isError) {
        onError
          ? onError(error)
          : addAlert({
              content: `Failed to fetch introspection data: ${JSON.stringify(error)}`,
              className: 'danger',
            });
      }
    }
  }, [isLoading]);

  return isLoading ? <LoadingFallback /> : children;
};

export const IntrospectionDocument = `
{
    __schema {
        queryType {
            fields {
              name
              args {
                name
                type { kind name ofType {kind name ofType { kind name ofType { kind name  }}} }
            }
            type {
                name 
                fields {
                    name
                    type { kind name ofType {kind name ofType { kind name ofType { kind name  }}} }
                }
              } 
            }
        }

        mutationType {
            fields { 
              name
              args {
                name 
                type { kind name ofType {kind name ofType { kind name ofType { kind name  }}} }
            }
            }
        }
    }
  }
`;
