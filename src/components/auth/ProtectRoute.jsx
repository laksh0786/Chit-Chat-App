import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectRoute = ({children , user , redirect="/login"}) => {

    if(!user){
        return <Navigate to={redirect} />
    }

    //if there is children then render it else render Outlet
    //in this case children is Home, Chat, Group
    //Outlet is used to render the children of the parent route
    return children ? children : <Outlet />;
}

export default ProtectRoute