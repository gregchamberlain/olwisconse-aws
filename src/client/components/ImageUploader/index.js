import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import update from 'immutability-helper';
import axios from 'axios';
import UploadIcon from 'react-icons/lib/md/cloud-upload';

import styles from './style.css';
import ImagePreview from './ImagePreview';

class ImageUploader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      progress: [],
      uploading: false
    };
  }

  componentWillReceiveProps(props) {
    if (!this.props.open && props.open) {
      this.setState({ files: [], progress: [], uploading: false });
    }
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length) {
      this.setState(update(this.state, {
        files: {
          $push: acceptedFiles
        }
      }));
    }
  }

  removeFile = idx => e => {
    e.stopPropagation();
    this.setState(update(this.state, {
      files: {
        $splice: [[idx, 1]]
      }
    }));
  }

  upload = () => {
    this.setState({ uploading: true });
    const files = this.state.files.map(file => {
      const splitFilename = file.name.split('.');
      const filename = `${Math.random().toString(36).substr(2,20)}.${splitFilename[splitFilename.length - 1]}`;
      return {
        name: filename,
        type: file.type
      };
    });
    this.props.getSignedUrls(files).then(({ data }) => {
      const signedUrls = data.getSignedUrls;
      let complete = 0;
      let urls = [];
      for (let i=0; i<files.length; i++) {
        const file = files[i];
        const url = signedUrls[i].split('?')[0];
        const options = {
          headers: { 'Content-Type': file.type },
          onUploadProgress: (e) => {
            this.setState(update(this.state, {
              progress: {
                [i]: {
                  $set: e.loaded / e.total * 100
                }
              }
            }));
          }
        };
        axios.put(signedUrls[i], this.state.files[i], options).then(resp => {
          complete += 1;
          urls.push(url);
          this.setState({ uploading: false });
          if (complete === files.length) this.props.onComplete(urls);
        }).catch(err => {
          complete += 1;
          console.error(err);
          this.setState({ uploading: false });
          if (complete === files.length) this.props.onComplete(urls);
        });
      }
    }).catch(err => {
      console.error(err);
      this.setState({ uploading: false });
    });
  }

  requestClose = () => {
    if (this.state.files.length) {
      if (!this.state.progress.length && confirm('Exit without uploading images?')) {
        this.props.onCloseRequest();
      }
    } else {
      this.props.onCloseRequest();
    }
  }

  render() {
    return (
      <div
        className={styles.backdrop}
        style={{display: this.props.open ? 'flex' : 'none'}}
        onClick={ this.state.uploading ? null : this.requestClose }
      >
        <div className={styles.container} onClick={e => e.stopPropagation()}>
          <Dropzone onDrop={this.onDrop} className={styles.dropzone}>
            {this.state.files.map((file, idx) => (
              <ImagePreview
                key={file.preview}
                src={file.preview}
                progress={this.state.progress[idx]}
                onRemove={this.removeFile(idx)}
              />
            ))}
            { !this.state.files.length && <UploadIcon /> }
          </Dropzone>
          <span className={styles.divider} />
          <button className={styles.button} onClick={this.upload} disabled={this.state.uploading}>
            { this.state.uploading ? 'Uploading...' : 'Upload' }
          </button>
        </div>
      </div>
    );
  }
}

export default ImageUploader;
