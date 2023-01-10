import { CheckboxValueType } from "antd/es/checkbox/Group";

export interface Itodo { 
    id: number;
    content: string;
    status: STATUS_TYPE;
    isExpire: boolean;
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
    COMPLETE = 'complete',
    SET_EXPIRE = 'setExpire'
}

export enum STATUS_TYPE { 
    INCOMPLETE = 'incomplete',
    COMPLETE = 'complete',
    DELETED = 'deleted'
}