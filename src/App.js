import React, { Component } from 'react';
import './App.css';

import * as coffeeVenues from './coffeeVenues.json';
import FilterVenues from './filterVenues';
import InfoWindow from './infoWindow';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            venues: coffeeVenues.default,
            markers: [],
            currentMarker: {},
            infoWindowIsOpen: false,
            photoContent: ''
        }
    }

    componentDidMount() {
        // provide global variable reference for initMap
        window.initMap = this.initMap;
        runScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDwaRNU7cl3-C_nhE0Qjd1RQhM6c438OyA&callback=initMap");
    }

    initMap = () => {
        // Set up custom object-context for access to this scope
        let bindToThis = this;
        // Get state variables into scope
        const { venues, markers } = this.state;

        // Declare map object
        let map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 39.946, lng: -75.212},
            zoom: 15
        });

        // Create a new marker for each venue in the coffeeVenues.json file
        for (let i = 0; i < venues.length; i++) {
            // Define a value for each property
            let position = venues[i].position;
            let title = venues[i].title;
            let streetAddress = venues[i].streetAddress;
            let municipalAddress = venues[i].municipalAddress;
            let id = venues[i].key;
      
            // Create the marker
            let marker = new window.google.maps.Marker({
              map: map,
              position: position,
              title: title,
              streetAddress: streetAddress,
              municipalAddress: municipalAddress,
              animation: window.google.maps.Animation.DROP,
              id: id
            });

            // Update the markers collection state with new marker
            markers.push(marker);

            // When a marker is clicked, open the InfoWindow
            marker.addListener('click', function () {
                bindToThis.openInfoWindow(marker);
            });
        }

        // Listen for clicks on map to close InfoWindow
        map.addListener('click', function () {
            bindToThis.closeInfoWindow();
        });
    }

    openInfoWindow = (marker) => {
        // Open InfoWindow and set marker data to pass to InfoWindow component
        this.setState({
          infoWindowIsOpen: true,
          currentMarker: marker
        });

        this.getVenuePhoto(marker);
    }
    
    closeInfoWindow = () => {
        // Close InfoWindow and reset currentMarker
        this.setState({
            infoWindowIsOpen: false,
            currentMarker: {}
        });
    }

    getVenuePhoto = (marker) => {
        // Provide custom object-context variable to access this scope
        let bindToThis = this;
        let photoUrl = `https://api.foursquare.com/v2/venues/${marker.id}/photos?client_id=AHI421MPXJ5XNDPQT5JCLNMDCHIOQDC5RVGFL2R3BHQ21314&client_secret=T2MGDFJXLGG1SBGJ0PEL5EIQCSENNQ21R3GX54HP2BXNDZ2R&v=20180323`

        // Fetch photos response object from the FourSquare API using Fetch
        fetch(photoUrl)
        .then(response => response.json())
        .then(response => {
            let photoPrefix = response.response.photos.items[0].prefix;
            let photoSuffix = response.response.photos.items[0].suffix;
            let photoSrc = `${photoPrefix}150x150${photoSuffix}`
            
            // Add the retrieved photo for this venue into the state
            bindToThis.setState({
                photoContent: photoSrc
            });
        })
        // If there's an error with the HTTP request, handle it
        .catch(error => {
            let errorReport = 'Failed to parse image data ' + error;
            bindToThis.setState({
                photoContent: errorReport
            });
        })
    }

    render() {
        return (
            <main className="App">
                <FilterVenues
                    venuesList={this.state.venues}
                    markers={this.state.markers}
                    openInfoWindow={this.openInfoWindow}
                />

                {
                    this.state.infoWindowIsOpen &&
                    <InfoWindow
                        currentMarker={this.state.currentMarker}
                        photoContent={this.state.photoContent}
                    />
                }
            
                <div id="map"></div>
            </main>
        );
    }
}

export default App;

function runScript(src) {
	const body = window.document.querySelector('body');
	const script = window.document.createElement('script');
    
    script.src = src;
	script.async = true;
	script.defer = true;
    body.insertAdjacentElement('beforeend', script);
    
    script.onerror = () => (
        document.write('Failed to load Google Maps')
    )
}