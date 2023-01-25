/* eslint-disable react/jsx-indent-props */
/* eslint-disable quote-props */
import React, { useEffect, useState } from 'react';
import events from 'reducers/events';
import user from 'reducers/user'
import { batch, useDispatch, useSelector } from 'react-redux';
import { swalInformation } from 'utils/sweetAlerts';
import { API_URL } from 'utils/urls';
import { InnerWrapper } from 'styles/Containers';
import EditEvent from './EditEvent';
import CreateEvent from './CreateEvent';

const EventReusableLogic = ({ handleEvent, setHandleEvent, editEvent, setEditEvent }) => {
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTime, setEventTime] = useState('');
  const [venue, setVenue] = useState('');
  const [openSpots, setOpenSpots] = useState('');
  const [totalSpots, setTotalSpots] = useState('');
  const [description, setDescription] = useState('');
  const [tempEventInfoForEdit, setTempEventInfoForEdit] = useState({});
  const [county, setCounty] = useState('');
  const userInfo = useSelector((store) => store.user.userInfo);
  const selectedGame = useSelector((store) => store.events.selectedGameWithDataFromAPI);
  const selectedEventForEdit = useSelector((store) => store.events.selectedEventForEdit);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editEvent) {
      setTempEventInfoForEdit(selectedEventForEdit);
    }
  }, [selectedEventForEdit, editEvent]);

  const handleDateSelection = (date) => {
    setEventDate(date);
  };

  const handleEventValidation = (success) => {
    if (selectedEventForEdit === tempEventInfoForEdit) {
      swalInformation('No changes were made', '', 'warning', 2000)
    } else if (editEvent && success) {
      swalInformation('Your event has been updated!', '', 'success', 2000)
      setEditEvent(false)
    } else if (handleEvent) {
      swalInformation('Your event has been created!', '', 'success', 2000)
      setHandleEvent(false)
    } else {
      swalInformation('Your event has been created!', '', 'success', 2000)
      setHandleEvent(false)
      setEditEvent(false)
    }
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
<<<<<<< Updated upstream
    if (!gameName) {
      swalInformation('Please, search for game and select one from the dropdown', '', 'warning', 2900)
    } else if (editEvent) {
=======
    if (editEvent) {
>>>>>>> Stashed changes
      if (selectedEventForEdit !== tempEventInfoForEdit) {
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': userInfo.accessToken
          },
          body: JSON.stringify(
            tempEventInfoForEdit
          )
        }
        fetch(API_URL('event'), options)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              batch(() => {
                dispatch(user.actions.changeToHostingEvents(data.response.hostingEvents));
                dispatch(events.actions.setError(null));
                handleEventValidation(data.success);
              })
              dispatch(events.actions.setSelectedGameWithDataFromAPI({}))
            } else {
              batch(() => {
                dispatch(events.actions.setError(data.response));
                handleEventValidation(data.success);
              })
            }
          })
          .catch((error) => console.error(error.stack));
      } else {
        handleEventValidation();
      }
<<<<<<< Updated upstream
    } else {
      // The games sometimes have several titles. We check if there are more than one title, if so,
      // we find the primary one.
      if (selectedGame.name.length > 1) {
        const nameOfGame = selectedGame.name.find((nameGame) => nameGame.primary === 'true');
        gameName = nameOfGame.text;
      } else {
        gameName = selectedGame.name.text;
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': userInfo.accessToken
        },
        body: JSON.stringify({
          hostId: userInfo.userId,
          host: userInfo.username,
          eventDate: eventDate.toISOString(),
          eventTime,
          venue,
          county,
          game: gameName,
          openSpots,
          totalSpots,
          description,
          image: selectedGame.image
        })
      };
      fetch(API_URL('event'), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            batch(() => {
              dispatch(user.actions.changeToHostingEvents(data.response.hostingEvents));
              dispatch(events.actions.setError(null));
              handleEventValidation(data.success);
            })
            dispatch(events.actions.setSelectedGameWithDataFromAPI({}))
          } else {
            batch(() => {
              dispatch(events.actions.setError(data.response));
              handleEventValidation(data.success);
            })
          }
        })
        .catch((err) => {
          console.error(err.stack);
          handleEventValidation();
        });
=======
>>>>>>> Stashed changes
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': userInfo.accessToken
      },
      body: JSON.stringify({
        hostId: userInfo.userId,
        host: userInfo.username,
        eventDate: eventDate.toISOString(),
        eventTime,
        venue,
        county,
        game: selectedGame.name,
        openSpots,
        totalSpots,
        description,
        image: selectedGame.image_url
      })
    };

    fetch(API_URL('event'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.changeToHostingEvents(data.response.hostingEvents));
            dispatch(events.actions.setError(null));
            handleEventValidation(data.success);
          })
        } else {
          batch(() => {
            dispatch(events.actions.setError(data.response));
            handleEventValidation(data.success);
          })
        }
      })
      .catch((err) => {
        console.error(err.stack);
      });
  };

  return (
    <InnerWrapper>
      {editEvent
        ? <EditEvent
          setEditEvent={setEditEvent}
          editEvent={editEvent}
          eventDate={eventDate}
          setCounty={setCounty}
          setTempEventInfoForEdit={setTempEventInfoForEdit}
          tempEventInfoForEdit={tempEventInfoForEdit}
          onFormSubmit={onFormSubmit} />
        : <CreateEvent
          setHandleEvent={setHandleEvent}
          totalSpots={totalSpots}
          eventDate={eventDate}
          setEventTime={setEventTime}
          setVenue={setVenue}
          setCounty={setCounty}
          setOpenSpots={setOpenSpots}
          setTotalSpots={setTotalSpots}
          setDescription={setDescription}
          handleDateSelection={handleDateSelection}
          onFormSubmit={onFormSubmit} />}
    </InnerWrapper>
  );
};

export default EventReusableLogic;
