import React, { Component } from 'react';
import { HashRouter, Match, Link } from 'react-router';

import UserList from './users/UserList';
import LocationList from './locations/LocationList';

import QuoteForm from './quotes/QuoteForm';

const App = () => (
  <HashRouter>
    <div>
      <Link to="/">Home</Link>
      <Link to="/members">Members</Link>
      <Link to="/locations">Locations</Link>
      <h1>Welcome to Ol' Wisconse!</h1>
      <QuoteForm />
      <Match exactly pattern="/members" component={UserList} />
      <Match exactly pattern="/locations" component={LocationList} />
    </div>
  </HashRouter>
);

export default App;
