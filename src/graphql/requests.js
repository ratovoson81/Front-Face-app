import * as queries from "./queries";
import * as mutations from "./mutations";
import client from "../graphql/apollo";

export const getAllData = () =>
  client.query({
    query: queries.ALL_DATA
  });

export const createEvent = payload =>
  client.mutate({
    mutation: mutations.CREATE_EVENT,
    variables: payload.event
  });
