import React from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './App';

const opts = process.env.NODE_ENV === 'production' ? ({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
  }
}) : ({
  uri: 'http://localhost:3001/graphql',
  opts: {
    credentials: 'include',
  }
});
// let config;
// if (process.env.NODE_ENV === 'production') {
//   config = { dataIdFromObject: o => o.id };
// } else {
//   config = {
//     networkInterface: createNetworkInterface({
//       uri: 'http://localhost:3001/graphql',
//       opts: {
//         credentials: 'include',
//       }
//     }),
//
//   };
// }

const config = {
  networkInterface: createNetworkInterface(opts),
  dataIdFromObject: o => o.id
};

const client = new ApolloClient(config);

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default Root;
