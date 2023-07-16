var character = document.getElementById("character");
var block = document.getElementById("block");
var gameContainer = document.getElementById("gameContainer");
var counter=0;

character.style.left = '0px'; // Initialize the left position of character

// Detect keyboard press
window.onkeydown = function(e){
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

function jump(){
    if(character.classList.contains("animateJump")){return}
    character.classList.add("animateJump");
    setTimeout(function(){
        character.classList.remove("animateJump");
    },500);
}

function move(distance) {
    let left = parseInt(character.style.left);
    let newLeft = left + distance;
    if (newLeft >= 0 && newLeft <= (gameContainer.offsetWidth - character.offsetWidth)) {
        character.style.left = newLeft + 'px';
    }
}

var checkDead = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    let characterLeft = parseInt(character.style.left);
    if(blockLeft<(characterLeft+30) && blockLeft>(characterLeft-20) && characterTop>=130){
        block.style.animation = "none";
        block.style.display = "none";
        alert("Game Over. score: "+Math.floor(counter/100));
        counter=0;
        block.style.display = "";
        block.style.animation = "block 1s infinite linear";
    }else{
        counter++;
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
    }
}, 10);
