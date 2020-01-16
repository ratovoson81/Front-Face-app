import * as types from "./asyncActionTypes";

export const asyncGetEventData = () => ({
  type: types.ASYNC_GET_CREATE_EVENT_DATA
});

export const asyncCreateEvent = payload => ({
  type: types.ASYNC_CREATE_EVENT,
  payload
});
