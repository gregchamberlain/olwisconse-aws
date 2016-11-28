import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import styles from './style.css';

const ProfilePicture = ({ update, src }) => {

  const uploadImage = () => {
    cloudinary.openUploadWidget({
      cloud_name: 'dnqyghipo',
      upload_preset: 'bhxvnbw4'
    }, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        update(result[0].secure_url)
      }
    });
  };

  return (
    <div className={styles.profilePicture} onClick={uploadImage} style={{backgroundImage: `url(${src})`}}>

    </div>
  );
};

const MUTATION = gql`mutation UpdateProfilePicture($url: String!){
  updateProfilePicture(url: $url) {
    id
    url
  }
}`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    update: (url) => mutate({
      variables: { url }
    })
  })
})(ProfilePicture);
