import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import ImageFragment from '../../graphql/ImageFragment.gql';
import ImageModal from './index';
import { closeModal } from '../../redux/actions/imageModal';

const mapStateToProps = ({ imageModal }) => ({
  open: imageModal.open
});

const mapDispatchToPtops = dispatch => ({
  onCloseRequest: () => dispatch(closeModal())
});


export default connect(mapStateToProps, mapDispatchToPtops)(ImageModal);
