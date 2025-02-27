import React from 'react'

export const Reader = () => {

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
          //startShift(result)
          console.log(result);
          
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
    </div>
  )
}

