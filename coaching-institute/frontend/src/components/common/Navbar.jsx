import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-2xl text-primary-600 font-heading">
            Excellence Academy
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-primary-600 transition">
              Home
            </Link>
            <Link to="/courses" className="text-gray-600 hover:text-primary-600 transition">
              Courses
            </Link>
            <Link to="/toppers" className="text-gray-600 hover:text-primary-600 transition">
              Toppers
            </Link>
            <Link to="/feedback" className="text-gray-600 hover:text-primary-600 transition">
              Reviews
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary-600 transition">
              Contact
            </Link>

            {!user ? (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition"
                  >
                    Admin
                  </Link>
                )}
                <span className="text-sm text-gray-600">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-red-600 transition"
                >
                  <LogOut size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu toggler */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t pt-4">
            <Link to="/" className="block text-gray-600 hover:text-primary-600" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/courses" className="block text-gray-600 hover:text-primary-600" onClick={() => setMenuOpen(false)}>
              Courses
            </Link>
            <Link to="/toppers" className="block text-gray-600 hover:text-primary-600" onClick={() => setMenuOpen(false)}>
              Toppers
            </Link>
            <Link to="/feedback" className="block text-gray-600 hover:text-primary-600" onClick={() => setMenuOpen(false)}>
              Reviews
            </Link>
            <Link to="/contact" className="block text-gray-600 hover:text-primary-600" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
            {!user ? (
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/login" className="block text-center px-4 py-2 border border-primary-600 text-primary-600 rounded-lg">
                  Login
                </Link>
                <Link to="/register" className="block text-center px-4 py-2 bg-primary-600 text-white rounded-lg">
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2 border-t">
                {isAdmin && (
                  <Link to="/admin" className="block text-center px-4 py-2 bg-secondary-500 text-white rounded-lg">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block text-center px-4 py-2 border border-red-600 text-red-600 rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
