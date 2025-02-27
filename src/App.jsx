
import {  Html5QrcodeScanner } from 'html5-qrcode'
import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { startShift } from './utils/crudUtil'
import {BrowserRouter, createBrowserRouter, RouterProvider} from "react-router-dom"
import { Reader } from './Reader'
import { Result } from './Result'

const router = createBrowserRouter([
  {path:"/" , element:<Reader/>},
  {path:"/result/:status", element:<Result/>}
])

function App() {
  
  return <RouterProvider router={router}/>
}

export default App
