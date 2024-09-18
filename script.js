let cube = document.getElementById("cube");
let gamearena = document.getElementById("gamearena");
let bullet = document.getElementById("bullet");
let score = document.getElementById("score");
let point_score = document.getElementById("point")
let point_x = Math.floor(Math.random() * gamearena.clientWidth - point_score.clientWidth)
let point_y = 0
let pos_x = 0;
let pos_y = gamearena.clientHeight;
let speed = 3;
let jump = false;
let ground = true;
let height = 300;
let gravity = 0.5;
let keys = {};
let bull_x = gamearena.clientHeight - bullet.clientHeight;
let bull_y = gamearena.clientWidth;
let point = 0;
let time = 1;
let vel = 0;
let jump_vel = 0;
let jump_speed = 10;

window.addEventListener('keydown', (event) => {
    keys[event.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (event) => {
    keys[event.key.toLowerCase()] = false;
});

function checkCollision(a, b) {
    let x = a.getBoundingClientRect();
    let y = b.getBoundingClientRect();

    if (y.left < x.right &&
        y.right > x.left &&
        y.top < x.bottom &&
        y.bottom > x.top) {
            return true;
    } else {
        return false;
    }
}

function jumping_simualtor(event) {
    if (keys['a']) {
        pos_x -= speed;
    }
    if (keys['d']) {
        pos_x += speed;
    }
    
    if (keys['shift']) {
        speed = 10;
    } else {
        speed = 5;
    }

    if (keys[' '] && ground == true) {
        jump = true;
        jump_vel = jump_speed
    }
    if (jump) {
        jump_vel -= gravity
        pos_y -= jump_vel;
        ground = false;
        time += 1;
        if (jump_vel <= 0) {
            jump = false
        }
    }
    if (jump == false) {
        vel += gravity
        pos_y += vel;
        time += 1;
    }

    if (pos_x < 0) {
        pos_x = 0;
    } else if (pos_x > gamearena.clientWidth - cube.clientWidth) {
        pos_x = gamearena.clientWidth - cube.clientWidth;
    }
    bull_y -= 5;
    if (pos_y < 0) {
        pos_y = 0;
    } else if (pos_y > gamearena.clientHeight - cube.clientHeight) {
        pos_y = gamearena.clientHeight - cube.clientHeight;
        ground = true;
        vel = 0;
    }
    
    if (bull_y < 0) {
        bull_y = gamearena.clientWidth - bullet.clientWidth;
    }
    if (checkCollision(cube, bullet)) {
        bull_y = gamearena.clientWidth - bullet.clientWidth;
        point -= 1;
        score.textContent = 'score: ' + point;
    }

    point_y += 5
    if (point_y > gamearena.clientHeight - point_score.clientHeight) {
        point_y = 0
        point_x = Math.floor(Math.random() * gamearena.clientWidth)
    }

    if (checkCollision(cube, point_score)) {
        point += 5
        score.textContent = 'score: ' + point;
        point_y = 0
        point_x = Math.floor(Math.random() * gamearena.clientWidth)
    }

    bullet.style.left = bull_y + 'px'
    cube.style.left = pos_x + 'px';
    cube.style.top = pos_y + 'px';
    point_score.style.left = point_x + 'px';
    point_score.style.top = point_y + 'px';
    requestAnimationFrame(jumping_simualtor);
}

bullet.style.top = bull_x + 'px'

jumping_simualtor()
