## Weather Project

This project was created by Mutsumi Hata, a student at Parsity, an online software engineering program. The work in this repository is wholly of the student based on a sample starter project that can be accessed by looking at the original repository from which this project forks.

If you have any questions about this project or the program in general, visit [parsity.io](https://parsity.io/) or email hello@parsity.io.

### Project Description

This simple Redux application builds upon my knowledge of React. I used React's ability to manage components in separate, and more manageble files. I then added Redux's ability to make state management more predictable and scalable. This application also uses React's Sparkline feature to create a line graph of the 5-day temperature, air pressure, and humidity forecasts.

The application allows a user to input the name of a city and returns a 5-day forecast for temperatutre, air pressure and humidity. Along with the daily average, the application returns a 5-day average, along with a line graph of the returned data.

I would like to become more familiar with customizing SparkLine charts.

### Table of Contents

RTK-Weather

- store
  - slices
    - search.js
  - configureStore.js
  - rootReducer.js
  - globals.css
  - layout.js
  - page.js
  - README.md

### How to Run Application

1. Open terminal
2. Locate file: rtk-weather
3. Type: npm run dev
4. Type: open http://localhost:3000 (or other appropriate host)

### Things to Add/Edit

1. Clear input field onClick
2. Cleaner visual - each city result should be on one line
