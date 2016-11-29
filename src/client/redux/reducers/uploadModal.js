import { OPEN_MODAL, CLOSE_MODAL } from '../actions/uploadModal.js';
import update from 'immutability-helper';

const defaultState = {
  open: false,
  options: {
    accept: 'image/*',
    multiple: true
  },
  onComplete: urls => console.log(urls)
};

const UploadModalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return update(state, {
        open: { $set: true },
        options: { $merge: action.options || {} },
        onComplete: { $set: action.onComplete }
      });
    case CLOSE_MODAL:
      return defaultState;
    default:
      return state;
  }
};

export default UploadModalReducer;
