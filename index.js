if (window.location.protocol === 'file:') {
  window.location.href = 'http://localhost:8080';
}

import './style.css';
import './cards.js';
import './moves.js';
import './interactions.js';
import { initializeGame } from './game.js';

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    
    // Add click handler for new game button
    const newGameButton = document.getElementById('new-game-button');
    if (newGameButton) {
        newGameButton.addEventListener('click', () => {
            initializeGame();
        });
    }
});
