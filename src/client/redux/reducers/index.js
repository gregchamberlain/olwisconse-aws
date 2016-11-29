import { combineReducers } from 'redux';
import uploadModal from './uploadModal.js';

export default client => combineReducers({
  uploadModal,
  apollo: client.reducer()
});
