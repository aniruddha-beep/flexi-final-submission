import { Link } from 'react-router-dom';
import './Header.css';

function Header({ user, handleLogout }) {
  return (
    <header className="site-header">
      <div className="site-brand">
        <Link to="/" className="logo">MyStore</Link>
        <h1 className="sr-only">Inventory Management</h1>
      </div>
      <nav className="site-nav">
        <Link to="/">Home</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        {user && (
          <button 
            onClick={handleLogout}
            className="logout-btn"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
