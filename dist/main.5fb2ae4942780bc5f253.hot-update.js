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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCardElement: () => (/* binding */ createCardElement),\n/* harmony export */   handleDragEnd: () => (/* binding */ handleDragEnd),\n/* harmony export */   handleDragLeave: () => (/* binding */ handleDragLeave),\n/* harmony export */   handleDragOver: () => (/* binding */ handleDragOver),\n/* harmony export */   handleDragStart: () => (/* binding */ handleDragStart),\n/* harmony export */   handleDrop: () => (/* binding */ handleDrop)\n/* harmony export */ });\n/* harmony import */ var _moves_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moves.js */ \"./moves.js\");\n// interactions.js\n\nfunction createCardElement(card) {\n  var cardElement = document.createElement(\"div\");\n  cardElement.classList.add(\"card\");\n  if (!card.isFaceUp) {\n    cardElement.classList.add(\"face-down\");\n  }\n  cardElement.dataset.suit = card.suit;\n  cardElement.dataset.rank = card.display.rank;\n  cardElement.dataset.symbol = card.display.suit;\n  cardElement.draggable = card.isFaceUp;\n\n  // Create rank and suit displays\n  var topDisplay = document.createElement(\"div\");\n  topDisplay.textContent = \"\".concat(card.display.rank).concat(card.display.suit);\n  topDisplay.classList.add(\"card-top\");\n  var centerDisplay = document.createElement(\"div\");\n  centerDisplay.textContent = card.display.suit;\n  centerDisplay.classList.add(\"card-center\");\n  var bottomDisplay = document.createElement(\"div\");\n  bottomDisplay.textContent = \"\".concat(card.display.rank).concat(card.display.suit);\n  bottomDisplay.classList.add(\"card-bottom\");\n  cardElement.appendChild(topDisplay);\n  cardElement.appendChild(centerDisplay);\n  cardElement.appendChild(bottomDisplay);\n  return cardElement;\n}\n\n// Fallback method to find the closest element\nfunction findClosest(element, selector) {\n  while (element && !element.matches(selector)) {\n    element = element.parentElement;\n  }\n  return element;\n}\nfunction handleDragStart(event) {\n  var card = findClosest(event.target, '.card');\n  if (!card || card.classList.contains('face-down')) {\n    event.preventDefault();\n    return;\n  }\n  var pile = findClosest(card, '.tableau-pile, .foundation-pile, #stock, #waste');\n  if (!pile) {\n    event.preventDefault();\n    return;\n  }\n\n  // Prevent dragging from foundation piles\n  if (pile.classList.contains('foundation-pile')) {\n    event.preventDefault();\n    return;\n  }\n\n  // Only allow dragging the top card from waste pile\n  if (pile.id === 'waste' && card !== pile.lastElementChild) {\n    event.preventDefault();\n    return;\n  }\n\n  // Reset draggable state for all cards\n  document.querySelectorAll('.card').forEach(function (c) {\n    c.draggable = c.classList.contains('face-down') ? false : true;\n  });\n\n  // For tableau piles, handle sequence dragging\n  if (pile.id.startsWith('tableau')) {\n    var cards = Array.from(pile.children);\n    var cardIndex = cards.indexOf(card);\n\n    // Get the sequence of cards from the clicked card to the end\n    var sequence = cards.slice(cardIndex);\n\n    // Set z-index for the sequence\n    sequence.forEach(function (card, index) {\n      card.style.zIndex = (1000 + index).toString();\n    });\n\n    // Ensure only the clicked card is draggable\n    cards.forEach(function (c) {\n      c.draggable = c === card;\n    });\n  }\n  try {\n    var dragData = {\n      suit: card.dataset.suit,\n      rank: card.dataset.rank,\n      sourceId: pile.id,\n      cards: []\n    };\n    if (pile.id.startsWith('tableau')) {\n      var current = card;\n      while (current) {\n        dragData.cards.push({\n          suit: current.dataset.suit,\n          rank: current.dataset.rank\n        });\n        current = current.nextElementSibling;\n      }\n    }\n    var jsonData = JSON.stringify(dragData);\n    event.dataTransfer.setData('text/plain', jsonData);\n    event.dataTransfer.setData('application/json', jsonData);\n    event.dataTransfer.effectAllowed = 'move';\n\n    // Visual feedback for dragged cards\n    if (pile.id.startsWith('tableau')) {\n      var _current = card;\n      var index = 0;\n      while (_current) {\n        _current.style.opacity = '0.8';\n        _current.style.transform = \"translateX(-50%) translateY(\".concat(index * 2, \"px)\");\n        _current.style.zIndex = (1000 + index).toString();\n        index++;\n        _current = _current.nextElementSibling;\n      }\n    } else {\n      card.style.opacity = '0.8';\n      card.style.zIndex = '1000';\n    }\n  } catch (error) {\n    console.error('Error setting drag data:', error);\n    event.preventDefault();\n  }\n}\nfunction handleDrop(event) {\n  event.preventDefault();\n  var data;\n  try {\n    // Try both MIME types\n    var transferData = event.dataTransfer.getData('application/json');\n    if (!transferData) {\n      console.log('Trying text/plain fallback');\n      transferData = event.dataTransfer.getData('text/plain');\n    }\n    if (!transferData) {\n      console.error('No data received in drop event');\n      console.log('Available types:', event.dataTransfer.types);\n      return;\n    }\n    console.log('Received transfer data:', transferData);\n    data = JSON.parse(transferData);\n    if (!data.suit || !data.rank || !data.sourceId) {\n      console.error('Invalid drag data format:', data);\n      return;\n    }\n  } catch (error) {\n    console.error('Error parsing drop data:', error);\n    return;\n  }\n\n  // Find the source card and any following cards in the sequence\n  var sourceCard = document.querySelector(\"[data-suit=\\\"\".concat(data.suit, \"\\\"][data-rank=\\\"\").concat(data.rank, \"\\\"]\"));\n  var sourceCards = data.cards || [{\n    suit: data.suit,\n    rank: data.rank\n  }];\n  var sourcePile = document.getElementById(data.sourceId);\n\n  // Get the actual element under the drop point\n  var dropTarget = document.elementFromPoint(event.clientX, event.clientY);\n  if (!dropTarget) {\n    console.error('No element found at drop point');\n    return;\n  }\n  var destinationPile = findClosest(dropTarget, '.tableau-pile, .foundation-pile, #stock, #waste');\n  var destinationCard = null;\n\n  // Handle dropping on foundation piles\n  if (dropTarget.classList.contains('foundation-pile')) {\n    destinationPile = dropTarget;\n    var foundationCards = Array.from(destinationPile.children);\n    destinationCard = foundationCards[foundationCards.length - 1];\n  } else {\n    // For other piles, get the card being dropped on\n    destinationCard = findClosest(dropTarget, '.card');\n    if (destinationCard) {\n      var cardPile = findClosest(destinationCard, '.tableau-pile, .foundation-pile');\n      if (cardPile) {\n        destinationPile = cardPile;\n      }\n    }\n  }\n\n  // If dropping on a pile's empty space, use that pile\n  if (!destinationPile && dropTarget.classList.contains('tableau-pile')) {\n    destinationPile = dropTarget;\n  }\n\n  // If dropping on a foundation pile's empty space\n  if (!destinationPile && dropTarget.classList.contains('foundation-pile')) {\n    destinationPile = dropTarget;\n  }\n  if (!sourceCard) {\n    console.error('Source card not found');\n    return;\n  }\n  if (!destinationPile) {\n    console.error('Destination pile not found');\n    return;\n  }\n\n  // Reset opacity and z-index for all cards\n  if (sourcePile && sourcePile.id.startsWith('tableau')) {\n    var current = sourceCard;\n    while (current) {\n      current.style.opacity = '1';\n      current.style.zIndex = Array.from(sourcePile.children).indexOf(current) + 1;\n      current = current.nextElementSibling;\n    }\n  } else {\n    sourceCard.style.opacity = '1';\n  }\n\n  // Prevent moving cards to the stock or waste piles\n  if (destinationPile.id === 'stock' || destinationPile.id === 'waste') {\n    console.log('Cannot move cards to stock or waste piles');\n    return;\n  }\n  if ((0,_moves_js__WEBPACK_IMPORTED_MODULE_0__.moveCard)(sourceCard, destinationPile, destinationCard)) {\n    // Update card positions after successful move\n    if (destinationPile.id.startsWith('tableau')) {\n      var cards = Array.from(destinationPile.children);\n      var currentTop = 0;\n      cards.forEach(function (card, index) {\n        card.style.top = \"\".concat(currentTop, \"px\");\n        card.style.zIndex = index + 1;\n        card.style.visibility = 'visible';\n        // More spacing for face-up cards\n        currentTop += card.classList.contains('face-down') ? 25 : 35;\n      });\n      // Update pile height to fit all cards\n      destinationPile.style.minHeight = \"\".concat(currentTop + 180, \"px\"); // base card height + last card overlap\n    } else if (destinationPile.classList.contains('foundation-pile')) {\n      // Ensure proper positioning in foundation pile\n      var _cards = Array.from(destinationPile.children);\n      _cards.forEach(function (card, index) {\n        card.style.visibility = index === _cards.length - 1 ? 'visible' : 'hidden';\n        card.style.zIndex = index + 1;\n      });\n    }\n\n    // Update source pile after removing cards\n    if (sourcePile && sourcePile.id.startsWith('tableau')) {\n      var _sourceCards = Array.from(sourcePile.children);\n      var _currentTop = 0;\n      _sourceCards.forEach(function (card, index) {\n        card.style.top = \"\".concat(_currentTop, \"px\");\n        card.style.zIndex = index + 1;\n        card.style.visibility = 'visible';\n        _currentTop += 20; // Use consistent spacing\n      });\n      sourcePile.style.minHeight = \"\".concat(Math.max(_currentTop + 180, 180), \"px\"); // minimum height of 180px\n\n      // Turn over the last card if it's face down\n      var lastCard = sourcePile.lastElementChild;\n      if (lastCard && lastCard.classList.contains('face-down')) {\n        lastCard.classList.remove('face-down');\n        lastCard.draggable = true;\n      }\n    }\n  }\n}\nfunction handleDragOver(event) {\n  event.preventDefault();\n  var destinationPile = findClosest(event.target, '.tableau-pile, .foundation-pile, #stock, #waste');\n  if (destinationPile) {\n    event.dataTransfer.dropEffect = 'move';\n    destinationPile.classList.add('drag-over');\n  }\n}\nfunction handleDragLeave(event) {\n  var pile = findClosest(event.target, '.tableau-pile, .foundation-pile, #stock, #waste');\n  if (pile) {\n    pile.classList.remove('drag-over');\n  }\n}\nfunction handleDragEnd(event) {\n  // Reset all cards to their original state\n  var card = findClosest(event.target, '.card');\n  if (card) {\n    document.querySelectorAll('.card').forEach(function (c, index) {\n      c.style.opacity = '1';\n      c.style.transform = 'translateX(-50%)';\n      c.style.zIndex = (index + 1).toString();\n      c.style.visibility = 'visible';\n      c.draggable = !c.classList.contains('face-down');\n    });\n  }\n\n  // Clean up any remaining drag-over states\n  document.querySelectorAll('.tableau-pile, .foundation-pile, #stock, #waste').forEach(function (pile) {\n    pile.classList.remove('drag-over');\n  });\n}\n\n\n//# sourceURL=webpack://solitaire/./interactions.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("5b65600e51ac97277c21")
/******/ })();
/******/ 
/******/ }
);