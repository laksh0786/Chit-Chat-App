import React, { lazy, Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectRoute from './components/auth/ProtectRoute';
import LayoutLoader from './components/layouts/LayoutLoader';
import { server } from './constants/config';
import { getMyProfile } from './constants/apiEndpoints';
import { useDispatch, useSelector } from "react-redux";
import {userExists, userNotExists} from "./redux/slices/auth";
import {Toaster} from 'react-hot-toast';
import { SocketProvider } from './socket';
import { privateRequest } from '../services/axiosConfig';


//This is lazy loading of components that is used for code splitting which is a performance optimization technique that allows you to load only the required modules on the initial load and then load the rest of the modules on demand.

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Chat = lazy(() => import('./pages/Chat'));
const Group = lazy(() => import('./pages/Group'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ChatManagement = lazy(() => import('./pages/admin/ChatManagement'));
const MessageManagement = lazy(() => import('./pages/admin/MessageManagement'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));

const App = () => {

  const {user, isLoading} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();

  useEffect(() => {

    // console.log(server)

    //fetching the user profile

    //we have to withCredentials to true to send the cookies
    //cookies are automatically sent by the browser when we set the withCredentials to true
    privateRequest.get(`${server}${getMyProfile}`, {withCredentials:true})
      .then(({data}) => {
        dispatch(userExists(data.user));
      })
      .catch((err) => {
        dispatch(userNotExists());
      })

  }, []) //we added dispatch to the dependency array to remove the warning

  return isLoading ? <LayoutLoader/> : (

    <Suspense fallback={<LayoutLoader />}>
      <Routes>

        <Route element={<SocketProvider><ProtectRoute user={user} /></SocketProvider>}>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/groups" element={<Group />} />
        </Route>

        <Route path="/login" element={
          <ProtectRoute user={!user} redirect='/'>
            <Login />
          </ProtectRoute>
        } />

        <Route path="/admin" element={<AdminLogin />} />

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/chats" element={<ChatManagement />} />
        <Route path="/admin/messages" element={<MessageManagement />} />

        <Route path="*" element={<NotFound />}></Route>

      </Routes>
      <Toaster position='bottom-center'/>
    </Suspense>

  )
}

export default App