import * as types from "../constants/eventActionTypes";

export function setEvenement(payload) {
  return {
    type: types.SET_EVENEMENT,
    payload
  };
}