import React from 'react';
import ApolloClient, { createNetworkInterface, toIdValue } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import configureStore from './redux/store';

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

const dataIdFromObject = o => {
  if (o.id && o.__typename) {
    return o.__typename + o.id;
  }
  return null;

};
const config = {
  networkInterface: createNetworkInterface(opts),
  customResolvers: {
    Query: {
      image: (_, args) => toIdValue(dataIdFromObject({ __typename: 'Image', id: args['id'] })),
    },
  },
  dataIdFromObject
};

const client = new ApolloClient(config);
const store = configureStore(client);
window.store = process.env.NODE_ENV === 'production' ? null : store;

const Root = () => (
  <ApolloProvider store={store} client={client}>
    <App />
  </ApolloProvider>
);

export default Root;
