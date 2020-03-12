import React from 'react';
import Tab from './Tab';

const TabsList = ({ categories, icons, selected, setSelected, categoriesCount }) => {

  return (
    <div className="tabs-list">
      {categories.map((category) => {
        return <Tab category={category} key={category} icon={icons[category]} selected={selected} setSelected={setSelected} categoriesCount={categoriesCount} />
      })}
    </div>
  )
}

export default TabsList;