/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-no-useless-fragment */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import events from 'reducers/events';
import styled from 'styled-components';
import { Form, Input } from 'styles/Forms';
import { BGG_API_SEARCH_BY_NAME, BGG_API_SEARCH_BY_OBJECT_ID } from 'utils/utils';

const BGGData = ({ tempEventInfoForEdit, setTempEventInfoForEdit, editEvent }) => {
  const [searchParameter, setSearchParameter] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch()

  const fetchData = async (bggEndpoint, objectId) => {
    const URL = `https://api.factmaven.com/xml-to-json/?xml=${bggEndpoint}${objectId || searchParameter}`;
    let info;
    let gameName;

    try {
      const response = await fetch(URL);
      const data = await response.json();

      if (data) {
        if (objectId) {
          // Checking if the fetch is to objectId endpoint.
          info = data.boardgames.boardgame;
          dispatch(events.actions.setSelectedGameWithDataFromAPI(info))

          if (editEvent) {
            if (info.name.length > 1) {
              const nameOfGame = info.name.find((nameGame) => nameGame.primary === 'true')
              gameName = nameOfGame.text;
            } else {
              gameName = info.name.text;
            }
            setTempEventInfoForEdit({ ...tempEventInfoForEdit, game: gameName, image: info.image })
          }
        } else if (data.boardgames.boardgame) {
          info = data.boardgames.boardgame;
          // TODO lägg in så att första alternativet är tomt!!!!
          const suggestedGames = info.map((game) => {
            return <option key={game.objectid} value={game.objectid}>{game.name.text}</option>
          })
          setSuggestions(suggestedGames)
        }
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const textInputSubmit = (event) => {
    event.preventDefault()
    fetchData(BGG_API_SEARCH_BY_NAME)
  }

  const selectInputSubmit = (objectId) => {
    fetchData(BGG_API_SEARCH_BY_OBJECT_ID, objectId)
    setSearchParameter('')
  }
  return (
    <BGGFetchForm onSubmit={textInputSubmit}>
      <Input
        type="text"
        placeholder={(tempEventInfoForEdit && tempEventInfoForEdit.game) || 'Game'}
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