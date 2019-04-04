# Changelog
All notable changes to this project will be documented in this file.

# v1.0.0 - 2019-04-04
### Added
- Wrote ErrorDisplay component for displaying error messages.
### Fixed
- Fixed react-select menu z-index problem.

## v1.0.0 - 2019-03-29
### Added
- Now users can see the retrieved venues within a carousel.
### Removed
- Removed the random selection feature.

## v0.0.2 - 2019-03-26
### Added
- A generic feature has been developed, now a user can pick a location up from the 
dropdown menu and run a search for nearby venues within a range of 5km.
- Now the users can see the distance of the venues within the radius of the search areas.

## v0.0.2 - 2019-03-19
### Added
- Added Animated component from 'react-animated-css' lib to animate components.
### Removed
- Removed RouterComponent component and routerList helper.
### Changed
- Routes are now placed at App component. Route level code splitting done by 
  the '@loadable/component' lib recommended by the React team.

## v0.0.2 - 2019-03-15
### Added
- Added ListView, Listitem components.
- Added husky lint-staged prettier package for automatic code formatting.
- Added .editorconfig file for consistent coding styles.
- Enabled debugger inside the editor (vscode).
- Added react-styleguidist for developing components in isolation. 
- Added Loading component.
- Added ListView component as a child component to Searchedvenue component.
### Changed
- CSS modifications of different components.


## v0.0.2 - 2019-03-12
### Added
- Started writing to CHANGELOG.md file to keep record of the changes.
- A new command named 'analyze' has been added in the scripts of the package.json which uses the source-map-explorer package to analyze the bundle size in production and show details of it visually.
### Changed
- Wrapped the NotFound container by withRouter HOC from 'react-router-dom' to fix an unusual behavior related with the browser back button.

## v0.0.2 - 2019-03-09
### Added
- Added router.test.js file to test the router component using jest and enzyme. 
- Added routerList helper where all the route components get imported and placed in the array. Both the App component and router.test.js file is imporitng the array from here. 
- Added context to Home container

## v0.0.1 - 2019-03-04
- Got done with the submission as assignment.
