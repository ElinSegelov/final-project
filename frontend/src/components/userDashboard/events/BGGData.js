/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import events from 'reducers/events';

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
          console.log('if statement')
          console.log(info)
          dispatch(events.actions.setSelectedGameWithDataFromAPI(info))
        } else if (data.boardgames.boardgame) {
          console.log('else if statement')
          info = data.boardgames.boardgame;
          // lägg in så att första alternativet är tomt!!!!
          const suggestedGames = info.map((game) => {
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
    <>
      <form onSubmit={textInputSubmit}>
        <label htmlFor="game">
          <input
            type="text"
            placeholder="What game will you be playing?"
            id="game"
            value={searchParameter}
            onChange={(event) => setSearchParameter(event.target.value)} />
        </label>
      </form>
      <form>
        <label htmlFor="suggestions">
          <select id="suggestions" onChange={(event) => selectInputSubmit(event.target.value)}>
            {suggestions}
          </select>
        </label>
      </form>
    </>

  )
}
export default BGGData;