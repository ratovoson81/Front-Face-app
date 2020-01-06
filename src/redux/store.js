import { createStore, combineReducers } from "redux";

import categorie from "./reducers/categorie";
import groupe from "./reducers/groupeParticipant"
import matiere from "./reducers/matiere"
import responsable from "./reducers/responsable"
import evenement from "./reducers/evenement"

const rootReducer = combineReducers({ categorie, groupe, matiere, responsable, evenement });
const store = createStore(rootReducer);

export default store;
