import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import CreateEvent from "../../pages/CreateEvent";
import * as categorieActions from "../actions/categorieActions";
import * as groupeActions from "../actions/groupeParticipantActions";
import * as matiereActions from "../actions/matiereAction";
import * as responsableActions from "../actions/responsableActions";
import * as eventActions from "../actions/evenementActions";
import * as asyncActions from "../redux-saga/asyncActions";

const actions = {
  ...categorieActions,
  ...groupeActions,
  ...matiereActions,
  ...responsableActions,
  ...eventActions,
  ...asyncActions
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
