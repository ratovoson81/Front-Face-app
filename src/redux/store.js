import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./redux-saga/sagas/rootSaga";
import categorie from "./reducers/categorie";
import groupe from "./reducers/groupeParticipant";
import matiere from "./reducers/matiere";
import responsable from "./reducers/responsable";
import evenement from "./reducers/evenement";

const rootReducer = combineReducers({
  categorie,
  groupe,
  matiere,
  responsable,
  evenement
});
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
