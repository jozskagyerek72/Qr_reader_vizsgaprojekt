import { Html5QrcodeScanner } from 'html5-qrcode'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkShiftStatus } from './utils/crudUtil'

export const Reader = () => {

  const [scanresult,setScanresult] = useState(null)
  const [resultStatus, setResultStatus] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{

    const scanner = new Html5QrcodeScanner("reader", {
    qrbox: {width: 250, height: 250},
    fps: 5,

    })

    const success = (result) => 
    {
        scanner.clear()
        setScanresult(result)
        try {
          //startShift(result)
          console.log(result);
          setResultStatus(checkShiftStatus(result))
          navigate("/result/"+resultStatus)
          //tudja a rak mie mindig nullt mutat, majd maric hatha megoldja
          
        } catch (error) {
          console.log(error)
          
        }
        scanner.render(success,error)
    }

    const error = (err) => 
    {
        console.warn(err)
    }

    scanner.render(success, error)

    

  },[])

  return (
    <div>
      reader...
      <div id="reader"></div>
    </div>
  )
}

