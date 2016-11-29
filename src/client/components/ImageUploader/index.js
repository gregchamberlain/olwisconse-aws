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
      progress: []
    };
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length) {
      this.setState(update(this.state, {
        files: {
          $push: acceptedFiles
        }
      }), () => console.log(this.state.files));
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
    let complete = 0;
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
      const urls = signedUrls.map(url => url.split('?')[0]);
      console.log(signedUrls, urls);
    });
    // for (let i=0; i<files.length; i++) {
    //   const file = files[i];
    //
    //   const filetype = file.type;
    //   const url = `https://olwisconse.s3.amazonaws.com/${filename}`;
    //   this.props.getSignedUrls(filename, filetype).then(({ data }) => {
    //     const options = {
    //       headers: { 'Content-Type': filetype },
    //       onUploadProgress: (e) => {
    //         this.setState(update(this.state, {
    //           progress: {
    //             [i]: {
    //               $set: e.loaded / e.total * 100
    //             }
    //           }
    //         }));
    //       }
    //     };
    //     return axios.put(data.getSignedUrl, file, options);
    //   }).then(resp => {
    //     urls.push(url);
    //     complete += 1;
    //     if (complete === files.length) console.log(urls);
    //   }).catch(error => {
    //     complete += 1;
    //     if (complete === files.length) console.log(urls);
    //     console.error(error);
    //   });
    // }
  }

  render() {
    return (
      <div className={styles.backdrop}>
        <div className={styles.container}>
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
          <button className={styles.button} onClick={this.upload}>Upload</button>
        </div>
      </div>
    );
  }
}

export default ImageUploader;
