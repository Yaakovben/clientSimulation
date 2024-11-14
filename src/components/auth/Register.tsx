import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { fetchRegister } from "../../redux/slices/userSlice";
import { AsyncThunkAction, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

export default function Register() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user);
  const [username,setUserName] = useState("")
  const [password,setPassword] = useState("")
  const [location,setLocation] = useState("jhjh")
  const [organition,setOrgantion] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      navigate("/login");
    }
  }, []);
//   useEffect(() => {
//     if (user?._id) {
//       navigate("/login");
//     }
//   }, [user,password]);
  const handleRegister  = async()=>{
    console.log("879");
    
    await dispatch(fetchRegister({username,password,organition,location}))
    console.log("100");
    
    navigate("/login")

  }

  
  

  return <div className='register'>
  <div className='register-form'>
    <h2>Register</h2>
    <input type='text' 
    placeholder='User Name' 
    value={username} 
    onChange={(e)=>setUserName(e.target.value)}/>
    <input type='password' 
    placeholder='Password' 
    value={password} 
    onChange={(e)=>setPassword(e.target.value)}/>
    <select value={organition} onChange={(e)=>setOrgantion(e.target.value)}>
        <option value=""  disabled hidden>Choose Organation</option>
        <option value="IDF - North">IDF - North</option>
        <option value="IDF - South">IDF - South</option>
        <option value="IDF - Center">IDF - Center</option>
        <option value="IDF - West Bank">IDF - West Bank</option>
        <option value="5">Five</option>
    </select>
    <select value={location} onChange={(e)=>setLocation(e.target.value)}>
        <option value=""  disabled hidden>Choose area</option>
        <option value="IDF">IDF - North</option>
        <option value="Hezbollah">Hezbollah</option>
        <option value="Hamas">Hamas</option>
        <option value="IRGC">IRGC</option>
        <option value="Houthis">Houthis</option>
    </select>
    
    
    <button onClick={handleRegister}>Register</button>
    </div>
</div>
}