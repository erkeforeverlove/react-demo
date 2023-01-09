import { Checkbox } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import React from 'react';
import Item from '../Item/index'
import { Itodo } from '../ToDolist/typings';
interface ListProps{
    todoList: Itodo[],
    removeTodo: (id: number) => void,
    getFlagList: (id: CheckboxValueType[]) => void
}

const List: React.FC<ListProps> = ({ todoList, removeTodo,getFlagList }): React.ReactElement => {
    const onChange = (checkedValues: CheckboxValueType[]) => {
        getFlagList(checkedValues)
    };
      
    return (
        <div>
            <span style={{ display:'block' }}>列表：</span>
            <Checkbox.Group onChange={ onChange }>
                {
                    todoList && todoList.map((item: Itodo) => { 
                        return !item.deleteFlag && !item.completeFlag ? <Checkbox key={item.id} value={item.id}><Item todo={item} removeTodo={ removeTodo }></Item></Checkbox> : null
                    })
                }
            </Checkbox.Group>
            <span style={{ display:'block' }}>已删除：</span>
            <Checkbox.Group onChange={ onChange }>
                {
                    todoList && todoList.map((item: Itodo) => { 
                        return item.deleteFlag ? <span style={{margin:'0 10px'}} key={item.id} >{ item.content}</span> : null
                    })
                }
            </Checkbox.Group>
            <span style={{ display:'block' }}>已完成：</span>
            <Checkbox.Group onChange={ onChange }>
                {
                    todoList && todoList.map((item: Itodo) => { 
                        return item.completeFlag ? <span style={{margin:'0 10px'}} key={item.id} >{ item.content}</span> : null
                    })
                }
            </Checkbox.Group>
        </div>
    )
}

export default List;