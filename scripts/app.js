function init() {

// ! Elements

  const grid = document.querySelector('.grid')

// ! Variables

  const width = 28 
  const height = 30
  const cellCount = width * height
  const cells = []

// ! Executions

// ? Create Board

// This function will take the cellCount (see Variables) and create a new <div> on each loop and attach it to the grid container. Adding in a dataset of "index" so it's easy to find the index number of cells to start/place the Hero, Monsters and Energisers. 
  
  function createBoard() {
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.dataset.index = i
      cells.push(cell)
      grid.appendChild(cell)
    }
  }

  createBoard()

// Create an array of indexes for wall
// Create an array of indexes for dots
// Create an array of indexes for energisers
// Create an array of indexes for monsterHome 
// using a forEach loop, add the corresponding classes to each element.



// ? Hero Movement

// Function for moving the hero around the board 
  // Will need to be an if statement - or switch?? - and check whether the index we want the hero to move into isn't a wall, the enemy home or doesn't leave the board completely. Each keycode pressed will need it's own statement 

// Then, if the new position (now current position) contains an enemy, a flashing monster, a dot, or an energiser there will be certain actions (can these be their own functions?)
  
  // if dot (true) - call function: remove dot class, add 10 to score, update score display, reduce number of dots to go by 1, update remianing dots display
  
  // if energiser (true) - call function: remove energiser, add 50 to score, update score display, make monsters flash, freeze enemies/move in opposite direction.
  
  // if monster (true) - call function: lose a life, update life display. 
 
  // if vulnerable monster (true) - call function: add x to score, update score display, reset enemy position. if first vulnerable enemy = 200 points. if second 400 points, doubles every time. 



  // ? Monster Movement 

  // Function for randomMovement... 
  // Firstly, what are the directions that a Monster can move: (left: -1, right: +1, down: width, up: -width) - same as Hero. Make this into an array and then do Math.floor Math.random * array length to get the random direction.

  // Then we need to check the cell the monster is about to look into - currentposition + direction? - if that cell doesn't contain a wall, enemy home and doesn't leave the board completely, reassign current positions. If that new current position contains the hero, if the ghost isn't vulnerable (vulnerable monster = fale) then call monster function above, if vulnerable (vulnerablemonster = true) then call vulnerable monster function above? 




  // ? Stop Monster Flashing 

  // Default -> let isVulnerable 






// ! Events



}

window.addEventListener('DOMContentLoaded', init)