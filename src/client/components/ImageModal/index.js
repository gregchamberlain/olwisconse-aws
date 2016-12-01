import React, { Component } from 'react';
import Left from 'react-icons/lib/md/chevron-left';
import Right from 'react-icons/lib/md/chevron-right';

import Modal from '../Modal';
import ImageShowcase from './ImageShowcaseContainer.js';
import ImageSide from './ImageSide';
import styles from './style.css';

const ImageModal = ({ onCloseRequest, open }) => (
  <Modal open={open} onCloseRequest={onCloseRequest}>
    <ImageShowcase />
  </Modal>
);

export default ImageModal;
