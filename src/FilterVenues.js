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
    }

    toggleNavListDisplay = () => {
        // update display of FilterVenues based on current state of navListIsOpen
        this.setState((prevState) => ({
            navListIsOpen: !(prevState.navListIsOpen)
        }));
    }

    render () {

        const { query } = this.state;

        return (
            <section>                
                <form>                    
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