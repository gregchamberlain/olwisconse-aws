import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

import styles from './style.css';

class ImageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  render() {
    const { image, onCloseRequest, data } = this.props;
    return (
      <div>
        
        <div>

        </div>
        { image.caption || 'Add a caption' }
      </div>
    );
  }
}

const QUERIES = gql`query {
  locations {
    id
    name
  }
  users {
    id
    username
    displayName
    profilePicture {
      id
      url
    }
  }
}`;

export default ImageForm;
