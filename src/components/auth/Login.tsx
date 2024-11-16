import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchLogin } from '../../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'


export default function Login() {
    const dispatch = useAppDispatch()
    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const {user} = useAppSelector(state=>state.user)
    const navigate = useNavigate()

    useEffect(()=>{
      if(!user?._id ) return
      navigate('/atteck')

    },[user])

    useEffect(()=>{
      if(user?._id){
        navigate('/atteck')
      }
    },[])
  return (
    <div className='login'>
      <div className='login-form'>
        <h3>Login</h3>
        <input type='text' 
        placeholder='User Name' 
        value={username} 
        onChange={(e)=>setUserName(e.target.value)}/>
        <input type='password' 
        placeholder='Password' 
        value={password} 
        onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={()=>{  dispatch(fetchLogin({username,password}))}}>Login</button>
        <p>You don't  have an account ? <a onClick={() => navigate("/register")}className="register-link">Connect</a></p>
        </div>
    </div>
  )
}
