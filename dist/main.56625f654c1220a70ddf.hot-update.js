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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   isValidMove: () => (/* binding */ isValidMove),\n/* harmony export */   moveCard: () => (/* binding */ moveCard)\n/* harmony export */ });\n/* harmony import */ var _cards_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cards.js */ \"./cards.js\");\n// moves.js\n\nvar RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];\nvar RED_SUITS = ['hearts', 'diamonds'];\nvar BLACK_SUITS = ['clubs', 'spades'];\nfunction getRankValue(rank) {\n  return RANKS.indexOf(rank);\n}\nfunction isOppositeColor(suit1, suit2) {\n  return RED_SUITS.includes(suit1) && BLACK_SUITS.includes(suit2) || BLACK_SUITS.includes(suit1) && RED_SUITS.includes(suit2);\n}\nfunction isValidMove(sourceCard, destinationPile) {\n  var destinationCard = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n  if (!sourceCard) return false;\n  var sourceSuit = sourceCard.dataset.suit;\n  var sourceRank = sourceCard.dataset.rank;\n\n  // Moving to an empty tableau pile\n  if (destinationPile.id.startsWith('tableau') && !destinationCard) {\n    return sourceRank === 'K'; // Only Kings can be placed on empty tableau spots\n  }\n\n  // Moving to a foundation pile\n  if (destinationPile.classList.contains('foundation-pile')) {\n    if (!destinationCard) {\n      return sourceRank === 'A'; // Only Aces can start a foundation pile\n    }\n    // Must be same suit and next rank up\n    return sourceSuit === destinationCard.dataset.suit && getRankValue(sourceRank) === getRankValue(destinationCard.dataset.rank) + 1;\n  }\n\n  // Moving within tableau\n  if (destinationPile.id.startsWith('tableau') && destinationCard) {\n    // Must be opposite color and one rank lower\n    return isOppositeColor(sourceSuit, destinationCard.dataset.suit) && getRankValue(sourceRank) === getRankValue(destinationCard.dataset.rank) - 1;\n  }\n  return false;\n}\nfunction moveCard(sourceCard, destinationPile) {\n  var destinationCard = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n  if (!isValidMove(sourceCard, destinationPile, destinationCard)) {\n    return false;\n  }\n\n  // Handle moving a stack of cards in the tableau\n  if (sourceCard.parentElement.id.startsWith('tableau')) {\n    var sourceCards = [];\n    var current = sourceCard;\n    while (current) {\n      sourceCards.push(current);\n      current = current.nextElementSibling;\n    }\n    sourceCards.forEach(function (card) {\n      destinationPile.appendChild(card);\n    });\n  } else {\n    destinationPile.appendChild(sourceCard);\n  }\n  return true;\n}\n\n//# sourceURL=webpack://solitaire/./moves.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("423eb8d86570f396a82b")
/******/ })();
/******/ 
/******/ }
);