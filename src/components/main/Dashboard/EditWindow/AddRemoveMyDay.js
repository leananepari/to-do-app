import React from 'react';
import { connect } from 'react-redux';
import { dashboard } from '../../../../state/actions';

import { ReactComponent as SunIcon } from '../../../../assets/sun-icon.svg';
import { ReactComponent as SunIconPurple } from '../../../../assets/sun-icon-purple.svg';
import { ReactComponent as CancelIcon } from '../../../../assets/cancel-icon.svg';

const AddRemoveMyDay = ( props ) => {

  const handleAddToMyDay = () => {
    props.selectedTask.my_day = true;
    props.updateTaskAddToMyDay(props.selectedTask);
  }

  const handleRemoveFromToMyDay = () => {
    props.selectedTask.my_day = false;
    props.updateTaskRemoveFromMyDay(props.selectedTask);
  }

  return (
    <div>
      {props.selectedTask.my_day ?
        <div className="add-to-my-day added">
          <SunIconPurple className="sun-icon" />
          <div className="added-text">Added to My Day</div>
          <CancelIcon className="cancel-icon" onClick={handleRemoveFromToMyDay}/>
        </div>
        :
        <div className="add-to-my-day add" onClick={handleAddToMyDay}>
          <SunIcon className="sun-icon"/>
          <div className="add-text">Add to My Day</div>
        </div>
      }
    </div>
  )
}

export default connect(
  state => ({
    dashboard: state.dashboard,
    selectedTask: state.dashboard.selectedTask
  }),
  {
    updateTaskAddToMyDay: dashboard.updateTaskAddToMyDay,
    updateTaskRemoveFromMyDay: dashboard.updateTaskRemoveFromMyDay,
  }
)(AddRemoveMyDay);