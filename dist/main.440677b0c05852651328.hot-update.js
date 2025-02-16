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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCardElement: () => (/* binding */ createCardElement),\n/* harmony export */   handleDragEnd: () => (/* binding */ handleDragEnd),\n/* harmony export */   handleDragLeave: () => (/* binding */ handleDragLeave),\n/* harmony export */   handleDragOver: () => (/* binding */ handleDragOver),\n/* harmony export */   handleDragStart: () => (/* binding */ handleDragStart),\n/* harmony export */   handleDrop: () => (/* binding */ handleDrop),\n/* harmony export */   handleMouseDown: () => (/* binding */ handleMouseDown)\n/* harmony export */ });\n/* harmony import */ var _moves_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moves.js */ \"./moves.js\");\n// interactions.js\n\nfunction createCardElement(card) {\n  const cardElement = document.createElement(\"div\");\n  cardElement.classList.add(\"card\");\n  if (!card.isFaceUp) {\n    cardElement.classList.add(\"face-down\");\n  }\n  cardElement.dataset.suit = card.suit;\n  cardElement.dataset.rank = card.display.rank;\n  cardElement.dataset.symbol = card.display.suit;\n  cardElement.draggable = card.isFaceUp;\n\n  // Create rank and suit displays\n  const topDisplay = document.createElement(\"div\");\n  topDisplay.textContent = `${card.display.rank}${card.display.suit}`;\n  topDisplay.classList.add(\"card-top\");\n  const centerDisplay = document.createElement(\"div\");\n  centerDisplay.textContent = card.display.suit;\n  centerDisplay.classList.add(\"card-center\");\n  const bottomDisplay = document.createElement(\"div\");\n  bottomDisplay.textContent = `${card.display.rank}${card.display.suit}`;\n  bottomDisplay.classList.add(\"card-bottom\");\n  cardElement.appendChild(topDisplay);\n  cardElement.appendChild(centerDisplay);\n  cardElement.appendChild(bottomDisplay);\n  return cardElement;\n}\n\n// Fallback method to find the closest element\nfunction findClosest(element, selector) {\n  // Cross-browser compatible matches method\n  function elementMatches(el, sel) {\n    if (el.matches) return el.matches(sel);\n    if (el.webkitMatchesSelector) return el.webkitMatchesSelector(sel);\n    if (el.msMatchesSelector) return el.msMatchesSelector(sel);\n    if (el.mozMatchesSelector) return el.mozMatchesSelector(sel);\n\n    // Fallback to manual check if no native method exists\n    const matches = document.querySelectorAll(sel);\n    return Array.from(matches).includes(el);\n  }\n  while (element && !elementMatches(element, selector)) {\n    element = element.parentElement;\n  }\n  return element;\n}\nfunction handleMouseDown(event) {\n  const card = findClosest(event.target, '.card');\n  if (!card) return;\n\n  // Get all cards in the pile\n  const pile = findClosest(card, '.tableau-pile, .foundation-pile, #stock, #waste');\n  if (!pile) return;\n\n  // Get all cards in the pile\n  const cards = Array.from(pile.children);\n  const cardIndex = cards.indexOf(card);\n\n  // Check if we're clicking on a face-down card\n  if (card.classList.contains('face-down')) {\n    return;\n  }\n\n  // Prevent dragging from foundation piles\n  if (pile.classList.contains('foundation-pile')) {\n    return;\n  }\n\n  // Only allow dragging the top card from waste pile\n  if (pile.id === 'waste' && card !== pile.lastElementChild) {\n    return;\n  }\n\n  // For tableau piles, ensure we can only drag face-up cards and their sequences\n  if (pile.classList.contains('tableau-pile')) {\n    // Find the first face-up card in the sequence\n    let firstFaceUpIndex = cards.findIndex(c => !c.classList.contains('face-down'));\n    if (cardIndex < firstFaceUpIndex) {\n      return; // Clicked on a face-down card\n    }\n  }\n\n  // Store initial mouse position and card position\n  const rect = card.getBoundingClientRect();\n  card.dataset.startX = event.clientX;\n  card.dataset.startY = event.clientY;\n  card.dataset.offsetX = event.clientX - rect.left;\n  card.dataset.offsetY = event.clientY - rect.top;\n\n  // Add dragging class for visual feedback\n  card.classList.add('dragging');\n\n  // If dragging from tableau, add dragging class to sequence\n  if (pile.classList.contains('tableau-pile')) {\n    let current = card;\n    let offset = 0;\n    while (current) {\n      if (!current.classList.contains('face-down')) {\n        current.classList.add('dragging');\n        current.style.zIndex = (2000 + offset).toString();\n        current.style.transform = 'translateX(-50%)';\n        current.style.top = `${offset * 35}px`;\n        offset++;\n      }\n      current = current.nextElementSibling;\n    }\n  }\n\n  // Add mousemove and mouseup listeners\n  document.addEventListener('mousemove', handleMouseMove);\n  document.addEventListener('mouseup', handleMouseUp);\n}\nfunction handleMouseMove(event) {\n  const card = document.querySelector('.card.dragging');\n  if (!card) return;\n  const dx = event.clientX - parseInt(card.dataset.startX);\n  const dy = event.clientY - parseInt(card.dataset.startY);\n\n  // Only start dragging if mouse has moved more than 5 pixels\n  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {\n    card.draggable = true;\n\n    // Get the pile containing the card\n    const pile = findClosest(card, '.tableau-pile, .foundation-pile, #stock, #waste');\n    if (pile && pile.classList.contains('tableau-pile')) {\n      // Update positions of all cards in sequence\n      let current = card;\n      let offset = 0;\n      while (current) {\n        if (!current.classList.contains('face-down')) {\n          current.style.position = 'absolute';\n          current.style.left = '50%';\n          current.style.top = `${event.clientY - pile.getBoundingClientRect().top + offset * 35}px`;\n          current.style.transform = 'translateX(-50%)';\n          current.style.zIndex = (2000 + offset).toString();\n          offset++;\n        }\n        current = current.nextElementSibling;\n      }\n    } else {\n      // Update position of single card\n      card.style.position = 'absolute';\n      card.style.left = '50%';\n      card.style.top = `${event.clientY - card.closest('.pile').getBoundingClientRect().top}px`;\n      card.style.transform = 'translateX(-50%)';\n      card.style.zIndex = '2000';\n    }\n\n    // Trigger dragstart event programmatically\n    if (!card.dataset.dragStarted) {\n      const dragEvent = new DragEvent('dragstart', {\n        bubbles: true,\n        cancelable: true,\n        dataTransfer: new DataTransfer()\n      });\n      card.dispatchEvent(dragEvent);\n      card.dataset.dragStarted = 'true';\n    }\n  }\n}\nfunction handleMouseUp(event) {\n  const card = document.querySelector('.card.dragging');\n  if (!card) return;\n\n  // Get the pile containing the card\n  const pile = findClosest(card, '.tableau-pile, .foundation-pile, #stock, #waste');\n  if (pile) {\n    // Remove dragging class from all cards in the pile\n    Array.from(pile.children).forEach(c => {\n      c.classList.remove('dragging');\n      c.style.transform = 'translateX(-50%)';\n      c.style.zIndex = Array.from(pile.children).indexOf(c) + 1;\n      c.style.visibility = 'visible';\n      c.draggable = !c.classList.contains('face-down');\n    });\n  }\n\n  // Remove mousemove and mouseup listeners\n  document.removeEventListener('mousemove', handleMouseMove);\n  document.removeEventListener('mouseup', handleMouseUp);\n}\nfunction handleDragStart(event) {\n  const card = findClosest(event.target, '.card');\n  if (!card || card.classList.contains('face-down')) {\n    event.preventDefault();\n    return;\n  }\n  const pile = findClosest(card, '.tableau-pile, .foundation-pile, #stock, #waste');\n  if (!pile) {\n    event.preventDefault();\n    return;\n  }\n\n  // Prevent dragging from foundation piles\n  if (pile.classList.contains('foundation-pile')) {\n    event.preventDefault();\n    return;\n  }\n\n  // Only allow dragging the top card from waste pile\n  if (pile.id === 'waste' && card !== pile.lastElementChild) {\n    event.preventDefault();\n    return;\n  }\n\n  // Add dragging class for visual feedback\n  card.classList.add('dragging');\n\n  // If dragging from tableau, add dragging class to all cards in sequence\n  if (pile.classList.contains('tableau-pile')) {\n    let current = card;\n    while (current.nextElementSibling) {\n      current.nextElementSibling.classList.add('dragging');\n      current = current.nextElementSibling;\n    }\n  }\n\n  // Set the drag image to null to use the actual card elements\n  event.dataTransfer.setDragImage(document.createElement('div'), 0, 0);\n\n  // Reset draggable state for all cards\n  document.querySelectorAll('.card').forEach(c => {\n    c.draggable = !c.classList.contains('face-down') && !c.classList.contains('dragging');\n  });\n\n  // For tableau piles, handle sequence dragging\n  if (pile.id.startsWith('tableau')) {\n    const cards = Array.from(pile.children);\n    const cardIndex = cards.indexOf(card);\n\n    // Get the sequence of cards from the clicked card to the end\n    const sequence = cards.slice(cardIndex);\n\n    // Set z-index and position for the sequence\n    sequence.forEach((card, index) => {\n      card.style.zIndex = (1000 + index).toString();\n      card.style.transform = 'translateX(-50%)';\n      card.style.top = `${cardIndex * 35 + index * 35}px`;\n      card.style.opacity = '0.8';\n      card.style.pointerEvents = 'none';\n    });\n\n    // Ensure only the clicked card is draggable\n    cards.forEach(c => {\n      c.draggable = c === card;\n    });\n\n    // Store sequence length for drop handling\n    card.dataset.sequenceLength = sequence.length.toString();\n  }\n  try {\n    const dragData = {\n      suit: card.dataset.suit,\n      rank: card.dataset.rank,\n      sourceId: pile.id,\n      cards: []\n    };\n    if (pile.id.startsWith('tableau')) {\n      let current = card;\n      while (current) {\n        dragData.cards.push({\n          suit: current.dataset.suit,\n          rank: current.dataset.rank\n        });\n        current = current.nextElementSibling;\n      }\n    }\n    const jsonData = JSON.stringify(dragData);\n    event.dataTransfer.setData('text/plain', jsonData);\n    event.dataTransfer.setData('application/json', jsonData);\n    event.dataTransfer.effectAllowed = 'move';\n\n    // Visual feedback for dragged cards\n    if (pile.id.startsWith('tableau')) {\n      let current = card;\n      let index = 0;\n      while (current) {\n        current.style.opacity = '0.8';\n        current.style.transform = 'none'; // Remove transform to prevent positioning issues\n        current.style.zIndex = (1000 + index).toString();\n        index++;\n        current = current.nextElementSibling;\n      }\n    } else {\n      card.style.opacity = '0.8';\n      card.style.zIndex = '1000';\n    }\n\n    // Store the dragged card element in a global variable\n    window._draggedCard = card;\n  } catch (error) {\n    console.error('Error setting drag data:', error);\n    event.preventDefault();\n  }\n}\nfunction handleDrop(event) {\n  event.preventDefault();\n\n  // Remove dragging class from all cards\n  document.querySelectorAll('.card.dragging').forEach(card => {\n    card.classList.remove('dragging');\n  });\n  let data;\n  try {\n    // Try both MIME types\n    let transferData = event.dataTransfer.getData('application/json');\n    if (!transferData) {\n      console.log('Trying text/plain fallback');\n      transferData = event.dataTransfer.getData('text/plain');\n    }\n    if (!transferData) {\n      console.error('No data received in drop event');\n      console.log('Available types:', event.dataTransfer.types);\n      return;\n    }\n    console.log('Received transfer data:', transferData);\n    data = JSON.parse(transferData);\n    if (!data.suit || !data.rank || !data.sourceId) {\n      console.error('Invalid drag data format:', data);\n      return;\n    }\n  } catch (error) {\n    console.error('Error parsing drop data:', error);\n    return;\n  }\n\n  // Find the source card and any following cards in the sequence\n  const sourceCard = document.querySelector(`[data-suit=\"${data.suit}\"][data-rank=\"${data.rank}\"]`);\n  const sourceCards = data.cards || [{\n    suit: data.suit,\n    rank: data.rank\n  }];\n  const sourcePile = document.getElementById(data.sourceId);\n\n  // Get the actual element under the drop point\n  const dropTarget = document.elementFromPoint(event.clientX, event.clientY);\n  if (!dropTarget) {\n    console.error('No element found at drop point');\n    return;\n  }\n  let destinationPile = findClosest(dropTarget, '.tableau-pile, .foundation-pile, #stock, #waste');\n  let destinationCard = null;\n\n  // Handle dropping on foundation piles\n  if (dropTarget.classList.contains('foundation-pile') || findClosest(dropTarget, '.foundation-pile')) {\n    destinationPile = dropTarget.classList.contains('foundation-pile') ? dropTarget : findClosest(dropTarget, '.foundation-pile');\n    const foundationCards = Array.from(destinationPile.children);\n    destinationCard = foundationCards[foundationCards.length - 1];\n\n    // Only allow single card moves to foundation\n    if (sourcePile && sourcePile.id.startsWith('tableau')) {\n      const sourceCards = Array.from(sourcePile.children);\n      const cardIndex = sourceCards.indexOf(sourceCard);\n      if (cardIndex < sourceCards.length - 1) {\n        console.log('Cannot move multiple cards to foundation');\n        return;\n      }\n    }\n  } else {\n    // For other piles, get the card being dropped on\n    destinationCard = findClosest(dropTarget, '.card');\n    if (destinationCard) {\n      const cardPile = findClosest(destinationCard, '.tableau-pile, .foundation-pile');\n      if (cardPile) {\n        destinationPile = cardPile;\n      }\n    }\n  }\n\n  // Handle dropping on empty piles\n  if (!destinationPile) {\n    if (dropTarget.classList.contains('tableau-pile')) {\n      destinationPile = dropTarget;\n    } else if (dropTarget.classList.contains('foundation-pile')) {\n      destinationPile = dropTarget;\n      // Only allow Aces on empty foundation piles\n      if (sourceCard.dataset.rank !== 'A' || sourceCard.dataset.suit !== destinationPile.dataset.suit) {\n        console.log('Only Aces can start foundation piles');\n        return;\n      }\n    }\n  }\n  if (!sourceCard) {\n    console.error('Source card not found');\n    return;\n  }\n  if (!destinationPile) {\n    console.error('Destination pile not found');\n    return;\n  }\n\n  // Reset styles for all cards except the ones being dragged\n  document.querySelectorAll('.card:not(.dragging)').forEach(card => {\n    card.style.opacity = '1';\n    card.style.transform = 'translateX(-50%)';\n    card.style.visibility = 'visible';\n    card.style.position = 'absolute';\n    card.style.pointerEvents = 'auto';\n    const pile = findClosest(card, '.tableau-pile, .foundation-pile, #stock, #waste');\n    if (pile) {\n      const cards = Array.from(pile.children);\n      const index = cards.indexOf(card);\n      card.style.zIndex = (index + 1).toString();\n      if (pile.classList.contains('tableau-pile')) {\n        card.style.top = `${index * (card.classList.contains('face-down') ? 25 : 35)}px`;\n      } else {\n        card.style.top = '0';\n      }\n    }\n  });\n\n  // Keep dragged cards visible and on top\n  document.querySelectorAll('.card.dragging').forEach(card => {\n    card.style.opacity = '1';\n    card.style.visibility = 'visible';\n    card.style.pointerEvents = 'none';\n  });\n\n  // Prevent moving cards to the stock or waste piles\n  if (destinationPile.id === 'stock' || destinationPile.id === 'waste') {\n    console.log('Cannot move cards to stock or waste piles');\n    return;\n  }\n  if ((0,_moves_js__WEBPACK_IMPORTED_MODULE_0__.moveCard)(sourceCard, destinationPile, destinationCard)) {\n    // Update all piles after successful move\n    document.querySelectorAll('.tableau-pile, .foundation-pile').forEach(pile => {\n      const cards = Array.from(pile.children);\n      let currentTop = 0;\n      cards.forEach((card, index) => {\n        card.style.transform = 'translateX(-50%)';\n        card.style.position = 'absolute';\n        card.style.zIndex = (index + 1).toString();\n        card.style.visibility = 'visible';\n        card.style.pointerEvents = 'auto';\n        if (pile.classList.contains('tableau-pile')) {\n          card.style.top = `${currentTop}px`;\n          currentTop += card.classList.contains('face-down') ? 25 : 35;\n        } else if (pile.classList.contains('foundation-pile')) {\n          card.style.top = '0';\n          card.style.visibility = index === cards.length - 1 ? 'visible' : 'hidden';\n        }\n      });\n\n      // Update pile heights\n      if (pile.classList.contains('tableau-pile')) {\n        pile.style.minHeight = `${Math.max(currentTop + 200, 200)}px`;\n      }\n    });\n\n    // Turn over the last card in source pile if it's face down\n    if (sourcePile && sourcePile.id.startsWith('tableau')) {\n      const lastCard = sourcePile.lastElementChild;\n      if (lastCard && lastCard.classList.contains('face-down')) {\n        lastCard.classList.remove('face-down');\n        lastCard.draggable = true;\n      }\n    }\n  }\n}\nfunction handleDragOver(event) {\n  event.preventDefault();\n  const destinationPile = findClosest(event.target, '.tableau-pile, .foundation-pile, #stock, #waste');\n  if (destinationPile) {\n    event.dataTransfer.dropEffect = 'move';\n    destinationPile.classList.add('drag-over');\n  }\n}\nfunction handleDragLeave(event) {\n  const pile = findClosest(event.target, '.tableau-pile, .foundation-pile, #stock, #waste');\n  if (pile) {\n    pile.classList.remove('drag-over');\n  }\n}\nfunction handleDragEnd(event) {\n  // Reset all cards to their original state\n  const card = findClosest(event.target, '.card');\n  if (card) {\n    const pile = findClosest(card, '.tableau-pile, .foundation-pile, #stock, #waste');\n    if (pile) {\n      // Remove dragging class from all cards in the pile\n      Array.from(pile.children).forEach((c, index) => {\n        c.classList.remove('dragging');\n        c.style.transform = 'translateX(-50%)';\n        c.style.zIndex = (index + 1).toString();\n        c.style.visibility = 'visible';\n        c.draggable = !c.classList.contains('face-down');\n      });\n    }\n  }\n\n  // Clean up any remaining drag-over states\n  document.querySelectorAll('.tableau-pile, .foundation-pile, #stock, #waste').forEach(pile => {\n    pile.classList.remove('drag-over');\n  });\n}\n\n\n//# sourceURL=webpack://solitaire/./interactions.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("6bac1d2a3362d17ac9fb")
/******/ })();
/******/ 
/******/ }
);