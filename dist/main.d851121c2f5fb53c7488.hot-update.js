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

/***/ "./game.js":
/*!*****************!*\
  !*** ./game.js ***!
  \*****************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cards_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cards.js */ \"./cards.js\");\n/* harmony import */ var _moves_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moves.js */ \"./moves.js\");\n/* harmony import */ var _interactions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interactions.js */ \"./interactions.js\");\n// game.js\n\n\n\n\n// ... [Previous class and function definitions remain the same until addEventListeners] ...\n\nfunction addEventListeners(stock, waste, foundations, tableaus) {\n  // Handle stock pile clicks\n  stock.pileElement.addEventListener(\"click\", () => {\n    if (!stock.isEmpty()) {\n      console.log('\\n=== DRAWING FROM STOCK ===');\n      console.log('Stock cards:', stock.cards.length);\n      console.log('Waste cards:', waste.cards.length);\n\n      // Disable click handling during card movement\n      stock.pileElement.style.pointerEvents = 'none';\n      let cardElement = stock.removeCard();\n      cardElement.classList.remove('face-down');\n\n      // Update existing cards first\n      waste.cards.forEach((card, index) => {\n        card.draggable = false;\n        card.style.display = index >= waste.cards.length - 2 ? 'grid' : 'none';\n        if (index >= waste.cards.length - 2) {\n          card.style.top = `${(index - (waste.cards.length - 3)) * 35}px`;\n          card.style.zIndex = index;\n        }\n      });\n\n      // Add the new card\n      cardElement.draggable = true;\n      cardElement.style.display = 'grid';\n      cardElement.style.top = `${Math.min(2, waste.cards.length) * 35}px`;\n      cardElement.style.zIndex = waste.cards.length + 1;\n\n      // Add drag event listeners to the new card\n      addCardEventListeners(cardElement);\n      waste.addCard(cardElement);\n      console.log('After draw:');\n      console.log('Stock cards:', stock.cards.length);\n      console.log('Waste cards:', waste.cards.length);\n      // Re-enable click handling after a short delay\n      setTimeout(() => {\n        stock.pileElement.style.pointerEvents = 'auto';\n      }, 100);\n    } else if (!waste.isEmpty()) {\n      // ... [Rest of the stock click handler remains the same]\n    }\n  });\n\n  // Handle tableau pile clicks\n  tableaus.forEach(tableau => {\n    tableau.pileElement.addEventListener(\"click\", event => {\n      const clickedCard = event.target.closest('.card');\n      if (clickedCard && clickedCard.classList.contains('face-down')) {\n        // Turn over face-down card if it's on top\n        const cards = tableau.cards;\n        if (cards[cards.length - 1] === clickedCard) {\n          clickedCard.classList.remove('face-down');\n          clickedCard.draggable = true;\n          // Add drag event listeners when card is turned face up\n          addCardEventListeners(clickedCard);\n        }\n      }\n    });\n  });\n\n  // Function to add drag event listeners to a card\n  function addCardEventListeners(card) {\n    card.addEventListener(\"dragstart\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleDragStart);\n    card.addEventListener(\"dragend\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleDragEnd);\n  }\n\n  // Add drag and drop event listeners\n  const allPiles = [...tableaus.map(t => t.pileElement), ...foundations.map(f => f.pileElement), waste.pileElement];\n\n  // Add drop event listeners to piles\n  allPiles.forEach(pile => {\n    pile.addEventListener(\"dragover\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleDragOver);\n    pile.addEventListener(\"dragleave\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleDragLeave);\n    pile.addEventListener(\"drop\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleDrop);\n  });\n\n  // Add drag event listeners to existing face-up cards\n  allPiles.forEach(pile => {\n    Array.from(pile.children).forEach(card => {\n      if (!card.classList.contains('face-down')) {\n        addCardEventListeners(card);\n      }\n    });\n  });\n\n  // Make addCardEventListeners available globally for new cards\n  window.addCardEventListeners = addCardEventListeners;\n}\n\n// ... [Rest of the file remains the same] ...\n\n//# sourceURL=webpack://solitaire/./game.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("079a793ebae20e67ad44")
/******/ })();
/******/ 
/******/ }
);