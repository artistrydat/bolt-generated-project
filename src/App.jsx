import { BrowserRouter, Routes, Route } from 'react-router-dom'
    import Home from './pages/Home'
    import Itinerary from './pages/Itinerary'
    import Navbar from './components/Navbar'

    export default function App() {
      return (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/itinerary/:id" element={<Itinerary />} />
          </Routes>
        </BrowserRouter>
      )
    }
