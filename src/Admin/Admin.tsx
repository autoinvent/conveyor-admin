import type { ComponentType, ReactNode } from 'react';

import { useConveyor } from '@/Conveyor';
import { Home } from '@/Home';
import { ModelCreatePage } from '@/ModelCreatePage';
import { ModelDetailPage } from '@/ModelDetailPage';
import { ModelIndexPage } from '@/ModelIndexPage';
import { Route, Routes } from '@/Routes';

import { Dashboard } from './Dashboard';

export interface AdminProps {
  RootComponent?: ComponentType;
  children?: ReactNode;
}

export const Admin = ({ RootComponent = Dashboard, children }: AdminProps) => {
  const { selected: rootPath } = useConveyor((state) => state.rootPath);
  return (
    <Routes RootComponent={RootComponent}>
      <Route path={`${rootPath}/`}>
        <Home />
      </Route>
      <Route path={`${rootPath}/$model`}>
        <ModelIndexPage />
      </Route>
      <Route path={`${rootPath}/$model/create`}>
        <ModelCreatePage />
      </Route>
      <Route path={`${rootPath}/$model/$id`}>
        <ModelDetailPage />
      </Route>
      {children}
    </Routes>
  );
};
