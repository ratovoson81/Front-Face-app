import * as types from "../constants/groupeParticipantActionTypes";

export function setGroupe(payload) {
  return {
    type: types.SET_GROUPE,
    payload
  };
}
