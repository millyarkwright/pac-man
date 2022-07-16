function init() {

  // ! Elements

  const grid = document.querySelector('.grid')

  // ! Variables

  // Grid Variables

  const width = 28
  const height = 31
  const cellCount = width * height
  const cells = []

  // Cell Variables/Arrays

  const tunnelSides = [280, 308, 336, 338, 281, 282, 283, 284, 309, 310, 311, 312, 337, 339, 340, 303, 304, 305, 306, 307, 331, 332, 333, 334, 335, 359, 360, 361, 362, 363, 448, 449, 450, 451, 452, 476, 477, 478, 479, 480, 504, 505, 506, 507, 508, 471, 472, 473, 474, 475, 499, 500, 501, 502, 503, 527, 528, 529, 530, 531]

  const maze = [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 57, 62, 68, 71, 77, 82, 85, 90, 96, 99, 105, 110, 113, 118, 124, 127, 133, 138, 141,142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 169, 174, 177, 186, 189, 194, 197, 202, 205, 214, 217, 222, 225, 226, 227, 228, 229, 230, 233, 234, 235, 236, 239, 240, 241, 242, 245, 246, 247, 248, 249, 250, 258, 264, 267, 273, 286, 292, 295, 301, 314, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 329, 342, 345, 354, 357, 370, 373, 382, 385, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 426, 429, 438, 441, 454, 457, 466, 469, 482, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 497, 510, 513, 522, 525, 538, 541, 550, 553, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 589, 594, 600, 603, 609, 614, 617, 622, 628, 631, 637, 642, 645, 646, 647, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 668, 669, 670, 675, 678, 681, 690, 693, 696, 703, 706, 709, 718, 721, 724, 729, 730, 731, 732, 733, 734, 737, 738, 739, 740, 743, 744, 745, 746, 749, 750, 751, 752, 753, 754, 757, 768, 771, 782, 785, 796, 799, 810, 813, 814, 815, 816, 827, 817,818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838]

  const monsterHome = [349, 350, 377, 378, 404, 405, 406, 407, 432, 433, 434, 435, 431, 436, 403, 408]

  const energiser = [85, 110, 645, 670]

  // (Starting) position for Hero

  let heroPosition = 657

  // Class & Objects for Monsters 

  class Monster {
    constructor(name, startPosition, speed) {
      this.name = name
      this.startPosition = startPosition
      this.speed = speed
      this.currentPosition = startPosition
      this.isVulnerable = false
    }
  }

  monsters = [
    new Monster('Monster1', 432, 200),
    new Monster('Monster2', 433, 300),
    new Monster('Monster3', 434, 400),
    new Monster('Monster4', 435, 500)
  ]

  // ? Create Grid

  // Take the cellCount (see Variables) and create a new <div> on each loop and attach it to the grid container. Adding in a dataset of "index" so it's easy to find the index number of cells to start/place the Hero, Monsters and Energisers. 

  for (let i = 0; i < cellCount; i++){
    const cell = document.createElement('div')
    cell.dataset.index = i
    cells.push(cell)
    grid.appendChild(cell)
  }

  // ? Add Classes to Cells: 

  tunnelSides.forEach((index) => {
    cells[index].classList.add('tunnelSides')
    return
  })
  
  maze.forEach((index) => {
    cells[index].classList.add('maze', 'dots')
    return
  })
  
  monsterHome.forEach((index) => {
    cells[index].classList.add('monsterHome')
    return
  })

  energiser.forEach((index) => {
    cells[index].classList.remove('dots')
    cells[index].classList.add('energiser')
    return
  })
  
  // Place Hero on Grid
  cells[heroPosition].classList.remove('dots')
  cells[heroPosition].classList.add('hero')

  // Place Monsters on Grid

  monsters.forEach(monster => {
    cells[monster.currentPosition].classList.add(monster.name, 'monster')
  })

  // let monster1Position = 432
  // let monster2Position = 433
  // let monster3Position = 434
  // let monster4Position = 435

  // cells[monster1Position].classList.add('monster1', 'monster')
  // cells[monster2Position].classList.add('monster2', 'monster')
  // cells[monster3Position].classList.add('monster3', 'monster')
  // cells[monster4Position].classList.add('monster4', 'monster')

// ! Executions
  
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