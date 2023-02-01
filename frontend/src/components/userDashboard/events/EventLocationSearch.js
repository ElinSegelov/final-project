/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
/* eslint-disable quote-props */
import React, { useEffect } from 'react';
import events from 'reducers/events';
// import locations from 'utils/locations.js';
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'styles/Forms';
import { API_URL } from 'utils/urls';

const EventLocationSearch = () => {
  const allLocationsFromStore = useSelector((store) => store.events.locations);
  const dispatch = useDispatch();

  const getAllLocations = async () => {
    try {
      const response = await fetch(API_URL('locations'));
      const data = await response.json()
      const allLocations = data.response[0].locations[0].swedishCounties;
      dispatch(events.actions.setLocations(allLocations))
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getAllLocations()
  }, []);

  const countyOptions = allLocationsFromStore.map((county) => {
    return <option key={county} value={county}>{county}</option>
  });
  const handleOnChange = (value) => {
    dispatch(events.actions.setCountyFilter(value));
  };
  return (
    <CountySearchForm>
      <label htmlFor="county-search">Filter events by county
        <Select id="county-search" onChange={(event) => handleOnChange(event.target.value)}>
          <option value="All">All Swedish countys</option>
          {countyOptions}
          <option value="Other">Rest of world</option>
        </Select>
      </label>
    </CountySearchForm>
  );
};

export default EventLocationSearch;

const CountySearchForm = styled.form`
  height: fit-content;
  display: flex;
  width: 100%;
  grid-column: 2 / 3;
  
  label {
    width: 100%;
  }
  
  @media(min-width: 768px) {
    width: 30rem;
  }
`