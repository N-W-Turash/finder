## Team Party Restaurant Finder

#### Purposes behind developing this web app

Each team at Monstar Lab Bangladesh have a team party every month, every team goes out and has lunch together to strengthen team bonding. But they always find it difficult to choose a restaurant. This web app intends to solve this problem by offering some handy feratures. Like, the app can select a restaurant randomly from a list of nearby restaurants. Upon successful selection, the web app will display information regarding the selected restaurant and it will also display the map view of that selected place. Apart from that, users can search for an appropriate restaurant based on keywords regarding restaurant's name, location and category.  

#### How to run/build the app

If you want to run the app in <b>development mode</b> then execute the follolwing commands from the CMD (git and Node.js need to be installed on your machine for performing these).

```
git clone git@github.com:N-W-Turash/team-party-restaurant-finder.git
cd team-party-restaurant-finder
npm install 
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

If you want to run the app in <b>production mode</b> then do the followings.

* Run the first three commands from the above mentioned four commands.
* Run the command which will build the app for production to the build   folder in the project root. 
    `npm run build`

* Install the serve package globally which provide static server facilities to serve the app in production mode.

    ``` 
    npm install -g serve 
    serve -s build
    ```

#### Other available scripts

#### `npm test`

Launches the test runner in the interactive watch mode.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.