const STB_API_BASE = 'https://api.stb.gov.sg/content/food-beverages/v2/search';
const STB_API_KEY = import.meta.env.VITE_STB_API_KEY;


export const fetchFoodPlaces = async (searchTerm) => {
  try {
    const url = new URL(STB_API_BASE);
    url.searchParams.append('searchType', 'keyword');
    url.searchParams.append('searchValues', searchTerm);
    url.searchParams.append('limit', 50);
    const response = await fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'X-API-Key': STB_API_KEY,
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
