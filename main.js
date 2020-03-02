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

function Shape(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}

function Ball(x, y, velX, velY, exists, size, color) {
    Shape.call(this, x, y, velX, velY, exists);
    this.size = size;
    this.color = color;
}

Ball.prototype = Object.create(Shape.prototype);
Object.defineProperty(Ball.prototype, 'constuctor', {
    value: Ball,
    enumerable: false,
    writable: true
});


// define ball draw method

Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
};

// define ball update method

Ball.prototype.update = function () {
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
};

// define ball collision detection

var touchAmo = 0;

Ball.prototype.collisionDetect = function () {
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
};



function EvilCircle(x, y, velX, velY, exists, size, color, posX, negX, posY, negY) {
    Shape.call(this, x, y, velX, velY, exists)
    this.size = size;
    this.color = color;
    this.posX = posX;
    this.negX = negX;
    this.posY = posY;
    this.negY = negY;
}

EvilCircle.prototype = Object.create(Shape.prototype);
Object.defineProperty(EvilCircle.prototype, 'constuctor', {
    value: EvilCircle,
    enumerable: false,
    writable: true
});

EvilCircle.prototype.draw = function () {
    ctx.beginPath();
    lineWidth = 3
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
};

EvilCircle.prototype.checkBounds = function () {
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

EvilCircle.prototype.setControls = function () {
    let _this = this;
    window.onkeypress = function (e, posX, posY, negX, negY) {
        if (e.key === _this.negX) {
            _this.x -= _this.velX;
        } if (e.key === _this.posX) {
            _this.x += _this.velX;
        } if (e.key === _this.posY) {
            _this.y -= _this.velY;
        } if (e.key === _this.negY) {
            _this.y += _this.velY;
        }
    }
}

EvilCircle.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
        if (balls[j].exists) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].exists = false;
                ballsAmo--
            }
        }
    }
}

function EvilCircle2(x, y, velX, velY, exists, size, color) {
    EvilCircle.call(this, x, y, velX, velY, exists)
    this.size = size;
    this.color = color;
}

EvilCircle2.prototype = Object.create(EvilCircle.prototype);
Object.defineProperty(EvilCircle2.prototype, 'constuctor', {
    value: EvilCircle2,
    enumerable: false,
    writable: true
});

EvilCircle2.prototype.setControls2 = function () {
    let _this = this;
    window.onkeypress = function (f) {
        if (f.key === negX) {
            _this.x -= _this.velX;
        } if (f.key === posX) {
            _this.x += _this.velX;
        } if (f.key === posY) {
            _this.y -= _this.velY;
        } if (f.key === negY) {
            _this.y += _this.velY;
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
    'white',
    'd',
    'a',
    'w',
    's'
)
evilCircle.setControls();

let evilCircle2 = new EvilCircle(
    80,
    80,
    20,
    20,
    exists = true,
    10,
    'white',
    'l',
    'j',
    'i',
    'k'
)
// evilCircle2.setControls();

var ballsAmo = balls.length;
var counter = document.getElementById("counter");
var touchCounter = document.getElementById("touchCounter");

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

    requestAnimationFrame(loop);
}

loop();