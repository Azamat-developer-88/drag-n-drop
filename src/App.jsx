import React from 'react'

import TaskBox from './components/TaskBox'
function App() {
  return (
    <div className="bg-green-500 h-screen">
      <h2 className="text-3xl h-16 shadow-xl drop-shadow-2xl font-bold text-center bg-green-800">TaskBox Manager</h2>
      <div>
      <TaskBox /> 
      </div>
    </div>
  )
}

export default App
