import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

import ImageList from './ImageList';
import ImageFragment from '../graphql/ImageFragment';

const ImageIndex = ({ data, create }) => data.loading ? <h1>Loading...</h1> : (
  <div>
    <h1 style={{textAlign: 'center'}}>All Images</h1>
    { data.images && <ImageList images={data.images} onUploadComplete={create} />}
  </div>
);

const IMAGES_QUERY = gql`query Images {
  images {
    ...ImageFragment
  }
}
  ${ImageFragment}
`;

const CREATE_IMAGES = gql`mutation CreateImage($urls: [String]!) {
  createImages(urls: $urls) {
    ...ImageFragment
  }
}
${ImageFragment}
`;

const mut = graphql(CREATE_IMAGES, {
  props: ({ mutate }) => ({
    create: (urls) => mutate({
      variables: { urls },
      updateQueries: {
        Images: (prev, { mutationResult }) => {
          const images = mutationResult.data.createImages;
          return update(prev, {
            images: {
              $push: images
            }
          });
        }
      }
    })
  })
})(ImageIndex);

export default graphql(IMAGES_QUERY)(mut);
