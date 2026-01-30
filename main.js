// Theme Toggle Logic
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
const memberNameInput = document.getElementById('member-name-input');
const committeeNameInput = document.getElementById('committee-name-input');
const searchMemberBtn = document.getElementById('search-member-btn');
const memberResultsDiv = document.getElementById('member-results');

const API_KEY = '9211fe72cb0d43209a199f13a6b4da02'; // Your API Key
const API_ENDPOINT = 'https://open.assembly.go.kr/portal/openapi/ALLNAMEMBER';

if (searchMemberBtn && memberResultsDiv) {
    searchMemberBtn.addEventListener('click', async () => {
        const memberName = memberNameInput ? memberNameInput.value.trim() : '';
        const committeeName = committeeNameInput ? committeeNameInput.value.trim() : '';
        memberResultsDiv.innerHTML = ''; // Clear previous results

        if (!memberName && !committeeName) {
            memberResultsDiv.innerHTML = '<p class="info-message">국회의원 이름 또는 소속 위원회명을 입력해주세요.</p>';
            return;
        }

        memberResultsDiv.innerHTML = '<p class="info-message">데이터를 검색 중입니다...</p>';

        // --- Placeholder for actual API call ---
        // As discussed, the API is currently not functional.
        // The following is a frontend-only demonstration with mock data.
        setTimeout(() => {
            if (memberName === '김원이' && committeeName === '보건복지위원회') {
                const mockMember = {
                    HG_NM: '김원이',
                    POLY_NM: '더불어민주당',
                    ORIG_NM: '전라남도 목포시',
                    CMIT_NM: '보건복지위원회',
                    TEL_NO: '02-784-1886'
                };
                memberResultsDiv.innerHTML = `
                    <div class="member-info-card">
                        <h3>${mockMember.HG_NM}</h3>
                        <p><strong>소속 정당:</strong> ${mockMember.POLY_NM}</p>
                        <p><strong>선거구:</strong> ${mockMember.ORIG_NM}</p>
                        <p><strong>소속 위원회:</strong> ${mockMember.CMIT_NM}</p>
                        <p><strong>전화번호:</strong> ${mockMember.TEL_NO}</p>
                    </div>
                    <p class="error-message">⚠️ API 호출 문제로 인해 실제 정보를 가져올 수 없습니다. 위 정보는 모의 데이터입니다.</p>
                    <p class="error-message">보좌진 정보 검색은 현재 제공되는 API로는 어렵습니다.</p>
                `;
            } else if (memberName || committeeName) {
                memberResultsDiv.innerHTML = `
                    <p class="info-message">"${memberName || '입력값'}" / "${committeeName || '입력값'}"에 대한 모의 정보를 찾을 수 없습니다.</p>
                    <p class="error-message">⚠️ API 호출 문제로 인해 실제 정보를 가져올 수 없습니다. 프런트엔드 데모만 표시합니다.</p>
                    <p class="error-message">보좌진 정보 검색은 현재 제공되는 API로는 어렵습니다.</p>
                `;
            }
        }, 1000); // Simulate network delay
        // --- End Placeholder ---

        /*
        // --- Actual API call (if API was functional) ---
        // Note: The NAAS_NM and CMIT_NM parameters are assumed based on best guess
        // and may not be the correct parameters for the API.
        const queryParams = new URLSearchParams({
            KEY: API_KEY,
            Type: 'json',
            pIndex: 1,
            pSize: 10 // Fetch a few results to filter client-side if needed
        });
        if (memberName) queryParams.append('NAAS_NM', memberName);
        if (committeeName) queryParams.append('CMIT_NM', committeeName); // Assuming CMIT_NM is the parameter

        try {
            const response = await fetch(`${API_ENDPOINT}?${queryParams.toString()}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            // Process and display data
            if (data && data.ALLNAMEMBER && data.ALLNAMEMBER[1] && data.ALLNAMEMBER[1].row) {
                const members = data.ALLNAMEMBER[1].row;
                // Further filter client-side if API doesn't support full name/committee search
                const filteredMembers = members.filter(member => {
                    const matchesName = memberName ? member.HG_NM.includes(memberName) : true;
                    const matchesCommittee = committeeName ? member.CMIT_NM.includes(committeeName) : true;
                    return matchesName && matchesCommittee;
                });

                if (filteredMembers.length > 0) {
                    memberResultsDiv.innerHTML = filteredMembers.map(member => `
                        <div class="member-info-card">
                            <h3>${member.HG_NM}</h3>
                            <p><strong>소속 정당:</strong> ${member.POLY_NM}</p>
                            <p><strong>선거구:</strong> ${member.ORIG_NM}</p>
                            <p><strong>소속 위원회:</strong> ${member.CMIT_NM}</p>
                            <p><strong>전화번호:</strong> ${member.TEL_NO}</p>
                            <!-- Add other fields as needed -->
                        </div>
                    `).join('');
                } else {
                    memberResultsDiv.innerHTML = '<p class="info-message">검색 결과가 없습니다.</p>';
                }
            } else {
                memberResultsDiv.innerHTML = '<p class="info-message">검색 결과가 없습니다.</p>';
            }
        } catch (error) {
            memberResultsDiv.innerHTML = `<p class="error-message">정보를 가져오는 중 오류가 발생했습니다: ${error.message}</p>`;
            console.error('API Error:', error);
        }
        */
    });
}
