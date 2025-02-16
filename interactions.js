// interactions.js
import { moveCard, isValidMove, getRankValue, isOppositeColor } from "./moves.js";

// Helper function to return cards to their original position
function returnCardsToOriginalPosition(cards, sourcePile) {
  cards.forEach(c => {
    c.classList.remove('dragging');
    c.style.position = 'absolute';
    c.style.left = '50%';
    c.style.transform = 'translateX(-50%)';
    c.style.zIndex = '';
    c.style.pointerEvents = 'auto';
    c.style.cursor = 'grab';
    c.style.transition = 'all 0.2s ease-in-out';
    
    // Re-add event listeners
    c.removeEventListener('dragstart', handleDragStart);
    c.removeEventListener('dragend', handleDragEnd);
    c.removeEventListener('mousedown', handleMouseDown);
    c.addEventListener('dragstart', handleDragStart);
    c.addEventListener('dragend', handleDragEnd);
    c.addEventListener('mousedown', handleMouseDown);
    
    // Ensure draggable state is correct
    if (sourcePile.id === 'waste') {
      const pileCards = Array.from(sourcePile.children);
      c.draggable = c === pileCards[pileCards.length - 1];
    } else {
      c.draggable = !c.classList.contains('face-down');
    }
  });
}

function createCardElement(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  if (!card.isFaceUp) {
    cardElement.classList.add("face-down");
  }
  cardElement.dataset.suit = card.suit;
  cardElement.dataset.rank = card.display.rank;
  cardElement.dataset.symbol = card.display.suit;
  cardElement.draggable = card.isFaceUp;

  // Create rank and suit displays
  const topDisplay = document.createElement("div");
  topDisplay.textContent = `${card.display.rank}${card.display.suit}`;
  topDisplay.classList.add("card-top");

  const centerDisplay = document.createElement("div");
  centerDisplay.textContent = card.display.suit;
  centerDisplay.classList.add("card-center");

  const bottomDisplay = document.createElement("div");
  bottomDisplay.textContent = `${card.display.rank}${card.display.suit}`;
  bottomDisplay.classList.add("card-bottom");

  cardElement.appendChild(topDisplay);
  cardElement.appendChild(centerDisplay);
  cardElement.appendChild(bottomDisplay);

  return cardElement;
}

// Fallback method to find the closest element
function findClosest(element, selector) {
  if (!element) return null;
  
  // Cross-browser compatible matches method
  function elementMatches(el, sel) {
    if (el.matches) return el.matches(sel);
    if (el.webkitMatchesSelector) return el.webkitMatchesSelector(sel);
    if (el.msMatchesSelector) return el.msMatchesSelector(sel);
    if (el.mozMatchesSelector) return el.mozMatchesSelector(sel);
    
    // Fallback to manual check if no native method exists
    const matches = document.querySelectorAll(sel);
    return Array.from(matches).includes(el);
  }

  while (element && !elementMatches(element, selector)) {
    element = element.parentElement;
  }
  return element;
}

function handleMouseDown(event) {
  // Prevent event from being handled multiple times
  event.preventDefault();
  event.stopPropagation();

  // If there's already a card being dragged, ignore new mousedown events
  if (document.querySelector('.card.dragging')) {
    return;
  }

  const card = findClosest(event.target, '.card');
  if (!card) return;

  // Get all cards in the pile
  const pile = findClosest(card, '.tableau-pile, .foundation-pile, #stock, #waste');
  if (!pile) return;

  // Get all cards in the pile
  const cards = Array.from(pile.children);
  const cardIndex = cards.indexOf(card);
  
  // Check if we're clicking on a face-down card
  if (card.classList.contains('face-down')) {
    return;
  }

  // Handle stock pile clicks
  if (pile.id === 'stock') {
    // Let the click event handle stock pile interactions
    return;
  }

  // Only allow dragging visible cards from waste pile
  if (pile.id === 'waste') {
    const cards = Array.from(pile.children);
    const lastThreeStartIndex = Math.max(0, cards.length - 3);
    const lastThreeCards = cards.slice(lastThreeStartIndex);
    
    // Only allow dragging if it's the top visible card
    if (!lastThreeCards.includes(card) || card !== cards[cards.length - 1]) {
      return;
    }
    
    // Ensure the card is properly set up for dragging
    card.draggable = true;
    card.style.cursor = 'grab';
  }

  // For tableau piles, ensure we can only drag face-up cards and their sequences
  if (pile.classList.contains('tableau-pile')) {
    // Find the first face-up card in the sequence
    let firstFaceUpIndex = cards.findIndex(c => !c.classList.contains('face-down'));
    if (cardIndex < firstFaceUpIndex) {
      return; // Clicked on a face-down card
    }
  }

  // Remove any existing dragging classes and reset styles
  document.querySelectorAll('.card').forEach(c => {
    c.classList.remove('dragging');
    c.style.position = 'absolute';
    c.style.left = '50%';
    c.style.transform = 'translateX(-50%)';
    c.style.zIndex = '';
    c.style.pointerEvents = 'auto';
  });

  // Store initial click offset and source pile
  const rect = card.getBoundingClientRect();
  const gameContainer = document.getElementById('game-container');
  const containerRect = gameContainer.getBoundingClientRect();
  
  // Calculate offset relative to the game container
  card.dataset.offsetX = event.clientX - (rect.left - containerRect.left);
  card.dataset.offsetY = event.clientY - (rect.top - containerRect.top);
  card.dataset.sourcePileId = pile.id;
  card.dataset.sourcePileType = pile.classList.contains('tableau-pile') ? 'tableau' : 
                               pile.classList.contains('foundation-pile') ? 'foundation' : 
                               pile.id;
  
  // Add dragging class for visual feedback
  card.classList.add('dragging');
  
  // If dragging from tableau, add dragging class to sequence
  if (pile.classList.contains('tableau-pile')) {
    let current = card;
    let offset = 0;
    while (current) {
      current.classList.add('dragging');
      current.style.zIndex = (2000 + offset).toString();
      current.style.transform = 'none';
      current.style.top = `${offset * 35}px`;
      current.draggable = true;  // Make sure all cards in sequence are draggable
      offset++;
      current = current.nextElementSibling;
    }
  } else if (pile.id === 'waste') {
    // For waste pile, only drag the single card
    card.style.zIndex = '2000';
    card.style.transform = 'none';
    card.style.top = '0';
    card.draggable = true;
    card.style.cursor = 'grab';
    
    // Ensure event listeners are properly set up
    card.removeEventListener('dragstart', handleDragStart);
    card.removeEventListener('dragend', handleDragEnd);
    card.removeEventListener('mousedown', handleMouseDown);
    addCardEventListeners(card);
    card.addEventListener('mousedown', handleMouseDown);
  }
  
  // Add mousemove and mouseup listeners
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
}

function handleMouseMove(event) {
  const card = document.querySelector('.card.dragging');
  if (!card) return;

  // Get the game container for relative positioning
  const gameContainer = document.getElementById('game-container');
  if (!gameContainer) return;
  
  const containerRect = gameContainer.getBoundingClientRect();
  
  // Calculate the new position relative to the mouse cursor
  const offsetX = parseInt(card.dataset.offsetX) || 0;
  const offsetY = parseInt(card.dataset.offsetY) || 0;
  
  // Get all cards being dragged (only from the clicked card's pile)
  const sourcePile = findClosest(card, '.tableau-pile, .foundation-pile, #stock, #waste');
  if (!sourcePile) return;
  
  const draggingCards = [];
  if (sourcePile.classList.contains('tableau-pile')) {
    // For tableau piles, include all cards from clicked card to end
    let current = card;
    while (current && current.parentElement === sourcePile) {
      if (current.classList.contains('dragging')) {
        draggingCards.push(current);
      }
      current = current.nextElementSibling;
    }
  } else {
    // For other piles, just include the clicked card
    if (card.classList.contains('dragging')) {
      draggingCards.push(card);
    }
  }
  
  // Calculate base position relative to the game container
  const baseX = event.clientX - containerRect.left - offsetX;
  const baseY = event.clientY - containerRect.top - offsetY;
  
  // Update positions of dragged cards
  draggingCards.forEach((dragCard, index) => {
    dragCard.style.position = 'absolute';
    dragCard.style.left = `${baseX}px`;
    dragCard.style.top = `${baseY + (index * 35)}px`;
    dragCard.style.transform = 'none';
    dragCard.style.zIndex = (2000 + index).toString();
    dragCard.style.pointerEvents = 'none';
    dragCard.style.visibility = 'visible';
    dragCard.style.transition = 'none'; // Disable transitions during drag
    dragCard.style.cursor = 'grabbing';
  });

  // Reset any cards that shouldn't be dragging
  document.querySelectorAll('.card.dragging').forEach(c => {
    if (!draggingCards.includes(c)) {
      c.classList.remove('dragging');
      c.style.position = 'absolute';
      c.style.left = '50%';
      c.style.transform = 'translateX(-50%)';
      c.style.zIndex = '';
      c.style.pointerEvents = 'auto';
      c.style.cursor = 'grab';
    }
  });

  // Check for valid drop targets
  const dropTarget = document.elementFromPoint(event.clientX, event.clientY);
  if (dropTarget) {
    // Find all potential destination piles at these coordinates
    const piles = document.querySelectorAll('.tableau-pile, .foundation-pile');
    let foundValidTarget = false;
    
    // Remove existing highlights
    piles.forEach(p => p.classList.remove('valid-target', 'invalid-target'));
    
    // Check each pile to see if the mouse is over it
    piles.forEach(pile => {
      const rect = pile.getBoundingClientRect();
      if (event.clientX >= rect.left && event.clientX <= rect.right &&
          event.clientY >= rect.top && event.clientY <= rect.bottom) {
        
        // For foundation piles, only check the pile itself
        if (pile.classList.contains('foundation-pile')) {
          const isValid = isValidMove(card, pile, null);
          pile.classList.add(isValid ? 'valid-target' : 'invalid-target');
          if (isValid) foundValidTarget = true;
        } else {
          // For tableau piles, check with the destination card
          const destinationCard = findClosest(dropTarget, '.card:not(.dragging)');
          const isValid = isValidMove(card, pile, destinationCard);
          pile.classList.add(isValid ? 'valid-target' : 'invalid-target');
          if (isValid) foundValidTarget = true;
        }
      }
    });
  }
}

function handleMouseUp(event) {
  const card = document.querySelector('.card.dragging');
  if (!card) return;

  // Get the source pile
  const sourcePile = findClosest(card, '.tableau-pile, .foundation-pile, #stock, #waste');
  if (!sourcePile) {
    // Reset all cards if source pile not found
    document.querySelectorAll('.card').forEach(c => {
      c.classList.remove('dragging');
      c.style.position = 'absolute';
      c.style.left = '50%';
      c.style.transform = 'translateX(-50%)';
      c.style.zIndex = '';
      c.style.pointerEvents = 'auto';
      c.style.cursor = 'grab';
      c.style.transition = 'all 0.2s ease-in-out';
    });
    return;
  }

  // Get all dragging cards from the source pile
  const draggingCards = [];
  let current = card;
  while (current && current.parentElement === sourcePile && current.classList.contains('dragging')) {
    draggingCards.push(current);
    current = current.nextElementSibling;
  }
  
  // Get the game container for relative positioning
  const gameContainer = document.getElementById('game-container');
  if (!gameContainer) {
    draggingCards.forEach(c => {
      c.classList.remove('dragging');
      c.style.position = 'absolute';
      c.style.left = '50%';
      c.style.transform = 'translateX(-50%)';
      c.style.zIndex = '';
      c.style.pointerEvents = 'auto';
    });
    return;
  }
  
  const containerRect = gameContainer.getBoundingClientRect();
  
  // Temporarily hide dragged cards to find drop target
  draggingCards.forEach(c => c.style.visibility = 'hidden');
  const dropTarget = document.elementFromPoint(event.clientX, event.clientY);
  draggingCards.forEach(c => c.style.visibility = 'visible');

  // Find potential destination pile
  let destinationPile = null;
  const piles = document.querySelectorAll('.tableau-pile, .foundation-pile');
  piles.forEach(pile => {
    const rect = pile.getBoundingClientRect();
    if (event.clientX >= rect.left && event.clientX <= rect.right &&
        event.clientY >= rect.top && event.clientY <= rect.bottom) {
      destinationPile = pile;
    }
  });

  if (destinationPile) {
    const destinationCard = findClosest(dropTarget, '.card:not(.dragging)');
    // For foundation piles, only pass the pile
    const moveResult = destinationPile.classList.contains('foundation-pile') ?
      moveCard(card, destinationPile, null) :
      moveCard(card, destinationPile, destinationCard);

    if (moveResult) {
      // Remove dragging class from all cards before the move
      draggingCards.forEach(c => {
        c.classList.remove('dragging');
        c.style.position = 'absolute';
        c.style.left = '50%';
        c.style.transform = 'translateX(-50%)';
        c.style.transition = 'all 0.2s ease-in-out';
      });

      // Mark that a move was made
      window.gameStateHistory.movesMade = true;
      // Get the original source pile
      const sourcePileId = card.dataset.sourcePileId;
      const sourcePile = document.getElementById(sourcePileId);
      
      // Update the source pile after the move
      if (sourcePile && sourcePile.classList.contains('tableau-pile')) {
        // Get the new last card in the source pile
        const lastCard = sourcePile.lastElementChild;
        if (lastCard && lastCard.classList.contains('face-down')) {
          // Reveal the card
          lastCard.classList.remove('face-down');
          lastCard.draggable = true;
          
          // Update the card's display
          const suit = lastCard.dataset.suit;
          const rank = lastCard.dataset.rank;
          const symbol = lastCard.dataset.symbol;
          
          lastCard.querySelector('.card-top').textContent = `${rank}${symbol}`;
          lastCard.querySelector('.card-center').textContent = symbol;
          lastCard.querySelector('.card-bottom').textContent = `${rank}${symbol}`;
          
          // Add event listeners to the newly revealed card
          lastCard.addEventListener('dragstart', handleDragStart);
          lastCard.addEventListener('dragend', handleDragEnd);
          lastCard.addEventListener('mousedown', handleMouseDown);
        }

        // Update pile height
        let totalHeight = 180; // Base height
        Array.from(sourcePile.children).forEach((c, i) => {
          if (i > 0) { // Skip first card
            totalHeight += c.classList.contains('face-down') ? 25 : 35;
          }
        });
        sourcePile.style.minHeight = `${totalHeight}px`;
      }

      // Update destination pile
      if (destinationPile.classList.contains('tableau-pile')) {
        let totalHeight = 180; // Base height
        Array.from(destinationPile.children).forEach((c, i) => {
          if (i > 0) { // Skip first card
            totalHeight += c.classList.contains('face-down') ? 25 : 35;
          }
        });
        destinationPile.style.minHeight = `${totalHeight}px`;
      }
    } else {
      // Return cards to original position
      returnCardsToOriginalPosition(draggingCards, sourcePile);
    }
  } else {
    // No valid destination pile found, return cards to original position
    returnCardsToOriginalPosition(draggingCards, sourcePile);
  }

  // Reset and update all piles
  document.querySelectorAll('.tableau-pile, .foundation-pile, #stock, #waste').forEach(pile => {
    const cards = Array.from(pile.children);
    
    // Reset card styles for non-dragging cards
    cards.forEach((c, index) => {
      if (!c.classList.contains('dragging')) {
        c.style.transform = 'translateX(-50%)';
        c.style.position = 'absolute';
        c.style.left = '50%';
        c.style.opacity = '1';
        c.style.pointerEvents = 'auto';
        c.style.visibility = 'visible';
        c.style.zIndex = (index + 1).toString();
        c.style.cursor = 'grab';

        // Set draggable state and position based on pile type
        if (pile.classList.contains('tableau-pile')) {
          c.draggable = !c.classList.contains('face-down');
          const spacing = c.classList.contains('face-down') ? 25 : 35;
          c.style.top = `${index * spacing}px`;
        } else if (pile.id === 'waste') {
          // For waste pile, show last 3 cards with proper stacking
          const lastThreeStart = Math.max(0, cards.length - 3);
          const relativeIndex = index - lastThreeStart;
          if (index >= lastThreeStart) {
            c.style.visibility = 'visible';
            c.style.top = `${relativeIndex * 35}px`;
            c.style.zIndex = (index + 1).toString();
            c.draggable = index === cards.length - 1;
          } else {
            c.style.visibility = 'hidden';
            c.draggable = false;
          }
        } else if (pile.classList.contains('foundation-pile')) {
          c.draggable = index === cards.length - 1;
          c.style.top = '0';
          c.style.visibility = index === cards.length - 1 ? 'visible' : 'hidden';
        } else {
          c.draggable = false;
          c.style.top = '0';
        }
      }
    });

    // Update pile heights for tableau piles
    if (pile.classList.contains('tableau-pile')) {
      let totalHeight = 180; // Base height
      cards.forEach((c, i) => {
        if (i > 0) { // Skip first card
          totalHeight += c.classList.contains('face-down') ? 25 : 35;
        }
      });
      pile.style.minHeight = `${totalHeight}px`;
    }
  });

  // Remove pile highlights
  document.querySelectorAll('.tableau-pile, .foundation-pile').forEach(pile => {
    pile.classList.remove('valid-target', 'invalid-target');
  });

  // Remove event listeners
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
}

function handleDragStart(event) {
  event.preventDefault(); // Prevent default drag behavior, we're using our own
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event) {
  event.preventDefault();
}

function handleDragLeave(event) {
  const pile = findClosest(event.target, '.tableau-pile, .foundation-pile');
  if (pile) {
    pile.classList.remove('valid-target', 'invalid-target');
  }
}

function handleDragEnd(event) {
  // Reset all cards
  document.querySelectorAll('.card').forEach(c => {
    c.classList.remove('dragging');
    c.style.transform = 'translateX(-50%)';
    c.style.position = 'absolute';
    c.style.visibility = 'visible';
    c.style.opacity = '1';
    c.style.pointerEvents = 'auto';
    c.draggable = !c.classList.contains('face-down');
  });

  // Remove pile highlights
  document.querySelectorAll('.tableau-pile, .foundation-pile').forEach(pile => {
    pile.classList.remove('valid-target', 'invalid-target');
  });
}

export {
  createCardElement,
  handleMouseDown,
  handleDragStart,
  handleDrop,
  handleDragOver,
  handleDragLeave,
  handleDragEnd
};
