import * as types from "../constants/matiereActionTypes";

export function setMatiere(payload) {
  return {
    type: types.SET_MATIERE,
    payload
  };
}
