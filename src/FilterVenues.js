import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

import * as coffeeVenues from './coffeeVenues.json';

class FilterVenues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            filteredVenues: coffeeVenues.default,
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

    updateQuery = (query) => {
        // Update the visible navigation based on current query state
        this.setState({
            query,
            navListIsOpen: true
        });

        // If query state is empty, close display of navigation list
        if (query === '') {
            this.setState({
                navListIsOpen: false
            });
        }
    }

    toggleNavListDisplay = () => {
        // update display of FilterVenues based on current state of navListIsOpen
        this.setState((prevState) => ({
            navListIsOpen: !(prevState.navListIsOpen)
        }));
    }

    controlDisplayedVenues = (query) => {
        // Provide custom object-context variable to access this scope
        let bindToThis = this;
        // Initialize mutable container variables for holding filtered list of markers and venues
        let collectedFilteredVenues;
        let collectedFilteredMarkers;

        // When query is truthy (has a value), apply RegExp pattern escapeRegExp for filtering venues
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i');

            // Add venue to the filtered array if its name matches the query
            collectedFilteredVenues = this.props.venuesList.filter(venue =>
                match.test(venue.title)
            );

            // Add marker to the filtered array if its title matches the query
            collectedFilteredMarkers = this.props.markers.filter(marker =>
                match.test(marker.title)
            );
            
            // Update state with filtered venue and marker collections
            this.setState({
                filteredVenues: collectedFilteredVenues,
                filteredMarkers: collectedFilteredMarkers
            });
        } else {
            // When query is falsy, update venue and marker state with the default collections via props 
            this.setState({
                filteredVenues: this.props.venuesList,
                filteredMarkers: this.props.markers
            });
        }

        // Update visibility of markers on map according to the filteredMarkers state
        this.props.markers.map(marker => marker.setVisible(false));
        
        /* Delay on JS event loop is necessary for effectively controlling marker visibility
        relative to user interactions */
        setTimeout(function () {
            bindToThis.props.markers.map(marker =>
                bindToThis.controlMarkerVisibility(marker))
        }, 0)
    }
    
    controlMarkerVisibility = (marker) => {
        // matching markers from filteredMarkers array should be visible
        this.state.filteredMarkers.map(filteredMarker => {
            if (filteredMarker.id === marker.id) {
                marker.setVisible(true)
            }
        });
    }

    render () {

        const { query } = this.state;

        return (
            <section>                
                <form
                    onSubmit={(event) => event.preventDefault()}
                >                    
                    <button
                        onClick={() => this.toggleNavListDisplay()}
                    >
                        List
                    </button>
                    <input
                        type='text'
                        placeholder='Filter Café Listing...'
                        value={query}
						onChange={(event) => 
							this.updateQuery(event.target.value)}
                    />                    
                </form>
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