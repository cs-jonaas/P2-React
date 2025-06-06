
import React from 'react';
import CravingCard from '../CravingCard/CravingCard';

const CravingMain = ({ foodPlaces }) => {
  if (!foodPlaces.length) return <p>No results found</p>;

  return (
    <div className="cards-container">
      {foodPlaces.map((place) => (
        <CravingCard key={place.uuid} place={place} />
      ))}
    </div>
  );
};

export default CravingMain;
