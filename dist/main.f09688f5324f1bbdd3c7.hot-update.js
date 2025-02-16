"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatesolitaire"]("main",{

/***/ "./moves.js":
/*!******************!*\
  !*** ./moves.js ***!
  \******************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkOppositeColor: () => (/* binding */ checkOppositeColor),\n/* harmony export */   getRankValue: () => (/* binding */ getRankValue),\n/* harmony export */   isOppositeColor: () => (/* binding */ checkOppositeColor),\n/* harmony export */   isValidMove: () => (/* binding */ isValidMove),\n/* harmony export */   isValidSequence: () => (/* binding */ isValidSequence),\n/* harmony export */   moveCard: () => (/* binding */ moveCard)\n/* harmony export */ });\n/* harmony import */ var _cards_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cards.js */ \"./cards.js\");\n// moves.js\n\nconst RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];\nconst RED_SUITS = ['hearts', 'diamonds'];\nconst BLACK_SUITS = ['clubs', 'spades'];\nfunction getRankValue(rank) {\n  return RANKS.indexOf(rank);\n}\n\n// Opposite color checking function\nfunction checkOppositeColor(suit1, suit2) {\n  // Validate input\n  if (typeof suit1 !== 'string' || typeof suit2 !== 'string') {\n    console.error('Invalid suit types:', suit1, suit2);\n    return false;\n  }\n\n  // Normalize suit names and handle case sensitivity\n  const normalizedSuit1 = suit1.toLowerCase().trim();\n  const normalizedSuit2 = suit2.toLowerCase().trim();\n\n  // Explicit color checking with better logging\n  const isRed = suit => RED_SUITS.includes(suit);\n  const isBlack = suit => BLACK_SUITS.includes(suit);\n  console.log(`Checking color: ${normalizedSuit1} vs ${normalizedSuit2}`);\n  console.log(`Suit1 (${normalizedSuit1}): Red=${isRed(normalizedSuit1)}, Black=${isBlack(normalizedSuit1)}`);\n  console.log(`Suit2 (${normalizedSuit2}): Red=${isRed(normalizedSuit2)}, Black=${isBlack(normalizedSuit2)}`);\n\n  // Check if one is red and one is black\n  const result = isRed(normalizedSuit1) && isBlack(normalizedSuit2) || isBlack(normalizedSuit1) && isRed(normalizedSuit2);\n  console.log(`Opposite color result for ${normalizedSuit1} vs ${normalizedSuit2}: ${result}`);\n  console.log('Opposite color result:', result);\n  return result;\n}\n\n// Export both function names for compatibility\n\n\n// Helper function to validate a sequence of cards\nfunction isValidSequence(cards) {\n  for (let i = 0; i < cards.length - 1; i++) {\n    const currentCard = cards[i];\n    const nextCard = cards[i + 1];\n    if (!checkOppositeColor(currentCard.dataset.suit, nextCard.dataset.suit) || getRankValue(currentCard.dataset.rank) !== getRankValue(nextCard.dataset.rank) + 1) {\n      return false;\n    }\n  }\n  return true;\n}\nfunction isValidMove(sourceCard, destinationPile) {\n  let destinationCard = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n  if (!sourceCard) {\n    console.log('Invalid move: No source card');\n    return false;\n  }\n  const sourceSuit = sourceCard.dataset.suit.toLowerCase().trim();\n  const sourceRank = sourceCard.dataset.rank;\n  const sourcePile = sourceCard.parentElement;\n  console.log('\\n=== Checking Move Validity ===');\n  console.log(`Source: ${sourceRank} of ${sourceSuit} from ${sourcePile?.id || 'unknown'}`);\n  console.log(`Destination: ${destinationPile.id}`);\n  console.log(`Target Card: ${destinationCard ? destinationCard.dataset.rank + ' of ' + destinationCard.dataset.suit : 'None'}`);\n\n  // Validate source card state\n  if (sourceCard.classList.contains('face-down')) {\n    console.log('Invalid move: Cannot move face-down card');\n    return false;\n  }\n\n  // Validate source pile\n  if (sourcePile) {\n    // Only allow moving top card from waste\n    if (sourcePile.id === 'waste' && sourceCard !== sourcePile.lastElementChild) {\n      console.log('Invalid move: Can only move top card from waste');\n      return false;\n    }\n\n    // Prevent moving from foundation piles\n    if (sourcePile.classList.contains('foundation-pile')) {\n      console.log('Invalid move: Cannot move cards from foundation');\n      return false;\n    }\n  }\n\n  // Moving to an empty tableau pile\n  if (destinationPile.id.startsWith('tableau') && !destinationCard) {\n    const isKing = sourceRank === 'K';\n    console.log(`Empty tableau pile: ${isKing ? 'Valid (King)' : 'Invalid (Not a King)'}`);\n    return isKing; // Only Kings can be placed on empty tableau spots\n  }\n\n  // Moving to a foundation pile\n  if (destinationPile.classList.contains('foundation-pile')) {\n    console.log('\\n=== Foundation Move Check ===');\n\n    // Can only move single cards to foundation\n    if (sourceCard.nextElementSibling) {\n      console.log('Invalid move: Cannot move sequence to foundation');\n      return false;\n    }\n\n    // Get foundation suit and normalize it\n    const foundationSuit = destinationPile.dataset.suit.toLowerCase().trim();\n    const normalizedSourceSuit = sourceSuit.toLowerCase().trim();\n\n    // Check if suits match\n    if (normalizedSourceSuit !== foundationSuit) {\n      console.log('Invalid move: Suits do not match');\n      console.log(`Source suit: ${normalizedSourceSuit}, Foundation suit: ${foundationSuit}`);\n      return false;\n    }\n    const foundationCards = Array.from(destinationPile.children);\n    if (foundationCards.length === 0) {\n      // Only Aces can start a foundation pile\n      const isAce = sourceRank === 'A';\n      console.log(`Empty foundation: ${isAce ? 'Valid (Ace)' : 'Invalid (Not an Ace)'}`);\n      return isAce;\n    }\n\n    // Get the top card of the foundation pile\n    const topCard = foundationCards[foundationCards.length - 1];\n    const topRank = topCard.dataset.rank;\n\n    // Must be next rank up\n    const sourceValue = getRankValue(sourceRank);\n    const topValue = getRankValue(topRank);\n    const isNextRank = sourceValue === topValue + 1;\n    console.log('Foundation validation:', {\n      currentTopCard: `${topRank} of ${topCard.dataset.suit}`,\n      sourceCard: `${sourceRank} of ${sourceSuit}`,\n      isNextRank,\n      sourceValue,\n      topValue\n    });\n    return isNextRank;\n  }\n\n  // Moving within tableau\n  if (destinationPile.id.startsWith('tableau')) {\n    console.log('\\n=== Tableau Move Check ===');\n\n    // Empty tableau spot - only Kings allowed\n    if (!destinationCard) {\n      const isKing = sourceRank === 'K';\n      console.log(`Empty tableau: ${isKing ? 'Valid (King)' : 'Invalid (Not a King)'}`);\n      return isKing;\n    }\n\n    // Must be opposite color and one rank lower\n    const destSuit = destinationCard.dataset.suit.toLowerCase().trim();\n\n    // Validate color alternation\n    const oppositeColors = checkOppositeColor(sourceSuit, destSuit);\n    const isNextRankLower = getRankValue(sourceRank) === getRankValue(destinationCard.dataset.rank) - 1;\n    console.log('Tableau validation:', {\n      sourceCard: `${sourceRank} of ${sourceSuit}`,\n      destCard: `${destinationCard.dataset.rank} of ${destSuit}`,\n      oppositeColors,\n      isNextRankLower,\n      sourceRankValue: getRankValue(sourceRank),\n      destRankValue: getRankValue(destinationCard.dataset.rank)\n    });\n\n    // If moving a sequence, validate the entire sequence\n    if (sourceCard.nextElementSibling) {\n      const sequence = [];\n      let current = sourceCard;\n      while (current) {\n        sequence.push(current);\n        current = current.nextElementSibling;\n      }\n      const isValidSequence = sequence.every((card, i) => {\n        if (i === sequence.length - 1) return true;\n        const nextCard = sequence[i + 1];\n        return checkOppositeColor(card.dataset.suit, nextCard.dataset.suit) && getRankValue(card.dataset.rank) === getRankValue(nextCard.dataset.rank) + 1;\n      });\n      console.log(`Sequence validation: ${isValidSequence ? 'Valid' : 'Invalid'}`);\n      return oppositeColors && isNextRankLower && isValidSequence;\n    }\n    return oppositeColors && isNextRankLower;\n  }\n  console.log('Invalid move: No matching move type');\n  return false;\n}\nfunction moveCard(sourceCard, destinationPile) {\n  let destinationCard = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n  if (!isValidMove(sourceCard, destinationPile, destinationCard)) {\n    return false;\n  }\n  try {\n    // Get all cards being moved (for tableau sequences)\n    const sourceCards = [];\n    if (sourceCard.parentElement && sourceCard.parentElement.id.startsWith('tableau')) {\n      let current = sourceCard;\n      while (current) {\n        sourceCards.push(current);\n        current = current.nextElementSibling;\n      }\n    } else {\n      sourceCards.push(sourceCard);\n    }\n\n    // For tableau sequences, validate the sequence\n    if (sourceCards.length > 1) {\n      for (let i = 0; i < sourceCards.length - 1; i++) {\n        const currentCard = sourceCards[i];\n        const nextCard = sourceCards[i + 1];\n        if (!checkOppositeColor(currentCard.dataset.suit, nextCard.dataset.suit) || getRankValue(currentCard.dataset.rank) !== getRankValue(nextCard.dataset.rank) + 1) {\n          console.log('Invalid sequence');\n          return false;\n        }\n      }\n    }\n\n    // Move the cards\n    sourceCards.forEach(card => {\n      if (card.parentElement) {\n        card.parentElement.removeChild(card);\n      }\n      destinationPile.appendChild(card);\n    });\n\n    // Update z-index and position for tableau piles\n    if (destinationPile.id.startsWith('tableau')) {\n      Array.from(destinationPile.children).forEach((card, index) => {\n        card.style.zIndex = index + 1;\n        const spacing = card.classList.contains('face-down') ? 25 : 35;\n        card.style.top = `${index * spacing}px`;\n        card.style.visibility = 'visible';\n      });\n      // Update pile height\n      let totalHeight = 180; // Base height\n      Array.from(destinationPile.children).forEach((card, index) => {\n        if (index > 0) {\n          // Skip first card\n          totalHeight += card.classList.contains('face-down') ? 25 : 35;\n        }\n      });\n      destinationPile.style.minHeight = `${totalHeight}px`;\n    }\n    return true;\n  } catch (error) {\n    console.error('Error moving cards:', error);\n    return false;\n  }\n}\n\n//# sourceURL=webpack://solitaire/./moves.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("aad51f836f65ee5340e5")
/******/ })();
/******/ 
/******/ }
);