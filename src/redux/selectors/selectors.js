import { createSelector } from "reselect";

const getEvent = state => state.evenement;

export const getSelectedEvent = createSelector([getEvent], events => {
  const id = events.selected;
  const list = events.listEvenement;
  event = list.filter(e => e.id === id)[0];
  return event;
});
