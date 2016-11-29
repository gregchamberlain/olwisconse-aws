import { createStore } from 'redux';
import RootReducer from './reducers';
import RootMiddleware from './middleware';

const configureStore = (client, initialState) => createStore(
  RootReducer(client),
  initialState,
  RootMiddleware(client)
);

export default configureStore;
