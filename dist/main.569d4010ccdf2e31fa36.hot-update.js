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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCardElement: () => (/* binding */ createCardElement),\n/* harmony export */   handleDragOver: () => (/* binding */ handleDragOver),\n/* harmony export */   handleDragStart: () => (/* binding */ handleDragStart),\n/* harmony export */   handleDrop: () => (/* binding */ handleDrop)\n/* harmony export */ });\n/* harmony import */ var _moves_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moves.js */ \"./moves.js\");\n// interactions.js\n\n\n// Function to create a card element\nfunction createCardElement(card) {\n  var cardElement = document.createElement(\"div\");\n  cardElement.classList.add(\"card\");\n  cardElement.dataset.suit = card.suit;\n  cardElement.dataset.rank = card.rank;\n  cardElement.textContent = card.rank;\n  cardElement.draggable = true;\n  return cardElement;\n}\n\n// Function to handle drag start\nfunction handleDragStart(event) {\n  var card = event.target;\n  event.dataTransfer.setData(\"text/plain\", card.dataset.suit + \",\" + card.dataset.rank);\n}\n\n// Function to handle drop\nfunction handleDrop(event) {\n  event.preventDefault();\n  var sourcePile = event.target.closest(\".pile\");\n  var destinationPile = event.target.closest(\".pile\");\n  if (!sourcePile || !destinationPile) return;\n  var sourcePileType = sourcePile.id;\n  var destinationPileType = destinationPile.id;\n\n  // Basic validation (needs significant improvement)\n  if (sourcePileType === \"stock\" && destinationPileType === \"waste\") {\n    var card = sourcePile.pileElement.querySelector(\".card:last-child\");\n    if (card) {\n      sourcePile.removeCard(card);\n      destinationPile.addCard(card);\n      card.addEventListener(\"dragstart\", handleDragStart);\n    }\n  }\n}\n\n// Function to handle drag over\nfunction handleDragOver(event) {\n  event.preventDefault();\n}\n\n// Export the necessary functions\n\n\n//# sourceURL=webpack://solitaire/./interactions.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("b606d0d51138ef4f33fe")
/******/ })();
/******/ 
/******/ }
);