import React from 'react';
import { Link } from 'react-router';
import Place from 'react-icons/lib/md/place';
import Group from 'react-icons/lib/md/group';
import Edit from 'react-icons/lib/md/edit';

import UserItem from '../UserItem';
import styles from './style.css';

const ImageInfo = ({ image, onCloseRequest, onEditRequest }) => (
  <div>
    <div className={styles.caption}>
      {image.caption || 'Add A Caption'}
    </div>
    <div className={styles.caption}>
      <div className={styles.title}><Place /> Location</div>
      { image.location ? (
        <Link to={`/locations/${image.location.id}`} onClick={onCloseRequest}>
          {image.location.name}
        </Link>
      ) : <div className={styles.suggest} onClick={onEditRequest}>Add a location</div>}
    </div>
    <div className={styles.caption}>
      <div className={styles.title}><Group /> People</div>
      { image.people.length ? (
        image.people.map(person => (
          <UserItem key={person.id} user={person} onClick={onCloseRequest}/>
        ))
      ) : <div className={styles.suggest} onClick={onEditRequest}>Tag People</div>}
    </div>
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div className={styles.edit} onClick={onEditRequest}>
        <Edit />&nbsp;Edit
      </div>
    </div>
  </div>
);

export default ImageInfo;
