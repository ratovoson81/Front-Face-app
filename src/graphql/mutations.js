import gql from "graphql-tag";

/**
 * Mutation createEvent
 * Tous les arguments sont facultatifs sauf la categorie qui est necessaire dans le code back
 * Les arguments sont soit un id de l'entree soit une liste d'id des entrees dans les tables
 *
 * Example d'utilisation
 *
 * les imports deja effectuees...
 *
 * const [createEvent, {loading}] = useMutation(mutations.CREATE_EVENT, {
 *  onCompleted: function (data) {...traitement},
 *  onError: function (response) {...traitement}
 * })
 */
export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $categorie: ID
    $dateDebut: DateTime
    $dateFin: DateTime
    $groupeParticipants: [ID]
    $matiere: ID
    $presences: [ID]
    $responsables: [ID]
  ) {
    createEvent(
      categorie: $categorie
      dateDebut: $dateDebut
      dateFin: $dateFin
      groupeParticipants: $groupeParticipants
      matiere: $matiere
      presences: $presences
      responsables: $responsables
    ) {
      evenement {
        id
        categorie {
          nomCategorie
        }
        matiere {
          nomMatiere
        }
        responsables {
          individu {
            id
            nom
            prenom
          }
        }
        presences {
          id
          individu {
            nom
            prenom
          }
          niveau
          parcours
        }
        groupeParticipants {
          id
          nomGroupeParticipant
        }
        dateDebut
        dateFin
      }
    }
  }
`;

export const SET_EVENT = gql`
  mutation SetEvent(
    $categorie: ID
    $dateDebut: DateTime
    $dateFin: DateTime
    $groupeParticipants: [ID]
    $idEvent: ID!
    $matiere: ID
    $presences: [ID]
    $responsables: [ID]
    $cancel: Boolean
  ) {
    setEvent(
      categorie: $categorie
      dateDebut: $dateDebut
      dateFin: $dateFin
      groupeParticipants: $groupeParticipants
      idEvent: $idEvent
      matiere: $matiere
      presences: $presences
      responsables: $responsables
      cancel: $cancel
    ) {
      evenement {
        id
        categorie {
          nomCategorie
        }
        matiere {
          nomMatiere
        }
        responsables {
          individu {
            id
            nom
            prenom
          }
        }
        presences {
          id
          individu {
            nom
            prenom
          }
          niveau
          parcours
        }
        groupeParticipants {
          id
          nomGroupeParticipant
        }
        dateDebut
        dateFin
      }
    }
  }
`;

export const COMPARE_IMAGE = gql`
  mutation($file: Upload!, $eventId: ID!) {
    compareImage(file: $file, eventId: $eventId) {
      present
      etudiant {
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
  }
`;
