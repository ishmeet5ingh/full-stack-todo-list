import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import appwriteConfig from './appwrite/appwriteConfig'
import {useDispatch} from 'react-redux'
import {login, logout} from './store/authSlice'


function App() {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(()=> {
    appwriteConfig.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    }).finally(()=> setLoading(false))
  },[])


  return !loading ? (
    <Outlet/>
  ) : "loading..."
}

export default App
