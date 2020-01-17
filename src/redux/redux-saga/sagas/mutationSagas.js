import { takeLatest, call, all, put } from "redux-saga/effects";

import * as request from "../../../graphql/requests";
import * as types from "../asyncActionTypes";
import * as eventActions from "../../actions/evenementActions";

function* createEvent(action) {
  const { data } = yield call(request.createEvent, action.payload);
  const event = data.createEvent.evenement;

  yield put(eventActions.addEvenement({ event }));
}

const mutationSagas = [takeLatest(types.ASYNC_CREATE_EVENT, createEvent)];

export default mutationSagas;
