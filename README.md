# Neighborhood Map Project

## Overview

The final project for Udacity's Front End Nanodegree challenged me to leverage all I've learned about front end development to build a single page web application featuring a map of my neighborhood.  Functionality was added to the app to retrieve data about local cafés from the Foursquare API and for providing various ways for the user to navigate this content.


### A Note On My Development Process

With the exception of using Create React App to bootstrap the project, the neighborhood map application was built entirely from scratch.  My abilities in analyzing code, referencing notes and relevant documentation, and transferring this knowledge to actively experiment with and then test the application's required functionality step-by-step were stretched to new levels.


## Running The Project

1. Clone or download this repository
2. Install the project dependencies using `npm install`
3. Run the development server with `npm start`
4. In your browser, navigate to http://localhost:3000 to view a running instance of the application


## Navigating the Application

In the upper-right portion of the map, the user can either choose to navigate through the provided local café locations by clicking on the 'List' button to display an interactive list navigation or entering a search query to filter through the list of available café locations and their corresponding markers on the map.  Selecting a café from the list navigation, highlights that location on the map by causing the marker to animate as well as opening an info window providing additional details for the selected café in the lower-right portion of the map.

Alternatively, the user can also interact with the map and access details for each café by clicking each of the available markers.


## Resources

#### Course Resources

- [Udacity: Front End Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001)

- [Project Spec](https://review.udacity.com/#!/rubrics/1351/view)


#### External Resources

- [React Docs](https://reactjs.org/docs/getting-started.html?no-cache=1)

- [React Docs: Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

- [MDN](https://developer.mozilla.org/en-US/)

- [Foursquare's Places API](https://developer.foursquare.com/places-api)

- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial)

- [Google Fonts](https://fonts.google.com/)

- This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

<hr>

### Possible Improvements to Consider

While working with Foursquare's Places API during an earllier iteration of the project, I realized my app was making a high number of HTTP requests in order to pull data in for each venue as well as load photos into the application's InfoWindow component.  With a high number of HTTP requests being made each time a user accessed a coffe shop's location on the map, the liklihood of the app running slow or losing access to essential venue content under low-connectivity scenarios became a concern.

To counter this, a JSON file was added to the application so that all the essential data for each of the 23 different coffee shops would always be available.  While this solution isn't necessarily scalable, it does ensure the user will always be able to access the name and address details for each café.  The utility of storing content offline could be extended further by using the Service Worker API to store each coffee shop's most popular photo once a successful HTTP request had been made for that venue.  This would not only make more of the app's content available offline, but would also strengthen performance since fewer asynchronous requests would need to be made.

Other usability improvements would also enrich the user's experience. One interesting capability I observed during my research on the Google's Maps API is that the latitude and longitude values of the map can be updated each time a marker is selected thereby centering the render of the map to those coordinates. This action coupled with control over the map's zoom property would make it easier to identify a specific venue when markers are tightly clustered together.

Another obvious improvement to the UX could be achieved with more robust and unique styling to add more identifiable characteristics to the app, however, I'll need to hold off on attempting this until I'm much more confident in my CSS.


#### Looking Ahead
  - Need to try out a Linter tool for React and brush up on how to effectively work with Chrome's debugging tool since misspelling the name of a state object had me dealing with a ridiculous bug for several hours.