/* global google */
import React, { Component } from 'react'
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { createEvent, updateEvent } from "../eventActions";
import cuid from 'cuid';
import { reduxForm, Field } from "redux-form";
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from "revalidate";
import DateInput from '../../../app/common/form/DateInput';
import moment from 'moment';
import PlaceInput from '../../../app/common/form/PlaceInput';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Script from 'react-load-script';

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

const validate = combineValidators({
  title: isRequired({ message: "The title is a required field" }),
  category: isRequired({ message: "The category is a required field" }),
  description: composeValidators(
    isRequired({ message: "Please enter a description" }),
    hasLengthGreaterThan(4)({ message: "Please enter at least 5 characters" })
  )(),
  city: isRequired({ message: "City is a required field" }),
  venue: isRequired({ message: "Venue is a required field" }),
  date: isRequired({ message: "Date is a required field" })
});

class EventForm extends Component {  
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }
  handleCitySelect = (selectedCity) => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => this.setState({ cityLatLng: latlng}))
      .then(() => this.props.change('city', selectedCity))
  }
  handleVenueSelect = (selectedVenue) => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => this.setState({ venueLatLng: latlng }))
      .then(() => this.props.change("venue", selectedVenue));
  }
  onFormSubmit = (values) => {
    
    values.date = moment(values.date).format();
    values.venueLatLng = this.state.venueLatLng;

    if(this.props.initialValues.id) {
      this.props.updateEvent(values);    
      this.props.history.goBack();
    } else {
      const newEvent = {...values, id: cuid(), hostPhotoURL: '/assets/user.png', hostedBy: 'Bob'};
      this.props.createEvent(newEvent);
      this.props.history.push('/events');    
    }    
  }  
  handleScriptLoad = () => this.setState({ scriptLoaded: true }) 
  render() {  

    const { invalid, pristine, submitting } = this.props;

    return (
      
      <Grid>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAhY8tXqkjdnjnI58mYsMSvn0z6hjlEVT4&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field name="title" component={TextInput} type="text" placeholder="Give event a name" />
              <Field name="category" placeholder="What is your event about" options={category} component={SelectInput} type="text" />
              <Field name="description" component={TextArea} rows={3} type="text" placeholder="Tell us about your event" />
              <Header sub color="teal" content="Event Location Details" />
              <Field 
                name="city" 
                component={PlaceInput} 
                options={{types: ['(cities)']}} 
                type="text" 
                placeholder="Event City" 
                onSelect={this.handleCitySelect}
              />

              {
                this.state.scriptLoaded &&
                <Field
                  name="venue"
                  component={PlaceInput}
                  type="text"
                  options={{
                    location: new google.maps.LatLng(this.state.cityLatLng),
                    radius: 1000,
                    types: ['establishment']
                  }}
                  placeholder="Event Venue"
                  onSelect={this.handleVenueSelect}
                />
              }
              
              <Field name="date" dateFormat='YYYY-MM-DD HH:mm' showTimeSelect timeFormat='HH:mm' component={DateInput} placeholder="Event Date" />
              <Button positive type="submit" disabled={invalid || submitting || pristine}>
                Submit
              </Button>
              <Button type="button" onClick={this.props.history.goBack}>
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0]
  }

  return {
    initialValues: event
  }
}

const actions = {
  createEvent,
  updateEvent
}

export default connect(mapStateToProps, actions)(reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(EventForm));