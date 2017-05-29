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


    when('/tv/', {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBwIiwiYW5ndWxhciIsIm1vZHVsZSIsImNvbmZpZyIsIiRyb3V0ZVByb3ZpZGVyIiwid2hlbiIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsImFjdGl2ZVRhYiIsIm90aGVyd2lzZSIsInJlZGlyZWN0VG8iLCIkc2NvcGUiLCIkbG9jYXRpb24iLCJpc0FjdGl2ZSIsInZpZXdMb2NhdGlvbiIsInBhdGgiLCIkaHR0cCIsIiRyb3V0ZVBhcmFtcyIsInNlYXJjaCIsImJhc2VVcmwiLCJsaXN0T2ZNb3ZpZXMiLCJsYXRlc3RNb3ZpZXMiLCJtb3ZpZUFycmF5IiwiJHJvdXRlIiwibW92aWVDb3VudGVyIiwic2h1ZmZsZSIsImFycmF5IiwiY3VycmVudEluZGV4IiwibGVuZ3RoIiwidGVtcG9yYXJ5VmFsdWUiLCJyYW5kb21JbmRleCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbU1vdmllIiwic3VnZ2VzdE1vdmllQXJyYXkiLCJzdWdnZXN0UmFuZG9tTW92aWUiLCJ1cGRhdGVSYW5kb21Nb3ZpZSIsIm1vdmllIiwic3VnZ2VzdGVkVXBkYXRlIiwiJHdhdGNoIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsInNlYXJjaEFsbCIsIklEIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwiZGF0YSIsInJlc3VsdHMiLCJjb25zb2xlIiwibG9nIiwiZ2V0TGF0ZXN0IiwicElkIiwic3BsaXQiLCJwb3AiLCJtb3ZpZURldGFpbCIsInJlbGF0ZWRSZXN1bHRzIiwiY2FzdCIsIm1vdmllSUQiLCJtb3ZpZU9wdGlvbnMiLCJwb3N0ZXIiLCJpbmZvIiwicmVsYXRlZCIsInJldmlld3MiLCJleHRyYXMiLCJnZXRTcGVjaWZpYyIsImdldFJlbGF0ZWRSZXN1bHRzIiwiZ2V0Q2FzdCIsInR2U2VhcmNoIiwibGlzdE9mU2hvd3MiLCJ0diIsIm5hbWUiLCJzZWFyY2hUdiIsImxhdGVzdFNob3dzIiwidHZEZXRhaWwiLCJjYXN0RGV0YWlsIiwidHZJRCIsInR2T3B0aW9ucyIsInNlYXNvbnMiLCJnZXRSZWxhdGVkVHZSZXN1bHRzIiwicmVsYXRlZFR2UmVzdWx0cyIsImRpcmVjdGl2ZSIsInNjb3BlIiwiZWxlbWVudCIsImF0dHJzIiwiYmluZCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJhdHRyaWJ1dGVzIiwic2V0VGltZW91dCIsIiRldmFsIiwic2Nyb2xsSWYiLCJ3aW5kb3ciLCJzY3JvbGxUbyIsIm9mZnNldFRvcCJdLCJtYXBwaW5ncyI6ImFBQUMsYUFBVTtBQUNUOztBQUVBLE1BQUlBLE1BQU1DLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCLENBQUMsU0FBRCxDQUF4QixDQUFWOztBQUVBOzs7O0FBSUFGLE1BQUlHLE1BQUosQ0FBVyxVQUFTQyxjQUFULEVBQXlCO0FBQ2xDQTs7QUFFR0MsUUFGSCxDQUVRLEdBRlIsRUFFYTtBQUNUQyxtQkFBYyxzQkFETDtBQUVUQyxrQkFBYyxjQUZMLEVBRmI7OztBQU9HRixRQVBILENBT1EsY0FQUixFQU93QjtBQUNwQkMsbUJBQWMsdUJBRE07QUFFcEJDLGtCQUFjLGNBRk0sRUFQeEI7OztBQVlHRixRQVpILENBWVEsTUFaUixFQVlnQjtBQUNaQyxtQkFBYyx5QkFERjtBQUVaQyxrQkFBYyxVQUZGO0FBR1pDLGlCQUFXLElBSEMsRUFaaEI7OztBQWtCR0gsUUFsQkgsQ0FrQlEsZ0JBbEJSLEVBa0IwQjtBQUN0QkMsbUJBQWMsMEJBRFE7QUFFdEJDLGtCQUFjLFVBRlEsRUFsQjFCOzs7O0FBd0JHRSxhQXhCSCxDQXdCYTtBQUNUQyxrQkFBWSxHQURILEVBeEJiOzs7QUE0QkQsR0E3QkQ7OztBQWdDQVYsTUFBSU8sVUFBSixDQUFlLGtCQUFmLEVBQW1DLFVBQVNJLE1BQVQsRUFBaUJDLFNBQWpCLEVBQTRCOztBQUU3REQsV0FBT0UsUUFBUCxHQUFrQixVQUFTQyxZQUFULEVBQXVCO0FBQ3ZDLGFBQU9BLGlCQUFpQkYsVUFBVUcsSUFBVixFQUF4QjtBQUNE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bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoXCJteUFwcFwiLCBbJ25nUm91dGUnXSk7XG5cbiAgLyoqXG4gICAqIGNvbmZpZ3VyZSByb3V0ZXNcbiAgICovXG5cbiAgYXBwLmNvbmZpZyhmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xuICAgICRyb3V0ZVByb3ZpZGVyXG5cbiAgICAgIC53aGVuKCcvJywge1xuICAgICAgICB0ZW1wbGF0ZVVybCA6ICdwYXJ0aWFscy9zZWFyY2guaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXIgIDogJ3NlYXJjaE1vdmllcydcbiAgICAgIH0pXG5cbiAgICAgIC53aGVuKCcvcmVzdWx0cy86SUQnLCB7XG4gICAgICAgIHRlbXBsYXRlVXJsIDogJ3BhcnRpYWxzL3Jlc3VsdHMuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXIgIDogJ3Jlc3VsdE1vdmllcydcbiAgICAgIH0pXG5cbiAgICAgIC53aGVuKCcvdHYvJywge1xuICAgICAgICB0ZW1wbGF0ZVVybCA6ICdwYXJ0aWFscy90di1zZWFyY2guaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXIgIDogJ3NlYXJjaFR2JyxcbiAgICAgICAgYWN0aXZlVGFiOiAndHYnXG4gICAgICB9KVxuXG4gICAgICAud2hlbignL3R2UmVzdWx0cy86SUQnLCB7XG4gICAgICAgIHRlbXBsYXRlVXJsIDogJ3BhcnRpYWxzL3R2LXJlc3VsdHMuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXIgIDogJ3Jlc3VsdFR2J1xuICAgICAgfSlcblxuXG4gICAgICAub3RoZXJ3aXNlKHtcbiAgICAgICAgcmVkaXJlY3RUbzogJy8nXG4gICAgICB9KTtcblxuICB9KTtcblxuXG4gIGFwcC5jb250cm9sbGVyKCdoZWFkZXJDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9jYXRpb24pIHtcblxuICAgICRzY29wZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uKHZpZXdMb2NhdGlvbikge1xuICAgICAgcmV0dXJuIHZpZXdMb2NhdGlvbiA9PT0gJGxvY2F0aW9uLnBhdGgoKTtcbiAgICB9O1xuXG4gIH0pO1xuXG5cbiAgYXBwLmNvbnRyb2xsZXIoJ3NlYXJjaE1vdmllcycsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRyb3V0ZVBhcmFtcykge1xuXG4gICAgJHNjb3BlLnNlYXJjaD0gJyc7XG4gICAgJHNjb3BlLmJhc2VVcmwgPSAnaHR0cDovL2ltYWdlLnRtZGIub3JnL3QvcC93MzAwLyc7XG4gICAgJHNjb3BlLmxpc3RPZk1vdmllcztcbiAgICAkc2NvcGUubGF0ZXN0TW92aWVzO1xuICAgICRzY29wZS5tb3ZpZUFycmF5ID0gW1xuICAgICAgXCJQdWxwIEZpY3Rpb25cIixcbiAgICAgIFwiRmlnaHQgQ2x1YlwiLFxuICAgICAgXCJUaGUgU2hhd3NoYW5rIFJlZGVtcHRpb25cIixcbiAgICAgIFwiVGhlIERhcmsgS25pZ2h0XCIsXG4gICAgICBcIkluZ2xvdXJpb3VzIEJhc3RlcmRzXCIsXG4gICAgICBcIkluY2VwdGlvblwiLFxuICAgICAgXCJUaGUgTWF0cml4XCIsXG4gICAgICBcIlRoZSBFbXBpcmUgU3RyaWtlcyBCYWNrXCIsXG4gICAgICBcIlRoZSBMb3JkIG9mIHRoZSBSaW5nczogVGhlIEZlbGxvd3NoaXAgb2YgdGhlIFJpbmdcIixcbiAgICAgIFwiVG95IFN0b3J5XCIsXG4gICAgICBcIlRoZSBCaWcgTGVib3dza2lcIixcbiAgICAgIFwiRGphbmdvIFVuY2hhaW5lZFwiLFxuICAgICAgXCJUaGUgTG9yZCBvZiB0aGUgUmluZ3M6IFRoZSBSZXR1cm4gb2YgdGhlIEtpbmdcIixcbiAgICAgIFwiVGhlIERlcGFydGVkXCIsXG4gICAgICBcIk1lbWVudG9cIixcbiAgICAgIFwiVGhlIEdvZGZhdGhlclwiLFxuICAgICAgXCJSZXNlcnZvaXIgRG9nc1wiLFxuICAgICAgXCJTYXZpbmcgUHJpdmF0ZSBSeWFuXCIsXG4gICAgICBcIkZvcnJlc3QgR3VtcFwiLFxuICAgICAgXCJNb250eSBQeXRob24gYW5kIHRoZSBIb2x5IEdyYWlsXCIsXG4gICAgICBcIlNlZW5cIixcbiAgICAgIFwiQmFjayB0byB0aGUgRnV0dXJlXCIsXG4gICAgICBcIkdvb2RGZWxsYXNcIixcbiAgICAgIFwiVGhlIFByZXN0aWdlXCIsXG4gICAgICBcIlNoYXVuIG9mIHRoZSBEZWFkXCIsXG4gICAgICBcIkFsaWVuXCIsXG4gICAgICBcIlRoZSBTaWxlbmNlIG9mIHRoZSBMYW1ic1wiLFxuICAgICAgXCJUaGUgTG9yZCBvZiB0aGUgUmluZ3M6IFRoZSBUd28gVG93ZXJzXCIsXG4gICAgICBcIlNwaXJpdGVkIEF3YXlcIixcbiAgICAgIFwiVGhlIEdvb2QsIHRoZSBCYWQgYW5kIHRoZSBVZ2x5XCIsXG4gICAgICBcIkV0ZXJuYWwgU3Vuc2hpbmUgb2YgdGhlIFNwb3RsZXNzIE1pbmRcIixcbiAgICAgIFwiUmFpZGVycyBvZiB0aGUgTG9zdCBBcmtcIixcbiAgICAgIFwiQSBTcGFjZSBPZHlzc2V5XCIsXG4gICAgICBcIkRyLiBTdHJhbmdlbG92ZVwiLFxuICAgICAgXCJCbGFkZSBSdW5uZXJcIixcbiAgICAgIFwiVGhlIExpb24gS2luZ1wiLFxuICAgICAgXCJPbmUgRmxldyBPdmVyIHRoZSBDdWNrb28ncyBOZXN0XCIsXG4gICAgICBcIlRoZXJlIFdpbGwgQmUgQmxvb2RcIixcbiAgICAgIFwiVGhlIFNoaW5pbmdcIixcbiAgICAgIFwiVGhlIFRydW1hbiBTaG93XCIsXG4gICAgICBcIkEgQ2xvY2t3b3JrIE9yYW5nZVwiLFxuICAgICAgXCJTdGFyIFdhcnNcIixcbiAgICAgIFwiRGlzdHJpY3QgOVwiLFxuICAgICAgXCJVcFwiLFxuICAgICAgXCJPZmZpY2UgU3BhY2VcIixcbiAgICAgIFwiMTIgQW5ncnkgTWVuXCIsXG4gICAgICBcIlBhbidzIExhYnlyaW50aFwiLFxuICAgICAgXCJUaGUgVXN1YWwgU3VzcGVjdHNcIixcbiAgICAgIFwiSnVyYXNzaWMgUGFya1wiLFxuICAgICAgXCJWIGZvciBWZW5kZXR0YVwiLFxuICAgICAgXCJUaGUgUHJpbmNlc3MgQnJpZGVcIixcbiAgICAgIFwiTm8gQ291bnRyeSBmb3IgT2xkIE1lblwiLFxuICAgICAgXCJTY2hpbmRsZXIncyBMaXN0XCIsXG4gICAgICBcIkdvb2QgV2lsbCBIdW50aW5nXCIsXG4gICAgICBcIkNoaWxkcmVuIG9mIE1lblwiLFxuICAgICAgXCJLaWxsIEJpbGw6IFZvbC4gMVwiLFxuICAgICAgXCJXQUxMwrdFXCIsXG4gICAgICBcIkFtZXJpY2FuIEhpc3RvcnkgWFwiLFxuICAgICAgXCJEaWUgSGFyZFwiLFxuICAgICAgXCJEcml2ZVwiLFxuICAgICAgXCJNb29uXCIsXG4gICAgICBcIkdyb3VuZGhvZyBEYXlcIixcbiAgICAgIFwiQmF0bWFuIEJlZ2luc1wiLFxuICAgICAgXCJGYXJnb1wiLFxuICAgICAgXCJUaGUgSW5jcmVkaWJsZXNcIixcbiAgICAgIFwiTyBCcm90aGVyLCBXaGVyZSBBcnQgVGhvdVwiLFxuICAgICAgXCJHbGFkaWF0b3JcIixcbiAgICAgIFwiQWlycGxhbmVcIixcbiAgICAgIFwiQW1lcmljYW4gQmVhdXR5XCIsXG4gICAgICBcIlRlcm1pbmF0b3IgMjogSnVkZ21lbnQgRGF5XCIsXG4gICAgICBcIkzDqW9uXCIsXG4gICAgICBcIlRveSBTdG9yeSAzXCIsXG4gICAgICBcIlNuYXRjaFwiLFxuICAgICAgXCJBbWVyaWNhbiBQc3ljaG9cIixcbiAgICAgIFwiVGhlIFNvY2lhbCBOZXR3b3JrXCIsXG4gICAgICBcIk9sZGJveVwiLFxuICAgICAgXCJGZXJyaXMgQnVlbGxlcidzIERheSBPZmZcIixcbiAgICAgIFwiUHJpbmNlc3MgTW9ub25va2VcIixcbiAgICAgIFwiSW4gQnJ1Z2VzXCIsXG4gICAgICBcIkRvbm5pZSBEYXJrb1wiLFxuICAgICAgXCJDYXNhYmxhbmNhXCIsXG4gICAgICBcIkNpdHkgb2YgR29kXCIsXG4gICAgICBcIlBzeWNob1wiLFxuICAgICAgXCJUaGUgRmlmdGggRWxlbWVudFwiLFxuICAgICAgXCJTZXZlbiBTYW11cmFpXCIsXG4gICAgICBcIlRheGkgRHJpdmVyXCIsXG4gICAgICBcIk1vbnN0ZXJzLCBJbmMuXCIsXG4gICAgICBcIjI4IERheXMgTGF0ZXJcIixcbiAgICAgIFwiUmVxdWllbSBmb3IgYSBEcmVhbVwiLFxuICAgICAgXCJUaGUgR29kZmF0aGVyOiBQYXJ0IElJXCIsXG4gICAgICBcIkhvdCBGdXp6XCIsXG4gICAgICBcIlRyYWluc3BvdHRpbmdcIixcbiAgICAgIFwiQW3DqWxpZVwiLFxuICAgICAgXCJUd2VsdmUgTW9ua2V5c1wiLFxuICAgICAgXCJBbGllbnNcIixcbiAgICAgIFwiVGhlIERhcmsgS25pZ2h0IFJpc2VzXCIsXG4gICAgICBcIktpc3MgS2lzcyBCYW5nIEJhbmdcIixcbiAgICAgIFwiTG9zdCBpbiBUcmFuc2xhdGlvblwiLFxuICAgICAgXCJDaGluYXRvd25cIixcbiAgICAgIFwiVGhlIFJveWFsIFRlbm5lbmJhdW1zXCIsXG4gICAgICBcIlJlYXIgV2luZG93XCIsXG4gICAgICBcIkphd3NcIixcbiAgICAgIFwiT2NlYW4ncyBFbGV2ZW5cIixcbiAgICAgIFwiVGhlIEdyZWVuIE1pbGVcIixcbiAgICAgIFwiQmxhY2sgU3dhblwiLFxuICAgICAgXCJDaXRpemVuIEthbmVcIixcbiAgICAgIFwiTG9vcGVyXCIsXG4gICAgICBcIlRoZSBUaGluZ1wiLFxuICAgICAgXCJUaGUgQnJlYWtmYXN0IENsdWJcIixcbiAgICAgIFwiVGhlIENhYmluIGluIHRoZSBXb29kc1wiLFxuICAgICAgXCJMLkEuIENvbmZpZGVudGlhbFwiLFxuICAgICAgXCJTY290dCBQaWxncmltIHZzLiB0aGUgV29ybGRcIixcbiAgICAgIFwiRmluZGluZyBOZW1vXCIsXG4gICAgICBcIkJvb2dpZSBOaWdodHNcIixcbiAgICAgIFwiU3VwZXJiYWRcIixcbiAgICAgIFwiU2luIENpdHlcIixcbiAgICAgIFwiRmVhciBhbmQgTG9hdGhpbmcgaW4gTGFzIFZlZ2FzXCIsXG4gICAgICBcIkluZGlhbmEgSm9uZXMgYW5kIHRoZSBMYXN0IENydXNhZGVcIixcbiAgICAgIFwiVG8gS2lsbCBhIE1vY2tpbmdiaXJkXCIsXG4gICAgICBcIkxhd3JlbmNlIG9mIEFyYWJpYVwiLFxuICAgICAgXCJCZWluZyBKb2huIE1hbGtvdmljaFwiLFxuICAgICAgXCJUaGUgUGlhbmlzdFwiLFxuICAgICAgXCJBbm5pZSBIYWxsXCIsXG4gICAgICBcIkFuY2hvcm1hbjogVGhlIExlZ2VuZCBvZiBSb24gQnVyZ3VuZHlcIixcbiAgICAgIFwiQXJnb1wiLFxuICAgICAgXCJSYWdpbmcgQnVsbFwiLFxuICAgICAgXCJWZXJ0aWdvXCIsXG4gICAgICBcIlRoZSBBdmVuZ2Vyc1wiLFxuICAgICAgXCJCdXRjaCBDYXNzaWR5IGFuZCB0aGUgU3VuZGFuY2UgS2lkXCIsXG4gICAgICBcIkRhemVkIGFuZCBDb25mdXNlZFwiLFxuICAgICAgXCI1MDAgRGF5cyBvZiBTdW1tZXJcIixcbiAgICAgIFwiV2lsbHkgV29ua2EgJiB0aGUgQ2hvY29sYXRlIEZhY3RvcnlcIixcbiAgICAgIFwiVW5mb3JnaXZlblwiLFxuICAgICAgXCJGYW50YXN0aWMgTXIuIEZveFwiLFxuICAgICAgXCJUaGUgSXJvbiBHaWFudFwiLFxuICAgICAgXCJUaGUgVGVybWluYXRvclwiLFxuICAgICAgXCJHaG9zdCBCdXN0ZXJzXCIsXG4gICAgICBcIlRoaXMgSXMgU3BpbmFsIFRhcFwiLFxuICAgICAgXCJHcmFuIFRvcmlub1wiLFxuICAgICAgXCJBZGFwdGF0aW9uLlwiLFxuICAgICAgXCJBIEZpc3RmdWwgb2YgRG9sbGFyc1wiLFxuICAgICAgXCJTdGFuZCBieSBNZVwiLFxuICAgICAgXCJBcG9sbG8gMTNcIixcbiAgICAgIFwiQmxhemluZyBTYWRkbGVzXCIsXG4gICAgICBcIkFtYWRldXNcIixcbiAgICAgIFwiS2ljay1Bc3NcIixcbiAgICAgIFwiUnVzaG1vcmVcIixcbiAgICAgIFwiTGlmZSBvZiBCcmlhblwiLFxuICAgICAgXCJBbG1vc3QgRmFtb3VzXCIsXG4gICAgICBcIk5ldHdvcmtcIixcbiAgICAgIFwiTXVsaG9sbGFuZCBEcml2ZVwiLFxuICAgICAgXCJTdGFyIFRyZWtcIixcbiAgICAgIFwiSXQncyBhIFdvbmRlcmZ1bCBMaWZlXCIsXG4gICAgICBcIlNpbmdpbicgaW4gdGhlIFJhaW5cIixcbiAgICAgIFwiVGhlIEdyYWR1YXRlXCIsXG4gICAgICBcIkNvb2wgSGFuZCBMdWtlXCIsXG4gICAgICBcIlRoZSBOaWdodG1hcmUgQmVmb3JlIENocmlzdG1hc1wiLFxuICAgICAgXCJNZXRyb3BvbGlzXCIsXG4gICAgICBcIkNhc2lubyBSb3lhbGVcIixcbiAgICAgIFwiWm9kaWFjXCIsXG4gICAgICBcIkNyb3VjaGluZyBUaWdlciwgSGlkZGVuIERyYWdvblwiLFxuICAgICAgXCJFLlQuXCIsXG4gICAgICBcIlRoZSBCbHVlcyBCcm90aGVyc1wiLFxuICAgICAgXCJIb3RlbCBSd2FuZGFcIixcbiAgICAgIFwiWm9vbGFuZGVyXCIsXG4gICAgICBcIkhlYXRcIixcbiAgICAgIFwiVGhlIFNldmVudGggU2VhbFwiLFxuICAgICAgXCJLaWxsIEJpbGw6IFZvbC4gMlwiLFxuICAgICAgXCJTdHJhbmdlciBUaGFuIEZpY3Rpb25cIixcbiAgICAgIFwiRG91YmxlIEluZGVtbml0eVwiLFxuICAgICAgXCJPbiB0aGUgV2F0ZXJmcm9udFwiLFxuICAgICAgXCJQcmVkYXRvclwiLFxuICAgICAgXCJMdWNreSBOdW1iZXIgU2xldmluXCIsXG4gICAgICBcIkNhdGNoIE1lIElmIFlvdSBDYW5cIixcbiAgICAgIFwiRHJlZGRcIixcbiAgICAgIFwiQmF0dGxlIFJveWFsZVwiLFxuICAgICAgXCJSb2JvQ29wXCIsXG4gICAgICBcIkhvdyB0byBUcmFpbiBZb3VyIERyYWdvblwiLFxuICAgICAgXCJEb2cgRGF5IEFmdGVybm9vblwiLFxuICAgICAgXCJQbGFuZXQgb2YgdGhlIEFwZXNcIixcbiAgICAgIFwiTWFzdGVyIGFuZCBDb21tYW5kZXI6IFRoZSBGYXIgU2lkZSBvZiB0aGUgV29ybGRcIixcbiAgICAgIFwiUGF0aHMgb2YgR2xvcnlcIixcbiAgICAgIFwiQnJva2ViYWNrIE1vdW50YWluXCIsXG4gICAgICBcIlRoZSBIb2JiaXQ6IEFuIFVuZXhwZWN0ZWQgSm91cm5leVwiLFxuICAgICAgXCJUaGUgV2l6YXJkIG9mIE96XCIsXG4gICAgICBcIkNsb3NlIEVuY291bnRlcnMgb2YgdGhlIFRoaXJkIEtpbmRcIixcbiAgICAgIFwiVGhlIFdyZXN0bGVyXCIsXG4gICAgICBcIlRoZSBKZXJrXCIsXG4gICAgICBcIlNsdW1kb2cgTWlsbGlvbmFpcmVcIixcbiAgICAgIFwiU2lsdmVyIExpbmluZ3MgUGxheWJvb2tcIixcbiAgICAgIFwiR2xlbmdhcnJ5IEdsZW4gUm9zc1wiLFxuICAgICAgXCJTdW5zZXQgQm91bGV2YXJkXCIsXG4gICAgICBcIlJldHVybiBvZiB0aGUgSmVkaVwiLFxuICAgICAgXCJSYW5cIixcbiAgICAgIFwiQ29sbGF0ZXJhbFwiLFxuICAgICAgXCJMZXQgdGhlIFJpZ2h0IE9uZSBJblwiLFxuICAgICAgXCJUaGUgU3RpbmdcIixcbiAgICAgIFwiVHVja2VyIGFuZCBEYWxlIFZzLiBFdmlsXCIsXG4gICAgICBcIlNvbWUgTGlrZSBJdCBIb3RcIixcbiAgICAgIFwiU2h1dHRlciBJc2xhbmRcIixcbiAgICAgIFwiVGhlIE1hbHRlc2UgRmFsY29uXCIsXG4gICAgICBcIlRoZSBUcmVhc3VyZSBvZiB0aGUgU2llcnJhIE1hZHJlXCIsXG4gICAgICBcIlN1bnNoaW5lXCIsXG4gICAgICBcIlB1bmNoLURydW5rIExvdmVcIixcbiAgICAgIFwiTWFnbm9saWFcIixcbiAgICAgIFwiVGhhbmsgWW91IGZvciBTbW9raW5nXCIsXG4gICAgICBcIlRoZSBIdXJ0IExvY2tlclwiLFxuICAgICAgXCJEYXduIG9mIHRoZSBEZWFkXCJcbiAgICBdO1xuXG4gICAgJHNjb3BlLiRyb3V0ZSA9ICRyb3V0ZVBhcmFtcztcblxuXG4gICAgdmFyIG1vdmllQXJyYXkgPSAkc2NvcGUubW92aWVBcnJheTtcbiAgICB2YXIgbW92aWVDb3VudGVyID0gMDtcblxuICAgIC8qKlxuICAgICAqIHNodWZmbGUgYXJyYXlcbiAgICAgKiBhcnJheSBvZiBtb3ZpZXMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2h1ZmZsZShhcnJheSkge1xuICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aCwgdGVtcG9yYXJ5VmFsdWUsIHJhbmRvbUluZGV4O1xuXG4gICAgICAvLyBXaGlsZSB0aGVyZSByZW1haW4gZWxlbWVudHMgdG8gc2h1ZmZsZS4uLlxuICAgICAgd2hpbGUgKDAgIT09IGN1cnJlbnRJbmRleCkge1xuICAgICAgICAvLyBQaWNrIGEgcmVtYWluaW5nIGVsZW1lbnQuLi5cbiAgICAgICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xuICAgICAgICBjdXJyZW50SW5kZXggLT0gMTtcblxuICAgICAgICAvLyBBbmQgc3dhcCBpdCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAgICAgIHRlbXBvcmFyeVZhbHVlID0gYXJyYXlbY3VycmVudEluZGV4XTtcbiAgICAgICAgYXJyYXlbY3VycmVudEluZGV4XSA9IGFycmF5W3JhbmRvbUluZGV4XTtcbiAgICAgICAgYXJyYXlbcmFuZG9tSW5kZXhdID0gdGVtcG9yYXJ5VmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhcnJheTtcbiAgICB9XG5cbiAgICAkc2NvcGUubW92aWVBcnJheSA9IHNodWZmbGUobW92aWVBcnJheSk7XG4gICAgJHNjb3BlLnJhbmRvbU1vdmllID0gJHNjb3BlLm1vdmllQXJyYXk7XG5cbiAgICAkc2NvcGUuc3VnZ2VzdE1vdmllQXJyYXkgPSBzaHVmZmxlKCRzY29wZS5tb3ZpZUFycmF5KTtcbiAgICAkc2NvcGUuc3VnZ2VzdFJhbmRvbU1vdmllID0gJHNjb3BlLnN1Z2dlc3RNb3ZpZUFycmF5O1xuXG5cbiAgICAvKipcbiAgICAgKiBDbGljayBvbiByYW5kb20gbW92aWVcbiAgICAgKiBsb29wIHRocm91Z2ggc3VnZ2VzdGVkIG1vdmllc1xuICAgICAqIGFuZCBwb3B1bGF0ZSBzZWFyY2ggZmllbGRcbiAgICAgKi9cbiAgICAkc2NvcGUudXBkYXRlUmFuZG9tTW92aWUgPSBmdW5jdGlvbihtb3ZpZSl7XG4gICAgICAkc2NvcGUuc2VhcmNoID0gbW92aWVBcnJheVttb3ZpZUNvdW50ZXIrKyAlIG1vdmllQXJyYXkubGVuZ3RoXTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogY2xpY2sgb24gc3VnZ2VzdGVkIGl0ZW1cbiAgICAgKiB1cGRhdGUgaW5wdXQgdmFsdWVzXG4gICAgICovXG4gICAgJHNjb3BlLnN1Z2dlc3RlZFVwZGF0ZSA9IGZ1bmN0aW9uKG1vdmllKSB7XG4gICAgICAkc2NvcGUuc2VhcmNoID0gbW92aWU7XG4gICAgfTtcblxuICAgICRzY29wZS4kd2F0Y2goJ3NlYXJjaCcsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICBzZWFyY2hBbGwoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRzY29wZS5JRCA9ICRyb3V0ZVBhcmFtcy5JRDtcblxuICAgIC8qKlxuICAgICAqIGNhbGwgYXBpLCB1c2Ugc2VhcmNoIHRvIGNhbGxcbiAgICAgKiBtb3ZpZXMgdG8gcG9wdWxhdGUgcmVzdWx0c1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNlYXJjaEFsbCgpIHtcbiAgICAgICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9zZWFyY2gvbW92aWU/YXBpX2tleT1hYjU4Y2FiMzcyNjEyZTM3ZjUzYmJhODk3MGFlMTFhMSZsYW5ndWFnZT1lbi1VUyZxdWVyeT0nICsgJHNjb3BlLnNlYXJjaCArICcmcGFnZT0xJmluY2x1ZGVfYWR1bHQ9ZmFsc2UnKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICRzY29wZS5saXN0T2ZNb3ZpZXMgPSByZXNwb25zZS5kYXRhLnJlc3VsdHM7XG4gICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmxpc3RPZk1vdmllcylcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2FsbCBhcGlcbiAgICAgKiBnZXQgdGhlIGxhdGVzdCBtb3ZpZXNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRMYXRlc3QoKSB7XG4gICAgICAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvbW92aWUvbGF0ZXN0P2FwaV9rZXk9YWI1OGNhYjM3MjYxMmUzN2Y1M2JiYTg5NzBhZTExYTEmbGFuZ3VhZ2U9ZW4tVVMnKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICRzY29wZS5sYXRlc3RNb3ZpZXMgPSByZXNwb25zZS5kYXRhLnJlc3VsdHM7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldExhdGVzdCgpO1xuICB9KTtcblxuICBhcHAuY29udHJvbGxlcigncmVzdWx0TW92aWVzJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJGxvY2F0aW9uKSB7XG5cbiAgICB2YXIgcElkID0gJGxvY2F0aW9uLnBhdGgoKS5zcGxpdCgvW1xccy9dKy8pLnBvcCgpO1xuICAgICRzY29wZS5iYXNlVXJsID0gJ2h0dHA6Ly9pbWFnZS50bWRiLm9yZy90L3AvdzMwMC8nO1xuICAgICRzY29wZS5tb3ZpZURldGFpbDtcbiAgICAkc2NvcGUucmVsYXRlZFJlc3VsdHM7XG4gICAgJHNjb3BlLmNhc3Q7XG4gICAgJHNjb3BlLm1vdmllSUQgPSBwSWQ7XG5cbiAgICAvKipcbiAgICAgKiBzZXQgY2hla2JveGVzIHRvIGNoZWNrZWQgYnkgZGVmYXVsdFxuICAgICAqL1xuICAgICRzY29wZS5tb3ZpZU9wdGlvbnMgPSB7XG4gICAgICBwb3N0ZXI6IHRydWUsXG4gICAgICBpbmZvOiB0cnVlLFxuICAgICAgcmVsYXRlZDogdHJ1ZSxcbiAgICAgIHJldmlld3M6IHRydWUsXG4gICAgICBjYXN0OiB0cnVlLFxuICAgICAgZXh0cmFzOiB0cnVlXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGNhbGwgYXBpLCB1c2UgdGhlIG1vdmllIGlkXG4gICAgICogdG8gZ2V0IHNwZWNpZmljIGluZm9cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRTcGVjaWZpYygpIHtcbiAgICAgICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS8nICsgJHNjb3BlLm1vdmllSUQgKyAnP2FwaV9rZXk9M2ZjYzRjMThkNmRmNTNjMDZkMjc3NmVlNTZkZjE5MTgmbGFuZ3VhZ2U9ZW4tVVMmcGFnZT0xJylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAkc2NvcGUubW92aWVEZXRhaWwgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjYWxsIGFwaSwgZ2V0IHJlbGF0ZWRcbiAgICAgKiBtb3ZpZXNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRSZWxhdGVkUmVzdWx0cygpIHtcbiAgICAgICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS8nICsgJHNjb3BlLm1vdmllSUQgKyAnL3NpbWlsYXI/YXBpX2tleT1hYjU4Y2FiMzcyNjEyZTM3ZjUzYmJhODk3MGFlMTFhMSZsYW5ndWFnZT1lbi1VUyZwYWdlPTEnKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICRzY29wZS5yZWxhdGVkUmVzdWx0cyA9IHJlc3BvbnNlLmRhdGEucmVzdWx0cztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2FsbCBhcGksIGdldCBjYXN0IG1lbWJlcnNcbiAgICAgKiBmcm9tIG1vdmllXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0Q2FzdCgpIHtcbiAgICAgICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS8nICsgJHNjb3BlLm1vdmllSUQgKyAnL2NyZWRpdHM/YXBpX2tleT1hYjU4Y2FiMzcyNjEyZTM3ZjUzYmJhODk3MGFlMTFhMSZsYW5ndWFnZT1lbi1VUyZwYWdlPTEnKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICRzY29wZS5jYXN0ID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0IHRoZSBtb3ZpZVxuICAgICAqL1xuICAgIGdldFNwZWNpZmljKCk7XG5cbiAgICAvKipcbiAgICAgKiBnZXQgdGhlIHJlbGF0ZWQgbW92aWVzXG4gICAgICovXG4gICAgZ2V0UmVsYXRlZFJlc3VsdHMoKTtcblxuICAgIC8qKlxuICAgICAqIGdldCB0aGUgY2FzdFxuICAgICAqL1xuICAgIGdldENhc3QoKTtcbiAgfSk7XG5cbiAgYXBwLmNvbnRyb2xsZXIoJ3NlYXJjaFR2JywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJHJvdXRlUGFyYW1zKSB7XG5cbiAgICAkc2NvcGUudHZTZWFyY2g9ICcnO1xuICAgICRzY29wZS5iYXNlVXJsID0gJ2h0dHA6Ly9pbWFnZS50bWRiLm9yZy90L3AvdzMwMC8nO1xuICAgICRzY29wZS5saXN0T2ZTaG93cztcbiAgICAkc2NvcGUuSUQgPSAkcm91dGVQYXJhbXMuSUQ7XG5cbiAgICAkc2NvcGUuJHJvdXRlID0gJHJvdXRlUGFyYW1zO1xuXG4gICAgLyoqXG4gICAgICogY2xpY2sgb24gc3VnZ2VzdGVkIGl0ZW1cbiAgICAgKiB1cGRhdGUgaW5wdXQgdmFsdWVzXG4gICAgICovXG4gICAgJHNjb3BlLnN1Z2dlc3RlZFVwZGF0ZSA9IGZ1bmN0aW9uKHR2KSB7XG4gICAgICAkc2NvcGUudHZTZWFyY2ggPSB0di5uYW1lO1xuICAgIH07XG5cbiAgICAkc2NvcGUuJHdhdGNoKCd0dlNlYXJjaCcsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICBzZWFyY2hUdigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogY2FsbCBhcGksIHVzZSBzZWFyY2ggdG8gY2FsbFxuICAgICAqIHR2IHNob3dzLCBwb3B1bGF0ZSByZXN1bHRzXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2VhcmNoVHYoKSB7XG4gICAgICAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvc2VhcmNoL3R2P2FwaV9rZXk9YWI1OGNhYjM3MjYxMmUzN2Y1M2JiYTg5NzBhZTExYTEmbGFuZ3VhZ2U9ZW4tVVMmcXVlcnk9JyArICRzY29wZS50dlNlYXJjaCArICcmcGFnZT0xJmluY2x1ZGVfYWR1bHQ9ZmFsc2UnKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICRzY29wZS5saXN0T2ZTaG93cyA9IHJlc3BvbnNlLmRhdGEucmVzdWx0cztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2FsbCBhcGlcbiAgICAgKiBnZXQgdGhlIGxhdGVzdCB0diBzaG93c1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldExhdGVzdCgpIHtcbiAgICAgICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy90di9wb3B1bGFyP2FwaV9rZXk9YWI1OGNhYjM3MjYxMmUzN2Y1M2JiYTg5NzBhZTExYTEmbGFuZ3VhZ2U9ZW4tVVMnKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICRzY29wZS5sYXRlc3RTaG93cyA9IHJlc3BvbnNlLmRhdGEucmVzdWx0cztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0TGF0ZXN0KCk7XG4gIH0pO1xuXG4gIGFwcC5jb250cm9sbGVyKCdyZXN1bHRUdicsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRsb2NhdGlvbikge1xuXG4gICAgdmFyIHBJZCA9ICRsb2NhdGlvbi5wYXRoKCkuc3BsaXQoL1tcXHMvXSsvKS5wb3AoKTtcbiAgICAkc2NvcGUuYmFzZVVybCA9ICdodHRwOi8vaW1hZ2UudG1kYi5vcmcvdC9wL3czMDAvJztcbiAgICAkc2NvcGUudHZEZXRhaWw7XG4gICAgJHNjb3BlLmNhc3REZXRhaWw7XG4gICAgJHNjb3BlLnR2SUQgPSBwSWQ7XG5cbiAgICAvKipcbiAgICAgKiBzZXQgY2hla2JveGVzIHRvIGNoZWNrZWQgYnkgZGVmYXVsdFxuICAgICAqL1xuICAgICRzY29wZS50dk9wdGlvbnMgPSB7XG4gICAgICBwb3N0ZXI6IHRydWUsXG4gICAgICBpbmZvOiB0cnVlLFxuICAgICAgcmVsYXRlZDogdHJ1ZSxcbiAgICAgIGNhc3Q6IHRydWUsXG4gICAgICBleHRyYXM6IHRydWUsXG4gICAgICBzZWFzb25zOiB0cnVlXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGNhbGwgYXBpLCB1c2UgdGhlIG1vdmllIGlkXG4gICAgICogdG8gZ2V0IHNwZWNpZmljIGluZm9cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRTcGVjaWZpYygpIHtcbiAgICAgICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy90di8nICsgJHNjb3BlLnR2SUQgKyAnP2FwaV9rZXk9YWI1OGNhYjM3MjYxMmUzN2Y1M2JiYTg5NzBhZTExYTEmbGFuZ3VhZ2U9ZW4tVVMmcGFnZT0xJylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAkc2NvcGUudHZEZXRhaWwgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjYWxsIGFwaSwgZ2V0IHJlbGF0ZWRcbiAgICAgKiBzaG93c1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFJlbGF0ZWRUdlJlc3VsdHMoKSB7XG4gICAgICAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvdHYvJyArICRzY29wZS50dklEICsgJy9zaW1pbGFyP2FwaV9rZXk9YWI1OGNhYjM3MjYxMmUzN2Y1M2JiYTg5NzBhZTExYTEmbGFuZ3VhZ2U9ZW4tVVMmcGFnZT0xJylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAkc2NvcGUucmVsYXRlZFR2UmVzdWx0cyA9IHJlc3BvbnNlLmRhdGEucmVzdWx0cztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vXG4gICAgLyoqXG4gICAgICogY2FsbCBhcGksIGdldCBjYXN0IG1lbWJlcnNcbiAgICAgKiBmcm9tIG1vdmllXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0Q2FzdCgpIHtcbiAgICAgICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy90di8nICsgJHNjb3BlLnR2SUQgKyAnL2NyZWRpdHM/YXBpX2tleT1hYjU4Y2FiMzcyNjEyZTM3ZjUzYmJhODk3MGFlMTFhMSZsYW5ndWFnZT1lbi1VUyZwYWdlPTEnKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICRzY29wZS5jYXN0RGV0YWlsID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuY2FzdERldGFpbClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0IHRoZSBtb3ZpZVxuICAgICAqL1xuICAgIGdldFNwZWNpZmljKCk7XG5cbiAgICAvKipcbiAgICAgKiBnZXQgdGhlIHJlbGF0ZWQgc2hvd3NcbiAgICAgKi9cbiAgICBnZXRSZWxhdGVkVHZSZXN1bHRzKCk7XG5cbiAgICAvKipcbiAgICAgKiBnZXQgdGhlIGNhc3RcbiAgICAgKi9cbiAgICBnZXRDYXN0KCk7XG4gIH0pO1xuXG4gIGFwcC5kaXJlY3RpdmUoJ3ByZXZlbnREZWZhdWx0JywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9KTtcblxuICBhcHAuZGlyZWN0aXZlKCdzY3JvbGxJZicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cmlidXRlcykge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHNjb3BlLiRldmFsKGF0dHJpYnV0ZXMuc2Nyb2xsSWYpKSB7XG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIGVsZW1lbnRbMF0ub2Zmc2V0VG9wIC0gMTAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgfSk7XG59KCkpO1xuIl19
