/* eslint-disable indent */
/* eslint-disable operator-linebreak */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import events from 'reducers/events';
import ui from 'reducers/ui';
import { LoadingForGameSearch } from 'components/loaders/loadingAnimations';
import { BGA_API } from 'utils/urlForBGA'
import styled from 'styled-components/macro';
import { Input, ScreenReaderLabel, Select } from 'styles/Forms';
import axios from 'axios';

const BGGData = ({ tempEventInfoForEdit, setTempEventInfoForEdit, editEvent }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [gameInfo, setGameInfo] = useState({});
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.ui.isLoading);
  let info;
  let cancelToken;
  let response;

  const handleSearchInputChange = async (event) => {
    const { value } = event.target;

    if (value.length > 2) {
      dispatch(ui.actions.setLoading(true));

      if (cancelToken) {
        cancelToken.cancel('Fetch cancelled due to new request');
      }

      cancelToken = axios.CancelToken.source();
      try {
        response = await axios.get(
          BGA_API(`${value}`),
          { cancelToken: cancelToken.token }
        );
      } catch (error) {
        console.warn(error.message)
      }

      if (response) {
        // !kan data komma utan field 'games'?
        if (response.data.games) {
          info = response.data.games;
          const baseGames = info.filter((game) => game.type === 'game')

          setGameInfo(response.data.games)
          const suggestedGames = baseGames.map((game) => {
            return <option key={game.id} value={game.id}>{game.name}</option>
          });
          setSuggestions(suggestedGames);
        }
      }
      dispatch(ui.actions.setLoading(false));
    }
  };

  const handleGameSelect = (event) => {
    const selectedGame = gameInfo.find((game) => game.id === event.target.value);
    dispatch(events.actions.setSelectedGameWithDataFromAPI(selectedGame));

    if (editEvent) {
      setTempEventInfoForEdit(
        { ...tempEventInfoForEdit,
        game: selectedGame.name,
        image: selectedGame.image_url }
      );
    }
  };

  return (
    <GameInfoLegend>
      <InputWrapper>
        <Input
          placeholder={(tempEventInfoForEdit && tempEventInfoForEdit.game) || 'Search for game'}
          type="text"
          onChange={handleSearchInputChange} />
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
            defaultValue=""
            id="suggestions"
            onChange={handleGameSelect}>
            <option value="" disabled>Select game</option>
            {suggestions}
          </GameSelect>
        </>
        : null}
    </GameInfoLegend>
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
const GameInfoLegend = styled.legend`
  position: relative;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  width: 12rem;
`
