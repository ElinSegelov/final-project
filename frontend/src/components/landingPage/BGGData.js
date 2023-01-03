/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const BGGData = () => {
  const [searchParameter, setSearchParameter] = useState('')
  const [objectid, setObjectid] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const BGGEndpoint = 'https://boardgamegeek.com/xmlapi/search?search='
  // const var1 = `https://boardgamegeek.com/xmlapi/search?search=${searchParameter}`
  // const var2 = `https://boardgamegeek.com/xmlapi/boardgame/${objectid}`
  const var1 = 'https://boardgamegeek.com/xmlapi/search?search='
  const var2 = 'https://boardgamegeek.com/xmlapi/boardgame/'

  // let suggestions;
  const fetchData = async (endpoint, newParam) => {
    const URL = `https://api.factmaven.com/xml-to-json/?xml=${endpoint}${searchParameter || newParam}`;
    let info;
    try {
      const response = await fetch(URL);
      const data = await response.json();
      console.log('fetched date', data)
      // anpassa beroende på vilken endpoint vi anropar.
      if (data) {
        if (data.boardgame) {
          console.log('if statement')
          info = data.boardgame
          console.log(info)
        } else if (data.boardgames.boardgame) {
          console.log('else if statement')
          info = data.boardgames.boardgame;
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
    fetchData(var1)
    setSearchParameter('')
  }

  // ny fetch görst innan searchParameter är uppdaterarad. Är det möjligt att lösa detta med hjälp
  // av en thunk
  const selectInputSubmit = (temp) => {
    const newParam = temp // får den nya state
    setSearchParameter(newParam) // assign nya state till searchParameter
    console.log('temp', newParam) // Vissar rätt
    console.log('searchParameter', searchParameter) // Nu är den tomt
    fetchData(var2, newParam) // Sckickar 2 params
  }

  return (
    <>
      <form onSubmit={textInputSubmit}>
        <input type="text" onChange={(event) => setSearchParameter(event.target.value)} />
      </form>
      {suggestions.length
        ? <form>Suggestions:
          <GameSelect onChange={(event) => selectInputSubmit(event.target.value)}>
            {suggestions}
          </GameSelect>
          {/* <button type="submit">Submit</button> */}
        </form>
        : null}
    </>

  )
}
export default BGGData;

const GameSelect = styled.select`
  width: 90vw;
`