import * as types from "../constants/eventActionTypes";

const initialState = {
  listEvenement: []
};

const evenement = (state = initialState, action) => {
  let newState = { ...state };
  let payload;
  switch (action.type) {
    case types.SET_EVENEMENT:
      payload = action.payload;
      newState.listEvenement = payload.listEvenement;
      return newState;

    default:
      return state;
  }
};

export default evenement;