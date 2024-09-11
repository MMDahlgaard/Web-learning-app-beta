import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { HomeIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const VerticalNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white border-r w-64 py-8 px-4">
      <div className="flex items-center mb-8">
        <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
        </svg>
        <span className="ml-2 text-lg font-semibold text-gray-800">FlashLearn</span>
      </div>

      <nav className="flex-1">
        <ul>
          <li className="mb-2">
            <Link
              to="/dashboard"
              className={`flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 ${
                location.pathname === '/dashboard' ? 'bg-indigo-100 text-indigo-600' : ''
              }`}
            >
              <HomeIcon className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default VerticalNavbar;