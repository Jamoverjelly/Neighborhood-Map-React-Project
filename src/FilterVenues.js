import React, { Component } from 'react';
import escapeStrRegex from 'escape-string-regexp';

class FilterVenues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            filteredVenues: [],
            currentVenue: {},
            navListIsOpen: true
        }
    }

    componentDidMount() {}
}

export default FilterVenues;