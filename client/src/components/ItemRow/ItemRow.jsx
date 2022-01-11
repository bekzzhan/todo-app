import React from 'react';
import './ItemRow.css'

const ItemRow = ({id, isChecked, title, removeItem}) => {
  return (
    <>
      <div className='item-row' >
        <div className='item-inputs-group'>
          <input className='item-checkbox' type='checkbox' checked={isChecked}/>
          <span className='item-title'>{title}</span>
        </div>
        <div className='item-buttons-group'>
          <button className='waves-effect waves-light btn-small'>Edit</button>
          <button className='waves-effect red btn-small'>X</button>
        </div>
      </div>
    </>
  );
};

export default ItemRow;