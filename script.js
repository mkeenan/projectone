var myGame = angular.module("TTTApp",["firebase"]);


//establishes the controller to start the application
function TicTacToeController($scope, $firebase) {

//connect to lcm database through Firebase and add a section called games
  var TTTRef = new Firebase("https://lcm.firebaseio.com/games");

// //set initial player to "X"
//   $scope.turn = 1;
// //create empty cells in $scope
//   $scope.cells=[0,0,0,0,0,0,0,0,0];
  $scope.game = {};
//chunk of code below sets up firebase:
  var lastGame;
        // Ask for all existing game info from firebase
        TTTRef.once('value', function(gamesSnapshot) {
          // get the actual games data
          var lastGame;
          var games = gamesSnapshot.val();
          if(games == null)
          {
            // No games at all, so make a new game -- As if we're Areg
            lastGame = TTTRef.push( {waiting: true} );
            playerNum = 1;
          }
          else  // I do have at least one game out there...
          {
            var keys = Object.keys(games);
            var lastGameKey = keys[ keys.length - 1 ];
            lastGame = games[ lastGameKey ];
            console.log("This person's game: " + lastGameKey);
            if(lastGame.waiting)
            {
              // Currently someone is waiting -- eg: Areg is there and we're Rocky
              // Grab from Firebase its lasts game object
              lastGame = TTTRef.child(lastGameKey);
              // Set a new game on this
              lastGame.set( {waiting:false, turn: 1, won: false, cells : [0,0,0,0,0,0,0,0,0]} );
              playerNum = 2;
            }
            else
            {
              // Make a new game -- As if we're Areg
              lastGame = TTTRef.push( {waiting: true} );
              playerNum = 1;
            }
          }
          // Attach the last game to what we're up to
          fbBind = $firebase(lastGame);
          fbBind.$bind($scope, "game");
      });



//create click as the main function to swap players and X's/O's
  $scope.click = function(i) {
//only allow clicking of empty spaces
    if ($scope.game.cells[i] == 0 &&

//alternate turns
      (playerNum == 1 && $scope.game.turn == 1 || playerNum == 2 && $scope.game.turn == -1)) {

//mark the move/turn
      $scope.game.cells[i] = $scope.game.turn;
//use an if statement to swap from X to O for next click and vice-versa
      if ($scope.game.turn == 1) {
        $scope.game.turn = -1;
      }
      else {
        $scope.game.turn = 1;
      }
//call the gameOver function
     $scope.gameOver();
 //end of click function curly brace
    };
 };

   $scope.convert = function (c) {
    console.log(c);
    if (c == 0) {
      return "";
    }
    else if (c == 1) {
      return "";
    }
    else {
      return "";
    }
   };

  $scope.gameOver = function() {
//identify win variations
        $scope.win = [
          [$scope.game.cells[0], $scope.game.cells[1], $scope.game.cells[2]],
          [$scope.game.cells[3], $scope.game.cells[4], $scope.game.cells[5]],
          [$scope.game.cells[6], $scope.game.cells[7], $scope.game.cells[8]],
          [$scope.game.cells[0], $scope.game.cells[3], $scope.game.cells[6]],
          [$scope.game.cells[1], $scope.game.cells[4], $scope.game.cells[7]],
          [$scope.game.cells[2], $scope.game.cells[5], $scope.game.cells[8]],
          [$scope.game.cells[0], $scope.game.cells[4], $scope.game.cells[8]],
          [$scope.game.cells[2], $scope.game.cells[4], $scope.game.cells[6]]
          ];
//for loop to iterate over an array
        for (var i = 0; i < 8; i++) {
//add the items in the index together to see if they equal 3 or -3, which are both win scenarios, [i]brings you to the array it's looking at [#] shows the item index number being added.
          var sum = $scope.win[i][0] + $scope.win[i][1] + $scope.win[i][2];
          if (sum == 3 || sum == -3) {
            $scope.$apply();
            alert("you win!");
            $scope.game.cells=[0,0,0,0,0,0,0,0,0];
            break;
          }

        }
      };

 //end of controller
}

