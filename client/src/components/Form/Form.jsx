import React, { useState } from 'react';
import './Form.css'

const Form = () => {
  const [state, setState] = useState({
    title: '',
    completed: false
  })
  const submitHandler = (e) => {
    e.preventDefault();
    setState({title: e.target.value})
  }
  return (
    <form onSubmit={submitHandler}>
      <div className="form-input">
        <label className="form-input-label active" htmlFor="title">Add item</label>
        <div className="input-field s6">
          <input value={state.title} id="title" type="text" className="validate"/>
          <button className='form-btn' type='submit'>Create Todo</button>
        </div>
      </div>
    </form>
  );
};

export default Form;