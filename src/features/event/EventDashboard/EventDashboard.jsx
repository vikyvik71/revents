import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { connect } from "react-redux";
import { deleteEvent } from "../eventActions";
import LoadingComponent from '../../../app/layout/LoadingComponent';

class EventDashboard extends Component {
       
    handleDeleteEvent = (id) => () => {
      this.props.deleteEvent(id);
    }       
    render() {
        
        const { events, loading } = this.props;
        if(loading) return <LoadingComponent inverted={true} />;

        return <Grid>
            <Grid.Column width={10}>
              <EventList handleDeleteEvent={this.handleDeleteEvent} events={events} />
            </Grid.Column>
            <Grid.Column width={6}>
            </Grid.Column>
          </Grid>;
    }
}

const mapStateToProps = (state) => ({
  events: state.events,
  loading: state.async.loading
});

const actions = {  
  deleteEvent
};

export default connect(mapStateToProps, actions)(EventDashboard);