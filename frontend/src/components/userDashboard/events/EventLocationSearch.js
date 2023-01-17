import React from 'react';
import countys from 'utils/countys';
import { Select, Label } from 'styles/Forms';
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
      <Label htmlFor="countySearch"> Filter events by county </Label>
      <Select id="countySearch" onChange={(event) => handleOnChange(event.target.value)}>
        <option value="All">All Swedish countys</option>
        {countyOptions}
        <option value="Other">Other</option>
      </Select>
    </CountySearchForm>
  )
}

export default EventLocationSearch;

const CountySearchForm = styled.form`
  margin: 0 1rem;
`