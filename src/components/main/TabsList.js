import React, { useState } from 'react';
import Tab from './Tab';
import { category_icons } from '../../data';
import { connect } from 'react-redux';
import { dashboard } from '../../state/actions';
import plus_sign_icon from '../../assets/plus-sign-icon.svg';
import list_icon from '../../assets/list-icon.svg';

const TabsList = ( props ) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [newList, setNewList] = useState({'name': ''})

  const handleAddNewList = (e) => {
    e.preventDefault();
    let list = {...newList}
    list['user_id_fk'] = user.userid;
    list['theme_id_fk'] = 1;
    props.createCustomList(list, props.setSelected);
    setNewList({'name': ''});
    
  }

  const handleChange = (event) => {
    setNewList( { ...newList, [event.target.name]: event.target.value } )
  }

  return (
    <div className="tabs-list">
      {props.categories.map((category) => {
        return <Tab category={category} key={category} icon={category_icons[category]} 
                    selected={props.selected} setSelected={props.setSelected} 
                />
      })}

      <div className="custom-lists">
        {props.lists.map(list => {
          return <Tab category={list.name} icon={list_icon} key={list.list_id} selected={props.selected} setSelected={props.setSelected}/>
        })}
      </div>
      <div className="add-new-list"> 
        <form onSubmit={handleAddNewList} >
          <img src={plus_sign_icon} style={{width: '16px'}} alt="plus sign icon"/>
          <input 
              type="text"
              name="name"
              value={newList.name} 
              onChange={handleChange} 
              placeholder="New list"
              autoComplete="off"
            />
        </form>
      </div>
    </div>
  )
}


export default connect(
  state => ({
    dashboard: state.dashboard,
    lists: state.dashboard.lists,
    categories: state.dashboard.categories
  }),
  { createCustomList: dashboard.createCustomList }
)(TabsList);