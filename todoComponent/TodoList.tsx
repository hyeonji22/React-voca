import React from 'react'
import TodoItem from './TodoItem';
import useFetch from '../../hooks/useFetch';

export interface ITodo{
    id:number;
    text:string;
    content:string;
    done:boolean;
}
export default function TodoList() {
    const todos :ITodo[] = useFetch('http://localhost:3001/todos')
  return (
    <ul>
        {
           todos.map(todos =>(
            <TodoItem key={todos.id} todo={todos} />
           )) 
        }

    </ul>
)
}
