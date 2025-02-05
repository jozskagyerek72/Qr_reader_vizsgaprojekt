
import {  Html5QrcodeScanner } from 'html5-qrcode'
import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { startShift } from './utils/crudUtil'

function App() {
  
  const [scanresult,setScanresult] = useState(null)

  useEffect(()=>{

    const scanner = new Html5QrcodeScanner("reader", {
    qrbox: {width: 250, height: 250},
    fps: 5
    })

    const success = (result) => 
    {
        scanner.clear()
        setScanresult(result)
        try {
          startShift(result)
          
        } catch (error) {
          console.log(error)
          
        }
    }

    const error = (err) => 
    {
        console.warn(err)
    }

    scanner.render(success, error)

    

  },[])


  return (
    <>
      <h2>qr reader</h2>
      {scanresult ? 
      <p>{scanresult}</p> : <div id="reader"></div>}
      <button onClick={()=>{window.location.reload(false)}}>scan again</button>
    </>
  )
}

export default App
