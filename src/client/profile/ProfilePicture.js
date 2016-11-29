import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import styles from './style.css';
import ImageUploader from '../components/ImageUploader';

const ProfilePicture = ({ update, src, getSignedUrls }) => {

  const uploadImage = () => {
    cloudinary.openUploadWidget({
      cloud_name: 'dnqyghipo',
      upload_preset: 'bhxvnbw4',
      theme: 'minimal',
      sources: ['local'],
      multiple: false
    }, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        update(result[0].secure_url)
      }
    });
  };

  const fileChange = e => {
    console.log(e.target.files);
  }

  return (
    <div className={styles.profilePicture} style={{backgroundImage: `url(${src})`}}>
      <div className={styles.profilePictureInner}>View</div>
      <div className={styles.profilePictureInner} onClick={uploadImage} >Edit</div>
      {/* <input type="file" onChange={fileChange} /> */}
      <ImageUploader getSignedUrls={getSignedUrls} />
    </div>
  );
};

const GET_SIGNED_URLS = gql`mutation GetSignedUrls($files: [FileInput]!) {
  getSignedUrls(files: $files)
}`

const MUTATION = gql`mutation UpdateProfilePicture($url: String!){
  updateProfilePicture(url: $url) {
    id
    url
  }
}`;

const signed = graphql(GET_SIGNED_URLS, {
  props: ({ mutate }) => ({
    getSignedUrls: (files) => mutate({
      variables: { files }
    })
  })
})(ProfilePicture);

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    update: (url) => mutate({
      variables: { url }
    })
  })
})(signed);
