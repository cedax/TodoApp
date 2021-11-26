import { Todo } from './../classes'
import { todoList } from './../index'

export const divTodoList = document.querySelector('.todo-list');
const inputTodo = document.querySelector('.new-todo');
const btnEliminarCompletados = document.querySelector('.clear-completed');
const divFiltros = document.querySelector('.filters');
const btnAgregar = document.querySelector('.btnAgregar');
const completarTodo = document.querySelector('.toggle-all');

export const crearTodoHTML = (todo) => {
    const htmlTodo = `
    <li class="${todo.completado ? 'completed' : ''}" data-id="${todo.id}">
    <div class="view">
    <input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}>
    <label>${todo.tarea}</label>
    <button class="destroy"></button>
    </div>
    <input class="edit" value="Rule the web">
    </li>
    `;
    
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
}

completarTodo.addEventListener('change', (e) => {
    todoList.toggleCompletarTodos(e.target.checked);
});

btnAgregar.addEventListener('click', () => {
    if (inputTodo.value.length === 0) { return; }
    const nuevoTodo = new Todo(inputTodo.value);
    todoList.nuevoTodo(nuevoTodo);
    crearTodoHTML(nuevoTodo);
    inputTodo.value = '';
});

inputTodo.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        if (inputTodo.value.length === 0) { return; }
        const nuevoTodo = new Todo(inputTodo.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHTML(nuevoTodo);
        inputTodo.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    
    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
});

btnEliminarCompletados.addEventListener('click', () => {
    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
});

divFiltros.addEventListener('click', (event) => {
    divTodoList.innerHTML = '';
    const filtro = event.target.text;
    for(let todo of todoList.filtrarTodos(filtro)) {
        crearTodoHTML(todo);
    }
});