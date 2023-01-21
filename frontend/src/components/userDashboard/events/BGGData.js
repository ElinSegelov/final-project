/* eslint-disable operator-linebreak */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import events from 'reducers/events';
import ui from 'reducers/ui';
import { LoadingForGameSearch } from 'components/loaders/loadingAnimations';
import { BGG_API_SEARCH_BY_NAME, BGG_API_SEARCH_BY_OBJECT_ID } from 'utils/urls';
import { Form, Input, ScreenReaderLabel, Select } from 'styles/Forms';
import styled from 'styled-components/macro';

const BGGData = ({ tempEventInfoForEdit, setTempEventInfoForEdit, editEvent }) => {
  const [searchParameter, setSearchParameter] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.ui.isLoading);

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
          dispatch(events.actions.setSelectedGameWithDataFromAPI(info));

          if (editEvent) {
            if (info.name.length > 1) {
              const nameOfGame = info.name.find((nameGame) => nameGame.primary === 'true');
              gameName = nameOfGame.text;
            } else {
              gameName = info.name.text;
            }
            setTempEventInfoForEdit({ ...tempEventInfoForEdit, game: gameName, image: info.image });
          }
        } else if (data.boardgames.boardgame) {
          info = data.boardgames.boardgame;
          const suggestedGames = info.map((game) => {
            return <option key={game.objectid} value={game.objectid}>{game.name.text}</option>
          });
          setSuggestions(suggestedGames);
        }
      }
    } catch (error) {
      console.error(error.message)
    }
  };

  const textInputSubmit = (event) => {
    event.preventDefault()
    dispatch(ui.actions.setLoading(true))
    fetchData(BGG_API_SEARCH_BY_NAME)
      .finally(() => dispatch(ui.actions.setLoading(false)))
  };

  const selectInputSubmit = (objectId) => {
    dispatch(ui.actions.setLoading(true))
    fetchData(BGG_API_SEARCH_BY_OBJECT_ID, objectId)
      .finally(() => {
        dispatch(ui.actions.setLoading(false))
        setSearchParameter('')
      })
  };
  return (
    <BGGFetchForm onSubmit={textInputSubmit}>
      <InputWrapper>
        <Input
          placeholder={(tempEventInfoForEdit && tempEventInfoForEdit.game) || 'Game'}
          type="text"
          onChange={(event) => setSearchParameter(event.target.value)} />
        {isLoading
          ?
          <LoaderWrapper>
            <LoadingForGameSearch />
          </LoaderWrapper>
          : null}
      </InputWrapper>
      {suggestions.length
        ?
        <>
          <ScreenReaderLabel htmlFor="suggestions">Suggestions based on search</ScreenReaderLabel>
          <GameSelect
            required
            defaultValue=""
            id="suggestions"
            onChange={(event) => selectInputSubmit(event.target.value)}>
            <option value="" disabled>Select game</option>
            {suggestions}
          </GameSelect>
        </>
        : null}
    </BGGFetchForm>
  );
};
export default BGGData;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 2.5rem;
`
const LoaderWrapper = styled.div`
  width: 2rem;
  height: 2rem;
  position: absolute;
  right: 0;
  top: 0.25rem;
`
const GameSelect = styled(Select)`
  position: absolute;
  top: 2.5rem;
`
const BGGFetchForm = styled(Form)`
  width: 12rem;
  position: relative;
`