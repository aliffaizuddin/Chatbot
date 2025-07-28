import { useState } from 'react'
import './App.css'
import Chatbot from './features/Chatbot';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <h1>My Chatbot</h1>
      <Chatbot />
      </div>
    </>
  )
}

export default App
