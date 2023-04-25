import EventsItem from './Events'

function EventsView(props) {
  return (
    <div>
      <ul>
        {props.eventList.map(Events => <EventsItem Events={Events} />)}
      </ul>
    </div>
  )
}

export default EventsView