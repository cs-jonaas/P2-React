const STB_API_BASE = 'https://api.stb.gov.sg/content/food-beverages/v2/search';
const STB_API_KEY = import.meta.env.VITE_STB_API_KEY;


export const fetchFoodPlaces = async (searchTerm) => {
  try {
    const url = new URL(STB_API_BASE);                    
    url.searchParams.append('searchType', 'keyword');     // appends searchtype=keword to url
    url.searchParams.append('searchValues', searchTerm);  // appends searchvalue='searchterm' to url
    url.searchParams.append('limit', 10);                 // appends limit=10 to url
    
    const response = await fetch(url, {
    method: 'GET',
    headers: {
        'X-API-Key': STB_API_KEY,                         //authenticates via API key
    },
    });


    if (!response.ok) throw new Error('Failed to fetch STB data');
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching food from STB:', error);
    throw error;
  }
};
