import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { API } from './api/api'
import { Header } from './main-components/Header/Header'
import { Navigation } from './main-components/Navigation/Navigation'
import { Footer } from './main-components/Footer/Footer'
import { Home } from './routes/Home/Home'
import { About } from './routes/About/About'
import { Create } from './routes/Create/Create'
import { Login } from './routes/Login/Login'
import { Logout } from './routes/Logout/Logout'
import { Register } from './routes/Register/Register'
import { MyBoards } from './routes/MyBoards/MyBoards'
import { useLoginStore } from './store/login'
import { ProtectedRoute } from './routes/ProtectedRoute'


function App() {
  const setLoginStatus = useLoginStore((state) => state.setLoginStatus)

  useEffect(() => {
    (async () => {
      const { data, error } = await API.getSession()

      if (error) {
        console.error(error)
        return
      }

      if (data?.session?.user) {
        setLoginStatus(data.session.user)
      } else {
        setLoginStatus(null)
      }
    })()
  }, [setLoginStatus])

  return (
    <section role="app"
      className="flex flex-col min-h-screen max-w-6xl m-auto">
      <BrowserRouter>
        <Header />
        <Navigation />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/my-boards" element={
            <ProtectedRoute>
              <MyBoards />
            </ProtectedRoute>} />
          <Route path="/create" element={<Create />} />
          <Route path="/create/:boardId" element={
            <ProtectedRoute>
              <Create />
            </ProtectedRoute>} />
          <Route path="/about" element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </section>
  )
}

export default App
