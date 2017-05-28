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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKFwibXlBcHBcIiwgWyduZ1JvdXRlJ10pO1xuXG4gIC8qKlxuICAgKiBjb25maWd1cmUgcm91dGVzXG4gICAqL1xuXG4gIGFwcC5jb25maWcoZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcbiAgICAkcm91dGVQcm92aWRlclxuXG4gICAgICAud2hlbignLycsIHtcbiAgICAgICAgdGVtcGxhdGVVcmwgOiAncGFydGlhbHMvc2VhcmNoLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyICA6ICdzZWFyY2hNb3ZpZXMnXG4gICAgICB9KVxuXG4gICAgICAud2hlbignL3Jlc3VsdHMvOklEJywge1xuICAgICAgICB0ZW1wbGF0ZVVybCA6ICdwYXJ0aWFscy9yZXN1bHRzLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyICA6ICdyZXN1bHRNb3ZpZXMnXG4gICAgICB9KVxuXG4gICAgICAud2hlbignL3R2LycsIHtcbiAgICAgICAgdGVtcGxhdGVVcmwgOiAncGFydGlhbHMvdHYtc2VhcmNoLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyICA6ICdzZWFyY2hUdicsXG4gICAgICAgIGFjdGl2ZVRhYjogJ3R2J1xuICAgICAgfSlcblxuICAgICAgLndoZW4oJy90dlJlc3VsdHMvOklEJywge1xuICAgICAgICB0ZW1wbGF0ZVVybCA6ICdwYXJ0aWFscy90di1yZXN1bHRzLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyICA6ICdyZXN1bHRUdidcbiAgICAgIH0pXG5cblxuICAgICAgLm90aGVyd2lzZSh7XG4gICAgICAgIHJlZGlyZWN0VG86ICcvJ1xuICAgICAgfSk7XG5cbiAgfSk7XG5cblxuICBhcHAuY29udHJvbGxlcignaGVhZGVyQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJGxvY2F0aW9uKSB7XG5cbiAgICAkc2NvcGUuaXNBY3RpdmUgPSBmdW5jdGlvbiAodmlld0xvY2F0aW9uKSB7XG4gICAgICByZXR1cm4gdmlld0xvY2F0aW9uID09PSAkbG9jYXRpb24ucGF0aCgpO1xuICAgIH07XG5cbiAgfSk7XG5cblxuICBhcHAuY29udHJvbGxlcignc2VhcmNoTW92aWVzJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJHJvdXRlUGFyYW1zKSB7XG5cbiAgICAkc2NvcGUuc2VhcmNoPSAnJztcbiAgICAkc2NvcGUuYmFzZVVybCA9ICdodHRwOi8vaW1hZ2UudG1kYi5vcmcvdC9wL3czMDAvJztcbiAgICAkc2NvcGUubGlzdE9mTW92aWVzO1xuICAgICRzY29wZS5sYXRlc3RNb3ZpZXM7XG4gICAgJHNjb3BlLm1vdmllQXJyYXkgPSBbXG4gICAgICBcIlB1bHAgRmljdGlvblwiLFxuICAgICAgXCJGaWdodCBDbHViXCIsXG4gICAgICBcIlRoZSBTaGF3c2hhbmsgUmVkZW1wdGlvblwiLFxuICAgICAgXCJUaGUgRGFyayBLbmlnaHRcIixcbiAgICAgIFwiSW5nbG91cmlvdXMgQmFzdGVyZHNcIixcbiAgICAgIFwiSW5jZXB0aW9uXCIsXG4gICAgICBcIlRoZSBNYXRyaXhcIixcbiAgICAgIFwiVGhlIEVtcGlyZSBTdHJpa2VzIEJhY2tcIixcbiAgICAgIFwiVGhlIExvcmQgb2YgdGhlIFJpbmdzOiBUaGUgRmVsbG93c2hpcCBvZiB0aGUgUmluZ1wiLFxuICAgICAgXCJUb3kgU3RvcnlcIixcbiAgICAgIFwiVGhlIEJpZyBMZWJvd3NraVwiLFxuICAgICAgXCJEamFuZ28gVW5jaGFpbmVkXCIsXG4gICAgICBcIlRoZSBMb3JkIG9mIHRoZSBSaW5nczogVGhlIFJldHVybiBvZiB0aGUgS2luZ1wiLFxuICAgICAgXCJUaGUgRGVwYXJ0ZWRcIixcbiAgICAgIFwiTWVtZW50b1wiLFxuICAgICAgXCJUaGUgR29kZmF0aGVyXCIsXG4gICAgICBcIlJlc2Vydm9pciBEb2dzXCIsXG4gICAgICBcIlNhdmluZyBQcml2YXRlIFJ5YW5cIixcbiAgICAgIFwiRm9ycmVzdCBHdW1wXCIsXG4gICAgICBcIk1vbnR5IFB5dGhvbiBhbmQgdGhlIEhvbHkgR3JhaWxcIixcbiAgICAgIFwiU2VlblwiLFxuICAgICAgXCJCYWNrIHRvIHRoZSBGdXR1cmVcIixcbiAgICAgIFwiR29vZEZlbGxhc1wiLFxuICAgICAgXCJUaGUgUHJlc3RpZ2VcIixcbiAgICAgIFwiU2hhdW4gb2YgdGhlIERlYWRcIixcbiAgICAgIFwiQWxpZW5cIixcbiAgICAgIFwiVGhlIFNpbGVuY2Ugb2YgdGhlIExhbWJzXCIsXG4gICAgICBcIlRoZSBMb3JkIG9mIHRoZSBSaW5nczogVGhlIFR3byBUb3dlcnNcIixcbiAgICAgIFwiU3Bpcml0ZWQgQXdheVwiLFxuICAgICAgXCJUaGUgR29vZCwgdGhlIEJhZCBhbmQgdGhlIFVnbHlcIixcbiAgICAgIFwiRXRlcm5hbCBTdW5zaGluZSBvZiB0aGUgU3BvdGxlc3MgTWluZFwiLFxuICAgICAgXCJSYWlkZXJzIG9mIHRoZSBMb3N0IEFya1wiLFxuICAgICAgXCJBIFNwYWNlIE9keXNzZXlcIixcbiAgICAgIFwiRHIuIFN0cmFuZ2Vsb3ZlXCIsXG4gICAgICBcIkJsYWRlIFJ1bm5lclwiLFxuICAgICAgXCJUaGUgTGlvbiBLaW5nXCIsXG4gICAgICBcIk9uZSBGbGV3IE92ZXIgdGhlIEN1Y2tvbydzIE5lc3RcIixcbiAgICAgIFwiVGhlcmUgV2lsbCBCZSBCbG9vZFwiLFxuICAgICAgXCJUaGUgU2hpbmluZ1wiLFxuICAgICAgXCJUaGUgVHJ1bWFuIFNob3dcIixcbiAgICAgIFwiQSBDbG9ja3dvcmsgT3JhbmdlXCIsXG4gICAgICBcIlN0YXIgV2Fyc1wiLFxuICAgICAgXCJEaXN0cmljdCA5XCIsXG4gICAgICBcIlVwXCIsXG4gICAgICBcIk9mZmljZSBTcGFjZVwiLFxuICAgICAgXCIxMiBBbmdyeSBNZW5cIixcbiAgICAgIFwiUGFuJ3MgTGFieXJpbnRoXCIsXG4gICAgICBcIlRoZSBVc3VhbCBTdXNwZWN0c1wiLFxuICAgICAgXCJKdXJhc3NpYyBQYXJrXCIsXG4gICAgICBcIlYgZm9yIFZlbmRldHRhXCIsXG4gICAgICBcIlRoZSBQcmluY2VzcyBCcmlkZVwiLFxuICAgICAgXCJObyBDb3VudHJ5IGZvciBPbGQgTWVuXCIsXG4gICAgICBcIlNjaGluZGxlcidzIExpc3RcIixcbiAgICAgIFwiR29vZCBXaWxsIEh1bnRpbmdcIixcbiAgICAgIFwiQ2hpbGRyZW4gb2YgTWVuXCIsXG4gICAgICBcIktpbGwgQmlsbDogVm9sLiAxXCIsXG4gICAgICBcIldBTEzCt0VcIixcbiAgICAgIFwiQW1lcmljYW4gSGlzdG9yeSBYXCIsXG4gICAgICBcIkRpZSBIYXJkXCIsXG4gICAgICBcIkRyaXZlXCIsXG4gICAgICBcIk1vb25cIixcbiAgICAgIFwiR3JvdW5kaG9nIERheVwiLFxuICAgICAgXCJCYXRtYW4gQmVnaW5zXCIsXG4gICAgICBcIkZhcmdvXCIsXG4gICAgICBcIlRoZSBJbmNyZWRpYmxlc1wiLFxuICAgICAgXCJPIEJyb3RoZXIsIFdoZXJlIEFydCBUaG91XCIsXG4gICAgICBcIkdsYWRpYXRvclwiLFxuICAgICAgXCJBaXJwbGFuZVwiLFxuICAgICAgXCJBbWVyaWNhbiBCZWF1dHlcIixcbiAgICAgIFwiVGVybWluYXRvciAyOiBKdWRnbWVudCBEYXlcIixcbiAgICAgIFwiTMOpb25cIixcbiAgICAgIFwiVG95IFN0b3J5IDNcIixcbiAgICAgIFwiU25hdGNoXCIsXG4gICAgICBcIkFtZXJpY2FuIFBzeWNob1wiLFxuICAgICAgXCJUaGUgU29jaWFsIE5ldHdvcmtcIixcbiAgICAgIFwiT2xkYm95XCIsXG4gICAgICBcIkZlcnJpcyBCdWVsbGVyJ3MgRGF5IE9mZlwiLFxuICAgICAgXCJQcmluY2VzcyBNb25vbm9rZVwiLFxuICAgICAgXCJJbiBCcnVnZXNcIixcbiAgICAgIFwiRG9ubmllIERhcmtvXCIsXG4gICAgICBcIkNhc2FibGFuY2FcIixcbiAgICAgIFwiQ2l0eSBvZiBHb2RcIixcbiAgICAgIFwiUHN5Y2hvXCIsXG4gICAgICBcIlRoZSBGaWZ0aCBFbGVtZW50XCIsXG4gICAgICBcIlNldmVuIFNhbXVyYWlcIixcbiAgICAgIFwiVGF4aSBEcml2ZXJcIixcbiAgICAgIFwiTW9uc3RlcnMsIEluYy5cIixcbiAgICAgIFwiMjggRGF5cyBMYXRlclwiLFxuICAgICAgXCJSZXF1aWVtIGZvciBhIERyZWFtXCIsXG4gICAgICBcIlRoZSBHb2RmYXRoZXI6IFBhcnQgSUlcIixcbiAgICAgIFwiSG90IEZ1enpcIixcbiAgICAgIFwiVHJhaW5zcG90dGluZ1wiLFxuICAgICAgXCJBbcOpbGllXCIsXG4gICAgICBcIlR3ZWx2ZSBNb25rZXlzXCIsXG4gICAgICBcIkFsaWVuc1wiLFxuICAgICAgXCJUaGUgRGFyayBLbmlnaHQgUmlzZXNcIixcbiAgICAgIFwiS2lzcyBLaXNzIEJhbmcgQmFuZ1wiLFxuICAgICAgXCJMb3N0IGluIFRyYW5zbGF0aW9uXCIsXG4gICAgICBcIkNoaW5hdG93blwiLFxuICAgICAgXCJUaGUgUm95YWwgVGVubmVuYmF1bXNcIixcbiAgICAgIFwiUmVhciBXaW5kb3dcIixcbiAgICAgIFwiSmF3c1wiLFxuICAgICAgXCJPY2VhbidzIEVsZXZlblwiLFxuICAgICAgXCJUaGUgR3JlZW4gTWlsZVwiLFxuICAgICAgXCJCbGFjayBTd2FuXCIsXG4gICAgICBcIkNpdGl6ZW4gS2FuZVwiLFxuICAgICAgXCJMb29wZXJcIixcbiAgICAgIFwiVGhlIFRoaW5nXCIsXG4gICAgICBcIlRoZSBCcmVha2Zhc3QgQ2x1YlwiLFxuICAgICAgXCJUaGUgQ2FiaW4gaW4gdGhlIFdvb2RzXCIsXG4gICAgICBcIkwuQS4gQ29uZmlkZW50aWFsXCIsXG4gICAgICBcIlNjb3R0IFBpbGdyaW0gdnMuIHRoZSBXb3JsZFwiLFxuICAgICAgXCJGaW5kaW5nIE5lbW9cIixcbiAgICAgIFwiQm9vZ2llIE5pZ2h0c1wiLFxuICAgICAgXCJTdXBlcmJhZFwiLFxuICAgICAgXCJTaW4gQ2l0eVwiLFxuICAgICAgXCJGZWFyIGFuZCBMb2F0aGluZyBpbiBMYXMgVmVnYXNcIixcbiAgICAgIFwiSW5kaWFuYSBKb25lcyBhbmQgdGhlIExhc3QgQ3J1c2FkZVwiLFxuICAgICAgXCJUbyBLaWxsIGEgTW9ja2luZ2JpcmRcIixcbiAgICAgIFwiTGF3cmVuY2Ugb2YgQXJhYmlhXCIsXG4gICAgICBcIkJlaW5nIEpvaG4gTWFsa292aWNoXCIsXG4gICAgICBcIlRoZSBQaWFuaXN0XCIsXG4gICAgICBcIkFubmllIEhhbGxcIixcbiAgICAgIFwiQW5jaG9ybWFuOiBUaGUgTGVnZW5kIG9mIFJvbiBCdXJndW5keVwiLFxuICAgICAgXCJBcmdvXCIsXG4gICAgICBcIlJhZ2luZyBCdWxsXCIsXG4gICAgICBcIlZlcnRpZ29cIixcbiAgICAgIFwiVGhlIEF2ZW5nZXJzXCIsXG4gICAgICBcIkJ1dGNoIENhc3NpZHkgYW5kIHRoZSBTdW5kYW5jZSBLaWRcIixcbiAgICAgIFwiRGF6ZWQgYW5kIENvbmZ1c2VkXCIsXG4gICAgICBcIjUwMCBEYXlzIG9mIFN1bW1lclwiLFxuICAgICAgXCJXaWxseSBXb25rYSAmIHRoZSBDaG9jb2xhdGUgRmFjdG9yeVwiLFxuICAgICAgXCJVbmZvcmdpdmVuXCIsXG4gICAgICBcIkZhbnRhc3RpYyBNci4gRm94XCIsXG4gICAgICBcIlRoZSBJcm9uIEdpYW50XCIsXG4gICAgICBcIlRoZSBUZXJtaW5hdG9yXCIsXG4gICAgICBcIkdob3N0IEJ1c3RlcnNcIixcbiAgICAgIFwiVGhpcyBJcyBTcGluYWwgVGFwXCIsXG4gICAgICBcIkdyYW4gVG9yaW5vXCIsXG4gICAgICBcIkFkYXB0YXRpb24uXCIsXG4gICAgICBcIkEgRmlzdGZ1bCBvZiBEb2xsYXJzXCIsXG4gICAgICBcIlN0YW5kIGJ5IE1lXCIsXG4gICAgICBcIkFwb2xsbyAxM1wiLFxuICAgICAgXCJCbGF6aW5nIFNhZGRsZXNcIixcbiAgICAgIFwiQW1hZGV1c1wiLFxuICAgICAgXCJLaWNrLUFzc1wiLFxuICAgICAgXCJSdXNobW9yZVwiLFxuICAgICAgXCJMaWZlIG9mIEJyaWFuXCIsXG4gICAgICBcIkFsbW9zdCBGYW1vdXNcIixcbiAgICAgIFwiTmV0d29ya1wiLFxuICAgICAgXCJNdWxob2xsYW5kIERyaXZlXCIsXG4gICAgICBcIlN0YXIgVHJla1wiLFxuICAgICAgXCJJdCdzIGEgV29uZGVyZnVsIExpZmVcIixcbiAgICAgIFwiU2luZ2luJyBpbiB0aGUgUmFpblwiLFxuICAgICAgXCJUaGUgR3JhZHVhdGVcIixcbiAgICAgIFwiQ29vbCBIYW5kIEx1a2VcIixcbiAgICAgIFwiVGhlIE5pZ2h0bWFyZSBCZWZvcmUgQ2hyaXN0bWFzXCIsXG4gICAgICBcIk1ldHJvcG9saXNcIixcbiAgICAgIFwiQ2FzaW5vIFJveWFsZVwiLFxuICAgICAgXCJab2RpYWNcIixcbiAgICAgIFwiQ3JvdWNoaW5nIFRpZ2VyLCBIaWRkZW4gRHJhZ29uXCIsXG4gICAgICBcIkUuVC5cIixcbiAgICAgIFwiVGhlIEJsdWVzIEJyb3RoZXJzXCIsXG4gICAgICBcIkhvdGVsIFJ3YW5kYVwiLFxuICAgICAgXCJab29sYW5kZXJcIixcbiAgICAgIFwiSGVhdFwiLFxuICAgICAgXCJUaGUgU2V2ZW50aCBTZWFsXCIsXG4gICAgICBcIktpbGwgQmlsbDogVm9sLiAyXCIsXG4gICAgICBcIlN0cmFuZ2VyIFRoYW4gRmljdGlvblwiLFxuICAgICAgXCJEb3VibGUgSW5kZW1uaXR5XCIsXG4gICAgICBcIk9uIHRoZSBXYXRlcmZyb250XCIsXG4gICAgICBcIlByZWRhdG9yXCIsXG4gICAgICBcIkx1Y2t5IE51bWJlciBTbGV2aW5cIixcbiAgICAgIFwiQ2F0Y2ggTWUgSWYgWW91IENhblwiLFxuICAgICAgXCJEcmVkZFwiLFxuICAgICAgXCJCYXR0bGUgUm95YWxlXCIsXG4gICAgICBcIlJvYm9Db3BcIixcbiAgICAgIFwiSG93IHRvIFRyYWluIFlvdXIgRHJhZ29uXCIsXG4gICAgICBcIkRvZyBEYXkgQWZ0ZXJub29uXCIsXG4gICAgICBcIlBsYW5ldCBvZiB0aGUgQXBlc1wiLFxuICAgICAgXCJNYXN0ZXIgYW5kIENvbW1hbmRlcjogVGhlIEZhciBTaWRlIG9mIHRoZSBXb3JsZFwiLFxuICAgICAgXCJQYXRocyBvZiBHbG9yeVwiLFxuICAgICAgXCJCcm9rZWJhY2sgTW91bnRhaW5cIixcbiAgICAgIFwiVGhlIEhvYmJpdDogQW4gVW5leHBlY3RlZCBKb3VybmV5XCIsXG4gICAgICBcIlRoZSBXaXphcmQgb2YgT3pcIixcbiAgICAgIFwiQ2xvc2UgRW5jb3VudGVycyBvZiB0aGUgVGhpcmQgS2luZFwiLFxuICAgICAgXCJUaGUgV3Jlc3RsZXJcIixcbiAgICAgIFwiVGhlIEplcmtcIixcbiAgICAgIFwiU2x1bWRvZyBNaWxsaW9uYWlyZVwiLFxuICAgICAgXCJTaWx2ZXIgTGluaW5ncyBQbGF5Ym9va1wiLFxuICAgICAgXCJHbGVuZ2FycnkgR2xlbiBSb3NzXCIsXG4gICAgICBcIlN1bnNldCBCb3VsZXZhcmRcIixcbiAgICAgIFwiUmV0dXJuIG9mIHRoZSBKZWRpXCIsXG4gICAgICBcIlJhblwiLFxuICAgICAgXCJDb2xsYXRlcmFsXCIsXG4gICAgICBcIkxldCB0aGUgUmlnaHQgT25lIEluXCIsXG4gICAgICBcIlRoZSBTdGluZ1wiLFxuICAgICAgXCJUdWNrZXIgYW5kIERhbGUgVnMuIEV2aWxcIixcbiAgICAgIFwiU29tZSBMaWtlIEl0IEhvdFwiLFxuICAgICAgXCJTaHV0dGVyIElzbGFuZFwiLFxuICAgICAgXCJUaGUgTWFsdGVzZSBGYWxjb25cIixcbiAgICAgIFwiVGhlIFRyZWFzdXJlIG9mIHRoZSBTaWVycmEgTWFkcmVcIixcbiAgICAgIFwiU3Vuc2hpbmVcIixcbiAgICAgIFwiUHVuY2gtRHJ1bmsgTG92ZVwiLFxuICAgICAgXCJNYWdub2xpYVwiLFxuICAgICAgXCJUaGFuayBZb3UgZm9yIFNtb2tpbmdcIixcbiAgICAgIFwiVGhlIEh1cnQgTG9ja2VyXCIsXG4gICAgICBcIkRhd24gb2YgdGhlIERlYWRcIlxuICAgIF07XG5cbiAgICAkc2NvcGUuJHJvdXRlID0gJHJvdXRlUGFyYW1zO1xuXG5cbiAgICB2YXIgbW92aWVBcnJheSA9ICRzY29wZS5tb3ZpZUFycmF5O1xuICAgIHZhciBtb3ZpZUNvdW50ZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogc2h1ZmZsZSBhcnJheVxuICAgICAqIGFycmF5IG9mIG1vdmllcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzaHVmZmxlKGFycmF5KSB7XG4gICAgICB2YXIgY3VycmVudEluZGV4ID0gYXJyYXkubGVuZ3RoLCB0ZW1wb3JhcnlWYWx1ZSwgcmFuZG9tSW5kZXg7XG5cbiAgICAgIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxlLi4uXG4gICAgICB3aGlsZSAoMCAhPT0gY3VycmVudEluZGV4KSB7XG4gICAgICAgIC8vIFBpY2sgYSByZW1haW5pbmcgZWxlbWVudC4uLlxuICAgICAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGN1cnJlbnRJbmRleCk7XG4gICAgICAgIGN1cnJlbnRJbmRleCAtPSAxO1xuXG4gICAgICAgIC8vIEFuZCBzd2FwIGl0IHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAgICAgICAgdGVtcG9yYXJ5VmFsdWUgPSBhcnJheVtjdXJyZW50SW5kZXhdO1xuICAgICAgICBhcnJheVtjdXJyZW50SW5kZXhdID0gYXJyYXlbcmFuZG9tSW5kZXhdO1xuICAgICAgICBhcnJheVtyYW5kb21JbmRleF0gPSB0ZW1wb3JhcnlWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cblxuICAgICRzY29wZS5tb3ZpZUFycmF5ID0gc2h1ZmZsZShtb3ZpZUFycmF5KTtcbiAgICAkc2NvcGUucmFuZG9tTW92aWUgPSAkc2NvcGUubW92aWVBcnJheTtcblxuICAgICRzY29wZS5zdWdnZXN0TW92aWVBcnJheSA9IHNodWZmbGUoJHNjb3BlLm1vdmllQXJyYXkpO1xuICAgICRzY29wZS5zdWdnZXN0UmFuZG9tTW92aWUgPSAkc2NvcGUuc3VnZ2VzdE1vdmllQXJyYXk7XG5cblxuICAgIC8qKlxuICAgICAqIENsaWNrIG9uIHJhbmRvbSBtb3ZpZVxuICAgICAqIGxvb3AgdGhyb3VnaCBzdWdnZXN0ZWQgbW92aWVzXG4gICAgICogYW5kIHBvcHVsYXRlIHNlYXJjaCBmaWVsZFxuICAgICAqL1xuICAgICRzY29wZS51cGRhdGVSYW5kb21Nb3ZpZSA9IGZ1bmN0aW9uKG1vdmllKXtcbiAgICAgICRzY29wZS5zZWFyY2ggPSBtb3ZpZUFycmF5W21vdmllQ291bnRlcisrICUgbW92aWVBcnJheS5sZW5ndGhdO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBjbGljayBvbiBzdWdnZXN0ZWQgaXRlbVxuICAgICAqIHVwZGF0ZSBpbnB1dCB2YWx1ZXNcbiAgICAgKi9cbiAgICAkc2NvcGUuc3VnZ2VzdGVkVXBkYXRlID0gZnVuY3Rpb24obW92aWUpIHtcbiAgICAgICRzY29wZS5zZWFyY2ggPSBtb3ZpZTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLiR3YXRjaCgnc2VhcmNoJywgZnVuY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgIHNlYXJjaEFsbCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJHNjb3BlLklEID0gJHJvdXRlUGFyYW1zLklEO1xuXG4gICAgLyoqXG4gICAgICogY2FsbCBhcGksIHVzZSBzZWFyY2ggdG8gY2FsbFxuICAgICAqIG1vdmllcyB0byBwb3B1bGF0ZSByZXN1bHRzXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2VhcmNoQWxsKCkge1xuICAgICAgJGh0dHAuZ2V0KCdodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL3NlYXJjaC9tb3ZpZT9hcGlfa2V5PWFiNThjYWIzNzI2MTJlMzdmNTNiYmE4OTcwYWUxMWExJmxhbmd1YWdlPWVuLVVTJnF1ZXJ5PScgKyAkc2NvcGUuc2VhcmNoICsgJyZwYWdlPTEmaW5jbHVkZV9hZHVsdD1mYWxzZScpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgJHNjb3BlLmxpc3RPZk1vdmllcyA9IHJlc3BvbnNlLmRhdGEucmVzdWx0cztcbiAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUubGlzdE9mTW92aWVzKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjYWxsIGFwaVxuICAgICAqIGdldCB0aGUgbGF0ZXN0IG1vdmllc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldExhdGVzdCgpIHtcbiAgICAgICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS9sYXRlc3Q/YXBpX2tleT1hYjU4Y2FiMzcyNjEyZTM3ZjUzYmJhODk3MGFlMTFhMSZsYW5ndWFnZT1lbi1VUycpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgJHNjb3BlLmxhdGVzdE1vdmllcyA9IHJlc3BvbnNlLmRhdGEucmVzdWx0cztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0TGF0ZXN0KCk7XG4gIH0pO1xuXG4gIGFwcC5jb250cm9sbGVyKCdyZXN1bHRNb3ZpZXMnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkbG9jYXRpb24pIHtcblxuICAgIHZhciBwSWQgPSAkbG9jYXRpb24ucGF0aCgpLnNwbGl0KC9bXFxzL10rLykucG9wKCk7XG4gICAgJHNjb3BlLmJhc2VVcmwgPSAnaHR0cDovL2ltYWdlLnRtZGIub3JnL3QvcC93MzAwLyc7XG4gICAgJHNjb3BlLm1vdmllRGV0YWlsO1xuICAgICRzY29wZS5yZWxhdGVkUmVzdWx0cztcbiAgICAkc2NvcGUuY2FzdDtcbiAgICAkc2NvcGUubW92aWVJRCA9IHBJZDtcblxuICAgIC8qKlxuICAgICAqIHNldCBjaGVrYm94ZXMgdG8gY2hlY2tlZCBieSBkZWZhdWx0XG4gICAgICovXG4gICAgJHNjb3BlLm1vdmllT3B0aW9ucyA9IHtcbiAgICAgIHBvc3RlcjogdHJ1ZSxcbiAgICAgIGluZm86IHRydWUsXG4gICAgICByZWxhdGVkOiB0cnVlLFxuICAgICAgcmV2aWV3czogdHJ1ZSxcbiAgICAgIGNhc3Q6IHRydWUsXG4gICAgICBleHRyYXM6IHRydWVcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogY2FsbCBhcGksIHVzZSB0aGUgbW92aWUgaWRcbiAgICAgKiB0byBnZXQgc3BlY2lmaWMgaW5mb1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFNwZWNpZmljKCkge1xuICAgICAgJGh0dHAuZ2V0KCdodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL21vdmllLycgKyAkc2NvcGUubW92aWVJRCArICc/YXBpX2tleT0zZmNjNGMxOGQ2ZGY1M2MwNmQyNzc2ZWU1NmRmMTkxOCZsYW5ndWFnZT1lbi1VUyZwYWdlPTEnKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICRzY29wZS5tb3ZpZURldGFpbCA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNhbGwgYXBpLCBnZXQgcmVsYXRlZFxuICAgICAqIG1vdmllc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFJlbGF0ZWRSZXN1bHRzKCkge1xuICAgICAgJGh0dHAuZ2V0KCdodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL21vdmllLycgKyAkc2NvcGUubW92aWVJRCArICcvc2ltaWxhcj9hcGlfa2V5PWFiNThjYWIzNzI2MTJlMzdmNTNiYmE4OTcwYWUxMWExJmxhbmd1YWdlPWVuLVVTJnBhZ2U9MScpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgJHNjb3BlLnJlbGF0ZWRSZXN1bHRzID0gcmVzcG9uc2UuZGF0YS5yZXN1bHRzO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjYWxsIGFwaSwgZ2V0IGNhc3QgbWVtYmVyc1xuICAgICAqIGZyb20gbW92aWVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRDYXN0KCkge1xuICAgICAgJGh0dHAuZ2V0KCdodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL21vdmllLycgKyAkc2NvcGUubW92aWVJRCArICcvY3JlZGl0cz9hcGlfa2V5PWFiNThjYWIzNzI2MTJlMzdmNTNiYmE4OTcwYWUxMWExJmxhbmd1YWdlPWVuLVVTJnBhZ2U9MScpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgJHNjb3BlLmNhc3QgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXQgdGhlIG1vdmllXG4gICAgICovXG4gICAgZ2V0U3BlY2lmaWMoKTtcblxuICAgIC8qKlxuICAgICAqIGdldCB0aGUgcmVsYXRlZCBtb3ZpZXNcbiAgICAgKi9cbiAgICBnZXRSZWxhdGVkUmVzdWx0cygpO1xuXG4gICAgLyoqXG4gICAgICogZ2V0IHRoZSBjYXN0XG4gICAgICovXG4gICAgZ2V0Q2FzdCgpO1xuICB9KTtcblxuICBhcHAuY29udHJvbGxlcignc2VhcmNoVHYnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkcm91dGVQYXJhbXMpIHtcblxuICAgICRzY29wZS50dlNlYXJjaD0gJyc7XG4gICAgJHNjb3BlLmJhc2VVcmwgPSAnaHR0cDovL2ltYWdlLnRtZGIub3JnL3QvcC93MzAwLyc7XG4gICAgJHNjb3BlLmxpc3RPZlNob3dzO1xuICAgICRzY29wZS5JRCA9ICRyb3V0ZVBhcmFtcy5JRDtcblxuICAgICRzY29wZS4kcm91dGUgPSAkcm91dGVQYXJhbXM7XG5cbiAgICAvKipcbiAgICAgKiBjbGljayBvbiBzdWdnZXN0ZWQgaXRlbVxuICAgICAqIHVwZGF0ZSBpbnB1dCB2YWx1ZXNcbiAgICAgKi9cbiAgICAkc2NvcGUuc3VnZ2VzdGVkVXBkYXRlID0gZnVuY3Rpb24odHYpIHtcbiAgICAgICRzY29wZS50dlNlYXJjaCA9IHR2Lm5hbWU7XG4gICAgfTtcblxuICAgICRzY29wZS4kd2F0Y2goJ3R2U2VhcmNoJywgZnVuY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgIHNlYXJjaFR2KCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBjYWxsIGFwaSwgdXNlIHNlYXJjaCB0byBjYWxsXG4gICAgICogdHYgc2hvd3MsIHBvcHVsYXRlIHJlc3VsdHNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZWFyY2hUdigpIHtcbiAgICAgICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9zZWFyY2gvdHY/YXBpX2tleT1hYjU4Y2FiMzcyNjEyZTM3ZjUzYmJhODk3MGFlMTFhMSZsYW5ndWFnZT1lbi1VUyZxdWVyeT0nICsgJHNjb3BlLnR2U2VhcmNoICsgJyZwYWdlPTEmaW5jbHVkZV9hZHVsdD1mYWxzZScpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgJHNjb3BlLmxpc3RPZlNob3dzID0gcmVzcG9uc2UuZGF0YS5yZXN1bHRzO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjYWxsIGFwaVxuICAgICAqIGdldCB0aGUgbGF0ZXN0IHR2IHNob3dzXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0TGF0ZXN0KCkge1xuICAgICAgJGh0dHAuZ2V0KCdodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL3R2L3BvcHVsYXI/YXBpX2tleT1hYjU4Y2FiMzcyNjEyZTM3ZjUzYmJhODk3MGFlMTFhMSZsYW5ndWFnZT1lbi1VUycpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgJHNjb3BlLmxhdGVzdFNob3dzID0gcmVzcG9uc2UuZGF0YS5yZXN1bHRzO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRMYXRlc3QoKTtcbiAgfSk7XG5cbiAgYXBwLmNvbnRyb2xsZXIoJ3Jlc3VsdFR2JywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJGxvY2F0aW9uKSB7XG5cbiAgICB2YXIgcElkID0gJGxvY2F0aW9uLnBhdGgoKS5zcGxpdCgvW1xccy9dKy8pLnBvcCgpO1xuICAgICRzY29wZS5iYXNlVXJsID0gJ2h0dHA6Ly9pbWFnZS50bWRiLm9yZy90L3AvdzMwMC8nO1xuICAgICRzY29wZS50dkRldGFpbDtcbiAgICAkc2NvcGUuY2FzdERldGFpbDtcbiAgICAkc2NvcGUudHZJRCA9IHBJZDtcblxuICAgIC8qKlxuICAgICAqIHNldCBjaGVrYm94ZXMgdG8gY2hlY2tlZCBieSBkZWZhdWx0XG4gICAgICovXG4gICAgJHNjb3BlLnR2T3B0aW9ucyA9IHtcbiAgICAgIHBvc3RlcjogdHJ1ZSxcbiAgICAgIGluZm86IHRydWUsXG4gICAgICByZWxhdGVkOiB0cnVlLFxuICAgICAgY2FzdDogdHJ1ZSxcbiAgICAgIGV4dHJhczogdHJ1ZSxcbiAgICAgIHNlYXNvbnM6IHRydWVcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogY2FsbCBhcGksIHVzZSB0aGUgbW92aWUgaWRcbiAgICAgKiB0byBnZXQgc3BlY2lmaWMgaW5mb1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFNwZWNpZmljKCkge1xuICAgICAgJGh0dHAuZ2V0KCdodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL3R2LycgKyAkc2NvcGUudHZJRCArICc/YXBpX2tleT1hYjU4Y2FiMzcyNjEyZTM3ZjUzYmJhODk3MGFlMTFhMSZsYW5ndWFnZT1lbi1VUyZwYWdlPTEnKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICRzY29wZS50dkRldGFpbCA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNhbGwgYXBpLCBnZXQgcmVsYXRlZFxuICAgICAqIHNob3dzXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0UmVsYXRlZFR2UmVzdWx0cygpIHtcbiAgICAgICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy90di8nICsgJHNjb3BlLnR2SUQgKyAnL3NpbWlsYXI/YXBpX2tleT1hYjU4Y2FiMzcyNjEyZTM3ZjUzYmJhODk3MGFlMTFhMSZsYW5ndWFnZT1lbi1VUyZwYWdlPTEnKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICRzY29wZS5yZWxhdGVkVHZSZXN1bHRzID0gcmVzcG9uc2UuZGF0YS5yZXN1bHRzO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy9cbiAgICAvKipcbiAgICAgKiBjYWxsIGFwaSwgZ2V0IGNhc3QgbWVtYmVyc1xuICAgICAqIGZyb20gbW92aWVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRDYXN0KCkge1xuICAgICAgJGh0dHAuZ2V0KCdodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL3R2LycgKyAkc2NvcGUudHZJRCArICcvY3JlZGl0cz9hcGlfa2V5PWFiNThjYWIzNzI2MTJlMzdmNTNiYmE4OTcwYWUxMWExJmxhbmd1YWdlPWVuLVVTJnBhZ2U9MScpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgJHNjb3BlLmNhc3REZXRhaWwgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5jYXN0RGV0YWlsKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXQgdGhlIG1vdmllXG4gICAgICovXG4gICAgZ2V0U3BlY2lmaWMoKTtcblxuICAgIC8qKlxuICAgICAqIGdldCB0aGUgcmVsYXRlZCBzaG93c1xuICAgICAqL1xuICAgIGdldFJlbGF0ZWRUdlJlc3VsdHMoKTtcblxuICAgIC8qKlxuICAgICAqIGdldCB0aGUgY2FzdFxuICAgICAqL1xuICAgIGdldENhc3QoKTtcbiAgfSk7XG5cbiAgYXBwLmRpcmVjdGl2ZSgncHJldmVudERlZmF1bHQnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuYmluZCgnY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH0pO1xuXG4gIGFwcC5kaXJlY3RpdmUoJ3Njcm9sbElmJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRyaWJ1dGVzKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoc2NvcGUuJGV2YWwoYXR0cmlidXRlcy5zY3JvbGxJZikpIHtcbiAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgZWxlbWVudFswXS5vZmZzZXRUb3AgLSAxMDApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICB9KTtcbn0oKSk7XG4iXSwiZmlsZSI6Im1haW4uanMifQ==
