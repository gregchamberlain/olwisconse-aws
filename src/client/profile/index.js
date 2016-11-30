import React from 'react';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import ProfilePicture from './ProfilePicture';

const Profile = ({ data, mutate, client }) => {

  const logout = () => {
    mutate().then(() => {
      client.resetStore();
    }).catch(err => {
      console.error('Failed Logout', err);
    });
  };

  return data.loading ? <div>Loading...</div> : (
    <div>
      <ProfilePicture image={data.currentUser.profilePicture || {}}/>
      <h1>{data.currentUser.displayName}<small> - @{data.currentUser.username}</small></h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

const LOGOUT_MUTATION = gql`mutation Logout {
  logout {
    id
  }
}`;

const PROFILE_QUERY = gql`query CurrentUser {
  currentUser {
    id
    username
    displayName
    profilePicture {
      id
      url,
      createdAt
      owner {
        id
        username
        displayName
        profilePicture {
          id,
          url
        }
      }
    }
  }
}`;

export default withApollo(graphql(PROFILE_QUERY)(graphql(LOGOUT_MUTATION)(Profile)));
