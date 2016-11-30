import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';

import UserListItem from './UserListItem';
import styles from './style.css';

const UserList = ({ data }) => (
  <div>
    <h1 style={{textAlign: 'center'}}>The Dream Team</h1>
    { data.loading ? <div>Loading...</div> : (
      <div className={styles.list}>
        {data.users.map(user => (
            <UserListItem key={user.id} user={user} />
        ))}
      </div>
    )}
  </div>
);

const query = gql`query Users {
  users {
    id
    username
    displayName
    profilePicture {
      id
      url
    }
  }
}`;

export default graphql(query)(UserList);
