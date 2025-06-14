
import React, { useEffect, useState } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import * as AirtableService from '../../service/airtableService';
import { deleteRecord } from '../../service/airtableService';
import CravingCard from '../CravingCard/CravingCard';


const CravingFavourites = (place) => {
  const [favourites, setFavourites] = useState([]);     //list favourite place fetch from Airtable
  const [loading, setLoading] = useState(true);         //state var for loading
  const [error, setError] = useState(null);             //state var to show error message if fetching fails 

const address = () => { [
  place.block && `Block ${place.block}`,
  place.streetName,
  place.floorNumber && place.unitNumber
    ? `#${place.floorNumber}-${place.unitNumber}`
    : null,
  place.buildingName,
  place.postalCode && `Singapore ${place.postalCode}`
]
  .filter(Boolean)
  .join(', ');
}

  useEffect(() => {                                                 //runs only once when component is rendered => [] dependency array
    
    const fetchFavourites = async () => {
      setLoading(true);
      setError(null);
      try {                                                         //try...catch
        const records = await AirtableService.getAllRecords();      //try to fetch record from Airtable with get AllRecords
        setFavourites(records);
      } catch (err) {                                               //catches an error if fails to fetch
        console.error(err);
        setError('Failed to load favourites');                      //shows error message
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);


  const handleDelete = async (id) => {
  try {
    await deleteRecord(id);
    setFavourites(prev => prev.filter(item => item.id !== id));
  } catch (error) {
    console.error('Failed to delete:', error);
    setError('Failed to delete favourite');
    setFavourites(previousFavourites);
  }
};

  if (loading) {                                                    //show message while loading
    return (
      <div className='flex justify-center items-center py-24'>
        <p className='text-gray-400'>Loading favourites...</p>
      </div>
    );
  }

  if (!favourites.length) {                                         //check if any food place added, if not shows message
    return (
      <div className='py-24 text-center text-gray-400'>
        <p>No favourites added</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
      {favourites.map((record) => (

        <CravingCard
            key={record.id}
            place={{
                name: record.fields.name,
                description: record.fields.description,
                address: record.fields.address,
                uuid: record.fields.place_uuid
            }}
            isFavourite={true}
            isLoading={false}
            onFavourite={() => handleDelete(record.id)}  
        />
        ))}
    </div>
  );
  
};

export default CravingFavourites;
