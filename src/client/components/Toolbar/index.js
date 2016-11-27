import React from 'react';
import { Link } from 'react-router';
const iconSrc = require('../../assets/icon.png');

const Toolbar = () => (
  <div style={styles.toolbar}>
    <Link to="/" style={styles.toolbarItem}>
      <img src={iconSrc} width="48" height="48"/>
    </Link>
    <div style={styles.spacer}/>
    <Link to="/members" style={styles.toolbarItem}>Members</Link>
    <Link to="/locations" style={styles.toolbarItem}>Locations</Link>
    <Link to="/quotes" style={styles.toolbarItem}>Quotes</Link>
  </div>
);

const styles = {
  toolbar: {
    display: 'flex',
    height: 56,
    backgroundColor: '#4CAF50',
  },
  toolbarItem: {
    height: '100%',
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

export default Toolbar;
