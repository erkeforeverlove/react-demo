import { Button,message } from 'antd';
import React, { useCallback, useEffect, useReducer } from 'react';
import Input from '../input'
import List from '../List'
import './index.css'
import { todoReducer } from './reducer';
import { ACTION_TYPE, IState, Itodo } from './typings';

function init(defaultState:Itodo[]):IState { 
    return {
        todoList:defaultState
    }
}

const ToDoList: React.FC = (): React.ReactElement => {
    const [state, dispatch] = useReducer(todoReducer, [], init)
    const [messageApi, contextHolder] = message.useMessage();
    
    useEffect(() => { 
        const todoList = JSON.parse(localStorage.getItem('todoList') || '[]')
        initTodo(todoList)
    }, [])
    
    const initTodo = useCallback((todoList: Itodo[]) => { 
        dispatch({type:ACTION_TYPE.INIT_TODO,payload:todoList})
    }, [])

    const addTodo = useCallback((todo: Itodo) => { 
        dispatch({type:ACTION_TYPE.ADD_TODO,payload:todo})
    }, [])
    
    const removeTodo = useCallback((id: number) => { 
        dispatch({type:ACTION_TYPE.REMOVE_TODO,payload:id})
    }, [])
    
    const removeAll = useCallback(() => { 
        dispatch({type:ACTION_TYPE.REMOVE_ALL,payload:null})
    }, [])

    const removeFc = (): void => {
        removeAll()
    }

    const setLocal = (): void => {
        localStorage.setItem('todoList', JSON.stringify(state.todoList || []))
        messageApi.success('存入loaclStorage成功')
    }

    const clearLocal = (): void => {
        localStorage.clear()
        messageApi.success('清空loaclStorage成功')
        window.location.replace(window.location.href)
    }

    return (
        <div className='App'>
            {contextHolder}
            <Input addTodo={addTodo}></Input>
            <Button className='button' type="primary" onClick={ removeFc }>全部删除</Button>
            <Button className='button' type="primary" onClick={ setLocal }>存入loaclStorage</Button>
            <Button className='button' type="primary" onClick={ clearLocal }>清空loaclStorage</Button>
            <List todoList={state.todoList} removeTodo={ removeTodo }></List>
        </div>
    )
}

export default ToDoList;