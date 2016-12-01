import React from 'react';
import { connect } from 'react-redux';

import Modal from './index';

const withModal = ({ open, close }) => Component => {
  const mapStateToProps = (...args) => ({
    open: open(...args)
  });
  const mapDispatchToProps = (...args) => ({
    onCloseRequest: close(...args)
  });
  return connect(mapStateToProps, mapDispatchToProps)((props) => (
    <Modal open={props.open} onCloseRequest={props.onCloseRequest}>
      <Component {...props} />
    </Modal>
  ));
};

export default withModal;
