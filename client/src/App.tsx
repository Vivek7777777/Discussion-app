import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import Login from './pages/Login'
import { useVerifyAuthMutation } from './services/api'
import { useAppDispatch, useAppSelector } from './store/store'
import { setUser } from './store/slice/userSlice'
import DiscussionPage from './pages/DiscussionPage'
import NewDiscussion from './pages/NewDiscussion'
import MyDiscussions from './pages/MyDiscussions'
import UserList from './pages/UserList'


function App() {
  const user = localStorage.getItem('user')
  const isAuth = Boolean(user)
  const isAdmin = user != null && JSON.parse(user).role === 'ADMIN'
  const userId = useAppSelector(state => state.user._id)
  const dispatch = useAppDispatch()
  const [ verifyAuth ] = useVerifyAuthMutation()

  console.log('userid', isAdmin);
  
  const getUser = async () => {
    try{
      const {data, error} = await verifyAuth()
      if(error)
        throw new Error()
      console.log(data, error);
      
      if(!data.auth || data._id === undefined){
        localStorage.removeItem('user')
        console.log('logged out');     
      }
      else
        dispatch(setUser({_id: data._id}))
    }
    catch{
      console.log('User is not logged in');
    }
  }
  
  useEffect(() => {
    if(isAuth && userId == '')
      getUser()
  }, [])
  
  if(isAuth && userId == '')
    return <h1>Loading...</h1>
  
  return (
    <BrowserRouter>
      <CssBaseline />
      {isAuth &&<> <Navbar /> </>}
      <Routes>
        <Route path='/login' element={isAuth ? <Navigate to='/' /> : <Login />} />
        <Route path='/' element={isAuth ? <Home /> : <Navigate to='/login' /> } />
        <Route path='/discussion/new' element={isAuth ? <NewDiscussion /> : <Navigate to='/login' /> } />
        <Route path='/my-discussion' element={isAuth ? <MyDiscussions /> : <Navigate to='/login' /> } />
        <Route path='/discussion/:id' element={isAuth ? <DiscussionPage /> : <Navigate to='/login' /> } />
        
        {/* admin */}
        <Route path='/users' element={isAdmin ? <UserList /> : <Navigate to='/login' /> } />
        {/* <Route path='/users' element={isAuth && isAdmin ? <Users /> : <Navigate to='/login' />} /> */}

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
