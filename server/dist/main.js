/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var app = __webpack_require__(/*! ./index */ \"./src/index.js\");\n\nvar port = process.env.PORT || 5000;\napp.listen(port, function () {\n  console.log(\"listening at port \".concat(port));\n});\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/config/database.js":
/*!********************************!*\
  !*** ./src/config/database.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\n\nvar _process$env = process.env,\n    DB_NAME = \"mediumdb\",\n    HOST = _process$env.HOST,\n    DB_USER = \"postgres\",\n    DB_PASS = \"nnnsss\";\nmodule.exports = new Sequelize(DB_NAME, DB_USER, DB_PASS, {\n  host: HOST,\n  dialect: 'postgres',\n  pool: {\n    max: 5,\n    min: 0,\n    acquire: 30000,\n    idle: 1000\n  },\n  define: {\n    timestamps: false\n  },\n  logging: false\n});\n\n//# sourceURL=webpack:///./src/config/database.js?");

/***/ }),

/***/ "./src/controllers/isLoggedIn.js":
/*!***************************************!*\
  !*** ./src/controllers/isLoggedIn.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar getUser = __webpack_require__(/*! ./user/getUser */ \"./src/controllers/user/getUser.js\");\n\nvar isLoggedIn =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req) {\n    var userId, user, isAuthorized;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            if (req.session) {\n              _context.next = 2;\n              break;\n            }\n\n            return _context.abrupt(\"return\", false);\n\n          case 2:\n            if (!req.session.user) {\n              _context.next = 15;\n              break;\n            }\n\n            // lookup the user in the DB by pulling their email from the session\n            userId = req.session.user.id;\n            _context.next = 6;\n            return getUser({\n              id: userId\n            });\n\n          case 6:\n            user = _context.sent;\n\n            if (!user) {\n              _context.next = 12;\n              break;\n            }\n\n            isAuthorized = user.session_ids.split(',').some(function (session_id) {\n              return session_id === req.sessionID;\n            });\n\n            if (!isAuthorized) {\n              _context.next = 11;\n              break;\n            }\n\n            return _context.abrupt(\"return\", true);\n\n          case 11:\n            // clear the browser session\n            req.session.destroy(function (err) {\n              if (err) {\n                console.log(err);\n              }\n            });\n\n          case 12:\n            return _context.abrupt(\"return\", false);\n\n          case 15:\n            return _context.abrupt(\"return\", false);\n\n          case 16:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function isLoggedIn(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = isLoggedIn;\n\n//# sourceURL=webpack:///./src/controllers/isLoggedIn.js?");

/***/ }),

/***/ "./src/controllers/post/createPost.js":
/*!********************************************!*\
  !*** ./src/controllers/post/createPost.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar Post = __webpack_require__(/*! ../../models/Post */ \"./src/models/Post.js\");\n\nvar getUser = __webpack_require__(/*! ../../controllers/user/getUser */ \"./src/controllers/user/getUser.js\");\n\nvar updateUser = __webpack_require__(/*! ../../controllers/user/updateUser */ \"./src/controllers/user/updateUser.js\");\n\nvar registerTags = __webpack_require__(/*! ../tag/registerTags */ \"./src/controllers/tag/registerTags.js\"); // @param post is an object with title, about, body, tags properties\n// @param userId is the id of the poster\n\n\nvar parseTags = function parseTags(post) {\n  var tags = post.tags || '';\n  console.log('*********', tags);\n\n  if (!tags) {\n    return [];\n  }\n\n  return tags.split(' ');\n};\n\nvar createPost =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(post, userId) {\n    var user, username, createdPost, userPosts;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            post.user = userId; // add timestamp and tags\n\n            post.createdAt = new Date().getTime();\n            post.tags = parseTags(post);\n            _context.prev = 3;\n            _context.next = 6;\n            return getUser({\n              id: userId\n            });\n\n          case 6:\n            user = _context.sent;\n            username = user.name;\n            post.username = username;\n            _context.next = 11;\n            return Post.create(post);\n\n          case 11:\n            createdPost = _context.sent;\n            _context.next = 14;\n            return registerTags(post.tags, createdPost.id);\n\n          case 14:\n            // update the posts id column in the database on user table\n            userPosts = user.posts || [];\n            userPosts.push(parseInt(createdPost.id));\n            _context.next = 18;\n            return updateUser(userId, {\n              posts: userPosts\n            });\n\n          case 18:\n            _context.next = 23;\n            break;\n\n          case 20:\n            _context.prev = 20;\n            _context.t0 = _context[\"catch\"](3);\n            throw _context.t0;\n\n          case 23:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[3, 20]]);\n  }));\n\n  return function createPost(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = createPost;\n\n//# sourceURL=webpack:///./src/controllers/post/createPost.js?");

/***/ }),

/***/ "./src/controllers/post/deletePost.js":
/*!********************************************!*\
  !*** ./src/controllers/post/deletePost.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar Post = __webpack_require__(/*! ../../models/Post */ \"./src/models/Post.js\");\n\nvar deletePost =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(postData) {\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return Post.destroy({\n              where: _objectSpread({}, postData)\n            });\n\n          case 2:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function deletePost(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = deletePost;\n\n//# sourceURL=webpack:///./src/controllers/post/deletePost.js?");

/***/ }),

/***/ "./src/controllers/post/getPost.js":
/*!*****************************************!*\
  !*** ./src/controllers/post/getPost.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar Post = __webpack_require__(/*! ../../models/Post */ \"./src/models/Post.js\");\n\nvar textVersion = __webpack_require__(/*! textversionjs */ \"textversionjs\");\n\nvar getPost =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(data) {\n    var post;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return Post.findOne({\n              where: _objectSpread({}, data)\n            });\n\n          case 2:\n            post = _context.sent;\n\n            if (post.title) {\n              post.title = textVersion(post.title);\n            }\n\n            return _context.abrupt(\"return\", post);\n\n          case 5:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function getPost(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = getPost;\n\n//# sourceURL=webpack:///./src/controllers/post/getPost.js?");

/***/ }),

/***/ "./src/controllers/post/parsePost.js":
/*!*******************************************!*\
  !*** ./src/controllers/post/parsePost.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar readingTime = __webpack_require__(/*! reading-time */ \"reading-time\");\n\nvar getUser = __webpack_require__(/*! ../user/getUser */ \"./src/controllers/user/getUser.js\");\n\nvar isSavedAndLiked =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(postId, likedPosts, savedPosts) {\n    var saved, liked;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            // determine if post is liked and saved by the user if id `userId`\n            saved = false;\n            liked = false;\n\n            if (savedPosts.indexOf(postId) !== -1) {\n              saved = true;\n            }\n\n            if (likedPosts.indexOf(postId) !== -1) {\n              liked = true;\n            }\n\n            return _context.abrupt(\"return\", {\n              saved: saved,\n              liked: liked\n            });\n\n          case 5:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function isSavedAndLiked(_x, _x2, _x3) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nvar parseComments = function parseComments(post, loggedUserId) {\n  var comments = post.comments || [];\n\n  if (typeof comments === 'string') {\n    comments = JSON.parse(comments);\n  }\n\n  return comments.map(function (comment) {\n    var likedBy = comment.likedBy || [];\n    comment.isLiked = likedBy.indexOf(loggedUserId) !== -1;\n    return comment;\n  });\n};\n\nvar parsePost =\n/*#__PURE__*/\nfunction () {\n  var _ref2 = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee3(post, loggedUserId) {\n    var posts, singlePost;\n    return regeneratorRuntime.wrap(function _callee3$(_context3) {\n      while (1) {\n        switch (_context3.prev = _context3.next) {\n          case 0:\n            // determine if argument `post` is a single post or a list (of posts)\n            // @param `loggedUserId` is only passed when client is authorized / logged in\n            if (post.title) {\n              singlePost = true;\n              posts = [post];\n            } else {\n              singlePost = false;\n              posts = post;\n            }\n\n            if (!loggedUserId) {\n              _context3.next = 7;\n              break;\n            }\n\n            _context3.next = 4;\n            return getUser({\n              id: loggedUserId\n            });\n\n          case 4:\n            loggedUser = _context3.sent;\n            savedPosts = loggedUser.savedPosts || [];\n            likedPosts = loggedUser.likedPosts || [];\n\n          case 7:\n            _context3.next = 9;\n            return Promise.all(posts.map(\n            /*#__PURE__*/\n            function () {\n              var _ref3 = _asyncToGenerator(\n              /*#__PURE__*/\n              regeneratorRuntime.mark(function _callee2(post) {\n                var savedAndLiked;\n                return regeneratorRuntime.wrap(function _callee2$(_context2) {\n                  while (1) {\n                    switch (_context2.prev = _context2.next) {\n                      case 0:\n                        post.likedBy = post.likedBy || [];\n                        post.comments = parseComments(post, loggedUserId);\n                        post.dataValues.readingTime = readingTime(post.body).text;\n                        post.dataValues.date = new Date(parseInt(post.createdAt)).toDateString().split(' ').splice(1).join(' ');\n\n                        if (!loggedUserId) {\n                          _context2.next = 10;\n                          break;\n                        }\n\n                        _context2.next = 7;\n                        return isSavedAndLiked(post.id, likedPosts, savedPosts);\n\n                      case 7:\n                        savedAndLiked = _context2.sent;\n                        post.dataValues.saved = savedAndLiked.saved;\n                        post.dataValues.liked = savedAndLiked.liked;\n\n                      case 10:\n                        return _context2.abrupt(\"return\", post);\n\n                      case 11:\n                      case \"end\":\n                        return _context2.stop();\n                    }\n                  }\n                }, _callee2);\n              }));\n\n              return function (_x6) {\n                return _ref3.apply(this, arguments);\n              };\n            }()));\n\n          case 9:\n            posts = _context3.sent;\n\n            if (!singlePost) {\n              _context3.next = 12;\n              break;\n            }\n\n            return _context3.abrupt(\"return\", posts[0]);\n\n          case 12:\n            return _context3.abrupt(\"return\", posts);\n\n          case 13:\n          case \"end\":\n            return _context3.stop();\n        }\n      }\n    }, _callee3);\n  }));\n\n  return function parsePost(_x4, _x5) {\n    return _ref2.apply(this, arguments);\n  };\n}();\n\nmodule.exports = parsePost;\n\n//# sourceURL=webpack:///./src/controllers/post/parsePost.js?");

/***/ }),

/***/ "./src/controllers/post/postComment.js":
/*!*********************************************!*\
  !*** ./src/controllers/post/postComment.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nvar getUser = __webpack_require__(/*! ../../controllers/user/getUser */ \"./src/controllers/user/getUser.js\");\n\nvar getPost = __webpack_require__(/*! ../../controllers/post/getPost */ \"./src/controllers/post/getPost.js\");\n\nvar updateUser = __webpack_require__(/*! ../../controllers/user/updateUser */ \"./src/controllers/user/updateUser.js\");\n\nvar updatePost = __webpack_require__(/*! ../../controllers/post/updatePost */ \"./src/controllers/post/updatePost.js\");\n\nvar generateCommentId = function generateCommentId(comments) {\n  // generate id 1 greater than the comment with greatest id\n  // except if the max id is infinite -- edge case\n  if (!comments.length) {\n    return 1;\n  }\n\n  var commentsIds = comments.map(function (comment) {\n    if (isFinite(comment.id)) {\n      return comment.id;\n    }\n\n    return 0;\n  });\n  var maxCommentId = Math.max.apply(Math, _toConsumableArray(commentsIds)) || 1;\n  var newId = maxCommentId + 1;\n  return newId;\n}; // @param comment is the comment text body\n\n\nvar postComment =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(comment, postId, userId) {\n    var user, post, comments, newComment, postComments;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return getUser({\n              id: userId\n            });\n\n          case 2:\n            user = _context.sent;\n            _context.next = 5;\n            return getPost({\n              id: postId\n            });\n\n          case 5:\n            post = _context.sent;\n            comments = user.commentedPosts || [];\n\n            if (typeof comments === 'string') {\n              comments = JSON.parse(comments);\n            }\n\n            newComment = {\n              body: comment,\n              createdAt: new Date().getTime(),\n              username: user.name,\n              postTitle: post.title,\n              postId: postId,\n              userId: userId\n            };\n            newComment.id = generateCommentId(comments); // Push this to user table's commentedPosts column\n\n            comments.push({\n              id: newComment.id,\n              postId: newComment.postId\n            });\n            comments = JSON.stringify(comments);\n            _context.next = 14;\n            return updateUser(userId, {\n              commentedPosts: comments\n            });\n\n          case 14:\n            // Push also to the post table\n            postComments = post.comments || [];\n\n            if (typeof postComments === \"string\") {\n              postComments = JSON.parse(postComments);\n            }\n\n            postComments.push(newComment);\n            postComments = JSON.stringify(postComments);\n            _context.next = 20;\n            return updatePost({\n              id: postId\n            }, {\n              comments: postComments\n            });\n\n          case 20:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function postComment(_x, _x2, _x3) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = postComment;\n\n//# sourceURL=webpack:///./src/controllers/post/postComment.js?");

/***/ }),

/***/ "./src/controllers/post/updatePost.js":
/*!********************************************!*\
  !*** ./src/controllers/post/updatePost.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar Post = __webpack_require__(/*! ../../models/Post */ \"./src/models/Post.js\");\n\nvar updatePost =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(postData, updatedPost) {\n    var post;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return Post.update(_objectSpread({}, updatedPost), {\n              where: _objectSpread({}, postData)\n            });\n\n          case 2:\n            post = _context.sent;\n            return _context.abrupt(\"return\", post);\n\n          case 4:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function updatePost(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = updatePost;\n\n//# sourceURL=webpack:///./src/controllers/post/updatePost.js?");

/***/ }),

/***/ "./src/controllers/tag/getTagCloud.js":
/*!********************************************!*\
  !*** ./src/controllers/tag/getTagCloud.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar Tag = __webpack_require__(/*! ../../models/Tag */ \"./src/models/Tag.js\");\n\nvar sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\n\nvar getTagCloud =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee() {\n    var numOfTags,\n        tags,\n        _args = arguments;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            numOfTags = _args.length > 0 && _args[0] !== undefined ? _args[0] : 25;\n            _context.next = 3;\n            return Tag.findAll({\n              attributes: ['tagName', [sequelize.fn('count', sequelize.col('tagName')), 'frequency']],\n              group: ['tagName'],\n              order: [[sequelize.fn('count', sequelize.col('tagName')), 'DESC']]\n            });\n\n          case 3:\n            tags = _context.sent;\n            return _context.abrupt(\"return\", tags.slice(0, numOfTags));\n\n          case 5:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function getTagCloud() {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = getTagCloud;\n\n//# sourceURL=webpack:///./src/controllers/tag/getTagCloud.js?");

/***/ }),

/***/ "./src/controllers/tag/registerTags.js":
/*!*********************************************!*\
  !*** ./src/controllers/tag/registerTags.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar Tag = __webpack_require__(/*! ../../models/Tag */ \"./src/models/Tag.js\");\n\nvar registerTags =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(tags, postId) {\n    var tagColumns;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            tagColumns = tags.map(function (tagName) {\n              return {\n                tagName: tagName,\n                postId: postId\n              };\n            });\n            _context.next = 3;\n            return Tag.bulkCreate(tagColumns);\n\n          case 3:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function registerTags(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = registerTags;\n\n//# sourceURL=webpack:///./src/controllers/tag/registerTags.js?");

/***/ }),

/***/ "./src/controllers/user/addCookie.js":
/*!*******************************************!*\
  !*** ./src/controllers/user/addCookie.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// @ param req is the request object\n// @param user is the user fetched from the database\n// function sets data to the cookie\nvar addCookie = function addCookie(req, userInRecords) {\n  req.session.user = {};\n  req.session.user.id = userInRecords.id;\n};\n\nmodule.exports = addCookie;\n\n//# sourceURL=webpack:///./src/controllers/user/addCookie.js?");

/***/ }),

/***/ "./src/controllers/user/clearSession.js":
/*!**********************************************!*\
  !*** ./src/controllers/user/clearSession.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar updateUser = __webpack_require__(/*! ./updateUser */ \"./src/controllers/user/updateUser.js\"); // clear session id from the browser and the database\n\n\nvar clearSession =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, user) {\n    var session_ids;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            session_ids = user.session_ids;\n            session_ids = session_ids.split(',').filter(function (session_id) {\n              return session_id !== req.sessionID;\n            }).toString();\n            _context.next = 4;\n            return updateUser(user.id, {\n              session_ids: session_ids\n            });\n\n          case 4:\n            req.session.destroy(function (err) {\n              if (err) {\n                return console.log(err);\n              }\n            });\n\n          case 5:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function clearSession(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = clearSession;\n\n//# sourceURL=webpack:///./src/controllers/user/clearSession.js?");

/***/ }),

/***/ "./src/controllers/user/getUser.js":
/*!*****************************************!*\
  !*** ./src/controllers/user/getUser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar User = __webpack_require__(/*! ../../models/User */ \"./src/models/User.js\"); // @param userData is an object with the user data to match in db\n\n\nvar getUser =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(userData) {\n    var userInRecords;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return User.findOne({\n              where: _objectSpread({}, userData)\n            });\n\n          case 2:\n            userInRecords = _context.sent;\n            return _context.abrupt(\"return\", userInRecords);\n\n          case 4:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function getUser(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = getUser;\n\n//# sourceURL=webpack:///./src/controllers/user/getUser.js?");

/***/ }),

/***/ "./src/controllers/user/updateSessionIDs.js":
/*!**************************************************!*\
  !*** ./src/controllers/user/updateSessionIDs.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar updateUser = __webpack_require__(/*! ./updateUser */ \"./src/controllers/user/updateUser.js\"); // takes the user fetched from the database freshly,\n// and updates it's session_ids on the database\n// logic -- keep number of session id below 5\n\n\nvar updateSessionIDs =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(user, sessionID) {\n    var session_ids;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            session_ids = user.session_ids;\n\n            if (session_ids) {\n              session_ids = session_ids.split(',');\n\n              if (session_ids.length > 4) {\n                session_ids.pop();\n              }\n\n              session_ids.unshift(sessionID);\n              session_ids = session_ids.toString();\n            }\n\n            _context.prev = 2;\n            _context.next = 5;\n            return updateUser(user.id, {\n              session_ids: session_ids\n            });\n\n          case 5:\n            _context.next = 10;\n            break;\n\n          case 7:\n            _context.prev = 7;\n            _context.t0 = _context[\"catch\"](2);\n            console.log(_context.t0);\n\n          case 10:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[2, 7]]);\n  }));\n\n  return function updateSessionIDs(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = updateSessionIDs;\n\n//# sourceURL=webpack:///./src/controllers/user/updateSessionIDs.js?");

/***/ }),

/***/ "./src/controllers/user/updateUser.js":
/*!********************************************!*\
  !*** ./src/controllers/user/updateUser.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar User = __webpack_require__(/*! ../../models/User */ \"./src/models/User.js\"); // @param id - user id\n// @param dataToUpdate - object with user data to update\n\n\nvar updateUser =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(id, dataToUpdate) {\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return User.update(_objectSpread({}, dataToUpdate), {\n              where: {\n                id: id\n              }\n            });\n\n          case 2:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function updateUser(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = updateUser;\n\n//# sourceURL=webpack:///./src/controllers/user/updateUser.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar session = __webpack_require__(/*! express-session */ \"express-session\");\n\nvar redis = __webpack_require__(/*! redis */ \"redis\");\n\nvar RedisStore = __webpack_require__(/*! connect-redis */ \"connect-redis\")(session);\n\nvar cors = __webpack_require__(/*! cors */ \"cors\");\n\nvar db = __webpack_require__(/*! ./config/database */ \"./src/config/database.js\");\n\nvar app = express();\n\nvar uuid = __webpack_require__(/*! uuid */ \"uuid\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar routes = __webpack_require__(/*! ./routes/index */ \"./src/routes/index.js\");\n\nvar clientPath = path.join(__dirname, '../../client');\n\n__webpack_require__(/*! dotenv */ \"dotenv\").config({\n  path: path.resolve(__dirname, \"/\".concat(\"development\".toLowerCase(), \".env\"))\n}); // create redis client\n\n\nvar client = redis.createClient();\nclient.on('connect', function () {\n  console.log('Redis connected');\n}); // configure middlewares\n\napp.use(express.json());\napp.use(express.urlencoded({\n  extended: true\n}));\napp.use(cors({\n  credentials: true,\n  origin: true\n})); // Set up session with redis client\n\napp.use(session({\n  genid: function genid(req) {\n    return uuid(); //use UUIDs for session IDs\n  },\n  secret: \"session_top_secret_mediumclone\",\n  saveUninitialized: true,\n  resave: true,\n  store: new RedisStore({\n    client: client\n  }),\n  cookie: {\n    secure: false,\n    maxAge: 30 * 24 * 60 * 1000 // 30 days\n\n  }\n})); // Initialize database\n\ndb.authenticate().then(function () {\n  return console.log('database connected');\n})[\"catch\"](function (err) {\n  return console.log('SOMETHING WRONG WITH DATABASE', err);\n});\napp.use(routes);\n\nif (false) {}\n\nmodule.exports = app;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/middlewares/requireLogin.js":
/*!*****************************************!*\
  !*** ./src/middlewares/requireLogin.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar isLoggedIn = __webpack_require__(/*! ../controllers/isLoggedIn */ \"./src/controllers/isLoggedIn.js\");\n\nvar clearHeaderCache = function clearHeaderCache(res) {\n  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');\n};\n\nvar requireLogin =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res, next) {\n    var authError, serverError, loggedIn;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            authError = {\n              err: 'Please login or signup first!'\n            };\n            serverError = {\n              err: 'Server error: Something went wrong checking authorization'\n            };\n            _context.prev = 2;\n            _context.next = 5;\n            return isLoggedIn(req);\n\n          case 5:\n            loggedIn = _context.sent;\n            _context.next = 11;\n            break;\n\n          case 8:\n            _context.prev = 8;\n            _context.t0 = _context[\"catch\"](2);\n            return _context.abrupt(\"return\", res.status(500).send(serverError));\n\n          case 11:\n            if (!loggedIn) {\n              _context.next = 16;\n              break;\n            }\n\n            clearHeaderCache(res);\n            return _context.abrupt(\"return\", next());\n\n          case 16:\n            return _context.abrupt(\"return\", res.status(403).send(authError));\n\n          case 17:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[2, 8]]);\n  }));\n\n  return function requireLogin(_x, _x2, _x3) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = requireLogin;\n\n//# sourceURL=webpack:///./src/middlewares/requireLogin.js?");

/***/ }),

/***/ "./src/models/Post.js":
/*!****************************!*\
  !*** ./src/models/Post.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\n\nvar db = __webpack_require__(/*! ../config/database */ \"./src/config/database.js\");\n\nvar post = db.define('post', {\n  id: {\n    type: Sequelize.INTEGER,\n    primaryKey: true,\n    autoIncrement: true\n  },\n  title: {\n    type: Sequelize.STRING\n  },\n  body: {\n    type: Sequelize.STRING\n  },\n  user: {\n    type: Sequelize.INTEGER\n  },\n  username: {\n    type: Sequelize.STRING\n  },\n  about: {\n    type: Sequelize.STRING\n  },\n  tags: {\n    type: Sequelize.ARRAY(Sequelize.STRING)\n  },\n  comments: {\n    // json with objects users and their comments and time of commenting\n    type: Sequelize.JSON\n  },\n  createdAt: {\n    type: Sequelize.STRING\n  },\n  editedAt: {\n    type: Sequelize.STRING\n  },\n  likedBy: {\n    type: Sequelize.ARRAY(Sequelize.INTEGER)\n  },\n  numOfLikes: {\n    type: Sequelize.INTEGER,\n    defaultValue: 0\n  }\n});\nmodule.exports = post;\n\n//# sourceURL=webpack:///./src/models/Post.js?");

/***/ }),

/***/ "./src/models/Tag.js":
/*!***************************!*\
  !*** ./src/models/Tag.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\n\nvar db = __webpack_require__(/*! ../config/database */ \"./src/config/database.js\");\n\nvar tag = db.define('tag', {\n  id: {\n    type: Sequelize.INTEGER,\n    primaryKey: true,\n    autoIncrement: true\n  },\n  postId: {\n    type: Sequelize.INTEGER\n  },\n  tagName: {\n    type: Sequelize.STRING\n  }\n});\nmodule.exports = tag;\n\n//# sourceURL=webpack:///./src/models/Tag.js?");

/***/ }),

/***/ "./src/models/User.js":
/*!****************************!*\
  !*** ./src/models/User.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\n\nvar db = __webpack_require__(/*! ../config/database */ \"./src/config/database.js\");\n\nvar user = db.define('user', {\n  id: {\n    type: Sequelize.INTEGER,\n    primaryKey: true,\n    autoIncrement: true\n  },\n  name: {\n    type: Sequelize.STRING\n  },\n  about: {\n    type: Sequelize.STRING\n  },\n  email: {\n    type: Sequelize.STRING\n  },\n  password: {\n    type: Sequelize.STRING\n  },\n  website: {\n    type: Sequelize.STRING\n  },\n  photo: {\n    type: Sequelize.STRING\n  },\n  posts: {\n    // array of posts' ids\n    type: Sequelize.ARRAY(Sequelize.INTEGER)\n  },\n  createdAt: {\n    type: Sequelize.STRING\n  },\n  followers: {\n    type: Sequelize.ARRAY(Sequelize.INTEGER)\n  },\n  following: {\n    type: Sequelize.ARRAY(Sequelize.INTEGER)\n  },\n  likedPosts: {\n    type: Sequelize.ARRAY(Sequelize.INTEGER)\n  },\n  commentedPosts: {\n    // object with comment body, created time & edited time of the comment and id of the post\n    type: Sequelize.JSON\n  },\n  savedPosts: {\n    type: Sequelize.ARRAY(Sequelize.INTEGER)\n  },\n  session_ids: {\n    type: Sequelize.STRING\n  }\n});\nmodule.exports = user;\n\n//# sourceURL=webpack:///./src/models/User.js?");

/***/ }),

/***/ "./src/routes/auth/index.js":
/*!**********************************!*\
  !*** ./src/routes/auth/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar login = __webpack_require__(/*! ./login */ \"./src/routes/auth/login.js\");\n\nvar logout = __webpack_require__(/*! ./logout */ \"./src/routes/auth/logout.js\");\n\nrouter.post('/login', login);\nrouter.post('/logout', logout);\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/routes/auth/index.js?");

/***/ }),

/***/ "./src/routes/auth/login.js":
/*!**********************************!*\
  !*** ./src/routes/auth/login.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar updateSessionIDs = __webpack_require__(/*! ../../controllers/user/updateSessionIDs */ \"./src/controllers/user/updateSessionIDs.js\");\n\nvar addCookie = __webpack_require__(/*! ../../controllers/user/addCookie */ \"./src/controllers/user/addCookie.js\");\n\nvar getUser = __webpack_require__(/*! ../../controllers/user/getUser */ \"./src/controllers/user/getUser.js\");\n\nvar login =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    var user, error, userInRecords;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            user = _objectSpread({}, req.body); // const user = {...req.query};\n            // server side validation\n\n            if (!(!user.email || !user.password)) {\n              _context.next = 4;\n              break;\n            }\n\n            error = {\n              err: 'Please fill in all fields'\n            };\n            return _context.abrupt(\"return\", res.status(401).send(error));\n\n          case 4:\n            _context.prev = 4;\n            _context.next = 7;\n            return getUser(user);\n\n          case 7:\n            userInRecords = _context.sent;\n\n            if (!userInRecords) {\n              _context.next = 15;\n              break;\n            }\n\n            _context.next = 11;\n            return updateSessionIDs(userInRecords, req.sessionID);\n\n          case 11:\n            // set user on cookie\n            addCookie(req, userInRecords);\n            return _context.abrupt(\"return\", res.status(200).send({\n              msg: 'Logged in!'\n            }));\n\n          case 15:\n            return _context.abrupt(\"return\", res.status(401).send({\n              err: 'Wrong password or username!'\n            }));\n\n          case 16:\n            _context.next = 22;\n            break;\n\n          case 18:\n            _context.prev = 18;\n            _context.t0 = _context[\"catch\"](4);\n            console.log(_context.t0);\n            return _context.abrupt(\"return\", res.status(500).send({\n              err: 'Something went wrong logging in!'\n            }));\n\n          case 22:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[4, 18]]);\n  }));\n\n  return function login(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = login;\n\n//# sourceURL=webpack:///./src/routes/auth/login.js?");

/***/ }),

/***/ "./src/routes/auth/logout.js":
/*!***********************************!*\
  !*** ./src/routes/auth/logout.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar getUser = __webpack_require__(/*! ../../controllers/user/getUser */ \"./src/controllers/user/getUser.js\");\n\nvar clearSession = __webpack_require__(/*! ../../controllers/user/clearSession */ \"./src/controllers/user/clearSession.js\");\n\nvar logout =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    var userId, user;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            if (req.session) {\n              _context.next = 2;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(400).send({\n              err: 'Already logged out!'\n            }));\n\n          case 2:\n            if (!req.session.user) {\n              _context.next = 17;\n              break;\n            }\n\n            _context.prev = 3;\n            userId = req.session.user.id;\n            _context.next = 7;\n            return getUser(userId);\n\n          case 7:\n            user = _context.sent;\n\n            if (!user) {\n              _context.next = 12;\n              break;\n            }\n\n            _context.next = 11;\n            return clearSession(req, user);\n\n          case 11:\n            return _context.abrupt(\"return\", res.status(200).send({\n              msg: 'User logged out!'\n            }));\n\n          case 12:\n            _context.next = 17;\n            break;\n\n          case 14:\n            _context.prev = 14;\n            _context.t0 = _context[\"catch\"](3);\n            res.status(500).send({\n              err: 'something went wrong while trying to log out!'\n            });\n\n          case 17:\n            res.status(409).send({\n              err: 'Already logged out!'\n            });\n\n          case 18:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[3, 14]]);\n  }));\n\n  return function logout(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = logout;\n\n//# sourceURL=webpack:///./src/routes/auth/logout.js?");

/***/ }),

/***/ "./src/routes/index.js":
/*!*****************************!*\
  !*** ./src/routes/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var router = __webpack_require__(/*! express */ \"express\").Router();\n\nvar authRouter = __webpack_require__(/*! ./auth */ \"./src/routes/auth/index.js\");\n\nvar postsRouter = __webpack_require__(/*! ./posts */ \"./src/routes/posts/index.js\");\n\nvar usersRouter = __webpack_require__(/*! ./users */ \"./src/routes/users/index.js\");\n\nvar tagsRouter = __webpack_require__(/*! ./tag/index */ \"./src/routes/tag/index.js\");\n\nrouter.use('/', authRouter);\nrouter.use('/users', usersRouter);\nrouter.use('/posts', postsRouter);\nrouter.use('/tags', tagsRouter);\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/routes/index.js?");

/***/ }),

/***/ "./src/routes/posts/comments/createComment.js":
/*!****************************************************!*\
  !*** ./src/routes/posts/comments/createComment.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar postComment = __webpack_require__(/*! ../../../controllers/post/postComment */ \"./src/controllers/post/postComment.js\");\n\nvar createComment =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    var comment, body, userId, postid;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            // Add the comment to both user model and the post model\n            comment = req.body;\n\n            if (comment.body) {\n              _context.next = 3;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(422).send({\n              err: 'Please provide a comment body!'\n            }));\n\n          case 3:\n            _context.prev = 3;\n            body = req.body.body;\n            userId = req.session.user.id;\n            postid = req.params.postid;\n            _context.next = 9;\n            return postComment(body, postid, userId);\n\n          case 9:\n            return _context.abrupt(\"return\", res.status(201).send({\n              msg: 'Comment posted'\n            }));\n\n          case 12:\n            _context.prev = 12;\n            _context.t0 = _context[\"catch\"](3);\n            console.log(_context.t0);\n            return _context.abrupt(\"return\", res.status(500).send({\n              err: 'Something went wrong while commenting'\n            }));\n\n          case 16:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[3, 12]]);\n  }));\n\n  return function createComment(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = createComment;\n\n//# sourceURL=webpack:///./src/routes/posts/comments/createComment.js?");

/***/ }),

/***/ "./src/routes/posts/comments/deleteComment.js":
/*!****************************************************!*\
  !*** ./src/routes/posts/comments/deleteComment.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar getPost = __webpack_require__(/*! ../../../controllers/post/getPost */ \"./src/controllers/post/getPost.js\");\n\nvar updatePost = __webpack_require__(/*! ../../../controllers/post/updatePost */ \"./src/controllers/post/updatePost.js\"); // Delete comment\n\n\nvar deleteComment =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    var _req$params, postid, commentid, userId, post, comments, commentIndex, commentToDelete;\n\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            _req$params = req.params, postid = _req$params.postid, commentid = _req$params.commentid;\n            userId = req.session.user.id;\n            console.log(postid, commentid, userId);\n            _context.next = 6;\n            return getPost({\n              id: postid\n            });\n\n          case 6:\n            post = _context.sent;\n            comments = post.comments || [];\n\n            if (typeof comments === 'string') {\n              comments = JSON.parse(comments);\n            }\n\n            commentIndex = comments.findIndex(function (comment) {\n              return comment.id == commentid && userId == comment.userId;\n            });\n\n            if (!(commentIndex === -1)) {\n              _context.next = 12;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(400).send({\n              err: 'Wait, that\\'s illegal...'\n            }));\n\n          case 12:\n            commentToDelete = comments[commentIndex];\n            comments[commentIndex] = _objectSpread({}, commentToDelete, {\n              deleted: true\n            });\n            comments = JSON.stringify(comments);\n            _context.next = 17;\n            return updatePost({\n              id: postid\n            }, {\n              comments: comments\n            });\n\n          case 17:\n            return _context.abrupt(\"return\", res.status(200).send({\n              msg: 'Deleted comment successfully!'\n            }));\n\n          case 20:\n            _context.prev = 20;\n            _context.t0 = _context[\"catch\"](0);\n            console.log(_context.t0);\n            return _context.abrupt(\"return\", res.status(500).send({\n              err: 'Something went wrong'\n            }));\n\n          case 24:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 20]]);\n  }));\n\n  return function deleteComment(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = deleteComment;\n\n//# sourceURL=webpack:///./src/routes/posts/comments/deleteComment.js?");

/***/ }),

/***/ "./src/routes/posts/comments/editComment.js":
/*!**************************************************!*\
  !*** ./src/routes/posts/comments/editComment.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar getPost = __webpack_require__(/*! ../../../controllers/post/getPost */ \"./src/controllers/post/getPost.js\");\n\nvar editPost = __webpack_require__(/*! ../../../controllers/post/updatePost */ \"./src/controllers/post/updatePost.js\");\n\nvar editComment =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    var _req$params, postid, commentid, post, newCommentData, comments, index;\n\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            _req$params = req.params, postid = _req$params.postid, commentid = _req$params.commentid;\n            _context.next = 4;\n            return getPost({\n              id: postid\n            });\n\n          case 4:\n            post = _context.sent;\n\n            if (post) {\n              _context.next = 7;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(400).send({\n              err: 'Post doesn\\'t exist'\n            }));\n\n          case 7:\n            newCommentData = {\n              body: req.body.body,\n              editedAt: Date.now().toString()\n            }; // edit post comments\n\n            comments = post.comments || [];\n\n            if (typeof comments === 'string') {\n              comments = JSON.parse(comments);\n            }\n\n            comments = comments || [];\n            index = comments.findIndex(function (comment) {\n              return comment.id == commentid;\n            });\n\n            if (!(index === -1)) {\n              _context.next = 14;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(403).send({\n              err: 'Unauthorized request!'\n            }));\n\n          case 14:\n            comments[index] = _objectSpread({}, comments[index], {}, newCommentData);\n            comments = JSON.stringify(comments);\n            _context.next = 18;\n            return editPost({\n              id: postid\n            }, {\n              comments: comments\n            });\n\n          case 18:\n            return _context.abrupt(\"return\", res.status(201).send({\n              msg: 'Edited comment'\n            }));\n\n          case 21:\n            _context.prev = 21;\n            _context.t0 = _context[\"catch\"](0);\n            console.log(_context.t0);\n            return _context.abrupt(\"return\", res.status(500).send({\n              err: 'Server error!'\n            }));\n\n          case 25:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 21]]);\n  }));\n\n  return function editComment(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = editComment;\n\n//# sourceURL=webpack:///./src/routes/posts/comments/editComment.js?");

/***/ }),

/***/ "./src/routes/posts/comments/getComment.js":
/*!*************************************************!*\
  !*** ./src/routes/posts/comments/getComment.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar getPost = __webpack_require__(/*! ../../../controllers/post/getPost */ \"./src/controllers/post/getPost.js\");\n\nvar isLoggedIn = __webpack_require__(/*! ../../../controllers/isLoggedIn */ \"./src/controllers/isLoggedIn.js\");\n\nvar determineIfLiked = function determineIfLiked(comment, userId) {\n  var likedBy = comment.likedBy || [];\n  var index = likedBy.findIndex(function (liker) {\n    return liker == userId;\n  });\n\n  if (index !== -1) {\n    return true;\n  }\n\n  return false;\n};\n\nvar getComment =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    var postId, commentId, post, postComments, comment, likedBy, loggedIn, loggedUser, isLiked;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            postId = parseInt(req.params.postid);\n            commentId = parseInt(req.params.commentid);\n            _context.next = 5;\n            return getPost({\n              id: postId\n            });\n\n          case 5:\n            post = _context.sent;\n\n            if (post) {\n              _context.next = 8;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(404).send({\n              err: 'Post not found'\n            }));\n\n          case 8:\n            postComments = post.comments || [];\n\n            if (typeof postComments === 'string') {\n              postComments = JSON.parse(postComments);\n            }\n\n            comment = postComments.find(function (postComment) {\n              return postComment.id === commentId;\n            });\n\n            if (comment) {\n              _context.next = 13;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(404).send({\n              err: 'Comment not found!'\n            }));\n\n          case 13:\n            likedBy = comment.likedBy || [];\n            comment.likes = likedBy.length;\n            _context.next = 17;\n            return isLoggedIn(req);\n\n          case 17:\n            loggedIn = _context.sent;\n\n            if (loggedIn) {\n              loggedUser = req.session.user.id;\n              isLiked = determineIfLiked(comment, loggedUser);\n              comment.isLiked = isLiked;\n            }\n\n            return _context.abrupt(\"return\", res.status(200).send(comment));\n\n          case 22:\n            _context.prev = 22;\n            _context.t0 = _context[\"catch\"](0);\n            console.log(_context.t0);\n            return _context.abrupt(\"return\", res.status(500).send({\n              err: 'Server error'\n            }));\n\n          case 26:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 22]]);\n  }));\n\n  return function getComment(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = getComment;\n\n//# sourceURL=webpack:///./src/routes/posts/comments/getComment.js?");

/***/ }),

/***/ "./src/routes/posts/comments/index.js":
/*!********************************************!*\
  !*** ./src/routes/posts/comments/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router({\n  mergeParams: true\n});\n\nvar requireLogin = __webpack_require__(/*! ../../../middlewares/requireLogin */ \"./src/middlewares/requireLogin.js\");\n\nvar getComment = __webpack_require__(/*! ./getComment */ \"./src/routes/posts/comments/getComment.js\");\n\nvar createComment = __webpack_require__(/*! ./createComment */ \"./src/routes/posts/comments/createComment.js\");\n\nvar editComment = __webpack_require__(/*! ./editComment */ \"./src/routes/posts/comments/editComment.js\");\n\nvar deleteComment = __webpack_require__(/*! ./deleteComment */ \"./src/routes/posts/comments/deleteComment.js\");\n\nvar likeComment = __webpack_require__(/*! ./likeComment */ \"./src/routes/posts/comments/likeComment.js\");\n\nrouter.get('/:commentid', getComment);\nrouter.post('/', requireLogin, createComment);\nrouter.put('/:commentid', requireLogin, editComment);\nrouter[\"delete\"]('/:commentid', requireLogin, deleteComment);\nrouter.post('/:commentid/like', requireLogin, likeComment);\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/routes/posts/comments/index.js?");

/***/ }),

/***/ "./src/routes/posts/comments/likeComment.js":
/*!**************************************************!*\
  !*** ./src/routes/posts/comments/likeComment.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar getPost = __webpack_require__(/*! ../../../controllers/post/getPost */ \"./src/controllers/post/getPost.js\");\n\nvar editPost = __webpack_require__(/*! ../../../controllers/post/updatePost */ \"./src/controllers/post/updatePost.js\");\n\nvar likeComment =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    var _req$params, commentid, postid, userId, post, postComments, postCommentIndex, postComment, commentLikes, liked, updatedPostComment;\n\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            _req$params = req.params, commentid = _req$params.commentid, postid = _req$params.postid;\n            userId = req.session.user.id;\n            commentid = parseInt(commentid);\n            postid = parseInt(postid);\n            userId = parseInt(userId);\n            _context.next = 8;\n            return getPost({\n              id: postid\n            });\n\n          case 8:\n            post = _context.sent;\n            postComments = post.comments || [];\n\n            if (typeof postComments === 'string') {\n              postComments = JSON.parse(postComments);\n            }\n\n            postComments = postComments || [];\n            postCommentIndex = postComments.findIndex(function (postComment) {\n              return postComment.id === commentid;\n            });\n\n            if (!(postCommentIndex === -1)) {\n              _context.next = 15;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(400).send({\n              err: 'Comment not available'\n            }));\n\n          case 15:\n            postComment = postComments[postCommentIndex];\n            commentLikes = postComment.likedBy || []; // determine if already liked\n\n            liked = false;\n\n            if (commentLikes.indexOf(userId) === -1) {\n              // not liked\n              commentLikes.push(userId);\n              liked = true;\n            } else {\n              // already liked\n              commentLikes.splice(commentLikes.indexOf(userId), 1);\n            }\n\n            updatedPostComment = _objectSpread({}, postComment, {\n              likedBy: commentLikes\n            });\n            postComments[postCommentIndex] = updatedPostComment;\n            postComments = JSON.stringify(postComments);\n            _context.next = 24;\n            return editPost({\n              id: postid\n            }, {\n              comments: postComments\n            });\n\n          case 24:\n            return _context.abrupt(\"return\", res.status(200).send({\n              msg: \"\".concat(liked ? 'Liked' : 'Unliked', \" comment!\")\n            }));\n\n          case 27:\n            _context.prev = 27;\n            _context.t0 = _context[\"catch\"](0);\n            console.log(_context.t0);\n            return _context.abrupt(\"return\", res.status(500).send({\n              err: 'Server error!'\n            }));\n\n          case 31:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 27]]);\n  }));\n\n  return function likeComment(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = likeComment;\n\n//# sourceURL=webpack:///./src/routes/posts/comments/likeComment.js?");

/***/ }),

/***/ "./src/routes/posts/createPost.js":
/*!****************************************!*\
  !*** ./src/routes/posts/createPost.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar createPostCtrl = __webpack_require__(/*! ../../controllers/post/createPost */ \"./src/controllers/post/createPost.js\"); // Create a post\n\n\nvar createPost =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    var post, userId;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            post = req.body || {};\n\n            if (!(!post.title || !post.body)) {\n              _context.next = 3;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(422).send({\n              err: 'Please fill in all fields!'\n            }));\n\n          case 3:\n            _context.prev = 3;\n            post = _objectSpread({}, req.body);\n            userId = req.session.user.id;\n            _context.next = 8;\n            return createPostCtrl(post, userId);\n\n          case 8:\n            return _context.abrupt(\"return\", res.status(201).send({\n              msg: 'Post created!'\n            }));\n\n          case 11:\n            _context.prev = 11;\n            _context.t0 = _context[\"catch\"](3);\n            console.log(_context.t0);\n            return _context.abrupt(\"return\", res.status(500).send({\n              err: 'Something went wrong while creating post!'\n            }));\n\n          case 15:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[3, 11]]);\n  }));\n\n  return function createPost(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = createPost;\n\n//# sourceURL=webpack:///./src/routes/posts/createPost.js?");

/***/ }),

/***/ "./src/routes/posts/deletePost.js":
/*!****************************************!*\
  !*** ./src/routes/posts/deletePost.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar deletePostCtrl = __webpack_require__(/*! ../../controllers/post/deletePost */ \"./src/controllers/post/deletePost.js\");\n\nvar getPost = __webpack_require__(/*! ../../controllers/post/getPost */ \"./src/controllers/post/getPost.js\");\n\nvar authError = {\n  err: 'You are not authorized to delete this post!'\n};\n\nvar deletePost =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    var postId, userId, postData, post;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            postId = parseInt(req.params.id);\n            userId = parseInt(req.session.user.id);\n            postData = {\n              user: userId,\n              id: postId\n            };\n            _context.next = 6;\n            return getPost(postData);\n\n          case 6:\n            post = _context.sent;\n\n            if (post) {\n              _context.next = 9;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(403).send(authError));\n\n          case 9:\n            _context.next = 11;\n            return deletePostCtrl(postData);\n\n          case 11:\n            return _context.abrupt(\"return\", res.status(200).send({\n              msg: 'Deleted post!'\n            }));\n\n          case 14:\n            _context.prev = 14;\n            _context.t0 = _context[\"catch\"](0);\n            console.log(_context.t0);\n            return _context.abrupt(\"return\", res.status(500).send({\n              err: 'Something went wrong deleting post'\n            }));\n\n          case 18:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 14]]);\n  }));\n\n  return function deletePost(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = deletePost;\n\n//# sourceURL=webpack:///./src/routes/posts/deletePost.js?");

/***/ }),

/***/ "./src/routes/posts/editPost.js":
/*!**************************************!*\
  !*** ./src/routes/posts/editPost.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar updatePost = __webpack_require__(/*! ../../controllers/post/updatePost */ \"./src/controllers/post/updatePost.js\");\n\nvar parseTags = function parseTags(post) {\n  var tags = post.tags || '';\n\n  if (!tags) {\n    return [];\n  }\n\n  return tags.split(' ');\n};\n\nvar editPost =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    var postId, userId, updatedPost, postData, post;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            postId = req.params.id;\n            userId = req.session.user.id;\n            updatedPost = _objectSpread({}, req.body); // add edit timestamp\n\n            updatedPost.editedAt = new Date().getTime();\n            updatedPost.tags = parseTags(updatedPost);\n            postData = {\n              user: userId,\n              id: postId\n            };\n            _context.next = 9;\n            return updatePost(postData, updatedPost);\n\n          case 9:\n            post = _context.sent;\n\n            if (post) {\n              _context.next = 12;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(409).send({\n              err: 'Is this your post? This is awkward..hmmm...'\n            }));\n\n          case 12:\n            return _context.abrupt(\"return\", res.status(201).send({\n              msg: 'Updated the post'\n            }));\n\n          case 15:\n            _context.prev = 15;\n            _context.t0 = _context[\"catch\"](0);\n            console.log(_context.t0);\n            return _context.abrupt(\"return\", res.status(500).send({\n              err: 'Sever error: Something went wrong editing post :('\n            }));\n\n          case 19:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 15]]);\n  }));\n\n  return function editPost(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = editPost;\n\n//# sourceURL=webpack:///./src/routes/posts/editPost.js?");

/***/ }),

/***/ "./src/routes/posts/getPostById.js":
/*!*****************************************!*\
  !*** ./src/routes/posts/getPostById.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar getPost = __webpack_require__(/*! ../../controllers/post/getPost */ \"./src/controllers/post/getPost.js\");\n\nvar parsePost = __webpack_require__(/*! ../../controllers/post/parsePost */ \"./src/controllers/post/parsePost.js\");\n\nvar isLoggedIn = __webpack_require__(/*! ../../controllers/isLoggedIn */ \"./src/controllers/isLoggedIn.js\");\n\nvar getPostById =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    var id, post, loggedIn, userId, parsedPost;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            id = req.params.id;\n            _context.next = 4;\n            return getPost({\n              id: id\n            });\n\n          case 4:\n            post = _context.sent;\n\n            if (post) {\n              _context.next = 7;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(404).send({\n              err: '404: No such post found'\n            }));\n\n          case 7:\n            _context.next = 9;\n            return isLoggedIn(req);\n\n          case 9:\n            loggedIn = _context.sent;\n\n            if (loggedIn) {\n              userId = parseInt(req.session.user.id);\n            }\n\n            _context.next = 13;\n            return parsePost(post, userId);\n\n          case 13:\n            parsedPost = _context.sent;\n            return _context.abrupt(\"return\", res.status(200).send(parsedPost));\n\n          case 17:\n            _context.prev = 17;\n            _context.t0 = _context[\"catch\"](0);\n            console.log(_context.t0);\n            res.status(500).send({\n              err: 'Something went wrong!'\n            });\n\n          case 21:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 17]]);\n  }));\n\n  return function getPostById(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = getPostById;\n\n//# sourceURL=webpack:///./src/routes/posts/getPostById.js?");

/***/ }),

/***/ "./src/routes/posts/getPosts.js":
/*!**************************************!*\
  !*** ./src/routes/posts/getPosts.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar Post = __webpack_require__(/*! ../../models/Post */ \"./src/models/Post.js\");\n\nvar Tag = __webpack_require__(/*! ../../models/Tag */ \"./src/models/Tag.js\");\n\nvar sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\n\nvar isLoggedIn = __webpack_require__(/*! ../../controllers/isLoggedIn */ \"./src/controllers/isLoggedIn.js\");\n\nvar parsePost = __webpack_require__(/*! ../../controllers/post/parsePost */ \"./src/controllers/post/parsePost.js\");\n\nvar postsPerBatch = 10;\n\nvar getQueryConfig = function getQueryConfig(_ref) {\n  var _ref$tag = _ref.tag,\n      tag = _ref$tag === void 0 ? '' : _ref$tag,\n      page = _ref.page,\n      days = _ref.days,\n      sortorder = _ref.sortorder,\n      _ref$search = _ref.search,\n      search = _ref$search === void 0 ? '' : _ref$search;\n  var offset = postsPerBatch * (page - 1);\n  var queryConfig = {\n    where: {\n      title: _defineProperty({}, sequelize.Op.iLike, \"%\".concat(search, \"%\"))\n    },\n    limit: postsPerBatch,\n    offset: offset\n  };\n\n  if (sortorder === 'top') {\n    var startTime = new Date();\n    startTime.setHours(startTime.getHours() - parseInt(days) * 24);\n    var endTime = new Date();\n    startTime = startTime.getTime().toString();\n    endTime = endTime.getTime().toString();\n    queryConfig.order = [['numOfLikes', 'DESC']];\n\n    if (days !== 'all') {\n      queryConfig.where.createdAt = _defineProperty({}, sequelize.Op.between, [startTime, endTime]);\n    }\n  } else {\n    // sortorder - `new`\n    queryConfig.order = [['createdAt', 'DESC']];\n  }\n\n  if (tag) {\n    queryConfig.include = [{\n      model: Tag,\n      having: [\"postId = id\"],\n      where: {\n        tagName: _defineProperty({}, sequelize.Op.iLike, \"%\".concat(tag, \"%\"))\n      },\n      required: true\n    }];\n  }\n\n  return queryConfig;\n};\n/*\n\n**********ROUTES**********\n>    /posts/new?page=x\n>    /posts/top?t=DAYS?page=x\n\n*/\n\n\nvar getPosts =\n/*#__PURE__*/\nfunction () {\n  var _ref2 = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res, next) {\n    var sortorder, _req$query, t, page, tag, search, days, queryConfig, posts, userId, loggedIn, parsedPosts;\n\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            sortorder = req.params.sortorder;\n            _req$query = req.query, t = _req$query.t, page = _req$query.page, tag = _req$query.tag, search = _req$query.search;\n            days = t;\n\n            if (!(sortorder !== 'top' && sortorder !== 'new')) {\n              _context.next = 6;\n              break;\n            }\n\n            return _context.abrupt(\"return\", next());\n\n          case 6:\n            queryConfig = getQueryConfig({\n              tag: tag,\n              page: page,\n              days: days,\n              sortorder: sortorder,\n              search: search\n            });\n            Post.belongsTo(Tag, {\n              targetKey: 'postId',\n              foreignKey: 'id'\n            });\n            _context.next = 10;\n            return Post.findAll(queryConfig);\n\n          case 10:\n            posts = _context.sent;\n            _context.next = 13;\n            return isLoggedIn(req);\n\n          case 13:\n            loggedIn = _context.sent;\n\n            if (loggedIn) {\n              userId = parseInt(req.session.user.id);\n            }\n\n            _context.next = 17;\n            return parsePost(posts, userId);\n\n          case 17:\n            parsedPosts = _context.sent;\n            return _context.abrupt(\"return\", res.status(200).send(parsedPosts));\n\n          case 21:\n            _context.prev = 21;\n            _context.t0 = _context[\"catch\"](0);\n            console.log(_context.t0);\n            return _context.abrupt(\"return\", res.status(500).send({\n              err: 'Something went wrong fetching posts'\n            }));\n\n          case 25:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 21]]);\n  }));\n\n  return function getPosts(_x, _x2, _x3) {\n    return _ref2.apply(this, arguments);\n  };\n}();\n\nmodule.exports = getPosts;\n\n//# sourceURL=webpack:///./src/routes/posts/getPosts.js?");

/***/ }),

/***/ "./src/routes/posts/index.js":
/*!***********************************!*\
  !*** ./src/routes/posts/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar getPosts = __webpack_require__(/*! ./getPosts */ \"./src/routes/posts/getPosts.js\");\n\nvar getPostById = __webpack_require__(/*! ./getPostById */ \"./src/routes/posts/getPostById.js\");\n\nvar createPost = __webpack_require__(/*! ./createPost */ \"./src/routes/posts/createPost.js\");\n\nvar editPost = __webpack_require__(/*! ./editPost */ \"./src/routes/posts/editPost.js\");\n\nvar likePost = __webpack_require__(/*! ./likePost */ \"./src/routes/posts/likePost.js\");\n\nvar savePost = __webpack_require__(/*! ./savePost */ \"./src/routes/posts/savePost.js\");\n\nvar deletePost = __webpack_require__(/*! ./deletePost */ \"./src/routes/posts/deletePost.js\");\n\nvar commentRoutes = __webpack_require__(/*! ./comments/index */ \"./src/routes/posts/comments/index.js\");\n\nvar requireLogin = __webpack_require__(/*! ../../middlewares/requireLogin */ \"./src/middlewares/requireLogin.js\");\n\nrouter.get('/:sortorder/', getPosts);\nrouter.get('/:id', getPostById);\nrouter.post('/', requireLogin, createPost);\nrouter.put('/:id', requireLogin, editPost);\nrouter.post('/:id/like', requireLogin, likePost);\nrouter.post(\"/:id/save\", requireLogin, savePost);\nrouter[\"delete\"]('/:id', requireLogin, deletePost);\nrouter.use('/:postid/comment', commentRoutes);\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/routes/posts/index.js?");

/***/ }),

/***/ "./src/routes/posts/likePost.js":
/*!**************************************!*\
  !*** ./src/routes/posts/likePost.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar getUser = __webpack_require__(/*! ../../controllers/user/getUser */ \"./src/controllers/user/getUser.js\");\n\nvar getPost = __webpack_require__(/*! ../../controllers/post/getPost */ \"./src/controllers/post/getPost.js\");\n\nvar updatePost = __webpack_require__(/*! ../../controllers/post/updatePost */ \"./src/controllers/post/updatePost.js\");\n\nvar updateUser = __webpack_require__(/*! ../../controllers/user/updateUser */ \"./src/controllers/user/updateUser.js\"); // route to like posts\n\n\nvar likePost =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    var postId, userId, user, likedPosts, post, likedBy, alreadyLiked, toLike, numOfLikes;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            postId = parseInt(req.params.id);\n            userId = parseInt(req.session.user.id);\n            _context.next = 5;\n            return getUser({\n              id: userId\n            });\n\n          case 5:\n            user = _context.sent;\n            likedPosts = user.likedPosts || []; // user's all liked posts\n\n            _context.next = 9;\n            return getPost({\n              id: postId\n            });\n\n          case 9:\n            post = _context.sent;\n            likedBy = post.likedBy || []; // post's likers\n\n            alreadyLiked = likedBy.some(function (liker) {\n              return liker === userId;\n            });\n\n            if (alreadyLiked) {\n              // if the post was already liked by the user\n              toLike = false;\n              likedBy.splice(likedBy.indexOf(userId), 1);\n              likedPosts.splice(likedPosts.indexOf(postId), 1);\n            } else {\n              // if not liked already\n              toLike = true;\n              likedBy.push(parseInt(userId));\n              likedPosts.push(parseInt(postId));\n            }\n\n            numOfLikes = likedBy.length;\n            _context.next = 16;\n            return updatePost({\n              id: postId\n            }, {\n              likedBy: likedBy,\n              numOfLikes: numOfLikes\n            });\n\n          case 16:\n            _context.next = 18;\n            return updateUser(userId, {\n              likedPosts: likedPosts\n            });\n\n          case 18:\n            return _context.abrupt(\"return\", res.status(201).send({\n              msg: \"\".concat(toLike ? 'Liked' : 'Unliked', \" post\")\n            }));\n\n          case 21:\n            _context.prev = 21;\n            _context.t0 = _context[\"catch\"](0);\n            console.log(_context.t0);\n            return _context.abrupt(\"return\", res.status(500).send('Something went wrong!'));\n\n          case 25:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 21]]);\n  }));\n\n  return function likePost(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = likePost;\n\n//# sourceURL=webpack:///./src/routes/posts/likePost.js?");

/***/ }),

/***/ "./src/routes/posts/savePost.js":
/*!**************************************!*\
  !*** ./src/routes/posts/savePost.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar User = __webpack_require__(/*! ../../models/User */ \"./src/models/User.js\");\n\nvar updateUser = __webpack_require__(/*! ../../controllers/user/updateUser */ \"./src/controllers/user/updateUser.js\");\n\nvar savePost =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    var userId, postId, user, savedPosts, toSave;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            userId = req.session.user.id;\n            postId = parseInt(req.params.id);\n            _context.next = 5;\n            return User.findOne({\n              where: {\n                id: userId\n              }\n            });\n\n          case 5:\n            user = _context.sent;\n            savedPosts = user.savedPosts || [];\n            toSave = false;\n\n            if (savedPosts.indexOf(postId) === -1) {\n              // not saved\n              toSave = true;\n              savedPosts.push(postId);\n            } else {\n              // saved already\n              savedPosts.splice(savedPosts.indexOf(postId), 1);\n            }\n\n            _context.next = 11;\n            return updateUser(userId, {\n              savedPosts: savedPosts\n            });\n\n          case 11:\n            return _context.abrupt(\"return\", res.status(200).send({\n              msg: \"\".concat(toSave ? 'Saved' : 'Unsaved', \" post!\")\n            }));\n\n          case 14:\n            _context.prev = 14;\n            _context.t0 = _context[\"catch\"](0);\n            console.log(_context.t0);\n            return _context.abrupt(\"return\", res.status(500).send({\n              err: 'Server error while saving post :('\n            }));\n\n          case 18:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 14]]);\n  }));\n\n  return function savePost(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = savePost;\n\n//# sourceURL=webpack:///./src/routes/posts/savePost.js?");

/***/ }),

/***/ "./src/routes/tag/getTags.js":
/*!***********************************!*\
  !*** ./src/routes/tag/getTags.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar getTagCloud = __webpack_require__(/*! ../../controllers/tag/getTagCloud */ \"./src/controllers/tag/getTagCloud.js\");\n\nvar getTags =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    var numOfTags, tags;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            numOfTags = 25;\n            _context.prev = 1;\n            _context.next = 4;\n            return getTagCloud(numOfTags);\n\n          case 4:\n            tags = _context.sent;\n            return _context.abrupt(\"return\", res.status(200).send(tags));\n\n          case 8:\n            _context.prev = 8;\n            _context.t0 = _context[\"catch\"](1);\n            console.log(_context.t0);\n            return _context.abrupt(\"return\", res.status(500).send({\n              err: 'server error fetching tag cloud'\n            }));\n\n          case 12:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[1, 8]]);\n  }));\n\n  return function getTags(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = getTags;\n\n//# sourceURL=webpack:///./src/routes/tag/getTags.js?");

/***/ }),

/***/ "./src/routes/tag/index.js":
/*!*********************************!*\
  !*** ./src/routes/tag/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar getTags = __webpack_require__(/*! ./getTags */ \"./src/routes/tag/getTags.js\");\n\nrouter.get('/', getTags);\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/routes/tag/index.js?");

/***/ }),

/***/ "./src/routes/users/deleteUser.js":
/*!****************************************!*\
  !*** ./src/routes/users/deleteUser.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar User = __webpack_require__(/*! ../../models/User */ \"./src/models/User.js\"); // delete a user\n\n\nvar deleteUser =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    var error;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            if (!(req.session.user.id != req.params.id)) {\n              _context.next = 3;\n              break;\n            }\n\n            error = {\n              err: 'Can\\'t perform this action as you are not logged in as this user!'\n            };\n            return _context.abrupt(\"return\", res.status(403).send(error));\n\n          case 3:\n            _context.prev = 3;\n            _context.next = 6;\n            return User.destroy({\n              where: {\n                id: req.session.user.id\n              }\n            });\n\n          case 6:\n            return _context.abrupt(\"return\", res.status(200).send({\n              msg: 'Deleted successfully!'\n            }));\n\n          case 9:\n            _context.prev = 9;\n            _context.t0 = _context[\"catch\"](3);\n            console.log(_context.t0);\n            return _context.abrupt(\"return\", res.status(500).send({\n              err: 'Couldn\\'t delete user'\n            }));\n\n          case 13:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[3, 9]]);\n  }));\n\n  return function deleteUser(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = deleteUser;\n\n//# sourceURL=webpack:///./src/routes/users/deleteUser.js?");

/***/ }),

/***/ "./src/routes/users/editUser.js":
/*!**************************************!*\
  !*** ./src/routes/users/editUser.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar updateUser = __webpack_require__(/*! ../../controllers/user/updateUser */ \"./src/controllers/user/updateUser.js\"); // Edit the creds of a user by id \n\n\nvar editUser =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    var authError, updatedUserValues, id;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            if (!(req.session.user.id != req.params.id)) {\n              _context.next = 3;\n              break;\n            }\n\n            authError = {\n              err: 'Can\\'t perform this action as you are not logged in as this user!'\n            };\n            return _context.abrupt(\"return\", res.status(403).send(authError));\n\n          case 3:\n            updatedUserValues = _objectSpread({}, req.body);\n            _context.prev = 4;\n            id = req.session.user.id;\n            _context.next = 8;\n            return updateUser(id, _objectSpread({}, updatedUserValues));\n\n          case 8:\n            _context.next = 14;\n            break;\n\n          case 10:\n            _context.prev = 10;\n            _context.t0 = _context[\"catch\"](4);\n            console.log(_context.t0);\n            return _context.abrupt(\"return\", res.status(500).send({\n              err: 'Something went wrong updating the user'\n            }));\n\n          case 14:\n            return _context.abrupt(\"return\", res.status(200).send({\n              msg: 'user with id ' + req.params.id + ' edited!'\n            }));\n\n          case 15:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[4, 10]]);\n  }));\n\n  return function editUser(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = editUser;\n\n//# sourceURL=webpack:///./src/routes/users/editUser.js?");

/***/ }),

/***/ "./src/routes/users/followUser.js":
/*!****************************************!*\
  !*** ./src/routes/users/followUser.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar getUser = __webpack_require__(/*! ../../controllers/user/getUser */ \"./src/controllers/user/getUser.js\");\n\nvar updateUser = __webpack_require__(/*! ../../controllers/user/updateUser */ \"./src/controllers/user/updateUser.js\");\n\nvar followUser =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    var followerId, followeeId, followee, followers, followerIndex, toFollow, follower, following;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            followerId = parseInt(req.session.user.id);\n            followeeId = parseInt(req.params.id);\n\n            if (!(followeeId === followerId)) {\n              _context.next = 5;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(400).send({\n              err: \"Can't follow yourself （πーπ）\"\n            }));\n\n          case 5:\n            _context.next = 7;\n            return getUser({\n              id: followeeId\n            });\n\n          case 7:\n            followee = _context.sent;\n            followers = followee.followers || [];\n            followerIndex = followers.indexOf(followerId);\n\n            if (followerIndex === -1) {\n              toFollow = true; // follow if not already followed\n\n              followers.push(followerId);\n            } else {\n              toFollow = false;\n              followers.splice(followerIndex, 1);\n            }\n\n            _context.next = 13;\n            return updateUser(followeeId, {\n              followers: followers\n            });\n\n          case 13:\n            _context.next = 15;\n            return getUser({\n              id: followeeId\n            });\n\n          case 15:\n            follower = _context.sent;\n            following = follower.following || [];\n\n            if (toFollow) {\n              following.push(followeeId);\n            } else {\n              following.splice(followeeId, 1);\n            }\n\n            _context.next = 20;\n            return updateUser(followerId, {\n              following: following\n            });\n\n          case 20:\n            if (!toFollow) {\n              _context.next = 24;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(200).send({\n              msg: 'Following'\n            }));\n\n          case 24:\n            return _context.abrupt(\"return\", res.status(200).send({\n              msg: 'Unfollowed'\n            }));\n\n          case 25:\n            _context.next = 31;\n            break;\n\n          case 27:\n            _context.prev = 27;\n            _context.t0 = _context[\"catch\"](0);\n            console.log(_context.t0);\n            return _context.abrupt(\"return\", res.status(500).send({\n              err: 'Something went wrong following this user'\n            }));\n\n          case 31:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 27]]);\n  }));\n\n  return function followUser(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = followUser;\n\n//# sourceURL=webpack:///./src/routes/users/followUser.js?");

/***/ }),

/***/ "./src/routes/users/getAvatar.js":
/*!***************************************!*\
  !*** ./src/routes/users/getAvatar.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar User = __webpack_require__(/*! ../../models/User */ \"./src/models/User.js\");\n\nvar getAvatar =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    var id, user;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            id = req.params.id;\n\n            if (id) {\n              _context.next = 4;\n              break;\n            }\n\n            throw \"no id. Prob not logged in\";\n\n          case 4:\n            _context.next = 6;\n            return User.findOne({\n              where: {\n                id: id\n              },\n              attributes: ['photo']\n            });\n\n          case 6:\n            user = _context.sent;\n            return _context.abrupt(\"return\", res.send(user.photo));\n\n          case 10:\n            _context.prev = 10;\n            _context.t0 = _context[\"catch\"](0);\n            console.log(_context.t0);\n            return _context.abrupt(\"return\", res.send(''));\n\n          case 14:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 10]]);\n  }));\n\n  return function getAvatar(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = getAvatar;\n\n//# sourceURL=webpack:///./src/routes/users/getAvatar.js?");

/***/ }),

/***/ "./src/routes/users/getCurrentUser.js":
/*!********************************************!*\
  !*** ./src/routes/users/getCurrentUser.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar getUser = __webpack_require__(/*! ../../controllers/user/getUser */ \"./src/controllers/user/getUser.js\");\n\nvar getCurrentUser =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    var id, user;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            id = req.session.user.id;\n            _context.next = 4;\n            return getUser({\n              id: id\n            });\n\n          case 4:\n            user = _context.sent;\n            return _context.abrupt(\"return\", res.status(200).send(user));\n\n          case 8:\n            _context.prev = 8;\n            _context.t0 = _context[\"catch\"](0);\n            console.log(_context.t0);\n            return _context.abrupt(\"return\", res.status(500).send({\n              err: 'Something went wrong fetching your profile :('\n            }));\n\n          case 12:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 8]]);\n  }));\n\n  return function getCurrentUser(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = getCurrentUser;\n\n//# sourceURL=webpack:///./src/routes/users/getCurrentUser.js?");

/***/ }),

/***/ "./src/routes/users/getUserById.js":
/*!*****************************************!*\
  !*** ./src/routes/users/getUserById.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar getUser = __webpack_require__(/*! ../../controllers/user/getUser */ \"./src/controllers/user/getUser.js\");\n\nvar isLoggedIn = __webpack_require__(/*! ../../controllers/isLoggedIn */ \"./src/controllers/isLoggedIn.js\");\n\nvar parseUser = function parseUser(user) {\n  // sanitize data for client side rendering\n  user.createdAt = new Date(parseInt(user.createdAt)).toDateString().split(' ').splice(1).join(' ');\n  user.followers = user.followers || [];\n  user.following = user.following || [];\n  user.posts = user.posts || [];\n  user.commentedPosts = user.commentedPosts || [];\n\n  if (typeof user.commentedPosts === 'string') {\n    user.commentedPosts = JSON.parse(user.commentedPosts);\n  }\n\n  return user;\n};\n\nvar getUserById =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    var id, user, loggedIn, loggedUserId;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            id = req.params.id;\n            _context.next = 4;\n            return getUser({\n              id: id\n            });\n\n          case 4:\n            user = _context.sent;\n\n            if (user) {\n              _context.next = 7;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(404).send({\n              err: '404. This user is either deleted or never existed!'\n            }));\n\n          case 7:\n            user = parseUser(user);\n            _context.next = 10;\n            return isLoggedIn(req);\n\n          case 10:\n            loggedIn = _context.sent;\n\n            if (loggedIn) {\n              loggedUserId = req.session.user.id;\n              user.dataValues.followed = user.followers.indexOf(loggedUserId) !== -1;\n            }\n\n            return _context.abrupt(\"return\", res.status(201).send(user));\n\n          case 15:\n            _context.prev = 15;\n            _context.t0 = _context[\"catch\"](0);\n            console.log(_context.t0);\n            return _context.abrupt(\"return\", res.status(500).send({\n              err: 'Server error'\n            }));\n\n          case 19:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 15]]);\n  }));\n\n  return function getUserById(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = getUserById;\n\n//# sourceURL=webpack:///./src/routes/users/getUserById.js?");

/***/ }),

/***/ "./src/routes/users/getUsers.js":
/*!**************************************!*\
  !*** ./src/routes/users/getUsers.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar User = __webpack_require__(/*! ../../models/User */ \"./src/models/User.js\"); // Get all users\n\n\nvar getUsers =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    var users;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            _context.next = 3;\n            return User.findAll();\n\n          case 3:\n            users = _context.sent;\n            return _context.abrupt(\"return\", res.status(200).send(users));\n\n          case 7:\n            _context.prev = 7;\n            _context.t0 = _context[\"catch\"](0);\n            console.log(_context.t0);\n            return _context.abrupt(\"return\", res.status(500).send({\n              err: 'Server error fetching users'\n            }));\n\n          case 11:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 7]]);\n  }));\n\n  return function getUsers(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = getUsers;\n\n//# sourceURL=webpack:///./src/routes/users/getUsers.js?");

/***/ }),

/***/ "./src/routes/users/index.js":
/*!***********************************!*\
  !*** ./src/routes/users/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar getUsers = __webpack_require__(/*! ./getUsers */ \"./src/routes/users/getUsers.js\");\n\nvar registerUser = __webpack_require__(/*! ./registerUser */ \"./src/routes/users/registerUser.js\");\n\nvar getCurrentUser = __webpack_require__(/*! ./getCurrentUser */ \"./src/routes/users/getCurrentUser.js\");\n\nvar getUserById = __webpack_require__(/*! ./getUserById */ \"./src/routes/users/getUserById.js\");\n\nvar getAvatar = __webpack_require__(/*! ./getAvatar */ \"./src/routes/users/getAvatar.js\");\n\nvar followUser = __webpack_require__(/*! ./followUser */ \"./src/routes/users/followUser.js\");\n\nvar editUser = __webpack_require__(/*! ./editUser */ \"./src/routes/users/editUser.js\");\n\nvar deleteUser = __webpack_require__(/*! ./deleteUser */ \"./src/routes/users/deleteUser.js\");\n\nvar requireLogin = __webpack_require__(/*! ../../middlewares/requireLogin */ \"./src/middlewares/requireLogin.js\");\n\nrouter.get('/', getUsers);\nrouter.get('/:id/avatar', getAvatar);\nrouter.post('/', registerUser);\nrouter.get('/me', requireLogin, getCurrentUser);\nrouter.get('/:id', getUserById);\nrouter.put('/:id', requireLogin, editUser);\nrouter[\"delete\"]('/:id/delete', requireLogin, deleteUser);\nrouter.post('/:id/follow', requireLogin, followUser);\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/routes/users/index.js?");

/***/ }),

/***/ "./src/routes/users/registerUser.js":
/*!******************************************!*\
  !*** ./src/routes/users/registerUser.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar User = __webpack_require__(/*! ../../models/User */ \"./src/models/User.js\");\n\nvar addCookie = __webpack_require__(/*! ../../controllers/user/addCookie */ \"./src/controllers/user/addCookie.js\");\n\nvar getUser = __webpack_require__(/*! ../../controllers/user/getUser */ \"./src/controllers/user/getUser.js\"); // Register a user\n\n\nvar registerUser =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    var user, userInRecords, newUser;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            user = _objectSpread({}, req.body) || {}; // server side validation\n\n            if (!(!user.name || !user.password || !user.email)) {\n              _context.next = 4;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(422).send({\n              err: 'Please fill all fields'\n            }));\n\n          case 4:\n            _context.next = 6;\n            return getUser({\n              email: user.email\n            });\n\n          case 6:\n            userInRecords = _context.sent;\n\n            if (!userInRecords) {\n              _context.next = 9;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(409).send({\n              err: 'Email is already in use!'\n            }));\n\n          case 9:\n            // attach timestamp and session_id\n            user.session_ids = req.sessionID.toString();\n            user.createdAt = new Date().getTime(); // user.id = 1; // remove this\n\n            _context.prev = 11;\n            _context.next = 14;\n            return User.create(user);\n\n          case 14:\n            newUser = _context.sent;\n            _context.next = 21;\n            break;\n\n          case 17:\n            _context.prev = 17;\n            _context.t0 = _context[\"catch\"](11);\n            console.log(_context.t0);\n            return _context.abrupt(\"return\", res.status(500).send({\n              err: 'Something went wrong creating user :('\n            }));\n\n          case 21:\n            // Successful registeration\n            // set a cookie\n            addCookie(req, newUser);\n            return _context.abrupt(\"return\", res.status(201).send({\n              msg: 'User registered successfully!'\n            }));\n\n          case 25:\n            _context.prev = 25;\n            _context.t1 = _context[\"catch\"](0);\n            console.log(_context.t1);\n\n          case 28:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 25], [11, 17]]);\n  }));\n\n  return function registerUser(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = registerUser;\n\n//# sourceURL=webpack:///./src/routes/users/registerUser.js?");

/***/ }),

/***/ 0:
/*!******************************************!*\
  !*** multi @babel/polyfill ./src/app.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! @babel/polyfill */\"@babel/polyfill\");\nmodule.exports = __webpack_require__(/*! ./src/app.js */\"./src/app.js\");\n\n\n//# sourceURL=webpack:///multi_@babel/polyfill_./src/app.js?");

/***/ }),

/***/ "@babel/polyfill":
/*!**********************************!*\
  !*** external "@babel/polyfill" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/polyfill\");\n\n//# sourceURL=webpack:///external_%22@babel/polyfill%22?");

/***/ }),

/***/ "connect-redis":
/*!********************************!*\
  !*** external "connect-redis" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"connect-redis\");\n\n//# sourceURL=webpack:///external_%22connect-redis%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "reading-time":
/*!*******************************!*\
  !*** external "reading-time" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"reading-time\");\n\n//# sourceURL=webpack:///external_%22reading-time%22?");

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redis\");\n\n//# sourceURL=webpack:///external_%22redis%22?");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"sequelize\");\n\n//# sourceURL=webpack:///external_%22sequelize%22?");

/***/ }),

/***/ "textversionjs":
/*!********************************!*\
  !*** external "textversionjs" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"textversionjs\");\n\n//# sourceURL=webpack:///external_%22textversionjs%22?");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"uuid\");\n\n//# sourceURL=webpack:///external_%22uuid%22?");

/***/ })

/******/ });