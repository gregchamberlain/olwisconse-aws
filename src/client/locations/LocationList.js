import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import LocationForm from './LocationForm.js';

const LocationList = ({ data }) => (
  <div>
    <h1>Locations</h1>
    { data.loading ? <div>Loading...</div> : (
      <ul>
        {data.locations.map(location => (
          <li key={location.id}>
            {location.name}
          </li>
        ))}
      </ul>
    )}
    <LocationForm />
  </div>
);

const query = gql`query Locations {
  locations {
    id
    name
  }
}`;

export default graphql(query)(LocationList);
