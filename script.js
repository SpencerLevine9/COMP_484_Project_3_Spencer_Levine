// Task 1: Verification Log
console.log("Status Manager Started");

// Global variable setup (required for Task 10 using setInterval/clearInterval)
let intervalId = null;
    //-----------------------------------------------------------------------------------------------
    // extra feature 1: Every time the status becomes visible, show how many times it’s been opened.
    // counts how many times status shown
    //-----------------------------------------------------------------------------------------------
let statusShowCount = 0; // additional feature to count how many times status shown

// Use const to target required elements for easier access later in the script
// We use querySelector or getElementById to retrieve specific DOM nodes [3].
const mainTitle = document.querySelector("#main-title");
const toggleButton = document.getElementById("toggle-button");
const statusOutput = document.querySelector("#status-output");
const timerButton = document.getElementById("timer-button");
const controlPanel = document.getElementById("control-panel");
const itemList = document.getElementById("item-list");

/* ======================================= */
// --- Task 3: Selecting and Changing Inner HTML ---
// Write the code here to select the mainTitle and update its innerHTML:
// Example: mainTitle.innerHTML = "New Title";
// Task 3: Modify the main title text when the script loads
mainTitle.innerHTML = "DOM Project: Ready!";

/* ======================================= */
// --- Task 4: Attribute Modification ---
// Write the code here to use setAttribute() on the toggleButton element
// to add the required 'data-action' attribute.
// Task 4: Add a custom data-action attribute to the toggle button
toggleButton.setAttribute("data-action", "status-toggle");

/* ======================================= */
// --- Task 9: Looping and Applying Changes ---
// Define and call the highlightListItems() function here so it runs on load.
// You will need to use document.querySelectorAll('li') and a loop structure
// (like a 'for' loop or 'forEach') to iterate over all list items [3-5].
// Task 9: Loops and Node Lists
function highlightListItems() {
  // Select all <li> elements inside the document
  const listItems = document.querySelectorAll("li");
  // Loop through each list item and make it blue
  listItems.forEach((item) => {
    item.style.color = "blue";
  });
}
// Run this once when the script loads
highlightListItems();

    //-----------------------------------------------------------------------------------------------
    // extra feature 2: Let the user click a list item to highlight it (like marking it as important)
    //-----------------------------------------------------------------------------------------------
function enableListItemHighlighting() {
  const listItems = document.querySelectorAll("#item-list li");

  listItems.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("highlighted");
    });
  });
}
enableListItemHighlighting();

/* ======================================= */
// --- Tasks 5, 6, 7 & 8: Toggle Functionality ---
// Define the functions (e.g., toggleStatus, createTimestamp) and event listeners
// here to handle the click event on the toggleButton [6, 7].
// Task 8: Create and append a timestamp span
function createTimestamp() {
  const timestampSpan = document.createElement("span");
  // Add a space before the time so multiple timestamps don't stick together
  timestampSpan.innerHTML = " " + new Date().toLocaleTimeString();
  statusOutput.appendChild(timestampSpan);
}

// Tasks 5, 6, 7 & 8: Toggle Functionality
function toggleStatus(e) {
  // Task 6: Prevent the link from jumping to the top or refreshing
  e.preventDefault();

  // Task 5: Toggle the 'hidden' class on the status output div
  statusOutput.classList.toggle("hidden");

  // Check visibility: if it does NOT have 'hidden', it's visible
  const isVisible = !statusOutput.classList.contains("hidden");

  if (isVisible) {
    // Task 7: When visible, make the main title background yellow
    mainTitle.style.backgroundColor = "yellow";

    // Task 8: Append a timestamp whenever it becomes visible
    createTimestamp();
    //-------------------------------------------------------------------------------------------------
    // extra feature 1: Every time the status becomes visible, show how many times it’s been opened.
    // Update the counter inside toggleStatus
    //-------------------------------------------------------------------------------------------------
    statusShowCount++;

    // Update a simple message about how many times it's been shown
    let counterMessage = document.getElementById("status-counter");
    if (!counterMessage) {
        counterMessage = document.createElement("p");
        counterMessage.id = "status-counter";
        statusOutput.appendChild(counterMessage);
    }
    counterMessage.textContent = `Status has been shown ${statusShowCount} time(s).`;

  } else {
    // When hidden, remove the background color
    mainTitle.style.backgroundColor = "";
  }
}
// Add the click event listener for the toggle link (Task 5)
toggleButton.addEventListener("click", toggleStatus);


/* ======================================= */
// --- Task 10: Timed Animation ---
// Define the startFlashing() and stopFlashing() functions using
// setInterval() and clearInterval() [8, 9], and bind them to the
// timerButton using addEventListener for 'click' and 'dblclick' [10].
// Task 10: The Flashing Timer
function startFlashing() {
  // If it's already flashing, don't start another interval
  if (intervalId !== null) {
    return;
  }

  intervalId = setInterval(() => {
    controlPanel.classList.toggle("hidden");
  }, 500); // 500 milliseconds
}

function stopFlashing() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;

    // Ensure the control panel is visible when we stop
    controlPanel.classList.remove("hidden");
  }
}
// Bind the flashing behavior to the timer button
timerButton.addEventListener("click", startFlashing);
timerButton.addEventListener("dblclick", stopFlashing);

