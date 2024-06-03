import { Link } from 'react-router-dom';
//import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
export interface IDay{
    id: string;
    day: number;

}
export default function DayList(){
   // const [days,setDays] =useState([]);
    const days :IDay[]= useFetch('http://localhost:3001/days');
    // useEffect(()=>{
    //     fetch('http://localhost:3002/days')
    //     .then(res =>{
    //         return res.json()
    //     })
    //     .then(data =>{
    //         return setDays(data);
    //     })
    // },[]) //빈배열넣으면 최초한번만 호출

    if(days.length === 0){
        return <span>Loading...</span>
    }

    return(
        <>
        <ul className="list_day">
            {
                days.map(day =>{
                    return(
                        <li key={day.id}>
                        <Link to={`/day/${day.day}`} >Day {day.day}</Link>
                        </li>
                    )
                })
            }
        </ul>

        </>
    )
}

// json server 설치
//npm install -g json-server 
//하고나서 위치 잡아서 port번호 3000 쓰고잇으니간 3001설정해줌
//json-server --watch ./src/db/data.json --port 3001
