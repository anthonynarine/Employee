import { useState, useEffect } from "react"

export default function useFetch(url){
    const [data, setData] = useState();
    useEffect(()=> {
        fetch(url).then((response)=>{
            return response.json()
        }).then(()=>{
            setData(data)
        });
    }, []);

    return data
}