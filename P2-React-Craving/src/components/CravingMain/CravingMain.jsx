
import React from 'react';
import CravingCard from '../CravingCard/CravingCard';

const CravingMain = ({ foodPlaces, favourites, favouriteLoading, onFavourite }) => {
  
  if (!foodPlaces.length) {
    return (
      <div className='flex flex-col items-center justify-center py-24'>
        <div className='text-center max-w-md'>
          <p className='text-gray-400 text-lg font-light mb-2'>What do you crave?</p>
        </div>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
      {foodPlaces.map((place) => (
        <CravingCard
          key={place.uuid}                                //unique identifier
          place={place}                                   //pass full object to card
          isFavourite={favourites.has(place.uuid)}        //check if place is favourite
          isLoading={favouriteLoading.has(place.uuid)}    //check if card is loading
          onFavourite={() => onFavourite(place)}          //when user click on heart icon to add to favourites
        />
      ))}
    </div>
  );
};

export default CravingMain;
