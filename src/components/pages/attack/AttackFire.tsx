import React, { useEffect } from 'react'
import { useAppSelector } from '../../../redux/store'
import { Navigate, useNavigate } from 'react-router-dom'

export default function AttackFire() {
  const navigate = useNavigate()
  const user = useAppSelector(state=>state.user.user)
  useEffect(()=>{
    if(!user ){
      navigate('/login')
    } 
    
},[user])
  if(user && user.ammuntion.length >0 ){
  return (
    
    <div>
      {user?.ammuntion.map((ammuntion:any, index:number)=><p key={index}>{ammuntion.name}</p>)} 
    </div>
  )}
  else{
    return(

    <p>❌No Ammuntion ❌</p>
    )
  }
}
