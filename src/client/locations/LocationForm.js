import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

class LocationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  update = name => e => {
    this.setState({ [name]: e.target.value });
  }

  submit = e => {
    e.preventDefault();
    this.props.create(this.state).then(({data}) => {
      this.setState({ name: '' });
    });
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <div>
          <label>Name</label>
          <input type="text" onChange={this.update('name')} value={this.state.name} required />
        </div>
        <button>Create</button>
      </form>
    );
  }
}

const mutation = gql`mutation createLocation($location: LocationInput!) {
  createLocation(location: $location) {
    id
    name
  }
}`;

export default graphql(mutation, {
  props({ mutate }) {
    return {
      create(location) {
        return mutate({
          variables: { location },
          updateQueries: {
            Locations: (prev, { mutationResult }) => {
              const newLocation = mutationResult.data.createLocation;
              return update(prev, {
                locations: {
                  $push: [newLocation]
                }
              });
            }
          }
        });
      }
    };
  }
})(LocationForm);
