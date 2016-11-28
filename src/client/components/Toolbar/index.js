import React from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const iconSrc = require('../../assets/icon.png');

const Toolbar = ({ data }) => (
  <div style={styles.toolbar}>
    <Link to="/" style={styles.toolbarItem}>
      <img src={iconSrc} width="48" height="48"/>
    </Link>
    <div style={styles.spacer}/>
    <Link to="/members" style={styles.toolbarItem}>Members</Link>
    <Link to="/locations" style={styles.toolbarItem}>Locations</Link>
    <Link to="/quotes" style={styles.toolbarItem}>Quotes</Link>
    <Link to="/profile" style={styles.toolbarItem}>
      { data.loading ? 'Loading' : data.currentUser.displayName }
    </Link>
  </div>
);

const styles = {
  toolbar: {
    position: 'fixed',
    boxSizing: 'border-box',
    display: 'flex',
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    backgroundColor: '#4CAF50',
  },
  toolbarItem: {
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    color: '#FFF',
    textDecoration: 'none',
    padding: '0 15px'
  },
  spacer: {
    flex: 1
  }
};

const PROFILE_QUERY = gql`query CurrentUser {
  currentUser {
    id
    username
    displayName
  }
}`;

export default graphql(PROFILE_QUERY)(Toolbar);
