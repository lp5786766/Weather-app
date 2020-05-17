// Search and cities buttons elements
var searchBtn = $(".btn");
var inputElement = $("#city-input");
var city;
var cities;
// Weather Cards elements
var mainHeader = $("#header-one");
var mainTemp = $("#temp-one");
var mainHumid = $("#humid-one");
var mainWind = $("#wind-one");
var mainUV = $("#uv-one");

searchBtn.on("click", function() {
  city = inputElement.val().trim();
  
  renderButtons();
  getFutureWeather();
});

function saveCities() {
  var cities = JSON.parse(localStorage.getItem("cities"));
  if (cities == null) {
    cities = [];
}
  cities.push(city);
  console.log(city)
  
  
  localStorage.setItem("cities", JSON.stringify(cities));
  console.log(cities)
}

function renderButtons() {
  var cities = JSON.parse(localStorage.getItem("cities"));
  
  saveCities();
  // clear the cities before adding new
  $('#buttons-view').empty();
  for (var i = 0; i < cities.length; i++) {
    // create a list element
    var a = $("<a>");
    // add a class of the element
    a.addClass("collection-item waves-effect waves-light");

    // Added a data-attribute
    // a.attr("data-name", cities[i]);

    // Provided the initial button text
    a.text(cities[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").prepend(a);

    //set a limit of 15 buttons **********************************!!!!!

  }
}

function getFutureWeather() {
  // Weather API request
  var key = "d519fa01ace714bcde242c59a4f9e591";
  var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`

  $.ajax({
    url: url,
    method: 'GET',
  }).then (function (response) {
    console.log(response);
    var currentCity = response.city.name
    
    //create 5 cards

  });
}

function getCurrentWeather() {
  
  var key = "d519fa01ace714bcde242c59a4f9e591";
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`

  $.ajax({
    url: url,
    method: 'GET',
  }).then (function (response) {
    console.log(response);
    var currentCity = response.city.name
    
    // change HTML of the main card:
    mainHeader.text(response.city.name);
    mainTemp.text("")
    

  });
}