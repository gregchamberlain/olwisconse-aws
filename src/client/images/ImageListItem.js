import React from 'react';

import styles from './style.css';

const ImageListItem = ({ image }) => (
  <div style={{backgroundImage: `url(${image.url})`}} className={styles.item}/>
);

export default ImageListItem;
