<p>
  <img src="https://img.shields.io/badge/react-v17.0.2-ff69b4">&emsp;
  <img src="https://img.shields.io/badge/express-v4.17.1-orange">&emsp;
  <img src="https://img.shields.io/badge/JavaScript-89.2%25-informational">&emsp;
  <img src="https://img.shields.io/badge/database-mongodb-green">&emsp;
  <img src="https://img.shields.io/badge/build-passing-brightgreen">&emsp;
</p>

# Movie-Browser

## About
Movie Browser is a minimalistic web app that displays information on different movies. It provides a list of latest and upcoming movies based on the user's genre preferences, presented on a smooth carousel.

The user is required to signup/login to use Movie Browser. The user's credentials and preferences are stored in a database (MongoDB Atlas) and are loaded into the app on login.

## Packages
This is a full MERN Stack app. The major tools & technologies used are:
* Node
* Express
* React
* Mongoose
* Dotenv
* Axios
* CORS

## Features

* Upon signup, the username and password are stored in a MongoDB database, along with a default genre prefernce for the user. The password is encrypted using modern JS encryption libraries, and is stored in an encrypted format in the database.

<img src="https://github.com/shree675/Movie-Browser/blob/main/screenshots/Screenshot%20(60).png" height="470">

* On the homepage, a list of latest upcoming movies is displayed in a sliding carousel. Below it, a list of latest movies that fall under the user's selected genre are displayed.

<img src="https://github.com/shree675/Movie-Browser/blob/main/screenshots/Screenshot%20(63).png" height="470">

* This app hosts a search bar with a search functionality for any movie. To return to the homepage/clear the search page, click on CLEAR SEARCH.

<img src="https://github.com/shree675/Movie-Browser/blob/main/screenshots/Screenshot%20(64).png" height="470">

* Clicking on any movie will result in a new page filled with only the important details and information on that particular movie.

<img src="https://github.com/shree675/Movie-Browser/blob/main/screenshots/Screenshot%20(65).png" height="470">

* The settings page hosts the functionality to change the user's password and genre preferences. These are then updated in the database as well.

<img src="https://github.com/shree675/Movie-Browser/blob/main/screenshots/Screenshot%20(71).png" height="470">

## How to use it

* Clone this repository
* Open up a terminal and run  

  ```  
  $ npm install  
  $ npm run-script custom-start  
  ```
  
* Open a second terminal in the same root directory and run
  ```  
  $ node server  
  ```

## Screenshots

Check out [screenshots](screenshots).

### API

This product uses the TMDb API but is not endorsed or certified by [TMDb](https://www.themoviedb.org/).

<img src="https://github.com/shree675/Movie-Browser/blob/main/api_assets/tmdbicon.svg" height="30">
