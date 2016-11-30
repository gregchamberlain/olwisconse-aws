import React, { Component } from 'react';
import Left from 'react-icons/lib/md/chevron-left';
import Right from 'react-icons/lib/md/chevron-right';

import Modal from '../Modal';
import styles from './style.css';

class ImageModal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    const { prev, next } = this.props;
    if (e.keyCode === 37) { prev(); e.preventDefault(); }
    if (e.keyCode === 39) { next(); e.preventDefault(); }
  }

  render() {
    const { image, next, prev, onCloseRequest, open, hasNext, hasPrev } = this.props;
    return (
      <Modal open={open} onCloseRequest={onCloseRequest}>
        <div className={styles.container}>
          <div className={styles.display}>
            <div
              className={styles.image}
              style={{backgroundImage: `url(${image.url})`}}
            />
            <div className={styles.displayOverlay}>
              { hasPrev ? (
                <div className={styles.navButton} onClick={prev}>
                  <Left />
                </div>
              ) : null }
              <div className={styles.spacer}/>
              { hasNext ? (
                <div className={styles.navButton} onClick={next}>
                  <Right />
                </div>
              ) : null }
            </div>
          </div>
          <div className={styles.info}>
          </div>
        </div>
      </Modal>
    );
  }
}
// const ImageModal = () => (
//
// );

export default ImageModal;
