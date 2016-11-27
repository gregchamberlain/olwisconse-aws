import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const LocationShow = ({ data }) => data.loading ? <div>Loading...</div> : (
  <div>
    <h1>{data.location.name}</h1>
  </div>
);

const query = gql`query location($id: String!) {
  location(id: $id) {
    id
    name
  }
}`;

export default graphql(query, {
  options: ({ params }) => ({ variables: { id: params.id }})
})(LocationShow);
