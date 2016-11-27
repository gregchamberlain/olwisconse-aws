import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import QuoteListItem from './QuoteListItem';

const QuoteList = ({ quotes }) => (
  <div>
    {quotes.map(quote => (
      <QuoteListItem key={quote.id} quote={quote} />
    ))}
  </div>
);

export default QuoteList;
