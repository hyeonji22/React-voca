import { useNavigate, useParams } from 'react-router-dom';
import Word,{IWord} from './Word';
//import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
export default function Day(){
    const {day} =useParams() as {day:string};
    const navigate = useNavigate();
    //const [words,setWords] = useState([]);
    const days =useFetch("http://localhost:3001/days");
    const words:IWord[] = useFetch(`http://localhost:3001/words?day=${day}`);
    // useEffect(()=>{
    //     fetch(`http://localhost:3001/words?day=${day}`)
    //     .then(res =>{
    //         return res.json();
    //     })
    //     .then(data =>{
    //         setWords(data);
    //     });
    // },[day]);

    return (
    <>
        <h2>Day {day}</h2>
        {Worker.length ===0 && <span>Loading...</span>}
        <table>
            <tbody>
                    {
                      words.map(item => {
                        return(
                            <Word item={item} key={item.id}></Word>
                        )
                      })  
                    }
            </tbody>
        </table>
        {parseInt(day) === 1?
            null:<button onClick={()=>navigate(`/day/${parseInt(day) - 1}`)}>앞으로</button>
        }
        {
        days.length === parseInt(day) ? null: <button onClick={()=>navigate(`/day/${parseInt(day) + 1}`)}>뒤로  </button>
        }
    </>
    )
    
}