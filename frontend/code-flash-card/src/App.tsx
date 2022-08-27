import React, { useState } from 'react'
import Router from './Router'
import './reset.css'

function App() {
  const [count, setCount] = useState(0)
  const v = true

  if (!v) {
    console.log(2)
  }

  console.log(123)

  return (
    <Router />
  )
}

export default App
