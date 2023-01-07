/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable indent */
/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
import { LoadingBlurBackground, LoadingForGameSearch } from 'components/loaders/loadingAnimations';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import events from 'reducers/events';
import ui from 'reducers/ui';
import styled from 'styled-components';
import { Form, Input } from 'styles/Forms';
import loaderOrange from 'assets/Loader/Loader_2.gif'

const BGGData = () => {
  const [searchParameter, setSearchParameter] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const dispatch = useDispatch()
  const isLoading = useSelector((store) => store.ui.isLoading)

  const BGG_API_SEARCH_BY_NAME = 'https://boardgamegeek.com/xmlapi/search?search='
  const BGG_API_SEARCH_BY_OBJECT_ID = 'https://boardgamegeek.com/xmlapi/boardgame/'

  const fetchData = async (bggEndpoint, objectId) => {
    const URL = `https://api.factmaven.com/xml-to-json/?xml=${bggEndpoint}${objectId || searchParameter}`;
    let info;

    try {
      const response = await fetch(URL);
      const data = await response.json();
      console.log('fetched data', data) //! Radera senare

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
    dispatch(ui.actions.setLoading(true))
    fetchData(BGG_API_SEARCH_BY_NAME)
      .finally(() => dispatch(ui.actions.setLoading(false)))
  }

  const selectInputSubmit = (objectId) => {
    console.log('objectId', objectId) //! RADERA SENARE
    dispatch(ui.actions.setLoading(true))
    fetchData(BGG_API_SEARCH_BY_OBJECT_ID, objectId)
      .finally(() => {
        dispatch(ui.actions.setLoading(false))
        setSearchParameter('')
      })
  }
  return (
    <>
      {isLoading
        ?
        <LoaderWrapper>
          <LoadingForGameSearch />
        </LoaderWrapper>
        :
        <BGGFetchForm onSubmit={textInputSubmit}>
          <InputWrapper>
            <Input
              type="text"
              placeholder="Game"
              onChange={(event) => setSearchParameter(event.target.value)} />
          </InputWrapper>
          {suggestions.length
            ?
            <label htmlFor="suggestions">
              <GameSelect
                id="suggestions"
                onChange={(event) => selectInputSubmit(event.target.value)}>
                {suggestions}
              </GameSelect>
            </label>
            : null}
        </BGGFetchForm>}
    </>
  )
}
export default BGGData;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
`
const LoaderWrapper = styled.div`
  width: 60px;
  height: 60px;
`
const GameSelect = styled.select`
  width: 12rem;
`

const BGGFetchForm = styled(Form)`
  width: 12rem;
`