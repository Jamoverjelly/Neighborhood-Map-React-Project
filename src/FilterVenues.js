import React, { Component } from 'react';
import escapeStrRegex from 'escape-string-regexp';

class FilterVenues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            filteredVenues: [],
            filteredMarkers: [],
            currentVenue: {},
            navListIsOpen: true
        }
    }

    componentDidMount() {
        // Pass the current state of the markers array to our filteredMarkers state via props
        this.setState({
            filteredMarkers: this.props.markers
        });
    }

    render () {
        return (
            // Define filter UI within <section> element
            <section>
                {/* UI will likely be a controlled component <form> */}
                <form>
                    {/* button should toggle navigation list of local cafés */}
                    <button>
                        List Cafés
                    </button>
                    {/* Required text input for filtering café venues */}
                    <input
                        type='text'
                        placeholder='Filter Café Listing...'
                    />                    
                </form>
            {/* List of cafés will be rendered on an unordered list */}
            {
                <ul>
                    {
                        <li>
                            Café Name
                        </li>
                    }
                </ul>
            }
            </section>
        );
    }
}

export default FilterVenues;