import { applyMiddleware } from 'redux';

export default client => applyMiddleware(
  client.middleware()
);
