import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';

import LocationForm from './LocationForm.js';

const LocationList = ({ data }) => (
  <div>
    <h1>Locations</h1>
    <LocationForm />
    { data.loading ? <div>Loading...</div> : (
      <ul>
        {data.locations.map(location => (
          <li key={location.id}>
            <Link to={`/locations/${location.id}`}>{location.name}</Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const query = gql`query Locations {
  locations {
    id
    name
  }
}`;

export default graphql(query)(LocationList);
