import React from 'react';
import styles from './style.css';
import Close from 'react-icons/lib/md/close';
import Check from 'react-icons/lib/md/check';

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
          { progress === 100 ? (
            <Check />
          ) : (
            <div className={styles.progressContainer}>
              <div className={styles.progressBar} style={{width: `${progress}%`}}/>
            </div>
          )}
        </div>
      )}
  </div>
);

export default ImagePreview;
