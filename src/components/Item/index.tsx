import React from 'react';
import { Button } from 'antd';
import './index.css'
import { Itodo } from '../ToDolist/typings';

interface ItemProps{
    todo: Itodo,
    removeTodo:(id:number)=> void
}

const Item: React.FC<ItemProps> = ({ todo, removeTodo }) => { 
    const handleClick = () => { 
        removeTodo(todo.id)
    }
    return (
        <div className='item'>
            <span className='font'>{todo.content}</span>
            <Button className='button' type="primary" onClick={handleClick}>删除</Button>
        </div>
    )
}

export default Item;
