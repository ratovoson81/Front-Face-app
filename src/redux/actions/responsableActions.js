import * as types from "../constants/responsableActionTypes";

export function setResponsable(payload) {
  return {
    type: types.SET_RESPONSABLE,
    payload
  };
}
