import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { dashboard } from '../../../../state/actions';
import OutsideClickHandler from '../../../../utils/OutsideClickHandler';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { ReactComponent as CalendarIcon } from '../../../../assets/calendar-icon.svg';
import { ReactComponent as CalendarIconPurple } from '../../../../assets/calendar-icon-purple.svg';
import { ReactComponent as CalendarIconRed} from '../../../../assets/calendar-icon-red.svg';
import { ReactComponent as CancelIcon } from '../../../../assets/cancel-icon.svg';
import { ReactComponent as CalendarIconToday} from '../../../../assets/calendar-icon-today.svg';
import { ReactComponent as CalendarIconPickDate} from '../../../../assets/calendar-icon-pick-a-date.svg';
import { ReactComponent as CalendarIconTomorrow} from '../../../../assets/calendar-icon-tomorrow.svg';
import { formatDate } from '../../../../utils/helpers';

const AddDueDate = ( props ) => {
  const [date, setDate] = useState();
  const [value, onChange] = useState(new Date());
  let now = new Date();
  now.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (props.selectedTask.due !== null) {
      setDate(formatDate(props.selectedTask.due));
    }
  })

  const handleAddDueDateClick = () => {
    props.setDateSelectionDropdown(true);
  }

  const handleOutsideClickDateSelectionDropdown = () => {
    props.setDateSelectionDropdown(false);
  }

  const handleTodayClick = () => {
    props.selectedTask.due = new Date();
    props.updateTaskAddDueDate(props.selectedTask);
  }

  const handleTomorrowClick = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1);
    props.selectedTask.due = tomorrow;
    props.updateTaskAddDueDate(props.selectedTask);
  }

  const handleClickPickDate = () => {
    props.selectedTask.due = value;
    props.updateTaskAddDueDate(props.selectedTask);
    props.setDateSelectionDropdown(false);
  }

  const handleRemoveDueDate = () => {
    props.selectedTask.due = null;
    props.updateTaskRemoveDueDate(props.selectedTask);
    props.setDateSelectionDropdown(false);
  }

  return (
    <OutsideClickHandler callback={handleOutsideClickDateSelectionDropdown}>
      <>
        {props.selectedTask.due === null ?
          <div className="wrap">
            <div className="add-due-date" onClick={handleAddDueDateClick}>
              <CalendarIcon className="calendar-icon"/>
              <div>Add due date</div>
            </div>

            <div className="date-selection-dropdown"
                 style={{display: `${props.dateSelectionDropdown ? "block" : "none"}`}}>

              <div className="title">
                Due
              </div>

              <div>
                <div className="option-wrap" onClick={handleTodayClick}>
                  <CalendarIconToday className="icon" />
                  <ul>Today</ul>
                </div>
                <div className="option-wrap" onClick={handleTomorrowClick}>
                  <CalendarIconTomorrow className="icon" />
                  <ul>Tomorrow</ul>
                </div>
                <div className="option-wrap pick">
                  <CalendarIconPickDate className="icon" />
                  <ul>Pick a date</ul>
                  <div className="calendar">
                    <div className="title">
                      Pick a date
                    </div>
                    <Calendar 
                      onChange={onChange}
                      value={value}
                    />
                    <button className="save-btn" onClick={handleClickPickDate}>Save</button>
                  </div>
                </div>
              </div>

            </div>

          </div>
          :
          props.selectedTask.due > now ?
            <div className="add-due-date added">
              <CalendarIconPurple className="calendar-icon"/>
              <div>Due {date}</div>
              <CancelIcon onClick={handleRemoveDueDate} className="cancel-icon" />
            </div>
            :
            <div className="add-due-date overdue">
              <CalendarIconRed className="calendar-icon"/>
              <div>Overdue {date}</div>
              <CancelIcon onClick={handleRemoveDueDate} className="cancel-icon" />
            </div>
        }
      </>
    </OutsideClickHandler>
  )
}

export default connect(
  state => ({
    dashboard: state.dashboard,
    selectedTask: state.dashboard.selectedTask,
    dateSelectionDropdown: state.dashboard.dateSelectionDropdown
  }),
  {
    setDateSelectionDropdown: dashboard.setDateSelectionDropdown,
    updateTaskAddDueDate: dashboard.updateTaskAddDueDate,
    updateTaskRemoveDueDate: dashboard.updateTaskRemoveDueDate
  }
)(AddDueDate);