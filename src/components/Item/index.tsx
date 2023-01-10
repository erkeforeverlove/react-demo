import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import './index.css'
import { Itodo } from '../ToDolist/typings';

interface ItemProps{
    todo: Itodo,
    removeTodo: (id: number) => void,
    setExipre: (id: number) => void
}

const Item: React.FC<ItemProps> = ({ todo, removeTodo, setExipre }) => { 
    let timer: number;
    const [time, setTime] = useState(0)
    
    const handleClick = () => { 
        removeTodo(todo.id)
    }
    
    useEffect(() => { 
        timer = window.setInterval(() => { 
            setTime(new Date().getTime())
        }, 1000)
        let timeDf = time - todo.id
        if (timeDf > 2000) { 
            setExipre(todo.id)
            clearInterval(timer)
        }
        return ()=>clearInterval(timer)
    }, [time])
    
    return (
        <div className='item'>
            <span className={todo.isExpire? 'font-expire': 'font-unexpire'}>{todo.content}</span>
            <Button className='button' type="primary" onClick={handleClick}>删除</Button>
        </div>
    )
}

export default Item;
