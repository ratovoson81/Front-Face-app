import * as types from "../constants/groupeParticipantActionTypes";

const initialState = {
  listGroupe: []
};

const groupe = (state = initialState, action) => {
  let newState = { ...state };
  let payload;
  switch (action.type) {
    case types.SET_GROUPE:
      payload = action.payload;
      newState.listGroupe = payload.listGroupe;
      return newState;

    default:
      return state;
  }
};

export default groupe;