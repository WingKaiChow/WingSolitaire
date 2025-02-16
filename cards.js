// cards.js
function createCard(suit, rank) {
    return { 
        suit: suit, 
        rank: rank, 
        isFaceUp: false,
        display: {
            suit: getSuitSymbol(suit),
            rank: getRankDisplay(rank)
        }
    };
}

function getSuitSymbol(suit) {
    const symbols = {
        'hearts': '♥',
        'diamonds': '♦',
        'clubs': '♣',
        'spades': '♠'
    };
    return symbols[suit] || suit;
}

function getRankDisplay(rank) {
    if (typeof rank === 'number') return rank.toString();
    return rank;
}

export function createDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
    
    let deck = [];
    
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push(createCard(suit, rank));
        }
    }
    
    return deck;
}

export function shuffleDeck(deck) {
    // Fisher-Yates (Knuth) shuffle algorithm
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}
