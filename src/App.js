import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
    state = {
        venues: [],
        markers: []
    }

    componentDidMount() {
        this.getPlacesData()
    }

    renderMap = () => {       
        runScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDwaRNU7cl3-C_nhE0Qjd1RQhM6c438OyA&libraries=places&callback=initMap")
        // provide global variable reference for initMap
        window.initMap = this.initMap 
    }

    getPlacesData = () => {
        const fourSquareLink = 'https://api.foursquare.com/v2/venues/explore?client_id=AHI421MPXJ5XNDPQT5JCLNMDCHIOQDC5RVGFL2R3BHQ21314&client_secret=T2MGDFJXLGG1SBGJ0PEL5EIQCSENNQ21R3GX54HP2BXNDZ2R&v=20180323&ll=39.946,-75.212&query=coffee'
        
        fetch(fourSquareLink)
        .then(response => response.json())
        .then(response => {
            this.setState({
                venues: response.response.groups[0].items
            // execute call to renderMap after async request completes
            }, this.renderMap())
        })
        .catch(error => {
            console.log("There was a problem retrieving data from FourSquare's Places API: " + error);
        })
    }

    initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 39.946, lng: -75.212},
            zoom: 15
        });

        // add markers to the map by iterating over the coffee venues stored in the updated state array
        this.state.venues.map(currentVenue => {
            let marker = new window.google.maps.Marker({
                position:
                    {
                        lat: currentVenue.venue.location.lat,
                        lng: currentVenue.venue.location.lng
                    },
                map: map,
                title: currentVenue.venue.name,
                streetAddress: currentVenue.venue.location.formattedAddress[0],
                areaAddress: currentVenue.venue.location.formattedAddress[1]
            });

            // Add marker into state array
            this.state.markers.push(marker);
        })

    }

    collectInfo = (marker) => {
        let bindToThis = this;
        let placeName = marker.title;
        let placeAddress = marker.streetAddress + ' \n' + marker.areaAddress;
    }

    render() {
        return (
            <main>
                <div id="map"></div>
            </main>
        )
    }
}

function runScript(src) {
	const body = window.document.querySelector('body');
	const script = window.document.createElement('script');
    
    script.src = src;
	script.async = true;
	script.defer = true;
    body.insertAdjacentElement('beforeend', script);
    
    script.onerror = () => (
        document.write('Load error: Google Maps')
    )
}

export default App;