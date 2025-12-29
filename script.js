const holidays = {
    "2026-01-01": "신정",
    "2026-02-16": "설날 연휴",
    "2026-02-17": "설날",
    "2026-02-18": "설날 연휴",
    "2026-03-01": "삼일절",
    "2026-03-02": "대체공휴일 (삼일절)",
    "2026-05-05": "어린이날",
    "2026-05-24": "부처님오신날",
    "2026-05-25": "대체공휴일 (부처님오신날)",
    "2026-06-03": "지방선거일",
    "2026-06-06": "현충일",
    "2026-08-15": "광복절",
    "2026-08-17": "대체공휴일 (광복절)",
    "2026-09-23": "추석 연휴",
    "2026-09-24": "추석",
    "2026-09-25": "추석 연휴",
    "2026-10-03": "개천절",
    "2026-10-05": "대체공휴일 (개천절)",
    "2026-10-09": "한글날",
    "2026-12-25": "성탄절"
};

// 운동날짜.txt 기반 실제 데이터
const actualWorkouts = {
    0: [1, 4, 5, 7, 8, 11, 12, 14, 15, 18, 19, 21, 22, 25, 26, 28, 29],
    1: [1, 2, 4, 5, 8, 9, 11, 12, 18, 19, 22, 23, 25, 26],
    2: [4, 5, 8, 9, 11, 12, 15, 16, 18, 19, 22, 23, 25, 26, 29, 30],
    3: [1, 2, 5, 6, 8, 9, 12, 13, 15, 16, 19, 20, 22, 23, 26, 27, 29, 30],
    4: [3, 4, 6, 7, 10, 11, 13, 14, 17, 18, 20, 21, 24, 25, 27, 28, 31],
    5: [1, 3, 4, 7, 8, 10, 11, 14, 15, 17, 18, 21, 22, 24, 25, 28, 29],
    6: [1, 2, 5, 6, 8, 9, 12, 13, 15, 16, 19, 20, 22, 23, 26, 27, 29, 30],
    7: [2, 3, 5, 6, 9, 10, 12, 13, 16, 17, 19, 20, 23, 24, 26, 27, 30, 31],
    8: [2, 3, 6, 7, 9, 10, 13, 14, 16, 17, 20, 21, 23, 27, 28, 30],
    9: [1, 4, 5, 7, 8, 11, 12, 14, 15, 18, 19, 21, 22, 25, 26, 28, 29],
    10: [1, 2, 4, 5, 8, 9, 11, 12, 15, 16, 18, 19, 22, 23, 25, 26, 29, 30],
    11: [2, 3, 6, 7, 9, 10, 13, 14, 16, 17, 20, 21, 23, 24, 27, 28, 31]
};

const events = {
    "2026-03-14": "부천시의회 의장기 배드민턴대회",
    "2026-03-15": "부천시의회 의장기 배드민턴대회",
    "2026-05-09": "부천시협회장기 배드민턴대회",
    "2026-05-10": "부천시협회장기 배드민턴대회",
    "2026-08-29": "부천시 판타지아 전국대회",
    "2026-08-30": "부천시 판타지아 전국대회",
    "2026-10-24": "부천시장기 배드민턴대회",
    "2026-10-25": "부천시장기 배드민턴대회"
};

const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

const calendarGrid = document.getElementById('calendar-grid');
const tooltip = document.getElementById('tooltip');

function generateCalendar(year) {
    calendarGrid.innerHTML = '';
    for (let month = 0; month < 12; month++) {
        const monthCard = document.createElement('div');
        monthCard.className = 'month-card';

        const monthHeader = document.createElement('div');
        monthHeader.className = 'month-name';
        monthHeader.textContent = monthNames[month];
        monthCard.appendChild(monthHeader);

        const table = document.createElement('table');
        table.className = 'calendar-table';

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        dayNames.forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let date = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                if (i === 0 && j < firstDay) {
                } else if (date > daysInMonth) {
                } else {
                    const dayDiv = document.createElement('div');
                    dayDiv.className = 'day active';
                    dayDiv.textContent = date;

                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                    const isHoliday = holidays[dateStr];
                    const isWorkout = actualWorkouts[month].includes(date);
                    const isEvent = events[dateStr];

                    if (j === 0) dayDiv.classList.add('sun');
                    if (j === 6) dayDiv.classList.add('sat');

                    let tooltips = [];
                    if (isEvent) {
                        dayDiv.classList.add('event');
                        tooltips.push(`🏆 ${isEvent}`);
                    }
                    if (isWorkout) {
                        const timeStr = j === 0 ? "14:00~17:00" : "18:00~21:00";
                        if (isHoliday) {
                            dayDiv.classList.add('overlap');
                            tooltips.push(`🏸 운동(${timeStr})`);
                        } else {
                            dayDiv.classList.add('workout');
                            tooltips.push(`🏸 운동 (${timeStr})`);
                        }
                    }
                    if (isHoliday) {
                        dayDiv.classList.add('holiday');
                        tooltips.push(isHoliday);
                    }

                    if (tooltips.length > 0) {
                        addTooltipListener(dayDiv, tooltips.join(' & '));
                    }

                    cell.appendChild(dayDiv);
                    date++;
                }
                row.appendChild(cell);
            }
            tbody.appendChild(row);
            if (date > daysInMonth) break;
        }
        table.appendChild(tbody);
        monthCard.appendChild(table);

        // 월별 대회 일정 추가
        const monthEvents = [];
        const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`;

        // 해당 월의 행사만 필터링
        const items = Object.keys(events).filter(d => d.startsWith(monthPrefix)).sort();

        // 중복 행사명 합치기 (예: 14일, 15일 같은 대회면 14~15일로 표시)
        const groupedEvents = [];
        items.forEach(dateStr => {
            const title = events[dateStr];
            const day = parseInt(dateStr.split('-')[2]);
            const existing = groupedEvents.find(e => e.title === title);
            if (existing) {
                existing.days.push(day);
            } else {
                groupedEvents.push({ title, days: [day] });
            }
        });

        if (groupedEvents.length > 0) {
            const eventList = document.createElement('div');
            eventList.className = 'month-events-list';

            groupedEvents.forEach(e => {
                const item = document.createElement('div');
                item.className = 'month-event-item';

                const dayRange = e.days.length > 1
                    ? `${Math.min(...e.days)}~${Math.max(...e.days)}`
                    : `${e.days[0]}`;

                item.innerHTML = `
                    <span class="month-event-date-badge">${dayRange}일</span>
                    <span class="month-event-title">${e.title}</span>
                `;
                eventList.appendChild(item);
            });
            monthCard.appendChild(eventList);
        }

        calendarGrid.appendChild(monthCard);
    }
}

function addTooltipListener(element, text) {
    element.addEventListener('mouseenter', (e) => {
        tooltip.textContent = text;
        tooltip.style.opacity = '1';
    });
    element.addEventListener('mousemove', (e) => {
        tooltip.style.left = e.pageX + 10 + 'px';
        tooltip.style.top = e.pageY + 10 + 'px';
    });
    element.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
    });
}

generateCalendar(2026);
