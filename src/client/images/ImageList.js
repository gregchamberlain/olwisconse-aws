import React from 'react';
import { connect } from 'react-redux';
import Add from 'react-icons/lib/md/add-circle';

import styles from './style.css';
import ImageListItem from './ImageListItem';
import { openModal, closeModal } from '../redux/actions/uploadModal';

const ImageList = ({ images, openUploader }) => (
  <div className={styles.list}>
    {images.map(image => (
      <ImageListItem key={image.id} image={image} />
    ))}
    <div className={styles.item} onClick={openUploader}>
      <Add />
    </div>
  </div>
);

const mapDispatchToProps = (dispatch, ownProps) => ({
  openUploader: () => dispatch(openModal(
    urls => {
      ownProps.onUploadComplete(urls);
      dispatch(closeModal());
    }
  ))
});

export default connect(null, mapDispatchToProps)(ImageList);
