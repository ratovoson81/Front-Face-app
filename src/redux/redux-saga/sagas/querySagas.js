import { takeLatest, put, call, all } from "redux-saga/effects";

import * as types from "../asyncActionTypes";
import * as requests from "../../../graphql/requests";
import * as categorieActions from "../../actions/categorieActions";
import * as groupeActions from "../../actions/groupeParticipantActions";
import * as matiereActions from "../../actions/matiereAction";
import * as responsableActions from "../../actions/responsableActions";
import * as eventActions from "../../actions/evenementActions";

function* getEventData() {
  const { data } = yield call(requests.getAllData);
  const listCategorie = data.categories;
  const listGroupe = data.groupeParticipants;
  const listMatiere = data.matieres;
  const listResponsable = data.responsables;
  const listEvenement = data.evenements;

  yield all([
    put(categorieActions.setCategorie({ listCategorie })),
    put(groupeActions.setGroupe({ listGroupe })),
    put(matiereActions.setMatiere({ listMatiere })),
    put(responsableActions.setResponsable({ listResponsable })),
    put(eventActions.setEvenement({ listEvenement }))
  ]);
}

const querySagas = [
  takeLatest(types.ASYNC_GET_CREATE_EVENT_DATA, getEventData)
];

export default querySagas;
