import { gql } from "apollo-boost";

export const ALL_DATA = gql`
  query {
    categories {
      id
      nomCategorie
    }
    groupeParticipants {
      id
      nomGroupeParticipant
     }
     matieres {
      id
      nomMatiere
    }
    responsables {
      id
      individu {
        id
        nom
        prenom
      }
    }
    evenements {
      id
      categorie{
        nomCategorie
      }
      matiere{
        nomMatiere
      }
      responsables {
        individu{
          nom
          prenom
        }
      }
      presences {
        individu{
          nom
          prenom
        }
        niveau
        parcours
      }
      dateDebut
      dateFin
    }
  }
`;
