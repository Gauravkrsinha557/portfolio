import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin pages (no navbar) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Public pages (with navbar) */}
        <Route path="/*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/"         element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact"  element={<Contact />} />
            </Routes>
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}
