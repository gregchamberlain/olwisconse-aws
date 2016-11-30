import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { isEqual } from 'lodash';

import styles from './style.css';
import ImageInfo from './ImageInfo';
import ImageForm from './ImageForm';

class ImageSide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  componentWillReceiveProps(props) {
    if (!isEqual(props.image, this.props.image)) {
      this.setState({ editing: false });
    }
  }

  startEditing = () => {
    this.setState({ editing: true });
  }

  stopEditing = () => {
    this.setState({ editing: false });
  }

  render() {
    const { image, onCloseRequest } = this.props;
    return (
      <div>
        <div className={styles.header}>
          <Link
            to={`/members/${image.owner.username}`}
            onClick={onCloseRequest}
            className={styles.ownerImage}
            style={{backgroundImage: `url(${image.owner.profilePicture.url})`}}
          />
          <div>
            <Link className={styles.ownerName} to={`/members/${image.owner.username}`} onClick={onCloseRequest}>
              {image.owner.displayName}
            </Link>
            <div className={styles.date}>
              Uploaded {moment(image.createdAt).format("MMM Do, YYYY")}
            </div>
          </div>
        </div>
        <div style={{ padding: '15px 25px', overflow: 'auto' }}>
          { this.state.editing ?
            <ImageForm
              image={image}
              onStopEditRequest={this.stopEditing}
            /> :
            <ImageInfo
              image={image}
              onCloseRequest={onCloseRequest}
              onEditRequest={this.startEditing}
            />
          }
        </div>
      </div>
    );
  }
}

export default ImageSide;
