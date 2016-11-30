import React from 'react';

import styles from './style.css';

const ImageListItem = ({ image, onClick }) => (
  <div style={{backgroundImage: `url(${image.url})`}} className={styles.item} onClick={onClick}/>
);

export default ImageListItem;
