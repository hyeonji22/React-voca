import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch"

export default function CreateDay(){
    const days =useFetch("http://localhost:3001/days");
    const navigate = useNavigate();
    //day 생성
    function addDay(){
        fetch(`http://localhost:3001/days`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body :JSON.stringify({
                day: days.length +1,
            }),
        }).then(res => {
            if(res.ok){
                alert("생성이 완료되었습니다.");
                navigate('/');
            }
        })
    }
    //day 삭제
    function delDay() {
        //id가 존재하는지 확인
        const lastDayId = days[days.length - 1]?.id;
        if(lastDayId){
            if(window.confirm("삭제할래?~")){
                fetch(`http://localhost:3001/days/${lastDayId}`,{
                    method:"DELETE",
                }).then(res =>{
                    if(res.ok){
                        navigate('/');
                    }
                })
            }
        }else{
            alert("삭제할 수 있는 날이 없습니다.");
        }
    }

    return(
        <div>
            <h3>현재 일수 : {days.length}일</h3>
            <button onClick={addDay} >Day 추가</button>
            <button onClick={delDay} className="del" >Day 삭제</button>
        </div>
    )
}