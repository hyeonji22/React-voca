import Word from "./Word";
import styled from "./Hello.module.css"
import { useState } from "react";
import UserName from "./UserName";
export default function Hello({age}){
    const [name,setName] = useState("mike");
    const msg = age >19 ?'성인입니다':'학생입니다.';
    function changeName (){
        setName("kkk");
    }
    function showName(){
        console.log('공공이')
    }
    function showAge(age){
        console.log(age)
    }
    function showText(e){
        console.log(e.target.value)
    }
    return (
        <div>
            <h2 id="name">
            {name} {age} : {msg}
            </h2>
            <button onClick={changeName}>이름변경</button>
            <h1 style={{
                color:'#f00',
                borderRight:"12px solid #000",   
                marginBottom: "50px",
                opacity:0.5,
            }}>헬로우</h1>
            <button onClick={showName}>show name</button>
            <button onClick={()=>{
                showAge(10);
            }}>show age</button>
            <div className={styled.box}></div>
            <input type="text" onChange={showText}></input>
           <UserName name={name}/>
            <Word />
            <Word />
        </div>
    )
    
}