import React from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import styles from './style.css';
import iconSrc from '../../assets/icon.png';

const Toolbar = ({ data }) => (
  <div className={styles.toolbar}>
    <Link to="/" className={styles.toolbarItem}>
      <img src={iconSrc} width="48" height="48"/>
    </Link>
    <div className={styles.spacer}/>
    <Link to="/members" className={styles.toolbarItem}>Members</Link>
    <Link to="/locations" className={styles.toolbarItem}>Locations</Link>
    <Link to="/quotes" className={styles.toolbarItem}>Quotes</Link>
    <Link to="/images" className={styles.toolbarItem}>Images</Link>
    <Link to="/profile" className={styles.toolbarItem}>
      { data.loading ? 'Loading' : data.currentUser.displayName }
    </Link>
  </div>
);

// const styles = {
//   toolbar: {
//     position: 'fixed',
//     boxSizing: 'border-box',
//     display: 'flex',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 56,
//     backgroundColor: '#4CAF50',
//   },
//   toolbarItem: {
//     height: '100%',
//     boxSizing: 'border-box',
//     display: 'flex',
//     alignItems: 'center',
//     color: '#FFF',
//     textDecoration: 'none',
//     padding: '0 15px'
//   },
//   spacer: {
//     flex: 1
//   }
// };

const PROFILE_QUERY = gql`query CurrentUser {
  currentUser {
    id
    username
    displayName
  }
}`;

export default graphql(PROFILE_QUERY)(Toolbar);
