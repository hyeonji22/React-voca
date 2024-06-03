import { useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { IDay } from "./DayList";

export default function CreateWord(){
    const days :IDay[] =useFetch("http://localhost:3001/days");
    //통신여러번 방지용
    const[isLoading, setIsLoading] = useState(false);

    //페이지 이동
    const navigate  = useNavigate();
    //포커스 줄때 사용 
    const engRef = useRef<HTMLInputElement>(null);
    const korRef = useRef<HTMLInputElement>(null);
    const dayRef = useRef<HTMLSelectElement>(null);

    //기본 Submit 막기   폼이벤트 type
    function onSubmit(e :React.FormEvent){
        e.preventDefault();
        if(!isLoading && dayRef.current && engRef.current && korRef.current){ //통신여러번 방지
            setIsLoading(true);
            const day = dayRef.current.value;
            const eng = engRef.current.value;
            const kor = korRef.current.value;

        fetch(`http://localhost:3001/words`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                day,
                eng,
                kor,
                isDone:false,
            })
        })
        .then(res =>{
            if(res.ok){
                alert("생성이 완료 되었습니다.");
                //페이지 이동 
                navigate(`/day/${day}`);
                setIsLoading(false);
            }
        })
    }
}
    return (
        <form onSubmit={onSubmit}>
            <div className="input_area">
                <label>Eng</label>
                <input type="text" placeholder="conputer" ref={engRef}></input>
            </div>
            <div className="input_area">
                <label>Kor</label>
                <input type="text" placeholder="conputer" ref={korRef}></input>
            </div>
            <div className="input_area">
                <label>Day</label>
                <select ref={dayRef}>
                    {days.map(day => (
                        <option key={day.id} value={day.day} >{day.day}</option>
                    ))
                    }
                </select>
            </div>
            <button 
            style={{
                opacity:isLoading?0.3:1,
            }}
            >{isLoading?"Saving...":"저장"}
            </button>
        </form>
    )
  
}