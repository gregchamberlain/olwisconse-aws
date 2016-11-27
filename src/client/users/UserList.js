import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';

const UserList = ({ data }) => (
  <div>
    <h1>Users</h1>
    { data.loading ? <div>Loading...</div> : (
      <ul>
        {data.users.map(user => (
          <li key={user.id}>
            <Link to={`/members/${user.username}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const query = gql`query Users {
  users {
    id
    username
  }
}`;

export default graphql(query)(UserList);
