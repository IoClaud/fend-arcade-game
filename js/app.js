// select button start
var startBtn = document.querySelector('.start');
var overlay = document.querySelector('.overlay');
var startPnl = document.querySelector('.starterPanel');
var finishPnl = document.querySelector('.finishPanel');
var checkChar;
var TILE_WIDTH = 101,
    TILE_HEIGHT = 83;


startBtn.addEventListener('click', toggleDisclosure);
startBtn.addEventListener('keydown', toggleDisclosure);

// when start button is activated it change the visibility of overlay div, show the game, change the sprite of the character and reset the player initial position.
function toggleDisclosure(e) {
  let type = e.type;
  // If the key pressed was not Space or Enter, return
  if (type === 'keydown' && (e.keyCode !== 13 && e.keyCode !== 32)) {
    return true;
  }
  e.preventDefault();

  if (overlay.getAttribute('aria-hidden') === 'true') {
    overlay.setAttribute('aria-hidden', 'false');
    checkChar = document.forms.character.char.value;
    setChar(checkChar);
    player.reset();
  } else {
    overlay.setAttribute('aria-hidden', 'true');

  }
}

// Change the sprite of the character accordingly to the selected one
function setChar(char) {
  switch(char) {
    case 'boy':
      player.sprite = 'images/char-boy.png';
    break;
    case 'cat':
      player.sprite = 'images/char-cat-girl.png';
    break;
    case 'horn':
      player.sprite = 'images/char-horn-girl.png';
    break;
    case 'pink':
      player.sprite = 'images/char-pink-girl.png';
    break;
    case 'princess':
      player.sprite = 'images/char-princess-girl.png';
    break;
  }
}


// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // when the enemies are out of screen, recalculate their initial position and speed
    if (this.x > 550) {
      this.x = makeXpos(-300);
      this.y = makeRow();
      this.randomSpeed();
    }
};

// Whenever the enemy leaves the screen, its speed is recalculated considering the current game level.
Enemy.prototype.randomSpeed = function(){
  this.speed = Math.floor(Math.random() * (panel.level*100 +(10/panel.level*10))+panel.level*10);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check if the enemy is at the same location as the player
// If true, reset the position of the player
Enemy.prototype.checkCollision = function() {
  if (this.y-15 === player.y) {
    if (player.x >= this.x - 50 && player.x <= this.x + 50) {
      panel.lives --;
      return true;
    }
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
}

// Check if the player has won
Player.prototype.update = function(dt) {
  // If yes, the score up to 50 points and the player restart to the initial position.
  if (this.y < 0) {
    panel.score +=50;
    this.reset();
  }
};

// Draw the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Manage the player's movement by using the arrow keys
Player.prototype.handleInput = function(keycode) {
  // Move the player accordingly to the key pressed
  switch (keycode) {
    case 'up':
      if (this.y - TILE_HEIGHT >= -35) this.y -= TILE_HEIGHT;
    break;
    case 'down':
      if (this.y + TILE_HEIGHT <= 380) this.y += TILE_HEIGHT;
    break;
    case 'left':
      if (this.x - TILE_WIDTH >= -2) this.x -= TILE_WIDTH;
    break;
    case 'right':
      if (this.x + TILE_WIDTH <= 402) this.x += TILE_WIDTH;
    break;
  }
};

// reset the player to the initial position
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 380;
}

// the panel object to restore the games data.
let ctr = true;
var panel = {
  level: 1,
  lives: 5,
  score: 0,
  levelUp: function(){
    let upLev = 150*this.level;
    // when ctr variable (the controller variable) is true, check for the level update:
    // if checked, add 1 enemy and set ctr variable to false.
    if(ctr) {
      if(this.score/150>=1){
        if(this.score%150 == 0) {
          this.level++;
          enemy = new Enemy(makeXpos(-300), makeRow());
          enemy.randomSpeed();
          allEnemies.push(enemy);
          ctr = false;
        }
      }
    }
    // to the next score increment, open the controller variable for the next level update.
    if(this.score % 150 == 50) {
      ctr = true;
    }
    // returns the score difference, to write on the board
    return upLev-this.score;
  }
}

// sets the starting line in which to run the enemy
function makeRow() {
  let row = [1,2,3];
  let indexRow = Math.floor(Math.random()*3);
  let yPos = row[indexRow]*(TILE_HEIGHT)-20;
  return yPos;
}

// this is for set the Gem position but it's not implemented for now.
function makeCol() {
  let col = [0,1,2,3,4];
  let indexRow = Math.floor(Math.random()*5);
  let colPos = col[indexRow]*TILE_WIDTH;
  return colPos;
}

// set initial random x position.
function makeXpos(x) {
  return Math.floor(Math.random()*(x))-50;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
function enemyGenerator(level) {
  for (i=0; i<level+2; i++) {
    enemy = new Enemy(makeXpos(-300), makeRow());
    enemy.randomSpeed();
    allEnemies.push(enemy);
  }
}

enemyGenerator(panel.level);
// Place the player object in a variable called player
let player = new Player(TILE_WIDTH*2,TILE_HEIGHT*5-20);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
