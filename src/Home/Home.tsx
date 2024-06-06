import { useEffect, useState } from 'react';
import {
  Lens,
  Lenses,
  SearchBar,
  type SearchResult,
  useAlerts,
} from '@autoinvent/conveyor';
import { Link, useNavigate } from '@tanstack/react-router';

import { useConveyor } from '@/Conveyor';
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CircleCard,
  Deck,
  CardField,
} from '@/Deck';
import { useSearchQuery } from '@/hooks';

export const Home = () => {
  const navigate = useNavigate();
  const { addAlert } = useAlerts();
  const { selected: models } = useConveyor((state) => state.models);
  const { selected: rootPath } = useConveyor((state) => state.rootPath);

  const [searchValue, setSearchValue] = useState('');
  const { data, error, isLoading, isSuccess, isError, operationName } =
    useSearchQuery({ searchValue });
  const [searchedModels, setSearchedModels] = useState<
    Record<string, SearchResult[]>
  >({});

  useEffect(() => {
    if (isLoading === false) {
      if (isSuccess) {
        const newSearchedModels: Record<string, SearchResult[]> = {};
        // biome-ignore lint/complexity/noForEach: to be reconfigured in v2
        data?.[operationName]?.forEach((searchItem: SearchResult) => {
          const modelName = searchItem.type;
          if (!newSearchedModels[modelName]) {
            newSearchedModels[modelName] = [];
          }
          newSearchedModels[modelName].push(searchItem);
        });
        setSearchedModels(newSearchedModels);
      } else if (isError) {
        addAlert({
          content: `Failed to search for ${searchValue}: ${error}`,
          className: 'danger',
        });
      }
    }
  }, [data, isLoading, isSuccess, isError, error]);

  const displayedModelNames = Object.keys(
    searchValue ? searchedModels : models,
  );
  return (
    <div>
      <h2 className="mx-auto max-w-[1234px]">
        <SearchBar onSearch={(value) => setSearchValue(value)} />
      </h2>
      <Lenses activeLens={displayedModelNames.length > 0}>
        <Lens lens={true}>
          <Deck className="mx-auto">
            {displayedModelNames.map((modelName) => {
              return (
                <CircleCard
                  key={modelName}
                  onDoubleClick={() =>
                    navigate({ to: `/${rootPath}/${modelName}` })
                  }
                >
                  <CardHeader>
                    <CardTitle>{modelName}</CardTitle>
                    <CardDescription>
                      {`items: ${searchedModels?.[modelName]?.length ?? 0}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Lenses activeLens={searchValue.length > 0}>
                      <Lens lens={false}>
                        <CardField>
                          <ul>
                            {Object.keys(models[modelName].fields).map(
                              (field) => {
                                return <li key={field}>{field}</li>;
                              },
                            )}
                          </ul>
                        </CardField>
                      </Lens>
                      <Lens lens={true}>
                        <CardField>
                          <ul>
                            {searchedModels?.[modelName]?.map((searchItem) => {
                              return (
                                <li key={searchItem.value}>
                                  <Link
                                    to={`/${rootPath}/${modelName}/${searchItem.id}`}
                                  >
                                    {searchItem.value}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </CardField>
                      </Lens>
                    </Lenses>
                  </CardContent>
                </CircleCard>
              );
            })}
          </Deck>
        </Lens>
        <Lens lens={false}>
          <div> No models found.</div>
        </Lens>
      </Lenses>
    </div>
  );
};
