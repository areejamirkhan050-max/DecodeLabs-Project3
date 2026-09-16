// ==========================================
// 1. STATE MANAGEMENT
// ==========================================
let currentScore = 0;

// ==========================================
// 2. DOM ELEMENT SELECTION
// ==========================================
const scoreDisplay = document.getElementById('scoreDisplay');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const resetBtn = document.getElementById('resetBtn');

const themeToggleBtn = document.getElementById('themeToggleBtn');

const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItemBtn');
const itemList = document.getElementById('itemList');

// ==========================================
// 3. INTERACTIVE LOGIC (IPO LOOP)
// ==========================================

// Counter Logic
function updateScore(newValue) {
  currentScore = newValue;
  // Output / DOM Mutation via safe textContent
  scoreDisplay.textContent = currentScore;
}

incrementBtn.addEventListener('click', () => updateScore(currentScore + 1));
decrementBtn.addEventListener('click', () => updateScore(currentScore - 1));
resetBtn.addEventListener('click', () => updateScore(0));

// Dark Mode Toggle Logic (Class & LocalStorage state)
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');

  themeToggleBtn.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// Load Persisted Theme State
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggleBtn.textContent = '☀️ Light Mode';
}

// Dynamic List Creation Logic (XSS-Safe using document.createElement)
function addItem() {
  const textValue = itemInput.value.trim();
  if (textValue === '') return;

  // Create List Item Node
  const li = document.createElement('li');

  // Safe text injection
  const textSpan = document.createElement('span');
  textSpan.textContent = textValue;

  // Create Delete Button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '×';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => li.remove());

  li.appendChild(textSpan);
  li.appendChild(deleteBtn);

  itemList.appendChild(li);
  itemInput.value = ''; // Reset input field
}

addItemBtn.addEventListener('click', addItem);
itemInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addItem();
});