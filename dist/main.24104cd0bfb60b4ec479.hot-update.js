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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getRankValue: () => (/* binding */ getRankValue),\n/* harmony export */   isOppositeColor: () => (/* binding */ isOppositeColor),\n/* harmony export */   isValidMove: () => (/* binding */ isValidMove),\n/* harmony export */   isValidSequence: () => (/* binding */ isValidSequence),\n/* harmony export */   moveCard: () => (/* binding */ moveCard)\n/* harmony export */ });\n/* harmony import */ var _cards_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cards.js */ \"./cards.js\");\n// moves.js\n\nvar RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];\nvar RED_SUITS = ['hearts', 'diamonds'];\nvar BLACK_SUITS = ['clubs', 'spades'];\nfunction getRankValue(rank) {\n  return RANKS.indexOf(rank);\n}\nfunction isOppositeColor(suit1, suit2) {\n  return RED_SUITS.includes(suit1) && BLACK_SUITS.includes(suit2) || BLACK_SUITS.includes(suit1) && RED_SUITS.includes(suit2);\n}\n\n// Helper function to validate a sequence of cards\nfunction isValidSequence(cards) {\n  for (var i = 0; i < cards.length - 1; i++) {\n    var currentCard = cards[i];\n    var nextCard = cards[i + 1];\n    if (!isOppositeColor(currentCard.dataset.suit, nextCard.dataset.suit) || getRankValue(currentCard.dataset.rank) !== getRankValue(nextCard.dataset.rank) + 1) {\n      return false;\n    }\n  }\n  return true;\n}\nfunction isValidMove(sourceCard, destinationPile) {\n  var destinationCard = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n  if (!sourceCard) return false;\n  var sourceSuit = sourceCard.dataset.suit;\n  var sourceRank = sourceCard.dataset.rank;\n\n  // Moving to an empty tableau pile\n  if (destinationPile.id.startsWith('tableau') && !destinationCard) {\n    return sourceRank === 'K'; // Only Kings can be placed on empty tableau spots\n  }\n\n  // Moving to a foundation pile\n  if (destinationPile.classList.contains('foundation-pile')) {\n    // Prevent moving multiple cards to foundation\n    var sourceParent = sourceCard.parentElement;\n    if (sourceParent && sourceParent.id.startsWith('tableau')) {\n      var sourceIndex = Array.from(sourceParent.children).indexOf(sourceCard);\n      if (sourceIndex < sourceParent.children.length - 1) {\n        return false; // Can't move a sequence to foundation\n      }\n    }\n\n    // Get all cards in the foundation pile\n    var foundationCards = Array.from(destinationPile.children);\n    if (foundationCards.length === 0) {\n      return sourceRank === 'A'; // Only Aces can start a foundation pile\n    }\n\n    // Get the top card of the foundation pile\n    var topCard = foundationCards[foundationCards.length - 1];\n\n    // Must be same suit and next rank up\n    return sourceSuit === topCard.dataset.suit && getRankValue(sourceRank) === getRankValue(topCard.dataset.rank) + 1;\n  }\n\n  // Moving within tableau\n  if (destinationPile.id.startsWith('tableau')) {\n    if (!destinationCard) {\n      return sourceRank === 'K'; // Only Kings on empty spots\n    }\n\n    // Must be opposite color and one rank lower\n    return isOppositeColor(sourceSuit, destinationCard.dataset.suit) && getRankValue(sourceRank) === getRankValue(destinationCard.dataset.rank) - 1;\n  }\n  return false;\n}\nfunction moveCard(sourceCard, destinationPile) {\n  var destinationCard = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n  if (!isValidMove(sourceCard, destinationPile, destinationCard)) {\n    return false;\n  }\n  try {\n    // Get all cards being moved (for tableau sequences)\n    var sourceCards = [];\n    if (sourceCard.parentElement && sourceCard.parentElement.id.startsWith('tableau')) {\n      var current = sourceCard;\n      while (current) {\n        sourceCards.push(current);\n        current = current.nextElementSibling;\n      }\n    } else {\n      sourceCards.push(sourceCard);\n    }\n\n    // For tableau sequences, validate the sequence\n    if (sourceCards.length > 1) {\n      for (var i = 0; i < sourceCards.length - 1; i++) {\n        var currentCard = sourceCards[i];\n        var nextCard = sourceCards[i + 1];\n        if (!isOppositeColor(currentCard.dataset.suit, nextCard.dataset.suit) || getRankValue(currentCard.dataset.rank) !== getRankValue(nextCard.dataset.rank) + 1) {\n          console.log('Invalid sequence');\n          return false;\n        }\n      }\n    }\n\n    // Move the cards\n    sourceCards.forEach(function (card) {\n      if (card.parentElement) {\n        card.parentElement.removeChild(card);\n      }\n      destinationPile.appendChild(card);\n    });\n\n    // Update z-index and position for tableau piles\n    if (destinationPile.id.startsWith('tableau')) {\n      Array.from(destinationPile.children).forEach(function (card, index) {\n        card.style.zIndex = index + 1;\n        card.style.top = \"\".concat(index * 20, \"px\");\n        card.style.visibility = 'visible';\n      });\n      // Update pile height\n      var totalHeight = destinationPile.children.length * 20 + 180;\n      destinationPile.style.minHeight = \"\".concat(totalHeight, \"px\");\n    }\n    return true;\n  } catch (error) {\n    console.error('Error moving cards:', error);\n    return false;\n  }\n}\n\n//# sourceURL=webpack://solitaire/./moves.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("3831b295a3f06c89fbbe")
/******/ })();
/******/ 
/******/ }
);