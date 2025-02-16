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

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./style.css\");\n/* harmony import */ var _cards_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cards.js */ \"./cards.js\");\n/* harmony import */ var _moves_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./moves.js */ \"./moves.js\");\n/* harmony import */ var _interactions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interactions.js */ \"./interactions.js\");\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game.js */ \"./game.js\");\nif (window.location.protocol === 'file:') {\n  window.location.href = 'http://localhost:8080';\n}\n\n\n\n\n\n\n// Initialize the game when the DOM is fully loaded\ndocument.addEventListener('DOMContentLoaded', () => {\n  (0,_game_js__WEBPACK_IMPORTED_MODULE_4__.initializeGame)();\n\n  // Add click handler for new game button\n  const newGameButton = document.getElementById('new-game-button');\n  if (newGameButton) {\n    newGameButton.addEventListener('click', () => {\n      (0,_game_js__WEBPACK_IMPORTED_MODULE_4__.initializeGame)();\n    });\n  }\n});\n\n//# sourceURL=webpack://solitaire/./index.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("bcce1e8c98a68a441b15")
/******/ })();
/******/ 
/******/ }
);