import { OPEN_MODAL, CLOSE_MODAL, NEXT_IMAGE, PREV_IMAGE } from '../actions/imageModal.js';
import update from 'immutability-helper';

const defaultState = {
  open: false,
  collection: [{}],
  index: 0
};

const psuedoState = {
  open: true,
  collection: [
    { url: "https://olwisconse.s3.amazonaws.com/dgi82emnnd9srwbri3ug.jpg" },
    { url: "https://olwisconse.s3.amazonaws.com/ewj0xzohcko836w4x0aq.jpg" },
    { url: "https://olwisconse.s3.amazonaws.com/zcuho06sax0n174xr689.jpg" },
  ],
  index: 0
};

const UploadModalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        open: true,
        collection: action.collection,
        index: action.index
      };
    case CLOSE_MODAL:
      return defaultState;
    case NEXT_IMAGE:
      if (state.index === state.collection.length - 1) return state;
      return update(state, {
        index: { $set: state.index + 1 }
      });
    case PREV_IMAGE:
      if (state.index === 0) return state;
      return update(state, {
        index: { $set: state.index - 1 }
      });
    default:
      return state;
  }
};

export default UploadModalReducer;
