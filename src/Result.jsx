import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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
    {status&& 
      <div style={{
      backgroundColor:"green", 
      fontWeight: 'bold',
      fontSize: "10rem",
      color: "white"
    }}>
      result: {status}
    </div>
    }

    {status&& status=="failed"&& 
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

