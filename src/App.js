import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import React, { useEffect, useState } from 'react';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState('');
  const [saving, setSaving] = useState(false);

  const onChange = (e) => {
    setNewTodo(e.target.value);
  }

  const addTodo = (e) => {
    e.preventDefault();
    const value = {
      userId: 3,
        id: Math.floor(Math.random() * 10000) + 1,
        title: newTodo,
        completed: false,
    };
    setSaving(true);
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(value),
      headers: { 'Content-type': 'application/json; charset=UTF-8'}
    }).then(response => response.json())
      .then(result => {
        setTodos(todos.concat({...result, id: value.id}));
        setSaving(false);
      })
  }

  const removeTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  }

  const updateTodo = (id) => {
    const newList = todos.map(todoItem => {
      if(todoItem.id === id ){
        const updatedList = {...todoItem, completed: !TodoItem.completed};
        return updatedList;
      }
      return todoItem;
    });
    setTodos(newList);
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://jsonplaceholder.typicode.com/todos').then(response => response.json());
      setTodos(result.slice(0, 5));
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1 className='header'>My todo list</h1>
      {loading ? 'Loading' : <TodoList todos={todos} removeHandler={removeTodo} updateHandler={updateTodo}/>}

      <div style={{marginTop: '50px'}}>
        {saving ? 'Saving' : (
          <form onSubmit={addTodo}>
            <input type='text' onChange={onChange}></input>
            <button type='submit'>Add new todo</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
