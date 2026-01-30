const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;

// Function to set the theme icon
function setThemeIcon(isDarkMode) {
    if (themeToggleBtn) {
        themeToggleBtn.textContent = isDarkMode ? '☀️' : '🌙';
    }
}

// Apply saved theme on load
(function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        setThemeIcon(true);
    } else {
        setThemeIcon(false); // Default to light mode icon
    }
})();

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        setThemeIcon(isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
}


const generateBtn = document.getElementById('generate-btn');
const resultsContainer = document.getElementById('results-container');
const labels = ['a', 'b', 'c'];

// Only run lotto generator logic if elements exist on the page
if (generateBtn && resultsContainer) {
    generateBtn.addEventListener('click', () => {
        resultsContainer.innerHTML = ''; // Clear previous results
        for (let i = 0; i < 3; i++) {
            const lottoNumbers = generateLottoNumbers();
            displayNumbers(lottoNumbers, labels[i]);
        }
    });
}


function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 5) {
        const randomNumber = Math.floor(Math.random() * 20) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function displayNumbers(numbers, label) {
    const setContainer = document.createElement('div');
    setContainer.classList.add('numbers-set');

    const labelDiv = document.createElement('div');
    labelDiv.classList.add('set-label');
    labelDiv.textContent = label;
    setContainer.appendChild(labelDiv);

    numbers.forEach(number => {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('number');
        numberDiv.textContent = number;
        numberDiv.style.backgroundColor = getNumberColor(number);
        setContainer.appendChild(numberDiv);
    });
    resultsContainer.appendChild(setContainer);
}

function getNumberColor(number) {
    if (number <= 5) {
        return '#f9e45b'; // Yellow
    } else if (number <= 10) {
        return '#87ceeb'; // Sky Blue
    } else if (number <= 15) {
        return '#ff7f50'; // Coral
    } else {
        return '#98fb98'; // Pale Green
    }
}
