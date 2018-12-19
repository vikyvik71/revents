import React, { Component } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'

const initialEvent = {
  event: {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  }
};

class EventForm extends Component {
  constructor(props) {
    super(props);

    this.state = initialEvent;
  }
  componentDidMount = () => {
    if(this.props.selectedEvent) {
      this.setState({
        event: this.props.selectedEvent
      })
    }
  }
  componentWillReceiveProps = (next) => {
    const selEvent = this.props.selectedEvent;
   if(next.selectedEvent !== selEvent) {
     this.setState({ event: next.selectedEvent || initialEvent });
   } 
  }
  onFormSubmit = (e) => {
    e.preventDefault();

    if(this.state.event.id) {
      this.props.handleUpdateEvent(this.state.event);    
    } else {
      this.props.handleCreateEvent(this.state.event);    
    }    
  }
  onInputChange = (e) => {
    
    const newEvent = JSON.parse(JSON.stringify(this.state.event));
    newEvent[e.target.name] = e.target.value;
    
    this.setState({
      event: newEvent
    })
    
  }
  render() {
    
    const { handleCloseForm } = this.props;
    const { event } = this.state;

    return <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input name="title" placeholder="Event Title" value={event.title} onChange={this.onInputChange} />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
          <input type="date" name="date" placeholder="Event Date" value={event.date} onChange={this.onInputChange} />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input placeholder="City event is taking place" name="city" value={event.city} onChange={this.onInputChange} />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input placeholder="Enter the Venue of the event" name="venue" value={event.venue} onChange={this.onInputChange} />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input placeholder="Enter the name of person hosting" name="hostedBy" value={event.hostedBy} onChange={this.onInputChange} />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button type="button" onClick={handleCloseForm}>
            Cancel
          </Button>
        </Form>
      </Segment>;
  }
}

export default EventForm;