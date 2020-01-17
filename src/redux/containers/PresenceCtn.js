import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Presence from "../../components/Presence";
import * as evenementActions from "../actions/evenementActions";
import { getSelectedEvent } from "../../redux/selectors/selectors";

const actions = { ...evenementActions };

const mapStateToProps = state => ({
  event: getSelectedEvent(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Presence);
