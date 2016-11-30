import React, { Component } from 'react';
import Close from 'react-icons/lib/md/close';

import styles from './style.css';

class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.keyPressHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyPressHandler);
  }

  keyPressHandler = e => {
    if (e.keyCode === 27) {
      this.props.onCloseRequest();
    }
  }

  render() {
    const { children, open } = this.props;
    if (!open) return null;
    return (
      <div className={styles.backdrop} onClick={this.props.onCloseRequest}>
        <div className={styles.close} onClick={this.props.onCloseRequest}><Close /></div>
        <div onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  }
}

export default Modal;
