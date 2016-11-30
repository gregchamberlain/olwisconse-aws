import React from 'react';
import { Link } from 'react-router';
import Place from 'react-icons/lib/md/place';
import Group from 'react-icons/lib/md/group';

import styles from './style.css';

const ImageInfo = ({ image, onCloseRequest }) => (
  <div>
    <div className={styles.caption}>
      {image.caption || 'Add A Caption'}
    </div>
    <div className={styles.caption}>
      <Place /> { image.location ? (
        <Link to={`/locations/${image.location.id}`} onClick={onCloseRequest}>
          {image.location.name}
        </Link>
      ) : "Add a location"}
    </div>
    <div className={styles.caption}>
      <Group /> { image.people.length ? (
        image.people.map(person => (
          <Link key={person.id} to={`/members/${person.username}`} onClick={onCloseRequest}>
            {person.displayName}
          </Link>
        ))
      ) : 'Tag People in this Photo'}
    </div>
  </div>
);

export default ImageInfo;
