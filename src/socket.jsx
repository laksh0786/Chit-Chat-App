import io from "socket.io-client"
import { server } from "./constants/config"
import { createContext } from "react";
import { useMemo } from "react";
import { useContext } from "react";


//step 1 creating the context
const SocketContext = createContext();


//step 4 : (CONSUMING) whenever we want to use the socket connection in any component we can use the useContext hook to get the socket connection by providing the required context. 
//by just calling the getContext function we can get the socket connection
const getSocket = ()=>{
    return useContext(SocketContext);
}


const SocketProvider = ({ children }) => {

    //step2 creating the value that has to be passed to the context

    //we used useMemo to avoid creating the socket connection on each re-render as it will only be updated when the dependencies change
    const socket = useMemo(() => {

        return (
            io(server, {
                withCredentials: true,
            })
        )

    }, [])

    return (

        //step 3 providing the context to the children with the value as the socket connection
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )

}


export { SocketProvider, getSocket }
