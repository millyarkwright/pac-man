function init() {

  // ! Elements

  const grid = document.querySelector('.grid')
  const scoreText = document.querySelector('.scoreText')
  const livesText = document.querySelector('.livesText')
  const dotsText = document.querySelector('.dotsText')
  const playButton = document.querySelector('.play-button')

  console.log(playButton)

  // ! Variables

  // Grid Variables

  const width = 28
  const height = 31
  const cellCount = width * height
  const cells = []

  // Cell Variables/Arrays

  const tunnelSides = [280, 308, 336, 338, 281, 282, 283, 284, 309, 310, 311, 312, 337, 339, 340, 303, 304, 305, 306, 307, 331, 332, 333, 334, 335, 359, 360, 361, 362, 363, 448, 449, 450, 451, 452, 476, 477, 478, 479, 480, 504, 505, 506, 507, 508, 471, 472, 473, 474, 475, 499, 500, 501, 502, 503, 527, 528, 529, 530, 531]
  const tunnel = [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 57, 62, 68, 71, 77, 82, 85, 90, 96, 99, 105, 110, 113, 118, 124, 127, 133, 138, 141,142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 169, 174, 177, 186, 189, 194, 197, 202, 205, 214, 217, 222, 225, 226, 227, 228, 229, 230, 233, 234, 235, 236, 239, 240, 241, 242, 245, 246, 247, 248, 249, 250, 258, 264, 267, 273, 286, 292, 295, 301, 314, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 329, 342, 345, 354, 357, 370, 373, 382, 385, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 426, 429, 438, 441, 454, 457, 466, 469, 482, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 497, 510, 513, 522, 525, 538, 541, 550, 553, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 589, 594, 600, 603, 609, 614, 617, 622, 628, 631, 637, 642, 645, 646, 647, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 668, 669, 670, 675, 678, 681, 690, 693, 696, 703, 706, 709, 718, 721, 724, 729, 730, 731, 732, 733, 734, 737, 738, 739, 740, 743, 744, 745, 746, 749, 750, 751, 752, 753, 754, 757, 768, 771, 782, 785, 796, 799, 810, 813, 814, 815, 816, 827, 817,818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838]
  const monsterHome = [349, 350, 377, 378, 404, 405, 406, 407, 432, 433, 434, 435, 431, 436, 403, 408]
  const energiser = [85, 110, 645, 670]

  // (Starting) position for Hero
  const heroStartingPosition = 657
  let heroCurrentPosition = heroStartingPosition

  // Class & Objects for Monsters 

  class Monster {
    constructor(name, startPosition, speed, nature, targetCell) {
      this.name = name
      this.startPosition = startPosition
      this.speed = speed
      this.nature = nature
      this.targetCell = targetCell
      // would like to make the tagetCell randomly generated for each monster (would need to be in each corner though - stretch goal perhaps)
      this.currentPosition = startPosition
    }
  }

  // Monster status & nature
  const monsters = [
    new Monster('Monster1', 433, 200, 'chaser', 90),
    new Monster('Monster2', 434, 250, 'ambush', 246),
    new Monster('Monster3', 432, 300, 'all', 734),
    new Monster('Monster4', 435, 350, 'random', 661)
  ]

  console.log(monsters)
  console.log(monsters[1])
  console.log(monsters[3].nature)

  // Monster 1 = leader, leaves box 1st, always trailing behind hero. start at hero speed and will get faster as more dots are collected 
  // Monster 2 = follow hero's direction but not hero itself (then tries to go round the walls to take hero out). Sometimes will turn away if comes face to face to hero - in "scatter" mode
  // Monster 3 = does a mix of the three others... 
  // Monster 4 = when leaving the home, head to hero, but once clse, turn direections to head back to "scatter" phase 

  // Frightened Mode Variable 

  let frightenedMode = false

  // Score - Dots - Lives
  
  let score = 0
  let lives = 3
  let dots = 295
  dotsText.innerHTML = dots

  const dotValue = 10
  const energiserValue = 20
  const frightenedMonsterValue = 200

  // ? Create Grid

  // Take the cellCount (see Variables) and create a new <div> on each loop and attach it to the grid container. Adding in a dataset of "index" so it's easy to find the index number of cells to start/place the Hero, Monsters and Energisers. 

  for (let i = 0; i < cellCount; i++){
    const cell = document.createElement('div')
    cell.classList.add('maze')
    cell.dataset.index = i
    cells.push(cell)
    grid.appendChild(cell)
  }

  // ? Add Classes to Cells: 

  tunnelSides.forEach((index) => {
    cells[index].classList.remove('maze')
    cells[index].classList.add('tunnelSides')
    return
  })
  
  tunnel.forEach((index) => {
    cells[index].classList.remove('maze')
    cells[index].classList.add('dots')
    return
  })
  
  monsterHome.forEach((index) => {
    cells[index].classList.remove('maze')
    cells[index].classList.add('monsterHome')
    return
  })

  energiser.forEach((index) => {
    cells[index].classList.remove('maze', 'dots')
    cells[index].classList.add('energiser')
    return
  })
  
  // Place Hero on Grid
  cells[heroCurrentPosition].classList.remove('dots')
  cells[heroCurrentPosition].classList.add('hero')

  // Place Monsters on Grid

  monsters.forEach((monster) => {
    cells[monster.currentPosition].classList.add(monster.name, 'monster')
  })


  // ! Executions
    
  // ? Hero Movement

  // Function for adding & removing Hero from cells
  function removeHero(position){
    cells[position].classList.remove('hero')
  }

  function addHero(position){
    cells[position].classList.add('hero')
  }

  // Function for moving the hero around the board: 

  function heroMove(event) {
  // Save keys for each direction
    const keyCode = event.keyCode
    const left = 37
    const up = 38
    const right = 39
    const down = 40

    // First remove hero from current position
    removeHero(heroCurrentPosition)

    // If statement (check whether the index we want to the hero to move isn't a wall, energy home and doesn't leave the grid/jumps down a line):
    if (left === keyCode && !cells[heroCurrentPosition - 1].classList.contains('monsterHome') && !cells[heroCurrentPosition - 1].classList.contains('maze') && heroCurrentPosition % width !== 0) {
      heroCurrentPosition -= 1
    } else if (left === keyCode && cells[heroCurrentPosition - 1] === cells[391]) {
      heroCurrentPosition = 419
    } else if (up === keyCode && !cells[heroCurrentPosition - width].classList.contains('monsterHome') && !cells[heroCurrentPosition - width].classList.contains('maze') && heroCurrentPosition >= width) {
      heroCurrentPosition -= width
    } else if (right === keyCode && !cells[heroCurrentPosition + 1].classList.contains('monsterHome') && !cells[heroCurrentPosition + 1].classList.contains('maze') && heroCurrentPosition % width !== width - 1) {
      heroCurrentPosition += 1
    } else if (right === keyCode && cells[heroCurrentPosition + 1] === cells[420]) {
      heroCurrentPosition = 392
    } else if (down === keyCode && !cells[heroCurrentPosition + width].classList.contains('monsterHome') && !cells[heroCurrentPosition + width].classList.contains('maze') && heroCurrentPosition + width <= cellCount - 1) {
      heroCurrentPosition += width
    }

    // Call functions: if dot is collected or if energiser is eaten
    // Add the hero to the new position
    addHero(heroCurrentPosition)
    collectDots(heroCurrentPosition) 
    collectEnergiser(heroCurrentPosition)
    // heroMeetsMonster(heroCurrentPosition)
  }
   
  // Function for collecting dots 
  function collectDots(position) {
    if (cells[position].classList.contains('dots')) {
      scoreText.innerHTML = score += dotValue
      dotsText.innerHTML = dots -= 1
      cells[position].classList.remove('dots')
    }
  }

  // Function for collecting energisers
  function collectEnergiser(position) {
    if (cells[position].classList.contains('energiser')) {
      // Add Score
      scoreText.innerHTML = score += energiserValue
      // Make Ghosts frightened - add class of 'frightened', change variable of frightenedMode to True
      frightenedMode = true
      monsters.forEach(monster => cells[monster.currentPosition].classList.add('frightened'))
      // Add timeout for frightenedMode & frightened Class
      setTimeout(() => {
        frightenedMode = false
        monsters.forEach(monster => cells[monster.currentPosition].classList.remove('frightened'))
      }, 10 * 1000)
      // Remove the energiser from cell
      cells[position].classList.remove('energiser')
    }
  }
  
  function heroMeetsMonster (monsters) {
    if (monsters.frightenedMode && cells[heroCurrentPosition].classList.contains('monster1')) {
      monsterReset(monsters, [0])
      scoreText.innerHTML = score += frightenedMonsterValue
    } else if (monsters.frightenedMode && cells[heroCurrentPosition].classList.contains('monster2')) {
      monsterReset(monsters, [1])
      scoreText.innerHTML = score += frightenedMonsterValue
    } else if (monsters.frightenedMode && cells[heroCurrentPosition].classList.contains('monster2')) {
      monsterReset(monsters, [2])
      scoreText.innerHTML = score += frightenedMonsterValue
    } else if (monsters.frightenedMode && cells[heroCurrentPosition].classList.contains('monster2')) {
      monsterReset(monsters, [3])
      scoreText.innerHTML = score += frightenedMonsterValue
    }
    if (!monsters.frightenedMode && cells[heroCurrentPosition].classList.contains('monster')) {
      lives -= 1
      livesText.innerHTML = lives
    }
  }

  // function heroMeetsMonster(position) {
  //   // console.log(monsters[0].frightenedMode)
  //   console.log(score)
  //   while (monsters[0].frightenedMode) { 
  //     if (cells[position].classList.contains('monster1')) {
  //       // monsterReset(monsters, [0])
  //       scoreText.innerHTML = score += frightenedMonsterValue
  //       console.log(score = score + 200)
  //     } else if (cells[position].classList.contains('monster2')) {
  //     // monsterReset(monsters, [1])
  //       scoreText.innerHTML = score += frightenedMonsterValue
  //       console.log(score = score + 200)
  //     } else if (cells[position].classList.contains('monster3')) {
  //     // monsterReset(monsters, [2])
  //       scoreText.innerHTML = score += frightenedMonsterValue
  //       console.log(score = score + 200)
  //     } else if (cells[position].classList.contains('monster4')) {
  //     // monsterReset(monsters, [3])
  //       scoreText.innerHTML = score += frightenedMonsterValue
  //       console.log(score = score + 200)
  //     } 
  //   }
  // }
 
  // ! Execution: Monster Movement 

  // ? GET MONSTERS OUT OF HOME 
  

  function monstersMove() {
    
    // Idea: each monster leaves the home in turn, each monster moves up (a width) every 0.2 seconds. All will need to move up 4 cells to get out so timeout should be after 0.8 seconds (0.2 * 4). After each monster has come out, the chase function for each should kick in (yet to be written, practice with random (frightened function)).
    // Want to stagger each monster leaving - Monster2 will have to wait 8 secs before moving, MOnster 3 16 secs and Monster 4 24 secs

    const monster1Leaves = setInterval(() => {
      cells[monsters[0].currentPosition].classList.remove(monsters[0].name, 'monster')
      monsters[0].currentPosition -= width
      cells[monsters[0].currentPosition].classList.add(monsters[0].name, 'monster')
    }, 200)
    
    setTimeout(() => {
      clearInterval(monster1Leaves)
    }, 800)

    setTimeout(() => {
      monstersMoveChase(monsters, [0])
      const monster2Leaves = setInterval(() => {
        cells[monsters[1].currentPosition].classList.remove(monsters[1].name, 'monster')
        monsters[1].currentPosition -= width
        cells[monsters[1].currentPosition].classList.add(monsters[1].name, 'monster')
      }, 200)
      setTimeout(() => {
        clearInterval(monster2Leaves)
      }, 800)
    }, 800)

    setTimeout(() => {
      monstersMoveChase(monsters, [1]) 
      cells[monsters[2].currentPosition].classList.remove(monsters[2].name, 'monster')
      monsters[2].currentPosition += 1
      cells[monsters[2].currentPosition].classList.add(monsters[2].name, 'monster')

      const monster3Leaves = setInterval(() => {
        cells[monsters[2].currentPosition].classList.remove(monsters[2].name, 'monster')
        monsters[2].currentPosition -= width
        cells[monsters[2].currentPosition].classList.add(monsters[2].name, 'monster')
      }, 200)

      setTimeout(() => {
        clearInterval(monster3Leaves)
      }, 800)
    }, 1600)

    setTimeout(() => {
      monstersMoveChase(monsters, [2]) 
      cells[monsters[3].currentPosition].classList.remove(monsters[3].name, 'monster')
      monsters[3].currentPosition -= 1
      cells[monsters[3].currentPosition].classList.add(monsters[3].name, 'monster')

      const monster4Leaves = setInterval(() => {
        cells[monsters[3].currentPosition].classList.remove(monsters[3].name, 'monster')
        monsters[3].currentPosition -= width
        cells[monsters[3].currentPosition].classList.add(monsters[3].name, 'monster')
      }, 200)

      setTimeout(() => {
        clearInterval(monster4Leaves)
      }, 800)
    }, 2400)
    
    setTimeout(() => { 
      monstersMoveChase(monsters, [3]) 
    }, 3200)

  }

  // ! Monster Move (Mode) Execution 

  const monsterNextMove = [-1, +1, -width, + width]

  // ? MonsterMovement When In Chase Mode

  function monstersMoveChase(monsters,[index]){
    let monsterRandomMove = monsterNextMove[Math.floor(Math.random() * monsterNextMove.length)]
    // Set Interval so this below occurs over and over again at the predetermined speed in the Monster Object: 
    setInterval(function() {
      cells[monsters[index].currentPosition].classList.remove(monsters[index].name, 'monster')
      // If next move is through the tunnel 
      if (cells[monsters[index].currentPosition === 319] && monsterRandomMove === +1) {
        monsters[index].currentPosition = 392
      } else if (cells[monsters[index].currentPosition === 392] && monsterRandomMove === -1) {
        monsters[index].currentPosition = 319
      // If next random move the monster wants to make is to a cell that doesn't contain maze or another monster
      } else if (!cells[monsters[index].currentPosition + monsterRandomMove].classList.contains('maze') && !cells[monsters[index].currentPosition + monsterRandomMove].classList.contains('monsterHome')) {
        // Move into new cell
        monsters[index].currentPosition += monsterRandomMove
      } else {
        monsterRandomMove = monsterNextMove[Math.floor(Math.random() * monsterNextMove.length)]
      }
      cells[monsters[index].currentPosition].classList.add(monsters[index].name, 'monster')
      checkCollision(monsters[index].currentPosition)
    }, monsters[index].speed)
  }

  function checkCollision(position) {
    if (cells[position].classList.contains('hero')) {
      console.log('monsterindex-->', monsters.name)
      if (frightenedMode) {
        monsterReset(monsters,[1])
        console.log('monsterreset')
      } else {
        livesText.innerHTML = lives -= 1
        // checkfor game over funciton
      }
      console.log('collision')
    }
  }

// whilst (!monster.frightenedMode) {
//   forEach monster {
//     if (monster has hit a barrier) {
//       if (hero is to the left) turn left 
//       if (hero is tot he right) turn right
//       if (hero is to the top) turn upwards
//       if (hero is to the bottom) turn downwards
//     } else {
//       go straight
//       if (monster hits hero) {
//         hero = dead
//       }
//     }


  // ? Monster Movement When Frightened:

  // function monstersMoveFrightened(monster){
  //   let monsterRandomMove = monsterNextMove[Math.floor(Math.random() * monsterNextMove.length)]
  //   // Set Interval so this below occurs over and over again at the predetermined speed in the Monster Object: 
  //   const frightenedMonsterInterval = setInterval(function() {
  //   // If next random move the monster wants to make is to a cell that doesn't contain maze or another monster
  //     if (!cells[monster.currentPosition + monsterRandomMove].classList.contains('maze') && !cells[monster.currentPosition + monsterRandomMove].classList.contains('monsterHome')) {
  //     // Remove ghost classes
  //       cells[monster.currentPosition].classList.remove(monster.name, 'monster', 'frightened')
  //       // Move into new cell
  //       monster.currentPosition += monsterRandomMove
  //       cells[monster.currentPosition].classList.add(monster.name, 'monster', 'frightened')
  //     } else {
  //       monsterRandomMove = monsterNextMove[Math.floor(Math.random() * monsterNextMove.length)]
  //     }
  //   }, monster.speed)
  //   setTimeout(() => {
  //     clearInterval(frightenedMonsterInterval)
  //   }, 10 * 1000)
  // }


  // ? Monster Reset (Gets sent home)

  function monsterReset(monster, [index]) {
    cells[monsters[index].currentPosition].classList.remove(monsters[index].name, 'monster', 'frightened')
    cells[monsters[index].currentPosition] = cells[monsters[index].startPosition]
    cells[monsters[index].currentPosition].classList.add(monsters[index].name, 'monster', 'frightened')
  }



  // cells[monster.currentPosition].classList.add(monster.name, 'monster')

  // ? One overarching function for monsterMove: 
  // if chase mode = true (others should be false) then call chasemode function. if scatter mode = true (others should be false) then call scatter mode function. etc 

  // All functions below will use these directions so make global variables?

//   function monsterMovement() {
//     if (monster.frightened)
//   }

//   // ? Function for MonsterMovement in Frightened Mode - 
//   // All monsters will do the same things (random movement) so 1 function

// function frightenedMovement () {
//   // Random Movemnet 

//   }
// }


  // ? Function for MonsterMovement in Scattered Mode - 
  // All monsters head back to their target square - 1 function (think each monster is supposed to get to their target cell in their own individual way but for now my just try get them there)



  // ? Function for MonsterMovement in Chase Mode - 
  // All monsters behave as per their "nature":



  
  // if monster (true) - call function: lose a life, update life display. 
 
  // if frightened monster (true) - call function: add x to score, update score display, reset enemy position. if first frightened enemy = 200 points. if second 400 points, doubles every time. 


  // Then we need to check the cell the monster is about to look into - currentposition + direction? - if that cell doesn't contain a wall, enemy home and doesn't leave the board completely, reassign current positions. If that new current position contains the hero, if the ghost isn't frightened (frightenedMode = fale) then call monster function above, if frightened (frightenedMode = true) then call fightened monster function above? 






  // ! Events

  // Add event listener for user pressing arrow keys to move hero
  document.addEventListener('keydown', heroMove)
  playButton.addEventListener('click', monstersMove)

}

window.addEventListener('DOMContentLoaded', init)