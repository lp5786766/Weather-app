// Weather API request
var key = "d519fa01ace714bcde242c59a4f9e591";
var url = `https://api.openweathermap.org/data/2.5/forecast?q=Boston&appid=${key}`

$.ajax({
  url: url,
  method: 'GET',
}).then (function (response) {
  console.log(response);

  var currentCity = response.city.name
  console.log(currentCity);

});

var inputElement = $("#city-input");
var searchBtn = $(".btn");
var cities = [];

searchBtn.on("click", function() {
  console.log(inputElement.val())
});

function renderButtons() {
    // Deletes the cities prior to adding new cities
    // 
    $('#buttons-view').empty();

    // Loops through the array of cities
    for (var i = 0; i < cities.length; i++) {
      // Then dynamicaly generates buttons for each city in the array
      var a = $('<a>');
      // Adds a class of city to our button
      a.addClass('movie');
      // Added a data-attribute
      a.attr('data-name', movies[i]);
      // Provided the initial button text
      a.text(movies[i]);
      // Added the button to the buttons-view div
      $('#buttons-view').append(a);
    }
  }