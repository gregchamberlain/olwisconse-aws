import React from 'react';
import { Link } from 'react-router';

import styles from './style.css';

const UserItem = ({ user, onClick }) => (
  <Link className={styles.container} to={`/members/${user.username}`} onClick={onClick}>
    { user.profilePicture && <div
      className={styles.icon}
      style={{ backgroundImage: `url(${user.profilePicture.url})`}}
    /> }
    <div>
      <div>{user.displayName}</div>
      <div>@{user.username}</div>
    </div>
  </Link>
);

export default UserItem;
