import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import ImageFragment from '../../graphql/ImageFragment.gql';
import ImageShowcase from './ImageShowcase.js';
import { closeModal, next, prev } from '../../redux/actions/imageModal';
import withModal from '../Modal/withModal';

const mapStateToProps = ({ imageModal }) => ({
  id: imageModal.collection[imageModal.index],
  hasNext: imageModal.collection.length !== imageModal.index + 1,
  hasPrev: imageModal.index !== 0
});

const mapDispatchToPtops = dispatch => ({
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
  withModal({open: ({ imageModal }) => imageModal.open, close: (dispatch) => () => dispatch(closeModal())}),
  connect(mapStateToProps, mapDispatchToPtops),
  graphql(query, {
    options: ({ id }) => ({ variables: { id: id }})
  }),
)(ImageShowcase);
