'use strict';(function () {
  'use strict';

  var app = angular.module("myApp", ['ngRoute']);

  /**
                                                   * configure routes
                                                   */

  app.config(function ($routeProvider) {
    $routeProvider.

    when('/', {
      templateUrl: 'partials/search.html',
      controller: 'searchMovies' }).


    when('/results/:ID', {
      templateUrl: 'partials/results.html',
      controller: 'resultMovies' }).


    when('/tv', {
      templateUrl: 'partials/tv-search.html',
      controller: 'searchTv',
      activeTab: 'tv' }).


    when('/tvResults/:ID', {
      templateUrl: 'partials/tv-results.html',
      controller: 'resultTv' }).



    otherwise({
      redirectTo: '/' });


  });


  app.controller('headerController', function ($scope, $location) {

    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

  });


  app.controller('searchMovies', function ($scope, $http, $routeParams) {

    $scope.search = '';
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
    "Dawn of the Dead"];


    $scope.$route = $routeParams;


    var movieArray = $scope.movieArray;
    var movieCounter = 0;

    /**
                           * shuffle array
                           * array of movies.
                           */
    function shuffle(array) {
      var currentIndex = array.length,temporaryValue,randomIndex;

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
    $scope.updateRandomMovie = function (movie) {
      $scope.search = movieArray[movieCounter++ % movieArray.length];
    };

    /**
        * click on suggested item
        * update input values
        */
    $scope.suggestedUpdate = function (movie) {
      $scope.search = movie;
    };

    $scope.$watch('search', function (newValue, oldValue) {
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
      $http.get('https://api.themoviedb.org/3/search/movie?api_key=ab58cab372612e37f53bba8970ae11a1&language=en-US&query=' + $scope.search + '&page=1&include_adult=false').
      then(function (response) {
        $scope.listOfMovies = response.data.results;
        console.log($scope.listOfMovies);
      });
    }

    /**
       * call api
       * get the latest movies
       */
    function getLatest() {
      $http.get('https://api.themoviedb.org/3/movie/latest?api_key=ab58cab372612e37f53bba8970ae11a1&language=en-US').
      then(function (response) {
        $scope.latestMovies = response.data.results;
      });
    }

    getLatest();
  });

  app.controller('resultMovies', function ($scope, $http, $location) {

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
      extras: true };


    /**
                       * call api, use the movie id
                       * to get specific info
                       */
    function getSpecific() {
      $http.get('https://api.themoviedb.org/3/movie/' + $scope.movieID + '?api_key=3fcc4c18d6df53c06d2776ee56df1918&language=en-US&page=1').
      then(function (response) {
        $scope.movieDetail = response.data;
      });
    }

    /**
       * call api, get related
       * movies
       */
    function getRelatedResults() {
      $http.get('https://api.themoviedb.org/3/movie/' + $scope.movieID + '/similar?api_key=ab58cab372612e37f53bba8970ae11a1&language=en-US&page=1').
      then(function (response) {
        $scope.relatedResults = response.data.results;
      });
    }

    /**
       * call api, get cast members
       * from movie
       */
    function getCast() {
      $http.get('https://api.themoviedb.org/3/movie/' + $scope.movieID + '/credits?api_key=ab58cab372612e37f53bba8970ae11a1&language=en-US&page=1').
      then(function (response) {
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

  app.controller('searchTv', function ($scope, $http, $routeParams) {

    $scope.tvSearch = '';
    $scope.baseUrl = 'http://image.tmdb.org/t/p/w300/';
    $scope.listOfShows;
    $scope.ID = $routeParams.ID;

    $scope.$route = $routeParams;

    /**
                                   * click on suggested item
                                   * update input values
                                   */
    $scope.suggestedUpdate = function (tv) {
      $scope.tvSearch = tv.name;
    };

    $scope.$watch('tvSearch', function (newValue, oldValue) {
      if (newValue !== oldValue) {
        searchTv();
      }
    });

    /**
         * call api, use search to call
         * tv shows, populate results
         */
    function searchTv() {
      $http.get('https://api.themoviedb.org/3/search/tv?api_key=ab58cab372612e37f53bba8970ae11a1&language=en-US&query=' + $scope.tvSearch + '&page=1&include_adult=false').
      then(function (response) {
        $scope.listOfShows = response.data.results;
      });
    }

    /**
       * call api
       * get the latest tv shows
       */
    function getLatest() {
      $http.get('https://api.themoviedb.org/3/tv/popular?api_key=ab58cab372612e37f53bba8970ae11a1&language=en-US').
      then(function (response) {
        $scope.latestShows = response.data.results;
      });
    }

    getLatest();
  });

  app.controller('resultTv', function ($scope, $http, $location) {

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
      seasons: true };


    /**
                        * call api, use the movie id
                        * to get specific info
                        */
    function getSpecific() {
      $http.get('https://api.themoviedb.org/3/tv/' + $scope.tvID + '?api_key=ab58cab372612e37f53bba8970ae11a1&language=en-US&page=1').
      then(function (response) {
        $scope.tvDetail = response.data;
      });
    }

    /**
       * call api, get related
       * shows
       */
    function getRelatedTvResults() {
      $http.get('https://api.themoviedb.org/3/tv/' + $scope.tvID + '/similar?api_key=ab58cab372612e37f53bba8970ae11a1&language=en-US&page=1').
      then(function (response) {
        $scope.relatedTvResults = response.data.results;
      });
    }
    //
    /**
     * call api, get cast members
     * from movie
     */
    function getCast() {
      $http.get('https://api.themoviedb.org/3/tv/' + $scope.tvID + '/credits?api_key=ab58cab372612e37f53bba8970ae11a1&language=en-US&page=1').
      then(function (response) {
        $scope.castDetail = response.data;
        console.log($scope.castDetail);
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

  app.directive('preventDefault', function () {
    return function (scope, element, attrs) {
      angular.element(element).bind('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
      });
    };
  });

  app.directive('scrollIf', function () {
    return function (scope, element, attributes) {
      setTimeout(function () {
        if (scope.$eval(attributes.scrollIf)) {
          window.scrollTo(0, element[0].offsetTop - 100);
        }
      });
    };
  });
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBwIiwiYW5ndWxhciIsIm1vZHVsZSIsImNvbmZpZyIsIiRyb3V0ZVByb3ZpZGVyIiwid2hlbiIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsImFjdGl2ZVRhYiIsIm90aGVyd2lzZSIsInJlZGlyZWN0VG8iLCIkc2NvcGUiLCIkbG9jYXRpb24iLCJpc0FjdGl2ZSIsInZpZXdMb2NhdGlvbiIsInBhdGgiLCIkaHR0cCIsIiRyb3V0ZVBhcmFtcyIsInNlYXJjaCIsImJhc2VVcmwiLCJsaXN0T2ZNb3ZpZXMiLCJsYXRlc3RNb3ZpZXMiLCJtb3ZpZUFycmF5IiwiJHJvdXRlIiwibW92aWVDb3VudGVyIiwic2h1ZmZsZSIsImFycmF5IiwiY3VycmVudEluZGV4IiwibGVuZ3RoIiwidGVtcG9yYXJ5VmFsdWUiLCJyYW5kb21JbmRleCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbU1vdmllIiwic3VnZ2VzdE1vdmllQXJyYXkiLCJzdWdnZXN0UmFuZG9tTW92aWUiLCJ1cGRhdGVSYW5kb21Nb3ZpZSIsIm1vdmllIiwic3VnZ2VzdGVkVXBkYXRlIiwiJHdhdGNoIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsInNlYXJjaEFsbCIsIklEIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwiZGF0YSIsInJlc3VsdHMiLCJjb25zb2xlIiwibG9nIiwiZ2V0TGF0ZXN0IiwicElkIiwic3BsaXQiLCJwb3AiLCJtb3ZpZURldGFpbCIsInJlbGF0ZWRSZXN1bHRzIiwiY2FzdCIsIm1vdmllSUQiLCJtb3ZpZU9wdGlvbnMiLCJwb3N0ZXIiLCJpbmZvIiwicmVsYXRlZCIsInJldmlld3MiLCJleHRyYXMiLCJnZXRTcGVjaWZpYyIsImdldFJlbGF0ZWRSZXN1bHRzIiwiZ2V0Q2FzdCIsInR2U2VhcmNoIiwibGlzdE9mU2hvd3MiLCJ0diIsIm5hbWUiLCJzZWFyY2hUdiIsImxhdGVzdFNob3dzIiwidHZEZXRhaWwiLCJjYXN0RGV0YWlsIiwidHZJRCIsInR2T3B0aW9ucyIsInNlYXNvbnMiLCJnZXRSZWxhdGVkVHZSZXN1bHRzIiwicmVsYXRlZFR2UmVzdWx0cyIsImRpcmVjdGl2ZSIsInNjb3BlIiwiZWxlbWVudCIsImF0dHJzIiwiYmluZCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJhdHRyaWJ1dGVzIiwic2V0VGltZW91dCIsIiRldmFsIiwic2Nyb2xsSWYiLCJ3aW5kb3ciLCJzY3JvbGxUbyIsIm9mZnNldFRvcCJdLCJtYXBwaW5ncyI6ImFBQUMsYUFBVTtBQUNUOztBQUVBLE1BQUlBLE1BQU1DLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCLENBQUMsU0FBRCxDQUF4QixDQUFWOztBQUVBOzs7O0FBSUFGLE1BQUlHLE1BQUosQ0FBVyxVQUFTQyxjQUFULEVBQXlCO0FBQ2xDQTs7QUFFR0MsUUFGSCxDQUVRLEdBRlIsRUFFYTtBQUNUQyxtQkFBYyxzQkFETDtBQUVUQyxrQkFBYyxjQUZMLEVBRmI7OztBQU9HRixRQVBILENBT1EsY0FQUixFQU93QjtBQUNwQkMsbUJBQWMsdUJBRE07QUFFcEJDLGtCQUFjLGNBRk0sRUFQeEI7OztBQVlHRixRQVpILENBWVEsS0FaUixFQVllO0FBQ1hDLG1CQUFjLHlCQURIO0FBRVhDLGtCQUFjLFVBRkg7QUFHWEMsaUJBQVcsSUFIQSxFQVpmOzs7QUFrQkdILFFBbEJILENBa0JRLGdCQWxCUixFQWtCMEI7QUFDdEJDLG1CQUFjLDBCQURRO0FBRXRCQyxrQkFBYyxVQUZRLEVBbEIxQjs7OztBQXdCR0UsYUF4QkgsQ0F3QmE7QUFDVEMsa0JBQVksR0FESCxFQXhCYjs7O0FBNEJELEdBN0JEOzs7QUFnQ0FWLE1BQUlPLFVBQUosQ0FBZSxrQkFBZixFQUFtQyxVQUFTSSxNQUFULEVBQWlCQyxTQUFqQixFQUE0Qjs7QUFFN0RELFdBQU9FLFFBQVAsR0FBa0IsVUFBU0MsWUFBVCxFQUF1QjtBQUN2QyxhQUFPQSxpQkFBaUJGLFVBQVVHLElBQVYsRUFBeEI7QUFDRCxL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dGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKFwibXlBcHBcIiwgWyduZ1JvdXRlJ10pO1xuXG4gIC8qKlxuICAgKiBjb25maWd1cmUgcm91dGVzXG4gICAqL1xuXG4gIGFwcC5jb25maWcoZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcbiAgICAkcm91dGVQcm92aWRlclxuXG4gICAgICAud2hlbignLycsIHtcbiAgICAgICAgdGVtcGxhdGVVcmwgOiAncGFydGlhbHMvc2VhcmNoLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyICA6ICdzZWFyY2hNb3ZpZXMnXG4gICAgICB9KVxuXG4gICAgICAud2hlbignL3Jlc3VsdHMvOklEJywge1xuICAgICAgICB0ZW1wbGF0ZVVybCA6ICdwYXJ0aWFscy9yZXN1bHRzLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyICA6ICdyZXN1bHRNb3ZpZXMnXG4gICAgICB9KVxuXG4gICAgICAud2hlbignL3R2Jywge1xuICAgICAgICB0ZW1wbGF0ZVVybCA6ICdwYXJ0aWFscy90di1zZWFyY2guaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXIgIDogJ3NlYXJjaFR2JyxcbiAgICAgICAgYWN0aXZlVGFiOiAndHYnXG4gICAgICB9KVxuXG4gICAgICAud2hlbignL3R2UmVzdWx0cy86SUQnLCB7XG4gICAgICAgIHRlbXBsYXRlVXJsIDogJ3BhcnRpYWxzL3R2LXJlc3VsdHMuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXIgIDogJ3Jlc3VsdFR2J1xuICAgICAgfSlcblxuXG4gICAgICAub3RoZXJ3aXNlKHtcbiAgICAgICAgcmVkaXJlY3RUbzogJy8nXG4gICAgICB9KTtcblxuICB9KTtcblxuXG4gIGFwcC5jb250cm9sbGVyKCdoZWFkZXJDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9jYXRpb24pIHtcblxuICAgICRzY29wZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uKHZpZXdMb2NhdGlvbikge1xuICAgICAgcmV0dXJuIHZpZXdMb2NhdGlvbiA9PT0gJGxvY2F0aW9uLnBhdGgoKTtcbiAgICB9O1xuXG4gIH0pO1xuXG5cbiAgYXBwLmNvbnRyb2xsZXIoJ3NlYXJjaE1vdmllcycsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRyb3V0ZVBhcmFtcykge1xuXG4gICAgJHNjb3BlLnNlYXJjaD0gJyc7XG4gICAgJHNjb3BlLmJhc2VVcmwgPSAnaHR0cDovL2ltYWdlLnRtZGIub3JnL3QvcC93MzAwLyc7XG4gICAgJHNjb3BlLmxpc3RPZk1vdmllcztcbiAgICAkc2NvcGUubGF0ZXN0TW92aWVzO1xuICAgICRzY29wZS5tb3ZpZUFycmF5ID0gW1xuICAgICAgXCJQdWxwIEZpY3Rpb25cIixcbiAgICAgIFwiRmlnaHQgQ2x1YlwiLFxuICAgICAgXCJUaGUgU2hhd3NoYW5rIFJlZGVtcHRpb25cIixcbiAgICAgIFwiVGhlIERhcmsgS25pZ2h0XCIsXG4gICAgICBcIkluZ2xvdXJpb3VzIEJhc3RlcmRzXCIsXG4gICAgICBcIkluY2VwdGlvblwiLFxuICAgICAgXCJUaGUgTWF0cml4XCIsXG4gICAgICBcIlRoZSBFbXBpcmUgU3RyaWtlcyBCYWNrXCIsXG4gICAgICBcIlRoZSBMb3JkIG9mIHRoZSBSaW5nczogVGhlIEZlbGxvd3NoaXAgb2YgdGhlIFJpbmdcIixcbiAgICAgIFwiVG95IFN0b3J5XCIsXG4gICAgICBcIlRoZSBCaWcgTGVib3dza2lcIixcbiAgICAgIFwiRGphbmdvIFVuY2hhaW5lZFwiLFxuICAgICAgXCJUaGUgTG9yZCBvZiB0aGUgUmluZ3M6IFRoZSBSZXR1cm4gb2YgdGhlIEtpbmdcIixcbiAgICAgIFwiVGhlIERlcGFydGVkXCIsXG4gICAgICBcIk1lbWVudG9cIixcbiAgICAgIFwiVGhlIEdvZGZhdGhlclwiLFxuICAgICAgXCJSZXNlcnZvaXIgRG9nc1wiLFxuICAgICAgXCJTYXZpbmcgUHJpdmF0ZSBSeWFuXCIsXG4gICAgICBcIkZvcnJlc3QgR3VtcFwiLFxuICAgICAgXCJNb250eSBQeXRob24gYW5kIHRoZSBIb2x5IEdyYWlsXCIsXG4gICAgICBcIlNlZW5cIixcbiAgICAgIFwiQmFjayB0byB0aGUgRnV0dXJlXCIsXG4gICAgICBcIkdvb2RGZWxsYXNcIixcbiAgICAgIFwiVGhlIFByZXN0aWdlXCIsXG4gICAgICBcIlNoYXVuIG9mIHRoZSBEZWFkXCIsXG4gICAgICBcIkFsaWVuXCIsXG4gICAgICBcIlRoZSBTaWxlbmNlIG9mIHRoZSBMYW1ic1wiLFxuICAgICAgXCJUaGUgTG9yZCBvZiB0aGUgUmluZ3M6IFRoZSBUd28gVG93ZXJzXCIsXG4gICAgICBcIlNwaXJpdGVkIEF3YXlcIixcbiAgICAgIFwiVGhlIEdvb2QsIHRoZSBCYWQgYW5kIHRoZSBVZ2x5XCIsXG4gICAgICBcIkV0ZXJuYWwgU3Vuc2hpbmUgb2YgdGhlIFNwb3RsZXNzIE1pbmRcIixcbiAgICAgIFwiUmFpZGVycyBvZiB0aGUgTG9zdCBBcmtcIixcbiAgICAgIFwiQSBTcGFjZSBPZHlzc2V5XCIsXG4gICAgICBcIkRyLiBTdHJhbmdlbG92ZVwiLFxuICAgICAgXCJCbGFkZSBSdW5uZXJcIixcbiAgICAgIFwiVGhlIExpb24gS2luZ1wiLFxuICAgICAgXCJPbmUgRmxldyBPdmVyIHRoZSBDdWNrb28ncyBOZXN0XCIsXG4gICAgICBcIlRoZXJlIFdpbGwgQmUgQmxvb2RcIixcbiAgICAgIFwiVGhlIFNoaW5pbmdcIixcbiAgICAgIFwiVGhlIFRydW1hbiBTaG93XCIsXG4gICAgICBcIkEgQ2xvY2t3b3JrIE9yYW5nZVwiLFxuICAgICAgXCJTdGFyIFdhcnNcIixcbiAgICAgIFwiRGlzdHJpY3QgOVwiLFxuICAgICAgXCJVcFwiLFxuICAgICAgXCJPZmZpY2UgU3BhY2VcIixcbiAgICAgIFwiMTIgQW5ncnkgTWVuXCIsXG4gICAgICBcIlBhbidzIExhYnlyaW50aFwiLFxuICAgICAgXCJUaGUgVXN1YWwgU3VzcGVjdHNcIixcbiAgICAgIFwiSnVyYXNzaWMgUGFya1wiLFxuICAgICAgXCJWIGZvciBWZW5kZXR0YVwiLFxuICAgICAgXCJUaGUgUHJpbmNlc3MgQnJpZGVcIixcbiAgICAgIFwiTm8gQ291bnRyeSBmb3IgT2xkIE1lblwiLFxuICAgICAgXCJTY2hpbmRsZXIncyBMaXN0XCIsXG4gICAgICBcIkdvb2QgV2lsbCBIdW50aW5nXCIsXG4gICAgICBcIkNoaWxkcmVuIG9mIE1lblwiLFxuICAgICAgXCJLaWxsIEJpbGw6IFZvbC4gMVwiLFxuICAgICAgXCJXQUxMwrdFXCIsXG4gICAgICBcIkFtZXJpY2FuIEhpc3RvcnkgWFwiLFxuICAgICAgXCJEaWUgSGFyZFwiLFxuICAgICAgXCJEcml2ZVwiLFxuICAgICAgXCJNb29uXCIsXG4gICAgICBcIkdyb3VuZGhvZyBEYXlcIixcbiAgICAgIFwiQmF0bWFuIEJlZ2luc1wiLFxuICAgICAgXCJGYXJnb1wiLFxuICAgICAgXCJUaGUgSW5jcmVkaWJsZXNcIixcbiAgICAgIFwiTyBCcm90aGVyLCBXaGVyZSBBcnQgVGhvdVwiLFxuICAgICAgXCJHbGFkaWF0b3JcIixcbiAgICAgIFwiQWlycGxhbmVcIixcbiAgICAgIFwiQW1lcmljYW4gQmVhdXR5XCIsXG4gICAgICBcIlRlcm1pbmF0b3IgMjogSnVkZ21lbnQgRGF5XCIsXG4gICAgICBcIkzDqW9uXCIsXG4gICAgICBcIlRveSBTdG9yeSAzXCIsXG4gICAgICBcIlNuYXRjaFwiLFxuICAgICAgXCJBbWVyaWNhbiBQc3ljaG9cIixcbiAgICAgIFwiVGhlIFNvY2lhbCBOZXR3b3JrXCIsXG4gICAgICBcIk9sZGJveVwiLFxuICAgICAgXCJGZXJyaXMgQnVlbGxlcidzIERheSBPZmZcIixcbiAgICAgIFwiUHJpbmNlc3MgTW9ub25va2VcIixcbiAgICAgIFwiSW4gQnJ1Z2VzXCIsXG4gICAgICBcIkRvbm5pZSBEYXJrb1wiLFxuICAgICAgXCJDYXNhYmxhbmNhXCIsXG4gICAgICBcIkNpdHkgb2YgR29kXCIsXG4gICAgICBcIlBzeWNob1wiLFxuICAgICAgXCJUaGUgRmlmdGggRWxlbWVudFwiLFxuICAgICAgXCJTZXZlbiBTYW11cmFpXCIsXG4gICAgICBcIlRheGkgRHJpdmVyXCIsXG4gICAgICBcIk1vbnN0ZXJzLCBJbmMuXCIsXG4gICAgICBcIjI4IERheXMgTGF0ZXJcIixcbiAgICAgIFwiUmVxdWllbSBmb3IgYSBEcmVhbVwiLFxuICAgICAgXCJUaGUgR29kZmF0aGVyOiBQYXJ0IElJXCIsXG4gICAgICBcIkhvdCBGdXp6XCIsXG4gICAgICBcIlRyYWluc3BvdHRpbmdcIixcbiAgICAgIFwiQW3DqWxpZVwiLFxuICAgICAgXCJUd2VsdmUgTW9ua2V5c1wiLFxuICAgICAgXCJBbGllbnNcIixcbiAgICAgIFwiVGhlIERhcmsgS25pZ2h0IFJpc2VzXCIsXG4gICAgICBcIktpc3MgS2lzcyBCYW5nIEJhbmdcIixcbiAgICAgIFwiTG9zdCBpbiBUcmFuc2xhdGlvblwiLFxuICAgICAgXCJDaGluYXRvd25cIixcbiAgICAgIFwiVGhlIFJveWFsIFRlbm5lbmJhdW1zXCIsXG4gICAgICBcIlJlYXIgV2luZG93XCIsXG4gICAgICBcIkphd3NcIixcbiAgICAgIFwiT2NlYW4ncyBFbGV2ZW5cIixcbiAgICAgIFwiVGhlIEdyZWVuIE1pbGVcIixcbiAgICAgIFwiQmxhY2sgU3dhblwiLFxuICAgICAgXCJDaXRpemVuIEthbmVcIixcbiAgICAgIFwiTG9vcGVyXCIsXG4gICAgICBcIlRoZSBUaGluZ1wiLFxuICAgICAgXCJUaGUgQnJlYWtmYXN0IENsdWJcIixcbiAgICAgIFwiVGhlIENhYmluIGluIHRoZSBXb29kc1wiLFxuICAgICAgXCJMLkEuIENvbmZpZGVudGlhbFwiLFxuICAgICAgXCJTY290dCBQaWxncmltIHZzLiB0aGUgV29ybGRcIixcbiAgICAgIFwiRmluZGluZyBOZW1vXCIsXG4gICAgICBcIkJvb2dpZSBOaWdodHNcIixcbiAgICAgIFwiU3VwZXJiYWRcIixcbiAgICAgIFwiU2luIENpdHlcIixcbiAgICAgIFwiRmVhciBhbmQgTG9hdGhpbmcgaW4gTGFzIFZlZ2FzXCIsXG4gICAgICBcIkluZGlhbmEgSm9uZXMgYW5kIHRoZSBMYXN0IENydXNhZGVcIixcbiAgICAgIFwiVG8gS2lsbCBhIE1vY2tpbmdiaXJkXCIsXG4gICAgICBcIkxhd3JlbmNlIG9mIEFyYWJpYVwiLFxuICAgICAgXCJCZWluZyBKb2huIE1hbGtvdmljaFwiLFxuICAgICAgXCJUaGUgUGlhbmlzdFwiLFxuICAgICAgXCJBbm5pZSBIYWxsXCIsXG4gICAgICBcIkFuY2hvcm1hbjogVGhlIExlZ2VuZCBvZiBSb24gQnVyZ3VuZHlcIixcbiAgICAgIFwiQXJnb1wiLFxuICAgICAgXCJSYWdpbmcgQnVsbFwiLFxuICAgICAgXCJWZXJ0aWdvXCIsXG4gICAgICBcIlRoZSBBdmVuZ2Vyc1wiLFxuICAgICAgXCJCdXRjaCBDYXNzaWR5IGFuZCB0aGUgU3VuZGFuY2UgS2lkXCIsXG4gICAgICBcIkRhemVkIGFuZCBDb25mdXNlZFwiLFxuICAgICAgXCI1MDAgRGF5cyBvZiBTdW1tZXJcIixcbiAgICAgIFwiV2lsbHkgV29ua2EgJiB0aGUgQ2hvY29sYXRlIEZhY3RvcnlcIixcbiAgICAgIFwiVW5mb3JnaXZlblwiLFxuICAgICAgXCJGYW50YXN0aWMgTXIuIEZveFwiLFxuICAgICAgXCJUaGUgSXJvbiBHaWFudFwiLFxuICAgICAgXCJUaGUgVGVybWluYXRvclwiLFxuICAgICAgXCJHaG9zdCBCdXN0ZXJzXCIsXG4gICAgICBcIlRoaXMgSXMgU3BpbmFsIFRhcFwiLFxuICAgICAgXCJHcmFuIFRvcmlub1wiLFxuICAgICAgXCJBZGFwdGF0aW9uLlwiLFxuICAgICAgXCJBIEZpc3RmdWwgb2YgRG9sbGFyc1wiLFxuICAgICAgXCJTdGFuZCBieSBNZVwiLFxuICAgICAgXCJBcG9sbG8gMTNcIixcbiAgICAgIFwiQmxhemluZyBTYWRkbGVzXCIsXG4gICAgICBcIkFtYWRldXNcIixcbiAgICAgIFwiS2ljay1Bc3NcIixcbiAgICAgIFwiUnVzaG1vcmVcIixcbiAgICAgIFwiTGlmZSBvZiBCcmlhblwiLFxuICAgICAgXCJBbG1vc3QgRmFtb3VzXCIsXG4gICAgICBcIk5ldHdvcmtcIixcbiAgICAgIFwiTXVsaG9sbGFuZCBEcml2ZVwiLFxuICAgICAgXCJTdGFyIFRyZWtcIixcbiAgICAgIFwiSXQncyBhIFdvbmRlcmZ1bCBMaWZlXCIsXG4gICAgICBcIlNpbmdpbicgaW4gdGhlIFJhaW5cIixcbiAgICAgIFwiVGhlIEdyYWR1YXRlXCIsXG4gICAgICBcIkNvb2wgSGFuZCBMdWtlXCIsXG4gICAgICBcIlRoZSBOaWdodG1hcmUgQmVmb3JlIENocmlzdG1hc1wiLFxuICAgICAgXCJNZXRyb3BvbGlzXCIsXG4gICAgICBcIkNhc2lubyBSb3lhbGVcIixcbiAgICAgIFwiWm9kaWFjXCIsXG4gICAgICBcIkNyb3VjaGluZyBUaWdlciwgSGlkZGVuIERyYWdvblwiLFxuICAgICAgXCJFLlQuXCIsXG4gICAgICBcIlRoZSBCbHVlcyBCcm90aGVyc1wiLFxuICAgICAgXCJIb3RlbCBSd2FuZGFcIixcbiAgICAgIFwiWm9vbGFuZGVyXCIsXG4gICAgICBcIkhlYXRcIixcbiAgICAgIFwiVGhlIFNldmVudGggU2VhbFwiLFxuICAgICAgXCJLaWxsIEJpbGw6IFZvbC4gMlwiLFxuICAgICAgXCJTdHJhbmdlciBUaGFuIEZpY3Rpb25cIixcbiAgICAgIFwiRG91YmxlIEluZGVtbml0eVwiLFxuICAgICAgXCJPbiB0aGUgV2F0ZXJmcm9udFwiLFxuICAgICAgXCJQcmVkYXRvclwiLFxuICAgICAgXCJMdWNreSBOdW1iZXIgU2xldmluXCIsXG4gICAgICBcIkNhdGNoIE1lIElmIFlvdSBDYW5cIixcbiAgICAgIFwiRHJlZGRcIixcbiAgICAgIFwiQmF0dGxlIFJveWFsZVwiLFxuICAgICAgXCJSb2JvQ29wXCIsXG4gICAgICBcIkhvdyB0byBUcmFpbiBZb3VyIERyYWdvblwiLFxuICAgICAgXCJEb2cgRGF5IEFmdGVybm9vblwiLFxuICAgICAgXCJQbGFuZXQgb2YgdGhlIEFwZXNcIixcbiAgICAgIFwiTWFzdGVyIGFuZCBDb21tYW5kZXI6IFRoZSBGYXIgU2lkZSBvZiB0aGUgV29ybGRcIixcbiAgICAgIFwiUGF0aHMgb2YgR2xvcnlcIixcbiAgICAgIFwiQnJva2ViYWNrIE1vdW50YWluXCIsXG4gICAgICBcIlRoZSBIb2JiaXQ6IEFuIFVuZXhwZWN0ZWQgSm91cm5leVwiLFxuICAgICAgXCJUaGUgV2l6YXJkIG9mIE96XCIsXG4gICAgICBcIkNsb3NlIEVuY291bnRlcnMgb2YgdGhlIFRoaXJkIEtpbmRcIixcbiAgICAgIFwiVGhlIFdyZXN0bGVyXCIsXG4gICAgICBcIlRoZSBKZXJrXCIsXG4gICAgICBcIlNsdW1kb2cgTWlsbGlvbmFpcmVcIixcbiAgICAgIFwiU2lsdmVyIExpbmluZ3MgUGxheWJvb2tcIixcbiAgICAgIFwiR2xlbmdhcnJ5IEdsZW4gUm9zc1wiLFxuICAgICAgXCJTdW5zZXQgQm91bGV2YXJkXCIsXG4gICAgICBcIlJldHVybiBvZiB0aGUgSmVkaVwiLFxuICAgICAgXCJSYW5cIixcbiAgICAgIFwiQ29sbGF0ZXJhbFwiLFxuICAgICAgXCJMZXQgdGhlIFJpZ2h0IE9uZSBJblwiLFxuICAgICAgXCJUaGUgU3RpbmdcIixcbiAgICAgIFwiVHVja2VyIGFuZCBEYWxlIFZzLiBFdmlsXCIsXG4gICAgICBcIlNvbWUgTGlrZSBJdCBIb3RcIixcbiAgICAgIFwiU2h1dHRlciBJc2xhbmRcIixcbiAgICAgIFwiVGhlIE1hbHRlc2UgRmFsY29uXCIsXG4gICAgICBcIlRoZSBUcmVhc3VyZSBvZiB0aGUgU2llcnJhIE1hZHJlXCIsXG4gICAgICBcIlN1bnNoaW5lXCIsXG4gICAgICBcIlB1bmNoLURydW5rIExvdmVcIixcbiAgICAgIFwiTWFnbm9saWFcIixcbiAgICAgIFwiVGhhbmsgWW91IGZvciBTbW9raW5nXCIsXG4gICAgICBcIlRoZSBIdXJ0IExvY2tlclwiLFxuICAgICAgXCJEYXduIG9mIHRoZSBEZWFkXCJcbiAgICBdO1xuXG4gICAgJHNjb3BlLiRyb3V0ZSA9ICRyb3V0ZVBhcmFtcztcblxuXG4gICAgdmFyIG1vdmllQXJyYXkgPSAkc2NvcGUubW92aWVBcnJheTtcbiAgICB2YXIgbW92aWVDb3VudGVyID0gMDtcblxuICAgIC8qKlxuICAgICAqIHNodWZmbGUgYXJyYXlcbiAgICAgKiBhcnJheSBvZiBtb3ZpZXMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2h1ZmZsZShhcnJheSkge1xuICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aCwgdGVtcG9yYXJ5VmFsdWUsIHJhbmRvbUluZGV4O1xuXG4gICAgICAvLyBXaGlsZSB0aGVyZSByZW1haW4gZWxlbWVudHMgdG8gc2h1ZmZsZS4uLlxuICAgICAgd2hpbGUgKDAgIT09IGN1cnJlbnRJbmRleCkge1xuICAgICAgICAvLyBQaWNrIGEgcmVtYWluaW5nIGVsZW1lbnQuLi5cbiAgICAgICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xuICAgICAgICBjdXJyZW50SW5kZXggLT0gMTtcblxuICAgICAgICAvLyBBbmQgc3dhcCBpdCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAgICAgIHRlbXBvcmFyeVZhbHVlID0gYXJyYXlbY3VycmVudEluZGV4XTtcbiAgICAgICAgYXJyYXlbY3VycmVudEluZGV4XSA9IGFycmF5W3JhbmRvbUluZGV4XTtcbiAgICAgICAgYXJyYXlbcmFuZG9tSW5kZXhdID0gdGVtcG9yYXJ5VmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhcnJheTtcbiAgICB9XG5cbiAgICAkc2NvcGUubW92aWVBcnJheSA9IHNodWZmbGUobW92aWVBcnJheSk7XG4gICAgJHNjb3BlLnJhbmRvbU1vdmllID0gJHNjb3BlLm1vdmllQXJyYXk7XG5cbiAgICAkc2NvcGUuc3VnZ2VzdE1vdmllQXJyYXkgPSBzaHVmZmxlKCRzY29wZS5tb3ZpZUFycmF5KTtcbiAgICAkc2NvcGUuc3VnZ2VzdFJhbmRvbU1vdmllID0gJHNjb3BlLnN1Z2dlc3RNb3ZpZUFycmF5O1xuXG5cbiAgICAvKipcbiAgICAgKiBDbGljayBvbiByYW5kb20gbW92aWVcbiAgICAgKiBsb29wIHRocm91Z2ggc3VnZ2VzdGVkIG1vdmllc1xuICAgICAqIGFuZCBwb3B1bGF0ZSBzZWFyY2ggZmllbGRcbiAgICAgKi9cbiAgICAkc2NvcGUudXBkYXRlUmFuZG9tTW92aWUgPSBmdW5jdGlvbihtb3ZpZSl7XG4gICAgICAkc2NvcGUuc2VhcmNoID0gbW92aWVBcnJheVttb3ZpZUNvdW50ZXIrKyAlIG1vdmllQXJyYXkubGVuZ3RoXTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogY2xpY2sgb24gc3VnZ2VzdGVkIGl0ZW1cbiAgICAgKiB1cGRhdGUgaW5wdXQgdmFsdWVzXG4gICAgICovXG4gICAgJHNjb3BlLnN1Z2dlc3RlZFVwZGF0ZSA9IGZ1bmN0aW9uKG1vdmllKSB7XG4gICAgICAkc2NvcGUuc2VhcmNoID0gbW92aWU7XG4gICAgfTtcblxuICAgICRzY29wZS4kd2F0Y2goJ3NlYXJjaCcsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICBzZWFyY2hBbGwoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRzY29wZS5JRCA9ICRyb3V0ZVBhcmFtcy5JRDtcblxuICAgIC8qKlxuICAgICAqIGNhbGwgYXBpLCB1c2Ugc2VhcmNoIHRvIGNhbGxcbiAgICAgKiBtb3ZpZXMgdG8gcG9wdWxhdGUgcmVzdWx0c1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNlYXJjaEFsbCgpIHtcbiAgICAgICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9zZWFyY2gvbW92aWU/YXBpX2tleT1hYjU4Y2FiMzcyNjEyZTM3ZjUzYmJhODk3MGFlMTFhMSZsYW5ndWFnZT1lbi1VUyZxdWVyeT0nICsgJHNjb3BlLnNlYXJjaCArICcmcGFnZT0xJmluY2x1ZGVfYWR1bHQ9ZmFsc2UnKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICRzY29wZS5saXN0T2ZNb3ZpZXMgPSByZXNwb25zZS5kYXRhLnJlc3VsdHM7XG4gICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmxpc3RPZk1vdmllcylcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2FsbCBhcGlcbiAgICAgKiBnZXQgdGhlIGxhdGVzdCBtb3ZpZXNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRMYXRlc3QoKSB7XG4gICAgICAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvbW92aWUvbGF0ZXN0P2FwaV9rZXk9YWI1OGNhYjM3MjYxMmUzN2Y1M2JiYTg5NzBhZTExYTEmbGFuZ3VhZ2U9ZW4tVVMnKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICRzY29wZS5sYXRlc3RNb3ZpZXMgPSByZXNwb25zZS5kYXRhLnJlc3VsdHM7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldExhdGVzdCgpO1xuICB9KTtcblxuICBhcHAuY29udHJvbGxlcigncmVzdWx0TW92aWVzJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJGxvY2F0aW9uKSB7XG5cbiAgICB2YXIgcElkID0gJGxvY2F0aW9uLnBhdGgoKS5zcGxpdCgvW1xccy9dKy8pLnBvcCgpO1xuICAgICRzY29wZS5iYXNlVXJsID0gJ2h0dHA6Ly9pbWFnZS50bWRiLm9yZy90L3AvdzMwMC8nO1xuICAgICRzY29wZS5tb3ZpZURldGFpbDtcbiAgICAkc2NvcGUucmVsYXRlZFJlc3VsdHM7XG4gICAgJHNjb3BlLmNhc3Q7XG4gICAgJHNjb3BlLm1vdmllSUQgPSBwSWQ7XG5cbiAgICAvKipcbiAgICAgKiBzZXQgY2hla2JveGVzIHRvIGNoZWNrZWQgYnkgZGVmYXVsdFxuICAgICAqL1xuICAgICRzY29wZS5tb3ZpZU9wdGlvbnMgPSB7XG4gICAgICBwb3N0ZXI6IHRydWUsXG4gICAgICBpbmZvOiB0cnVlLFxuICAgICAgcmVsYXRlZDogdHJ1ZSxcbiAgICAgIHJldmlld3M6IHRydWUsXG4gICAgICBjYXN0OiB0cnVlLFxuICAgICAgZXh0cmFzOiB0cnVlXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGNhbGwgYXBpLCB1c2UgdGhlIG1vdmllIGlkXG4gICAgICogdG8gZ2V0IHNwZWNpZmljIGluZm9cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRTcGVjaWZpYygpIHtcbiAgICAgICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS8nICsgJHNjb3BlLm1vdmllSUQgKyAnP2FwaV9rZXk9M2ZjYzRjMThkNmRmNTNjMDZkMjc3NmVlNTZkZjE5MTgmbGFuZ3VhZ2U9ZW4tVVMmcGFnZT0xJylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAkc2NvcGUubW92aWVEZXRhaWwgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjYWxsIGFwaSwgZ2V0IHJlbGF0ZWRcbiAgICAgKiBtb3ZpZXNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRSZWxhdGVkUmVzdWx0cygpIHtcbiAgICAgICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS8nICsgJHNjb3BlLm1vdmllSUQgKyAnL3NpbWlsYXI/YXBpX2tleT1hYjU4Y2FiMzcyNjEyZTM3ZjUzYmJhODk3MGFlMTFhMSZsYW5ndWFnZT1lbi1VUyZwYWdlPTEnKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICRzY29wZS5yZWxhdGVkUmVzdWx0cyA9IHJlc3BvbnNlLmRhdGEucmVzdWx0cztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2FsbCBhcGksIGdldCBjYXN0IG1lbWJlcnNcbiAgICAgKiBmcm9tIG1vdmllXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0Q2FzdCgpIHtcbiAgICAgICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS8nICsgJHNjb3BlLm1vdmllSUQgKyAnL2NyZWRpdHM/YXBpX2tleT1hYjU4Y2FiMzcyNjEyZTM3ZjUzYmJhODk3MGFlMTFhMSZsYW5ndWFnZT1lbi1VUyZwYWdlPTEnKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICRzY29wZS5jYXN0ID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0IHRoZSBtb3ZpZVxuICAgICAqL1xuICAgIGdldFNwZWNpZmljKCk7XG5cbiAgICAvKipcbiAgICAgKiBnZXQgdGhlIHJlbGF0ZWQgbW92aWVzXG4gICAgICovXG4gICAgZ2V0UmVsYXRlZFJlc3VsdHMoKTtcblxuICAgIC8qKlxuICAgICAqIGdldCB0aGUgY2FzdFxuICAgICAqL1xuICAgIGdldENhc3QoKTtcbiAgfSk7XG5cbiAgYXBwLmNvbnRyb2xsZXIoJ3NlYXJjaFR2JywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJHJvdXRlUGFyYW1zKSB7XG5cbiAgICAkc2NvcGUudHZTZWFyY2g9ICcnO1xuICAgICRzY29wZS5iYXNlVXJsID0gJ2h0dHA6Ly9pbWFnZS50bWRiLm9yZy90L3AvdzMwMC8nO1xuICAgICRzY29wZS5saXN0T2ZTaG93cztcbiAgICAkc2NvcGUuSUQgPSAkcm91dGVQYXJhbXMuSUQ7XG5cbiAgICAkc2NvcGUuJHJvdXRlID0gJHJvdXRlUGFyYW1zO1xuXG4gICAgLyoqXG4gICAgICogY2xpY2sgb24gc3VnZ2VzdGVkIGl0ZW1cbiAgICAgKiB1cGRhdGUgaW5wdXQgdmFsdWVzXG4gICAgICovXG4gICAgJHNjb3BlLnN1Z2dlc3RlZFVwZGF0ZSA9IGZ1bmN0aW9uKHR2KSB7XG4gICAgICAkc2NvcGUudHZTZWFyY2ggPSB0di5uYW1lO1xuICAgIH07XG5cbiAgICAkc2NvcGUuJHdhdGNoKCd0dlNlYXJjaCcsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICBzZWFyY2hUdigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogY2FsbCBhcGksIHVzZSBzZWFyY2ggdG8gY2FsbFxuICAgICAqIHR2IHNob3dzLCBwb3B1bGF0ZSByZXN1bHRzXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2VhcmNoVHYoKSB7XG4gICAgICAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvc2VhcmNoL3R2P2FwaV9rZXk9YWI1OGNhYjM3MjYxMmUzN2Y1M2JiYTg5NzBhZTExYTEmbGFuZ3VhZ2U9ZW4tVVMmcXVlcnk9JyArICRzY29wZS50dlNlYXJjaCArICcmcGFnZT0xJmluY2x1ZGVfYWR1bHQ9ZmFsc2UnKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICRzY29wZS5saXN0T2ZTaG93cyA9IHJlc3BvbnNlLmRhdGEucmVzdWx0cztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2FsbCBhcGlcbiAgICAgKiBnZXQgdGhlIGxhdGVzdCB0diBzaG93c1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldExhdGVzdCgpIHtcbiAgICAgICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy90di9wb3B1bGFyP2FwaV9rZXk9YWI1OGNhYjM3MjYxMmUzN2Y1M2JiYTg5NzBhZTExYTEmbGFuZ3VhZ2U9ZW4tVVMnKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICRzY29wZS5sYXRlc3RTaG93cyA9IHJlc3BvbnNlLmRhdGEucmVzdWx0cztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0TGF0ZXN0KCk7XG4gIH0pO1xuXG4gIGFwcC5jb250cm9sbGVyKCdyZXN1bHRUdicsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRsb2NhdGlvbikge1xuXG4gICAgdmFyIHBJZCA9ICRsb2NhdGlvbi5wYXRoKCkuc3BsaXQoL1tcXHMvXSsvKS5wb3AoKTtcbiAgICAkc2NvcGUuYmFzZVVybCA9ICdodHRwOi8vaW1hZ2UudG1kYi5vcmcvdC9wL3czMDAvJztcbiAgICAkc2NvcGUudHZEZXRhaWw7XG4gICAgJHNjb3BlLmNhc3REZXRhaWw7XG4gICAgJHNjb3BlLnR2SUQgPSBwSWQ7XG5cbiAgICAvKipcbiAgICAgKiBzZXQgY2hla2JveGVzIHRvIGNoZWNrZWQgYnkgZGVmYXVsdFxuICAgICAqL1xuICAgICRzY29wZS50dk9wdGlvbnMgPSB7XG4gICAgICBwb3N0ZXI6IHRydWUsXG4gICAgICBpbmZvOiB0cnVlLFxuICAgICAgcmVsYXRlZDogdHJ1ZSxcbiAgICAgIGNhc3Q6IHRydWUsXG4gICAgICBleHRyYXM6IHRydWUsXG4gICAgICBzZWFzb25zOiB0cnVlXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGNhbGwgYXBpLCB1c2UgdGhlIG1vdmllIGlkXG4gICAgICogdG8gZ2V0IHNwZWNpZmljIGluZm9cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRTcGVjaWZpYygpIHtcbiAgICAgICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy90di8nICsgJHNjb3BlLnR2SUQgKyAnP2FwaV9rZXk9YWI1OGNhYjM3MjYxMmUzN2Y1M2JiYTg5NzBhZTExYTEmbGFuZ3VhZ2U9ZW4tVVMmcGFnZT0xJylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAkc2NvcGUudHZEZXRhaWwgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjYWxsIGFwaSwgZ2V0IHJlbGF0ZWRcbiAgICAgKiBzaG93c1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFJlbGF0ZWRUdlJlc3VsdHMoKSB7XG4gICAgICAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvdHYvJyArICRzY29wZS50dklEICsgJy9zaW1pbGFyP2FwaV9rZXk9YWI1OGNhYjM3MjYxMmUzN2Y1M2JiYTg5NzBhZTExYTEmbGFuZ3VhZ2U9ZW4tVVMmcGFnZT0xJylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAkc2NvcGUucmVsYXRlZFR2UmVzdWx0cyA9IHJlc3BvbnNlLmRhdGEucmVzdWx0cztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vXG4gICAgLyoqXG4gICAgICogY2FsbCBhcGksIGdldCBjYXN0IG1lbWJlcnNcbiAgICAgKiBmcm9tIG1vdmllXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0Q2FzdCgpIHtcbiAgICAgICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy90di8nICsgJHNjb3BlLnR2SUQgKyAnL2NyZWRpdHM/YXBpX2tleT1hYjU4Y2FiMzcyNjEyZTM3ZjUzYmJhODk3MGFlMTFhMSZsYW5ndWFnZT1lbi1VUyZwYWdlPTEnKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICRzY29wZS5jYXN0RGV0YWlsID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuY2FzdERldGFpbClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0IHRoZSBtb3ZpZVxuICAgICAqL1xuICAgIGdldFNwZWNpZmljKCk7XG5cbiAgICAvKipcbiAgICAgKiBnZXQgdGhlIHJlbGF0ZWQgc2hvd3NcbiAgICAgKi9cbiAgICBnZXRSZWxhdGVkVHZSZXN1bHRzKCk7XG5cbiAgICAvKipcbiAgICAgKiBnZXQgdGhlIGNhc3RcbiAgICAgKi9cbiAgICBnZXRDYXN0KCk7XG4gIH0pO1xuXG4gIGFwcC5kaXJlY3RpdmUoJ3ByZXZlbnREZWZhdWx0JywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9KTtcblxuICBhcHAuZGlyZWN0aXZlKCdzY3JvbGxJZicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cmlidXRlcykge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHNjb3BlLiRldmFsKGF0dHJpYnV0ZXMuc2Nyb2xsSWYpKSB7XG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIGVsZW1lbnRbMF0ub2Zmc2V0VG9wIC0gMTAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgfSk7XG59KCkpO1xuIl19
