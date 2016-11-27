import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import QuoteList from '../quotes/QuoteList';

const UserShow = ({ data }) => data.loading ? <div>Loading...</div> : (
  <div>
    <h1>{data.user.username}</h1>
    <h3>Quotes</h3>
    <QuoteList quotes={data.user.quotes} />
  </div>
);

const query = gql`query User($username: String!) {
  user(username: $username) {
    id
    username
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
  options: ({ params }) => ({ variables: { username: params.username }})
})(UserShow);
