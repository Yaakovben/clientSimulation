import React, { useEffect, useState } from 'react'
import { socket } from '../../../main';
import { IMissileList } from '../../../types/user';

export default function DefensiveDisplay() {
  const [missileList, setMissileList] = useState<IMissileList[]>([]); 

  useEffect(() => {
    socket.on("listMissiles", (missilies:IMissileList[]) => {
      setMissileList(missilies);
    });
  }, []);
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
              </tr>
            ))
          ) : <p>Not have your missiles 🧐</p>}
        </tbody>
      </table>
    </div>
  );
}
