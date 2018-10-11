import React, { Component } from 'react';
import './App.css';

class App extends Component {

    componentDidMount() {
        this.renderMap()
    }

    renderMap = () => {       
        runScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBsq_UPJt6AeLwo4WtkTt1d9tZD7ozmhoU&callback=initMap")
        window.initMap = this.initMap 
    }

    initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
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


function runScript(url) {
	const body = window.document.querySelector('body');
	const newScript = window.document.createElement('script');
	newScript.src = url;
	newScript.async = true;
	newScript.defer = true;
	body.insertAdjacentElement('beforeend', newScript);
}

export default App;