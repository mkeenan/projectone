//establishes the controller to start the application
function TicTacToeController($scope) {
//set initial player to "X"
  $scope.turn = 1;
//create empty cells in $scope
  $scope.cells=[0,0,0,0,0,0,0,0,0];

//create click as the main function to swap players and X's/O's
  $scope.click = function(i) {
//only allow clicking of empty spaces
    if ($scope.cells[i] == 0) {
//mark the move/turn
      $scope.cells[i] = $scope.turn;
//use an if statement to swap from X to O for next click and vice-versa
      if ($scope.turn == 1) {
        $scope.turn = -1;
      }
      else {
        $scope.turn = 1;
      }
//call the gameOver function
     $scope.gameOver();
 //end of click function curly brace
    }
 };


  $scope.gameOver = function() {
//identify win variations
        $scope.win = [
          [$scope.cells[0], $scope.cells[1], $scope.cells[2]],
          [$scope.cells[3], $scope.cells[4], $scope.cells[5]],
          [$scope.cells[6], $scope.cells[7], $scope.cells[8]],
          [$scope.cells[0], $scope.cells[3], $scope.cells[6]],
          [$scope.cells[1], $scope.cells[4], $scope.cells[7]],
          [$scope.cells[2], $scope.cells[5], $scope.cells[8]],
          [$scope.cells[0], $scope.cells[4], $scope.cells[8]],
          [$scope.cells[2], $scope.cells[4], $scope.cells[6]]
          ];
//for loop to iterate over an array
        for (var i = 0; i < 8; i++) {
//add the items in the index together to see if they equal 3 or -3, which are both win scenarios, [i]brings you to the array it's looking at [#] shows the item index number being added.
          var sum = $scope.win[i][0] + $scope.win[i][1] + $scope.win[i][2];
          if (sum == 3 || sum == -3) {
            alert("you win!");
            $scope.cells=[0,0,0,0,0,0,0,0,0];
            break;
          }

        }
      };

 //end of controller
}


//Bugs:
//won't stop saying "you win" after the first win occurs. Possibly add a div around the click function to prevent by showing that cell is not 0.??

//Paul Kim's approach to adding array elements
  // function seeIfWin(array) {
  //   sum = array[0] + array[1] + array[2];
  //   if (sum == 3 || sum == -3) {
  //     return true;
  //   }
  // }

// Win scenarios:
 //         row1 = [$scope.cell[0], $scope.cell[1], $scope.cell[2],]
        // row2 = [$scope.cell[3], $scope.cell[4], $scope.cell[5],]
        // row3 = [$scope.cell[6], $scope.cell[7], $scope.cell[8],]
        // col1 = [$scope.cell[0], $scope.cell[3], $scope.cell[6],]
        // col2 = [$scope.cell[1], $scope.cell[4], $scope.cell[7],]
        // col3 = [$scope.cell[2], $scope.cell[5], $scope.cell[8],]
        // diag1 = [$scope.cell[0], $scope.cell[4], $scope.cell[8],]
        // diag1 = [$scope.cell[2], $scope.cell[4], $scope.cell[6],]