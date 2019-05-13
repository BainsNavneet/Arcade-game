// Enemies our player must avoid
const livesText1 = document.querySelector('.lives1');
const livesText2 = document.querySelector('.lives2');
const livesText3 = document.querySelector('.lives3');
const heartArr = [livesText1, livesText2, livesText3];
const levelsText = document.querySelector('.levels');

class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  update(dt) {
    this.x += this.speed * dt * player.levels * 0.5;

    if (this.x > 500) {
      this.x = -80;
    }
    if (player.x > this.x - 50 && player.x < this.x + 50 && player.y > this.y - 50 && player.y < this.y + 50) {
      player.x = 200;
      player.y = 400;
      if (player.lives < 2) {
        // reseting levels, lives, hearts
        player.x = 200;
        player.y = 400;
        player.levels = 1;
        player.lives = 3;
        heartArr.forEach((item) => {
          item.innerHTML = '<img src="./images/Heart.png">'
        });
        player.heartCount = 0;
        levelsText.innerHTML = 1;
        Swal.fire({
          title: "OOPS",
          text: 'You are dead. Be carefull!! Play again',
          type: 'warning',
        })
      } else {
        player.lives = player.lives - 1;
        heartArr[player.heartCount].innerHTML = "";
        player.heartCount = player.heartCount + 1;
      }
    }
  }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.


// Draw the enemy on the screen, required method for game

// Now write your own player class
class Player {
  constructor(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.levels = Number(document.querySelector('.levels').innerHTML);
    this.lives = heartArr.length;

    this.heartCount = 0;
  }

  update() {
    if (player.y < 10) {
      if (this.levels == 3) {
        Swal.fire({
          title: 'HURRRAAHH',
          text: "You win this game!",
          type: 'success',
        })
        // below is reseting data after winning
        this.x = 200;
        this.y = 400;
        this.levels = 1
        this.lives = heartArr.length;
        heartArr.forEach(function (item) {
          item.innerHTML = '<img src="./images/Heart.png">'
        });
        this.heartCount = 0;
        levelsText.innerHTML = 1;
      } else {
        this.levels = this.levels + 1;
        levelsText.innerHTML = this.levels;
        this.x = 200;
        this.y = 400;
      }
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(direction) {
    if (direction == "left" && this.x > 0) {
      this.x = this.x - 50
    }
    if (direction == "up" && this.y > 0) {
      this.y = this.y - 35
    }
    if (direction == "right" && this.x < 370) {
      this.x = this.x + 35
    }
    if (direction == "down" && this.y < 370) {
      this.y = this.y + 40
    }
  }
}
// This class requires an update(), render() and
// a handleInput() method.
const enemy1 = new Enemy(250, 60, 300);
const enemy2 = new Enemy(200, 150, 200);
const enemy3 = new Enemy(200, 230, 250);

// Now instantiate your objects.
const allEnemies = [enemy1, enemy2, enemy3];
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player(200, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);

});