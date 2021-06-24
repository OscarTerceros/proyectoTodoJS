import './styles.css';

import { Todo, TodoList } from './classes';

const todoList = new TodoList();


const tarea = new Todo( 'JavaScript' );
todoList.nuevoTodo( tarea );

console.log( todoList );