import { BrowserRouter, Routes, Route } from 'react-router'
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

import { ProtectedRoute } from './routes/ProtectedRoute'
import { ROUTES } from './constants/routes'
import { useGetSession } from './queryHooks/auth/useGetSession'

function App() {
  useGetSession()

  return (
    <section role="app"
      className="flex flex-col min-h-screen max-w-6xl m-auto">
      <BrowserRouter>
        <Header />
        <Navigation />
        <Routes>
          <Route
            index
            element={
              <Home />
            } />
          <Route
            path={ROUTES.MY_BOARDS} element={
              <ProtectedRoute>
                <MyBoards />
              </ProtectedRoute>
            } />
          <Route
            path={ROUTES.CREATE}
            element={
              <Create />
            } />
          <Route
            path={ROUTES.CREATE_BY_BOARD_ID}
            element={
              <ProtectedRoute>
                <Create />
              </ProtectedRoute>
            } />
          <Route
            path={ROUTES.ABOUT} element={
              <About />
            } />

          <Route
            path={ROUTES.LOGIN}
            element={
              <Login />
            } />
          <Route
            path={ROUTES.LOGOUT}
            element={
              <Logout />
            } />
          <Route
            path={ROUTES.REGISTER}
            element={
              <Register />
            } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </section>
  )
}

export default App
