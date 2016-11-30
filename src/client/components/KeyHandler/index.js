import React, { Component } from 'react';

class KeyHandler extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleEvent('keydown', 'onKeyDown'));
    window.addEventListener('keyup', this.handleEvent('keyup', 'onKeyUp'));
    window.addEventListener('keypress', this.handleEvent('keypress', 'onKeyPress'));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEvent('keydown', 'onKeyDown'));
    window.removeEventListener('keyup', this.handleEvent('keyup', 'onKeyUp'));
    window.removeEventListener('keypress', this.handleEvent('keypress', 'onKeyPress'));
  }

  handleEvent = (eventName, propName) => this.props[propName]

  render() {
    return null;
  }

}

KeyHandler.defaultProps = {
  onKeyDown: () => {},
  onKeyUp: () => {},
  onKeyPress: () => {}
};

export default KeyHandler;
