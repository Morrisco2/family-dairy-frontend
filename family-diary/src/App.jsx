import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-screen w-screen bg-amber-600  flex justify-center items-center'>
      <h1 className='text-white font-bold text-3xl'>
        testing my font
      </h1>
    </div>

  )
}

export default App
