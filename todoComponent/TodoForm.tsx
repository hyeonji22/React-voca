import axios from 'axios';
import React, { useState } from 'react'

export default function TodoForm() {

  
    const [info,setValue] = useState({
      title:''
      ,content:''
    });
    const {title,content} = info;// 비구조화 할당을 통해 값 추출

    const onSubbit = (e : React.FormEvent) =>{
        e.preventDefault();
        setValue({title:'',content:''});
    }
    //input 입력시 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;// 우선 e.target 에서 name 과 value 를 추출
      setValue({
          ...info, // 기존의 input 객체를 복사한 뒤
          [name]: value,// name 키를 가진 값을 value 로 설정
      });
  };
  //글저장
  const save = () =>{
    console.log(info);
    if(!info.title){
      return;
    }
    if(!info.content){
      return;
    }
    axios.post('http://localhost:3001/todos',{
          text:info.title,
          content:info.content,
          done:false
    }).then(res =>{
          window.location.reload();
    })
  }

  return (
    <>
    <div>TodoForm</div>
    <form onSubmit={onSubbit}>
        <input
        name="title"
        value={title} 
        placeholder='무엇을 하실건강?'
        onChange={handleChange}>
        </input>
        <input 
         name="content"
        value={content} 
        placeholder='누구랑 하실건강?'
        onChange={handleChange}>
        </input>
        <button onClick={save}>등록</button>
    </form>
    </>
  )
}
