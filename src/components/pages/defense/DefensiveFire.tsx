import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../redux/store'
import { socket } from '../../../main'

export default function DefensiveFire() {
  const navigate = useNavigate()
  const user = useAppSelector(state=>state.user.user)
  useEffect(()=>{
    if(!user ){
      navigate('/login')
    } 
  },[user])
  
  if(user && user.ammuntion.length >0 ){
    const handel = ()=>{
      socket.emit("defensiveFire")
    }
    return (
    <div className='defnesiveFire'>
      <h1>Organition: {user.organition}</h1>
      {user?.ammuntion.map((ammuntion:any, index:number)=><p key={index} onClick={handel}>{ammuntion.name} ✖️ {ammuntion.amount}</p>)} 
    </div>
  )}
  else{
    return(
    <p>❌No Ammuntion ❌</p>
    )
  }
 
}
