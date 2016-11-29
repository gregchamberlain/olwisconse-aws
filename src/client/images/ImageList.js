import React from 'react';
import Add from 'react-icons/lib/md/add-circle';

import styles from './style.css';
import ImageListItem from './ImageListItem';
import { UploadButton } from '../components/ImageUploader';

const ImageList = ({ images, onUploadComplete }) => (
  <div className={styles.list}>
    {images.map(image => (
      <ImageListItem key={image.id} image={image} />
    ))}
    <UploadButton
      accept="image/*"
      className={styles.item}
      onComplete={onUploadComplete}>
      <Add />
    </UploadButton>
  </div>
);

export default ImageList;
