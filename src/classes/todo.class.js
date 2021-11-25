import uniqid from 'uniqid';

export class Todo {

    static ReconstruirObjeto({tarea, id, creado, completado}) {
        const todo = new Todo(tarea);

        todo.id = id;
        todo.creado = creado;
        todo.completado = completado;

        return todo;
    }

    constructor(tarea) {
        this.id = uniqid();
        this.creado = new Date();
        this.tarea = tarea;
        this.completado = false;
    }
}