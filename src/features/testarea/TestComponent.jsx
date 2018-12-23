import React, { Component } from 'react'
import { connect } from 'react-redux'
import { incrementAsync, decrementAsync } from './testActions'
import { Button } from 'semantic-ui-react'
import { openModal } from '../modals/modalActions';

class TestComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  state = {
    address: "",
    scriptLoaded: false
  };  
  render() {
    const { incrementAsync, decrementAsync, data, loading, openModal } = this.props;

    return (
      <div>
        <h1>TestArea</h1>
        <h3>The answer is: {data}</h3>
        <Button
          loading={loading}
          onClick={incrementAsync}
          color="green"
          content="Increment"
        />
        <Button
          onClick={decrementAsync}
          loading={loading}
          color="red"
          content="Decrement"
        />
        <br />
        <br />
        <Button
          onClick={() => openModal('TestModal', {data: 44})}          
          color="teal"
          content="Open Modal"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    data: state.test.data,
    loading: state.test.loading
})

const actions = {
  incrementAsync,
  decrementAsync,
  openModal
};

export default connect(mapStateToProps, actions)(TestComponent)

// AIzaSyAhY8tXqkjdnjnI58mYsMSvn0z6hjlEVT4