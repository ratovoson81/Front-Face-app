import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import EventList from "../../pages/EventList";
import * as evenementActions from "../actions/evenementActions";

const actions = { ...evenementActions };

const mapStateToProps = state => ({
  evenementData: state.evenement
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
