import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
# Write your query or mutation here
query(
  $searchKeyword: String
  $orderBy: AllRepositoriesOrderBy
  $orderDirection: OrderDirection
) {

  repositories(
    searchKeyword: $searchKeyword
    orderBy: $orderBy
    orderDirection: $orderDirection
  ) {
    pageInfo{
      hasNextPage,
      endCursor,
      startCursor,
    },
    edges {
      node {
        id
        name
        ownerName
        createdAt
        fullName
        reviewCount
        ratingAverage
        forksCount
        stargazersCount
        description
        language
        ownerAvatarUrl
        url
      }
      cursor
    }
  }
}
`;

export const GET_AUTHORIZED_USER = gql`
query($review: Boolean!){
  authorizedUser{
    username,
    id,
     reviews @include(if: $review){
      totalCount,
      edges{
        node{
          id,
          repository{
            fullName
          },
          user {
            id
            username
          }
          repositoryId,
          rating,
          createdAt,
          text
        }
      },
      pageInfo{endCursor,hasNextPage}
    }
  }
}`;

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
        reviews(first:3) {
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


