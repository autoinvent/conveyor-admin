import { Helmet } from 'react-helmet';
import { request } from 'graphql-request';

import { ConveyorLogo } from '@autoinvent/conveyor';

import { Conveyor } from '@/index';

const App = () => {
  const gqlUrl = '/graphql';
  return (
    <>
      <Helmet>
        <link
          id="favicon"
          rel="icon"
          type="image/svg+xml"
          href={ConveyorLogo}
        />
      </Helmet>
      <Conveyor
        fetcher={(params) => request(gqlUrl, params.document, params.variables)}
      />
    </>
  );
};

export default App;
