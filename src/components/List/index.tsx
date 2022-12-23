import React from 'react';
import Item from '../Item/index'
import { Itodo } from '../ToDolist/typings';

interface ListProps{
    todoList: Itodo[],
    removeTodo:(id:number)=> void
}

const List: React.FC<ListProps> = ({ todoList,removeTodo }):React.ReactElement => {
    return (
        <div>
            {
                todoList && todoList.map((item: Itodo) => { 
                    return <Item key={item.id} todo={item} removeTodo={ removeTodo }></Item>
                })
            }
        </div>
    )
}

export default List;