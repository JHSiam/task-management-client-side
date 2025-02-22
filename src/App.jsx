import { useState } from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import TaskBoard from './components/TaskBoard'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='max-w-[1380px] mx-auto'>
        <Navbar></Navbar>
        {/* <TaskBoard></TaskBoard> */}
        <Outlet></Outlet>
       
      </div>
      <Footer></Footer>
    </>
  )
}

export default App
