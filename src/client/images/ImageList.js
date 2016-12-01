import React from 'react';
import { connect } from 'react-redux';
import Add from 'react-icons/lib/md/add-circle';

import styles from './style.css';
import ImageListItem from './ImageListItem';
import { openModal, closeModal } from '../redux/actions/uploadModal';
import * as IMAGE_MODAL_ACTION from '../redux/actions/imageModal';

const ImageList = ({ images, openUploader, openImage, onUploadComplete }) => (
  <div className={styles.list}>
    {images.map((image, index) => (
      <ImageListItem key={image.id} image={image} onClick={openImage(index)}/>
    ))}
    { onUploadComplete && (
      <div className={styles.item} onClick={openUploader}>
        <Add />
      </div>
    )}
  </div>
);

const mapDispatchToProps = (dispatch, ownProps) => ({
  openUploader: () => dispatch(openModal(
    urls => {
      ownProps.onUploadComplete(urls);
      dispatch(closeModal());
    }
  )),
  openImage: (index) => () => dispatch(IMAGE_MODAL_ACTION.openModal(
    ownProps.images.map(image => image.id),
    // ownProps.images,
    index
  ))
});

export default connect(null, mapDispatchToProps)(ImageList);
