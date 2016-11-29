import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';
import { connect } from 'react-redux';

import { closeModal } from '../../redux/actions/uploadModal';
import ImageUploader from './index';

const mapStateToProps = ({ uploadModal }) => ({
  open: uploadModal.open,
  onComplete: uploadModal.onComplete,
  accept: uploadModal.options.accept,
  multiple: uploadModal.options.multiple
});

const mapDispatchToProps = dispatch => ({
  onCloseRequest: () => dispatch(closeModal())
});

const GET_SIGNED_URLS = gql`mutation GetSignedUrls($files: [FileInput]!) {
  getSignedUrls(files: $files)
}`;

const withConnect = connect(mapStateToProps, mapDispatchToProps)(ImageUploader);

export default graphql(GET_SIGNED_URLS, {
  props: ({ mutate }) => ({
    getSignedUrls: (files) => mutate({
      variables: { files }
    })
  })
})(withConnect);
