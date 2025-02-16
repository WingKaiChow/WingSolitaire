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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cards_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cards.js */ \"./cards.js\");\n/* harmony import */ var _moves_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moves.js */ \"./moves.js\");\n/* harmony import */ var _interactions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interactions.js */ \"./interactions.js\");\nfunction _createForOfIteratorHelper(r, e) { var t = \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && \"number\" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t[\"return\"] || t[\"return\"](); } finally { if (u) throw o; } } }; }\nfunction _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _iterableToArray(r) { if (\"undefined\" != typeof Symbol && null != r[Symbol.iterator] || null != r[\"@@iterator\"]) return Array.from(r); }\nfunction _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n// game.js\n\n\n\nvar Pile = /*#__PURE__*/function () {\n  function Pile(name, container) {\n    _classCallCheck(this, Pile);\n    this.name = name;\n    this.cards = [];\n    this.pileElement = document.createElement('div');\n    this.pileElement.classList.add('pile');\n    this.pileElement.id = name;\n    container.appendChild(this.pileElement);\n  }\n  return _createClass(Pile, [{\n    key: \"addCard\",\n    value: function addCard(card) {\n      // Remove the card from its previous parent if it exists\n      if (card.parentElement) {\n        card.parentElement.removeChild(card);\n      }\n\n      // Special handling for foundation piles\n      if (this.pileElement.classList.contains('foundation-pile')) {\n        // Hide all cards except the top one\n        Array.from(this.pileElement.children).forEach(function (existingCard) {\n          existingCard.style.visibility = 'hidden';\n        });\n        // Position new card at the top\n        card.style.position = 'absolute';\n        card.style.left = '0';\n        card.style.top = '0';\n        card.style.visibility = 'visible';\n        card.style.width = 'calc(100% - 8px)';\n        card.style.height = 'calc(100% - 8px)';\n        card.style.margin = '4px';\n        card.style.zIndex = this.cards.length + 1;\n      } else if (this.pileElement.classList.contains('tableau-pile')) {\n        // For tableau piles, maintain proper stacking\n        var currentCards = Array.from(this.pileElement.children);\n        card.style.position = 'absolute';\n        card.style.left = '50%';\n        card.style.transform = 'translateX(-50%)';\n        // More spacing for face-up cards\n        var spacing = card.classList.contains('face-down') ? 25 : 35;\n        card.style.top = \"\".concat(currentCards.length * spacing, \"px\");\n        card.style.zIndex = currentCards.length + 1;\n        card.style.visibility = 'visible';\n        card.style.width = 'calc(100% - 8px)';\n        card.style.margin = '4px';\n\n        // Update positions of existing cards to ensure proper spacing\n        currentCards.forEach(function (existingCard, index) {\n          var cardSpacing = existingCard.classList.contains('face-down') ? 25 : 35;\n          existingCard.style.top = \"\".concat(index * cardSpacing, \"px\");\n          existingCard.style.zIndex = index + 1;\n          existingCard.style.visibility = 'visible';\n        });\n      }\n\n      // Sync the cards array with DOM\n      this.cards = Array.from(this.pileElement.children);\n      this.pileElement.appendChild(card);\n      this.cards.push(card);\n\n      // Update pile height for tableau piles\n      if (this.pileElement.classList.contains('tableau-pile')) {\n        var totalHeight = 180; // Base height\n        this.cards.forEach(function (c, i) {\n          if (i > 0) {\n            // Skip first card\n            totalHeight += c.classList.contains('face-down') ? 25 : 35;\n          }\n        });\n        this.pileElement.style.minHeight = \"\".concat(totalHeight, \"px\");\n      }\n    }\n  }, {\n    key: \"removeCard\",\n    value: function removeCard() {\n      if (this.cards.length === 0) return null;\n      // Sync the cards array with DOM before removing\n      this.cards = Array.from(this.pileElement.children);\n      var card = this.cards[this.cards.length - 1];\n      if (card) {\n        this.pileElement.removeChild(card);\n        this.cards.pop();\n\n        // Update pile height for tableau piles\n        if (this.pileElement.classList.contains('tableau-pile')) {\n          var totalHeight = 180; // Base height\n          this.cards.forEach(function (c, i) {\n            if (i > 0) {\n              // Skip first card\n              totalHeight += c.classList.contains('face-down') ? 25 : 35;\n            }\n          });\n          this.pileElement.style.minHeight = \"\".concat(totalHeight, \"px\");\n        }\n        return card;\n      }\n      return null;\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this = this;\n      this.pileElement.innerHTML = ''; // Clear the pile element\n      this.cards.forEach(function (card, index) {\n        if (_this.pileElement.classList.contains('tableau-pile')) {\n          var spacing = card.classList.contains('face-down') ? 25 : 35;\n          card.style.top = \"\".concat(index * spacing, \"px\");\n          card.style.zIndex = index + 1;\n          card.style.visibility = 'visible';\n        }\n        _this.pileElement.appendChild(card);\n      });\n    }\n  }, {\n    key: \"isEmpty\",\n    value: function isEmpty() {\n      return this.cards.length === 0;\n    }\n  }]);\n}();\nfunction initializeGame() {\n  var gameBoard = document.getElementById(\"game-container\");\n  console.log(\"gameBoard\", gameBoard);\n  if (!gameBoard) {\n    console.error(\"Game container element not found.\");\n    return null;\n  }\n\n  // Get existing elements\n  var stockElement = document.getElementById(\"stock\");\n  var wasteElement = document.getElementById(\"waste\");\n  var foundationElement = document.getElementById(\"foundation\");\n  var tableauElement = document.getElementById(\"tableau\");\n  if (!stockElement || !wasteElement || !foundationElement || !tableauElement) {\n    console.error(\"Required game elements not found\");\n    return null;\n  }\n\n  // Clear existing cards while preserving structure\n  stockElement.innerHTML = '';\n  wasteElement.innerHTML = '';\n  foundationElement.querySelectorAll('.foundation-pile').forEach(function (pile) {\n    return pile.innerHTML = '';\n  });\n  tableauElement.innerHTML = '';\n  console.log(\"gameBoard cleared while preserving structure\");\n\n  // Initialize stock and waste piles using existing elements\n  var stockPile = new Pile(\"stock\", stockElement.parentElement);\n  stockPile.pileElement.remove(); // Remove the auto-created element\n  stockPile.pileElement = stockElement; // Use the existing element\n  console.log(\"stock pile created:\", stockPile);\n  var wastePile = new Pile(\"waste\", wasteElement.parentElement);\n  wastePile.pileElement.remove(); // Remove the auto-created element\n  wastePile.pileElement = wasteElement; // Use the existing element\n  console.log(\"waste pile created:\", wastePile);\n\n  // Initialize foundation piles using existing elements\n  console.log(\"foundation element:\", foundationElement);\n  var foundationPiles = foundationElement.querySelectorAll('.foundation-pile');\n  var foundations = Array.from(foundationPiles).map(function (element) {\n    var suit = element.dataset.suit;\n    var pile = new Pile(\"foundation-\".concat(suit), foundationElement);\n    pile.pileElement.remove(); // Remove the auto-created element\n    pile.pileElement = element; // Use the existing element\n    pile.pileElement.dataset.suit = suit; // Ensure suit is set\n    return pile;\n  });\n  console.log(\"foundations\", foundations);\n\n  // Initialize tableau piles\n  var tableaus = Array.from({\n    length: 7\n  }, function (_, i) {\n    var element = document.createElement('div');\n    element.classList.add('tableau-pile');\n    element.id = \"tableau-\".concat(i + 1);\n    element.style.position = 'relative';\n    tableauElement.appendChild(element);\n    var pile = new Pile(\"tableau-\".concat(i + 1), tableauElement);\n    pile.pileElement.remove(); // Remove the auto-created element\n    pile.pileElement = element; // Use the existing element\n    return pile;\n  });\n\n  // Create and shuffle deck\n  var deck = (0,_cards_js__WEBPACK_IMPORTED_MODULE_0__.createDeck)();\n  (0,_cards_js__WEBPACK_IMPORTED_MODULE_0__.shuffleDeck)(deck);\n\n  // Deal to tableaus according to solitaire rules\n  for (var i = 0; i < tableaus.length; i++) {\n    var tableau = tableaus[i];\n\n    // Deal i+1 cards to this tableau\n    for (var j = 0; j < i + 1; j++) {\n      var card = deck.pop();\n      card.isFaceUp = j === i; // Only the top card is face up\n      var cardElement = (0,_interactions_js__WEBPACK_IMPORTED_MODULE_2__.createCardElement)(card);\n\n      // Set draggable and face-down state\n      cardElement.draggable = card.isFaceUp;\n      if (!card.isFaceUp) {\n        cardElement.classList.add('face-down');\n      }\n\n      // Set position and stacking order\n      cardElement.style.position = 'absolute';\n      cardElement.style.left = '50%';\n      cardElement.style.transform = 'translateX(-50%)';\n      cardElement.style.top = \"\".concat(j * (card.isFaceUp ? 35 : 25), \"px\"); // Different spacing for face-up/down\n      cardElement.style.zIndex = j + 1;\n      cardElement.style.visibility = 'visible';\n      cardElement.style.width = 'calc(100% - 8px)';\n      cardElement.style.margin = '4px';\n      tableau.addCard(cardElement);\n\n      // Update tableau height to accommodate stacked cards\n      var totalHeight = 180; // Base height\n      for (var k = 0; k < j; k++) {\n        totalHeight += k === j - 1 ? 35 : 25; // Last card (face-up) gets more spacing\n      }\n      tableau.pileElement.style.minHeight = \"\".concat(totalHeight, \"px\");\n    }\n  }\n\n  // Remaining cards go to stock pile face down\n  while (deck.length > 0) {\n    var _card = deck.pop();\n    _card.isFaceUp = false;\n    var _cardElement = (0,_interactions_js__WEBPACK_IMPORTED_MODULE_2__.createCardElement)(_card);\n    _cardElement.classList.add('face-down');\n    _cardElement.draggable = false;\n    stockPile.addCard(_cardElement);\n  }\n  addEventListeners(stockPile, wastePile, foundations, tableaus);\n  return {\n    stock: stockPile,\n    waste: wastePile,\n    foundations: foundations,\n    tableaus: tableaus\n  };\n}\nfunction addEventListeners(stock, waste, foundations, tableaus) {\n  // Handle stock pile clicks\n  stock.pileElement.addEventListener(\"click\", function () {\n    if (!stock.isEmpty()) {\n      // Disable click handling during card movement\n      stock.pileElement.style.pointerEvents = 'none';\n      var cardElement = stock.removeCard();\n      cardElement.classList.remove('face-down');\n\n      // Update existing cards first\n      waste.cards.forEach(function (card, index) {\n        card.draggable = false;\n        card.style.display = index >= waste.cards.length - 2 ? 'grid' : 'none';\n        if (index >= waste.cards.length - 2) {\n          card.style.top = \"\".concat((index - (waste.cards.length - 3)) * 35, \"px\");\n          card.style.zIndex = index;\n        }\n      });\n\n      // Add the new card\n      cardElement.draggable = true;\n      cardElement.style.display = 'grid';\n      cardElement.style.top = \"\".concat(Math.min(2, waste.cards.length) * 35, \"px\");\n      cardElement.style.zIndex = waste.cards.length + 1;\n      waste.addCard(cardElement);\n      // Re-enable click handling after a short delay\n      setTimeout(function () {\n        stock.pileElement.style.pointerEvents = 'auto';\n      }, 100);\n    } else if (!waste.isEmpty()) {\n      // Disable click handling during recycling\n      stock.pileElement.style.pointerEvents = 'none';\n      waste.pileElement.style.pointerEvents = 'none';\n      try {\n        // Move all waste cards back to stock face down\n        var wasteCards = [];\n        while (!waste.isEmpty()) {\n          wasteCards.push(waste.removeCard());\n        }\n        // Shuffle the waste cards before moving back to stock\n        for (var i = wasteCards.length - 1; i > 0; i--) {\n          var j = Math.floor(Math.random() * (i + 1));\n          var _ref = [wasteCards[j], wasteCards[i]];\n          wasteCards[i] = _ref[0];\n          wasteCards[j] = _ref[1];\n        }\n        wasteCards.forEach(function (cardElement) {\n          cardElement.classList.add('face-down');\n          cardElement.draggable = false;\n          cardElement.style.top = '0'; // Reset vertical position\n          cardElement.style.display = 'grid'; // Reset display\n          stock.addCard(cardElement);\n        });\n      } finally {\n        // Re-enable click handling after operation\n        setTimeout(function () {\n          stock.pileElement.style.pointerEvents = 'auto';\n          waste.pileElement.style.pointerEvents = 'auto';\n        }, 100);\n      }\n    }\n  });\n\n  // Handle tableau pile clicks\n  tableaus.forEach(function (tableau) {\n    tableau.pileElement.addEventListener(\"click\", function (event) {\n      var clickedCard = event.target.closest('.card');\n      if (clickedCard && clickedCard.classList.contains('face-down')) {\n        // Turn over face-down card if it's on top\n        var cards = tableau.cards;\n        if (cards[cards.length - 1] === clickedCard) {\n          clickedCard.classList.remove('face-down');\n          clickedCard.draggable = true;\n        }\n      }\n    });\n  });\n\n  // Add drag and drop event listeners to all piles\n  var allPiles = [].concat(_toConsumableArray(tableaus.map(function (t) {\n    return t.pileElement;\n  })), _toConsumableArray(foundations.map(function (f) {\n    return f.pileElement;\n  })), [waste.pileElement]);\n  allPiles.forEach(function (pile) {\n    pile.addEventListener(\"dragstart\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleDragStart);\n    pile.addEventListener(\"dragend\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleDragEnd);\n    pile.addEventListener(\"dragover\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleDragOver);\n    pile.addEventListener(\"dragleave\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleDragLeave);\n    pile.addEventListener(\"drop\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleDrop);\n  });\n}\nfunction checkWinCondition(gameState) {\n  // Check if all foundation piles have all 13 cards in correct order\n  var _iterator = _createForOfIteratorHelper(gameState.foundations),\n    _step;\n  try {\n    for (_iterator.s(); !(_step = _iterator.n()).done;) {\n      var foundation = _step.value;\n      var cards = foundation.cards;\n      if (cards.length !== 13) return false;\n\n      // Check if cards are in correct order (Ace to King)\n      for (var i = 0; i < cards.length; i++) {\n        var card = cards[i];\n        var rank = card.dataset.rank;\n        var suit = card.dataset.suit;\n\n        // Verify suit matches foundation\n        if (suit !== foundation.pileElement.dataset.suit) return false;\n\n        // Verify rank order (A,2,3...K)\n        var expectedRank = i === 0 ? 'A' : i === 10 ? 'J' : i === 11 ? 'Q' : i === 12 ? 'K' : (i + 1).toString();\n        if (rank !== expectedRank) return false;\n      }\n    }\n  } catch (err) {\n    _iterator.e(err);\n  } finally {\n    _iterator.f();\n  }\n  return true;\n}\n\n// Track the state of the stock pile cycling\nvar gameStateHistory = {\n  lastState: null,\n  cycleStartState: null,\n  cycleCount: 0,\n  movesMade: false,\n  initialStockCount: 0,\n  cardsDrawn: 0,\n  justRecycled: false\n};\nfunction getGameState(gameState) {\n  // Get total cards in foundations\n  var foundationTotal = gameState.foundations.reduce(function (sum, foundation) {\n    return sum + foundation.cards.length;\n  }, 0);\n\n  // Get tableau state string (face-up cards only)\n  var tableauState = gameState.tableaus.map(function (pile) {\n    return pile.cards.filter(function (card) {\n      return !card.classList.contains('face-down');\n    }).map(function (card) {\n      return \"\".concat(card.dataset.rank).concat(card.dataset.suit);\n    }).join(',');\n  }).join('|');\n\n  // Create a state snapshot\n  return {\n    foundationTotal: foundationTotal,\n    tableauState: tableauState,\n    stockEmpty: gameState.stock.isEmpty(),\n    wasteEmpty: gameState.waste.isEmpty(),\n    stockCount: gameState.stock.cards.length\n  };\n}\nfunction statesAreEqual(state1, state2) {\n  if (!state1 || !state2) return false;\n  return state1.foundationTotal === state2.foundationTotal && state1.tableauState === state2.tableauState;\n}\nfunction checkLoseCondition(gameState) {\n  var _gameStateHistory$las, _gameStateHistory$las2;\n  // Function to check if a card has valid moves\n  var hasValidMoves = function hasValidMoves(card) {\n    // Check foundation piles\n    var _iterator2 = _createForOfIteratorHelper(gameState.foundations),\n      _step2;\n    try {\n      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n        var foundation = _step2.value;\n        if ((0,_moves_js__WEBPACK_IMPORTED_MODULE_1__.isValidMove)(card, foundation.pileElement, null)) return true;\n      }\n\n      // Check tableau piles\n    } catch (err) {\n      _iterator2.e(err);\n    } finally {\n      _iterator2.f();\n    }\n    var _iterator3 = _createForOfIteratorHelper(gameState.tableaus),\n      _step3;\n    try {\n      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n        var destPile = _step3.value;\n        var topCard = destPile.cards[destPile.cards.length - 1];\n        if ((0,_moves_js__WEBPACK_IMPORTED_MODULE_1__.isValidMove)(card, destPile.pileElement, topCard)) return true;\n      }\n    } catch (err) {\n      _iterator3.e(err);\n    } finally {\n      _iterator3.f();\n    }\n    return false;\n  };\n  var currentState = getGameState(gameState);\n\n  // Function to check for any valid moves\n  var checkForValidMoves = function checkForValidMoves() {\n    // Check waste pile's top card\n    if (!gameState.waste.isEmpty()) {\n      var wasteTopCard = gameState.waste.cards[gameState.waste.cards.length - 1];\n      if (hasValidMoves(wasteTopCard)) return true;\n    }\n\n    // Check tableau piles\n    var _iterator4 = _createForOfIteratorHelper(gameState.tableaus),\n      _step4;\n    try {\n      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {\n        var sourcePile = _step4.value;\n        if (sourcePile.cards.length === 0) continue;\n        var faceUpCards = sourcePile.cards.filter(function (card) {\n          return !card.classList.contains('face-down');\n        });\n        var _iterator5 = _createForOfIteratorHelper(faceUpCards),\n          _step5;\n        try {\n          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {\n            var card = _step5.value;\n            if (hasValidMoves(card)) return true;\n          }\n        } catch (err) {\n          _iterator5.e(err);\n        } finally {\n          _iterator5.f();\n        }\n      }\n    } catch (err) {\n      _iterator4.e(err);\n    } finally {\n      _iterator4.f();\n    }\n    return false;\n  };\n\n  // If the game state has changed since last check, moves were made\n  if (gameStateHistory.lastState && !statesAreEqual(currentState, gameStateHistory.lastState)) {\n    gameStateHistory.movesMade = true;\n    gameStateHistory.cycleCount = 0;\n    gameStateHistory.cycleStartState = null;\n  }\n\n  // Track when waste is recycled to stock\n  if ((_gameStateHistory$las = gameStateHistory.lastState) !== null && _gameStateHistory$las !== void 0 && _gameStateHistory$las.stockEmpty && !currentState.stockEmpty) {\n    console.log('Waste recycled to stock');\n    gameStateHistory.justRecycled = true;\n    // If we haven't made any moves before recycling\n    if (!gameStateHistory.movesMade) {\n      gameStateHistory.cycleCount++;\n      console.log(\"Cycle count increased to \".concat(gameStateHistory.cycleCount, \" (no moves made before recycling)\"));\n    }\n  }\n\n  // Track cards being drawn from stock\n  if (!currentState.stockEmpty && gameStateHistory.lastState) {\n    if (currentState.stockCount < gameStateHistory.lastState.stockCount) {\n      gameStateHistory.cardsDrawn++;\n      gameStateHistory.justRecycled = false;\n      console.log('=== STOCK PILE UPDATE ===');\n      console.log(\"Cards drawn: \".concat(gameStateHistory.cardsDrawn));\n      console.log(\"Stock remaining: \".concat(currentState.stockCount));\n      console.log(\"Initial stock count: \".concat(gameStateHistory.initialStockCount));\n    }\n  }\n\n  // When stock becomes empty or we've drawn all cards\n  if (currentState.stockEmpty && !((_gameStateHistory$las2 = gameStateHistory.lastState) !== null && _gameStateHistory$las2 !== void 0 && _gameStateHistory$las2.stockEmpty) || gameStateHistory.cardsDrawn >= gameStateHistory.initialStockCount || gameStateHistory.justRecycled) {\n    console.log('\\n=== CYCLE CHECKPOINT ===');\n    console.log('Stock pile:', {\n      isEmpty: currentState.stockEmpty,\n      cardsDrawn: gameStateHistory.cardsDrawn,\n      stockCount: currentState.stockCount,\n      initialCount: gameStateHistory.initialStockCount\n    });\n    console.log('Game state:', {\n      movesMade: gameStateHistory.movesMade,\n      cycleCount: gameStateHistory.cycleCount,\n      foundationCards: currentState.foundationTotal\n    });\n\n    // If we haven't made any moves this cycle\n    if (!gameStateHistory.movesMade) {\n      gameStateHistory.cycleCount++;\n      console.log(\"Cycle count increased to \".concat(gameStateHistory.cycleCount, \" (no moves made this cycle)\"));\n\n      // If we've cycled twice without progress\n      if (gameStateHistory.cycleCount >= 2) {\n        console.log('Two cycles completed without progress, checking for valid moves...');\n        // Final check for any possible moves\n        if (!checkForValidMoves()) {\n          console.log('No valid moves found - game is lost');\n          return true; // Game is lost\n        }\n        console.log('Valid moves still available');\n      }\n    } else {\n      console.log('Moves were made this cycle, resetting cycle count');\n    }\n\n    // Reset for new cycle\n    gameStateHistory.movesMade = false;\n    gameStateHistory.cardsDrawn = 0;\n    gameStateHistory.initialStockCount = gameState.stock.cards.length;\n    gameStateHistory.cycleStartState = currentState;\n  }\n\n  // Update last state\n  gameStateHistory.lastState = currentState;\n\n  // If stock and waste are both empty, check for any valid moves\n  if (currentState.stockEmpty && currentState.wasteEmpty) {\n    console.log('Stock and waste are empty, checking for valid moves...');\n    if (!checkForValidMoves()) {\n      console.log('No valid moves available with empty stock and waste - game is lost');\n      return true; // Game is lost\n    }\n    console.log('Valid moves available with empty stock and waste');\n  }\n  return false;\n}\nfunction gameLoop(gameState) {\n  var gameEnded = false;\n\n  // Reset game state tracking\n  gameStateHistory = {\n    lastState: null,\n    cycleStartState: null,\n    cycleCount: 0,\n    movesMade: false,\n    initialStockCount: gameState.stock.cards.length,\n    cardsDrawn: 0,\n    justRecycled: false\n  };\n\n  // Check for win/lose conditions periodically\n  var gameCheckInterval = setInterval(function () {\n    if (gameEnded) return;\n    if (checkWinCondition(gameState)) {\n      gameEnded = true;\n      clearInterval(gameCheckInterval);\n      setTimeout(function () {\n        alert(\"Congratulations! You've won the game!\");\n      }, 500);\n    } else if (checkLoseCondition(gameState)) {\n      gameEnded = true;\n      clearInterval(gameCheckInterval);\n      setTimeout(function () {\n        alert(\"Game Over! You've cycled through the deck without making progress. No valid moves remain.\");\n      }, 500);\n    }\n  }, 1000);\n  return gameCheckInterval;\n}\ndocument.addEventListener('DOMContentLoaded', function () {\n  console.log('DOMContentLoaded event triggered');\n  var game;\n  var gameInterval;\n  function startGame() {\n    if (gameInterval) {\n      clearInterval(gameInterval);\n    }\n    game = initializeGame();\n    if (game) {\n      gameInterval = gameLoop(game);\n    }\n  }\n  startGame();\n  document.getElementById('new-game-button').addEventListener('click', function () {\n    startGame();\n  });\n});\n\n//# sourceURL=webpack://solitaire/./game.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("2e9652627207d40764aa")
/******/ })();
/******/ 
/******/ }
);