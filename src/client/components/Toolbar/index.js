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

const PROFILE_QUERY = gql`query CurrentUser {
  currentUser {
    id
    username
    displayName
    profilePicture {
      id
      url
    }
  }
}`;

export default graphql(PROFILE_QUERY)(Toolbar);
