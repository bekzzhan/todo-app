import React, {useState} from 'react';
import { useHttp } from '../../hooks/http.hook';
import './ItemRow.css'

const ItemRow = ({id, isChecked, title, removeItem, handleComplete}) => {
  const [editing, setEditing] = useState(false);
  const [itemTitle, setItemTitle] = useState(title)
  const {request} = useHttp();
  const saveHandler = async () => {
    await request(`/todos/${id}`, 'PATCH', {title: itemTitle});
    setEditing(!editing);
  }
  return (
    <>
      <div className='item-row' >
        <div className='item-inputs-group'>
          <label>
            {!editing ? 
            <>
              <input className='item-checkbox' type='checkbox' checked={isChecked} onChange={() => handleComplete(id, !isChecked)} />
              <span className={isChecked ? 'item-title checked' : 'item-title'}>{itemTitle}</span>
            </> :
              <input
              value={itemTitle}
              type="text"
              className="validate"
              onChange={(e) => setItemTitle(e.target.value)}/>}
          </label>
        </div>
        <div className='item-buttons-group'>
          {!editing ? !isChecked && <button className='waves-effect waves-light btn-small' onClick={() => setEditing(!editing)}>Edit</button> :
            !isChecked && <button className='waves-effect waves-light btn-small' onClick={saveHandler}>Save</button>}
          <button className='waves-effect red btn-small' onClick={() => removeItem(id)}>X</button>
        </div>
      </div>
    </>
  );
};

export default ItemRow;