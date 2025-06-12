const AIRTABLE_BASE_URL = 'https://api.airtable.com/v0/appV914NsTpfQv7rD/foodie';
const VITE_AIRTABLE_TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN

// Airtable Create
export const createRecord = async (place) => {

  const fields = {
    name: place.name,
    description: place.description
  };

if (place.uuid) fields.place_uuid = place.uuid;
if (place.block) fields.block = place.block;
if (place.streetName) fields.streetName = place.streetName;
if (place.floorNumber) fields.floorNumber = place.floorNumber;
if (place.unitNumber) fields.unitNumber = place.unitNumber;
if (place.buildingName) fields.buildingName = place.buildingName;
if (place.postalCode) fields.postalCode = place.postalCode;

  try {
    const response = await fetch(AIRTABLE_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VITE_AIRTABLE_TOKEN}`
      },
      body: JSON.stringify({ fields }),
    });
    

    if (!response.ok) throw new Error('Airtable create failed');
    
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error creating record:', error);
    throw error;
  }
};

// Airtable Delete
export const deleteRecord = async (id) => {
    
  try {
    const response = await fetch(`${AIRTABLE_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VITE_AIRTABLE_TOKEN}`
      },
    });
    
    if (!response.ok) throw new Error('Airtable delete failed');
    
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error deleting record:', error);
    throw error;
  }
};

export const getAllRecords = async () => {
  const res = await fetch(AIRTABLE_BASE_URL, {
    headers: {
      Authorization: `Bearer ${VITE_AIRTABLE_TOKEN}`
    }
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error?.message || 'Failed to fetch records');
  }

  const data = await res.json();
  return data.records;
};

// export const createRecord = async (place) => {
//   console.log('Creating record with place:', place);

//   const fields = {
//     name: place.name,
//     description: place.description
//   };

// if (place.uuid) fields.place_uuid = place.uuid;
// if (place.block) fields.block = place.block;
// if (place.streetName) fields.streetName = place.streetName;
// if (place.floorNumber) fields.floorNumber = place.floorNumber;
// if (place.unitNumber) fields.unitNumber = place.unitNumber;
// if (place.buildingName) fields.buildingName = place.buildingName;
// if (place.postalCode) fields.postalCode = place.postalCode;

//   try {
//     const response = await fetch(AIRTABLE_BASE_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${VITE_AIRTABLE_TOKEN}`
//       },
//       body: JSON.stringify({ fields }),
//     });
    

//     if (!response.ok) throw new Error('Airtable create failed');
    
//     const data = await response.json();
    
//     return data;
//   } catch (error) {
//     console.error('Error creating record:', error);
//     throw error;
//   }
// };