
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const CravingSearch = ({ onSearch }) => {
  const [input, setInput] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (

    <form onSubmit={handleSubmit} className='w-full max-w-2xl'>
      <div className='relative'>
        <input
          type='text'
          placeholder='Craving for...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='w-full px-6 py-5 text-gray-900 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 font-light text-lg placeholder-gray-400'
        />
        <button
          type='submit'
          className='absolute right-3 top-1/2 transform -translate-y-1/2 p-3 text-gray-400 hover:text-gray-900 transition-colors duration-200'
        >
          <Search className='w-5 h-5' />
        </button>
      </div>
    </form>
  );
};

export default CravingSearch;
