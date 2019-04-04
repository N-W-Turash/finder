## Finder

### Purposes Behind Developing This Web App

Sometimes we just want to have a look at the list of restaurants within a limited range around an area in Dhaka city and get basic information regarding it. This app serves this purpose.

### How to Run/Build the App

If you want to run the app in <b>development mode</b> then execute the follolwing commands from the CMD (git and Node.js need to be installed on your machine for performing these).

```
git clone git@github.com:N-W-Turash/finder.git
cd finder
npm install 
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

If you want to run the app in <b>production mode</b> then do the followings.

* Run the first three commands from the above mentioned four commands.
* Run the command which will build the app for production to the build   folder in the project root
    #### `npm run build`

* Install the serve package globally which provide static server facilities to serve the app in production mode.

    ``` 
    npm install -g serve 
    serve -s build
    ```

### Other Available Scripts


#### `npm test`

Launches the test runner in the interactive watch mode.

#### `npm run eject`

**Note: This is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

### Reasoning Behind Technological and Architectural Choice 

##### React and Redux Based Single Page Application Architecture 

There are mainly three web-based application architecture types according to the roles performed by the server and the client browser.

* Server-side HTML web application</b>

* JS Generation Widgets (AJAX)

* Single Page Application (SPA)

<b>This app is a single page application.</b> A single-page application (SPA) is a web application which can re-renders its content in response to navigation actions (e.g. clicking a link) without making a request to the server to fetch new HTML. It can also communicate with the server to fetch data asynchronously via built in or third party AJAX utility, means without any page refresh. 

There are some key benefits of single page applications (SPA):

* SPA is fast, as most resources (HTML+CSS+Scripts) are only loaded once throughout the lifespan of application. Only data is transmitted back and forth.
* SPAs are easy to debug with Chrome, as you can monitor network operations, investigate page elements and data associated with it.
* It’s easier to make a mobile application because the developer can reuse the same backend code for web application and native mobile application.
* SPA can cache any local storage effectively. An application sends only one request, store all data, then it can use this data and works even offline.

I've used React for developing this app. React is basically an open-source JavaScript library which is used for building user interfaces specifically for single page applications. I have integrated Redux with React. Redux is a predictable state container for JavaScript applications. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. 

React is great, and it’s entirely possible to write a complete application using nothing but React. However, as an application gets more complex, sometimes it’s not as straightforward to use plain old React. Using a state management library like Redux can alleviate some of the issues that crop up in more complex applications.

Some key benefits of using Redux:
* Predictable state updates make it easier to understand how the data flow works in the application
* The use of "pure" reducer functions makes logic easier to test, and enables useful features like "time-travel debugging".
* Centralizing the state makes it easier to implement things like logging changes to the data, or persisting data between page updating and transitions.

React is component and props and state based. Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. Props are how components talk to each other. Props flow downwards from the parent component.

Passing props in this manner can become confusing to trace. It also makes it harder to move components around because there is a coupling between

* The component and its parent
* The component's children that it's passing props to

Redux helps us in these tricky scenarios where multiple components want to share some or all of the same data, but are not closely related to one another. Redux provides a central store that can hold data from anywhere in the application. In Redux, a store is just a JavaScript object with a few methods on it. Redux also allows individual components to be "connected" to the store.

So, keeping this scenario in mind, I've used Redux along with React.

##### Usage of create-react-app

This app has been bootstrapped by the create-react-app package which aims to set up a modern web app by running a command. It uses Webpack, Babel, ESLint, and other amazing projects, but provides a cohesive curated experience on top of them. We don't need to configure anything. A reasonably good configuration of both development and production builds is handled for you so you can focus on writing code.
Yet you can “eject” to a custom setup at any time. Run a single command, and all the configuration and build dependencies will be moved directly into your project, so you can pick up right where you left off (which I have done to enable the dotenv-webpack plugin).

##### Usage of Foursquare Places API

I have used Foursquare places API for getting data of venues with non-commercial/personal usage scheme. Two API endpoints have been used from Foursquare places API. One of them has been used to search for venues which returns a list of venues near the current location as response. Different search terms can be passed as parameters to this API endpoint. The other one has been used to get detailed information regarding a specific venue. 

##### Usage of Pigeon Maps Instead of Google Maps

For displaying the <b>map view</b> of the selected place I have used Pigeon Maps instead of Google Maps. This project aims to provide a performance-first React-centric extendable map engine. This is easy to use, flexible and it uses OpenStreetMap to render the map which is an open source tool. There isn't also any hassle to manage API keys as we would have to manage if GOoogle Maps API were used. 

For more details about Pigeon Maps, visit the github [repo](https://github.com/mariusandra/pigeon-maps).

##### Usage of Axios

I've used a prominent Promise based HTTP client for the browser and node.js name <b>axios</b> to communicate with the Foursquare API endpoints and fetch data. 

##### Other Notable Usages

* <b>bootstrap</b> - For styling the web app and making it responsive.
* <b>react-router-dom</b> - Provides routing functionality to a React app.
* <b>react-redux</b> - Official React binding for Redux. It lets your React components read data from a Redux store, and dispatch actions to the store to update data.
* <b>redux-thunk</b> - Redux middleware for handling async side-effect logic like AJAX requests.
* <b>connected-react-router</b> - A Redux binding for React Router v4.
* <b>prop-types</b> - Runtime type checking for React props and similar objects.
* <b>history</b> - Manage session history with JavaScript.
* <b>react-responsive-modal</b> - A simple responsive react modal compatible with React .
* <b>react-ionicons</b> - Provides ionicons icons as React components.
* <b>flat</b> - Take a nested Javascript object and flatten it.
 

### Trade-offs/Issues/Concerns/Thoughts

* Foursquare uses two forms of authentication: Userless auth and user auth. I have used the userless auth. This is suitable for server side      applications. To make a userless request, I needed to specify my       
  consumer key’s Client ID and Secret instead of an auth token in the request URL.
  So, an API might look like these:

    ```
    https://api.foursquare.com/v2/venues/search?ll=40.7,-74%client_id=CLIENT_ID&client_secret=CLIENT_SECRET&v=YYYYMMDD`
    ```
    As our app is just a client side app I needed to use an HTTP client to send request to the Foursquare places API directly from the app which means the client ID and client secret is visible as they're used as  parameters. So, both of them are visible to anyone. Yet I have kept them in a .env file to create a perception of better practise. For that I needed to use a webpack plugin called <b>dotenv-webpack</b> and for enabling that plugin I ejected the configuration related files of this project. If I got more time, I could have create a backend for the app. 
    <br><br>



