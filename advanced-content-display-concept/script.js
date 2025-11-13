// Advanced Content Display Concept JavaScript

// MDX Parser: Converts MDX content to structured JSON
function parseMDXToJSON(mdxContent) {
    const lines = mdxContent.split('\n');
    const result = {
        title: '',
        lessons: []
    };
    
    let currentLesson = null;
    let currentTopic = null;
    let currentParagraphs = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Parse H1 - Course Title
        if (line.startsWith('# ') && !line.startsWith('##')) {
            result.title = line.substring(2).trim();
        }
        // Parse H2 - Lesson
        else if (line.startsWith('## ')) {
            // Save previous topic if exists
            if (currentTopic && currentParagraphs.length > 0) {
                currentTopic.paragraphs = currentParagraphs;
                currentLesson.topics.push(currentTopic);
                currentParagraphs = [];
            }
            
            // Save previous lesson if exists
            if (currentLesson) {
                result.lessons.push(currentLesson);
            }
            
            // Start new lesson
            const lessonTitle = line.substring(3).trim();
            const lessonMatch = lessonTitle.match(/^Lesson (\d+):\s*(.+)$/);
            currentLesson = {
                id: lessonMatch ? parseInt(lessonMatch[1]) : result.lessons.length + 1,
                title: lessonMatch ? lessonMatch[2] : lessonTitle,
                topics: []
            };
            currentTopic = null;
        }
        // Parse H3 - Topic
        else if (line.startsWith('### ')) {
            // Save previous topic if exists
            if (currentTopic && currentParagraphs.length > 0) {
                currentTopic.paragraphs = currentParagraphs;
                currentLesson.topics.push(currentTopic);
                currentParagraphs = [];
            }
            
            // Start new topic
            currentTopic = {
                title: line.substring(4).trim(),
                paragraphs: []
            };
        }
        // Parse paragraphs
        else if (line.length > 0 && currentTopic) {
            currentParagraphs.push(line);
        }
    }
    
    // Save last topic and lesson
    if (currentTopic && currentParagraphs.length > 0) {
        currentTopic.paragraphs = currentParagraphs;
        if (currentLesson) {
            currentLesson.topics.push(currentTopic);
        }
    }
    if (currentLesson) {
        result.lessons.push(currentLesson);
    }
    
    return result;
}

// Render JSON data to HTML
function renderContent(data) {
    const container = document.getElementById('content-container');
    if (!container) return;
    
    // Render course title
    const titleEl = document.createElement('h1');
    titleEl.className = 'course-title';
    titleEl.textContent = data.title;
    container.appendChild(titleEl);
    
    // Render lessons
    data.lessons.forEach(lesson => {
        const lessonSection = document.createElement('section');
        lessonSection.className = `lesson lesson-${lesson.id}`;
        lessonSection.setAttribute('data-lesson-id', lesson.id);
        
        const lessonHeader = document.createElement('h2');
        lessonHeader.className = 'lesson-title';
        lessonHeader.textContent = `Lesson ${lesson.id}: ${lesson.title}`;
        lessonSection.appendChild(lessonHeader);
        
        // Render topics
        lesson.topics.forEach(topic => {
            const topicSection = document.createElement('div');
            topicSection.className = 'topic';
            
            const topicHeader = document.createElement('h3');
            topicHeader.className = 'topic-title';
            topicHeader.textContent = topic.title;
            topicSection.appendChild(topicHeader);
            
            // Render paragraphs
            topic.paragraphs.forEach(paragraph => {
                const p = document.createElement('p');
                p.className = 'topic-paragraph';
                p.textContent = paragraph;
                topicSection.appendChild(p);
            });
            
            lessonSection.appendChild(topicSection);
        });
        
        container.appendChild(lessonSection);
    });
}

// Initialize: Load MDX, parse to JSON, and render
async function initialize() {
    try {
        // Fetch MDX content
        const response = await fetch('content.mdx');
        if (!response.ok) {
            throw new Error('Failed to load MDX file');
        }
        
        const mdxContent = await response.text();
        
        // Parse MDX to JSON
        const jsonData = parseMDXToJSON(mdxContent);
        
        // Update data.json (for reference, in a real app you might save this)
        console.log('Parsed JSON structure:', jsonData);
        
        // Render content
        renderContent(jsonData);
        
        // Optionally, you can also save the JSON structure
        // This would typically be done server-side, but for demo purposes:
        window.courseData = jsonData;
        
    } catch (error) {
        console.error('Error initializing content:', error);
        document.getElementById('content-container').innerHTML = 
            '<p class="error">Error loading content. Please check the console for details.</p>';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Advanced Content Display Concept loaded');
    initialize();
});
