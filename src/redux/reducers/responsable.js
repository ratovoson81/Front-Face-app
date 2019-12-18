import * as types from "../constants/responsableActionTypes";

const initialState = {
  listResponsable: []
};

const responsable = (state = initialState, action) => {
  let newState = { ...state };
  let payload;
  switch (action.type) {
    case types.SET_RESPONSABLE:
      payload = action.payload;
      newState.listResponsable = payload.listResponsable;
      return newState;

    default:
      return state;
  }
};

export default responsable;