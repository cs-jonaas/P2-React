
import React from 'react';

import { Link } from 'react-router';
import { Home, Heart, Settings, Menu, X } from 'lucide-react';

const CravingSideNav = ({ isOpen, onToggle }) => {
  
  return (
    <nav className={`bg-gray-50 min-h-screen transition-all duration-300 ease-in-out ${
      isOpen ? 'w-16' : 'w-72'
    } relative`}>
      {/* SideNav Toggle Button */}
      <div className='absolute top-8 left-4 z-10'>
        <button
          onClick={onToggle}
          className='p-3 text-gray-400 hover:text-gray-900 hover:bg-white'
          aria-label={isOpen ? 'Hide navigation' : 'Show navigation' }    //ARIA-Accessible Rich Internet Applications: Just Icon
        >
          {isOpen ? (
            <Menu className='w-5 h-5' />
          ) : (
            <X className='w-5 h-5' />
          )}
        </button>
      </div>

      {/* Navigation Content */}
      <div className={`px-8 py-16 pt-24 ${
        isOpen ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className='mb-12'>
        </div>
        
        <ul>
          <li>
            <Link
              to='/'
              className='flex items-center gap-4 px-4 py-4 text-gray-600 rounded-lg hover:bg-white transition-all duration-200 group whitespace-nowrap'
            >
              {/* Home Icon */}
              <Home className='w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0' />
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/hearts'
              className='flex items-center gap-4 px-4 py-4 text-gray-600 rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-200 group whitespace-nowrap'
            >
              {/* Favourites Icon */}
              <Heart className='w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0' />
              Favourites
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};


export default CravingSideNav;
