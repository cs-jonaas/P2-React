

import React, { useState } from 'react';
import { Routes, Route } from 'react-router';
import CravingSearch from './components/CravingSearch/CravingSearch';
import CravingSideNav from './components/CravingSideNav/CravingSideNav';
import CravingMain from './components/CravingMain/CravingMain';
import CravingFavourites from './components/CravingFavourites/CravingFavourites';
import * as CravingService from './service/CravingService';
import * as AirtableService from './service/airtableService';
import './App.css';


const App = () => {
  const [query, setQuery] = useState('');
  const [foodPlaces, setFoodPlaces] = useState([]);

  const [favourites, setFavourites] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favouriteLoading, setFavouriteLoading] = useState(new Set());
  const [sideNavOpen, setSideNavOpen] = useState(true);

  const handleSearch = async (searchTerm) => {
    setQuery(searchTerm);   //Updates the query state variable with the new searchTerm
    setLoading(true);       //Sets the loading state to true
    setError(null);         //Clears any previous error messages

    try {
      const results = await CravingService.fetchFoodPlaces(searchTerm);
      setFoodPlaces(results);
    } catch (err) {
      setError('Failed to fetch food places');
    } finally {
      setLoading(false);
    }
  };

  const handleFavourite = async (place) => {
    const placeId = place.uuid;                                 //Extract the place’s unique ID
    setFavouriteLoading(prev => new Set([...prev, placeId]));   //Adds new Favourite to array
    
    try {
      if (favourites.has(placeId)) {
        setFavourites(prev => {           
          const newFavourites = new Set(prev);
          newFavourites.delete(placeId);
          return newFavourites;
        });
      } else {      //if not a favourite yet, create favouriteRecord. Send record to airtable
        const favouriteRecord = {
          name: place.name,
          description: place.description || '',
          address: `${place.address?.block || ''} ${place.address?.streetName || ''}, ${place.address?.floorNumber || ''} ${place.address?.unitNumber || ''}, Singapore ${place.address?.postalCode || ''}`,
          
        };
        console.log(favouriteRecord)
        
        await AirtableService.createRecord(favouriteRecord);    //send new favourite place to airtable
        setFavourites(prev => new Set([...prev, placeId]));     //Add new favourite to the latest favourite array
      }
    } catch (err) {
      console.error('Error handling favourite:', err);    //catches error
      setError('Failed to update favourites');            //show message when error occurs
    } finally {
      setFavouriteLoading(prev => {         //stops spinner
        const newLoading = new Set(prev);
        newLoading.delete(placeId);
        return newLoading;
      });
    }
  };
  

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  return (
    <div className='min-h-screen bg-white'> {/* Main styling */}
      <div className='max-w-7xl mx-auto'> {/* SideNav styling */}
        <div className="flex">
            <CravingSideNav isOpen={sideNavOpen} onToggle={toggleSideNav} />

            <div
              className={`flex-2 transition-all duration-300 ease-in-out ${
                sideNavOpen ? 'px-12' : 'px-8'
              } py-16`}
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <header className="mb-16">
                        <h1 className="text-5xl font-light text-gray-900 mb-3 tracking-tight">Cravings</h1>
                        <p className="text-gray-500 text-lg font-light">
                          Never know what you'll find!
                        </p>
                      </header>

                      <div className="mb-16">   
                        <CravingSearch onSearch={handleSearch} />
                      </div>

                      {loading && (
                        <div className="flex flex-col items-center justify-center py-24">
                          <div className="w-8 h-8 border border-gray-200 border-t-gray-900 rounded-full animate-spin mb-4"></div>
                          <p className="text-gray-300 font-light">Searching...</p>
                        </div>
                      )}

                      {error && (
                        <div className="border border-red-100 bg-red-50 rounded-lg p-6 mb-12">
                          <p className="text-red-600 font-light">{error}</p>
                        </div>
                      )}

                      <CravingMain
                        foodPlaces={foodPlaces}
                        favourites={favourites}
                        favouriteLoading={favouriteLoading}
                        onFavourite={handleFavourite}
                      />
                    </>
                  }
                />
                <Route path="/hearts" element={<CravingFavourites />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
  );
};

export default App;

