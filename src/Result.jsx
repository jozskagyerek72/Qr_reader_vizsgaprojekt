import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import error from "../public/error.gif"

export const Result = () => {
  
  const {status} = useParams()
  
  const navigate = useNavigate()

  useEffect(()=>{
    setTimeout(() => {
      navigate("/")
    }, 3000);
  },[])


  return (
    <div>
    {status&& (status=="You should wait 12h before starting your next shift!" || status=="error") &&
      <div className='result' style={{
      backgroundColor:"white", 
      fontWeight: 'bold',
      width:"100vw",
      color: "red",
      height: "100vh",
      display: 'flex',
      justifyContent: "center",
      alignContent: "center",
      textAlign:"center",
      alignItems:"center",
      flexDirection: "column",
      fontSize: 24,
      textDecoration:"underline",
      fontFamily: "monospace"
    }}>
      <img src={error} alt="error" style={{backgroundColor:"white"}} />
      <p>{status}</p>
    </div>
    }

    {status&& 
      <div style={{
      backgroundColor:"red", 
      fontWeight: 900,
      fontSize: "10rem",
      color: "white"
    }}>
      result: {status}
    </div>
    }
    </div>
  )
}

