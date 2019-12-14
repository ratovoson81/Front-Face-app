import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Event from "../../pages/Event";
import * as categorieActions from "../actions/categorieActions";

const actions = { ...categorieActions };

const mapStateToProps = state => ({
  categorieData: state.categorie
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);
