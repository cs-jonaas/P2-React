
import React, { useState } from 'react';
import { Heart, MapPin, Loader2, Send } from 'lucide-react';
import { updateRecord } from '../../service/airtableService';

const CravingCard = ({ place, isFavourite, isLoading, onFavourite, recordId }) => {
  
  const [commentInput, setCommentInput] = useState('');
  const [savedComment, setSavedComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const formatAddress = (address) => {
    if (typeof address === 'string') return address || 'Address not available';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    setSubmitting(true);
    try {
      await updateRecord({ comment: commentInput.trim() }, recordId);
      setSavedComment(commentInput.trim());
      setCommentInput('');
    } catch (err) {
      console.error('Failed to submit comment:', err);
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
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
              <Loader2 className='w-5 h-5 animate-spin' />
            ) : (
              <Heart className={`w-5 h-5 ${isFavourite ? 'fill-current' : ''}`} />
            )}
          </button>
        </div>

        {place.description && (
          <p className='text-gray-600 mb-6 line-clamp-3 font-light leading-relaxed'>
            {place.description}
          </p>
        )}

        <div className='flex items-start gap-3 text-gray-400 mb-4'>
          <MapPin className='w-4 h-4 mt-1 flex-shrink-0' />
          <p className='text-sm line-clamp-2 font-light'>
            {formatAddress(place.address)}
          </p>
        </div>

        {isFavourite && (
          <div className='mt-4'>
            {savedComment ? (
              <p className='bg-white border border-gray-200 rounded-lg p-4 text-gray-700'>
                {savedComment}
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className='relative bg-white border border-gray-200 rounded-lg p-2 flex items-center'
              >
                <input
                  type='text'
                  placeholder='Add a comment...'
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className='w-full px-3 py-2 text-gray-500 rounded-lg focus:outline-none bg-white'
                  disabled={submitting}
                />
                <button
                  type='submit'
                  disabled={submitting || !commentInput.trim()}
                  className='absolute right-2 text-gray-400 hover:text-gray-900'
                >
                  <Send className='w-5 h-5' />
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CravingCard;
