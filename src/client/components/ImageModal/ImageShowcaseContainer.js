import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import ImageFragment from '../../graphql/ImageFragment.gql';
// console.log(ImageFragment);
import ImageModal from './index';
import { closeModal, next, prev } from '../../redux/actions/imageModal';

const mapStateToProps = ({ imageModal }) => ({
  open: imageModal.open,
  id: imageModal.collection[imageModal.index],
  hasNext: imageModal.collection.length !== imageModal.index + 1,
  hasPrev: imageModal.index !== 0
});

const mapDispatchToPtops = dispatch => ({
  onCloseRequest: () => dispatch(closeModal()),
  next: () => dispatch(next()),
  prev: () => dispatch(prev())
});

const query = gql`query Image($id: String!) {
  image(id: $id) {
    ...ImageFragment
  }
}
${ImageFragment}
`;

export default compose(
  connect(mapStateToProps, mapDispatchToPtops),
  graphql(query, {
    options: ({ id }) => ({ variables: { id: id }})
  })
)(ImageModal);
