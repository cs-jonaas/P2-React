
import React, { useEffect, useState } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import * as AirtableService from '../../service/airtableService';
import { deleteRecord } from '../../service/airtableService';
import CravingCard from '../CravingCard/CravingCard';


const CravingFavourites = () => {
  const [favourites, setFavourites] = useState([]);     //list favourite place fetch from Airtable
  const [loading, setLoading] = useState(true);         //state var for loading
  const [error, setError] = useState(null);             //state var to show error message if fetching fails 


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
    // console.error('Failed to delete:', error);
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

  if (error) {                                                      //shows error if fail to load
    return (
      <div className='text-red-500 py-8'>
        <p>{error}</p>
      </div>
    );
  }

  if (!favourites.length) {                                         //check if any food place added, if not shows message
    return (
      <div className='py-24 text-center text-gray-400'>
        <p>No favourites added yet</p>
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


// CravingCard
// key={record.id}
//     place={{
//     uuid: record.fields.uuid,
//     name: record.fields.name,
//     description: record.fields.description,
//     address: {
//         block: record.fields.block,
//         streetName: record.fields.streetName,
//         floorNumber: record.fields.floorNumber,
//         unitNumber: record.fields.unitNumber,
//         postalCode: record.fields.postalCode,
//     },
//     }}

// {favourites.map(record => (                                   //maps through favourite array, and display if array data exist
//         <div
//           key={record.id}
//           className='border rounded-xl p-6 bg-white shadow-sm'
//         >
//           <h3 className='text-xl font-semibold text-gray-800 mb-1'>
//             {record.fields.name}
//           </h3>
//           <p className='text-gray-500 mb-2'>{record.fields.description}</p>
//           {record.fields.rating && (
//             <p className='text-sm text-yellow-600'>
//                 ⭐ Rating: {record.fields.rating}
//             </p>
//           )}
//           {/* FULL ADDRESS  */}
//             <p className='text-sm text-gray-400'>
//                 {record.fields.block}
//                 {record.fields.unitNo ? `${record.fields.unitNo}, ` : ''}
//                 {record.fields.streetName}
//                 {record.fields.buildingName ? `, ${record.fields.buildingName}` : ''}
//                 {record.fields.postalCode ? `, Singapore ${record.fields.postalCode}` : ''}
//             </p>
          
//           <button
//             onClick={() => handleDelete(record.id)}
//             disabled={isLoading}
//             className={`flex items-center gap-2 ml-4 p-2 rounded-full transition-all duration-200  ${
//               isFavourite
//                 ? 'text-red-500 hover:bg-red-50'
//                 : 'text-gray-300 hover:text-red-400 hover:bg-gray-50'
//             } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             {isLoading ? (
//               <Loader2 className='w-5 h-5 animate-spin' />   //if loading show spinner, else done show red heart
//             ) : (
//               <Heart className={`w-5 h-5 ${isFavourite ? 'fill-current' : ''}`} /> 
//             )}
//             Remove from Favourites
//           </button>

//         </div>
//       ))}