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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cards_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cards.js */ \"./cards.js\");\n/* harmony import */ var _moves_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moves.js */ \"./moves.js\");\n/* harmony import */ var _interactions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interactions.js */ \"./interactions.js\");\nfunction _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _iterableToArray(r) { if (\"undefined\" != typeof Symbol && null != r[Symbol.iterator] || null != r[\"@@iterator\"]) return Array.from(r); }\nfunction _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n// game.js\n\n\n\nvar Pile = /*#__PURE__*/function () {\n  function Pile(name, container) {\n    _classCallCheck(this, Pile);\n    this.name = name;\n    this.cards = [];\n    this.pileElement = document.createElement('div');\n    this.pileElement.classList.add('pile');\n    this.pileElement.id = name;\n    container.appendChild(this.pileElement);\n  }\n  return _createClass(Pile, [{\n    key: \"addCard\",\n    value: function addCard(card) {\n      // Remove the card from its previous parent if it exists\n      if (card.parentElement) {\n        card.parentElement.removeChild(card);\n      }\n      this.cards.push(card);\n      this.pileElement.appendChild(card);\n    }\n  }, {\n    key: \"removeCard\",\n    value: function removeCard() {\n      if (this.cards.length === 0) return null;\n      var card = this.cards.pop();\n      // Check if the card is actually a child of this pile\n      if (this.pileElement.contains(card)) {\n        this.pileElement.removeChild(card);\n      } else {\n        console.warn('Card not found in pile DOM, but was in cards array');\n      }\n      return card;\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this = this;\n      this.pileElement.innerHTML = ''; // Clear the pile element\n      this.cards.forEach(function (card) {\n        _this.pileElement.appendChild(card);\n      });\n    }\n  }, {\n    key: \"isEmpty\",\n    value: function isEmpty() {\n      return this.cards.length === 0;\n    }\n  }]);\n}();\nfunction initializeGame() {\n  var gameBoard = document.getElementById(\"game-container\");\n  console.log(\"gameBoard\", gameBoard);\n  if (!gameBoard) {\n    console.error(\"Game container element not found.\");\n    return null;\n  }\n\n  // Get existing elements\n  var stockElement = document.getElementById(\"stock\");\n  var wasteElement = document.getElementById(\"waste\");\n  var foundationElement = document.getElementById(\"foundation\");\n  var tableauElement = document.getElementById(\"tableau\");\n  if (!stockElement || !wasteElement || !foundationElement || !tableauElement) {\n    console.error(\"Required game elements not found\");\n    return null;\n  }\n\n  // Clear existing cards while preserving structure\n  stockElement.innerHTML = '';\n  wasteElement.innerHTML = '';\n  foundationElement.querySelectorAll('.foundation-pile').forEach(function (pile) {\n    return pile.innerHTML = '';\n  });\n  tableauElement.innerHTML = '';\n  console.log(\"gameBoard cleared while preserving structure\");\n\n  // Initialize stock and waste piles using existing elements\n  var stockPile = new Pile(\"stock\", stockElement.parentElement);\n  stockPile.pileElement.remove(); // Remove the auto-created element\n  stockPile.pileElement = stockElement; // Use the existing element\n  console.log(\"stock pile created:\", stockPile);\n  var wastePile = new Pile(\"waste\", wasteElement.parentElement);\n  wastePile.pileElement.remove(); // Remove the auto-created element\n  wastePile.pileElement = wasteElement; // Use the existing element\n  console.log(\"waste pile created:\", wastePile);\n\n  // Initialize foundation piles using existing elements\n  console.log(\"foundation element:\", foundationElement);\n  var foundationPiles = foundationElement.querySelectorAll('.foundation-pile');\n  var foundations = Array.from(foundationPiles).map(function (element, i) {\n    var pile = new Pile(\"foundation-\".concat(i + 1), foundationElement);\n    pile.pileElement.remove(); // Remove the auto-created element\n    pile.pileElement = element; // Use the existing element\n    return pile;\n  });\n  console.log(\"foundations\", foundations);\n\n  // Initialize tableau piles\n  var tableaus = Array.from({\n    length: 7\n  }, function (_, i) {\n    var element = document.createElement('div');\n    element.classList.add('tableau-pile');\n    element.id = \"tableau-\".concat(i + 1);\n    element.style.position = 'relative';\n    tableauElement.appendChild(element);\n    var pile = new Pile(\"tableau-\".concat(i + 1), tableauElement);\n    pile.pileElement.remove(); // Remove the auto-created element\n    pile.pileElement = element; // Use the existing element\n    return pile;\n  });\n\n  // Create and shuffle deck\n  var deck = (0,_cards_js__WEBPACK_IMPORTED_MODULE_0__.createDeck)();\n  (0,_cards_js__WEBPACK_IMPORTED_MODULE_0__.shuffleDeck)(deck);\n\n  // Deal to tableaus according to solitaire rules\n  for (var i = 0; i < tableaus.length; i++) {\n    var tableau = tableaus[i];\n\n    // Deal i+1 cards to this tableau\n    for (var j = 0; j < i + 1; j++) {\n      var card = deck.pop();\n      card.isFaceUp = j === i; // Only the top card is face up\n      var cardElement = (0,_interactions_js__WEBPACK_IMPORTED_MODULE_2__.createCardElement)(card);\n\n      // Set draggable and face-down state\n      cardElement.draggable = card.isFaceUp;\n      if (!card.isFaceUp) {\n        cardElement.classList.add('face-down');\n      }\n\n      // Set position and stacking order\n      cardElement.style.position = 'absolute';\n      cardElement.style.top = \"\".concat(j * (card.isFaceUp ? 30 : 15), \"px\");\n      cardElement.style.zIndex = j + 1;\n      tableau.addCard(cardElement);\n\n      // Update tableau height to accommodate stacked cards\n      var totalHeight = i * 15 + 180 + 30; // base height + overlap for face-down + extra space for face-up\n      tableau.pileElement.style.minHeight = \"\".concat(totalHeight, \"px\");\n    }\n  }\n\n  // Remaining cards go to stock pile face down\n  while (deck.length > 0) {\n    var _card = deck.pop();\n    _card.isFaceUp = false;\n    var _cardElement = (0,_interactions_js__WEBPACK_IMPORTED_MODULE_2__.createCardElement)(_card);\n    _cardElement.classList.add('face-down');\n    _cardElement.draggable = false;\n    stockPile.addCard(_cardElement);\n  }\n  addEventListeners(stockPile, wastePile, foundations, tableaus);\n  return {\n    stock: stockPile,\n    waste: wastePile,\n    foundations: foundations,\n    tableaus: tableaus\n  };\n}\nfunction addEventListeners(stock, waste, foundations, tableaus) {\n  // Handle stock pile clicks\n  stock.pileElement.addEventListener(\"click\", function () {\n    if (!stock.isEmpty()) {\n      var cardElement = stock.removeCard();\n      cardElement.classList.remove('face-down');\n      cardElement.draggable = true;\n      waste.addCard(cardElement);\n    } else if (!waste.isEmpty()) {\n      // Move all waste cards back to stock face down\n      var wasteCards = [];\n      while (!waste.isEmpty()) {\n        wasteCards.push(waste.removeCard());\n      }\n      // Shuffle the waste cards before moving back to stock\n      for (var i = wasteCards.length - 1; i > 0; i--) {\n        var j = Math.floor(Math.random() * (i + 1));\n        var _ref = [wasteCards[j], wasteCards[i]];\n        wasteCards[i] = _ref[0];\n        wasteCards[j] = _ref[1];\n      }\n      wasteCards.forEach(function (cardElement) {\n        cardElement.classList.add('face-down');\n        cardElement.draggable = false;\n        stock.addCard(cardElement);\n      });\n    }\n  });\n\n  // Handle tableau pile clicks\n  tableaus.forEach(function (tableau) {\n    tableau.pileElement.addEventListener(\"click\", function (event) {\n      var clickedCard = event.target.closest('.card');\n      if (clickedCard && clickedCard.classList.contains('face-down')) {\n        // Turn over face-down card if it's on top\n        var cards = tableau.cards;\n        if (cards[cards.length - 1] === clickedCard) {\n          clickedCard.classList.remove('face-down');\n        }\n      }\n    });\n  });\n\n  // Add drag and drop event listeners to all piles\n  var allPiles = [].concat(_toConsumableArray(tableaus.map(function (t) {\n    return t.pileElement;\n  })), _toConsumableArray(foundations.map(function (f) {\n    return f.pileElement;\n  })), [waste.pileElement]);\n  allPiles.forEach(function (pile) {\n    pile.addEventListener(\"dragstart\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleDragStart);\n    pile.addEventListener(\"dragend\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleDragEnd);\n    pile.addEventListener(\"dragover\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleDragOver);\n    pile.addEventListener(\"dragleave\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleDragLeave);\n    pile.addEventListener(\"drop\", _interactions_js__WEBPACK_IMPORTED_MODULE_2__.handleDrop);\n  });\n}\nfunction checkWinCondition(gameState) {\n  // Check if all cards are in the foundation piles\n  for (var i = 0; i < gameState.foundations.length; i++) {\n    if (gameState.foundations[i].cards.length !== 13) {\n      return false;\n    }\n  }\n  return true;\n}\nfunction gameLoop(gameState) {\n  // Setup drag and drop interactions\n  // setupDragAndDrop(gameState);\n\n  // Check for win condition periodically\n  var winCheckInterval = setInterval(function () {\n    if (checkWinCondition(gameState)) {\n      alert(\"You win!\");\n      clearInterval(winCheckInterval); // Stop checking once the game is won\n    }\n  }, 1000);\n}\ndocument.addEventListener('DOMContentLoaded', function () {\n  console.log('DOMContentLoaded event triggered');\n  var game;\n  function startGame() {\n    game = initializeGame();\n    if (game) {\n      gameLoop(game);\n    }\n  }\n  startGame();\n  document.getElementById('new-game-button').addEventListener('click', function () {\n    startGame();\n  });\n});\n\n//# sourceURL=webpack://solitaire/./game.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("e047f28c3411bb8aef6f")
/******/ })();
/******/ 
/******/ }
);