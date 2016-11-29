import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

import styles from './style.css';
import ImageUploader from '../components/ImageUploader';

class ProfilePicture extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  openModal = () => {
    this.setState({modalOpen: true});
  }

  closeModal = () => {
    this.setState({modalOpen: false});
  }

  update = urls => {
    this.props.update(urls[0]);
    this.setState({ modalOpen: false });
  }

  render() {
    const { src, getSignedUrls } = this.props;
    return (
      <div className={styles.profilePicture} style={{backgroundImage: `url(${src})`}}>
        <div className={styles.profilePictureInner}>View</div>
        <div className={styles.profilePictureInner} onClick={this.openModal}>Edit</div>
        <ImageUploader
          getSignedUrls={getSignedUrls}
          onComplete={this.update}
          onCloseRequest={this.closeModal}
          open={this.state.modalOpen}
        />
      </div>
    );
  }
}

const GET_SIGNED_URLS = gql`mutation GetSignedUrls($files: [FileInput]!) {
  getSignedUrls(files: $files)
}`;

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
  }),
  updateQueries: {
    CurrentUser: (prev, { mutationResult }) => {
      const profilePicture = mutationResult.data.updateProfilePicture;
      return update(prev, { currentUser: {
          profilePicture: {
            $set: profilePicture
          }
        }
      });
    }
  }
})(signed);
