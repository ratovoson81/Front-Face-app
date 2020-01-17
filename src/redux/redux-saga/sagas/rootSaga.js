import { all } from "redux-saga/effects";

import querySagas from "./querySagas";
import mutationSagas from "./mutationSagas";

function* rootSaga() {
  yield all([...querySagas, ...mutationSagas]);
}

export default rootSaga;
