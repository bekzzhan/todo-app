import React from 'react';
import ItemRow from '../ItemRow/ItemRow';
import {useHttp} from '../../hooks/http.hook'
import './TodoList.css'

function ToDoList({list, fetchTodos}) {
  const {request} = useHttp();
  const deleteTodo = (async (id) => {
    try {
      await request(`/todos/${id}`, 'DELETE');
      fetchTodos();
    } catch (err) {
      throw err;
    }
  });

  const updateTodo = (async (id, completed) => {
    try {
      await request(`/todos/${id}`, 'PATCH', {completed});
      fetchTodos();
    } catch (err) {
      throw err;
    }
  });

  return (
    <div className='todo-list'>
      {
      !list ? 'No todos' : 
        list.map(({id, title, completed}) => (
          <ItemRow id={id} isChecked={completed} title={title} key={id} removeItem={deleteTodo} handleComplete={updateTodo}/>
        ))}
    </div>
  );
}

export default ToDoList;