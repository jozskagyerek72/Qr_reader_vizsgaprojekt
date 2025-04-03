import { Html5QrcodeScanner } from 'html5-qrcode'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkIf12hPassed, checkShiftStatus } from './utils/crudUtil'

export const Reader = () => {
  const [scanresult, setScanresult] = useState(null)
  const navigate = useNavigate()

  checkIf12hPassed("WFZUQ5L3G7TbbTHoWRIc")

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
      // Don't re-render the scanner here if you want to navigate away
    }

    const error = (err) => {
      console.warn(err)
    }

    scanner.render(success, error)

    // Cleanup function
    return () => {
      scanner.clear()
    }
  }, [navigate])

  return (
    <div>
      reader...
      <div id="reader"></div>
    </div>
  )
}