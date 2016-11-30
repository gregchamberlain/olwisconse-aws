import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ImageFragment from '../graphql/ImageFragment.gql';
import QuoteList from '../quotes/QuoteList';
import ImageList from '../images/ImageList';

const UserShow = ({ data }) => data.loading ? <div>Loading...</div> : (
  <div>
    {console.log(data)}
    <h1>{data.user.username}</h1>
    <h3>Quotes</h3>
    <QuoteList quotes={data.user.quotes} />
    <h3>Images</h3>
    <ImageList images={data.user.images} />
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
    images {
      ...ImageFragment
    }
  }
}
${ImageFragment}
`;

export default graphql(query, {
  options: ({ params }) => ({ variables: { username: params.username }})
})(UserShow);
