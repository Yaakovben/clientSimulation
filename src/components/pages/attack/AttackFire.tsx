import React, { useEffect } from 'react'
import { useAppSelector } from '../../../redux/store'
import { Navigate, useNavigate } from 'react-router-dom'
import { socket } from '../../../main'

export default function AttackFire() {
  const navigate = useNavigate()
  const user = useAppSelector(state=>state.user.user)
  useEffect(()=>{
    if(!user ){
      navigate('/login')
    } 
  },[user])
  
  if(user && user.ammuntion.length >0 ){
    const handel = ()=>{
      socket.emit("attackFire")
    }
    return (
    <div>
      {user?.ammuntion.map((ammuntion:any, index:number)=><p key={index} onClick={handel}>{ammuntion.name}</p>)} 
    </div>
  )}
  else{
    return(
    <p>❌No Ammuntion ❌</p>
    )
  }
}
