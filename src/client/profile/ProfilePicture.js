import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

import { openModal, closeModal } from '../redux/actions/uploadModal';
import styles from './style.css';
import { UploadButton } from '../components/ImageUploader';

const ProfilePicture = ({ src, openUploader }) => (
  <div className={styles.profilePicture} style={{backgroundImage: `url(${src})`}}>
    <div className={styles.profilePictureInner}>View</div>
    <div className={styles.profilePictureInner} onClick={openUploader}>Edit</div>
  </div>
);

const MUTATION = gql`mutation UpdateProfilePicture($url: String!){
  updateProfilePicture(url: $url) {
    id
    url
  }
}`;

const mapDispatchToProps = (dispatch, ownProps) => ({
  openUploader: () => dispatch(openModal(
    urls => {
      ownProps.update(urls[0]);
      dispatch(closeModal());
    },
    { multiple: false }
  ))
});

const withConnect = connect(null, mapDispatchToProps)(ProfilePicture);

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    update: (url) => mutate({
      variables: { url },
      updateQueries: {
        CurrentUser: (prev, { mutationResult }) => {
          const profilePicture = mutationResult.data.updateProfilePicture;
          return update(prev, {
            currentUser: {
              profilePicture: {
                $set: profilePicture
              }
            }
          });
        }
      }
    })
  })
})(withConnect);
