import React, { useState } from 'react'
import './TodoItem.css';
import { ITodo } from './TodoList';
import axios from 'axios';

interface todoProps{
    todo:ITodo,
}
export default function TodoItem({todo}:todoProps) {
    const [info,setInfo] = useState({...todo});
    //글삭제
    // const delTodo = (id :number|string) =>{
    //     if(window.confirm("삭제하시겠습니까?")){
    //         axios.delete(`http://localhost:3001/todos/${id}`)
    //         .then(() =>{
    //             window.location.reload();
    //         })
    //     }
       
    // }
    //글삭제
    const delTodo = (id :number|string) =>{
        if(window.confirm("삭제하시겠습니까?")){
            axios.put(`http://localhost:3001/todos/${id}`,{
                ...todo,
                done:true,
            })
            .then(() =>{
                window.location.reload();
            })
        }
       
    }
    //input 변경
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: value,
        });
    };

    //글 수정
    const update = (id :number|string) =>{
        axios.put(`http://localhost:3001/todos/${id}`,{
            ...todo,
            text:info.text,
            content:info.content
        })
        .then(() =>{
            window.location.reload();
        })
    }
  return (
    <li className={`TodoItem ${todo.done ? 'done' : ''}`}>
        <input className="text" name='text' value={info.text}  onChange={onChange}></input>
        <input className="text" name='content' value={info.content}  onChange={onChange}></input>
        <span onClick={()=>{update(todo.id)}}>수정</span>
        <span onClick={()=>{delTodo(todo.id)}} className="remove">(x)</span>
    </li>
  )
}
