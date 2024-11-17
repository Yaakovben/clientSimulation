import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../redux/store'
import { Navigate, useNavigate } from 'react-router-dom'
import { socket } from '../../../main'
import { IAmmuntion, IUser } from '../../../types/user'

export default function AttackFire() {
  const navigate = useNavigate()
  const user = useAppSelector(state=>state.user.user)
  const [area,setArea] = useState("")
  useEffect(()=>{
    if(!user ){
      navigate('/login')
    } 
  },[user])
  useEffect(()=>{},[area])
  if(user && user.ammuntion.length >0 ){
    const handel = (missileName:string,locationMissile:string,userName:string)=>{
      socket.emit("attackFire",missileName,locationMissile,userName)
    }
    return (
    <div className='attackFire'>
      <h1>Orgnition:    {user.organition}</h1>
      <div className='ammuntinAttack'>
      <select value={area} onChange={(e)=>setArea(e.target.value)}>
        <option value=""  hidden>Coose Area</option>
        <option value="IDF - North">North</option>
        <option value="IDF - South">South</option>
        <option value="IDF - Center">Center</option>
        <option value="IDF - West Bank">West Bank</option>  
    </select>
      {user?.ammuntion.map((ammuntion:IAmmuntion, index:number)=><p key={index} onClick={()=>handel(ammuntion.name,area,user.username)!}>{ammuntion.name} ✖️ {ammuntion.amount}</p>)} 
      </div>
    </div>
  )}
  else{
    return(
    <p>❌No Ammuntion ❌</p>
    )
  }
}
