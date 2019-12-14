import { createStore, combineReducers } from "redux";

import categorie from "./reducers/categorie";

const rootReducer = combineReducers({ categorie });
const store = createStore(rootReducer);

export default store;
