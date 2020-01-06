import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Event from "../../pages/Event";
import * as categorieActions from "../actions/categorieActions";
import * as groupeActions from "../actions/groupeParticipantActions";
import * as matiereActions from "../actions/matiereAction";
import * as responsableActions from "../actions/responsableActions";
import * as eventActions from "../actions/evenementActions";

const actions = {
  ...categorieActions,
  ...groupeActions,
  ...matiereActions,
  ...responsableActions,
  ...eventActions
};

const mapStateToProps = state => ({
  categorieData: state.categorie,
  groupeData: state.groupe,
  matiereData: state.matiere,
  responsableData: state.responsable
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);
