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

/***/ "./interactions.js":
/*!*************************!*\
  !*** ./interactions.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCardElement: () => (/* binding */ createCardElement),\n/* harmony export */   handleDragLeave: () => (/* binding */ handleDragLeave),\n/* harmony export */   handleDragOver: () => (/* binding */ handleDragOver),\n/* harmony export */   handleDragStart: () => (/* binding */ handleDragStart),\n/* harmony export */   handleDrop: () => (/* binding */ handleDrop)\n/* harmony export */ });\n/* harmony import */ var _moves_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moves.js */ \"./moves.js\");\n// interactions.js\n\nfunction createCardElement(card) {\n  var cardElement = document.createElement(\"div\");\n  cardElement.classList.add(\"card\");\n  if (!card.isFaceUp) {\n    cardElement.classList.add(\"face-down\");\n  }\n  cardElement.dataset.suit = card.suit;\n  cardElement.dataset.rank = card.display.rank;\n  cardElement.dataset.symbol = card.display.suit;\n  cardElement.draggable = card.isFaceUp;\n\n  // Create rank and suit displays\n  var topDisplay = document.createElement(\"div\");\n  topDisplay.textContent = \"\".concat(card.display.rank).concat(card.display.suit);\n  topDisplay.classList.add(\"card-top\");\n  var centerDisplay = document.createElement(\"div\");\n  centerDisplay.textContent = card.display.suit;\n  centerDisplay.classList.add(\"card-center\");\n  var bottomDisplay = document.createElement(\"div\");\n  bottomDisplay.textContent = \"\".concat(card.display.rank).concat(card.display.suit);\n  bottomDisplay.classList.add(\"card-bottom\");\n  cardElement.appendChild(topDisplay);\n  cardElement.appendChild(centerDisplay);\n  cardElement.appendChild(bottomDisplay);\n  return cardElement;\n}\nfunction handleDragStart(event) {\n  var card = event.target.closest('.card');\n  if (!card || card.classList.contains('face-down')) {\n    event.preventDefault();\n    return;\n  }\n\n  // Only allow dragging the top card or a sequence of cards\n  var pile = card.closest('.pile');\n  if (pile && pile.id.startsWith('tableau')) {\n    var cards = Array.from(pile.children);\n    var cardIndex = cards.indexOf(card);\n    if (cardIndex < cards.length - 1) {\n      // Check if we're dragging a valid sequence\n      var isValidSequence = true;\n      for (var i = cardIndex; i < cards.length - 1; i++) {\n        if (!(0,_moves_js__WEBPACK_IMPORTED_MODULE_0__.isValidMove)(cards[i], pile, cards[i + 1])) {\n          isValidSequence = false;\n          break;\n        }\n      }\n      if (!isValidSequence) {\n        event.preventDefault();\n        return;\n      }\n    }\n  }\n  event.dataTransfer.setData('text/plain', JSON.stringify({\n    suit: card.dataset.suit,\n    rank: card.dataset.rank,\n    sourceId: card.closest('.pile').id\n  }));\n  card.style.opacity = '0.5';\n}\nfunction handleDrop(event) {\n  event.preventDefault();\n  var data = JSON.parse(event.dataTransfer.getData('text/plain'));\n  var sourceCard = document.querySelector(\"[data-suit=\\\"\".concat(data.suit, \"\\\"][data-rank=\\\"\").concat(data.rank, \"\\\"]\"));\n  var sourcePile = document.getElementById(data.sourceId);\n  var destinationPile = event.target.closest('.pile');\n  var destinationCard = event.target.closest('.card');\n  if (!sourceCard || !destinationPile) return;\n\n  // Reset opacity\n  sourceCard.style.opacity = '1';\n  if ((0,_moves_js__WEBPACK_IMPORTED_MODULE_0__.moveCard)(sourceCard, destinationPile, destinationCard)) {\n    // Update card positions after successful move\n    if (destinationPile.id.startsWith('tableau')) {\n      var cards = Array.from(destinationPile.children);\n      cards.forEach(function (card, index) {\n        card.style.top = \"\".concat(index * 25, \"px\");\n        card.style.zIndex = index + 1;\n      });\n    }\n\n    // Check if we need to turn over a card in the source pile\n    if (sourcePile.id.startsWith('tableau')) {\n      var lastCard = sourcePile.lastElementChild;\n      if (lastCard && lastCard.classList.contains('face-down')) {\n        lastCard.classList.remove('face-down');\n        lastCard.draggable = true;\n      }\n    }\n  }\n}\nfunction handleDragOver(event) {\n  event.preventDefault();\n  var destinationPile = event.target.closest('.pile');\n  if (destinationPile) {\n    destinationPile.classList.add('drag-over');\n  }\n}\nfunction handleDragLeave(event) {\n  var pile = event.target.closest('.pile');\n  if (pile) {\n    pile.classList.remove('drag-over');\n  }\n}\n\n\n//# sourceURL=webpack://solitaire/./interactions.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7cc46e8628a7a39712ce")
/******/ })();
/******/ 
/******/ }
);