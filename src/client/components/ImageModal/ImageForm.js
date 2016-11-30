import React, { Component } from 'react';

class ImageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  render() {
    const { image } = this.props;
    return (
      <div>
        { image.caption || 'Add a caption' }
      </div>
    );
  }
}
