import { Helmet } from 'react-helmet';
import { request } from 'graphql-request';

import { ConveyorLogo } from '@autoinvent/conveyor';
import { Conveyor } from '../src/index';

const endpoint = 'http://localhost:5173/graphql';

const App = () => {
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
        rootPath='dev'
        fetcher={(params) =>
          request(endpoint, params.document, params.variables)
        }
      />
    </>
  );
};

export default App;
