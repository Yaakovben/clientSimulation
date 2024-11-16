import React from 'react'
import Login from './components/auth/Login'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './components/auth/Register'
import AttackPage from './components/pages/attack/AttackPage'
import DefensivePage from './components/pages/defense/DefensivePage'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='atteck' element={<AttackPage/>}/>
        <Route path='defense' element={<DefensivePage/>}/>
        <Route path='/' element={<Navigate to={'/login'}/>}/>
      </Routes>
    </div>
  )
}   
