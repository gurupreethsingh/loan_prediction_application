import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import MainLayout from './components/common_components/MainLayout';
import "./styles/globals.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <div>
        <MainLayout></MainLayout>
       </div>
    </>
  )
}

export default App
