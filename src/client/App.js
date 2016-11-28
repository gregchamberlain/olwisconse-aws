import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { HashRouter, Match, Link } from 'react-router';

import Toolbar from './components/Toolbar';

import Home from './home';
import Login from './login';
import Profile from './profile';
import UserList from './users/UserList';
import UserShow from './users/UserShow';
import LocationList from './locations/LocationList';
import LocationShow from './locations/LocationShow';
import QuoteIndex from './quotes';

const App = ({ data }) => data.loading ? <div>Loading...</div> : (
  data.currentUser ? (
    <HashRouter>
      <div>
        <Toolbar />
        <div style={{marginTop: 56, padding: 10}}>
          <Match exactly pattern="/" component={Home} />
          <Match exactly pattern="/profile" component={Profile} />
          <Match exactly pattern="/members" component={UserList} />
          <Match exactly pattern="/members/:username" component={UserShow} />
          <Match exactly pattern="/locations" component={LocationList} />
          <Match exactly pattern="/locations/:id" component={LocationShow} />
          <Match exactly pattern="/quotes" component={QuoteIndex} />
        </div>
      </div>
    </HashRouter>
  ) : (
    <Login />
  )
);

const query = gql`query CurrentUser {
  currentUser {
    id
    username
  }
}`;

export default graphql(query)(App);
