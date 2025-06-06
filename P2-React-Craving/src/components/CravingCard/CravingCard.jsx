
import React from 'react';

const CravingCard = ({place}) => {
    console.log(place)
  return (
    <div className="card">
      <h3>{place.name || place.title}</h3>
      <p>{place.address.streetName}  </p>
      <p>{place.description}</p>
    </div>
  );
};

export default CravingCard;

