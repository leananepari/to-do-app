import React, { useState, useEffect } from 'react';
import Tab from './Tab';
import { category_icons } from '../../data';
import { connect } from 'react-redux';
import { dashboard } from '../../state/actions';
import { ReactComponent as ListIcon } from '../../assets/list-icon.svg';
import { ReactComponent as PlusSignIcon } from '../../assets/plus-sign-icon.svg';

const TabsList = ( props ) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [newList, setNewList] = useState({'name': ''});
  const [focus, setFocus] = useState('none');
  const refContainer = React.createRef();

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  })

  const handleClick = e => {
    if (refContainer.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click 
    setFocus('none');
  };

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

  const handleOnFocus = () => {
    setFocus('focus');
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
          
          return <Tab category={list.name} icon={ListIcon} key={list.list_id} selected={props.selected} setSelected={props.setSelected}/>
        })}
      </div>
      <div className="add-new-list"> 
        <form onSubmit={handleAddNewList} >
          <PlusSignIcon className={`plus-sign-icon ${focus}`} />
          <input 
              type="text"
              name="name"
              value={newList.name} 
              onChange={handleChange} 
              placeholder="New list"
              autoComplete="off"
              onFocus={handleOnFocus} 
              ref={refContainer}
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