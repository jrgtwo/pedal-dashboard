import { BrowserRouter, Routes, Route } from 'react-router'
import { Header } from './main-components/Header/Header'
import { Navigation } from './main-components/Navigation/Navigation'
import { Footer } from './main-components/Footer/Footer'
import { Home } from './routes/Home/Home'
import { About } from './routes/About/About'
import { Create } from './routes/Create/Create'

function App() {
  return (
    <section role="app"
      className="flex flex-col min-h-screen max-w-4xl m-auto">
      <BrowserRouter>
        <Header />
        <Navigation />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </section>
  )
}

export default App
