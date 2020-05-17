// Search and cities buttons elements
var searchBtn = $(".btn");
var inputElement = $("#city-input");
var city;
var cities = [];
// Weather Cards elements
var mainHeader = $("#header-one");
var mainTemp = $("#temp-one");
var mainHumid = $("#humid-one");
var mainWind = $("#wind-one");
var mainUV = $("#uv-one");

searchBtn.on("click", function() {
  city = inputElement.val().trim();
  cities.push(city);
  renderButtons();
  getWeather();
});


function renderButtons() {
  // Deletes the cities prior to adding new cities
  // 
  $('#buttons-view').empty();
  // Loops through the array of cities
  for (var i = 0; i < cities.length; i++) {
    // Then dynamicaly generates buttons for each city in the array
    var a = $("<a>");
    // Adds a class of city to our button
    a.addClass("collection-item waves-effect waves-light");
    // Added a data-attribute
    a.attr("data-name", cities[i]);
    // Provided the initial button text
    a.text(cities[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").prepend(a);

    //set a limit of 15 buttons **********************************!!!!!

  }
}

function getWeather() {
  // Weather API request
  var key = "d519fa01ace714bcde242c59a4f9e591";
  var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`

  $.ajax({
    url: url,
    method: 'GET',
  }).then (function (response) {
    console.log(response);
    var currentCity = response.city.name
    
    // change HTML of the main card:
    mainHeader.text(response.city.name);
    mainTemp.text("")
    
    //create 5 cards

  });


}