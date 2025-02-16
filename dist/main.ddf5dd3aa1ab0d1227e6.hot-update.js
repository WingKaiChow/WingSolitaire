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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCardElement: () => (/* binding */ createCardElement),\n/* harmony export */   handleDragEnd: () => (/* binding */ handleDragEnd),\n/* harmony export */   handleDragLeave: () => (/* binding */ handleDragLeave),\n/* harmony export */   handleDragOver: () => (/* binding */ handleDragOver),\n/* harmony export */   handleDragStart: () => (/* binding */ handleDragStart),\n/* harmony export */   handleDrop: () => (/* binding */ handleDrop),\n/* harmony export */   handleMouseDown: () => (/* binding */ handleMouseDown)\n/* harmony export */ });\n/* harmony import */ var _moves_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moves.js */ \"./moves.js\");\n// interactions.js\n\nfunction createCardElement(card) {\n  const cardElement = document.createElement(\"div\");\n  cardElement.classList.add(\"card\");\n  if (!card.isFaceUp) {\n    cardElement.classList.add(\"face-down\");\n  }\n  cardElement.dataset.suit = card.suit;\n  cardElement.dataset.rank = card.display.rank;\n  cardElement.dataset.symbol = card.display.suit;\n  cardElement.draggable = card.isFaceUp;\n\n  // Create rank and suit displays\n  const topDisplay = document.createElement(\"div\");\n  topDisplay.textContent = `${card.display.rank}${card.display.suit}`;\n  topDisplay.classList.add(\"card-top\");\n  const centerDisplay = document.createElement(\"div\");\n  centerDisplay.textContent = card.display.suit;\n  centerDisplay.classList.add(\"card-center\");\n  const bottomDisplay = document.createElement(\"div\");\n  bottomDisplay.textContent = `${card.display.rank}${card.display.suit}`;\n  bottomDisplay.classList.add(\"card-bottom\");\n  cardElement.appendChild(topDisplay);\n  cardElement.appendChild(centerDisplay);\n  cardElement.appendChild(bottomDisplay);\n  return cardElement;\n}\n\n// Fallback method to find the closest element\nfunction findClosest(element, selector) {\n  if (!element) return null;\n\n  // Cross-browser compatible matches method\n  function elementMatches(el, sel) {\n    if (el.matches) return el.matches(sel);\n    if (el.webkitMatchesSelector) return el.webkitMatchesSelector(sel);\n    if (el.msMatchesSelector) return el.msMatchesSelector(sel);\n    if (el.mozMatchesSelector) return el.mozMatchesSelector(sel);\n\n    // Fallback to manual check if no native method exists\n    const matches = document.querySelectorAll(sel);\n    return Array.from(matches).includes(el);\n  }\n  while (element && !elementMatches(element, selector)) {\n    element = element.parentElement;\n  }\n  return element;\n}\nfunction handleMouseDown(event) {\n  const card = findClosest(event.target, '.card');\n  if (!card) return;\n\n  // Get all cards in the pile\n  const pile = findClosest(card, '.tableau-pile, .foundation-pile, #stock, #waste');\n  if (!pile) return;\n\n  // Get all cards in the pile\n  const cards = Array.from(pile.children);\n  const cardIndex = cards.indexOf(card);\n\n  // Check if we're clicking on a face-down card\n  if (card.classList.contains('face-down')) {\n    return;\n  }\n\n  // Prevent dragging from foundation piles\n  if (pile.classList.contains('foundation-pile')) {\n    return;\n  }\n\n  // Only allow dragging the top card from waste pile\n  if (pile.id === 'waste' && card !== pile.lastElementChild) {\n    return;\n  }\n\n  // For tableau piles, ensure we can only drag face-up cards and their sequences\n  if (pile.classList.contains('tableau-pile')) {\n    // Find the first face-up card in the sequence\n    let firstFaceUpIndex = cards.findIndex(c => !c.classList.contains('face-down'));\n    if (cardIndex < firstFaceUpIndex) {\n      return; // Clicked on a face-down card\n    }\n  }\n\n  // Store initial mouse position and card position\n  const rect = card.getBoundingClientRect();\n  card.dataset.startX = event.clientX;\n  card.dataset.startY = event.clientY;\n  card.dataset.offsetX = event.clientX - rect.left;\n  card.dataset.offsetY = event.clientY - rect.top;\n\n  // Add dragging class for visual feedback\n  card.classList.add('dragging');\n\n  // If dragging from tableau, add dragging class to sequence\n  if (pile.classList.contains('tableau-pile')) {\n    let current = card;\n    let offset = 0;\n    while (current) {\n      if (!current.classList.contains('face-down')) {\n        current.classList.add('dragging');\n        current.style.zIndex = (2000 + offset).toString();\n        current.style.transform = 'translateX(-50%)';\n        current.style.top = `${offset * 35}px`;\n        offset++;\n      }\n      current = current.nextElementSibling;\n    }\n  }\n\n  // Add mousemove and mouseup listeners\n  document.addEventListener('mousemove', handleMouseMove);\n  document.addEventListener('mouseup', handleMouseUp);\n}\nfunction handleMouseMove(event) {\n  const card = document.querySelector('.card.dragging');\n  if (!card) return;\n  const dx = event.clientX - parseInt(card.dataset.startX);\n  const dy = event.clientY - parseInt(card.dataset.startY);\n\n  // Only start dragging if mouse has moved more than 5 pixels\n  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {\n    card.draggable = true;\n\n    // Calculate the new position relative to the mouse movement\n    const offsetX = parseInt(card.dataset.offsetX) || 0;\n    const offsetY = parseInt(card.dataset.offsetY) || 0;\n    const newX = event.clientX - offsetX;\n    const newY = event.clientY - offsetY;\n\n    // Get the pile containing the card\n    const pile = findClosest(card, '.tableau-pile, .foundation-pile, #stock, #waste');\n    if (pile && pile.classList.contains('tableau-pile')) {\n      // Update positions of all cards in sequence\n      let current = card;\n      let offset = 0;\n      while (current) {\n        if (!current.classList.contains('face-down')) {\n          current.style.position = 'fixed';\n          current.style.left = `${newX}px`;\n          current.style.top = `${newY + offset * 35}px`;\n          current.style.transform = 'none';\n          current.style.zIndex = (2000 + offset).toString();\n          offset++;\n        }\n        current = current.nextElementSibling;\n      }\n    } else {\n      // Update position of single card\n      card.style.position = 'fixed';\n      card.style.left = `${newX}px`;\n      card.style.top = `${newY}px`;\n      card.style.transform = 'none';\n      card.style.zIndex = '2000';\n    }\n\n    // Check for valid drop targets\n    const dropTarget = document.elementFromPoint(event.clientX, event.clientY);\n    if (dropTarget) {\n      const destinationPile = findClosest(dropTarget, '.tableau-pile, .foundation-pile');\n      const destinationCard = findClosest(dropTarget, '.card');\n\n      // Remove highlight from all piles\n      document.querySelectorAll('.tableau-pile, .foundation-pile').forEach(p => {\n        p.classList.remove('valid-target', 'invalid-target');\n      });\n      if (destinationPile) {\n        // Check if the move would be valid\n        const isValid = (0,_moves_js__WEBPACK_IMPORTED_MODULE_0__.isValidMove)(card, destinationPile, destinationCard);\n        destinationPile.classList.add(isValid ? 'valid-target' : 'invalid-target');\n      }\n    }\n  }\n}\nfunction handleMouseUp(event) {\n  const card = document.querySelector('.card.dragging');\n  if (!card) return;\n\n  // Get the element under the cursor, ignoring the dragged cards\n  const draggingCards = document.querySelectorAll('.card.dragging');\n  draggingCards.forEach(c => c.style.visibility = 'hidden');\n  const dropTarget = document.elementFromPoint(event.clientX, event.clientY);\n  draggingCards.forEach(c => c.style.visibility = 'visible');\n  if (dropTarget) {\n    const destinationPile = findClosest(dropTarget, '.tableau-pile, .foundation-pile');\n    const destinationCard = findClosest(dropTarget, '.card:not(.dragging)');\n    if (destinationPile) {\n      // Attempt to move the card\n      (0,_moves_js__WEBPACK_IMPORTED_MODULE_0__.moveCard)(card, destinationPile, destinationCard);\n    }\n  }\n\n  // Reset all cards\n  document.querySelectorAll('.card').forEach(c => {\n    c.classList.remove('dragging');\n    c.style.transform = 'translateX(-50%)';\n    c.style.position = 'absolute';\n    c.style.visibility = 'visible';\n    c.style.opacity = '1';\n    c.style.pointerEvents = 'auto';\n    c.draggable = !c.classList.contains('face-down');\n    const pile = findClosest(c, '.tableau-pile, .foundation-pile');\n    if (pile) {\n      const cards = Array.from(pile.children);\n      const index = cards.indexOf(c);\n      c.style.zIndex = (index + 1).toString();\n      if (pile.classList.contains('tableau-pile')) {\n        c.style.top = `${index * (c.classList.contains('face-down') ? 25 : 35)}px`;\n      } else {\n        c.style.top = '0';\n      }\n    }\n  });\n\n  // Remove pile highlights\n  document.querySelectorAll('.tableau-pile, .foundation-pile').forEach(pile => {\n    pile.classList.remove('valid-target', 'invalid-target');\n  });\n\n  // Remove event listeners\n  document.removeEventListener('mousemove', handleMouseMove);\n  document.removeEventListener('mouseup', handleMouseUp);\n}\nfunction handleDragStart(event) {\n  event.preventDefault(); // Prevent default drag behavior, we're using our own\n}\nfunction handleDragOver(event) {\n  event.preventDefault();\n}\nfunction handleDrop(event) {\n  event.preventDefault();\n}\nfunction handleDragLeave(event) {\n  const pile = findClosest(event.target, '.tableau-pile, .foundation-pile');\n  if (pile) {\n    pile.classList.remove('valid-target', 'invalid-target');\n  }\n}\nfunction handleDragEnd(event) {\n  // Reset all cards\n  document.querySelectorAll('.card').forEach(c => {\n    c.classList.remove('dragging');\n    c.style.transform = 'translateX(-50%)';\n    c.style.position = 'absolute';\n    c.style.visibility = 'visible';\n    c.style.opacity = '1';\n    c.style.pointerEvents = 'auto';\n    c.draggable = !c.classList.contains('face-down');\n  });\n\n  // Remove pile highlights\n  document.querySelectorAll('.tableau-pile, .foundation-pile').forEach(pile => {\n    pile.classList.remove('valid-target', 'invalid-target');\n  });\n}\n\n\n//# sourceURL=webpack://solitaire/./interactions.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7253f845374e9c083517")
/******/ })();
/******/ 
/******/ }
);