import { connect } from "react-redux";

import EventDetail from "../../pages/EventDetail";
import { getSelectedEvent } from "../../redux/selectors/selectors";

const mapStateToProps = state => ({
  eventData: state.evenement,
  event: getSelectedEvent(state)
});

export default connect(mapStateToProps)(EventDetail);
