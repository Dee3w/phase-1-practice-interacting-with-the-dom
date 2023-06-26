// Counter variables
let counter = 0;
let intervalId;

// Like variables
let likeCount = {};
const likesList = document.querySelector('.likes');

// Comment variables
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentList = document.getElementById('list');

// Counter elements
const counterElement = document.getElementById('counter');
const minusButton = document.getElementById('minus');
const plusButton = document.getElementById('plus');
const heartButton = document.getElementById('heart');
const pauseButton = document.getElementById('pause');

// Event listeners for buttons
minusButton.addEventListener('click', decrement);
plusButton.addEventListener('click', increment);
heartButton.addEventListener('click', like);
pauseButton.addEventListener('click', togglePause);

// Start the timer
startTimer();

// Increment the counter
function increment() {
  counter++;
  updateCounter();
}

// Decrement the counter
function decrement() {
  counter--;
  updateCounter();
}

// Update the counter element
function updateCounter() {
  counterElement.innerText = counter;
}

// Start the timer
function startTimer() {
  intervalId = setInterval(increment, 1000);
}

// Toggle pause and resume functionality
function togglePause() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    disableButtons(true);
    pauseButton.innerText = 'resume';
  } else {
    intervalId = setInterval(increment, 1000);
    disableButtons(false);
    pauseButton.innerText = 'pause';
  }
}

// Disable or enable buttons
function disableButtons(disable) {
  minusButton.disabled = disable;
  plusButton.disabled = disable;
  heartButton.disabled = disable;
}

// Like a number
function like() {
  if (likeCount[counter]) {
    likeCount[counter]++;
  } else {
    likeCount[counter] = 1;
  }

  updateLikesList();
}

// Update the likes list
function updateLikesList() {
  likesList.innerHTML = '';

  for (const number in likeCount) {
    const listItem = document.createElement('li');
    listItem.innerText = `${number} has been liked ${likeCount[number]} times`;
    likesList.appendChild(listItem);
  }
}

// Add a comment
commentForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const commentText = commentInput.value;
  addComment(commentText);
  commentInput.value = '';
});

// Add a comment to the comment list
function addComment(comment) {
  const commentItem = document.createElement('div');
  commentItem.innerText = comment;
  commentList.appendChild(commentItem);
}

// Restart the counter and reset variables
function restartTimer() {
  counter = 0;
  likeCount = {};
  updateCounter();
  updateLikesList();
  clearInterval(intervalId);
  intervalId = null;
  disableButtons(false);
  pauseButton.innerText = 'pause';
}


