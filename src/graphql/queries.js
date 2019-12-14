import { gql } from "apollo-boost";

export const ALL_DATA = gql`
  query {
    categories {
      id
      nomCategorie
    }
  }
`;
