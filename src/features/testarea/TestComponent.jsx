import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increment, decrement } from './testActions'
import { Button } from 'semantic-ui-react'

class TestComponent extends Component {
  render() {
    
    const { increment, decrement, data } = this.props;

    return <div>
        <h1>TestArea</h1>
        <h3>The answer is: {data}</h3>
        <Button onClick={increment} color="green" content="Increment" />
        <Button onClick={decrement} color="red" content="Decrement" />
      </div>;
  }
}

const mapStateToProps = (state) => ({
    data: state.test.data
})

const actions = {
  increment,
  decrement
}

export default connect(mapStateToProps, actions)(TestComponent)