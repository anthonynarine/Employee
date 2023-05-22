import React from 'react'

function Employee({name, role}) {
  return (
    <>
        <h3>Employee {name}</h3>
        <p>{role ? role : "No role"}</p>     
    </>
  )
}

export default Employee
