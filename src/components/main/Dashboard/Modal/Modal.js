import React from "react";
import { connect } from 'react-redux';
import { dashboard } from '../../../../state/actions';

const ModalTasks = ( props ) => {

  const handleCancel = () => {
    props.setModalFalse();
  }

  const handleDelete = () => {
    props.modalDeleteFunction(props.modalDeleteId, props.modalDeleteHistory);
    props.setModalFalse();
  }

  return (
    <div className="modal" style={{display: `${props.modal ? 'block' : 'none'}`}}>
      <div className='modal_inner'>
        <div>
          <p className="first-line">"{props.modalDeleteText}" will be
          permanently deleted.</p>
          <p className="second-line">You won't be able to undo this action.</p>
        </div>
        <div className="btn-wrap">
            <button className="btn cancel" onClick={handleCancel}>Cancel</button>
            <button className="btn delete" onClick={handleDelete}>Delete task</button>
        </div>
      </div>
    </div>
  );
}

export default connect(
  state => ({
    dashboard: state.dashboard,
    modal: state.dashboard.modal,
    modalDeleteId: state.dashboard.modalDeleteId,
    modalDeleteText: state.dashboard.modalDeleteText,
    modalDeleteFunction: state.dashboard.modalDeleteFunction,
    modalDeleteHistory: state.dashboard.modalDeleteHistory
  }),
  { 
    setModalFalse: dashboard.setModalFalse
  }
)(ModalTasks);