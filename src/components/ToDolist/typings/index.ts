import { CheckboxValueType } from "antd/es/checkbox/Group";

export interface Itodo { 
    id: number;
    content: string;
    deleteFlag: boolean;
    completeFlag: boolean;
}

export interface IState { 
    todoList:Itodo[]
}

export interface IAction { 
    type: ACTION_TYPE,
    payload: Itodo | Number | null | Itodo[]| CheckboxValueType[]
}

export enum ACTION_TYPE { 
    INIT_TODO = 'initTodo',
    ADD_TODO = 'addTodo',
    REMOVE_TODO = 'removeTodo',
    REMOVE_ALL = 'removeAll',
    REMOVE_BATCH = 'removeBatch',
    COMPLETE = 'complete'
}