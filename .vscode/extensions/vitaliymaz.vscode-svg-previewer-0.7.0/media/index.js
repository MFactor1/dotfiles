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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./preview-src/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function eventListener() {
      if (errorListener !== undefined) {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };
    var errorListener;

    // Adding an error listener is not optional because
    // if an error is thrown on an event emitter we cannot
    // guarantee that the actual event we are waiting will
    // be fired. The result could be a silent way to create
    // memory or file descriptor leaks, which is something
    // we should avoid.
    if (name !== 'error') {
      errorListener = function errorListener(err) {
        emitter.removeListener(name, eventListener);
        reject(err);
      };

      emitter.once('error', errorListener);
    }

    emitter.once(name, eventListener);
  });
}


/***/ }),

/***/ "./node_modules/preact/dist/preact.module.js":
/*!***************************************************!*\
  !*** ./node_modules/preact/dist/preact.module.js ***!
  \***************************************************/
/*! exports provided: render, hydrate, createElement, h, Fragment, createRef, isValidElement, Component, cloneElement, createContext, toChildArray, options */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return M; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hydrate", function() { return O; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return v; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return v; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return p; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRef", function() { return y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidElement", function() { return l; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return S; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createContext", function() { return q; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toChildArray", function() { return x; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return n; });
var n,l,u,i,t,o,r,f={},e=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function s(n,l){for(var u in l)n[u]=l[u];return n}function a(n){var l=n.parentNode;l&&l.removeChild(n)}function v(n,l,u){var i,t,o,r=arguments,f={};for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);if(null!=u&&(f.children=u),"function"==typeof n&&null!=n.defaultProps)for(o in n.defaultProps)void 0===f[o]&&(f[o]=n.defaultProps[o]);return h(n,f,i,t,null)}function h(l,u,i,t,o){var r={type:l,props:u,key:i,ref:t,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==o?++n.__v:o};return null!=n.vnode&&n.vnode(r),r}function y(){return{current:null}}function p(n){return n.children}function d(n,l){this.props=n,this.context=l}function _(n,l){if(null==l)return n.__?_(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return"function"==typeof n.type?_(n):null}function w(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return w(n)}}function k(l){(!l.__d&&(l.__d=!0)&&u.push(l)&&!g.__r++||t!==n.debounceRendering)&&((t=n.debounceRendering)||i)(g)}function g(){for(var n;g.__r=u.length;)n=u.sort(function(n,l){return n.__v.__b-l.__v.__b}),u=[],n.some(function(n){var l,u,i,t,o,r;n.__d&&(o=(t=(l=n).__v).__e,(r=l.__P)&&(u=[],(i=s({},t)).__v=t.__v+1,$(r,t,i,l.__n,void 0!==r.ownerSVGElement,null!=t.__h?[o]:null,u,null==o?_(t):o,t.__h),j(u,t),t.__e!=o&&w(t)))})}function m(n,l,u,i,t,o,r,c,s,v){var y,d,w,k,g,m,x,P=i&&i.__k||e,C=P.length;for(s==f&&(s=null!=r?r[0]:C?_(i,0):null),u.__k=[],y=0;y<l.length;y++)if(null!=(k=u.__k[y]=null==(k=l[y])||"boolean"==typeof k?null:"string"==typeof k||"number"==typeof k?h(null,k,null,null,k):Array.isArray(k)?h(p,{children:k},null,null,null):k.__b>0?h(k.type,k.props,k.key,null,k.__v):k)){if(k.__=u,k.__b=u.__b+1,null===(w=P[y])||w&&k.key==w.key&&k.type===w.type)P[y]=void 0;else for(d=0;d<C;d++){if((w=P[d])&&k.key==w.key&&k.type===w.type){P[d]=void 0;break}w=null}$(n,k,w=w||f,t,o,r,c,s,v),g=k.__e,(d=k.ref)&&w.ref!=d&&(x||(x=[]),w.ref&&x.push(w.ref,null,k),x.push(d,k.__c||g,k)),null!=g?(null==m&&(m=g),"function"==typeof k.type&&null!=k.__k&&k.__k===w.__k?k.__d=s=b(k,s,n):s=A(n,k,w,P,r,g,s),v||"option"!==u.type?"function"==typeof u.type&&(u.__d=s):n.value=""):s&&w.__e==s&&s.parentNode!=n&&(s=_(w))}if(u.__e=m,null!=r&&"function"!=typeof u.type)for(y=r.length;y--;)null!=r[y]&&a(r[y]);for(y=C;y--;)null!=P[y]&&("function"==typeof u.type&&null!=P[y].__e&&P[y].__e==u.__d&&(u.__d=_(i,y+1)),I(P[y],P[y]));if(x)for(y=0;y<x.length;y++)H(x[y],x[++y],x[++y])}function b(n,l,u){var i,t;for(i=0;i<n.__k.length;i++)(t=n.__k[i])&&(t.__=n,l="function"==typeof t.type?b(t,l,u):A(u,t,t,n.__k,null,t.__e,l));return l}function x(n,l){return l=l||[],null==n||"boolean"==typeof n||(Array.isArray(n)?n.some(function(n){x(n,l)}):l.push(n)),l}function A(n,l,u,i,t,o,r){var f,e,c;if(void 0!==l.__d)f=l.__d,l.__d=void 0;else if(t==u||o!=r||null==o.parentNode)n:if(null==r||r.parentNode!==n)n.appendChild(o),f=null;else{for(e=r,c=0;(e=e.nextSibling)&&c<i.length;c+=2)if(e==o)break n;n.insertBefore(o,r),f=r}return void 0!==f?f:o.nextSibling}function P(n,l,u,i,t){var o;for(o in u)"children"===o||"key"===o||o in l||z(n,o,null,u[o],i);for(o in l)t&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||z(n,o,l[o],u[o],i)}function C(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||c.test(l)?u:u+"px"}function z(n,l,u,i,t){var o,r,f;if(t&&"className"==l&&(l="class"),"style"===l)if("string"==typeof u)n.style.cssText=u;else{if("string"==typeof i&&(n.style.cssText=i=""),i)for(l in i)u&&l in u||C(n.style,l,"");if(u)for(l in u)i&&u[l]===i[l]||C(n.style,l,u[l])}else"o"===l[0]&&"n"===l[1]?(o=l!==(l=l.replace(/Capture$/,"")),(r=l.toLowerCase())in n&&(l=r),l=l.slice(2),n.l||(n.l={}),n.l[l+o]=u,f=o?T:N,u?i||n.addEventListener(l,f,o):n.removeEventListener(l,f,o)):"list"!==l&&"tagName"!==l&&"form"!==l&&"type"!==l&&"size"!==l&&"download"!==l&&"href"!==l&&"contentEditable"!==l&&!t&&l in n?n[l]=null==u?"":u:"function"!=typeof u&&"dangerouslySetInnerHTML"!==l&&(l!==(l=l.replace(/xlink:?/,""))?null==u||!1===u?n.removeAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase()):n.setAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase(),u):null==u||!1===u&&!/^ar/.test(l)?n.removeAttribute(l):n.setAttribute(l,u))}function N(l){this.l[l.type+!1](n.event?n.event(l):l)}function T(l){this.l[l.type+!0](n.event?n.event(l):l)}function $(l,u,i,t,o,r,f,e,c){var a,v,h,y,_,w,k,g,b,x,A,P=u.type;if(void 0!==u.constructor)return null;null!=i.__h&&(c=i.__h,e=u.__e=i.__e,u.__h=null,r=[e]),(a=n.__b)&&a(u);try{n:if("function"==typeof P){if(g=u.props,b=(a=P.contextType)&&t[a.__c],x=a?b?b.props.value:a.__:t,i.__c?k=(v=u.__c=i.__c).__=v.__E:("prototype"in P&&P.prototype.render?u.__c=v=new P(g,x):(u.__c=v=new d(g,x),v.constructor=P,v.render=L),b&&b.sub(v),v.props=g,v.state||(v.state={}),v.context=x,v.__n=t,h=v.__d=!0,v.__h=[]),null==v.__s&&(v.__s=v.state),null!=P.getDerivedStateFromProps&&(v.__s==v.state&&(v.__s=s({},v.__s)),s(v.__s,P.getDerivedStateFromProps(g,v.__s))),y=v.props,_=v.state,h)null==P.getDerivedStateFromProps&&null!=v.componentWillMount&&v.componentWillMount(),null!=v.componentDidMount&&v.__h.push(v.componentDidMount);else{if(null==P.getDerivedStateFromProps&&g!==y&&null!=v.componentWillReceiveProps&&v.componentWillReceiveProps(g,x),!v.__e&&null!=v.shouldComponentUpdate&&!1===v.shouldComponentUpdate(g,v.__s,x)||u.__v===i.__v){v.props=g,v.state=v.__s,u.__v!==i.__v&&(v.__d=!1),v.__v=u,u.__e=i.__e,u.__k=i.__k,v.__h.length&&f.push(v);break n}null!=v.componentWillUpdate&&v.componentWillUpdate(g,v.__s,x),null!=v.componentDidUpdate&&v.__h.push(function(){v.componentDidUpdate(y,_,w)})}v.context=x,v.props=g,v.state=v.__s,(a=n.__r)&&a(u),v.__d=!1,v.__v=u,v.__P=l,a=v.render(v.props,v.state,v.context),v.state=v.__s,null!=v.getChildContext&&(t=s(s({},t),v.getChildContext())),h||null==v.getSnapshotBeforeUpdate||(w=v.getSnapshotBeforeUpdate(y,_)),A=null!=a&&a.type===p&&null==a.key?a.props.children:a,m(l,Array.isArray(A)?A:[A],u,i,t,o,r,f,e,c),v.base=u.__e,u.__h=null,v.__h.length&&f.push(v),k&&(v.__E=v.__=null),v.__e=!1}else null==r&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=E(i.__e,u,i,t,o,r,f,c);(a=n.diffed)&&a(u)}catch(l){u.__v=null,(c||null!=r)&&(u.__e=e,u.__h=!!c,r[r.indexOf(e)]=null),n.__e(l,u,i)}}function j(l,u){n.__c&&n.__c(u,l),l.some(function(u){try{l=u.__h,u.__h=[],l.some(function(n){n.call(u)})}catch(l){n.__e(l,u.__v)}})}function E(n,l,u,i,t,o,r,c){var s,a,v,h,y,p=u.props,d=l.props;if(t="svg"===l.type||t,null!=o)for(s=0;s<o.length;s++)if(null!=(a=o[s])&&((null===l.type?3===a.nodeType:a.localName===l.type)||n==a)){n=a,o[s]=null;break}if(null==n){if(null===l.type)return document.createTextNode(d);n=t?document.createElementNS("http://www.w3.org/2000/svg",l.type):document.createElement(l.type,d.is&&{is:d.is}),o=null,c=!1}if(null===l.type)p===d||c&&n.data===d||(n.data=d);else{if(null!=o&&(o=e.slice.call(n.childNodes)),v=(p=u.props||f).dangerouslySetInnerHTML,h=d.dangerouslySetInnerHTML,!c){if(null!=o)for(p={},y=0;y<n.attributes.length;y++)p[n.attributes[y].name]=n.attributes[y].value;(h||v)&&(h&&(v&&h.__html==v.__html||h.__html===n.innerHTML)||(n.innerHTML=h&&h.__html||""))}P(n,d,p,t,c),h?l.__k=[]:(s=l.props.children,m(n,Array.isArray(s)?s:[s],l,u,i,"foreignObject"!==l.type&&t,o,r,f,c)),c||("value"in d&&void 0!==(s=d.value)&&(s!==n.value||"progress"===l.type&&!s)&&z(n,"value",s,p.value,!1),"checked"in d&&void 0!==(s=d.checked)&&s!==n.checked&&z(n,"checked",s,p.checked,!1))}return n}function H(l,u,i){try{"function"==typeof l?l(u):l.current=u}catch(l){n.__e(l,i)}}function I(l,u,i){var t,o,r;if(n.unmount&&n.unmount(l),(t=l.ref)&&(t.current&&t.current!==l.__e||H(t,null,u)),i||"function"==typeof l.type||(i=null!=(o=l.__e)),l.__e=l.__d=void 0,null!=(t=l.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount()}catch(l){n.__e(l,u)}t.base=t.__P=null}if(t=l.__k)for(r=0;r<t.length;r++)t[r]&&I(t[r],u,i);null!=o&&a(o)}function L(n,l,u){return this.constructor(n,u)}function M(l,u,i){var t,r,c;n.__&&n.__(l,u),r=(t=i===o)?null:i&&i.__k||u.__k,l=v(p,null,[l]),c=[],$(u,(t?u:i||u).__k=l,r||f,f,void 0!==u.ownerSVGElement,i&&!t?[i]:r?null:u.childNodes.length?e.slice.call(u.childNodes):null,c,i||f,t),j(c,l)}function O(n,l){M(n,l,o)}function S(n,l,u){var i,t,o,r=arguments,f=s({},n.props);for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);return null!=u&&(f.children=u),h(n.type,f,i||n.key,t||n.ref,null)}function q(n,l){var u={__c:l="__cC"+r++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,i;return this.getChildContext||(u=[],(i={})[l]=this,this.getChildContext=function(){return i},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(k)},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n)}}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n={__e:function(n,l){for(var u,i,t,o=l.__h;l=l.__;)if((u=l.__c)&&!u.__)try{if((i=u.constructor)&&null!=i.getDerivedStateFromError&&(u.setState(i.getDerivedStateFromError(n)),t=u.__d),null!=u.componentDidCatch&&(u.componentDidCatch(n),t=u.__d),t)return l.__h=o,u.__E=u}catch(l){n=l}throw n},__v:0},l=function(n){return null!=n&&void 0===n.constructor},d.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=s({},this.state),"function"==typeof n&&(n=n(s({},u),this.props)),n&&s(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),k(this))},d.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),k(this))},d.prototype.render=p,u=[],i="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,g.__r=0,o=f,r=0;
//# sourceMappingURL=preact.module.js.map


/***/ }),

/***/ "./node_modules/redux-zero/dist/redux-zero.js":
/*!****************************************************!*\
  !*** ./node_modules/redux-zero/dist/redux-zero.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */



var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function createStore$1(initialState, middleware) {
    if (initialState === void 0) { initialState = {}; }
    if (middleware === void 0) { middleware = null; }
    var state = initialState || {};
    var listeners = [];
    function dispatchListeners() {
        listeners.forEach(function (f) { return f(state); });
    }
    return {
        middleware: middleware,
        setState: function (update) {
            state = __assign({}, state, (typeof update === "function" ? update(state) : update));
            dispatchListeners();
        },
        subscribe: function (f) {
            listeners.push(f);
            return function () {
                listeners.splice(listeners.indexOf(f), 1);
            };
        },
        getState: function () {
            return state;
        },
        reset: function () {
            state = initialState;
            dispatchListeners();
        }
    };
}

module.exports = createStore$1;


/***/ }),

/***/ "./node_modules/redux-zero/preact/index.js":
/*!*************************************************!*\
  !*** ./node_modules/redux-zero/preact/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function shallowEqual(a, b) {
    for (var i in a)
        if (a[i] !== b[i])
            return false;
    for (var i in b)
        if (!(i in a))
            return false;
    return true;
}

function set(store, ret) {
    if (ret != null) {
        if (ret.then)
            return ret.then(store.setState);
        store.setState(ret);
    }
}

function bindAction(action, store) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (typeof store.middleware === "function") {
            return store.middleware(store, action, args);
        }
        return set(store, action.apply(void 0, [store.getState()].concat(args)));
    };
}

function bindActions(actions, store, ownProps) {
    actions = typeof actions === "function" ? actions(store, ownProps) : actions;
    var bound = {};
    for (var name_1 in actions) {
        var action = actions[name_1];
        bound[name_1] = bindAction(action, store);
    }
    return bound;
}

var Connect = /** @class */ (function (_super) {
    __extends(Connect, _super);
    function Connect(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.update = function () {
            var mapped = _this.getProps(_this.props, _this.context);
            if (!shallowEqual(mapped, _this.state)) {
                _this.setState(mapped);
            }
        };
        _this.state = _this.getProps(props, context);
        _this.actions = _this.getActions();
        return _this;
    }
    Connect.prototype.componentWillMount = function () {
        this.unsubscribe = this.context.store.subscribe(this.update);
    };
    Connect.prototype.componentWillUnmount = function () {
        this.unsubscribe(this.update);
    };
    Connect.prototype.componentWillReceiveProps = function (nextProps, nextContext) {
        var mapped = this.getProps(nextProps, nextContext);
        if (!shallowEqual(mapped, this.state)) {
            this.setState(mapped);
        }
    };
    Connect.prototype.getProps = function (props, context) {
        var mapToProps = props.mapToProps;
        var state = (context.store && context.store.getState()) || {};
        return mapToProps ? mapToProps(state, props) : state;
    };
    Connect.prototype.getActions = function () {
        var actions = this.props.actions;
        return bindActions(actions, this.context.store, this.props);
    };
    Connect.prototype.render = function (_a, state, _b) {
        var children = _a.children;
        var store = _b.store;
        var child = (children && children[0]) || children;
        return child(__assign({ store: store }, state, this.actions));
    };
    return Connect;
}(preact.Component));
// [ HACK ] to avoid Typechecks
// since there is a small conflict between preact and react typings
// in the future this might become unecessary by updating typings
var ConnectUntyped = Connect;
function connect(mapToProps, actions) {
    if (actions === void 0) { actions = {}; }
    return function (Child) {
        return /** @class */ (function (_super) {
            __extends(ConnectWrapper, _super);
            function ConnectWrapper() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ConnectWrapper.prototype.render = function () {
                var props = this.props;
                return (preact.h(ConnectUntyped, __assign({}, props, { mapToProps: mapToProps, actions: actions }), function (mappedProps) { return preact.h(Child, __assign({}, mappedProps, props)); }));
            };
            return ConnectWrapper;
        }(preact.Component));
    };
}

var Provider = /** @class */ (function (_super) {
    __extends(Provider, _super);
    function Provider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Provider.prototype.getChildContext = function () {
        return { store: this.props.store };
    };
    Provider.prototype.render = function () {
        return ((this.props.children && this.props.children[0]) ||
            this.props.children);
    };
    return Provider;
}(preact.Component));

exports.connect = connect;
exports.Provider = Provider;
exports.Connect = Connect;


/***/ }),

/***/ "./preview-src/App.tsx":
/*!*****************************!*\
  !*** ./preview-src/App.tsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var redux_zero_preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-zero/preact */ "./node_modules/redux-zero/preact/index.js");
/* harmony import */ var redux_zero_preact__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_zero_preact__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _messaging__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./messaging */ "./preview-src/messaging/index.ts");
/* harmony import */ var _containers_ToolbarContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./containers/ToolbarContainer */ "./preview-src/containers/ToolbarContainer.tsx");
/* harmony import */ var _containers_PreviewContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./containers/PreviewContainer */ "./preview-src/containers/PreviewContainer.tsx");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./store */ "./preview-src/store/index.ts");






const mapToProps = (state) => ({ source: state.source });
class App extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    componentDidMount() {
        _messaging__WEBPACK_IMPORTED_MODULE_2__["default"].addListener('source:update', this.props.updateSource);
    }
    componentWillUnmount() {
        _messaging__WEBPACK_IMPORTED_MODULE_2__["default"].removeListener('source:update', this.props.updateSource);
    }
    render() {
        return (Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { className: 'layout' },
            Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_containers_ToolbarContainer__WEBPACK_IMPORTED_MODULE_3__["default"], null),
            this.props.source.data && Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_containers_PreviewContainer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(redux_zero_preact__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapToProps, _store__WEBPACK_IMPORTED_MODULE_5__["actions"])(App));


/***/ }),

/***/ "./preview-src/components/Preview.tsx":
/*!********************************************!*\
  !*** ./preview-src/components/Preview.tsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");

const Preview = ({ data, attachRef, dimension: { width, height, units }, onWheel, background, settings, showTransparencyGrid }) => {
    const styles = {
        width: `${width}${units}`,
        minWidth: `${width}${units}`,
        height: `${height}${units}`,
        minHeight: `${height}${units}`
    };
    return (Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { className: `preview ${background} ${settings.showBoundingBox ? 'bounding-box' : ''} ${showTransparencyGrid ? 'transparency-grid' : ''}`, onWheel: onWheel },
        Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("img", { src: `data:image/svg+xml,${encodeURIComponent(data)}`, ref: attachRef, style: styles, alt: '' })));
};
/* harmony default export */ __webpack_exports__["default"] = (Preview);


/***/ }),

/***/ "./preview-src/components/PreviewError.tsx":
/*!*************************************************!*\
  !*** ./preview-src/components/PreviewError.tsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");

const PreviewError = () => (Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { className: 'error-container' },
    Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("img", { src: 'media/images/error.png' }),
    Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", null,
        Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", null, "Image Not Loaded"),
        Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", null, "Try to open it externally to fix format problem"))));
/* harmony default export */ __webpack_exports__["default"] = (PreviewError);


/***/ }),

/***/ "./preview-src/components/Toolbar.tsx":
/*!********************************************!*\
  !*** ./preview-src/components/Toolbar.tsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _icons_BoundingBoxIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icons/BoundingBoxIcon */ "./preview-src/components/icons/BoundingBoxIcon.tsx");
/* harmony import */ var _icons_TransparencyGridIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icons/TransparencyGridIcon */ "./preview-src/components/icons/TransparencyGridIcon.tsx");
/* harmony import */ var _icons_ZoomInIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icons/ZoomInIcon */ "./preview-src/components/icons/ZoomInIcon.tsx");
/* harmony import */ var _icons_ZoomOutIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icons/ZoomOutIcon */ "./preview-src/components/icons/ZoomOutIcon.tsx");
/* harmony import */ var _icons_ZoomResetIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icons/ZoomResetIcon */ "./preview-src/components/icons/ZoomResetIcon.tsx");






const Toolbar = ({ onChangeBackgroundButtonClick, zoomIn, zoomOut, zoomReset, fileSize, sourceImageValidity, onBtnMouseDown, activeBtn, onToggleTransparencyGridClick, onToggleBoundingBoxClick, scale, background, showBoundingBox, showTransparencyGrid }) => (Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { className: 'toolbar' },
    Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { className: 'btn-group' },
        Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("button", { name: 'zoom-in', className: `btn btn-zoom-in ${activeBtn === 'zoom-in' ? 'active' : ''}`, disabled: !sourceImageValidity, onClick: zoomIn, onMouseDown: onBtnMouseDown, title: 'Zoom In' },
            Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_icons_ZoomInIcon__WEBPACK_IMPORTED_MODULE_3__["ZoomInIcon"], { className: 'icon' })),
        Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("button", { name: 'zoom-out', className: `btn btn-zoom-out ${activeBtn === 'zoom-out' ? 'active' : ''}`, disabled: !sourceImageValidity, onClick: zoomOut, onMouseDown: onBtnMouseDown, title: 'Zoom Out' },
            Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_icons_ZoomOutIcon__WEBPACK_IMPORTED_MODULE_4__["ZoomOutIcon"], { className: 'icon' })),
        Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("button", { name: 'zoom-reset', className: `btn btn-zoom-reset ${activeBtn === 'zoom-reset' ? 'active' : ''}`, disabled: scale === 1 || !sourceImageValidity, onClick: zoomReset, onMouseDown: onBtnMouseDown, title: 'Zoom Reset' },
            Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_icons_ZoomResetIcon__WEBPACK_IMPORTED_MODULE_5__["ZoomResetIcon"], { className: 'icon' }))),
    Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { className: 'separator' }),
    Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { className: 'btn-group' },
        Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("button", { disabled: !sourceImageValidity, className: `btn bg dark ${activeBtn === 'dark' ? 'active' : ''} ${background === 'dark' ? 'selected' : ''}`, name: 'dark', onClick: onChangeBackgroundButtonClick, onMouseDown: onBtnMouseDown, title: 'Dark' },
            Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("span", { className: 'icon' })),
        Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("button", { disabled: !sourceImageValidity, className: `btn bg light ${activeBtn === 'light' ? 'active' : ''} ${background === 'light' ? 'selected' : ''}`, name: 'light', onClick: onChangeBackgroundButtonClick, onMouseDown: onBtnMouseDown, title: 'Light' },
            Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("span", { className: 'icon' }))),
    Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { className: 'separator' }),
    Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { className: 'btn-group' },
        Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("button", { disabled: !sourceImageValidity, className: `btn transparency-grid ${activeBtn === 'transparency-grid' ? 'active' : ''} ${showTransparencyGrid ? 'selected' : ''}`, name: 'transparency-grid', onClick: onToggleTransparencyGridClick, onMouseDown: onBtnMouseDown, title: 'Transparency Grid' },
            Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_icons_TransparencyGridIcon__WEBPACK_IMPORTED_MODULE_2__["TransparencyGridIcon"], { className: 'icon' })),
        Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("button", { disabled: !sourceImageValidity, className: `btn bounding-box ${activeBtn === 'bounding-box' ? 'active' : ''} ${showBoundingBox ? 'selected' : ''}`, name: 'bounding-box', onClick: onToggleBoundingBoxClick, onMouseDown: onBtnMouseDown, title: 'Bounding Box' },
            Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_icons_BoundingBoxIcon__WEBPACK_IMPORTED_MODULE_1__["BoundingBoxIcon"], { className: 'icon' }))),
    Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { className: 'size' }, fileSize)));
/* harmony default export */ __webpack_exports__["default"] = (Toolbar);


/***/ }),

/***/ "./preview-src/components/icons/BoundingBoxIcon.tsx":
/*!**********************************************************!*\
  !*** ./preview-src/components/icons/BoundingBoxIcon.tsx ***!
  \**********************************************************/
/*! exports provided: BoundingBoxIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoundingBoxIcon", function() { return BoundingBoxIcon; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");

const BoundingBoxIcon = ({ className }) => (Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", class: className },
    Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("path", { d: "M2 13h1v1h10v-1h1V3h-1V2H3v1H2v10zm1 2v1H1c-.552 0-1-.448-1-1v-2h1V3H0V1c0-.552.448-1 1-1h2v1h10V0h2c.552 0 1 .448 1 1v2h-1v10h1v2c0 .552-.448 1-1 1h-2v-1H3z" })));


/***/ }),

/***/ "./preview-src/components/icons/TransparencyGridIcon.tsx":
/*!***************************************************************!*\
  !*** ./preview-src/components/icons/TransparencyGridIcon.tsx ***!
  \***************************************************************/
/*! exports provided: TransparencyGridIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransparencyGridIcon", function() { return TransparencyGridIcon; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");

const TransparencyGridIcon = ({ className }) => (Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 16 16", className: className },
    Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("g", { fill: "none", "fill-rule": "evenodd" },
        Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("path", { fill: "currentColor", "fill-rule": "nonzero", d: "M1 1v14h14V1H1zm0-1h14c.552 0 1 .448 1 1v14c0 .552-.448 1-1 1H1c-.552 0-1-.448-1-1V1c0-.552.448-1 1-1z" }),
        Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("path", { fill: "currentColor", d: "M1 0h7v8H0V1c0-.552.448-1 1-1zM8 8h8v7c0 .552-.448 1-1 1H8V8z" }))));


/***/ }),

/***/ "./preview-src/components/icons/ZoomInIcon.tsx":
/*!*****************************************************!*\
  !*** ./preview-src/components/icons/ZoomInIcon.tsx ***!
  \*****************************************************/
/*! exports provided: ZoomInIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZoomInIcon", function() { return ZoomInIcon; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");

const ZoomInIcon = ({ className }) => (Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 16 16", class: className },
    Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("path", { fill: "currentColor", d: "M1 1v14h14V1H1zm0-1h14c.552 0 1 .448 1 1v14c0 .552-.448 1-1 1H1c-.552 0-1-.448-1-1V1c0-.552.448-1 1-1zm7.56 7.406h1.945c.273 0 .495.221.495.495 0 .273-.222.495-.495.495H8.559v2.045c0 .309-.25.559-.559.559-.309 0-.56-.25-.56-.56V8.397H5.496c-.273 0-.495-.222-.495-.495 0-.274.222-.495.495-.495h1.946V5.559C7.44 5.25 7.69 5 8 5c.309 0 .56.25.56.56v1.846z" })));


/***/ }),

/***/ "./preview-src/components/icons/ZoomOutIcon.tsx":
/*!******************************************************!*\
  !*** ./preview-src/components/icons/ZoomOutIcon.tsx ***!
  \******************************************************/
/*! exports provided: ZoomOutIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZoomOutIcon", function() { return ZoomOutIcon; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");

const ZoomOutIcon = ({ className }) => (Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 16 16", class: className },
    Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("path", { fill: "currentColor", d: "M1 1v14h14V1H1zm0-1h14c.552 0 1 .448 1 1v14c0 .552-.448 1-1 1H1c-.552 0-1-.448-1-1V1c0-.552.448-1 1-1zm7.56 7.406h1.945c.273 0 .495.221.495.495 0 .273-.222.495-.495.495h-5.01c-.273 0-.495-.222-.495-.495 0-.274.222-.495.495-.495H8.56z" })));


/***/ }),

/***/ "./preview-src/components/icons/ZoomResetIcon.tsx":
/*!********************************************************!*\
  !*** ./preview-src/components/icons/ZoomResetIcon.tsx ***!
  \********************************************************/
/*! exports provided: ZoomResetIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZoomResetIcon", function() { return ZoomResetIcon; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");

const ZoomResetIcon = ({ className }) => (Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("svg", { xmlns: "http://www.w3.org/2000/svg", width: "22", height: "12", viewBox: "0 0 22 12", class: className },
    Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("path", { fill: "currentColor", d: "M6.604 12H0v-1.21h2.661V1.523L.151 2.715V1.328L2.866 0H4.12v10.79h2.483V12zm4.031-9.9c.303 0 .558.096.766.29.207.195.311.434.311.715 0 .282-.104.52-.311.715-.208.195-.463.292-.766.292-.297 0-.547-.097-.752-.292-.205-.194-.307-.433-.307-.715 0-.281.102-.52.307-.714.205-.195.455-.292.752-.292zm0 7.069c.303 0 .558.096.766.287.207.192.311.432.311.72 0 .281-.104.518-.311.71-.208.191-.463.287-.766.287-.297 0-.547-.096-.752-.287-.205-.192-.307-.429-.307-.71 0-.288.102-.528.307-.72.205-.191.455-.287.752-.287zM22 12h-6.604v-1.21h2.661V1.523l-2.51 1.193V1.328L18.262 0h1.255v10.79H22V12z" })));


/***/ }),

/***/ "./preview-src/containers/PreviewContainer.tsx":
/*!*****************************************************!*\
  !*** ./preview-src/containers/PreviewContainer.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var redux_zero_preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-zero/preact */ "./node_modules/redux-zero/preact/index.js");
/* harmony import */ var redux_zero_preact__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_zero_preact__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store */ "./preview-src/store/index.ts");
/* harmony import */ var _utils_lightenDarkenColor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/lightenDarkenColor */ "./preview-src/utils/lightenDarkenColor.ts");
/* harmony import */ var _components_Preview__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Preview */ "./preview-src/components/Preview.tsx");
/* harmony import */ var _components_PreviewError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/PreviewError */ "./preview-src/components/PreviewError.tsx");
/* harmony import */ var _messaging_telemetry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../messaging/telemetry */ "./preview-src/messaging/telemetry.ts");
/* harmony import */ var _messaging__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../messaging */ "./preview-src/messaging/index.ts");
/* harmony import */ var _utils_debounce__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/debounce */ "./preview-src/utils/debounce.ts");









const NEW_LINE_REGEXP = /[\r\n]+/g;
const SVG_TAG_REGEXP = /<svg.+?>/;
const WIDTH_REGEXP = /width=("|')([0-9.,]+)\w*("|')/;
const HEIGHT_REGEXP = /height=("|')([0-9.,]+)\w*("|')/;
const COLOR_LIGHT_BASE = '#ffffff';
const COLOR_DARK_BASE = '#1e1e1e';
const cssVariables = {
    editorBackground: '--vscode-editor-background',
    editorBackgroundDarker: '--svg-previewer-editor-background-darker',
    editorBackgroundLighter: '--svg-previewer-editor-background-lighter',
    editorBackgroundLightBase: '--svg-previewer-editor-background-light-base',
    editorBackgroundLightBaseDarker: '--svg-previewer-editor-background-light-base-darker',
    editorBackgroundDarkBase: '--svg-previewer-editor-background-dark-base',
    editorBackgroundDarkBaseLighter: '--svg-previewer-editor-background-dark-base-lighter'
};
const EDITOR_BACKGROUND_OFFSET = 30;
class PreviewContainer extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(props) {
        super(props);
        this.defineThemeColors = () => {
            const editorBackgroundColor = window.getComputedStyle(document.documentElement).getPropertyValue(cssVariables.editorBackground);
            const editorBackgroundDarker = Object(_utils_lightenDarkenColor__WEBPACK_IMPORTED_MODULE_3__["lightenDarkenColor"])(editorBackgroundColor, -(EDITOR_BACKGROUND_OFFSET));
            const editorBackgroundLighter = Object(_utils_lightenDarkenColor__WEBPACK_IMPORTED_MODULE_3__["lightenDarkenColor"])(editorBackgroundColor, EDITOR_BACKGROUND_OFFSET);
            document.documentElement.style.setProperty(cssVariables.editorBackgroundDarker, editorBackgroundDarker);
            document.documentElement.style.setProperty(cssVariables.editorBackgroundLighter, editorBackgroundLighter);
            document.documentElement.style.setProperty(cssVariables.editorBackgroundLightBase, COLOR_LIGHT_BASE);
            document.documentElement.style.setProperty(cssVariables.editorBackgroundLightBaseDarker, Object(_utils_lightenDarkenColor__WEBPACK_IMPORTED_MODULE_3__["lightenDarkenColor"])(COLOR_LIGHT_BASE, -(EDITOR_BACKGROUND_OFFSET)));
            document.documentElement.style.setProperty(cssVariables.editorBackgroundDarkBase, COLOR_DARK_BASE);
            document.documentElement.style.setProperty(cssVariables.editorBackgroundDarkBaseLighter, Object(_utils_lightenDarkenColor__WEBPACK_IMPORTED_MODULE_3__["lightenDarkenColor"])(COLOR_DARK_BASE, EDITOR_BACKGROUND_OFFSET));
        };
        this.attachRef = (el) => {
            if (el) {
                this.imageEl = el;
            }
        };
        this.handleOnWheel = (event) => {
            if (!(event.ctrlKey || event.metaKey)) {
                return;
            }
            event.preventDefault();
            const delta = Math.sign(event.wheelDelta);
            if (delta === 1) {
                this.props.zoomIn();
                this.zoomInTelemetryDebounced();
            }
            if (delta === -1) {
                this.props.zoomOut();
                this.zoomOutTelemetryDebounced();
            }
        };
        this.onError = () => {
            this.setState({ showPreviewError: true });
            this.props.toggleSourceImageValidity(false);
        };
        this.onLoad = () => {
            this.setState({ showPreviewError: false });
            this.props.toggleSourceImageValidity(true);
        };
        this.zoomInTelemetryDebounced = Object(_utils_debounce__WEBPACK_IMPORTED_MODULE_8__["debounce"])(() => _messaging_telemetry__WEBPACK_IMPORTED_MODULE_6__["default"].sendZoomEvent('in', 'mousewheel'), 250);
        this.zoomOutTelemetryDebounced = Object(_utils_debounce__WEBPACK_IMPORTED_MODULE_8__["debounce"])(() => _messaging_telemetry__WEBPACK_IMPORTED_MODULE_6__["default"].sendZoomEvent('out', 'mousewheel'), 250);
        this.state = { showPreviewError: false };
    }
    componentDidMount() {
        this.imageEl.addEventListener('error', this.onError);
        this.imageEl.addEventListener('load', this.onLoad);
        _messaging__WEBPACK_IMPORTED_MODULE_7__["default"].addListener('theme:changed', this.defineThemeColors);
        this.defineThemeColors();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.source.data !== this.props.source.data) {
            this.setState({ showPreviewError: false });
        }
    }
    componentWillUnmount() {
        _messaging__WEBPACK_IMPORTED_MODULE_7__["default"].removeListener('theme:changed', this.defineThemeColors);
    }
    getOriginalDimension(data) {
        const formatted = data.replace(NEW_LINE_REGEXP, ' ');
        const svg = formatted.match(SVG_TAG_REGEXP);
        let width = null;
        let height = null;
        if (svg && svg.length) {
            width = svg[0].match(WIDTH_REGEXP) ? svg[0].match(WIDTH_REGEXP)[2] : null;
            height = svg[0].match(HEIGHT_REGEXP) ? svg[0].match(HEIGHT_REGEXP)[2] : null;
        }
        return width && height ? { width: parseFloat(width), height: parseFloat(width) } : null;
    }
    getScaledDimension() {
        const originalDimension = this.getOriginalDimension(this.props.source.data);
        const originalWidth = originalDimension ? originalDimension.width : 100;
        const originalHeight = originalDimension ? originalDimension.height : 100;
        const units = originalDimension ? 'px' : '%';
        return {
            width: parseInt((originalWidth * this.props.scale).toString()),
            height: parseInt((originalHeight * this.props.scale).toString()),
            units
        };
    }
    render() {
        return this.state.showPreviewError
            ? Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_components_PreviewError__WEBPACK_IMPORTED_MODULE_5__["default"], null)
            : (Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_components_Preview__WEBPACK_IMPORTED_MODULE_4__["default"], { data: this.props.source.data, attachRef: this.attachRef, dimension: this.getScaledDimension(), onWheel: this.handleOnWheel, background: this.props.background, settings: this.props.source.settings, showTransparencyGrid: this.props.showTransparencyGrid }));
    }
}
const mapToProps = (state) => ({
    source: state.source,
    scale: state.scale,
    background: state.background,
    showTransparencyGrid: state.source.settings.showTransparencyGrid
});
/* harmony default export */ __webpack_exports__["default"] = (Object(redux_zero_preact__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapToProps, _store__WEBPACK_IMPORTED_MODULE_2__["actions"])(PreviewContainer));


/***/ }),

/***/ "./preview-src/containers/ToolbarContainer.tsx":
/*!*****************************************************!*\
  !*** ./preview-src/containers/ToolbarContainer.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var redux_zero_preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-zero/preact */ "./node_modules/redux-zero/preact/index.js");
/* harmony import */ var redux_zero_preact__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_zero_preact__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Toolbar */ "./preview-src/components/Toolbar.tsx");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store */ "./preview-src/store/index.ts");
/* harmony import */ var _utils_fileSize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/fileSize */ "./preview-src/utils/fileSize.ts");
/* harmony import */ var _messaging_telemetry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../messaging/telemetry */ "./preview-src/messaging/telemetry.ts");
/* harmony import */ var _messaging_commands__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../messaging/commands */ "./preview-src/messaging/commands.ts");







const SCALE_STEP = 0.5;
class ToolbarContainer extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor() {
        super(...arguments);
        this.handleChangeBackgroundButtonClick = (e) => {
            this.props.changeBackground(e.srcElement.getAttribute('name'));
        };
        this.handleTransparencyGridBtnClick = () => {
            this.props.toggleTransparencyGrid();
            _messaging_commands__WEBPACK_IMPORTED_MODULE_6__["default"].changeTransparencyGridVisibility(!this.props.showTransparencyGrid);
        };
        this.handleBoundingBoxBtnClick = () => {
            this.props.toggleBoundingBox();
            _messaging_commands__WEBPACK_IMPORTED_MODULE_6__["default"].changeBoundingBoxVisibility(!this.props.showBoundingBox);
        };
        this.handleBtnMouseDown = (e) => {
            this.setState({ activeBtn: e.currentTarget.name });
        };
        this.handleBtnMouseUp = () => {
            this.setState({ activeBtn: '' });
        };
        this.zoomIn = () => {
            this.props.zoomIn(SCALE_STEP);
            _messaging_telemetry__WEBPACK_IMPORTED_MODULE_5__["default"].sendZoomEvent('in', 'toolbar');
        };
        this.zoomOut = () => {
            this.props.zoomOut(SCALE_STEP);
            _messaging_telemetry__WEBPACK_IMPORTED_MODULE_5__["default"].sendZoomEvent('out', 'toolbar');
        };
    }
    componentDidMount() {
        window.document.addEventListener('mouseup', this.handleBtnMouseUp);
    }
    componentWillUnmount() {
        window.document.removeEventListener('mouseup', this.handleBtnMouseUp);
    }
    getFileSize() {
        return this.props.source.data ? Object(_utils_fileSize__WEBPACK_IMPORTED_MODULE_4__["humanFileSize"])(Object(_utils_fileSize__WEBPACK_IMPORTED_MODULE_4__["getByteCountByContent"])(this.props.source.data)) : '0 B';
    }
    render() {
        return (Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_components_Toolbar__WEBPACK_IMPORTED_MODULE_2__["default"], { onChangeBackgroundButtonClick: this.handleChangeBackgroundButtonClick, zoomIn: this.zoomIn, zoomOut: this.zoomOut, zoomReset: this.props.zoomReset, fileSize: this.getFileSize(), sourceImageValidity: this.props.sourceImageValidity, onBtnMouseDown: this.handleBtnMouseDown, activeBtn: this.state.activeBtn, onToggleTransparencyGridClick: this.handleTransparencyGridBtnClick, onToggleBoundingBoxClick: this.handleBoundingBoxBtnClick, scale: this.props.scale, background: this.props.background, showBoundingBox: this.props.showBoundingBox, showTransparencyGrid: this.props.showTransparencyGrid }));
    }
}
const mapToProps = (state) => ({
    source: state.source,
    sourceImageValidity: state.sourceImageValidity,
    scale: state.scale,
    background: state.background,
    showBoundingBox: state.source.settings.showBoundingBox,
    showTransparencyGrid: state.source.settings.showTransparencyGrid
});
/* harmony default export */ __webpack_exports__["default"] = (Object(redux_zero_preact__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapToProps, _store__WEBPACK_IMPORTED_MODULE_3__["actions"])(ToolbarContainer));


/***/ }),

/***/ "./preview-src/index.tsx":
/*!*******************************!*\
  !*** ./preview-src/index.tsx ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var redux_zero_preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-zero/preact */ "./node_modules/redux-zero/preact/index.js");
/* harmony import */ var redux_zero_preact__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_zero_preact__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./preview-src/App.tsx");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store */ "./preview-src/store/index.ts");
/* harmony import */ var _messaging__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./messaging */ "./preview-src/messaging/index.ts");





Object(preact__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(redux_zero_preact__WEBPACK_IMPORTED_MODULE_1__["Provider"], { store: _store__WEBPACK_IMPORTED_MODULE_3__["default"] },
    Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_App__WEBPACK_IMPORTED_MODULE_2__["default"], null)), document.querySelector('body'));


/***/ }),

/***/ "./preview-src/messaging/commands.ts":
/*!*******************************************!*\
  !*** ./preview-src/messaging/commands.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ */ "./preview-src/messaging/index.ts");

class Commands {
    changeBoundingBoxVisibility(visible) {
        ___WEBPACK_IMPORTED_MODULE_0__["default"].send({
            command: 'changeBoundingBoxVisibility',
            payload: { visible }
        });
    }
    changeTransparencyGridVisibility(visible) {
        ___WEBPACK_IMPORTED_MODULE_0__["default"].send({
            command: 'changeTransparencyGridVisibility',
            payload: { visible }
        });
    }
}
/* harmony default export */ __webpack_exports__["default"] = (new Commands());


/***/ }),

/***/ "./preview-src/messaging/index.ts":
/*!****************************************!*\
  !*** ./preview-src/messaging/index.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vscode_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vscode-api */ "./preview-src/vscode-api/index.ts");


class MessageBroker extends events__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"] {
    constructor() {
        super();
        window.addEventListener('message', event => {
            const { command, payload } = event.data;
            this.emit(command, payload);
        });
    }
    send(message) {
        _vscode_api__WEBPACK_IMPORTED_MODULE_1__["default"].postMessage(message);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (new MessageBroker());


/***/ }),

/***/ "./preview-src/messaging/telemetry.ts":
/*!********************************************!*\
  !*** ./preview-src/messaging/telemetry.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ */ "./preview-src/messaging/index.ts");

const TELEMETRY_EVENT_ZOOM = 'zoom';
const TELEMETRY_EVENT_CHANGE_BACKGROUND = 'changeBackground';
class TelemetryReporter {
    sendZoomEvent(type, source) {
        ___WEBPACK_IMPORTED_MODULE_0__["default"].send({
            command: 'sendTelemetryEvent',
            payload: {
                eventName: TELEMETRY_EVENT_ZOOM,
                properties: { type, source }
            }
        });
    }
    sendChangeBackgroundEvent(from, to) {
        ___WEBPACK_IMPORTED_MODULE_0__["default"].send({
            command: 'sendTelemetryEvent',
            payload: {
                eventName: TELEMETRY_EVENT_CHANGE_BACKGROUND,
                properties: { from, to }
            }
        });
    }
}
/* harmony default export */ __webpack_exports__["default"] = (new TelemetryReporter());


/***/ }),

/***/ "./preview-src/store/actions.ts":
/*!**************************************!*\
  !*** ./preview-src/store/actions.ts ***!
  \**************************************/
/*! exports provided: actions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
/* harmony import */ var _vscode_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vscode-api */ "./preview-src/vscode-api/index.ts");
/* harmony import */ var _messaging_telemetry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../messaging/telemetry */ "./preview-src/messaging/telemetry.ts");


const DEFAULT_SCALE_STEP = 0.1;
const MIN_SCALE = 0.05;
const MAX_SCALE = 20;
const actions = () => ({
    updateSource: (state, source) => {
        _vscode_api__WEBPACK_IMPORTED_MODULE_0__["default"].setState(source);
        return Object.assign(Object.assign({}, state), { source, scale: source.uri === state.source.uri ? state.scale : 1 });
    },
    zoomIn: (state, step = DEFAULT_SCALE_STEP) => {
        const nextScale = +(state.scale + state.scale * step).toFixed(2);
        return Object.assign(Object.assign({}, state), { scale: nextScale <= MAX_SCALE ? nextScale : MAX_SCALE });
    },
    zoomOut: (state, step = DEFAULT_SCALE_STEP) => {
        const nextScale = +(state.scale - state.scale * step).toFixed(2);
        return Object.assign(Object.assign({}, state), { scale: nextScale >= MIN_SCALE ? nextScale : MIN_SCALE });
    },
    zoomReset: (state) => {
        _messaging_telemetry__WEBPACK_IMPORTED_MODULE_1__["default"].sendZoomEvent('reset', 'toolbar');
        return Object.assign(Object.assign({}, state), { scale: 1 });
    },
    changeBackground: (state, background) => {
        _messaging_telemetry__WEBPACK_IMPORTED_MODULE_1__["default"].sendChangeBackgroundEvent(state.background, background);
        return Object.assign(Object.assign({}, state), { background });
    },
    toggleSourceImageValidity: (state, validity) => (Object.assign(Object.assign({}, state), { sourceImageValidity: validity })),
    toggleTransparencyGrid: (state) => {
        return Object.assign(Object.assign({}, state), { source: Object.assign(Object.assign({}, state.source), { settings: Object.assign(Object.assign({}, state.source.settings), { showTransparencyGrid: !state.source.settings.showTransparencyGrid }) }) });
    },
    toggleBoundingBox: (state) => {
        return Object.assign(Object.assign({}, state), { source: Object.assign(Object.assign({}, state.source), { settings: Object.assign(Object.assign({}, state.source.settings), { showBoundingBox: !state.source.settings.showBoundingBox }) }) });
    }
});


/***/ }),

/***/ "./preview-src/store/index.ts":
/*!************************************!*\
  !*** ./preview-src/store/index.ts ***!
  \************************************/
/*! exports provided: default, actions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux_zero__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-zero */ "./node_modules/redux-zero/dist/redux-zero.js");
/* harmony import */ var redux_zero__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_zero__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vscode_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vscode-api */ "./preview-src/vscode-api/index.ts");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions */ "./preview-src/store/actions.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return _actions__WEBPACK_IMPORTED_MODULE_2__["actions"]; });



const bodyElClassList = document.querySelector('body').classList;
const initialState = {
    source: {
        uri: _vscode_api__WEBPACK_IMPORTED_MODULE_1__["default"].getState() ? _vscode_api__WEBPACK_IMPORTED_MODULE_1__["default"].getState().uri : null,
        data: _vscode_api__WEBPACK_IMPORTED_MODULE_1__["default"].getState() ? _vscode_api__WEBPACK_IMPORTED_MODULE_1__["default"].getState().data : null,
        settings: _vscode_api__WEBPACK_IMPORTED_MODULE_1__["default"].getState() ? _vscode_api__WEBPACK_IMPORTED_MODULE_1__["default"].getState().settings : { showBoundingBox: false, showTransparencyGrid: false }
    },
    scale: 1,
    background: bodyElClassList.contains('vscode-dark') || bodyElClassList.contains('vscode-high-contrast')
        ? 'dark'
        : 'light',
    sourceImageValidity: false
};
/* harmony default export */ __webpack_exports__["default"] = (redux_zero__WEBPACK_IMPORTED_MODULE_0___default()(initialState));



/***/ }),

/***/ "./preview-src/utils/debounce.ts":
/*!***************************************!*\
  !*** ./preview-src/utils/debounce.ts ***!
  \***************************************/
/*! exports provided: debounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}


/***/ }),

/***/ "./preview-src/utils/fileSize.ts":
/*!***************************************!*\
  !*** ./preview-src/utils/fileSize.ts ***!
  \***************************************/
/*! exports provided: getByteCountByContent, humanFileSize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getByteCountByContent", function() { return getByteCountByContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "humanFileSize", function() { return humanFileSize; });
function getByteCountByContent(s = '') {
    let count = 0;
    const stringLength = s.length;
    let i;
    s = String(s || '');
    for (i = 0; i < stringLength; i++) {
        const partCount = encodeURI(s[i]).split('%').length;
        count += partCount === 1 ? 1 : partCount - 1;
    }
    return count;
}
function humanFileSize(size = 0) {
    var i = Math.floor(Math.log(size) / Math.log(1024));
    const numberPart = +(size / Math.pow(1024, i)).toFixed(2) * 1;
    const stringPart = ['B', 'kB', 'MB', 'GB', 'TB'][i];
    return `${numberPart} ${stringPart}`;
}
;


/***/ }),

/***/ "./preview-src/utils/lightenDarkenColor.ts":
/*!*************************************************!*\
  !*** ./preview-src/utils/lightenDarkenColor.ts ***!
  \*************************************************/
/*! exports provided: lightenDarkenColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lightenDarkenColor", function() { return lightenDarkenColor; });
function lightenDarkenColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}


/***/ }),

/***/ "./preview-src/vscode-api/index.ts":
/*!*****************************************!*\
  !*** ./preview-src/vscode-api/index.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (acquireVsCodeApi());


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ByZWFjdC9kaXN0L3ByZWFjdC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZHV4LXplcm8vZGlzdC9yZWR1eC16ZXJvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWR1eC16ZXJvL3ByZWFjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wcmV2aWV3LXNyYy9BcHAudHN4Iiwid2VicGFjazovLy8uL3ByZXZpZXctc3JjL2NvbXBvbmVudHMvUHJldmlldy50c3giLCJ3ZWJwYWNrOi8vLy4vcHJldmlldy1zcmMvY29tcG9uZW50cy9QcmV2aWV3RXJyb3IudHN4Iiwid2VicGFjazovLy8uL3ByZXZpZXctc3JjL2NvbXBvbmVudHMvVG9vbGJhci50c3giLCJ3ZWJwYWNrOi8vLy4vcHJldmlldy1zcmMvY29tcG9uZW50cy9pY29ucy9Cb3VuZGluZ0JveEljb24udHN4Iiwid2VicGFjazovLy8uL3ByZXZpZXctc3JjL2NvbXBvbmVudHMvaWNvbnMvVHJhbnNwYXJlbmN5R3JpZEljb24udHN4Iiwid2VicGFjazovLy8uL3ByZXZpZXctc3JjL2NvbXBvbmVudHMvaWNvbnMvWm9vbUluSWNvbi50c3giLCJ3ZWJwYWNrOi8vLy4vcHJldmlldy1zcmMvY29tcG9uZW50cy9pY29ucy9ab29tT3V0SWNvbi50c3giLCJ3ZWJwYWNrOi8vLy4vcHJldmlldy1zcmMvY29tcG9uZW50cy9pY29ucy9ab29tUmVzZXRJY29uLnRzeCIsIndlYnBhY2s6Ly8vLi9wcmV2aWV3LXNyYy9jb250YWluZXJzL1ByZXZpZXdDb250YWluZXIudHN4Iiwid2VicGFjazovLy8uL3ByZXZpZXctc3JjL2NvbnRhaW5lcnMvVG9vbGJhckNvbnRhaW5lci50c3giLCJ3ZWJwYWNrOi8vLy4vcHJldmlldy1zcmMvaW5kZXgudHN4Iiwid2VicGFjazovLy8uL3ByZXZpZXctc3JjL21lc3NhZ2luZy9jb21tYW5kcy50cyIsIndlYnBhY2s6Ly8vLi9wcmV2aWV3LXNyYy9tZXNzYWdpbmcvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vcHJldmlldy1zcmMvbWVzc2FnaW5nL3RlbGVtZXRyeS50cyIsIndlYnBhY2s6Ly8vLi9wcmV2aWV3LXNyYy9zdG9yZS9hY3Rpb25zLnRzIiwid2VicGFjazovLy8uL3ByZXZpZXctc3JjL3N0b3JlL2luZGV4LnRzIiwid2VicGFjazovLy8uL3ByZXZpZXctc3JjL3V0aWxzL2RlYm91bmNlLnRzIiwid2VicGFjazovLy8uL3ByZXZpZXctc3JjL3V0aWxzL2ZpbGVTaXplLnRzIiwid2VicGFjazovLy8uL3ByZXZpZXctc3JjL3V0aWxzL2xpZ2h0ZW5EYXJrZW5Db2xvci50cyIsIndlYnBhY2s6Ly8vLi9wcmV2aWV3LXNyYy92c2NvZGUtYXBpL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixzQkFBc0I7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQSxpQ0FBaUMsUUFBUTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtB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O0FBQWUsK0VBQWdCLEVBQUUiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3ByZXZpZXctc3JjL2luZGV4LnRzeFwiKTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5tb2R1bGUuZXhwb3J0cy5vbmNlID0gb25jZTtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbmZ1bmN0aW9uIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIF9nZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIF9nZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSBfZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuYXBwbHkodGhpcy50YXJnZXQsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gb25jZVdyYXBwZXIuYmluZChzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIG9uY2UoZW1pdHRlciwgbmFtZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGZ1bmN0aW9uIGV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICBpZiAoZXJyb3JMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICByZXNvbHZlKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgICB2YXIgZXJyb3JMaXN0ZW5lcjtcblxuICAgIC8vIEFkZGluZyBhbiBlcnJvciBsaXN0ZW5lciBpcyBub3Qgb3B0aW9uYWwgYmVjYXVzZVxuICAgIC8vIGlmIGFuIGVycm9yIGlzIHRocm93biBvbiBhbiBldmVudCBlbWl0dGVyIHdlIGNhbm5vdFxuICAgIC8vIGd1YXJhbnRlZSB0aGF0IHRoZSBhY3R1YWwgZXZlbnQgd2UgYXJlIHdhaXRpbmcgd2lsbFxuICAgIC8vIGJlIGZpcmVkLiBUaGUgcmVzdWx0IGNvdWxkIGJlIGEgc2lsZW50IHdheSB0byBjcmVhdGVcbiAgICAvLyBtZW1vcnkgb3IgZmlsZSBkZXNjcmlwdG9yIGxlYWtzLCB3aGljaCBpcyBzb21ldGhpbmdcbiAgICAvLyB3ZSBzaG91bGQgYXZvaWQuXG4gICAgaWYgKG5hbWUgIT09ICdlcnJvcicpIHtcbiAgICAgIGVycm9yTGlzdGVuZXIgPSBmdW5jdGlvbiBlcnJvckxpc3RlbmVyKGVycikge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG5hbWUsIGV2ZW50TGlzdGVuZXIpO1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH07XG5cbiAgICAgIGVtaXR0ZXIub25jZSgnZXJyb3InLCBlcnJvckxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBlbWl0dGVyLm9uY2UobmFtZSwgZXZlbnRMaXN0ZW5lcik7XG4gIH0pO1xufVxuIiwidmFyIG4sbCx1LGksdCxvLHIsZj17fSxlPVtdLGM9L2FjaXR8ZXgoPzpzfGd8bnxwfCQpfHJwaHxncmlkfG93c3xtbmN8bnR3fGluZVtjaF18em9vfF5vcmR8aXRlcmEvaTtmdW5jdGlvbiBzKG4sbCl7Zm9yKHZhciB1IGluIGwpblt1XT1sW3VdO3JldHVybiBufWZ1bmN0aW9uIGEobil7dmFyIGw9bi5wYXJlbnROb2RlO2wmJmwucmVtb3ZlQ2hpbGQobil9ZnVuY3Rpb24gdihuLGwsdSl7dmFyIGksdCxvLHI9YXJndW1lbnRzLGY9e307Zm9yKG8gaW4gbClcImtleVwiPT1vP2k9bFtvXTpcInJlZlwiPT1vP3Q9bFtvXTpmW29dPWxbb107aWYoYXJndW1lbnRzLmxlbmd0aD4zKWZvcih1PVt1XSxvPTM7bzxhcmd1bWVudHMubGVuZ3RoO28rKyl1LnB1c2gocltvXSk7aWYobnVsbCE9dSYmKGYuY2hpbGRyZW49dSksXCJmdW5jdGlvblwiPT10eXBlb2YgbiYmbnVsbCE9bi5kZWZhdWx0UHJvcHMpZm9yKG8gaW4gbi5kZWZhdWx0UHJvcHMpdm9pZCAwPT09ZltvXSYmKGZbb109bi5kZWZhdWx0UHJvcHNbb10pO3JldHVybiBoKG4sZixpLHQsbnVsbCl9ZnVuY3Rpb24gaChsLHUsaSx0LG8pe3ZhciByPXt0eXBlOmwscHJvcHM6dSxrZXk6aSxyZWY6dCxfX2s6bnVsbCxfXzpudWxsLF9fYjowLF9fZTpudWxsLF9fZDp2b2lkIDAsX19jOm51bGwsX19oOm51bGwsY29uc3RydWN0b3I6dm9pZCAwLF9fdjpudWxsPT1vPysrbi5fX3Y6b307cmV0dXJuIG51bGwhPW4udm5vZGUmJm4udm5vZGUocikscn1mdW5jdGlvbiB5KCl7cmV0dXJue2N1cnJlbnQ6bnVsbH19ZnVuY3Rpb24gcChuKXtyZXR1cm4gbi5jaGlsZHJlbn1mdW5jdGlvbiBkKG4sbCl7dGhpcy5wcm9wcz1uLHRoaXMuY29udGV4dD1sfWZ1bmN0aW9uIF8obixsKXtpZihudWxsPT1sKXJldHVybiBuLl9fP18obi5fXyxuLl9fLl9fay5pbmRleE9mKG4pKzEpOm51bGw7Zm9yKHZhciB1O2w8bi5fX2subGVuZ3RoO2wrKylpZihudWxsIT0odT1uLl9fa1tsXSkmJm51bGwhPXUuX19lKXJldHVybiB1Ll9fZTtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBuLnR5cGU/XyhuKTpudWxsfWZ1bmN0aW9uIHcobil7dmFyIGwsdTtpZihudWxsIT0obj1uLl9fKSYmbnVsbCE9bi5fX2Mpe2ZvcihuLl9fZT1uLl9fYy5iYXNlPW51bGwsbD0wO2w8bi5fX2subGVuZ3RoO2wrKylpZihudWxsIT0odT1uLl9fa1tsXSkmJm51bGwhPXUuX19lKXtuLl9fZT1uLl9fYy5iYXNlPXUuX19lO2JyZWFrfXJldHVybiB3KG4pfX1mdW5jdGlvbiBrKGwpeyghbC5fX2QmJihsLl9fZD0hMCkmJnUucHVzaChsKSYmIWcuX19yKyt8fHQhPT1uLmRlYm91bmNlUmVuZGVyaW5nKSYmKCh0PW4uZGVib3VuY2VSZW5kZXJpbmcpfHxpKShnKX1mdW5jdGlvbiBnKCl7Zm9yKHZhciBuO2cuX19yPXUubGVuZ3RoOyluPXUuc29ydChmdW5jdGlvbihuLGwpe3JldHVybiBuLl9fdi5fX2ItbC5fX3YuX19ifSksdT1bXSxuLnNvbWUoZnVuY3Rpb24obil7dmFyIGwsdSxpLHQsbyxyO24uX19kJiYobz0odD0obD1uKS5fX3YpLl9fZSwocj1sLl9fUCkmJih1PVtdLChpPXMoe30sdCkpLl9fdj10Ll9fdisxLCQocix0LGksbC5fX24sdm9pZCAwIT09ci5vd25lclNWR0VsZW1lbnQsbnVsbCE9dC5fX2g/W29dOm51bGwsdSxudWxsPT1vP18odCk6byx0Ll9faCksaih1LHQpLHQuX19lIT1vJiZ3KHQpKSl9KX1mdW5jdGlvbiBtKG4sbCx1LGksdCxvLHIsYyxzLHYpe3ZhciB5LGQsdyxrLGcsbSx4LFA9aSYmaS5fX2t8fGUsQz1QLmxlbmd0aDtmb3Iocz09ZiYmKHM9bnVsbCE9cj9yWzBdOkM/XyhpLDApOm51bGwpLHUuX19rPVtdLHk9MDt5PGwubGVuZ3RoO3krKylpZihudWxsIT0oaz11Ll9fa1t5XT1udWxsPT0oaz1sW3ldKXx8XCJib29sZWFuXCI9PXR5cGVvZiBrP251bGw6XCJzdHJpbmdcIj09dHlwZW9mIGt8fFwibnVtYmVyXCI9PXR5cGVvZiBrP2gobnVsbCxrLG51bGwsbnVsbCxrKTpBcnJheS5pc0FycmF5KGspP2gocCx7Y2hpbGRyZW46a30sbnVsbCxudWxsLG51bGwpOmsuX19iPjA/aChrLnR5cGUsay5wcm9wcyxrLmtleSxudWxsLGsuX192KTprKSl7aWYoay5fXz11LGsuX19iPXUuX19iKzEsbnVsbD09PSh3PVBbeV0pfHx3JiZrLmtleT09dy5rZXkmJmsudHlwZT09PXcudHlwZSlQW3ldPXZvaWQgMDtlbHNlIGZvcihkPTA7ZDxDO2QrKyl7aWYoKHc9UFtkXSkmJmsua2V5PT13LmtleSYmay50eXBlPT09dy50eXBlKXtQW2RdPXZvaWQgMDticmVha313PW51bGx9JChuLGssdz13fHxmLHQsbyxyLGMscyx2KSxnPWsuX19lLChkPWsucmVmKSYmdy5yZWYhPWQmJih4fHwoeD1bXSksdy5yZWYmJngucHVzaCh3LnJlZixudWxsLGspLHgucHVzaChkLGsuX19jfHxnLGspKSxudWxsIT1nPyhudWxsPT1tJiYobT1nKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBrLnR5cGUmJm51bGwhPWsuX19rJiZrLl9faz09PXcuX19rP2suX19kPXM9YihrLHMsbik6cz1BKG4sayx3LFAscixnLHMpLHZ8fFwib3B0aW9uXCIhPT11LnR5cGU/XCJmdW5jdGlvblwiPT10eXBlb2YgdS50eXBlJiYodS5fX2Q9cyk6bi52YWx1ZT1cIlwiKTpzJiZ3Ll9fZT09cyYmcy5wYXJlbnROb2RlIT1uJiYocz1fKHcpKX1pZih1Ll9fZT1tLG51bGwhPXImJlwiZnVuY3Rpb25cIiE9dHlwZW9mIHUudHlwZSlmb3IoeT1yLmxlbmd0aDt5LS07KW51bGwhPXJbeV0mJmEoclt5XSk7Zm9yKHk9Qzt5LS07KW51bGwhPVBbeV0mJihcImZ1bmN0aW9uXCI9PXR5cGVvZiB1LnR5cGUmJm51bGwhPVBbeV0uX19lJiZQW3ldLl9fZT09dS5fX2QmJih1Ll9fZD1fKGkseSsxKSksSShQW3ldLFBbeV0pKTtpZih4KWZvcih5PTA7eTx4Lmxlbmd0aDt5KyspSCh4W3ldLHhbKyt5XSx4WysreV0pfWZ1bmN0aW9uIGIobixsLHUpe3ZhciBpLHQ7Zm9yKGk9MDtpPG4uX19rLmxlbmd0aDtpKyspKHQ9bi5fX2tbaV0pJiYodC5fXz1uLGw9XCJmdW5jdGlvblwiPT10eXBlb2YgdC50eXBlP2IodCxsLHUpOkEodSx0LHQsbi5fX2ssbnVsbCx0Ll9fZSxsKSk7cmV0dXJuIGx9ZnVuY3Rpb24geChuLGwpe3JldHVybiBsPWx8fFtdLG51bGw9PW58fFwiYm9vbGVhblwiPT10eXBlb2Ygbnx8KEFycmF5LmlzQXJyYXkobik/bi5zb21lKGZ1bmN0aW9uKG4pe3gobixsKX0pOmwucHVzaChuKSksbH1mdW5jdGlvbiBBKG4sbCx1LGksdCxvLHIpe3ZhciBmLGUsYztpZih2b2lkIDAhPT1sLl9fZClmPWwuX19kLGwuX19kPXZvaWQgMDtlbHNlIGlmKHQ9PXV8fG8hPXJ8fG51bGw9PW8ucGFyZW50Tm9kZSluOmlmKG51bGw9PXJ8fHIucGFyZW50Tm9kZSE9PW4pbi5hcHBlbmRDaGlsZChvKSxmPW51bGw7ZWxzZXtmb3IoZT1yLGM9MDsoZT1lLm5leHRTaWJsaW5nKSYmYzxpLmxlbmd0aDtjKz0yKWlmKGU9PW8pYnJlYWsgbjtuLmluc2VydEJlZm9yZShvLHIpLGY9cn1yZXR1cm4gdm9pZCAwIT09Zj9mOm8ubmV4dFNpYmxpbmd9ZnVuY3Rpb24gUChuLGwsdSxpLHQpe3ZhciBvO2ZvcihvIGluIHUpXCJjaGlsZHJlblwiPT09b3x8XCJrZXlcIj09PW98fG8gaW4gbHx8eihuLG8sbnVsbCx1W29dLGkpO2ZvcihvIGluIGwpdCYmXCJmdW5jdGlvblwiIT10eXBlb2YgbFtvXXx8XCJjaGlsZHJlblwiPT09b3x8XCJrZXlcIj09PW98fFwidmFsdWVcIj09PW98fFwiY2hlY2tlZFwiPT09b3x8dVtvXT09PWxbb118fHoobixvLGxbb10sdVtvXSxpKX1mdW5jdGlvbiBDKG4sbCx1KXtcIi1cIj09PWxbMF0/bi5zZXRQcm9wZXJ0eShsLHUpOm5bbF09bnVsbD09dT9cIlwiOlwibnVtYmVyXCIhPXR5cGVvZiB1fHxjLnRlc3QobCk/dTp1K1wicHhcIn1mdW5jdGlvbiB6KG4sbCx1LGksdCl7dmFyIG8scixmO2lmKHQmJlwiY2xhc3NOYW1lXCI9PWwmJihsPVwiY2xhc3NcIiksXCJzdHlsZVwiPT09bClpZihcInN0cmluZ1wiPT10eXBlb2YgdSluLnN0eWxlLmNzc1RleHQ9dTtlbHNle2lmKFwic3RyaW5nXCI9PXR5cGVvZiBpJiYobi5zdHlsZS5jc3NUZXh0PWk9XCJcIiksaSlmb3IobCBpbiBpKXUmJmwgaW4gdXx8QyhuLnN0eWxlLGwsXCJcIik7aWYodSlmb3IobCBpbiB1KWkmJnVbbF09PT1pW2xdfHxDKG4uc3R5bGUsbCx1W2xdKX1lbHNlXCJvXCI9PT1sWzBdJiZcIm5cIj09PWxbMV0/KG89bCE9PShsPWwucmVwbGFjZSgvQ2FwdHVyZSQvLFwiXCIpKSwocj1sLnRvTG93ZXJDYXNlKCkpaW4gbiYmKGw9ciksbD1sLnNsaWNlKDIpLG4ubHx8KG4ubD17fSksbi5sW2wrb109dSxmPW8/VDpOLHU/aXx8bi5hZGRFdmVudExpc3RlbmVyKGwsZixvKTpuLnJlbW92ZUV2ZW50TGlzdGVuZXIobCxmLG8pKTpcImxpc3RcIiE9PWwmJlwidGFnTmFtZVwiIT09bCYmXCJmb3JtXCIhPT1sJiZcInR5cGVcIiE9PWwmJlwic2l6ZVwiIT09bCYmXCJkb3dubG9hZFwiIT09bCYmXCJocmVmXCIhPT1sJiZcImNvbnRlbnRFZGl0YWJsZVwiIT09bCYmIXQmJmwgaW4gbj9uW2xdPW51bGw9PXU/XCJcIjp1OlwiZnVuY3Rpb25cIiE9dHlwZW9mIHUmJlwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIiE9PWwmJihsIT09KGw9bC5yZXBsYWNlKC94bGluazo/LyxcIlwiKSk/bnVsbD09dXx8ITE9PT11P24ucmVtb3ZlQXR0cmlidXRlTlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsbC50b0xvd2VyQ2FzZSgpKTpuLnNldEF0dHJpYnV0ZU5TKFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiLGwudG9Mb3dlckNhc2UoKSx1KTpudWxsPT11fHwhMT09PXUmJiEvXmFyLy50ZXN0KGwpP24ucmVtb3ZlQXR0cmlidXRlKGwpOm4uc2V0QXR0cmlidXRlKGwsdSkpfWZ1bmN0aW9uIE4obCl7dGhpcy5sW2wudHlwZSshMV0obi5ldmVudD9uLmV2ZW50KGwpOmwpfWZ1bmN0aW9uIFQobCl7dGhpcy5sW2wudHlwZSshMF0obi5ldmVudD9uLmV2ZW50KGwpOmwpfWZ1bmN0aW9uICQobCx1LGksdCxvLHIsZixlLGMpe3ZhciBhLHYsaCx5LF8sdyxrLGcsYix4LEEsUD11LnR5cGU7aWYodm9pZCAwIT09dS5jb25zdHJ1Y3RvcilyZXR1cm4gbnVsbDtudWxsIT1pLl9faCYmKGM9aS5fX2gsZT11Ll9fZT1pLl9fZSx1Ll9faD1udWxsLHI9W2VdKSwoYT1uLl9fYikmJmEodSk7dHJ5e246aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgUCl7aWYoZz11LnByb3BzLGI9KGE9UC5jb250ZXh0VHlwZSkmJnRbYS5fX2NdLHg9YT9iP2IucHJvcHMudmFsdWU6YS5fXzp0LGkuX19jP2s9KHY9dS5fX2M9aS5fX2MpLl9fPXYuX19FOihcInByb3RvdHlwZVwiaW4gUCYmUC5wcm90b3R5cGUucmVuZGVyP3UuX19jPXY9bmV3IFAoZyx4KToodS5fX2M9dj1uZXcgZChnLHgpLHYuY29uc3RydWN0b3I9UCx2LnJlbmRlcj1MKSxiJiZiLnN1Yih2KSx2LnByb3BzPWcsdi5zdGF0ZXx8KHYuc3RhdGU9e30pLHYuY29udGV4dD14LHYuX19uPXQsaD12Ll9fZD0hMCx2Ll9faD1bXSksbnVsbD09di5fX3MmJih2Ll9fcz12LnN0YXRlKSxudWxsIT1QLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyYmKHYuX19zPT12LnN0YXRlJiYodi5fX3M9cyh7fSx2Ll9fcykpLHModi5fX3MsUC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMoZyx2Ll9fcykpKSx5PXYucHJvcHMsXz12LnN0YXRlLGgpbnVsbD09UC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMmJm51bGwhPXYuY29tcG9uZW50V2lsbE1vdW50JiZ2LmNvbXBvbmVudFdpbGxNb3VudCgpLG51bGwhPXYuY29tcG9uZW50RGlkTW91bnQmJnYuX19oLnB1c2godi5jb21wb25lbnREaWRNb3VudCk7ZWxzZXtpZihudWxsPT1QLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyYmZyE9PXkmJm51bGwhPXYuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyYmdi5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKGcseCksIXYuX19lJiZudWxsIT12LnNob3VsZENvbXBvbmVudFVwZGF0ZSYmITE9PT12LnNob3VsZENvbXBvbmVudFVwZGF0ZShnLHYuX19zLHgpfHx1Ll9fdj09PWkuX192KXt2LnByb3BzPWcsdi5zdGF0ZT12Ll9fcyx1Ll9fdiE9PWkuX192JiYodi5fX2Q9ITEpLHYuX192PXUsdS5fX2U9aS5fX2UsdS5fX2s9aS5fX2ssdi5fX2gubGVuZ3RoJiZmLnB1c2godik7YnJlYWsgbn1udWxsIT12LmNvbXBvbmVudFdpbGxVcGRhdGUmJnYuY29tcG9uZW50V2lsbFVwZGF0ZShnLHYuX19zLHgpLG51bGwhPXYuY29tcG9uZW50RGlkVXBkYXRlJiZ2Ll9faC5wdXNoKGZ1bmN0aW9uKCl7di5jb21wb25lbnREaWRVcGRhdGUoeSxfLHcpfSl9di5jb250ZXh0PXgsdi5wcm9wcz1nLHYuc3RhdGU9di5fX3MsKGE9bi5fX3IpJiZhKHUpLHYuX19kPSExLHYuX192PXUsdi5fX1A9bCxhPXYucmVuZGVyKHYucHJvcHMsdi5zdGF0ZSx2LmNvbnRleHQpLHYuc3RhdGU9di5fX3MsbnVsbCE9di5nZXRDaGlsZENvbnRleHQmJih0PXMocyh7fSx0KSx2LmdldENoaWxkQ29udGV4dCgpKSksaHx8bnVsbD09di5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZXx8KHc9di5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSh5LF8pKSxBPW51bGwhPWEmJmEudHlwZT09PXAmJm51bGw9PWEua2V5P2EucHJvcHMuY2hpbGRyZW46YSxtKGwsQXJyYXkuaXNBcnJheShBKT9BOltBXSx1LGksdCxvLHIsZixlLGMpLHYuYmFzZT11Ll9fZSx1Ll9faD1udWxsLHYuX19oLmxlbmd0aCYmZi5wdXNoKHYpLGsmJih2Ll9fRT12Ll9fPW51bGwpLHYuX19lPSExfWVsc2UgbnVsbD09ciYmdS5fX3Y9PT1pLl9fdj8odS5fX2s9aS5fX2ssdS5fX2U9aS5fX2UpOnUuX19lPUUoaS5fX2UsdSxpLHQsbyxyLGYsYyk7KGE9bi5kaWZmZWQpJiZhKHUpfWNhdGNoKGwpe3UuX192PW51bGwsKGN8fG51bGwhPXIpJiYodS5fX2U9ZSx1Ll9faD0hIWMscltyLmluZGV4T2YoZSldPW51bGwpLG4uX19lKGwsdSxpKX19ZnVuY3Rpb24gaihsLHUpe24uX19jJiZuLl9fYyh1LGwpLGwuc29tZShmdW5jdGlvbih1KXt0cnl7bD11Ll9faCx1Ll9faD1bXSxsLnNvbWUoZnVuY3Rpb24obil7bi5jYWxsKHUpfSl9Y2F0Y2gobCl7bi5fX2UobCx1Ll9fdil9fSl9ZnVuY3Rpb24gRShuLGwsdSxpLHQsbyxyLGMpe3ZhciBzLGEsdixoLHkscD11LnByb3BzLGQ9bC5wcm9wcztpZih0PVwic3ZnXCI9PT1sLnR5cGV8fHQsbnVsbCE9bylmb3Iocz0wO3M8by5sZW5ndGg7cysrKWlmKG51bGwhPShhPW9bc10pJiYoKG51bGw9PT1sLnR5cGU/Mz09PWEubm9kZVR5cGU6YS5sb2NhbE5hbWU9PT1sLnR5cGUpfHxuPT1hKSl7bj1hLG9bc109bnVsbDticmVha31pZihudWxsPT1uKXtpZihudWxsPT09bC50eXBlKXJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShkKTtuPXQ/ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixsLnR5cGUpOmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobC50eXBlLGQuaXMmJntpczpkLmlzfSksbz1udWxsLGM9ITF9aWYobnVsbD09PWwudHlwZSlwPT09ZHx8YyYmbi5kYXRhPT09ZHx8KG4uZGF0YT1kKTtlbHNle2lmKG51bGwhPW8mJihvPWUuc2xpY2UuY2FsbChuLmNoaWxkTm9kZXMpKSx2PShwPXUucHJvcHN8fGYpLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MLGg9ZC5kYW5nZXJvdXNseVNldElubmVySFRNTCwhYyl7aWYobnVsbCE9bylmb3IocD17fSx5PTA7eTxuLmF0dHJpYnV0ZXMubGVuZ3RoO3krKylwW24uYXR0cmlidXRlc1t5XS5uYW1lXT1uLmF0dHJpYnV0ZXNbeV0udmFsdWU7KGh8fHYpJiYoaCYmKHYmJmguX19odG1sPT12Ll9faHRtbHx8aC5fX2h0bWw9PT1uLmlubmVySFRNTCl8fChuLmlubmVySFRNTD1oJiZoLl9faHRtbHx8XCJcIikpfVAobixkLHAsdCxjKSxoP2wuX19rPVtdOihzPWwucHJvcHMuY2hpbGRyZW4sbShuLEFycmF5LmlzQXJyYXkocyk/czpbc10sbCx1LGksXCJmb3JlaWduT2JqZWN0XCIhPT1sLnR5cGUmJnQsbyxyLGYsYykpLGN8fChcInZhbHVlXCJpbiBkJiZ2b2lkIDAhPT0ocz1kLnZhbHVlKSYmKHMhPT1uLnZhbHVlfHxcInByb2dyZXNzXCI9PT1sLnR5cGUmJiFzKSYmeihuLFwidmFsdWVcIixzLHAudmFsdWUsITEpLFwiY2hlY2tlZFwiaW4gZCYmdm9pZCAwIT09KHM9ZC5jaGVja2VkKSYmcyE9PW4uY2hlY2tlZCYmeihuLFwiY2hlY2tlZFwiLHMscC5jaGVja2VkLCExKSl9cmV0dXJuIG59ZnVuY3Rpb24gSChsLHUsaSl7dHJ5e1wiZnVuY3Rpb25cIj09dHlwZW9mIGw/bCh1KTpsLmN1cnJlbnQ9dX1jYXRjaChsKXtuLl9fZShsLGkpfX1mdW5jdGlvbiBJKGwsdSxpKXt2YXIgdCxvLHI7aWYobi51bm1vdW50JiZuLnVubW91bnQobCksKHQ9bC5yZWYpJiYodC5jdXJyZW50JiZ0LmN1cnJlbnQhPT1sLl9fZXx8SCh0LG51bGwsdSkpLGl8fFwiZnVuY3Rpb25cIj09dHlwZW9mIGwudHlwZXx8KGk9bnVsbCE9KG89bC5fX2UpKSxsLl9fZT1sLl9fZD12b2lkIDAsbnVsbCE9KHQ9bC5fX2MpKXtpZih0LmNvbXBvbmVudFdpbGxVbm1vdW50KXRyeXt0LmNvbXBvbmVudFdpbGxVbm1vdW50KCl9Y2F0Y2gobCl7bi5fX2UobCx1KX10LmJhc2U9dC5fX1A9bnVsbH1pZih0PWwuX19rKWZvcihyPTA7cjx0Lmxlbmd0aDtyKyspdFtyXSYmSSh0W3JdLHUsaSk7bnVsbCE9byYmYShvKX1mdW5jdGlvbiBMKG4sbCx1KXtyZXR1cm4gdGhpcy5jb25zdHJ1Y3RvcihuLHUpfWZ1bmN0aW9uIE0obCx1LGkpe3ZhciB0LHIsYztuLl9fJiZuLl9fKGwsdSkscj0odD1pPT09byk/bnVsbDppJiZpLl9fa3x8dS5fX2ssbD12KHAsbnVsbCxbbF0pLGM9W10sJCh1LCh0P3U6aXx8dSkuX19rPWwscnx8ZixmLHZvaWQgMCE9PXUub3duZXJTVkdFbGVtZW50LGkmJiF0P1tpXTpyP251bGw6dS5jaGlsZE5vZGVzLmxlbmd0aD9lLnNsaWNlLmNhbGwodS5jaGlsZE5vZGVzKTpudWxsLGMsaXx8Zix0KSxqKGMsbCl9ZnVuY3Rpb24gTyhuLGwpe00obixsLG8pfWZ1bmN0aW9uIFMobixsLHUpe3ZhciBpLHQsbyxyPWFyZ3VtZW50cyxmPXMoe30sbi5wcm9wcyk7Zm9yKG8gaW4gbClcImtleVwiPT1vP2k9bFtvXTpcInJlZlwiPT1vP3Q9bFtvXTpmW29dPWxbb107aWYoYXJndW1lbnRzLmxlbmd0aD4zKWZvcih1PVt1XSxvPTM7bzxhcmd1bWVudHMubGVuZ3RoO28rKyl1LnB1c2gocltvXSk7cmV0dXJuIG51bGwhPXUmJihmLmNoaWxkcmVuPXUpLGgobi50eXBlLGYsaXx8bi5rZXksdHx8bi5yZWYsbnVsbCl9ZnVuY3Rpb24gcShuLGwpe3ZhciB1PXtfX2M6bD1cIl9fY0NcIityKyssX186bixDb25zdW1lcjpmdW5jdGlvbihuLGwpe3JldHVybiBuLmNoaWxkcmVuKGwpfSxQcm92aWRlcjpmdW5jdGlvbihuKXt2YXIgdSxpO3JldHVybiB0aGlzLmdldENoaWxkQ29udGV4dHx8KHU9W10sKGk9e30pW2xdPXRoaXMsdGhpcy5nZXRDaGlsZENvbnRleHQ9ZnVuY3Rpb24oKXtyZXR1cm4gaX0sdGhpcy5zaG91bGRDb21wb25lbnRVcGRhdGU9ZnVuY3Rpb24obil7dGhpcy5wcm9wcy52YWx1ZSE9PW4udmFsdWUmJnUuc29tZShrKX0sdGhpcy5zdWI9ZnVuY3Rpb24obil7dS5wdXNoKG4pO3ZhciBsPW4uY29tcG9uZW50V2lsbFVubW91bnQ7bi5jb21wb25lbnRXaWxsVW5tb3VudD1mdW5jdGlvbigpe3Uuc3BsaWNlKHUuaW5kZXhPZihuKSwxKSxsJiZsLmNhbGwobil9fSksbi5jaGlsZHJlbn19O3JldHVybiB1LlByb3ZpZGVyLl9fPXUuQ29uc3VtZXIuY29udGV4dFR5cGU9dX1uPXtfX2U6ZnVuY3Rpb24obixsKXtmb3IodmFyIHUsaSx0LG89bC5fX2g7bD1sLl9fOylpZigodT1sLl9fYykmJiF1Ll9fKXRyeXtpZigoaT11LmNvbnN0cnVjdG9yKSYmbnVsbCE9aS5nZXREZXJpdmVkU3RhdGVGcm9tRXJyb3ImJih1LnNldFN0YXRlKGkuZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yKG4pKSx0PXUuX19kKSxudWxsIT11LmNvbXBvbmVudERpZENhdGNoJiYodS5jb21wb25lbnREaWRDYXRjaChuKSx0PXUuX19kKSx0KXJldHVybiBsLl9faD1vLHUuX19FPXV9Y2F0Y2gobCl7bj1sfXRocm93IG59LF9fdjowfSxsPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsIT1uJiZ2b2lkIDA9PT1uLmNvbnN0cnVjdG9yfSxkLnByb3RvdHlwZS5zZXRTdGF0ZT1mdW5jdGlvbihuLGwpe3ZhciB1O3U9bnVsbCE9dGhpcy5fX3MmJnRoaXMuX19zIT09dGhpcy5zdGF0ZT90aGlzLl9fczp0aGlzLl9fcz1zKHt9LHRoaXMuc3RhdGUpLFwiZnVuY3Rpb25cIj09dHlwZW9mIG4mJihuPW4ocyh7fSx1KSx0aGlzLnByb3BzKSksbiYmcyh1LG4pLG51bGwhPW4mJnRoaXMuX192JiYobCYmdGhpcy5fX2gucHVzaChsKSxrKHRoaXMpKX0sZC5wcm90b3R5cGUuZm9yY2VVcGRhdGU9ZnVuY3Rpb24obil7dGhpcy5fX3YmJih0aGlzLl9fZT0hMCxuJiZ0aGlzLl9faC5wdXNoKG4pLGsodGhpcykpfSxkLnByb3RvdHlwZS5yZW5kZXI9cCx1PVtdLGk9XCJmdW5jdGlvblwiPT10eXBlb2YgUHJvbWlzZT9Qcm9taXNlLnByb3RvdHlwZS50aGVuLmJpbmQoUHJvbWlzZS5yZXNvbHZlKCkpOnNldFRpbWVvdXQsZy5fX3I9MCxvPWYscj0wO2V4cG9ydHtNIGFzIHJlbmRlcixPIGFzIGh5ZHJhdGUsdiBhcyBjcmVhdGVFbGVtZW50LHYgYXMgaCxwIGFzIEZyYWdtZW50LHkgYXMgY3JlYXRlUmVmLGwgYXMgaXNWYWxpZEVsZW1lbnQsZCBhcyBDb21wb25lbnQsUyBhcyBjbG9uZUVsZW1lbnQscSBhcyBjcmVhdGVDb250ZXh0LHggYXMgdG9DaGlsZEFycmF5LG4gYXMgb3B0aW9uc307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmVhY3QubW9kdWxlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxuXHJcblxyXG52YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59O1xuXG5mdW5jdGlvbiBjcmVhdGVTdG9yZSQxKGluaXRpYWxTdGF0ZSwgbWlkZGxld2FyZSkge1xyXG4gICAgaWYgKGluaXRpYWxTdGF0ZSA9PT0gdm9pZCAwKSB7IGluaXRpYWxTdGF0ZSA9IHt9OyB9XHJcbiAgICBpZiAobWlkZGxld2FyZSA9PT0gdm9pZCAwKSB7IG1pZGRsZXdhcmUgPSBudWxsOyB9XHJcbiAgICB2YXIgc3RhdGUgPSBpbml0aWFsU3RhdGUgfHwge307XHJcbiAgICB2YXIgbGlzdGVuZXJzID0gW107XHJcbiAgICBmdW5jdGlvbiBkaXNwYXRjaExpc3RlbmVycygpIHtcclxuICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAoZikgeyByZXR1cm4gZihzdGF0ZSk7IH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBtaWRkbGV3YXJlOiBtaWRkbGV3YXJlLFxyXG4gICAgICAgIHNldFN0YXRlOiBmdW5jdGlvbiAodXBkYXRlKSB7XHJcbiAgICAgICAgICAgIHN0YXRlID0gX19hc3NpZ24oe30sIHN0YXRlLCAodHlwZW9mIHVwZGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gdXBkYXRlKHN0YXRlKSA6IHVwZGF0ZSkpO1xyXG4gICAgICAgICAgICBkaXNwYXRjaExpc3RlbmVycygpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3Vic2NyaWJlOiBmdW5jdGlvbiAoZikge1xyXG4gICAgICAgICAgICBsaXN0ZW5lcnMucHVzaChmKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UobGlzdGVuZXJzLmluZGV4T2YoZiksIDEpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0U3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc3RhdGUgPSBpbml0aWFsU3RhdGU7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVN0b3JlJDE7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbnZhciBwcmVhY3QgPSByZXF1aXJlKCdwcmVhY3QnKTtcblxuLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxudmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufTtcblxuZnVuY3Rpb24gc2hhbGxvd0VxdWFsKGEsIGIpIHtcclxuICAgIGZvciAodmFyIGkgaW4gYSlcclxuICAgICAgICBpZiAoYVtpXSAhPT0gYltpXSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgZm9yICh2YXIgaSBpbiBiKVxyXG4gICAgICAgIGlmICghKGkgaW4gYSkpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIHJldHVybiB0cnVlO1xyXG59XG5cbmZ1bmN0aW9uIHNldChzdG9yZSwgcmV0KSB7XHJcbiAgICBpZiAocmV0ICE9IG51bGwpIHtcclxuICAgICAgICBpZiAocmV0LnRoZW4pXHJcbiAgICAgICAgICAgIHJldHVybiByZXQudGhlbihzdG9yZS5zZXRTdGF0ZSk7XHJcbiAgICAgICAgc3RvcmUuc2V0U3RhdGUocmV0KTtcclxuICAgIH1cclxufVxuXG5mdW5jdGlvbiBiaW5kQWN0aW9uKGFjdGlvbiwgc3RvcmUpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RvcmUubWlkZGxld2FyZSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdG9yZS5taWRkbGV3YXJlKHN0b3JlLCBhY3Rpb24sIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2V0KHN0b3JlLCBhY3Rpb24uYXBwbHkodm9pZCAwLCBbc3RvcmUuZ2V0U3RhdGUoKV0uY29uY2F0KGFyZ3MpKSk7XHJcbiAgICB9O1xyXG59XG5cbmZ1bmN0aW9uIGJpbmRBY3Rpb25zKGFjdGlvbnMsIHN0b3JlLCBvd25Qcm9wcykge1xyXG4gICAgYWN0aW9ucyA9IHR5cGVvZiBhY3Rpb25zID09PSBcImZ1bmN0aW9uXCIgPyBhY3Rpb25zKHN0b3JlLCBvd25Qcm9wcykgOiBhY3Rpb25zO1xyXG4gICAgdmFyIGJvdW5kID0ge307XHJcbiAgICBmb3IgKHZhciBuYW1lXzEgaW4gYWN0aW9ucykge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBhY3Rpb25zW25hbWVfMV07XHJcbiAgICAgICAgYm91bmRbbmFtZV8xXSA9IGJpbmRBY3Rpb24oYWN0aW9uLCBzdG9yZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYm91bmQ7XHJcbn1cblxudmFyIENvbm5lY3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoQ29ubmVjdCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIENvbm5lY3QocHJvcHMsIGNvbnRleHQpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBtYXBwZWQgPSBfdGhpcy5nZXRQcm9wcyhfdGhpcy5wcm9wcywgX3RoaXMuY29udGV4dCk7XHJcbiAgICAgICAgICAgIGlmICghc2hhbGxvd0VxdWFsKG1hcHBlZCwgX3RoaXMuc3RhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZShtYXBwZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBfdGhpcy5zdGF0ZSA9IF90aGlzLmdldFByb3BzKHByb3BzLCBjb250ZXh0KTtcclxuICAgICAgICBfdGhpcy5hY3Rpb25zID0gX3RoaXMuZ2V0QWN0aW9ucygpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIENvbm5lY3QucHJvdG90eXBlLmNvbXBvbmVudFdpbGxNb3VudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlID0gdGhpcy5jb250ZXh0LnN0b3JlLnN1YnNjcmliZSh0aGlzLnVwZGF0ZSk7XHJcbiAgICB9O1xyXG4gICAgQ29ubmVjdC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSh0aGlzLnVwZGF0ZSk7XHJcbiAgICB9O1xyXG4gICAgQ29ubmVjdC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIChuZXh0UHJvcHMsIG5leHRDb250ZXh0KSB7XHJcbiAgICAgICAgdmFyIG1hcHBlZCA9IHRoaXMuZ2V0UHJvcHMobmV4dFByb3BzLCBuZXh0Q29udGV4dCk7XHJcbiAgICAgICAgaWYgKCFzaGFsbG93RXF1YWwobWFwcGVkLCB0aGlzLnN0YXRlKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKG1hcHBlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIENvbm5lY3QucHJvdG90eXBlLmdldFByb3BzID0gZnVuY3Rpb24gKHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgdmFyIG1hcFRvUHJvcHMgPSBwcm9wcy5tYXBUb1Byb3BzO1xyXG4gICAgICAgIHZhciBzdGF0ZSA9IChjb250ZXh0LnN0b3JlICYmIGNvbnRleHQuc3RvcmUuZ2V0U3RhdGUoKSkgfHwge307XHJcbiAgICAgICAgcmV0dXJuIG1hcFRvUHJvcHMgPyBtYXBUb1Byb3BzKHN0YXRlLCBwcm9wcykgOiBzdGF0ZTtcclxuICAgIH07XHJcbiAgICBDb25uZWN0LnByb3RvdHlwZS5nZXRBY3Rpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY3Rpb25zID0gdGhpcy5wcm9wcy5hY3Rpb25zO1xyXG4gICAgICAgIHJldHVybiBiaW5kQWN0aW9ucyhhY3Rpb25zLCB0aGlzLmNvbnRleHQuc3RvcmUsIHRoaXMucHJvcHMpO1xyXG4gICAgfTtcclxuICAgIENvbm5lY3QucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChfYSwgc3RhdGUsIF9iKSB7XHJcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gX2EuY2hpbGRyZW47XHJcbiAgICAgICAgdmFyIHN0b3JlID0gX2Iuc3RvcmU7XHJcbiAgICAgICAgdmFyIGNoaWxkID0gKGNoaWxkcmVuICYmIGNoaWxkcmVuWzBdKSB8fCBjaGlsZHJlbjtcclxuICAgICAgICByZXR1cm4gY2hpbGQoX19hc3NpZ24oeyBzdG9yZTogc3RvcmUgfSwgc3RhdGUsIHRoaXMuYWN0aW9ucykpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBDb25uZWN0O1xyXG59KHByZWFjdC5Db21wb25lbnQpKTtcclxuLy8gWyBIQUNLIF0gdG8gYXZvaWQgVHlwZWNoZWNrc1xyXG4vLyBzaW5jZSB0aGVyZSBpcyBhIHNtYWxsIGNvbmZsaWN0IGJldHdlZW4gcHJlYWN0IGFuZCByZWFjdCB0eXBpbmdzXHJcbi8vIGluIHRoZSBmdXR1cmUgdGhpcyBtaWdodCBiZWNvbWUgdW5lY2Vzc2FyeSBieSB1cGRhdGluZyB0eXBpbmdzXHJcbnZhciBDb25uZWN0VW50eXBlZCA9IENvbm5lY3Q7XHJcbmZ1bmN0aW9uIGNvbm5lY3QobWFwVG9Qcm9wcywgYWN0aW9ucykge1xyXG4gICAgaWYgKGFjdGlvbnMgPT09IHZvaWQgMCkgeyBhY3Rpb25zID0ge307IH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoQ2hpbGQpIHtcclxuICAgICAgICByZXR1cm4gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgICAgICAgICBfX2V4dGVuZHMoQ29ubmVjdFdyYXBwZXIsIF9zdXBlcik7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIENvbm5lY3RXcmFwcGVyKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIENvbm5lY3RXcmFwcGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChwcmVhY3QuaChDb25uZWN0VW50eXBlZCwgX19hc3NpZ24oe30sIHByb3BzLCB7IG1hcFRvUHJvcHM6IG1hcFRvUHJvcHMsIGFjdGlvbnM6IGFjdGlvbnMgfSksIGZ1bmN0aW9uIChtYXBwZWRQcm9wcykgeyByZXR1cm4gcHJlYWN0LmgoQ2hpbGQsIF9fYXNzaWduKHt9LCBtYXBwZWRQcm9wcywgcHJvcHMpKTsgfSkpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gQ29ubmVjdFdyYXBwZXI7XHJcbiAgICAgICAgfShwcmVhY3QuQ29tcG9uZW50KSk7XHJcbiAgICB9O1xyXG59XG5cbnZhciBQcm92aWRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhQcm92aWRlciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFByb3ZpZGVyKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIFByb3ZpZGVyLnByb3RvdHlwZS5nZXRDaGlsZENvbnRleHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgc3RvcmU6IHRoaXMucHJvcHMuc3RvcmUgfTtcclxuICAgIH07XHJcbiAgICBQcm92aWRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAoKHRoaXMucHJvcHMuY2hpbGRyZW4gJiYgdGhpcy5wcm9wcy5jaGlsZHJlblswXSkgfHxcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlbik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFByb3ZpZGVyO1xyXG59KHByZWFjdC5Db21wb25lbnQpKTtcblxuZXhwb3J0cy5jb25uZWN0ID0gY29ubmVjdDtcbmV4cG9ydHMuUHJvdmlkZXIgPSBQcm92aWRlcjtcbmV4cG9ydHMuQ29ubmVjdCA9IENvbm5lY3Q7XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVkdXgtemVyby9wcmVhY3QnXG5pbXBvcnQgbWVzc2FnZUJyb2tlciBmcm9tICcuL21lc3NhZ2luZydcbmltcG9ydCBUb29sYmFyQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9Ub29sYmFyQ29udGFpbmVyJ1xuaW1wb3J0IFByZXZpZXdDb250YWluZXIgZnJvbSAnLi9jb250YWluZXJzL1ByZXZpZXdDb250YWluZXInXG5pbXBvcnQgeyBhY3Rpb25zLCBJU291cmNlLCBJU3RhdGUgfSBmcm9tICcuL3N0b3JlJ1xuXG5pbnRlcmZhY2UgQXBwUHJvcHMge1xuICAgIHVwZGF0ZVNvdXJjZTogRnVuY3Rpb247XG4gICAgdXBkYXRlU2V0dGluZ3M6IEZ1bmN0aW9uO1xuICAgIHNvdXJjZTogSVNvdXJjZTtcbn1cblxuY29uc3QgbWFwVG9Qcm9wcyA9IChzdGF0ZTogSVN0YXRlKSA9PiAoeyBzb3VyY2U6IHN0YXRlLnNvdXJjZSB9KVxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQ8QXBwUHJvcHM+IHtcbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIG1lc3NhZ2VCcm9rZXIuYWRkTGlzdGVuZXIoJ3NvdXJjZTp1cGRhdGUnLCB0aGlzLnByb3BzLnVwZGF0ZVNvdXJjZSlcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcbiAgICBtZXNzYWdlQnJva2VyLnJlbW92ZUxpc3RlbmVyKCdzb3VyY2U6dXBkYXRlJywgdGhpcy5wcm9wcy51cGRhdGVTb3VyY2UpXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nbGF5b3V0Jz5cbiAgICAgICAgPFRvb2xiYXJDb250YWluZXIgLz5cbiAgICAgICAge3RoaXMucHJvcHMuc291cmNlLmRhdGEgJiYgPFByZXZpZXdDb250YWluZXIgLz59XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBUb1Byb3BzLCBhY3Rpb25zKShBcHApXG4iLCJpbXBvcnQgeyBoLCBGdW5jdGlvbmFsQ29tcG9uZW50LCBSZWYsIEpTWCB9IGZyb20gJ3ByZWFjdCdcblxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSAnLi4vc3RvcmUvSVN0YXRlJ1xuXG5pbnRlcmZhY2UgUHJldmlld1Byb3BzIHtcbiAgZGF0YTogc3RyaW5nO1xuICBzZXR0aW5nczogSVNldHRpbmdzO1xuICBhdHRhY2hSZWY6IFJlZjxIVE1MSW1hZ2VFbGVtZW50PjtcbiAgZGltZW5zaW9uOiB7IHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCB1bml0czogc3RyaW5nIH07XG4gIG9uV2hlZWw6IEpTWC5XaGVlbEV2ZW50SGFuZGxlcjxFdmVudFRhcmdldD47XG4gIGJhY2tncm91bmQ6IHN0cmluZztcbiAgc2hvd1RyYW5zcGFyZW5jeUdyaWQ6IGJvb2xlYW47XG59XG5cbmNvbnN0IFByZXZpZXc6IEZ1bmN0aW9uYWxDb21wb25lbnQ8UHJldmlld1Byb3BzPiA9ICh7XG4gIGRhdGEsXG4gIGF0dGFjaFJlZixcbiAgZGltZW5zaW9uOiB7IHdpZHRoLCBoZWlnaHQsIHVuaXRzIH0sXG4gIG9uV2hlZWwsXG4gIGJhY2tncm91bmQsXG4gIHNldHRpbmdzLFxuICBzaG93VHJhbnNwYXJlbmN5R3JpZFxufSkgPT4ge1xuICBjb25zdCBzdHlsZXMgPSB7XG4gICAgd2lkdGg6IGAke3dpZHRofSR7dW5pdHN9YCxcbiAgICBtaW5XaWR0aDogYCR7d2lkdGh9JHt1bml0c31gLFxuICAgIGhlaWdodDogYCR7aGVpZ2h0fSR7dW5pdHN9YCxcbiAgICBtaW5IZWlnaHQ6IGAke2hlaWdodH0ke3VuaXRzfWBcbiAgfVxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtgcHJldmlldyAke2JhY2tncm91bmR9ICR7c2V0dGluZ3Muc2hvd0JvdW5kaW5nQm94ID8gJ2JvdW5kaW5nLWJveCcgOiAnJ30gJHtzaG93VHJhbnNwYXJlbmN5R3JpZCA/ICd0cmFuc3BhcmVuY3ktZ3JpZCcgOiAnJ31gfSBvbldoZWVsPXtvbldoZWVsfT5cbiAgICAgIDxpbWdcbiAgICAgICAgc3JjPXtgZGF0YTppbWFnZS9zdmcreG1sLCR7ZW5jb2RlVVJJQ29tcG9uZW50KGRhdGEpfWB9XG4gICAgICAgIHJlZj17YXR0YWNoUmVmfVxuICAgICAgICBzdHlsZT17c3R5bGVzfVxuICAgICAgICBhbHQ9JydcbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJldmlld1xuIiwiaW1wb3J0IHsgaCwgRnVuY3Rpb25hbENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCdcblxuY29uc3QgUHJldmlld0Vycm9yOiBGdW5jdGlvbmFsQ29tcG9uZW50ID0gKCkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT0nZXJyb3ItY29udGFpbmVyJz5cbiAgICA8aW1nIHNyYz0nbWVkaWEvaW1hZ2VzL2Vycm9yLnBuZycgLz5cbiAgICA8ZGl2PlxuICAgICAgPGRpdj5JbWFnZSBOb3QgTG9hZGVkPC9kaXY+XG4gICAgICA8ZGl2PlRyeSB0byBvcGVuIGl0IGV4dGVybmFsbHkgdG8gZml4IGZvcm1hdCBwcm9ibGVtPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKVxuXG5leHBvcnQgZGVmYXVsdCBQcmV2aWV3RXJyb3JcbiIsImltcG9ydCB7IGgsIEZ1bmN0aW9uYWxDb21wb25lbnQsIEpTWCB9IGZyb20gJ3ByZWFjdCdcblxuaW1wb3J0IHsgQm91bmRpbmdCb3hJY29uIH0gZnJvbSAnLi9pY29ucy9Cb3VuZGluZ0JveEljb24nXG5pbXBvcnQgeyBUcmFuc3BhcmVuY3lHcmlkSWNvbiB9IGZyb20gJy4vaWNvbnMvVHJhbnNwYXJlbmN5R3JpZEljb24nXG5pbXBvcnQgeyBab29tSW5JY29uIH0gZnJvbSAnLi9pY29ucy9ab29tSW5JY29uJ1xuaW1wb3J0IHsgWm9vbU91dEljb24gfSBmcm9tICcuL2ljb25zL1pvb21PdXRJY29uJ1xuaW1wb3J0IHsgWm9vbVJlc2V0SWNvbiB9IGZyb20gJy4vaWNvbnMvWm9vbVJlc2V0SWNvbidcblxuaW50ZXJmYWNlIFRvb2xiYXJQcm9wcyB7XG4gIG9uQ2hhbmdlQmFja2dyb3VuZEJ1dHRvbkNsaWNrOiBKU1guTW91c2VFdmVudEhhbmRsZXI8RXZlbnRUYXJnZXQ+O1xuICB6b29tSW46IEZ1bmN0aW9uO1xuICB6b29tT3V0OiBGdW5jdGlvbjtcbiAgem9vbVJlc2V0OiBGdW5jdGlvbjtcbiAgZmlsZVNpemU/OiBzdHJpbmc7XG4gIHNvdXJjZUltYWdlVmFsaWRpdHk6IGJvb2xlYW47XG4gIG9uQnRuTW91c2VEb3duOiBKU1guTW91c2VFdmVudEhhbmRsZXI8RXZlbnRUYXJnZXQ+O1xuICBhY3RpdmVCdG4/OiBzdHJpbmc7XG4gIG9uVG9nZ2xlVHJhbnNwYXJlbmN5R3JpZENsaWNrOiBKU1guTW91c2VFdmVudEhhbmRsZXI8RXZlbnRUYXJnZXQ+O1xuICBvblRvZ2dsZUJvdW5kaW5nQm94Q2xpY2s6IEpTWC5Nb3VzZUV2ZW50SGFuZGxlcjxFdmVudFRhcmdldD47XG4gIHNjYWxlOiBudW1iZXI7XG4gIGJhY2tncm91bmQ6IHN0cmluZztcbiAgc2hvd0JvdW5kaW5nQm94OiBib29sZWFuO1xuICBzaG93VHJhbnNwYXJlbmN5R3JpZDogYm9vbGVhbjtcbn1cblxuY29uc3QgVG9vbGJhcjogRnVuY3Rpb25hbENvbXBvbmVudDxUb29sYmFyUHJvcHM+ID0gKHtcbiAgb25DaGFuZ2VCYWNrZ3JvdW5kQnV0dG9uQ2xpY2ssXG4gIHpvb21JbixcbiAgem9vbU91dCxcbiAgem9vbVJlc2V0LFxuICBmaWxlU2l6ZSxcbiAgc291cmNlSW1hZ2VWYWxpZGl0eSxcbiAgb25CdG5Nb3VzZURvd24sXG4gIGFjdGl2ZUJ0bixcbiAgb25Ub2dnbGVUcmFuc3BhcmVuY3lHcmlkQ2xpY2ssXG4gIG9uVG9nZ2xlQm91bmRpbmdCb3hDbGljayxcbiAgc2NhbGUsXG4gIGJhY2tncm91bmQsXG4gIHNob3dCb3VuZGluZ0JveCxcbiAgc2hvd1RyYW5zcGFyZW5jeUdyaWRcbn0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9J3Rvb2xiYXInPlxuICAgIDxkaXYgY2xhc3NOYW1lPSdidG4tZ3JvdXAnPlxuICAgICAgPGJ1dHRvblxuICAgICAgICBuYW1lPSd6b29tLWluJ1xuICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLXpvb20taW4gJHthY3RpdmVCdG4gPT09ICd6b29tLWluJyA/ICdhY3RpdmUnIDogJyd9YH1cbiAgICAgICAgZGlzYWJsZWQ9eyFzb3VyY2VJbWFnZVZhbGlkaXR5fVxuICAgICAgICBvbkNsaWNrPXt6b29tSW4gYXMgSlNYLk1vdXNlRXZlbnRIYW5kbGVyPEV2ZW50VGFyZ2V0Pn1cbiAgICAgICAgb25Nb3VzZURvd249e29uQnRuTW91c2VEb3dufVxuICAgICAgICB0aXRsZT0nWm9vbSBJbidcbiAgICAgID5cbiAgICAgICAgPFpvb21Jbkljb24gY2xhc3NOYW1lPSdpY29uJyAvPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIG5hbWU9J3pvb20tb3V0J1xuICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLXpvb20tb3V0ICR7YWN0aXZlQnRuID09PSAnem9vbS1vdXQnID8gJ2FjdGl2ZScgOiAnJ31gfVxuICAgICAgICBkaXNhYmxlZD17IXNvdXJjZUltYWdlVmFsaWRpdHl9XG4gICAgICAgIG9uQ2xpY2s9e3pvb21PdXQgYXMgSlNYLk1vdXNlRXZlbnRIYW5kbGVyPEV2ZW50VGFyZ2V0Pn1cbiAgICAgICAgb25Nb3VzZURvd249e29uQnRuTW91c2VEb3dufVxuICAgICAgICB0aXRsZT0nWm9vbSBPdXQnXG4gICAgICA+XG4gICAgICAgIDxab29tT3V0SWNvbiBjbGFzc05hbWU9J2ljb24nIC8+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgbmFtZT0nem9vbS1yZXNldCdcbiAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi16b29tLXJlc2V0ICR7YWN0aXZlQnRuID09PSAnem9vbS1yZXNldCcgPyAnYWN0aXZlJyA6ICcnfWB9XG4gICAgICAgIGRpc2FibGVkPXtzY2FsZSA9PT0gMSB8fCAhc291cmNlSW1hZ2VWYWxpZGl0eX1cbiAgICAgICAgb25DbGljaz17em9vbVJlc2V0IGFzIEpTWC5Nb3VzZUV2ZW50SGFuZGxlcjxFdmVudFRhcmdldD59XG4gICAgICAgIG9uTW91c2VEb3duPXtvbkJ0bk1vdXNlRG93bn1cbiAgICAgICAgdGl0bGU9J1pvb20gUmVzZXQnXG4gICAgICA+XG4gICAgICAgIDxab29tUmVzZXRJY29uIGNsYXNzTmFtZT0naWNvbicgLz5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3NOYW1lPSdzZXBhcmF0b3InIC8+XG4gICAgPGRpdiBjbGFzc05hbWU9J2J0bi1ncm91cCc+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIGRpc2FibGVkPXshc291cmNlSW1hZ2VWYWxpZGl0eX1cbiAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJnIGRhcmsgJHthY3RpdmVCdG4gPT09ICdkYXJrJyA/ICdhY3RpdmUnIDogJyd9ICR7YmFja2dyb3VuZCA9PT0gJ2RhcmsnID8gJ3NlbGVjdGVkJyA6ICcnfWB9XG4gICAgICAgIG5hbWU9J2RhcmsnXG4gICAgICAgIG9uQ2xpY2s9e29uQ2hhbmdlQmFja2dyb3VuZEJ1dHRvbkNsaWNrfVxuICAgICAgICBvbk1vdXNlRG93bj17b25CdG5Nb3VzZURvd259XG4gICAgICAgIHRpdGxlPSdEYXJrJ1xuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2ljb24nIC8+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgZGlzYWJsZWQ9eyFzb3VyY2VJbWFnZVZhbGlkaXR5fVxuICAgICAgICBjbGFzc05hbWU9e2BidG4gYmcgbGlnaHQgJHthY3RpdmVCdG4gPT09ICdsaWdodCcgPyAnYWN0aXZlJyA6ICcnfSAke2JhY2tncm91bmQgPT09ICdsaWdodCcgPyAnc2VsZWN0ZWQnIDogJyd9YH1cbiAgICAgICAgbmFtZT0nbGlnaHQnXG4gICAgICAgIG9uQ2xpY2s9e29uQ2hhbmdlQmFja2dyb3VuZEJ1dHRvbkNsaWNrfVxuICAgICAgICBvbk1vdXNlRG93bj17b25CdG5Nb3VzZURvd259XG4gICAgICAgIHRpdGxlPSdMaWdodCdcbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdpY29uJyAvPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzc05hbWU9J3NlcGFyYXRvcicgLz5cbiAgICA8ZGl2IGNsYXNzTmFtZT0nYnRuLWdyb3VwJz5cbiAgICAgIDxidXR0b25cbiAgICAgICAgZGlzYWJsZWQ9eyFzb3VyY2VJbWFnZVZhbGlkaXR5fVxuICAgICAgICBjbGFzc05hbWU9e2BidG4gdHJhbnNwYXJlbmN5LWdyaWQgJHthY3RpdmVCdG4gPT09ICd0cmFuc3BhcmVuY3ktZ3JpZCcgPyAnYWN0aXZlJyA6ICcnfSAke3Nob3dUcmFuc3BhcmVuY3lHcmlkID8gJ3NlbGVjdGVkJyA6ICcnfWB9XG4gICAgICAgIG5hbWU9J3RyYW5zcGFyZW5jeS1ncmlkJ1xuICAgICAgICBvbkNsaWNrPXtvblRvZ2dsZVRyYW5zcGFyZW5jeUdyaWRDbGlja31cbiAgICAgICAgb25Nb3VzZURvd249e29uQnRuTW91c2VEb3dufVxuICAgICAgICB0aXRsZT0nVHJhbnNwYXJlbmN5IEdyaWQnXG4gICAgICA+XG4gICAgICAgIDxUcmFuc3BhcmVuY3lHcmlkSWNvbiBjbGFzc05hbWU9J2ljb24nIC8+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgZGlzYWJsZWQ9eyFzb3VyY2VJbWFnZVZhbGlkaXR5fVxuICAgICAgICBjbGFzc05hbWU9e2BidG4gYm91bmRpbmctYm94ICR7YWN0aXZlQnRuID09PSAnYm91bmRpbmctYm94JyA/ICdhY3RpdmUnIDogJyd9ICR7c2hvd0JvdW5kaW5nQm94ID8gJ3NlbGVjdGVkJyA6ICcnfWB9XG4gICAgICAgIG5hbWU9J2JvdW5kaW5nLWJveCdcbiAgICAgICAgb25DbGljaz17b25Ub2dnbGVCb3VuZGluZ0JveENsaWNrfVxuICAgICAgICBvbk1vdXNlRG93bj17b25CdG5Nb3VzZURvd259XG4gICAgICAgIHRpdGxlPSdCb3VuZGluZyBCb3gnXG4gICAgICA+XG4gICAgICAgIDxCb3VuZGluZ0JveEljb24gY2xhc3NOYW1lPSdpY29uJyAvPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzc05hbWU9J3NpemUnPntmaWxlU2l6ZX08L2Rpdj5cbiAgPC9kaXY+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IFRvb2xiYXJcbiIsImltcG9ydCB7IGgsIEZ1bmN0aW9uYWxDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnXG5cbmludGVyZmFjZSBCb3VuZGluZ0JveEljb25Qcm9wcyB7XG4gICAgY2xhc3NOYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBCb3VuZGluZ0JveEljb246IEZ1bmN0aW9uYWxDb21wb25lbnQ8Qm91bmRpbmdCb3hJY29uUHJvcHM+ID0gKHsgY2xhc3NOYW1lIH0pID0+IChcbiAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIGNsYXNzPXtjbGFzc05hbWV9PlxuICAgICAgICA8cGF0aCBkPVwiTTIgMTNoMXYxaDEwdi0xaDFWM2gtMVYySDN2MUgydjEwem0xIDJ2MUgxYy0uNTUyIDAtMS0uNDQ4LTEtMXYtMmgxVjNIMFYxYzAtLjU1Mi40NDgtMSAxLTFoMnYxaDEwVjBoMmMuNTUyIDAgMSAuNDQ4IDEgMXYyaC0xdjEwaDF2MmMwIC41NTItLjQ0OCAxLTEgMWgtMnYtMUgzelwiLz5cbiAgICA8L3N2Zz5cbikiLCJpbXBvcnQgeyBoLCBGdW5jdGlvbmFsQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0J1xuXG5pbnRlcmZhY2UgVHJhbnNwYXJlbmN5R3JpZEljb25Qcm9wcyB7XG4gICAgY2xhc3NOYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBUcmFuc3BhcmVuY3lHcmlkSWNvbjogRnVuY3Rpb25hbENvbXBvbmVudDxUcmFuc3BhcmVuY3lHcmlkSWNvblByb3BzPiA9ICh7IGNsYXNzTmFtZSB9KSA9PiAoXG4gICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgICAgPGcgZmlsbD1cIm5vbmVcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCI+XG4gICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZmlsbC1ydWxlPVwibm9uemVyb1wiIGQ9XCJNMSAxdjE0aDE0VjFIMXptMC0xaDE0Yy41NTIgMCAxIC40NDggMSAxdjE0YzAgLjU1Mi0uNDQ4IDEtMSAxSDFjLS41NTIgMC0xLS40NDgtMS0xVjFjMC0uNTUyLjQ0OC0xIDEtMXpcIi8+XG4gICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xIDBoN3Y4SDBWMWMwLS41NTIuNDQ4LTEgMS0xek04IDhoOHY3YzAgLjU1Mi0uNDQ4IDEtMSAxSDhWOHpcIi8+XG4gICAgICAgIDwvZz5cbiAgICA8L3N2Zz5cbikiLCJpbXBvcnQgeyBoLCBGdW5jdGlvbmFsQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0J1xuXG5pbnRlcmZhY2UgWm9vbUluSWNvblByb3BzIHtcbiAgICBjbGFzc05hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IFpvb21Jbkljb246IEZ1bmN0aW9uYWxDb21wb25lbnQ8Wm9vbUluSWNvblByb3BzPiA9ICh7IGNsYXNzTmFtZSB9KSA9PiAoXG4gICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIGNsYXNzPXtjbGFzc05hbWV9PlxuICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xIDF2MTRoMTRWMUgxem0wLTFoMTRjLjU1MiAwIDEgLjQ0OCAxIDF2MTRjMCAuNTUyLS40NDggMS0xIDFIMWMtLjU1MiAwLTEtLjQ0OC0xLTFWMWMwLS41NTIuNDQ4LTEgMS0xem03LjU2IDcuNDA2aDEuOTQ1Yy4yNzMgMCAuNDk1LjIyMS40OTUuNDk1IDAgLjI3My0uMjIyLjQ5NS0uNDk1LjQ5NUg4LjU1OXYyLjA0NWMwIC4zMDktLjI1LjU1OS0uNTU5LjU1OS0uMzA5IDAtLjU2LS4yNS0uNTYtLjU2VjguMzk3SDUuNDk2Yy0uMjczIDAtLjQ5NS0uMjIyLS40OTUtLjQ5NSAwLS4yNzQuMjIyLS40OTUuNDk1LS40OTVoMS45NDZWNS41NTlDNy40NCA1LjI1IDcuNjkgNSA4IDVjLjMwOSAwIC41Ni4yNS41Ni41NnYxLjg0NnpcIi8+XG4gICAgPC9zdmc+XG4pIiwiaW1wb3J0IHsgaCwgRnVuY3Rpb25hbENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCdcblxuaW50ZXJmYWNlIFpvb21PdXRJY29uUHJvcHMge1xuICAgIGNsYXNzTmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgWm9vbU91dEljb246IEZ1bmN0aW9uYWxDb21wb25lbnQ8Wm9vbU91dEljb25Qcm9wcz4gPSAoeyBjbGFzc05hbWUgfSkgPT4gKFxuICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiBjbGFzcz17Y2xhc3NOYW1lfT5cbiAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMSAxdjE0aDE0VjFIMXptMC0xaDE0Yy41NTIgMCAxIC40NDggMSAxdjE0YzAgLjU1Mi0uNDQ4IDEtMSAxSDFjLS41NTIgMC0xLS40NDgtMS0xVjFjMC0uNTUyLjQ0OC0xIDEtMXptNy41NiA3LjQwNmgxLjk0NWMuMjczIDAgLjQ5NS4yMjEuNDk1LjQ5NSAwIC4yNzMtLjIyMi40OTUtLjQ5NS40OTVoLTUuMDFjLS4yNzMgMC0uNDk1LS4yMjItLjQ5NS0uNDk1IDAtLjI3NC4yMjItLjQ5NS40OTUtLjQ5NUg4LjU2elwiLz5cbiAgICA8L3N2Zz5cbikiLCJpbXBvcnQgeyBoLCBGdW5jdGlvbmFsQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0J1xuXG5pbnRlcmZhY2UgWm9vbVJlc2V0SWNvblByb3BzIHtcbiAgICBjbGFzc05hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IFpvb21SZXNldEljb246IEZ1bmN0aW9uYWxDb21wb25lbnQ8Wm9vbVJlc2V0SWNvblByb3BzPiA9ICh7IGNsYXNzTmFtZSB9KSA9PiAoXG4gICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyMlwiIGhlaWdodD1cIjEyXCIgdmlld0JveD1cIjAgMCAyMiAxMlwiIGNsYXNzPXtjbGFzc05hbWV9PlxuICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk02LjYwNCAxMkgwdi0xLjIxaDIuNjYxVjEuNTIzTC4xNTEgMi43MTVWMS4zMjhMMi44NjYgMEg0LjEydjEwLjc5aDIuNDgzVjEyem00LjAzMS05LjljLjMwMyAwIC41NTguMDk2Ljc2Ni4yOS4yMDcuMTk1LjMxMS40MzQuMzExLjcxNSAwIC4yODItLjEwNC41Mi0uMzExLjcxNS0uMjA4LjE5NS0uNDYzLjI5Mi0uNzY2LjI5Mi0uMjk3IDAtLjU0Ny0uMDk3LS43NTItLjI5Mi0uMjA1LS4xOTQtLjMwNy0uNDMzLS4zMDctLjcxNSAwLS4yODEuMTAyLS41Mi4zMDctLjcxNC4yMDUtLjE5NS40NTUtLjI5Mi43NTItLjI5MnptMCA3LjA2OWMuMzAzIDAgLjU1OC4wOTYuNzY2LjI4Ny4yMDcuMTkyLjMxMS40MzIuMzExLjcyIDAgLjI4MS0uMTA0LjUxOC0uMzExLjcxLS4yMDguMTkxLS40NjMuMjg3LS43NjYuMjg3LS4yOTcgMC0uNTQ3LS4wOTYtLjc1Mi0uMjg3LS4yMDUtLjE5Mi0uMzA3LS40MjktLjMwNy0uNzEgMC0uMjg4LjEwMi0uNTI4LjMwNy0uNzIuMjA1LS4xOTEuNDU1LS4yODcuNzUyLS4yODd6TTIyIDEyaC02LjYwNHYtMS4yMWgyLjY2MVYxLjUyM2wtMi41MSAxLjE5M1YxLjMyOEwxOC4yNjIgMGgxLjI1NXYxMC43OUgyMlYxMnpcIi8+XG4gICAgPC9zdmc+XG4pIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlZHV4LXplcm8vcHJlYWN0J1xuaW1wb3J0IHsgYWN0aW9ucywgSVNvdXJjZSwgSVN0YXRlIH0gZnJvbSAnLi4vc3RvcmUnXG5pbXBvcnQgeyBsaWdodGVuRGFya2VuQ29sb3IgfSBmcm9tICcuLi91dGlscy9saWdodGVuRGFya2VuQ29sb3InXG5pbXBvcnQgUHJldmlldyBmcm9tICcuLi9jb21wb25lbnRzL1ByZXZpZXcnXG5pbXBvcnQgUHJldmlld0Vycm9yIGZyb20gJy4uL2NvbXBvbmVudHMvUHJldmlld0Vycm9yJ1xuaW1wb3J0IHRlbGVtZXRyeVJlcG9ydGVyIGZyb20gJy4uL21lc3NhZ2luZy90ZWxlbWV0cnknXG5pbXBvcnQgbWVzc2FnZUJyb2tlciBmcm9tICcuLi9tZXNzYWdpbmcnXG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJy4uL3V0aWxzL2RlYm91bmNlJ1xuXG50eXBlIGRpbWVuc2lvbiA9IHsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfTtcblxudHlwZSBDaHJvbWVXaGVlbEV2ZW50ID0gV2hlZWxFdmVudCAmIHsgd2hlZWxEZWx0YTogbnVtYmVyOyB9O1xuXG5pbnRlcmZhY2UgUHJldmlld0NvbnRhaW5lclByb3BzIHtcbiAgc291cmNlOiBJU291cmNlO1xuICBzY2FsZTogbnVtYmVyO1xuICBiYWNrZ3JvdW5kOiBzdHJpbmc7XG4gIHpvb21JbjogRnVuY3Rpb247XG4gIHpvb21PdXQ6IEZ1bmN0aW9uO1xuICB0b2dnbGVTb3VyY2VJbWFnZVZhbGlkaXR5OiBGdW5jdGlvbjtcbiAgc2hvd1RyYW5zcGFyZW5jeUdyaWQ6IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBQcmV2aWV3Q29udGFpbmVyU3RhdGUge1xuICBzaG93UHJldmlld0Vycm9yOiBib29sZWFuO1xufVxuXG5jb25zdCBORVdfTElORV9SRUdFWFAgPSAvW1xcclxcbl0rL2dcbmNvbnN0IFNWR19UQUdfUkVHRVhQID0gLzxzdmcuKz8+L1xuY29uc3QgV0lEVEhfUkVHRVhQID0gL3dpZHRoPShcInwnKShbMC05LixdKylcXHcqKFwifCcpL1xuY29uc3QgSEVJR0hUX1JFR0VYUCA9IC9oZWlnaHQ9KFwifCcpKFswLTkuLF0rKVxcdyooXCJ8JykvXG5cbmNvbnN0IENPTE9SX0xJR0hUX0JBU0UgPSAnI2ZmZmZmZidcbmNvbnN0IENPTE9SX0RBUktfQkFTRSA9ICcjMWUxZTFlJ1xuXG5jb25zdCBjc3NWYXJpYWJsZXMgPSB7XG4gIGVkaXRvckJhY2tncm91bmQ6ICctLXZzY29kZS1lZGl0b3ItYmFja2dyb3VuZCcsXG4gIGVkaXRvckJhY2tncm91bmREYXJrZXI6ICctLXN2Zy1wcmV2aWV3ZXItZWRpdG9yLWJhY2tncm91bmQtZGFya2VyJyxcbiAgZWRpdG9yQmFja2dyb3VuZExpZ2h0ZXI6ICctLXN2Zy1wcmV2aWV3ZXItZWRpdG9yLWJhY2tncm91bmQtbGlnaHRlcicsXG4gIGVkaXRvckJhY2tncm91bmRMaWdodEJhc2U6ICctLXN2Zy1wcmV2aWV3ZXItZWRpdG9yLWJhY2tncm91bmQtbGlnaHQtYmFzZScsXG4gIGVkaXRvckJhY2tncm91bmRMaWdodEJhc2VEYXJrZXI6ICctLXN2Zy1wcmV2aWV3ZXItZWRpdG9yLWJhY2tncm91bmQtbGlnaHQtYmFzZS1kYXJrZXInLFxuICBlZGl0b3JCYWNrZ3JvdW5kRGFya0Jhc2U6ICctLXN2Zy1wcmV2aWV3ZXItZWRpdG9yLWJhY2tncm91bmQtZGFyay1iYXNlJyxcbiAgZWRpdG9yQmFja2dyb3VuZERhcmtCYXNlTGlnaHRlcjogJy0tc3ZnLXByZXZpZXdlci1lZGl0b3ItYmFja2dyb3VuZC1kYXJrLWJhc2UtbGlnaHRlcidcbn1cblxuY29uc3QgRURJVE9SX0JBQ0tHUk9VTkRfT0ZGU0VUID0gMzBcblxuY2xhc3MgUHJldmlld0NvbnRhaW5lciBleHRlbmRzIENvbXBvbmVudDxQcmV2aWV3Q29udGFpbmVyUHJvcHMsIFByZXZpZXdDb250YWluZXJTdGF0ZT4ge1xuICBwcml2YXRlIGltYWdlRWw/OiBIVE1MSW1hZ2VFbGVtZW50O1xuICB6b29tSW5UZWxlbWV0cnlEZWJvdW5jZWQ6IEZ1bmN0aW9uO1xuICB6b29tT3V0VGVsZW1ldHJ5RGVib3VuY2VkOiBGdW5jdGlvbjtcblxuICBjb25zdHJ1Y3RvciAocHJvcHM6IFByZXZpZXdDb250YWluZXJQcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuXG4gICAgdGhpcy56b29tSW5UZWxlbWV0cnlEZWJvdW5jZWQgPSBkZWJvdW5jZShcbiAgICAgICgpID0+IHRlbGVtZXRyeVJlcG9ydGVyLnNlbmRab29tRXZlbnQoJ2luJywgJ21vdXNld2hlZWwnKSxcbiAgICAgIDI1MFxuICAgIClcblxuICAgIHRoaXMuem9vbU91dFRlbGVtZXRyeURlYm91bmNlZCA9IGRlYm91bmNlKFxuICAgICAgKCkgPT4gdGVsZW1ldHJ5UmVwb3J0ZXIuc2VuZFpvb21FdmVudCgnb3V0JywgJ21vdXNld2hlZWwnKSxcbiAgICAgIDI1MFxuICAgIClcblxuICAgIHRoaXMuc3RhdGUgPSB7IHNob3dQcmV2aWV3RXJyb3I6IGZhbHNlIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLmltYWdlRWwhLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgdGhpcy5vbkVycm9yKVxuICAgIHRoaXMuaW1hZ2VFbCEuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHRoaXMub25Mb2FkKVxuICAgIG1lc3NhZ2VCcm9rZXIuYWRkTGlzdGVuZXIoJ3RoZW1lOmNoYW5nZWQnLCB0aGlzLmRlZmluZVRoZW1lQ29sb3JzKVxuXG4gICAgdGhpcy5kZWZpbmVUaGVtZUNvbG9ycygpXG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHM6IFByZXZpZXdDb250YWluZXJQcm9wcykge1xuICAgIGlmIChuZXh0UHJvcHMuc291cmNlLmRhdGEgIT09IHRoaXMucHJvcHMuc291cmNlLmRhdGEpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93UHJldmlld0Vycm9yOiBmYWxzZSB9KVxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcbiAgICBtZXNzYWdlQnJva2VyLnJlbW92ZUxpc3RlbmVyKCd0aGVtZTpjaGFuZ2VkJywgdGhpcy5kZWZpbmVUaGVtZUNvbG9ycylcbiAgfVxuXG4gIGRlZmluZVRoZW1lQ29sb3JzID0gKCkgPT4ge1xuICAgIGNvbnN0IGVkaXRvckJhY2tncm91bmRDb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZShjc3NWYXJpYWJsZXMuZWRpdG9yQmFja2dyb3VuZClcbiAgICBjb25zdCBlZGl0b3JCYWNrZ3JvdW5kRGFya2VyID0gbGlnaHRlbkRhcmtlbkNvbG9yKGVkaXRvckJhY2tncm91bmRDb2xvciwgLShFRElUT1JfQkFDS0dST1VORF9PRkZTRVQpKVxuICAgIGNvbnN0IGVkaXRvckJhY2tncm91bmRMaWdodGVyID0gbGlnaHRlbkRhcmtlbkNvbG9yKGVkaXRvckJhY2tncm91bmRDb2xvciwgRURJVE9SX0JBQ0tHUk9VTkRfT0ZGU0VUKVxuXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KGNzc1ZhcmlhYmxlcy5lZGl0b3JCYWNrZ3JvdW5kRGFya2VyLCBlZGl0b3JCYWNrZ3JvdW5kRGFya2VyKVxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShjc3NWYXJpYWJsZXMuZWRpdG9yQmFja2dyb3VuZExpZ2h0ZXIsIGVkaXRvckJhY2tncm91bmRMaWdodGVyKVxuXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KGNzc1ZhcmlhYmxlcy5lZGl0b3JCYWNrZ3JvdW5kTGlnaHRCYXNlLCBDT0xPUl9MSUdIVF9CQVNFKVxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShjc3NWYXJpYWJsZXMuZWRpdG9yQmFja2dyb3VuZExpZ2h0QmFzZURhcmtlciwgbGlnaHRlbkRhcmtlbkNvbG9yKENPTE9SX0xJR0hUX0JBU0UsIC0oRURJVE9SX0JBQ0tHUk9VTkRfT0ZGU0VUKSkpXG5cbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoY3NzVmFyaWFibGVzLmVkaXRvckJhY2tncm91bmREYXJrQmFzZSwgQ09MT1JfREFSS19CQVNFKVxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShjc3NWYXJpYWJsZXMuZWRpdG9yQmFja2dyb3VuZERhcmtCYXNlTGlnaHRlciwgbGlnaHRlbkRhcmtlbkNvbG9yKENPTE9SX0RBUktfQkFTRSwgRURJVE9SX0JBQ0tHUk9VTkRfT0ZGU0VUKSlcbiAgfVxuXG4gIGF0dGFjaFJlZiA9IChlbDogSFRNTEltYWdlRWxlbWVudCB8IG51bGwpID0+IHtcbiAgICBpZiAoZWwpIHtcbiAgICAgIHRoaXMuaW1hZ2VFbCA9IGVsXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlT25XaGVlbCA9IChldmVudDogV2hlZWxFdmVudCkgPT4ge1xuICAgIGlmICghKGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQubWV0YUtleSkpIHsgcmV0dXJuIH1cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3QgZGVsdGEgPSBNYXRoLnNpZ24oKGV2ZW50IGFzIENocm9tZVdoZWVsRXZlbnQpLndoZWVsRGVsdGEpXG4gICAgaWYgKGRlbHRhID09PSAxKSB7XG4gICAgICB0aGlzLnByb3BzLnpvb21JbigpXG4gICAgICB0aGlzLnpvb21JblRlbGVtZXRyeURlYm91bmNlZCgpXG4gICAgfVxuICAgIGlmIChkZWx0YSA9PT0gLTEpIHtcbiAgICAgIHRoaXMucHJvcHMuem9vbU91dCgpXG4gICAgICB0aGlzLnpvb21PdXRUZWxlbWV0cnlEZWJvdW5jZWQoKVxuICAgIH1cbiAgfVxuXG4gIG9uRXJyb3IgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dQcmV2aWV3RXJyb3I6IHRydWUgfSlcbiAgICB0aGlzLnByb3BzLnRvZ2dsZVNvdXJjZUltYWdlVmFsaWRpdHkoZmFsc2UpXG4gIH1cblxuICBvbkxvYWQgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dQcmV2aWV3RXJyb3I6IGZhbHNlIH0pXG4gICAgdGhpcy5wcm9wcy50b2dnbGVTb3VyY2VJbWFnZVZhbGlkaXR5KHRydWUpXG4gIH1cblxuICBnZXRPcmlnaW5hbERpbWVuc2lvbiAoZGF0YTogc3RyaW5nKTogZGltZW5zaW9uIHwgbnVsbCB7XG4gICAgY29uc3QgZm9ybWF0dGVkID0gZGF0YS5yZXBsYWNlKE5FV19MSU5FX1JFR0VYUCwgJyAnKVxuICAgIGNvbnN0IHN2ZyA9IGZvcm1hdHRlZC5tYXRjaChTVkdfVEFHX1JFR0VYUClcbiAgICBsZXQgd2lkdGggPSBudWxsOyBsZXQgaGVpZ2h0ID0gbnVsbFxuICAgIGlmIChzdmcgJiYgc3ZnLmxlbmd0aCkge1xuICAgICAgd2lkdGggPSBzdmdbMF0ubWF0Y2goV0lEVEhfUkVHRVhQKSA/IHN2Z1swXS5tYXRjaChXSURUSF9SRUdFWFApIVsyXSA6IG51bGxcbiAgICAgIGhlaWdodCA9IHN2Z1swXS5tYXRjaChIRUlHSFRfUkVHRVhQKSA/IHN2Z1swXS5tYXRjaChIRUlHSFRfUkVHRVhQKSFbMl0gOiBudWxsXG4gICAgfVxuICAgIHJldHVybiB3aWR0aCAmJiBoZWlnaHQgPyB7IHdpZHRoOiBwYXJzZUZsb2F0KHdpZHRoKSwgaGVpZ2h0OiBwYXJzZUZsb2F0KHdpZHRoKSB9IDogbnVsbFxuICB9XG5cbiAgZ2V0U2NhbGVkRGltZW5zaW9uICgpIHtcbiAgICBjb25zdCBvcmlnaW5hbERpbWVuc2lvbiA9IHRoaXMuZ2V0T3JpZ2luYWxEaW1lbnNpb24odGhpcy5wcm9wcy5zb3VyY2UuZGF0YSlcblxuICAgIGNvbnN0IG9yaWdpbmFsV2lkdGggPSBvcmlnaW5hbERpbWVuc2lvbiA/IG9yaWdpbmFsRGltZW5zaW9uLndpZHRoIDogMTAwXG4gICAgY29uc3Qgb3JpZ2luYWxIZWlnaHQgPSBvcmlnaW5hbERpbWVuc2lvbiA/IG9yaWdpbmFsRGltZW5zaW9uLmhlaWdodCA6IDEwMFxuICAgIGNvbnN0IHVuaXRzID0gb3JpZ2luYWxEaW1lbnNpb24gPyAncHgnIDogJyUnXG5cbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IHBhcnNlSW50KChvcmlnaW5hbFdpZHRoICogdGhpcy5wcm9wcy5zY2FsZSkudG9TdHJpbmcoKSksXG4gICAgICBoZWlnaHQ6IHBhcnNlSW50KChvcmlnaW5hbEhlaWdodCAqIHRoaXMucHJvcHMuc2NhbGUpLnRvU3RyaW5nKCkpLFxuICAgICAgdW5pdHNcbiAgICB9XG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLnNob3dQcmV2aWV3RXJyb3JcbiAgICAgID8gPFByZXZpZXdFcnJvciAvPlxuICAgICAgOiAoXG4gICAgICAgIDxQcmV2aWV3XG4gICAgICAgICAgZGF0YT17dGhpcy5wcm9wcy5zb3VyY2UuZGF0YX1cbiAgICAgICAgICBhdHRhY2hSZWY9e3RoaXMuYXR0YWNoUmVmfVxuICAgICAgICAgIGRpbWVuc2lvbj17dGhpcy5nZXRTY2FsZWREaW1lbnNpb24oKX1cbiAgICAgICAgICBvbldoZWVsPXt0aGlzLmhhbmRsZU9uV2hlZWx9XG4gICAgICAgICAgYmFja2dyb3VuZD17dGhpcy5wcm9wcy5iYWNrZ3JvdW5kfVxuICAgICAgICAgIHNldHRpbmdzPXt0aGlzLnByb3BzLnNvdXJjZS5zZXR0aW5nc31cbiAgICAgICAgICBzaG93VHJhbnNwYXJlbmN5R3JpZD17dGhpcy5wcm9wcy5zaG93VHJhbnNwYXJlbmN5R3JpZH1cbiAgICAgICAgLz5cbiAgICAgIClcbiAgfVxufVxuXG5jb25zdCBtYXBUb1Byb3BzID0gKHN0YXRlOiBJU3RhdGUpID0+ICh7XG4gIHNvdXJjZTogc3RhdGUuc291cmNlLFxuICBzY2FsZTogc3RhdGUuc2NhbGUsXG4gIGJhY2tncm91bmQ6IHN0YXRlLmJhY2tncm91bmQsXG4gIHNob3dUcmFuc3BhcmVuY3lHcmlkOiBzdGF0ZS5zb3VyY2Uuc2V0dGluZ3Muc2hvd1RyYW5zcGFyZW5jeUdyaWRcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwVG9Qcm9wcywgYWN0aW9ucykoUHJldmlld0NvbnRhaW5lcilcbiIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWR1eC16ZXJvL3ByZWFjdCdcbmltcG9ydCBUb29sYmFyIGZyb20gJy4uL2NvbXBvbmVudHMvVG9vbGJhcidcbmltcG9ydCB7IGFjdGlvbnMsIElTdGF0ZSwgSVNvdXJjZSB9IGZyb20gJy4uL3N0b3JlJ1xuaW1wb3J0IHsgZ2V0Qnl0ZUNvdW50QnlDb250ZW50LCBodW1hbkZpbGVTaXplIH0gZnJvbSAnLi4vdXRpbHMvZmlsZVNpemUnXG5pbXBvcnQgdGVsZW1ldHJ5UmVwb3J0ZXIgZnJvbSAnLi4vbWVzc2FnaW5nL3RlbGVtZXRyeSdcbmltcG9ydCBtZXNzYWdpbmdDb21tYW5kcyBmcm9tICcuLi9tZXNzYWdpbmcvY29tbWFuZHMnXG5cbmNvbnN0IFNDQUxFX1NURVAgPSAwLjVcblxuaW50ZXJmYWNlIFRvb2xiYXJDb250YWluZXJQcm9wcyB7XG4gIGNoYW5nZUJhY2tncm91bmQ6IEZ1bmN0aW9uO1xuICB6b29tSW46IEZ1bmN0aW9uO1xuICB6b29tT3V0OiBGdW5jdGlvbjtcbiAgem9vbVJlc2V0OiBGdW5jdGlvbjtcbiAgc291cmNlOiBJU291cmNlO1xuICBzb3VyY2VJbWFnZVZhbGlkaXR5OiBib29sZWFuO1xuICBzY2FsZTogbnVtYmVyO1xuICBiYWNrZ3JvdW5kOiBzdHJpbmcsXG4gIHNob3dCb3VuZGluZ0JveDogYm9vbGVhbjtcbiAgc2hvd1RyYW5zcGFyZW5jeUdyaWQ6IGJvb2xlYW47XG4gIHRvZ2dsZUJvdW5kaW5nQm94OiBGdW5jdGlvbjtcbiAgdG9nZ2xlVHJhbnNwYXJlbmN5R3JpZDogRnVuY3Rpb247XG59XG5cbmludGVyZmFjZSBUb29sYmFyQ29udGFpbmVyU3RhdGUge1xuICBhY3RpdmVCdG4/OiBzdHJpbmc7XG59XG5cbmNsYXNzIFRvb2xiYXJDb250YWluZXIgZXh0ZW5kcyBDb21wb25lbnQ8VG9vbGJhckNvbnRhaW5lclByb3BzLCBUb29sYmFyQ29udGFpbmVyU3RhdGU+IHtcbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHdpbmRvdy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVCdG5Nb3VzZVVwKVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuICAgIHdpbmRvdy5kb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVCdG5Nb3VzZVVwKVxuICB9XG5cbiAgaGFuZGxlQ2hhbmdlQmFja2dyb3VuZEJ1dHRvbkNsaWNrID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICB0aGlzLnByb3BzLmNoYW5nZUJhY2tncm91bmQoKGUuc3JjRWxlbWVudCBhcyBIVE1MQnV0dG9uRWxlbWVudCkuZ2V0QXR0cmlidXRlKCduYW1lJykpXG4gIH1cblxuICBoYW5kbGVUcmFuc3BhcmVuY3lHcmlkQnRuQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy50b2dnbGVUcmFuc3BhcmVuY3lHcmlkKClcbiAgICBtZXNzYWdpbmdDb21tYW5kcy5jaGFuZ2VUcmFuc3BhcmVuY3lHcmlkVmlzaWJpbGl0eSghdGhpcy5wcm9wcy5zaG93VHJhbnNwYXJlbmN5R3JpZClcbiAgfVxuXG4gIGhhbmRsZUJvdW5kaW5nQm94QnRuQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy50b2dnbGVCb3VuZGluZ0JveCgpXG4gICAgbWVzc2FnaW5nQ29tbWFuZHMuY2hhbmdlQm91bmRpbmdCb3hWaXNpYmlsaXR5KCF0aGlzLnByb3BzLnNob3dCb3VuZGluZ0JveClcbiAgfVxuXG4gIGdldEZpbGVTaXplICgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5zb3VyY2UuZGF0YSA/IGh1bWFuRmlsZVNpemUoZ2V0Qnl0ZUNvdW50QnlDb250ZW50KHRoaXMucHJvcHMuc291cmNlLmRhdGEpKSA6ICcwIEInXG4gIH1cblxuICBoYW5kbGVCdG5Nb3VzZURvd24gPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBhY3RpdmVCdG46IChlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpIS5uYW1lIH0pXG4gIH1cblxuICBoYW5kbGVCdG5Nb3VzZVVwID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBhY3RpdmVCdG46ICcnIH0pXG4gIH1cblxuICB6b29tSW4gPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy56b29tSW4oU0NBTEVfU1RFUClcbiAgICB0ZWxlbWV0cnlSZXBvcnRlci5zZW5kWm9vbUV2ZW50KCdpbicsICd0b29sYmFyJylcbiAgfVxuXG4gIHpvb21PdXQgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy56b29tT3V0KFNDQUxFX1NURVApXG4gICAgdGVsZW1ldHJ5UmVwb3J0ZXIuc2VuZFpvb21FdmVudCgnb3V0JywgJ3Rvb2xiYXInKVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFRvb2xiYXJcbiAgICAgICAgb25DaGFuZ2VCYWNrZ3JvdW5kQnV0dG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2hhbmdlQmFja2dyb3VuZEJ1dHRvbkNsaWNrfVxuICAgICAgICB6b29tSW49e3RoaXMuem9vbUlufVxuICAgICAgICB6b29tT3V0PXt0aGlzLnpvb21PdXR9XG4gICAgICAgIHpvb21SZXNldD17dGhpcy5wcm9wcy56b29tUmVzZXR9XG4gICAgICAgIGZpbGVTaXplPXt0aGlzLmdldEZpbGVTaXplKCl9XG4gICAgICAgIHNvdXJjZUltYWdlVmFsaWRpdHk9e3RoaXMucHJvcHMuc291cmNlSW1hZ2VWYWxpZGl0eX1cbiAgICAgICAgb25CdG5Nb3VzZURvd249e3RoaXMuaGFuZGxlQnRuTW91c2VEb3dufVxuICAgICAgICBhY3RpdmVCdG49e3RoaXMuc3RhdGUuYWN0aXZlQnRufVxuICAgICAgICBvblRvZ2dsZVRyYW5zcGFyZW5jeUdyaWRDbGljaz17dGhpcy5oYW5kbGVUcmFuc3BhcmVuY3lHcmlkQnRuQ2xpY2t9XG4gICAgICAgIG9uVG9nZ2xlQm91bmRpbmdCb3hDbGljaz17dGhpcy5oYW5kbGVCb3VuZGluZ0JveEJ0bkNsaWNrfVxuICAgICAgICBzY2FsZT17dGhpcy5wcm9wcy5zY2FsZX1cbiAgICAgICAgYmFja2dyb3VuZD17dGhpcy5wcm9wcy5iYWNrZ3JvdW5kfVxuICAgICAgICBzaG93Qm91bmRpbmdCb3g9e3RoaXMucHJvcHMuc2hvd0JvdW5kaW5nQm94fVxuICAgICAgICBzaG93VHJhbnNwYXJlbmN5R3JpZD17dGhpcy5wcm9wcy5zaG93VHJhbnNwYXJlbmN5R3JpZH1cbiAgICAgIC8+XG4gICAgKVxuICB9XG59XG5cbmNvbnN0IG1hcFRvUHJvcHMgPSAoc3RhdGU6IElTdGF0ZSkgPT4gKHtcbiAgc291cmNlOiBzdGF0ZS5zb3VyY2UsXG4gIHNvdXJjZUltYWdlVmFsaWRpdHk6IHN0YXRlLnNvdXJjZUltYWdlVmFsaWRpdHksXG4gIHNjYWxlOiBzdGF0ZS5zY2FsZSxcbiAgYmFja2dyb3VuZDogc3RhdGUuYmFja2dyb3VuZCxcbiAgc2hvd0JvdW5kaW5nQm94OiBzdGF0ZS5zb3VyY2Uuc2V0dGluZ3Muc2hvd0JvdW5kaW5nQm94LFxuICBzaG93VHJhbnNwYXJlbmN5R3JpZDogc3RhdGUuc291cmNlLnNldHRpbmdzLnNob3dUcmFuc3BhcmVuY3lHcmlkXG59KVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFRvUHJvcHMsIGFjdGlvbnMpKFRvb2xiYXJDb250YWluZXIpXG4iLCJpbXBvcnQgeyBoLCByZW5kZXIgfSBmcm9tICdwcmVhY3QnXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlZHV4LXplcm8vcHJlYWN0J1xuaW1wb3J0IEFwcCBmcm9tICcuL0FwcCdcbmltcG9ydCBzdG9yZSBmcm9tICcuL3N0b3JlJ1xuaW1wb3J0ICcuL21lc3NhZ2luZydcblxucmVuZGVyKFxuICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT48QXBwIC8+PC9Qcm92aWRlcj4sXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpIGFzIEhUTUxFbGVtZW50XG4pXG4iLCJpbXBvcnQgbWVzc2FnZUJyb2tlciBmcm9tICcuLydcblxuY2xhc3MgQ29tbWFuZHMge1xuICBjaGFuZ2VCb3VuZGluZ0JveFZpc2liaWxpdHkgKHZpc2libGU6IGJvb2xlYW4pIHtcbiAgICBtZXNzYWdlQnJva2VyLnNlbmQoe1xuICAgICAgY29tbWFuZDogJ2NoYW5nZUJvdW5kaW5nQm94VmlzaWJpbGl0eScsXG4gICAgICBwYXlsb2FkOiB7IHZpc2libGUgfVxuICAgIH0pXG4gIH1cblxuICBjaGFuZ2VUcmFuc3BhcmVuY3lHcmlkVmlzaWJpbGl0eSAodmlzaWJsZTogYm9vbGVhbikge1xuICAgIG1lc3NhZ2VCcm9rZXIuc2VuZCh7XG4gICAgICBjb21tYW5kOiAnY2hhbmdlVHJhbnNwYXJlbmN5R3JpZFZpc2liaWxpdHknLFxuICAgICAgcGF5bG9hZDogeyB2aXNpYmxlIH1cbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBDb21tYW5kcygpXG4iLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnXG5cbmltcG9ydCB2c2NvZGUgZnJvbSAnLi4vdnNjb2RlLWFwaSdcblxuZXhwb3J0IGludGVyZmFjZSBJTWVzc2FnZSB7XG4gIGNvbW1hbmQ6IHN0cmluZztcbiAgcGF5bG9hZDogYW55O1xufVxuXG5jbGFzcyBNZXNzYWdlQnJva2VyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZXZlbnQgPT4ge1xuICAgICAgY29uc3QgeyBjb21tYW5kLCBwYXlsb2FkIH0gPSBldmVudC5kYXRhXG5cbiAgICAgIHRoaXMuZW1pdChjb21tYW5kLCBwYXlsb2FkKVxuICAgIH0pXG4gIH1cblxuICBzZW5kIChtZXNzYWdlOiBJTWVzc2FnZSkge1xuICAgIHZzY29kZS5wb3N0TWVzc2FnZShtZXNzYWdlKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBNZXNzYWdlQnJva2VyKClcbiIsImltcG9ydCBtZXNzYWdlQnJva2VyIGZyb20gJy4vJ1xuXG5jb25zdCBURUxFTUVUUllfRVZFTlRfWk9PTSA9ICd6b29tJ1xuY29uc3QgVEVMRU1FVFJZX0VWRU5UX0NIQU5HRV9CQUNLR1JPVU5EID0gJ2NoYW5nZUJhY2tncm91bmQnXG5cbmNsYXNzIFRlbGVtZXRyeVJlcG9ydGVyIHtcbiAgc2VuZFpvb21FdmVudCAodHlwZTogc3RyaW5nLCBzb3VyY2U6IHN0cmluZykge1xuICAgIG1lc3NhZ2VCcm9rZXIuc2VuZCh7XG4gICAgICBjb21tYW5kOiAnc2VuZFRlbGVtZXRyeUV2ZW50JyxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgZXZlbnROYW1lOiBURUxFTUVUUllfRVZFTlRfWk9PTSxcbiAgICAgICAgcHJvcGVydGllczogeyB0eXBlLCBzb3VyY2UgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBzZW5kQ2hhbmdlQmFja2dyb3VuZEV2ZW50IChmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpIHtcbiAgICBtZXNzYWdlQnJva2VyLnNlbmQoe1xuICAgICAgY29tbWFuZDogJ3NlbmRUZWxlbWV0cnlFdmVudCcsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIGV2ZW50TmFtZTogVEVMRU1FVFJZX0VWRU5UX0NIQU5HRV9CQUNLR1JPVU5ELFxuICAgICAgICBwcm9wZXJ0aWVzOiB7IGZyb20sIHRvIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBUZWxlbWV0cnlSZXBvcnRlcigpXG4iLCJpbXBvcnQgeyBJU3RhdGUsIElTb3VyY2UsIElCYWNrZ3JvdW5kIH0gZnJvbSAnLi9JU3RhdGUnXG5pbXBvcnQgdnNjb2RlQXBpIGZyb20gJy4uL3ZzY29kZS1hcGknXG5pbXBvcnQgdGVsZW1ldHJ5UmVwb3J0ZXIgZnJvbSAnLi4vbWVzc2FnaW5nL3RlbGVtZXRyeSdcblxuY29uc3QgREVGQVVMVF9TQ0FMRV9TVEVQID0gMC4xXG5jb25zdCBNSU5fU0NBTEUgPSAwLjA1XG5jb25zdCBNQVhfU0NBTEUgPSAyMFxuXG5leHBvcnQgY29uc3QgYWN0aW9ucyA9ICgpID0+ICh7XG4gIHVwZGF0ZVNvdXJjZTogKHN0YXRlOiBJU3RhdGUsIHNvdXJjZTogSVNvdXJjZSkgPT4ge1xuICAgIHZzY29kZUFwaS5zZXRTdGF0ZShzb3VyY2UpXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgc291cmNlLFxuICAgICAgc2NhbGU6IHNvdXJjZS51cmkgPT09IHN0YXRlLnNvdXJjZS51cmkgPyBzdGF0ZS5zY2FsZSA6IDFcbiAgICB9XG4gIH0sXG4gIHpvb21JbjogKHN0YXRlOiBJU3RhdGUsIHN0ZXAgPSBERUZBVUxUX1NDQUxFX1NURVApID0+IHtcbiAgICBjb25zdCBuZXh0U2NhbGUgPSArKHN0YXRlLnNjYWxlICsgc3RhdGUuc2NhbGUgKiBzdGVwKS50b0ZpeGVkKDIpXG4gICAgcmV0dXJuIHsgLi4uc3RhdGUsIHNjYWxlOiBuZXh0U2NhbGUgPD0gTUFYX1NDQUxFID8gbmV4dFNjYWxlIDogTUFYX1NDQUxFIH1cbiAgfSxcbiAgem9vbU91dDogKHN0YXRlOiBJU3RhdGUsIHN0ZXAgPSBERUZBVUxUX1NDQUxFX1NURVApID0+IHtcbiAgICBjb25zdCBuZXh0U2NhbGUgPSArKHN0YXRlLnNjYWxlIC0gc3RhdGUuc2NhbGUgKiBzdGVwKS50b0ZpeGVkKDIpXG4gICAgcmV0dXJuIHsgLi4uc3RhdGUsIHNjYWxlOiBuZXh0U2NhbGUgPj0gTUlOX1NDQUxFID8gbmV4dFNjYWxlIDogTUlOX1NDQUxFIH1cbiAgfSxcbiAgem9vbVJlc2V0OiAoc3RhdGU6IElTdGF0ZSkgPT4ge1xuICAgIHRlbGVtZXRyeVJlcG9ydGVyLnNlbmRab29tRXZlbnQoJ3Jlc2V0JywgJ3Rvb2xiYXInKVxuICAgIHJldHVybiB7IC4uLnN0YXRlLCBzY2FsZTogMSB9XG4gIH0sXG4gIGNoYW5nZUJhY2tncm91bmQ6IChzdGF0ZTogSVN0YXRlLCBiYWNrZ3JvdW5kOiBJQmFja2dyb3VuZCkgPT4ge1xuICAgIHRlbGVtZXRyeVJlcG9ydGVyLnNlbmRDaGFuZ2VCYWNrZ3JvdW5kRXZlbnQoc3RhdGUuYmFja2dyb3VuZCwgYmFja2dyb3VuZClcbiAgICByZXR1cm4geyAuLi5zdGF0ZSwgYmFja2dyb3VuZCB9XG4gIH0sXG4gIHRvZ2dsZVNvdXJjZUltYWdlVmFsaWRpdHk6IChzdGF0ZTogSVN0YXRlLCB2YWxpZGl0eTogYm9vbGVhbikgPT4gKHsgLi4uc3RhdGUsIHNvdXJjZUltYWdlVmFsaWRpdHk6IHZhbGlkaXR5IH0pLFxuICB0b2dnbGVUcmFuc3BhcmVuY3lHcmlkOiAoc3RhdGU6IElTdGF0ZSkgPT4ge1xuICAgIHJldHVybiB7IC4uLnN0YXRlLCBzb3VyY2U6IHsgLi4uc3RhdGUuc291cmNlLCBzZXR0aW5nczogeyAuLi5zdGF0ZS5zb3VyY2Uuc2V0dGluZ3MsIHNob3dUcmFuc3BhcmVuY3lHcmlkOiAhc3RhdGUuc291cmNlLnNldHRpbmdzLnNob3dUcmFuc3BhcmVuY3lHcmlkIH0gfSB9XG4gIH0sXG4gIHRvZ2dsZUJvdW5kaW5nQm94OiAoc3RhdGU6IElTdGF0ZSkgPT4ge1xuICAgIHJldHVybiB7IC4uLnN0YXRlLCBzb3VyY2U6IHsgLi4uc3RhdGUuc291cmNlLCBzZXR0aW5nczogeyAuLi5zdGF0ZS5zb3VyY2Uuc2V0dGluZ3MsIHNob3dCb3VuZGluZ0JveDogIXN0YXRlLnNvdXJjZS5zZXR0aW5ncy5zaG93Qm91bmRpbmdCb3ggfSB9IH1cbiAgfVxufSlcbiIsImltcG9ydCBjcmVhdGVTdG9yZSBmcm9tICdyZWR1eC16ZXJvJ1xuaW1wb3J0IHsgSVN0YXRlIH0gZnJvbSAnLi9JU3RhdGUnXG5pbXBvcnQgdnNjb2RlQXBpIGZyb20gJy4uL3ZzY29kZS1hcGknXG5cbmNvbnN0IGJvZHlFbENsYXNzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSEuY2xhc3NMaXN0XG5cbmNvbnN0IGluaXRpYWxTdGF0ZTogSVN0YXRlID0ge1xuICBzb3VyY2U6IHtcbiAgICB1cmk6IHZzY29kZUFwaS5nZXRTdGF0ZSgpID8gdnNjb2RlQXBpLmdldFN0YXRlKCkudXJpIDogbnVsbCxcbiAgICBkYXRhOiB2c2NvZGVBcGkuZ2V0U3RhdGUoKSA/IHZzY29kZUFwaS5nZXRTdGF0ZSgpLmRhdGEgOiBudWxsLFxuICAgIHNldHRpbmdzOiB2c2NvZGVBcGkuZ2V0U3RhdGUoKSA/IHZzY29kZUFwaS5nZXRTdGF0ZSgpLnNldHRpbmdzIDogeyBzaG93Qm91bmRpbmdCb3g6IGZhbHNlLCBzaG93VHJhbnNwYXJlbmN5R3JpZDogZmFsc2UgfVxuICB9LFxuICBzY2FsZTogMSxcbiAgYmFja2dyb3VuZDogYm9keUVsQ2xhc3NMaXN0LmNvbnRhaW5zKCd2c2NvZGUtZGFyaycpIHx8IGJvZHlFbENsYXNzTGlzdC5jb250YWlucygndnNjb2RlLWhpZ2gtY29udHJhc3QnKVxuICAgID8gJ2RhcmsnXG4gICAgOiAnbGlnaHQnLFxuICBzb3VyY2VJbWFnZVZhbGlkaXR5OiBmYWxzZVxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTdG9yZShpbml0aWFsU3RhdGUpXG5leHBvcnQgeyBhY3Rpb25zIH0gZnJvbSAnLi9hY3Rpb25zJ1xuZXhwb3J0IHsgSVN0YXRlLCBJU291cmNlIH0gZnJvbSAnLi9JU3RhdGUnXG4iLCJleHBvcnQgZnVuY3Rpb24gZGVib3VuY2UgKGZ1bmM6IEZ1bmN0aW9uLCB3YWl0OiBudW1iZXIpIHtcbiAgbGV0IHRpbWVvdXQ6IE5vZGVKUy5UaW1lclxuICByZXR1cm4gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpXG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gZnVuYyguLi5hcmdzKSwgd2FpdClcbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGdldEJ5dGVDb3VudEJ5Q29udGVudCAoczogc3RyaW5nID0gJycpOiBudW1iZXIge1xuICBsZXQgY291bnQgPSAwOyBjb25zdCBzdHJpbmdMZW5ndGggPSBzLmxlbmd0aDsgbGV0IGlcbiAgcyA9IFN0cmluZyhzIHx8ICcnKVxuICBmb3IgKGkgPSAwOyBpIDwgc3RyaW5nTGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBwYXJ0Q291bnQgPSBlbmNvZGVVUkkoc1tpXSkuc3BsaXQoJyUnKS5sZW5ndGhcbiAgICBjb3VudCArPSBwYXJ0Q291bnQgPT09IDEgPyAxIDogcGFydENvdW50IC0gMVxuICB9XG4gIHJldHVybiBjb3VudFxufVxuXG5leHBvcnQgZnVuY3Rpb24gaHVtYW5GaWxlU2l6ZSAoc2l6ZTogbnVtYmVyID0gMCk6IHN0cmluZyB7XG4gIHZhciBpID0gTWF0aC5mbG9vcihNYXRoLmxvZyhzaXplKSAvIE1hdGgubG9nKDEwMjQpKVxuICBjb25zdCBudW1iZXJQYXJ0ID0gKyhzaXplIC8gTWF0aC5wb3coMTAyNCwgaSkpLnRvRml4ZWQoMikgKiAxXG4gIGNvbnN0IHN0cmluZ1BhcnQgPSBbJ0InLCAna0InLCAnTUInLCAnR0InLCAnVEInXVtpXVxuICByZXR1cm4gYCR7bnVtYmVyUGFydH0gJHtzdHJpbmdQYXJ0fWBcbn07XG4iLCJleHBvcnQgZnVuY3Rpb24gbGlnaHRlbkRhcmtlbkNvbG9yIChjb2xvcjogc3RyaW5nLCBhbW91bnQ6IG51bWJlcikge1xuICByZXR1cm4gJyMnICsgY29sb3IucmVwbGFjZSgvXiMvLCAnJykucmVwbGFjZSgvLi4vZywgY29sb3IgPT4gKCcwJyArIE1hdGgubWluKDI1NSwgTWF0aC5tYXgoMCwgcGFyc2VJbnQoY29sb3IsIDE2KSArIGFtb3VudCkpLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC0yKSlcbn1cbiIsImludGVyZmFjZSBJVlNDb2RlQXBpIHtcbiAgZ2V0U3RhdGUoKTogYW55O1xuICBzZXRTdGF0ZShzdGF0ZTogYW55KTogdm9pZDtcbiAgcG9zdE1lc3NhZ2UobWVzc2FnZTogb2JqZWN0KTogdm9pZDtcbn1cblxuZGVjbGFyZSBmdW5jdGlvbiBhY3F1aXJlVnNDb2RlQXBpKCk6IElWU0NvZGVBcGk7XG5cbmV4cG9ydCBkZWZhdWx0IGFjcXVpcmVWc0NvZGVBcGkoKVxuIl0sInNvdXJjZVJvb3QiOiIifQ==