let cube = document.getElementById("cube");
let gamearena = document.getElementById("gamearena");
let bullet = document.getElementById("bullet");
let score = document.getElementById("score");
let pos_x = 0;
let pos_y = 0;
let speed = 5;
let jump = false;
let ground = true;
let height = 270;
let gravity = 12;
let keys = {};
let bull_x = gamearena.clientHeight - bullet.clientHeight;
let bull_y = gamearena.clientWidth;
let point = 0;

window.addEventListener('keydown', (event) => {
    keys[event.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (event) => {
    keys[event.key.toLowerCase()] = false;
});

function checkCollision() {
    let cubeRect = cube.getBoundingClientRect();
    let bulletRect = bullet.getBoundingClientRect();

    if (bulletRect.left < cubeRect.right &&
        bulletRect.right > cubeRect.left &&
        bulletRect.top < cubeRect.bottom &&
        bulletRect.bottom > cubeRect.top) {
            return true;
    } else {
        return false;
    }
}

function move(event) {
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
    }
    if (jump) {
        pos_y -= gravity;
        ground = false;
    }
    if (pos_y < height) {
        jump = false;
    }
    if (jump == false) {
        pos_y += gravity;
    }

    if (pos_x < 0) {
        pos_x = 0;
    } else if (pos_x > gamearena.clientWidth - cube.clientWidth) {
        pos_x = gamearena.clientWidth - cube.clientWidth;
    }

    if (pos_y < 0) {
        pos_y = 0;
    } else if (pos_y > gamearena.clientHeight - cube.clientHeight) {
        pos_y = gamearena.clientHeight - cube.clientHeight;
        ground = true;
    }
    bull_y -= 5;
    if (bull_y < 0) {
        bull_y = gamearena.clientWidth - bullet.clientWidth;
        point += 5;
        score.textContent = 'score: ' + point;
    }
    if (checkCollision()) {
        bull_y = gamearena.clientWidth - bullet.clientWidth;
        point -= 1;
        score.textContent = 'score: ' + point;
    }
    bullet.style.left = bull_y + 'px'
    cube.style.left = pos_x + 'px';
    cube.style.top = pos_y + 'px';
    requestAnimationFrame(move);
}
bullet.style.top = bull_x + 'px'
move()