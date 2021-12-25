import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories{
      edges{
        node{
          id,
          name,
          ownerName,
          createdAt,
          fullName,
          reviewCount,
          ratingAverage,
          forksCount,
          stargazersCount,
          description,
          language,
          ownerAvatarUrl,
        },
        cursor
      }
    }
}`;

export const GET_AUTHORIZED_USER = gql`
  query{
    authorizedUser
    {
      username,
      id
    }
  } `;

export const GET_REPOSITORY = gql`
  query($id: ID!) {
    repository(id: $id) {
      id,
      name,
      createdAt,
      fullName,
      reviewCount,
      ratingAverage,
      forksCount,
      stargazersCount,
      description,
      language,
      ownerAvatarUrl,
      url,
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
