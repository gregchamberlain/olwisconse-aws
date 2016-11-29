import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

import ImageUploader from './index';

class UploadButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  setOpen = bool => e => {
    e.stopPropagation();
    this.setState({ open: bool });
  }

  onComplete = urls => {
    this.setOpen(false)();
    this.props.onComplete(urls);
  }

  render() {
    const { onComplete, getSignedUrls,  children, ...props } = this.props;
    return (
      <div  {...props} onClick={this.setOpen(true)}>
        {children}
        <ImageUploader
          getSignedUrls={getSignedUrls}
          onComplete={this.onComplete}
          open={this.state.open}
          onCloseRequest={this.setOpen(false)}
        />
      </div>
    );
  }
}


const GET_SIGNED_URLS = gql`mutation GetSignedUrls($files: [FileInput]!) {
  getSignedUrls(files: $files)
}`;

export default graphql(GET_SIGNED_URLS, {
  props: ({ mutate }) => ({
    getSignedUrls: (files) => mutate({
      variables: { files }
    })
  })
})(UploadButton);
