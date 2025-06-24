import React from 'react'
import axios from "axios";
import { useEffect, useState } from 'react';

function FamilyList() {

  const [listOfFamily, setListOfFamily] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3001/FamilyTableRoute").then((response)=>{
      setListOfFamily(response.data);
    });
  }, []);
  return (
    <div className="App">
      {listOfFamily.map((value, key) =>(
      <div className='FamilyTable'>
        <div className='familyName'>{value.Name}</div>
        <div className='familyAddress'>{value.Address}</div> 
      </div>
    ))}
      </div>
  );
    
}

export default FamilyList
