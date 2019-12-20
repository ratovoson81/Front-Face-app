import * as types from "../constants/categorieActionTypes";

export function setCategorie(payload) {
  return {
    type: types.SET_CATEGORIE,
    payload
  };
}
