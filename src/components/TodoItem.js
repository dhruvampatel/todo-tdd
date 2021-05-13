import React from 'react';
import styles from './TodoItem.module.css';

const TodoItem = ({ todo, removeHandler, updateHandler }) => (
    <div className={styles.itemContainer}>
        <input
            type='checkbox'
            name={`checkbox-${todo.id}`}
            checked={todo.completed}
            data-testid={`checkbox-${todo.id}`}
            onChange={() => updateHandler(todo.id)}>
        </input>
        <label
        htmlFor={`checkbox-${todo.id}`}
        onClick={() => updateHandler(todo.id)}
        className={todo.completed ? styles.completed : ''}>
            {todo.title}
        </label>
        <button
        className={styles.closeBtn}
            data-testid={`close-btn-${todo.id}`}
            onClick={() => removeHandler(todo.id)}>X</button>
    </div>
);

export default TodoItem;