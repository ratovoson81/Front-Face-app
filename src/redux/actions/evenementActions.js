import * as types from "../constants/eventActionTypes";

export function setEvenement(payload) {
  return {
    type: types.SET_EVENEMENT,
    payload
  };
}

export function addEvenement(payload) {
  return {
    type: types.ADD_EVENEMENT,
    payload
  };
}

export function startEvent(payload) {
  return {
    type: types.START_EVENT,
    payload
  };
}
