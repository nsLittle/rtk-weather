'use client';
import React, { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { fetchWeather } from './store/slices/search';

export default function Home() {
  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState('');
  const dispatch = useDispatch();
  const { city, temperature, pressure, humidity, loading, error } =
		useSelector((state) => state.weather);

  const handleSearch = () => {
    console.log(searchInput);
    if (searchInput.trim() == '') {
      alert('Error! You must enter a ciry name.');
      return;
    }

    if (searchInput.trim() !=='') {
      dispatch(fetchWeather(searchInput))
        .then((response) => {
          console.log(response.payload);

        if(response.payload.cod == '404') {
          alert('Error! You did not enter a correctly spelled city.');
        } else if(response.payload === ' ') {
          alert('Error! You must enter a city name.')
        } else {
          setData(response.payload);
        }
        });
    }
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

      {data?.city && <h2 className='other-data'>{data.city.name}</h2>}


      {data && data.list && data.list.length > 0 && (
        <>
          <h3>Temperature</h3>
          {data && data.list && data.list.length > 0 && (
            <div style={{width: '500px', height: '125px', padding: '0', margin: '0'}}>
              <Sparklines data={data.list.slice(0,5).map(datum => datum.main.temp)} height={50} dataLabelSettings={{visible:['All']}}>
              <SparklinesLine color="#FFA500" />
              </Sparklines>
            </div>
          )}
          {data && (
            <div className='search-results-five'>
              <ul>
                {data.list ? data.list.slice(0, 5).map((datum, index) => (
                  <li key={index} className='data'>{datum.main && datum.main.temp}</li>
                  ),
                ) : ''}
              </ul>
              <ul>
                <li className='data'>5-day average: {calculateAverage(data.list, 'temp')}</li>
              </ul>
            </div>
          )}

          <h3>Pressure</h3>
              {data?.list && (
                 <div style={{width: '500px', height: '125px', padding: '0', margin: '0'}}>
                    <Sparklines data={data.list.slice(0,5).map(item => item.main.pressure)} height={50} dataLabelSettings={{visible:['All']}}>
                    <SparklinesLine color="#000080" />
                    </Sparklines>
                    </div>
                  )}
                {data && (
                  <div className='search-results-five'>
                    <ul>
                      {data.list && data.list.slice(0, 5).map((item, index) => (
                        <li key={index} className='data'>{item.main && item.main.pressure}</li>
                        ))}
                    </ul>
                    <ul>
                      <li className='data'>5-day average: {calculateAverage(data.list, 'pressure')}</li>
                    </ul>
                  </div>
                )}

            <h3>Humidity</h3>
                {data?.list && (
                  <div style={{width: '500px', height: '125px', padding: '0', margin: '0'}}>
                    <Sparklines data={data.list.slice(0,5).map(item => item.main.humidity)} height={50} dataLabelSettings={{visible:['All']}}>
                    <SparklinesLine color="#008000" />
                    </Sparklines>
                  </div>  
                )}
                  {data && (
                    <div className='search-results-five'>
                      <ul>
                        {data.list && data.list.slice(0, 5).map((item, index) => (
                          <li key={index} className='data'>{item.main && item.main.humidity}</li>
                          ))}
                      </ul>
                      <ul>
                        <li className='data'>5-day average: {calculateAverage(data.list, 'humidity')}</li>
                      </ul>
                    </div>
                  )}
        </>
      )}
    </main>
   );
};