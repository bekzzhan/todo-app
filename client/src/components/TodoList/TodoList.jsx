import React from 'react';
import ItemRow from '../ItemRow/ItemRow';
import './TodoList.css'

function ToDoList({list}) {
  return (
    <div className='todo-list'>
      {
      !list ? 'No todos' : 
        list.map(({id, title, completed}) => <ItemRow id={id} isChecked={completed} title={title} key={id}/>)}
    </div>
  );
}

export default ToDoList;