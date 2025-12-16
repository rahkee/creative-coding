// Performance Graph Script

const disciplines = {
    ela: { name: 'English Language Arts', color: '#3b82f6', max: 10 },
    math: { name: 'Mathematics', color: '#10b981', max: 10 },
    science: { name: 'Science', color: '#f59e0b', max: 10 },
    social: { name: 'Social Studies', color: '#8b5cf6', max: 10 },
    electives: { name: 'Electives', color: '#ec4899', max: 10 }
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
            for (let i = 0; i < 5; i++) {
                const day = new Date(monday);
                day.setDate(monday.getDate() + i);
                const dayKey = dayNames[i];
                data[dayKey] = {};
                Object.keys(disciplines).forEach(discipline => {
                    data[dayKey][discipline] = Math.floor(Math.random() * disciplines[discipline].max) + 1;
                });
            }
            break;
        case 'monthly':
            // Last 4 weeks
            for (let i = 3; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(date.getDate() - (i * 7));
                const weekKey = `Week ${4 - i}`;
                data[weekKey] = {};
                Object.keys(disciplines).forEach(discipline => {
                    data[weekKey][discipline] = Math.floor(Math.random() * (disciplines[discipline].max * 5)) + 5;
                });
            }
            break;
        case 'yearly':
            // Last 12 months
            for (let i = 11; i >= 0; i--) {
                const date = new Date(today);
                date.setMonth(date.getMonth() - i);
                const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
                data[monthKey] = {};
                Object.keys(disciplines).forEach(discipline => {
                    data[monthKey][discipline] = Math.floor(Math.random() * (disciplines[discipline].max * 20)) + 10;
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
    
    // Calculate max value for scaling
    let maxValue = 0;
    periods.forEach(period => {
        Object.values(data[period]).forEach(val => {
            maxValue = Math.max(maxValue, val);
        });
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
            const barHeight = (value / maxValue) * chartHeight;
            const barX = (discIndex * (barWidth + barSpacing)) + (barSpacing / 2);
            
            const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            bar.setAttribute('x', barX);
            bar.setAttribute('y', chartHeight - barHeight);
            bar.setAttribute('width', barWidth);
            bar.setAttribute('height', barHeight);
            bar.setAttribute('fill', disciplines[discipline].color);
            bar.setAttribute('rx', '2');
            bar.setAttribute('class', 'chart-bar');
            bar.setAttribute('data-discipline', discipline);
            bar.setAttribute('data-value', value);
            
            // Add hover effect
            bar.addEventListener('mouseenter', function() {
                this.style.opacity = '0.8';
            });
            bar.addEventListener('mouseleave', function() {
                this.style.opacity = '1';
            });
            
            chartGroup.appendChild(bar);
            
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
                const barHeight = (value / maxValue) * chartHeight;
                const barX = x + (discIndex * barWidthPerDiscipline);
                
                const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                bar.setAttribute('x', barX);
                bar.setAttribute('y', chartHeight - barHeight);
                bar.setAttribute('width', barWidthPerDiscipline - 2);
                bar.setAttribute('height', barHeight);
                bar.setAttribute('fill', disciplines[discipline].color);
                bar.setAttribute('rx', '2');
                bar.setAttribute('class', 'chart-bar');
                bar.setAttribute('data-discipline', discipline);
                bar.setAttribute('data-value', value);
                
                // Add hover effect
                bar.addEventListener('mouseenter', function() {
                    this.style.opacity = '0.8';
                });
                bar.addEventListener('mouseleave', function() {
                    this.style.opacity = '1';
                });
                
                chartGroup.appendChild(bar);
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
        document.getElementById(`${discipline}Progress`).style.width = `${percentage}%`;
        document.getElementById(`${discipline}Percent`).textContent = `${percentage}%`;
    });
}

// Update chart title and subtitle
function updateChartInfo() {
    const titles = {
        daily: "Today's Performance",
        weekly: "This Week's Performance",
        monthly: "This Month's Performance",
        yearly: "This Year's Performance"
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

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

