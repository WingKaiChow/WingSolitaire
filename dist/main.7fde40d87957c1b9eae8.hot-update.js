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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCardElement: () => (/* binding */ createCardElement),\n/* harmony export */   handleDragEnd: () => (/* binding */ handleDragEnd),\n/* harmony export */   handleDragLeave: () => (/* binding */ handleDragLeave),\n/* harmony export */   handleDragOver: () => (/* binding */ handleDragOver),\n/* harmony export */   handleDragStart: () => (/* binding */ handleDragStart),\n/* harmony export */   handleDrop: () => (/* binding */ handleDrop),\n/* harmony export */   handleMouseDown: () => (/* binding */ handleMouseDown)\n/* harmony export */ });\n/* harmony import */ var _moves_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moves.js */ \"./moves.js\");\n// interactions.js\n\nfunction createCardElement(card) {\n  const cardElement = document.createElement(\"div\");\n  cardElement.classList.add(\"card\");\n  if (!card.isFaceUp) {\n    cardElement.classList.add(\"face-down\");\n  }\n  cardElement.dataset.suit = card.suit;\n  cardElement.dataset.rank = card.display.rank;\n  cardElement.dataset.symbol = card.display.suit;\n  cardElement.draggable = card.isFaceUp;\n\n  // Create rank and suit displays\n  const topDisplay = document.createElement(\"div\");\n  topDisplay.textContent = `${card.display.rank}${card.display.suit}`;\n  topDisplay.classList.add(\"card-top\");\n  const centerDisplay = document.createElement(\"div\");\n  centerDisplay.textContent = card.display.suit;\n  centerDisplay.classList.add(\"card-center\");\n  const bottomDisplay = document.createElement(\"div\");\n  bottomDisplay.textContent = `${card.display.rank}${card.display.suit}`;\n  bottomDisplay.classList.add(\"card-bottom\");\n  cardElement.appendChild(topDisplay);\n  cardElement.appendChild(centerDisplay);\n  cardElement.appendChild(bottomDisplay);\n  return cardElement;\n}\n\n// Fallback method to find the closest element\nfunction findClosest(element, selector) {\n  if (!element) return null;\n\n  // Cross-browser compatible matches method\n  function elementMatches(el, sel) {\n    if (el.matches) return el.matches(sel);\n    if (el.webkitMatchesSelector) return el.webkitMatchesSelector(sel);\n    if (el.msMatchesSelector) return el.msMatchesSelector(sel);\n    if (el.mozMatchesSelector) return el.mozMatchesSelector(sel);\n\n    // Fallback to manual check if no native method exists\n    const matches = document.querySelectorAll(sel);\n    return Array.from(matches).includes(el);\n  }\n  while (element && !elementMatches(element, selector)) {\n    element = element.parentElement;\n  }\n  return element;\n}\nfunction handleMouseDown(event) {\n  // Prevent event from being handled multiple times\n  event.preventDefault();\n  event.stopPropagation();\n\n  // If there's already a card being dragged, ignore new mousedown events\n  if (document.querySelector('.card.dragging')) {\n    return;\n  }\n  const card = findClosest(event.target, '.card');\n  if (!card) return;\n\n  // Get all cards in the pile\n  const pile = findClosest(card, '.tableau-pile, .foundation-pile, #stock, #waste');\n  if (!pile) return;\n\n  // Get all cards in the pile\n  const cards = Array.from(pile.children);\n  const cardIndex = cards.indexOf(card);\n\n  // Check if we're clicking on a face-down card\n  if (card.classList.contains('face-down')) {\n    return;\n  }\n\n  // Handle stock pile clicks\n  if (pile.id === 'stock') {\n    // Let the click event handle stock pile interactions\n    return;\n  }\n\n  // Only allow dragging visible cards from waste pile\n  if (pile.id === 'waste') {\n    const cards = Array.from(pile.children);\n    const lastThreeStartIndex = Math.max(0, cards.length - 3);\n    const lastThreeCards = cards.slice(lastThreeStartIndex);\n\n    // Only allow dragging if it's the top visible card\n    if (!lastThreeCards.includes(card) || card !== cards[cards.length - 1]) {\n      return;\n    }\n\n    // Ensure the card is properly set up for dragging\n    card.draggable = true;\n    card.style.cursor = 'grab';\n  }\n\n  // For tableau piles, ensure we can only drag face-up cards and their sequences\n  if (pile.classList.contains('tableau-pile')) {\n    // Find the first face-up card in the sequence\n    let firstFaceUpIndex = cards.findIndex(c => !c.classList.contains('face-down'));\n    if (cardIndex < firstFaceUpIndex) {\n      return; // Clicked on a face-down card\n    }\n  }\n\n  // Remove any existing dragging classes and reset styles\n  document.querySelectorAll('.card').forEach(c => {\n    c.classList.remove('dragging');\n    c.style.position = 'absolute';\n    c.style.left = '50%';\n    c.style.transform = 'translateX(-50%)';\n    c.style.zIndex = '';\n    c.style.pointerEvents = 'auto';\n  });\n\n  // Store initial click offset and source pile\n  const rect = card.getBoundingClientRect();\n  const gameContainer = document.getElementById('game-container');\n  const containerRect = gameContainer.getBoundingClientRect();\n\n  // Calculate offset relative to the game container\n  card.dataset.offsetX = event.clientX - (rect.left - containerRect.left);\n  card.dataset.offsetY = event.clientY - (rect.top - containerRect.top);\n  card.dataset.sourcePileId = pile.id;\n  card.dataset.sourcePileType = pile.classList.contains('tableau-pile') ? 'tableau' : pile.classList.contains('foundation-pile') ? 'foundation' : pile.id;\n\n  // Add dragging class for visual feedback\n  card.classList.add('dragging');\n\n  // If dragging from tableau, add dragging class to sequence\n  if (pile.classList.contains('tableau-pile')) {\n    let current = card;\n    let offset = 0;\n    while (current) {\n      current.classList.add('dragging');\n      current.style.zIndex = (2000 + offset).toString();\n      current.style.transform = 'none';\n      current.style.top = `${offset * 35}px`;\n      current.draggable = true; // Make sure all cards in sequence are draggable\n      offset++;\n      current = current.nextElementSibling;\n    }\n  } else if (pile.id === 'waste') {\n    // For waste pile, only drag the single card\n    card.style.zIndex = '2000';\n    card.style.transform = 'none';\n    card.style.top = '0';\n    card.draggable = true;\n    card.style.cursor = 'grab';\n\n    // Ensure event listeners are properly set up\n    card.removeEventListener('dragstart', handleDragStart);\n    card.removeEventListener('dragend', handleDragEnd);\n    card.removeEventListener('mousedown', handleMouseDown);\n    addCardEventListeners(card);\n    card.addEventListener('mousedown', handleMouseDown);\n  }\n\n  // Add mousemove and mouseup listeners\n  document.addEventListener('mousemove', handleMouseMove);\n  document.addEventListener('mouseup', handleMouseUp);\n}\nfunction handleMouseMove(event) {\n  const card = document.querySelector('.card.dragging');\n  if (!card) return;\n\n  // Get the game container for relative positioning\n  const gameContainer = document.getElementById('game-container');\n  if (!gameContainer) return;\n  const containerRect = gameContainer.getBoundingClientRect();\n\n  // Calculate the new position relative to the mouse cursor\n  const offsetX = parseInt(card.dataset.offsetX) || 0;\n  const offsetY = parseInt(card.dataset.offsetY) || 0;\n\n  // Get all cards being dragged (only from the clicked card's pile)\n  const sourcePile = findClosest(card, '.tableau-pile, .foundation-pile, #stock, #waste');\n  if (!sourcePile) return;\n  const draggingCards = [];\n  if (sourcePile.classList.contains('tableau-pile')) {\n    // For tableau piles, include all cards from clicked card to end\n    let current = card;\n    while (current && current.parentElement === sourcePile) {\n      if (current.classList.contains('dragging')) {\n        draggingCards.push(current);\n      }\n      current = current.nextElementSibling;\n    }\n  } else {\n    // For other piles, just include the clicked card\n    if (card.classList.contains('dragging')) {\n      draggingCards.push(card);\n    }\n  }\n\n  // Calculate base position relative to the game container\n  const baseX = event.clientX - containerRect.left - offsetX;\n  const baseY = event.clientY - containerRect.top - offsetY;\n\n  // Update positions of dragged cards\n  draggingCards.forEach((dragCard, index) => {\n    dragCard.style.position = 'absolute';\n    dragCard.style.left = `${baseX}px`;\n    dragCard.style.top = `${baseY + index * 35}px`;\n    dragCard.style.transform = 'none';\n    dragCard.style.zIndex = (2000 + index).toString();\n    dragCard.style.pointerEvents = 'none';\n    dragCard.style.visibility = 'visible';\n    dragCard.style.transition = 'none'; // Disable transitions during drag\n    dragCard.style.cursor = 'grabbing';\n  });\n\n  // Reset any cards that shouldn't be dragging\n  document.querySelectorAll('.card.dragging').forEach(c => {\n    if (!draggingCards.includes(c)) {\n      c.classList.remove('dragging');\n      c.style.position = 'absolute';\n      c.style.left = '50%';\n      c.style.transform = 'translateX(-50%)';\n      c.style.zIndex = '';\n      c.style.pointerEvents = 'auto';\n      c.style.cursor = 'grab';\n    }\n  });\n\n  // Check for valid drop targets\n  const dropTarget = document.elementFromPoint(event.clientX, event.clientY);\n  if (dropTarget) {\n    const destinationPile = findClosest(dropTarget, '.tableau-pile, .foundation-pile');\n    const destinationCard = findClosest(dropTarget, '.card:not(.dragging)');\n\n    // Remove highlight from all piles\n    document.querySelectorAll('.tableau-pile, .foundation-pile').forEach(p => {\n      p.classList.remove('valid-target', 'invalid-target');\n    });\n    if (destinationPile) {\n      // Check if the move would be valid\n      const isValid = (0,_moves_js__WEBPACK_IMPORTED_MODULE_0__.isValidMove)(card, destinationPile, destinationCard);\n      destinationPile.classList.add(isValid ? 'valid-target' : 'invalid-target');\n    }\n  }\n}\nfunction handleMouseUp(event) {\n  const card = document.querySelector('.card.dragging');\n  if (!card) return;\n\n  // Get the source pile\n  const sourcePile = findClosest(card, '.tableau-pile, .foundation-pile, #stock, #waste');\n  if (!sourcePile) {\n    // Reset all cards if source pile not found\n    document.querySelectorAll('.card').forEach(c => {\n      c.classList.remove('dragging');\n      c.style.position = 'absolute';\n      c.style.left = '50%';\n      c.style.transform = 'translateX(-50%)';\n      c.style.zIndex = '';\n      c.style.pointerEvents = 'auto';\n      c.style.cursor = 'grab';\n      c.style.transition = 'all 0.2s ease-in-out';\n    });\n    return;\n  }\n\n  // Get all dragging cards from the source pile\n  const draggingCards = [];\n  let current = card;\n  while (current && current.parentElement === sourcePile && current.classList.contains('dragging')) {\n    draggingCards.push(current);\n    current = current.nextElementSibling;\n  }\n\n  // Get the game container for relative positioning\n  const gameContainer = document.getElementById('game-container');\n  if (!gameContainer) {\n    draggingCards.forEach(c => {\n      c.classList.remove('dragging');\n      c.style.position = 'absolute';\n      c.style.left = '50%';\n      c.style.transform = 'translateX(-50%)';\n      c.style.zIndex = '';\n      c.style.pointerEvents = 'auto';\n    });\n    return;\n  }\n  const containerRect = gameContainer.getBoundingClientRect();\n\n  // Temporarily hide dragged cards to find drop target\n  draggingCards.forEach(c => c.style.visibility = 'hidden');\n  const dropTarget = document.elementFromPoint(event.clientX, event.clientY);\n  draggingCards.forEach(c => c.style.visibility = 'visible');\n  if (dropTarget) {\n    const destinationPile = findClosest(dropTarget, '.tableau-pile, .foundation-pile');\n    const destinationCard = findClosest(dropTarget, '.card:not(.dragging)');\n    if (destinationPile) {\n      // Attempt to move the card\n      if ((0,_moves_js__WEBPACK_IMPORTED_MODULE_0__.moveCard)(card, destinationPile, destinationCard)) {\n        // Remove dragging class from all cards before the move\n        draggingCards.forEach(c => {\n          c.classList.remove('dragging');\n          c.style.position = 'absolute';\n          c.style.left = '50%';\n          c.style.transform = 'translateX(-50%)';\n        });\n        // Get the original source pile\n        const sourcePileId = card.dataset.sourcePileId;\n        const sourcePile = document.getElementById(sourcePileId);\n\n        // Update the source pile after the move\n        if (sourcePile && sourcePile.classList.contains('tableau-pile')) {\n          // Get the new last card in the source pile\n          const lastCard = sourcePile.lastElementChild;\n          if (lastCard && lastCard.classList.contains('face-down')) {\n            // Reveal the card\n            lastCard.classList.remove('face-down');\n            lastCard.draggable = true;\n\n            // Update the card's display\n            const suit = lastCard.dataset.suit;\n            const rank = lastCard.dataset.rank;\n            const symbol = lastCard.dataset.symbol;\n            lastCard.querySelector('.card-top').textContent = `${rank}${symbol}`;\n            lastCard.querySelector('.card-center').textContent = symbol;\n            lastCard.querySelector('.card-bottom').textContent = `${rank}${symbol}`;\n\n            // Add event listeners to the newly revealed card\n            lastCard.addEventListener('dragstart', handleDragStart);\n            lastCard.addEventListener('dragend', handleDragEnd);\n            lastCard.addEventListener('mousedown', handleMouseDown);\n          }\n\n          // Update pile height\n          let totalHeight = 180; // Base height\n          Array.from(sourcePile.children).forEach((c, i) => {\n            if (i > 0) {\n              // Skip first card\n              totalHeight += c.classList.contains('face-down') ? 25 : 35;\n            }\n          });\n          sourcePile.style.minHeight = `${totalHeight}px`;\n        }\n\n        // Update destination pile\n        if (destinationPile.classList.contains('tableau-pile')) {\n          let totalHeight = 180; // Base height\n          Array.from(destinationPile.children).forEach((c, i) => {\n            if (i > 0) {\n              // Skip first card\n              totalHeight += c.classList.contains('face-down') ? 25 : 35;\n            }\n          });\n          destinationPile.style.minHeight = `${totalHeight}px`;\n        }\n      } else {\n        // If move was invalid, return cards to original position\n        draggingCards.forEach(c => {\n          c.classList.remove('dragging');\n          c.style.position = 'absolute';\n          c.style.left = '50%';\n          c.style.transform = 'translateX(-50%)';\n          c.style.zIndex = '';\n          c.style.pointerEvents = 'auto';\n          c.style.cursor = 'grab';\n          c.style.transition = 'all 0.2s ease-in-out';\n        });\n      }\n    }\n  }\n\n  // Reset and update all piles\n  document.querySelectorAll('.tableau-pile, .foundation-pile, #stock, #waste').forEach(pile => {\n    const cards = Array.from(pile.children);\n\n    // Reset card styles for non-dragging cards\n    cards.forEach((c, index) => {\n      if (!c.classList.contains('dragging')) {\n        c.style.transform = 'translateX(-50%)';\n        c.style.position = 'absolute';\n        c.style.left = '50%';\n        c.style.opacity = '1';\n        c.style.pointerEvents = 'auto';\n        c.style.visibility = 'visible';\n        c.style.zIndex = (index + 1).toString();\n        c.style.cursor = 'grab';\n\n        // Set draggable state and position based on pile type\n        if (pile.classList.contains('tableau-pile')) {\n          c.draggable = !c.classList.contains('face-down');\n          const spacing = c.classList.contains('face-down') ? 25 : 35;\n          c.style.top = `${index * spacing}px`;\n        } else if (pile.id === 'waste') {\n          // For waste pile, show last 3 cards with proper stacking\n          const lastThreeStart = Math.max(0, cards.length - 3);\n          const relativeIndex = index - lastThreeStart;\n          if (index >= lastThreeStart) {\n            c.style.visibility = 'visible';\n            c.style.top = `${relativeIndex * 35}px`;\n            c.style.zIndex = (index + 1).toString();\n            c.draggable = index === cards.length - 1;\n          } else {\n            c.style.visibility = 'hidden';\n            c.draggable = false;\n          }\n        } else if (pile.classList.contains('foundation-pile')) {\n          c.draggable = index === cards.length - 1;\n          c.style.top = '0';\n          c.style.visibility = index === cards.length - 1 ? 'visible' : 'hidden';\n        } else {\n          c.draggable = false;\n          c.style.top = '0';\n        }\n      }\n    });\n\n    // Update pile heights for tableau piles\n    if (pile.classList.contains('tableau-pile')) {\n      let totalHeight = 180; // Base height\n      cards.forEach((c, i) => {\n        if (i > 0) {\n          // Skip first card\n          totalHeight += c.classList.contains('face-down') ? 25 : 35;\n        }\n      });\n      pile.style.minHeight = `${totalHeight}px`;\n    }\n  });\n\n  // Remove pile highlights\n  document.querySelectorAll('.tableau-pile, .foundation-pile').forEach(pile => {\n    pile.classList.remove('valid-target', 'invalid-target');\n  });\n\n  // Remove event listeners\n  document.removeEventListener('mousemove', handleMouseMove);\n  document.removeEventListener('mouseup', handleMouseUp);\n}\nfunction handleDragStart(event) {\n  event.preventDefault(); // Prevent default drag behavior, we're using our own\n}\nfunction handleDragOver(event) {\n  event.preventDefault();\n}\nfunction handleDrop(event) {\n  event.preventDefault();\n}\nfunction handleDragLeave(event) {\n  const pile = findClosest(event.target, '.tableau-pile, .foundation-pile');\n  if (pile) {\n    pile.classList.remove('valid-target', 'invalid-target');\n  }\n}\nfunction handleDragEnd(event) {\n  // Reset all cards\n  document.querySelectorAll('.card').forEach(c => {\n    c.classList.remove('dragging');\n    c.style.transform = 'translateX(-50%)';\n    c.style.position = 'absolute';\n    c.style.visibility = 'visible';\n    c.style.opacity = '1';\n    c.style.pointerEvents = 'auto';\n    c.draggable = !c.classList.contains('face-down');\n  });\n\n  // Remove pile highlights\n  document.querySelectorAll('.tableau-pile, .foundation-pile').forEach(pile => {\n    pile.classList.remove('valid-target', 'invalid-target');\n  });\n}\n\n\n//# sourceURL=webpack://solitaire/./interactions.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("4596a0bbe0076033b9c3")
/******/ })();
/******/ 
/******/ }
);