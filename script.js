
//establishes the controller to start the application//
function TicTacToeController($scope) {
  $scope.cells=["","","","","","","","",""];
  $scope.click = function(i) {
    $scope.cells[i] = 'X';
  };

}

// controller based on our group...also see Brian Gordon's image replacement code

// gameApp.controller('GameController', function($scope){

//   var turn = true;

//   $scope.playerTurn = function(r, c)
//   {
//     if(turn === true)
//     {
//       $scope.rows[r][c] = 1;  // X
//       value = 1;
//       turn =false;
//     }
//     else
//     {
//       $scope.rows[r][c] = -1; // O
//       value = -1;
//       turn = true;
//     }