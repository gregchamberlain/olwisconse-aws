import React from 'react';
import { Link } from 'react-router';

const QuoteListItem = ({ quote }) => (
  <div style={styles.container}>
    {/* <Link to={`/quotes/${quote.id}`}>Go To Quote</Link> */}
    {quote.location ? (
      <Link to={`/locations/${quote.location.id}`}>
        <small>{quote.location.name}</small>
      </Link>
    ) : null }
    {quote.phrases.map((phrase, idx) => (
      <div key={`${quote.id}-${idx}`}>
        "{phrase.sentence}" - <Link to={`/members/${phrase.person.id}`}>{phrase.person.username}</Link>
      </div>
    ))}
  </div>
);

const styles = {
  container: {
    borderRadius: 5,
    border: '1px solid #ccc',
    margin: 5,
    padding: 5
  }
};

export default QuoteListItem;
