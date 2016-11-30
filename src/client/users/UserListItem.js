import React from 'react';
import { Link } from 'react-router';

import styles from './style.css';

const UserListItem = ({ user }) => (
  <Link to={`/members/${user.username}`} className={styles.container}>
    <div className={styles.image} style={{backgroundImage: `url(${user.profilePicture.url})`}}/>
    <div className={styles.displayName}>{user.displayName}</div>
    <div className={styles.username}>@{user.username}</div>
  </Link>
);

export default UserListItem;
