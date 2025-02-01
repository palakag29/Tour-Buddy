import { useState } from 'react'
import { Button } from './components/ui/button'
import "./App.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className='text-3xl underline blue'>Welcome</h1>
    <Button variant='destructive'>Submit</Button>
    </>
  )
}

export default App
