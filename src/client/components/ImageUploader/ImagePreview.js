import React from 'react';
import styles from './style.css';
import Close from 'react-icons/lib/md/close';

const ImagePreview = ({ src, onRemove, progress }) => (
  <div className={styles.preview}>
      { !progress && (
        <div className={styles.remove} onClick={onRemove}>
          <Close />
        </div>
      )}
      <img src={src} className={styles.image} />
      { progress && (
        <div className={styles.previewOverlay}>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar} style={{width: `${progress}%`}}/>
          </div>
        </div>
      )}
  </div>
);

export default ImagePreview;
