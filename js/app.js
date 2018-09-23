const music = document.getElementById("music");


// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = speed;

    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 500) {
        this.x = -20;
    }

    //Collsion between the player and enemy
    if (player.a < this.x + 80 &&
        player.a + 80 > this.x &&
        player.b < this.y + 60 &&
        60 + player.b > this.y) {

        //resetting the player's position after collision
        player.a = 200;
        player.b = 380;
    }


    //After popup appears the player and the bugs are not visible 
    //Position changed
    if (player.b === 700) {
        this.x = 500;
    }

};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.sprite = 'images/char-boy.png';
    }

    update() {

    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.a, this.b);
    }
    handleInput(keys) {

        switch (keys) {
            case "left":
                this.a = this.a - 100;
                if (this.a < 0) {
                    this.a = 0;
                }
                break;
            case "right":
                this.a = this.a + 100;
                if (this.a > 400) {
                    this.a = 400;
                }
                break;

            case "up":
                this.b = this.b - 80;
                if (this.b === -20) {
                    if (gem1.c === -50 && gem1.d === -50) {
                        this.b = 700;
                        toggleModal();
                    } else {
                        swal("Oops!!" , "you left the gem..", "warning");
                        this.b = 60;
                    }
                   //Modal opens
                }
                break;

            case "down":
                this.b = this.b + 80;
                if (this.b > 380) {
                    this.b = 380;
                }
                break;

            default:
                break;
        }
    }
}

// Now instantiate your objects.
// Place the player object in a variable called player
const player = new Player(200, 380);

// Place all enemy objects in an array called allEnemies
const allEnemies = [];

let yposition = [60, 140, 220];

yposition.forEach(ypos => {
    const enemy = new Enemy(0, ypos, 20 + Math.floor(Math.random() * 200));
    allEnemies.push(enemy);
});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

// Assigning cb to a named function 
let eventListener_cb = function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}
document.addEventListener('keyup', eventListener_cb);


//Additional Functionality
class Gem {
    constructor(c, d) {
        this.c = c;
        this.d = d;
        this.sprite = 'images/Gem Orange.png';
    }
    update() {
        if (player.a < this.c + 80 && player.a + 80 > this.c && player.b < this.d + 60 && 60 + player.b > this.d) {
            this.c = -50;
            this.d = -50;
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.c, this.d);
    }
}

// Randomize the gem location 
const gem1 = new Gem((Math.floor(Math.random() * 400)),(Math.floor(Math.random() * 201)+100));

var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
    music.src = "";
    // for removing keyup listener 
    document.removeEventListener('keyup', eventListener_cb)
}


closeButton.addEventListener("click", e => {

    // Re-adding event listener on closing the popup modal 
    document.addEventListener('keyup', eventListener_cb);

    //Resetting player's position
    player.a = 200;
    player.b = 380;

    //Resetting gem's position
    gem1.c = (Math.floor(Math.random() * 400));
    gem1.d = (Math.floor(Math.random() * 201) + 100);

    music.src = "./audio/sound.mp3";
    // Hiding/showing the modal
    modal.classList.toggle("show-modal");
});
