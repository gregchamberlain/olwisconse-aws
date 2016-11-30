import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';

import styles from './style.css';
import ImageInfo from './ImageInfo';

class ImageSide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
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
        <div style={{ padding: 15 }}>
          { this.state.editing ? null : <ImageInfo image={image} onCloseRequest={onCloseRequest}/>}
        </div>
      </div>
    );
  }
}

export default ImageSide;
