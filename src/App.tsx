import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router'

function App() {
  const [state] = useState(true)

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={(
          <>
            <h2>Home - state= {`${state}`}</h2>
            <Link to="/about">About</Link>
          </>
        )} />
        <Route path="/about" element={(
          <>
            <h2>About</h2>
            <Link to="/">Home</Link>
          </>
        )} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
