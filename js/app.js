var button = document.querySelector('.start');
var content = document.querySelector('.overlay');
var checkChar;
button.addEventListener('click', toggleDisclosure);
button.addEventListener('keydown', toggleDisclosure);
function toggleDisclosure(e) {
  var type = e.type;

  // If the key pressed was not Space or Enter, return
  if (type === 'keydown' && (e.keyCode !== 13 && e.keyCode !== 32)) {
    return true;
  }

  e.preventDefault();

  if (content.getAttribute('aria-hidden') === 'true') {
    content.setAttribute('aria-hidden', 'false');

  } else {
    content.setAttribute('aria-hidden', 'true');
    checkChar = document.forms.character.char.value;
    setChar(checkChar);
    console.log(checkChar);
  }
}

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
    if (this.x > 550) {
      this.x = makeXpos(-300);
      this.y = makeRow();
      this.randomSpeed();
    }
};

Enemy.prototype.randomSpeed = function(){
  this.speed = Math.floor(Math.random() * (panel.level*100 +(10/panel.level*10))+panel.level*10);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function() {
  if (this.y === player.y) {
    if (player.x >= this.x - 50 && player.x <= this.x + 50) {
      console.log('collision!');
      panel.lives --;
      console.log(panel.lives);
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
  // If yes, make the winning popup appears
  if (player.y < 0) {
    console.log('winner');
    panel.score +=50;
    console.log(panel.score);
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
      if (player.y - 80 >= -20) player.y -= 80;
    break;
    case 'down':
      if (player.y + 80 <= 380) player.y += 80;
    break;
    case 'left':
      if (player.x - 100 >= 0) player.x -= 100;
    break;
    case 'right':
      if (player.x + 100 <= 400) player.x += 100;
    break;
  }
};

Player.prototype.reset = function() {
  player.x = 200;
  player.y = 380;
}
let ctr = true;
var panel = {
  level: 1,
  lives: 5,
  score: 0,
  levelUp: function(){
    let upLev = 150*this.level;
    if(ctr) {
      if(this.score/150>=1){
        if(this.score%150 == 0) {
          console.log('livello su');
          this.level++;
          enemy = new Enemy(makeXpos(-300), makeRow());
          enemy.randomSpeed();
          allEnemies.push(enemy);
          ctr = false;
          console.log(ctr);
        }
      }
    }
    if(this.score % 150 == 50) {
      ctr = true;
    }
    return upLev-this.score;
  }
}

function makeRow() {
  let row = [60,140,220];
  let indexRow = Math.floor(Math.random()*3);
  let yPos = row[indexRow];
  return yPos;
}

function makeCol() {
  let col = [0,100,200,300,400];
  let indexRow = Math.floor(Math.random()*5);
  let colPos = col[indexRow];
  return colPos;
}

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
let player = new Player(200,380);
enemyGenerator(panel.level);
// Place the player object in a variable called player



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
