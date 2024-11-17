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
  // const [location,setLocation] = useState("")
  const [organition,setOrgantion] = useState("")
  const [selectionArea, setselectionArea] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      navigate("/login");
    }
  }, [user]);

  const handleRegister  = async()=>{
    console.log("879");
    const register = await dispatch(fetchRegister({username,password,organition}))
    console.log("100");
    if (register.payload && register.payload._id){
    navigate("/login")
  }else{
    alert("All fields are required")
  }
  }

const handelShowArea = (select:string)=>{
  setOrgantion(select)
  if (select == "IDF") {
    setselectionArea(true)
  }else{
    setselectionArea(false)
  }
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
    <select value={organition} onChange={(e)=>handelShowArea(e.target.value)}>
        <option value=""  disabled hidden>Choose Organation</option>
        <option value="IDF">IDF</option>
        <option value="Hezbollah">Hezbollah</option>
        <option value="Hamas">Hamas</option>
        <option value="IRGC">IRGC</option>
        <option value="Houthis">Houthis</option>
    </select>
    {selectionArea&&
    <select value={organition} onChange={(e)=>setOrgantion(e.target.value)}>
        <option value=""  hidden>Coose Area</option>
        <option value="IDF - North">IDF - North</option>
        <option value="IDF - South">IDF - South</option>
        <option value="IDF - Center">IDF - Center</option>
        <option value="IDF - West Bank">IDF - West Bank</option>  
    </select>
    }
    <button onClick={handleRegister}>Register</button>
    <p>You already have an account ? <a onClick={() => navigate("/login")}className="login-link">Connect</a></p>
    </div>
</div>
}