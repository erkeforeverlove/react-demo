import { ACTION_TYPE, IAction, IState, Itodo } from "./typings";

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
            return {
                ...state,
                todoList: state.todoList.filter(item => { return item.id !== payload})
            }
        case ACTION_TYPE.REMOVE_ALL:
                return {
                    ...state,
                    todoList: []
                }
        default:
            return state
    }
}

export { 
    todoReducer
}