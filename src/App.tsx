import { useState } from 'react'

import './App.css'

function App() {

  const API_URL = 'https://restcountries.com/v3.1/name/';
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<Country[]>([]);

  interface Country {
    altSpellings: string[];
    area: number;
    borders: string[];
    capital: string[];
    capitalInfo: {
      latlng: number[];
    };
    car: {
      signs: string[];
      side: string;
    };
    cca2: string;
    cca3: string;
    ccn3: string;
    cioc: string;
    coatOfArms: {
      png: string;
      svg: string;
    };
    continents: string[];
    currencies: {
      [key: string]: any;
    };
    demonyms: {
      eng: any;
      fra: any;
    };
    fifa: string;
    flag: string;
    flags: {
      png: string;
      svg: string;
      alt: string;
    };
    gini: {
      [key: string]: number;
    };
    idd: {
      root: string;
      suffixes: string[];
    };
    independent: boolean;
    landlocked: boolean;
    languages: {
      [key: string]: string;
    };
    latlng: number[];
    maps: {
      googleMaps: string;
      openStreetMaps: string;
    };
    name: {
      common: string;
      official: string;
      nativeName: any;
    };
    population: number;
    region: string;
    startOfWeek: string;
    status: string;
    subregion: string;
    timezones: string[];
    tld: string[];
    translations: {
      [key: string]: any;
    };
    unMember: boolean;
  }

  const searchCountries = async (searchText: string) => {
    const res = await fetch(API_URL + searchText);
    const data = await res.json();
    console.log(data);
    setSearchResults(data);
  }


  return (
    <>
      <h1>Country search</h1>
      <input type="text"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      /> 
      <button onClick={() => searchCountries(searchText)}>Search</button>
      {
        searchResults?.length > 0 
        ? (
          searchResults.map((country) => {
            return (
              <div className='country' key={country.name.common}>
                <h1>{country.name.common}</h1>
                <img src={country.flags.png} alt={country.name.common} />
                <h2>Capital: {country.capital}</h2>
                <p>Area: {country.area.toLocaleString()} km</p>
                <p>Population: {country.population.toLocaleString()} people</p>
                <a href={country.maps.googleMaps}>See in maps</a>
              </div>
            )
            })
        )
      : (
          <p>No results</p>
        )
      }
    </>
  )
}

export default App
