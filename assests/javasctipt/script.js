// Search and cities buttons elements
var searchBtn = $(".btn");
var inputElement = $("#city-input");
var city;
var cities;
// Current Weather Card elements
var mainHeader = $("#header-one");
var mainIcon = $("#icon-one");
var mainTemp = $("#temp-one");
var mainHumid = $("#humid-one");
var mainWind = $("#wind-one");
var mainUV = $("#uv-one");


searchBtn.on("click", function() {
  city = inputElement.val().trim();
  saveCities();
  renderButtons();
  getCurrentWeather();
  getFutureWeather();  
});

function saveCities() {
  var cities = JSON.parse(localStorage.getItem("cities"));
  if (cities == null) {
    cities = [];
  }
  //add new city to the array
  cities.push(city);
  //save the array in the local storage
  localStorage.setItem("cities", JSON.stringify(cities)); 
}

function renderButtons() {
    //get the saved list of cities from local storage
    var cities = JSON.parse(localStorage.getItem("cities"));
    // clear the cities before adding new
    $('#buttons-view').empty();
    for (var i = 0; i < cities.length; i++) {
      //create a list element
      var a = $("<a>");
      //add a class of the element
      a.addClass("collection-item waves-effect waves-light");
      //add text - city name
      a.text(cities[i]);
      //add click event to the saved cities:
      a.on("click", function() {
        console.log(a[0].innerText);
        var city = a[0].innerText;
        console.log(city);
        getCurrentWeather();
        getFutureWeather();  
      });
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
    // i = [3, 11, 19, 27, 35];
    console.log(response);
    // var info = response.list;
    
    createCard();

    function createCard() {
      //delete previous cards

      var futureCardsArr = response.list
      console.log(futureCardsArr)

      //loop over array of days and get only 12 pm responses
      for (var i = 5; i < futureCardsArr.length; i = i + 8) {
        console.log(i);
        var weatherView = $("#weather-view");
    
      var futureDate = $("<p>");
      futureDate.text(moment(response.list[i].dt_txt).format("MM/D/YY"));
      var futureHumid = $("<p>");
      futureHumid.text("Humidity: " + response.list[i].main.humidity + "%");
      var futureImg = $("<img>");
      futureImg.attr("src", "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png");
      var futureTemp = $("<p>");
      futureTemp.text("Temp: " + Math.round(response.list[i].main.temp * 1.8 - 459.67) + "°F");
    
      var futureCardCont = $("<div>");
      futureCardCont.attr("class", "card-content");
      futureCardCont.append(futureDate, futureHumid, futureImg, futureTemp);
      // futureCard.append(futureHumid);
      // futureCard.append(futureImg);
      // futureCard.append(futureTemp);

      var fullCard = $("<div>");    
      fullCard.attr("class", " col s12 m2 card blue-grey darken-1")
      fullCard.append(futureCardCont)
      weatherView.append(fullCard);
      }
      
    
    }
    //create 5 cards

  });
}

function getCurrentWeather() {
  console.log(city);
  var key = "d519fa01ace714bcde242c59a4f9e591";
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`

  $.ajax({
    url: url,
    method: 'GET',
  }).then (function (response) {
    console.log(response)
    var fTemp = Math.round(response.main.temp * 1.8 - 459.67);
    var cTemp = Math.round(response.main.temp - 273.15);
    // change HTML of the main card:
    mainHeader.text(response.name + " " + moment().format("MM/D/YY"));
    mainIcon.attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png")
    mainTemp.text("Temperature: " + fTemp + "°F / " + cTemp + "°C") // add celcius
    mainHumid.text("Humidity: " + response.main.humidity +"%")
    mainWind.text("Wind Speed: " + response.wind.speed + " MPH");
    getUvIndex();

    function getUvIndex() {
      var key = "d519fa01ace714bcde242c59a4f9e591";
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var uvurl = `https://api.openweathermap.org/data/2.5/uvi?appid=${key}&lat=${lat}&lon=${lon}`;
      
      $.ajax({
        url: uvurl,
        method: 'GET',
      }).then (function (response) {
        mainUV.text("UV Index: " + response.value);
        if (response.value >= 0 && response.value <= 3) {
          mainUV.attr("class", "low");
        } else if (response.value >= 4 && response.value <= 7) {
          mainUV.attr("class", "moderate");
        } else if (response.value >= 8 && response.value <= 11) {
          mainUV.attr("class", "high");
        }
      });
     }
  });  
}
 
