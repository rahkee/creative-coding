// Homeschool Dashboard JavaScript

// Sample data
const sampleData = {
    children: [
        { id: 1, name: 'Emma', avatar: '👧' },
        { id: 2, name: 'Lucas', avatar: '👦' },
        { id: 3, name: 'Sophia', avatar: '👧' }
    ],
    days: [
        { id: 'mon', label: 'Mon', fullName: 'Monday' },
        { id: 'tue', label: 'Tue', fullName: 'Tuesday' },
        { id: 'wed', label: 'Wed', fullName: 'Wednesday' },
        { id: 'thu', label: 'Thu', fullName: 'Thursday' },
        { id: 'fri', label: 'Fri', fullName: 'Friday' },
        { id: 'sat', label: 'Sat', fullName: 'Saturday' },
        { id: 'sun', label: 'Sun', fullName: 'Sunday' }
    ],
    tasks: {
        mon: [
            { id: 1, title: 'Math: Chapter 5 Review', subject: 'Mathematics', completed: false, priority: 'high' },
            { id: 2, title: 'Science: Lab Report', subject: 'Science', completed: false, priority: 'medium' },
            { id: 3, title: 'Reading: Chapter 3-4', subject: 'English', completed: true, priority: 'low' },
            { id: 4, title: 'History: Essay Draft', subject: 'History', completed: false, priority: 'high' }
        ],
        tue: [
            { id: 5, title: 'Math: Problem Set 6', subject: 'Mathematics', completed: false, priority: 'high' },
            { id: 6, title: 'Science: Quiz Preparation', subject: 'Science', completed: false, priority: 'medium' },
            { id: 7, title: 'Art: Project Sketch', subject: 'Art', completed: false, priority: 'low' }
        ],
        wed: [
            { id: 8, title: 'Math: Chapter 6 Introduction', subject: 'Mathematics', completed: false, priority: 'high' },
            { id: 9, title: 'Science: Experiment Setup', subject: 'Science', completed: false, priority: 'medium' },
            { id: 10, title: 'Reading: Book Report', subject: 'English', completed: false, priority: 'high' }
        ],
        thu: [
            { id: 11, title: 'Math: Practice Problems', subject: 'Mathematics', completed: false, priority: 'medium' },
            { id: 12, title: 'Science: Data Analysis', subject: 'Science', completed: false, priority: 'high' },
            { id: 13, title: 'History: Research Project', subject: 'History', completed: false, priority: 'medium' }
        ],
        fri: [
            { id: 14, title: 'Math: Weekly Test', subject: 'Mathematics', completed: false, priority: 'high' },
            { id: 15, title: 'Science: Final Report', subject: 'Science', completed: false, priority: 'high' },
            { id: 16, title: 'Reading: Vocabulary Quiz', subject: 'English', completed: false, priority: 'medium' }
        ],
        sat: [],
        sun: []
    }
};

// State management
let state = {
    selectedChild: sampleData.children[0],
    selectedDay: getCurrentDay(),
    tasks: sampleData.tasks
};

// Helper functions
function getCurrentDay() {
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return days[new Date().getDay()];
}

function createElement(tag, className = '', textContent = '') {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (textContent) el.textContent = textContent;
    return el;
}

// ChildSelector Component
class ChildSelector {
    constructor(container, children, onSelect) {
        this.container = container;
        this.children = children;
        this.onSelect = onSelect;
        this.render();
    }

    render() {
        this.container.innerHTML = '';
        const selector = createElement('div', 'child-selector');
        
        const label = createElement('label', 'child-selector-label', 'Student:');
        selector.appendChild(label);

        const dropdown = createElement('select', 'child-selector-dropdown');
        dropdown.addEventListener('change', (e) => {
            const selectedChild = this.children.find(c => c.id === parseInt(e.target.value));
            this.onSelect(selectedChild);
        });

        this.children.forEach(child => {
            const option = createElement('option', '', child.name);
            option.value = child.id;
            if (child.id === state.selectedChild.id) {
                option.selected = true;
            }
            dropdown.appendChild(option);
        });

        selector.appendChild(dropdown);
        this.container.appendChild(selector);
    }
}

// DaySelector Component
class DaySelector {
    constructor(container, days, selectedDay, onSelect) {
        this.container = container;
        this.days = days;
        this.selectedDay = selectedDay;
        this.onSelect = onSelect;
        this.render();
    }

    render() {
        this.container.innerHTML = '';
        const selector = createElement('div', 'day-selector');
        
        const title = createElement('h3', 'day-selector-title', 'Select Day');
        selector.appendChild(title);

        const dayList = createElement('div', 'day-selector-list');
        
        this.days.forEach(day => {
            const dayButton = createElement('button', `day-button ${day.id === this.selectedDay ? 'active' : ''}`);
            dayButton.setAttribute('data-day', day.id);
            dayButton.textContent = day.label;
            dayButton.title = day.fullName;
            
            dayButton.addEventListener('click', () => {
                this.onSelect(day.id);
            });
            
            dayList.appendChild(dayButton);
        });

        selector.appendChild(dayList);
        this.container.appendChild(selector);
    }

    updateSelected(dayId) {
        this.selectedDay = dayId;
        const buttons = this.container.querySelectorAll('.day-button');
        buttons.forEach(btn => {
            if (btn.getAttribute('data-day') === dayId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}

// TaskItem Component
class TaskItem {
    constructor(task, onToggle) {
        this.task = task;
        this.onToggle = onToggle;
        this.element = this.render();
    }

    render() {
        const item = createElement('div', `task-item ${this.task.completed ? 'completed' : ''} priority-${this.task.priority}`);
        
        const checkbox = createElement('input', 'task-checkbox');
        checkbox.type = 'checkbox';
        checkbox.checked = this.task.completed;
        checkbox.addEventListener('change', () => {
            this.onToggle(this.task.id);
        });

        const content = createElement('div', 'task-content');
        
        const title = createElement('h4', 'task-title', this.task.title);
        content.appendChild(title);

        const meta = createElement('div', 'task-meta');
        const subject = createElement('span', 'task-subject', this.task.subject);
        const priority = createElement('span', `task-priority priority-${this.task.priority}`, this.task.priority);
        meta.appendChild(subject);
        meta.appendChild(priority);
        content.appendChild(meta);

        item.appendChild(checkbox);
        item.appendChild(content);

        return item;
    }

    update(updatedTask) {
        this.task = updatedTask;
        this.element.className = `task-item ${this.task.completed ? 'completed' : ''} priority-${this.task.priority}`;
        this.element.querySelector('.task-checkbox').checked = this.task.completed;
    }
}

// TaskList Component
class TaskList {
    constructor(container, tasks, onToggle) {
        this.container = container;
        this.tasks = tasks;
        this.onToggle = onToggle;
        this.taskItems = [];
        this.render();
    }

    render() {
        this.container.innerHTML = '';
        this.taskItems = [];

        if (this.tasks.length === 0) {
            const emptyState = createElement('div', 'task-list-empty');
            emptyState.textContent = 'No tasks for this day. Enjoy your free time!';
            this.container.appendChild(emptyState);
            return;
        }

        const list = createElement('div', 'task-list');
        
        this.tasks.forEach(task => {
            const taskItem = new TaskItem(task, this.onToggle);
            this.taskItems.push(taskItem);
            list.appendChild(taskItem.element);
        });

        this.container.appendChild(list);
    }

    update(tasks) {
        this.tasks = tasks;
        this.render();
    }
}

// AIAssistant Component
class AIAssistant {
    constructor(container) {
        this.container = container;
        this.isOpen = false;
        this.render();
    }

    render() {
        this.container.innerHTML = '';
        
        const assistant = createElement('div', 'ai-assistant');
        
        const header = createElement('div', 'ai-assistant-header');
        const title = createElement('h3', 'ai-assistant-title', 'AI Assistant');
        const toggleButton = createElement('button', 'ai-assistant-toggle', '💬');
        toggleButton.addEventListener('click', () => this.toggle());
        header.appendChild(title);
        header.appendChild(toggleButton);
        
        const content = createElement('div', `ai-assistant-content ${this.isOpen ? 'open' : ''}`);
        
        const messages = createElement('div', 'ai-assistant-messages');
        const welcomeMessage = createElement('div', 'ai-message ai-message-assistant');
        welcomeMessage.textContent = "Hello! I'm here to help with your homeschooling. Ask me anything about your tasks, schedule, or learning materials.";
        messages.appendChild(welcomeMessage);
        
        const inputContainer = createElement('div', 'ai-assistant-input-container');
        const input = createElement('input', 'ai-assistant-input');
        input.type = 'text';
        input.placeholder = 'Ask a question...';
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && input.value.trim()) {
                this.handleMessage(input.value.trim());
                input.value = '';
            }
        });
        const sendButton = createElement('button', 'ai-assistant-send', 'Send');
        sendButton.addEventListener('click', () => {
            if (input.value.trim()) {
                this.handleMessage(input.value.trim());
                input.value = '';
            }
        });
        inputContainer.appendChild(input);
        inputContainer.appendChild(sendButton);
        
        content.appendChild(messages);
        content.appendChild(inputContainer);
        
        assistant.appendChild(header);
        assistant.appendChild(content);
        
        this.container.appendChild(assistant);
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const content = this.container.querySelector('.ai-assistant-content');
        if (content) {
            content.classList.toggle('open', this.isOpen);
        }
    }

    handleMessage(message) {
        const messages = this.container.querySelector('.ai-assistant-messages');
        if (!messages) return;

        // User message
        const userMessage = createElement('div', 'ai-message ai-message-user');
        userMessage.textContent = message;
        messages.appendChild(userMessage);

        // Simulate AI response
        setTimeout(() => {
            const aiMessage = createElement('div', 'ai-message ai-message-assistant');
            aiMessage.textContent = this.generateResponse(message);
            messages.appendChild(aiMessage);
            messages.scrollTop = messages.scrollHeight;
        }, 500);

        messages.scrollTop = messages.scrollHeight;
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('task') || lowerMessage.includes('homework')) {
            const taskCount = state.tasks[state.selectedDay]?.length || 0;
            return `You have ${taskCount} task${taskCount !== 1 ? 's' : ''} scheduled for ${sampleData.days.find(d => d.id === state.selectedDay)?.fullName || 'today'}. Would you like help prioritizing them?`;
        } else if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
            return "I can help you with organizing your tasks, answering questions about your subjects, and providing study tips. What would you like to know?";
        } else if (lowerMessage.includes('schedule') || lowerMessage.includes('time')) {
            return "I can help you plan your schedule. What subjects are you working on today?";
        } else {
            return "That's a great question! I'm here to help with your homeschooling journey. Can you tell me more about what you need assistance with?";
        }
    }
}

// Initialize dashboard
function initializeDashboard() {
    // Initialize ChildSelector
    const childSelectorContainer = document.getElementById('child-selector-container');
    const childSelector = new ChildSelector(
        childSelectorContainer,
        sampleData.children,
        (child) => {
            state.selectedChild = child;
            console.log('Selected child:', child.name);
        }
    );

    // Initialize DaySelector
    const daySelectorContainer = document.getElementById('day-selector-container');
    const daySelector = new DaySelector(
        daySelectorContainer,
        sampleData.days,
        state.selectedDay,
        (dayId) => {
            state.selectedDay = dayId;
            daySelector.updateSelected(dayId);
            taskList.update(state.tasks[dayId] || []);
        }
    );

    // Initialize TaskList
    const taskListContainer = document.getElementById('task-list-container');
    const taskList = new TaskList(
        taskListContainer,
        state.tasks[state.selectedDay] || [],
        (taskId) => {
            const dayTasks = state.tasks[state.selectedDay];
            const task = dayTasks.find(t => t.id === taskId);
            if (task) {
                task.completed = !task.completed;
                taskList.update(dayTasks);
            }
        }
    );

    // Initialize AIAssistant
    const aiAssistantContainer = document.getElementById('ai-assistant-container');
    const aiAssistant = new AIAssistant(aiAssistantContainer);

    // Make taskList accessible for updates
    window.taskList = taskList;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Homeschool Dashboard loaded');
    initializeDashboard();
});
