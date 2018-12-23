import React, { Component } from 'react';
import { Form, Label } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlaceAutocomplete from 'react-places-autocomplete';

class PlaceInput extends Component {
    state = {
        scriptLoaded: false
    }
    handleScriptLoad = () => this.setState({ scriptLoaded: true })    
    render() {
        const { input, width, onSelect, placeholder, options, meta: { touched, error} } = this.props
        return (
            <Form.Field error={touched && !!error} width={width}>
                <Script
                    url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAhY8tXqkjdnjnI58mYsMSvn0z6hjlEVT4&libraries=places"
                    onLoad={this.handleScriptLoad}
                />
                {
                    this.state.scriptLoaded &&
                    <PlaceAutocomplete
                        inputProps={{ ...input, placeholder }}
                        options={options}
                        onSelect={onSelect}
                        styles={{ autocompleteContainer : { zIndex: 1000 }}}
                    />
                }                
                {(touched && error) && <Label basic color='red'>{error}</Label>}
            </Form.Field>  
        )
    }
}

export default PlaceInput;