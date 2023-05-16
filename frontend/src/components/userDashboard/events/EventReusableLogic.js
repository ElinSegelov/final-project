/* eslint-disable react/jsx-indent-props */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import events from 'reducers/events';
import { useDispatch, useSelector } from 'react-redux';
import { InnerWrapper } from 'styles/Containers';
import EditEvent from './EditEvent';
import CreateEvent from './CreateEvent';

const EventReusableLogic = ({ setCreateEvent, editEvent, setEditEvent }) => {
  const selectedEventForEdit = useSelector((store) => store.events.selectedEventForEdit);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editEvent) {
      dispatch(events.actions.setTempEventInfoForEdit(selectedEventForEdit));
    }
  }, [selectedEventForEdit, editEvent]);

  return (
    <InnerWrapper>
      {editEvent
        ? <EditEvent
          setEditEvent={setEditEvent}
          editEvent={editEvent} />
        : <CreateEvent
          setCreateEvent={setCreateEvent} />}
    </InnerWrapper>
  );
};

export default EventReusableLogic;
