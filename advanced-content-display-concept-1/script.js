// Advanced Content Display Concept JavaScript

// Helper: Create DOM element with optional class and text
function createElement(tag, className = '', textContent = '') {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (textContent) el.textContent = textContent;
    return el;
}

// Helper: Save current topic to lesson if it exists
function saveTopic(currentTopic, currentParagraphs, currentLesson) {
    if (currentTopic && currentParagraphs.length > 0) {
        currentTopic.paragraphs = currentParagraphs;
        currentLesson.topics.push(currentTopic);
    }
}

// Helper: Extract lesson ID and title from markdown line
function parseLessonTitle(line) {
    const lessonTitle = line.substring(3).trim();
    const lessonMatch = lessonTitle.match(/^Lesson (\d+):\s*(.+)$/);
    return {
        id: lessonMatch ? parseInt(lessonMatch[1]) : null,
        title: lessonMatch ? lessonMatch[2] : lessonTitle
    };
}

// MDX Parser: Converts MDX content to structured JSON
function parseMDXToJSON(mdxContent) {
    const lines = mdxContent.split('\n');
    const result = { title: '', lessons: [] };
    
    let currentLesson = null;
    let currentTopic = null;
    let currentParagraphs = [];
    
    lines.forEach(line => {
        const trimmed = line.trim();
        
        if (trimmed.startsWith('# ') && !trimmed.startsWith('##')) {
            result.title = trimmed.substring(2).trim();
        }
        else if (trimmed.startsWith('## ')) {
            // Save previous topic and lesson
            if (currentLesson) {
                saveTopic(currentTopic, currentParagraphs, currentLesson);
                result.lessons.push(currentLesson);
            }
            
            // Start new lesson
            const { id, title } = parseLessonTitle(trimmed);
            currentLesson = {
                id: id || result.lessons.length + 1,
                title,
                topics: []
            };
            currentTopic = null;
            currentParagraphs = [];
        }
        else if (trimmed.startsWith('### ')) {
            // Save previous topic
            if (currentLesson) {
                saveTopic(currentTopic, currentParagraphs, currentLesson);
            }
            
            // Start new topic
            currentTopic = {
                title: trimmed.substring(4).trim(),
                paragraphs: []
            };
            currentParagraphs = [];
        }
        else if (trimmed.length > 0 && currentTopic) {
            currentParagraphs.push(trimmed);
        }
    });
    
    // Save last topic and lesson
    if (currentLesson) {
        saveTopic(currentTopic, currentParagraphs, currentLesson);
        result.lessons.push(currentLesson);
    }
    
    return result;
}

// Render helper: Create and append topic section
function renderTopic(topic) {
    const topicSection = createElement('div', 'topic');
    topicSection.appendChild(createElement('h3', 'topic-title', topic.title));
    
    topic.paragraphs.forEach(paragraph => {
        topicSection.appendChild(createElement('p', 'topic-paragraph', paragraph));
    });
    
    return topicSection;
}

// Render helper: Create and append lesson section
function renderLesson(lesson) {
    const lessonSection = createElement('section', `lesson lesson-${lesson.id}`);
    lessonSection.setAttribute('data-lesson-id', lesson.id);
    
    lessonSection.appendChild(
        createElement('h2', 'lesson-title', `Lesson ${lesson.id}: ${lesson.title}`)
    );
    
    lesson.topics.forEach(topic => {
        lessonSection.appendChild(renderTopic(topic));
    });
    
    return lessonSection;
}

// Render JSON data to HTML
function renderContent(data) {
    const container = document.getElementById('content-container');
    if (!container) return;
    
    container.appendChild(createElement('h1', 'course-title', data.title));
    
    data.lessons.forEach(lesson => {
        container.appendChild(renderLesson(lesson));
    });
}

// Initialize: Load MDX, parse to JSON, and render
async function initialize() {
    try {
        const response = await fetch('content.mdx');
        if (!response.ok) throw new Error('Failed to load MDX file');
        
        const mdxContent = await response.text();
        const jsonData = parseMDXToJSON(mdxContent);
        
        console.log('Parsed JSON structure:', jsonData);
        renderContent(jsonData);
        window.courseData = jsonData;
        
    } catch (error) {
        console.error('Error initializing content:', error);
        const container = document.getElementById('content-container');
        if (container) {
            container.innerHTML = '<p class="error">Error loading content. Please check the console for details.</p>';
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Advanced Content Display Concept loaded');
    initialize();
});
