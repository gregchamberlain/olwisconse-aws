import { combineReducers } from 'redux';
import uploadModal from './uploadModal';
import imageModal from './imageModal';

export default client => combineReducers({
  uploadModal,
  imageModal,
  apollo: client.reducer()
});
