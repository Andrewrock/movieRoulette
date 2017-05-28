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

    $scope.isActive = function (viewLocation) {
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
