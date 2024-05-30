import { Helmet } from 'react-helmet';
import { request, GraphQLClient } from 'graphql-request';

import { ConveyorLogo } from '@autoinvent/conveyor';

import { Conveyor } from '@/index';

const endpoint = 'http://localhost:5173/graphql';
// const client = new GraphQLClient(endpoint);

const App = () => {
  // client.request('query { task_list() { message } }', {});
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
        fetcher={(params) =>
          request(endpoint, params.document, params.variables)
        }
      />
    </>
  );
};

export default App;
