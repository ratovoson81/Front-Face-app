import * as types from "../constants/matiereActionTypes";

const initialState = {
  listMatiere: []
};

const matiere = (state = initialState, action) => {
  let newState = { ...state };
  let payload;
  switch (action.type) {
    case types.SET_MATIERE:
      payload = action.payload;
      newState.listMatiere = payload.listMatiere;
      return newState;

    default:
      return state;
  }
};

export default matiere;