function renderButtons() {
    // Deletes the cvities prior to adding new cities
    // 
    $('#buttons-view').empty();

    // Loops through the array of movies
    for (var i = 0; i < movies.length; i++) {
      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $('<button>');
      // Adds a class of movie to our button
      a.addClass('movie');
      // Added a data-attribute
      a.attr('data-name', movies[i]);
      // Provided the initial button text
      a.text(movies[i]);
      // Added the button to the buttons-view div
      $('#buttons-view').append(a);
    }
  }