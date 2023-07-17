var character = document.getElementById("character");
var block = document.getElementById("block");
var gameContainer = document.getElementById("gameContainer");
var counter = 0;

character.style.left = '0px'; // Initialize the left position of character
block.style.right = '0px'; // Initialize the right position of the block

// Detect keyboard press
window.onkeydown = function(e) {
    switch (e.keyCode) {
        case 32: // Space
            jump();
            break;
        case 37: // Left arrow
            move(-10);
            break;
        case 39: // Right arrow
            move(10);
            break;
    }
}

// Detect click
gameContainer.onclick = function() {
    jump();
}

function jump() {
    if(character.classList.contains("animateJump")) {return}
    character.classList.add("animateJump");
    setTimeout(function() {
        character.classList.remove("animateJump");
    }, 500);
}

function move(distance) {
    let left = parseInt(character.style.left);
    let newLeft = left + distance;
    if (newLeft >= 0 && newLeft <= (gameContainer.offsetWidth - character.offsetWidth)) {
        character.style.left = newLeft + 'px';
    }
}

var blockSpeed = 5;  // Set the initial speed

function resetBlock() {
    block.style.right = '0px';
    blockSpeed = Math.random() * (10 - 5) + 5;  // Random speed between 5 and 10
}

// Move the block
var moveBlock = setInterval(function() {
    let blockRight = parseInt(block.style.right);
    let newRight = blockRight + blockSpeed;
    if (newRight > window.innerWidth) {
        resetBlock();
    } else {
        block.style.right = newRight + 'px';
    }
}, 20);

var checkDead = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockRight = parseInt(block.style.right);
    let blockLeft = window.innerWidth - blockRight - block.offsetWidth;
    let characterLeft = parseInt(character.style.left);

    if(blockLeft < (characterLeft + 30) && blockLeft > (characterLeft - 20) && characterTop >= 130){
        clearInterval(moveBlock);  // Stop moving the block
        alert("Game Over. score: "+Math.floor(counter/100));
        counter = 0;
        resetBlock();  // Reset the block
        moveBlock = setInterval(function() {  // Start moving the block again
            let blockRight = parseInt(block.style.right);
            let newRight = blockRight + blockSpeed;
            if (newRight > window.innerWidth) {
                resetBlock();
            } else {
                block.style.right = newRight + 'px';
            }
        }, 20);
    } else{
        counter++;
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
    }
}, 10);
