/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable indent */
/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import events from 'reducers/events';
import styled from 'styled-components';
import { Form, Input } from 'styles/Forms';

const BGGData = () => {
  const [searchParameter, setSearchParameter] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const dispatch = useDispatch()

  const BGG_API_SEARCH_BY_NAME = 'https://boardgamegeek.com/xmlapi/search?search='
  const BGG_API_SEARCH_BY_OBJECT_ID = 'https://boardgamegeek.com/xmlapi/boardgame/'

  const fetchData = async (bggEndpoint, objectId) => {
    const URL = `https://api.factmaven.com/xml-to-json/?xml=${bggEndpoint}${objectId || searchParameter}`;
    let info;

    try {
      const response = await fetch(URL);
      const data = await response.json();
      console.log('fetched data', data)

      if (data) {
        if (objectId) {
          // Checking if the fetch is to objectId endpoint.
          info = data.boardgames.boardgame;
          console.log(info)
          dispatch(events.actions.setSelectedGameWithDataFromAPI(info))
        } else if (data.boardgames.boardgame) {
          info = data.boardgames.boardgame;
          // lägg in så att första alternativet är tomt!!!!
          const suggestedGames = info.map((game) => {
            // if()
            return <option key={game.objectid} value={game.objectid}>{game.name.text}</option>
          })
          setSuggestions(suggestedGames)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const textInputSubmit = (event) => {
    event.preventDefault()
    fetchData(BGG_API_SEARCH_BY_NAME)
  }

  const selectInputSubmit = (objectId) => {
    console.log('objectId', objectId) // RADERA SENARE
    fetchData(BGG_API_SEARCH_BY_OBJECT_ID, objectId)
    setSearchParameter('')
  }
  return (
      <BGGFetchForm onSubmit={textInputSubmit}>
        <Input
          type="text"
          placeholder="Game"
          onChange={(event) => setSearchParameter(event.target.value)} />
      {suggestions.length
        ? <>
        <label htmlFor="suggestions">Suggestions:
          <GameSelect
            id="suggestions"
            onChange={(event) => selectInputSubmit(event.target.value)}>
            {suggestions}
          </GameSelect>
          </label>
          {/* <button type="submit">Submit</button> */}

       </> : null}
      </BGGFetchForm>
  )
}
export default BGGData;

const GameSelect = styled.select`
  width: 12rem;
`

const BGGFetchForm = styled(Form)`
  width: 12rem;
`