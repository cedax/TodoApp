import './styles.css';
import { TodoList } from './classes'
import { crearTodoHTML } from './js/util-todos';

export const todoList = new TodoList();

todoList.todos.forEach( crearTodoHTML );