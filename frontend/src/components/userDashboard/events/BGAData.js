/* eslint-disable quote-props */
/* eslint-disable indent */
/* eslint-disable operator-linebreak */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import events from 'reducers/events';
import ui from 'reducers/ui';
import { LoadingForGameSearch } from 'components/loaders/loadingAnimations';
import { URL_BGA_ENDPOINT } from 'utils/urls'
import styled from 'styled-components/macro';
import { Input, ScreenReaderLabel, Select } from 'styles/Forms';
import axios from 'axios';

const BGAData = ({ tempEventInfoForEdit, setTempEventInfoForEdit }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [gameInfo, setGameInfo] = useState({});
  const dispatch = useDispatch();
  const userInfo = useSelector((store) => store.user.userInfo);
  const isLoading = useSelector((store) => store.ui.isLoading);
  let response;
  let baseGames;

  const handleSearchInputChange = async (event) => {
    const searchParameter = event.target.value;

    if (searchParameter.length > 2) {
      dispatch(ui.actions.setLoading(true));

      try {
        const options = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': userInfo.accessToken
          }
        }
        const data = JSON.stringify({ searchParameter });
        response = await axios.post(URL_BGA_ENDPOINT, data, options);
        baseGames = response.data.response;
      } catch (error) {
        console.warn(error.message)
      }

      if (response) {
          setGameInfo(baseGames)
          const suggestedGames = baseGames.map((game) => {
            return <option key={game.id} value={game.id}>{game.name}</option>
          });
          setSuggestions(suggestedGames);
      }
      dispatch(ui.actions.setLoading(false));
    }
  };

  const handleGameSelect = (event) => {
    const selectedGame = gameInfo.find((game) => game.id === event.target.value);
    dispatch(events.actions.setSelectedGameWithDataFromAPI(selectedGame));

      setTempEventInfoForEdit(
        { ...tempEventInfoForEdit,
        game: selectedGame.name,
        image: selectedGame.image_url }
      );
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
          : false}
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
        : false}
    </GameInfoLegend>
  );
};

export default BGAData;

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
