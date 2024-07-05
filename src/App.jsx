import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Expensetracker from './Expensetracker'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Expensetracker/>
    </>
  )
}

export default App
