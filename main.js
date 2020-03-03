// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

// define Ball constructor

class Shape {
    constructor(x, y, velX, velY, exists) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.exists = exists;
    }
}

class Ball extends Shape {
    constructor(x, y, velX, velY, exists, color, size) {
        super(x, y, velX, velY, exists)
        this.size = size;
        this.color = color;
    }

    //define ball draw method
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    // define ball update method

    update() {
        if ((this.x + this.size) >= width) {
            this.x = 20;
        }

        if ((this.x - this.size) <= 0) {
            this.x = width - 20;
        }

        if ((this.y + this.size) >= height) {
            this.y = 20;
        }

        if ((this.y - this.size) <= 0) {
            this.y = height - 20;
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    // define ball collision detection

    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {
            if (!(this === balls[j])) {
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + balls[j].size) {
                    balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
                    balls[j].size = random(10, 20)
                    touchAmo++
                }
            }
        }
    }
}

class EvilCircle extends Shape {
    constructor(x, y, velX, velY, exists, size, color, ctrl) {
        super(x, y, velX, velY, exists);
        this.size = size;
        this.color = color;
        this.ctrl = ctrl;
    }

    draw() {
        ctx.beginPath();
        
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    };

    checkBounds() {
        if ((this.x + this.size) >= width) {
            this.x = width - 10;
        }

        if ((this.x - this.size) <= 0) {
            this.x = 0 + 10;
        }

        if ((this.y + this.size) >= height) {
            this.y = height - 10;
        }

        if ((this.y - this.size) <= 0) {
            this.y = 0 + 10;
        }
    }

    setControls(array) {
        let evilCircle = array[0];
        let evilCircle2 = array[1]
        window.onkeypress = function (e) {
            if (e.key === evilCircle.ctrl[1]) {
                evilCircle.x -= evilCircle.velX;
            } if (e.key === evilCircle.ctrl[0]) {
                evilCircle.x += evilCircle.velX;
            } if (e.key === evilCircle.ctrl[2]) {
                evilCircle.y -= evilCircle.velY;
            } if (e.key === evilCircle.ctrl[3]) {
                evilCircle.y += evilCircle.velY;
            } if (e.key === evilCircle2.ctrl[1]) {
                evilCircle2.x -= evilCircle2.velX;
            } if (e.key === evilCircle2.ctrl[0]) {
                evilCircle2.x += evilCircle2.velX;
            } if (e.key === evilCircle2.ctrl[2]) {
                evilCircle2.y -= evilCircle2.velY;
            } if (e.key === evilCircle2.ctrl[3]) {
                evilCircle2.y += evilCircle2.velY;
            }
        }
    }

    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {
            if (balls[j].exists) {
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + balls[j].size) {
                    balls[j].exists = false;
                    ballsAmo--
                    if (this === evilCircle) {
                        killAmo++
                    } else {
                        killAmo2++
                    }
                }
            }
        }
    }
}



// define array to store balls and populate it

let balls = [];

while (balls.length < 25) {
    const size = random(10, 20);
    let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the adge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        exists = true,
        size,
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
    );
    balls.push(ball);
}

// define loop that keeps drawing the scene constantly

let evilCircle = new EvilCircle(
    40,
    40,
    20,
    20,
    exists = true,
    10,
    'green',
    ['d', 'a', 'w', 's']
)

let evilCircle2 = new EvilCircle(
    80,
    80,
    20,
    20,
    exists = true,
    10,
    'blue',
    ['l', 'j', 'i', 'k']
)

arr = [evilCircle, evilCircle2]
evilCircle2.setControls(arr);
evilCircle.setControls(arr);

var touchAmo = 0;
var ballsAmo = balls.length;
var killAmo = 0;
var killAmo2 = 0;
var counter = document.getElementById("counter");
var touchCounter = document.getElementById("touchCounter");
var player1 = document.getElementById('player1');
var player2 = document.getElementById('player2');

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        if (balls[i].exists) {
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect();
        }
    }

    evilCircle.draw();
    evilCircle.checkBounds();
    evilCircle.collisionDetect();

    evilCircle2.draw();
    evilCircle2.checkBounds();
    evilCircle2.collisionDetect();

    counter.innerHTML = 'Balls left: ' + ballsAmo;
    touchCounter.innerHTML = 'Touch Amount: ' + touchAmo
    player1.innerHTML = 'Player 1 Score: ' + killAmo
    player2.innerHTML = 'Player 2 Score: ' + killAmo2


    requestAnimationFrame(loop);
}

loop();