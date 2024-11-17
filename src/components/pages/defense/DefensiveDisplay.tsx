import React, { useEffect, useState } from 'react'
import { socket } from '../../../main';
import { IMissileList } from '../../../types/user';
import { useAppSelector } from '../../../redux/store';

export default function DefensiveDisplay() {
  const user = useAppSelector(state=>state.user.user)
  const [missileList, setMissileList] = useState<IMissileList[]>([]); 
  useEffect(() => {
    socket.emit("start")
    socket.on("listMissiles", (missilies:IMissileList[]) => {
      setMissileList(missilies);
    });
  }, [missileList]);
  const HandelIntercepted = (missileLocation:string,missileName:string,userName:any)=>{
    socket.emit("defensiveFire",missileLocation,missileName,userName)
  }
  
  return (
    <div>
      <table className='table'>
        <thead className='theadTable'>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {missileList.length > 0 ? (
            missileList.map((missile, index) => (
              <tr key={index}>
                <td>{missile.name}</td>
                <td>{missile.time}</td> 
                <td>{missile.status}</td>
                <td><button onClick={()=>HandelIntercepted(missile.location,missile.name,user?.username)!} >🚀</button></td>
              </tr>
            ))
          ) : <p>Not have your missiles 🧐</p>}
        </tbody>
      </table>
    </div>
  );
}