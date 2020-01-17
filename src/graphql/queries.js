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
      categorie {
        nomCategorie
      }
      matiere {
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
      presences {
        id
        individu {
          id
          nom
          prenom
        }
        niveau
        parcours
      }
      groupeParticipants {
        id
        nomGroupeParticipant
        membres {
          id
          individu {
            id
            nom
            prenom
          }
          niveau
          parcours
        }
      }
      dateDebut
      dateFin
    }
  }
`;

export const GP_MEMBERS = gql`
  query GpMembers($gpId: ID!) {
    gpMembers(gpId: $gpId) {
      id
      individu {
        nom
        prenom
      }
      niveau
      parcours
    }
  }
`;

export const EVENEMENT = gql`
  query Evenement($idEvent: ID) {
    evenement(idEvent: $idEvent) {
      id
      categorie {
        id
        nomCategorie
      }
      matiere {
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
      presences {
        id
        individu {
          id
          nom
          prenom
        }
        niveau
        parcours
      }
      groupeParticipants {
        id
        nomGroupeParticipant
        membres {
          id
          individu {
            nom
            prenom
          }
          niveau
          parcours
        }
      }
      dateDebut
      dateFin
    }
  }
`;
