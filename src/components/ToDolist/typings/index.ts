export interface Itodo { 
    id: number;
    content: string;
}

export interface IState { 
    todoList:Itodo[]
}

export interface IAction { 
    type: ACTION_TYPE,
    payload: Itodo | Number | null | Itodo[]
}

export enum ACTION_TYPE { 
    INIT_TODO = 'initTodo',
    ADD_TODO = 'addTodo',
    REMOVE_TODO = 'removeTodo',
    REMOVE_ALL = 'removeAll'
}