import * as types from "../constants/categorieActionTypes";

const initialState = {
  listCategorie: []
};

const categorie = (state = initialState, action) => {
  let newState = { ...state };
  let payload;
  switch (action.type) {
    case types.SET_CATEGORIE:
      payload = action.payload;
      newState.listCategorie = payload.listCategorie;
      return newState;

    default:
      return state;
  }
};

export default categorie;
