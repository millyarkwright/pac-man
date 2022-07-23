function init() {

  // ! Elements

  const grid = document.querySelector('.grid')
  const scoreText = document.querySelectorAll('.scoreText')
  const livesText = document.querySelector('.livesText')
  const dotsText = document.querySelector('.dotsText')
  const playButton = document.querySelector('.play-button')
  const playAgainButton = document.querySelectorAll('.playAgain-button')
  const readMore = document.querySelector('.read-more')
  const closeButton = document.querySelector('.closeButton')


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

  // Frightened Mode Variable 

  let frightenedMode = false

  // Can lose life Variables

  let canLoseLife = true

  // Score - Dots - Lives
  
  let score = 0
  let lives = 3
  let dots = 295
  dotsText.innerHTML = dots

  const dotValue = 10
  const energiserValue = 20
  const frightenedMonsterValue = 200

  // Position for Hero
  const heroStartingPosition = 657
  let heroCurrentPosition = heroStartingPosition

  // ! Class & Objects

  class Monster {
    constructor(name, monsterIndex, startPosition, speed, escape) {
      this.name = name
      this.monsterIndex = monsterIndex
      this.startPosition = startPosition
      this.speed = speed
      this.escape = escape
      this.currentPosition = startPosition
      this.timer = null
    }
    // Remove relevant classes and data attributes from old monster position
    removeOld(){
      cells[this.currentPosition].classList.remove(this.name, 'monster')
      cells[this.currentPosition].removeAttribute('data-monster-index')
    }

    // Add back in the above to move the monster's position 
    addNew(){
      cells[this.currentPosition].classList.add(this.name, 'monster')
      cells[this.currentPosition].dataset.monsterIndex = this.monsterIndex
    }

    // Removes old class and adds to new position
    move(dif){
      this.removeOld()
      this.currentPosition += dif
      this.addNew()
    }

    // Monsters leave home den. Check whether monsters need to move into the center of the home den. 

    escapePen(){
      setTimeout(() => {
        if (this.escape) this.move(this.escape)

        setTimeout(() => {
          const leaves = setInterval(() => {
            this.move(-width) 
          }, 200)

          setTimeout(() => {
            clearInterval(leaves) 
            monstersMoveRandom(this.monsterIndex) 
          }, 800)

        }, this.escape ? 200 : 0) 

      }, this.monsterIndex * 800)
    }

  }

  // ? Monster Objects
  const monsters = [
    new Monster('Monster1', 0, 433, 250),
    new Monster('Monster2', 1, 434, 300),
    new Monster('Monster3', 2, 432, 350, 1),
    new Monster('Monster4', 3, 435, 400, -1)
  ]


  // ! Create Grid

  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('maze')
    cell.dataset.cell = i
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
  
  // ? Place Hero on Grid

  cells[heroCurrentPosition].classList.remove('dots')
  cells[heroCurrentPosition].classList.add('hero')

  // ? Place Monsters on Grid

  monsters.forEach((monster) => {
    cells[monster.currentPosition].classList.add(monster.name, 'monster')
    cells[monster.currentPosition].dataset.monsterIndex = monster.monsterIndex
  })
  

  // ! EXECUTIONS
    
  // ! Executions: Hero Movement
  
  // ? HERO MOVEMENT

  function heroMove(event) {
    const keyCode = event.keyCode
    const left = 37
    const up = 38
    const right = 39
    const down = 40

    cells[heroCurrentPosition].classList.remove('hero')

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

    cells[heroCurrentPosition].classList.add('hero')

    // Save monsterIndex & monsterPosition to use in checkCollision function
    let monsterIndex = 0
    let monsterPosition = 0

    if (cells[heroCurrentPosition].classList.contains('monster')) {
      monsterIndex = parseFloat(cells[heroCurrentPosition].getAttribute('data-monster-index'))
      monsterPosition = parseFloat(cells[heroCurrentPosition].getAttribute('data-cell'))
    }

    checkCollision(monsterPosition, monsterIndex)
    collectDots(heroCurrentPosition) 
    collectEnergiser(heroCurrentPosition)
  }
   
  // ! ------ COLLISION & COLLECTION -----

  //  ? CHECK COLLISION

  function checkCollision(monsterPosition, monsterIndex) {
    if (cells[heroCurrentPosition].classList.contains('monster') 
    || cells[monsterPosition].classList.contains('hero')
    ) {
      if (frightenedMode) {
        score += frightenedMonsterValue
        scoreText.innerHTML = score
        monsterReset(monsterIndex)
      } else {
        if (canLoseLife) {
          lives -= 1
          livesText.innerHTML = lives 
          checkGameOver()
          canLoseLife = false
          setTimeout(() => {
            canLoseLife = true
          }, 400)
        }
      }
    }
  }
  
  //  ? COLLECT DOTS

  function collectDots(position) {
    if (cells[position].classList.contains('dots')) {
      score += dotValue
      scoreText.forEach(scoretext => scoretext.innerHTML = score)
      // scoreText.innerHTML = score += dotValue
      dotsText.innerHTML = dots -= 1
      cells[position].classList.remove('dots')
    }
    if (dots === 0) {
      gameWon()
    }
  }

  // ? COLLECT ENERGISERS

  function collectEnergiser(position) {
    if (cells[position].classList.contains('energiser')) {
      scoreText.innerHTML = score += energiserValue
      frightenedMode = true
      document.body.classList.add('frightened')

      setTimeout(() => {
        frightenedMode = false
        document.body.classList.remove('frightened')
      }, 10 * 1000)

      cells[position].classList.remove('energiser')
    }
  }

  // ! Execution: Monster Movement 

  // GET MONSTERS OUT OF HOME (& THEN MOVE)
  
  function monstersMove(all, monsterIndex) {
    if (all){
      monsters.forEach(monster => monster.escapePen())
    } else {
      monsters[monsterIndex].escapePen()
    }
  }

  // MOVE MONSTERS RANDOMLY 

  const monsterDirections = [-1, 1, -width, width]

  function monstersMoveRandom(index){
    let monsterRandomDirection = monsterDirections[Math.floor(Math.random() * monsterDirections.length)]

    monsters[index].timer = setInterval(() => {
      monsters[index].removeOld()

      if (!cells[monsters[index].currentPosition + monsterRandomDirection].classList.contains('maze') && !cells[monsters[index].currentPosition + monsterRandomDirection].classList.contains('monsterHome')) {
        monsters[index].currentPosition += monsterRandomDirection
      } else {
        monsterRandomDirection = monsterDirections[Math.floor(Math.random() * monsterDirections.length)]
        while (cells[monsters[index].currentPosition + monsterRandomDirection].classList.contains('maze') || cells[monsters[index].currentPosition + monsterRandomDirection].classList.contains('monsterHome')){
          monsterRandomDirection = monsterDirections[Math.floor(Math.random() * monsterDirections.length)]
        }
        monsters[index].currentPosition += monsterRandomDirection
      }

      monsters[index].addNew()
      checkCollision(monsters[index].currentPosition, monsters[index].monsterIndex)

    }, monsters[index].speed)
  }
  

  // ? MONSTER RESET

  function monsterReset(monsterIndex) {

    clearInterval(monsters[monsterIndex].timer)

    monsters[monsterIndex].removeOld()
    monsters[monsterIndex].currentPosition = monsters[monsterIndex].startPosition
    monsters[monsterIndex].addNew()

    monstersMove(false, monsterIndex)
  }

  // ! Execution: End of Game 

  // ? GAME OVER

  function checkGameOver() {
    if (lives === 0) {
      document.getElementById('progress-container').style.display = 'none'
      document.getElementById('gameOver-wrapper').style.display = 'block'
      document.querySelector('.grid').style.display = 'none'
      scoreText.innerHTML = score
    }
  }

  // ? GAME WON

  function gameWon() {
    if (dots === 0) {
      document.getElementById('progress-container').style.display = 'none'
      document.getElementById('gameWon-wrapper').style.display = 'block'
      document.querySelector('.grid').style.display = 'none'
      scoreText.innerHTML = score
    }
  }

  // ? GAME RESET

  function gameReset(){
    location.reload()
  }

  // ! Events

  // Stop page moving around when using the arrow functions
  window.addEventListener('keydown', function(e) {
    if ([32, 37, 38, 39, 40].indexOf(e) > -1) {
      e.preventDefault()
    }
  }, false)

  // Listen for keys pressed to move hero
  window.addEventListener('keydown', heroMove)

  // Listen for a click on the play button to start moving monsters

  playButton.addEventListener('click', () => monstersMove(true))
  
  // Listen for click on the Play Again buttons
  playAgainButton.forEach(button => button.addEventListener('click', gameReset))

  // Listeners for the story (myth) - Open & Close

  readMore.addEventListener('click', () => document.querySelector('#myth-wrapper').style.display = 'block')

  closeButton.addEventListener('click', () => document.querySelector('#myth-wrapper').style.display = 'none')
  
}

window.addEventListener('DOMContentLoaded', init)

