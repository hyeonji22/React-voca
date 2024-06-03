import { useState } from "react"

interface IProps {
    item:IWord;
}
export interface IWord {
    id  :number,
    day :string ,
    eng :string,
    kor :string,
    isDone:boolean,
}


export default function Word({item : w}:IProps){
    const [item,setItem] = useState(w);
    const [isShow,setIsShow] = useState(false);
    const [isDone,setIsDone] = useState(item.isDone);

    function toggleShow(){
        setIsShow(!isShow)
    }
    function toggleDone(){
        //setIsDone(!isDone)
        //isDone 수정 
        fetch(`http://localhost:3001/words/${item.id}`,{
            method  :'PUT',
            headers : {
                //보내는 리소스 타입
                'Content-Type' :'application/json',
            },
            //수정을 위한 정보 
            body : JSON.stringify({
                    ...item,
                    isDone : !isDone
                }),
        })
        .then(res =>{
            if(res.ok){
                setIsDone(!isDone);
            }
        })
    }
    //단어 삭제 
    function del(){
        if(window.confirm('삭제하시겠습니까')){
            fetch(`http://localhost:3001/words/${item.id}`,{
                method:"DELETE",
            }).then(res =>{
                if(res.ok){
                    //새로고침 해주기 위해 
                    setItem({
                        ...item, //기존객체는 사용 id만 변경
                        id:0});
                }
            })
        }
    }
    //단어삭제후 null 해주면 새로고침 됨
    if(item.id === 0){
        return null;
    }
    return(
        <>
        <tr className={isDone ? "off" :""}>
        <td>
            <input type='checkbox' checked={isDone} onChange={toggleDone}></input>
        </td>
        <td>{item.eng}</td>
        <td>{isShow && item.kor}</td> 
        <td>
        <button onClick={toggleShow}>뜻{isShow ===true ?'숨기기':'보기'}</button>
        <button onClick={del} className='btn_del'>삭제</button>
        </td>
    </tr>
  </>
    )
}

//타입스크립트 설치 
//npm install --save typescript @types/node @types/react @types/react-dom @types/jest @types/react-router-dom
//js ->.ts
//jsx ->.tsx
//오류나면 타입스크립트 버전 낮춰줘야함 npm i typescript@4.9.5
//Cannot use JSX unless the '--jsx' flag is provided.ts 오류 -->tsconfig.json에서 jsx라는 항목을 빼먹었기 때문에 발생하는 오류이다
//"jsx": "preserve" /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */,
