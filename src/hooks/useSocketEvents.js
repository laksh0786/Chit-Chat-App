// Desc: Custom hook to handle socket events
//socket : socket instance
//handlers : object containing event handlers for socket events 

import { useEffect } from "react";


const useSocketEvents = (socket , handlers)=>{

    useEffect(()=>{

        //object.entries returns an array of key value pairs of the object eg : {key : value} => [key, value]
        //{k1 : v1, k2 : v2} => [[k1, v1], [k2, v2]]
        Object.entries(handlers).forEach(([event , handler])=>{
            
            socket.on(event , handler)

        })

        return ()=>{
            Object.entries(handlers).forEach(([event , handler])=>{
                socket.off(event , handler)
            })
        }

    }, [socket, handlers])

}


export {useSocketEvents};