import { Button,message } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import Input from '../Input'
import List from '../List'
import './index.css'
import { todoReducer } from './reducer';
import { ACTION_TYPE, IState, Itodo, STATUS_TYPE } from './typings';

function init(defaultState:Itodo[]):IState { 
    return {
        todoList:defaultState
    }
}

const ToDoList: React.FC = (): React.ReactElement => {
    const [array, setArray] = useState<CheckboxValueType[]>([])
    const [state, dispatch] = useReducer(todoReducer, [], init)
    const [messageApi, contextHolder] = message.useMessage();
    
    useEffect(() => { 
        const todoList = JSON.parse(localStorage.getItem('todoList') || '[]')
        initTodo(todoList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const removeBatch = useCallback((array:CheckboxValueType[]) => { 
        dispatch({type:ACTION_TYPE.REMOVE_BATCH,payload:array})
    }, [])

    const getFlagList = (arr: CheckboxValueType[]): void => {
        setArray(arr)
    }

    const removeFc = (): void => {
        removeAll()
    }

    const batchDelete = (): void => {  
        removeBatch(array)
    }

    const complete = (): void => { 
        completeList(array)
    }

    const completeList = useCallback((array:CheckboxValueType[]) => { 
        dispatch({type:ACTION_TYPE.COMPLETE,payload:array})
    }, [])

    const disabledFc = (): boolean => { 
        return state.todoList.filter((item) => {return item.status === STATUS_TYPE.INCOMPLETE }).length === 0 
    }

    const setExipre = useCallback((id: number) => { 
        dispatch({type:ACTION_TYPE.SET_EXPIRE,payload:id})
    }, [])

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
            <Button className='button' type="primary" disabled={ disabledFc() } onClick={ complete }>完成</Button>
            <Button className='button' type="primary" disabled={ disabledFc() } onClick={ batchDelete }>批量删除</Button>
            <Button className='button' type="primary" onClick={ removeFc }>全部删除(真实删除)</Button>
            <Button className='button' type="primary" onClick={ setLocal }>存入loaclStorage</Button>
            <Button className='button' type="primary" onClick={ clearLocal }>清空loaclStorage</Button>
            <List todoList={state.todoList} removeTodo={removeTodo} getFlagList={getFlagList} setExipre={ setExipre }></List>
        </div>
    )
}

export default ToDoList;