import { createStore, combineReducers } from "redux";

import categorie from "./reducers/categorie";
import groupe from "./reducers/groupeParticipant"
import matiere from "./reducers/matiere"
import responsable from "./reducers/responsable"

const rootReducer = combineReducers({ categorie, groupe, matiere, responsable });
const store = createStore(rootReducer);

export default store;
