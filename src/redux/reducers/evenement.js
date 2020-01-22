import * as types from "../constants/eventActionTypes";
import { includesObject } from "../../helpers";

const initialState = {
  listEvenement: [],
  selected: null //id
};

const evenement = (state = initialState, action) => {
  let newState = { ...state };
  let payload;
  let events;
  let idEvent;
  let newPresenceEntry;
  let dateFin;

  switch (action.type) {
    case types.SET_EVENEMENT:
      payload = action.payload;
      if (payload.listEvenement) newState.listEvenement = payload.listEvenement;
      if (payload.selected) newState.selected = payload.selected;
      if (payload.newPresenceEntry) {
        newPresenceEntry = payload.newPresenceEntry;
        idEvent = payload.idEvent;
        events = state.listEvenement.map(event => {
          if (
            event.id === idEvent &&
            !includesObject(event.presences, newPresenceEntry.id)
          ) {
            event.presences.push(newPresenceEntry);
          }
          return event;
        });
        newState.listEvenement = [...events];
      }
      if (payload.dateFin) {
        dateFin = payload.dateFin;
        idEvent = payload.idEvent;
        events = state.listEvenement.map(event => {
          if (event.id === idEvent) {
            event.dateFin = dateFin;
          }
          return event;
        });
        newState.listEvenement = [...events];
      }
      return newState;

    case types.ADD_EVENEMENT:
      payload = action.payload;
      newState.listEvenement = [...state.listEvenement, payload.event];
      return newState;

    case types.START_EVENT:
      const { id, dateDebut } = action.payload;
      events = state.listEvenement.map(event => {
        if (event.id === id) {
          event.dateDebut = dateDebut;
          if (!dateDebut) {
            event.presences = [];
          }
        }
        return event;
      });
      newState.listEvenement = [...events];
      return newState;

    default:
      return state;
  }
};

export default evenement;
