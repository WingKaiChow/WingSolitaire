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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cards_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cards.js */ \"./cards.js\");\n/* harmony import */ var _moves_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moves.js */ \"./moves.js\");\n/* harmony import */ var _interactions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interactions.js */ \"./interactions.js\");\n// game.js\n\n\n\n\n// Function to add drag event listeners to a card\nfunction addCardEventListeners(card) {\n  card.addEventListener(\"dragstart\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleDragStart);\n  card.addEventListener(\"dragend\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleDragEnd);\n}\nclass Pile {\n  constructor(name, container) {\n    this.name = name;\n    this.cards = [];\n    this.pileElement = document.createElement('div');\n    this.pileElement.classList.add('pile');\n    this.pileElement.id = name;\n    container.appendChild(this.pileElement);\n  }\n  addCard(card) {\n    // Remove the card from its previous parent if it exists\n    if (card.parentElement) {\n      card.parentElement.removeChild(card);\n    }\n\n    // Special handling for foundation piles\n    if (this.pileElement.classList.contains('foundation-pile')) {\n      // Hide all cards except the top one\n      Array.from(this.pileElement.children).forEach(existingCard => {\n        existingCard.style.visibility = 'hidden';\n      });\n      // Position new card at the top\n      card.style.position = 'absolute';\n      card.style.left = '0';\n      card.style.top = '0';\n      card.style.visibility = 'visible';\n      card.style.width = 'calc(100% - 8px)';\n      card.style.height = 'calc(100% - 8px)';\n      card.style.margin = '4px';\n      card.style.zIndex = this.cards.length + 1;\n    } else if (this.pileElement.classList.contains('tableau-pile')) {\n      // For tableau piles, maintain proper stacking\n      const currentCards = Array.from(this.pileElement.children);\n      card.style.position = 'absolute';\n      card.style.left = '50%';\n      card.style.transform = 'translateX(-50%)';\n      // More spacing for face-up cards\n      const spacing = card.classList.contains('face-down') ? 25 : 35;\n      card.style.top = `${currentCards.length * spacing}px`;\n      card.style.zIndex = currentCards.length + 1;\n      card.style.visibility = 'visible';\n      card.style.width = 'calc(100% - 8px)';\n      card.style.margin = '4px';\n\n      // Update positions of existing cards to ensure proper spacing\n      currentCards.forEach((existingCard, index) => {\n        const cardSpacing = existingCard.classList.contains('face-down') ? 25 : 35;\n        existingCard.style.top = `${index * cardSpacing}px`;\n        existingCard.style.zIndex = index + 1;\n        existingCard.style.visibility = 'visible';\n      });\n    }\n\n    // Sync the cards array with DOM\n    this.cards = Array.from(this.pileElement.children);\n    this.pileElement.appendChild(card);\n    this.cards.push(card);\n\n    // Update pile height for tableau piles\n    if (this.pileElement.classList.contains('tableau-pile')) {\n      let totalHeight = 180; // Base height\n      this.cards.forEach((c, i) => {\n        if (i > 0) {\n          // Skip first card\n          totalHeight += c.classList.contains('face-down') ? 25 : 35;\n        }\n      });\n      this.pileElement.style.minHeight = `${totalHeight}px`;\n    }\n  }\n  removeCard() {\n    if (this.cards.length === 0) return null;\n    // Sync the cards array with DOM before removing\n    this.cards = Array.from(this.pileElement.children);\n    let card = this.cards[this.cards.length - 1];\n    if (card) {\n      this.pileElement.removeChild(card);\n      this.cards.pop();\n\n      // Update pile height for tableau piles\n      if (this.pileElement.classList.contains('tableau-pile')) {\n        let totalHeight = 180; // Base height\n        this.cards.forEach((c, i) => {\n          if (i > 0) {\n            // Skip first card\n            totalHeight += c.classList.contains('face-down') ? 25 : 35;\n          }\n        });\n        this.pileElement.style.minHeight = `${totalHeight}px`;\n      }\n      return card;\n    }\n    return null;\n  }\n  render() {\n    this.pileElement.innerHTML = ''; // Clear the pile element\n    this.cards.forEach((card, index) => {\n      if (this.pileElement.classList.contains('tableau-pile')) {\n        const spacing = card.classList.contains('face-down') ? 25 : 35;\n        card.style.top = `${index * spacing}px`;\n        card.style.zIndex = index + 1;\n        card.style.visibility = 'visible';\n      }\n      this.pileElement.appendChild(card);\n    });\n  }\n  isEmpty() {\n    return this.cards.length === 0;\n  }\n}\nfunction initializeGame() {\n  const gameBoard = document.getElementById(\"game-container\");\n  console.log(\"gameBoard\", gameBoard);\n  if (!gameBoard) {\n    console.error(\"Game container element not found.\");\n    return null;\n  }\n\n  // Get existing elements\n  const stockElement = document.getElementById(\"stock\");\n  const wasteElement = document.getElementById(\"waste\");\n  const foundationElement = document.getElementById(\"foundation\");\n  const tableauElement = document.getElementById(\"tableau\");\n  if (!stockElement || !wasteElement || !foundationElement || !tableauElement) {\n    console.error(\"Required game elements not found\");\n    return null;\n  }\n\n  // Clear existing cards while preserving structure\n  stockElement.innerHTML = '';\n  wasteElement.innerHTML = '';\n  foundationElement.querySelectorAll('.foundation-pile').forEach(pile => pile.innerHTML = '');\n  tableauElement.innerHTML = '';\n  console.log(\"gameBoard cleared while preserving structure\");\n\n  // Initialize stock and waste piles using existing elements\n  const stockPile = new Pile(\"stock\", stockElement.parentElement);\n  stockPile.pileElement.remove(); // Remove the auto-created element\n  stockPile.pileElement = stockElement; // Use the existing element\n  console.log(\"stock pile created:\", stockPile);\n  const wastePile = new Pile(\"waste\", wasteElement.parentElement);\n  wastePile.pileElement.remove(); // Remove the auto-created element\n  wastePile.pileElement = wasteElement; // Use the existing element\n  console.log(\"waste pile created:\", wastePile);\n\n  // Initialize foundation piles using existing elements\n  console.log(\"foundation element:\", foundationElement);\n  const foundationPiles = foundationElement.querySelectorAll('.foundation-pile');\n  const foundations = Array.from(foundationPiles).map(element => {\n    const suit = element.dataset.suit;\n    const pile = new Pile(`foundation-${suit}`, foundationElement);\n    pile.pileElement.remove(); // Remove the auto-created element\n    pile.pileElement = element; // Use the existing element\n    pile.pileElement.dataset.suit = suit; // Ensure suit is set\n    return pile;\n  });\n  console.log(\"foundations\", foundations);\n\n  // Initialize tableau piles\n  const tableaus = Array.from({\n    length: 7\n  }, (_, i) => {\n    const element = document.createElement('div');\n    element.classList.add('tableau-pile');\n    element.id = `tableau-${i + 1}`;\n    element.style.position = 'relative';\n    tableauElement.appendChild(element);\n    const pile = new Pile(`tableau-${i + 1}`, tableauElement);\n    pile.pileElement.remove(); // Remove the auto-created element\n    pile.pileElement = element; // Use the existing element\n    pile.pileElement.id = `tableau-${i + 1}`; // Explicitly set the ID\n    console.log(`Created tableau pile: ${pile.pileElement.id}`);\n    return pile;\n  });\n\n  // Create and shuffle deck\n  const deck = (0,_cards_js__WEBPACK_IMPORTED_MODULE_0__.createDeck)();\n  (0,_cards_js__WEBPACK_IMPORTED_MODULE_0__.shuffleDeck)(deck);\n\n  // Deal to tableaus according to solitaire rules\n  for (let i = 0; i < tableaus.length; i++) {\n    const tableau = tableaus[i];\n\n    // Deal i+1 cards to this tableau\n    for (let j = 0; j < i + 1; j++) {\n      const card = deck.pop();\n      card.isFaceUp = j === i; // Only the top card is face up\n      const cardElement = (0,_interactions_js__WEBPACK_IMPORTED_MODULE_2__.createCardElement)(card);\n\n      // Set draggable and face-down state\n      cardElement.draggable = card.isFaceUp;\n      if (!card.isFaceUp) {\n        cardElement.classList.add('face-down');\n      } else {\n        // Add drag event listeners to face-up cards\n        addCardEventListeners(cardElement);\n      }\n\n      // Set position and stacking order\n      cardElement.style.position = 'absolute';\n      cardElement.style.left = '50%';\n      cardElement.style.transform = 'translateX(-50%)';\n      cardElement.style.top = `${j * (card.isFaceUp ? 35 : 25)}px`; // Different spacing for face-up/down\n      cardElement.style.zIndex = j + 1;\n      cardElement.style.visibility = 'visible';\n      cardElement.style.width = 'calc(100% - 8px)';\n      cardElement.style.margin = '4px';\n      tableau.addCard(cardElement);\n\n      // Update tableau height to accommodate stacked cards\n      let totalHeight = 180; // Base height\n      for (let k = 0; k < j; k++) {\n        totalHeight += k === j - 1 ? 35 : 25; // Last card (face-up) gets more spacing\n      }\n      tableau.pileElement.style.minHeight = `${totalHeight}px`;\n    }\n  }\n\n  // Remaining cards go to stock pile face down\n  while (deck.length > 0) {\n    const card = deck.pop();\n    card.isFaceUp = false;\n    const cardElement = (0,_interactions_js__WEBPACK_IMPORTED_MODULE_2__.createCardElement)(card);\n    cardElement.classList.add('face-down');\n    cardElement.draggable = false;\n    stockPile.addCard(cardElement);\n  }\n  addEventListeners(stockPile, wastePile, foundations, tableaus);\n  return {\n    stock: stockPile,\n    waste: wastePile,\n    foundations,\n    tableaus\n  };\n}\nfunction addEventListeners(stock, waste, foundations, tableaus) {\n  // Handle stock pile clicks\n  stock.pileElement.addEventListener(\"click\", () => {\n    if (!stock.isEmpty()) {\n      console.log('\\n=== DRAWING FROM STOCK ===');\n      console.log('Stock cards:', stock.cards.length);\n      console.log('Waste cards:', waste.cards.length);\n\n      // Disable click handling during card movement\n      stock.pileElement.style.pointerEvents = 'none';\n      let cardElement = stock.removeCard();\n      cardElement.classList.remove('face-down');\n\n      // Prepare the card for waste pile\n      cardElement.classList.remove('face-down');\n      cardElement.draggable = true;\n      cardElement.style.position = 'absolute';\n      cardElement.style.left = '50%';\n      cardElement.style.transform = 'translateX(-50%)';\n      cardElement.style.display = 'grid';\n      cardElement.style.visibility = 'visible';\n\n      // Add event listeners\n      addCardEventListeners(cardElement);\n      cardElement.addEventListener('mousedown', _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleMouseDown);\n\n      // Add to waste pile\n      waste.addCard(cardElement);\n\n      // Update all waste pile cards\n      const wasteCards = Array.from(waste.pileElement.children);\n      const lastThreeStartIndex = Math.max(0, wasteCards.length - 3);\n      wasteCards.forEach((card, index) => {\n        if (index < lastThreeStartIndex) {\n          // Hide cards not in last three\n          card.style.visibility = 'hidden';\n          card.draggable = false;\n          card.style.zIndex = index + 1;\n        } else {\n          // Show last three cards with proper stacking\n          const relativeIndex = index - lastThreeStartIndex;\n          card.style.visibility = 'visible';\n          card.style.top = `${relativeIndex * 35}px`;\n          card.style.zIndex = index + 1;\n          card.draggable = index === wasteCards.length - 1;\n        }\n      });\n      console.log('After draw:');\n      console.log('Stock cards:', stock.cards.length);\n      console.log('Waste cards:', waste.cards.length);\n      // Re-enable click handling after a short delay\n      setTimeout(() => {\n        stock.pileElement.style.pointerEvents = 'auto';\n      }, 100);\n    } else if (!waste.isEmpty()) {\n      console.log('\\n=== RECYCLING WASTE TO STOCK ===');\n      console.log('Before recycling:');\n      console.log('Stock cards:', stock.cards.length);\n      console.log('Waste cards:', waste.cards.length);\n\n      // Disable click handling during recycling\n      stock.pileElement.style.pointerEvents = 'none';\n      waste.pileElement.style.pointerEvents = 'none';\n      try {\n        // Move all waste cards back to stock face down in reverse order\n        const wasteCards = [];\n        while (!waste.isEmpty()) {\n          wasteCards.unshift(waste.removeCard()); // Add to front to maintain order\n        }\n        console.log('Cards being recycled:', wasteCards.length);\n\n        // Add cards back to stock in the same order\n        wasteCards.forEach(cardElement => {\n          cardElement.classList.add('face-down');\n          cardElement.draggable = false;\n          cardElement.style.position = 'absolute';\n          cardElement.style.left = '50%';\n          cardElement.style.transform = 'translateX(-50%)';\n          cardElement.style.top = '0';\n          cardElement.style.display = 'grid';\n          cardElement.style.visibility = 'visible';\n          stock.addCard(cardElement);\n        });\n        console.log('After recycling:');\n        console.log('Stock cards:', stock.cards.length);\n        console.log('Waste cards:', waste.cards.length);\n      } finally {\n        // Re-enable click handling after operation\n        setTimeout(() => {\n          stock.pileElement.style.pointerEvents = 'auto';\n          waste.pileElement.style.pointerEvents = 'auto';\n        }, 100);\n      }\n    }\n  });\n\n  // Handle tableau pile clicks\n  tableaus.forEach(tableau => {\n    tableau.pileElement.addEventListener(\"click\", event => {\n      const clickedCard = event.target.closest('.card');\n      if (clickedCard && clickedCard.classList.contains('face-down')) {\n        // Turn over face-down card if it's on top\n        const cards = tableau.cards;\n        if (cards[cards.length - 1] === clickedCard) {\n          clickedCard.classList.remove('face-down');\n          clickedCard.draggable = true;\n          // Add drag event listeners when card is turned face up\n          addCardEventListeners(clickedCard);\n        }\n      }\n    });\n  });\n\n  // Add drag and drop event listeners\n  const allPiles = [...tableaus.map(t => t.pileElement), ...foundations.map(f => f.pileElement), waste.pileElement];\n\n  // Add drop event listeners to piles\n  allPiles.forEach(pile => {\n    pile.addEventListener(\"dragover\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleDragOver);\n    pile.addEventListener(\"dragleave\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleDragLeave);\n    pile.addEventListener(\"drop\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleDrop);\n  });\n\n  // Add event listeners to existing face-up cards\n  allPiles.forEach(pile => {\n    Array.from(pile.children).forEach(card => {\n      if (!card.classList.contains('face-down') || pile.id === 'waste') {\n        addCardEventListeners(card);\n        card.addEventListener('mousedown', _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleMouseDown);\n        card.draggable = true;\n      }\n    });\n  });\n\n  // Make addCardEventListeners available globally for new cards\n  window.addCardEventListeners = function (card) {\n    card.addEventListener(\"dragstart\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleDragStart);\n    card.addEventListener(\"dragend\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleDragEnd);\n    card.addEventListener(\"mousedown\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleMouseDown);\n  };\n}\nfunction checkWinCondition(gameState) {\n  // Check if all foundation piles have all 13 cards in correct order\n  for (const foundation of gameState.foundations) {\n    const cards = foundation.cards;\n    if (cards.length !== 13) return false;\n\n    // Check if cards are in correct order (Ace to King)\n    for (let i = 0; i < cards.length; i++) {\n      const card = cards[i];\n      const rank = card.dataset.rank;\n      const suit = card.dataset.suit;\n\n      // Verify suit matches foundation\n      if (suit !== foundation.pileElement.dataset.suit) return false;\n\n      // Verify rank order (A,2,3...K)\n      const expectedRank = i === 0 ? 'A' : i === 10 ? 'J' : i === 11 ? 'Q' : i === 12 ? 'K' : (i + 1).toString();\n      if (rank !== expectedRank) return false;\n    }\n  }\n  return true;\n}\n\n// Track the state of the stock pile cycling\nlet gameStateHistory = {\n  lastState: null,\n  cycleStartState: null,\n  cycleCount: 0,\n  movesMade: false,\n  initialStockCount: 0,\n  cardsDrawn: 0,\n  justRecycled: false\n};\nfunction getGameState(gameState) {\n  // Get total cards in foundations\n  const foundationTotal = gameState.foundations.reduce((sum, foundation) => sum + foundation.cards.length, 0);\n\n  // Get tableau state string (face-up cards only)\n  const tableauState = gameState.tableaus.map(pile => pile.cards.filter(card => !card.classList.contains('face-down')).map(card => `${card.dataset.rank}${card.dataset.suit}`).join(',')).join('|');\n\n  // Create a state snapshot\n  return {\n    foundationTotal,\n    tableauState,\n    stockEmpty: gameState.stock.isEmpty(),\n    wasteEmpty: gameState.waste.isEmpty(),\n    stockCount: gameState.stock.cards.length\n  };\n}\nfunction statesAreEqual(state1, state2) {\n  if (!state1 || !state2) return false;\n  return state1.foundationTotal === state2.foundationTotal && state1.tableauState === state2.tableauState;\n}\nfunction checkLoseCondition(gameState) {\n  // Comprehensive move checking function\n  const findAllValidMoves = () => {\n    const validMoves = [];\n    console.log('\\n=== CHECKING VALID MOVES ===');\n    console.log('Waste pile:', gameState.waste.cards.length);\n    console.log('Tableau piles:', gameState.tableaus.map((t, index) => ({\n      id: t.pileElement.id,\n      cards: t.cards.length,\n      faceUpCards: t.cards.filter(card => !card.classList.contains('face-down')).length\n    })));\n\n    // Debug: Log all tableau pile details\n    gameState.tableaus.forEach((tableau, index) => {\n      console.log(`Tableau ${index + 1} details:`, {\n        id: tableau.pileElement.id,\n        totalCards: tableau.cards.length,\n        faceUpCards: tableau.cards.filter(card => !card.classList.contains('face-down')).map(card => `${card.dataset.rank} ${card.dataset.suit}`)\n      });\n    });\n\n    // Check waste pile's top card\n    if (!gameState.waste.isEmpty()) {\n      const wasteTopCard = gameState.waste.cards[gameState.waste.cards.length - 1];\n      console.log('Waste top card:', wasteTopCard.dataset.rank, wasteTopCard.dataset.suit);\n\n      // Check moves to foundations\n      for (const foundation of gameState.foundations) {\n        if ((0,_moves_js__WEBPACK_IMPORTED_MODULE_1__.isValidMove)(wasteTopCard, foundation.pileElement, null)) {\n          console.log(`Valid move: Waste card to foundation ${foundation.pileElement.dataset.suit}`);\n          validMoves.push({\n            card: wasteTopCard,\n            source: 'waste',\n            destination: foundation.pileElement\n          });\n        }\n      }\n\n      // Check moves to tableau piles\n      for (const destPile of gameState.tableaus) {\n        const topCard = destPile.cards[destPile.cards.length - 1];\n        console.log(`Checking waste card move to tableau pile ${destPile.pileElement.id}`);\n        console.log('Destination top card:', topCard ? `${topCard.dataset.rank} ${topCard.dataset.suit}` : 'Empty pile');\n        if ((0,_moves_js__WEBPACK_IMPORTED_MODULE_1__.isValidMove)(wasteTopCard, destPile.pileElement, topCard)) {\n          console.log(`Valid move: Waste card to tableau pile ${destPile.pileElement.id}`);\n          validMoves.push({\n            card: wasteTopCard,\n            source: 'waste',\n            destination: destPile.pileElement\n          });\n        }\n      }\n    }\n\n    // Check tableau piles for moves\n    for (const sourcePile of gameState.tableaus) {\n      const faceUpCards = sourcePile.cards.filter(card => !card.classList.contains('face-down'));\n      console.log(`Checking tableau pile ${sourcePile.pileElement.id}: ${faceUpCards.length} face-up cards`);\n      for (const card of faceUpCards) {\n        console.log(`Checking card from ${sourcePile.pileElement.id}: ${card.dataset.rank} ${card.dataset.suit}`);\n\n        // Check moves to foundations\n        for (const foundation of gameState.foundations) {\n          if ((0,_moves_js__WEBPACK_IMPORTED_MODULE_1__.isValidMove)(card, foundation.pileElement, null)) {\n            console.log(`Valid move: Card to foundation ${foundation.pileElement.dataset.suit}`);\n            validMoves.push({\n              card,\n              source: sourcePile.pileElement.id,\n              destination: foundation.pileElement\n            });\n          }\n        }\n\n        // Check moves between tableau piles\n        for (const destPile of gameState.tableaus) {\n          if (destPile === sourcePile) continue;\n          const topCard = destPile.cards[destPile.cards.length - 1];\n          console.log(`Checking move to tableau pile ${destPile.pileElement.id}`);\n          console.log('Destination top card:', topCard ? `${topCard.dataset.rank} ${topCard.dataset.suit}` : 'Empty pile');\n          if ((0,_moves_js__WEBPACK_IMPORTED_MODULE_1__.isValidMove)(card, destPile.pileElement, topCard)) {\n            console.log(`Valid move: Card to tableau pile ${destPile.pileElement.id}`);\n            validMoves.push({\n              card,\n              source: sourcePile.pileElement.id,\n              destination: destPile.pileElement\n            });\n          }\n        }\n      }\n    }\n    console.log(`Total valid moves found: ${validMoves.length}`);\n    return validMoves;\n  };\n  const currentState = getGameState(gameState);\n\n  // Track game state changes\n  if (gameStateHistory.lastState && !statesAreEqual(currentState, gameStateHistory.lastState)) {\n    gameStateHistory.movesMade = true;\n    gameStateHistory.cycleCount = 0;\n    gameStateHistory.cycleStartState = null;\n  }\n\n  // Track when waste is recycled to stock\n  if (gameStateHistory.lastState?.stockEmpty && !currentState.stockEmpty) {\n    console.log('Waste recycled to stock');\n    gameStateHistory.justRecycled = true;\n    if (!gameStateHistory.movesMade) {\n      gameStateHistory.cycleCount++;\n      console.log(`Cycle count increased to ${gameStateHistory.cycleCount} (no moves made before recycling)`);\n    }\n  }\n\n  // Track cards being drawn from stock\n  if (!currentState.stockEmpty && gameStateHistory.lastState) {\n    if (currentState.stockCount < gameStateHistory.lastState.stockCount) {\n      gameStateHistory.cardsDrawn++;\n      gameStateHistory.justRecycled = false;\n      console.log('\\n=== STOCK PILE UPDATE ===');\n      console.log('Card movement:', {\n        cardsDrawn: gameStateHistory.cardsDrawn,\n        totalDrawn: gameStateHistory.initialStockCount - currentState.stockCount,\n        stockRemaining: currentState.stockCount,\n        initialStock: gameStateHistory.initialStockCount,\n        wasteCards: gameState.waste.cards.length\n      });\n    }\n  }\n\n  // Comprehensive move checking\n  const validMoves = findAllValidMoves();\n\n  // Always log move details for debugging\n  const moveDetails = validMoves.map(move => ({\n    source: move.source,\n    destination: move.destination.id,\n    card: `${move.card.dataset.rank} ${move.card.dataset.suit}`\n  }));\n\n  // Ensure comprehensive logging\n  console.group('Move Detection');\n  try {\n    console.log(`Total valid moves found: ${validMoves.length}`);\n    console.log('Move details:', JSON.stringify(moveDetails, null, 2));\n    if (validMoves.length === 0) {\n      console.log('No valid moves available at this time.');\n    }\n  } finally {\n    console.groupEnd();\n  }\n\n  // When stock becomes empty or we've drawn all cards\n  if (currentState.stockEmpty && !gameStateHistory.lastState?.stockEmpty || gameStateHistory.cardsDrawn >= gameStateHistory.initialStockCount || gameStateHistory.justRecycled) {\n    console.log('\\n=== CYCLE CHECKPOINT ===');\n    console.log('Stock pile:', {\n      isEmpty: currentState.stockEmpty,\n      cardsDrawn: gameStateHistory.cardsDrawn,\n      stockCount: currentState.stockCount,\n      initialCount: gameStateHistory.initialStockCount,\n      totalMoved: gameStateHistory.initialStockCount - currentState.stockCount + gameState.waste.cards.length\n    });\n    console.log('Game state:', {\n      movesMade: gameStateHistory.movesMade,\n      cycleCount: gameStateHistory.cycleCount,\n      foundationCards: currentState.foundationTotal,\n      wasteCards: gameState.waste.cards.length\n    });\n\n    // If we haven't made any moves this cycle\n    if (!gameStateHistory.movesMade) {\n      gameStateHistory.cycleCount++;\n      console.log(`Cycle count increased to ${gameStateHistory.cycleCount} (no moves made this cycle)`);\n\n      // If we've cycled twice without progress\n      if (gameStateHistory.cycleCount >= 2 && validMoves.length === 0) {\n        console.log('Two cycles completed without progress, no valid moves - game is lost');\n        return true; // Game is lost\n      }\n    } else {\n      console.log('Moves were made this cycle, resetting cycle count');\n    }\n\n    // Reset for new cycle\n    gameStateHistory.movesMade = false;\n    gameStateHistory.cardsDrawn = 0;\n    gameStateHistory.initialStockCount = gameState.stock.cards.length;\n    gameStateHistory.cycleStartState = currentState;\n  }\n\n  // Update last state\n  gameStateHistory.lastState = currentState;\n\n  // If stock and waste are both empty, check for any valid moves\n  if (currentState.stockEmpty && currentState.wasteEmpty) {\n    console.log('Stock and waste are empty, checking for valid moves...');\n    if (validMoves.length === 0) {\n      console.log('No valid moves available with empty stock and waste - game is lost');\n      return true; // Game is lost\n    }\n    console.log('Valid moves available with empty stock and waste');\n  }\n  return false;\n}\nfunction gameLoop(gameState) {\n  let gameEnded = false;\n\n  // Reset game state tracking\n  gameStateHistory = {\n    lastState: null,\n    cycleStartState: null,\n    cycleCount: 0,\n    movesMade: false,\n    initialStockCount: gameState.stock.cards.length,\n    cardsDrawn: 0,\n    justRecycled: false\n  };\n\n  // Check for win/lose conditions periodically\n  const gameCheckInterval = setInterval(() => {\n    if (gameEnded) return;\n    if (checkWinCondition(gameState)) {\n      gameEnded = true;\n      clearInterval(gameCheckInterval);\n      setTimeout(() => {\n        alert(\"Congratulations! You've won the game!\");\n      }, 500);\n    } else if (checkLoseCondition(gameState)) {\n      gameEnded = true;\n      clearInterval(gameCheckInterval);\n      setTimeout(() => {\n        alert(\"Game Over! You've cycled through the deck without making progress. No valid moves remain.\");\n      }, 500);\n    }\n  }, 1000);\n  return gameCheckInterval;\n}\ndocument.addEventListener('DOMContentLoaded', () => {\n  console.log('DOMContentLoaded event triggered');\n  let game;\n  let gameInterval;\n  function startGame() {\n    if (gameInterval) {\n      clearInterval(gameInterval);\n    }\n    game = initializeGame();\n    if (game) {\n      gameInterval = gameLoop(game);\n    }\n  }\n  startGame();\n  document.getElementById('new-game-button').addEventListener('click', () => {\n    startGame();\n  });\n});\n\n//# sourceURL=webpack://solitaire/./game.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7fde40d87957c1b9eae8")
/******/ })();
/******/ 
/******/ }
);