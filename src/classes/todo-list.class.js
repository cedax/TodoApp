import { Todo } from './todo.class.js';
import { crearTodoHTML } from '../js/util-todos.js';
import { divTodoList } from '../js/util-todos.js';

export class TodoList {
    constructor() {
        this.todos = [];
        
        this.cargarLocalStorage();
        this.contarTodosIncompletos();
    }

    cargarLocalStorage() {
        const todosJson = JSON.parse(localStorage.getItem('todos')); if(!todosJson) return;
        for(let todo of todosJson) {
            this.todos.push(Todo.ReconstruirObjeto(todo));
        }
    }

    refrescarTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
        this.contarTodosIncompletos();
    }

    contarTodosIncompletos() {
        const todosPendientes = this.todos.filter(todo => !todo.completado).length;
        document.querySelector('#todo-count').innerHTML = todosPendientes;
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.refrescarTodos();
    }

    eliminarTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id);
        this.refrescarTodos();
    }

    marcarCompletado(id) {
        this.todos.forEach(todo => {
            if(todo.id == id) {
                console.log('1');
                todo.completado = !todo.completado;
                this.refrescarTodos();
                return;
            }
        });
    }

    eliminarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado);
        this.refrescarTodos();
    }

    filtrarTodos(filtro) {
        switch(filtro) {
            case 'Todos':
                return this.todos;
            case 'Completados':
                return this.todos.filter(todo => todo.completado);
            case 'Pendientes':
                return this.todos.filter(todo => !todo.completado);
        }
    }

    toggleCompletarTodos(mark) {
        this.todos.forEach(todo => {
            todo.completado = mark;
        });
        this.refrescarTodos();

        divTodoList.innerHTML = '';
        for(let todo of this.todos) {
            crearTodoHTML(todo);
        }
    }

}