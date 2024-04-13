import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [latestMessage, setlatestMessage] = useState([]); 
  const [message, setMessage] = useState("")

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080')
    socket.onopen = () => {
      console.log("connected")
      setSocket(socket)
    }

    socket.onmessage = (message) => {
      console.log('received message', message.data);
      setlatestMessage(message.data);
    }

    return () => {
      socket.close();
    }
  }, [])
  if(!socket) {
    return <div>
      Connecting to the socket server...
    </div>
  }
  return (
    <>
    <input onChange={(e) => {
      setMessage(e.target.value)
    }}></input>
    <button onClick={() => {
      socket.send(message)
    }}>Send</button>
    {latestMessage}
    </>
  )
}

export default App
