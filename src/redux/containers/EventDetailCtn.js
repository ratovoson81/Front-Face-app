import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import EventDetail from "../../pages/EventDetail";
import { getSelectedEvent } from "../../redux/selectors/selectors";
import * as eventActions from "../actions/evenementActions";

const mapStateToProps = state => ({
  eventData: state.evenement,
  event: getSelectedEvent(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(eventActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
