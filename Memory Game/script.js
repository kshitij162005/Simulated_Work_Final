document.addEventListener("DOMContentLoaded", () => {
  const difficultySelect = document.querySelector("#difficulty");
  const startButton = document.querySelector("#start-button");
  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");

  const cardArray = [
    { name: "fries", img: "images/fries.png" },
    { name: "cheeseburger", img: "images/cheeseburger.png" },
    { name: "ice-cream", img: "images/ice-cream.png" },
    { name: "pizza", img: "images/pizza.png" },
    { name: "milkshake", img: "images/milkshake.png" },
    { name: "hotdog", img: "images/hotdog.png" },
  ];

  // Variables to store the state of the game
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let totalCards = 12;

  // Start the game based on selected difficulty
  function startGame() {
    // Clear any previous game state
    cardsChosen = [];
    cardsChosenId = [];
    cardsWon = [];
    grid.innerHTML = ""; // Clear the grid
    const difficulty = difficultySelect.value;

    // Adjust number of cards based on difficulty
    switch (difficulty) {
      case "easy":
        totalCards = 6;
        break;
      case "medium":
        totalCards = 8;
        break;
      case "hard":
        totalCards = 12;
        break;
    }

    // Create a shuffled deck based on total cards
    const shuffledCards = shuffleCards(totalCards);
    createBoard(shuffledCards);
  }

  // Shuffle the cards array based on the total cards
  function shuffleCards(totalCards) {
    const shuffled = [...cardArray].slice(0, totalCards / 2); // Take half the cards for the pairs
    const cardDeck = shuffled.concat(shuffled); // Duplicate to create pairs
    return cardDeck.sort(() => 0.5 - Math.random()); // Shuffle
  }

  // Create the board (grid)
  function createBoard(cards) {
    cards.forEach((card, index) => {
      const cardElement = document.createElement("img");
      cardElement.setAttribute("src", "images/blank.png");
      cardElement.setAttribute("data-id", index);
      cardElement.addEventListener("click", flipCard);
      grid.appendChild(cardElement);
    });
  }

  // Flip the card
  function flipCard() {
    const cardId = this.getAttribute("data-id");

    // Avoid flipping the same card twice
    if (!cardsChosenId.includes(cardId)) {
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);
      this.setAttribute("src", cardArray[cardId].img);

      // Check for a match
      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
      }
    }
  }

  // Check for a match
  function checkForMatch() {
    const cards = document.querySelectorAll("img");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId === optionTwoId) {
      // Same card clicked
      cards[optionOneId].setAttribute("src", "images/blank.png");
      cards[optionTwoId].setAttribute("src", "images/blank.png");
      alert("You clicked the same image!");
    } else if (cardsChosen[0] === cardsChosen[1]) {
      // Correct match
      alert("You found a match!");
      cards[optionOneId].setAttribute("src", "images/white.png");
      cards[optionTwoId].setAttribute("src", "images/white.png");
      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);
      cardsWon.push(cardsChosen);
    } else {
      // Incorrect match
      cards[optionOneId].setAttribute("src", "images/blank.png");
      cards[optionTwoId].setAttribute("src", "images/blank.png");
      alert("Sorry, try again!");
    }

    // Reset selected cards
    cardsChosen = [];
    cardsChosenId = [];

    // Update score
    resultDisplay.textContent = `Pairs found: ${cardsWon.length}`;

    // Check if game is complete
    if (cardsWon.length === totalCards / 2) {
      resultDisplay.textContent = "Congratulations! You found them all!";
    }
  }

  // Start button event listener
  startButton.addEventListener("click", startGame);

  // Initialize the game with the medium difficulty (default)
  startGame();
});
