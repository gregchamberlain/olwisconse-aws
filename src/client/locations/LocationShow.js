import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import QuoteList from '../quotes/QuoteList.js';

const LocationShow = ({ data }) => data.loading ? <div>Loading...</div> : (
  <div>
    <h1>{data.location.name}</h1>
    <h3>Quotes</h3>
    <QuoteList quotes={data.location.quotes} />
  </div>
);

const query = gql`query Location($id: String!) {
  location(id: $id) {
    id
    name
    quotes {
      id
      location {
        id
        name
      }
      phrases {
        sentence
        person {
          id
          username
        }
      }
    }
  }
}`;

export default graphql(query, {
  options: ({ params }) => ({ variables: { id: params.id }})
})(LocationShow);
