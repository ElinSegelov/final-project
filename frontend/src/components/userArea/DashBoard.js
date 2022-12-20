import EventCalender from 'components/EventCalender'
import React from 'react'
import EventSection from './EventSection'

const DashBoard = () => {
  return (
    <section>
      <EventCalender />
      <EventSection />
    </section>
  )
}

export default DashBoard