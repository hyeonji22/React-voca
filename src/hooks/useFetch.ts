import { useEffect, useState } from 'react';

//비슷한 작업들은 hooks 만들어서 사용하면 편함 
export default function useFetch(url:string){
    const [data,setData] = useState([]);
    useEffect(()=>{
        fetch(url)
        .then(res =>{
            return res.json();
        })
        .then(data =>{
            setData(data);
        });
    },[url]);

    return data;
}