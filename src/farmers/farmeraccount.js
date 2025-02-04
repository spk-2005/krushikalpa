import React from 'react'

export default function Farmeraccount() {
    const name =localStorage.getItem('name');
  return (
    <>
    {name}
     <h1>Farmer Account</h1> 
    </>
  )
}
