import { gql } from '@apollo/client';


export const AUTHORIZE_USER = gql`
  mutation authorize($credentials: AuthorizeInput!) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation($input: CreateReviewInput!) {
    createReview(review: $input ){
        repositoryId
    }
  }
`;

export const CREATE_USER = gql`
  mutation($user:CreateUserInput!){
    createUser(user:$user){
      username,
      id,
    }
  }
`;
