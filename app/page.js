'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { fetchWeather } from './store/slices/search';

export default function Home() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]); 
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchInput.trim() === ''){
      alert('Error! You must enter a city name.');
      return;
    }

    dispatch(fetchWeather(searchInput))
      .then((response) => {
        if (response.payload.cod === '404') {
          alert('Error! You did not enter a correctly spelled city.');
        } else {
          setSearchResults((prevResults) => [
            ...prevResults,
            { city: searchInput, data: response.payload }
          ]);
        }
      });
  };

  const calculateAverage = (dataList, property) => {
    if (!dataList || dataList.length === 0) return 0;
    const sum = dataList.reduce((acc, item) => acc + item.main[property], 0);
    return (sum / dataList.length).toFixed(2);
  };

  return (
    <main>
      <h1>Sparkly Sparkles Weather</h1>
      <input id="search-query" placeholder='Enter city name' onChange={(e) => setSearchInput(e.target.value)} />
      <br />
      <button onClick={handleSearch}>Search</button>

      {searchResults.map((result, index) => ( 
        <div key={index}>
          <h2 className='other-data'>{result.city}</h2>

          {result.data && result.data.list && result.data.list.length > 0 && (
            <>
              <h3>Temperature</h3>
              <div style={{ width: '300px', height: '125px', padding: '0', margin: '0' }}>
                <Sparklines data={result.data.list.slice(0, 5).map(datum => datum.main.temp)} height={50}>
                  <SparklinesLine color="#FFA500" />
                </Sparklines>
              </div>
              <div className='search-results-five'>
                <ul>
                  {result.data.list.slice(0, 5).map((datum, index) => (
                    <li key={index} className='data'>{datum.main && datum.main.temp}</li>
                  ))}
                </ul>
                <ul>
                  <li className='data'>5-day average: {calculateAverage(result.data.list, 'temp')}</li>
                </ul>
              </div>

              <h3>Pressure</h3>
              <div style={{ width: '300px', height: '125px', padding: '0', margin: '0' }}>
                <Sparklines data={result.data.list.slice(0, 5).map(item => item.main.pressure)} height={50}>
                  <SparklinesLine color="#000080" />
                </Sparklines>
              </div>
              <div className='search-results-five'>
                <ul>
                  {result.data.list.slice(0, 5).map((item, index) => (
                    <li key={index} className='data'>{item.main && item.main.pressure}</li>
                  ))}
                </ul>
                <ul>
                  <li className='data'>5-day average: {calculateAverage(result.data.list, 'pressure')}</li>
                </ul>
              </div>

              <h3>Humidity</h3>
              <div style={{ width: '300px', height: '125px', padding: '0', margin: '0' }}>
                <Sparklines data={result.data.list.slice(0, 5).map(item => item.main.humidity)} height={50}>
                  <SparklinesLine color="#008000" />
                </Sparklines>
              </div>
              <div className='search-results-five'>
                <ul>
                  {result.data.list.slice(0, 5).map((item, index) => (
                    <li key={index} className='data'>{item.main && item.main.humidity}</li>
                  ))}
                </ul>
                <ul>
                  <li className='data'>5-day average: {calculateAverage(result.data.list, 'humidity')}</li>
                </ul>
              </div>
            </>
          )}
        </div>
      ))}
    </main>
  );
};