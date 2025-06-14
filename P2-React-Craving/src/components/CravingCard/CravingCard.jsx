
import React, { useState } from 'react';
import { Heart, MapPin, Loader2 } from 'lucide-react';


const CravingCard = ({ place, isFavourite, isLoading, onFavourite, comment, onCommentChange, onCommentSubmit, }) => {
  // const [input, setInput] = useState('');
  
  const formatAddress = (address) => {
    if (typeof address === 'string') {
      return address || 'Address not available';
    }
    
    // This block allows you to display the address only if the field is available

    const parts = [];
    if (address.block) parts.push(address.block);
    if (address.streetName) parts.push(address.streetName);
    
    let fullAddress = parts.join(' ');
    
    if (address.floorNumber && address.unitNumber) {
      fullAddress += `, #${address.floorNumber}-${address.unitNumber}`;
    }
    
    if (address.postalCode) {
      fullAddress += `, Singapore ${address.postalCode}`;
    }
    
    return fullAddress || 'Address not available';
  };
  

  return (
    // group class triggers state on its children
    <div className='group cursor-pointer'>    
      <div className='bg-white border border-darkgray-100 rounded-2xl p-8 hover:shadow-lg hover:border-gray-100 transition-all duration-300'>
        <div className='flex justify-between items-start mb-6'>
          <h3 className='text-xl font-light text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors'>
            {place.name}
          </h3>

          <button
            onClick={onFavourite}
            disabled={isLoading}
            className={`ml-4 p-2 rounded-full transition-all duration-200 ${
              isFavourite
                ? 'text-red-500 hover:bg-red-50'
                : 'text-gray-300 hover:text-red-400 hover:bg-gray-50'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <Loader2 className='w-5 h-5 animate-spin' />   //if loading show spinner, else done show red heart
            ) : (
              <Heart 
                className={`w-5 h-5 ${isFavourite ? 'fill-current' : ''}`} 
              />
            )}
          </button>
        </div>
        {place.description && (
          <p className='text-gray-600 mb-6 line-clamp-3 font-light leading-relaxed'>
            {place.description}
          </p>
        )}
        <div className='flex items-start gap-3 text-gray-400'>
          <MapPin className='w-4 h-4 mt-1 flex-shrink-0' />   {/* Map pin icon */}
          <p className='text-sm line-clamp-2 font-light'>
            {formatAddress(place.address)}
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default CravingCard;
 
// {isFavourite && (
//           <div className='relative'>
//             <input
//               type='text'
//               placeholder='Add a comment...'
//               value={comment || ''}
//               onChange={onCommentChange}
//               className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none'
//             />
//             <button
//               onClick={onCommentSubmit}
//               className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-900'
//             >
//               <Send className='w-5 h-5' />
//             </button>
//           </div>
//         )}