import { Html5QrcodeScanner } from 'html5-qrcode'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkIf12hPassed, checkShiftStatus } from './utils/crudUtil'

export const Reader = () => {
  const [scanresult, setScanresult] = useState(null)
  const navigate = useNavigate()


  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: { width: 250, height: 250 },
      fps: 5,
    })

    const success = async (result) => {
      scanner.clear()
      setScanresult(result)
      try {
        console.log(result);
        const status = await checkShiftStatus(result)
        navigate("/result/" + status)
      } catch (error) {
        console.log(error)
      }
      
    }

    const error = (err) => {
      console.warn(err)
    }

    scanner.render(success, error)

    
    return () => {
      scanner.clear()
    }
  }, [navigate])

  return (
    <div style={{
      fontFamily: "monospace",
      textAlign:"center"
    }}>
      <h2>Please read your QR-code here</h2>
      <div id="reader"></div>
    </div>
  )
}