import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectRoute from './components/auth/ProtectRoute';
import LayoutLoader from './components/layouts/LayoutLoader';


//This is lazy loading of components that is used for code splitting which is a performance optimization technique that allows you to load only the required modules on the initial load and then load the rest of the modules on demand.

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Chat = lazy(() => import('./pages/Chat'));
const Group = lazy(() => import('./pages/Group'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AdminLogin = lazy(()=> import('./pages/admin/AdminLogin'));
const Dashboard = lazy(()=> import('./pages/admin/Dashboard'));
const ChatManagement = lazy(()=> import('./pages/admin/ChatManagement'));
const MessageManagement = lazy(()=> import('./pages/admin/MessageManagement'));
const UserManagement = lazy(()=> import('./pages/admin/UserManagement'));


const App = () => {

  let user = true;

  return (

    <Suspense fallback={<LayoutLoader/>}>
      <Routes>

        <Route element={<ProtectRoute user={user} />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/groups" element={<Group />} />
        </Route>

        <Route path="/login" element={
          <ProtectRoute user={!user} redirect='/'>
            <Login />
          </ProtectRoute>
        } />

        <Route path="/admin" element={<AdminLogin/>} />

        <Route path="/admin/dashboard" element={<Dashboard/>} />
        <Route path="/admin/users" element={<UserManagement/>} />
        <Route path="/admin/chats" element={<ChatManagement/>} />
        <Route path="/admin/messages" element={<MessageManagement/>} />

        <Route path="*" element={<NotFound />}></Route>

      </Routes>
    </Suspense>

  )
}

export default App