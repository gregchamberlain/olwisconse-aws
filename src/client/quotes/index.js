import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import QuoteList from './QuoteList';
import QuoteForm from './QuoteForm';

const QuoteIndex = ({ data }) => (
  <div>
    <h1>Quotes</h1>
    <QuoteForm />
    { data.loading ? <h3>Loading...</h3> : <QuoteList quotes={data.quotes} />}
  </div>
);

const query = gql`query Quotes {
  quotes {
    id
    phrases {
      sentence
      person {
        id
        username
      }
    }
    location {
      id
      name
    }
  }
}`;

export default graphql(query)(QuoteIndex);
