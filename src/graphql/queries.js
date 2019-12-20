import { gql } from "apollo-boost";

export const ALL_DATA = gql`
  query {
    categories {
      id
      nomCategorie
    }
    groupeParticipants{
      id
      nomGroupeParticipant
     }
     matieres{
      id
			nomMatiere
    }
    responsables {
      individu {
        id
        nom
        prenom
      }
    }
  }
`;
