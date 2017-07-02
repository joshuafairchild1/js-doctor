## Doctor Finder

##### By **Joshua Fairchild, June 30, 2017**

## Description

This application allows the user to enter a medical issue that they are having, as well as their location, and they will be given a list of doctors in their area who would be able to treat them. Both the Google Maps API and the BetterDoctor API are used to gather the results and display information to the user about their search. Google Maps API is used to convert the user's address/zipcode into longitude and latitude, which can then be used (along with the user's ailment) to query the BetterDoctor API for a list of doctors. The user is then displayed a Google Map, with markers dropped on the addresses of all of the doctors found by the BetterDoctor API. The markers can then be clicked to see information about each doctor from within the Google Map.

## Installation Requirements

* You must install or have installed a current version of:

  * [Node and npm](https://nodejs.org/en/)

## Setup

* Clone this repository

  `git clone https://github.com/joshuafairchild1/js-doctor`


* Run the following commands from the root directory:

  `$ npm install`

  `$ bower install`

  This will link the project's dependencies

* In the root directory, create a file named `.env`, this is where your API key(s) will be stored. **Be sure to add this to your .gitignore file to keep your API keys private**. Instructions for obtaining your BetterDoctor API key can be found [here](https://developer.betterdoctor.com/).

* Add the following code to your `.env` file:

  ```
  exports.apiKey = 'YOUR_API_KEY_HERE'
  ```


* Run the command `$ gulp serve` to start the development server. The command `$ gulp serve --production` will start the production server.


## Technologies Used

* JavaScript + jQuery
* [BetterDoctor API](https://developer.betterdoctor.com/)
* [Google Maps API](https://developers.google.com/maps/)
* Node/npm
* Gulp
* Sass + Bootstrap
* Bower

## Known Bugs

* None

## License

This project is licensed under the MIT License

**Joshua Fairchild Copyright (c) 2017**
