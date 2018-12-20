import React, { Component } from 'react';
import HomePage from '../../features/home/HomePage';
import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage';
import EventForm from "../../features/event/EventForm/EventForm";
import UserDetailedPage from "../../features/user/UserDetailed/UserDetailedPage";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import NavBar from '../../features/nav/NavBar/NavBar';
import PeopleDashboard from "../../features/user/PeopleDashboard/PeopleDashboard";
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import TestComponent from '../../features/testarea/TestComponent';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/" component={HomePage} exact />
        </Switch>

        <Route path="/(.+)" render={() => (
          <React.Fragment>
              <NavBar />
              <Container className="main">
                <Switch>
                  <Route path="/events" component={EventDashboard} />
                  <Route path="/event/:id" component={EventDetailedPage} />
                  <Route path="/createEvent" component={EventForm} />
                  <Route path="/people" component={PeopleDashboard} />
                  <Route path="/profile/:id" component={UserDetailedPage} />
                  <Route path="/settings" component={SettingsDashboard} />
                  <Route path="/test" component={TestComponent} />
                </Switch>
              </Container>
            </React.Fragment>
          )} />
      </React.Fragment>
    );
  }
}

export default App;