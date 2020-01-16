import { takeLatest, put, call, all } from "redux-saga/effects";

import * as types from "../asyncActionTypes";
import * as requests from "../../../graphql/requests";
import * as categorieActions from "../../actions/categorieActions";
import * as groupeActions from "../../actions/groupeParticipantActions";
import * as matiereActions from "../../actions/matiereAction";
import * as responsableActions from "../../actions/responsableActions";

function* getEventData() {
  const { data } = yield call(requests.getAllData);
  const categories = data.categories;
  const groupes = data.groupeParticipants;
  const matieres = data.matieres;
  const responsables = data.responsables;

  yield all([
    put(
      categorieActions.setCategorie({
        listCategorie: categories
      })
    ),
    put(
      groupeActions.setGroupe({
        listGroupe: groupes
      })
    ),
    put(
      matiereActions.setMatiere({
        listMatiere: matieres
      })
    ),
    put(
      responsableActions.setResponsable({
        listResponsable: responsables
      })
    )
  ]);
}

const querySagas = [
  takeLatest(types.ASYNC_GET_CREATE_EVENT_DATA, getEventData)
];

export default querySagas;
