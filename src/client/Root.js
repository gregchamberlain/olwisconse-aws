import React from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './App';

let config;
if (process.env.NODE_ENV === 'production') {
  config = { dataIdFromObject: o => o.id };
} else {
  config = {
    networkInterface: createNetworkInterface({
      uri: 'http://localhost:3001/graphql',
      opts: {
        credentials: true,
      }
    }),
    dataIdFromObject: o => o.id
  };
}

const client = new ApolloClient(config);

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default Root;
