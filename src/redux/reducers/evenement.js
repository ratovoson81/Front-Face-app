import * as types from "../constants/eventActionTypes";

const initialState = {
  listEvenement: [],
  selected: null //id
};

const evenement = (state = initialState, action) => {
  let newState = { ...state };
  let payload;
  switch (action.type) {
    case types.SET_EVENEMENT:
      payload = action.payload;
      if (payload.listEvenement) newState.listEvenement = payload.listEvenement;
      if (payload.selected) newState.selected = payload.selected;
      return newState;

    case types.ADD_EVENEMENT:
      payload = action.payload;
      newState.listEvenement = [...state.listEvenement, payload.event];
      return newState;

    default:
      return state;
  }
};

export default evenement;
