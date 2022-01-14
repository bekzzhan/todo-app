import React, { useState, useEffect } from 'react';
import {useHttp} from '../../hooks/http.hook'
import './Form.css'

const Form = ({fetchTodos}) => {
  const [state, setState] = useState({
    title: '',
    completed: false
  })
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const {request} = useHttp();
  const chandeHandler = async (e) => {
    setState({...state, title: e.target.value});
  }
  useEffect(() => {
    setButtonDisabled(!state.title.trim());
  }, [state.title])
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await request('/todos', 'POST', state).then((data) => console.log(data));
      fetchTodos();
      setState({...state, title: ''});
    } catch (e) {
      throw e;
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <div className="form-input">
        <label className="form-input-label active" htmlFor="title">Add item</label>
        <div className="input-field s6">
          <input
            value={state.title}
            id="title"
            type="text"
            className="validate"
            onChange={chandeHandler}/>
          <button className={!buttonDisabled ? 'form-btn' : 'form-btn disabled'} disabled={buttonDisabled} type='submit'>Create Todo</button>
        </div>
      </div>
    </form>
  );
};

export default Form;