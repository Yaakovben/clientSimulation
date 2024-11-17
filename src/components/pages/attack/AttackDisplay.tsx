import React, { useEffect, useState } from 'react'
import { socket } from '../../../main';
import { IMissileList } from '../../../types/user'

export default function AttackDisplay() {
  
  const [missileList, setMissileList] = useState<IMissileList[]>([]); 
  useEffect(() => {
    socket.on("listMissilesforAttack", (missilies:IMissileList[]) => {
      setMissileList(missilies);
    });
  }, [missileList]);

  useEffect(()=>{
    socket.on("updatelistMissiles", (missilies:IMissileList[]) => {
      setMissileList(missilies);
  })},[missileList])

  return (
    <div>
      <table className='table'>
        <thead className='theadTable'>
          <tr>
            <th>Name</th>
            <th>time</th>
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
              </tr>
            ))
          ) : <p>Not have your missiles 🧐</p>}
        </tbody>
      </table>
    </div>
  );
}
