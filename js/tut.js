$(document).ready(function() {
    // Maze Size/Dimensions
    var mazeHeight = 800;
    var mazeWidth = 600;

    var playerX = 20;
    var playerY = 20;

    var timeLeft = 120;
    var timerInterval;

   // Start the timer
startTimer();

function startTimer() {
    var timerInterval;
    var audio;
    timerInterval = setInterval(function() {
        timeLeft--;
        $('#timeLeft').text(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            audio = new Audio('./sounds/Dark Souls - You Died (Sound Effect).mp3');
            audio.play();
            setTimeout(function() {
                alert("Time's up! You lose.");
                location.reload();
            }, 1000);
        }
    }, 1000);
}

   // Movement Functionality for player
function movePlayer(dx, dy) {
    var newX = playerX + dx;
    var newY = playerY + dy;

       // Verify new position is inside of the maze walls
    if (newX >= 0 && newX < mazeWidth && newY >= 0 && newY < mazeHeight) {
        if ($('#maze').find('.end-location').is('[style="top: ' + newY + 'px; left: ' + newX + 'px;"]')) {
               clearInterval(timerInterval); // Stop the timer

               // Calculate the score based on the time taken
            var score = calculateScore(timeLeft);
            alert("Congratulations! You've reached the end.\nYour score: " + score);
        }
    }
}

   // Function to calculate the score based on the time taken
function calculateScore(time) {
       // The score is inversely proportional to the time taken
       // You can adjust the formula as needed
       var score = Math.round(10000 / (120 - time)); // Adjust this formula as needed
    return score;
}

    // Movement Functionality for player
    function movePlayer(dx, dy) {
        var newX = playerX + dx;
        var newY = playerY + dy;

        // Change sprite image based on direction
        if (dx > 0) { // Moving right
            $('.player').css('background-image', 'url("./images/right.png")');
            setTimeout(function() {
                $('.player').css('background-image', 'url("./images/front.png")');
            }, 150); // 5000 milliseconds = 5 seconds
        } else if (dx < 0) { // Moving left
            $('.player').css('background-image', 'url("./images/left.png")');
            setTimeout(function() {
                $('.player').css('background-image', 'url("./images/front.png")');
            }, 150);
        } else if (dy > 0) { // Moving down
            $('.player').css('background-image', 'url("./images/back.png")');
            setTimeout(function() {
                $('.player').css('background-image', 'url("./images/front.png")');
            }, 150);
        } else if (dy < 0) { // Moving up
            $('.player').css('background-image', 'url("./images/back.png")');
            setTimeout(function() {
                $('.player').css('background-image', 'url("./images/front.png")');
            }, 150);
        }

        // Verify new position is inside of the maze walls
        if (newX >= 0 && newX < mazeWidth && newY >= 0 && newY < mazeHeight) {
            // Check to see if the new position is a wall or not
            if (!$('#maze').find('.wall').is('[style="top: ' + newY + 'px; left: ' + newX + 'px;"]')) {
                // We can move the player
                playerX = newX;
                playerY = newY;
                $('#player').css({ top: playerY + 'px', left: playerX + 'px' });

                var colors = ["#ff2d75", "#ff6b9f", "#c40051", "#4fc3dc", "#80e2f3", "#2a9cb6", "#8a22a9", "#b45ccf", "#5c0f82", "#9ad8ea", "#c6eaf3", "#6dbdd6", "#2b9bb2", "#5bc1d7", "#007d91"];
                var randomIndex = Math.floor(Math.random() * colors.length);
                var glowColor = colors[randomIndex]; // Get the color for the glowing effect
                var shadow = "0 0 10px " + glowColor + ", 0 0 20px " + glowColor + ", 0 0 30px " + glowColor + ", 0 0 40px " + glowColor + ", 0 0 50px " + glowColor; // Define box shadow properties for glowing effect
                if ($('#maze').find('.square').is('[style="top: ' + newY + 'px; left: ' + newX + 'px;"]')) {
                    $('#maze').find('.square').filter('[style="top: ' + newY + 'px; left: ' + newX + 'px;"]')
                        .css({
                            'background-color': glowColor,
                            'box-shadow': shadow // Apply the glowing effect using box shadow
                        });
                }

            }

// Check if the player reaches the end
if ($('#maze').find('.end-location').is('[style="top: ' + newY + 'px; left: ' + newX + 'px;"]')) {
    clearInterval(timerInterval);
    var score = calculateScore(timeLeft);
    var audio = new Audio('./sounds/coins_Yq2GFZQ.mp3');
    audio.play();
    
    // Array of sprite image URLs for animation
    var spriteImages = ['./images/pop1.png', './images/pop2.png', './images/pop3.png', './images/pop4.png'];
    
    // Function to cycle through sprite images
    var currentIndex = 0;
    var spriteInterval = setInterval(function() {
        $('#player-sprite').attr('src', spriteImages[currentIndex]);
        currentIndex = (currentIndex + 1) % spriteImages.length;
    }, 200); // Adjust the interval duration as needed
    
    setTimeout(function() {
        clearInterval(spriteInterval);
        $('#player-sprite').attr('src', './images/victory_sprite.png');
        alert("Congratulations! You've reached the end.\nYour score: " + score);
        window.location.href = "index.html";
    }, 1000);
}


            
        }
    }

    // Keypress Event Listener
    $(document).keydown(function(e) {
        var audio;

        switch (e.which) {
            case 37:
                movePlayer(-20, 0);
                audio = new Audio('./sounds/slimejump-6913.mp3');
                break;
            case 38:
                movePlayer(0, -20);
                audio = new Audio('./sounds/slimejump-6913.mp3');
                break;
            case 39:
                movePlayer(20, 0);
                audio = new Audio('./sounds/slimejump-6913.mp3');
                break;
            case 40:
                movePlayer(0, 20);
                audio = new Audio('./sounds/slimejump-6913.mp3');
                break;
        }
    
        if (audio) {
            audio.play();
        }
    });

    // Function to generate wall coordinates from maze layout
    function generateWallsFromLayout(layout) {
        var wallCoordinates = [];
        for (var y = 0; y < layout.length; y++) {
            for (var x = 0; x < layout[y].length; x++) {
                if (layout[y][x] === 1) {
                    wallCoordinates.push({ top: y * 20, left: x * 20 });
                } else if (layout[y][x] === 2) {
                    $('#maze').append('<div class="end-location" style="top: ' + (y * 20) + 'px; left: ' + (x * 20) + 'px;"></div>');
                } else {
                    // Add grey square where there is an empty space
                    $('#maze').append('<div class="square" style="top: ' + (y * 20) + 'px; left: ' + (x * 20) + 'px;"></div>');
                }
            }
        }
        return wallCoordinates;
    }
//tutorial
    var mazeLayout = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    var wallCoordinates = generateWallsFromLayout(mazeLayout);
    for (var i = 0; i < wallCoordinates.length; i++) {
        var $wall = $('<div class="wall" style="top: ' + wallCoordinates[i].top + 'px; left: ' + wallCoordinates[i].left + 'px;"></div>');
        $('#maze').append($wall);
        $wall.hide().fadeIn(1500);
    }

    // Create the player and append it to the board
    $('#maze').append('<div class="player" id="player" style="top: ' + playerY + 'px; left: ' + playerX + 'px;"></div>');


});
