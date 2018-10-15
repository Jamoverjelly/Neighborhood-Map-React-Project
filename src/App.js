import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
    state = {
        venues: []
    }

    componentDidMount() {
        this.getPlacesData()
        this.renderMap()
    }

    renderMap = () => {       
        runScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDwaRNU7cl3-C_nhE0Qjd1RQhM6c438OyA&libraries=places&callback=initMap")
        // provide global variable reference for initMap
        window.initMap = this.initMap 
    }

    getPlacesData = () => {
        const fourSquareLink = 'https://api.foursquare.com/v2/venues/explore?client_id=AHI421MPXJ5XNDPQT5JCLNMDCHIOQDC5RVGFL2R3BHQ21314&client_secret=T2MGDFJXLGG1SBGJ0PEL5EIQCSENNQ21R3GX54HP2BXNDZ2R&v=20180323&ll=39.946,-75.212&query=coffee'
        
        axios.get(fourSquareLink)
        .then(response => {
            this.setState({
                venues: response.data.response.groups[0].items
            })
        })
        .catch(error => {
            console.log("There was a problem retrieving data from FourSquare's Places API: " + error);
        })
    }

    initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 39.946, lng: -75.212},
            zoom: 14
        });
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