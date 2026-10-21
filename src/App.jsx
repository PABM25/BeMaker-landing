import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Portafolio from './pages/Portafolio';
import Contacto from './pages/Contacto';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Portafolio" element={<Portafolio />} />
          <Route path="/Contacto" element={<Contacto />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App