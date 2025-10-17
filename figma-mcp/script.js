/**
 * Assessment Interactive Component
 * Handles checkbox selection, answer checking, and feedback display
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Assessment loaded successfully');

    // Get all interactive elements
    const optionItems = document.querySelectorAll('.option-item');
    const checkAnswerBtn = document.querySelector('.btn-primary');
    const feedbackCorrect = document.querySelector('.feedback-correct');
    const feedbackIncorrect = document.querySelector('.feedback-incorrect');

    // Track selected options (for multiple choice - can select multiple)
    const selectedOptions = new Set();

    // Define correct answers (for demo purposes)
    const correctAnswers = new Set([4]); // Option 4 is correct

    /**
     * Toggle checkbox selection
     */
    function toggleOption(optionElement) {
        const optionNumber = parseInt(optionElement.dataset.option);
        
        // Don't allow toggling if answer has been checked
        if (optionElement.classList.contains('option-correct') || 
            optionElement.classList.contains('option-incorrect')) {
            return;
        }

        const checkbox = optionElement.querySelector('.checkbox');
        const checkboxFill = optionElement.querySelector('.checkbox-fill');

        if (selectedOptions.has(optionNumber)) {
            // Deselect
            selectedOptions.delete(optionNumber);
            checkbox.classList.remove('checkbox-checked');
            optionElement.classList.remove('option-selected');
            
            // Remove fill if it exists
            if (checkboxFill) {
                checkboxFill.remove();
            }
        } else {
            // Select
            selectedOptions.add(optionNumber);
            checkbox.classList.add('checkbox-checked');
            optionElement.classList.add('option-selected');
            
            // Add fill
            const fill = document.createElement('div');
            fill.className = 'checkbox-fill';
            checkbox.appendChild(fill);
        }
    }

    /**
     * Check answers and show feedback
     */
    function checkAnswers() {
        let isCorrect = true;

        // Check each selected option
        optionItems.forEach(optionElement => {
            const optionNumber = parseInt(optionElement.dataset.option);
            
            // Skip already-marked correct/incorrect options (from demo)
            if (optionElement.classList.contains('option-correct') || 
                optionElement.classList.contains('option-incorrect')) {
                return;
            }

            const isSelected = selectedOptions.has(optionNumber);
            const shouldBeSelected = correctAnswers.has(optionNumber);

            if (isSelected) {
                if (shouldBeSelected) {
                    // Correct selection
                    markAsCorrect(optionElement);
                } else {
                    // Incorrect selection
                    markAsIncorrect(optionElement);
                    isCorrect = false;
                }
            } else if (shouldBeSelected) {
                // Should have been selected but wasn't
                isCorrect = false;
            }
        });

        // Show appropriate feedback
        if (isCorrect && selectedOptions.size > 0) {
            showFeedback('correct');
        } else {
            showFeedback('incorrect');
        }

        // Disable check button after checking
        checkAnswerBtn.disabled = true;
        checkAnswerBtn.style.opacity = '0.6';
        checkAnswerBtn.style.cursor = 'not-allowed';
    }

    /**
     * Mark an option as correct
     */
    function markAsCorrect(optionElement) {
        optionElement.classList.remove('option-selected');
        optionElement.classList.add('option-correct');
        
        // Add indicator
        const indicator = optionElement.querySelector('.option-indicator');
        indicator.classList.add('option-indicator-correct');
        indicator.innerHTML = '<i class="fa-solid fa-check"></i>';
    }

    /**
     * Mark an option as incorrect
     */
    function markAsIncorrect(optionElement) {
        optionElement.classList.remove('option-selected');
        optionElement.classList.add('option-incorrect');
        
        // Add indicator
        const indicator = optionElement.querySelector('.option-indicator');
        indicator.classList.add('option-indicator-incorrect');
        indicator.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }

    /**
     * Show feedback section
     */
    function showFeedback(type) {
        if (type === 'correct') {
            feedbackCorrect.style.display = 'flex';
            feedbackIncorrect.style.display = 'none';
        } else {
            feedbackCorrect.style.display = 'none';
            feedbackIncorrect.style.display = 'flex';
        }

        // Scroll to feedback
        setTimeout(() => {
            feedbackCorrect.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    /**
     * Hide feedback sections initially
     */
    function initializeFeedback() {
        feedbackCorrect.style.display = 'none';
        feedbackIncorrect.style.display = 'none';
    }

    // Event Listeners
    optionItems.forEach(option => {
        // Only add click listener to options without correct/incorrect classes (demo states)
        if (!option.classList.contains('option-correct') && 
            !option.classList.contains('option-incorrect')) {
            option.addEventListener('click', () => toggleOption(option));
        }
    });

    checkAnswerBtn.addEventListener('click', checkAnswers);

    // Initialize
    initializeFeedback();

    // Audio button functionality
    const audioBtn = document.querySelector('.audio-btn');
    audioBtn.addEventListener('click', () => {
        console.log('Audio button clicked - play question audio');
        // Implement audio playback here
        audioBtn.classList.add('playing');
        setTimeout(() => {
            audioBtn.classList.remove('playing');
        }, 1000);
    });

    // Menu button functionality
    const menuBtn = document.querySelector('.menu-btn');
    menuBtn.addEventListener('click', () => {
        console.log('Menu button clicked - show options');
        // Implement menu display here
    });

    // Navigation button functionality
    const prevBtn = document.querySelector('.navigation-footer .btn-secondary:first-child');
    const nextBtn = document.querySelector('.btn-dark');
    const questionDropdown = document.querySelector('.navigation-footer .btn-secondary:nth-child(2)');

    prevBtn.addEventListener('click', () => {
        console.log('Previous question');
        // Implement navigation
    });

    nextBtn.addEventListener('click', () => {
        console.log('Next question');
        // Implement navigation
    });

    questionDropdown.addEventListener('click', () => {
        console.log('Show question dropdown');
        // Implement dropdown
    });

    console.log('✓ All event listeners initialized');

    // =========================
    // Matching List Functionality
    // =========================
    
    const matchingListContainer = document.querySelector('.matching-list-container');
    
    if (matchingListContainer) {
        console.log('Matching list detected - initializing drag and drop');
        initMatchingList();
    }
});

/**
 * Initialize Matching List Drag & Drop
 */
function initMatchingList() {
    const answerTiles = document.querySelectorAll('.answer-tile[draggable="true"]');
    const dropzones = document.querySelectorAll('.match-dropzone:not(.match-dropzone-filled):not(.match-dropzone-correct):not(.match-dropzone-incorrect)');
    const checkAnswerBtn = document.querySelector('.btn-primary');
    const feedbackGeneric = document.querySelector('.feedback-generic');
    
    let draggedElement = null;
    let dropzoneAnswers = {}; // Track which answer is in which dropzone

    // Define correct matches (for demo purposes)
    const correctMatches = {
        '1': 'answer-1', // Social Security -> answer 1
        '2': 'answer-2', // Second prompt -> answer 2
        '3': 'answer-3', // WPA -> answer 3
    };

    /**
     * Drag Start Handler
     */
    function handleDragStart(e) {
        draggedElement = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
        
        console.log('Drag started:', this.dataset.answer);
    }

    /**
     * Drag End Handler
     */
    function handleDragEnd(e) {
        this.classList.remove('dragging');
        draggedElement = null;
        
        // Remove hover states from all dropzones
        dropzones.forEach(zone => {
            zone.classList.remove('match-dropzone-hover');
        });
    }

    /**
     * Drag Over Handler (for dropzone)
     */
    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault(); // Allows us to drop
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    /**
     * Drag Enter Handler (for dropzone)
     */
    function handleDragEnter(e) {
        this.classList.add('match-dropzone-hover');
    }

    /**
     * Drag Leave Handler (for dropzone)
     */
    function handleDragLeave(e) {
        this.classList.remove('match-dropzone-hover');
    }

    /**
     * Drop Handler (for dropzone)
     */
    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation(); // Stops browser redirect
        }

        this.classList.remove('match-dropzone-hover');

        if (draggedElement && draggedElement !== this) {
            const dropzoneId = this.dataset.dropzone;
            const answerId = draggedElement.dataset.answer;
            
            // Check if dropzone already has an answer
            if (dropzoneAnswers[dropzoneId]) {
                // Return old answer to pool
                const oldAnswerTile = document.querySelector(`[data-answer="${dropzoneAnswers[dropzoneId]}"]`);
                if (oldAnswerTile && oldAnswerTile.parentElement.classList.contains('match-dropzone')) {
                    returnToPool(oldAnswerTile);
                }
            }

            // Place new answer in dropzone
            placeAnswerInDropzone(draggedElement.cloneNode(true), this, answerId);
            
            // Track the answer placement
            dropzoneAnswers[dropzoneId] = answerId;
            
            // Remove from pool
            draggedElement.remove();
            
            console.log('Dropped answer', answerId, 'into dropzone', dropzoneId);
        }

        return false;
    }

    /**
     * Place answer tile in dropzone
     */
    function placeAnswerInDropzone(answerClone, dropzone, answerId) {
        // Clear dropzone
        dropzone.innerHTML = '';
        
        // Update dropzone styling
        dropzone.classList.add('match-dropzone-filled');
        dropzone.classList.remove('match-dropzone-hover');
        
        // Update answer tile styling
        answerClone.classList.add('answer-tile-placed');
        answerClone.removeAttribute('draggable');
        answerClone.dataset.answer = answerId;
        
        // Add click to return to pool
        answerClone.addEventListener('click', () => {
            returnToPool(answerClone);
            delete dropzoneAnswers[dropzone.dataset.dropzone];
            resetDropzone(dropzone);
        });
        
        // Add to dropzone
        dropzone.appendChild(answerClone);
        
        // Update match row styling
        const matchRow = dropzone.closest('.match-row');
        if (matchRow) {
            matchRow.classList.add('match-answered');
            
            const prompt = matchRow.querySelector('.match-prompt');
            const connector = matchRow.querySelector('.match-connector');
            
            if (prompt) prompt.classList.add('match-prompt-answered');
            if (connector) connector.classList.add('match-connector-answered');
        }
    }

    /**
     * Return answer tile to pool
     */
    function returnToPool(answerTile) {
        const answerPool = document.querySelector('.answer-pool');
        const newTile = document.createElement('div');
        newTile.className = 'answer-tile';
        newTile.draggable = true;
        newTile.dataset.answer = answerTile.dataset.answer;
        newTile.innerHTML = answerTile.innerHTML;
        
        // Re-add drag handlers
        newTile.addEventListener('dragstart', handleDragStart);
        newTile.addEventListener('dragend', handleDragEnd);
        
        answerPool.appendChild(newTile);
    }

    /**
     * Reset dropzone to empty state
     */
    function resetDropzone(dropzone) {
        dropzone.innerHTML = `
            <i class="fa-light fa-circle-down"></i>
            <p class="dropzone-placeholder">Drag your answer here...</p>
        `;
        dropzone.classList.remove('match-dropzone-filled', 'match-dropzone-correct', 'match-dropzone-incorrect');
        
        const matchRow = dropzone.closest('.match-row');
        if (matchRow) {
            matchRow.classList.remove('match-answered', 'match-correct', 'match-incorrect');
            
            const prompt = matchRow.querySelector('.match-prompt');
            const connector = matchRow.querySelector('.match-connector');
            
            if (prompt) prompt.classList.remove('match-prompt-answered');
            if (connector) connector.classList.remove('match-connector-answered');
        }
    }

    /**
     * Check answers for matching list
     */
    function checkMatchingAnswers() {
        let allCorrect = true;
        
        Object.keys(dropzoneAnswers).forEach(dropzoneId => {
            const answerId = dropzoneAnswers[dropzoneId];
            const dropzone = document.querySelector(`[data-dropzone="${dropzoneId}"]`);
            const matchRow = dropzone.closest('.match-row');
            const answerTile = dropzone.querySelector('.answer-tile');
            
            // Check if correct (simplified logic for demo)
            const isCorrect = Math.random() > 0.5; // Random for demo - replace with real logic
            
            if (isCorrect) {
                markMatchAsCorrect(dropzone, matchRow, answerTile);
            } else {
                markMatchAsIncorrect(dropzone, matchRow, answerTile);
                allCorrect = false;
            }
        });
        
        // Show feedback
        if (feedbackGeneric) {
            feedbackGeneric.style.display = 'flex';
            setTimeout(() => {
                feedbackGeneric.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
        
        // Disable check button
        checkAnswerBtn.disabled = true;
        checkAnswerBtn.style.opacity = '0.6';
        checkAnswerBtn.style.cursor = 'not-allowed';
        
        console.log('Matching answers checked:', allCorrect ? 'All correct!' : 'Some incorrect');
    }

    /**
     * Mark match as correct
     */
    function markMatchAsCorrect(dropzone, matchRow, answerTile) {
        dropzone.classList.remove('match-dropzone-filled');
        dropzone.classList.add('match-dropzone-correct');
        matchRow.classList.add('match-correct');
        
        if (answerTile) {
            answerTile.classList.remove('answer-tile-placed');
            answerTile.classList.add('answer-tile-correct');
            
            // Replace grip icon with check icon
            const icon = answerTile.querySelector('i');
            if (icon) {
                icon.className = 'fa-solid fa-circle-check';
            }
        }
    }

    /**
     * Mark match as incorrect
     */
    function markMatchAsIncorrect(dropzone, matchRow, answerTile) {
        dropzone.classList.remove('match-dropzone-filled');
        dropzone.classList.add('match-dropzone-incorrect');
        matchRow.classList.add('match-incorrect');
        
        if (answerTile) {
            answerTile.classList.remove('answer-tile-placed');
            answerTile.classList.add('answer-tile-incorrect');
            
            // Replace grip icon with X icon
            const icon = answerTile.querySelector('i');
            if (icon) {
                icon.className = 'fa-solid fa-circle-xmark';
            }
        }
    }

    // Add drag event listeners to answer tiles
    answerTiles.forEach(tile => {
        tile.addEventListener('dragstart', handleDragStart);
        tile.addEventListener('dragend', handleDragEnd);
    });

    // Add drop event listeners to dropzones
    dropzones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragenter', handleDragEnter);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });

    // Check answer button for matching list
    if (checkAnswerBtn) {
        checkAnswerBtn.addEventListener('click', checkMatchingAnswers);
    }

    // Hide feedback initially
    if (feedbackGeneric) {
        feedbackGeneric.style.display = 'none';
    }

    console.log('✓ Drag and drop initialized');
    console.log('  - Answer tiles:', answerTiles.length);
    console.log('  - Dropzones:', dropzones.length);
}

