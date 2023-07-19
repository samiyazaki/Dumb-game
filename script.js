var character = document.getElementById("character");
var block = document.getElementById("block");
var gameContainer = document.getElementById("gameContainer");
var playButton = document.getElementById("playButton");
var pauseButton = document.getElementById("pauseButton");
var pauseScreen = document.getElementById("pauseScreen");
var counter = 0;
var playButtonPause = document.getElementById("playButtonPause");

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
var moveBlock = setInterval(moveBlockFunction, 20);

// In your checkDead function, reset the block when the game is over
var checkDead = setInterval(checkDeadFunction, 10);

// Move Block Function
function moveBlockFunction() {
    let blockRight = parseInt(block.style.right);
    let newRight = blockRight + blockSpeed;
    if (newRight > window.innerWidth) {
        resetBlock();
    } else {
        block.style.right = newRight + 'px';
    }
}

// Check Dead Function
function checkDeadFunction() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockRight = parseInt(block.style.right);
    let blockLeft = window.innerWidth - blockRight - block.offsetWidth;
    let characterLeft = parseInt(character.style.left);

    if(blockLeft < (characterLeft + 30) && blockLeft > (characterLeft - 20) && characterTop >= 130){
        clearInterval(moveBlock);  // Stop moving the block
        alert("Game Over. score: "+Math.floor(counter/100));
        counter = 0;
        resetBlock();  // Reset the block
        moveBlock = setInterval(moveBlockFunction, 20);  // Start moving the block again
    } else{
        counter++;
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
    }
}

playButton.addEventListener("click", function() {
    gameContainer.style.display = "";
    pauseScreen.classList.add("hidden");
    clearInterval(moveBlock); // Clear the previous interval
    clearInterval(checkDead); // Clear the previous interval
    moveBlock = setInterval(moveBlockFunction, 20); // Restart the interval
    checkDead = setInterval(checkDeadFunction, 10); // Restart the interval
});

pauseButton.addEventListener("click", function() {
    gameContainer.style.display = "none";
    pauseScreen.classList.remove("hidden");
    clearInterval(moveBlock); // Stop moving the block
    clearInterval(checkDead); // Stop checking if the character is dead
});



playButtonPause.addEventListener("click", function() {
    gameContainer.style.display = "";
    pauseScreen.classList.add("hidden");
    clearInterval(moveBlock); // Clear the previous interval
    clearInterval(checkDead); // Clear the previous interval
    moveBlock = setInterval(moveBlockFunction, 20); // Restart the interval
    checkDead = setInterval(checkDeadFunction, 10); // Restart the interval
});
