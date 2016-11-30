import gql from 'graphql-tag';

export default gql`
  fragment ImageFragment on Image {
    id
    url
    location {
      id
      name
    }
    people {
      id
      username
      displayName
      profilePicture {
        id
        url
      }
    }
    createdAt
    owner {
      id
      username
      displayName
      profilePicture {
        id
        url
      }
    }
  }
`
