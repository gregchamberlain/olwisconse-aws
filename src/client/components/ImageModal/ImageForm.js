import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';
import { isEqual } from 'lodash';

import styles from './style.css';
import ImageFragment from '../../graphql/ImageFragment';


class ImageForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      image: {
        caption: props.image.caption,
        location: props.image.location ? props.image.location.id : "",
        people: props.image.people.map(p => p.id)
      }
    };
  }

  componentWillReceiveProps(props) {
    const image = {
      caption: props.image.caption,
      location: props.image.location ? props.image.location.id : "",
      people: props.image.people.map(p => p.id)
    };
    if (!isEqual(image, this.state.image)) {
      this.setState(update(this.state, {
        image: {
          $set: image
        }
      }));
    }
  }

  update = name => e => {
    this.setState(update(this.state, {
      image: {
        [name]: {
          $set: e.target.value
        }
      }
    }));
  }

  addPerson = () => {
    const { people } = this.state.image;
    if (people[people.length - 1] === '') return;
    this.setState(update(this.state, {
      image: {
        people: {
          $push: [""]
        }
      }
    }));
  }

  removePerson = idx => () => {
    this.setState(update(this.state, {
      image: {
        people: {
          $splice: [[idx, 1]]
        }
      }
    }));
  }

  updatePerson = idx => e => {
    this.setState(update(this.state, {
      image: {
        people: {
          [idx]: {
            $set: e.target.value
          }
        }
      }
    }));
  }

  save = () => {
    const { caption, location, people } = this.state.image;
    // url("https://olwisconse.s3.amazonaws.com/uz2jszvuhayukp7mq0db.jpg")
    const image = {
      id: this.props.image.id,
      caption,
      location,
      people: people.filter(p => p !== '')
    };
    this.props.save(image).then(({ data }) => {
      console.log(data);
    }).catch(err => {
      console.error(err);
    });
  }

  render() {
    const { onCloseRequest, data } = this.props;

    const { image } = this.state;

    if (data.loading) return <div>'loading'</div>;

    return (
      <div>
        <textarea placeholder="Caption" value={image.caption} onChange={this.update('caption')}/>
        <select onChange={this.update('location')} value={this.state.image.location}>
          <option value="">Select Location</option>
          { data.locations.map(location => (
            <option key={location.id} value={location.id}>{location.name}</option>
          ))}
        </select>
        { image.people.map((person, idx) => (
          <div key={person}>
            <select onChange={this.updatePerson(idx)} value={person}>
              <option value="">Select Person</option>
              { data.users.filter(u => (!image.people.includes(u.id) || u.id === person)).map(u => (
                <option key={u.id} value={u.id}>{u.displayName}</option>
              ))}
            </select>
            <button onClick={this.removePerson(idx)}>X</button>
          </div>
        ))}
        <button onClick={this.addPerson}>Add Person</button>
        <hr />
        <button onClick={this.save}>Update</button>
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

const UPDATE_IMAGE = gql`mutation UpdateImage($image: ImageInput!) {
  updateImage(image: $image) {
    ...ImageFragment
  }
}
${ImageFragment}
`;


const mut = graphql(UPDATE_IMAGE, {
  props: ({ mutate }) => ({
    save: (image) => mutate({
      variables: { image }
    })
  })
})(ImageForm);

export default graphql(QUERIES)(mut);
