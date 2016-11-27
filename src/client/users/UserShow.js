import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const UserShow = ({ data }) => data.loading ? <div>Loading...</div> : (
  <div>
    <h1>{data.user.username}</h1>
  </div>
);

const query = gql`query user($username: String!) {
  user(username: $username) {
    id
    username
  }
}`;

export default graphql(query, {
  options: ({ params }) => ({ variables: { username: params.username }})
})(UserShow);
