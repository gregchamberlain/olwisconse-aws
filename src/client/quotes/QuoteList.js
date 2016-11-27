import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import QuoteListItem from './QuoteListItem';
import QuoteForm from './QuoteForm';

const QuoteList = ({ data }) => (
  <div>
    <h1>Quotes</h1>
    { data.loading ? <div>Loading...</div> : (
      <div>
        {data.quotes.map(quote => (
          <QuoteListItem key={quote.id} quote={quote} />
        ))}
      </div>
    )}
    <QuoteForm />
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

export default graphql(query)(QuoteList);
