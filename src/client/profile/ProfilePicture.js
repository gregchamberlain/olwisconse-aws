import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

import { openModal, closeModal } from '../redux/actions/uploadModal';
import * as IMAGE_MODAL_ACTIONS from '../redux/actions/imageModal';
import styles from './style.css';
import { UploadButton } from '../components/ImageUploader';

const ProfilePicture = ({ image, openUploader, openImage }) => (
  <div className={styles.profilePicture} style={{backgroundImage: `url(${image.url})`}}>
    <div className={styles.profilePictureInner} onClick={openImage}>View</div>
    <div className={styles.profilePictureInner} onClick={openUploader}>Edit</div>
  </div>
);

const MUTATION = gql`mutation UpdateProfilePicture($url: String!){
  updateProfilePicture(url: $url) {
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
}`;

const mapDispatchToProps = (dispatch, ownProps) => ({
  openUploader: () => dispatch(openModal(
    urls => {
      ownProps.update(urls[0]);
      dispatch(closeModal());
    },
    { multiple: false }
  )),
  openImage: () => dispatch(IMAGE_MODAL_ACTIONS.openModal([ownProps.image], 0))
});

// const withConnect = ;


export default compose(
  graphql(MUTATION, {
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
  }),
  connect(null, mapDispatchToProps)
)(ProfilePicture);
// export default graphql(MUTATION, {
//   props: ({ mutate }) => ({
//     update: (url) => mutate({
//       variables: { url },
//       updateQueries: {
//         CurrentUser: (prev, { mutationResult }) => {
//           const profilePicture = mutationResult.data.updateProfilePicture;
//           return update(prev, {
//             currentUser: {
//               profilePicture: {
//                 $set: profilePicture
//               }
//             }
//           });
//         }
//       }
//     })
//   })
// })(withConnect);
