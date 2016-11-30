import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import update from 'immutability-helper';
import axios from 'axios';
import UploadIcon from 'react-icons/lib/md/cloud-upload';

import styles from './style.css';
import ImagePreview from './ImagePreview';
import Modal from '../Modal';

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

  requestClose = e => {
    if (this.state.files.length) {
      if (!this.state.progress.length && confirm('Exit without uploading images?')) {
        this.props.onCloseRequest(e);
      }
    } else {
      this.props.onCloseRequest(e);
    }
  }

  render() {

    const { multiple, accept } = this.props;

    return (
      <Modal onCloseRequest={this.requestClose} open={this.props.open}>
        <div className={styles.container} onClick={e => e.stopPropagation()}>
          <Dropzone
            multiple={multiple}
            accept={accept}
            onDrop={this.onDrop}
            className={styles.dropzone}
          >
            {this.state.files.map((file, idx) => (
              <ImagePreview
                key={file.preview}
                src={file.preview}
                progress={this.state.progress[idx]}
                onRemove={this.removeFile(idx)}
              />
            ))}
            { !this.state.files.length && (
              <div className={styles.instructions}>
                <UploadIcon className={styles.icon}/>
                <div>Drop files here</div>
                <div><small>or click to select files</small></div>
              </div>
            ) }
          </Dropzone>
          <span className={styles.divider} />
          <button className={styles.button} onClick={this.upload} disabled={this.state.uploading}>
            { this.state.uploading ? 'Uploading...' : 'Upload' }
          </button>
        </div>
      </Modal>
    );
  }
}

ImageUploader.propTypes = {
  open: PropTypes.bool.isRequired,
  onComplete: PropTypes.func,
  onCloseRequest: PropTypes.func,
  getSignedUrls: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
};

export default ImageUploader;
