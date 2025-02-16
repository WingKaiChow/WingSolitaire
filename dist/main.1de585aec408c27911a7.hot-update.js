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

/***/ "./cards.js":
/*!******************!*\
  !*** ./cards.js ***!
  \******************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createDeck: () => (/* binding */ createDeck),\n/* harmony export */   shuffleDeck: () => (/* binding */ shuffleDeck)\n/* harmony export */ });\nfunction _createForOfIteratorHelper(r, e) { var t = \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && \"number\" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t[\"return\"] || t[\"return\"](); } finally { if (u) throw o; } } }; }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\n// cards.js\nfunction createCard(suit, rank) {\n  return {\n    suit: suit,\n    rank: rank,\n    isFaceUp: false,\n    display: {\n      suit: getSuitSymbol(suit),\n      rank: getRankDisplay(rank)\n    }\n  };\n}\nfunction getSuitSymbol(suit) {\n  var symbols = {\n    'hearts': '♥',\n    'diamonds': '♦',\n    'clubs': '♣',\n    'spades': '♠'\n  };\n  return symbols[suit] || suit;\n}\nfunction getRankDisplay(rank) {\n  if (typeof rank === 'number') return rank.toString();\n  return rank;\n}\nfunction createDeck() {\n  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];\n  var ranks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];\n  var deck = [];\n  for (var _i = 0, _suits = suits; _i < _suits.length; _i++) {\n    var suit = _suits[_i];\n    var _iterator = _createForOfIteratorHelper(ranks),\n      _step;\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var rank = _step.value;\n        deck.push(createCard(suit, rank));\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  }\n  return deck;\n}\nfunction shuffleDeck(deck) {\n  // ... (Your existing shuffleDeck function)\n}\n\n//# sourceURL=webpack://solitaire/./cards.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f65434f2e8b2ee5d3044")
/******/ })();
/******/ 
/******/ }
);