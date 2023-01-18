import React from 'react';
import countys from 'utils/countys';
import { Select } from 'styles/Forms';
import { useDispatch } from 'react-redux';
import events from 'reducers/events';
import styled from 'styled-components/macro';

const EventLocationSearch = () => {
  const dispatch = useDispatch()
  const countyOptions = countys.map((county) => {
    return <option key={county} value={county}>{county}</option>
  })
  const handleOnChange = (value) => {
    dispatch(events.actions.setCountyFilter(value))
  }
  return (
    <CountySearchForm>
      <label htmlFor="county-search">Filter events by county
        <Select id="county-search" onChange={(event) => handleOnChange(event.target.value)}>
          <option value="All">All Swedish countys</option>
          <optgroup>
            {countyOptions}
          </optgroup>
          <optgroup>
            <option value="Other">Rest of world</option>
          </optgroup>
        </Select>
      </label>
    </CountySearchForm>
  )
}

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