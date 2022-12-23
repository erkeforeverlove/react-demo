import React, { useState,useRef ,ReactElement} from 'react';
import { Input,Button,Space} from 'antd';
import './index.css'
import { Itodo } from '../ToDolist/typings';

interface InputProps{
    addTodo: (todo: Itodo) => void;
}

const InputComponent: React.FC<InputProps> = ({ addTodo }): ReactElement => { 
    const [inputVal,setInputVal] = useState<string>('')
    const ClickFc = (): void => { 
        if (inputVal) { 
            addTodo({ id: new Date().getTime(), content: inputVal })
        }
        setInputVal('')
    }
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>): void => { 
        setInputVal(e.target.value)
    }
    return (
        <Space wrap className='content'>
            <Input placeholder="请输入。。。"
                className='input-label'
                onChange={handleChange}
                value={inputVal}
                allowClear />
            <Button type="primary" onClick={ClickFc}>新增</Button>
        </Space>
    )
}

export default InputComponent;