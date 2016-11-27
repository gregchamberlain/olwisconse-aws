import React, { Component } from 'react';
import { HashRouter, Match, Link } from 'react-router';

import Home from './home';
import UserList from './users/UserList';
import UserShow from './users/UserShow';
import LocationList from './locations/LocationList';
import LocationShow from './locations/LocationShow';
import QuoteIndex from './quotes';

const App = () => (
  <HashRouter>
    <div>
      <Link to="/">Home</Link>
      <Link to="/members">Members</Link>
      <Link to="/locations">Locations</Link>
      <Link to="/quotes">Quotes</Link>

      <Match exactly pattern="/" component={Home} />
      <Match exactly pattern="/members" component={UserList} />
      <Match exactly pattern="/members/:username" component={UserShow} />
      <Match exactly pattern="/locations" component={LocationList} />
      <Match exactly pattern="/locations/:id" component={LocationShow} />
      <Match exactly pattern="/quotes" component={QuoteIndex} />
    </div>
  </HashRouter>
);

export default App;
