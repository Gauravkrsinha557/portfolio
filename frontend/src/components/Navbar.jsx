import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/',         label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact',  label: 'Contact' },
  ];

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">YourName<span>.</span></Link>

        <ul className={`navbar-links${open ? ' open' : ''}`}>
          {links.map(l => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={pathname === l.to ? 'active' : ''}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li><Link to="/admin/login" className="btn btn-outline" style={{padding:'8px 20px',fontSize:'13px'}}>Admin</Link></li>
        </ul>

        <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span/><span/><span/>
        </button>
      </div>
    </nav>
  );
}
