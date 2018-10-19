import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

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

    updateQuery = (query) => {
        // update the visible navigation based on current query state
        this.setState({
            query,
            navListIsOpen: true
        });

        // if query state is empty, close display of navigation list
        if (query === '') {
            this.setState({
                navListIsOpen: false
            });
        }

        // manage list of venues displayed in list based on query state
        this.controlDisplayedVenues(query);
    }

    toggleNavListDisplay = () => {
        // update display of FilterVenues based on current state of navListIsOpen
        this.setState((prevState) => ({
            navListIsOpen: !(prevState.navListIsOpen)
        }));
    }

    controlDisplayedVenues = (query) => {
        // Provide custom object-context access variable for this scope
        let bindToThis = this;
        // initialize mutable container variables for holding filtered list of markers and venues
        let collectedFilteredVenues;
        let collectedFilteredMarkers;

        // when query is truthy (has a value), apply RegExp pattern escapeRegExp for filtering venues
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i');

            // // Add venue to the filtered array if its name matches the query
            collectedFilteredVenues = this.state.filteredVenues.filter(venue =>
                match.test(venue.venue.name)
            );

            // Add marker to the filtered array if its title matches the query
            collectedFilteredMarkers = this.state.filteredMarkers.filter(marker =>
                match.test(marker.title)
            );

            this.setState({
                filteredVenues: collectedFilteredVenues,
                filteredMarkers: collectedFilteredMarkers
            });
        } else {
            this.setState({
                filteredVenues: this.props.venuesList,
                filteredMarkers: this.props.markers
            });
        }

        // update visibility of markers on map according to the filteredMarkers state
        this.props.markers.map(marker => marker.setVisible(false));
        // Delay on JS event loop is necessary for effectively controlling marker visibility
        // relative to user interactions
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
        const query = this.state.query;

        return (
            <section>                
                <form
                    onSubmit={(event) => event.preventDefault()}
                >                    
                    <button
                        onClick={() => this.toggleNavListDisplay()}
                    >
                        List Cafés
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