import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import cuid from 'cuid';

const events = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
]

class EventDashboard extends Component {
    constructor(props) {
      super(props);

      this.state = {
        events: events,
        isOpen: false,
        selectedEvent: null
      }
    }
    onEventOpen = (event) => () => {
      this.setState({
        selectedEvent: event,
        isOpen: true
      })      
    }
    handleUpdateEvent = (event) => {
      const updatedEvents = this.state.events.map((ev) => {
        if(event.id === ev.id) return Object.assign({}, event)
        else return ev
      })
      this.setState({
        events: updatedEvents,
        selectedEvent: null,
        isOpen: false
      })
    }
    handleDeleteEvent = (id) => () => {
      const updatedEvents = this.state.events.filter(ev => ev.id !== id)
      console.log(updatedEvents)
      this.setState({
        events: updatedEvents
      })
    }
    handleOpenForm = () => {
      this.setState({
        isOpen: true,
        selectedEvent: null
      })
    }
    handleCloseForm = () => {
      this.setState({
        isOpen: false
      })
    }
    handleCreateEvent = (newEvent) => {
      newEvent.id = cuid();
      newEvent.hostPhotoURL = '/assets/user.png';
      
      this.setState({
        events: [...this.state.events, newEvent],
        isOpen: false
      })
    }
    render() {
        const { selectedEvent } = this.state;
        return <Grid>
            <Grid.Column width={10}>
              <EventList handleDeleteEvent={this.handleDeleteEvent} onEventOpen={this.onEventOpen} events={this.state.events} />
            </Grid.Column>
            <Grid.Column width={6}>
              <Button positive onClick={this.handleOpenForm} content="Create Event" />
              {this.state.isOpen && <EventForm selectedEvent={selectedEvent} handleCreateEvent={this.handleCreateEvent} handleCloseForm={this.handleCloseForm} handleUpdateEvent={this.handleUpdateEvent} />}
            </Grid.Column>
          </Grid>;
    }
}

export default EventDashboard;