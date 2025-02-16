// moves.js
import { createDeck, shuffleDeck } from "./cards.js";

const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const RED_SUITS = ['hearts', 'diamonds'];
const BLACK_SUITS = ['clubs', 'spades'];

export function getRankValue(rank) {
    return RANKS.indexOf(rank);
}

// Opposite color checking function
function checkOppositeColor(suit1, suit2) {
    // Validate input
    if (typeof suit1 !== 'string' || typeof suit2 !== 'string') {
        console.error('Invalid suit types:', suit1, suit2);
        return false;
    }
    
    // Normalize suit names and handle case sensitivity
    const normalizedSuit1 = suit1.toLowerCase().trim();
    const normalizedSuit2 = suit2.toLowerCase().trim();
    
    // Explicit color checking with better logging
    const isRed = (suit) => RED_SUITS.includes(suit);
    const isBlack = (suit) => BLACK_SUITS.includes(suit);
    
    console.log(`Checking color: ${normalizedSuit1} vs ${normalizedSuit2}`);
    console.log(`Suit1 (${normalizedSuit1}): Red=${isRed(normalizedSuit1)}, Black=${isBlack(normalizedSuit1)}`);
    console.log(`Suit2 (${normalizedSuit2}): Red=${isRed(normalizedSuit2)}, Black=${isBlack(normalizedSuit2)}`);
    
    // Check if one is red and one is black
    const result = (isRed(normalizedSuit1) && isBlack(normalizedSuit2)) || 
                  (isBlack(normalizedSuit1) && isRed(normalizedSuit2));
    
    console.log(`Opposite color result for ${normalizedSuit1} vs ${normalizedSuit2}: ${result}`);
    
    console.log('Opposite color result:', result);
    
    return result;
}

// Export both function names for compatibility
export { checkOppositeColor as isOppositeColor, checkOppositeColor };

// Helper function to validate a sequence of cards
export function isValidSequence(cards) {
    for (let i = 0; i < cards.length - 1; i++) {
        const currentCard = cards[i];
        const nextCard = cards[i + 1];
        
        const currentRankValue = getRankValue(currentCard.dataset.rank);
        const nextRankValue = getRankValue(nextCard.dataset.rank);
        const currentSuit = currentCard.dataset.suit.toLowerCase().trim();
        const nextSuit = nextCard.dataset.suit.toLowerCase().trim();
        
        const hasOppositeColors = checkOppositeColor(currentSuit, nextSuit);
        const isDescending = currentRankValue === nextRankValue + 1;
        
        if (!hasOppositeColors || !isDescending) {
            return false;
        }
    }
    return true;
}

export function isValidMove(sourceCard, destinationPile, destinationCard = null) {
    if (!sourceCard) {
        console.log('Invalid move: No source card');
        return false;
    }

    const sourceSuit = sourceCard.dataset.suit.toLowerCase().trim();
    const sourceRank = sourceCard.dataset.rank;
    const sourcePile = sourceCard.parentElement;

    console.log('\n=== Checking Move Validity ===');
    console.log(`Source: ${sourceRank} of ${sourceSuit} from ${sourcePile?.id || 'unknown'}`);
    console.log(`Destination: ${destinationPile.id}`);
    console.log(`Target Card: ${destinationCard ? destinationCard.dataset.rank + ' of ' + destinationCard.dataset.suit : 'None'}`);

    // Validate source card state
    if (sourceCard.classList.contains('face-down')) {
        console.log('Invalid move: Cannot move face-down card');
        return false;
    }

    // Validate source pile
    if (sourcePile) {
        // Only allow moving top card from waste
        if (sourcePile.id === 'waste' && sourceCard !== sourcePile.lastElementChild) {
            console.log('Invalid move: Can only move top card from waste');
            return false;
        }

    }

    // Moving to an empty tableau pile
    if (destinationPile.id.startsWith('tableau') && !destinationCard) {
        const isKing = sourceRank === 'K';
        console.log(`Empty tableau pile: ${isKing ? 'Valid (King)' : 'Invalid (Not a King)'}`);
        return isKing; // Only Kings can be placed on empty tableau spots
    }

    // Moving to a foundation pile
    if (destinationPile.classList.contains('foundation-pile')) {
        console.log('\n=== Foundation Move Check ===');
        
        // Can only move single cards to foundation
        if (sourceCard.nextElementSibling) {
            console.log('Invalid move: Cannot move sequence to foundation');
            return false;
        }

        const foundationCards = Array.from(destinationPile.children);
        
        if (foundationCards.length === 0) {
            // Only Aces can start a foundation pile
            const isAce = sourceRank === 'A';
            // Get foundation suit and normalize it
            const foundationSuit = destinationPile.dataset.suit.toLowerCase().trim();
            const normalizedSourceSuit = sourceSuit.toLowerCase().trim();
            
            // For empty foundation, check if it's an Ace and suits match
            if (isAce && normalizedSourceSuit === foundationSuit) {
                console.log('Valid move: Ace to empty foundation of matching suit');
                return true;
            }
            console.log(`Empty foundation: ${isAce ? 'Invalid (Wrong Suit)' : 'Invalid (Not an Ace)'}`);
            return false;
        }

        // Get foundation suit and normalize it
        const foundationSuit = destinationPile.dataset.suit.toLowerCase().trim();
        const normalizedSourceSuit = sourceSuit.toLowerCase().trim();
        
        // Check if suits match
        if (normalizedSourceSuit !== foundationSuit) {
            console.log('Invalid move: Suits do not match');
            console.log(`Source suit: ${normalizedSourceSuit}, Foundation suit: ${foundationSuit}`);
            return false;
        }

        // Get the top card of the foundation pile
        const topCard = foundationCards[foundationCards.length - 1];
        const topRank = topCard.dataset.rank;
        
        // Must be next rank up in ascending order (A,2,3...)
        const sourceValue = getRankValue(sourceRank);
        const topValue = getRankValue(topRank);
        
        // For foundation piles, source card must be one rank higher than top card
        const isAscending = sourceValue === (topValue + 1);
        
        console.log('Foundation validation:', {
            currentTopCard: `${topRank} of ${topCard.dataset.suit}`,
            sourceCard: `${sourceRank} of ${sourceSuit}`,
            sourceValue,
            topValue,
            isAscending
        });
        
        return isAscending;
    }

    // Moving within tableau
    if (destinationPile.id.startsWith('tableau')) {
        console.log('\n=== Tableau Move Check ===');
        
        // Empty tableau spot - only Kings allowed
        if (!destinationCard) {
            const isKing = sourceRank === 'K';
            console.log(`Empty tableau: ${isKing ? 'Valid (King)' : 'Invalid (Not a King)'}`);
            return isKing;
        }
        
        // Must be opposite color and one rank lower
        const destSuit = destinationCard.dataset.suit.toLowerCase().trim();
        const destRank = destinationCard.dataset.rank;
        
        // Validate color alternation
        const oppositeColors = checkOppositeColor(sourceSuit, destSuit);
        
        // Source card must be one rank lower than destination card
        const sourceValue = getRankValue(sourceRank);
        const destValue = getRankValue(destRank);
        const isNextRankLower = destValue - 1 === sourceValue;
        
        console.log('Tableau validation:', {
            sourceCard: `${sourceRank} of ${sourceSuit}`,
            destCard: `${destRank} of ${destSuit}`,
            oppositeColors,
            isNextRankLower,
            sourceValue,
            destValue
        });

        // If moving a sequence, validate the entire sequence
        if (sourceCard.nextElementSibling) {
            const sequence = [];
            let current = sourceCard;
            while (current) {
                sequence.push(current);
                current = current.nextElementSibling;
            }
            
            // Validate each pair of cards in the sequence
            const isValidSequence = sequence.every((card, i) => {
                if (i === sequence.length - 1) return true;
                const nextCard = sequence[i + 1];
                
                const cardRankValue = getRankValue(card.dataset.rank);
                const nextRankValue = getRankValue(nextCard.dataset.rank);
                const cardSuit = card.dataset.suit.toLowerCase().trim();
                const nextSuit = nextCard.dataset.suit.toLowerCase().trim();
                
                const hasOppositeColors = checkOppositeColor(cardSuit, nextSuit);
                const isDescending = cardRankValue === nextRankValue + 1;
                
                return hasOppositeColors && isDescending;
            });
            
            console.log('Sequence validation:', {
                sequenceLength: sequence.length,
                isValid: isValidSequence,
                cards: sequence.map(card => `${card.dataset.rank} of ${card.dataset.suit}`)
            });
            
            return oppositeColors && isNextRankLower && isValidSequence;
        }
        
        return oppositeColors && isNextRankLower;
    }

    console.log('Invalid move: No matching move type');
    return false;
}

export function moveCard(sourceCard, destinationPile, destinationCard = null) {
    if (!isValidMove(sourceCard, destinationPile, destinationCard)) {
        return false;
    }

    try {
        // Get all cards being moved (for tableau sequences)
        const sourceCards = [];
        if (sourceCard.parentElement && sourceCard.parentElement.id.startsWith('tableau')) {
            let current = sourceCard;
            while (current) {
                sourceCards.push(current);
                current = current.nextElementSibling;
            }
        } else {
            sourceCards.push(sourceCard);
        }

        // For tableau sequences, validate the sequence
        if (sourceCards.length > 1) {
            const isValid = isValidSequence(sourceCards);
            if (!isValid) {
                console.log('Invalid sequence');
                return false;
            }
        }

        // Move the cards
        sourceCards.forEach(card => {
            if (card.parentElement) {
                card.parentElement.removeChild(card);
            }
            destinationPile.appendChild(card);
        });

        // Update z-index and position for tableau piles
        if (destinationPile.id.startsWith('tableau')) {
            Array.from(destinationPile.children).forEach((card, index) => {
                card.style.zIndex = index + 1;
                const spacing = card.classList.contains('face-down') ? 25 : 35;
                card.style.top = `${index * spacing}px`;
                card.style.visibility = 'visible';
            });
            // Update pile height
            let totalHeight = 180; // Base height
            Array.from(destinationPile.children).forEach((card, index) => {
                if (index > 0) { // Skip first card
                    totalHeight += card.classList.contains('face-down') ? 25 : 35;
                }
            });
            destinationPile.style.minHeight = `${totalHeight}px`;
        }

        return true;
    } catch (error) {
        console.error('Error moving cards:', error);
        return false;
    }
}
