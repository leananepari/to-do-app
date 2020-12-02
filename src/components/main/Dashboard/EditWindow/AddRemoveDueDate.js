import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { dashboard } from '../../../../state/actions';
import { useHistory } from 'react-router-dom';

import { ReactComponent as CalendarIcon } from '../../../../assets/calendar-icon.svg';
import { ReactComponent as CalendarIconPurple } from '../../../../assets/calendar-icon-purple.svg';
import { ReactComponent as CalendarIconRed} from '../../../../assets/calendar-icon-red.svg';
import { ReactComponent as CancelIcon } from '../../../../assets/cancel-icon.svg';
import { formatDate } from '../../../../utils/helpers';

const AddDueDate = ( props ) => {
  const [date, setDate] = useState();
  let now = new Date();
  now.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (props.selectedTask.due !== null) {
      setDate(formatDate(props.selectedTask.due));
    }
  })

  return (
    <div>
      {props.selectedTask.due === null ?
        <div className="add-due-date">
          <CalendarIcon className="calendar-icon"/>
          <div>Add due date</div>
        </div>
        :
        props.selectedTask.due > now ?
          <div className="add-due-date added">
            <CalendarIconPurple className="calendar-icon"/>
            <div>Due {date}</div>
            <CancelIcon className="cancel-icon" />
          </div>
          :
          <div className="add-due-date overdue">
            <CalendarIconRed className="calendar-icon"/>
            <div>Overdue {date}</div>
            <CancelIcon className="cancel-icon" />
          </div>
      }
    </div>
  )
}

export default connect(
  state => ({
    dashboard: state.dashboard,
    selectedTask: state.dashboard.selectedTask,
  }),
  {}
)(AddDueDate);