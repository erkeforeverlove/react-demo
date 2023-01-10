import { CheckboxValueType } from "antd/es/checkbox/Group";
import { ACTION_TYPE, IAction, IState, Itodo, STATUS_TYPE } from "./typings";

function todoReducer(state:IState,action:IAction):IState { 
    const { type, payload } = action
    switch (type) {
        case ACTION_TYPE.INIT_TODO:
            return {
                ...state,
                todoList:payload as Itodo[]
            } 
        case ACTION_TYPE.ADD_TODO:
            return {
                ...state,
                todoList:[...state.todoList,payload as Itodo]
            } 
        case ACTION_TYPE.REMOVE_TODO:
            state.todoList.forEach((item) => {
                if (item.id === payload) { 
                    item.status = STATUS_TYPE.DELETED
                }
            })
            return {
                ...state,
                todoList: state.todoList
            }
        case ACTION_TYPE.REMOVE_ALL:
            return {
                ...state,
                todoList: []
            }
        case ACTION_TYPE.REMOVE_BATCH:
            let arr = payload as CheckboxValueType[]
            state.todoList.forEach((item) => {
                arr.forEach(it => {
                    if (item.id === it) { 
                        item.status = STATUS_TYPE.DELETED
                    }
                });
            })
            return {
                ...state,
                todoList: state.todoList
            }
        case ACTION_TYPE.COMPLETE:
            let complete = payload as CheckboxValueType[]
            state.todoList.forEach((item) => {
                complete.forEach(it => {
                    if (item.id === it) { 
                        item.status = STATUS_TYPE.COMPLETE
                    }
                });
            })
            return {
                ...state,
                todoList: state.todoList
            }
        case ACTION_TYPE.SET_EXPIRE:
            state.todoList.forEach((item) => {
                if (item.id === payload) { 
                    item.isExpire = true
                }
            })
            return {
                ...state,
                todoList: state.todoList
            }
        default:
            return state
    }
}

export { 
    todoReducer
}