/**
 * game.js
 * Core game logic for Klondike Solitaire implementation
 * 
 * This file is responsible for:
 * - Game initialization and setup
 * - Game state management through DOM
 * - Win/loss condition detection
 * - Pile operations (stock, waste, foundation, tableau)
 * - Game loop and state tracking
 * 
 * Design decisions:
 * - Uses DOM for state management to avoid sync issues
 * - Implements event-based interaction system
 * - Provides real-time visual feedback
 * - Handles race conditions in stock pile operations
 */
import { createDeck, shuffleDeck } from "./cards.js";
import { moveCard, isValidMove } from "./moves.js";
import { createCardElement, handleDragStart, handleDrop, handleDragOver, handleDragLeave, handleDragEnd, handleMouseDown } from "./interactions.js";

/**
 * Adds standard drag event listeners to a card element
 * Used for both initial setup and dynamically created cards
 * @param {HTMLElement} card - The card element to add listeners to
 */
function addCardEventListeners(card) {
    card.addEventListener("dragstart", handleDragStart);
    card.addEventListener("dragend", handleDragEnd);
}

/**
 * Represents a pile of cards in the game
 * Handles card stacking, visual layout, and pile-specific behaviors
 * 
 * Key features:
 * - Maintains DOM synchronization
 * - Handles card positioning and stacking
 * - Manages pile-specific visual states
 */
class Pile {
    /**
     * Creates a new pile with specified name and container
     * @param {string} name - Unique identifier for the pile
     * @param {HTMLElement} container - Parent element for the pile
     */
    constructor(name, container) {
        this.name = name;
        this.cards = [];
        this.pileElement = document.createElement('div');
        this.pileElement.classList.add('pile');
        this.pileElement.id = name;
        container.appendChild(this.pileElement);
    }

    /**
     * Adds a card to the pile with proper positioning and styling
     * Handles special cases for foundation and tableau piles
     * @param {HTMLElement} card - The card element to add
     */
    addCard(card) {
        // Remove the card from its previous parent if it exists
        if (card.parentElement) {
            card.parentElement.removeChild(card);
        }
        
        // Special handling for foundation piles
        if (this.pileElement.classList.contains('foundation-pile')) {
            // Hide all cards except the top one
            Array.from(this.pileElement.children).forEach(existingCard => {
                existingCard.style.visibility = 'hidden';
            });
            // Position new card at the top
            card.style.position = 'absolute';
            card.style.left = '0';
            card.style.top = '0';
            card.style.visibility = 'visible';
            card.style.width = 'calc(100% - 8px)';
            card.style.height = 'calc(100% - 8px)';
            card.style.margin = '4px';
            card.style.zIndex = this.cards.length + 1;
        } else if (this.pileElement.classList.contains('tableau-pile')) {
            // For tableau piles, maintain proper stacking
            const currentCards = Array.from(this.pileElement.children);
            card.style.position = 'absolute';
            card.style.left = '50%';
            card.style.transform = 'translateX(-50%)';
            // More spacing for face-up cards
            const spacing = card.classList.contains('face-down') ? 25 : 35;
            card.style.top = `${currentCards.length * spacing}px`;
            card.style.zIndex = currentCards.length + 1;
            card.style.visibility = 'visible';
            card.style.width = 'calc(100% - 8px)';
            card.style.margin = '4px';
            
            // Update positions of existing cards to ensure proper spacing
            currentCards.forEach((existingCard, index) => {
                const cardSpacing = existingCard.classList.contains('face-down') ? 25 : 35;
                existingCard.style.top = `${index * cardSpacing}px`;
                existingCard.style.zIndex = index + 1;
                existingCard.style.visibility = 'visible';
            });
        }
        
        // Sync the cards array with DOM
        this.cards = Array.from(this.pileElement.children);
        this.pileElement.appendChild(card);
        this.cards.push(card);
        
        // Update pile height for tableau piles
        if (this.pileElement.classList.contains('tableau-pile')) {
            let totalHeight = 180; // Base height
            this.cards.forEach((c, i) => {
                if (i > 0) { // Skip first card
                    totalHeight += c.classList.contains('face-down') ? 25 : 35;
                }
            });
            this.pileElement.style.minHeight = `${totalHeight}px`;
        }
    }

    /**
     * Removes and returns the top card from the pile
     * Updates pile layout and card visibility
     * @returns {HTMLElement|null} The removed card or null if pile is empty
     */
    removeCard() {
        if (this.cards.length === 0) return null;
        // Sync the cards array with DOM before removing
        this.cards = Array.from(this.pileElement.children);
        let card = this.cards[this.cards.length - 1];
        if (card) {
            this.pileElement.removeChild(card);
            this.cards.pop();
            
            // Update pile height for tableau piles
            if (this.pileElement.classList.contains('tableau-pile')) {
                let totalHeight = 180; // Base height
                this.cards.forEach((c, i) => {
                    if (i > 0) { // Skip first card
                        totalHeight += c.classList.contains('face-down') ? 25 : 35;
                    }
                });
                this.pileElement.style.minHeight = `${totalHeight}px`;
            }
            
            return card;
        }
        return null;
    }

    render() {
        this.pileElement.innerHTML = ''; // Clear the pile element
        this.cards.forEach((card, index) => {
            if (this.pileElement.classList.contains('tableau-pile')) {
                const spacing = card.classList.contains('face-down') ? 25 : 35;
                card.style.top = `${index * spacing}px`;
                card.style.zIndex = index + 1;
                card.style.visibility = 'visible';
            }
            this.pileElement.appendChild(card);
        });
    }

    isEmpty() {
        return this.cards.length === 0;
    }
}

/**
 * Initializes the game by setting up the board and dealing cards
 * 
 * Process:
 * 1. Creates and validates game elements
 * 2. Initializes all piles (stock, waste, foundation, tableau)
 * 3. Creates and shuffles deck
 * 4. Deals cards according to Solitaire rules
 * 5. Sets up event listeners
 * 6. Starts game loop
 * 
 * @returns {Object|null} Game state object or null if initialization fails
 */
export function initializeGame() {
    const gameBoard = document.getElementById("game-container");
    console.log("gameBoard", gameBoard);
    if (!gameBoard) {
        console.error("Game container element not found.");
        return null;
    }

    // Get existing elements
    const stockElement = document.getElementById("stock");
    const wasteElement = document.getElementById("waste");
    const foundationElement = document.getElementById("foundation");
    const tableauElement = document.getElementById("tableau");

    if (!stockElement || !wasteElement || !foundationElement || !tableauElement) {
        console.error("Required game elements not found");
        return null;
    }

    // Clear existing cards while preserving structure
    stockElement.innerHTML = '';
    wasteElement.innerHTML = '';
    foundationElement.querySelectorAll('.foundation-pile').forEach(pile => pile.innerHTML = '');
    tableauElement.innerHTML = '';

    console.log("gameBoard cleared while preserving structure");

    // Initialize stock and waste piles using existing elements
    const stockPile = new Pile("stock", stockElement.parentElement);
    stockPile.pileElement.remove(); // Remove the auto-created element
    stockPile.pileElement = stockElement; // Use the existing element
    console.log("stock pile created:", stockPile);
    
    const wastePile = new Pile("waste", wasteElement.parentElement);
    wastePile.pileElement.remove(); // Remove the auto-created element
    wastePile.pileElement = wasteElement; // Use the existing element
    console.log("waste pile created:", wastePile);
    
    // Initialize foundation piles using existing elements
    console.log("foundation element:", foundationElement);
    const foundationPiles = foundationElement.querySelectorAll('.foundation-pile');
    const foundations = Array.from(foundationPiles).map((element) => {
        const suit = element.dataset.suit;
        const pile = new Pile(`foundation-${suit}`, foundationElement);
        pile.pileElement.remove(); // Remove the auto-created element
        pile.pileElement = element; // Use the existing element
        pile.pileElement.dataset.suit = suit; // Ensure suit is set
        return pile;
    });
    console.log("foundations", foundations);

    // Initialize tableau piles
    const tableaus = Array.from({ length: 7 }, (_, i) => {
        const element = document.createElement('div');
        element.classList.add('tableau-pile');
        element.id = `tableau-${i + 1}`;
        element.style.position = 'relative';
        tableauElement.appendChild(element);
        
        const pile = new Pile(`tableau-${i + 1}`, tableauElement);
        pile.pileElement.remove(); // Remove the auto-created element
        pile.pileElement = element; // Use the existing element
        pile.pileElement.id = `tableau-${i + 1}`; // Explicitly set the ID
        console.log(`Created tableau pile: ${pile.pileElement.id}`);
        return pile;
    });

    // Create and shuffle deck
    const deck = createDeck();
    shuffleDeck(deck);

    // Deal to tableaus according to solitaire rules
    for (let i = 0; i < tableaus.length; i++) {
        const tableau = tableaus[i];
        
        // Deal i+1 cards to this tableau
        for (let j = 0; j < i + 1; j++) {
            const card = deck.pop();
            card.isFaceUp = (j === i); // Only the top card is face up
            const cardElement = createCardElement(card);
            
            // Set draggable and face-down state
            cardElement.draggable = card.isFaceUp;
            if (!card.isFaceUp) {
                cardElement.classList.add('face-down');
            } else {
                // Add drag event listeners to face-up cards
                addCardEventListeners(cardElement);
            }

            // Set position and stacking order
            cardElement.style.position = 'absolute';
            cardElement.style.left = '50%';
            cardElement.style.transform = 'translateX(-50%)';
            cardElement.style.top = `${j * (card.isFaceUp ? 35 : 25)}px`; // Different spacing for face-up/down
            cardElement.style.zIndex = j + 1;
            cardElement.style.visibility = 'visible';
            cardElement.style.width = 'calc(100% - 8px)';
            cardElement.style.margin = '4px';
            
            tableau.addCard(cardElement);
            
            // Update tableau height to accommodate stacked cards
            let totalHeight = 180; // Base height
            for (let k = 0; k < j; k++) {
                totalHeight += k === j - 1 ? 35 : 25; // Last card (face-up) gets more spacing
            }
            tableau.pileElement.style.minHeight = `${totalHeight}px`;
        }
    }

    // Remaining cards go to stock pile face down
    while (deck.length > 0) {
        const card = deck.pop();
        card.isFaceUp = false;
        const cardElement = createCardElement(card);
        cardElement.classList.add('face-down');
        cardElement.draggable = false;
        stockPile.addCard(cardElement);
    }

    addEventListeners(stockPile, wastePile, foundations, tableaus);

    const gameState = { stock: stockPile, waste: wastePile, foundations, tableaus };
    gameLoop(gameState);
    return gameState;
}

/**
 * Prevents race conditions in stock pile operations
 * Added to fix multiple card draw issue when clicking rapidly
 * @type {boolean}
 */
let isProcessingDraw = false;

/**
 * Sets up all game event listeners for card interactions
 * Handles stock pile draws, tableau clicks, and drag/drop
 * 
 * @param {Pile} stock - Stock pile for drawing cards
 * @param {Pile} waste - Waste pile for drawn cards
 * @param {Array<Pile>} foundations - Foundation piles for building suits
 * @param {Array<Pile>} tableaus - Tableau piles for main gameplay
 */
function addEventListeners(stock, waste, foundations, tableaus) {
    // Handle stock pile clicks
    stock.pileElement.addEventListener("click", () => {
        // Prevent clicks when both piles are empty or while processing
        if (isProcessingDraw || (stock.isEmpty() && waste.isEmpty())) {
            return;
        }

        // Set processing flag and disable click handling
        isProcessingDraw = true;
        stock.pileElement.style.pointerEvents = 'none';
        waste.pileElement.style.pointerEvents = 'none';

        if (!stock.isEmpty()) {
            console.log('\n=== DRAWING FROM STOCK ===');
            console.log('Stock cards:', stock.cards.length);
            console.log('Waste cards:', waste.cards.length);

            try {
                let cardElement = stock.removeCard();
                if (cardElement) {
                    // Prepare the card for waste pile
                    cardElement.classList.remove('face-down');
                    cardElement.draggable = true;
                    cardElement.style.position = 'absolute';
                    cardElement.style.left = '50%';
                    cardElement.style.transform = 'translateX(-50%)';
                    cardElement.style.display = 'grid';
                    cardElement.style.visibility = 'visible';
                    
                    // Add event listeners
                    addCardEventListeners(cardElement);
                    cardElement.addEventListener('mousedown', handleMouseDown);
                    
                    // Add the new card to the waste pile (it will be placed on top)
                    waste.addCard(cardElement);
                    
                    // Update all waste pile cards
                    const wasteCards = Array.from(waste.pileElement.children);
                    const lastThreeStartIndex = Math.max(0, wasteCards.length - 3);
                    
                    // First, reset all cards
                    wasteCards.forEach(card => {
                        card.style.visibility = 'hidden';
                        card.draggable = false;
                        card.style.position = 'absolute';
                        card.style.left = '50%';
                        card.style.transform = 'translateX(-50%)';
                        card.style.top = '0';
                    });
                    
                    // Then update the last three cards
                    for (let i = wasteCards.length - 1; i >= lastThreeStartIndex; i--) {
                        const card = wasteCards[i];
                        const relativeIndex = i - lastThreeStartIndex;
                        card.style.visibility = 'visible';
                        card.style.top = `${relativeIndex * 35}px`;
                        card.style.zIndex = (i + 1).toString();
                        card.draggable = i === wasteCards.length - 1;
                        
                        // Ensure proper event listeners for the top card
                        if (i === wasteCards.length - 1) {
                            card.removeEventListener('dragstart', handleDragStart);
                            card.removeEventListener('dragend', handleDragEnd);
                            card.removeEventListener('mousedown', handleMouseDown);
                            addCardEventListeners(card);
                            card.addEventListener('mousedown', handleMouseDown);
                        }
                    }
                }

                console.log('After draw:');
                console.log('Stock cards:', stock.cards.length);
                console.log('Waste cards:', waste.cards.length);
            } finally {
                // Re-enable click handling after operation with longer timeout
                setTimeout(() => {
                    stock.pileElement.style.pointerEvents = 'auto';
                    waste.pileElement.style.pointerEvents = 'auto';
                    isProcessingDraw = false;
                }, 250);
            }
        } else if (!waste.isEmpty()) {
            console.log('\n=== RECYCLING WASTE TO STOCK ===');
            console.log('Before recycling:');
            console.log('Stock cards:', stock.cards.length);
            console.log('Waste cards:', waste.cards.length);

            // If we haven't made any moves before recycling
            if (!gameStateHistory.movesMade) {
                gameStateHistory.cycleCount++;
                console.log(`Cycle count increased to ${gameStateHistory.cycleCount}`);
                
                // If we've cycled twice without moving any cards
                if (gameStateHistory.cycleCount >= 2) {
                    setTimeout(() => {
                        alert("Game Over Wing! You've Lost!");
                        location.reload(); // Restart the game
                    }, 100);
                    return;
                }
            } else {
                // Reset cycle count since we made moves
                gameStateHistory.cycleCount = 0;
                gameStateHistory.movesMade = false;
            }

            // Disable click handling during recycling
            stock.pileElement.style.pointerEvents = 'none';
            waste.pileElement.style.pointerEvents = 'none';

            try {
                // Move all waste cards back to stock face down in reverse order
                const wasteCards = [];
                while (!waste.isEmpty()) {
                    wasteCards.unshift(waste.removeCard()); // Add to front to maintain order
                }

                console.log('Cards being recycled:', wasteCards.length);
                
                // Add cards back to stock in the same order
                wasteCards.forEach(cardElement => {
                    cardElement.classList.add('face-down');
                    cardElement.draggable = false;
                    cardElement.style.position = 'absolute';
                    cardElement.style.left = '50%';
                    cardElement.style.transform = 'translateX(-50%)';
                    cardElement.style.top = '0';
                    cardElement.style.display = 'grid';
                    cardElement.style.visibility = 'visible';
                    stock.addCard(cardElement);
                });

                console.log('After recycling:');
                console.log('Stock cards:', stock.cards.length);
                console.log('Waste cards:', waste.cards.length);
            } finally {
                // Re-enable click handling after operation with longer timeout
                setTimeout(() => {
                    stock.pileElement.style.pointerEvents = 'auto';
                    waste.pileElement.style.pointerEvents = 'auto';
                    isProcessingDraw = false;
                }, 250);
            }
        }
    });

    // Handle tableau pile clicks
    tableaus.forEach(tableau => {
        tableau.pileElement.addEventListener("click", (event) => {
            const clickedCard = event.target.closest('.card');
            if (clickedCard && clickedCard.classList.contains('face-down')) {
                // Turn over face-down card if it's on top
                const cards = tableau.cards;
                if (cards[cards.length - 1] === clickedCard) {
                    clickedCard.classList.remove('face-down');
                    clickedCard.draggable = true;
                    // Add drag event listeners when card is turned face up
                    addCardEventListeners(clickedCard);
                }
            }
        });
    });

    // Add drag and drop event listeners
    const allPiles = [
        ...tableaus.map(t => t.pileElement),
        ...foundations.map(f => f.pileElement),
        waste.pileElement
    ];

    // Add drop event listeners to piles
    allPiles.forEach(pile => {
        pile.addEventListener("dragover", handleDragOver);
        pile.addEventListener("dragleave", handleDragLeave);
        pile.addEventListener("drop", handleDrop);
    });

    // Add event listeners to existing face-up cards
    allPiles.forEach(pile => {
        if (pile && pile.children) {
            Array.from(pile.children).forEach(card => {
                if (card && (!card.classList.contains('face-down') || pile.id === 'waste')) {
                    addCardEventListeners(card);
                    card.addEventListener('mousedown', handleMouseDown);
                    card.draggable = true;
                }
            });
        }
    });

    // Make addCardEventListeners available globally for new cards
    window.addCardEventListeners = function(card) {
        card.addEventListener("dragstart", handleDragStart);
        card.addEventListener("dragend", handleDragEnd);
        card.addEventListener("mousedown", handleMouseDown);
    };
}

/**
 * Checks if the game has been won
 * Win condition: All cards properly sorted in foundation piles
 * 
 * @param {Object} gameState - Current game state
 * @returns {boolean} True if game is won, false otherwise
 */
function checkWinCondition(gameState) {
    // Check if all foundation piles have all 13 cards in correct order
    const foundationWin = gameState.foundations.every(foundation => {
        const cards = foundation.cards;
        if (cards.length !== 13) return false;

        // Check if cards are in correct order (Ace to King)
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            const rank = card.dataset.rank;
            const suit = card.dataset.suit;
            
            // Verify suit matches foundation
            if (suit !== foundation.pileElement.dataset.suit) return false;
            
            // Verify rank order (A,2,3...K)
            const expectedRank = i === 0 ? 'A' : 
                               i === 10 ? 'J' :
                               i === 11 ? 'Q' :
                               i === 12 ? 'K' :
                               (i + 1).toString();
            if (rank !== expectedRank) return false;
        }
        return true;
    });

    // Only win when all cards are in foundation piles in correct order
    return foundationWin;
}

// Track the state of the stock pile cycling
window.gameStateHistory = {
    lastState: null,
    cycleStartState: null,
    cycleCount: 0,
    movesMade: false,
    initialStockCount: 0,
    cardsDrawn: 0,
    justRecycled: false
};

function getGameState(gameState) {
    // Get total cards in foundations
    const foundationTotal = gameState.foundations.reduce((sum, foundation) => 
        sum + foundation.cards.length, 0);
    
    // Get tableau state string (face-up cards only)
    const tableauState = gameState.tableaus.map(pile => 
        pile.cards
            .filter(card => !card.classList.contains('face-down'))
            .map(card => `${card.dataset.rank}${card.dataset.suit}`)
            .join(',')
    ).join('|');

    // Create a state snapshot
    return {
        foundationTotal,
        tableauState,
        stockEmpty: gameState.stock.isEmpty(),
        wasteEmpty: gameState.waste.isEmpty(),
        stockCount: gameState.stock.cards.length
    };
}

function statesAreEqual(state1, state2) {
    if (!state1 || !state2) return false;
    return state1.foundationTotal === state2.foundationTotal &&
           state1.tableauState === state2.tableauState;
}

/**
 * Checks if the game has been lost
 * Loss conditions:
 * - No valid moves available
 * - Stock cycled twice without moves
 * - No hidden cards and no valid moves
 * 
 * @param {Object} gameState - Current game state
 * @returns {boolean} True if game is lost, false otherwise
 */
function checkLoseCondition(gameState) {
    // First check if all cards are in foundation piles
    const allCardsInFoundation = gameState.foundations.reduce((total, foundation) => 
        total + foundation.cards.length, 0) === 52;
    if (allCardsInFoundation) {
        return false; // Not a loss if all cards are in foundation
    }

    // Comprehensive move checking function
    const findAllValidMoves = () => {
        const validMoves = [];

        console.log('\n=== CHECKING VALID MOVES ===');
        console.log('Waste pile:', gameState.waste.cards.length);
        console.log('Tableau piles:', gameState.tableaus.map((t, index) => ({
            id: t.pileElement.id,
            cards: t.cards.length,
            faceUpCards: t.cards.filter(card => !card.classList.contains('face-down')).length
        })));
        
        // Debug: Log all tableau pile details
        gameState.tableaus.forEach((tableau, index) => {
            console.log(`Tableau ${index + 1} details:`, {
                id: tableau.pileElement.id,
                totalCards: tableau.cards.length,
                faceUpCards: tableau.cards.filter(card => !card.classList.contains('face-down')).map(card => `${card.dataset.rank} ${card.dataset.suit}`)
            });
        });

        // Check waste pile's top card
        if (!gameState.waste.isEmpty()) {
            const wasteTopCard = gameState.waste.cards[gameState.waste.cards.length - 1];
            console.log('Waste top card:', wasteTopCard.dataset.rank, wasteTopCard.dataset.suit);
            
            // Check moves to foundations
            for (const foundation of gameState.foundations) {
                if (isValidMove(wasteTopCard, foundation.pileElement, null)) {
                    console.log(`Valid move: Waste card to foundation ${foundation.pileElement.dataset.suit}`);
                    validMoves.push({ 
                        card: wasteTopCard, 
                        source: 'waste', 
                        destination: foundation.pileElement 
                    });
                }
            }

            // Check moves to tableau piles
            for (const destPile of gameState.tableaus) {
                const topCard = destPile.cards[destPile.cards.length - 1];
                console.log(`Checking waste card move to tableau pile ${destPile.pileElement.id}`);
                console.log('Destination top card:', topCard ? `${topCard.dataset.rank} ${topCard.dataset.suit}` : 'Empty pile');
                
                if (isValidMove(wasteTopCard, destPile.pileElement, topCard)) {
                    console.log(`Valid move: Waste card to tableau pile ${destPile.pileElement.id}`);
                    validMoves.push({ 
                        card: wasteTopCard, 
                        source: 'waste', 
                        destination: destPile.pileElement 
                    });
                }
            }
        }

        // Check tableau piles for moves
        for (const sourcePile of gameState.tableaus) {
            const faceUpCards = sourcePile.cards.filter(card => !card.classList.contains('face-down'));
            console.log(`Checking tableau pile ${sourcePile.pileElement.id}: ${faceUpCards.length} face-up cards`);
            
            for (const card of faceUpCards) {
                console.log(`Checking card from ${sourcePile.pileElement.id}: ${card.dataset.rank} ${card.dataset.suit}`);
                
                // Check moves to foundations
                for (const foundation of gameState.foundations) {
                    if (isValidMove(card, foundation.pileElement, null)) {
                        console.log(`Valid move: Card to foundation ${foundation.pileElement.dataset.suit}`);
                        validMoves.push({ 
                            card, 
                            source: sourcePile.pileElement.id, 
                            destination: foundation.pileElement 
                        });
                    }
                }

                // Check moves between tableau piles
                for (const destPile of gameState.tableaus) {
                    if (destPile === sourcePile) continue;
                    const topCard = destPile.cards[destPile.cards.length - 1];
                    console.log(`Checking move to tableau pile ${destPile.pileElement.id}`);
                    console.log('Destination top card:', topCard ? `${topCard.dataset.rank} ${topCard.dataset.suit}` : 'Empty pile');
                    
                    if (isValidMove(card, destPile.pileElement, topCard)) {
                        console.log(`Valid move: Card to tableau pile ${destPile.pileElement.id}`);
                        validMoves.push({ 
                            card, 
                            source: sourcePile.pileElement.id, 
                            destination: destPile.pileElement 
                        });
                    }
                }
            }
        }

        console.log(`Total valid moves found: ${validMoves.length}`);
        return validMoves;
    };

    const currentState = getGameState(gameState);
    const validMoves = findAllValidMoves();
    
    // Log move details for debugging
    const moveDetails = validMoves.map(move => ({
        source: move.source,
        destination: move.destination.id,
        card: `${move.card.dataset.rank} ${move.card.dataset.suit}`
    }));
    
    console.group('Move Detection');
    try {
        console.log(`Total valid moves found: ${validMoves.length}`);
        console.log('Move details:', JSON.stringify(moveDetails, null, 2));
    } finally {
        console.groupEnd();
    }

    // Check if there are any hidden cards to reveal
    const hasHiddenCards = gameState.tableaus.some(tableau => {
        const cards = tableau.cards;
        return cards.some(card => card.classList.contains('face-down'));
    });

    // Track stock pile cycling
    if (gameState.stock.isEmpty() && !gameStateHistory.justRecycled) {
        console.log('Stock pile empty, checking for cycle');
        gameStateHistory.cycleCount++;
        console.log(`Cycle count increased to ${gameStateHistory.cycleCount}`);
        
        // If we've cycled twice without moving any cards
        if (gameStateHistory.cycleCount >= 2 && !gameStateHistory.movesMade) {
            console.log('Two cycles completed without moving any cards - game is lost');
            return true;
        }
    }

    // If we just recycled the waste pile to stock
    if (!gameState.stock.isEmpty() && gameState.waste.isEmpty()) {
        gameStateHistory.justRecycled = true;
        
        // If we haven't made any moves before recycling
        if (!gameStateHistory.movesMade) {
            console.log('No moves made before recycling');
        } else {
            // Reset cycle count since we made moves
            gameStateHistory.cycleCount = 0;
            gameStateHistory.movesMade = false;
        }
    } else {
        gameStateHistory.justRecycled = false;
    }

    // If there are no valid moves
    if (validMoves.length === 0) {
        // If there are no hidden cards and no valid moves, it's a stalemate
        if (!hasHiddenCards) {
            console.log('No valid moves available and all cards are face-up - game is lost');
            return true;
        }

        // Check for draw pile depletion
        if (gameState.stock.isEmpty() && gameState.waste.isEmpty()) {
            console.log('Stock and waste piles empty with no valid moves - game is lost');
            return true;
        }
    }

    // Update game state history
    gameStateHistory.lastState = currentState;
    
    return false;
}

/**
 * Main game loop that checks win/loss conditions
 * Runs on an interval to continuously monitor game state
 * 
 * @param {Object} gameState - Current game state
 * @returns {number} Interval ID for the game loop
 */
function gameLoop(gameState) {
    let gameEnded = false;
    
    // Reset game state tracking
    gameStateHistory = {
        lastState: null,
        cycleStartState: null,
        cycleCount: 0,
        movesMade: false,
        initialStockCount: gameState.stock.cards.length,
        cardsDrawn: 0,
        justRecycled: false
    };
    
    // Check for win/lose conditions periodically
    const gameCheckInterval = setInterval(() => {
        if (gameEnded) return;

        if (checkWinCondition(gameState)) {
            gameEnded = true;
            clearInterval(gameCheckInterval);
            setTimeout(() => {
                alert("Congratulations Wing! You've Won!");
            }, 500);
        } else if (checkLoseCondition(gameState)) {
            gameEnded = true;
            clearInterval(gameCheckInterval);
            setTimeout(() => {
                alert("Game Over Wing! You've Lost!");
                location.reload(); // Restart the game
            }, 500);
        }
    }, 1000);

    return gameCheckInterval;
}
