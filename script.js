 
  // Initialization
  const boxes = Array.from(document.querySelectorAll("td"));
  const inputs = Array.from(document.querySelectorAll("[type=checkbox]"));
  const rows = [1, 2, 3].map((n) =>
    Array.from(document.querySelectorAll(`tr:nth-child(${n}) td`))
  );
  const columns = [1, 2, 3].map((n) =>
    Array.from(document.querySelectorAll(`td:nth-child(${n})`))
  );
  const diagonals = [
    [
      [1, 1],
      [2, 2],
      [3, 3],
    ],
    [
      [3, 1],
      [2, 2],
      [1, 3],
    ],
  ].map((set) =>
    set.map(([x, y]) =>
      document.querySelector(`tr:nth-child(${x}) td:nth-child(${y})`)
    )
  );
  const gameOver = document.querySelector("h2");
  const HUMAN = "🧑‍💻";
  const ROBOT = "🤖";

  // Decide who goes first
  if (Math.random() > 0.5) {
    runRobotTurn();
  }

  // Handle when a user clicks an input
  for (const input of inputs) {
    input.addEventListener("click", handleClickInput);
  }

  // The user chose a box, check for win, robot turn, check for win
  function handleClickInput(evt) {
    evt.target.closest("td").innerHTML = HUMAN;
    if (hasWin()) {
      return endGame();
    }
    runRobotTurn();
    if (hasWin()) {
      return endGame();
    }
  }

  // Choose a random available box
  function runRobotTurn() {
    const robotBoxes = shuffle(boxes);
    while (robotBoxes.length) {
      const box = robotBoxes.shift();
      if (box.querySelector("input")) {
        box.innerHTML = ROBOT;
        break;
      }
    }
  }

  // Determine win
  function hasWin() {
    return (
      rows.some(hasAllSame) ||
      columns.some(hasAllSame) ||
      diagonals.some(hasAllSame)
    );
  }

  // Determine if every cell matches
  function hasAllSame(arr) {
    return arr.every(
      (td) => !td.querySelector("input") && td.innerHTML === arr[0].innerHTML
    );
  }

  // Display game over, cancel events
  function endGame() {
    gameOver.hidden = false;
    for (const input of inputs) {
      input.removeEventListener("click", handleClickInput);
      input.remove();
    }
  }

  // Shuffle a copy of the input array
  function shuffle(array) {
    array = array.slice(0);
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
