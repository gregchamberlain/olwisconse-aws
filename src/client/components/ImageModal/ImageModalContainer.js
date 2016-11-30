import { connect } from 'react-redux';

import ImageModal from './index';
import { closeModal, next, prev } from '../../redux/actions/imageModal';

const mapStateToProps = ({ imageModal }) => ({
  open: imageModal.open,
  image: imageModal.collection[imageModal.index]
});

const mapDispatchToPtops = dispatch => ({
  onCloseRequest: () => dispatch(closeModal()),
  next: () => dispatch(next()),
  prev: () => dispatch(prev())
});

export default connect(mapStateToProps, mapDispatchToPtops)(ImageModal);
