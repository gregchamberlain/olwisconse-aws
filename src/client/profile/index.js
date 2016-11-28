import React from 'react';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

const Profile = ({ data, mutate, client }) => {

  const logout = () => {
    mutate().then(() => {
      client.resetStore();
    }).catch(err => {
      console.error('Failed Logout', err);
    });
  };

  const uploadImage = () => {
    cloudinary.openUploadWidget({
      cloud_name: 'dnqyghipo',
      upload_preset: 'bhxvnbw4'
    }, (error, result) => {
      console.log(error, result);
    });
  };

  return data.loading ? <div>Loading...</div> : (
    <div>
      <h1>{data.currentUser.displayName}<small> - @{data.currentUser.username}</small></h1>
      <button onClick={uploadImage}>Upload Profile Pic</button>
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
  }
}`;

export default withApollo(graphql(PROFILE_QUERY)(graphql(LOGOUT_MUTATION)(Profile)));
