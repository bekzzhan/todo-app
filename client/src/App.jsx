import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form/Form';
import ToDoList from './components/TodoList/TodoList';
import {Loader} from './components/Loader/Loader.tsx'
import {useHttp} from './hooks/http.hook'

function App() {
  const [todos, setTodos] = useState({})
  const {request, loading} = useHttp();
  const fetchTodos = useCallback(async () => {
    try {
      const fetched = await request('/todos');
      setTodos({
        completedTodos: fetched.filter((item) => item.completed === true),
        unCompletedTodos: fetched.filter((item) => item.completed === false)
      })
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos, request])
  
  return (
    <div className='app-wrapper'>
      <div className='app-header'>
        <h2 className='app-title'>TODO App</h2>
      </div>
      <div className='app-content'>
        <Form fetchTodos={fetchTodos}/>
        {loading ? <Loader /> : (
          <>
            <div className='app-todos-area'>
              <h5>TODO</h5>
              {todos.unCompletedTodos?.length === 0 ? 'No todos' : <ToDoList list={todos.unCompletedTodos} fetchTodos={fetchTodos}/>}
            </div>
            <div className='app-todos-area'>
              <h5>Completed</h5>
              {todos.completedTodos?.length === 0 ? 'No todos' : <ToDoList list={todos.completedTodos} fetchTodos={fetchTodos}/>}
            </div>
          </>   
        )}   
      </div>
    </div>
  );
}

export default App;
