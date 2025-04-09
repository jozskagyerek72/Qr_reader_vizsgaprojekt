import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import error from "../public/error.gif"
import success from "../public/success.gif"

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
    {status&& (status=="You should wait 12h before starting your next shift!" || status=="error" || status=="You are not an active worker.") &&
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

    {status&& (status=="Shift started" || status=="Shift ended") &&
      <div className='result' style={{
        backgroundColor:"white", 
        fontWeight: 'bold',
        width:"100vw",
        color: "green",
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
        <img src={success} alt="success" />
        <p>{status}</p>
      </div>
    }
    </div>
  )
}

