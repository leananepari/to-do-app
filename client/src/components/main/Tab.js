import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Tab = ({ category, icon, selected, setSelected }) => {

  const handleClick = () => {
    setSelected(category)
  }

  return (
    <div className="tab" onClick={handleClick}>
      <FontAwesomeIcon style={{width: '20px', height: '20px', color: `${selected === category ? '#0EA4E0' : 'gray'}`}} icon={icon} size='lg'/> 
      <div style={{color: `${selected === category ? '#0EA4E0' : 'gray'}`}}>{category}</div>
    </div>
  )
}

export default Tab;