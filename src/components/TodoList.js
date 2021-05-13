import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, removeHandler, updateHandler }) => (
    <div>
        {todos.map((t, i) => (
            <TodoItem todo={t} key={i} removeHandler={removeHandler} updateHandler={updateHandler}/>
        ))}
    </div>
);

export default TodoList;