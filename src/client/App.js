import React, { Component } from 'react';
import { HashRouter, Match, Link } from 'react-router';

import Home from './home';
import UserList from './users/UserList';
import LocationList from './locations/LocationList';
import QuoteList from './quotes/QuoteList.js';

const App = () => (
  <HashRouter>
    <div>
      <Link to="/">Home</Link>
      <Link to="/members">Members</Link>
      <Link to="/locations">Locations</Link>
      <Link to="/quotes">Quotes</Link>

      <Match exactly pattern="/" component={Home} />
      <Match exactly pattern="/members" component={UserList} />
      <Match exactly pattern="/locations" component={LocationList} />
      <Match exactly pattern="/quotes" component={QuoteList} />
    </div>
  </HashRouter>
);

export default App;
