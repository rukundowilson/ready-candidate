document.addEventListener("DOMContentLoaded", () => {
    // Variables
    let secretWord = "";
    let updatedSecret;
    let totalAttempts;
    let running = true;
    let maxTime = 40;
    
    // DOM Elements
    const displayHint1 = document.getElementById("hint1");
    const displayHint2 = document.getElementById("hint2");
    const status = document.querySelector("#d-progress");
    const displayAttempts = document.getElementById("t-attempts");
    const timing = document.getElementById("digital-clock");

    // Game initialization
    gameResources(selectWord, hint);
    dash_notation();

    // Functions

    // Game setup
    function gameResources(callback, callback2) {
        const fruits = ['mango', 'pinneaple', 'orange', "avocado"];
        const animal = ['human', 'gorilla', 'lion', "bird", "owl", "snake"];
        const others = ['water', 'food', 'basket', "knife", "bottle"];
        const combination = [...fruits, ...animal, ...others];

        const randomIndex = Math.floor(Math.random() * combination.length);
        
        callback(combination[randomIndex]); 
        callback2(fruits, animal, others);  
    }

    // Display hints based on word category
    function hint(fruits, animal, others) {
        const categories = { fruits, animal, others };

        for (const category in categories) {
            if (categories[category].includes(secretWord)) {
                displayHint1.innerHTML = `Word is in ${category} class`;
                break;
            }
        }
    }

    // Select a random word and set up initial attempts
    function selectWord(word) {
        secretWord = word;
        totalAttempts = secretWord.length * 2;
        displayAttempts.innerHTML = `${totalAttempts}`;
    }

    // Initialize secret word with dashes
    function dash_notation() {
        updatedSecret = secretWord.split("").fill('-');
        status.innerHTML = updatedSecret.join("");
        displayHint2.innerHTML = `${secretWord[0]}-${secretWord[2]}${updatedSecret.slice(3).join("")}`;
    }

    // Handle user's guess
    function guess() {
        let n = 0;
        const chars = secretWord.split("");
        const guessed = document.getElementById("user-input").value;
        const used = updatedSecret;

        if (used.includes(guessed)) {
            document.getElementById("exclude").innerHTML = `Letter ${guessed} is already used`;
            return;
        }

        while (n !== chars.length && running) {
            if (chars[n] === guessed) {
                updatedSecret[n] = guessed;           
                guess_status();         
            }           
            n++;
        }

        if (!chars.includes(guessed)) {
            settings();
        }

        if (updatedSecret.join("") === secretWord) {
            changeBackgroundColor();
            document.querySelector('.ifwon').style.display = "block";
            document.getElementById("out-time").textContent = "Congratulations! You saved the man! Game won.";
            running = false;
        }

        document.getElementById("user-input").value = ""; // Clear input field
    }

    // Update status display with guessed letters
    function guess_status() {
        status.innerHTML = updatedSecret.join("");
    }

    // Timer function
    function timer() {
        if (maxTime !== 0 && running) {
            maxTime--;
            timing.innerHTML = `00:${maxTime}`;
        } else if (maxTime === 0 && running) {
            handleGameLoss("Time out! You lost the game.");
        }
    }
    setInterval(timer,1000);


    // Change background color
    function changeBackgroundColor() {
        document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    }   

    // Handle game loss
    function handleGameLoss(message) {
        changeBackgroundColor();
        document.querySelector('.ifwon').style.display = "block";
        document.getElementById("out-time").textContent = message;
        document.querySelector(".images").innerHTML = `<img src="../media/images/hang-him.png">`;
        document.querySelector("#life").innerHTML = `MAN DEAD`;
        document.querySelector("input").style.background="rgba(0, 0, 0, 0.5)";
        maxTime = 0;
        timing.innerHTML = `00:${maxTime}`;
        running = false;
    }

    // Game settings - update attempts and check for game over
    function settings() {
        totalAttempts--;
        if (totalAttempts === 0) {
            handleGameLoss("Out of attempts! You lost.");
        }
        displayAttempts.innerHTML = `${totalAttempts}`;
    }

    // Event listener for form submission
    document.querySelector("form").onsubmit = function() {
        if (running) {
            guess();
        }
        return false;
    }

    // Game reset
    document.getElementById("reset").onclick = () => {
        maxTime = 40;
        document.querySelector(".images").innerHTML = `<img src="../media/images/readyHang.jpg">`;
        gameResources(selectWord, hint);
        document.getElementById("exclude").innerHTML = `None`;
        dash_notation();
        guess();
        document.body.style.backgroundColor = "#fff";
        document.querySelector('.ifwon').style.display = "none";
        running = true;
    }
});
