(function(){
  'use strict';

  var app = angular.module("myApp", ['ngRoute']);

  /**
   * configure routes
   */

  app.config(function($routeProvider) {
    $routeProvider

      .when('/', {
        templateUrl : 'partials/search.html',
        controller  : 'searchMovies'
      })

      .when('/results/:ID', {
        templateUrl : 'partials/results.html',
        controller  : 'resultMovies'
      })

      .when('/tv/', {
        templateUrl : 'partials/tv-search.html',
        controller  : 'searchTv',
        activeTab: 'tv'
      })

      .when('/tvResults/:ID', {
        templateUrl : 'partials/tv-results.html',
        controller  : 'resultTv'
      })


      .otherwise({
        redirectTo: '/'
      });

  });


  app.controller('headerController', function($scope, $location) {

    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };

  });


  app.controller('searchMovies', function($scope, $http, $routeParams) {

    $scope.search= '';
    $scope.baseUrl = 'http://image.tmdb.org/t/p/w300/';
    $scope.listOfMovies;
    $scope.latestMovies;
    $scope.movieArray = [
      "Pulp Fiction",
      "Fight Club",
      "The Shawshank Redemption",
      "The Dark Knight",
      "Inglourious Basterds",
      "Inception",
      "The Matrix",
      "The Empire Strikes Back",
      "The Lord of the Rings: The Fellowship of the Ring",
      "Toy Story",
      "The Big Lebowski",
      "Django Unchained",
      "The Lord of the Rings: The Return of the King",
      "The Departed",
      "Memento",
      "The Godfather",
      "Reservoir Dogs",
      "Saving Private Ryan",
      "Forrest Gump",
      "Monty Python and the Holy Grail",
      "Seen",
      "Back to the Future",
      "GoodFellas",
      "The Prestige",
      "Shaun of the Dead",
      "Alien",
      "The Silence of the Lambs",
      "The Lord of the Rings: The Two Towers",
      "Spirited Away",
      "The Good, the Bad and the Ugly",
      "Eternal Sunshine of the Spotless Mind",
      "Raiders of the Lost Ark",
      "A Space Odyssey",
      "Dr. Strangelove",
      "Blade Runner",
      "The Lion King",
      "One Flew Over the Cuckoo's Nest",
      "There Will Be Blood",
      "The Shining",
      "The Truman Show",
      "A Clockwork Orange",
      "Star Wars",
      "District 9",
      "Up",
      "Office Space",
      "12 Angry Men",
      "Pan's Labyrinth",
      "The Usual Suspects",
      "Jurassic Park",
      "V for Vendetta",
      "The Princess Bride",
      "No Country for Old Men",
      "Schindler's List",
      "Good Will Hunting",
      "Children of Men",
      "Kill Bill: Vol. 1",
      "WALL·E",
      "American History X",
      "Die Hard",
      "Drive",
      "Moon",
      "Groundhog Day",
      "Batman Begins",
      "Fargo",
      "The Incredibles",
      "O Brother, Where Art Thou",
      "Gladiator",
      "Airplane",
      "American Beauty",
      "Terminator 2: Judgment Day",
      "Léon",
      "Toy Story 3",
      "Snatch",
      "American Psycho",
      "The Social Network",
      "Oldboy",
      "Ferris Bueller's Day Off",
      "Princess Mononoke",
      "In Bruges",
      "Donnie Darko",
      "Casablanca",
      "City of God",
      "Psycho",
      "The Fifth Element",
      "Seven Samurai",
      "Taxi Driver",
      "Monsters, Inc.",
      "28 Days Later",
      "Requiem for a Dream",
      "The Godfather: Part II",
      "Hot Fuzz",
      "Trainspotting",
      "Amélie",
      "Twelve Monkeys",
      "Aliens",
      "The Dark Knight Rises",
      "Kiss Kiss Bang Bang",
      "Lost in Translation",
      "Chinatown",
      "The Royal Tennenbaums",
      "Rear Window",
      "Jaws",
      "Ocean's Eleven",
      "The Green Mile",
      "Black Swan",
      "Citizen Kane",
      "Looper",
      "The Thing",
      "The Breakfast Club",
      "The Cabin in the Woods",
      "L.A. Confidential",
      "Scott Pilgrim vs. the World",
      "Finding Nemo",
      "Boogie Nights",
      "Superbad",
      "Sin City",
      "Fear and Loathing in Las Vegas",
      "Indiana Jones and the Last Crusade",
      "To Kill a Mockingbird",
      "Lawrence of Arabia",
      "Being John Malkovich",
      "The Pianist",
      "Annie Hall",
      "Anchorman: The Legend of Ron Burgundy",
      "Argo",
      "Raging Bull",
      "Vertigo",
      "The Avengers",
      "Butch Cassidy and the Sundance Kid",
      "Dazed and Confused",
      "500 Days of Summer",
      "Willy Wonka & the Chocolate Factory",
      "Unforgiven",
      "Fantastic Mr. Fox",
      "The Iron Giant",
      "The Terminator",
      "Ghost Busters",
      "This Is Spinal Tap",
      "Gran Torino",
      "Adaptation.",
      "A Fistful of Dollars",
      "Stand by Me",
      "Apollo 13",
      "Blazing Saddles",
      "Amadeus",
      "Kick-Ass",
      "Rushmore",
      "Life of Brian",
      "Almost Famous",
      "Network",
      "Mulholland Drive",
      "Star Trek",
      "It's a Wonderful Life",
      "Singin' in the Rain",
      "The Graduate",
      "Cool Hand Luke",
      "The Nightmare Before Christmas",
      "Metropolis",
      "Casino Royale",
      "Zodiac",
      "Crouching Tiger, Hidden Dragon",
      "E.T.",
      "The Blues Brothers",
      "Hotel Rwanda",
      "Zoolander",
      "Heat",
      "The Seventh Seal",
      "Kill Bill: Vol. 2",
      "Stranger Than Fiction",
      "Double Indemnity",
      "On the Waterfront",
      "Predator",
      "Lucky Number Slevin",
      "Catch Me If You Can",
      "Dredd",
      "Battle Royale",
      "RoboCop",
      "How to Train Your Dragon",
      "Dog Day Afternoon",
      "Planet of the Apes",
      "Master and Commander: The Far Side of the World",
      "Paths of Glory",
      "Brokeback Mountain",
      "The Hobbit: An Unexpected Journey",
      "The Wizard of Oz",
      "Close Encounters of the Third Kind",
      "The Wrestler",
      "The Jerk",
      "Slumdog Millionaire",
      "Silver Linings Playbook",
      "Glengarry Glen Ross",
      "Sunset Boulevard",
      "Return of the Jedi",
      "Ran",
      "Collateral",
      "Let the Right One In",
      "The Sting",
      "Tucker and Dale Vs. Evil",
      "Some Like It Hot",
      "Shutter Island",
      "The Maltese Falcon",
      "The Treasure of the Sierra Madre",
      "Sunshine",
      "Punch-Drunk Love",
      "Magnolia",
      "Thank You for Smoking",
      "The Hurt Locker",
      "Dawn of the Dead"
    ];

    $scope.$route = $routeParams;


    var movieArray = $scope.movieArray;
    var movieCounter = 0;

    /**
     * shuffle array
     * array of movies.
     */
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    $scope.movieArray = shuffle(movieArray);
    $scope.randomMovie = $scope.movieArray;

    $scope.suggestMovieArray = shuffle($scope.movieArray);
    $scope.suggestRandomMovie = $scope.suggestMovieArray;


    /**
     * Click on random movie
     * loop through suggested movies
     * and populate search field
     */
    $scope.updateRandomMovie = function(movie){
      $scope.search = movieArray[movieCounter++ % movieArray.length];
    };

    /**
     * click on suggested item
     * update input values
     */
    $scope.suggestedUpdate = function(movie) {
      $scope.search = movie;
    };

    $scope.$watch('search', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        searchAll();
      }
    });

    $scope.ID = $routeParams.ID;

    /**
     * call api, use search to call
     * movies to populate results
     */
    function searchAll() {
      $http.get('https://api.themoviedb.org/3/search/movie?api_key=ab58cab372612e37f53bba8970ae11a1&language=en-US&query=' + $scope.search + '&page=1&include_adult=false')
        .then(function(response) {
          $scope.listOfMovies = response.data.results;
          console.log($scope.listOfMovies)
        });
    }

    /**
     * call api
     * get the latest movies
     */
    function getLatest() {
      $http.get('https://api.themoviedb.org/3/movie/latest?api_key=ab58cab372612e37f53bba8970ae11a1&language=en-US')
        .then(function(response) {
          $scope.latestMovies = response.data.results;
        });
    }

    getLatest();
  });

  app.controller('resultMovies', function($scope, $http, $location) {

    var pId = $location.path().split(/[\s/]+/).pop();
    $scope.baseUrl = 'http://image.tmdb.org/t/p/w300/';
    $scope.movieDetail;
    $scope.relatedResults;
    $scope.cast;
    $scope.movieID = pId;

    /**
     * set chekboxes to checked by default
     */
    $scope.movieOptions = {
      poster: true,
      info: true,
      related: true,
      reviews: true,
      cast: true,
      extras: true
    };

    /**
     * call api, use the movie id
     * to get specific info
     */
    function getSpecific() {
      $http.get('https://api.themoviedb.org/3/movie/' + $scope.movieID + '?api_key=3fcc4c18d6df53c06d2776ee56df1918&language=en-US&page=1')
        .then(function(response) {
          $scope.movieDetail = response.data;
        });
    }

    /**
     * call api, get related
     * movies
     */
    function getRelatedResults() {
      $http.get('https://api.themoviedb.org/3/movie/' + $scope.movieID + '/similar?api_key=ab58cab372612e37f53bba8970ae11a1&language=en-US&page=1')
        .then(function(response) {
          $scope.relatedResults = response.data.results;
        });
    }

    /**
     * call api, get cast members
     * from movie
     */
    function getCast() {
      $http.get('https://api.themoviedb.org/3/movie/' + $scope.movieID + '/credits?api_key=ab58cab372612e37f53bba8970ae11a1&language=en-US&page=1')
        .then(function(response) {
          $scope.cast = response.data;
        });
    }

    /**
     * get the movie
     */
    getSpecific();

    /**
     * get the related movies
     */
    getRelatedResults();

    /**
     * get the cast
     */
    getCast();
  });

  app.controller('searchTv', function($scope, $http, $routeParams) {

    $scope.tvSearch= '';
    $scope.baseUrl = 'http://image.tmdb.org/t/p/w300/';
    $scope.listOfShows;
    $scope.ID = $routeParams.ID;

    $scope.$route = $routeParams;

    /**
     * click on suggested item
     * update input values
     */
    $scope.suggestedUpdate = function(tv) {
      $scope.tvSearch = tv.name;
    };

    $scope.$watch('tvSearch', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        searchTv();
      }
    });

    /**
     * call api, use search to call
     * tv shows, populate results
     */
    function searchTv() {
      $http.get('https://api.themoviedb.org/3/search/tv?api_key=ab58cab372612e37f53bba8970ae11a1&language=en-US&query=' + $scope.tvSearch + '&page=1&include_adult=false')
        .then(function(response) {
          $scope.listOfShows = response.data.results;
        });
    }

    /**
     * call api
     * get the latest tv shows
     */
    function getLatest() {
      $http.get('https://api.themoviedb.org/3/tv/popular?api_key=ab58cab372612e37f53bba8970ae11a1&language=en-US')
        .then(function(response) {
          $scope.latestShows = response.data.results;
        });
    }

    getLatest();
  });

  app.controller('resultTv', function($scope, $http, $location) {

    var pId = $location.path().split(/[\s/]+/).pop();
    $scope.baseUrl = 'http://image.tmdb.org/t/p/w300/';
    $scope.tvDetail;
    $scope.castDetail;
    $scope.tvID = pId;

    /**
     * set chekboxes to checked by default
     */
    $scope.tvOptions = {
      poster: true,
      info: true,
      related: true,
      cast: true,
      extras: true,
      seasons: true
    };

    /**
     * call api, use the movie id
     * to get specific info
     */
    function getSpecific() {
      $http.get('https://api.themoviedb.org/3/tv/' + $scope.tvID + '?api_key=ab58cab372612e37f53bba8970ae11a1&language=en-US&page=1')
        .then(function(response) {
          $scope.tvDetail = response.data;
        });
    }

    /**
     * call api, get related
     * shows
     */
    function getRelatedTvResults() {
      $http.get('https://api.themoviedb.org/3/tv/' + $scope.tvID + '/similar?api_key=ab58cab372612e37f53bba8970ae11a1&language=en-US&page=1')
        .then(function(response) {
          $scope.relatedTvResults = response.data.results;
        });
    }
    //
    /**
     * call api, get cast members
     * from movie
     */
    function getCast() {
      $http.get('https://api.themoviedb.org/3/tv/' + $scope.tvID + '/credits?api_key=ab58cab372612e37f53bba8970ae11a1&language=en-US&page=1')
        .then(function(response) {
          $scope.castDetail = response.data;
          console.log($scope.castDetail)
        });
    }

    /**
     * get the movie
     */
    getSpecific();

    /**
     * get the related shows
     */
    getRelatedTvResults();

    /**
     * get the cast
     */
    getCast();
  });

  app.directive('preventDefault', function() {
    return function(scope, element, attrs) {
      angular.element(element).bind('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
      });
    };
  });

  app.directive('scrollIf', function() {
    return function(scope, element, attributes) {
      setTimeout(function() {
        if (scope.$eval(attributes.scrollIf)) {
          window.scrollTo(0, element[0].offsetTop - 100);
        }
      });
    };
  });
}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKFwibXlBcHBcIiwgWyduZ1JvdXRlJ10pO1xuXG4gIC8qKlxuICAgKiBjb25maWd1cmUgcm91dGVzXG4gICAqL1xuXG4gIGFwcC5jb25maWcoZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcbiAgICAkcm91dGVQcm92aWRlclxuXG4gICAgICAud2hlbignLycsIHtcbiAgICAgICAgdGVtcGxhdGVVcmwgOiAncGFydGlhbHMvc2VhcmNoLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyICA6ICdzZWFyY2hNb3ZpZXMnXG4gICAgICB9KVxuXG4gICAgICAud2hlbignL3Jlc3VsdHMvOklEJywge1xuICAgICAgICB0ZW1wbGF0ZVVybCA6ICdwYXJ0aWFscy9yZXN1bHRzLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyICA6ICdyZXN1bHRNb3ZpZXMnXG4gICAgICB9KVxuXG4gICAgICAud2hlbignL3R2LycsIHtcbiAgICAgICAgdGVtcGxhdGVVcmwgOiAncGFydGlhbHMvdHYtc2VhcmNoLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyICA6ICdzZWFyY2hUdicsXG4gICAgICAgIGFjdGl2ZVRhYjogJ3R2J1xuICAgICAgfSlcblxuICAgICAgLndoZW4oJy90dlJlc3VsdHMvOklEJywge1xuICAgICAgICB0ZW1wbGF0ZVVybCA6ICdwYXJ0aWFscy90di1yZXN1bHRzLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyICA6ICdyZXN1bHRUdidcbiAgICAgIH0pXG5cblxuICAgICAgLm90aGVyd2lzZSh7XG4gICAgICAgIHJlZGlyZWN0VG86ICcvJ1xuICAgICAgfSk7XG5cbiAgfSk7XG5cblxuICBhcHAuY29udHJvbGxlcignaGVhZGVyQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJGxvY2F0aW9uKSB7XG5cbiAgICAkc2NvcGUuaXNBY3RpdmUgPSBmdW5jdGlvbih2aWV3TG9jYXRpb24pIHtcbiAgICAgIHJldHVybiB2aWV3TG9jYXRpb24gPT09ICRsb2NhdGlvbi5wYXRoKCk7XG4gICAgfTtcblxuICB9KTtcblxuXG4gIGFwcC5jb250cm9sbGVyKCdzZWFyY2hNb3ZpZXMnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkcm91dGVQYXJhbXMpIHtcblxuICAgICRzY29wZS5zZWFyY2g9ICcnO1xuICAgICRzY29wZS5iYXNlVXJsID0gJ2h0dHA6Ly9pbWFnZS50bWRiLm9yZy90L3AvdzMwMC8nO1xuICAgICRzY29wZS5saXN0T2ZNb3ZpZXM7XG4gICAgJHNjb3BlLmxhdGVzdE1vdmllcztcbiAgICAkc2NvcGUubW92aWVBcnJheSA9IFtcbiAgICAgIFwiUHVscCBGaWN0aW9uXCIsXG4gICAgICBcIkZpZ2h0IENsdWJcIixcbiAgICAgIFwiVGhlIFNoYXdzaGFuayBSZWRlbXB0aW9uXCIsXG4gICAgICBcIlRoZSBEYXJrIEtuaWdodFwiLFxuICAgICAgXCJJbmdsb3VyaW91cyBCYXN0ZXJkc1wiLFxuICAgICAgXCJJbmNlcHRpb25cIixcbiAgICAgIFwiVGhlIE1hdHJpeFwiLFxuICAgICAgXCJUaGUgRW1waXJlIFN0cmlrZXMgQmFja1wiLFxuICAgICAgXCJUaGUgTG9yZCBvZiB0aGUgUmluZ3M6IFRoZSBGZWxsb3dzaGlwIG9mIHRoZSBSaW5nXCIsXG4gICAgICBcIlRveSBTdG9yeVwiLFxuICAgICAgXCJUaGUgQmlnIExlYm93c2tpXCIsXG4gICAgICBcIkRqYW5nbyBVbmNoYWluZWRcIixcbiAgICAgIFwiVGhlIExvcmQgb2YgdGhlIFJpbmdzOiBUaGUgUmV0dXJuIG9mIHRoZSBLaW5nXCIsXG4gICAgICBcIlRoZSBEZXBhcnRlZFwiLFxuICAgICAgXCJNZW1lbnRvXCIsXG4gICAgICBcIlRoZSBHb2RmYXRoZXJcIixcbiAgICAgIFwiUmVzZXJ2b2lyIERvZ3NcIixcbiAgICAgIFwiU2F2aW5nIFByaXZhdGUgUnlhblwiLFxuICAgICAgXCJGb3JyZXN0IEd1bXBcIixcbiAgICAgIFwiTW9udHkgUHl0aG9uIGFuZCB0aGUgSG9seSBHcmFpbFwiLFxuICAgICAgXCJTZWVuXCIsXG4gICAgICBcIkJhY2sgdG8gdGhlIEZ1dHVyZVwiLFxuICAgICAgXCJHb29kRmVsbGFzXCIsXG4gICAgICBcIlRoZSBQcmVzdGlnZVwiLFxuICAgICAgXCJTaGF1biBvZiB0aGUgRGVhZFwiLFxuICAgICAgXCJBbGllblwiLFxuICAgICAgXCJUaGUgU2lsZW5jZSBvZiB0aGUgTGFtYnNcIixcbiAgICAgIFwiVGhlIExvcmQgb2YgdGhlIFJpbmdzOiBUaGUgVHdvIFRvd2Vyc1wiLFxuICAgICAgXCJTcGlyaXRlZCBBd2F5XCIsXG4gICAgICBcIlRoZSBHb29kLCB0aGUgQmFkIGFuZCB0aGUgVWdseVwiLFxuICAgICAgXCJFdGVybmFsIFN1bnNoaW5lIG9mIHRoZSBTcG90bGVzcyBNaW5kXCIsXG4gICAgICBcIlJhaWRlcnMgb2YgdGhlIExvc3QgQXJrXCIsXG4gICAgICBcIkEgU3BhY2UgT2R5c3NleVwiLFxuICAgICAgXCJEci4gU3RyYW5nZWxvdmVcIixcbiAgICAgIFwiQmxhZGUgUnVubmVyXCIsXG4gICAgICBcIlRoZSBMaW9uIEtpbmdcIixcbiAgICAgIFwiT25lIEZsZXcgT3ZlciB0aGUgQ3Vja29vJ3MgTmVzdFwiLFxuICAgICAgXCJUaGVyZSBXaWxsIEJlIEJsb29kXCIsXG4gICAgICBcIlRoZSBTaGluaW5nXCIsXG4gICAgICBcIlRoZSBUcnVtYW4gU2hvd1wiLFxuICAgICAgXCJBIENsb2Nrd29yayBPcmFuZ2VcIixcbiAgICAgIFwiU3RhciBXYXJzXCIsXG4gICAgICBcIkRpc3RyaWN0IDlcIixcbiAgICAgIFwiVXBcIixcbiAgICAgIFwiT2ZmaWNlIFNwYWNlXCIsXG4gICAgICBcIjEyIEFuZ3J5IE1lblwiLFxuICAgICAgXCJQYW4ncyBMYWJ5cmludGhcIixcbiAgICAgIFwiVGhlIFVzdWFsIFN1c3BlY3RzXCIsXG4gICAgICBcIkp1cmFzc2ljIFBhcmtcIixcbiAgICAgIFwiViBmb3IgVmVuZGV0dGFcIixcbiAgICAgIFwiVGhlIFByaW5jZXNzIEJyaWRlXCIsXG4gICAgICBcIk5vIENvdW50cnkgZm9yIE9sZCBNZW5cIixcbiAgICAgIFwiU2NoaW5kbGVyJ3MgTGlzdFwiLFxuICAgICAgXCJHb29kIFdpbGwgSHVudGluZ1wiLFxuICAgICAgXCJDaGlsZHJlbiBvZiBNZW5cIixcbiAgICAgIFwiS2lsbCBCaWxsOiBWb2wuIDFcIixcbiAgICAgIFwiV0FMTMK3RVwiLFxuICAgICAgXCJBbWVyaWNhbiBIaXN0b3J5IFhcIixcbiAgICAgIFwiRGllIEhhcmRcIixcbiAgICAgIFwiRHJpdmVcIixcbiAgICAgIFwiTW9vblwiLFxuICAgICAgXCJHcm91bmRob2cgRGF5XCIsXG4gICAgICBcIkJhdG1hbiBCZWdpbnNcIixcbiAgICAgIFwiRmFyZ29cIixcbiAgICAgIFwiVGhlIEluY3JlZGlibGVzXCIsXG4gICAgICBcIk8gQnJvdGhlciwgV2hlcmUgQXJ0IFRob3VcIixcbiAgICAgIFwiR2xhZGlhdG9yXCIsXG4gICAgICBcIkFpcnBsYW5lXCIsXG4gICAgICBcIkFtZXJpY2FuIEJlYXV0eVwiLFxuICAgICAgXCJUZXJtaW5hdG9yIDI6IEp1ZGdtZW50IERheVwiLFxuICAgICAgXCJMw6lvblwiLFxuICAgICAgXCJUb3kgU3RvcnkgM1wiLFxuICAgICAgXCJTbmF0Y2hcIixcbiAgICAgIFwiQW1lcmljYW4gUHN5Y2hvXCIsXG4gICAgICBcIlRoZSBTb2NpYWwgTmV0d29ya1wiLFxuICAgICAgXCJPbGRib3lcIixcbiAgICAgIFwiRmVycmlzIEJ1ZWxsZXIncyBEYXkgT2ZmXCIsXG4gICAgICBcIlByaW5jZXNzIE1vbm9ub2tlXCIsXG4gICAgICBcIkluIEJydWdlc1wiLFxuICAgICAgXCJEb25uaWUgRGFya29cIixcbiAgICAgIFwiQ2FzYWJsYW5jYVwiLFxuICAgICAgXCJDaXR5IG9mIEdvZFwiLFxuICAgICAgXCJQc3ljaG9cIixcbiAgICAgIFwiVGhlIEZpZnRoIEVsZW1lbnRcIixcbiAgICAgIFwiU2V2ZW4gU2FtdXJhaVwiLFxuICAgICAgXCJUYXhpIERyaXZlclwiLFxuICAgICAgXCJNb25zdGVycywgSW5jLlwiLFxuICAgICAgXCIyOCBEYXlzIExhdGVyXCIsXG4gICAgICBcIlJlcXVpZW0gZm9yIGEgRHJlYW1cIixcbiAgICAgIFwiVGhlIEdvZGZhdGhlcjogUGFydCBJSVwiLFxuICAgICAgXCJIb3QgRnV6elwiLFxuICAgICAgXCJUcmFpbnNwb3R0aW5nXCIsXG4gICAgICBcIkFtw6lsaWVcIixcbiAgICAgIFwiVHdlbHZlIE1vbmtleXNcIixcbiAgICAgIFwiQWxpZW5zXCIsXG4gICAgICBcIlRoZSBEYXJrIEtuaWdodCBSaXNlc1wiLFxuICAgICAgXCJLaXNzIEtpc3MgQmFuZyBCYW5nXCIsXG4gICAgICBcIkxvc3QgaW4gVHJhbnNsYXRpb25cIixcbiAgICAgIFwiQ2hpbmF0b3duXCIsXG4gICAgICBcIlRoZSBSb3lhbCBUZW5uZW5iYXVtc1wiLFxuICAgICAgXCJSZWFyIFdpbmRvd1wiLFxuICAgICAgXCJKYXdzXCIsXG4gICAgICBcIk9jZWFuJ3MgRWxldmVuXCIsXG4gICAgICBcIlRoZSBHcmVlbiBNaWxlXCIsXG4gICAgICBcIkJsYWNrIFN3YW5cIixcbiAgICAgIFwiQ2l0aXplbiBLYW5lXCIsXG4gICAgICBcIkxvb3BlclwiLFxuICAgICAgXCJUaGUgVGhpbmdcIixcbiAgICAgIFwiVGhlIEJyZWFrZmFzdCBDbHViXCIsXG4gICAgICBcIlRoZSBDYWJpbiBpbiB0aGUgV29vZHNcIixcbiAgICAgIFwiTC5BLiBDb25maWRlbnRpYWxcIixcbiAgICAgIFwiU2NvdHQgUGlsZ3JpbSB2cy4gdGhlIFdvcmxkXCIsXG4gICAgICBcIkZpbmRpbmcgTmVtb1wiLFxuICAgICAgXCJCb29naWUgTmlnaHRzXCIsXG4gICAgICBcIlN1cGVyYmFkXCIsXG4gICAgICBcIlNpbiBDaXR5XCIsXG4gICAgICBcIkZlYXIgYW5kIExvYXRoaW5nIGluIExhcyBWZWdhc1wiLFxuICAgICAgXCJJbmRpYW5hIEpvbmVzIGFuZCB0aGUgTGFzdCBDcnVzYWRlXCIsXG4gICAgICBcIlRvIEtpbGwgYSBNb2NraW5nYmlyZFwiLFxuICAgICAgXCJMYXdyZW5jZSBvZiBBcmFiaWFcIixcbiAgICAgIFwiQmVpbmcgSm9obiBNYWxrb3ZpY2hcIixcbiAgICAgIFwiVGhlIFBpYW5pc3RcIixcbiAgICAgIFwiQW5uaWUgSGFsbFwiLFxuICAgICAgXCJBbmNob3JtYW46IFRoZSBMZWdlbmQgb2YgUm9uIEJ1cmd1bmR5XCIsXG4gICAgICBcIkFyZ29cIixcbiAgICAgIFwiUmFnaW5nIEJ1bGxcIixcbiAgICAgIFwiVmVydGlnb1wiLFxuICAgICAgXCJUaGUgQXZlbmdlcnNcIixcbiAgICAgIFwiQnV0Y2ggQ2Fzc2lkeSBhbmQgdGhlIFN1bmRhbmNlIEtpZFwiLFxuICAgICAgXCJEYXplZCBhbmQgQ29uZnVzZWRcIixcbiAgICAgIFwiNTAwIERheXMgb2YgU3VtbWVyXCIsXG4gICAgICBcIldpbGx5IFdvbmthICYgdGhlIENob2NvbGF0ZSBGYWN0b3J5XCIsXG4gICAgICBcIlVuZm9yZ2l2ZW5cIixcbiAgICAgIFwiRmFudGFzdGljIE1yLiBGb3hcIixcbiAgICAgIFwiVGhlIElyb24gR2lhbnRcIixcbiAgICAgIFwiVGhlIFRlcm1pbmF0b3JcIixcbiAgICAgIFwiR2hvc3QgQnVzdGVyc1wiLFxuICAgICAgXCJUaGlzIElzIFNwaW5hbCBUYXBcIixcbiAgICAgIFwiR3JhbiBUb3Jpbm9cIixcbiAgICAgIFwiQWRhcHRhdGlvbi5cIixcbiAgICAgIFwiQSBGaXN0ZnVsIG9mIERvbGxhcnNcIixcbiAgICAgIFwiU3RhbmQgYnkgTWVcIixcbiAgICAgIFwiQXBvbGxvIDEzXCIsXG4gICAgICBcIkJsYXppbmcgU2FkZGxlc1wiLFxuICAgICAgXCJBbWFkZXVzXCIsXG4gICAgICBcIktpY2stQXNzXCIsXG4gICAgICBcIlJ1c2htb3JlXCIsXG4gICAgICBcIkxpZmUgb2YgQnJpYW5cIixcbiAgICAgIFwiQWxtb3N0IEZhbW91c1wiLFxuICAgICAgXCJOZXR3b3JrXCIsXG4gICAgICBcIk11bGhvbGxhbmQgRHJpdmVcIixcbiAgICAgIFwiU3RhciBUcmVrXCIsXG4gICAgICBcIkl0J3MgYSBXb25kZXJmdWwgTGlmZVwiLFxuICAgICAgXCJTaW5naW4nIGluIHRoZSBSYWluXCIsXG4gICAgICBcIlRoZSBHcmFkdWF0ZVwiLFxuICAgICAgXCJDb29sIEhhbmQgTHVrZVwiLFxuICAgICAgXCJUaGUgTmlnaHRtYXJlIEJlZm9yZSBDaHJpc3RtYXNcIixcbiAgICAgIFwiTWV0cm9wb2xpc1wiLFxuICAgICAgXCJDYXNpbm8gUm95YWxlXCIsXG4gICAgICBcIlpvZGlhY1wiLFxuICAgICAgXCJDcm91Y2hpbmcgVGlnZXIsIEhpZGRlbiBEcmFnb25cIixcbiAgICAgIFwiRS5ULlwiLFxuICAgICAgXCJUaGUgQmx1ZXMgQnJvdGhlcnNcIixcbiAgICAgIFwiSG90ZWwgUndhbmRhXCIsXG4gICAgICBcIlpvb2xhbmRlclwiLFxuICAgICAgXCJIZWF0XCIsXG4gICAgICBcIlRoZSBTZXZlbnRoIFNlYWxcIixcbiAgICAgIFwiS2lsbCBCaWxsOiBWb2wuIDJcIixcbiAgICAgIFwiU3RyYW5nZXIgVGhhbiBGaWN0aW9uXCIsXG4gICAgICBcIkRvdWJsZSBJbmRlbW5pdHlcIixcbiAgICAgIFwiT24gdGhlIFdhdGVyZnJvbnRcIixcbiAgICAgIFwiUHJlZGF0b3JcIixcbiAgICAgIFwiTHVja3kgTnVtYmVyIFNsZXZpblwiLFxuICAgICAgXCJDYXRjaCBNZSBJZiBZb3UgQ2FuXCIsXG4gICAgICBcIkRyZWRkXCIsXG4gICAgICBcIkJhdHRsZSBSb3lhbGVcIixcbiAgICAgIFwiUm9ib0NvcFwiLFxuICAgICAgXCJIb3cgdG8gVHJhaW4gWW91ciBEcmFnb25cIixcbiAgICAgIFwiRG9nIERheSBBZnRlcm5vb25cIixcbiAgICAgIFwiUGxhbmV0IG9mIHRoZSBBcGVzXCIsXG4gICAgICBcIk1hc3RlciBhbmQgQ29tbWFuZGVyOiBUaGUgRmFyIFNpZGUgb2YgdGhlIFdvcmxkXCIsXG4gICAgICBcIlBhdGhzIG9mIEdsb3J5XCIsXG4gICAgICBcIkJyb2tlYmFjayBNb3VudGFpblwiLFxuICAgICAgXCJUaGUgSG9iYml0OiBBbiBVbmV4cGVjdGVkIEpvdXJuZXlcIixcbiAgICAgIFwiVGhlIFdpemFyZCBvZiBPelwiLFxuICAgICAgXCJDbG9zZSBFbmNvdW50ZXJzIG9mIHRoZSBUaGlyZCBLaW5kXCIsXG4gICAgICBcIlRoZSBXcmVzdGxlclwiLFxuICAgICAgXCJUaGUgSmVya1wiLFxuICAgICAgXCJTbHVtZG9nIE1pbGxpb25haXJlXCIsXG4gICAgICBcIlNpbHZlciBMaW5pbmdzIFBsYXlib29rXCIsXG4gICAgICBcIkdsZW5nYXJyeSBHbGVuIFJvc3NcIixcbiAgICAgIFwiU3Vuc2V0IEJvdWxldmFyZFwiLFxuICAgICAgXCJSZXR1cm4gb2YgdGhlIEplZGlcIixcbiAgICAgIFwiUmFuXCIsXG4gICAgICBcIkNvbGxhdGVyYWxcIixcbiAgICAgIFwiTGV0IHRoZSBSaWdodCBPbmUgSW5cIixcbiAgICAgIFwiVGhlIFN0aW5nXCIsXG4gICAgICBcIlR1Y2tlciBhbmQgRGFsZSBWcy4gRXZpbFwiLFxuICAgICAgXCJTb21lIExpa2UgSXQgSG90XCIsXG4gICAgICBcIlNodXR0ZXIgSXNsYW5kXCIsXG4gICAgICBcIlRoZSBNYWx0ZXNlIEZhbGNvblwiLFxuICAgICAgXCJUaGUgVHJlYXN1cmUgb2YgdGhlIFNpZXJyYSBNYWRyZVwiLFxuICAgICAgXCJTdW5zaGluZVwiLFxuICAgICAgXCJQdW5jaC1EcnVuayBMb3ZlXCIsXG4gICAgICBcIk1hZ25vbGlhXCIsXG4gICAgICBcIlRoYW5rIFlvdSBmb3IgU21va2luZ1wiLFxuICAgICAgXCJUaGUgSHVydCBMb2NrZXJcIixcbiAgICAgIFwiRGF3biBvZiB0aGUgRGVhZFwiXG4gICAgXTtcblxuICAgICRzY29wZS4kcm91dGUgPSAkcm91dGVQYXJhbXM7XG5cblxuICAgIHZhciBtb3ZpZUFycmF5ID0gJHNjb3BlLm1vdmllQXJyYXk7XG4gICAgdmFyIG1vdmllQ291bnRlciA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBzaHVmZmxlIGFycmF5XG4gICAgICogYXJyYXkgb2YgbW92aWVzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNodWZmbGUoYXJyYXkpIHtcbiAgICAgIHZhciBjdXJyZW50SW5kZXggPSBhcnJheS5sZW5ndGgsIHRlbXBvcmFyeVZhbHVlLCByYW5kb21JbmRleDtcblxuICAgICAgLy8gV2hpbGUgdGhlcmUgcmVtYWluIGVsZW1lbnRzIHRvIHNodWZmbGUuLi5cbiAgICAgIHdoaWxlICgwICE9PSBjdXJyZW50SW5kZXgpIHtcbiAgICAgICAgLy8gUGljayBhIHJlbWFpbmluZyBlbGVtZW50Li4uXG4gICAgICAgIHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY3VycmVudEluZGV4KTtcbiAgICAgICAgY3VycmVudEluZGV4IC09IDE7XG5cbiAgICAgICAgLy8gQW5kIHN3YXAgaXQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgICAgICB0ZW1wb3JhcnlWYWx1ZSA9IGFycmF5W2N1cnJlbnRJbmRleF07XG4gICAgICAgIGFycmF5W2N1cnJlbnRJbmRleF0gPSBhcnJheVtyYW5kb21JbmRleF07XG4gICAgICAgIGFycmF5W3JhbmRvbUluZGV4XSA9IHRlbXBvcmFyeVZhbHVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxuXG4gICAgJHNjb3BlLm1vdmllQXJyYXkgPSBzaHVmZmxlKG1vdmllQXJyYXkpO1xuICAgICRzY29wZS5yYW5kb21Nb3ZpZSA9ICRzY29wZS5tb3ZpZUFycmF5O1xuXG4gICAgJHNjb3BlLnN1Z2dlc3RNb3ZpZUFycmF5ID0gc2h1ZmZsZSgkc2NvcGUubW92aWVBcnJheSk7XG4gICAgJHNjb3BlLnN1Z2dlc3RSYW5kb21Nb3ZpZSA9ICRzY29wZS5zdWdnZXN0TW92aWVBcnJheTtcblxuXG4gICAgLyoqXG4gICAgICogQ2xpY2sgb24gcmFuZG9tIG1vdmllXG4gICAgICogbG9vcCB0aHJvdWdoIHN1Z2dlc3RlZCBtb3ZpZXNcbiAgICAgKiBhbmQgcG9wdWxhdGUgc2VhcmNoIGZpZWxkXG4gICAgICovXG4gICAgJHNjb3BlLnVwZGF0ZVJhbmRvbU1vdmllID0gZnVuY3Rpb24obW92aWUpe1xuICAgICAgJHNjb3BlLnNlYXJjaCA9IG1vdmllQXJyYXlbbW92aWVDb3VudGVyKysgJSBtb3ZpZUFycmF5Lmxlbmd0aF07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGNsaWNrIG9uIHN1Z2dlc3RlZCBpdGVtXG4gICAgICogdXBkYXRlIGlucHV0IHZhbHVlc1xuICAgICAqL1xuICAgICRzY29wZS5zdWdnZXN0ZWRVcGRhdGUgPSBmdW5jdGlvbihtb3ZpZSkge1xuICAgICAgJHNjb3BlLnNlYXJjaCA9IG1vdmllO1xuICAgIH07XG5cbiAgICAkc2NvcGUuJHdhdGNoKCdzZWFyY2gnLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgc2VhcmNoQWxsKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkc2NvcGUuSUQgPSAkcm91dGVQYXJhbXMuSUQ7XG5cbiAgICAvKipcbiAgICAgKiBjYWxsIGFwaSwgdXNlIHNlYXJjaCB0byBjYWxsXG4gICAgICogbW92aWVzIHRvIHBvcHVsYXRlIHJlc3VsdHNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZWFyY2hBbGwoKSB7XG4gICAgICAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvc2VhcmNoL21vdmllP2FwaV9rZXk9YWI1OGNhYjM3MjYxMmUzN2Y1M2JiYTg5NzBhZTExYTEmbGFuZ3VhZ2U9ZW4tVVMmcXVlcnk9JyArICRzY29wZS5zZWFyY2ggKyAnJnBhZ2U9MSZpbmNsdWRlX2FkdWx0PWZhbHNlJylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAkc2NvcGUubGlzdE9mTW92aWVzID0gcmVzcG9uc2UuZGF0YS5yZXN1bHRzO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5saXN0T2ZNb3ZpZXMpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNhbGwgYXBpXG4gICAgICogZ2V0IHRoZSBsYXRlc3QgbW92aWVzXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0TGF0ZXN0KCkge1xuICAgICAgJGh0dHAuZ2V0KCdodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL21vdmllL2xhdGVzdD9hcGlfa2V5PWFiNThjYWIzNzI2MTJlMzdmNTNiYmE4OTcwYWUxMWExJmxhbmd1YWdlPWVuLVVTJylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAkc2NvcGUubGF0ZXN0TW92aWVzID0gcmVzcG9uc2UuZGF0YS5yZXN1bHRzO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRMYXRlc3QoKTtcbiAgfSk7XG5cbiAgYXBwLmNvbnRyb2xsZXIoJ3Jlc3VsdE1vdmllcycsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRsb2NhdGlvbikge1xuXG4gICAgdmFyIHBJZCA9ICRsb2NhdGlvbi5wYXRoKCkuc3BsaXQoL1tcXHMvXSsvKS5wb3AoKTtcbiAgICAkc2NvcGUuYmFzZVVybCA9ICdodHRwOi8vaW1hZ2UudG1kYi5vcmcvdC9wL3czMDAvJztcbiAgICAkc2NvcGUubW92aWVEZXRhaWw7XG4gICAgJHNjb3BlLnJlbGF0ZWRSZXN1bHRzO1xuICAgICRzY29wZS5jYXN0O1xuICAgICRzY29wZS5tb3ZpZUlEID0gcElkO1xuXG4gICAgLyoqXG4gICAgICogc2V0IGNoZWtib3hlcyB0byBjaGVja2VkIGJ5IGRlZmF1bHRcbiAgICAgKi9cbiAgICAkc2NvcGUubW92aWVPcHRpb25zID0ge1xuICAgICAgcG9zdGVyOiB0cnVlLFxuICAgICAgaW5mbzogdHJ1ZSxcbiAgICAgIHJlbGF0ZWQ6IHRydWUsXG4gICAgICByZXZpZXdzOiB0cnVlLFxuICAgICAgY2FzdDogdHJ1ZSxcbiAgICAgIGV4dHJhczogdHJ1ZVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBjYWxsIGFwaSwgdXNlIHRoZSBtb3ZpZSBpZFxuICAgICAqIHRvIGdldCBzcGVjaWZpYyBpbmZvXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0U3BlY2lmaWMoKSB7XG4gICAgICAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvbW92aWUvJyArICRzY29wZS5tb3ZpZUlEICsgJz9hcGlfa2V5PTNmY2M0YzE4ZDZkZjUzYzA2ZDI3NzZlZTU2ZGYxOTE4Jmxhbmd1YWdlPWVuLVVTJnBhZ2U9MScpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgJHNjb3BlLm1vdmllRGV0YWlsID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2FsbCBhcGksIGdldCByZWxhdGVkXG4gICAgICogbW92aWVzXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0UmVsYXRlZFJlc3VsdHMoKSB7XG4gICAgICAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvbW92aWUvJyArICRzY29wZS5tb3ZpZUlEICsgJy9zaW1pbGFyP2FwaV9rZXk9YWI1OGNhYjM3MjYxMmUzN2Y1M2JiYTg5NzBhZTExYTEmbGFuZ3VhZ2U9ZW4tVVMmcGFnZT0xJylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAkc2NvcGUucmVsYXRlZFJlc3VsdHMgPSByZXNwb25zZS5kYXRhLnJlc3VsdHM7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNhbGwgYXBpLCBnZXQgY2FzdCBtZW1iZXJzXG4gICAgICogZnJvbSBtb3ZpZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldENhc3QoKSB7XG4gICAgICAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvbW92aWUvJyArICRzY29wZS5tb3ZpZUlEICsgJy9jcmVkaXRzP2FwaV9rZXk9YWI1OGNhYjM3MjYxMmUzN2Y1M2JiYTg5NzBhZTExYTEmbGFuZ3VhZ2U9ZW4tVVMmcGFnZT0xJylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAkc2NvcGUuY2FzdCA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldCB0aGUgbW92aWVcbiAgICAgKi9cbiAgICBnZXRTcGVjaWZpYygpO1xuXG4gICAgLyoqXG4gICAgICogZ2V0IHRoZSByZWxhdGVkIG1vdmllc1xuICAgICAqL1xuICAgIGdldFJlbGF0ZWRSZXN1bHRzKCk7XG5cbiAgICAvKipcbiAgICAgKiBnZXQgdGhlIGNhc3RcbiAgICAgKi9cbiAgICBnZXRDYXN0KCk7XG4gIH0pO1xuXG4gIGFwcC5jb250cm9sbGVyKCdzZWFyY2hUdicsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRyb3V0ZVBhcmFtcykge1xuXG4gICAgJHNjb3BlLnR2U2VhcmNoPSAnJztcbiAgICAkc2NvcGUuYmFzZVVybCA9ICdodHRwOi8vaW1hZ2UudG1kYi5vcmcvdC9wL3czMDAvJztcbiAgICAkc2NvcGUubGlzdE9mU2hvd3M7XG4gICAgJHNjb3BlLklEID0gJHJvdXRlUGFyYW1zLklEO1xuXG4gICAgJHNjb3BlLiRyb3V0ZSA9ICRyb3V0ZVBhcmFtcztcblxuICAgIC8qKlxuICAgICAqIGNsaWNrIG9uIHN1Z2dlc3RlZCBpdGVtXG4gICAgICogdXBkYXRlIGlucHV0IHZhbHVlc1xuICAgICAqL1xuICAgICRzY29wZS5zdWdnZXN0ZWRVcGRhdGUgPSBmdW5jdGlvbih0dikge1xuICAgICAgJHNjb3BlLnR2U2VhcmNoID0gdHYubmFtZTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLiR3YXRjaCgndHZTZWFyY2gnLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgc2VhcmNoVHYoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIGNhbGwgYXBpLCB1c2Ugc2VhcmNoIHRvIGNhbGxcbiAgICAgKiB0diBzaG93cywgcG9wdWxhdGUgcmVzdWx0c1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNlYXJjaFR2KCkge1xuICAgICAgJGh0dHAuZ2V0KCdodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL3NlYXJjaC90dj9hcGlfa2V5PWFiNThjYWIzNzI2MTJlMzdmNTNiYmE4OTcwYWUxMWExJmxhbmd1YWdlPWVuLVVTJnF1ZXJ5PScgKyAkc2NvcGUudHZTZWFyY2ggKyAnJnBhZ2U9MSZpbmNsdWRlX2FkdWx0PWZhbHNlJylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAkc2NvcGUubGlzdE9mU2hvd3MgPSByZXNwb25zZS5kYXRhLnJlc3VsdHM7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNhbGwgYXBpXG4gICAgICogZ2V0IHRoZSBsYXRlc3QgdHYgc2hvd3NcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRMYXRlc3QoKSB7XG4gICAgICAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvdHYvcG9wdWxhcj9hcGlfa2V5PWFiNThjYWIzNzI2MTJlMzdmNTNiYmE4OTcwYWUxMWExJmxhbmd1YWdlPWVuLVVTJylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAkc2NvcGUubGF0ZXN0U2hvd3MgPSByZXNwb25zZS5kYXRhLnJlc3VsdHM7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldExhdGVzdCgpO1xuICB9KTtcblxuICBhcHAuY29udHJvbGxlcigncmVzdWx0VHYnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkbG9jYXRpb24pIHtcblxuICAgIHZhciBwSWQgPSAkbG9jYXRpb24ucGF0aCgpLnNwbGl0KC9bXFxzL10rLykucG9wKCk7XG4gICAgJHNjb3BlLmJhc2VVcmwgPSAnaHR0cDovL2ltYWdlLnRtZGIub3JnL3QvcC93MzAwLyc7XG4gICAgJHNjb3BlLnR2RGV0YWlsO1xuICAgICRzY29wZS5jYXN0RGV0YWlsO1xuICAgICRzY29wZS50dklEID0gcElkO1xuXG4gICAgLyoqXG4gICAgICogc2V0IGNoZWtib3hlcyB0byBjaGVja2VkIGJ5IGRlZmF1bHRcbiAgICAgKi9cbiAgICAkc2NvcGUudHZPcHRpb25zID0ge1xuICAgICAgcG9zdGVyOiB0cnVlLFxuICAgICAgaW5mbzogdHJ1ZSxcbiAgICAgIHJlbGF0ZWQ6IHRydWUsXG4gICAgICBjYXN0OiB0cnVlLFxuICAgICAgZXh0cmFzOiB0cnVlLFxuICAgICAgc2Vhc29uczogdHJ1ZVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBjYWxsIGFwaSwgdXNlIHRoZSBtb3ZpZSBpZFxuICAgICAqIHRvIGdldCBzcGVjaWZpYyBpbmZvXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0U3BlY2lmaWMoKSB7XG4gICAgICAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvdHYvJyArICRzY29wZS50dklEICsgJz9hcGlfa2V5PWFiNThjYWIzNzI2MTJlMzdmNTNiYmE4OTcwYWUxMWExJmxhbmd1YWdlPWVuLVVTJnBhZ2U9MScpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgJHNjb3BlLnR2RGV0YWlsID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2FsbCBhcGksIGdldCByZWxhdGVkXG4gICAgICogc2hvd3NcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRSZWxhdGVkVHZSZXN1bHRzKCkge1xuICAgICAgJGh0dHAuZ2V0KCdodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL3R2LycgKyAkc2NvcGUudHZJRCArICcvc2ltaWxhcj9hcGlfa2V5PWFiNThjYWIzNzI2MTJlMzdmNTNiYmE4OTcwYWUxMWExJmxhbmd1YWdlPWVuLVVTJnBhZ2U9MScpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgJHNjb3BlLnJlbGF0ZWRUdlJlc3VsdHMgPSByZXNwb25zZS5kYXRhLnJlc3VsdHM7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvL1xuICAgIC8qKlxuICAgICAqIGNhbGwgYXBpLCBnZXQgY2FzdCBtZW1iZXJzXG4gICAgICogZnJvbSBtb3ZpZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldENhc3QoKSB7XG4gICAgICAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvdHYvJyArICRzY29wZS50dklEICsgJy9jcmVkaXRzP2FwaV9rZXk9YWI1OGNhYjM3MjYxMmUzN2Y1M2JiYTg5NzBhZTExYTEmbGFuZ3VhZ2U9ZW4tVVMmcGFnZT0xJylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAkc2NvcGUuY2FzdERldGFpbCA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmNhc3REZXRhaWwpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldCB0aGUgbW92aWVcbiAgICAgKi9cbiAgICBnZXRTcGVjaWZpYygpO1xuXG4gICAgLyoqXG4gICAgICogZ2V0IHRoZSByZWxhdGVkIHNob3dzXG4gICAgICovXG4gICAgZ2V0UmVsYXRlZFR2UmVzdWx0cygpO1xuXG4gICAgLyoqXG4gICAgICogZ2V0IHRoZSBjYXN0XG4gICAgICovXG4gICAgZ2V0Q2FzdCgpO1xuICB9KTtcblxuICBhcHAuZGlyZWN0aXZlKCdwcmV2ZW50RGVmYXVsdCcsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfSk7XG5cbiAgYXBwLmRpcmVjdGl2ZSgnc2Nyb2xsSWYnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJpYnV0ZXMpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChzY29wZS4kZXZhbChhdHRyaWJ1dGVzLnNjcm9sbElmKSkge1xuICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBlbGVtZW50WzBdLm9mZnNldFRvcCAtIDEwMCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gIH0pO1xufSgpKTtcbiJdLCJmaWxlIjoibWFpbi5qcyJ9
