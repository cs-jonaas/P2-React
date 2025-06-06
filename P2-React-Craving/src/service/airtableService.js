const AIRTABLE_BASE_URL = 'https://api.airtable.com/v0/cravings/table_1';
const VITE_AIRTABLE_TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN

// const testAirtable = async (holidayName, likes) => {
//   try {
//     const res = await fetch(BASE_URL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_TOKEN}`
//         },
//         body: JSON.stringify({
//             fields: {
//                 name: holidayName,
//                 likes: likes,
//             }
//         }),

//     });

//     const obj = await res.json();

//     return obj;
//   } catch(err) {
//     console.error(err);
//   }
// };

// export {
//     testAirtable
// }

// Airtable Create
export const createRecord = async (record) => {
  try {
    const response = await fetch(AIRTABLE_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VITE_AIRTABLE_TOKEN}`
      },
      body: JSON.stringify({ fields: record }),
    });

    if (!response.ok) throw new Error('Airtable create failed');
    
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error creating record:', error);
    throw error;
  }
};

// Airtable Update
export const updateRecord = async (id, record) => {
  try {
    const response = await fetch(`${AIRTABLE_BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VITE_AIRTABLE_TOKEN}`
      },
      body: JSON.stringify({ fields: record }),
    });
    
    if (!response.ok) throw new Error('Airtable update failed');
    
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error updating record:', error);
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

export { createRecord, updateRecord, deleteRecord }
