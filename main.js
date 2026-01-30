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

// National Assembly Member Search Logic (Frontend only, API not functional)
const memberSearchInput = document.getElementById('member-search-input');
const searchMemberBtn = document.getElementById('search-member-btn');
const memberResultsDiv = document.getElementById('member-results');

if (memberSearchInput && searchMemberBtn && memberResultsDiv) {
    searchMemberBtn.addEventListener('click', () => {
        const memberName = memberSearchInput.value.trim();
        memberResultsDiv.innerHTML = ''; // Clear previous results

        if (memberName) {
            memberResultsDiv.innerHTML = '<p>⚠️ API 호출 문제로 인해 국회의원 정보를 가져올 수 없습니다. 프런트엔드 데모만 표시합니다.</p>';

            // Placeholder for API call and display
            if (memberName === '김원이') { // Example mock data for '김원이'
                const mockMember = {
                    HG_NM: '김원이',
                    POLY_NM: '더불어민주당',
                    ORIG_NM: '전라남도 목포시',
                    CMIT_NM: '보건복지위원회',
                    TEL_NO: '02-784-1886'
                };
                memberResultsDiv.innerHTML += `
                    <div class="member-info-card">
                        <h3>${mockMember.HG_NM}</h3>
                        <p>소속 정당: ${mockMember.POLY_NM}</p>
                        <p>선거구: ${mockMember.ORIG_NM}</p>
                        <p>소속 위원회: ${mockMember.CMIT_NM}</p>
                        <p>전화번호: ${mockMember.TEL_NO}</p>
                    </div>
                `;
            } else {
                memberResultsDiv.innerHTML += `<p>"${memberName}"에 대한 모의 정보를 찾을 수 없습니다.</p>`;
            }

            // Real API call would go here if API was working
            /*
            fetch(`https://open.assembly.go.kr/portal/openapi/ALLNAMEMBER?KEY=YOUR_API_KEY&Type=json&NAAS_NM=${encodeURIComponent(memberName)}`)
                .then(response => response.json())
                .then(data => {
                    // Process and display real data
                })
                .catch(error => {
                    memberResultsDiv.innerHTML = '<p>정보를 가져오는 중 오류가 발생했습니다.</p>';
                    console.error('API Error:', error);
                });
            */

        } else {
            memberResultsDiv.innerHTML = '<p>검색할 국회의원 이름을 입력해주세요.</p>';
        }
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
