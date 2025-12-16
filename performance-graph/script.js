// Performance Graph Script

// Get colors from legend elements to ensure exact match
function initializeDisciplineColors() {
    const legendEla = document.querySelector('.legend-item[data-discipline="ela"] .legend-color');
    const legendMath = document.querySelector('.legend-item[data-discipline="math"] .legend-color');
    const legendScience = document.querySelector('.legend-item[data-discipline="science"] .legend-color');
    const legendSocial = document.querySelector('.legend-item[data-discipline="social"] .legend-color');
    const legendElectives = document.querySelector('.legend-item[data-discipline="electives"] .legend-color');
    
    if (legendEla) {
        const style = getComputedStyle(legendEla);
        disciplines.ela.color = style.backgroundColor;
    }
    if (legendMath) {
        const style = getComputedStyle(legendMath);
        disciplines.math.color = style.backgroundColor;
    }
    if (legendScience) {
        const style = getComputedStyle(legendScience);
        disciplines.science.color = style.backgroundColor;
    }
    if (legendSocial) {
        const style = getComputedStyle(legendSocial);
        disciplines.social.color = style.backgroundColor;
    }
    if (legendElectives) {
        const style = getComputedStyle(legendElectives);
        disciplines.electives.color = style.backgroundColor;
    }
}

// Fallback colors if CSS variables aren't available
const fallbackColors = {
    ela: '#db2777',    // pink-600
    math: '#65a30d',   // lime-600
    science: '#0284c7', // sky-600
    social: '#059669', // emerald-600
    electives: '#9333ea' // purple-600
};

const disciplines = {
    ela: { name: 'English Language Arts', color: fallbackColors.ela, max: 10 }, // fallback, will be updated
    math: { name: 'Mathematics', color: fallbackColors.math, max: 10 },
    science: { name: 'Science', color: fallbackColors.science, max: 10 },
    social: { name: 'Social Studies', color: fallbackColors.social, max: 10 },
    electives: { name: 'Electives', color: fallbackColors.electives, max: 10 }
};

let currentPeriod = 'daily';
let chartData = {};

// Generate sample data based on period
function generateData(period) {
    const data = {};
    const today = new Date();
    
    switch(period) {
        case 'daily':
            // Today only - single entry with all disciplines
            const todayKey = today.toISOString().split('T')[0];
            data[todayKey] = {};
            Object.keys(disciplines).forEach(discipline => {
                data[todayKey][discipline] = Math.floor(Math.random() * disciplines[discipline].max) + 1;
            });
            break;
        case 'weekly':
            // Monday through Friday (5 days) of current week
            const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
            const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1; // Convert Sunday to be 6 days from Monday
            const monday = new Date(today);
            monday.setDate(today.getDate() - daysFromMonday);
            
            const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
            const disciplineKeys = Object.keys(disciplines);
            for (let i = 0; i < 5; i++) {
                const day = new Date(monday);
                day.setDate(monday.getDate() + i);
                const dayKey = dayNames[i];
                data[dayKey] = {};
                disciplineKeys.forEach((discipline, discIndex) => {
                    const expected = disciplines[discipline].max;
                    if (i < 2) {
                        // Mon, Tue: fully completed
                        data[dayKey][discipline] = expected;
                    } else if (i === 2) {
                        // Wed: different heights for each discipline (varying between 30% and 80%)
                        const percentages = [0.6, 0.4, 0.7, 0.5, 0.3]; // Different percentages for each discipline
                        const percentage = percentages[discIndex] || 0.5;
                        data[dayKey][discipline] = Math.floor(expected * percentage);
                    } else {
                        // Thu, Fri: empty
                        data[dayKey][discipline] = 0;
                    }
                });
            }
            break;
        case 'monthly':
            // Last 4 weeks
            for (let i = 3; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(date.getDate() - (i * 7));
                const weekKey = `Week ${4 - i}`;
                const weekIndex = 4 - i; // 1, 2, 3, 4
                data[weekKey] = {};
                Object.keys(disciplines).forEach(discipline => {
                    const expected = disciplines[discipline].max * 5; // 5 days per week
                    if (weekIndex <= 2) {
                        // Week 1, 2: fully completed
                        data[weekKey][discipline] = expected;
                    } else if (weekIndex === 3) {
                        // Week 3: in progress (random between 30% and 70%)
                        const progress = Math.floor(expected * 0.3) + Math.floor(Math.random() * (expected * 0.4));
                        data[weekKey][discipline] = progress;
                    } else {
                        // Week 4: empty
                        data[weekKey][discipline] = 0;
                    }
                });
            }
            break;
        case 'yearly':
            // Last 12 months
            for (let i = 11; i >= 0; i--) {
                const date = new Date(today);
                date.setMonth(date.getMonth() - i);
                const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
                const monthIndex = 12 - i; // 1, 2, 3, ..., 12
                data[monthKey] = {};
                Object.keys(disciplines).forEach(discipline => {
                    const expected = disciplines[discipline].max * 20; // 20 assignments per month
                    if (monthIndex <= 4) {
                        // Months 1-4: fully completed
                        data[monthKey][discipline] = expected;
                    } else if (monthIndex === 5) {
                        // Month 5: in progress (random between 30% and 70%)
                        const progress = Math.floor(expected * 0.3) + Math.floor(Math.random() * (expected * 0.4));
                        data[monthKey][discipline] = progress;
                    } else {
                        // Months 6-12: empty
                        data[monthKey][discipline] = 0;
                    }
                });
            }
            break;
    }
    
    return data;
}

// Calculate on-track status
function calculateStatus(period, data) {
    const periods = Object.keys(data);
    if (periods.length === 0) return 'on-track';
    
    const latestPeriod = periods[periods.length - 1];
    const latestData = data[latestPeriod];
    
    // Calculate total completion
    const total = Object.values(latestData).reduce((sum, val) => sum + val, 0);
    const maxTotal = Object.values(disciplines).reduce((sum, d) => sum + d.max, 0);
    
    // Determine thresholds based on period
    let threshold;
    switch(period) {
        case 'daily':
            threshold = maxTotal * 0.6; // 60% for daily
            break;
        case 'weekly':
            threshold = maxTotal * 5 * 0.7; // 70% for 5 days
            break;
        case 'monthly':
            threshold = maxTotal * 5 * 4 * 0.75; // 75% for 4 weeks
            break;
        case 'yearly':
            threshold = maxTotal * 20 * 12 * 0.8; // 80% for 12 months
            break;
    }
    
    if (total >= threshold) {
        return 'on-track';
    } else if (total >= threshold * 0.7) {
        return 'at-risk';
    } else {
        return 'behind';
    }
}

// Get expected value for a discipline based on period
function getExpectedValue(discipline) {
    const max = disciplines[discipline].max;
    switch(currentPeriod) {
        case 'daily':
            return max;
        case 'weekly':
            return max; // Per day in weekly view
        case 'monthly':
            return max * 5; // Per week in monthly view
        case 'yearly':
            return max * 20; // Per month in yearly view
    }
}

// Render chart
function renderChart() {
    const svg = document.getElementById('chart');
    svg.innerHTML = '';
    
    const data = chartData[currentPeriod];
    const periods = Object.keys(data);
    if (periods.length === 0) return;
    
    const width = 1000;
    const height = 400;
    const padding = { top: 40, right: 40, bottom: 60, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    // Calculate max expected value for scaling (use expected values, not just completed)
    let maxValue = 0;
    Object.keys(disciplines).forEach(discipline => {
        const expected = getExpectedValue(discipline);
        maxValue = Math.max(maxValue, expected);
    });
    maxValue = Math.ceil(maxValue * 1.1); // Add 10% padding
    
    // Create groups
    const chartGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    chartGroup.setAttribute('transform', `translate(${padding.left}, ${padding.top})`);
    
    // Draw grid lines
    const gridLines = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    gridLines.setAttribute('class', 'grid-lines');
    for (let i = 0; i <= 5; i++) {
        const y = (chartHeight / 5) * i;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', 0);
        line.setAttribute('y1', y);
        line.setAttribute('x2', chartWidth);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', '#e5e7eb');
        line.setAttribute('stroke-width', '1');
        gridLines.appendChild(line);
        
        // Y-axis labels
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', -10);
        label.setAttribute('y', y + 4);
        label.setAttribute('text-anchor', 'end');
        label.setAttribute('font-size', '12');
        label.setAttribute('fill', '#6b7280');
        label.textContent = Math.round(maxValue - (maxValue / 5) * i);
        gridLines.appendChild(label);
    }
    chartGroup.appendChild(gridLines);
    
    // Draw bars
    const disciplineKeys = Object.keys(disciplines);
    
    if (currentPeriod === 'daily') {
        // Daily view: Show 5 bars side by side (one per discipline)
        const todayPeriod = periods[0];
        const todayData = data[todayPeriod];
        const barWidth = (chartWidth / disciplineKeys.length) * 0.6;
        const barSpacing = (chartWidth / disciplineKeys.length) * 0.4;
        
        disciplineKeys.forEach((discipline, discIndex) => {
            const value = todayData[discipline];
            const expected = getExpectedValue(discipline);
            const completedHeight = (value / maxValue) * chartHeight;
            const expectedHeight = (expected / maxValue) * chartHeight;
            const barX = (discIndex * (barWidth + barSpacing)) + (barSpacing / 2);
            
            // Calculate rounded corner radius (half of bar width for fully rounded ends)
            const cornerRadius = Math.min(barWidth / 2, 12);
            
            // Draw gray background bar (expected)
            const bgBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            bgBar.setAttribute('x', barX);
            bgBar.setAttribute('y', chartHeight - expectedHeight);
            bgBar.setAttribute('width', barWidth);
            bgBar.setAttribute('height', expectedHeight);
            bgBar.setAttribute('fill', '#e5e7eb'); // gray-200
            bgBar.setAttribute('rx', cornerRadius.toString());
            bgBar.setAttribute('ry', cornerRadius.toString());
            bgBar.setAttribute('class', 'chart-bar-bg');
            chartGroup.appendChild(bgBar);
            
            // Draw colored foreground bar (completed)
            const fgBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            fgBar.setAttribute('x', barX);
            fgBar.setAttribute('y', chartHeight - completedHeight);
            fgBar.setAttribute('width', barWidth);
            fgBar.setAttribute('height', completedHeight);
            fgBar.setAttribute('fill', disciplines[discipline].color);
            fgBar.setAttribute('rx', cornerRadius.toString());
            fgBar.setAttribute('ry', cornerRadius.toString());
            fgBar.setAttribute('class', 'chart-bar-fg');
            chartGroup.appendChild(fgBar);
            
            // Draw unfilled area (for tooltip hover)
            if (completedHeight < expectedHeight) {
                const unfilledArea = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                unfilledArea.setAttribute('x', barX);
                unfilledArea.setAttribute('y', chartHeight - expectedHeight);
                unfilledArea.setAttribute('width', barWidth);
                unfilledArea.setAttribute('height', expectedHeight - completedHeight);
                unfilledArea.setAttribute('fill', 'transparent');
                unfilledArea.setAttribute('class', 'chart-bar-unfilled');
                unfilledArea.setAttribute('data-discipline', discipline);
                unfilledArea.setAttribute('data-missing', expected - value);
                
                // Add tooltip on hover
                unfilledArea.addEventListener('mouseenter', function() {
                    const tooltip = document.getElementById('tooltip');
                    const missing = this.getAttribute('data-missing');
                    tooltip.textContent = `${missing} assignment${missing !== '1' ? 's' : ''} remaining`;
                    tooltip.classList.add('visible');
                });
                
                // Make tooltip follow cursor
                unfilledArea.addEventListener('mousemove', function(e) {
                    const tooltip = document.getElementById('tooltip');
                    if (!tooltip.classList.contains('visible')) return;
                    
                    const chartWrapper = svg.closest('.chart-wrapper');
                    const wrapperRect = chartWrapper.getBoundingClientRect();
                    
                    // Update tooltip position using CSS custom properties
                    tooltip.style.setProperty('--tooltip-x', `${e.clientX - wrapperRect.left}px`);
                    tooltip.style.setProperty('--tooltip-y', `${e.clientY - wrapperRect.top - 10}px`);
                });
                
                unfilledArea.addEventListener('mouseleave', function() {
                    const tooltip = document.getElementById('tooltip');
                    tooltip.classList.remove('visible');
                });
                
                // Add click handler to show modal
                unfilledArea.addEventListener('click', function() {
                    const discipline = this.getAttribute('data-discipline');
                    const missing = parseInt(this.getAttribute('data-missing'));
                    showAssignmentsModal(discipline, missing, null);
                });
                
                chartGroup.appendChild(unfilledArea);
            }
            
            // X-axis labels (discipline names)
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', barX + (barWidth / 2));
            label.setAttribute('y', chartHeight + 20);
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('font-size', '11');
            label.setAttribute('fill', '#6b7280');
            label.textContent = disciplines[discipline].name.split(' ')[0]; // Short name
            chartGroup.appendChild(label);
        });
    } else {
        // Weekly, Monthly, Yearly views: Show grouped bars across time periods
        const barWidth = chartWidth / periods.length;
        const barGroupWidth = barWidth * 0.8;
        const barSpacing = barWidth * 0.2;
        const barWidthPerDiscipline = barGroupWidth / disciplineKeys.length;
        
        periods.forEach((period, periodIndex) => {
            const x = (periodIndex * barWidth) + (barSpacing / 2);
            
            disciplineKeys.forEach((discipline, discIndex) => {
                const value = data[period][discipline];
                const expected = getExpectedValue(discipline);
                const completedHeight = (value / maxValue) * chartHeight;
                const expectedHeight = (expected / maxValue) * chartHeight;
                const barX = x + (discIndex * barWidthPerDiscipline);
                const barW = barWidthPerDiscipline - 2;
                
                // Calculate rounded corner radius (half of bar width for fully rounded ends)
                const cornerRadius = Math.min(barW / 2, 12);
                
                // Draw gray background bar (expected)
                const bgBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                bgBar.setAttribute('x', barX);
                bgBar.setAttribute('y', chartHeight - expectedHeight);
                bgBar.setAttribute('width', barW);
                bgBar.setAttribute('height', expectedHeight);
                bgBar.setAttribute('fill', '#e5e7eb'); // gray-200
                bgBar.setAttribute('rx', cornerRadius.toString());
                bgBar.setAttribute('ry', cornerRadius.toString());
                bgBar.setAttribute('class', 'chart-bar-bg');
                chartGroup.appendChild(bgBar);
                
                // Draw colored foreground bar (completed)
                const fgBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                fgBar.setAttribute('x', barX);
                fgBar.setAttribute('y', chartHeight - completedHeight);
                fgBar.setAttribute('width', barW);
                fgBar.setAttribute('height', completedHeight);
                fgBar.setAttribute('fill', disciplines[discipline].color);
                fgBar.setAttribute('rx', cornerRadius.toString());
                fgBar.setAttribute('ry', cornerRadius.toString());
                fgBar.setAttribute('class', 'chart-bar-fg');
                chartGroup.appendChild(fgBar);
                
                // Draw unfilled area (for tooltip hover)
                if (completedHeight < expectedHeight) {
                    const unfilledArea = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    unfilledArea.setAttribute('x', barX);
                    unfilledArea.setAttribute('y', chartHeight - expectedHeight);
                    unfilledArea.setAttribute('width', barW);
                    unfilledArea.setAttribute('height', expectedHeight - completedHeight);
                    unfilledArea.setAttribute('fill', 'transparent');
                    unfilledArea.setAttribute('class', 'chart-bar-unfilled');
                    unfilledArea.setAttribute('data-discipline', discipline);
                    unfilledArea.setAttribute('data-period', period);
                    unfilledArea.setAttribute('data-missing', expected - value);
                    
                    // Add tooltip on hover
                    unfilledArea.addEventListener('mouseenter', function() {
                        const tooltip = document.getElementById('tooltip');
                        const missing = this.getAttribute('data-missing');
                        const periodName = this.getAttribute('data-period');
                        tooltip.textContent = `${missing} assignment${missing !== '1' ? 's' : ''} remaining (${periodName})`;
                        tooltip.classList.add('visible');
                    });
                    
                    // Make tooltip follow cursor
                    unfilledArea.addEventListener('mousemove', function(e) {
                        const tooltip = document.getElementById('tooltip');
                        if (!tooltip.classList.contains('visible')) return;
                        
                        const chartWrapper = svg.closest('.chart-wrapper');
                        const wrapperRect = chartWrapper.getBoundingClientRect();
                        
                        // Update tooltip position using CSS custom properties
                        tooltip.style.setProperty('--tooltip-x', `${e.clientX - wrapperRect.left}px`);
                        tooltip.style.setProperty('--tooltip-y', `${e.clientY - wrapperRect.top - 10}px`);
                    });
                    
                    unfilledArea.addEventListener('mouseleave', function() {
                        const tooltip = document.getElementById('tooltip');
                        tooltip.classList.remove('visible');
                    });
                    
                    // Add click handler to show modal
                    unfilledArea.addEventListener('click', function() {
                        const discipline = this.getAttribute('data-discipline');
                        const period = this.getAttribute('data-period');
                        const missing = parseInt(this.getAttribute('data-missing'));
                        showAssignmentsModal(discipline, missing, period);
                    });
                    
                    chartGroup.appendChild(unfilledArea);
                }
            });
            
            // X-axis labels
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', x + (barGroupWidth / 2));
            label.setAttribute('y', chartHeight + 20);
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('font-size', '11');
            label.setAttribute('fill', '#6b7280');
            label.textContent = period;
            chartGroup.appendChild(label);
        });
    }
    
    svg.appendChild(chartGroup);
}

// Update stats cards
function updateStats() {
    const data = chartData[currentPeriod];
    const periods = Object.keys(data);
    if (periods.length === 0) return;
    
    // Get latest period data
    const latestPeriod = periods[periods.length - 1];
    const latestData = data[latestPeriod];
    
    // Calculate totals for current period
    const totals = {};
    Object.keys(disciplines).forEach(discipline => {
        if (currentPeriod === 'daily') {
            // Daily: just use today's value
            totals[discipline] = latestData[discipline];
        } else {
            // Other periods: sum across all periods
            totals[discipline] = periods.reduce((sum, period) => sum + data[period][discipline], 0);
        }
    });
    
    // Update each discipline
    Object.keys(disciplines).forEach(discipline => {
        const total = totals[discipline];
        const max = disciplines[discipline].max;
        let periodMax;
        
        switch(currentPeriod) {
            case 'daily':
                periodMax = max; // Daily max is just the discipline max
                break;
            case 'weekly':
                periodMax = max * 5; // 5 days
                break;
            case 'monthly':
                periodMax = max * 5 * 4; // 4 weeks
                break;
            case 'yearly':
                periodMax = max * 20 * 12; // 12 months
                break;
        }
        
        const percentage = Math.min(100, Math.round((total / periodMax) * 100));
        
        document.getElementById(`${discipline}Badge`).textContent = total;
        document.getElementById(`${discipline}Progress`).style.setProperty('--progress-width', `${percentage}%`);
        document.getElementById(`${discipline}Percent`).textContent = `${percentage}%`;
    });
}

// Update chart title and subtitle
function updateChartInfo() {
    const titles = {
        daily: "Today's Performance",
        weekly: "This Week's Performance",
        monthly: "This Month's Performance",
        yearly: "Needed to Graduate"
    };
    
    const subtitles = {
        daily: "Today's completed assignments and assessments",
        weekly: "Monday through Friday",
        monthly: "Last 4 weeks",
        yearly: "Last 12 months"
    };
    
    document.getElementById('chartTitle').textContent = titles[currentPeriod];
    document.getElementById('chartSubtitle').textContent = subtitles[currentPeriod];
    
    const xAxisLabels = {
        daily: "Disciplines",
        weekly: "Days",
        monthly: "Weeks",
        yearly: "Months"
    };
    
    document.getElementById('xAxisLabel').textContent = xAxisLabels[currentPeriod];
}

// Update status indicator
function updateStatus() {
    const data = chartData[currentPeriod];
    const status = calculateStatus(currentPeriod, data);
    const statusElement = document.getElementById('statusValue');
    
    statusElement.className = 'status-value';
    switch(status) {
        case 'on-track':
            statusElement.textContent = 'On Track';
            break;
        case 'at-risk':
            statusElement.textContent = 'At Risk';
            statusElement.classList.add('at-risk');
            break;
        case 'behind':
            statusElement.textContent = 'Behind';
            statusElement.classList.add('behind');
            break;
    }
}

// Initialize
function init() {
    // Initialize discipline colors from CSS variables
    initializeDisciplineColors();
    
    // Generate initial data
    chartData = {
        daily: generateData('daily'),
        weekly: generateData('weekly'),
        monthly: generateData('monthly'),
        yearly: generateData('yearly')
    };
    
    // Set up time period buttons
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentPeriod = this.dataset.period;
            renderChart();
            updateStats();
            updateChartInfo();
            updateStatus();
        });
    });
    
    // Initial render
    renderChart();
    updateStats();
    updateChartInfo();
    updateStatus();
}

// Generate sample assignments
function generateAssignments(discipline, count, period) {
    const assignments = [];
    const disciplineName = disciplines[discipline].name;
    const today = new Date();
    
    const assignmentTemplates = {
        ela: [
            { title: 'Reading Comprehension', desc: 'Read and analyze the assigned text, then answer comprehension questions.' },
            { title: 'Essay Writing', desc: 'Write a 500-word essay on the given topic with proper citations.' },
            { title: 'Grammar Exercise', desc: 'Complete the grammar worksheet focusing on sentence structure.' },
            { title: 'Vocabulary Quiz', desc: 'Study and prepare for the vocabulary quiz covering this week\'s words.' },
            { title: 'Literary Analysis', desc: 'Analyze the themes and literary devices in the assigned reading.' }
        ],
        math: [
            { title: 'Algebra Problems', desc: 'Solve 20 algebraic equations showing all work.' },
            { title: 'Geometry Worksheet', desc: 'Complete geometry problems on angles and shapes.' },
            { title: 'Statistics Project', desc: 'Collect data and create a statistical analysis report.' },
            { title: 'Calculus Practice', desc: 'Work through derivative and integral problems.' },
            { title: 'Word Problems', desc: 'Solve real-world math problems using equations.' }
        ],
        science: [
            { title: 'Lab Report', desc: 'Complete the lab report for the chemistry experiment.' },
            { title: 'Research Paper', desc: 'Write a research paper on a scientific topic of your choice.' },
            { title: 'Science Quiz', desc: 'Study for the upcoming quiz on biology concepts.' },
            { title: 'Experiment Design', desc: 'Design and document a scientific experiment.' },
            { title: 'Data Analysis', desc: 'Analyze experimental data and draw conclusions.' }
        ],
        social: [
            { title: 'History Essay', desc: 'Write an essay on a historical event and its impact.' },
            { title: 'Geography Project', desc: 'Create a presentation on a country\'s geography and culture.' },
            { title: 'Civics Assignment', desc: 'Research and present on a current political issue.' },
            { title: 'Timeline Creation', desc: 'Create a timeline of important historical events.' },
            { title: 'Document Analysis', desc: 'Analyze primary source documents from history.' }
        ],
        electives: [
            { title: 'Art Portfolio', desc: 'Create and submit 5 pieces for your art portfolio.' },
            { title: 'Music Theory', desc: 'Complete music theory exercises and notation practice.' },
            { title: 'PE Fitness Log', desc: 'Maintain a fitness log for the week with activities.' },
            { title: 'Foreign Language', desc: 'Practice vocabulary and complete conversation exercises.' },
            { title: 'Creative Project', desc: 'Work on your independent creative project.' }
        ]
    };
    
    const templates = assignmentTemplates[discipline] || assignmentTemplates.ela;
    
    for (let i = 0; i < count; i++) {
        const template = templates[i % templates.length];
        const dueDate = new Date(today);
        
        // Set due dates based on period
        if (period === null || currentPeriod === 'daily') {
            // Daily: due today or tomorrow
            dueDate.setDate(today.getDate() + (i % 2));
        } else if (currentPeriod === 'weekly') {
            // Weekly: spread across the week
            dueDate.setDate(today.getDate() + (i % 5));
        } else if (currentPeriod === 'monthly') {
            // Monthly: spread across 4 weeks
            dueDate.setDate(today.getDate() + (i * 7));
        } else if (currentPeriod === 'yearly') {
            // Yearly: spread across months
            dueDate.setMonth(today.getMonth() + (i % 12));
        }
        
        assignments.push({
            title: `${template.title} ${i + 1}`,
            description: template.desc,
            dueDate: dueDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
            })
        });
    }
    
    return assignments;
}

// Show assignments modal
function showAssignmentsModal(discipline, missing, period) {
    const modal = document.getElementById('assignmentsModal');
    const modalTitle = document.getElementById('modalTitle');
    const assignmentsList = document.getElementById('assignmentsList');
    
    // Determine how many assignments to show
    let assignmentCount = missing;
    if (currentPeriod === 'daily') {
        assignmentCount = Math.min(missing, 3); // Max 3 for daily
    } else if (currentPeriod === 'weekly') {
        assignmentCount = Math.min(missing, 5); // Max 5 for weekly
    } else if (currentPeriod === 'monthly') {
        assignmentCount = Math.min(missing, 8); // Max 8 for monthly
    } else if (currentPeriod === 'yearly') {
        assignmentCount = Math.min(missing, 10); // Max 10 for yearly
    }
    
    // Set modal title
    const disciplineName = disciplines[discipline].name;
    const periodText = period ? ` (${period})` : '';
    modalTitle.textContent = `${disciplineName}${periodText} - ${missing} Assignment${missing !== 1 ? 's' : ''} Remaining`;
    
    // Generate and display assignments
    const assignments = generateAssignments(discipline, assignmentCount, period);
    assignmentsList.innerHTML = '';
    
    assignments.forEach(assignment => {
        const item = document.createElement('div');
        item.className = 'assignment-item';
        item.innerHTML = `
            <div class="assignment-title">${assignment.title}</div>
            <div class="assignment-description">${assignment.description}</div>
            <div class="assignment-due-date">
                <i class="fas fa-calendar-alt"></i>
                <span>Due: ${assignment.dueDate}</span>
            </div>
        `;
        assignmentsList.appendChild(item);
    });
    
    // Show modal
    modal.classList.add('active');
}

// Close modal
function closeAssignmentsModal() {
    const modal = document.getElementById('assignmentsModal');
    modal.classList.remove('active');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Set up modal close handlers
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('assignmentsModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeAssignmentsModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeAssignmentsModal);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeAssignmentsModal();
        }
    });
});

