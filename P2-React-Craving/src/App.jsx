import React, { useState } from 'react';
import CravingSearch from './components/CravingSearch/CravingSearch';
import CravingSideNav from './components/CravingSideNav/CravingSideNav';
import CravingMain from './components/CravingMain/CravingMain';
import * as CravingService from './service/CravingService';
import './App.css'

const App = () => {
  const [query, setQuery] = useState('');
  const [foodPlaces, setFoodPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //How to enter query param in function?
  
  const handleSearch = async (searchTerm) => {
    setQuery(searchTerm);
    setLoading(true);
    setError(null);
    try {
      const results = await CravingService.fetchFoodPlaces(searchTerm);
      setFoodPlaces(results);
    } catch (err) {
      setError('Failed to fetch food places');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="app-container">
      <h1>Cravings</h1>
      <CravingSideNav />
      <div className="main-content">
        <CravingSearch onSearch={handleSearch} />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <CravingMain foodPlaces={foodPlaces} />
      </div>
    </div>
  );
};

export default App;