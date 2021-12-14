import { gql } from '@apollo/client';


export const AUTHORIZE_USER = gql`
  mutation authorize($credentials: AuthorizeInput!) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;
