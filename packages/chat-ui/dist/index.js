!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(exports, require('react'), require('react-dom'), require('@/assets'))
    : 'function' == typeof define && define.amd
    ? define(['exports', 'react', 'react-dom', '@/assets'], t)
    : t(
        ((e = 'undefined' != typeof globalThis ? globalThis : e || self).ChatUI = {}),
        e.React,
        e.ReactDOM,
        e.assets,
      );
})(this, function (e, t, n, r) {
  'use strict';
  function a(e) {
    return e && 'object' == typeof e && 'default' in e ? e : { default: e };
  }
  e.version = '0.0.0';
  var o = a(t),
    i = a(n);
  function c(e) {
    var t,
      n,
      r = '';
    if ('string' == typeof e || 'number' == typeof e) r += e;
    else if ('object' == typeof e)
      if (Array.isArray(e))
        for (t = 0; t < e.length; t++) e[t] && (n = c(e[t])) && (r && (r += ' '), (r += n));
      else for (t in e) e[t] && (r && (r += ' '), (r += t));
    return r;
  }
  function u() {
    for (var e, t, n = 0, r = ''; n < arguments.length; )
      (e = arguments[n++]) && (t = c(e)) && (r && (r += ' '), (r += t));
    return r;
  }
  function l(e) {
    return (
      (l =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      l(e)
    );
  }
  function s(e, t) {
    return (
      (s =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      s(e, t)
    );
  }
  function f(e, t, n) {
    return (
      (f = (function () {
        if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ('function' == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
        } catch (e) {
          return !1;
        }
      })()
        ? Reflect.construct
        : function (e, t, n) {
            var r = [null];
            r.push.apply(r, t);
            var a = new (Function.bind.apply(e, r))();
            return n && s(a, n.prototype), a;
          }),
      f.apply(null, arguments)
    );
  }
  function d(e) {
    return (
      (function (e) {
        if (Array.isArray(e)) return m(e);
      })(e) ||
      (function (e) {
        if (('undefined' != typeof Symbol && null != e[Symbol.iterator]) || null != e['@@iterator'])
          return Array.from(e);
      })(e) ||
      (function (e, t) {
        if (!e) return;
        if ('string' == typeof e) return m(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        'Object' === n && e.constructor && (n = e.constructor.name);
        if ('Map' === n || 'Set' === n) return Array.from(e);
        if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return m(e, t);
      })(e) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
        );
      })()
    );
  }
  function m(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  !(function () {
    if ('object' == typeof window)
      if (
        'IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in window.IntersectionObserverEntry.prototype
      )
        'isIntersecting' in window.IntersectionObserverEntry.prototype ||
          Object.defineProperty(window.IntersectionObserverEntry.prototype, 'isIntersecting', {
            get: function () {
              return this.intersectionRatio > 0;
            },
          });
      else {
        var e = (function (e) {
            for (var t = window.document, n = a(t); n; ) n = a((t = n.ownerDocument));
            return t;
          })(),
          t = [],
          n = null,
          r = null;
        (i.prototype.THROTTLE_TIMEOUT = 100),
          (i.prototype.POLL_INTERVAL = null),
          (i.prototype.USE_MUTATION_OBSERVER = !0),
          (i._setupCrossOriginUpdater = function () {
            return (
              n ||
                (n = function (e, n) {
                  (r =
                    e && n
                      ? f(e, n)
                      : { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 }),
                    t.forEach(function (e) {
                      e._checkForIntersections();
                    });
                }),
              n
            );
          }),
          (i._resetCrossOriginUpdater = function () {
            (n = null), (r = null);
          }),
          (i.prototype.observe = function (e) {
            if (
              !this._observationTargets.some(function (t) {
                return t.element == e;
              })
            ) {
              if (!e || 1 != e.nodeType) throw new Error('target must be an Element');
              this._registerInstance(),
                this._observationTargets.push({ element: e, entry: null }),
                this._monitorIntersections(e.ownerDocument),
                this._checkForIntersections();
            }
          }),
          (i.prototype.unobserve = function (e) {
            (this._observationTargets = this._observationTargets.filter(function (t) {
              return t.element != e;
            })),
              this._unmonitorIntersections(e.ownerDocument),
              0 == this._observationTargets.length && this._unregisterInstance();
          }),
          (i.prototype.disconnect = function () {
            (this._observationTargets = []),
              this._unmonitorAllIntersections(),
              this._unregisterInstance();
          }),
          (i.prototype.takeRecords = function () {
            var e = this._queuedEntries.slice();
            return (this._queuedEntries = []), e;
          }),
          (i.prototype._initThresholds = function (e) {
            var t = e || [0];
            return (
              Array.isArray(t) || (t = [t]),
              t.sort().filter(function (e, t, n) {
                if ('number' != typeof e || isNaN(e) || e < 0 || e > 1)
                  throw new Error('threshold must be a number between 0 and 1 inclusively');
                return e !== n[t - 1];
              })
            );
          }),
          (i.prototype._parseRootMargin = function (e) {
            var t = (e || '0px').split(/\s+/).map(function (e) {
              var t = /^(-?\d*\.?\d+)(px|%)$/.exec(e);
              if (!t) throw new Error('rootMargin must be specified in pixels or percent');
              return { value: parseFloat(t[1]), unit: t[2] };
            });
            return (t[1] = t[1] || t[0]), (t[2] = t[2] || t[0]), (t[3] = t[3] || t[1]), t;
          }),
          (i.prototype._monitorIntersections = function (t) {
            var n = t.defaultView;
            if (n && -1 == this._monitoringDocuments.indexOf(t)) {
              var r = this._checkForIntersections,
                o = null,
                i = null;
              this.POLL_INTERVAL
                ? (o = n.setInterval(r, this.POLL_INTERVAL))
                : (c(n, 'resize', r, !0),
                  c(t, 'scroll', r, !0),
                  this.USE_MUTATION_OBSERVER &&
                    'MutationObserver' in n &&
                    (i = new n.MutationObserver(r)).observe(t, {
                      attributes: !0,
                      childList: !0,
                      characterData: !0,
                      subtree: !0,
                    })),
                this._monitoringDocuments.push(t),
                this._monitoringUnsubscribes.push(function () {
                  var e = t.defaultView;
                  e && (o && e.clearInterval(o), u(e, 'resize', r, !0)),
                    u(t, 'scroll', r, !0),
                    i && i.disconnect();
                });
              var l = (this.root && (this.root.ownerDocument || this.root)) || e;
              if (t != l) {
                var s = a(t);
                s && this._monitorIntersections(s.ownerDocument);
              }
            }
          }),
          (i.prototype._unmonitorIntersections = function (t) {
            var n = this._monitoringDocuments.indexOf(t);
            if (-1 != n) {
              var r = (this.root && (this.root.ownerDocument || this.root)) || e,
                o = this._observationTargets.some(function (e) {
                  var n = e.element.ownerDocument;
                  if (n == t) return !0;
                  for (; n && n != r; ) {
                    var o = a(n);
                    if ((n = o && o.ownerDocument) == t) return !0;
                  }
                  return !1;
                });
              if (!o) {
                var i = this._monitoringUnsubscribes[n];
                if (
                  (this._monitoringDocuments.splice(n, 1),
                  this._monitoringUnsubscribes.splice(n, 1),
                  i(),
                  t != r)
                ) {
                  var c = a(t);
                  c && this._unmonitorIntersections(c.ownerDocument);
                }
              }
            }
          }),
          (i.prototype._unmonitorAllIntersections = function () {
            var e = this._monitoringUnsubscribes.slice(0);
            (this._monitoringDocuments.length = 0), (this._monitoringUnsubscribes.length = 0);
            for (var t = 0; t < e.length; t++) e[t]();
          }),
          (i.prototype._checkForIntersections = function () {
            if (this.root || !n || r) {
              var e = this._rootIsInDom(),
                t = e
                  ? this._getRootRect()
                  : { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
              this._observationTargets.forEach(function (r) {
                var a = r.element,
                  i = l(a),
                  c = this._rootContainsTarget(a),
                  u = r.entry,
                  s = e && c && this._computeTargetAndRootIntersection(a, i, t),
                  f = null;
                this._rootContainsTarget(a)
                  ? (n && !this.root) || (f = t)
                  : (f = { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 });
                var d = (r.entry = new o({
                  time: window.performance && performance.now && performance.now(),
                  target: a,
                  boundingClientRect: i,
                  rootBounds: f,
                  intersectionRect: s,
                }));
                u
                  ? e && c
                    ? this._hasCrossedThreshold(u, d) && this._queuedEntries.push(d)
                    : u && u.isIntersecting && this._queuedEntries.push(d)
                  : this._queuedEntries.push(d);
              }, this),
                this._queuedEntries.length && this._callback(this.takeRecords(), this);
            }
          }),
          (i.prototype._computeTargetAndRootIntersection = function (t, a, o) {
            if ('none' != window.getComputedStyle(t).display) {
              for (var i, c, u, s, d, p, v, h, g = a, y = m(t), b = !1; !b && y; ) {
                var w = null,
                  x = 1 == y.nodeType ? window.getComputedStyle(y) : {};
                if ('none' == x.display) return null;
                if (y == this.root || 9 == y.nodeType)
                  if (((b = !0), y == this.root || y == e))
                    n && !this.root
                      ? !r || (0 == r.width && 0 == r.height)
                        ? ((y = null), (w = null), (g = null))
                        : (w = r)
                      : (w = o);
                  else {
                    var E = m(y),
                      k = E && l(E),
                      S = E && this._computeTargetAndRootIntersection(E, k, o);
                    k && S ? ((y = E), (w = f(k, S))) : ((y = null), (g = null));
                  }
                else {
                  var N = y.ownerDocument;
                  y != N.body && y != N.documentElement && 'visible' != x.overflow && (w = l(y));
                }
                if (
                  (w &&
                    ((i = w),
                    (c = g),
                    (u = void 0),
                    (s = void 0),
                    (d = void 0),
                    (p = void 0),
                    (v = void 0),
                    (h = void 0),
                    (u = Math.max(i.top, c.top)),
                    (s = Math.min(i.bottom, c.bottom)),
                    (d = Math.max(i.left, c.left)),
                    (p = Math.min(i.right, c.right)),
                    (h = s - u),
                    (g =
                      ((v = p - d) >= 0 &&
                        h >= 0 && { top: u, bottom: s, left: d, right: p, width: v, height: h }) ||
                      null)),
                  !g)
                )
                  break;
                y = y && m(y);
              }
              return g;
            }
          }),
          (i.prototype._getRootRect = function () {
            var t;
            if (this.root && !p(this.root)) t = l(this.root);
            else {
              var n = p(this.root) ? this.root : e,
                r = n.documentElement,
                a = n.body;
              t = {
                top: 0,
                left: 0,
                right: r.clientWidth || a.clientWidth,
                width: r.clientWidth || a.clientWidth,
                bottom: r.clientHeight || a.clientHeight,
                height: r.clientHeight || a.clientHeight,
              };
            }
            return this._expandRectByRootMargin(t);
          }),
          (i.prototype._expandRectByRootMargin = function (e) {
            var t = this._rootMarginValues.map(function (t, n) {
                return 'px' == t.unit ? t.value : (t.value * (n % 2 ? e.width : e.height)) / 100;
              }),
              n = {
                top: e.top - t[0],
                right: e.right + t[1],
                bottom: e.bottom + t[2],
                left: e.left - t[3],
              };
            return (n.width = n.right - n.left), (n.height = n.bottom - n.top), n;
          }),
          (i.prototype._hasCrossedThreshold = function (e, t) {
            var n = e && e.isIntersecting ? e.intersectionRatio || 0 : -1,
              r = t.isIntersecting ? t.intersectionRatio || 0 : -1;
            if (n !== r)
              for (var a = 0; a < this.thresholds.length; a++) {
                var o = this.thresholds[a];
                if (o == n || o == r || o < n != o < r) return !0;
              }
          }),
          (i.prototype._rootIsInDom = function () {
            return !this.root || d(e, this.root);
          }),
          (i.prototype._rootContainsTarget = function (t) {
            var n = (this.root && (this.root.ownerDocument || this.root)) || e;
            return d(n, t) && (!this.root || n == t.ownerDocument);
          }),
          (i.prototype._registerInstance = function () {
            t.indexOf(this) < 0 && t.push(this);
          }),
          (i.prototype._unregisterInstance = function () {
            var e = t.indexOf(this);
            -1 != e && t.splice(e, 1);
          }),
          (window.IntersectionObserver = i),
          (window.IntersectionObserverEntry = o);
      }
    function a(e) {
      try {
        return (e.defaultView && e.defaultView.frameElement) || null;
      } catch (e) {
        return null;
      }
    }
    function o(e) {
      (this.time = e.time),
        (this.target = e.target),
        (this.rootBounds = s(e.rootBounds)),
        (this.boundingClientRect = s(e.boundingClientRect)),
        (this.intersectionRect = s(
          e.intersectionRect || { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 },
        )),
        (this.isIntersecting = !!e.intersectionRect);
      var t = this.boundingClientRect,
        n = t.width * t.height,
        r = this.intersectionRect,
        a = r.width * r.height;
      this.intersectionRatio = n ? Number((a / n).toFixed(4)) : this.isIntersecting ? 1 : 0;
    }
    function i(e, t) {
      var n,
        r,
        a,
        o = t || {};
      if ('function' != typeof e) throw new Error('callback must be a function');
      if (o.root && 1 != o.root.nodeType && 9 != o.root.nodeType)
        throw new Error('root must be a Document or Element');
      (this._checkForIntersections =
        ((n = this._checkForIntersections.bind(this)),
        (r = this.THROTTLE_TIMEOUT),
        (a = null),
        function () {
          a ||
            (a = setTimeout(function () {
              n(), (a = null);
            }, r));
        })),
        (this._callback = e),
        (this._observationTargets = []),
        (this._queuedEntries = []),
        (this._rootMarginValues = this._parseRootMargin(o.rootMargin)),
        (this.thresholds = this._initThresholds(o.threshold)),
        (this.root = o.root || null),
        (this.rootMargin = this._rootMarginValues
          .map(function (e) {
            return e.value + e.unit;
          })
          .join(' ')),
        (this._monitoringDocuments = []),
        (this._monitoringUnsubscribes = []);
    }
    function c(e, t, n, r) {
      'function' == typeof e.addEventListener
        ? e.addEventListener(t, n, r || !1)
        : 'function' == typeof e.attachEvent && e.attachEvent('on' + t, n);
    }
    function u(e, t, n, r) {
      'function' == typeof e.removeEventListener
        ? e.removeEventListener(t, n, r || !1)
        : 'function' == typeof e.detachEvent && e.detachEvent('on' + t, n);
    }
    function l(e) {
      var t;
      try {
        t = e.getBoundingClientRect();
      } catch (e) {}
      return t
        ? ((t.width && t.height) ||
            (t = {
              top: t.top,
              right: t.right,
              bottom: t.bottom,
              left: t.left,
              width: t.right - t.left,
              height: t.bottom - t.top,
            }),
          t)
        : { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
    }
    function s(e) {
      return !e || 'x' in e
        ? e
        : {
            top: e.top,
            y: e.top,
            bottom: e.bottom,
            left: e.left,
            x: e.left,
            right: e.right,
            width: e.width,
            height: e.height,
          };
    }
    function f(e, t) {
      var n = t.top - e.top,
        r = t.left - e.left;
      return {
        top: n,
        left: r,
        height: t.height,
        width: t.width,
        bottom: n + t.height,
        right: r + t.width,
      };
    }
    function d(e, t) {
      for (var n = t; n; ) {
        if (n == e) return !0;
        n = m(n);
      }
      return !1;
    }
    function m(t) {
      var n = t.parentNode;
      return 9 == t.nodeType && t != e
        ? a(t)
        : (n && n.assignedSlot && (n = n.assignedSlot.parentNode),
          n && 11 == n.nodeType && n.host ? n.host : n);
    }
    function p(e) {
      return e && 9 === e.nodeType;
    }
  })();
  var p = Object.hasOwnProperty,
    v = Object.setPrototypeOf,
    h = Object.isFrozen,
    g = Object.getPrototypeOf,
    y = Object.getOwnPropertyDescriptor,
    b = Object.freeze,
    w = Object.seal,
    x = Object.create,
    E = 'undefined' != typeof Reflect && Reflect,
    k = E.apply,
    S = E.construct;
  k ||
    (k = function (e, t, n) {
      return e.apply(t, n);
    }),
    b ||
      (b = function (e) {
        return e;
      }),
    w ||
      (w = function (e) {
        return e;
      }),
    S ||
      (S = function (e, t) {
        return f(e, d(t));
      });
  var N,
    O = D(Array.prototype.forEach),
    T = D(Array.prototype.pop),
    C = D(Array.prototype.push),
    A = D(String.prototype.toLowerCase),
    R = D(String.prototype.toString),
    j = D(String.prototype.match),
    I = D(String.prototype.replace),
    P = D(String.prototype.indexOf),
    M = D(String.prototype.trim),
    L = D(RegExp.prototype.test),
    _ =
      ((N = TypeError),
      function () {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return S(N, t);
      });
  function D(e) {
    return function (t) {
      for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++)
        r[a - 1] = arguments[a];
      return k(e, t, r);
    };
  }
  function F(e, t, n) {
    (n = n || A), v && v(e, null);
    for (var r = t.length; r--; ) {
      var a = t[r];
      if ('string' == typeof a) {
        var o = n(a);
        o !== a && (h(t) || (t[r] = o), (a = o));
      }
      e[a] = !0;
    }
    return e;
  }
  function z(e) {
    var t,
      n = x(null);
    for (t in e) !0 === k(p, e, [t]) && (n[t] = e[t]);
    return n;
  }
  function H(e, t) {
    for (; null !== e; ) {
      var n = y(e, t);
      if (n) {
        if (n.get) return D(n.get);
        if ('function' == typeof n.value) return D(n.value);
      }
      e = g(e);
    }
    return function (e) {
      return null;
    };
  }
  var B = b([
      'a',
      'abbr',
      'acronym',
      'address',
      'area',
      'article',
      'aside',
      'audio',
      'b',
      'bdi',
      'bdo',
      'big',
      'blink',
      'blockquote',
      'body',
      'br',
      'button',
      'canvas',
      'caption',
      'center',
      'cite',
      'code',
      'col',
      'colgroup',
      'content',
      'data',
      'datalist',
      'dd',
      'decorator',
      'del',
      'details',
      'dfn',
      'dialog',
      'dir',
      'div',
      'dl',
      'dt',
      'element',
      'em',
      'fieldset',
      'figcaption',
      'figure',
      'font',
      'footer',
      'form',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'head',
      'header',
      'hgroup',
      'hr',
      'html',
      'i',
      'img',
      'input',
      'ins',
      'kbd',
      'label',
      'legend',
      'li',
      'main',
      'map',
      'mark',
      'marquee',
      'menu',
      'menuitem',
      'meter',
      'nav',
      'nobr',
      'ol',
      'optgroup',
      'option',
      'output',
      'p',
      'picture',
      'pre',
      'progress',
      'q',
      'rp',
      'rt',
      'ruby',
      's',
      'samp',
      'section',
      'select',
      'shadow',
      'small',
      'source',
      'spacer',
      'span',
      'strike',
      'strong',
      'style',
      'sub',
      'summary',
      'sup',
      'table',
      'tbody',
      'td',
      'template',
      'textarea',
      'tfoot',
      'th',
      'thead',
      'time',
      'tr',
      'track',
      'tt',
      'u',
      'ul',
      'var',
      'video',
      'wbr',
    ]),
    U = b([
      'svg',
      'a',
      'altglyph',
      'altglyphdef',
      'altglyphitem',
      'animatecolor',
      'animatemotion',
      'animatetransform',
      'circle',
      'clippath',
      'defs',
      'desc',
      'ellipse',
      'filter',
      'font',
      'g',
      'glyph',
      'glyphref',
      'hkern',
      'image',
      'line',
      'lineargradient',
      'marker',
      'mask',
      'metadata',
      'mpath',
      'path',
      'pattern',
      'polygon',
      'polyline',
      'radialgradient',
      'rect',
      'stop',
      'style',
      'switch',
      'symbol',
      'text',
      'textpath',
      'title',
      'tref',
      'tspan',
      'view',
      'vkern',
    ]),
    Y = b([
      'feBlend',
      'feColorMatrix',
      'feComponentTransfer',
      'feComposite',
      'feConvolveMatrix',
      'feDiffuseLighting',
      'feDisplacementMap',
      'feDistantLight',
      'feFlood',
      'feFuncA',
      'feFuncB',
      'feFuncG',
      'feFuncR',
      'feGaussianBlur',
      'feImage',
      'feMerge',
      'feMergeNode',
      'feMorphology',
      'feOffset',
      'fePointLight',
      'feSpecularLighting',
      'feSpotLight',
      'feTile',
      'feTurbulence',
    ]),
    V = b([
      'animate',
      'color-profile',
      'cursor',
      'discard',
      'fedropshadow',
      'font-face',
      'font-face-format',
      'font-face-name',
      'font-face-src',
      'font-face-uri',
      'foreignobject',
      'hatch',
      'hatchpath',
      'mesh',
      'meshgradient',
      'meshpatch',
      'meshrow',
      'missing-glyph',
      'script',
      'set',
      'solidcolor',
      'unknown',
      'use',
    ]),
    W = b([
      'math',
      'menclose',
      'merror',
      'mfenced',
      'mfrac',
      'mglyph',
      'mi',
      'mlabeledtr',
      'mmultiscripts',
      'mn',
      'mo',
      'mover',
      'mpadded',
      'mphantom',
      'mroot',
      'mrow',
      'ms',
      'mspace',
      'msqrt',
      'mstyle',
      'msub',
      'msup',
      'msubsup',
      'mtable',
      'mtd',
      'mtext',
      'mtr',
      'munder',
      'munderover',
    ]),
    G = b([
      'maction',
      'maligngroup',
      'malignmark',
      'mlongdiv',
      'mscarries',
      'mscarry',
      'msgroup',
      'mstack',
      'msline',
      'msrow',
      'semantics',
      'annotation',
      'annotation-xml',
      'mprescripts',
      'none',
    ]),
    X = b(['#text']),
    $ = b([
      'accept',
      'action',
      'align',
      'alt',
      'autocapitalize',
      'autocomplete',
      'autopictureinpicture',
      'autoplay',
      'background',
      'bgcolor',
      'border',
      'capture',
      'cellpadding',
      'cellspacing',
      'checked',
      'cite',
      'class',
      'clear',
      'color',
      'cols',
      'colspan',
      'controls',
      'controlslist',
      'coords',
      'crossorigin',
      'datetime',
      'decoding',
      'default',
      'dir',
      'disabled',
      'disablepictureinpicture',
      'disableremoteplayback',
      'download',
      'draggable',
      'enctype',
      'enterkeyhint',
      'face',
      'for',
      'headers',
      'height',
      'hidden',
      'high',
      'href',
      'hreflang',
      'id',
      'inputmode',
      'integrity',
      'ismap',
      'kind',
      'label',
      'lang',
      'list',
      'loading',
      'loop',
      'low',
      'max',
      'maxlength',
      'media',
      'method',
      'min',
      'minlength',
      'multiple',
      'muted',
      'name',
      'nonce',
      'noshade',
      'novalidate',
      'nowrap',
      'open',
      'optimum',
      'pattern',
      'placeholder',
      'playsinline',
      'poster',
      'preload',
      'pubdate',
      'radiogroup',
      'readonly',
      'rel',
      'required',
      'rev',
      'reversed',
      'role',
      'rows',
      'rowspan',
      'spellcheck',
      'scope',
      'selected',
      'shape',
      'size',
      'sizes',
      'span',
      'srclang',
      'start',
      'src',
      'srcset',
      'step',
      'style',
      'summary',
      'tabindex',
      'title',
      'translate',
      'type',
      'usemap',
      'valign',
      'value',
      'width',
      'xmlns',
      'slot',
    ]),
    q = b([
      'accent-height',
      'accumulate',
      'additive',
      'alignment-baseline',
      'ascent',
      'attributename',
      'attributetype',
      'azimuth',
      'basefrequency',
      'baseline-shift',
      'begin',
      'bias',
      'by',
      'class',
      'clip',
      'clippathunits',
      'clip-path',
      'clip-rule',
      'color',
      'color-interpolation',
      'color-interpolation-filters',
      'color-profile',
      'color-rendering',
      'cx',
      'cy',
      'd',
      'dx',
      'dy',
      'diffuseconstant',
      'direction',
      'display',
      'divisor',
      'dur',
      'edgemode',
      'elevation',
      'end',
      'fill',
      'fill-opacity',
      'fill-rule',
      'filter',
      'filterunits',
      'flood-color',
      'flood-opacity',
      'font-family',
      'font-size',
      'font-size-adjust',
      'font-stretch',
      'font-style',
      'font-variant',
      'font-weight',
      'fx',
      'fy',
      'g1',
      'g2',
      'glyph-name',
      'glyphref',
      'gradientunits',
      'gradienttransform',
      'height',
      'href',
      'id',
      'image-rendering',
      'in',
      'in2',
      'k',
      'k1',
      'k2',
      'k3',
      'k4',
      'kerning',
      'keypoints',
      'keysplines',
      'keytimes',
      'lang',
      'lengthadjust',
      'letter-spacing',
      'kernelmatrix',
      'kernelunitlength',
      'lighting-color',
      'local',
      'marker-end',
      'marker-mid',
      'marker-start',
      'markerheight',
      'markerunits',
      'markerwidth',
      'maskcontentunits',
      'maskunits',
      'max',
      'mask',
      'media',
      'method',
      'mode',
      'min',
      'name',
      'numoctaves',
      'offset',
      'operator',
      'opacity',
      'order',
      'orient',
      'orientation',
      'origin',
      'overflow',
      'paint-order',
      'path',
      'pathlength',
      'patterncontentunits',
      'patterntransform',
      'patternunits',
      'points',
      'preservealpha',
      'preserveaspectratio',
      'primitiveunits',
      'r',
      'rx',
      'ry',
      'radius',
      'refx',
      'refy',
      'repeatcount',
      'repeatdur',
      'restart',
      'result',
      'rotate',
      'scale',
      'seed',
      'shape-rendering',
      'specularconstant',
      'specularexponent',
      'spreadmethod',
      'startoffset',
      'stddeviation',
      'stitchtiles',
      'stop-color',
      'stop-opacity',
      'stroke-dasharray',
      'stroke-dashoffset',
      'stroke-linecap',
      'stroke-linejoin',
      'stroke-miterlimit',
      'stroke-opacity',
      'stroke',
      'stroke-width',
      'style',
      'surfacescale',
      'systemlanguage',
      'tabindex',
      'targetx',
      'targety',
      'transform',
      'transform-origin',
      'text-anchor',
      'text-decoration',
      'text-rendering',
      'textlength',
      'type',
      'u1',
      'u2',
      'unicode',
      'values',
      'viewbox',
      'visibility',
      'version',
      'vert-adv-y',
      'vert-origin-x',
      'vert-origin-y',
      'width',
      'word-spacing',
      'wrap',
      'writing-mode',
      'xchannelselector',
      'ychannelselector',
      'x',
      'x1',
      'x2',
      'xmlns',
      'y',
      'y1',
      'y2',
      'z',
      'zoomandpan',
    ]),
    K = b([
      'accent',
      'accentunder',
      'align',
      'bevelled',
      'close',
      'columnsalign',
      'columnlines',
      'columnspan',
      'denomalign',
      'depth',
      'dir',
      'display',
      'displaystyle',
      'encoding',
      'fence',
      'frame',
      'height',
      'href',
      'id',
      'largeop',
      'length',
      'linethickness',
      'lspace',
      'lquote',
      'mathbackground',
      'mathcolor',
      'mathsize',
      'mathvariant',
      'maxsize',
      'minsize',
      'movablelimits',
      'notation',
      'numalign',
      'open',
      'rowalign',
      'rowlines',
      'rowspacing',
      'rowspan',
      'rspace',
      'rquote',
      'scriptlevel',
      'scriptminsize',
      'scriptsizemultiplier',
      'selection',
      'separator',
      'separators',
      'stretchy',
      'subscriptshift',
      'supscriptshift',
      'symmetric',
      'voffset',
      'width',
      'xmlns',
    ]),
    J = b(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']),
    Z = w(/\{\{[\w\W]*|[\w\W]*\}\}/gm),
    Q = w(/<%[\w\W]*|[\w\W]*%>/gm),
    ee = w(/\${[\w\W]*}/gm),
    te = w(/^data-[\-\w.\u00B7-\uFFFF]/),
    ne = w(/^aria-[\-\w]+$/),
    re = w(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),
    ae = w(/^(?:\w+script|data):/i),
    oe = w(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
    ie = w(/^html$/i),
    ce = function () {
      return 'undefined' == typeof window ? null : window;
    };
  var ue = (function e() {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ce(),
        n = function (t) {
          return e(t);
        };
      if (((n.version = '2.4.5'), (n.removed = []), !t || !t.document || 9 !== t.document.nodeType))
        return (n.isSupported = !1), n;
      var r = t.document,
        a = t.document,
        o = t.DocumentFragment,
        i = t.HTMLTemplateElement,
        c = t.Node,
        u = t.Element,
        s = t.NodeFilter,
        f = t.NamedNodeMap,
        m = void 0 === f ? t.NamedNodeMap || t.MozNamedAttrMap : f,
        p = t.HTMLFormElement,
        v = t.DOMParser,
        h = t.trustedTypes,
        g = u.prototype,
        y = H(g, 'cloneNode'),
        w = H(g, 'nextSibling'),
        x = H(g, 'childNodes'),
        E = H(g, 'parentNode');
      if ('function' == typeof i) {
        var k = a.createElement('template');
        k.content && k.content.ownerDocument && (a = k.content.ownerDocument);
      }
      var S = (function (e, t) {
          if ('object' !== l(e) || 'function' != typeof e.createPolicy) return null;
          var n = null,
            r = 'data-tt-policy-suffix';
          t.currentScript &&
            t.currentScript.hasAttribute(r) &&
            (n = t.currentScript.getAttribute(r));
          var a = 'dompurify' + (n ? '#' + n : '');
          try {
            return e.createPolicy(a, {
              createHTML: function (e) {
                return e;
              },
              createScriptURL: function (e) {
                return e;
              },
            });
          } catch (e) {
            return null;
          }
        })(h, r),
        N = S ? S.createHTML('') : '',
        D = a,
        ue = D.implementation,
        le = D.createNodeIterator,
        se = D.createDocumentFragment,
        fe = D.getElementsByTagName,
        de = r.importNode,
        me = {};
      try {
        me = z(a).documentMode ? a.documentMode : {};
      } catch (e) {}
      var pe = {};
      n.isSupported = 'function' == typeof E && ue && void 0 !== ue.createHTMLDocument && 9 !== me;
      var ve,
        he,
        ge = Z,
        ye = Q,
        be = ee,
        we = te,
        xe = ne,
        Ee = ae,
        ke = oe,
        Se = re,
        Ne = null,
        Oe = F({}, [].concat(d(B), d(U), d(Y), d(W), d(X))),
        Te = null,
        Ce = F({}, [].concat(d($), d(q), d(K), d(J))),
        Ae = Object.seal(
          Object.create(null, {
            tagNameCheck: { writable: !0, configurable: !1, enumerable: !0, value: null },
            attributeNameCheck: { writable: !0, configurable: !1, enumerable: !0, value: null },
            allowCustomizedBuiltInElements: {
              writable: !0,
              configurable: !1,
              enumerable: !0,
              value: !1,
            },
          }),
        ),
        Re = null,
        je = null,
        Ie = !0,
        Pe = !0,
        Me = !1,
        Le = !0,
        _e = !1,
        De = !1,
        Fe = !1,
        ze = !1,
        He = !1,
        Be = !1,
        Ue = !1,
        Ye = !0,
        Ve = !1,
        We = !0,
        Ge = !1,
        Xe = {},
        $e = null,
        qe = F({}, [
          'annotation-xml',
          'audio',
          'colgroup',
          'desc',
          'foreignobject',
          'head',
          'iframe',
          'math',
          'mi',
          'mn',
          'mo',
          'ms',
          'mtext',
          'noembed',
          'noframes',
          'noscript',
          'plaintext',
          'script',
          'style',
          'svg',
          'template',
          'thead',
          'title',
          'video',
          'xmp',
        ]),
        Ke = null,
        Je = F({}, ['audio', 'video', 'img', 'source', 'image', 'track']),
        Ze = null,
        Qe = F({}, [
          'alt',
          'class',
          'for',
          'id',
          'label',
          'name',
          'pattern',
          'placeholder',
          'role',
          'summary',
          'title',
          'value',
          'style',
          'xmlns',
        ]),
        et = 'http://www.w3.org/1998/Math/MathML',
        tt = 'http://www.w3.org/2000/svg',
        nt = 'http://www.w3.org/1999/xhtml',
        rt = nt,
        at = !1,
        ot = null,
        it = F({}, [et, tt, nt], R),
        ct = ['application/xhtml+xml', 'text/html'],
        ut = null,
        lt = a.createElement('form'),
        st = function (e) {
          return e instanceof RegExp || e instanceof Function;
        },
        ft = function (e) {
          (ut && ut === e) ||
            ((e && 'object' === l(e)) || (e = {}),
            (e = z(e)),
            (ve = ve = -1 === ct.indexOf(e.PARSER_MEDIA_TYPE) ? 'text/html' : e.PARSER_MEDIA_TYPE),
            (he = 'application/xhtml+xml' === ve ? R : A),
            (Ne = 'ALLOWED_TAGS' in e ? F({}, e.ALLOWED_TAGS, he) : Oe),
            (Te = 'ALLOWED_ATTR' in e ? F({}, e.ALLOWED_ATTR, he) : Ce),
            (ot = 'ALLOWED_NAMESPACES' in e ? F({}, e.ALLOWED_NAMESPACES, R) : it),
            (Ze = 'ADD_URI_SAFE_ATTR' in e ? F(z(Qe), e.ADD_URI_SAFE_ATTR, he) : Qe),
            (Ke = 'ADD_DATA_URI_TAGS' in e ? F(z(Je), e.ADD_DATA_URI_TAGS, he) : Je),
            ($e = 'FORBID_CONTENTS' in e ? F({}, e.FORBID_CONTENTS, he) : qe),
            (Re = 'FORBID_TAGS' in e ? F({}, e.FORBID_TAGS, he) : {}),
            (je = 'FORBID_ATTR' in e ? F({}, e.FORBID_ATTR, he) : {}),
            (Xe = 'USE_PROFILES' in e && e.USE_PROFILES),
            (Ie = !1 !== e.ALLOW_ARIA_ATTR),
            (Pe = !1 !== e.ALLOW_DATA_ATTR),
            (Me = e.ALLOW_UNKNOWN_PROTOCOLS || !1),
            (Le = !1 !== e.ALLOW_SELF_CLOSE_IN_ATTR),
            (_e = e.SAFE_FOR_TEMPLATES || !1),
            (De = e.WHOLE_DOCUMENT || !1),
            (He = e.RETURN_DOM || !1),
            (Be = e.RETURN_DOM_FRAGMENT || !1),
            (Ue = e.RETURN_TRUSTED_TYPE || !1),
            (ze = e.FORCE_BODY || !1),
            (Ye = !1 !== e.SANITIZE_DOM),
            (Ve = e.SANITIZE_NAMED_PROPS || !1),
            (We = !1 !== e.KEEP_CONTENT),
            (Ge = e.IN_PLACE || !1),
            (Se = e.ALLOWED_URI_REGEXP || Se),
            (rt = e.NAMESPACE || nt),
            (Ae = e.CUSTOM_ELEMENT_HANDLING || {}),
            e.CUSTOM_ELEMENT_HANDLING &&
              st(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) &&
              (Ae.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),
            e.CUSTOM_ELEMENT_HANDLING &&
              st(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) &&
              (Ae.attributeNameCheck = e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),
            e.CUSTOM_ELEMENT_HANDLING &&
              'boolean' == typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements &&
              (Ae.allowCustomizedBuiltInElements =
                e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),
            _e && (Pe = !1),
            Be && (He = !0),
            Xe &&
              ((Ne = F({}, d(X))),
              (Te = []),
              !0 === Xe.html && (F(Ne, B), F(Te, $)),
              !0 === Xe.svg && (F(Ne, U), F(Te, q), F(Te, J)),
              !0 === Xe.svgFilters && (F(Ne, Y), F(Te, q), F(Te, J)),
              !0 === Xe.mathMl && (F(Ne, W), F(Te, K), F(Te, J))),
            e.ADD_TAGS && (Ne === Oe && (Ne = z(Ne)), F(Ne, e.ADD_TAGS, he)),
            e.ADD_ATTR && (Te === Ce && (Te = z(Te)), F(Te, e.ADD_ATTR, he)),
            e.ADD_URI_SAFE_ATTR && F(Ze, e.ADD_URI_SAFE_ATTR, he),
            e.FORBID_CONTENTS && ($e === qe && ($e = z($e)), F($e, e.FORBID_CONTENTS, he)),
            We && (Ne['#text'] = !0),
            De && F(Ne, ['html', 'head', 'body']),
            Ne.table && (F(Ne, ['tbody']), delete Re.tbody),
            b && b(e),
            (ut = e));
        },
        dt = F({}, ['mi', 'mo', 'mn', 'ms', 'mtext']),
        mt = F({}, ['foreignobject', 'desc', 'title', 'annotation-xml']),
        pt = F({}, ['title', 'style', 'font', 'a', 'script']),
        vt = F({}, U);
      F(vt, Y), F(vt, V);
      var ht = F({}, W);
      F(ht, G);
      var gt = function (e) {
          C(n.removed, { element: e });
          try {
            e.parentNode.removeChild(e);
          } catch (t) {
            try {
              e.outerHTML = N;
            } catch (t) {
              e.remove();
            }
          }
        },
        yt = function (e, t) {
          try {
            C(n.removed, { attribute: t.getAttributeNode(e), from: t });
          } catch (e) {
            C(n.removed, { attribute: null, from: t });
          }
          if ((t.removeAttribute(e), 'is' === e && !Te[e]))
            if (He || Be)
              try {
                gt(t);
              } catch (e) {}
            else
              try {
                t.setAttribute(e, '');
              } catch (e) {}
        },
        bt = function (e) {
          var t, n;
          if (ze) e = '<remove></remove>' + e;
          else {
            var r = j(e, /^[\r\n\t ]+/);
            n = r && r[0];
          }
          'application/xhtml+xml' === ve &&
            rt === nt &&
            (e =
              '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' +
              e +
              '</body></html>');
          var o = S ? S.createHTML(e) : e;
          if (rt === nt)
            try {
              t = new v().parseFromString(o, ve);
            } catch (e) {}
          if (!t || !t.documentElement) {
            t = ue.createDocument(rt, 'template', null);
            try {
              t.documentElement.innerHTML = at ? N : o;
            } catch (e) {}
          }
          var i = t.body || t.documentElement;
          return (
            e && n && i.insertBefore(a.createTextNode(n), i.childNodes[0] || null),
            rt === nt ? fe.call(t, De ? 'html' : 'body')[0] : De ? t.documentElement : i
          );
        },
        wt = function (e) {
          return le.call(
            e.ownerDocument || e,
            e,
            s.SHOW_ELEMENT | s.SHOW_COMMENT | s.SHOW_TEXT,
            null,
            !1,
          );
        },
        xt = function (e) {
          return 'object' === l(c)
            ? e instanceof c
            : e &&
                'object' === l(e) &&
                'number' == typeof e.nodeType &&
                'string' == typeof e.nodeName;
        },
        Et = function (e, t, r) {
          pe[e] &&
            O(pe[e], function (e) {
              e.call(n, t, r, ut);
            });
        },
        kt = function (e) {
          var t, r;
          if (
            (Et('beforeSanitizeElements', e, null),
            (r = e) instanceof p &&
              ('string' != typeof r.nodeName ||
                'string' != typeof r.textContent ||
                'function' != typeof r.removeChild ||
                !(r.attributes instanceof m) ||
                'function' != typeof r.removeAttribute ||
                'function' != typeof r.setAttribute ||
                'string' != typeof r.namespaceURI ||
                'function' != typeof r.insertBefore ||
                'function' != typeof r.hasChildNodes))
          )
            return gt(e), !0;
          if (L(/[\u0080-\uFFFF]/, e.nodeName)) return gt(e), !0;
          var a = he(e.nodeName);
          if (
            (Et('uponSanitizeElement', e, { tagName: a, allowedTags: Ne }),
            e.hasChildNodes() &&
              !xt(e.firstElementChild) &&
              (!xt(e.content) || !xt(e.content.firstElementChild)) &&
              L(/<[/\w]/g, e.innerHTML) &&
              L(/<[/\w]/g, e.textContent))
          )
            return gt(e), !0;
          if ('select' === a && L(/<template/i, e.innerHTML)) return gt(e), !0;
          if (!Ne[a] || Re[a]) {
            if (!Re[a] && Nt(a)) {
              if (Ae.tagNameCheck instanceof RegExp && L(Ae.tagNameCheck, a)) return !1;
              if (Ae.tagNameCheck instanceof Function && Ae.tagNameCheck(a)) return !1;
            }
            if (We && !$e[a]) {
              var o = E(e) || e.parentNode,
                i = x(e) || e.childNodes;
              if (i && o) for (var c = i.length - 1; c >= 0; --c) o.insertBefore(y(i[c], !0), w(e));
            }
            return gt(e), !0;
          }
          return e instanceof u &&
            !(function (e) {
              var t = E(e);
              (t && t.tagName) || (t = { namespaceURI: rt, tagName: 'template' });
              var n = A(e.tagName),
                r = A(t.tagName);
              return (
                !!ot[e.namespaceURI] &&
                (e.namespaceURI === tt
                  ? t.namespaceURI === nt
                    ? 'svg' === n
                    : t.namespaceURI === et
                    ? 'svg' === n && ('annotation-xml' === r || dt[r])
                    : Boolean(vt[n])
                  : e.namespaceURI === et
                  ? t.namespaceURI === nt
                    ? 'math' === n
                    : t.namespaceURI === tt
                    ? 'math' === n && mt[r]
                    : Boolean(ht[n])
                  : e.namespaceURI === nt
                  ? !(t.namespaceURI === tt && !mt[r]) &&
                    !(t.namespaceURI === et && !dt[r]) &&
                    !ht[n] &&
                    (pt[n] || !vt[n])
                  : !('application/xhtml+xml' !== ve || !ot[e.namespaceURI]))
              );
            })(e)
            ? (gt(e), !0)
            : ('noscript' !== a && 'noembed' !== a) || !L(/<\/no(script|embed)/i, e.innerHTML)
            ? (_e &&
                3 === e.nodeType &&
                ((t = e.textContent),
                (t = I(t, ge, ' ')),
                (t = I(t, ye, ' ')),
                (t = I(t, be, ' ')),
                e.textContent !== t &&
                  (C(n.removed, { element: e.cloneNode() }), (e.textContent = t))),
              Et('afterSanitizeElements', e, null),
              !1)
            : (gt(e), !0);
        },
        St = function (e, t, n) {
          if (Ye && ('id' === t || 'name' === t) && (n in a || n in lt)) return !1;
          if (Pe && !je[t] && L(we, t));
          else if (Ie && L(xe, t));
          else if (!Te[t] || je[t]) {
            if (
              !(
                (Nt(e) &&
                  ((Ae.tagNameCheck instanceof RegExp && L(Ae.tagNameCheck, e)) ||
                    (Ae.tagNameCheck instanceof Function && Ae.tagNameCheck(e))) &&
                  ((Ae.attributeNameCheck instanceof RegExp && L(Ae.attributeNameCheck, t)) ||
                    (Ae.attributeNameCheck instanceof Function && Ae.attributeNameCheck(t)))) ||
                ('is' === t &&
                  Ae.allowCustomizedBuiltInElements &&
                  ((Ae.tagNameCheck instanceof RegExp && L(Ae.tagNameCheck, n)) ||
                    (Ae.tagNameCheck instanceof Function && Ae.tagNameCheck(n))))
              )
            )
              return !1;
          } else if (Ze[t]);
          else if (L(Se, I(n, ke, '')));
          else if (
            ('src' !== t && 'xlink:href' !== t && 'href' !== t) ||
            'script' === e ||
            0 !== P(n, 'data:') ||
            !Ke[e]
          ) {
            if (Me && !L(Ee, I(n, ke, '')));
            else if (n) return !1;
          } else;
          return !0;
        },
        Nt = function (e) {
          return e.indexOf('-') > 0;
        },
        Ot = function (e) {
          var t, r, a, o;
          Et('beforeSanitizeAttributes', e, null);
          var i = e.attributes;
          if (i) {
            var c = { attrName: '', attrValue: '', keepAttr: !0, allowedAttributes: Te };
            for (o = i.length; o--; ) {
              var u = (t = i[o]),
                s = u.name,
                f = u.namespaceURI;
              if (
                ((r = 'value' === s ? t.value : M(t.value)),
                (a = he(s)),
                (c.attrName = a),
                (c.attrValue = r),
                (c.keepAttr = !0),
                (c.forceKeepAttr = void 0),
                Et('uponSanitizeAttribute', e, c),
                (r = c.attrValue),
                !c.forceKeepAttr && (yt(s, e), c.keepAttr))
              )
                if (Le || !L(/\/>/i, r)) {
                  _e && ((r = I(r, ge, ' ')), (r = I(r, ye, ' ')), (r = I(r, be, ' ')));
                  var d = he(e.nodeName);
                  if (St(d, a, r)) {
                    if (
                      (!Ve || ('id' !== a && 'name' !== a) || (yt(s, e), (r = 'user-content-' + r)),
                      S && 'object' === l(h) && 'function' == typeof h.getAttributeType)
                    )
                      if (f);
                      else
                        switch (h.getAttributeType(d, a)) {
                          case 'TrustedHTML':
                            r = S.createHTML(r);
                            break;
                          case 'TrustedScriptURL':
                            r = S.createScriptURL(r);
                        }
                    try {
                      f ? e.setAttributeNS(f, s, r) : e.setAttribute(s, r), T(n.removed);
                    } catch (e) {}
                  }
                } else yt(s, e);
            }
            Et('afterSanitizeAttributes', e, null);
          }
        },
        Tt = function e(t) {
          var n,
            r = wt(t);
          for (Et('beforeSanitizeShadowDOM', t, null); (n = r.nextNode()); )
            Et('uponSanitizeShadowNode', n, null),
              kt(n) || (n.content instanceof o && e(n.content), Ot(n));
          Et('afterSanitizeShadowDOM', t, null);
        };
      return (
        (n.sanitize = function (e) {
          var a,
            i,
            u,
            s,
            f,
            d = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          if (((at = !e) && (e = '\x3c!--\x3e'), 'string' != typeof e && !xt(e))) {
            if ('function' != typeof e.toString) throw _('toString is not a function');
            if ('string' != typeof (e = e.toString())) throw _('dirty is not a string, aborting');
          }
          if (!n.isSupported) {
            if ('object' === l(t.toStaticHTML) || 'function' == typeof t.toStaticHTML) {
              if ('string' == typeof e) return t.toStaticHTML(e);
              if (xt(e)) return t.toStaticHTML(e.outerHTML);
            }
            return e;
          }
          if ((Fe || ft(d), (n.removed = []), 'string' == typeof e && (Ge = !1), Ge)) {
            if (e.nodeName) {
              var m = he(e.nodeName);
              if (!Ne[m] || Re[m])
                throw _('root node is forbidden and cannot be sanitized in-place');
            }
          } else if (e instanceof c)
            (1 === (i = (a = bt('\x3c!----\x3e')).ownerDocument.importNode(e, !0)).nodeType &&
              'BODY' === i.nodeName) ||
            'HTML' === i.nodeName
              ? (a = i)
              : a.appendChild(i);
          else {
            if (!He && !_e && !De && -1 === e.indexOf('<')) return S && Ue ? S.createHTML(e) : e;
            if (!(a = bt(e))) return He ? null : Ue ? N : '';
          }
          a && ze && gt(a.firstChild);
          for (var p = wt(Ge ? e : a); (u = p.nextNode()); )
            (3 === u.nodeType && u === s) ||
              kt(u) ||
              (u.content instanceof o && Tt(u.content), Ot(u), (s = u));
          if (((s = null), Ge)) return e;
          if (He) {
            if (Be) for (f = se.call(a.ownerDocument); a.firstChild; ) f.appendChild(a.firstChild);
            else f = a;
            return (Te.shadowroot || Te.shadowrootmod) && (f = de.call(r, f, !0)), f;
          }
          var v = De ? a.outerHTML : a.innerHTML;
          return (
            De &&
              Ne['!doctype'] &&
              a.ownerDocument &&
              a.ownerDocument.doctype &&
              a.ownerDocument.doctype.name &&
              L(ie, a.ownerDocument.doctype.name) &&
              (v = '<!DOCTYPE ' + a.ownerDocument.doctype.name + '>\n' + v),
            _e && ((v = I(v, ge, ' ')), (v = I(v, ye, ' ')), (v = I(v, be, ' '))),
            S && Ue ? S.createHTML(v) : v
          );
        }),
        (n.setConfig = function (e) {
          ft(e), (Fe = !0);
        }),
        (n.clearConfig = function () {
          (ut = null), (Fe = !1);
        }),
        (n.isValidAttribute = function (e, t, n) {
          ut || ft({});
          var r = he(e),
            a = he(t);
          return St(r, a, n);
        }),
        (n.addHook = function (e, t) {
          'function' == typeof t && ((pe[e] = pe[e] || []), C(pe[e], t));
        }),
        (n.removeHook = function (e) {
          if (pe[e]) return T(pe[e]);
        }),
        (n.removeHooks = function (e) {
          pe[e] && (pe[e] = []);
        }),
        (n.removeAllHooks = function () {
          pe = {};
        }),
        n
      );
    })(),
    le =
      'undefined' != typeof globalThis
        ? globalThis
        : 'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : {};
  function se(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
  }
  var fe = { exports: {} },
    de = function (e) {
      return e && e.Math == Math && e;
    },
    me =
      de('object' == typeof globalThis && globalThis) ||
      de('object' == typeof window && window) ||
      de('object' == typeof self && self) ||
      de('object' == typeof le && le) ||
      (function () {
        return this;
      })() ||
      Function('return this')(),
    pe = function (e) {
      try {
        return !!e();
      } catch (e) {
        return !0;
      }
    },
    ve = !pe(function () {
      var e = function () {}.bind();
      return 'function' != typeof e || e.hasOwnProperty('prototype');
    }),
    he = ve,
    ge = Function.prototype,
    ye = ge.apply,
    be = ge.call,
    we =
      ('object' == typeof Reflect && Reflect.apply) ||
      (he
        ? be.bind(ye)
        : function () {
            return be.apply(ye, arguments);
          }),
    xe = ve,
    Ee = Function.prototype,
    ke = Ee.call,
    Se = xe && Ee.bind.bind(ke, ke),
    Ne = xe
      ? Se
      : function (e) {
          return function () {
            return ke.apply(e, arguments);
          };
        },
    Oe = Ne,
    Te = Oe({}.toString),
    Ce = Oe(''.slice),
    Ae = function (e) {
      return Ce(Te(e), 8, -1);
    },
    Re = Ae,
    je = Ne,
    Ie = function (e) {
      if ('Function' === Re(e)) return je(e);
    },
    Pe = 'object' == typeof document && document.all,
    Me = { all: Pe, IS_HTMLDDA: void 0 === Pe && void 0 !== Pe },
    Le = Me.all,
    _e = Me.IS_HTMLDDA
      ? function (e) {
          return 'function' == typeof e || e === Le;
        }
      : function (e) {
          return 'function' == typeof e;
        },
    De = {},
    Fe = !pe(function () {
      return (
        7 !=
        Object.defineProperty({}, 1, {
          get: function () {
            return 7;
          },
        })[1]
      );
    }),
    ze = ve,
    He = Function.prototype.call,
    Be = ze
      ? He.bind(He)
      : function () {
          return He.apply(He, arguments);
        },
    Ue = {},
    Ye = {}.propertyIsEnumerable,
    Ve = Object.getOwnPropertyDescriptor,
    We = Ve && !Ye.call({ 1: 2 }, 1);
  Ue.f = We
    ? function (e) {
        var t = Ve(this, e);
        return !!t && t.enumerable;
      }
    : Ye;
  var Ge,
    Xe,
    $e = function (e, t) {
      return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t };
    },
    qe = pe,
    Ke = Ae,
    Je = Object,
    Ze = Ne(''.split),
    Qe = qe(function () {
      return !Je('z').propertyIsEnumerable(0);
    })
      ? function (e) {
          return 'String' == Ke(e) ? Ze(e, '') : Je(e);
        }
      : Je,
    et = function (e) {
      return null == e;
    },
    tt = et,
    nt = TypeError,
    rt = function (e) {
      if (tt(e)) throw nt("Can't call method on " + e);
      return e;
    },
    at = Qe,
    ot = rt,
    it = function (e) {
      return at(ot(e));
    },
    ct = _e,
    ut = Me.all,
    lt = Me.IS_HTMLDDA
      ? function (e) {
          return 'object' == typeof e ? null !== e : ct(e) || e === ut;
        }
      : function (e) {
          return 'object' == typeof e ? null !== e : ct(e);
        },
    st = {},
    ft = st,
    dt = me,
    mt = _e,
    pt = function (e) {
      return mt(e) ? e : void 0;
    },
    vt = function (e, t) {
      return arguments.length < 2
        ? pt(ft[e]) || pt(dt[e])
        : (ft[e] && ft[e][t]) || (dt[e] && dt[e][t]);
    },
    ht = Ne({}.isPrototypeOf),
    gt = ('undefined' != typeof navigator && String(navigator.userAgent)) || '',
    yt = me,
    bt = gt,
    wt = yt.process,
    xt = yt.Deno,
    Et = (wt && wt.versions) || (xt && xt.version),
    kt = Et && Et.v8;
  kt && (Xe = (Ge = kt.split('.'))[0] > 0 && Ge[0] < 4 ? 1 : +(Ge[0] + Ge[1])),
    !Xe &&
      bt &&
      (!(Ge = bt.match(/Edge\/(\d+)/)) || Ge[1] >= 74) &&
      (Ge = bt.match(/Chrome\/(\d+)/)) &&
      (Xe = +Ge[1]);
  var St = Xe,
    Nt = St,
    Ot = pe,
    Tt =
      !!Object.getOwnPropertySymbols &&
      !Ot(function () {
        var e = Symbol();
        return !String(e) || !(Object(e) instanceof Symbol) || (!Symbol.sham && Nt && Nt < 41);
      }),
    Ct = Tt && !Symbol.sham && 'symbol' == typeof Symbol.iterator,
    At = vt,
    Rt = _e,
    jt = ht,
    It = Object,
    Pt = Ct
      ? function (e) {
          return 'symbol' == typeof e;
        }
      : function (e) {
          var t = At('Symbol');
          return Rt(t) && jt(t.prototype, It(e));
        },
    Mt = String,
    Lt = function (e) {
      try {
        return Mt(e);
      } catch (e) {
        return 'Object';
      }
    },
    _t = _e,
    Dt = Lt,
    Ft = TypeError,
    zt = function (e) {
      if (_t(e)) return e;
      throw Ft(Dt(e) + ' is not a function');
    },
    Ht = zt,
    Bt = et,
    Ut = function (e, t) {
      var n = e[t];
      return Bt(n) ? void 0 : Ht(n);
    },
    Yt = Be,
    Vt = _e,
    Wt = lt,
    Gt = TypeError,
    Xt = { exports: {} },
    $t = me,
    qt = Object.defineProperty,
    Kt = function (e, t) {
      try {
        qt($t, e, { value: t, configurable: !0, writable: !0 });
      } catch (n) {
        $t[e] = t;
      }
      return t;
    },
    Jt = '__core-js_shared__',
    Zt = me[Jt] || Kt(Jt, {}),
    Qt = Zt;
  (Xt.exports = function (e, t) {
    return Qt[e] || (Qt[e] = void 0 !== t ? t : {});
  })('versions', []).push({
    version: '3.30.0',
    mode: 'pure',
    copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.30.0/LICENSE',
    source: 'https://github.com/zloirock/core-js',
  });
  var en = rt,
    tn = Object,
    nn = function (e) {
      return tn(en(e));
    },
    rn = nn,
    an = Ne({}.hasOwnProperty),
    on =
      Object.hasOwn ||
      function (e, t) {
        return an(rn(e), t);
      },
    cn = Ne,
    un = 0,
    ln = Math.random(),
    sn = cn((1).toString),
    fn = function (e) {
      return 'Symbol(' + (void 0 === e ? '' : e) + ')_' + sn(++un + ln, 36);
    },
    dn = me,
    mn = Xt.exports,
    pn = on,
    vn = fn,
    hn = Tt,
    gn = Ct,
    yn = dn.Symbol,
    bn = mn('wks'),
    wn = gn ? yn.for || yn : (yn && yn.withoutSetter) || vn,
    xn = function (e) {
      return pn(bn, e) || (bn[e] = hn && pn(yn, e) ? yn[e] : wn('Symbol.' + e)), bn[e];
    },
    En = Be,
    kn = lt,
    Sn = Pt,
    Nn = Ut,
    On = function (e, t) {
      var n, r;
      if ('string' === t && Vt((n = e.toString)) && !Wt((r = Yt(n, e)))) return r;
      if (Vt((n = e.valueOf)) && !Wt((r = Yt(n, e)))) return r;
      if ('string' !== t && Vt((n = e.toString)) && !Wt((r = Yt(n, e)))) return r;
      throw Gt("Can't convert object to primitive value");
    },
    Tn = TypeError,
    Cn = xn('toPrimitive'),
    An = function (e, t) {
      if (!kn(e) || Sn(e)) return e;
      var n,
        r = Nn(e, Cn);
      if (r) {
        if ((void 0 === t && (t = 'default'), (n = En(r, e, t)), !kn(n) || Sn(n))) return n;
        throw Tn("Can't convert object to primitive value");
      }
      return void 0 === t && (t = 'number'), On(e, t);
    },
    Rn = Pt,
    jn = function (e) {
      var t = An(e, 'string');
      return Rn(t) ? t : t + '';
    },
    In = lt,
    Pn = me.document,
    Mn = In(Pn) && In(Pn.createElement),
    Ln = function (e) {
      return Mn ? Pn.createElement(e) : {};
    },
    _n = Ln,
    Dn =
      !Fe &&
      !pe(function () {
        return (
          7 !=
          Object.defineProperty(_n('div'), 'a', {
            get: function () {
              return 7;
            },
          }).a
        );
      }),
    Fn = Fe,
    zn = Be,
    Hn = Ue,
    Bn = $e,
    Un = it,
    Yn = jn,
    Vn = on,
    Wn = Dn,
    Gn = Object.getOwnPropertyDescriptor;
  De.f = Fn
    ? Gn
    : function (e, t) {
        if (((e = Un(e)), (t = Yn(t)), Wn))
          try {
            return Gn(e, t);
          } catch (e) {}
        if (Vn(e, t)) return Bn(!zn(Hn.f, e, t), e[t]);
      };
  var Xn = pe,
    $n = _e,
    qn = /#|\.prototype\./,
    Kn = function (e, t) {
      var n = Zn[Jn(e)];
      return n == er || (n != Qn && ($n(t) ? Xn(t) : !!t));
    },
    Jn = (Kn.normalize = function (e) {
      return String(e).replace(qn, '.').toLowerCase();
    }),
    Zn = (Kn.data = {}),
    Qn = (Kn.NATIVE = 'N'),
    er = (Kn.POLYFILL = 'P'),
    tr = Kn,
    nr = zt,
    rr = ve,
    ar = Ie(Ie.bind),
    or = function (e, t) {
      return (
        nr(e),
        void 0 === t
          ? e
          : rr
          ? ar(e, t)
          : function () {
              return e.apply(t, arguments);
            }
      );
    },
    ir = {},
    cr =
      Fe &&
      pe(function () {
        return (
          42 !=
          Object.defineProperty(function () {}, 'prototype', { value: 42, writable: !1 }).prototype
        );
      }),
    ur = lt,
    lr = String,
    sr = TypeError,
    fr = function (e) {
      if (ur(e)) return e;
      throw sr(lr(e) + ' is not an object');
    },
    dr = Fe,
    mr = Dn,
    pr = cr,
    vr = fr,
    hr = jn,
    gr = TypeError,
    yr = Object.defineProperty,
    br = Object.getOwnPropertyDescriptor,
    wr = 'enumerable',
    xr = 'configurable',
    Er = 'writable';
  ir.f = dr
    ? pr
      ? function (e, t, n) {
          if (
            (vr(e),
            (t = hr(t)),
            vr(n),
            'function' == typeof e && 'prototype' === t && 'value' in n && Er in n && !n[Er])
          ) {
            var r = br(e, t);
            r &&
              r[Er] &&
              ((e[t] = n.value),
              (n = {
                configurable: xr in n ? n[xr] : r[xr],
                enumerable: wr in n ? n[wr] : r[wr],
                writable: !1,
              }));
          }
          return yr(e, t, n);
        }
      : yr
    : function (e, t, n) {
        if ((vr(e), (t = hr(t)), vr(n), mr))
          try {
            return yr(e, t, n);
          } catch (e) {}
        if ('get' in n || 'set' in n) throw gr('Accessors not supported');
        return 'value' in n && (e[t] = n.value), e;
      };
  var kr = ir,
    Sr = $e,
    Nr = Fe
      ? function (e, t, n) {
          return kr.f(e, t, Sr(1, n));
        }
      : function (e, t, n) {
          return (e[t] = n), e;
        },
    Or = me,
    Tr = we,
    Cr = Ie,
    Ar = _e,
    Rr = De.f,
    jr = tr,
    Ir = st,
    Pr = or,
    Mr = Nr,
    Lr = on,
    _r = function (e) {
      var t = function (n, r, a) {
        if (this instanceof t) {
          switch (arguments.length) {
            case 0:
              return new e();
            case 1:
              return new e(n);
            case 2:
              return new e(n, r);
          }
          return new e(n, r, a);
        }
        return Tr(e, this, arguments);
      };
      return (t.prototype = e.prototype), t;
    },
    Dr = function (e, t) {
      var n,
        r,
        a,
        o,
        i,
        c,
        u,
        l,
        s,
        f = e.target,
        d = e.global,
        m = e.stat,
        p = e.proto,
        v = d ? Or : m ? Or[f] : (Or[f] || {}).prototype,
        h = d ? Ir : Ir[f] || Mr(Ir, f, {})[f],
        g = h.prototype;
      for (o in t)
        (r = !(n = jr(d ? o : f + (m ? '.' : '#') + o, e.forced)) && v && Lr(v, o)),
          (c = h[o]),
          r && (u = e.dontCallGetSet ? (s = Rr(v, o)) && s.value : v[o]),
          (i = r && u ? u : t[o]),
          (r && typeof c == typeof i) ||
            ((l = e.bind && r ? Pr(i, Or) : e.wrap && r ? _r(i) : p && Ar(i) ? Cr(i) : i),
            (e.sham || (i && i.sham) || (c && c.sham)) && Mr(l, 'sham', !0),
            Mr(h, o, l),
            p &&
              (Lr(Ir, (a = f + 'Prototype')) || Mr(Ir, a, {}),
              Mr(Ir[a], o, i),
              e.real && g && (n || !g[o]) && Mr(g, o, i)));
    },
    Fr = Xt.exports,
    zr = fn,
    Hr = Fr('keys'),
    Br = function (e) {
      return Hr[e] || (Hr[e] = zr(e));
    },
    Ur = !pe(function () {
      function e() {}
      return (e.prototype.constructor = null), Object.getPrototypeOf(new e()) !== e.prototype;
    }),
    Yr = on,
    Vr = _e,
    Wr = nn,
    Gr = Ur,
    Xr = Br('IE_PROTO'),
    $r = Object,
    qr = $r.prototype,
    Kr = Gr
      ? $r.getPrototypeOf
      : function (e) {
          var t = Wr(e);
          if (Yr(t, Xr)) return t[Xr];
          var n = t.constructor;
          return Vr(n) && t instanceof n ? n.prototype : t instanceof $r ? qr : null;
        },
    Jr = Ne,
    Zr = zt,
    Qr = _e,
    ea = String,
    ta = TypeError,
    na = function (e, t, n) {
      try {
        return Jr(Zr(Object.getOwnPropertyDescriptor(e, t)[n]));
      } catch (e) {}
    },
    ra = fr,
    aa = function (e) {
      if ('object' == typeof e || Qr(e)) return e;
      throw ta("Can't set " + ea(e) + ' as a prototype');
    },
    oa =
      Object.setPrototypeOf ||
      ('__proto__' in {}
        ? (function () {
            var e,
              t = !1,
              n = {};
            try {
              (e = na(Object.prototype, '__proto__', 'set'))(n, []), (t = n instanceof Array);
            } catch (e) {}
            return function (n, r) {
              return ra(n), aa(r), t ? e(n, r) : (n.__proto__ = r), n;
            };
          })()
        : void 0),
    ia = {},
    ca = Math.ceil,
    ua = Math.floor,
    la =
      Math.trunc ||
      function (e) {
        var t = +e;
        return (t > 0 ? ua : ca)(t);
      },
    sa = function (e) {
      var t = +e;
      return t != t || 0 === t ? 0 : la(t);
    },
    fa = sa,
    da = Math.max,
    ma = Math.min,
    pa = function (e, t) {
      var n = fa(e);
      return n < 0 ? da(n + t, 0) : ma(n, t);
    },
    va = sa,
    ha = Math.min,
    ga = function (e) {
      return e > 0 ? ha(va(e), 9007199254740991) : 0;
    },
    ya = function (e) {
      return ga(e.length);
    },
    ba = it,
    wa = pa,
    xa = ya,
    Ea = function (e) {
      return function (t, n, r) {
        var a,
          o = ba(t),
          i = xa(o),
          c = wa(r, i);
        if (e && n != n) {
          for (; i > c; ) if ((a = o[c++]) != a) return !0;
        } else for (; i > c; c++) if ((e || c in o) && o[c] === n) return e || c || 0;
        return !e && -1;
      };
    },
    ka = { includes: Ea(!0), indexOf: Ea(!1) },
    Sa = {},
    Na = on,
    Oa = it,
    Ta = ka.indexOf,
    Ca = Sa,
    Aa = Ne([].push),
    Ra = function (e, t) {
      var n,
        r = Oa(e),
        a = 0,
        o = [];
      for (n in r) !Na(Ca, n) && Na(r, n) && Aa(o, n);
      for (; t.length > a; ) Na(r, (n = t[a++])) && (~Ta(o, n) || Aa(o, n));
      return o;
    },
    ja = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf',
    ],
    Ia = Ra,
    Pa = ja.concat('length', 'prototype');
  ia.f =
    Object.getOwnPropertyNames ||
    function (e) {
      return Ia(e, Pa);
    };
  var Ma = {};
  Ma.f = Object.getOwnPropertySymbols;
  var La = vt,
    _a = ia,
    Da = Ma,
    Fa = fr,
    za = Ne([].concat),
    Ha =
      La('Reflect', 'ownKeys') ||
      function (e) {
        var t = _a.f(Fa(e)),
          n = Da.f;
        return n ? za(t, n(e)) : t;
      },
    Ba = on,
    Ua = Ha,
    Ya = De,
    Va = ir,
    Wa = {},
    Ga = Ra,
    Xa = ja,
    $a =
      Object.keys ||
      function (e) {
        return Ga(e, Xa);
      },
    qa = Fe,
    Ka = cr,
    Ja = ir,
    Za = fr,
    Qa = it,
    eo = $a;
  Wa.f =
    qa && !Ka
      ? Object.defineProperties
      : function (e, t) {
          Za(e);
          for (var n, r = Qa(t), a = eo(t), o = a.length, i = 0; o > i; )
            Ja.f(e, (n = a[i++]), r[n]);
          return e;
        };
  var to,
    no = vt('document', 'documentElement'),
    ro = fr,
    ao = Wa,
    oo = ja,
    io = Sa,
    co = no,
    uo = Ln,
    lo = 'prototype',
    so = 'script',
    fo = Br('IE_PROTO'),
    mo = function () {},
    po = function (e) {
      return '<' + so + '>' + e + '</' + so + '>';
    },
    vo = function (e) {
      e.write(po('')), e.close();
      var t = e.parentWindow.Object;
      return (e = null), t;
    },
    ho = function () {
      try {
        to = new ActiveXObject('htmlfile');
      } catch (e) {}
      var e, t, n;
      ho =
        'undefined' != typeof document
          ? document.domain && to
            ? vo(to)
            : ((t = uo('iframe')),
              (n = 'java' + so + ':'),
              (t.style.display = 'none'),
              co.appendChild(t),
              (t.src = String(n)),
              (e = t.contentWindow.document).open(),
              e.write(po('document.F=Object')),
              e.close(),
              e.F)
          : vo(to);
      for (var r = oo.length; r--; ) delete ho[lo][oo[r]];
      return ho();
    };
  io[fo] = !0;
  var go =
      Object.create ||
      function (e, t) {
        var n;
        return (
          null !== e
            ? ((mo[lo] = ro(e)), (n = new mo()), (mo[lo] = null), (n[fo] = e))
            : (n = ho()),
          void 0 === t ? n : ao.f(n, t)
        );
      },
    yo = lt,
    bo = Nr,
    wo = Error,
    xo = Ne(''.replace),
    Eo = String(wo('zxcasd').stack),
    ko = /\n\s*at [^:]*:[^\n]*/,
    So = ko.test(Eo),
    No = $e,
    Oo = !pe(function () {
      var e = Error('a');
      return !('stack' in e) || (Object.defineProperty(e, 'stack', No(1, 7)), 7 !== e.stack);
    }),
    To = Nr,
    Co = function (e, t) {
      if (So && 'string' == typeof e && !wo.prepareStackTrace) for (; t--; ) e = xo(e, ko, '');
      return e;
    },
    Ao = Oo,
    Ro = Error.captureStackTrace,
    jo = {},
    Io = jo,
    Po = xn('iterator'),
    Mo = Array.prototype,
    Lo = function (e) {
      return void 0 !== e && (Io.Array === e || Mo[Po] === e);
    },
    _o = {};
  _o[xn('toStringTag')] = 'z';
  var Do = '[object z]' === String(_o),
    Fo = Do,
    zo = _e,
    Ho = Ae,
    Bo = xn('toStringTag'),
    Uo = Object,
    Yo =
      'Arguments' ==
      Ho(
        (function () {
          return arguments;
        })(),
      ),
    Vo = Fo
      ? Ho
      : function (e) {
          var t, n, r;
          return void 0 === e
            ? 'Undefined'
            : null === e
            ? 'Null'
            : 'string' ==
              typeof (n = (function (e, t) {
                try {
                  return e[t];
                } catch (e) {}
              })((t = Uo(e)), Bo))
            ? n
            : Yo
            ? Ho(t)
            : 'Object' == (r = Ho(t)) && zo(t.callee)
            ? 'Arguments'
            : r;
        },
    Wo = Vo,
    Go = Ut,
    Xo = et,
    $o = jo,
    qo = xn('iterator'),
    Ko = function (e) {
      if (!Xo(e)) return Go(e, qo) || Go(e, '@@iterator') || $o[Wo(e)];
    },
    Jo = Be,
    Zo = zt,
    Qo = fr,
    ei = Lt,
    ti = Ko,
    ni = TypeError,
    ri = function (e, t) {
      var n = arguments.length < 2 ? ti(e) : t;
      if (Zo(n)) return Qo(Jo(n, e));
      throw ni(ei(e) + ' is not iterable');
    },
    ai = Be,
    oi = fr,
    ii = Ut,
    ci = function (e, t, n) {
      var r, a;
      oi(e);
      try {
        if (!(r = ii(e, 'return'))) {
          if ('throw' === t) throw n;
          return n;
        }
        r = ai(r, e);
      } catch (e) {
        (a = !0), (r = e);
      }
      if ('throw' === t) throw n;
      if (a) throw r;
      return oi(r), n;
    },
    ui = or,
    li = Be,
    si = fr,
    fi = Lt,
    di = Lo,
    mi = ya,
    pi = ht,
    vi = ri,
    hi = Ko,
    gi = ci,
    yi = TypeError,
    bi = function (e, t) {
      (this.stopped = e), (this.result = t);
    },
    wi = bi.prototype,
    xi = function (e, t, n) {
      var r,
        a,
        o,
        i,
        c,
        u,
        l,
        s = n && n.that,
        f = !(!n || !n.AS_ENTRIES),
        d = !(!n || !n.IS_RECORD),
        m = !(!n || !n.IS_ITERATOR),
        p = !(!n || !n.INTERRUPTED),
        v = ui(t, s),
        h = function (e) {
          return r && gi(r, 'normal', e), new bi(!0, e);
        },
        g = function (e) {
          return f ? (si(e), p ? v(e[0], e[1], h) : v(e[0], e[1])) : p ? v(e, h) : v(e);
        };
      if (d) r = e.iterator;
      else if (m) r = e;
      else {
        if (!(a = hi(e))) throw yi(fi(e) + ' is not iterable');
        if (di(a)) {
          for (o = 0, i = mi(e); i > o; o++) if ((c = g(e[o])) && pi(wi, c)) return c;
          return new bi(!1);
        }
        r = vi(e, a);
      }
      for (u = d ? e.next : r.next; !(l = li(u, r)).done; ) {
        try {
          c = g(l.value);
        } catch (e) {
          gi(r, 'throw', e);
        }
        if ('object' == typeof c && c && pi(wi, c)) return c;
      }
      return new bi(!1);
    },
    Ei = Vo,
    ki = String,
    Si = function (e) {
      if ('Symbol' === Ei(e)) throw TypeError('Cannot convert a Symbol value to a string');
      return ki(e);
    },
    Ni = Si,
    Oi = Dr,
    Ti = ht,
    Ci = Kr,
    Ai = oa,
    Ri = function (e, t, n) {
      for (var r = Ua(t), a = Va.f, o = Ya.f, i = 0; i < r.length; i++) {
        var c = r[i];
        Ba(e, c) || (n && Ba(n, c)) || a(e, c, o(t, c));
      }
    },
    ji = go,
    Ii = Nr,
    Pi = $e,
    Mi = function (e, t) {
      yo(t) && 'cause' in t && bo(e, 'cause', t.cause);
    },
    Li = function (e, t, n, r) {
      Ao && (Ro ? Ro(e, t) : To(e, 'stack', Co(n, r)));
    },
    _i = xi,
    Di = function (e, t) {
      return void 0 === e ? (arguments.length < 2 ? '' : t) : Ni(e);
    },
    Fi = xn('toStringTag'),
    zi = Error,
    Hi = [].push,
    Bi = function (e, t) {
      var n,
        r = Ti(Ui, this);
      Ai ? (n = Ai(zi(), r ? Ci(this) : Ui)) : ((n = r ? this : ji(Ui)), Ii(n, Fi, 'Error')),
        void 0 !== t && Ii(n, 'message', Di(t)),
        Li(n, Bi, n.stack, 1),
        arguments.length > 2 && Mi(n, arguments[2]);
      var a = [];
      return _i(e, Hi, { that: a }), Ii(n, 'errors', a), n;
    };
  Ai ? Ai(Bi, zi) : Ri(Bi, zi, { name: !0 });
  var Ui = (Bi.prototype = ji(zi.prototype, {
    constructor: Pi(1, Bi),
    message: Pi(1, ''),
    name: Pi(1, 'AggregateError'),
  }));
  Oi({ global: !0, constructor: !0, arity: 2 }, { AggregateError: Bi });
  var Yi,
    Vi,
    Wi,
    Gi = _e,
    Xi = me.WeakMap,
    $i = Gi(Xi) && /native code/.test(String(Xi)),
    qi = me,
    Ki = lt,
    Ji = Nr,
    Zi = on,
    Qi = Zt,
    ec = Br,
    tc = Sa,
    nc = 'Object already initialized',
    rc = qi.TypeError,
    ac = qi.WeakMap;
  if ($i || Qi.state) {
    var oc = Qi.state || (Qi.state = new ac());
    (oc.get = oc.get),
      (oc.has = oc.has),
      (oc.set = oc.set),
      (Yi = function (e, t) {
        if (oc.has(e)) throw rc(nc);
        return (t.facade = e), oc.set(e, t), t;
      }),
      (Vi = function (e) {
        return oc.get(e) || {};
      }),
      (Wi = function (e) {
        return oc.has(e);
      });
  } else {
    var ic = ec('state');
    (tc[ic] = !0),
      (Yi = function (e, t) {
        if (Zi(e, ic)) throw rc(nc);
        return (t.facade = e), Ji(e, ic, t), t;
      }),
      (Vi = function (e) {
        return Zi(e, ic) ? e[ic] : {};
      }),
      (Wi = function (e) {
        return Zi(e, ic);
      });
  }
  var cc,
    uc,
    lc,
    sc = {
      set: Yi,
      get: Vi,
      has: Wi,
      enforce: function (e) {
        return Wi(e) ? Vi(e) : Yi(e, {});
      },
      getterFor: function (e) {
        return function (t) {
          var n;
          if (!Ki(t) || (n = Vi(t)).type !== e)
            throw rc('Incompatible receiver, ' + e + ' required');
          return n;
        };
      },
    },
    fc = Fe,
    dc = on,
    mc = Function.prototype,
    pc = fc && Object.getOwnPropertyDescriptor,
    vc = dc(mc, 'name'),
    hc = {
      EXISTS: vc,
      PROPER: vc && 'something' === function () {}.name,
      CONFIGURABLE: vc && (!fc || (fc && pc(mc, 'name').configurable)),
    },
    gc = Nr,
    yc = function (e, t, n, r) {
      return r && r.enumerable ? (e[t] = n) : gc(e, t, n), e;
    },
    bc = pe,
    wc = _e,
    xc = lt,
    Ec = go,
    kc = Kr,
    Sc = yc,
    Nc = xn('iterator'),
    Oc = !1;
  [].keys &&
    ('next' in (lc = [].keys()) ? (uc = kc(kc(lc))) !== Object.prototype && (cc = uc) : (Oc = !0));
  var Tc =
    !xc(cc) ||
    bc(function () {
      var e = {};
      return cc[Nc].call(e) !== e;
    });
  wc((cc = Tc ? {} : Ec(cc))[Nc]) ||
    Sc(cc, Nc, function () {
      return this;
    });
  var Cc = { IteratorPrototype: cc, BUGGY_SAFARI_ITERATORS: Oc },
    Ac = Vo,
    Rc = Do
      ? {}.toString
      : function () {
          return '[object ' + Ac(this) + ']';
        },
    jc = Do,
    Ic = ir.f,
    Pc = Nr,
    Mc = on,
    Lc = Rc,
    _c = xn('toStringTag'),
    Dc = function (e, t, n, r) {
      if (e) {
        var a = n ? e : e.prototype;
        Mc(a, _c) || Ic(a, _c, { configurable: !0, value: t }), r && !jc && Pc(a, 'toString', Lc);
      }
    },
    Fc = Cc.IteratorPrototype,
    zc = go,
    Hc = $e,
    Bc = Dc,
    Uc = jo,
    Yc = function () {
      return this;
    },
    Vc = Dr,
    Wc = Be,
    Gc = hc,
    Xc = function (e, t, n, r) {
      var a = t + ' Iterator';
      return (e.prototype = zc(Fc, { next: Hc(+!r, n) })), Bc(e, a, !1, !0), (Uc[a] = Yc), e;
    },
    $c = Kr,
    qc = Dc,
    Kc = yc,
    Jc = jo,
    Zc = Cc,
    Qc = Gc.PROPER,
    eu = Zc.BUGGY_SAFARI_ITERATORS,
    tu = xn('iterator'),
    nu = 'keys',
    ru = 'values',
    au = 'entries',
    ou = function () {
      return this;
    },
    iu = function (e, t, n, r, a, o, i) {
      Xc(n, t, r);
      var c,
        u,
        l,
        s = function (e) {
          if (e === a && v) return v;
          if (!eu && e in m) return m[e];
          switch (e) {
            case nu:
            case ru:
            case au:
              return function () {
                return new n(this, e);
              };
          }
          return function () {
            return new n(this);
          };
        },
        f = t + ' Iterator',
        d = !1,
        m = e.prototype,
        p = m[tu] || m['@@iterator'] || (a && m[a]),
        v = (!eu && p) || s(a),
        h = ('Array' == t && m.entries) || p;
      if (
        (h &&
          (c = $c(h.call(new e()))) !== Object.prototype &&
          c.next &&
          (qc(c, f, !0, !0), (Jc[f] = ou)),
        Qc &&
          a == ru &&
          p &&
          p.name !== ru &&
          ((d = !0),
          (v = function () {
            return Wc(p, this);
          })),
        a)
      )
        if (((u = { values: s(ru), keys: o ? v : s(nu), entries: s(au) }), i))
          for (l in u) (eu || d || !(l in m)) && Kc(m, l, u[l]);
        else Vc({ target: t, proto: !0, forced: eu || d }, u);
      return i && m[tu] !== v && Kc(m, tu, v, { name: a }), (Jc[t] = v), u;
    },
    cu = function (e, t) {
      return { value: e, done: t };
    },
    uu = it,
    lu = function () {},
    su = jo,
    fu = sc,
    du = (ir.f, iu),
    mu = cu,
    pu = 'Array Iterator',
    vu = fu.set,
    hu = fu.getterFor(pu);
  du(
    Array,
    'Array',
    function (e, t) {
      vu(this, { type: pu, target: uu(e), index: 0, kind: t });
    },
    function () {
      var e = hu(this),
        t = e.target,
        n = e.kind,
        r = e.index++;
      return !t || r >= t.length
        ? ((e.target = void 0), mu(void 0, !0))
        : mu('keys' == n ? r : 'values' == n ? t[r] : [r, t[r]], !1);
    },
    'values',
  );
  su.Arguments = su.Array;
  lu(), lu(), lu();
  var gu = 'undefined' != typeof process && 'process' == Ae(process),
    yu = ir,
    bu = function (e, t, n) {
      return yu.f(e, t, n);
    },
    wu = vt,
    xu = bu,
    Eu = Fe,
    ku = xn('species'),
    Su = ht,
    Nu = TypeError,
    Ou = _e,
    Tu = Zt,
    Cu = Ne(Function.toString);
  Ou(Tu.inspectSource) ||
    (Tu.inspectSource = function (e) {
      return Cu(e);
    });
  var Au = Tu.inspectSource,
    Ru = Ne,
    ju = pe,
    Iu = _e,
    Pu = Vo,
    Mu = Au,
    Lu = function () {},
    _u = [],
    Du = vt('Reflect', 'construct'),
    Fu = /^\s*(?:class|function)\b/,
    zu = Ru(Fu.exec),
    Hu = !Fu.exec(Lu),
    Bu = function (e) {
      if (!Iu(e)) return !1;
      try {
        return Du(Lu, _u, e), !0;
      } catch (e) {
        return !1;
      }
    },
    Uu = function (e) {
      if (!Iu(e)) return !1;
      switch (Pu(e)) {
        case 'AsyncFunction':
        case 'GeneratorFunction':
        case 'AsyncGeneratorFunction':
          return !1;
      }
      try {
        return Hu || !!zu(Fu, Mu(e));
      } catch (e) {
        return !0;
      }
    };
  Uu.sham = !0;
  var Yu,
    Vu,
    Wu,
    Gu,
    Xu =
      !Du ||
      ju(function () {
        var e;
        return (
          Bu(Bu.call) ||
          !Bu(Object) ||
          !Bu(function () {
            e = !0;
          }) ||
          e
        );
      })
        ? Uu
        : Bu,
    $u = Xu,
    qu = Lt,
    Ku = TypeError,
    Ju = function (e) {
      if ($u(e)) return e;
      throw Ku(qu(e) + ' is not a constructor');
    },
    Zu = fr,
    Qu = Ju,
    el = et,
    tl = xn('species'),
    nl = function (e, t) {
      var n,
        r = Zu(e).constructor;
      return void 0 === r || el((n = Zu(r)[tl])) ? t : Qu(n);
    },
    rl = Ne([].slice),
    al = TypeError,
    ol = /(?:ipad|iphone|ipod).*applewebkit/i.test(gt),
    il = me,
    cl = we,
    ul = or,
    ll = _e,
    sl = on,
    fl = pe,
    dl = no,
    ml = rl,
    pl = Ln,
    vl = function (e, t) {
      if (e < t) throw al('Not enough arguments');
      return e;
    },
    hl = ol,
    gl = gu,
    yl = il.setImmediate,
    bl = il.clearImmediate,
    wl = il.process,
    xl = il.Dispatch,
    El = il.Function,
    kl = il.MessageChannel,
    Sl = il.String,
    Nl = 0,
    Ol = {},
    Tl = 'onreadystatechange';
  fl(function () {
    Yu = il.location;
  });
  var Cl = function (e) {
      if (sl(Ol, e)) {
        var t = Ol[e];
        delete Ol[e], t();
      }
    },
    Al = function (e) {
      return function () {
        Cl(e);
      };
    },
    Rl = function (e) {
      Cl(e.data);
    },
    jl = function (e) {
      il.postMessage(Sl(e), Yu.protocol + '//' + Yu.host);
    };
  (yl && bl) ||
    ((yl = function (e) {
      vl(arguments.length, 1);
      var t = ll(e) ? e : El(e),
        n = ml(arguments, 1);
      return (
        (Ol[++Nl] = function () {
          cl(t, void 0, n);
        }),
        Vu(Nl),
        Nl
      );
    }),
    (bl = function (e) {
      delete Ol[e];
    }),
    gl
      ? (Vu = function (e) {
          wl.nextTick(Al(e));
        })
      : xl && xl.now
      ? (Vu = function (e) {
          xl.now(Al(e));
        })
      : kl && !hl
      ? ((Gu = (Wu = new kl()).port2), (Wu.port1.onmessage = Rl), (Vu = ul(Gu.postMessage, Gu)))
      : il.addEventListener &&
        ll(il.postMessage) &&
        !il.importScripts &&
        Yu &&
        'file:' !== Yu.protocol &&
        !fl(jl)
      ? ((Vu = jl), il.addEventListener('message', Rl, !1))
      : (Vu =
          Tl in pl('script')
            ? function (e) {
                dl.appendChild(pl('script'))[Tl] = function () {
                  dl.removeChild(this), Cl(e);
                };
              }
            : function (e) {
                setTimeout(Al(e), 0);
              }));
  var Il = { set: yl, clear: bl },
    Pl = function () {
      (this.head = null), (this.tail = null);
    };
  Pl.prototype = {
    add: function (e) {
      var t = { item: e, next: null },
        n = this.tail;
      n ? (n.next = t) : (this.head = t), (this.tail = t);
    },
    get: function () {
      var e = this.head;
      if (e) return null === (this.head = e.next) && (this.tail = null), e.item;
    },
  };
  var Ml,
    Ll,
    _l,
    Dl,
    Fl,
    zl = Pl,
    Hl = /ipad|iphone|ipod/i.test(gt) && 'undefined' != typeof Pebble,
    Bl = /web0s(?!.*chrome)/i.test(gt),
    Ul = me,
    Yl = or,
    Vl = De.f,
    Wl = Il.set,
    Gl = zl,
    Xl = ol,
    $l = Hl,
    ql = Bl,
    Kl = gu,
    Jl = Ul.MutationObserver || Ul.WebKitMutationObserver,
    Zl = Ul.document,
    Ql = Ul.process,
    es = Ul.Promise,
    ts = Vl(Ul, 'queueMicrotask'),
    ns = ts && ts.value;
  if (!ns) {
    var rs = new Gl(),
      as = function () {
        var e, t;
        for (Kl && (e = Ql.domain) && e.exit(); (t = rs.get()); )
          try {
            t();
          } catch (e) {
            throw (rs.head && Ml(), e);
          }
        e && e.enter();
      };
    Xl || Kl || ql || !Jl || !Zl
      ? !$l && es && es.resolve
        ? (((Dl = es.resolve(void 0)).constructor = es),
          (Fl = Yl(Dl.then, Dl)),
          (Ml = function () {
            Fl(as);
          }))
        : Kl
        ? (Ml = function () {
            Ql.nextTick(as);
          })
        : ((Wl = Yl(Wl, Ul)),
          (Ml = function () {
            Wl(as);
          }))
      : ((Ll = !0),
        (_l = Zl.createTextNode('')),
        new Jl(as).observe(_l, { characterData: !0 }),
        (Ml = function () {
          _l.data = Ll = !Ll;
        })),
      (ns = function (e) {
        rs.head || Ml(), rs.add(e);
      });
  }
  var os = ns,
    is = function (e) {
      try {
        return { error: !1, value: e() };
      } catch (e) {
        return { error: !0, value: e };
      }
    },
    cs = me.Promise,
    us = 'object' == typeof Deno && Deno && 'object' == typeof Deno.version,
    ls = !us && !gu && 'object' == typeof window && 'object' == typeof document,
    ss = me,
    fs = cs,
    ds = _e,
    ms = tr,
    ps = Au,
    vs = xn,
    hs = ls,
    gs = us,
    ys = St,
    bs = fs && fs.prototype,
    ws = vs('species'),
    xs = !1,
    Es = ds(ss.PromiseRejectionEvent),
    ks = ms('Promise', function () {
      var e = ps(fs),
        t = e !== String(fs);
      if (!t && 66 === ys) return !0;
      if (!bs.catch || !bs.finally) return !0;
      if (!ys || ys < 51 || !/native code/.test(e)) {
        var n = new fs(function (e) {
            e(1);
          }),
          r = function (e) {
            e(
              function () {},
              function () {},
            );
          };
        if ((((n.constructor = {})[ws] = r), !(xs = n.then(function () {}) instanceof r)))
          return !0;
      }
      return !t && (hs || gs) && !Es;
    }),
    Ss = { CONSTRUCTOR: ks, REJECTION_EVENT: Es, SUBCLASSING: xs },
    Ns = {},
    Os = zt,
    Ts = TypeError,
    Cs = function (e) {
      var t, n;
      (this.promise = new e(function (e, r) {
        if (void 0 !== t || void 0 !== n) throw Ts('Bad Promise constructor');
        (t = e), (n = r);
      })),
        (this.resolve = Os(t)),
        (this.reject = Os(n));
    };
  Ns.f = function (e) {
    return new Cs(e);
  };
  var As,
    Rs,
    js = Dr,
    Is = gu,
    Ps = me,
    Ms = Be,
    Ls = yc,
    _s = Dc,
    Ds = function (e) {
      var t = wu(e);
      Eu &&
        t &&
        !t[ku] &&
        xu(t, ku, {
          configurable: !0,
          get: function () {
            return this;
          },
        });
    },
    Fs = zt,
    zs = _e,
    Hs = lt,
    Bs = function (e, t) {
      if (Su(t, e)) return e;
      throw Nu('Incorrect invocation');
    },
    Us = nl,
    Ys = Il.set,
    Vs = os,
    Ws = function (e, t) {},
    Gs = is,
    Xs = zl,
    $s = sc,
    qs = cs,
    Ks = Ss,
    Js = Ns,
    Zs = 'Promise',
    Qs = Ks.CONSTRUCTOR,
    ef = Ks.REJECTION_EVENT,
    tf = $s.getterFor(Zs),
    nf = $s.set,
    rf = qs && qs.prototype,
    af = qs,
    of = rf,
    cf = Ps.TypeError,
    uf = Ps.document,
    lf = Ps.process,
    sf = Js.f,
    ff = sf,
    df = !!(uf && uf.createEvent && Ps.dispatchEvent),
    mf = 'unhandledrejection',
    pf = function (e) {
      var t;
      return !(!Hs(e) || !zs((t = e.then))) && t;
    },
    vf = function (e, t) {
      var n,
        r,
        a,
        o = t.value,
        i = 1 == t.state,
        c = i ? e.ok : e.fail,
        u = e.resolve,
        l = e.reject,
        s = e.domain;
      try {
        c
          ? (i || (2 === t.rejection && wf(t), (t.rejection = 1)),
            !0 === c ? (n = o) : (s && s.enter(), (n = c(o)), s && (s.exit(), (a = !0))),
            n === e.promise ? l(cf('Promise-chain cycle')) : (r = pf(n)) ? Ms(r, n, u, l) : u(n))
          : l(o);
      } catch (e) {
        s && !a && s.exit(), l(e);
      }
    },
    hf = function (e, t) {
      e.notified ||
        ((e.notified = !0),
        Vs(function () {
          for (var n, r = e.reactions; (n = r.get()); ) vf(n, e);
          (e.notified = !1), t && !e.rejection && yf(e);
        }));
    },
    gf = function (e, t, n) {
      var r, a;
      df
        ? (((r = uf.createEvent('Event')).promise = t),
          (r.reason = n),
          r.initEvent(e, !1, !0),
          Ps.dispatchEvent(r))
        : (r = { promise: t, reason: n }),
        !ef && (a = Ps['on' + e]) ? a(r) : e === mf && Ws('Unhandled promise rejection', n);
    },
    yf = function (e) {
      Ms(Ys, Ps, function () {
        var t,
          n = e.facade,
          r = e.value;
        if (
          bf(e) &&
          ((t = Gs(function () {
            Is ? lf.emit('unhandledRejection', r, n) : gf(mf, n, r);
          })),
          (e.rejection = Is || bf(e) ? 2 : 1),
          t.error)
        )
          throw t.value;
      });
    },
    bf = function (e) {
      return 1 !== e.rejection && !e.parent;
    },
    wf = function (e) {
      Ms(Ys, Ps, function () {
        var t = e.facade;
        Is ? lf.emit('rejectionHandled', t) : gf('rejectionhandled', t, e.value);
      });
    },
    xf = function (e, t, n) {
      return function (r) {
        e(t, r, n);
      };
    },
    Ef = function (e, t, n) {
      e.done || ((e.done = !0), n && (e = n), (e.value = t), (e.state = 2), hf(e, !0));
    },
    kf = function (e, t, n) {
      if (!e.done) {
        (e.done = !0), n && (e = n);
        try {
          if (e.facade === t) throw cf("Promise can't be resolved itself");
          var r = pf(t);
          r
            ? Vs(function () {
                var n = { done: !1 };
                try {
                  Ms(r, t, xf(kf, n, e), xf(Ef, n, e));
                } catch (t) {
                  Ef(n, t, e);
                }
              })
            : ((e.value = t), (e.state = 1), hf(e, !1));
        } catch (t) {
          Ef({ done: !1 }, t, e);
        }
      }
    };
  Qs &&
    ((of = (af = function (e) {
      Bs(this, of), Fs(e), Ms(As, this);
      var t = tf(this);
      try {
        e(xf(kf, t), xf(Ef, t));
      } catch (e) {
        Ef(t, e);
      }
    }).prototype),
    ((As = function (e) {
      nf(this, {
        type: Zs,
        done: !1,
        notified: !1,
        parent: !1,
        reactions: new Xs(),
        rejection: !1,
        state: 0,
        value: void 0,
      });
    }).prototype = Ls(of, 'then', function (e, t) {
      var n = tf(this),
        r = sf(Us(this, af));
      return (
        (n.parent = !0),
        (r.ok = !zs(e) || e),
        (r.fail = zs(t) && t),
        (r.domain = Is ? lf.domain : void 0),
        0 == n.state
          ? n.reactions.add(r)
          : Vs(function () {
              vf(r, n);
            }),
        r.promise
      );
    })),
    (Rs = function () {
      var e = new As(),
        t = tf(e);
      (this.promise = e), (this.resolve = xf(kf, t)), (this.reject = xf(Ef, t));
    }),
    (Js.f = sf =
      function (e) {
        return e === af || undefined === e ? new Rs(e) : ff(e);
      })),
    js({ global: !0, constructor: !0, wrap: !0, forced: Qs }, { Promise: af }),
    _s(af, Zs, !1, !0),
    Ds(Zs);
  var Sf = xn('iterator'),
    Nf = !1;
  try {
    var Of = 0,
      Tf = {
        next: function () {
          return { done: !!Of++ };
        },
        return: function () {
          Nf = !0;
        },
      };
    (Tf[Sf] = function () {
      return this;
    }),
      Array.from(Tf, function () {
        throw 2;
      });
  } catch (e) {}
  var Cf = function (e, t) {
      if (!t && !Nf) return !1;
      var n = !1;
      try {
        var r = {};
        (r[Sf] = function () {
          return {
            next: function () {
              return { done: (n = !0) };
            },
          };
        }),
          e(r);
      } catch (e) {}
      return n;
    },
    Af = cs,
    Rf =
      Ss.CONSTRUCTOR ||
      !Cf(function (e) {
        Af.all(e).then(void 0, function () {});
      }),
    jf = Be,
    If = zt,
    Pf = Ns,
    Mf = is,
    Lf = xi;
  Dr(
    { target: 'Promise', stat: !0, forced: Rf },
    {
      all: function (e) {
        var t = this,
          n = Pf.f(t),
          r = n.resolve,
          a = n.reject,
          o = Mf(function () {
            var n = If(t.resolve),
              o = [],
              i = 0,
              c = 1;
            Lf(e, function (e) {
              var u = i++,
                l = !1;
              c++,
                jf(n, t, e).then(function (e) {
                  l || ((l = !0), (o[u] = e), --c || r(o));
                }, a);
            }),
              --c || r(o);
          });
        return o.error && a(o.value), n.promise;
      },
    },
  );
  var _f = Dr,
    Df = Ss.CONSTRUCTOR;
  cs && cs.prototype,
    _f(
      { target: 'Promise', proto: !0, forced: Df, real: !0 },
      {
        catch: function (e) {
          return this.then(void 0, e);
        },
      },
    );
  var Ff = Be,
    zf = zt,
    Hf = Ns,
    Bf = is,
    Uf = xi;
  Dr(
    { target: 'Promise', stat: !0, forced: Rf },
    {
      race: function (e) {
        var t = this,
          n = Hf.f(t),
          r = n.reject,
          a = Bf(function () {
            var a = zf(t.resolve);
            Uf(e, function (e) {
              Ff(a, t, e).then(n.resolve, r);
            });
          });
        return a.error && r(a.value), n.promise;
      },
    },
  );
  var Yf = Be,
    Vf = Ns;
  Dr(
    { target: 'Promise', stat: !0, forced: Ss.CONSTRUCTOR },
    {
      reject: function (e) {
        var t = Vf.f(this);
        return Yf(t.reject, void 0, e), t.promise;
      },
    },
  );
  var Wf = fr,
    Gf = lt,
    Xf = Ns,
    $f = function (e, t) {
      if ((Wf(e), Gf(t) && t.constructor === e)) return t;
      var n = Xf.f(e);
      return (0, n.resolve)(t), n.promise;
    },
    qf = Dr,
    Kf = cs,
    Jf = Ss.CONSTRUCTOR,
    Zf = $f,
    Qf = vt('Promise'),
    ed = !Jf;
  qf(
    { target: 'Promise', stat: !0, forced: true },
    {
      resolve: function (e) {
        return Zf(ed && this === Qf ? Kf : this, e);
      },
    },
  );
  var td = Be,
    nd = zt,
    rd = Ns,
    ad = is,
    od = xi;
  Dr(
    { target: 'Promise', stat: !0, forced: Rf },
    {
      allSettled: function (e) {
        var t = this,
          n = rd.f(t),
          r = n.resolve,
          a = n.reject,
          o = ad(function () {
            var n = nd(t.resolve),
              a = [],
              o = 0,
              i = 1;
            od(e, function (e) {
              var c = o++,
                u = !1;
              i++,
                td(n, t, e).then(
                  function (e) {
                    u || ((u = !0), (a[c] = { status: 'fulfilled', value: e }), --i || r(a));
                  },
                  function (e) {
                    u || ((u = !0), (a[c] = { status: 'rejected', reason: e }), --i || r(a));
                  },
                );
            }),
              --i || r(a);
          });
        return o.error && a(o.value), n.promise;
      },
    },
  );
  var id = Be,
    cd = zt,
    ud = vt,
    ld = Ns,
    sd = is,
    fd = xi,
    dd = 'No one promise resolved';
  Dr(
    { target: 'Promise', stat: !0, forced: Rf },
    {
      any: function (e) {
        var t = this,
          n = ud('AggregateError'),
          r = ld.f(t),
          a = r.resolve,
          o = r.reject,
          i = sd(function () {
            var r = cd(t.resolve),
              i = [],
              c = 0,
              u = 1,
              l = !1;
            fd(e, function (e) {
              var s = c++,
                f = !1;
              u++,
                id(r, t, e).then(
                  function (e) {
                    f || l || ((l = !0), a(e));
                  },
                  function (e) {
                    f || l || ((f = !0), (i[s] = e), --u || o(new n(i, dd)));
                  },
                );
            }),
              --u || o(new n(i, dd));
          });
        return i.error && o(i.value), r.promise;
      },
    },
  );
  var md = Dr,
    pd = cs,
    vd = pe,
    hd = vt,
    gd = _e,
    yd = nl,
    bd = $f,
    wd = pd && pd.prototype;
  md(
    {
      target: 'Promise',
      proto: !0,
      real: !0,
      forced:
        !!pd &&
        vd(function () {
          wd.finally.call({ then: function () {} }, function () {});
        }),
    },
    {
      finally: function (e) {
        var t = yd(this, hd('Promise')),
          n = gd(e);
        return this.then(
          n
            ? function (n) {
                return bd(t, e()).then(function () {
                  return n;
                });
              }
            : e,
          n
            ? function (n) {
                return bd(t, e()).then(function () {
                  throw n;
                });
              }
            : e,
        );
      },
    },
  );
  var xd = Ne,
    Ed = sa,
    kd = Si,
    Sd = rt,
    Nd = xd(''.charAt),
    Od = xd(''.charCodeAt),
    Td = xd(''.slice),
    Cd = function (e) {
      return function (t, n) {
        var r,
          a,
          o = kd(Sd(t)),
          i = Ed(n),
          c = o.length;
        return i < 0 || i >= c
          ? e
            ? ''
            : void 0
          : (r = Od(o, i)) < 55296 ||
            r > 56319 ||
            i + 1 === c ||
            (a = Od(o, i + 1)) < 56320 ||
            a > 57343
          ? e
            ? Nd(o, i)
            : r
          : e
          ? Td(o, i, i + 2)
          : a - 56320 + ((r - 55296) << 10) + 65536;
      };
    },
    Ad = { codeAt: Cd(!1), charAt: Cd(!0) }.charAt,
    Rd = Si,
    jd = sc,
    Id = iu,
    Pd = cu,
    Md = 'String Iterator',
    Ld = jd.set,
    _d = jd.getterFor(Md);
  Id(
    String,
    'String',
    function (e) {
      Ld(this, { type: Md, string: Rd(e), index: 0 });
    },
    function () {
      var e,
        t = _d(this),
        n = t.string,
        r = t.index;
      return r >= n.length ? Pd(void 0, !0) : ((e = Ad(n, r)), (t.index += e.length), Pd(e, !1));
    },
  );
  var Dd = st.Promise,
    Fd = {
      CSSRuleList: 0,
      CSSStyleDeclaration: 0,
      CSSValueList: 0,
      ClientRectList: 0,
      DOMRectList: 0,
      DOMStringList: 0,
      DOMTokenList: 1,
      DataTransferItemList: 0,
      FileList: 0,
      HTMLAllCollection: 0,
      HTMLCollection: 0,
      HTMLFormElement: 0,
      HTMLSelectElement: 0,
      MediaList: 0,
      MimeTypeArray: 0,
      NamedNodeMap: 0,
      NodeList: 1,
      PaintRequestList: 0,
      Plugin: 0,
      PluginArray: 0,
      SVGLengthList: 0,
      SVGNumberList: 0,
      SVGPathSegList: 0,
      SVGPointList: 0,
      SVGStringList: 0,
      SVGTransformList: 0,
      SourceBufferList: 0,
      StyleSheetList: 0,
      TextTrackCueList: 0,
      TextTrackList: 0,
      TouchList: 0,
    },
    zd = me,
    Hd = Vo,
    Bd = Nr,
    Ud = jo,
    Yd = xn('toStringTag');
  for (var Vd in Fd) {
    var Wd = zd[Vd],
      Gd = Wd && Wd.prototype;
    Gd && Hd(Gd) !== Yd && Bd(Gd, Yd, Vd), (Ud[Vd] = Ud.Array);
  }
  var Xd = Dd;
  !(function (e) {
    e.exports = Xd;
  })(fe);
  var $d = se(fe.exports);
  function qd(e, t) {
    return new $d(function (n, r) {
      var a = document.createElement('script');
      (a.async = !0), (a.crossOrigin = 'anonymous');
      var o = function () {
        a.parentNode && a.parentNode.removeChild(a), t && window[t] && delete window[t];
      };
      (a.onload = function () {
        n(window[t]), o();
      }),
        (a.onerror = function () {
          r(new Error('Failed to import: '.concat(e))), o();
        }),
        (a.src = e),
        document.head.appendChild(a);
    });
  }
  function Kd(e, t, n, r) {
    var a = o.default.lazy(function () {
      return qd(e, t)
        .then(function (e) {
          if (!e.default)
            throw new Error('Failed to import '.concat(t, ' component: no default export'));
          return (a.WrappedComponent = e.default || e), n && n(), e;
        })
        .catch(function (e) {
          return (
            r && r(e),
            {
              default: function () {
                return o.default.createElement(o.default.Fragment, null);
              },
            }
          );
        });
    });
    return a;
  }
  function Jd(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document.body,
      n = document.createElement('div');
    t.appendChild(n);
    var r = o.default.cloneElement(e, {
      onUnmount: function () {
        i.default.unmountComponentAtNode(n), t && n && t.removeChild(n);
      },
    });
    return i.default.render(r, n), n;
  }
  function Zd(e) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'click',
      r = t.useRef();
    return (
      t.useEffect(
        function () {
          var t = function (t) {
            var n = r.current;
            n && !n.contains(t.target) && e && e(t);
          };
          return (
            document.addEventListener(n, t),
            function () {
              document.removeEventListener(n, t);
            }
          );
        },
        [n, e],
      ),
      r
    );
  }
  function Qd(e) {
    var n = t.useRef(null);
    return (
      t.useEffect(
        function () {
          e && ('function' == typeof e ? e(n.current) : (e.current = n.current));
        },
        [e],
      ),
      n
    );
  }
  var em = function (e) {
      return e && e.Math == Math && e;
    },
    tm =
      em('object' == typeof globalThis && globalThis) ||
      em('object' == typeof window && window) ||
      em('object' == typeof self && self) ||
      em('object' == typeof le && le) ||
      (function () {
        return this;
      })() ||
      Function('return this')(),
    nm = { exports: {} },
    rm = tm,
    am = Object.defineProperty,
    om = function (e, t) {
      try {
        am(rm, e, { value: t, configurable: !0, writable: !0 });
      } catch (n) {
        rm[e] = t;
      }
      return t;
    },
    im = om,
    cm = '__core-js_shared__',
    um = tm[cm] || im(cm, {}),
    lm = um;
  (nm.exports = function (e, t) {
    return lm[e] || (lm[e] = void 0 !== t ? t : {});
  })('versions', []).push({
    version: '3.30.0',
    mode: 'global',
    copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.30.0/LICENSE',
    source: 'https://github.com/zloirock/core-js',
  });
  var sm,
    fm,
    dm = function (e) {
      try {
        return !!e();
      } catch (e) {
        return !0;
      }
    },
    mm = !dm(function () {
      var e = function () {}.bind();
      return 'function' != typeof e || e.hasOwnProperty('prototype');
    }),
    pm = mm,
    vm = Function.prototype,
    hm = vm.call,
    gm = pm && vm.bind.bind(hm, hm),
    ym = pm
      ? gm
      : function (e) {
          return function () {
            return hm.apply(e, arguments);
          };
        },
    bm = function (e) {
      return null == e;
    },
    wm = bm,
    xm = TypeError,
    Em = function (e) {
      if (wm(e)) throw xm("Can't call method on " + e);
      return e;
    },
    km = Em,
    Sm = Object,
    Nm = function (e) {
      return Sm(km(e));
    },
    Om = Nm,
    Tm = ym({}.hasOwnProperty),
    Cm =
      Object.hasOwn ||
      function (e, t) {
        return Tm(Om(e), t);
      },
    Am = ym,
    Rm = 0,
    jm = Math.random(),
    Im = Am((1).toString),
    Pm = function (e) {
      return 'Symbol(' + (void 0 === e ? '' : e) + ')_' + Im(++Rm + jm, 36);
    },
    Mm = ('undefined' != typeof navigator && String(navigator.userAgent)) || '',
    Lm = tm,
    _m = Mm,
    Dm = Lm.process,
    Fm = Lm.Deno,
    zm = (Dm && Dm.versions) || (Fm && Fm.version),
    Hm = zm && zm.v8;
  Hm && (fm = (sm = Hm.split('.'))[0] > 0 && sm[0] < 4 ? 1 : +(sm[0] + sm[1])),
    !fm &&
      _m &&
      (!(sm = _m.match(/Edge\/(\d+)/)) || sm[1] >= 74) &&
      (sm = _m.match(/Chrome\/(\d+)/)) &&
      (fm = +sm[1]);
  var Bm = fm,
    Um = Bm,
    Ym = dm,
    Vm =
      !!Object.getOwnPropertySymbols &&
      !Ym(function () {
        var e = Symbol();
        return !String(e) || !(Object(e) instanceof Symbol) || (!Symbol.sham && Um && Um < 41);
      }),
    Wm = Vm && !Symbol.sham && 'symbol' == typeof Symbol.iterator,
    Gm = tm,
    Xm = nm.exports,
    $m = Cm,
    qm = Pm,
    Km = Vm,
    Jm = Wm,
    Zm = Gm.Symbol,
    Qm = Xm('wks'),
    ep = Jm ? Zm.for || Zm : (Zm && Zm.withoutSetter) || qm,
    tp = function (e) {
      return $m(Qm, e) || (Qm[e] = Km && $m(Zm, e) ? Zm[e] : ep('Symbol.' + e)), Qm[e];
    },
    np = {};
  np[tp('toStringTag')] = 'z';
  var rp = '[object z]' === String(np),
    ap = 'object' == typeof document && document.all,
    op = { all: ap, IS_HTMLDDA: void 0 === ap && void 0 !== ap },
    ip = op.all,
    cp = op.IS_HTMLDDA
      ? function (e) {
          return 'function' == typeof e || e === ip;
        }
      : function (e) {
          return 'function' == typeof e;
        },
    up = {},
    lp = !dm(function () {
      return (
        7 !=
        Object.defineProperty({}, 1, {
          get: function () {
            return 7;
          },
        })[1]
      );
    }),
    sp = cp,
    fp = op.all,
    dp = op.IS_HTMLDDA
      ? function (e) {
          return 'object' == typeof e ? null !== e : sp(e) || e === fp;
        }
      : function (e) {
          return 'object' == typeof e ? null !== e : sp(e);
        },
    mp = dp,
    pp = tm.document,
    vp = mp(pp) && mp(pp.createElement),
    hp = function (e) {
      return vp ? pp.createElement(e) : {};
    },
    gp = hp,
    yp =
      !lp &&
      !dm(function () {
        return (
          7 !=
          Object.defineProperty(gp('div'), 'a', {
            get: function () {
              return 7;
            },
          }).a
        );
      }),
    bp =
      lp &&
      dm(function () {
        return (
          42 !=
          Object.defineProperty(function () {}, 'prototype', { value: 42, writable: !1 }).prototype
        );
      }),
    wp = dp,
    xp = String,
    Ep = TypeError,
    kp = function (e) {
      if (wp(e)) return e;
      throw Ep(xp(e) + ' is not an object');
    },
    Sp = mm,
    Np = Function.prototype.call,
    Op = Sp
      ? Np.bind(Np)
      : function () {
          return Np.apply(Np, arguments);
        },
    Tp = tm,
    Cp = cp,
    Ap = function (e, t) {
      return arguments.length < 2 ? ((n = Tp[e]), Cp(n) ? n : void 0) : Tp[e] && Tp[e][t];
      var n;
    },
    Rp = ym({}.isPrototypeOf),
    jp = Ap,
    Ip = cp,
    Pp = Rp,
    Mp = Object,
    Lp = Wm
      ? function (e) {
          return 'symbol' == typeof e;
        }
      : function (e) {
          var t = jp('Symbol');
          return Ip(t) && Pp(t.prototype, Mp(e));
        },
    _p = String,
    Dp = function (e) {
      try {
        return _p(e);
      } catch (e) {
        return 'Object';
      }
    },
    Fp = cp,
    zp = Dp,
    Hp = TypeError,
    Bp = function (e) {
      if (Fp(e)) return e;
      throw Hp(zp(e) + ' is not a function');
    },
    Up = Bp,
    Yp = bm,
    Vp = function (e, t) {
      var n = e[t];
      return Yp(n) ? void 0 : Up(n);
    },
    Wp = Op,
    Gp = cp,
    Xp = dp,
    $p = TypeError,
    qp = Op,
    Kp = dp,
    Jp = Lp,
    Zp = Vp,
    Qp = function (e, t) {
      var n, r;
      if ('string' === t && Gp((n = e.toString)) && !Xp((r = Wp(n, e)))) return r;
      if (Gp((n = e.valueOf)) && !Xp((r = Wp(n, e)))) return r;
      if ('string' !== t && Gp((n = e.toString)) && !Xp((r = Wp(n, e)))) return r;
      throw $p("Can't convert object to primitive value");
    },
    ev = TypeError,
    tv = tp('toPrimitive'),
    nv = function (e, t) {
      if (!Kp(e) || Jp(e)) return e;
      var n,
        r = Zp(e, tv);
      if (r) {
        if ((void 0 === t && (t = 'default'), (n = qp(r, e, t)), !Kp(n) || Jp(n))) return n;
        throw ev("Can't convert object to primitive value");
      }
      return void 0 === t && (t = 'number'), Qp(e, t);
    },
    rv = nv,
    av = Lp,
    ov = function (e) {
      var t = rv(e, 'string');
      return av(t) ? t : t + '';
    },
    iv = lp,
    cv = yp,
    uv = bp,
    lv = kp,
    sv = ov,
    fv = TypeError,
    dv = Object.defineProperty,
    mv = Object.getOwnPropertyDescriptor,
    pv = 'enumerable',
    vv = 'configurable',
    hv = 'writable';
  up.f = iv
    ? uv
      ? function (e, t, n) {
          if (
            (lv(e),
            (t = sv(t)),
            lv(n),
            'function' == typeof e && 'prototype' === t && 'value' in n && hv in n && !n[hv])
          ) {
            var r = mv(e, t);
            r &&
              r[hv] &&
              ((e[t] = n.value),
              (n = {
                configurable: vv in n ? n[vv] : r[vv],
                enumerable: pv in n ? n[pv] : r[pv],
                writable: !1,
              }));
          }
          return dv(e, t, n);
        }
      : dv
    : function (e, t, n) {
        if ((lv(e), (t = sv(t)), lv(n), cv))
          try {
            return dv(e, t, n);
          } catch (e) {}
        if ('get' in n || 'set' in n) throw fv('Accessors not supported');
        return 'value' in n && (e[t] = n.value), e;
      };
  var gv = { exports: {} },
    yv = lp,
    bv = Cm,
    wv = Function.prototype,
    xv = yv && Object.getOwnPropertyDescriptor,
    Ev = bv(wv, 'name'),
    kv = {
      EXISTS: Ev,
      PROPER: Ev && 'something' === function () {}.name,
      CONFIGURABLE: Ev && (!yv || (yv && xv(wv, 'name').configurable)),
    },
    Sv = cp,
    Nv = um,
    Ov = ym(Function.toString);
  Sv(Nv.inspectSource) ||
    (Nv.inspectSource = function (e) {
      return Ov(e);
    });
  var Tv,
    Cv,
    Av,
    Rv = Nv.inspectSource,
    jv = cp,
    Iv = tm.WeakMap,
    Pv = jv(Iv) && /native code/.test(String(Iv)),
    Mv = function (e, t) {
      return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t };
    },
    Lv = up,
    _v = Mv,
    Dv = lp
      ? function (e, t, n) {
          return Lv.f(e, t, _v(1, n));
        }
      : function (e, t, n) {
          return (e[t] = n), e;
        },
    Fv = nm.exports,
    zv = Pm,
    Hv = Fv('keys'),
    Bv = function (e) {
      return Hv[e] || (Hv[e] = zv(e));
    },
    Uv = {},
    Yv = Pv,
    Vv = tm,
    Wv = dp,
    Gv = Dv,
    Xv = Cm,
    $v = um,
    qv = Bv,
    Kv = Uv,
    Jv = 'Object already initialized',
    Zv = Vv.TypeError,
    Qv = Vv.WeakMap;
  if (Yv || $v.state) {
    var eh = $v.state || ($v.state = new Qv());
    (eh.get = eh.get),
      (eh.has = eh.has),
      (eh.set = eh.set),
      (Tv = function (e, t) {
        if (eh.has(e)) throw Zv(Jv);
        return (t.facade = e), eh.set(e, t), t;
      }),
      (Cv = function (e) {
        return eh.get(e) || {};
      }),
      (Av = function (e) {
        return eh.has(e);
      });
  } else {
    var th = qv('state');
    (Kv[th] = !0),
      (Tv = function (e, t) {
        if (Xv(e, th)) throw Zv(Jv);
        return (t.facade = e), Gv(e, th, t), t;
      }),
      (Cv = function (e) {
        return Xv(e, th) ? e[th] : {};
      }),
      (Av = function (e) {
        return Xv(e, th);
      });
  }
  var nh = {
      set: Tv,
      get: Cv,
      has: Av,
      enforce: function (e) {
        return Av(e) ? Cv(e) : Tv(e, {});
      },
      getterFor: function (e) {
        return function (t) {
          var n;
          if (!Wv(t) || (n = Cv(t)).type !== e)
            throw Zv('Incompatible receiver, ' + e + ' required');
          return n;
        };
      },
    },
    rh = ym,
    ah = dm,
    oh = cp,
    ih = Cm,
    ch = lp,
    uh = kv.CONFIGURABLE,
    lh = Rv,
    sh = nh.enforce,
    fh = nh.get,
    dh = String,
    mh = Object.defineProperty,
    ph = rh(''.slice),
    vh = rh(''.replace),
    hh = rh([].join),
    gh =
      ch &&
      !ah(function () {
        return 8 !== mh(function () {}, 'length', { value: 8 }).length;
      }),
    yh = String(String).split('String'),
    bh = (gv.exports = function (e, t, n) {
      'Symbol(' === ph(dh(t), 0, 7) && (t = '[' + vh(dh(t), /^Symbol\(([^)]*)\)/, '$1') + ']'),
        n && n.getter && (t = 'get ' + t),
        n && n.setter && (t = 'set ' + t),
        (!ih(e, 'name') || (uh && e.name !== t)) &&
          (ch ? mh(e, 'name', { value: t, configurable: !0 }) : (e.name = t)),
        gh && n && ih(n, 'arity') && e.length !== n.arity && mh(e, 'length', { value: n.arity });
      try {
        n && ih(n, 'constructor') && n.constructor
          ? ch && mh(e, 'prototype', { writable: !1 })
          : e.prototype && (e.prototype = void 0);
      } catch (e) {}
      var r = sh(e);
      return ih(r, 'source') || (r.source = hh(yh, 'string' == typeof t ? t : '')), e;
    });
  Function.prototype.toString = bh(function () {
    return (oh(this) && fh(this).source) || lh(this);
  }, 'toString');
  var wh = cp,
    xh = up,
    Eh = gv.exports,
    kh = om,
    Sh = function (e, t, n, r) {
      r || (r = {});
      var a = r.enumerable,
        o = void 0 !== r.name ? r.name : t;
      if ((wh(n) && Eh(n, o, r), r.global)) a ? (e[t] = n) : kh(t, n);
      else {
        try {
          r.unsafe ? e[t] && (a = !0) : delete e[t];
        } catch (e) {}
        a
          ? (e[t] = n)
          : xh.f(e, t, {
              value: n,
              enumerable: !1,
              configurable: !r.nonConfigurable,
              writable: !r.nonWritable,
            });
      }
      return e;
    },
    Nh = ym,
    Oh = Nh({}.toString),
    Th = Nh(''.slice),
    Ch = function (e) {
      return Th(Oh(e), 8, -1);
    },
    Ah = rp,
    Rh = cp,
    jh = Ch,
    Ih = tp('toStringTag'),
    Ph = Object,
    Mh =
      'Arguments' ==
      jh(
        (function () {
          return arguments;
        })(),
      ),
    Lh = Ah
      ? jh
      : function (e) {
          var t, n, r;
          return void 0 === e
            ? 'Undefined'
            : null === e
            ? 'Null'
            : 'string' ==
              typeof (n = (function (e, t) {
                try {
                  return e[t];
                } catch (e) {}
              })((t = Ph(e)), Ih))
            ? n
            : Mh
            ? jh(t)
            : 'Object' == (r = jh(t)) && Rh(t.callee)
            ? 'Arguments'
            : r;
        },
    _h = Lh,
    Dh = rp
      ? {}.toString
      : function () {
          return '[object ' + _h(this) + ']';
        };
  rp || Sh(Object.prototype, 'toString', Dh, { unsafe: !0 });
  var Fh = hp('span').classList,
    zh = Fh && Fh.constructor && Fh.constructor.prototype,
    Hh = zh === Object.prototype ? void 0 : zh,
    Bh = Ch,
    Uh = ym,
    Yh = function (e) {
      if ('Function' === Bh(e)) return Uh(e);
    },
    Vh = Bp,
    Wh = mm,
    Gh = Yh(Yh.bind),
    Xh = function (e, t) {
      return (
        Vh(e),
        void 0 === t
          ? e
          : Wh
          ? Gh(e, t)
          : function () {
              return e.apply(t, arguments);
            }
      );
    },
    $h = dm,
    qh = Ch,
    Kh = Object,
    Jh = ym(''.split),
    Zh = $h(function () {
      return !Kh('z').propertyIsEnumerable(0);
    })
      ? function (e) {
          return 'String' == qh(e) ? Jh(e, '') : Kh(e);
        }
      : Kh,
    Qh = Math.ceil,
    eg = Math.floor,
    tg =
      Math.trunc ||
      function (e) {
        var t = +e;
        return (t > 0 ? eg : Qh)(t);
      },
    ng = function (e) {
      var t = +e;
      return t != t || 0 === t ? 0 : tg(t);
    },
    rg = ng,
    ag = Math.min,
    og = function (e) {
      return e > 0 ? ag(rg(e), 9007199254740991) : 0;
    },
    ig = og,
    cg = function (e) {
      return ig(e.length);
    },
    ug = Ch,
    lg =
      Array.isArray ||
      function (e) {
        return 'Array' == ug(e);
      },
    sg = ym,
    fg = dm,
    dg = cp,
    mg = Lh,
    pg = Rv,
    vg = function () {},
    hg = [],
    gg = Ap('Reflect', 'construct'),
    yg = /^\s*(?:class|function)\b/,
    bg = sg(yg.exec),
    wg = !yg.exec(vg),
    xg = function (e) {
      if (!dg(e)) return !1;
      try {
        return gg(vg, hg, e), !0;
      } catch (e) {
        return !1;
      }
    },
    Eg = function (e) {
      if (!dg(e)) return !1;
      switch (mg(e)) {
        case 'AsyncFunction':
        case 'GeneratorFunction':
        case 'AsyncGeneratorFunction':
          return !1;
      }
      try {
        return wg || !!bg(yg, pg(e));
      } catch (e) {
        return !0;
      }
    };
  Eg.sham = !0;
  var kg =
      !gg ||
      fg(function () {
        var e;
        return (
          xg(xg.call) ||
          !xg(Object) ||
          !xg(function () {
            e = !0;
          }) ||
          e
        );
      })
        ? Eg
        : xg,
    Sg = lg,
    Ng = kg,
    Og = dp,
    Tg = tp('species'),
    Cg = Array,
    Ag = function (e) {
      var t;
      return (
        Sg(e) &&
          ((t = e.constructor),
          ((Ng(t) && (t === Cg || Sg(t.prototype))) || (Og(t) && null === (t = t[Tg]))) &&
            (t = void 0)),
        void 0 === t ? Cg : t
      );
    },
    Rg = Xh,
    jg = Zh,
    Ig = Nm,
    Pg = cg,
    Mg = function (e, t) {
      return new (Ag(e))(0 === t ? 0 : t);
    },
    Lg = ym([].push),
    _g = function (e) {
      var t = 1 == e,
        n = 2 == e,
        r = 3 == e,
        a = 4 == e,
        o = 6 == e,
        i = 7 == e,
        c = 5 == e || o;
      return function (u, l, s, f) {
        for (
          var d,
            m,
            p = Ig(u),
            v = jg(p),
            h = Rg(l, s),
            g = Pg(v),
            y = 0,
            b = f || Mg,
            w = t ? b(u, g) : n || i ? b(u, 0) : void 0;
          g > y;
          y++
        )
          if ((c || y in v) && ((m = h((d = v[y]), y, p)), e))
            if (t) w[y] = m;
            else if (m)
              switch (e) {
                case 3:
                  return !0;
                case 5:
                  return d;
                case 6:
                  return y;
                case 2:
                  Lg(w, d);
              }
            else
              switch (e) {
                case 4:
                  return !1;
                case 7:
                  Lg(w, d);
              }
        return o ? -1 : r || a ? a : w;
      };
    },
    Dg = {
      forEach: _g(0),
      map: _g(1),
      filter: _g(2),
      some: _g(3),
      every: _g(4),
      find: _g(5),
      findIndex: _g(6),
      filterReject: _g(7),
    },
    Fg = dm,
    zg = Dg.forEach,
    Hg = function (e, t) {
      var n = [][e];
      return (
        !!n &&
        Fg(function () {
          n.call(
            null,
            t ||
              function () {
                return 1;
              },
            1,
          );
        })
      );
    },
    Bg = Hg('forEach')
      ? [].forEach
      : function (e) {
          return zg(this, e, arguments.length > 1 ? arguments[1] : void 0);
        },
    Ug = tm,
    Yg = {
      CSSRuleList: 0,
      CSSStyleDeclaration: 0,
      CSSValueList: 0,
      ClientRectList: 0,
      DOMRectList: 0,
      DOMStringList: 0,
      DOMTokenList: 1,
      DataTransferItemList: 0,
      FileList: 0,
      HTMLAllCollection: 0,
      HTMLCollection: 0,
      HTMLFormElement: 0,
      HTMLSelectElement: 0,
      MediaList: 0,
      MimeTypeArray: 0,
      NamedNodeMap: 0,
      NodeList: 1,
      PaintRequestList: 0,
      Plugin: 0,
      PluginArray: 0,
      SVGLengthList: 0,
      SVGNumberList: 0,
      SVGPathSegList: 0,
      SVGPointList: 0,
      SVGStringList: 0,
      SVGTransformList: 0,
      SourceBufferList: 0,
      StyleSheetList: 0,
      TextTrackCueList: 0,
      TextTrackList: 0,
      TouchList: 0,
    },
    Vg = Hh,
    Wg = Bg,
    Gg = Dv,
    Xg = function (e) {
      if (e && e.forEach !== Wg)
        try {
          Gg(e, 'forEach', Wg);
        } catch (t) {
          e.forEach = Wg;
        }
    };
  for (var $g in Yg) Yg[$g] && Xg(Ug[$g] && Ug[$g].prototype);
  Xg(Vg);
  var qg = { exports: {} },
    Kg = nn,
    Jg = $a;
  Dr(
    {
      target: 'Object',
      stat: !0,
      forced: pe(function () {
        Jg(1);
      }),
    },
    {
      keys: function (e) {
        return Jg(Kg(e));
      },
    },
  );
  var Zg = st.Object.keys;
  !(function (e) {
    e.exports = Zg;
  })(qg);
  var Qg = se(qg.exports),
    ey = { exports: {} },
    ty = {},
    ny = jn,
    ry = ir,
    ay = $e,
    oy = function (e, t, n) {
      var r = ny(t);
      r in e ? ry.f(e, r, ay(0, n)) : (e[r] = n);
    },
    iy = pa,
    cy = ya,
    uy = oy,
    ly = Array,
    sy = Math.max,
    fy = function (e, t, n) {
      for (
        var r = cy(e), a = iy(t, r), o = iy(void 0 === n ? r : n, r), i = ly(sy(o - a, 0)), c = 0;
        a < o;
        a++, c++
      )
        uy(i, c, e[a]);
      return (i.length = c), i;
    },
    dy = Ae,
    my = it,
    py = ia.f,
    vy = fy,
    hy =
      'object' == typeof window && window && Object.getOwnPropertyNames
        ? Object.getOwnPropertyNames(window)
        : [];
  ty.f = function (e) {
    return hy && 'Window' == dy(e)
      ? (function (e) {
          try {
            return py(e);
          } catch (e) {
            return vy(hy);
          }
        })(e)
      : py(my(e));
  };
  var gy = {},
    yy = xn;
  gy.f = yy;
  var by = st,
    wy = on,
    xy = gy,
    Ey = ir.f,
    ky = function (e) {
      var t = by.Symbol || (by.Symbol = {});
      wy(t, e) || Ey(t, e, { value: xy.f(e) });
    },
    Sy = Be,
    Ny = vt,
    Oy = xn,
    Ty = yc,
    Cy = function () {
      var e = Ny('Symbol'),
        t = e && e.prototype,
        n = t && t.valueOf,
        r = Oy('toPrimitive');
      t &&
        !t[r] &&
        Ty(
          t,
          r,
          function (e) {
            return Sy(n, this);
          },
          { arity: 1 },
        );
    },
    Ay = Ae,
    Ry =
      Array.isArray ||
      function (e) {
        return 'Array' == Ay(e);
      },
    jy = Ry,
    Iy = Xu,
    Py = lt,
    My = xn('species'),
    Ly = Array,
    _y = function (e) {
      var t;
      return (
        jy(e) &&
          ((t = e.constructor),
          ((Iy(t) && (t === Ly || jy(t.prototype))) || (Py(t) && null === (t = t[My]))) &&
            (t = void 0)),
        void 0 === t ? Ly : t
      );
    },
    Dy = function (e, t) {
      return new (_y(e))(0 === t ? 0 : t);
    },
    Fy = or,
    zy = Qe,
    Hy = nn,
    By = ya,
    Uy = Dy,
    Yy = Ne([].push),
    Vy = function (e) {
      var t = 1 == e,
        n = 2 == e,
        r = 3 == e,
        a = 4 == e,
        o = 6 == e,
        i = 7 == e,
        c = 5 == e || o;
      return function (u, l, s, f) {
        for (
          var d,
            m,
            p = Hy(u),
            v = zy(p),
            h = Fy(l, s),
            g = By(v),
            y = 0,
            b = f || Uy,
            w = t ? b(u, g) : n || i ? b(u, 0) : void 0;
          g > y;
          y++
        )
          if ((c || y in v) && ((m = h((d = v[y]), y, p)), e))
            if (t) w[y] = m;
            else if (m)
              switch (e) {
                case 3:
                  return !0;
                case 5:
                  return d;
                case 6:
                  return y;
                case 2:
                  Yy(w, d);
              }
            else
              switch (e) {
                case 4:
                  return !1;
                case 7:
                  Yy(w, d);
              }
        return o ? -1 : r || a ? a : w;
      };
    },
    Wy = {
      forEach: Vy(0),
      map: Vy(1),
      filter: Vy(2),
      some: Vy(3),
      every: Vy(4),
      find: Vy(5),
      findIndex: Vy(6),
      filterReject: Vy(7),
    },
    Gy = Dr,
    Xy = me,
    $y = Be,
    qy = Ne,
    Ky = Fe,
    Jy = Tt,
    Zy = pe,
    Qy = on,
    eb = ht,
    tb = fr,
    nb = it,
    rb = jn,
    ab = Si,
    ob = $e,
    ib = go,
    cb = $a,
    ub = ia,
    lb = ty,
    sb = Ma,
    fb = De,
    db = ir,
    mb = Wa,
    pb = Ue,
    vb = yc,
    hb = bu,
    gb = Xt.exports,
    yb = Sa,
    bb = fn,
    wb = xn,
    xb = gy,
    Eb = ky,
    kb = Cy,
    Sb = Dc,
    Nb = sc,
    Ob = Wy.forEach,
    Tb = Br('hidden'),
    Cb = 'Symbol',
    Ab = 'prototype',
    Rb = Nb.set,
    jb = Nb.getterFor(Cb),
    Ib = Object[Ab],
    Pb = Xy.Symbol,
    Mb = Pb && Pb[Ab],
    Lb = Xy.TypeError,
    _b = Xy.QObject,
    Db = fb.f,
    Fb = db.f,
    zb = lb.f,
    Hb = pb.f,
    Bb = qy([].push),
    Ub = gb('symbols'),
    Yb = gb('op-symbols'),
    Vb = gb('wks'),
    Wb = !_b || !_b[Ab] || !_b[Ab].findChild,
    Gb =
      Ky &&
      Zy(function () {
        return (
          7 !=
          ib(
            Fb({}, 'a', {
              get: function () {
                return Fb(this, 'a', { value: 7 }).a;
              },
            }),
          ).a
        );
      })
        ? function (e, t, n) {
            var r = Db(Ib, t);
            r && delete Ib[t], Fb(e, t, n), r && e !== Ib && Fb(Ib, t, r);
          }
        : Fb,
    Xb = function (e, t) {
      var n = (Ub[e] = ib(Mb));
      return Rb(n, { type: Cb, tag: e, description: t }), Ky || (n.description = t), n;
    },
    $b = function (e, t, n) {
      e === Ib && $b(Yb, t, n), tb(e);
      var r = rb(t);
      return (
        tb(n),
        Qy(Ub, r)
          ? (n.enumerable
              ? (Qy(e, Tb) && e[Tb][r] && (e[Tb][r] = !1), (n = ib(n, { enumerable: ob(0, !1) })))
              : (Qy(e, Tb) || Fb(e, Tb, ob(1, {})), (e[Tb][r] = !0)),
            Gb(e, r, n))
          : Fb(e, r, n)
      );
    },
    qb = function (e, t) {
      tb(e);
      var n = nb(t),
        r = cb(n).concat(Qb(n));
      return (
        Ob(r, function (t) {
          (Ky && !$y(Kb, n, t)) || $b(e, t, n[t]);
        }),
        e
      );
    },
    Kb = function (e) {
      var t = rb(e),
        n = $y(Hb, this, t);
      return (
        !(this === Ib && Qy(Ub, t) && !Qy(Yb, t)) &&
        (!(n || !Qy(this, t) || !Qy(Ub, t) || (Qy(this, Tb) && this[Tb][t])) || n)
      );
    },
    Jb = function (e, t) {
      var n = nb(e),
        r = rb(t);
      if (n !== Ib || !Qy(Ub, r) || Qy(Yb, r)) {
        var a = Db(n, r);
        return !a || !Qy(Ub, r) || (Qy(n, Tb) && n[Tb][r]) || (a.enumerable = !0), a;
      }
    },
    Zb = function (e) {
      var t = zb(nb(e)),
        n = [];
      return (
        Ob(t, function (e) {
          Qy(Ub, e) || Qy(yb, e) || Bb(n, e);
        }),
        n
      );
    },
    Qb = function (e) {
      var t = e === Ib,
        n = zb(t ? Yb : nb(e)),
        r = [];
      return (
        Ob(n, function (e) {
          !Qy(Ub, e) || (t && !Qy(Ib, e)) || Bb(r, Ub[e]);
        }),
        r
      );
    };
  Jy ||
    ((Pb = function () {
      if (eb(Mb, this)) throw Lb('Symbol is not a constructor');
      var e = arguments.length && void 0 !== arguments[0] ? ab(arguments[0]) : void 0,
        t = bb(e),
        n = function (e) {
          this === Ib && $y(n, Yb, e),
            Qy(this, Tb) && Qy(this[Tb], t) && (this[Tb][t] = !1),
            Gb(this, t, ob(1, e));
        };
      return Ky && Wb && Gb(Ib, t, { configurable: !0, set: n }), Xb(t, e);
    }),
    vb((Mb = Pb[Ab]), 'toString', function () {
      return jb(this).tag;
    }),
    vb(Pb, 'withoutSetter', function (e) {
      return Xb(bb(e), e);
    }),
    (pb.f = Kb),
    (db.f = $b),
    (mb.f = qb),
    (fb.f = Jb),
    (ub.f = lb.f = Zb),
    (sb.f = Qb),
    (xb.f = function (e) {
      return Xb(wb(e), e);
    }),
    Ky &&
      hb(Mb, 'description', {
        configurable: !0,
        get: function () {
          return jb(this).description;
        },
      })),
    Gy({ global: !0, constructor: !0, wrap: !0, forced: !Jy, sham: !Jy }, { Symbol: Pb }),
    Ob(cb(Vb), function (e) {
      Eb(e);
    }),
    Gy(
      { target: Cb, stat: !0, forced: !Jy },
      {
        useSetter: function () {
          Wb = !0;
        },
        useSimple: function () {
          Wb = !1;
        },
      },
    ),
    Gy(
      { target: 'Object', stat: !0, forced: !Jy, sham: !Ky },
      {
        create: function (e, t) {
          return void 0 === t ? ib(e) : qb(ib(e), t);
        },
        defineProperty: $b,
        defineProperties: qb,
        getOwnPropertyDescriptor: Jb,
      },
    ),
    Gy({ target: 'Object', stat: !0, forced: !Jy }, { getOwnPropertyNames: Zb }),
    kb(),
    Sb(Pb, Cb),
    (yb[Tb] = !0);
  var ew = Tt && !!Symbol.for && !!Symbol.keyFor,
    tw = Dr,
    nw = vt,
    rw = on,
    aw = Si,
    ow = Xt.exports,
    iw = ew,
    cw = ow('string-to-symbol-registry'),
    uw = ow('symbol-to-string-registry');
  tw(
    { target: 'Symbol', stat: !0, forced: !iw },
    {
      for: function (e) {
        var t = aw(e);
        if (rw(cw, t)) return cw[t];
        var n = nw('Symbol')(t);
        return (cw[t] = n), (uw[n] = t), n;
      },
    },
  );
  var lw = Dr,
    sw = on,
    fw = Pt,
    dw = Lt,
    mw = ew,
    pw = (0, Xt.exports)('symbol-to-string-registry');
  lw(
    { target: 'Symbol', stat: !0, forced: !mw },
    {
      keyFor: function (e) {
        if (!fw(e)) throw TypeError(dw(e) + ' is not a symbol');
        if (sw(pw, e)) return pw[e];
      },
    },
  );
  var vw = Ry,
    hw = _e,
    gw = Ae,
    yw = Si,
    bw = Ne([].push),
    ww = Dr,
    xw = vt,
    Ew = we,
    kw = Be,
    Sw = Ne,
    Nw = pe,
    Ow = _e,
    Tw = Pt,
    Cw = rl,
    Aw = function (e) {
      if (hw(e)) return e;
      if (vw(e)) {
        for (var t = e.length, n = [], r = 0; r < t; r++) {
          var a = e[r];
          'string' == typeof a
            ? bw(n, a)
            : ('number' != typeof a && 'Number' != gw(a) && 'String' != gw(a)) || bw(n, yw(a));
        }
        var o = n.length,
          i = !0;
        return function (e, t) {
          if (i) return (i = !1), t;
          if (vw(this)) return t;
          for (var r = 0; r < o; r++) if (n[r] === e) return t;
        };
      }
    },
    Rw = Tt,
    jw = String,
    Iw = xw('JSON', 'stringify'),
    Pw = Sw(/./.exec),
    Mw = Sw(''.charAt),
    Lw = Sw(''.charCodeAt),
    _w = Sw(''.replace),
    Dw = Sw((1).toString),
    Fw = /[\uD800-\uDFFF]/g,
    zw = /^[\uD800-\uDBFF]$/,
    Hw = /^[\uDC00-\uDFFF]$/,
    Bw =
      !Rw ||
      Nw(function () {
        var e = xw('Symbol')();
        return '[null]' != Iw([e]) || '{}' != Iw({ a: e }) || '{}' != Iw(Object(e));
      }),
    Uw = Nw(function () {
      return '"\\udf06\\ud834"' !== Iw('\udf06\ud834') || '"\\udead"' !== Iw('\udead');
    }),
    Yw = function (e, t) {
      var n = Cw(arguments),
        r = Aw(t);
      if (Ow(r) || (void 0 !== e && !Tw(e)))
        return (
          (n[1] = function (e, t) {
            if ((Ow(r) && (t = kw(r, this, jw(e), t)), !Tw(t))) return t;
          }),
          Ew(Iw, null, n)
        );
    },
    Vw = function (e, t, n) {
      var r = Mw(n, t - 1),
        a = Mw(n, t + 1);
      return (Pw(zw, e) && !Pw(Hw, a)) || (Pw(Hw, e) && !Pw(zw, r)) ? '\\u' + Dw(Lw(e, 0), 16) : e;
    };
  Iw &&
    ww(
      { target: 'JSON', stat: !0, arity: 3, forced: Bw || Uw },
      {
        stringify: function (e, t, n) {
          var r = Cw(arguments),
            a = Ew(Bw ? Yw : Iw, null, r);
          return Uw && 'string' == typeof a ? _w(a, Fw, Vw) : a;
        },
      },
    );
  var Ww = Ma,
    Gw = nn;
  Dr(
    {
      target: 'Object',
      stat: !0,
      forced:
        !Tt ||
        pe(function () {
          Ww.f(1);
        }),
    },
    {
      getOwnPropertySymbols: function (e) {
        var t = Ww.f;
        return t ? t(Gw(e)) : [];
      },
    },
  );
  var Xw = st.Object.getOwnPropertySymbols;
  !(function (e) {
    e.exports = Xw;
  })(ey);
  var $w = se(ey.exports),
    qw = { exports: {} },
    Kw = { exports: {} },
    Jw = Dr,
    Zw = pe,
    Qw = it,
    ex = De.f,
    tx = Fe;
  Jw(
    {
      target: 'Object',
      stat: !0,
      forced:
        !tx ||
        Zw(function () {
          ex(1);
        }),
      sham: !tx,
    },
    {
      getOwnPropertyDescriptor: function (e, t) {
        return ex(Qw(e), t);
      },
    },
  );
  var nx = st.Object,
    rx = (Kw.exports = function (e, t) {
      return nx.getOwnPropertyDescriptor(e, t);
    });
  nx.getOwnPropertyDescriptor.sham && (rx.sham = !0);
  var ax = Kw.exports;
  !(function (e) {
    e.exports = ax;
  })(qw);
  var ox = se(qw.exports),
    ix = { exports: {} },
    cx = Ha,
    ux = it,
    lx = De,
    sx = oy;
  Dr(
    { target: 'Object', stat: !0, sham: !Fe },
    {
      getOwnPropertyDescriptors: function (e) {
        for (var t, n, r = ux(e), a = lx.f, o = cx(r), i = {}, c = 0; o.length > c; )
          void 0 !== (n = a(r, (t = o[c++]))) && sx(i, t, n);
        return i;
      },
    },
  );
  var fx = st.Object.getOwnPropertyDescriptors;
  !(function (e) {
    e.exports = fx;
  })(ix);
  var dx = se(ix.exports),
    mx = { exports: {} },
    px = { exports: {} },
    vx = Dr,
    hx = Fe,
    gx = Wa.f;
  vx(
    { target: 'Object', stat: !0, forced: Object.defineProperties !== gx, sham: !hx },
    { defineProperties: gx },
  );
  var yx = st.Object,
    bx = (px.exports = function (e, t) {
      return yx.defineProperties(e, t);
    });
  yx.defineProperties.sham && (bx.sham = !0);
  var wx = px.exports;
  !(function (e) {
    e.exports = wx;
  })(mx);
  var xx = se(mx.exports),
    Ex = { exports: {} },
    kx = { exports: {} },
    Sx = Dr,
    Nx = Fe,
    Ox = ir.f;
  Sx(
    { target: 'Object', stat: !0, forced: Object.defineProperty !== Ox, sham: !Nx },
    { defineProperty: Ox },
  );
  var Tx = st.Object,
    Cx = (kx.exports = function (e, t, n) {
      return Tx.defineProperty(e, t, n);
    });
  Tx.defineProperty.sham && (Cx.sham = !0);
  var Ax = kx.exports;
  !(function (e) {
    e.exports = Ax;
  })(Ex);
  var Rx = se(Ex.exports),
    jx = { exports: {} },
    Ix = { exports: {} };
  Dr({ target: 'Array', stat: !0 }, { isArray: Ry });
  var Px = st.Array.isArray;
  !(function (e) {
    e.exports = Px;
  })(Ix),
    (function (e) {
      e.exports = Ix.exports;
    })(jx);
  var Mx = se(jx.exports);
  function Lx(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  var _x = { exports: {} },
    Dx = { exports: {} },
    Fx = TypeError,
    zx = pe,
    Hx = St,
    Bx = xn('species'),
    Ux = function (e) {
      return (
        Hx >= 51 ||
        !zx(function () {
          var t = [];
          return (
            ((t.constructor = {})[Bx] = function () {
              return { foo: 1 };
            }),
            1 !== t[e](Boolean).foo
          );
        })
      );
    },
    Yx = Dr,
    Vx = pe,
    Wx = Ry,
    Gx = lt,
    Xx = nn,
    $x = ya,
    qx = function (e) {
      if (e > 9007199254740991) throw Fx('Maximum allowed index exceeded');
      return e;
    },
    Kx = oy,
    Jx = Dy,
    Zx = Ux,
    Qx = St,
    eE = xn('isConcatSpreadable'),
    tE =
      Qx >= 51 ||
      !Vx(function () {
        var e = [];
        return (e[eE] = !1), e.concat()[0] !== e;
      }),
    nE = function (e) {
      if (!Gx(e)) return !1;
      var t = e[eE];
      return void 0 !== t ? !!t : Wx(e);
    };
  Yx(
    { target: 'Array', proto: !0, arity: 1, forced: !tE || !Zx('concat') },
    {
      concat: function (e) {
        var t,
          n,
          r,
          a,
          o,
          i = Xx(this),
          c = Jx(i, 0),
          u = 0;
        for (t = -1, r = arguments.length; t < r; t++)
          if (nE((o = -1 === t ? i : arguments[t])))
            for (a = $x(o), qx(u + a), n = 0; n < a; n++, u++) n in o && Kx(c, u, o[n]);
          else qx(u + 1), Kx(c, u++, o);
        return (c.length = u), c;
      },
    },
  ),
    ky('asyncIterator'),
    ky('hasInstance'),
    ky('isConcatSpreadable'),
    ky('iterator'),
    ky('match'),
    ky('matchAll'),
    ky('replace'),
    ky('search'),
    ky('species'),
    ky('split');
  var rE = Cy;
  ky('toPrimitive'), rE();
  var aE = vt,
    oE = Dc;
  ky('toStringTag'), oE(aE('Symbol'), 'Symbol'), ky('unscopables'), Dc(me.JSON, 'JSON', !0);
  var iE = st.Symbol;
  ky('dispose');
  var cE = iE;
  ky('asyncDispose');
  var uE = Dr,
    lE = Ne,
    sE = vt('Symbol'),
    fE = sE.keyFor,
    dE = lE(sE.prototype.valueOf);
  uE(
    { target: 'Symbol', stat: !0 },
    {
      isRegistered: function (e) {
        try {
          return void 0 !== fE(dE(e));
        } catch (e) {
          return !1;
        }
      },
    },
  );
  for (
    var mE = Dr,
      pE = Xt.exports,
      vE = vt,
      hE = Ne,
      gE = Pt,
      yE = xn,
      bE = vE('Symbol'),
      wE = bE.isWellKnown,
      xE = vE('Object', 'getOwnPropertyNames'),
      EE = hE(bE.prototype.valueOf),
      kE = pE('wks'),
      SE = 0,
      NE = xE(bE),
      OE = NE.length;
    SE < OE;
    SE++
  )
    try {
      var TE = NE[SE];
      gE(bE[TE]) && yE(TE);
    } catch (e) {}
  mE(
    { target: 'Symbol', stat: !0, forced: !0 },
    {
      isWellKnown: function (e) {
        if (wE && wE(e)) return !0;
        try {
          for (var t = EE(e), n = 0, r = xE(kE), a = r.length; n < a; n++)
            if (kE[r[n]] == t) return !0;
        } catch (e) {}
        return !1;
      },
    },
  ),
    ky('matcher'),
    ky('metadataKey'),
    ky('observable'),
    ky('metadata'),
    ky('patternMatch'),
    ky('replaceAll');
  var CE = cE;
  !(function (e) {
    e.exports = CE;
  })(Dx),
    (function (e) {
      e.exports = Dx.exports;
    })(_x);
  var AE = se(_x.exports),
    RE = { exports: {} },
    jE = { exports: {} },
    IE = Ko;
  !(function (e) {
    e.exports = IE;
  })(jE),
    (function (e) {
      e.exports = jE.exports;
    })(RE);
  var PE = se(RE.exports),
    ME = { exports: {} },
    LE = { exports: {} },
    _E = fr,
    DE = ci,
    FE = or,
    zE = Be,
    HE = nn,
    BE = function (e, t, n, r) {
      try {
        return r ? t(_E(n)[0], n[1]) : t(n);
      } catch (t) {
        DE(e, 'throw', t);
      }
    },
    UE = Lo,
    YE = Xu,
    VE = ya,
    WE = oy,
    GE = ri,
    XE = Ko,
    $E = Array,
    qE = function (e) {
      var t = HE(e),
        n = YE(this),
        r = arguments.length,
        a = r > 1 ? arguments[1] : void 0,
        o = void 0 !== a;
      o && (a = FE(a, r > 2 ? arguments[2] : void 0));
      var i,
        c,
        u,
        l,
        s,
        f,
        d = XE(t),
        m = 0;
      if (!d || (this === $E && UE(d)))
        for (i = VE(t), c = n ? new this(i) : $E(i); i > m; m++)
          (f = o ? a(t[m], m) : t[m]), WE(c, m, f);
      else
        for (s = (l = GE(t, d)).next, c = n ? new this() : []; !(u = zE(s, l)).done; m++)
          (f = o ? BE(l, a, [u.value, m], !0) : u.value), WE(c, m, f);
      return (c.length = m), c;
    };
  Dr(
    {
      target: 'Array',
      stat: !0,
      forced: !Cf(function (e) {
        Array.from(e);
      }),
    },
    { from: qE },
  );
  var KE = st.Array.from;
  !(function (e) {
    e.exports = KE;
  })(LE),
    (function (e) {
      e.exports = LE.exports;
    })(ME);
  var JE = se(ME.exports);
  var ZE = { exports: {} },
    QE = { exports: {} },
    ek = Dr,
    tk = Ry,
    nk = Xu,
    rk = lt,
    ak = pa,
    ok = ya,
    ik = it,
    ck = oy,
    uk = xn,
    lk = rl,
    sk = Ux('slice'),
    fk = uk('species'),
    dk = Array,
    mk = Math.max;
  ek(
    { target: 'Array', proto: !0, forced: !sk },
    {
      slice: function (e, t) {
        var n,
          r,
          a,
          o = ik(this),
          i = ok(o),
          c = ak(e, i),
          u = ak(void 0 === t ? i : t, i);
        if (
          tk(o) &&
          ((n = o.constructor),
          ((nk(n) && (n === dk || tk(n.prototype))) || (rk(n) && null === (n = n[fk]))) &&
            (n = void 0),
          n === dk || void 0 === n)
        )
          return lk(o, c, u);
        for (r = new (void 0 === n ? dk : n)(mk(u - c, 0)), a = 0; c < u; c++, a++)
          c in o && ck(r, a, o[c]);
        return (r.length = a), r;
      },
    },
  );
  var pk = st,
    vk = function (e) {
      return pk[e + 'Prototype'];
    },
    hk = vk('Array').slice,
    gk = ht,
    yk = hk,
    bk = Array.prototype,
    wk = function (e) {
      var t = e.slice;
      return e === bk || (gk(bk, e) && t === bk.slice) ? yk : t;
    },
    xk = wk;
  !(function (e) {
    e.exports = xk;
  })(QE),
    (function (e) {
      e.exports = QE.exports;
    })(ZE);
  var Ek = se(ZE.exports);
  function kk(e, t) {
    var n;
    if (e) {
      if ('string' == typeof e) return Lx(e, t);
      var r = Ek((n = Object.prototype.toString.call(e))).call(n, 8, -1);
      return (
        'Object' === r && e.constructor && (r = e.constructor.name),
        'Map' === r || 'Set' === r
          ? JE(e)
          : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
          ? Lx(e, t)
          : void 0
      );
    }
  }
  function Sk(e) {
    return (
      (function (e) {
        if (Mx(e)) return Lx(e);
      })(e) ||
      (function (e) {
        if ((void 0 !== AE && null != PE(e)) || null != e['@@iterator']) return JE(e);
      })(e) ||
      kk(e) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
        );
      })()
    );
  }
  function Nk(e, t) {
    return (
      (function (e) {
        if (Mx(e)) return e;
      })(e) ||
      (function (e, t) {
        var n = null == e ? null : (void 0 !== AE && PE(e)) || e['@@iterator'];
        if (null != n) {
          var r,
            a,
            o,
            i,
            c = [],
            u = !0,
            l = !1;
          try {
            if (((o = (n = n.call(e)).next), 0 === t)) {
              if (Object(n) !== n) return;
              u = !1;
            } else for (; !(u = (r = o.call(n)).done) && (c.push(r.value), c.length !== t); u = !0);
          } catch (e) {
            (l = !0), (a = e);
          } finally {
            try {
              if (!u && null != n.return && ((i = n.return()), Object(i) !== i)) return;
            } finally {
              if (l) throw a;
            }
          }
          return c;
        }
      })(e, t) ||
      kk(e, t) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
        );
      })()
    );
  }
  var Ok = { exports: {} },
    Tk = { exports: {} },
    Ck = Ax;
  !(function (e) {
    e.exports = Ck;
  })(Tk),
    (function (e) {
      e.exports = Tk.exports;
    })(Ok);
  var Ak = se(Ok.exports),
    Rk = { exports: {} },
    jk = { exports: {} },
    Ik = gy.f('iterator');
  !(function (e) {
    e.exports = Ik;
  })(jk),
    (function (e) {
      e.exports = jk.exports;
    })(Rk);
  var Pk = se(Rk.exports);
  function Mk(e) {
    return (
      (Mk =
        'function' == typeof AE && 'symbol' == typeof Pk
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e && 'function' == typeof AE && e.constructor === AE && e !== AE.prototype
                ? 'symbol'
                : typeof e;
            }),
      Mk(e)
    );
  }
  var Lk = { exports: {} },
    _k = { exports: {} },
    Dk = gy.f('toPrimitive');
  !(function (e) {
    e.exports = Dk;
  })(_k),
    (function (e) {
      e.exports = _k.exports;
    })(Lk);
  var Fk = se(Lk.exports);
  function zk(e) {
    var t = (function (e, t) {
      if ('object' !== Mk(e) || null === e) return e;
      var n = e[Fk];
      if (void 0 !== n) {
        var r = n.call(e, t || 'default');
        if ('object' !== Mk(r)) return r;
        throw new TypeError('@@toPrimitive must return a primitive value.');
      }
      return ('string' === t ? String : Number)(e);
    })(e, 'string');
    return 'symbol' === Mk(t) ? t : String(t);
  }
  function Hk(e, t, n) {
    return (
      (t = zk(t)) in e
        ? Ak(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
        : (e[t] = n),
      e
    );
  }
  var Bk = { exports: {} },
    Uk = Wy.map;
  Dr(
    { target: 'Array', proto: !0, forced: !Ux('map') },
    {
      map: function (e) {
        return Uk(this, e, arguments.length > 1 ? arguments[1] : void 0);
      },
    },
  );
  var Yk = vk('Array').map,
    Vk = ht,
    Wk = Yk,
    Gk = Array.prototype,
    Xk = function (e) {
      var t = e.map;
      return e === Gk || (Vk(Gk, e) && t === Gk.map) ? Wk : t;
    };
  !(function (e) {
    e.exports = Xk;
  })(Bk);
  var $k = se(Bk.exports),
    qk = { exports: {} },
    Kk = vk('Array').concat,
    Jk = ht,
    Zk = Kk,
    Qk = Array.prototype,
    eS = function (e) {
      var t = e.concat;
      return e === Qk || (Jk(Qk, e) && t === Qk.concat) ? Zk : t;
    };
  !(function (e) {
    e.exports = eS;
  })(qk);
  var tS = se(qk.exports),
    nS = { exports: {} },
    rS = Wy.filter;
  Dr(
    { target: 'Array', proto: !0, forced: !Ux('filter') },
    {
      filter: function (e) {
        return rS(this, e, arguments.length > 1 ? arguments[1] : void 0);
      },
    },
  );
  var aS = vk('Array').filter,
    oS = ht,
    iS = aS,
    cS = Array.prototype,
    uS = function (e) {
      var t = e.filter;
      return e === cS || (oS(cS, e) && t === cS.filter) ? iS : t;
    };
  !(function (e) {
    e.exports = uS;
  })(nS);
  var lS = se(nS.exports),
    sS = Lh,
    fS = String,
    dS = function (e) {
      if ('Symbol' === sS(e)) throw TypeError('Cannot convert a Symbol value to a string');
      return fS(e);
    },
    mS = kp,
    pS = function () {
      var e = mS(this),
        t = '';
      return (
        e.hasIndices && (t += 'd'),
        e.global && (t += 'g'),
        e.ignoreCase && (t += 'i'),
        e.multiline && (t += 'm'),
        e.dotAll && (t += 's'),
        e.unicode && (t += 'u'),
        e.unicodeSets && (t += 'v'),
        e.sticky && (t += 'y'),
        t
      );
    },
    vS = Op,
    hS = Cm,
    gS = Rp,
    yS = pS,
    bS = RegExp.prototype,
    wS = kv.PROPER,
    xS = Sh,
    ES = kp,
    kS = dS,
    SS = dm,
    NS = function (e) {
      var t = e.flags;
      return void 0 !== t || 'flags' in bS || hS(e, 'flags') || !gS(bS, e) ? t : vS(yS, e);
    },
    OS = 'toString',
    TS = RegExp.prototype[OS],
    CS = SS(function () {
      return '/a/b' != TS.call({ source: 'a', flags: 'b' });
    }),
    AS = wS && TS.name != OS;
  function RS(e, t) {
    var n = Qg(e);
    if ($w) {
      var r = $w(e);
      t &&
        (r = lS(r).call(r, function (t) {
          return ox(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function jS(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? RS(Object(n), !0).forEach(function (t) {
            Hk(e, t, n[t]);
          })
        : dx
        ? xx(e, dx(n))
        : RS(Object(n)).forEach(function (t) {
            Rx(e, t, ox(n, t));
          });
    }
    return e;
  }
  (CS || AS) &&
    xS(
      RegExp.prototype,
      OS,
      function () {
        var e = ES(this);
        return '/' + kS(e.source) + '/' + kS(NS(e));
      },
      { unsafe: !0 },
    );
  var IS = 0,
    PS = function (e, t) {
      var n,
        r = e.createdAt || Date.now(),
        a = e.hasTime || r - IS > 3e5;
      return (
        a && (IS = r),
        jS(
          jS({}, e),
          {},
          {
            _id:
              e._id ||
              t ||
              ((n = 2147483648),
              Math.floor(Math.random() * n).toString(36) +
                Math.abs(Math.floor(Math.random() * n) ^ Date.now()).toString(36)),
            createdAt: r,
            position: e.position || 'left',
            hasTime: a,
          },
        )
      );
    },
    MS = '_TYPING_';
  function LS(e) {
    var n = e.active,
      r = void 0 !== n && n,
      a = e.ref,
      o = e.delay,
      i = void 0 === o ? 300 : o,
      c = Nk(t.useState(!1), 2),
      u = c[0],
      l = c[1],
      s = Nk(t.useState(!1), 2),
      f = s[0],
      d = s[1],
      m = t.useRef(),
      p = function () {
        m.current && clearTimeout(m.current);
      };
    return (
      t.useEffect(
        function () {
          return (
            r
              ? (p(), d(r))
              : (l(r),
                (m.current = setTimeout(function () {
                  d(r);
                }, i))),
            p
          );
        },
        [r, i],
      ),
      t.useEffect(
        function () {
          a.current && a.current.offsetHeight, l(f);
        },
        [f, a],
      ),
      { didMount: f, isShow: u }
    );
  }
  var _S = { exports: {} },
    DS = { exports: {} },
    FS = Fe,
    zS = Ne,
    HS = Be,
    BS = pe,
    US = $a,
    YS = Ma,
    VS = Ue,
    WS = nn,
    GS = Qe,
    XS = Object.assign,
    $S = Object.defineProperty,
    qS = zS([].concat),
    KS =
      !XS ||
      BS(function () {
        if (
          FS &&
          1 !==
            XS(
              { b: 1 },
              XS(
                $S({}, 'a', {
                  enumerable: !0,
                  get: function () {
                    $S(this, 'b', { value: 3, enumerable: !1 });
                  },
                }),
                { b: 2 },
              ),
            ).b
        )
          return !0;
        var e = {},
          t = {},
          n = Symbol(),
          r = 'abcdefghijklmnopqrst';
        return (
          (e[n] = 7),
          r.split('').forEach(function (e) {
            t[e] = e;
          }),
          7 != XS({}, e)[n] || US(XS({}, t)).join('') != r
        );
      })
        ? function (e, t) {
            for (var n = WS(e), r = arguments.length, a = 1, o = YS.f, i = VS.f; r > a; )
              for (
                var c, u = GS(arguments[a++]), l = o ? qS(US(u), o(u)) : US(u), s = l.length, f = 0;
                s > f;

              )
                (c = l[f++]), (FS && !HS(i, u, c)) || (n[c] = u[c]);
            return n;
          }
        : XS,
    JS = KS;
  Dr({ target: 'Object', stat: !0, arity: 2, forced: Object.assign !== JS }, { assign: JS });
  var ZS = st.Object.assign;
  !(function (e) {
    e.exports = ZS;
  })(DS),
    (function (e) {
      e.exports = DS.exports;
    })(_S);
  var QS = se(_S.exports),
    eN = { exports: {} },
    tN = { exports: {} },
    nN = Ne,
    rN = zt,
    aN = lt,
    oN = on,
    iN = rl,
    cN = ve,
    uN = Function,
    lN = nN([].concat),
    sN = nN([].join),
    fN = {},
    dN = cN
      ? uN.bind
      : function (e) {
          var t = rN(this),
            n = t.prototype,
            r = iN(arguments, 1),
            a = function () {
              var n = lN(r, iN(arguments));
              return this instanceof a
                ? (function (e, t, n) {
                    if (!oN(fN, t)) {
                      for (var r = [], a = 0; a < t; a++) r[a] = 'a[' + a + ']';
                      fN[t] = uN('C,a', 'return new C(' + sN(r, ',') + ')');
                    }
                    return fN[t](e, n);
                  })(t, n.length, n)
                : t.apply(e, n);
            };
          return aN(n) && (a.prototype = n), a;
        },
    mN = dN;
  Dr({ target: 'Function', proto: !0, forced: Function.bind !== mN }, { bind: mN });
  var pN = vk('Function').bind,
    vN = ht,
    hN = pN,
    gN = Function.prototype,
    yN = function (e) {
      var t = e.bind;
      return e === gN || (vN(gN, e) && t === gN.bind) ? hN : t;
    };
  !(function (e) {
    e.exports = yN;
  })(tN),
    (function (e) {
      e.exports = tN.exports;
    })(eN);
  var bN = se(eN.exports);
  function wN() {
    var e;
    return (
      (wN = QS
        ? bN((e = QS)).call(e)
        : function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }),
      wN.apply(this, arguments)
    );
  }
  var xN = { exports: {} },
    EN = { exports: {} },
    kN = Xw;
  !(function (e) {
    e.exports = kN;
  })(EN),
    (function (e) {
      e.exports = EN.exports;
    })(xN);
  var SN = se(xN.exports),
    NN = { exports: {} },
    ON = { exports: {} },
    TN = pe,
    CN = function (e, t) {
      var n = [][e];
      return (
        !!n &&
        TN(function () {
          n.call(
            null,
            t ||
              function () {
                return 1;
              },
            1,
          );
        })
      );
    },
    AN = Dr,
    RN = ka.indexOf,
    jN = CN,
    IN = Ie([].indexOf),
    PN = !!IN && 1 / IN([1], 1, -0) < 0;
  AN(
    { target: 'Array', proto: !0, forced: PN || !jN('indexOf') },
    {
      indexOf: function (e) {
        var t = arguments.length > 1 ? arguments[1] : void 0;
        return PN ? IN(this, e, t) || 0 : RN(this, e, t);
      },
    },
  );
  var MN = vk('Array').indexOf,
    LN = ht,
    _N = MN,
    DN = Array.prototype,
    FN = function (e) {
      var t = e.indexOf;
      return e === DN || (LN(DN, e) && t === DN.indexOf) ? _N : t;
    },
    zN = FN;
  !(function (e) {
    e.exports = zN;
  })(ON),
    (function (e) {
      e.exports = ON.exports;
    })(NN);
  var HN = se(NN.exports),
    BN = { exports: {} },
    UN = { exports: {} },
    YN = Zg;
  !(function (e) {
    e.exports = YN;
  })(UN),
    (function (e) {
      e.exports = UN.exports;
    })(BN);
  var VN = se(BN.exports);
  function WN(e, t) {
    if (null == e) return {};
    var n,
      r,
      a = (function (e, t) {
        if (null == e) return {};
        var n,
          r,
          a = {},
          o = VN(e);
        for (r = 0; r < o.length; r++) (n = o[r]), HN(t).call(t, n) >= 0 || (a[n] = e[n]);
        return a;
      })(e, t);
    if (SN) {
      var o = SN(e);
      for (r = 0; r < o.length; r++)
        (n = o[r]),
          HN(t).call(t, n) >= 0 ||
            (Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n]));
    }
    return a;
  }
  var GN = { exports: {} },
    XN = Dr,
    $N = we,
    qN = dN,
    KN = Ju,
    JN = fr,
    ZN = lt,
    QN = go,
    eO = pe,
    tO = vt('Reflect', 'construct'),
    nO = Object.prototype,
    rO = [].push,
    aO = eO(function () {
      function e() {}
      return !(tO(function () {}, [], e) instanceof e);
    }),
    oO = !eO(function () {
      tO(function () {});
    }),
    iO = aO || oO;
  XN(
    { target: 'Reflect', stat: !0, forced: iO, sham: iO },
    {
      construct: function (e, t) {
        KN(e), JN(t);
        var n = arguments.length < 3 ? e : KN(arguments[2]);
        if (oO && !aO) return tO(e, t, n);
        if (e == n) {
          switch (t.length) {
            case 0:
              return new e();
            case 1:
              return new e(t[0]);
            case 2:
              return new e(t[0], t[1]);
            case 3:
              return new e(t[0], t[1], t[2]);
            case 4:
              return new e(t[0], t[1], t[2], t[3]);
          }
          var r = [null];
          return $N(rO, r, t), new ($N(qN, e, r))();
        }
        var a = n.prototype,
          o = QN(ZN(a) ? a : nO),
          i = $N(e, o, t);
        return ZN(i) ? i : o;
      },
    },
  );
  var cO = st.Reflect.construct;
  !(function (e) {
    e.exports = cO;
  })(GN);
  var uO = se(GN.exports);
  function lO(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      (r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        'value' in r && (r.writable = !0),
        Ak(e, zk(r.key), r);
    }
  }
  var sO = { exports: {} },
    fO = { exports: {} };
  Dr({ target: 'Object', stat: !0, sham: !Fe }, { create: go });
  var dO = st.Object,
    mO = function (e, t) {
      return dO.create(e, t);
    };
  !(function (e) {
    e.exports = mO;
  })(fO),
    (function (e) {
      e.exports = fO.exports;
    })(sO);
  var pO = se(sO.exports),
    vO = { exports: {} },
    hO = { exports: {} };
  Dr({ target: 'Object', stat: !0 }, { setPrototypeOf: oa });
  var gO = st.Object.setPrototypeOf;
  !(function (e) {
    e.exports = gO;
  })(hO),
    (function (e) {
      e.exports = hO.exports;
    })(vO);
  var yO = se(vO.exports);
  function bO(e, t) {
    var n;
    return (
      (bO = yO
        ? bN((n = yO)).call(n)
        : function (e, t) {
            return (e.__proto__ = t), e;
          }),
      bO(e, t)
    );
  }
  function wO(e, t) {
    if (t && ('object' === Mk(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return (function (e) {
      if (void 0 === e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    })(e);
  }
  var xO = { exports: {} },
    EO = { exports: {} },
    kO = nn,
    SO = Kr,
    NO = Ur;
  Dr(
    {
      target: 'Object',
      stat: !0,
      forced: pe(function () {
        SO(1);
      }),
      sham: !NO,
    },
    {
      getPrototypeOf: function (e) {
        return SO(kO(e));
      },
    },
  );
  var OO = st.Object.getPrototypeOf;
  !(function (e) {
    e.exports = OO;
  })(EO),
    (function (e) {
      e.exports = EO.exports;
    })(xO);
  var TO = se(xO.exports);
  function CO(e) {
    var t;
    return (
      (CO = yO
        ? bN((t = TO)).call(t)
        : function (e) {
            return e.__proto__ || TO(e);
          }),
      CO(e)
    );
  }
  var AO = ['FallbackComponent', 'children'];
  function RO(e) {
    var t = (function () {
      if ('undefined' == typeof Reflect || !uO) return !1;
      if (uO.sham) return !1;
      if ('function' == typeof Proxy) return !0;
      try {
        return Boolean.prototype.valueOf.call(uO(Boolean, [], function () {})), !0;
      } catch (e) {
        return !1;
      }
    })();
    return function () {
      var n,
        r = CO(e);
      if (t) {
        var a = CO(this).constructor;
        n = uO(r, arguments, a);
      } else n = r.apply(this, arguments);
      return wO(this, n);
    };
  }
  var jO = (function (e) {
      !(function (e, t) {
        if ('function' != typeof t && null !== t)
          throw new TypeError('Super expression must either be null or a function');
        (e.prototype = pO(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          Ak(e, 'prototype', { writable: !1 }),
          t && bO(e, t);
      })(i, e);
      var t,
        n,
        r,
        a = RO(i);
      function i(e) {
        var t;
        return (
          (function (e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
          })(this, i),
          ((t = a.call(this, e)).state = { error: null, errorInfo: null }),
          t
        );
      }
      return (
        (t = i),
        (n = [
          {
            key: 'componentDidCatch',
            value: function (e, t) {
              var n = this.props.onError;
              n && n(e, t), this.setState({ error: e, errorInfo: t });
            },
          },
          {
            key: 'render',
            value: function () {
              var e = this.props,
                t = e.FallbackComponent,
                n = e.children,
                r = WN(e, AO),
                a = this.state,
                i = a.error,
                c = a.errorInfo;
              return c
                ? t
                  ? o.default.createElement(t, wN({ error: i, errorInfo: c }, r))
                  : null
                : n;
            },
          },
        ]) && lO(t.prototype, n),
        r && lO(t, r),
        Ak(t, 'prototype', { writable: !1 }),
        i
      );
    })(o.default.Component),
    IO = ['component', 'onError', 'fallback'],
    PO = function (e) {
      var n = e.component,
        r = e.onError,
        a = e.fallback,
        i = WN(e, IO);
      return n
        ? o.default.createElement(
            jO,
            { onError: r },
            o.default.createElement(
              t.Suspense,
              { fallback: a || null },
              o.default.createElement(n, i),
            ),
          )
        : null;
    },
    MO = o.default.createContext({
      addComponent: function () {},
      hasComponent: function () {
        return !1;
      },
      getComponent: function () {
        return null;
      },
    });
  function LO() {
    return o.default.useContext(MO);
  }
  var _O = ['code', 'fallback', 'onLoad', 'onError'],
    DO = ['component', 'code', 'onLoad'],
    FO = function (e) {
      var t = e.code,
        n = e.fallback,
        r = e.onLoad,
        a = e.onError,
        i = WN(e, _O),
        c = (0, LO().getComponent)(t, function (e) {
          'async' in e && r ? r(e) : 'errCode' in e && a && a(new Error(e.errCode));
        });
      return o.default.createElement(PO, wN({ component: c, onError: a, fallback: n }, i));
    };
  function zO(e, t) {
    var n = Qg(e);
    if ($w) {
      var r = $w(e);
      t &&
        (r = lS(r).call(r, function (t) {
          return ox(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function HO(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? zO(Object(n), !0).forEach(function (t) {
            Hk(e, t, n[t]);
          })
        : dx
        ? xx(e, dx(n))
        : zO(Object(n)).forEach(function (t) {
            Rx(e, t, ox(n, t));
          });
    }
    return e;
  }
  var BO = function (e) {
      var t = e.className,
        n = e.src,
        r = e.alt,
        a = e.url,
        i = e.size,
        c = void 0 === i ? 'md' : i,
        l = e.shape,
        s = void 0 === l ? 'circle' : l,
        f = e.children,
        d = a ? 'a' : 'span';
      return o.default.createElement(
        d,
        { className: u('Avatar', 'Avatar--'.concat(c), 'Avatar--'.concat(s), t), href: a },
        n ? o.default.createElement('img', { src: n, alt: r }) : f,
      );
    },
    UO = ['className', 'active', 'onClick'],
    YO = function (e) {
      var t = e.className,
        n = e.active,
        r = e.onClick,
        a = WN(e, UO);
      return o.default.createElement(
        'div',
        wN(
          {
            className: u('Backdrop', t, { active: n }),
            onClick: r,
            role: 'button',
            tabIndex: -1,
            'aria-hidden': !0,
          },
          a,
        ),
      );
    },
    VO = ['type', 'content', 'children'],
    WO = function (e) {
      var t = e.type,
        n = void 0 === t ? 'text' : t,
        r = e.content,
        a = e.children,
        i = WN(e, VO);
      return o.default.createElement(
        'div',
        wN({ className: 'Bubble '.concat(n), 'data-type': n }, i),
        r && o.default.createElement('p', null, r),
        a,
      );
    },
    GO = ['type', 'className', 'spin', 'name'],
    XO = o.default.forwardRef(function (e, t) {
      var n = e.type,
        r = e.className,
        a = e.spin,
        i = e.name,
        c = WN(e, GO),
        l = 'string' == typeof i ? { 'aria-label': i } : { 'aria-hidden': !0 };
      return o.default.createElement(
        'svg',
        wN({ className: u('Icon', { 'is-spin': a }, r), ref: t }, l, c),
        o.default.createElement('use', { xlinkHref: '#icon-'.concat(n) }),
      );
    }),
    $O = [
      'className',
      'label',
      'color',
      'variant',
      'size',
      'icon',
      'loading',
      'block',
      'disabled',
      'children',
      'onClick',
    ];
  function qO(e) {
    return e && 'Btn--'.concat(e);
  }
  var KO = o.default.forwardRef(function (e, t) {
      var n = e.className,
        r = e.label,
        a = e.color,
        i = e.variant,
        c = e.size,
        l = e.icon,
        s = e.loading,
        f = e.block,
        d = e.disabled,
        m = e.children,
        p = e.onClick,
        v = WN(e, $O),
        h = l || (s && 'spinner'),
        g = c || (f ? 'lg' : '');
      return o.default.createElement(
        'button',
        wN(
          {
            className: u('Btn', qO(a), qO(i), qO(g), { 'Btn--block': f }, n),
            type: 'button',
            disabled: d,
            onClick: function (e) {
              d || s || !p || p(e);
            },
            ref: t,
          },
          v,
        ),
        h &&
          o.default.createElement(
            'span',
            { className: 'Btn-icon' },
            o.default.createElement(XO, { type: h, spin: s }),
          ),
        r || m,
      );
    }),
    JO = ['className', 'size', 'fluid', 'children'],
    ZO = o.default.forwardRef(function (e, t) {
      var n = e.className,
        r = e.size,
        a = e.fluid,
        i = e.children,
        c = WN(e, JO);
      return o.default.createElement(
        'div',
        wN(
          {
            className: u('Card', r && 'Card--'.concat(r), { 'Card--fluid': a }, n),
            'data-fluid': a,
          },
          c,
          { ref: t },
        ),
        i,
      );
    }),
    QO = [
      'as',
      'className',
      'inline',
      'center',
      'direction',
      'wrap',
      'justifyContent',
      'justify',
      'alignItems',
      'align',
      'children',
    ],
    eT = {
      row: 'Flex--d-r',
      'row-reverse': 'Flex--d-rr',
      column: 'Flex--d-c',
      'column-reverse': 'Flex--d-cr',
    },
    tT = { nowrap: 'Flex--w-n', wrap: 'Flex--w-w', 'wrap-reverse': 'Flex--w-wr' },
    nT = {
      'flex-start': 'Flex--jc-fs',
      'flex-end': 'Flex--jc-fe',
      center: 'Flex--jc-c',
      'space-between': 'Flex--jc-sb',
      'space-around': 'Flex--jc-sa',
    },
    rT = { 'flex-start': 'Flex--ai-fs', 'flex-end': 'Flex--ai-fe', center: 'Flex--ai-c' },
    aT = o.default.forwardRef(function (e, t) {
      var n = e.as,
        r = void 0 === n ? 'div' : n,
        a = e.className,
        i = e.inline,
        c = e.center,
        l = e.direction,
        s = e.wrap,
        f = e.justifyContent,
        d = e.justify,
        m = void 0 === d ? f : d,
        p = e.alignItems,
        v = e.align,
        h = void 0 === v ? p : v,
        g = e.children,
        y = WN(e, QO);
      return o.default.createElement(
        r,
        wN(
          {
            className: u(
              'Flex',
              l && eT[l],
              m && nT[m],
              h && rT[h],
              s && tT[s],
              { 'Flex--inline': i, 'Flex--center': c },
              a,
            ),
            ref: t,
          },
          y,
        ),
        g,
      );
    }),
    oT = ['className', 'flex', 'alignSelf', 'order', 'style', 'children'];
  function iT(e, t) {
    var n = Qg(e);
    if ($w) {
      var r = $w(e);
      t &&
        (r = lS(r).call(r, function (t) {
          return ox(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function cT(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? iT(Object(n), !0).forEach(function (t) {
            Hk(e, t, n[t]);
          })
        : dx
        ? xx(e, dx(n))
        : iT(Object(n)).forEach(function (t) {
            Rx(e, t, ox(n, t));
          });
    }
    return e;
  }
  var uT = function (e) {
      var t = e.className,
        n = e.flex,
        r = e.alignSelf,
        a = e.order,
        i = e.style,
        c = e.children,
        l = WN(e, oT);
      return o.default.createElement(
        'div',
        wN(
          {
            className: u('FlexItem', t),
            style: cT(cT({}, i), {}, { flex: n, alignSelf: r, order: a }),
          },
          l,
        ),
        c,
      );
    },
    lT = ['className', 'aspectRatio', 'color', 'image', 'children'],
    sT = ['className', 'children'],
    fT = ['className', 'title', 'subtitle', 'center', 'children'],
    dT = ['className', 'children'],
    mT = ['children', 'className', 'direction'],
    pT = {},
    vT = {},
    hT = {}.propertyIsEnumerable,
    gT = Object.getOwnPropertyDescriptor,
    yT = gT && !hT.call({ 1: 2 }, 1);
  vT.f = yT
    ? function (e) {
        var t = gT(this, e);
        return !!t && t.enumerable;
      }
    : hT;
  var bT = Zh,
    wT = Em,
    xT = function (e) {
      return bT(wT(e));
    },
    ET = lp,
    kT = Op,
    ST = vT,
    NT = Mv,
    OT = xT,
    TT = ov,
    CT = Cm,
    AT = yp,
    RT = Object.getOwnPropertyDescriptor;
  pT.f = ET
    ? RT
    : function (e, t) {
        if (((e = OT(e)), (t = TT(t)), AT))
          try {
            return RT(e, t);
          } catch (e) {}
        if (CT(e, t)) return NT(!kT(ST.f, e, t), e[t]);
      };
  var jT = {},
    IT = ng,
    PT = Math.max,
    MT = Math.min,
    LT = function (e, t) {
      var n = IT(e);
      return n < 0 ? PT(n + t, 0) : MT(n, t);
    },
    _T = xT,
    DT = LT,
    FT = cg,
    zT = function (e) {
      return function (t, n, r) {
        var a,
          o = _T(t),
          i = FT(o),
          c = DT(r, i);
        if (e && n != n) {
          for (; i > c; ) if ((a = o[c++]) != a) return !0;
        } else for (; i > c; c++) if ((e || c in o) && o[c] === n) return e || c || 0;
        return !e && -1;
      };
    },
    HT = { includes: zT(!0), indexOf: zT(!1) },
    BT = Cm,
    UT = xT,
    YT = HT.indexOf,
    VT = Uv,
    WT = ym([].push),
    GT = function (e, t) {
      var n,
        r = UT(e),
        a = 0,
        o = [];
      for (n in r) !BT(VT, n) && BT(r, n) && WT(o, n);
      for (; t.length > a; ) BT(r, (n = t[a++])) && (~YT(o, n) || WT(o, n));
      return o;
    },
    XT = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf',
    ],
    $T = GT,
    qT = XT.concat('length', 'prototype');
  jT.f =
    Object.getOwnPropertyNames ||
    function (e) {
      return $T(e, qT);
    };
  var KT = {};
  KT.f = Object.getOwnPropertySymbols;
  var JT,
    ZT,
    QT,
    eC,
    tC = Ap,
    nC = jT,
    rC = KT,
    aC = kp,
    oC = ym([].concat),
    iC =
      tC('Reflect', 'ownKeys') ||
      function (e) {
        var t = nC.f(aC(e)),
          n = rC.f;
        return n ? oC(t, n(e)) : t;
      },
    cC = Cm,
    uC = iC,
    lC = pT,
    sC = up,
    fC = dm,
    dC = cp,
    mC = /#|\.prototype\./,
    pC = function (e, t) {
      var n = hC[vC(e)];
      return n == yC || (n != gC && (dC(t) ? fC(t) : !!t));
    },
    vC = (pC.normalize = function (e) {
      return String(e).replace(mC, '.').toLowerCase();
    }),
    hC = (pC.data = {}),
    gC = (pC.NATIVE = 'N'),
    yC = (pC.POLYFILL = 'P'),
    bC = pC,
    wC = tm,
    xC = pT.f,
    EC = Dv,
    kC = Sh,
    SC = om,
    NC = function (e, t, n) {
      for (var r = uC(t), a = sC.f, o = lC.f, i = 0; i < r.length; i++) {
        var c = r[i];
        cC(e, c) || (n && cC(n, c)) || a(e, c, o(t, c));
      }
    },
    OC = bC,
    TC = function (e, t) {
      var n,
        r,
        a,
        o,
        i,
        c = e.target,
        u = e.global,
        l = e.stat;
      if ((n = u ? wC : l ? wC[c] || SC(c, {}) : (wC[c] || {}).prototype))
        for (r in t) {
          if (
            ((o = t[r]),
            (a = e.dontCallGetSet ? (i = xC(n, r)) && i.value : n[r]),
            !OC(u ? r : c + (l ? '.' : '#') + r, e.forced) && void 0 !== a)
          ) {
            if (typeof o == typeof a) continue;
            NC(o, a);
          }
          (e.sham || (a && a.sham)) && EC(o, 'sham', !0), kC(n, r, o, e);
        }
    },
    CC = 'undefined' != typeof process && 'process' == Ch(process),
    AC = ym,
    RC = Bp,
    jC = cp,
    IC = String,
    PC = TypeError,
    MC = function (e, t, n) {
      try {
        return AC(RC(Object.getOwnPropertyDescriptor(e, t)[n]));
      } catch (e) {}
    },
    LC = kp,
    _C = function (e) {
      if ('object' == typeof e || jC(e)) return e;
      throw PC("Can't set " + IC(e) + ' as a prototype');
    },
    DC =
      Object.setPrototypeOf ||
      ('__proto__' in {}
        ? (function () {
            var e,
              t = !1,
              n = {};
            try {
              (e = MC(Object.prototype, '__proto__', 'set'))(n, []), (t = n instanceof Array);
            } catch (e) {}
            return function (n, r) {
              return LC(n), _C(r), t ? e(n, r) : (n.__proto__ = r), n;
            };
          })()
        : void 0),
    FC = up.f,
    zC = Cm,
    HC = tp('toStringTag'),
    BC = gv.exports,
    UC = up,
    YC = Ap,
    VC = function (e, t, n) {
      return (
        n.get && BC(n.get, t, { getter: !0 }), n.set && BC(n.set, t, { setter: !0 }), UC.f(e, t, n)
      );
    },
    WC = lp,
    GC = tp('species'),
    XC = Rp,
    $C = TypeError,
    qC = kg,
    KC = Dp,
    JC = TypeError,
    ZC = kp,
    QC = function (e) {
      if (qC(e)) return e;
      throw JC(KC(e) + ' is not a constructor');
    },
    eA = bm,
    tA = tp('species'),
    nA = function (e, t) {
      var n,
        r = ZC(e).constructor;
      return void 0 === r || eA((n = ZC(r)[tA])) ? t : QC(n);
    },
    rA = mm,
    aA = Function.prototype,
    oA = aA.apply,
    iA = aA.call,
    cA =
      ('object' == typeof Reflect && Reflect.apply) ||
      (rA
        ? iA.bind(oA)
        : function () {
            return iA.apply(oA, arguments);
          }),
    uA = Ap('document', 'documentElement'),
    lA = ym([].slice),
    sA = TypeError,
    fA = /(?:ipad|iphone|ipod).*applewebkit/i.test(Mm),
    dA = tm,
    mA = cA,
    pA = Xh,
    vA = cp,
    hA = Cm,
    gA = dm,
    yA = uA,
    bA = lA,
    wA = hp,
    xA = function (e, t) {
      if (e < t) throw sA('Not enough arguments');
      return e;
    },
    EA = fA,
    kA = CC,
    SA = dA.setImmediate,
    NA = dA.clearImmediate,
    OA = dA.process,
    TA = dA.Dispatch,
    CA = dA.Function,
    AA = dA.MessageChannel,
    RA = dA.String,
    jA = 0,
    IA = {},
    PA = 'onreadystatechange';
  gA(function () {
    JT = dA.location;
  });
  var MA = function (e) {
      if (hA(IA, e)) {
        var t = IA[e];
        delete IA[e], t();
      }
    },
    LA = function (e) {
      return function () {
        MA(e);
      };
    },
    _A = function (e) {
      MA(e.data);
    },
    DA = function (e) {
      dA.postMessage(RA(e), JT.protocol + '//' + JT.host);
    };
  (SA && NA) ||
    ((SA = function (e) {
      xA(arguments.length, 1);
      var t = vA(e) ? e : CA(e),
        n = bA(arguments, 1);
      return (
        (IA[++jA] = function () {
          mA(t, void 0, n);
        }),
        ZT(jA),
        jA
      );
    }),
    (NA = function (e) {
      delete IA[e];
    }),
    kA
      ? (ZT = function (e) {
          OA.nextTick(LA(e));
        })
      : TA && TA.now
      ? (ZT = function (e) {
          TA.now(LA(e));
        })
      : AA && !EA
      ? ((eC = (QT = new AA()).port2), (QT.port1.onmessage = _A), (ZT = pA(eC.postMessage, eC)))
      : dA.addEventListener &&
        vA(dA.postMessage) &&
        !dA.importScripts &&
        JT &&
        'file:' !== JT.protocol &&
        !gA(DA)
      ? ((ZT = DA), dA.addEventListener('message', _A, !1))
      : (ZT =
          PA in wA('script')
            ? function (e) {
                yA.appendChild(wA('script'))[PA] = function () {
                  yA.removeChild(this), MA(e);
                };
              }
            : function (e) {
                setTimeout(LA(e), 0);
              }));
  var FA = { set: SA, clear: NA },
    zA = function () {
      (this.head = null), (this.tail = null);
    };
  zA.prototype = {
    add: function (e) {
      var t = { item: e, next: null },
        n = this.tail;
      n ? (n.next = t) : (this.head = t), (this.tail = t);
    },
    get: function () {
      var e = this.head;
      if (e) return null === (this.head = e.next) && (this.tail = null), e.item;
    },
  };
  var HA,
    BA,
    UA,
    YA,
    VA,
    WA = zA,
    GA = /ipad|iphone|ipod/i.test(Mm) && 'undefined' != typeof Pebble,
    XA = /web0s(?!.*chrome)/i.test(Mm),
    $A = tm,
    qA = Xh,
    KA = pT.f,
    JA = FA.set,
    ZA = WA,
    QA = fA,
    eR = GA,
    tR = XA,
    nR = CC,
    rR = $A.MutationObserver || $A.WebKitMutationObserver,
    aR = $A.document,
    oR = $A.process,
    iR = $A.Promise,
    cR = KA($A, 'queueMicrotask'),
    uR = cR && cR.value;
  if (!uR) {
    var lR = new ZA(),
      sR = function () {
        var e, t;
        for (nR && (e = oR.domain) && e.exit(); (t = lR.get()); )
          try {
            t();
          } catch (e) {
            throw (lR.head && HA(), e);
          }
        e && e.enter();
      };
    QA || nR || tR || !rR || !aR
      ? !eR && iR && iR.resolve
        ? (((YA = iR.resolve(void 0)).constructor = iR),
          (VA = qA(YA.then, YA)),
          (HA = function () {
            VA(sR);
          }))
        : nR
        ? (HA = function () {
            oR.nextTick(sR);
          })
        : ((JA = qA(JA, $A)),
          (HA = function () {
            JA(sR);
          }))
      : ((BA = !0),
        (UA = aR.createTextNode('')),
        new rR(sR).observe(UA, { characterData: !0 }),
        (HA = function () {
          UA.data = BA = !BA;
        })),
      (uR = function (e) {
        lR.head || HA(), lR.add(e);
      });
  }
  var fR = uR,
    dR = function (e) {
      try {
        return { error: !1, value: e() };
      } catch (e) {
        return { error: !0, value: e };
      }
    },
    mR = tm.Promise,
    pR = 'object' == typeof Deno && Deno && 'object' == typeof Deno.version,
    vR = !pR && !CC && 'object' == typeof window && 'object' == typeof document,
    hR = tm,
    gR = mR,
    yR = cp,
    bR = bC,
    wR = Rv,
    xR = tp,
    ER = vR,
    kR = pR,
    SR = Bm;
  gR && gR.prototype;
  var NR = xR('species'),
    OR = !1,
    TR = yR(hR.PromiseRejectionEvent),
    CR = bR('Promise', function () {
      var e = wR(gR),
        t = e !== String(gR);
      if (!t && 66 === SR) return !0;
      if (!SR || SR < 51 || !/native code/.test(e)) {
        var n = new gR(function (e) {
            e(1);
          }),
          r = function (e) {
            e(
              function () {},
              function () {},
            );
          };
        if ((((n.constructor = {})[NR] = r), !(OR = n.then(function () {}) instanceof r)))
          return !0;
      }
      return !t && (ER || kR) && !TR;
    }),
    AR = { CONSTRUCTOR: CR, REJECTION_EVENT: TR, SUBCLASSING: OR },
    RR = {},
    jR = Bp,
    IR = TypeError,
    PR = function (e) {
      var t, n;
      (this.promise = new e(function (e, r) {
        if (void 0 !== t || void 0 !== n) throw IR('Bad Promise constructor');
        (t = e), (n = r);
      })),
        (this.resolve = jR(t)),
        (this.reject = jR(n));
    };
  RR.f = function (e) {
    return new PR(e);
  };
  var MR,
    LR,
    _R,
    DR = TC,
    FR = CC,
    zR = tm,
    HR = Op,
    BR = Sh,
    UR = DC,
    YR = function (e, t, n) {
      e && !n && (e = e.prototype), e && !zC(e, HC) && FC(e, HC, { configurable: !0, value: t });
    },
    VR = function (e) {
      var t = YC(e);
      WC &&
        t &&
        !t[GC] &&
        VC(t, GC, {
          configurable: !0,
          get: function () {
            return this;
          },
        });
    },
    WR = Bp,
    GR = cp,
    XR = dp,
    $R = function (e, t) {
      if (XC(t, e)) return e;
      throw $C('Incorrect invocation');
    },
    qR = nA,
    KR = FA.set,
    JR = fR,
    ZR = function (e, t) {},
    QR = dR,
    ej = WA,
    tj = nh,
    nj = mR,
    rj = RR,
    aj = 'Promise',
    oj = AR.CONSTRUCTOR,
    ij = AR.REJECTION_EVENT,
    cj = AR.SUBCLASSING,
    uj = tj.getterFor(aj),
    lj = tj.set,
    sj = nj && nj.prototype,
    fj = nj,
    dj = sj,
    mj = zR.TypeError,
    pj = zR.document,
    vj = zR.process,
    hj = rj.f,
    gj = hj,
    yj = !!(pj && pj.createEvent && zR.dispatchEvent),
    bj = 'unhandledrejection',
    wj = function (e) {
      var t;
      return !(!XR(e) || !GR((t = e.then))) && t;
    },
    xj = function (e, t) {
      var n,
        r,
        a,
        o = t.value,
        i = 1 == t.state,
        c = i ? e.ok : e.fail,
        u = e.resolve,
        l = e.reject,
        s = e.domain;
      try {
        c
          ? (i || (2 === t.rejection && Oj(t), (t.rejection = 1)),
            !0 === c ? (n = o) : (s && s.enter(), (n = c(o)), s && (s.exit(), (a = !0))),
            n === e.promise ? l(mj('Promise-chain cycle')) : (r = wj(n)) ? HR(r, n, u, l) : u(n))
          : l(o);
      } catch (e) {
        s && !a && s.exit(), l(e);
      }
    },
    Ej = function (e, t) {
      e.notified ||
        ((e.notified = !0),
        JR(function () {
          for (var n, r = e.reactions; (n = r.get()); ) xj(n, e);
          (e.notified = !1), t && !e.rejection && Sj(e);
        }));
    },
    kj = function (e, t, n) {
      var r, a;
      yj
        ? (((r = pj.createEvent('Event')).promise = t),
          (r.reason = n),
          r.initEvent(e, !1, !0),
          zR.dispatchEvent(r))
        : (r = { promise: t, reason: n }),
        !ij && (a = zR['on' + e]) ? a(r) : e === bj && ZR('Unhandled promise rejection', n);
    },
    Sj = function (e) {
      HR(KR, zR, function () {
        var t,
          n = e.facade,
          r = e.value;
        if (
          Nj(e) &&
          ((t = QR(function () {
            FR ? vj.emit('unhandledRejection', r, n) : kj(bj, n, r);
          })),
          (e.rejection = FR || Nj(e) ? 2 : 1),
          t.error)
        )
          throw t.value;
      });
    },
    Nj = function (e) {
      return 1 !== e.rejection && !e.parent;
    },
    Oj = function (e) {
      HR(KR, zR, function () {
        var t = e.facade;
        FR ? vj.emit('rejectionHandled', t) : kj('rejectionhandled', t, e.value);
      });
    },
    Tj = function (e, t, n) {
      return function (r) {
        e(t, r, n);
      };
    },
    Cj = function (e, t, n) {
      e.done || ((e.done = !0), n && (e = n), (e.value = t), (e.state = 2), Ej(e, !0));
    },
    Aj = function (e, t, n) {
      if (!e.done) {
        (e.done = !0), n && (e = n);
        try {
          if (e.facade === t) throw mj("Promise can't be resolved itself");
          var r = wj(t);
          r
            ? JR(function () {
                var n = { done: !1 };
                try {
                  HR(r, t, Tj(Aj, n, e), Tj(Cj, n, e));
                } catch (t) {
                  Cj(n, t, e);
                }
              })
            : ((e.value = t), (e.state = 1), Ej(e, !1));
        } catch (t) {
          Cj({ done: !1 }, t, e);
        }
      }
    };
  if (
    oj &&
    ((dj = (fj = function (e) {
      $R(this, dj), WR(e), HR(MR, this);
      var t = uj(this);
      try {
        e(Tj(Aj, t), Tj(Cj, t));
      } catch (e) {
        Cj(t, e);
      }
    }).prototype),
    ((MR = function (e) {
      lj(this, {
        type: aj,
        done: !1,
        notified: !1,
        parent: !1,
        reactions: new ej(),
        rejection: !1,
        state: 0,
        value: void 0,
      });
    }).prototype = BR(dj, 'then', function (e, t) {
      var n = uj(this),
        r = hj(qR(this, fj));
      return (
        (n.parent = !0),
        (r.ok = !GR(e) || e),
        (r.fail = GR(t) && t),
        (r.domain = FR ? vj.domain : void 0),
        0 == n.state
          ? n.reactions.add(r)
          : JR(function () {
              xj(r, n);
            }),
        r.promise
      );
    })),
    (LR = function () {
      var e = new MR(),
        t = uj(e);
      (this.promise = e), (this.resolve = Tj(Aj, t)), (this.reject = Tj(Cj, t));
    }),
    (rj.f = hj =
      function (e) {
        return e === fj || undefined === e ? new LR(e) : gj(e);
      }),
    GR(nj) && sj !== Object.prototype)
  ) {
    (_R = sj.then),
      cj ||
        BR(
          sj,
          'then',
          function (e, t) {
            var n = this;
            return new fj(function (e, t) {
              HR(_R, n, e, t);
            }).then(e, t);
          },
          { unsafe: !0 },
        );
    try {
      delete sj.constructor;
    } catch (e) {}
    UR && UR(sj, dj);
  }
  DR({ global: !0, constructor: !0, wrap: !0, forced: oj }, { Promise: fj }),
    YR(fj, aj, !1),
    VR(aj);
  var Rj = {},
    jj = Rj,
    Ij = tp('iterator'),
    Pj = Array.prototype,
    Mj = Lh,
    Lj = Vp,
    _j = bm,
    Dj = Rj,
    Fj = tp('iterator'),
    zj = function (e) {
      if (!_j(e)) return Lj(e, Fj) || Lj(e, '@@iterator') || Dj[Mj(e)];
    },
    Hj = Op,
    Bj = Bp,
    Uj = kp,
    Yj = Dp,
    Vj = zj,
    Wj = TypeError,
    Gj = Op,
    Xj = kp,
    $j = Vp,
    qj = Xh,
    Kj = Op,
    Jj = kp,
    Zj = Dp,
    Qj = function (e) {
      return void 0 !== e && (jj.Array === e || Pj[Ij] === e);
    },
    eI = cg,
    tI = Rp,
    nI = function (e, t) {
      var n = arguments.length < 2 ? Vj(e) : t;
      if (Bj(n)) return Uj(Hj(n, e));
      throw Wj(Yj(e) + ' is not iterable');
    },
    rI = zj,
    aI = function (e, t, n) {
      var r, a;
      Xj(e);
      try {
        if (!(r = $j(e, 'return'))) {
          if ('throw' === t) throw n;
          return n;
        }
        r = Gj(r, e);
      } catch (e) {
        (a = !0), (r = e);
      }
      if ('throw' === t) throw n;
      if (a) throw r;
      return Xj(r), n;
    },
    oI = TypeError,
    iI = function (e, t) {
      (this.stopped = e), (this.result = t);
    },
    cI = iI.prototype,
    uI = function (e, t, n) {
      var r,
        a,
        o,
        i,
        c,
        u,
        l,
        s = n && n.that,
        f = !(!n || !n.AS_ENTRIES),
        d = !(!n || !n.IS_RECORD),
        m = !(!n || !n.IS_ITERATOR),
        p = !(!n || !n.INTERRUPTED),
        v = qj(t, s),
        h = function (e) {
          return r && aI(r, 'normal', e), new iI(!0, e);
        },
        g = function (e) {
          return f ? (Jj(e), p ? v(e[0], e[1], h) : v(e[0], e[1])) : p ? v(e, h) : v(e);
        };
      if (d) r = e.iterator;
      else if (m) r = e;
      else {
        if (!(a = rI(e))) throw oI(Zj(e) + ' is not iterable');
        if (Qj(a)) {
          for (o = 0, i = eI(e); i > o; o++) if ((c = g(e[o])) && tI(cI, c)) return c;
          return new iI(!1);
        }
        r = nI(e, a);
      }
      for (u = d ? e.next : r.next; !(l = Kj(u, r)).done; ) {
        try {
          c = g(l.value);
        } catch (e) {
          aI(r, 'throw', e);
        }
        if ('object' == typeof c && c && tI(cI, c)) return c;
      }
      return new iI(!1);
    },
    lI = tp('iterator'),
    sI = !1;
  try {
    var fI = 0,
      dI = {
        next: function () {
          return { done: !!fI++ };
        },
        return: function () {
          sI = !0;
        },
      };
    (dI[lI] = function () {
      return this;
    }),
      Array.from(dI, function () {
        throw 2;
      });
  } catch (e) {}
  var mI = mR,
    pI = function (e, t) {
      if (!t && !sI) return !1;
      var n = !1;
      try {
        var r = {};
        (r[lI] = function () {
          return {
            next: function () {
              return { done: (n = !0) };
            },
          };
        }),
          e(r);
      } catch (e) {}
      return n;
    },
    vI =
      AR.CONSTRUCTOR ||
      !pI(function (e) {
        mI.all(e).then(void 0, function () {});
      }),
    hI = Op,
    gI = Bp,
    yI = RR,
    bI = dR,
    wI = uI;
  TC(
    { target: 'Promise', stat: !0, forced: vI },
    {
      all: function (e) {
        var t = this,
          n = yI.f(t),
          r = n.resolve,
          a = n.reject,
          o = bI(function () {
            var n = gI(t.resolve),
              o = [],
              i = 0,
              c = 1;
            wI(e, function (e) {
              var u = i++,
                l = !1;
              c++,
                hI(n, t, e).then(function (e) {
                  l || ((l = !0), (o[u] = e), --c || r(o));
                }, a);
            }),
              --c || r(o);
          });
        return o.error && a(o.value), n.promise;
      },
    },
  );
  var xI = TC,
    EI = AR.CONSTRUCTOR,
    kI = mR,
    SI = Ap,
    NI = cp,
    OI = Sh,
    TI = kI && kI.prototype;
  if (
    (xI(
      { target: 'Promise', proto: !0, forced: EI, real: !0 },
      {
        catch: function (e) {
          return this.then(void 0, e);
        },
      },
    ),
    NI(kI))
  ) {
    var CI = SI('Promise').prototype.catch;
    TI.catch !== CI && OI(TI, 'catch', CI, { unsafe: !0 });
  }
  var AI = Op,
    RI = Bp,
    jI = RR,
    II = dR,
    PI = uI;
  TC(
    { target: 'Promise', stat: !0, forced: vI },
    {
      race: function (e) {
        var t = this,
          n = jI.f(t),
          r = n.reject,
          a = II(function () {
            var a = RI(t.resolve);
            PI(e, function (e) {
              AI(a, t, e).then(n.resolve, r);
            });
          });
        return a.error && r(a.value), n.promise;
      },
    },
  );
  var MI = Op,
    LI = RR;
  TC(
    { target: 'Promise', stat: !0, forced: AR.CONSTRUCTOR },
    {
      reject: function (e) {
        var t = LI.f(this);
        return MI(t.reject, void 0, e), t.promise;
      },
    },
  );
  var _I = kp,
    DI = dp,
    FI = RR,
    zI = TC,
    HI = AR.CONSTRUCTOR,
    BI = function (e, t) {
      if ((_I(e), DI(t) && t.constructor === e)) return t;
      var n = FI.f(e);
      return (0, n.resolve)(t), n.promise;
    };
  Ap('Promise'),
    zI(
      { target: 'Promise', stat: !0, forced: HI },
      {
        resolve: function (e) {
          return BI(this, e);
        },
      },
    );
  var UI = { exports: {} },
    YI = ka.includes;
  Dr(
    {
      target: 'Array',
      proto: !0,
      forced: pe(function () {
        return !Array(1).includes();
      }),
    },
    {
      includes: function (e) {
        return YI(this, e, arguments.length > 1 ? arguments[1] : void 0);
      },
    },
  );
  var VI = vk('Array').includes,
    WI = lt,
    GI = Ae,
    XI = xn('match'),
    $I = function (e) {
      var t;
      return WI(e) && (void 0 !== (t = e[XI]) ? !!t : 'RegExp' == GI(e));
    },
    qI = TypeError,
    KI = xn('match'),
    JI = Dr,
    ZI = function (e) {
      if ($I(e)) throw qI("The method doesn't accept regular expressions");
      return e;
    },
    QI = rt,
    eP = Si,
    tP = function (e) {
      var t = /./;
      try {
        '/./'[e](t);
      } catch (n) {
        try {
          return (t[KI] = !1), '/./'[e](t);
        } catch (e) {}
      }
      return !1;
    },
    nP = Ne(''.indexOf);
  JI(
    { target: 'String', proto: !0, forced: !tP('includes') },
    {
      includes: function (e) {
        return !!~nP(eP(QI(this)), eP(ZI(e)), arguments.length > 1 ? arguments[1] : void 0);
      },
    },
  );
  var rP = vk('String').includes,
    aP = ht,
    oP = VI,
    iP = rP,
    cP = Array.prototype,
    uP = String.prototype,
    lP = function (e) {
      var t = e.includes;
      return e === cP || (aP(cP, e) && t === cP.includes)
        ? oP
        : 'string' == typeof e || e === uP || (aP(uP, e) && t === uP.includes)
        ? iP
        : t;
    };
  !(function (e) {
    e.exports = lP;
  })(UI);
  var sP = se(UI.exports),
    fP = { exports: {} },
    dP = '\t\n\v\f\r                　\u2028\u2029\ufeff',
    mP = rt,
    pP = Si,
    vP = dP,
    hP = Ne(''.replace),
    gP = RegExp('^[' + vP + ']+'),
    yP = RegExp('(^|[^' + vP + '])[' + vP + ']+$'),
    bP = function (e) {
      return function (t) {
        var n = pP(mP(t));
        return 1 & e && (n = hP(n, gP, '')), 2 & e && (n = hP(n, yP, '$1')), n;
      };
    },
    wP = { start: bP(1), end: bP(2), trim: bP(3) },
    xP = me,
    EP = pe,
    kP = Ne,
    SP = Si,
    NP = wP.trim,
    OP = dP,
    TP = xP.parseInt,
    CP = xP.Symbol,
    AP = CP && CP.iterator,
    RP = /^[+-]?0x/i,
    jP = kP(RP.exec),
    IP =
      8 !== TP(OP + '08') ||
      22 !== TP(OP + '0x16') ||
      (AP &&
        !EP(function () {
          TP(Object(AP));
        }))
        ? function (e, t) {
            var n = NP(SP(e));
            return TP(n, t >>> 0 || (jP(RP, n) ? 16 : 10));
          }
        : TP;
  Dr({ global: !0, forced: parseInt != IP }, { parseInt: IP });
  var PP = st.parseInt;
  !(function (e) {
    e.exports = PP;
  })(fP);
  var MP = se(fP.exports),
    LP = function (e) {
      var t = e.width,
        n = e.children;
      return o.default.createElement('div', { className: 'Carousel-item', style: { width: t } }, n);
    },
    _P = function (e, t) {
      (e.style.transform = t), (e.style.webkitTransform = t);
    },
    DP = function (e, t) {
      (e.style.transition = t), (e.style.webkitTransition = t);
    },
    FP = {
      passiveListener: function () {
        var e = !1;
        try {
          var t = Rx({}, 'passive', {
            get: function () {
              e = !0;
            },
          });
          window.addEventListener('test', null, t);
        } catch (e) {}
        return e;
      },
      smoothScroll: function () {
        return 'scrollBehavior' in document.documentElement.style;
      },
      touch: function () {
        return 'ontouchstart' in window;
      },
    };
  function zP(e) {
    return FP[e]();
  }
  var HP = ['TEXTAREA', 'OPTION', 'INPUT', 'SELECT'],
    BP = zP('touch'),
    UP = o.default.forwardRef(function (e, n) {
      var r,
        a,
        i,
        c = e.className,
        l = e.startIndex,
        s = void 0 === l ? 0 : l,
        f = e.draggable,
        d = void 0 === f || f,
        m = e.duration,
        p = void 0 === m ? 300 : m,
        v = e.easing,
        h = void 0 === v ? 'ease' : v,
        g = e.threshold,
        y = void 0 === g ? 20 : g,
        b = e.clickDragThreshold,
        w = void 0 === b ? 10 : b,
        x = e.loop,
        E = void 0 === x || x,
        k = e.rtl,
        S = void 0 !== k && k,
        N = e.autoPlay,
        O = void 0 === N ? e.autoplay || !1 : N,
        T = e.interval,
        C = void 0 === T ? e.autoplaySpeed || 4e3 : T,
        A = e.dots,
        R = void 0 === A ? e.indicators || !0 : A,
        j = e.onChange,
        I = e.children,
        P = o.default.Children.count(I),
        M = ''.concat(100 / P, '%'),
        L = t.useRef(null),
        _ = t.useRef(null),
        D = t.useRef(null),
        F = t.useRef({
          first: !0,
          wrapWidth: 0,
          hover: !1,
          startX: 0,
          endX: 0,
          startY: 0,
          canMove: null,
          pressDown: !1,
        }),
        z = t.useCallback(
          function (e) {
            return E ? e % P : Math.max(0, Math.min(e, P - 1));
          },
          [P, E],
        ),
        H = Nk(t.useState(z(s)), 2),
        B = H[0],
        U = H[1],
        Y = Nk(t.useState(!1), 2),
        V = Y[0],
        W = Y[1],
        G = t.useCallback(
          function () {
            var e;
            DP(_.current, tS((e = 'transform '.concat(p, 'ms '))).call(e, h));
          },
          [p, h],
        ),
        X = function () {
          DP(_.current, 'transform 0s');
        },
        $ = function (e) {
          _P(_.current, 'translate3d('.concat(e, 'px, 0, 0)'));
        },
        q = t.useCallback(
          function (e, t) {
            var n = (S ? 1 : -1) * (E ? e + 1 : e) * F.current.wrapWidth;
            t
              ? requestAnimationFrame(function () {
                  requestAnimationFrame(function () {
                    G(), $(n);
                  });
                })
              : $(n);
          },
          [G, E, S],
        ),
        K = t.useCallback(
          function (e) {
            if (!(P <= 1)) {
              var t = z(e);
              t !== B && U(t);
            }
          },
          [B, P, z],
        ),
        J = t.useCallback(
          function () {
            if (!(P <= 1)) {
              var e = B - 1;
              if (E) {
                if (e < 0) {
                  var t = F.current,
                    n = (S ? 1 : -1) * (P + 1) * t.wrapWidth,
                    r = d ? t.endX - t.startX : 0;
                  X(), $(n + r), (e = P - 1);
                }
              } else e = Math.max(e, 0);
              e !== B && U(e);
            }
          },
          [B, P, d, E, S],
        ),
        Z = t.useCallback(
          function () {
            if (!(P <= 1)) {
              var e = B + 1;
              if (E) {
                if (e > P - 1) {
                  e = 0;
                  var t = F.current,
                    n = d ? t.endX - t.startX : 0;
                  X(), $(n);
                }
              } else e = Math.min(e, P - 1);
              e !== B && U(e);
            }
          },
          [B, P, d, E],
        ),
        Q = t.useCallback(
          function () {
            O &&
              !F.current.hover &&
              (D.current = setTimeout(function () {
                G(), Z();
              }, C));
          },
          [O, C, G, Z],
        ),
        ee = function () {
          clearTimeout(D.current);
        },
        te = function () {
          q(B, !0), Q();
        },
        ne = function () {
          var e = F.current,
            t = (S ? -1 : 1) * (e.endX - e.startX),
            n = Math.abs(t),
            r = t > 0 && B - 1 < 0;
          r || (t < 0 && B + 1 > P - 1)
            ? E
              ? r
                ? J()
                : Z()
              : te()
            : t > 0 && n > y && P > 1
            ? J()
            : t < 0 && n > y && P > 1
            ? Z()
            : te();
        },
        re = function () {
          var e = F.current;
          (e.startX = 0), (e.endX = 0), (e.startY = 0), (e.canMove = null), (e.pressDown = !1);
        },
        ae = function (e) {
          if (!sP(HP).call(HP, e.target.nodeName)) {
            e.preventDefault(), e.stopPropagation();
            var t = 'touches' in e ? e.touches[0] : e,
              n = F.current;
            (n.pressDown = !0), (n.startX = t.pageX), (n.startY = t.pageY), ee();
          }
        },
        oe = function (e) {
          e.stopPropagation();
          var t = 'touches' in e ? e.touches[0] : e,
            n = F.current;
          if (n.pressDown) {
            if (
              'touches' in e &&
              (null === n.canMove &&
                (n.canMove = Math.abs(n.startY - t.pageY) < Math.abs(n.startX - t.pageX)),
              !n.canMove)
            )
              return;
            e.preventDefault(), X(), (n.endX = t.pageX);
            var r = (E ? B + 1 : B) * n.wrapWidth,
              a = n.endX - n.startX;
            !V && Math.abs(a) > w && W(!0), $(S ? r + a : a - r);
          }
        },
        ie = function (e) {
          e.stopPropagation();
          var t = F.current;
          (t.pressDown = !1), W(!1), G(), t.endX ? ne() : Q(), re();
        },
        ce = function () {
          (F.current.hover = !0), ee();
        },
        ue = function (e) {
          var t = F.current;
          (t.hover = !1),
            t.pressDown && ((t.pressDown = !1), (t.endX = e.pageX), G(), ne(), re()),
            Q();
        },
        le = function (e) {
          var t = e.currentTarget.dataset.slideTo;
          if (t) {
            var n = MP(t, 10);
            K(n);
          }
          e.preventDefault();
        };
      return (
        t.useImperativeHandle(
          n,
          function () {
            return { goTo: K, prev: J, next: Z };
          },
          [K, J, Z],
        ),
        t.useEffect(
          function () {
            function e() {
              (F.current.wrapWidth = L.current.offsetWidth), q(B);
            }
            return (
              F.current.first && e(),
              window.addEventListener('resize', e),
              function () {
                window.removeEventListener('resize', e);
              }
            );
          },
          [B, q],
        ),
        t.useEffect(
          function () {
            j && !F.current.first && j(B);
          },
          [B, j],
        ),
        t.useEffect(
          function () {
            F.current.first ? (q(B), (F.current.first = !1)) : q(B, !0);
          },
          [B, q],
        ),
        t.useEffect(
          function () {
            return (
              Q(),
              function () {
                ee();
              }
            );
          },
          [O, B, Q],
        ),
        (i = d
          ? BP
            ? { onTouchStart: ae, onTouchMove: oe, onTouchEnd: ie }
            : {
                onMouseDown: ae,
                onMouseMove: oe,
                onMouseUp: ie,
                onMouseEnter: ce,
                onMouseLeave: ue,
              }
          : { onMouseEnter: ce, onMouseLeave: ue }),
        o.default.createElement(
          'div',
          wN(
            {
              className: u(
                'Carousel',
                { 'Carousel--draggable': d, 'Carousel--rtl': S, 'Carousel--dragging': V },
                c,
              ),
              ref: L,
            },
            i,
          ),
          o.default.createElement(
            'div',
            {
              className: 'Carousel-inner',
              style: { width: ''.concat(E ? P + 2 : P, '00%') },
              ref: _,
            },
            E && o.default.createElement(LP, { width: M }, o.default.Children.toArray(I)[P - 1]),
            $k((r = o.default.Children)).call(r, I, function (e, t) {
              return o.default.createElement(LP, { width: M, key: t }, e);
            }),
            E && o.default.createElement(LP, { width: M }, o.default.Children.toArray(I)[0]),
          ),
          R &&
            o.default.createElement(
              'ol',
              { className: 'Carousel-dots' },
              $k((a = o.default.Children)).call(a, I, function (e, t) {
                return o.default.createElement(
                  'li',
                  { key: t },
                  o.default.createElement('button', {
                    className: u('Carousel-dot', { active: B === t }),
                    type: 'button',
                    'aria-label': 'Go to slide '.concat(t + 1),
                    'data-slide-to': t,
                    onClick: le,
                  }),
                );
              }),
            ),
        )
      );
    }),
    YP = ['className', 'label', 'checked', 'disabled', 'onChange'],
    VP = function (e) {
      var t = e.className,
        n = e.label,
        r = e.checked,
        a = e.disabled,
        i = e.onChange,
        c = WN(e, YP);
      return o.default.createElement(
        'label',
        { className: u('Checkbox', t, { 'Checkbox--checked': r, 'Checkbox--disabled': a }) },
        o.default.createElement(
          'input',
          wN(
            { type: 'checkbox', className: 'Checkbox-input', checked: r, disabled: a, onChange: i },
            c,
          ),
        ),
        o.default.createElement('span', { className: 'Checkbox-text' }, n),
      );
    },
    WP = ['children', 'onClick', 'mouseEvent'],
    GP = document,
    XP = GP.documentElement,
    $P = function (e) {
      var n = e.children,
        r = e.onClick,
        a = e.mouseEvent,
        i = void 0 === a ? 'mouseup' : a,
        c = WN(e, WP),
        u = t.useRef(null);
      function l(e) {
        u.current && XP.contains(e.target) && !u.current.contains(e.target) && r(e);
      }
      return (
        t.useEffect(function () {
          return (
            i && GP.addEventListener(i, l),
            function () {
              GP.removeEventListener(i, l);
            }
          );
        }),
        o.default.createElement('div', wN({ ref: u }, c), n)
      );
    },
    qP = ['className', 'position', 'children'],
    KP = ['className', 'theme', 'children'],
    JP = o.default.createContext(''),
    ZP = ['children'],
    QP = function (e) {
      var t = e.children,
        n = WN(e, ZP);
      return o.default.createElement('label', wN({ className: 'Label' }, n), t);
    },
    eM = ['children'],
    tM = function (e) {
      var t = e.children,
        n = WN(e, eM);
      return o.default.createElement('div', wN({ className: 'HelpText' }, n), t);
    },
    nM = ['children'],
    rM = ['className', 'icon', 'img'],
    aM = o.default.forwardRef(function (e, t) {
      var n = e.className,
        r = e.icon,
        a = e.img,
        i = WN(e, rM);
      return o.default.createElement(
        KO,
        wN({ className: u('IconBtn', n), ref: t }, i),
        r && o.default.createElement(XO, { type: r }),
        !r && a && o.default.createElement('img', { src: a, alt: '' }),
      );
    }),
    oM = ['className', 'src', 'lazy', 'fluid', 'children'],
    iM = o.default.forwardRef(function (e, n) {
      var r = e.className,
        a = e.src,
        i = e.lazy,
        c = e.fluid;
      e.children;
      var l = WN(e, oM),
        s = Nk(t.useState(i ? void 0 : a), 2),
        f = s[0],
        d = s[1],
        m = Qd(n),
        p = t.useRef(''),
        v = t.useRef(!1);
      return (
        t.useEffect(
          function () {
            if (i) {
              var e = new IntersectionObserver(function (t) {
                var n = Nk(t, 1)[0];
                n.isIntersecting && (d(p.current), (v.current = !0), e.unobserve(n.target));
              });
              return (
                m.current && e.observe(m.current),
                function () {
                  e.disconnect();
                }
              );
            }
          },
          [m, i],
        ),
        t.useEffect(
          function () {
            (p.current = a), (i && !v.current) || d(a);
          },
          [i, a],
        ),
        o.default.createElement(
          'img',
          wN({ className: u('Image', { 'Image--fluid': c }, r), src: f, alt: '', ref: m }, l),
        )
      );
    });
  function cM(e) {
    return e.scrollHeight - e.scrollTop - e.offsetHeight;
  }
  var uM = ['className', 'disabled', 'distance', 'children', 'onLoadMore', 'onScroll'],
    lM = o.default.forwardRef(function (e, t) {
      var n = e.className,
        r = e.disabled,
        a = e.distance,
        i = void 0 === a ? 0 : a,
        c = e.children,
        l = e.onLoadMore,
        s = e.onScroll,
        f = WN(e, uM),
        d = Qd(t);
      return o.default.createElement(
        'div',
        wN(
          {
            className: u('InfiniteScroll', n),
            role: 'feed',
            onScroll: r
              ? void 0
              : function (e) {
                  s && s(e);
                  var t = d.current;
                  t && cM(t) <= i && l();
                },
            ref: d,
          },
          f,
        ),
        c,
      );
    }),
    sM = tm,
    fM = cp,
    dM = dp,
    mM = DC,
    pM = ym((1).valueOf),
    vM = Em,
    hM = dS,
    gM = '\t\n\v\f\r                　\u2028\u2029\ufeff',
    yM = ym(''.replace),
    bM = RegExp('^[' + gM + ']+'),
    wM = RegExp('(^|[^' + gM + '])[' + gM + ']+$'),
    xM = function (e) {
      return function (t) {
        var n = hM(vM(t));
        return 1 & e && (n = yM(n, bM, '')), 2 & e && (n = yM(n, wM, '$1')), n;
      };
    },
    EM = { start: xM(1), end: xM(2), trim: xM(3) },
    kM = TC,
    SM = lp,
    NM = tm,
    OM = sM,
    TM = ym,
    CM = bC,
    AM = Cm,
    RM = function (e, t, n) {
      var r, a;
      return (
        mM &&
          fM((r = t.constructor)) &&
          r !== n &&
          dM((a = r.prototype)) &&
          a !== n.prototype &&
          mM(e, a),
        e
      );
    },
    jM = Rp,
    IM = Lp,
    PM = nv,
    MM = dm,
    LM = jT.f,
    _M = pT.f,
    DM = up.f,
    FM = pM,
    zM = EM.trim,
    HM = 'Number',
    BM = NM[HM];
  OM[HM];
  var UM = BM.prototype,
    YM = NM.TypeError,
    VM = TM(''.slice),
    WM = TM(''.charCodeAt),
    GM = function (e) {
      var t,
        n,
        r,
        a,
        o,
        i,
        c,
        u,
        l = PM(e, 'number');
      if (IM(l)) throw YM('Cannot convert a Symbol value to a number');
      if ('string' == typeof l && l.length > 2)
        if (((l = zM(l)), 43 === (t = WM(l, 0)) || 45 === t)) {
          if (88 === (n = WM(l, 2)) || 120 === n) return NaN;
        } else if (48 === t) {
          switch (WM(l, 1)) {
            case 66:
            case 98:
              (r = 2), (a = 49);
              break;
            case 79:
            case 111:
              (r = 8), (a = 55);
              break;
            default:
              return +l;
          }
          for (i = (o = VM(l, 2)).length, c = 0; c < i; c++)
            if ((u = WM(o, c)) < 48 || u > a) return NaN;
          return parseInt(o, r);
        }
      return +l;
    },
    XM = CM(HM, !BM(' 0o1') || !BM('0b1') || BM('+0x1')),
    $M = function (e) {
      var t,
        n =
          arguments.length < 1
            ? 0
            : BM(
                (function (e) {
                  var t = PM(e, 'number');
                  return 'bigint' == typeof t ? t : GM(t);
                })(e),
              );
      return jM(UM, (t = this)) &&
        MM(function () {
          FM(t);
        })
        ? RM(Object(n), this, $M)
        : n;
    };
  ($M.prototype = UM),
    XM && (UM.constructor = $M),
    kM({ global: !0, constructor: !0, wrap: !0, forced: XM }, { Number: $M });
  XM &&
    (function (e, t) {
      for (
        var n,
          r = SM
            ? LM(t)
            : 'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range'.split(
                ',',
              ),
          a = 0;
        r.length > a;
        a++
      )
        AM(t, (n = r[a])) && !AM(e, n) && DM(e, n, _M(t, n));
    })(OM[HM], BM);
  var qM = dm,
    KM = tm.RegExp,
    JM = qM(function () {
      var e = KM('a', 'y');
      return (e.lastIndex = 2), null != e.exec('abcd');
    }),
    ZM =
      JM ||
      qM(function () {
        return !KM('a', 'y').sticky;
      }),
    QM = {
      BROKEN_CARET:
        JM ||
        qM(function () {
          var e = KM('^r', 'gy');
          return (e.lastIndex = 2), null != e.exec('str');
        }),
      MISSED_STICKY: ZM,
      UNSUPPORTED_Y: JM,
    },
    eL = {},
    tL = GT,
    nL = XT,
    rL =
      Object.keys ||
      function (e) {
        return tL(e, nL);
      },
    aL = lp,
    oL = bp,
    iL = up,
    cL = kp,
    uL = xT,
    lL = rL;
  eL.f =
    aL && !oL
      ? Object.defineProperties
      : function (e, t) {
          cL(e);
          for (var n, r = uL(t), a = lL(t), o = a.length, i = 0; o > i; )
            iL.f(e, (n = a[i++]), r[n]);
          return e;
        };
  var sL,
    fL = kp,
    dL = eL,
    mL = XT,
    pL = Uv,
    vL = uA,
    hL = hp,
    gL = 'prototype',
    yL = 'script',
    bL = Bv('IE_PROTO'),
    wL = function () {},
    xL = function (e) {
      return '<' + yL + '>' + e + '</' + yL + '>';
    },
    EL = function (e) {
      e.write(xL('')), e.close();
      var t = e.parentWindow.Object;
      return (e = null), t;
    },
    kL = function () {
      try {
        sL = new ActiveXObject('htmlfile');
      } catch (e) {}
      var e, t, n;
      kL =
        'undefined' != typeof document
          ? document.domain && sL
            ? EL(sL)
            : ((t = hL('iframe')),
              (n = 'java' + yL + ':'),
              (t.style.display = 'none'),
              vL.appendChild(t),
              (t.src = String(n)),
              (e = t.contentWindow.document).open(),
              e.write(xL('document.F=Object')),
              e.close(),
              e.F)
          : EL(sL);
      for (var r = mL.length; r--; ) delete kL[gL][mL[r]];
      return kL();
    };
  pL[bL] = !0;
  var SL,
    NL,
    OL =
      Object.create ||
      function (e, t) {
        var n;
        return (
          null !== e
            ? ((wL[gL] = fL(e)), (n = new wL()), (wL[gL] = null), (n[bL] = e))
            : (n = kL()),
          void 0 === t ? n : dL.f(n, t)
        );
      },
    TL = dm,
    CL = tm.RegExp,
    AL = TL(function () {
      var e = CL('.', 's');
      return !(e.dotAll && e.exec('\n') && 's' === e.flags);
    }),
    RL = dm,
    jL = tm.RegExp,
    IL = RL(function () {
      var e = jL('(?<a>b)', 'g');
      return 'b' !== e.exec('b').groups.a || 'bc' !== 'b'.replace(e, '$<a>c');
    }),
    PL = Op,
    ML = ym,
    LL = dS,
    _L = pS,
    DL = QM,
    FL = nm.exports,
    zL = OL,
    HL = nh.get,
    BL = AL,
    UL = IL,
    YL = FL('native-string-replace', String.prototype.replace),
    VL = RegExp.prototype.exec,
    WL = VL,
    GL = ML(''.charAt),
    XL = ML(''.indexOf),
    $L = ML(''.replace),
    qL = ML(''.slice),
    KL =
      ((NL = /b*/g),
      PL(VL, (SL = /a/), 'a'),
      PL(VL, NL, 'a'),
      0 !== SL.lastIndex || 0 !== NL.lastIndex),
    JL = DL.BROKEN_CARET,
    ZL = void 0 !== /()??/.exec('')[1];
  (KL || ZL || JL || BL || UL) &&
    (WL = function (e) {
      var t,
        n,
        r,
        a,
        o,
        i,
        c,
        u = this,
        l = HL(u),
        s = LL(e),
        f = l.raw;
      if (f) return (f.lastIndex = u.lastIndex), (t = PL(WL, f, s)), (u.lastIndex = f.lastIndex), t;
      var d = l.groups,
        m = JL && u.sticky,
        p = PL(_L, u),
        v = u.source,
        h = 0,
        g = s;
      if (
        (m &&
          ((p = $L(p, 'y', '')),
          -1 === XL(p, 'g') && (p += 'g'),
          (g = qL(s, u.lastIndex)),
          u.lastIndex > 0 &&
            (!u.multiline || (u.multiline && '\n' !== GL(s, u.lastIndex - 1))) &&
            ((v = '(?: ' + v + ')'), (g = ' ' + g), h++),
          (n = new RegExp('^(?:' + v + ')', p))),
        ZL && (n = new RegExp('^' + v + '$(?!\\s)', p)),
        KL && (r = u.lastIndex),
        (a = PL(VL, m ? n : u, g)),
        m
          ? a
            ? ((a.input = qL(a.input, h)),
              (a[0] = qL(a[0], h)),
              (a.index = u.lastIndex),
              (u.lastIndex += a[0].length))
            : (u.lastIndex = 0)
          : KL && a && (u.lastIndex = u.global ? a.index + a[0].length : r),
        ZL &&
          a &&
          a.length > 1 &&
          PL(YL, a[0], n, function () {
            for (o = 1; o < arguments.length - 2; o++) void 0 === arguments[o] && (a[o] = void 0);
          }),
        a && d)
      )
        for (a.groups = i = zL(null), o = 0; o < d.length; o++) i[(c = d[o])[0]] = a[c[1]];
      return a;
    });
  var QL = WL;
  TC({ target: 'RegExp', proto: !0, forced: /./.exec !== QL }, { exec: QL });
  var e_ = Yh,
    t_ = Sh,
    n_ = QL,
    r_ = dm,
    a_ = tp,
    o_ = Dv,
    i_ = a_('species'),
    c_ = RegExp.prototype,
    u_ = function (e, t, n, r) {
      var a = a_(e),
        o = !r_(function () {
          var t = {};
          return (
            (t[a] = function () {
              return 7;
            }),
            7 != ''[e](t)
          );
        }),
        i =
          o &&
          !r_(function () {
            var t = !1,
              n = /a/;
            return (
              'split' === e &&
                (((n = {}).constructor = {}),
                (n.constructor[i_] = function () {
                  return n;
                }),
                (n.flags = ''),
                (n[a] = /./[a])),
              (n.exec = function () {
                return (t = !0), null;
              }),
              n[a](''),
              !t
            );
          });
      if (!o || !i || n) {
        var c = e_(/./[a]),
          u = t(a, ''[e], function (e, t, n, r, a) {
            var i = e_(e),
              u = t.exec;
            return u === n_ || u === c_.exec
              ? o && !a
                ? { done: !0, value: c(t, n, r) }
                : { done: !0, value: i(n, t, r) }
              : { done: !1 };
          });
        t_(String.prototype, e, u[0]), t_(c_, a, u[1]);
      }
      r && o_(c_[a], 'sham', !0);
    },
    l_ = ym,
    s_ = ng,
    f_ = dS,
    d_ = Em,
    m_ = l_(''.charAt),
    p_ = l_(''.charCodeAt),
    v_ = l_(''.slice),
    h_ = function (e) {
      return function (t, n) {
        var r,
          a,
          o = f_(d_(t)),
          i = s_(n),
          c = o.length;
        return i < 0 || i >= c
          ? e
            ? ''
            : void 0
          : (r = p_(o, i)) < 55296 ||
            r > 56319 ||
            i + 1 === c ||
            (a = p_(o, i + 1)) < 56320 ||
            a > 57343
          ? e
            ? m_(o, i)
            : r
          : e
          ? v_(o, i, i + 2)
          : a - 56320 + ((r - 55296) << 10) + 65536;
      };
    },
    g_ = { codeAt: h_(!1), charAt: h_(!0) }.charAt,
    y_ = function (e, t, n) {
      return t + (n ? g_(e, t).length : 1);
    },
    b_ = ym,
    w_ = Nm,
    x_ = Math.floor,
    E_ = b_(''.charAt),
    k_ = b_(''.replace),
    S_ = b_(''.slice),
    N_ = /\$([$&'`]|\d{1,2}|<[^>]*>)/g,
    O_ = /\$([$&'`]|\d{1,2})/g,
    T_ = Op,
    C_ = kp,
    A_ = cp,
    R_ = Ch,
    j_ = QL,
    I_ = TypeError,
    P_ = function (e, t) {
      var n = e.exec;
      if (A_(n)) {
        var r = T_(n, e, t);
        return null !== r && C_(r), r;
      }
      if ('RegExp' === R_(e)) return T_(j_, e, t);
      throw I_('RegExp#exec called on incompatible receiver');
    },
    M_ = cA,
    L_ = Op,
    __ = ym,
    D_ = u_,
    F_ = dm,
    z_ = kp,
    H_ = cp,
    B_ = bm,
    U_ = ng,
    Y_ = og,
    V_ = dS,
    W_ = Em,
    G_ = y_,
    X_ = Vp,
    $_ = function (e, t, n, r, a, o) {
      var i = n + e.length,
        c = r.length,
        u = O_;
      return (
        void 0 !== a && ((a = w_(a)), (u = N_)),
        k_(o, u, function (o, u) {
          var l;
          switch (E_(u, 0)) {
            case '$':
              return '$';
            case '&':
              return e;
            case '`':
              return S_(t, 0, n);
            case "'":
              return S_(t, i);
            case '<':
              l = a[S_(u, 1, -1)];
              break;
            default:
              var s = +u;
              if (0 === s) return o;
              if (s > c) {
                var f = x_(s / 10);
                return 0 === f
                  ? o
                  : f <= c
                  ? void 0 === r[f - 1]
                    ? E_(u, 1)
                    : r[f - 1] + E_(u, 1)
                  : o;
              }
              l = r[s - 1];
          }
          return void 0 === l ? '' : l;
        })
      );
    },
    q_ = P_,
    K_ = tp('replace'),
    J_ = Math.max,
    Z_ = Math.min,
    Q_ = __([].concat),
    eD = __([].push),
    tD = __(''.indexOf),
    nD = __(''.slice),
    rD = '$0' === 'a'.replace(/./, '$0'),
    aD = !!/./[K_] && '' === /./[K_]('a', '$0');
  D_(
    'replace',
    function (e, t, n) {
      var r = aD ? '$' : '$0';
      return [
        function (e, n) {
          var r = W_(this),
            a = B_(e) ? void 0 : X_(e, K_);
          return a ? L_(a, e, r, n) : L_(t, V_(r), e, n);
        },
        function (e, a) {
          var o = z_(this),
            i = V_(e);
          if ('string' == typeof a && -1 === tD(a, r) && -1 === tD(a, '$<')) {
            var c = n(t, o, i, a);
            if (c.done) return c.value;
          }
          var u = H_(a);
          u || (a = V_(a));
          var l = o.global;
          if (l) {
            var s = o.unicode;
            o.lastIndex = 0;
          }
          for (var f = []; ; ) {
            var d = q_(o, i);
            if (null === d) break;
            if ((eD(f, d), !l)) break;
            '' === V_(d[0]) && (o.lastIndex = G_(i, Y_(o.lastIndex), s));
          }
          for (var m, p = '', v = 0, h = 0; h < f.length; h++) {
            for (
              var g = V_((d = f[h])[0]), y = J_(Z_(U_(d.index), i.length), 0), b = [], w = 1;
              w < d.length;
              w++
            )
              eD(b, void 0 === (m = d[w]) ? m : String(m));
            var x = d.groups;
            if (u) {
              var E = Q_([g], b, y, i);
              void 0 !== x && eD(E, x);
              var k = V_(M_(a, void 0, E));
            } else k = $_(g, i, y, b, x, a);
            y >= v && ((p += nD(i, v, y) + k), (v = y + g.length));
          }
          return p + nD(i, v);
        },
      ];
    },
    !!F_(function () {
      var e = /./;
      return (
        (e.exec = function () {
          var e = [];
          return (e.groups = { a: '7' }), e;
        }),
        '7' !== ''.replace(e, '$<a>')
      );
    }) ||
      !rD ||
      aD,
  );
  var oD = [
    'className',
    'type',
    'variant',
    'value',
    'placeholder',
    'rows',
    'minRows',
    'maxRows',
    'maxLength',
    'showCount',
    'multiline',
    'autoSize',
    'onChange',
    'disabled',
  ];
  var iD = o.default.forwardRef(function (e, n) {
      var r = e.className,
        a = e.type,
        i = void 0 === a ? 'text' : a,
        c = e.variant,
        l = e.value,
        s = e.placeholder,
        f = e.rows,
        d = void 0 === f ? 1 : f,
        m = e.minRows,
        p = void 0 === m ? d : m,
        v = e.maxRows,
        h = void 0 === v ? 5 : v,
        g = e.maxLength,
        y = e.showCount,
        b = void 0 === y ? !!g : y,
        w = e.multiline,
        x = e.autoSize,
        E = e.onChange,
        k = e.disabled,
        S = void 0 !== k && k,
        N = WN(e, oD),
        O = d;
      O < p ? (O = p) : O > h && (O = h);
      var T = Nk(t.useState(O), 2),
        C = T[0],
        A = T[1],
        R = Nk(t.useState(21), 2),
        j = R[0],
        I = R[1],
        P = Qd(n),
        M = t.useContext(JP),
        L = c || ('light' === M ? 'flushed' : 'outline'),
        _ = w || x || d > 1 ? 'textarea' : 'input';
      t.useEffect(
        function () {
          if (P.current) {
            var e = getComputedStyle(P.current, null).lineHeight,
              t = Number(e.replace('px', ''));
            t !== j && I(t);
          }
        },
        [P, j],
      );
      var D = t.useCallback(
        function () {
          if (x && P.current) {
            var e = P.current,
              t = e.rows;
            (e.rows = p), s && (e.placeholder = '');
            var n = ~~(e.scrollHeight / j);
            n === t && (e.rows = n),
              n >= h && ((e.rows = h), (e.scrollTop = e.scrollHeight)),
              A(n < h ? n : h),
              s && (e.placeholder = s);
          }
        },
        [x, P, j, h, p, s],
      );
      t.useEffect(
        function () {
          '' === l ? A(O) : D();
        },
        [O, D, l],
      );
      var F = t.useCallback(
          function (e) {
            if ((D(), E)) {
              var t = e.target.value,
                n = g && t.length > g ? t.substr(0, g) : t;
              E(n, e);
            }
          },
          [g, E, D],
        ),
        z = o.default.createElement(
          _,
          wN(
            {
              className: u('Input', 'Input--'.concat(L), r),
              type: i,
              value: l,
              placeholder: s,
              maxLength: g,
              ref: P,
              rows: C,
              onChange: F,
              disabled: S,
            },
            N,
          ),
        );
      return b
        ? o.default.createElement(
            'div',
            { className: u('InputWrapper', { 'has-counter': b }) },
            z,
            b &&
              o.default.createElement(
                'div',
                { className: 'Input-counter' },
                (function (e, t) {
                  var n;
                  return tS((n = ''.concat(''.concat(e).length))).call(n, t ? '/'.concat(t) : '');
                })(l, g),
              ),
          )
        : z;
    }),
    cD = ['className', 'as', 'content', 'rightIcon', 'children', 'onClick'],
    uD = {
      BackBottom: {
        newMsgOne: '{n} رسالة جديدة',
        newMsgOther: '{n} رسالة جديدة',
        bottom: 'الأسفل',
      },
      Time: {
        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        formats: { LT: 'HH:mm', lll: 'YYYY/M/D HH:mm', WT: 'HH:mm dddd', YT: 'HH:mm أمس' },
      },
      Composer: { send: 'إرسال' },
      SendConfirm: { title: 'إرسال صورة', send: 'أرسل', cancel: 'إلغاء' },
      RateActions: { up: 'التصويت', down: 'تصويت سلبي' },
      Recorder: {
        hold2talk: 'أستمر بالضغط لتتحدث',
        release2send: 'حرر للإرسال',
        releaseOrSwipe: 'حرر للإرسال ، اسحب لأعلى للإلغاء',
        release2cancel: 'حرر للإلغاء',
      },
      Search: { search: 'يبحث' },
    },
    lD = {
      BackBottom: {
        newMsgOne: '{n} new message',
        newMsgOther: '{n} new messages',
        bottom: 'Bottom',
      },
      Time: {
        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        formats: { LT: 'HH:mm', lll: 'M/D/YYYY HH:mm', WT: 'dddd HH:mm', YT: 'Yesterday HH:mm' },
      },
      Composer: { send: 'Send' },
      SendConfirm: { title: 'Send photo', send: 'Send', cancel: 'Cancel' },
      RateActions: { up: 'Up vote', down: 'Down vote' },
      Recorder: {
        hold2talk: 'Hold to Talk',
        release2send: 'Release to Send',
        releaseOrSwipe: 'Release to send, swipe up to cancel',
        release2cancel: 'Release to cancel',
      },
      Search: { search: 'Search' },
    },
    sD = {
      'ar-EG': uD,
      'fr-FR': {
        BackBottom: {
          newMsgOne: '{n} nouveau message',
          newMsgOther: '{n} nouveau messages',
          bottom: 'Fond',
        },
        Time: {
          weekdays: 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'),
          formats: { LT: 'HH:mm', lll: 'D/M/YYYY HH:mm', WT: 'dddd HH:mm', YT: 'Hier HH:mm' },
        },
        Composer: { send: 'Envoyer' },
        SendConfirm: { title: 'Envoyer une photo', send: 'Envoyer', cancel: 'Annuler' },
        RateActions: { up: 'Voter pour', down: 'Vote négatif' },
        Recorder: {
          hold2talk: 'Tenir pour parler',
          release2send: 'Libérer pour envoyer',
          releaseOrSwipe: 'Relâchez pour envoyer, balayez vers le haut pour annuler',
          release2cancel: 'Relâcher pour annuler',
        },
        Search: { search: 'Chercher' },
      },
      'en-US': lD,
      'zh-CN': {
        BackBottom: { newMsgOne: '{n}条新消息', newMsgOther: '{n}条新消息', bottom: '回到底部' },
        Time: {
          weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
          formats: { LT: 'HH:mm', lll: 'YYYY年M月D日 HH:mm', WT: 'dddd HH:mm', YT: '昨天 HH:mm' },
        },
        Composer: { send: '发送' },
        SendConfirm: { title: '发送图片', send: '发送', cancel: '取消' },
        RateActions: { up: '赞同', down: '反对' },
        Recorder: {
          hold2talk: '按住 说话',
          release2send: '松开 发送',
          releaseOrSwipe: '松开发送，上滑取消',
          release2cancel: '松开手指，取消发送',
        },
        Search: { search: '搜索' },
      },
    };
  function fD(e, t) {
    var n = Qg(e);
    if ($w) {
      var r = $w(e);
      t &&
        (r = lS(r).call(r, function (t) {
          return ox(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function dD(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? fD(Object(n), !0).forEach(function (t) {
            Hk(e, t, n[t]);
          })
        : dx
        ? xx(e, dx(n))
        : fD(Object(n)).forEach(function (t) {
            Rx(e, t, ox(n, t));
          });
    }
    return e;
  }
  var mD = o.default.createContext(void 0),
    pD = 'en-US',
    vD = function (e) {
      var t = e.locale,
        n = e.locales,
        r = e.children;
      return o.default.createElement(mD.Provider, { value: { locale: t, locales: n } }, r);
    };
  vD.defaultProps = { locale: pD };
  var hD = function (e, n) {
      var r = t.useContext(mD),
        a = r || {},
        o = a.locale,
        i = a.locales,
        c = (o && sD[o]) || sD[pD],
        u = i ? dD(dD({}, c), i) : c;
      return (
        !r && n ? (u = n) : e && (u = u[e] || {}),
        {
          locale: o,
          trans: function (e) {
            return e ? u[e] : u;
          },
        }
      );
    },
    gD = function (e) {
      var t = e.className,
        n = e.content,
        r = e.action;
      return o.default.createElement(
        'div',
        { className: u('Message SystemMessage', t) },
        o.default.createElement(
          'div',
          { className: 'SystemMessage-inner' },
          o.default.createElement('span', null, n),
          r && o.default.createElement('a', { href: 'javascript:;', onClick: r.onClick }, r.text),
        ),
      );
    },
    yD = Nm,
    bD = nv;
  TC(
    {
      target: 'Date',
      proto: !0,
      arity: 1,
      forced: dm(function () {
        return (
          null !== new Date(NaN).toJSON() ||
          1 !==
            Date.prototype.toJSON.call({
              toISOString: function () {
                return 1;
              },
            })
        );
      }),
    },
    {
      toJSON: function (e) {
        var t = yD(this),
          n = bD(t, 'number');
        return 'number' != typeof n || isFinite(n) ? t.toISOString() : null;
      },
    },
  );
  var wD = Op;
  TC(
    { target: 'URL', proto: !0, enumerable: !0 },
    {
      toJSON: function () {
        return wD(URL.prototype.toString, this);
      },
    },
  );
  var xD = /YYYY|M|D|dddd|HH|mm/g,
    ED = 864e5,
    kD = function (e) {
      return (e <= 9 ? '0' : '') + e;
    },
    SD = function (e) {
      var t = new Date(new Date().setHours(0, 0, 0, 0)).getTime() - e.getTime();
      return t < 0 ? 'LT' : t < ED ? 'YT' : t < 6048e5 ? 'WT' : 'lll';
    };
  function ND(e, t) {
    var n = (function (e) {
        return e instanceof Date ? e : new Date(e);
      })(e),
      r = t.formats[SD(n)],
      a = {
        YYYY: ''.concat(n.getFullYear()),
        M: ''.concat(n.getMonth() + 1),
        D: ''.concat(n.getDate()),
        dddd: t.weekdays[n.getDay()],
        HH: kD(n.getHours()),
        mm: kD(n.getMinutes()),
      };
    return r.replace(xD, function (e) {
      return a[e];
    });
  }
  var OD = function (e) {
    var t = e.date,
      n = hD('Time').trans;
    return o.default.createElement(
      'time',
      { className: 'Time', dateTime: new Date(t).toJSON() },
      ND(t, n()),
    );
  };
  function TD() {
    return o.default.createElement(
      WO,
      { type: 'typing' },
      o.default.createElement(
        'div',
        { className: 'Typing', 'aria-busy': 'true' },
        o.default.createElement('div', { className: 'Typing-dot' }),
        o.default.createElement('div', { className: 'Typing-dot' }),
        o.default.createElement('div', { className: 'Typing-dot' }),
      ),
    );
  }
  var CD = ['renderMessageContent'],
    AD = function (e) {
      var t = e.renderMessageContent,
        n =
          void 0 === t
            ? function () {
                return null;
              }
            : t,
        r = WN(e, CD),
        a = r.type,
        i = r.content,
        c = r.user,
        l = void 0 === c ? {} : c,
        s = r._id,
        f = r.position,
        d = void 0 === f ? 'left' : f,
        m = r.hasTime,
        p = void 0 === m || m,
        v = r.createdAt,
        h = l.name,
        g = l.avatar;
      if ('system' === a) return o.default.createElement(gD, { content: i.text, action: i.action });
      var y = 'right' === d || 'left' === d;
      return o.default.createElement(
        'div',
        { className: u('Message', d), 'data-id': s, 'data-type': a },
        p &&
          v &&
          o.default.createElement(
            'div',
            { className: 'Message-meta' },
            o.default.createElement(OD, { date: v }),
          ),
        o.default.createElement(
          'div',
          { className: 'Message-main' },
          y && g && o.default.createElement(BO, { src: g, alt: h, url: l.url }),
          o.default.createElement(
            'div',
            { className: 'Message-inner' },
            y && h && o.default.createElement('div', { className: 'Message-author' }, h),
            o.default.createElement(
              'div',
              {
                className: 'Message-content',
                role: 'alert',
                'aria-live': 'assertive',
                'aria-atomic': 'false',
              },
              'typing' === a ? o.default.createElement(TD, null) : n(r),
            ),
          ),
        ),
      );
    },
    RD = o.default.memo(AD),
    jD = 0;
  function ID() {
    var e,
      n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 'id-';
    return t.useRef(tS((e = ''.concat(n))).call(e, jD++)).current;
  }
  var PD = function (e, t) {
    (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : document.body).classList[
      t ? 'add' : 'remove'
    ](e);
  };
  function MD() {
    document.querySelector('.Modal') || document.querySelector('.Popup') || PD('S--modalOpen', !1);
  }
  var LD = o.default.forwardRef(function (e, r) {
      var a,
        i,
        c = e.baseClass,
        l = e.active,
        s = e.className,
        f = e.title,
        d = e.showClose,
        m = void 0 === d || d,
        p = e.autoFocus,
        v = void 0 === p || p,
        h = e.backdrop,
        g = void 0 === h || h,
        y = e.height,
        b = e.overflow,
        w = e.actions,
        x = e.vertical,
        E = void 0 === x || x,
        k = e.btnVariant,
        S = e.bgColor,
        N = e.children,
        O = e.onBackdropClick,
        T = e.onClose,
        C = ID('modal-'),
        A = e.titleId || C,
        R = t.useRef(null),
        j = LS({ active: l, ref: R }),
        I = j.didMount,
        P = j.isShow;
      if (
        (t.useEffect(
          function () {
            setTimeout(function () {
              v && R.current && R.current.focus();
            });
          },
          [v],
        ),
        t.useEffect(
          function () {
            P && PD('S--modalOpen', P);
          },
          [P],
        ),
        t.useEffect(
          function () {
            l || I || MD();
          },
          [l, I],
        ),
        t.useImperativeHandle(r, function () {
          return { wrapperRef: R };
        }),
        t.useEffect(function () {
          return function () {
            MD();
          };
        }, []),
        !I)
      )
        return null;
      var M = 'Popup' === c;
      return n.createPortal(
        o.default.createElement(
          'div',
          { className: u(c, s, { active: P }), ref: R, tabIndex: -1 },
          g && o.default.createElement(YO, { active: P, onClick: !0 === g ? O || T : void 0 }),
          o.default.createElement(
            'div',
            {
              className: u(''.concat(c, '-dialog'), { 'pb-safe': M && !w }),
              'data-bg-color': S,
              'data-height': M && y ? y : void 0,
              role: 'dialog',
              'aria-labelledby': A,
              'aria-modal': !0,
            },
            o.default.createElement(
              'div',
              { className: ''.concat(c, '-content') },
              o.default.createElement(
                'div',
                { className: ''.concat(c, '-header') },
                o.default.createElement('h5', { className: ''.concat(c, '-title'), id: A }, f),
                m &&
                  T &&
                  o.default.createElement(aM, {
                    className: ''.concat(c, '-close'),
                    icon: 'close',
                    size: 'lg',
                    onClick: T,
                    'aria-label': '关闭',
                  }),
              ),
              o.default.createElement(
                'div',
                { className: u(''.concat(c, '-body'), { overflow: b }) },
                N,
              ),
              w &&
                o.default.createElement(
                  'div',
                  {
                    className: tS(
                      (a = tS((i = ''.concat(c, '-footer '))).call(i, c, '-footer--')),
                    ).call(a, E ? 'v' : 'h'),
                    'data-variant': k || 'round',
                  },
                  $k(w).call(w, function (e) {
                    return o.default.createElement(
                      KO,
                      wN({ size: 'lg', block: M, variant: k }, e, { key: e.label }),
                    );
                  }),
                ),
            ),
          ),
        ),
        document.body,
      );
    }),
    _D = o.default.forwardRef(function (e, t) {
      return o.default.createElement(
        LD,
        wN({ baseClass: 'Modal', btnVariant: !1 === e.vertical ? void 0 : 'outline', ref: t }, e),
      );
    }),
    DD = { exports: {} },
    FD = Lt,
    zD = TypeError,
    HD = fy,
    BD = Math.floor,
    UD = function (e, t) {
      var n = e.length,
        r = BD(n / 2);
      return n < 8 ? YD(e, t) : VD(e, UD(HD(e, 0, r), t), UD(HD(e, r), t), t);
    },
    YD = function (e, t) {
      for (var n, r, a = e.length, o = 1; o < a; ) {
        for (r = o, n = e[o]; r && t(e[r - 1], n) > 0; ) e[r] = e[--r];
        r !== o++ && (e[r] = n);
      }
      return e;
    },
    VD = function (e, t, n, r) {
      for (var a = t.length, o = n.length, i = 0, c = 0; i < a || c < o; )
        e[i + c] =
          i < a && c < o ? (r(t[i], n[c]) <= 0 ? t[i++] : n[c++]) : i < a ? t[i++] : n[c++];
      return e;
    },
    WD = UD,
    GD = gt.match(/firefox\/(\d+)/i),
    XD = !!GD && +GD[1],
    $D = /MSIE|Trident/.test(gt),
    qD = gt.match(/AppleWebKit\/(\d+)\./),
    KD = !!qD && +qD[1],
    JD = Dr,
    ZD = Ne,
    QD = zt,
    eF = nn,
    tF = ya,
    nF = function (e, t) {
      if (!delete e[t]) throw zD('Cannot delete property ' + FD(t) + ' of ' + FD(e));
    },
    rF = Si,
    aF = pe,
    oF = WD,
    iF = CN,
    cF = XD,
    uF = $D,
    lF = St,
    sF = KD,
    fF = [],
    dF = ZD(fF.sort),
    mF = ZD(fF.push),
    pF = aF(function () {
      fF.sort(void 0);
    }),
    vF = aF(function () {
      fF.sort(null);
    }),
    hF = iF('sort'),
    gF = !aF(function () {
      if (lF) return lF < 70;
      if (!(cF && cF > 3)) {
        if (uF) return !0;
        if (sF) return sF < 603;
        var e,
          t,
          n,
          r,
          a = '';
        for (e = 65; e < 76; e++) {
          switch (((t = String.fromCharCode(e)), e)) {
            case 66:
            case 69:
            case 70:
            case 72:
              n = 3;
              break;
            case 68:
            case 71:
              n = 4;
              break;
            default:
              n = 2;
          }
          for (r = 0; r < 47; r++) fF.push({ k: t + r, v: n });
        }
        for (
          fF.sort(function (e, t) {
            return t.v - e.v;
          }),
            r = 0;
          r < fF.length;
          r++
        )
          (t = fF[r].k.charAt(0)), a.charAt(a.length - 1) !== t && (a += t);
        return 'DGBEFHACIJK' !== a;
      }
    });
  JD(
    { target: 'Array', proto: !0, forced: pF || !vF || !hF || !gF },
    {
      sort: function (e) {
        void 0 !== e && QD(e);
        var t = eF(this);
        if (gF) return void 0 === e ? dF(t) : dF(t, e);
        var n,
          r,
          a = [],
          o = tF(t);
        for (r = 0; r < o; r++) r in t && mF(a, t[r]);
        for (
          oF(
            a,
            (function (e) {
              return function (t, n) {
                return void 0 === n
                  ? -1
                  : void 0 === t
                  ? 1
                  : void 0 !== e
                  ? +e(t, n) || 0
                  : rF(t) > rF(n)
                  ? 1
                  : -1;
              };
            })(e),
          ),
            n = tF(a),
            r = 0;
          r < n;

        )
          t[r] = a[r++];
        for (; r < o; ) nF(t, r++);
        return t;
      },
    },
  );
  var yF = vk('Array').sort,
    bF = ht,
    wF = yF,
    xF = Array.prototype,
    EF = function (e) {
      var t = e.sort;
      return e === xF || (bF(xF, e) && t === xF.sort) ? wF : t;
    };
  !(function (e) {
    e.exports = EF;
  })(DD);
  var kF = se(DD.exports),
    SF = ['className', 'vertical', 'actions'],
    NF = function (e) {
      return 'primary' === e.color;
    },
    OF = o.default.forwardRef(function (e, t) {
      var n = e.className,
        r = e.vertical,
        a = e.actions,
        i = WN(e, SF),
        c = hD().locale,
        l = void 0 === c ? '' : c,
        s = sP(l).call(l, 'zh'),
        f = null != r ? r : !s;
      return (
        Array.isArray(a) &&
          kF(a).call(a, function (e, t) {
            return NF(e) ? (f ? -1 : 1) : NF(t) ? (f ? 1 : -1) : 0;
          }),
        o.default.createElement(
          LD,
          wN(
            {
              baseClass: 'Modal',
              className: u('Confirm', n),
              showClose: !1,
              btnVariant: 'outline',
              vertical: f,
              actions: a,
              ref: t,
            },
            i,
          ),
        )
      );
    }),
    TF = o.default.forwardRef(function (e, t) {
      return o.default.createElement(LD, wN({ baseClass: 'Popup', overflow: !0, ref: t }, e));
    }),
    CF = function (e) {
      var t = e.className,
        n = e.title,
        r = e.logo,
        a = e.leftContent,
        i = e.rightContent,
        c = void 0 === i ? [] : i;
      return o.default.createElement(
        'header',
        { className: u('Navbar', t) },
        o.default.createElement(
          'div',
          { className: 'Navbar-left' },
          a && o.default.createElement(aM, wN({ size: 'lg' }, a)),
        ),
        o.default.createElement(
          'div',
          { className: 'Navbar-main' },
          r
            ? o.default.createElement('img', { className: 'Navbar-logo', src: r, alt: n })
            : o.default.createElement('h2', { className: 'Navbar-title' }, n),
        ),
        o.default.createElement(
          'div',
          { className: 'Navbar-right' },
          $k(c).call(c, function (e) {
            return o.default.createElement(aM, wN({ size: 'lg' }, e, { key: e.icon }));
          }),
        ),
      );
    },
    AF = { exports: {} },
    RF = lt,
    jF = Math.floor;
  Dr(
    { target: 'Number', stat: !0 },
    {
      isInteger:
        Number.isInteger ||
        function (e) {
          return !RF(e) && isFinite(e) && jF(e) === e;
        },
    },
  );
  var IF = st.Number.isInteger;
  !(function (e) {
    e.exports = IF;
  })(AF);
  var PF = se(AF.exports),
    MF = ['as', 'className', 'align', 'breakWord', 'truncate', 'children'],
    LF = function (e) {
      var t = e.as,
        n = void 0 === t ? 'div' : t,
        r = e.className,
        a = e.align,
        i = e.breakWord,
        c = e.truncate,
        l = e.children,
        s = WN(e, MF),
        f = PF(c),
        d = u(
          a && 'Text--'.concat(a),
          { 'Text--break': i, 'Text--truncate': !0 === c, 'Text--ellipsis': f },
          r,
        ),
        m = f ? { WebkitLineClamp: c } : null;
      return o.default.createElement(n, wN({ className: d, style: m }, s), l);
    };
  var _F = dp,
    DF = Ch,
    FF = tp('match'),
    zF = ov,
    HF = up,
    BF = Mv,
    UF = LT,
    YF = cg,
    VF = function (e, t, n) {
      var r = zF(t);
      r in e ? HF.f(e, r, BF(0, n)) : (e[r] = n);
    },
    WF = Array,
    GF = Math.max,
    XF = cA,
    $F = Op,
    qF = ym,
    KF = u_,
    JF = kp,
    ZF = bm,
    QF = function (e) {
      var t;
      return _F(e) && (void 0 !== (t = e[FF]) ? !!t : 'RegExp' == DF(e));
    },
    ez = Em,
    tz = nA,
    nz = y_,
    rz = og,
    az = dS,
    oz = Vp,
    iz = function (e, t, n) {
      for (
        var r = YF(e), a = UF(t, r), o = UF(void 0 === n ? r : n, r), i = WF(GF(o - a, 0)), c = 0;
        a < o;
        a++, c++
      )
        VF(i, c, e[a]);
      return (i.length = c), i;
    },
    cz = P_,
    uz = QL,
    lz = dm,
    sz = QM.UNSUPPORTED_Y,
    fz = 4294967295,
    dz = Math.min,
    mz = [].push,
    pz = qF(/./.exec),
    vz = qF(mz),
    hz = qF(''.slice),
    gz = !lz(function () {
      var e = /(?:)/,
        t = e.exec;
      e.exec = function () {
        return t.apply(this, arguments);
      };
      var n = 'ab'.split(e);
      return 2 !== n.length || 'a' !== n[0] || 'b' !== n[1];
    });
  KF(
    'split',
    function (e, t, n) {
      var r;
      return (
        (r =
          'c' == 'abbc'.split(/(b)*/)[1] ||
          4 != 'test'.split(/(?:)/, -1).length ||
          2 != 'ab'.split(/(?:ab)*/).length ||
          4 != '.'.split(/(.?)(.?)/).length ||
          '.'.split(/()()/).length > 1 ||
          ''.split(/.?/).length
            ? function (e, n) {
                var r = az(ez(this)),
                  a = void 0 === n ? fz : n >>> 0;
                if (0 === a) return [];
                if (void 0 === e) return [r];
                if (!QF(e)) return $F(t, r, e, a);
                for (
                  var o,
                    i,
                    c,
                    u = [],
                    l =
                      (e.ignoreCase ? 'i' : '') +
                      (e.multiline ? 'm' : '') +
                      (e.unicode ? 'u' : '') +
                      (e.sticky ? 'y' : ''),
                    s = 0,
                    f = new RegExp(e.source, l + 'g');
                  (o = $F(uz, f, r)) &&
                  !(
                    (i = f.lastIndex) > s &&
                    (vz(u, hz(r, s, o.index)),
                    o.length > 1 && o.index < r.length && XF(mz, u, iz(o, 1)),
                    (c = o[0].length),
                    (s = i),
                    u.length >= a)
                  );

                )
                  f.lastIndex === o.index && f.lastIndex++;
                return (
                  s === r.length ? (!c && pz(f, '')) || vz(u, '') : vz(u, hz(r, s)),
                  u.length > a ? iz(u, 0, a) : u
                );
              }
            : '0'.split(void 0, 0).length
            ? function (e, n) {
                return void 0 === e && 0 === n ? [] : $F(t, this, e, n);
              }
            : t),
        [
          function (t, n) {
            var a = ez(this),
              o = ZF(t) ? void 0 : oz(t, e);
            return o ? $F(o, t, a, n) : $F(r, az(a), t, n);
          },
          function (e, a) {
            var o = JF(this),
              i = az(e),
              c = n(r, o, i, a, r !== t);
            if (c.done) return c.value;
            var u = tz(o, RegExp),
              l = o.unicode,
              s =
                (o.ignoreCase ? 'i' : '') +
                (o.multiline ? 'm' : '') +
                (o.unicode ? 'u' : '') +
                (sz ? 'g' : 'y'),
              f = new u(sz ? '^(?:' + o.source + ')' : o, s),
              d = void 0 === a ? fz : a >>> 0;
            if (0 === d) return [];
            if (0 === i.length) return null === cz(f, i) ? [i] : [];
            for (var m = 0, p = 0, v = []; p < i.length; ) {
              f.lastIndex = sz ? 0 : p;
              var h,
                g = cz(f, sz ? hz(i, p) : i);
              if (null === g || (h = dz(rz(f.lastIndex + (sz ? p : 0)), i.length)) === m)
                p = nz(i, p, l);
              else {
                if ((vz(v, hz(i, m, p)), v.length === d)) return v;
                for (var y = 1; y <= g.length - 1; y++) if ((vz(v, g[y]), v.length === d)) return v;
                p = m = h;
              }
            }
            return vz(v, hz(i, m)), v;
          },
        ]
      );
    },
    !gz,
    sz,
  );
  var yz = ['className', 'price', 'currency', 'locale', 'original'],
    bz = 'Intl' in window && 'function' == typeof Intl.NumberFormat.prototype.formatToParts,
    wz = o.default.forwardRef(function (e, t) {
      var n = e.className,
        r = e.price,
        a = e.currency,
        i = e.locale,
        c = e.original,
        l = WN(e, yz),
        s = [];
      if (
        !(s =
          i && a && bz
            ? new Intl.NumberFormat(i, { style: 'currency', currency: a }).formatToParts(r)
            : void 0)
      ) {
        var f = Nk(''.concat(r).split('.'), 2),
          d = f[0],
          m = f[1];
        s = [
          { type: 'currency', value: a },
          { type: 'integer', value: d },
          { type: 'decimal', value: m && '.' },
          { type: 'fraction', value: m },
        ];
      }
      return o.default.createElement(
        'div',
        wN({ className: u('Price', { 'Price--original': c }, n), ref: t }, l),
        $k(s).call(s, function (e, t) {
          return e.value
            ? o.default.createElement(
                'span',
                { className: 'Price-'.concat(e.type), key: t },
                e.value,
              )
            : null;
        }),
      );
    }),
    xz = ['className', 'value', 'status', 'children'],
    Ez = o.default.forwardRef(function (e, t) {
      var n = e.className,
        r = e.value,
        a = e.status,
        i = e.children,
        c = WN(e, xz);
      return o.default.createElement(
        'div',
        wN({ className: u('Progress', a && 'Progress--'.concat(a), n), ref: t }, c),
        o.default.createElement(
          'div',
          {
            className: 'Progress-bar',
            role: 'progressbar',
            style: { width: ''.concat(r, '%') },
            'aria-valuenow': r,
            'aria-valuemin': 0,
            'aria-valuemax': 100,
          },
          i,
        ),
      );
    }),
    kz = requestAnimationFrame;
  function Sz(e) {
    var t = e.el,
      n = e.to,
      r = e.duration,
      a = void 0 === r ? 300 : r,
      o = e.x,
      i = 0,
      c = o ? 'scrollLeft' : 'scrollTop',
      u = t[c],
      l = Math.round(a / 16),
      s = (n - u) / l;
    kz
      ? (function e() {
          (t[c] += s), ++i < l && kz(e);
        })()
      : (t[c] = n);
  }
  var Nz = zP('passiveListener'),
    Oz = !!Nz && { passive: !0 },
    Tz = !!Nz && { passive: !1 },
    Cz = o.default.forwardRef(function (e, n) {
      var r = e.distance,
        a = void 0 === r ? 30 : r,
        i = e.loadingDistance,
        c = void 0 === i ? 30 : i,
        l = e.maxDistance,
        s = e.distanceRatio,
        f = void 0 === s ? 2 : s,
        d = e.loadMoreText,
        m = void 0 === d ? '点击加载更多' : d,
        p = e.children,
        v = e.onScroll,
        h = e.onRefresh,
        g = e.renderIndicator,
        y =
          void 0 === g
            ? function (e) {
                return 'active' === e || 'loading' === e
                  ? o.default.createElement(XO, {
                      className: 'PullToRefresh-spinner',
                      type: 'spinner',
                      spin: !0,
                    })
                  : null;
              }
            : g,
        b = t.useRef(null),
        w = t.useRef(null),
        x = Nk(t.useState(0), 2),
        E = x[0],
        k = x[1],
        S = Nk(t.useState('pending'), 2),
        N = S[0],
        O = S[1],
        T = Nk(t.useState(!1), 2),
        C = T[0],
        A = T[1],
        R = Nk(t.useState(!e.onRefresh), 2),
        j = R[0],
        I = R[1],
        P = t.useRef({}),
        M = t.useRef(N),
        L = t.useRef(),
        _ = t.useRef(),
        D = !zP('touch');
      t.useEffect(
        function () {
          M.current = N;
        },
        [N],
      );
      var F = function (e) {
          var t = w.current;
          t && _P(t, 'translate3d(0px,'.concat(e, 'px,0)'));
        },
        z = function (e) {
          var t = e.y,
            n = e.animated,
            r = void 0 === n || n,
            a = b.current;
          if (a) {
            var o = '100%' === t ? a.scrollHeight - a.offsetHeight : t;
            r ? Sz({ el: a, to: o, x: !1 }) : (a.scrollTop = o);
          }
        },
        H = t.useCallback(function () {
          var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).animated;
          z({ y: '100%', animated: void 0 === e || e });
        }, []),
        B = t.useCallback(function () {
          k(0), O('pending'), F(0);
        }, []),
        U = t.useCallback(
          function () {
            var e = b.current;
            if (e) {
              O('loading');
              try {
                var t = e.scrollHeight;
                h().then(function (n) {
                  var r = function () {
                    z({ y: e.scrollHeight - t - 50, animated: !1 });
                  };
                  clearTimeout(L.current),
                    clearTimeout(_.current),
                    r(),
                    (L.current = setTimeout(r, 150)),
                    (_.current = setTimeout(r, 250)),
                    B(),
                    n && n.noMore && I(!0);
                });
              } catch (e) {
                B();
              }
            }
          },
          [h, B],
        ),
        Y = function (e) {
          (P.current.startY = e.touches[0].clientY),
            (P.current.canPull = b.current && b.current.scrollTop <= 0),
            P.current.canPull && (O('pull'), A(!1));
        },
        V = t.useCallback(
          function (e) {
            var t = e.touches[0].clientY,
              n = P.current,
              r = n.canPull,
              o = n.startY;
            if (r && !(t < o) && 'loading' !== M.current) {
              var i = (t - o) / f;
              l && i > l && (i = l),
                i > 0 &&
                  (e.cancelable && e.preventDefault(),
                  e.stopPropagation(),
                  F(i),
                  k(i),
                  O(i >= a ? 'active' : 'pull'));
            }
          },
          [f, l, a],
        ),
        W = t.useCallback(
          function () {
            A(!0), 'active' === M.current ? U() : B();
          },
          [U, B],
        );
      return (
        t.useEffect(
          function () {
            var e = b.current;
            e &&
              !D &&
              (j
                ? (e.removeEventListener('touchstart', Y),
                  e.removeEventListener('touchmove', V),
                  e.removeEventListener('touchend', W),
                  e.removeEventListener('touchcancel', W))
                : (e.addEventListener('touchstart', Y, Oz),
                  e.addEventListener('touchmove', V, Tz),
                  e.addEventListener('touchend', W),
                  e.addEventListener('touchcancel', W)));
          },
          [j, W, V, D],
        ),
        t.useEffect(
          function () {
            'loading' !== N || D || F(c);
          },
          [c, N, D],
        ),
        t.useImperativeHandle(
          n,
          function () {
            return { scrollTo: z, scrollToEnd: H, wrapperRef: b };
          },
          [H],
        ),
        o.default.createElement(
          'div',
          { className: 'PullToRefresh', ref: b, onScroll: v },
          o.default.createElement(
            'div',
            { className: 'PullToRefresh-inner' },
            o.default.createElement(
              'div',
              { className: u('PullToRefresh-content', { 'PullToRefresh-transition': C }), ref: w },
              o.default.createElement('div', { className: 'PullToRefresh-indicator' }, y(N, E)),
              !j &&
                D &&
                o.default.createElement(
                  aT,
                  { className: 'PullToRefresh-fallback', center: !0 },
                  y(N, a),
                  o.default.createElement(
                    KO,
                    { className: 'PullToRefresh-loadMore', variant: 'text', onClick: U },
                    m,
                  ),
                ),
              o.default.Children.only(p),
            ),
          ),
        )
      );
    }),
    Az = { threshold: [0, 0.1] },
    Rz = function (e) {
      var n = e.item,
        r = e.effect,
        a = e.children,
        i = e.onIntersect,
        c = t.useRef(null);
      return (
        t.useEffect(
          function () {
            if (i) {
              var e = new IntersectionObserver(function (t) {
                var r = Nk(t, 1)[0];
                r.intersectionRatio > 0 && (i(n, r) || e.unobserve(r.target));
              }, Az);
              return (
                c.current && e.observe(c.current),
                function () {
                  e.disconnect();
                }
              );
            }
          },
          [n, i],
        ),
        o.default.createElement(
          'div',
          {
            className: u('ScrollView-item', {
              'slide-in-right-item': 'slide' === r,
              'A-fadeIn': 'fade' === r,
            }),
            ref: c,
          },
          a,
        )
      );
    },
    jz = [
      'className',
      'fullWidth',
      'scrollX',
      'effect',
      'data',
      'itemKey',
      'renderItem',
      'onIntersect',
      'onScroll',
      'children',
    ],
    Iz = !zP('touch'),
    Pz = o.default.forwardRef(function (e, n) {
      var r = e.className,
        a = e.fullWidth,
        i = e.scrollX,
        c = void 0 === i || i,
        l = e.effect,
        s = void 0 === l ? 'slide' : l,
        f = e.data,
        d = e.itemKey,
        m = e.renderItem,
        p = e.onIntersect,
        v = e.onScroll,
        h = e.children,
        g = WN(e, jz),
        y = t.useRef(null);
      var b = t.useCallback(
        function (e, t) {
          var n;
          return d && (n = 'function' == typeof d ? d(e, t) : e[d]), n || t;
        },
        [d],
      );
      return (
        t.useImperativeHandle(n, function () {
          return {
            scrollTo: function (e) {
              var t = e.x,
                n = e.y;
              null != t && (y.current.scrollLeft = t), null != n && (y.current.scrollTop = n);
            },
          };
        }),
        o.default.createElement(
          'div',
          wN(
            {
              className: u(
                'ScrollView',
                { 'ScrollView--fullWidth': a, 'ScrollView--x': c, 'ScrollView--hasControls': Iz },
                r,
              ),
              ref: n,
            },
            g,
          ),
          Iz &&
            o.default.createElement(aM, {
              className: 'ScrollView-control',
              icon: 'chevron-left',
              'aria-label': 'Previous',
              onClick: function () {
                var e = y.current;
                e.scrollLeft -= e.offsetWidth;
              },
            }),
          o.default.createElement(
            'div',
            { className: 'ScrollView-scroller', ref: y, onScroll: v },
            o.default.createElement(
              'div',
              { className: 'ScrollView-inner' },
              $k(f).call(f, function (e, t) {
                return o.default.createElement(
                  Rz,
                  { item: e, effect: e.effect || s, onIntersect: p, key: b(e, t) },
                  m(e, t),
                );
              }),
              h ? o.default.createElement(Rz, { item: {}, effect: s, onIntersect: p }, h) : null,
            ),
          ),
          Iz &&
            o.default.createElement(aM, {
              className: 'ScrollView-control',
              icon: 'chevron-right',
              'aria-label': 'Next',
              onClick: function () {
                var e = y.current;
                e.scrollLeft += e.offsetWidth;
              },
            }),
        )
      );
    }),
    Mz = function (e) {
      var t = e.item,
        n = e.index,
        r = e.onClick;
      return o.default.createElement(
        'button',
        {
          className: u('QuickReply', { new: t.isNew, highlight: t.isHighlight }),
          type: 'button',
          'data-code': t.code,
          'aria-label': '快捷短语: '.concat(t.name, '，双击发送'),
          onClick: function () {
            r(t, n);
          },
        },
        o.default.createElement(
          'div',
          { className: 'QuickReply-inner' },
          t.icon && o.default.createElement(XO, { type: t.icon }),
          t.img &&
            o.default.createElement('img', { className: 'QuickReply-img', src: t.img, alt: '' }),
          o.default.createElement('span', null, t.name),
        ),
      );
    },
    Lz = function (e) {
      var n = e.items,
        r = e.visible,
        a = e.onClick,
        i = e.onScroll,
        c = t.useRef(null),
        u = Nk(t.useState(!!i), 2),
        l = u[0],
        s = u[1];
      return (
        t.useLayoutEffect(
          function () {
            var e;
            return (
              c.current &&
                (s(!1),
                c.current.scrollTo({ x: 0, y: 0 }),
                (e = setTimeout(function () {
                  s(!0);
                }, 500))),
              function () {
                clearTimeout(e);
              }
            );
          },
          [n],
        ),
        n.length
          ? o.default.createElement(Pz, {
              className: 'QuickReplies',
              data: n,
              itemKey: 'name',
              ref: c,
              'data-visible': r,
              onScroll: l ? i : void 0,
              renderItem: function (e, t) {
                return o.default.createElement(Mz, { item: e, index: t, onClick: a, key: e.name });
              },
            })
          : null
      );
    };
  Lz.defaultProps = { items: [], visible: !0 };
  var _z = o.default.memo(Lz),
    Dz = ['className', 'label', 'checked', 'disabled', 'onChange'],
    Fz = function (e) {
      var t = e.className,
        n = e.label,
        r = e.checked,
        a = e.disabled,
        i = e.onChange,
        c = WN(e, Dz);
      return o.default.createElement(
        'label',
        { className: u('Radio', t, { 'Radio--checked': r, 'Radio--disabled': a }) },
        o.default.createElement(
          'input',
          wN({ type: 'radio', className: 'Radio-input', checked: r, disabled: a, onChange: i }, c),
        ),
        o.default.createElement('span', { className: 'Radio-text' }, n),
      );
    },
    zz = 'up',
    Hz = 'down';
  ue.addHook('beforeSanitizeAttributes', function (e) {
    if (e instanceof HTMLElement && e.hasAttribute('href')) {
      var t = e.getAttribute('href');
      t && (e.dataset.cuiHref = t),
        '_blank' === e.getAttribute('target') && (e.dataset.cuiTarget = '1');
    }
  }),
    ue.addHook('afterSanitizeAttributes', function (e) {
      e instanceof HTMLElement &&
        (e.dataset.cuiHref && e.hasAttribute('href') && e.removeAttribute('data-cui-href'),
        e.dataset.cuiTarget &&
          (e.setAttribute('target', '_blank'),
          e.setAttribute('rel', 'noopener noreferrer'),
          e.removeAttribute('data-cui-target')));
    });
  var Bz = ['className', 'content', 'options'],
    Uz = o.default.forwardRef(function (e, t) {
      var n = e.className,
        r = e.content,
        a = e.options,
        i = void 0 === a ? {} : a,
        c = WN(e, Bz),
        l = { __html: ue.sanitize(r, i) };
      return o.default.createElement(
        'div',
        wN({ className: u('RichText', n), dangerouslySetInnerHTML: l, ref: t }, c),
      );
    }),
    Yz = ['className', 'onSearch', 'onChange', 'onClear', 'value', 'clearable', 'showSearch'],
    Vz = ['className', 'placeholder', 'variant', 'children'],
    Wz = o.default.forwardRef(function (e, t) {
      var n = e.className,
        r = e.placeholder,
        a = e.variant,
        i = void 0 === a ? 'outline' : a,
        c = e.children,
        l = WN(e, Vz);
      return o.default.createElement(
        'select',
        wN({ className: u('Input Select', 'Input--'.concat(i), n) }, l, { ref: t }),
        r && o.default.createElement('option', { value: '' }, r),
        c,
      );
    });
  function Gz(e, t) {
    var n = Qg(e);
    if ($w) {
      var r = $w(e);
      t &&
        (r = lS(r).call(r, function (t) {
          return ox(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function Xz(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? Gz(Object(n), !0).forEach(function (t) {
            Hk(e, t, n[t]);
          })
        : dx
        ? xx(e, dx(n))
        : Gz(Object(n)).forEach(function (t) {
            Rx(e, t, ox(n, t));
          });
    }
    return e;
  }
  var $z = ['className', 'current', 'status', 'inverted', 'children'];
  function qz(e, t) {
    var n = Qg(e);
    if ($w) {
      var r = $w(e);
      t &&
        (r = lS(r).call(r, function (t) {
          return ox(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function Kz(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? qz(Object(n), !0).forEach(function (t) {
            Hk(e, t, n[t]);
          })
        : dx
        ? xx(e, dx(n))
        : qz(Object(n)).forEach(function (t) {
            Rx(e, t, ox(n, t));
          });
    }
    return e;
  }
  var Jz = o.default.forwardRef(function (e, t) {
      var n = e.className,
        r = e.current,
        a = void 0 === r ? 0 : r,
        i = e.status,
        c = e.inverted,
        l = e.children,
        s = WN(e, $z),
        f = o.default.Children.toArray(l),
        d = $k(f).call(f, function (e, t) {
          var n = { index: t, active: !1, completed: !1, disabled: !1 };
          return (
            a === t
              ? ((n.active = !0), (n.status = i))
              : a > t
              ? (n.completed = !0)
              : ((n.disabled = !c), (n.completed = c)),
            o.default.isValidElement(e) ? o.default.cloneElement(e, Kz(Kz({}, n), e.props)) : null
          );
        });
      return o.default.createElement('ul', wN({ className: u('Stepper', n), ref: t }, s), d);
    }),
    Zz = [
      'className',
      'active',
      'completed',
      'disabled',
      'status',
      'index',
      'title',
      'subTitle',
      'desc',
      'children',
    ];
  var Qz = o.default.forwardRef(function (e, t) {
      var n = e.className,
        r = e.active,
        a = void 0 !== r && r,
        i = e.completed,
        c = void 0 !== i && i,
        l = e.disabled,
        s = void 0 !== l && l,
        f = e.status;
      e.index;
      var d = e.title,
        m = e.subTitle,
        p = e.desc,
        v = e.children,
        h = WN(e, Zz);
      return o.default.createElement(
        'li',
        wN(
          {
            className: u(
              'Step',
              { 'Step--active': a, 'Step--completed': c, 'Step--disabled': s },
              n,
            ),
            ref: t,
            'data-status': f,
          },
          h,
        ),
        o.default.createElement(
          'div',
          { className: 'Step-icon' },
          (function (e) {
            if (e)
              return o.default.createElement(XO, {
                type: {
                  success: 'check-circle-fill',
                  fail: 'warning-circle-fill',
                  abort: 'dash-circle-fill',
                }[e],
              });
            return o.default.createElement('div', { className: 'Step-dot' });
          })(f),
        ),
        o.default.createElement('div', { className: 'Step-line' }),
        o.default.createElement(
          'div',
          { className: 'Step-content' },
          d &&
            o.default.createElement(
              'div',
              { className: 'Step-title' },
              d && o.default.createElement('span', null, d),
              m && o.default.createElement('small', null, m),
            ),
          p && o.default.createElement('div', { className: 'Step-desc' }, p),
          v,
        ),
      );
    }),
    eH = ['active', 'index', 'children', 'onClick'],
    tH = ['active', 'children'],
    nH = function (e) {
      var t = e.active,
        n = e.index,
        r = e.children,
        a = e.onClick,
        i = WN(e, eH);
      return o.default.createElement(
        'div',
        { className: 'Tabs-navItem' },
        o.default.createElement(
          'button',
          wN(
            {
              className: u('Tabs-navLink', { active: t }),
              type: 'button',
              role: 'tab',
              'aria-selected': t,
              onClick: function (e) {
                a(n, e);
              },
            },
            i,
          ),
          o.default.createElement('span', null, r),
        ),
      );
    },
    rH = function (e) {
      var t = e.active,
        n = e.children,
        r = WN(e, tH);
      return o.default.createElement(
        'div',
        wN({ className: u('Tabs-pane', { active: t }) }, r, { role: 'tabpanel' }),
        n,
      );
    },
    aH = ['as', 'className', 'color', 'children'],
    oH = o.default.forwardRef(function (e, t) {
      var n = e.as,
        r = void 0 === n ? 'span' : n,
        a = e.className,
        i = e.color,
        c = e.children,
        l = WN(e, aH);
      return o.default.createElement(
        r,
        wN({ className: u('Tag', i && 'Tag--'.concat(i), a), ref: t }, l),
        c,
      );
    });
  var iH = function (e) {
    var n = e.content,
      r = e.type,
      a = e.duration,
      i = void 0 === a ? 2e3 : a,
      c = e.onUnmount,
      l = Nk(t.useState(!1), 2),
      s = l[0],
      f = l[1];
    return (
      t.useEffect(
        function () {
          f(!0),
            -1 !== i &&
              (setTimeout(function () {
                f(!1);
              }, i),
              setTimeout(function () {
                c && c();
              }, i + 300));
        },
        [i, c],
      ),
      o.default.createElement(
        'div',
        {
          className: u('Toast', { show: s }),
          'data-type': r,
          role: 'alert',
          'aria-live': 'assertive',
          'aria-atomic': 'true',
        },
        o.default.createElement(
          'div',
          { className: 'Toast-content', role: 'presentation' },
          (function (e) {
            switch (e) {
              case 'success':
                return o.default.createElement(XO, { type: 'check-circle' });
              case 'error':
                return o.default.createElement(XO, { type: 'warning-circle' });
              case 'loading':
                return o.default.createElement(XO, { type: 'spinner', spin: !0 });
              default:
                return null;
            }
          })(r),
          o.default.createElement('p', { className: 'Toast-message' }, n),
        ),
      )
    );
  };
  function cH(e, t, n) {
    Jd(o.default.createElement(iH, { content: e, type: t, duration: n }));
  }
  var uH = {
      show: cH,
      success: function (e, t) {
        cH(e, 'success', t);
      },
      fail: function (e, t) {
        cH(e, 'error', t);
      },
      loading: function (e, t) {
        cH(e, 'loading', t);
      },
    },
    lH = function (e) {
      var t = e.item,
        n = e.onClick,
        r = t.type,
        a = t.icon,
        i = t.img,
        c = t.title;
      return o.default.createElement(
        'div',
        { className: 'Toolbar-item', 'data-type': r },
        o.default.createElement(
          KO,
          {
            className: 'Toolbar-btn',
            onClick: function (e) {
              return n(t, e);
            },
          },
          o.default.createElement(
            'span',
            { className: 'Toolbar-btnIcon' },
            a && o.default.createElement(XO, { type: a }),
            i && o.default.createElement('img', { className: 'Toolbar-img', src: i, alt: '' }),
          ),
          o.default.createElement('span', { className: 'Toolbar-btnText' }, c),
        ),
      );
    },
    sH = function (e) {
      var t = e.items,
        n = e.onClick;
      return o.default.createElement(
        'div',
        { className: 'Toolbar' },
        $k(t).call(t, function (e) {
          return o.default.createElement(lH, { item: e, onClick: n, key: e.type });
        }),
      );
    };
  function fH(e, t) {
    var n = Qg(e);
    if ($w) {
      var r = $w(e);
      t &&
        (r = lS(r).call(r, function (t) {
          return ox(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function dH(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? fH(Object(n), !0).forEach(function (t) {
            Hk(e, t, n[t]);
          })
        : dx
        ? xx(e, dx(n))
        : fH(Object(n)).forEach(function (t) {
            Rx(e, t, ox(n, t));
          });
    }
    return e;
  }
  var mH = [
      'className',
      'src',
      'cover',
      'duration',
      'onClick',
      'onCoverLoad',
      'style',
      'videoRef',
      'children',
    ],
    pH = {
      position: 'absolute',
      height: '1px',
      width: '1px',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      margin: '-1px',
      whiteSpace: 'nowrap',
    },
    vH = { exports: {} };
  !(function (e) {
    e.exports = wk;
  })(vH);
  var hH = se(vH.exports),
    gH = { exports: {} },
    yH = we,
    bH = it,
    wH = sa,
    xH = ya,
    EH = CN,
    kH = Math.min,
    SH = [].lastIndexOf,
    NH = !!SH && 1 / [1].lastIndexOf(1, -0) < 0,
    OH = EH('lastIndexOf'),
    TH =
      NH || !OH
        ? function (e) {
            if (NH) return yH(SH, this, arguments) || 0;
            var t = bH(this),
              n = xH(t),
              r = n - 1;
            for (
              arguments.length > 1 && (r = kH(r, wH(arguments[1]))), r < 0 && (r = n + r);
              r >= 0;
              r--
            )
              if (r in t && t[r] === e) return r || 0;
            return -1;
          }
        : SH;
  Dr({ target: 'Array', proto: !0, forced: TH !== [].lastIndexOf }, { lastIndexOf: TH });
  var CH = vk('Array').lastIndexOf,
    AH = ht,
    RH = CH,
    jH = Array.prototype,
    IH = function (e) {
      var t = e.lastIndexOf;
      return e === jH || (AH(jH, e) && t === jH.lastIndexOf) ? RH : t;
    };
  !(function (e) {
    e.exports = IH;
  })(gH);
  var PH = se(gH.exports),
    MH = { exports: {} },
    LH = me,
    _H = pe,
    DH = Si,
    FH = wP.trim,
    zH = dP,
    HH = Ne(''.charAt),
    BH = LH.parseFloat,
    UH = LH.Symbol,
    YH = UH && UH.iterator,
    VH =
      1 / BH(zH + '-0') != -1 / 0 ||
      (YH &&
        !_H(function () {
          BH(Object(YH));
        }))
        ? function (e) {
            var t = FH(DH(e)),
              n = BH(t);
            return 0 === n && '-' == HH(t, 0) ? -0 : n;
          }
        : BH;
  Dr({ global: !0, forced: parseFloat != VH }, { parseFloat: VH });
  var WH = st.parseFloat;
  !(function (e) {
    e.exports = WH;
  })(MH);
  var GH = se(MH.exports),
    XH = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    $H = [
      'className',
      'type',
      'img',
      'name',
      'desc',
      'tags',
      'locale',
      'currency',
      'price',
      'count',
      'unit',
      'action',
      'children',
      'originalPrice',
      'meta',
      'status',
    ],
    qH = o.default.forwardRef(function (e, t) {
      var n = e.className,
        r = e.type,
        a = e.img,
        i = e.name,
        c = e.desc,
        l = e.tags,
        s = void 0 === l ? [] : l,
        f = e.locale,
        d = e.currency,
        m = e.price,
        p = e.count,
        v = e.unit,
        h = e.action,
        g = e.children,
        y = e.originalPrice,
        b = e.meta,
        w = e.status,
        x = WN(e, $H),
        E = 'order' === r,
        k = o.default.createElement(
          o.default.Fragment,
          null,
          o.default.createElement(LF, { as: 'h4', truncate: !E || 2, className: 'Goods-name' }, i),
          o.default.createElement(LF, { className: 'Goods-desc' }, c),
          o.default.createElement(
            'div',
            { className: 'Goods-tags' },
            $k(s).call(s, function (e) {
              return o.default.createElement(oH, { color: 'primary', key: e.name }, e.name);
            }),
          ),
        ),
        S = { currency: d, locale: f },
        N = null != m && o.default.createElement(wz, wN({ price: m }, S)),
        O = o.default.createElement(
          'div',
          { className: 'Goods-countUnit' },
          p && o.default.createElement('span', { className: 'Goods-count' }, '×', p),
          v && o.default.createElement('span', { className: 'Goods-unit' }, v),
        ),
        T = E
          ? k
          : o.default.createElement(
              o.default.Fragment,
              null,
              h && o.default.createElement(aM, wN({ className: 'Goods-buyBtn', icon: 'cart' }, h)),
              k,
              o.default.createElement(
                aT,
                { alignItems: 'flex-end' },
                o.default.createElement(
                  uT,
                  null,
                  N,
                  y && o.default.createElement(wz, wN({ price: y, original: !0 }, S)),
                  b && o.default.createElement('span', { className: 'Goods-meta' }, b),
                ),
                O,
              ),
            );
      return o.default.createElement(
        aT,
        wN({ className: u('Goods', n), 'data-type': r, ref: t }, x),
        a && o.default.createElement('img', { className: 'Goods-img', src: a, alt: i }),
        o.default.createElement(uT, { className: 'Goods-main' }, T, g),
        E &&
          o.default.createElement(
            'div',
            { className: 'Goods-aside' },
            N,
            O,
            o.default.createElement('span', { className: 'Goods-status' }, w),
            h && o.default.createElement(KO, wN({ className: 'Goods-detailBtn' }, h)),
          ),
      );
    }),
    KH = function (e) {
      var n = e.count,
        r = e.onClick,
        a = e.onDidMount,
        i = hD('BackBottom').trans,
        c = i('bottom');
      return (
        n && (c = i(1 === n ? 'newMsgOne' : 'newMsgOther').replace('{n}', n)),
        t.useEffect(
          function () {
            a && a();
          },
          [a],
        ),
        o.default.createElement(
          'div',
          { className: 'BackBottom' },
          o.default.createElement(
            KO,
            { className: 'slide-in-right-item', onClick: r },
            c,
            o.default.createElement(XO, { type: 'chevron-double-down' }),
          ),
        )
      );
    };
  var JH = !!zP('passiveListener') && { passive: !0 };
  function ZH(e, t) {
    var n = Math.max(e.offsetHeight, 600);
    return cM(e) < n * t;
  }
  var QH = o.default.forwardRef(function (e, n) {
      var r = e.messages,
        a = e.loadMoreText,
        i = e.onRefresh,
        c = e.onScroll,
        u = e.renderBeforeMessageList,
        l = e.renderMessageContent,
        s = e.onBackBottomShow,
        f = e.onBackBottomClick,
        d = Nk(t.useState(!1), 2),
        m = d[0],
        p = d[1],
        v = Nk(t.useState(0), 2),
        h = v[0],
        g = v[1],
        y = t.useRef(m),
        b = t.useRef(h),
        w = t.useRef(null),
        x = t.useRef(null),
        E = r[r.length - 1],
        k = function () {
          g(0), p(!1);
        },
        S = t.useCallback(function (e) {
          x.current &&
            (!y.current || (e && e.force)) &&
            (x.current.scrollToEnd(e), y.current && k());
        }, []),
        N = t.useRef(
          (function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 300,
              n = !0;
            return function () {
              n &&
                ((n = !1),
                e.apply(void 0, arguments),
                setTimeout(function () {
                  n = !0;
                }, t));
            };
          })(function (e) {
            ZH(e, 3) ? (b.current ? ZH(e, 0.5) && k() : p(!1)) : p(!0);
          }),
        );
      return (
        t.useEffect(
          function () {
            b.current = h;
          },
          [h],
        ),
        t.useEffect(
          function () {
            y.current = m;
          },
          [m],
        ),
        t.useEffect(
          function () {
            var e = x.current,
              t = e && e.wrapperRef.current;
            if (t && E && 'pop' !== E.position)
              if ('right' === E.position) S({ force: !0 });
              else if (ZH(t, 2)) {
                var n = !!t.scrollTop;
                S({ animated: n, force: !0 });
              } else
                g(function (e) {
                  return e + 1;
                }),
                  p(!0);
          },
          [E, S],
        ),
        t.useEffect(function () {
          var e = w.current,
            t = !1,
            n = 0;
          function r() {
            (t = !1), (n = 0);
          }
          function a(e) {
            var r = document.activeElement;
            r && 'TEXTAREA' === r.nodeName && ((t = !0), (n = e.touches[0].clientY));
          }
          function o(e) {
            t && Math.abs(e.touches[0].clientY - n) > 20 && (document.activeElement.blur(), r());
          }
          return (
            e.addEventListener('touchstart', a, JH),
            e.addEventListener('touchmove', o, JH),
            e.addEventListener('touchend', r),
            e.addEventListener('touchcancel', r),
            function () {
              e.removeEventListener('touchstart', a),
                e.removeEventListener('touchmove', o),
                e.removeEventListener('touchend', r),
                e.removeEventListener('touchcancel', r);
            }
          );
        }, []),
        t.useImperativeHandle(
          n,
          function () {
            return { ref: w, scrollToEnd: S };
          },
          [S],
        ),
        o.default.createElement(
          'div',
          { className: 'MessageContainer', ref: w, tabIndex: -1 },
          u && u(),
          o.default.createElement(
            Cz,
            {
              onRefresh: i,
              onScroll: function (e) {
                N.current(e.target), c && c(e);
              },
              loadMoreText: a,
              ref: x,
            },
            o.default.createElement(
              'div',
              { className: 'MessageList' },
              $k(r).call(r, function (e) {
                return o.default.createElement(
                  RD,
                  wN({}, e, { renderMessageContent: l, key: e._id }),
                );
              }),
            ),
          ),
          m &&
            o.default.createElement(KH, {
              count: h,
              onClick: function () {
                S({ animated: !1, force: !0 }), f && f();
              },
              onDidMount: s,
            }),
        )
      );
    }),
    eB = zP('passiveListener'),
    tB = !!eB && { passive: !0 },
    nB = !!eB && { passive: !1 },
    rB = { inited: 'hold2talk', recording: 'release2send', willCancel: 'release2send' },
    aB = 0,
    oB = 0,
    iB = o.default.forwardRef(function (e, n) {
      var r = e.volume,
        a = e.onStart,
        i = e.onEnd,
        c = e.onCancel,
        l = Nk(t.useState('inited'), 2),
        s = l[0],
        f = l[1],
        d = t.useRef(null),
        m = hD('Recorder').trans,
        p = t.useCallback(
          function () {
            var e = Date.now() - aB;
            i && i({ duration: e });
          },
          [i],
        );
      t.useImperativeHandle(n, function () {
        return {
          stop: function () {
            f('inited'), p(), (aB = 0);
          },
        };
      }),
        t.useEffect(
          function () {
            var e = d.current;
            function t(e) {
              e.cancelable && e.preventDefault();
              var t = e.touches[0];
              (oB = t.pageY), (aB = Date.now()), f('recording'), a && a();
            }
            function n(e) {
              if (aB) {
                var t = e.touches[0].pageY;
                f(oB - t > 80 ? 'willCancel' : 'recording');
              }
            }
            function r(e) {
              if (aB) {
                var t = e.changedTouches[0].pageY,
                  n = oB - t < 80;
                f('inited'), n ? p() : c && c();
              }
            }
            return (
              e.addEventListener('touchstart', t, nB),
              e.addEventListener('touchmove', n, tB),
              e.addEventListener('touchend', r),
              e.addEventListener('touchcancel', r),
              function () {
                e.removeEventListener('touchstart', t),
                  e.removeEventListener('touchmove', n),
                  e.removeEventListener('touchend', r),
                  e.removeEventListener('touchcancel', r);
              }
            );
          },
          [p, c, a],
        );
      var v = 'willCancel' === s,
        h = { transform: 'scale('.concat((r || 1) / 100 + 1, ')') };
      return o.default.createElement(
        'div',
        { className: u('Recorder', { 'Recorder--cancel': v }), ref: d },
        'inited' !== s &&
          o.default.createElement(
            aT,
            { className: 'RecorderToast', direction: 'column', center: !0 },
            o.default.createElement(
              'div',
              { className: 'RecorderToast-waves', hidden: 'recording' !== s, style: h },
              o.default.createElement(XO, { className: 'RecorderToast-wave-1', type: 'hexagon' }),
              o.default.createElement(XO, { className: 'RecorderToast-wave-2', type: 'hexagon' }),
              o.default.createElement(XO, { className: 'RecorderToast-wave-3', type: 'hexagon' }),
            ),
            o.default.createElement(XO, {
              className: 'RecorderToast-icon',
              type: v ? 'cancel' : 'mic',
            }),
            o.default.createElement('span', null, m(v ? 'release2cancel' : 'releaseOrSwipe')),
          ),
        o.default.createElement(
          'div',
          { className: 'Recorder-btn', role: 'button', 'aria-label': m('hold2talk') },
          o.default.createElement('span', null, m(rB[s])),
        ),
      );
    }),
    cB = function (e) {
      var t = e.onClickOutside,
        n = e.children;
      return o.default.createElement($P, { onClick: t }, n);
    };
  var uB = function (e) {
      var r,
        a,
        i = e.className,
        c = e.active,
        l = e.target,
        s = e.children,
        f = Zd(e.onClose, 'mousedown'),
        d = LS({ active: c, ref: f }),
        m = d.didMount,
        p = d.isShow,
        v = Nk(t.useState({}), 2),
        h = v[0],
        g = v[1],
        y = t.useCallback(
          function () {
            if (f.current) {
              var e = l.getBoundingClientRect(),
                t = f.current.getBoundingClientRect();
              g({ top: ''.concat(e.top - t.height, 'px'), left: ''.concat(e.left, 'px') });
            }
          },
          [l, f],
        );
      return (
        t.useEffect(
          function () {
            f.current && (f.current.focus(), y());
          },
          [m, y, f],
        ),
        (r = y),
        (a = t.useRef(!1)),
        t.useEffect(
          function () {
            function e() {
              r(), (a.current = !1);
            }
            function t() {
              a.current ||
                ((a.current = !0),
                window.requestAnimationFrame ? window.requestAnimationFrame(e) : setTimeout(e, 66));
            }
            return (
              window.addEventListener('resize', t),
              function () {
                window.removeEventListener('resize', t);
              }
            );
          },
          [r],
        ),
        m
          ? n.createPortal(
              o.default.createElement(
                'div',
                { className: u('Popover', i, { active: p }), ref: f, style: h },
                o.default.createElement('div', { className: 'Popover-body' }, s),
                o.default.createElement(
                  'svg',
                  { className: 'Popover-arrow', viewBox: '0 0 9 5' },
                  o.default.createElement('polygon', { points: '0,0 5,5, 9,0' }),
                ),
              ),
              document.body,
            )
          : null
      );
    },
    lB = function (e) {
      return o.default.createElement(
        'div',
        { className: 'Composer-actions', 'data-action-icon': e.icon },
        o.default.createElement(aM, wN({ size: 'lg' }, e)),
      );
    },
    sB = function (e) {
      var t = e.item,
        n = e.onClick;
      return o.default.createElement(lB, {
        icon: t.icon,
        img: t.img,
        'data-icon': t.icon,
        'data-tooltip': t.title || null,
        'aria-label': t.title,
        onClick: n,
      });
    },
    fB = function (e) {
      var n = e.file,
        r = e.onCancel,
        a = e.onSend,
        i = Nk(t.useState(''), 2),
        c = i[0],
        u = i[1],
        l = hD('SendConfirm').trans;
      return (
        t.useEffect(
          function () {
            var e = new FileReader();
            (e.onload = function (e) {
              e.target && u(e.target.result);
            }),
              e.readAsDataURL(n);
          },
          [n],
        ),
        o.default.createElement(
          _D,
          {
            className: 'SendConfirm',
            title: l('title'),
            active: !!c,
            vertical: !1,
            actions: [
              { label: l('cancel'), onClick: r },
              { label: l('send'), color: 'primary', onClick: a },
            ],
          },
          o.default.createElement(
            aT,
            { className: 'SendConfirm-inner', center: !0 },
            o.default.createElement('img', { src: c, alt: '' }),
          ),
        )
      );
    },
    dB = Op,
    mB = kp,
    pB = bm,
    vB = og,
    hB = dS,
    gB = Em,
    yB = Vp,
    bB = y_,
    wB = P_;
  u_('match', function (e, t, n) {
    return [
      function (t) {
        var n = gB(this),
          r = pB(t) ? void 0 : yB(t, e);
        return r ? dB(r, t, n) : new RegExp(t)[e](hB(n));
      },
      function (e) {
        var r = mB(this),
          a = hB(e),
          o = n(t, r, a);
        if (o.done) return o.value;
        if (!r.global) return wB(r, a);
        var i = r.unicode;
        r.lastIndex = 0;
        for (var c, u = [], l = 0; null !== (c = wB(r, a)); ) {
          var s = hB(c[0]);
          (u[l] = s), '' === s && (r.lastIndex = bB(a, vB(r.lastIndex), i)), l++;
        }
        return 0 === l ? null : u;
      },
    ];
  });
  var xB = navigator.userAgent;
  function EB() {
    var e = xB.match(/OS (\d+)_/);
    return e ? +e[1] : 0;
  }
  var kB = /iPad|iPhone|iPod/.test(xB);
  function SB() {
    if (kB) {
      if (sP(xB).call(xB, 'Safari/') || /OS 11_[0-3]\D/.test(xB)) return 0;
      if (EB() < 13) return 1;
    }
    return 2;
  }
  var NB = { exports: {} };
  !(function (e) {
    e.exports = FN;
  })(NB);
  var OB = se(NB.exports);
  var TB = ['inputRef', 'invisible', 'onImageSend', 'disabled'],
    CB = zP('touch'),
    AB = function (e) {
      var n = e.inputRef;
      e.invisible;
      var r = e.onImageSend,
        a = e.disabled,
        i = WN(e, TB),
        c = Nk(t.useState(null), 2),
        u = c[0],
        l = c[1],
        s = t.useCallback(function (e) {
          !(function (e, t) {
            var n = e.clipboardData.items;
            if (n && n.length)
              for (var r = 0; r < n.length; r++) {
                var a,
                  o = n[r];
                if (-1 !== OB((a = o.type)).call(a, 'image')) {
                  var i = o.getAsFile();
                  i && t(i), e.preventDefault();
                  break;
                }
              }
          })(e, l);
        }, []),
        f = t.useCallback(function () {
          l(null);
        }, []),
        d = t.useCallback(
          function () {
            r &&
              u &&
              $d.resolve(r(u)).then(function () {
                l(null);
              });
          },
          [r, u],
        );
      return (
        t.useEffect(
          function () {
            if (CB && n.current) {
              var e = document.querySelector('.Composer');
              !(function (e, t) {
                var n,
                  r = SB(),
                  a = t || e,
                  o = function () {
                    0 !== r &&
                      (1 === r
                        ? (document.body.scrollTop = document.body.scrollHeight)
                        : a.scrollIntoView(!1));
                  };
                e.addEventListener('focus', function () {
                  setTimeout(o, 300), (n = setTimeout(o, 1e3));
                }),
                  e.addEventListener('blur', function () {
                    clearTimeout(n),
                      r &&
                        kB &&
                        setTimeout(function () {
                          document.body.scrollIntoView();
                        });
                  });
              })(n.current, e);
            }
          },
          [n],
        ),
        o.default.createElement(
          'div',
          { className: "clsx({ 'S--invisible': invisible }) main-input" },
          o.default.createElement(
            iD,
            wN(
              {
                className: 'Composer-input',
                rows: 1,
                autoSize: !0,
                enterKeyHint: 'send',
                onPaste: r ? s : void 0,
                ref: n,
                disabled: a,
              },
              i,
            ),
          ),
          u && o.default.createElement(fB, { file: u, onCancel: f, onSend: d }),
        )
      );
    };
  function RB(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function jB(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? RB(Object(n), !0).forEach(function (t) {
            MB(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : RB(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
    }
    return e;
  }
  function IB(e) {
    return (
      (IB =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      IB(e)
    );
  }
  function PB(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      (r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        'value' in r && (r.writable = !0),
        Object.defineProperty(e, r.key, r);
    }
  }
  function MB(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
        : (e[t] = n),
      e
    );
  }
  function LB(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n =
          null == e
            ? null
            : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
        if (null == n) return;
        var r,
          a,
          o = [],
          i = !0,
          c = !1;
        try {
          for (
            n = n.call(e);
            !(i = (r = n.next()).done) && (o.push(r.value), !t || o.length !== t);
            i = !0
          );
        } catch (e) {
          (c = !0), (a = e);
        } finally {
          try {
            i || null == n.return || n.return();
          } finally {
            if (c) throw a;
          }
        }
        return o;
      })(e, t) ||
      DB(e, t) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
        );
      })()
    );
  }
  function _B(e) {
    return (
      (function (e) {
        if (Array.isArray(e)) return FB(e);
      })(e) ||
      (function (e) {
        if (('undefined' != typeof Symbol && null != e[Symbol.iterator]) || null != e['@@iterator'])
          return Array.from(e);
      })(e) ||
      DB(e) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
        );
      })()
    );
  }
  function DB(e, t) {
    if (e) {
      if ('string' == typeof e) return FB(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      return (
        'Object' === n && e.constructor && (n = e.constructor.name),
        'Map' === n || 'Set' === n
          ? Array.from(e)
          : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          ? FB(e, t)
          : void 0
      );
    }
  }
  function FB(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  var zB = function () {},
    HB = {},
    BB = {},
    UB = null,
    YB = { mark: zB, measure: zB };
  try {
    'undefined' != typeof window && (HB = window),
      'undefined' != typeof document && (BB = document),
      'undefined' != typeof MutationObserver && (UB = MutationObserver),
      'undefined' != typeof performance && (YB = performance);
  } catch (e) {}
  var VB = (HB.navigator || {}).userAgent,
    WB = void 0 === VB ? '' : VB,
    GB = HB,
    XB = BB,
    $B = UB,
    qB = YB;
  GB.document;
  var KB,
    JB,
    ZB,
    QB,
    eU,
    tU =
      !!XB.documentElement &&
      !!XB.head &&
      'function' == typeof XB.addEventListener &&
      'function' == typeof XB.createElement,
    nU = ~WB.indexOf('MSIE') || ~WB.indexOf('Trident/'),
    rU = '___FONT_AWESOME___',
    aU = 16,
    oU = 'fa',
    iU = 'svg-inline--fa',
    cU = 'data-fa-i2svg',
    uU = 'data-fa-pseudo-element',
    lU = 'data-fa-pseudo-element-pending',
    sU = 'data-prefix',
    fU = 'data-icon',
    dU = 'fontawesome-i2svg',
    mU = 'async',
    pU = ['HTML', 'HEAD', 'STYLE', 'SCRIPT'],
    vU = (function () {
      try {
        return 'production' === process.env.NODE_ENV;
      } catch (e) {
        return !1;
      }
    })(),
    hU = 'classic',
    gU = 'sharp',
    yU = [hU, gU];
  function bU(e) {
    return new Proxy(e, {
      get: function (e, t) {
        return t in e ? e[t] : e[hU];
      },
    });
  }
  var wU = bU(
      (MB((KB = {}), hU, {
        fa: 'solid',
        fas: 'solid',
        'fa-solid': 'solid',
        far: 'regular',
        'fa-regular': 'regular',
        fal: 'light',
        'fa-light': 'light',
        fat: 'thin',
        'fa-thin': 'thin',
        fad: 'duotone',
        'fa-duotone': 'duotone',
        fab: 'brands',
        'fa-brands': 'brands',
        fak: 'kit',
        'fa-kit': 'kit',
      }),
      MB(KB, gU, {
        fa: 'solid',
        fass: 'solid',
        'fa-solid': 'solid',
        fasr: 'regular',
        'fa-regular': 'regular',
        fasl: 'light',
        'fa-light': 'light',
      }),
      KB),
    ),
    xU = bU(
      (MB((JB = {}), hU, {
        solid: 'fas',
        regular: 'far',
        light: 'fal',
        thin: 'fat',
        duotone: 'fad',
        brands: 'fab',
        kit: 'fak',
      }),
      MB(JB, gU, { solid: 'fass', regular: 'fasr', light: 'fasl' }),
      JB),
    ),
    EU = bU(
      (MB((ZB = {}), hU, {
        fab: 'fa-brands',
        fad: 'fa-duotone',
        fak: 'fa-kit',
        fal: 'fa-light',
        far: 'fa-regular',
        fas: 'fa-solid',
        fat: 'fa-thin',
      }),
      MB(ZB, gU, { fass: 'fa-solid', fasr: 'fa-regular', fasl: 'fa-light' }),
      ZB),
    ),
    kU = bU(
      (MB((QB = {}), hU, {
        'fa-brands': 'fab',
        'fa-duotone': 'fad',
        'fa-kit': 'fak',
        'fa-light': 'fal',
        'fa-regular': 'far',
        'fa-solid': 'fas',
        'fa-thin': 'fat',
      }),
      MB(QB, gU, { 'fa-solid': 'fass', 'fa-regular': 'fasr', 'fa-light': 'fasl' }),
      QB),
    ),
    SU = /fa(s|r|l|t|d|b|k|ss|sr|sl)?[\-\ ]/,
    NU = 'fa-layers-text',
    OU = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,
    TU = bU(
      (MB((eU = {}), hU, { 900: 'fas', 400: 'far', normal: 'far', 300: 'fal', 100: 'fat' }),
      MB(eU, gU, { 900: 'fass', 400: 'fasr', 300: 'fasl' }),
      eU),
    ),
    CU = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    AU = CU.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
    RU = ['class', 'data-prefix', 'data-icon', 'data-fa-transform', 'data-fa-mask'],
    jU = {
      GROUP: 'duotone-group',
      SWAP_OPACITY: 'swap-opacity',
      PRIMARY: 'primary',
      SECONDARY: 'secondary',
    },
    IU = new Set();
  Object.keys(xU[hU]).map(IU.add.bind(IU)), Object.keys(xU[gU]).map(IU.add.bind(IU));
  var PU = []
      .concat(yU, _B(IU), [
        '2xs',
        'xs',
        'sm',
        'lg',
        'xl',
        '2xl',
        'beat',
        'border',
        'fade',
        'beat-fade',
        'bounce',
        'flip-both',
        'flip-horizontal',
        'flip-vertical',
        'flip',
        'fw',
        'inverse',
        'layers-counter',
        'layers-text',
        'layers',
        'li',
        'pull-left',
        'pull-right',
        'pulse',
        'rotate-180',
        'rotate-270',
        'rotate-90',
        'rotate-by',
        'shake',
        'spin-pulse',
        'spin-reverse',
        'spin',
        'stack-1x',
        'stack-2x',
        'stack',
        'ul',
        jU.GROUP,
        jU.SWAP_OPACITY,
        jU.PRIMARY,
        jU.SECONDARY,
      ])
      .concat(
        CU.map(function (e) {
          return ''.concat(e, 'x');
        }),
      )
      .concat(
        AU.map(function (e) {
          return 'w-'.concat(e);
        }),
      ),
    MU = GB.FontAwesomeConfig || {};
  if (XB && 'function' == typeof XB.querySelector) {
    [
      ['data-family-prefix', 'familyPrefix'],
      ['data-css-prefix', 'cssPrefix'],
      ['data-family-default', 'familyDefault'],
      ['data-style-default', 'styleDefault'],
      ['data-replacement-class', 'replacementClass'],
      ['data-auto-replace-svg', 'autoReplaceSvg'],
      ['data-auto-add-css', 'autoAddCss'],
      ['data-auto-a11y', 'autoA11y'],
      ['data-search-pseudo-elements', 'searchPseudoElements'],
      ['data-observe-mutations', 'observeMutations'],
      ['data-mutate-approach', 'mutateApproach'],
      ['data-keep-original-source', 'keepOriginalSource'],
      ['data-measure-performance', 'measurePerformance'],
      ['data-show-missing-icons', 'showMissingIcons'],
    ].forEach(function (e) {
      var t = LB(e, 2),
        n = t[0],
        r = t[1],
        a = (function (e) {
          return '' === e || ('false' !== e && ('true' === e || e));
        })(
          (function (e) {
            var t = XB.querySelector('script[' + e + ']');
            if (t) return t.getAttribute(e);
          })(n),
        );
      null != a && (MU[r] = a);
    });
  }
  var LU = {
    styleDefault: 'solid',
    familyDefault: 'classic',
    cssPrefix: oU,
    replacementClass: iU,
    autoReplaceSvg: !0,
    autoAddCss: !0,
    autoA11y: !0,
    searchPseudoElements: !1,
    observeMutations: !0,
    mutateApproach: 'async',
    keepOriginalSource: !0,
    measurePerformance: !1,
    showMissingIcons: !0,
  };
  MU.familyPrefix && (MU.cssPrefix = MU.familyPrefix);
  var _U = jB(jB({}, LU), MU);
  _U.autoReplaceSvg || (_U.observeMutations = !1);
  var DU = {};
  Object.keys(LU).forEach(function (e) {
    Object.defineProperty(DU, e, {
      enumerable: !0,
      set: function (t) {
        (_U[e] = t),
          FU.forEach(function (e) {
            return e(DU);
          });
      },
      get: function () {
        return _U[e];
      },
    });
  }),
    Object.defineProperty(DU, 'familyPrefix', {
      enumerable: !0,
      set: function (e) {
        (_U.cssPrefix = e),
          FU.forEach(function (e) {
            return e(DU);
          });
      },
      get: function () {
        return _U.cssPrefix;
      },
    }),
    (GB.FontAwesomeConfig = DU);
  var FU = [];
  var zU = aU,
    HU = { size: 16, x: 0, y: 0, rotate: 0, flipX: !1, flipY: !1 };
  var BU = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  function UU() {
    for (var e = 12, t = ''; e-- > 0; ) t += BU[(62 * Math.random()) | 0];
    return t;
  }
  function YU(e) {
    for (var t = [], n = (e || []).length >>> 0; n--; ) t[n] = e[n];
    return t;
  }
  function VU(e) {
    return e.classList
      ? YU(e.classList)
      : (e.getAttribute('class') || '').split(' ').filter(function (e) {
          return e;
        });
  }
  function WU(e) {
    return ''
      .concat(e)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
  function GU(e) {
    return Object.keys(e || {}).reduce(function (t, n) {
      return t + ''.concat(n, ': ').concat(e[n].trim(), ';');
    }, '');
  }
  function XU(e) {
    return (
      e.size !== HU.size ||
      e.x !== HU.x ||
      e.y !== HU.y ||
      e.rotate !== HU.rotate ||
      e.flipX ||
      e.flipY
    );
  }
  var $U =
    ':root, :host {\n  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";\n  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";\n  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";\n  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";\n  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";\n}\n\nsvg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {\n  overflow: visible;\n  box-sizing: content-box;\n}\n\n.svg-inline--fa {\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285705em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  top: 0.25em;\n}\n.svg-inline--fa.fa-fw {\n  width: var(--fa-fw-width, 1.25em);\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-counter-scale, 0.25));\n          transform: scale(var(--fa-counter-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: 0.625em;\n  line-height: 0.1em;\n  vertical-align: 0.225em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n  line-height: 0.0833333337em;\n  vertical-align: 0.125em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n  line-height: 0.0714285718em;\n  vertical-align: 0.0535714295em;\n}\n\n.fa-lg {\n  font-size: 1.25em;\n  line-height: 0.05em;\n  vertical-align: -0.075em;\n}\n\n.fa-xl {\n  font-size: 1.5em;\n  line-height: 0.0416666682em;\n  vertical-align: -0.125em;\n}\n\n.fa-2xl {\n  font-size: 2em;\n  line-height: 0.03125em;\n  vertical-align: -0.1875em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: var(--fa-li-margin, 2.5em);\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: calc(var(--fa-li-width, 2em) * -1);\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.08em);\n  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);\n}\n\n.fa-pull-left {\n  float: left;\n  margin-right: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right {\n  float: right;\n  margin-left: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  -webkit-animation-name: fa-beat;\n          animation-name: fa-beat;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  -webkit-animation-name: fa-bounce;\n          animation-name: fa-bounce;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  -webkit-animation-name: fa-fade;\n          animation-name: fa-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-beat-fade {\n  -webkit-animation-name: fa-beat-fade;\n          animation-name: fa-beat-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-flip {\n  -webkit-animation-name: fa-flip;\n          animation-name: fa-flip;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  -webkit-animation-name: fa-shake;\n          animation-name: fa-shake;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 2s);\n          animation-duration: var(--fa-animation-duration, 2s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));\n          animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n.fa-bounce,\n.fa-fade,\n.fa-beat-fade,\n.fa-flip,\n.fa-pulse,\n.fa-shake,\n.fa-spin,\n.fa-spin-pulse {\n    -webkit-animation-delay: -1ms;\n            animation-delay: -1ms;\n    -webkit-animation-duration: 1ms;\n            animation-duration: 1ms;\n    -webkit-animation-iteration-count: 1;\n            animation-iteration-count: 1;\n    -webkit-transition-delay: 0s;\n            transition-delay: 0s;\n    -webkit-transition-duration: 0s;\n            transition-duration: 0s;\n  }\n}\n@-webkit-keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@-webkit-keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@-webkit-keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@-webkit-keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@-webkit-keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@-webkit-keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  -webkit-transform: rotate(var(--fa-rotate-angle, none));\n          transform: rotate(var(--fa-rotate-angle, none));\n}\n\n.fa-stack {\n  display: inline-block;\n  vertical-align: middle;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: var(--fa-stack-z-index, auto);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.sr-only,\n.fa-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.sr-only-focusable:not(:focus),\n.fa-sr-only-focusable:not(:focus) {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse,\n.fa-duotone.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}';
  function qU() {
    var e = oU,
      t = iU,
      n = DU.cssPrefix,
      r = DU.replacementClass,
      a = $U;
    if (n !== e || r !== t) {
      var o = new RegExp('\\.'.concat(e, '\\-'), 'g'),
        i = new RegExp('\\--'.concat(e, '\\-'), 'g'),
        c = new RegExp('\\.'.concat(t), 'g');
      a = a
        .replace(o, '.'.concat(n, '-'))
        .replace(i, '--'.concat(n, '-'))
        .replace(c, '.'.concat(r));
    }
    return a;
  }
  var KU = !1;
  function JU() {
    DU.autoAddCss &&
      !KU &&
      (!(function (e) {
        if (e && tU) {
          var t = XB.createElement('style');
          t.setAttribute('type', 'text/css'), (t.innerHTML = e);
          for (var n = XB.head.childNodes, r = null, a = n.length - 1; a > -1; a--) {
            var o = n[a],
              i = (o.tagName || '').toUpperCase();
            ['STYLE', 'LINK'].indexOf(i) > -1 && (r = o);
          }
          XB.head.insertBefore(t, r);
        }
      })(qU()),
      (KU = !0));
  }
  var ZU = {
      mixout: function () {
        return { dom: { css: qU, insertCss: JU } };
      },
      hooks: function () {
        return {
          beforeDOMElementCreation: function () {
            JU();
          },
          beforeI2svg: function () {
            JU();
          },
        };
      },
    },
    QU = GB || {};
  QU[rU] || (QU[rU] = {}),
    QU[rU].styles || (QU[rU].styles = {}),
    QU[rU].hooks || (QU[rU].hooks = {}),
    QU[rU].shims || (QU[rU].shims = []);
  var eY = QU[rU],
    tY = [],
    nY = !1;
  function rY(e) {
    var t = e.tag,
      n = e.attributes,
      r = void 0 === n ? {} : n,
      a = e.children,
      o = void 0 === a ? [] : a;
    return 'string' == typeof e
      ? WU(e)
      : '<'
          .concat(t, ' ')
          .concat(
            (function (e) {
              return Object.keys(e || {})
                .reduce(function (t, n) {
                  return t + ''.concat(n, '="').concat(WU(e[n]), '" ');
                }, '')
                .trim();
            })(r),
            '>',
          )
          .concat(o.map(rY).join(''), '</')
          .concat(t, '>');
  }
  function aY(e, t, n) {
    if (e && e[t] && e[t][n]) return { prefix: t, iconName: n, icon: e[t][n] };
  }
  tU &&
    ((nY = (XB.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(XB.readyState)) ||
      XB.addEventListener('DOMContentLoaded', function e() {
        XB.removeEventListener('DOMContentLoaded', e),
          (nY = 1),
          tY.map(function (e) {
            return e();
          });
      }));
  var oY,
    iY,
    cY,
    uY = function (e, t, n, r) {
      var a,
        o,
        i,
        c = Object.keys(e),
        u = c.length,
        l =
          void 0 !== r
            ? (function (e, t) {
                return function (n, r, a, o) {
                  return e.call(t, n, r, a, o);
                };
              })(t, r)
            : t;
      for (void 0 === n ? ((a = 1), (i = e[c[0]])) : ((a = 0), (i = n)); a < u; a++)
        i = l(i, e[(o = c[a])], o, e);
      return i;
    };
  function lY(e) {
    var t = (function (e) {
      for (var t = [], n = 0, r = e.length; n < r; ) {
        var a = e.charCodeAt(n++);
        if (a >= 55296 && a <= 56319 && n < r) {
          var o = e.charCodeAt(n++);
          56320 == (64512 & o) ? t.push(((1023 & a) << 10) + (1023 & o) + 65536) : (t.push(a), n--);
        } else t.push(a);
      }
      return t;
    })(e);
    return 1 === t.length ? t[0].toString(16) : null;
  }
  function sY(e) {
    return Object.keys(e).reduce(function (t, n) {
      var r = e[n];
      return !!r.icon ? (t[r.iconName] = r.icon) : (t[n] = r), t;
    }, {});
  }
  function fY(e, t) {
    var n = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).skipHooks,
      r = void 0 !== n && n,
      a = sY(t);
    'function' != typeof eY.hooks.addPack || r
      ? (eY.styles[e] = jB(jB({}, eY.styles[e] || {}), a))
      : eY.hooks.addPack(e, sY(t)),
      'fas' === e && fY('fa', t);
  }
  var dY = eY.styles,
    mY = eY.shims,
    pY = (MB((oY = {}), hU, Object.values(EU[hU])), MB(oY, gU, Object.values(EU[gU])), oY),
    vY = null,
    hY = {},
    gY = {},
    yY = {},
    bY = {},
    wY = {},
    xY = (MB((iY = {}), hU, Object.keys(wU[hU])), MB(iY, gU, Object.keys(wU[gU])), iY);
  function EY(e, t) {
    var n,
      r = t.split('-'),
      a = r[0],
      o = r.slice(1).join('-');
    return a !== e || '' === o || ((n = o), ~PU.indexOf(n)) ? null : o;
  }
  var kY,
    SY = function () {
      var e = function (e) {
        return uY(
          dY,
          function (t, n, r) {
            return (t[r] = uY(n, e, {})), t;
          },
          {},
        );
      };
      (hY = e(function (e, t, n) {
        (t[3] && (e[t[3]] = n), t[2]) &&
          t[2]
            .filter(function (e) {
              return 'number' == typeof e;
            })
            .forEach(function (t) {
              e[t.toString(16)] = n;
            });
        return e;
      })),
        (gY = e(function (e, t, n) {
          ((e[n] = n), t[2]) &&
            t[2]
              .filter(function (e) {
                return 'string' == typeof e;
              })
              .forEach(function (t) {
                e[t] = n;
              });
          return e;
        })),
        (wY = e(function (e, t, n) {
          var r = t[2];
          return (
            (e[n] = n),
            r.forEach(function (t) {
              e[t] = n;
            }),
            e
          );
        }));
      var t = 'far' in dY || DU.autoFetchSvg,
        n = uY(
          mY,
          function (e, n) {
            var r = n[0],
              a = n[1],
              o = n[2];
            return (
              'far' !== a || t || (a = 'fas'),
              'string' == typeof r && (e.names[r] = { prefix: a, iconName: o }),
              'number' == typeof r && (e.unicodes[r.toString(16)] = { prefix: a, iconName: o }),
              e
            );
          },
          { names: {}, unicodes: {} },
        );
      (yY = n.names), (bY = n.unicodes), (vY = RY(DU.styleDefault, { family: DU.familyDefault }));
    };
  function NY(e, t) {
    return (hY[e] || {})[t];
  }
  function OY(e, t) {
    return (wY[e] || {})[t];
  }
  function TY(e) {
    return yY[e] || { prefix: null, iconName: null };
  }
  function CY() {
    return vY;
  }
  (kY = function (e) {
    vY = RY(e.styleDefault, { family: DU.familyDefault });
  }),
    FU.push(kY),
    SY();
  var AY = function () {
    return { prefix: null, iconName: null, rest: [] };
  };
  function RY(e) {
    var t = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).family,
      n = void 0 === t ? hU : t,
      r = wU[n][e],
      a = xU[n][e] || xU[n][r],
      o = e in eY.styles ? e : null;
    return a || o || null;
  }
  var jY = (MB((cY = {}), hU, Object.keys(EU[hU])), MB(cY, gU, Object.keys(EU[gU])), cY);
  function IY(e) {
    var t,
      n = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).skipLookups,
      r = void 0 !== n && n,
      a =
        (MB((t = {}), hU, ''.concat(DU.cssPrefix, '-').concat(hU)),
        MB(t, gU, ''.concat(DU.cssPrefix, '-').concat(gU)),
        t),
      o = null,
      i = hU;
    (e.includes(a[hU]) ||
      e.some(function (e) {
        return jY[hU].includes(e);
      })) &&
      (i = hU),
      (e.includes(a[gU]) ||
        e.some(function (e) {
          return jY[gU].includes(e);
        })) &&
        (i = gU);
    var c = e.reduce(function (e, t) {
      var n = EY(DU.cssPrefix, t);
      if (
        (dY[t]
          ? ((t = pY[i].includes(t) ? kU[i][t] : t), (o = t), (e.prefix = t))
          : xY[i].indexOf(t) > -1
          ? ((o = t), (e.prefix = RY(t, { family: i })))
          : n
          ? (e.iconName = n)
          : t !== DU.replacementClass && t !== a[hU] && t !== a[gU] && e.rest.push(t),
        !r && e.prefix && e.iconName)
      ) {
        var c = 'fa' === o ? TY(e.iconName) : {},
          u = OY(e.prefix, e.iconName);
        c.prefix && (o = null),
          (e.iconName = c.iconName || u || e.iconName),
          (e.prefix = c.prefix || e.prefix),
          'far' !== e.prefix || dY.far || !dY.fas || DU.autoFetchSvg || (e.prefix = 'fas');
      }
      return e;
    }, AY());
    return (
      (e.includes('fa-brands') || e.includes('fab')) && (c.prefix = 'fab'),
      (e.includes('fa-duotone') || e.includes('fad')) && (c.prefix = 'fad'),
      c.prefix ||
        i !== gU ||
        (!dY.fass && !DU.autoFetchSvg) ||
        ((c.prefix = 'fass'), (c.iconName = OY(c.prefix, c.iconName) || c.iconName)),
      ('fa' !== c.prefix && 'fa' !== o) || (c.prefix = CY() || 'fas'),
      c
    );
  }
  var PY = (function () {
      function e() {
        !(function (e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        })(this, e),
          (this.definitions = {});
      }
      var t, n, r;
      return (
        (t = e),
        (n = [
          {
            key: 'add',
            value: function () {
              for (var e = this, t = arguments.length, n = new Array(t), r = 0; r < t; r++)
                n[r] = arguments[r];
              var a = n.reduce(this._pullDefinitions, {});
              Object.keys(a).forEach(function (t) {
                (e.definitions[t] = jB(jB({}, e.definitions[t] || {}), a[t])), fY(t, a[t]);
                var n = EU[hU][t];
                n && fY(n, a[t]), SY();
              });
            },
          },
          {
            key: 'reset',
            value: function () {
              this.definitions = {};
            },
          },
          {
            key: '_pullDefinitions',
            value: function (e, t) {
              var n = t.prefix && t.iconName && t.icon ? { 0: t } : t;
              return (
                Object.keys(n).map(function (t) {
                  var r = n[t],
                    a = r.prefix,
                    o = r.iconName,
                    i = r.icon,
                    c = i[2];
                  e[a] || (e[a] = {}),
                    c.length > 0 &&
                      c.forEach(function (t) {
                        'string' == typeof t && (e[a][t] = i);
                      }),
                    (e[a][o] = i);
                }),
                e
              );
            },
          },
        ]),
        n && PB(t.prototype, n),
        r && PB(t, r),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e
      );
    })(),
    MY = [],
    LY = {},
    _Y = {},
    DY = Object.keys(_Y);
  function FY(e, t) {
    for (var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++)
      r[a - 2] = arguments[a];
    return (
      (LY[e] || []).forEach(function (e) {
        t = e.apply(null, [t].concat(r));
      }),
      t
    );
  }
  function zY(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
      n[r - 1] = arguments[r];
    (LY[e] || []).forEach(function (e) {
      e.apply(null, n);
    });
  }
  function HY() {
    var e = arguments[0],
      t = Array.prototype.slice.call(arguments, 1);
    return _Y[e] ? _Y[e].apply(null, t) : void 0;
  }
  function BY(e) {
    'fa' === e.prefix && (e.prefix = 'fas');
    var t = e.iconName,
      n = e.prefix || CY();
    if (t) return (t = OY(n, t) || t), aY(UY.definitions, n, t) || aY(eY.styles, n, t);
  }
  var UY = new PY(),
    YY = {
      i2svg: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return tU
          ? (zY('beforeI2svg', e), HY('pseudoElements2svg', e), HY('i2svg', e))
          : Promise.reject('Operation requires a DOM of some kind.');
      },
      watch: function () {
        var e,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          n = t.autoReplaceSvgRoot;
        !1 === DU.autoReplaceSvg && (DU.autoReplaceSvg = !0),
          (DU.observeMutations = !0),
          (e = function () {
            WY({ autoReplaceSvgRoot: n }), zY('watch', t);
          }),
          tU && (nY ? setTimeout(e, 0) : tY.push(e));
      },
    },
    VY = {
      noAuto: function () {
        (DU.autoReplaceSvg = !1), (DU.observeMutations = !1), zY('noAuto');
      },
      config: DU,
      dom: YY,
      parse: {
        icon: function (e) {
          if (null === e) return null;
          if ('object' === IB(e) && e.prefix && e.iconName)
            return { prefix: e.prefix, iconName: OY(e.prefix, e.iconName) || e.iconName };
          if (Array.isArray(e) && 2 === e.length) {
            var t = 0 === e[1].indexOf('fa-') ? e[1].slice(3) : e[1],
              n = RY(e[0]);
            return { prefix: n, iconName: OY(n, t) || t };
          }
          if (
            'string' == typeof e &&
            (e.indexOf(''.concat(DU.cssPrefix, '-')) > -1 || e.match(SU))
          ) {
            var r = IY(e.split(' '), { skipLookups: !0 });
            return { prefix: r.prefix || CY(), iconName: OY(r.prefix, r.iconName) || r.iconName };
          }
          if ('string' == typeof e) {
            var a = CY();
            return { prefix: a, iconName: OY(a, e) || e };
          }
        },
      },
      library: UY,
      findIconDefinition: BY,
      toHtml: rY,
    },
    WY = function () {
      var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {})
          .autoReplaceSvgRoot,
        t = void 0 === e ? XB : e;
      (Object.keys(eY.styles).length > 0 || DU.autoFetchSvg) &&
        tU &&
        DU.autoReplaceSvg &&
        VY.dom.i2svg({ node: t });
    };
  function GY(e, t) {
    return (
      Object.defineProperty(e, 'abstract', { get: t }),
      Object.defineProperty(e, 'html', {
        get: function () {
          return e.abstract.map(function (e) {
            return rY(e);
          });
        },
      }),
      Object.defineProperty(e, 'node', {
        get: function () {
          if (tU) {
            var t = XB.createElement('div');
            return (t.innerHTML = e.html), t.children;
          }
        },
      }),
      e
    );
  }
  function XY(e) {
    var t = e.icons,
      n = t.main,
      r = t.mask,
      a = e.prefix,
      o = e.iconName,
      i = e.transform,
      c = e.symbol,
      u = e.title,
      l = e.maskId,
      s = e.titleId,
      f = e.extra,
      d = e.watchable,
      m = void 0 !== d && d,
      p = r.found ? r : n,
      v = p.width,
      h = p.height,
      g = 'fak' === a,
      y = [DU.replacementClass, o ? ''.concat(DU.cssPrefix, '-').concat(o) : '']
        .filter(function (e) {
          return -1 === f.classes.indexOf(e);
        })
        .filter(function (e) {
          return '' !== e || !!e;
        })
        .concat(f.classes)
        .join(' '),
      b = {
        children: [],
        attributes: jB(
          jB({}, f.attributes),
          {},
          {
            'data-prefix': a,
            'data-icon': o,
            class: y,
            role: f.attributes.role || 'img',
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 '.concat(v, ' ').concat(h),
          },
        ),
      },
      w =
        g && !~f.classes.indexOf('fa-fw') ? { width: ''.concat((v / h) * 16 * 0.0625, 'em') } : {};
    m && (b.attributes[cU] = ''),
      u &&
        (b.children.push({
          tag: 'title',
          attributes: { id: b.attributes['aria-labelledby'] || 'title-'.concat(s || UU()) },
          children: [u],
        }),
        delete b.attributes.title);
    var x = jB(
        jB({}, b),
        {},
        {
          prefix: a,
          iconName: o,
          main: n,
          mask: r,
          maskId: l,
          transform: i,
          symbol: c,
          styles: jB(jB({}, w), f.styles),
        },
      ),
      E =
        r.found && n.found
          ? HY('generateAbstractMask', x) || { children: [], attributes: {} }
          : HY('generateAbstractIcon', x) || { children: [], attributes: {} },
      k = E.children,
      S = E.attributes;
    return (
      (x.children = k),
      (x.attributes = S),
      c
        ? (function (e) {
            var t = e.prefix,
              n = e.iconName,
              r = e.children,
              a = e.attributes,
              o = e.symbol,
              i = !0 === o ? ''.concat(t, '-').concat(DU.cssPrefix, '-').concat(n) : o;
            return [
              {
                tag: 'svg',
                attributes: { style: 'display: none;' },
                children: [
                  { tag: 'symbol', attributes: jB(jB({}, a), {}, { id: i }), children: r },
                ],
              },
            ];
          })(x)
        : (function (e) {
            var t = e.children,
              n = e.main,
              r = e.mask,
              a = e.attributes,
              o = e.styles,
              i = e.transform;
            if (XU(i) && n.found && !r.found) {
              var c = { x: n.width / n.height / 2, y: 0.5 };
              a.style = GU(
                jB(
                  jB({}, o),
                  {},
                  {
                    'transform-origin': ''
                      .concat(c.x + i.x / 16, 'em ')
                      .concat(c.y + i.y / 16, 'em'),
                  },
                ),
              );
            }
            return [{ tag: 'svg', attributes: a, children: t }];
          })(x)
    );
  }
  function $Y(e) {
    var t = e.content,
      n = e.width,
      r = e.height,
      a = e.transform,
      o = e.title,
      i = e.extra,
      c = e.watchable,
      u = void 0 !== c && c,
      l = jB(jB(jB({}, i.attributes), o ? { title: o } : {}), {}, { class: i.classes.join(' ') });
    u && (l[cU] = '');
    var s = jB({}, i.styles);
    XU(a) &&
      ((s.transform = (function (e) {
        var t = e.transform,
          n = e.width,
          r = void 0 === n ? aU : n,
          a = e.height,
          o = void 0 === a ? aU : a,
          i = e.startCentered,
          c = void 0 !== i && i,
          u = '';
        return (
          (u +=
            c && nU
              ? 'translate('.concat(t.x / zU - r / 2, 'em, ').concat(t.y / zU - o / 2, 'em) ')
              : c
              ? 'translate(calc(-50% + '
                  .concat(t.x / zU, 'em), calc(-50% + ')
                  .concat(t.y / zU, 'em)) ')
              : 'translate('.concat(t.x / zU, 'em, ').concat(t.y / zU, 'em) ')),
          (u += 'scale('
            .concat((t.size / zU) * (t.flipX ? -1 : 1), ', ')
            .concat((t.size / zU) * (t.flipY ? -1 : 1), ') ')),
          u + 'rotate('.concat(t.rotate, 'deg) ')
        );
      })({ transform: a, startCentered: !0, width: n, height: r })),
      (s['-webkit-transform'] = s.transform));
    var f = GU(s);
    f.length > 0 && (l.style = f);
    var d = [];
    return (
      d.push({ tag: 'span', attributes: l, children: [t] }),
      o && d.push({ tag: 'span', attributes: { class: 'sr-only' }, children: [o] }),
      d
    );
  }
  var qY = eY.styles;
  function KY(e) {
    var t = e[0],
      n = e[1],
      r = LB(e.slice(4), 1)[0];
    return {
      found: !0,
      width: t,
      height: n,
      icon: Array.isArray(r)
        ? {
            tag: 'g',
            attributes: { class: ''.concat(DU.cssPrefix, '-').concat(jU.GROUP) },
            children: [
              {
                tag: 'path',
                attributes: {
                  class: ''.concat(DU.cssPrefix, '-').concat(jU.SECONDARY),
                  fill: 'currentColor',
                  d: r[0],
                },
              },
              {
                tag: 'path',
                attributes: {
                  class: ''.concat(DU.cssPrefix, '-').concat(jU.PRIMARY),
                  fill: 'currentColor',
                  d: r[1],
                },
              },
            ],
          }
        : { tag: 'path', attributes: { fill: 'currentColor', d: r } },
    };
  }
  var JY = { found: !1, width: 512, height: 512 };
  function ZY(e, t) {
    var n = t;
    return (
      'fa' === t && null !== DU.styleDefault && (t = CY()),
      new Promise(function (r, a) {
        if ((HY('missingIconAbstract'), 'fa' === n)) {
          var o = TY(e) || {};
          (e = o.iconName || e), (t = o.prefix || t);
        }
        if (e && t && qY[t] && qY[t][e]) return r(KY(qY[t][e]));
        !vU && DU.showMissingIcons,
          r(
            jB(
              jB({}, JY),
              {},
              { icon: (DU.showMissingIcons && e && HY('missingIconAbstract')) || {} },
            ),
          );
      })
    );
  }
  var QY = function () {},
    eV = DU.measurePerformance && qB && qB.mark && qB.measure ? qB : { mark: QY, measure: QY },
    tV = 'FA "6.4.0"',
    nV = function (e) {
      eV.mark(''.concat(tV, ' ').concat(e, ' ends')),
        eV.measure(
          ''.concat(tV, ' ').concat(e),
          ''.concat(tV, ' ').concat(e, ' begins'),
          ''.concat(tV, ' ').concat(e, ' ends'),
        );
    },
    rV = {
      begin: function (e) {
        return (
          eV.mark(''.concat(tV, ' ').concat(e, ' begins')),
          function () {
            return nV(e);
          }
        );
      },
      end: nV,
    },
    aV = function () {};
  function oV(e) {
    return 'string' == typeof (e.getAttribute ? e.getAttribute(cU) : null);
  }
  function iV(e) {
    return XB.createElementNS('http://www.w3.org/2000/svg', e);
  }
  function cV(e) {
    return XB.createElement(e);
  }
  function uV(e) {
    var t = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).ceFn,
      n = void 0 === t ? ('svg' === e.tag ? iV : cV) : t;
    if ('string' == typeof e) return XB.createTextNode(e);
    var r = n(e.tag);
    return (
      Object.keys(e.attributes || []).forEach(function (t) {
        r.setAttribute(t, e.attributes[t]);
      }),
      (e.children || []).forEach(function (e) {
        r.appendChild(uV(e, { ceFn: n }));
      }),
      r
    );
  }
  var lV = {
    replace: function (e) {
      var t = e[0];
      if (t.parentNode)
        if (
          (e[1].forEach(function (e) {
            t.parentNode.insertBefore(uV(e), t);
          }),
          null === t.getAttribute(cU) && DU.keepOriginalSource)
        ) {
          var n = XB.createComment(
            (function (e) {
              var t = ' '.concat(e.outerHTML, ' ');
              return ''.concat(t, 'Font Awesome fontawesome.com ');
            })(t),
          );
          t.parentNode.replaceChild(n, t);
        } else t.remove();
    },
    nest: function (e) {
      var t = e[0],
        n = e[1];
      if (~VU(t).indexOf(DU.replacementClass)) return lV.replace(e);
      var r = new RegExp(''.concat(DU.cssPrefix, '-.*'));
      if ((delete n[0].attributes.id, n[0].attributes.class)) {
        var a = n[0].attributes.class.split(' ').reduce(
          function (e, t) {
            return t === DU.replacementClass || t.match(r) ? e.toSvg.push(t) : e.toNode.push(t), e;
          },
          { toNode: [], toSvg: [] },
        );
        (n[0].attributes.class = a.toSvg.join(' ')),
          0 === a.toNode.length
            ? t.removeAttribute('class')
            : t.setAttribute('class', a.toNode.join(' '));
      }
      var o = n
        .map(function (e) {
          return rY(e);
        })
        .join('\n');
      t.setAttribute(cU, ''), (t.innerHTML = o);
    },
  };
  function sV(e) {
    e();
  }
  function fV(e, t) {
    var n = 'function' == typeof t ? t : aV;
    if (0 === e.length) n();
    else {
      var r = sV;
      DU.mutateApproach === mU && (r = GB.requestAnimationFrame || sV),
        r(function () {
          var t = !0 === DU.autoReplaceSvg ? lV.replace : lV[DU.autoReplaceSvg] || lV.replace,
            r = rV.begin('mutate');
          e.map(t), r(), n();
        });
    }
  }
  var dV = !1;
  function mV() {
    dV = !0;
  }
  function pV() {
    dV = !1;
  }
  var vV = null;
  function hV(e) {
    if ($B && DU.observeMutations) {
      var t = e.treeCallback,
        n = void 0 === t ? aV : t,
        r = e.nodeCallback,
        a = void 0 === r ? aV : r,
        o = e.pseudoElementsCallback,
        i = void 0 === o ? aV : o,
        c = e.observeMutationsRoot,
        u = void 0 === c ? XB : c;
      (vV = new $B(function (e) {
        if (!dV) {
          var t = CY();
          YU(e).forEach(function (e) {
            if (
              ('childList' === e.type &&
                e.addedNodes.length > 0 &&
                !oV(e.addedNodes[0]) &&
                (DU.searchPseudoElements && i(e.target), n(e.target)),
              'attributes' === e.type &&
                e.target.parentNode &&
                DU.searchPseudoElements &&
                i(e.target.parentNode),
              'attributes' === e.type && oV(e.target) && ~RU.indexOf(e.attributeName))
            )
              if (
                'class' === e.attributeName &&
                (function (e) {
                  var t = e.getAttribute ? e.getAttribute(sU) : null,
                    n = e.getAttribute ? e.getAttribute(fU) : null;
                  return t && n;
                })(e.target)
              ) {
                var r = IY(VU(e.target)),
                  o = r.prefix,
                  c = r.iconName;
                e.target.setAttribute(sU, o || t), c && e.target.setAttribute(fU, c);
              } else
                (function (e) {
                  return (
                    e &&
                    e.classList &&
                    e.classList.contains &&
                    e.classList.contains(DU.replacementClass)
                  );
                })(e.target) && a(e.target);
          });
        }
      })),
        tU && vV.observe(u, { childList: !0, attributes: !0, characterData: !0, subtree: !0 });
    }
  }
  function gV(e) {
    var t,
      n,
      r = e.getAttribute('data-prefix'),
      a = e.getAttribute('data-icon'),
      o = void 0 !== e.innerText ? e.innerText.trim() : '',
      i = IY(VU(e));
    return (
      i.prefix || (i.prefix = CY()),
      r && a && ((i.prefix = r), (i.iconName = a)),
      (i.iconName && i.prefix) ||
        (i.prefix &&
          o.length > 0 &&
          (i.iconName =
            ((t = i.prefix), (n = e.innerText), (gY[t] || {})[n] || NY(i.prefix, lY(e.innerText)))),
        !i.iconName &&
          DU.autoFetchSvg &&
          e.firstChild &&
          e.firstChild.nodeType === Node.TEXT_NODE &&
          (i.iconName = e.firstChild.data)),
      i
    );
  }
  function yV(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : { styleParser: !0 },
      n = gV(e),
      r = n.iconName,
      a = n.prefix,
      o = n.rest,
      i = (function (e) {
        var t = YU(e.attributes).reduce(function (e, t) {
            return 'class' !== e.name && 'style' !== e.name && (e[t.name] = t.value), e;
          }, {}),
          n = e.getAttribute('title'),
          r = e.getAttribute('data-fa-title-id');
        return (
          DU.autoA11y &&
            (n
              ? (t['aria-labelledby'] = ''.concat(DU.replacementClass, '-title-').concat(r || UU()))
              : ((t['aria-hidden'] = 'true'), (t.focusable = 'false'))),
          t
        );
      })(e),
      c = FY('parseNodeAttributes', {}, e),
      u = t.styleParser
        ? (function (e) {
            var t = e.getAttribute('style'),
              n = [];
            return (
              t &&
                (n = t.split(';').reduce(function (e, t) {
                  var n = t.split(':'),
                    r = n[0],
                    a = n.slice(1);
                  return r && a.length > 0 && (e[r] = a.join(':').trim()), e;
                }, {})),
              n
            );
          })(e)
        : [];
    return jB(
      {
        iconName: r,
        title: e.getAttribute('title'),
        titleId: e.getAttribute('data-fa-title-id'),
        prefix: a,
        transform: HU,
        mask: { iconName: null, prefix: null, rest: [] },
        maskId: null,
        symbol: !1,
        extra: { classes: o, styles: u, attributes: i },
      },
      c,
    );
  }
  var bV = eY.styles;
  function wV(e) {
    var t = 'nest' === DU.autoReplaceSvg ? yV(e, { styleParser: !1 }) : yV(e);
    return ~t.extra.classes.indexOf(NU)
      ? HY('generateLayersText', e, t)
      : HY('generateSvgReplacementMutation', e, t);
  }
  var xV = new Set();
  function EV(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
    if (!tU) return Promise.resolve();
    var n = XB.documentElement.classList,
      r = function (e) {
        return n.add(''.concat(dU, '-').concat(e));
      },
      a = function (e) {
        return n.remove(''.concat(dU, '-').concat(e));
      },
      o = DU.autoFetchSvg
        ? xV
        : yU
            .map(function (e) {
              return 'fa-'.concat(e);
            })
            .concat(Object.keys(bV));
    o.includes('fa') || o.push('fa');
    var i = ['.'.concat(NU, ':not([').concat(cU, '])')]
      .concat(
        o.map(function (e) {
          return '.'.concat(e, ':not([').concat(cU, '])');
        }),
      )
      .join(', ');
    if (0 === i.length) return Promise.resolve();
    var c = [];
    try {
      c = YU(e.querySelectorAll(i));
    } catch (e) {}
    if (!(c.length > 0)) return Promise.resolve();
    r('pending'), a('complete');
    var u = rV.begin('onTree'),
      l = c.reduce(function (e, t) {
        try {
          var n = wV(t);
          n && e.push(n);
        } catch (e) {
          vU || e.name;
        }
        return e;
      }, []);
    return new Promise(function (e, n) {
      Promise.all(l)
        .then(function (n) {
          fV(n, function () {
            r('active'), r('complete'), a('pending'), 'function' == typeof t && t(), u(), e();
          });
        })
        .catch(function (e) {
          u(), n(e);
        });
    });
  }
  function kV(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
    wV(e).then(function (e) {
      e && fV([e], t);
    });
  }
  yU.map(function (e) {
    xV.add('fa-'.concat(e));
  }),
    Object.keys(wU[hU]).map(xV.add.bind(xV)),
    Object.keys(wU[gU]).map(xV.add.bind(xV)),
    (xV = _B(xV));
  var SV = function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = t.transform,
        r = void 0 === n ? HU : n,
        a = t.symbol,
        o = void 0 !== a && a,
        i = t.mask,
        c = void 0 === i ? null : i,
        u = t.maskId,
        l = void 0 === u ? null : u,
        s = t.title,
        f = void 0 === s ? null : s,
        d = t.titleId,
        m = void 0 === d ? null : d,
        p = t.classes,
        v = void 0 === p ? [] : p,
        h = t.attributes,
        g = void 0 === h ? {} : h,
        y = t.styles,
        b = void 0 === y ? {} : y;
      if (e) {
        var w = e.prefix,
          x = e.iconName,
          E = e.icon;
        return GY(jB({ type: 'icon' }, e), function () {
          return (
            zY('beforeDOMElementCreation', { iconDefinition: e, params: t }),
            DU.autoA11y &&
              (f
                ? (g['aria-labelledby'] = ''
                    .concat(DU.replacementClass, '-title-')
                    .concat(m || UU()))
                : ((g['aria-hidden'] = 'true'), (g.focusable = 'false'))),
            XY({
              icons: {
                main: KY(E),
                mask: c ? KY(c.icon) : { found: !1, width: null, height: null, icon: {} },
              },
              prefix: w,
              iconName: x,
              transform: jB(jB({}, HU), r),
              symbol: o,
              title: f,
              maskId: l,
              titleId: m,
              extra: { attributes: g, styles: b, classes: v },
            })
          );
        });
      }
    },
    NV = {
      mixout: function () {
        return {
          icon:
            ((e = SV),
            function (t) {
              var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                r = (t || {}).icon ? t : BY(t || {}),
                a = n.mask;
              return (
                a && (a = (a || {}).icon ? a : BY(a || {})), e(r, jB(jB({}, n), {}, { mask: a }))
              );
            }),
        };
        var e;
      },
      hooks: function () {
        return {
          mutationObserverCallbacks: function (e) {
            return (e.treeCallback = EV), (e.nodeCallback = kV), e;
          },
        };
      },
      provides: function (e) {
        (e.i2svg = function (e) {
          var t = e.node,
            n = void 0 === t ? XB : t,
            r = e.callback;
          return EV(n, void 0 === r ? function () {} : r);
        }),
          (e.generateSvgReplacementMutation = function (e, t) {
            var n = t.iconName,
              r = t.title,
              a = t.titleId,
              o = t.prefix,
              i = t.transform,
              c = t.symbol,
              u = t.mask,
              l = t.maskId,
              s = t.extra;
            return new Promise(function (t, f) {
              Promise.all([
                ZY(n, o),
                u.iconName
                  ? ZY(u.iconName, u.prefix)
                  : Promise.resolve({ found: !1, width: 512, height: 512, icon: {} }),
              ])
                .then(function (u) {
                  var f = LB(u, 2),
                    d = f[0],
                    m = f[1];
                  t([
                    e,
                    XY({
                      icons: { main: d, mask: m },
                      prefix: o,
                      iconName: n,
                      transform: i,
                      symbol: c,
                      maskId: l,
                      title: r,
                      titleId: a,
                      extra: s,
                      watchable: !0,
                    }),
                  ]);
                })
                .catch(f);
            });
          }),
          (e.generateAbstractIcon = function (e) {
            var t,
              n = e.children,
              r = e.attributes,
              a = e.main,
              o = e.transform,
              i = GU(e.styles);
            return (
              i.length > 0 && (r.style = i),
              XU(o) &&
                (t = HY('generateAbstractTransformGrouping', {
                  main: a,
                  transform: o,
                  containerWidth: a.width,
                  iconWidth: a.width,
                })),
              n.push(t || a.icon),
              { children: n, attributes: r }
            );
          });
      },
    },
    OV = {
      mixout: function () {
        return {
          layer: function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = t.classes,
              r = void 0 === n ? [] : n;
            return GY({ type: 'layer' }, function () {
              zY('beforeDOMElementCreation', { assembler: e, params: t });
              var n = [];
              return (
                e(function (e) {
                  Array.isArray(e)
                    ? e.map(function (e) {
                        n = n.concat(e.abstract);
                      })
                    : (n = n.concat(e.abstract));
                }),
                [
                  {
                    tag: 'span',
                    attributes: {
                      class: [''.concat(DU.cssPrefix, '-layers')].concat(_B(r)).join(' '),
                    },
                    children: n,
                  },
                ]
              );
            });
          },
        };
      },
    },
    TV = {
      mixout: function () {
        return {
          counter: function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = t.title,
              r = void 0 === n ? null : n,
              a = t.classes,
              o = void 0 === a ? [] : a,
              i = t.attributes,
              c = void 0 === i ? {} : i,
              u = t.styles,
              l = void 0 === u ? {} : u;
            return GY({ type: 'counter', content: e }, function () {
              return (
                zY('beforeDOMElementCreation', { content: e, params: t }),
                (function (e) {
                  var t = e.content,
                    n = e.title,
                    r = e.extra,
                    a = jB(
                      jB(jB({}, r.attributes), n ? { title: n } : {}),
                      {},
                      { class: r.classes.join(' ') },
                    ),
                    o = GU(r.styles);
                  o.length > 0 && (a.style = o);
                  var i = [];
                  return (
                    i.push({ tag: 'span', attributes: a, children: [t] }),
                    n && i.push({ tag: 'span', attributes: { class: 'sr-only' }, children: [n] }),
                    i
                  );
                })({
                  content: e.toString(),
                  title: r,
                  extra: {
                    attributes: c,
                    styles: l,
                    classes: [''.concat(DU.cssPrefix, '-layers-counter')].concat(_B(o)),
                  },
                })
              );
            });
          },
        };
      },
    },
    CV = {
      mixout: function () {
        return {
          text: function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = t.transform,
              r = void 0 === n ? HU : n,
              a = t.title,
              o = void 0 === a ? null : a,
              i = t.classes,
              c = void 0 === i ? [] : i,
              u = t.attributes,
              l = void 0 === u ? {} : u,
              s = t.styles,
              f = void 0 === s ? {} : s;
            return GY({ type: 'text', content: e }, function () {
              return (
                zY('beforeDOMElementCreation', { content: e, params: t }),
                $Y({
                  content: e,
                  transform: jB(jB({}, HU), r),
                  title: o,
                  extra: {
                    attributes: l,
                    styles: f,
                    classes: [''.concat(DU.cssPrefix, '-layers-text')].concat(_B(c)),
                  },
                })
              );
            });
          },
        };
      },
      provides: function (e) {
        e.generateLayersText = function (e, t) {
          var n = t.title,
            r = t.transform,
            a = t.extra,
            o = null,
            i = null;
          if (nU) {
            var c = parseInt(getComputedStyle(e).fontSize, 10),
              u = e.getBoundingClientRect();
            (o = u.width / c), (i = u.height / c);
          }
          return (
            DU.autoA11y && !n && (a.attributes['aria-hidden'] = 'true'),
            Promise.resolve([
              e,
              $Y({
                content: e.innerHTML,
                width: o,
                height: i,
                transform: r,
                title: n,
                extra: a,
                watchable: !0,
              }),
            ])
          );
        };
      },
    },
    AV = new RegExp('"', 'ug'),
    RV = [1105920, 1112319];
  function jV(e, t) {
    var n = ''.concat(lU).concat(t.replace(':', '-'));
    return new Promise(function (r, a) {
      if (null !== e.getAttribute(n)) return r();
      var o,
        i,
        c,
        u = YU(e.children).filter(function (e) {
          return e.getAttribute(uU) === t;
        })[0],
        l = GB.getComputedStyle(e, t),
        s = l.getPropertyValue('font-family').match(OU),
        f = l.getPropertyValue('font-weight'),
        d = l.getPropertyValue('content');
      if (u && !s) return e.removeChild(u), r();
      if (s && 'none' !== d && '' !== d) {
        var m = l.getPropertyValue('content'),
          p = ~['Sharp'].indexOf(s[2]) ? gU : hU,
          v = ~['Solid', 'Regular', 'Light', 'Thin', 'Duotone', 'Brands', 'Kit'].indexOf(s[2])
            ? xU[p][s[2].toLowerCase()]
            : TU[p][f],
          h = (function (e) {
            var t,
              n,
              r,
              a,
              o,
              i = e.replace(AV, ''),
              c =
                ((n = 0),
                (a = (t = i).length),
                (o = t.charCodeAt(n)) >= 55296 &&
                o <= 56319 &&
                a > n + 1 &&
                (r = t.charCodeAt(n + 1)) >= 56320 &&
                r <= 57343
                  ? 1024 * (o - 55296) + r - 56320 + 65536
                  : o),
              u = c >= RV[0] && c <= RV[1],
              l = 2 === i.length && i[0] === i[1];
            return { value: lY(l ? i[0] : i), isSecondary: u || l };
          })(m),
          g = h.value,
          y = h.isSecondary,
          b = s[0].startsWith('FontAwesome'),
          w = NY(v, g),
          x = w;
        if (b) {
          var E =
            ((i = bY[(o = g)]),
            (c = NY('fas', o)),
            i || (c ? { prefix: 'fas', iconName: c } : null) || { prefix: null, iconName: null });
          E.iconName && E.prefix && ((w = E.iconName), (v = E.prefix));
        }
        if (!w || y || (u && u.getAttribute(sU) === v && u.getAttribute(fU) === x)) r();
        else {
          e.setAttribute(n, x), u && e.removeChild(u);
          var k = {
              iconName: null,
              title: null,
              titleId: null,
              prefix: null,
              transform: HU,
              symbol: !1,
              mask: { iconName: null, prefix: null, rest: [] },
              maskId: null,
              extra: { classes: [], styles: {}, attributes: {} },
            },
            S = k.extra;
          (S.attributes[uU] = t),
            ZY(w, v)
              .then(function (a) {
                var o = XY(
                    jB(
                      jB({}, k),
                      {},
                      {
                        icons: { main: a, mask: AY() },
                        prefix: v,
                        iconName: x,
                        extra: S,
                        watchable: !0,
                      },
                    ),
                  ),
                  i = XB.createElement('svg');
                '::before' === t ? e.insertBefore(i, e.firstChild) : e.appendChild(i),
                  (i.outerHTML = o
                    .map(function (e) {
                      return rY(e);
                    })
                    .join('\n')),
                  e.removeAttribute(n),
                  r();
              })
              .catch(a);
        }
      } else r();
    });
  }
  function IV(e) {
    return Promise.all([jV(e, '::before'), jV(e, '::after')]);
  }
  function PV(e) {
    return !(
      e.parentNode === document.head ||
      ~pU.indexOf(e.tagName.toUpperCase()) ||
      e.getAttribute(uU) ||
      (e.parentNode && 'svg' === e.parentNode.tagName)
    );
  }
  function MV(e) {
    if (tU)
      return new Promise(function (t, n) {
        var r = YU(e.querySelectorAll('*')).filter(PV).map(IV),
          a = rV.begin('searchPseudoElements');
        mV(),
          Promise.all(r)
            .then(function () {
              a(), pV(), t();
            })
            .catch(function () {
              a(), pV(), n();
            });
      });
  }
  var LV = {
      hooks: function () {
        return {
          mutationObserverCallbacks: function (e) {
            return (e.pseudoElementsCallback = MV), e;
          },
        };
      },
      provides: function (e) {
        e.pseudoElements2svg = function (e) {
          var t = e.node,
            n = void 0 === t ? XB : t;
          DU.searchPseudoElements && MV(n);
        };
      },
    },
    _V = !1,
    DV = function (e) {
      return e
        .toLowerCase()
        .split(' ')
        .reduce(
          function (e, t) {
            var n = t.toLowerCase().split('-'),
              r = n[0],
              a = n.slice(1).join('-');
            if (r && 'h' === a) return (e.flipX = !0), e;
            if (r && 'v' === a) return (e.flipY = !0), e;
            if (((a = parseFloat(a)), isNaN(a))) return e;
            switch (r) {
              case 'grow':
                e.size = e.size + a;
                break;
              case 'shrink':
                e.size = e.size - a;
                break;
              case 'left':
                e.x = e.x - a;
                break;
              case 'right':
                e.x = e.x + a;
                break;
              case 'up':
                e.y = e.y - a;
                break;
              case 'down':
                e.y = e.y + a;
                break;
              case 'rotate':
                e.rotate = e.rotate + a;
            }
            return e;
          },
          { size: 16, x: 0, y: 0, flipX: !1, flipY: !1, rotate: 0 },
        );
    },
    FV = {
      mixout: function () {
        return {
          parse: {
            transform: function (e) {
              return DV(e);
            },
          },
        };
      },
      hooks: function () {
        return {
          parseNodeAttributes: function (e, t) {
            var n = t.getAttribute('data-fa-transform');
            return n && (e.transform = DV(n)), e;
          },
        };
      },
      provides: function (e) {
        e.generateAbstractTransformGrouping = function (e) {
          var t = e.main,
            n = e.transform,
            r = e.containerWidth,
            a = e.iconWidth,
            o = { transform: 'translate('.concat(r / 2, ' 256)') },
            i = 'translate('.concat(32 * n.x, ', ').concat(32 * n.y, ') '),
            c = 'scale('
              .concat((n.size / 16) * (n.flipX ? -1 : 1), ', ')
              .concat((n.size / 16) * (n.flipY ? -1 : 1), ') '),
            u = 'rotate('.concat(n.rotate, ' 0 0)'),
            l = {
              outer: o,
              inner: { transform: ''.concat(i, ' ').concat(c, ' ').concat(u) },
              path: { transform: 'translate('.concat((a / 2) * -1, ' -256)') },
            };
          return {
            tag: 'g',
            attributes: jB({}, l.outer),
            children: [
              {
                tag: 'g',
                attributes: jB({}, l.inner),
                children: [
                  {
                    tag: t.icon.tag,
                    children: t.icon.children,
                    attributes: jB(jB({}, t.icon.attributes), l.path),
                  },
                ],
              },
            ],
          };
        };
      },
    },
    zV = { x: 0, y: 0, width: '100%', height: '100%' };
  function HV(e) {
    var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    return e.attributes && (e.attributes.fill || t) && (e.attributes.fill = 'black'), e;
  }
  var BV = {
      hooks: function () {
        return {
          parseNodeAttributes: function (e, t) {
            var n = t.getAttribute('data-fa-mask'),
              r = n
                ? IY(
                    n.split(' ').map(function (e) {
                      return e.trim();
                    }),
                  )
                : AY();
            return (
              r.prefix || (r.prefix = CY()),
              (e.mask = r),
              (e.maskId = t.getAttribute('data-fa-mask-id')),
              e
            );
          },
        };
      },
      provides: function (e) {
        e.generateAbstractMask = function (e) {
          var t,
            n = e.children,
            r = e.attributes,
            a = e.main,
            o = e.mask,
            i = e.maskId,
            c = e.transform,
            u = a.width,
            l = a.icon,
            s = o.width,
            f = o.icon,
            d = (function (e) {
              var t = e.transform,
                n = e.containerWidth,
                r = e.iconWidth,
                a = { transform: 'translate('.concat(n / 2, ' 256)') },
                o = 'translate('.concat(32 * t.x, ', ').concat(32 * t.y, ') '),
                i = 'scale('
                  .concat((t.size / 16) * (t.flipX ? -1 : 1), ', ')
                  .concat((t.size / 16) * (t.flipY ? -1 : 1), ') '),
                c = 'rotate('.concat(t.rotate, ' 0 0)');
              return {
                outer: a,
                inner: { transform: ''.concat(o, ' ').concat(i, ' ').concat(c) },
                path: { transform: 'translate('.concat((r / 2) * -1, ' -256)') },
              };
            })({ transform: c, containerWidth: s, iconWidth: u }),
            m = { tag: 'rect', attributes: jB(jB({}, zV), {}, { fill: 'white' }) },
            p = l.children ? { children: l.children.map(HV) } : {},
            v = {
              tag: 'g',
              attributes: jB({}, d.inner),
              children: [HV(jB({ tag: l.tag, attributes: jB(jB({}, l.attributes), d.path) }, p))],
            },
            h = { tag: 'g', attributes: jB({}, d.outer), children: [v] },
            g = 'mask-'.concat(i || UU()),
            y = 'clip-'.concat(i || UU()),
            b = {
              tag: 'mask',
              attributes: jB(
                jB({}, zV),
                {},
                { id: g, maskUnits: 'userSpaceOnUse', maskContentUnits: 'userSpaceOnUse' },
              ),
              children: [m, h],
            },
            w = {
              tag: 'defs',
              children: [
                {
                  tag: 'clipPath',
                  attributes: { id: y },
                  children: ((t = f), 'g' === t.tag ? t.children : [t]),
                },
                b,
              ],
            };
          return (
            n.push(w, {
              tag: 'rect',
              attributes: jB(
                {
                  fill: 'currentColor',
                  'clip-path': 'url(#'.concat(y, ')'),
                  mask: 'url(#'.concat(g, ')'),
                },
                zV,
              ),
            }),
            { children: n, attributes: r }
          );
        };
      },
    },
    UV = {
      provides: function (e) {
        var t = !1;
        GB.matchMedia && (t = GB.matchMedia('(prefers-reduced-motion: reduce)').matches),
          (e.missingIconAbstract = function () {
            var e = [],
              n = { fill: 'currentColor' },
              r = { attributeType: 'XML', repeatCount: 'indefinite', dur: '2s' };
            e.push({
              tag: 'path',
              attributes: jB(
                jB({}, n),
                {},
                {
                  d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z',
                },
              ),
            });
            var a = jB(jB({}, r), {}, { attributeName: 'opacity' }),
              o = {
                tag: 'circle',
                attributes: jB(jB({}, n), {}, { cx: '256', cy: '364', r: '28' }),
                children: [],
              };
            return (
              t ||
                o.children.push(
                  {
                    tag: 'animate',
                    attributes: jB(
                      jB({}, r),
                      {},
                      { attributeName: 'r', values: '28;14;28;28;14;28;' },
                    ),
                  },
                  { tag: 'animate', attributes: jB(jB({}, a), {}, { values: '1;0;1;1;0;1;' }) },
                ),
              e.push(o),
              e.push({
                tag: 'path',
                attributes: jB(
                  jB({}, n),
                  {},
                  {
                    opacity: '1',
                    d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z',
                  },
                ),
                children: t
                  ? []
                  : [{ tag: 'animate', attributes: jB(jB({}, a), {}, { values: '1;0;0;0;0;1;' }) }],
              }),
              t ||
                e.push({
                  tag: 'path',
                  attributes: jB(
                    jB({}, n),
                    {},
                    {
                      opacity: '0',
                      d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z',
                    },
                  ),
                  children: [
                    { tag: 'animate', attributes: jB(jB({}, a), {}, { values: '0;0;1;1;0;0;' }) },
                  ],
                }),
              { tag: 'g', attributes: { class: 'missing' }, children: e }
            );
          });
      },
    },
    YV = [
      ZU,
      NV,
      OV,
      TV,
      CV,
      LV,
      {
        mixout: function () {
          return {
            dom: {
              unwatch: function () {
                mV(), (_V = !0);
              },
            },
          };
        },
        hooks: function () {
          return {
            bootstrap: function () {
              hV(FY('mutationObserverCallbacks', {}));
            },
            noAuto: function () {
              vV && vV.disconnect();
            },
            watch: function (e) {
              var t = e.observeMutationsRoot;
              _V ? pV() : hV(FY('mutationObserverCallbacks', { observeMutationsRoot: t }));
            },
          };
        },
      },
      FV,
      BV,
      UV,
      {
        hooks: function () {
          return {
            parseNodeAttributes: function (e, t) {
              var n = t.getAttribute('data-fa-symbol'),
                r = null !== n && ('' === n || n);
              return (e.symbol = r), e;
            },
          };
        },
      },
    ];
  !(function (e, t) {
    var n = t.mixoutsTo;
    (MY = e),
      (LY = {}),
      Object.keys(_Y).forEach(function (e) {
        -1 === DY.indexOf(e) && delete _Y[e];
      }),
      MY.forEach(function (e) {
        var t = e.mixout ? e.mixout() : {};
        if (
          (Object.keys(t).forEach(function (e) {
            'function' == typeof t[e] && (n[e] = t[e]),
              'object' === IB(t[e]) &&
                Object.keys(t[e]).forEach(function (r) {
                  n[e] || (n[e] = {}), (n[e][r] = t[e][r]);
                });
          }),
          e.hooks)
        ) {
          var r = e.hooks();
          Object.keys(r).forEach(function (e) {
            LY[e] || (LY[e] = []), LY[e].push(r[e]);
          });
        }
        e.provides && e.provides(_Y);
      });
  })(YV, { mixoutsTo: VY });
  var VV,
    WV = VY.parse,
    GV = VY.icon,
    XV = { exports: {} },
    $V = { exports: {} },
    qV = {};
  var KV,
    JV,
    ZV,
    QV,
    eW,
    tW,
    nW,
    rW,
    aW,
    oW,
    iW,
    cW,
    uW,
    lW,
    sW = {};
  function fW() {
    return (
      JV ||
        ((JV = 1),
        (function (e) {
          'production' === process.env.NODE_ENV
            ? (e.exports = (function () {
                if (VV) return qV;
                VV = 1;
                var e = 'function' == typeof Symbol && Symbol.for,
                  t = e ? Symbol.for('react.element') : 60103,
                  n = e ? Symbol.for('react.portal') : 60106,
                  r = e ? Symbol.for('react.fragment') : 60107,
                  a = e ? Symbol.for('react.strict_mode') : 60108,
                  o = e ? Symbol.for('react.profiler') : 60114,
                  i = e ? Symbol.for('react.provider') : 60109,
                  c = e ? Symbol.for('react.context') : 60110,
                  u = e ? Symbol.for('react.async_mode') : 60111,
                  l = e ? Symbol.for('react.concurrent_mode') : 60111,
                  s = e ? Symbol.for('react.forward_ref') : 60112,
                  f = e ? Symbol.for('react.suspense') : 60113,
                  d = e ? Symbol.for('react.suspense_list') : 60120,
                  m = e ? Symbol.for('react.memo') : 60115,
                  p = e ? Symbol.for('react.lazy') : 60116,
                  v = e ? Symbol.for('react.block') : 60121,
                  h = e ? Symbol.for('react.fundamental') : 60117,
                  g = e ? Symbol.for('react.responder') : 60118,
                  y = e ? Symbol.for('react.scope') : 60119;
                function b(e) {
                  if ('object' == typeof e && null !== e) {
                    var d = e.$$typeof;
                    switch (d) {
                      case t:
                        switch ((e = e.type)) {
                          case u:
                          case l:
                          case r:
                          case o:
                          case a:
                          case f:
                            return e;
                          default:
                            switch ((e = e && e.$$typeof)) {
                              case c:
                              case s:
                              case p:
                              case m:
                              case i:
                                return e;
                              default:
                                return d;
                            }
                        }
                      case n:
                        return d;
                    }
                  }
                }
                function w(e) {
                  return b(e) === l;
                }
                return (
                  (qV.AsyncMode = u),
                  (qV.ConcurrentMode = l),
                  (qV.ContextConsumer = c),
                  (qV.ContextProvider = i),
                  (qV.Element = t),
                  (qV.ForwardRef = s),
                  (qV.Fragment = r),
                  (qV.Lazy = p),
                  (qV.Memo = m),
                  (qV.Portal = n),
                  (qV.Profiler = o),
                  (qV.StrictMode = a),
                  (qV.Suspense = f),
                  (qV.isAsyncMode = function (e) {
                    return w(e) || b(e) === u;
                  }),
                  (qV.isConcurrentMode = w),
                  (qV.isContextConsumer = function (e) {
                    return b(e) === c;
                  }),
                  (qV.isContextProvider = function (e) {
                    return b(e) === i;
                  }),
                  (qV.isElement = function (e) {
                    return 'object' == typeof e && null !== e && e.$$typeof === t;
                  }),
                  (qV.isForwardRef = function (e) {
                    return b(e) === s;
                  }),
                  (qV.isFragment = function (e) {
                    return b(e) === r;
                  }),
                  (qV.isLazy = function (e) {
                    return b(e) === p;
                  }),
                  (qV.isMemo = function (e) {
                    return b(e) === m;
                  }),
                  (qV.isPortal = function (e) {
                    return b(e) === n;
                  }),
                  (qV.isProfiler = function (e) {
                    return b(e) === o;
                  }),
                  (qV.isStrictMode = function (e) {
                    return b(e) === a;
                  }),
                  (qV.isSuspense = function (e) {
                    return b(e) === f;
                  }),
                  (qV.isValidElementType = function (e) {
                    return (
                      'string' == typeof e ||
                      'function' == typeof e ||
                      e === r ||
                      e === l ||
                      e === o ||
                      e === a ||
                      e === f ||
                      e === d ||
                      ('object' == typeof e &&
                        null !== e &&
                        (e.$$typeof === p ||
                          e.$$typeof === m ||
                          e.$$typeof === i ||
                          e.$$typeof === c ||
                          e.$$typeof === s ||
                          e.$$typeof === h ||
                          e.$$typeof === g ||
                          e.$$typeof === y ||
                          e.$$typeof === v))
                    );
                  }),
                  (qV.typeOf = b),
                  qV
                );
              })())
            : (e.exports =
                (KV ||
                  ((KV = 1),
                  'production' !== process.env.NODE_ENV &&
                    (function () {
                      var e = 'function' == typeof Symbol && Symbol.for,
                        t = e ? Symbol.for('react.element') : 60103,
                        n = e ? Symbol.for('react.portal') : 60106,
                        r = e ? Symbol.for('react.fragment') : 60107,
                        a = e ? Symbol.for('react.strict_mode') : 60108,
                        o = e ? Symbol.for('react.profiler') : 60114,
                        i = e ? Symbol.for('react.provider') : 60109,
                        c = e ? Symbol.for('react.context') : 60110,
                        u = e ? Symbol.for('react.async_mode') : 60111,
                        l = e ? Symbol.for('react.concurrent_mode') : 60111,
                        s = e ? Symbol.for('react.forward_ref') : 60112,
                        f = e ? Symbol.for('react.suspense') : 60113,
                        d = e ? Symbol.for('react.suspense_list') : 60120,
                        m = e ? Symbol.for('react.memo') : 60115,
                        p = e ? Symbol.for('react.lazy') : 60116,
                        v = e ? Symbol.for('react.block') : 60121,
                        h = e ? Symbol.for('react.fundamental') : 60117,
                        g = e ? Symbol.for('react.responder') : 60118,
                        y = e ? Symbol.for('react.scope') : 60119;
                      function b(e) {
                        if ('object' == typeof e && null !== e) {
                          var d = e.$$typeof;
                          switch (d) {
                            case t:
                              var v = e.type;
                              switch (v) {
                                case u:
                                case l:
                                case r:
                                case o:
                                case a:
                                case f:
                                  return v;
                                default:
                                  var h = v && v.$$typeof;
                                  switch (h) {
                                    case c:
                                    case s:
                                    case p:
                                    case m:
                                    case i:
                                      return h;
                                    default:
                                      return d;
                                  }
                              }
                            case n:
                              return d;
                          }
                        }
                      }
                      var w = u,
                        x = l,
                        E = c,
                        k = i,
                        S = t,
                        N = s,
                        O = r,
                        T = p,
                        C = m,
                        A = n,
                        R = o,
                        j = a,
                        I = f,
                        P = !1;
                      function M(e) {
                        return b(e) === l;
                      }
                      (sW.AsyncMode = w),
                        (sW.ConcurrentMode = x),
                        (sW.ContextConsumer = E),
                        (sW.ContextProvider = k),
                        (sW.Element = S),
                        (sW.ForwardRef = N),
                        (sW.Fragment = O),
                        (sW.Lazy = T),
                        (sW.Memo = C),
                        (sW.Portal = A),
                        (sW.Profiler = R),
                        (sW.StrictMode = j),
                        (sW.Suspense = I),
                        (sW.isAsyncMode = function (e) {
                          return P || (P = !0), M(e) || b(e) === u;
                        }),
                        (sW.isConcurrentMode = M),
                        (sW.isContextConsumer = function (e) {
                          return b(e) === c;
                        }),
                        (sW.isContextProvider = function (e) {
                          return b(e) === i;
                        }),
                        (sW.isElement = function (e) {
                          return 'object' == typeof e && null !== e && e.$$typeof === t;
                        }),
                        (sW.isForwardRef = function (e) {
                          return b(e) === s;
                        }),
                        (sW.isFragment = function (e) {
                          return b(e) === r;
                        }),
                        (sW.isLazy = function (e) {
                          return b(e) === p;
                        }),
                        (sW.isMemo = function (e) {
                          return b(e) === m;
                        }),
                        (sW.isPortal = function (e) {
                          return b(e) === n;
                        }),
                        (sW.isProfiler = function (e) {
                          return b(e) === o;
                        }),
                        (sW.isStrictMode = function (e) {
                          return b(e) === a;
                        }),
                        (sW.isSuspense = function (e) {
                          return b(e) === f;
                        }),
                        (sW.isValidElementType = function (e) {
                          return (
                            'string' == typeof e ||
                            'function' == typeof e ||
                            e === r ||
                            e === l ||
                            e === o ||
                            e === a ||
                            e === f ||
                            e === d ||
                            ('object' == typeof e &&
                              null !== e &&
                              (e.$$typeof === p ||
                                e.$$typeof === m ||
                                e.$$typeof === i ||
                                e.$$typeof === c ||
                                e.$$typeof === s ||
                                e.$$typeof === h ||
                                e.$$typeof === g ||
                                e.$$typeof === y ||
                                e.$$typeof === v))
                          );
                        }),
                        (sW.typeOf = b);
                    })()),
                sW));
        })($V)),
      $V.exports
    );
  }
  function dW() {
    if (QV) return ZV;
    QV = 1;
    var e = Object.getOwnPropertySymbols,
      t = Object.prototype.hasOwnProperty,
      n = Object.prototype.propertyIsEnumerable;
    return (
      (ZV = (function () {
        try {
          if (!Object.assign) return !1;
          var e = new String('abc');
          if (((e[5] = 'de'), '5' === Object.getOwnPropertyNames(e)[0])) return !1;
          for (var t = {}, n = 0; n < 10; n++) t['_' + String.fromCharCode(n)] = n;
          if (
            '0123456789' !==
            Object.getOwnPropertyNames(t)
              .map(function (e) {
                return t[e];
              })
              .join('')
          )
            return !1;
          var r = {};
          return (
            'abcdefghijklmnopqrst'.split('').forEach(function (e) {
              r[e] = e;
            }),
            'abcdefghijklmnopqrst' === Object.keys(Object.assign({}, r)).join('')
          );
        } catch (e) {
          return !1;
        }
      })()
        ? Object.assign
        : function (r, a) {
            for (
              var o,
                i,
                c = (function (e) {
                  if (null == e)
                    throw new TypeError('Object.assign cannot be called with null or undefined');
                  return Object(e);
                })(r),
                u = 1;
              u < arguments.length;
              u++
            ) {
              for (var l in (o = Object(arguments[u]))) t.call(o, l) && (c[l] = o[l]);
              if (e) {
                i = e(o);
                for (var s = 0; s < i.length; s++) n.call(o, i[s]) && (c[i[s]] = o[i[s]]);
              }
            }
            return c;
          }),
      ZV
    );
  }
  function mW() {
    if (tW) return eW;
    tW = 1;
    return (eW = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
  }
  function pW() {
    return rW ? nW : ((rW = 1), (nW = Function.call.bind(Object.prototype.hasOwnProperty)));
  }
  if ('production' !== process.env.NODE_ENV) {
    var vW = fW();
    XV.exports = (function () {
      if (cW) return iW;
      cW = 1;
      var e = fW(),
        t = dW(),
        n = mW(),
        r = pW(),
        a = (function () {
          if (oW) return aW;
          oW = 1;
          var e = function () {};
          if ('production' !== process.env.NODE_ENV) {
            var t = mW(),
              n = {},
              r = pW();
            e = function (e) {
              var t = 'Warning: ' + e;
              try {
                throw new Error(t);
              } catch (e) {}
            };
          }
          function a(a, o, i, c, u) {
            if ('production' !== process.env.NODE_ENV)
              for (var l in a)
                if (r(a, l)) {
                  var s;
                  try {
                    if ('function' != typeof a[l]) {
                      var f = Error(
                        (c || 'React class') +
                          ': ' +
                          i +
                          ' type `' +
                          l +
                          '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                          typeof a[l] +
                          '`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.',
                      );
                      throw ((f.name = 'Invariant Violation'), f);
                    }
                    s = a[l](o, l, c, i, null, t);
                  } catch (e) {
                    s = e;
                  }
                  if (
                    (!s ||
                      s instanceof Error ||
                      e(
                        (c || 'React class') +
                          ': type specification of ' +
                          i +
                          ' `' +
                          l +
                          '` is invalid; the type checker function must return `null` or an `Error` but returned a ' +
                          typeof s +
                          '. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
                      ),
                    s instanceof Error && !(s.message in n))
                  ) {
                    n[s.message] = !0;
                    var d = u ? u() : '';
                    e('Failed ' + i + ' type: ' + s.message + (null != d ? d : ''));
                  }
                }
          }
          return (
            (a.resetWarningCache = function () {
              'production' !== process.env.NODE_ENV && (n = {});
            }),
            (aW = a)
          );
        })(),
        o = function () {};
      function i() {
        return null;
      }
      return (
        'production' !== process.env.NODE_ENV &&
          (o = function (e) {
            var t = 'Warning: ' + e;
            try {
              throw new Error(t);
            } catch (e) {}
          }),
        (iW = function (c, u) {
          var l = 'function' == typeof Symbol && Symbol.iterator,
            s = '@@iterator',
            f = '<<anonymous>>',
            d = {
              array: h('array'),
              bigint: h('bigint'),
              bool: h('boolean'),
              func: h('function'),
              number: h('number'),
              object: h('object'),
              string: h('string'),
              symbol: h('symbol'),
              any: v(i),
              arrayOf: function (e) {
                return v(function (t, r, a, o, i) {
                  if ('function' != typeof e)
                    return new p(
                      'Property `' +
                        i +
                        '` of component `' +
                        a +
                        '` has invalid PropType notation inside arrayOf.',
                    );
                  var c = t[r];
                  if (!Array.isArray(c))
                    return new p(
                      'Invalid ' +
                        o +
                        ' `' +
                        i +
                        '` of type `' +
                        b(c) +
                        '` supplied to `' +
                        a +
                        '`, expected an array.',
                    );
                  for (var u = 0; u < c.length; u++) {
                    var l = e(c, u, a, o, i + '[' + u + ']', n);
                    if (l instanceof Error) return l;
                  }
                  return null;
                });
              },
              element: v(function (e, t, n, r, a) {
                var o = e[t];
                return c(o)
                  ? null
                  : new p(
                      'Invalid ' +
                        r +
                        ' `' +
                        a +
                        '` of type `' +
                        b(o) +
                        '` supplied to `' +
                        n +
                        '`, expected a single ReactElement.',
                    );
              }),
              elementType: v(function (t, n, r, a, o) {
                var i = t[n];
                return e.isValidElementType(i)
                  ? null
                  : new p(
                      'Invalid ' +
                        a +
                        ' `' +
                        o +
                        '` of type `' +
                        b(i) +
                        '` supplied to `' +
                        r +
                        '`, expected a single ReactElement type.',
                    );
              }),
              instanceOf: function (e) {
                return v(function (t, n, r, a, o) {
                  if (!(t[n] instanceof e)) {
                    var i = e.name || f;
                    return new p(
                      'Invalid ' +
                        a +
                        ' `' +
                        o +
                        '` of type `' +
                        ((c = t[n]).constructor && c.constructor.name ? c.constructor.name : f) +
                        '` supplied to `' +
                        r +
                        '`, expected instance of `' +
                        i +
                        '`.',
                    );
                  }
                  var c;
                  return null;
                });
              },
              node: v(function (e, t, n, r, a) {
                return y(e[t])
                  ? null
                  : new p(
                      'Invalid ' +
                        r +
                        ' `' +
                        a +
                        '` supplied to `' +
                        n +
                        '`, expected a ReactNode.',
                    );
              }),
              objectOf: function (e) {
                return v(function (t, a, o, i, c) {
                  if ('function' != typeof e)
                    return new p(
                      'Property `' +
                        c +
                        '` of component `' +
                        o +
                        '` has invalid PropType notation inside objectOf.',
                    );
                  var u = t[a],
                    l = b(u);
                  if ('object' !== l)
                    return new p(
                      'Invalid ' +
                        i +
                        ' `' +
                        c +
                        '` of type `' +
                        l +
                        '` supplied to `' +
                        o +
                        '`, expected an object.',
                    );
                  for (var s in u)
                    if (r(u, s)) {
                      var f = e(u, s, o, i, c + '.' + s, n);
                      if (f instanceof Error) return f;
                    }
                  return null;
                });
              },
              oneOf: function (e) {
                return Array.isArray(e)
                  ? v(function (t, n, r, a, o) {
                      for (var i = t[n], c = 0; c < e.length; c++) if (m(i, e[c])) return null;
                      var u = JSON.stringify(e, function (e, t) {
                        return 'symbol' === w(t) ? String(t) : t;
                      });
                      return new p(
                        'Invalid ' +
                          a +
                          ' `' +
                          o +
                          '` of value `' +
                          String(i) +
                          '` supplied to `' +
                          r +
                          '`, expected one of ' +
                          u +
                          '.',
                      );
                    })
                  : ('production' !== process.env.NODE_ENV &&
                      o(
                        arguments.length > 1
                          ? 'Invalid arguments supplied to oneOf, expected an array, got ' +
                              arguments.length +
                              ' arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
                          : 'Invalid argument supplied to oneOf, expected an array.',
                      ),
                    i);
              },
              oneOfType: function (e) {
                if (!Array.isArray(e))
                  return (
                    'production' !== process.env.NODE_ENV &&
                      o('Invalid argument supplied to oneOfType, expected an instance of array.'),
                    i
                  );
                for (var t = 0; t < e.length; t++) {
                  var a = e[t];
                  if ('function' != typeof a)
                    return (
                      o(
                        'Invalid argument supplied to oneOfType. Expected an array of check functions, but received ' +
                          x(a) +
                          ' at index ' +
                          t +
                          '.',
                      ),
                      i
                    );
                }
                return v(function (t, a, o, i, c) {
                  for (var u = [], l = 0; l < e.length; l++) {
                    var s = (0, e[l])(t, a, o, i, c, n);
                    if (null == s) return null;
                    s.data && r(s.data, 'expectedType') && u.push(s.data.expectedType);
                  }
                  return new p(
                    'Invalid ' +
                      i +
                      ' `' +
                      c +
                      '` supplied to `' +
                      o +
                      '`' +
                      (u.length > 0 ? ', expected one of type [' + u.join(', ') + ']' : '') +
                      '.',
                  );
                });
              },
              shape: function (e) {
                return v(function (t, r, a, o, i) {
                  var c = t[r],
                    u = b(c);
                  if ('object' !== u)
                    return new p(
                      'Invalid ' +
                        o +
                        ' `' +
                        i +
                        '` of type `' +
                        u +
                        '` supplied to `' +
                        a +
                        '`, expected `object`.',
                    );
                  for (var l in e) {
                    var s = e[l];
                    if ('function' != typeof s) return g(a, o, i, l, w(s));
                    var f = s(c, l, a, o, i + '.' + l, n);
                    if (f) return f;
                  }
                  return null;
                });
              },
              exact: function (e) {
                return v(function (a, o, i, c, u) {
                  var l = a[o],
                    s = b(l);
                  if ('object' !== s)
                    return new p(
                      'Invalid ' +
                        c +
                        ' `' +
                        u +
                        '` of type `' +
                        s +
                        '` supplied to `' +
                        i +
                        '`, expected `object`.',
                    );
                  var f = t({}, a[o], e);
                  for (var d in f) {
                    var m = e[d];
                    if (r(e, d) && 'function' != typeof m) return g(i, c, u, d, w(m));
                    if (!m)
                      return new p(
                        'Invalid ' +
                          c +
                          ' `' +
                          u +
                          '` key `' +
                          d +
                          '` supplied to `' +
                          i +
                          '`.\nBad object: ' +
                          JSON.stringify(a[o], null, '  ') +
                          '\nValid keys: ' +
                          JSON.stringify(Object.keys(e), null, '  '),
                      );
                    var v = m(l, d, i, c, u + '.' + d, n);
                    if (v) return v;
                  }
                  return null;
                });
              },
            };
          function m(e, t) {
            return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t;
          }
          function p(e, t) {
            (this.message = e), (this.data = t && 'object' == typeof t ? t : {}), (this.stack = '');
          }
          function v(e) {
            if ('production' !== process.env.NODE_ENV)
              var t = {},
                r = 0;
            function a(a, i, c, l, s, d, m) {
              if (((l = l || f), (d = d || c), m !== n)) {
                if (u) {
                  var v = new Error(
                    'Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types',
                  );
                  throw ((v.name = 'Invariant Violation'), v);
                }
                if ('production' !== process.env.NODE_ENV && 'undefined' != typeof console) {
                  var h = l + ':' + c;
                  !t[h] &&
                    r < 3 &&
                    (o(
                      'You are manually calling a React.PropTypes validation function for the `' +
                        d +
                        '` prop on `' +
                        l +
                        '`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.',
                    ),
                    (t[h] = !0),
                    r++);
                }
              }
              return null == i[c]
                ? a
                  ? null === i[c]
                    ? new p(
                        'The ' +
                          s +
                          ' `' +
                          d +
                          '` is marked as required in `' +
                          l +
                          '`, but its value is `null`.',
                      )
                    : new p(
                        'The ' +
                          s +
                          ' `' +
                          d +
                          '` is marked as required in `' +
                          l +
                          '`, but its value is `undefined`.',
                      )
                  : null
                : e(i, c, l, s, d);
            }
            var i = a.bind(null, !1);
            return (i.isRequired = a.bind(null, !0)), i;
          }
          function h(e) {
            return v(function (t, n, r, a, o, i) {
              var c = t[n];
              return b(c) !== e
                ? new p(
                    'Invalid ' +
                      a +
                      ' `' +
                      o +
                      '` of type `' +
                      w(c) +
                      '` supplied to `' +
                      r +
                      '`, expected `' +
                      e +
                      '`.',
                    { expectedType: e },
                  )
                : null;
            });
          }
          function g(e, t, n, r, a) {
            return new p(
              (e || 'React class') +
                ': ' +
                t +
                ' type `' +
                n +
                '.' +
                r +
                '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                a +
                '`.',
            );
          }
          function y(e) {
            switch (typeof e) {
              case 'number':
              case 'string':
              case 'undefined':
                return !0;
              case 'boolean':
                return !e;
              case 'object':
                if (Array.isArray(e)) return e.every(y);
                if (null === e || c(e)) return !0;
                var t = (function (e) {
                  var t = e && ((l && e[l]) || e[s]);
                  if ('function' == typeof t) return t;
                })(e);
                if (!t) return !1;
                var n,
                  r = t.call(e);
                if (t !== e.entries) {
                  for (; !(n = r.next()).done; ) if (!y(n.value)) return !1;
                } else
                  for (; !(n = r.next()).done; ) {
                    var a = n.value;
                    if (a && !y(a[1])) return !1;
                  }
                return !0;
              default:
                return !1;
            }
          }
          function b(e) {
            var t = typeof e;
            return Array.isArray(e)
              ? 'array'
              : e instanceof RegExp
              ? 'object'
              : (function (e, t) {
                  return (
                    'symbol' === e ||
                    (!!t &&
                      ('Symbol' === t['@@toStringTag'] ||
                        ('function' == typeof Symbol && t instanceof Symbol)))
                  );
                })(t, e)
              ? 'symbol'
              : t;
          }
          function w(e) {
            if (null == e) return '' + e;
            var t = b(e);
            if ('object' === t) {
              if (e instanceof Date) return 'date';
              if (e instanceof RegExp) return 'regexp';
            }
            return t;
          }
          function x(e) {
            var t = w(e);
            switch (t) {
              case 'array':
              case 'object':
                return 'an ' + t;
              case 'boolean':
              case 'date':
              case 'regexp':
                return 'a ' + t;
              default:
                return t;
            }
          }
          return (
            (p.prototype = Error.prototype),
            (d.checkPropTypes = a),
            (d.resetWarningCache = a.resetWarningCache),
            (d.PropTypes = d),
            d
          );
        }),
        iW
      );
    })()(vW.isElement, !0);
  } else
    XV.exports = (function () {
      if (lW) return uW;
      lW = 1;
      var e = mW();
      function t() {}
      function n() {}
      return (
        (n.resetWarningCache = t),
        (uW = function () {
          function r(t, n, r, a, o, i) {
            if (i !== e) {
              var c = new Error(
                'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types',
              );
              throw ((c.name = 'Invariant Violation'), c);
            }
          }
          function a() {
            return r;
          }
          r.isRequired = r;
          var o = {
            array: r,
            bigint: r,
            bool: r,
            func: r,
            number: r,
            object: r,
            string: r,
            symbol: r,
            any: r,
            arrayOf: a,
            element: r,
            elementType: r,
            instanceOf: a,
            node: r,
            objectOf: a,
            oneOf: a,
            oneOfType: a,
            shape: a,
            exact: a,
            checkPropTypes: n,
            resetWarningCache: t,
          };
          return (o.PropTypes = o), o;
        })
      );
    })()();
  function hW(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function gW(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? hW(Object(n), !0).forEach(function (t) {
            bW(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : hW(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
    }
    return e;
  }
  function yW(e) {
    return (
      (yW =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      yW(e)
    );
  }
  function bW(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
        : (e[t] = n),
      e
    );
  }
  function wW(e, t) {
    if (null == e) return {};
    var n,
      r,
      a = (function (e, t) {
        if (null == e) return {};
        var n,
          r,
          a = {},
          o = Object.keys(e);
        for (r = 0; r < o.length; r++) (n = o[r]), t.indexOf(n) >= 0 || (a[n] = e[n]);
        return a;
      })(e, t);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      for (r = 0; r < o.length; r++)
        (n = o[r]),
          t.indexOf(n) >= 0 || (Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n]));
    }
    return a;
  }
  function xW(e) {
    return (
      (function (e) {
        if (Array.isArray(e)) return EW(e);
      })(e) ||
      (function (e) {
        if (('undefined' != typeof Symbol && null != e[Symbol.iterator]) || null != e['@@iterator'])
          return Array.from(e);
      })(e) ||
      (function (e, t) {
        if (!e) return;
        if ('string' == typeof e) return EW(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        'Object' === n && e.constructor && (n = e.constructor.name);
        if ('Map' === n || 'Set' === n) return Array.from(e);
        if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
          return EW(e, t);
      })(e) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
        );
      })()
    );
  }
  function EW(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  function kW(e) {
    return (
      (t = e),
      (t -= 0) == t
        ? e
        : (e = e.replace(/[\-_\s]+(.)?/g, function (e, t) {
            return t ? t.toUpperCase() : '';
          }))
            .substr(0, 1)
            .toLowerCase() + e.substr(1)
    );
    var t;
  }
  var SW = ['style'];
  var NW = !1;
  try {
    NW = 'production' === process.env.NODE_ENV;
  } catch (e) {}
  function OW(e) {
    return e && 'object' === yW(e) && e.prefix && e.iconName && e.icon
      ? e
      : WV.icon
      ? WV.icon(e)
      : null === e
      ? null
      : e && 'object' === yW(e) && e.prefix && e.iconName
      ? e
      : Array.isArray(e) && 2 === e.length
      ? { prefix: e[0], iconName: e[1] }
      : 'string' == typeof e
      ? { prefix: 'fas', iconName: e }
      : void 0;
  }
  function TW(e, t) {
    return (Array.isArray(t) && t.length > 0) || (!Array.isArray(t) && t) ? bW({}, e, t) : {};
  }
  var CW = o.default.forwardRef(function (e, t) {
    var n = e.icon,
      r = e.mask,
      a = e.symbol,
      o = e.className,
      i = e.title,
      c = e.titleId,
      u = e.maskId,
      l = OW(n),
      s = TW(
        'classes',
        [].concat(
          xW(
            (function (e) {
              var t,
                n = e.beat,
                r = e.fade,
                a = e.beatFade,
                o = e.bounce,
                i = e.shake,
                c = e.flash,
                u = e.spin,
                l = e.spinPulse,
                s = e.spinReverse,
                f = e.pulse,
                d = e.fixedWidth,
                m = e.inverse,
                p = e.border,
                v = e.listItem,
                h = e.flip,
                g = e.size,
                y = e.rotation,
                b = e.pull,
                w =
                  (bW(
                    (t = {
                      'fa-beat': n,
                      'fa-fade': r,
                      'fa-beat-fade': a,
                      'fa-bounce': o,
                      'fa-shake': i,
                      'fa-flash': c,
                      'fa-spin': u,
                      'fa-spin-reverse': s,
                      'fa-spin-pulse': l,
                      'fa-pulse': f,
                      'fa-fw': d,
                      'fa-inverse': m,
                      'fa-border': p,
                      'fa-li': v,
                      'fa-flip': !0 === h,
                      'fa-flip-horizontal': 'horizontal' === h || 'both' === h,
                      'fa-flip-vertical': 'vertical' === h || 'both' === h,
                    }),
                    'fa-'.concat(g),
                    null != g,
                  ),
                  bW(t, 'fa-rotate-'.concat(y), null != y && 0 !== y),
                  bW(t, 'fa-pull-'.concat(b), null != b),
                  bW(t, 'fa-swap-opacity', e.swapOpacity),
                  t);
              return Object.keys(w)
                .map(function (e) {
                  return w[e] ? e : null;
                })
                .filter(function (e) {
                  return e;
                });
            })(e),
          ),
          xW(o.split(' ')),
        ),
      ),
      f = TW('transform', 'string' == typeof e.transform ? WV.transform(e.transform) : e.transform),
      d = TW('mask', OW(r)),
      m = GV(l, gW(gW(gW(gW({}, s), f), d), {}, { symbol: a, title: i, titleId: c, maskId: u }));
    if (!m)
      return (
        (function () {
          var e;
          !NW &&
            console &&
            'function' == typeof console.error &&
            (e = console).error.apply(e, arguments);
        })('Could not find icon', l),
        null
      );
    var p = m.abstract,
      v = { ref: t };
    return (
      Object.keys(e).forEach(function (t) {
        CW.defaultProps.hasOwnProperty(t) || (v[t] = e[t]);
      }),
      AW(p[0], v)
    );
  });
  (CW.displayName = 'FontAwesomeIcon'),
    (CW.propTypes = {
      beat: XV.exports.bool,
      border: XV.exports.bool,
      beatFade: XV.exports.bool,
      bounce: XV.exports.bool,
      className: XV.exports.string,
      fade: XV.exports.bool,
      flash: XV.exports.bool,
      mask: XV.exports.oneOfType([XV.exports.object, XV.exports.array, XV.exports.string]),
      maskId: XV.exports.string,
      fixedWidth: XV.exports.bool,
      inverse: XV.exports.bool,
      flip: XV.exports.oneOf([!0, !1, 'horizontal', 'vertical', 'both']),
      icon: XV.exports.oneOfType([XV.exports.object, XV.exports.array, XV.exports.string]),
      listItem: XV.exports.bool,
      pull: XV.exports.oneOf(['right', 'left']),
      pulse: XV.exports.bool,
      rotation: XV.exports.oneOf([0, 90, 180, 270]),
      shake: XV.exports.bool,
      size: XV.exports.oneOf([
        '2xs',
        'xs',
        'sm',
        'lg',
        'xl',
        '2xl',
        '1x',
        '2x',
        '3x',
        '4x',
        '5x',
        '6x',
        '7x',
        '8x',
        '9x',
        '10x',
      ]),
      spin: XV.exports.bool,
      spinPulse: XV.exports.bool,
      spinReverse: XV.exports.bool,
      symbol: XV.exports.oneOfType([XV.exports.bool, XV.exports.string]),
      title: XV.exports.string,
      titleId: XV.exports.string,
      transform: XV.exports.oneOfType([XV.exports.string, XV.exports.object]),
      swapOpacity: XV.exports.bool,
    }),
    (CW.defaultProps = {
      border: !1,
      className: '',
      mask: null,
      maskId: null,
      fixedWidth: !1,
      inverse: !1,
      flip: !1,
      icon: null,
      listItem: !1,
      pull: null,
      pulse: !1,
      rotation: null,
      size: null,
      spin: !1,
      spinPulse: !1,
      spinReverse: !1,
      beat: !1,
      fade: !1,
      beatFade: !1,
      bounce: !1,
      shake: !1,
      symbol: !1,
      title: '',
      titleId: null,
      transform: null,
      swapOpacity: !1,
    });
  var AW = function e(t, n) {
      var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      if ('string' == typeof n) return n;
      var a = (n.children || []).map(function (n) {
          return e(t, n);
        }),
        o = Object.keys(n.attributes || {}).reduce(
          function (e, t) {
            var r = n.attributes[t];
            switch (t) {
              case 'class':
                (e.attrs.className = r), delete n.attributes.class;
                break;
              case 'style':
                e.attrs.style = (function (e) {
                  return e
                    .split(';')
                    .map(function (e) {
                      return e.trim();
                    })
                    .filter(function (e) {
                      return e;
                    })
                    .reduce(function (e, t) {
                      var n,
                        r = t.indexOf(':'),
                        a = kW(t.slice(0, r)),
                        o = t.slice(r + 1).trim();
                      return (
                        a.startsWith('webkit')
                          ? (e[((n = a), n.charAt(0).toUpperCase() + n.slice(1))] = o)
                          : (e[a] = o),
                        e
                      );
                    }, {});
                })(r);
                break;
              default:
                0 === t.indexOf('aria-') || 0 === t.indexOf('data-')
                  ? (e.attrs[t.toLowerCase()] = r)
                  : (e.attrs[kW(t)] = r);
            }
            return e;
          },
          { attrs: {} },
        ),
        i = r.style,
        c = void 0 === i ? {} : i,
        u = wW(r, SW);
      return (
        (o.attrs.style = gW(gW({}, o.attrs.style), c)),
        t.apply(void 0, [n.tag, gW(gW({}, o.attrs), u)].concat(xW(a)))
      );
    }.bind(null, o.default.createElement),
    RW = {
      prefix: 'fas',
      iconName: 'magnifying-glass',
      icon: [
        512,
        512,
        [128269, 'search'],
        'f002',
        'M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z',
      ],
    };
  const jW = {
    socket: {
      auth: process.env.NEXT_PUBLIC_AUTH,
      mobile: process.env.NEXT_PUBLIC_MOBILE,
      url: process.env.NEXT_PUBLIC_TRANSPORT_SOCKET_URL || '',
    },
    list: [{ botList: process.env.NEXT_PUBLIC_BOT_LIST || '{}' }],
    starredlist: {
      video_cover:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAADMCAMAAACY78UPAAAAeFBMVEUyMjL///8vLy/Q0NBJSUlAQEA8Oz85OD0tLS0qKio1Nzs5OTz6+vo5OTnZ2dkzMzPw8PBkZGRGRkaAgIDo6OioqKgkJCR6enqurq5SUlLMzMyFhYXh4eHW1ta7u7tHR0dcXFybm5twcHC/v7+UlJRXWFeVlZVsbGwZSzceAAAD0UlEQVR4nO3ca3OiMBiGYYOoPUQNihVBrQfc/v9/uEntslRBwmFk3jfPNbOf2tlyT0oCgTp4m0wm75Mb46tRkfH40Vf/f7nczQ97L/aW0d8xLfxJ1+N+n4wnFcejvzH//+l/AwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgOfw+j6AfswXcxfLvcUqnb70fRTP5/lDebx8ODfkuluI3Xrg2pB/dwu137y4NeTXbjPkI6eG/F+3CKPPj74P5omybiGGiefO73quW6jo8Nr38TxLvlvI3dJz5Cz/1a2H/Oi7sZbfdAsxWzpx+XbXrSd2F9by+24h4yX/ib2g20zs01fm5YXdQsQJ87O8pFuo1YH15VtZt17LT6+Mh7y02ww544n9Qbdey08jruEPu8U2+mK6pD3uFnK2HLC8V6no1uX7A8et5spuIXapz2/ILbr15duG3Vlu0y3kMJkzG3KrbnOWB7zOcstuPbEnrNZy225zXx4w2oqx79aXb4z22Ot0C7UPuDw8rdWtJ/Z0xGNir9fN5yatbrc+y9Mpg/D63fryjcFZ3qBbyF1CfmJv0m3WcuqPVZp165u0ZEF6yJt267Wc9H15425zkzalu5Y37zZr+YXsWt6mW4htQnUtb9ctwlVAcyumZbdey9dzihN7225z+XYhOOTtu82LUAtyE3sX3WbDldpa3km3eUWC2GOVbrq/330jdZZ31W2epC3mfdfY66xbX8Ss3ezebwj9onfWHdPaZO6oOzwHtN786qY7PC36Dqmpi24VnWgN9qCLbrlNPFrXLEbrbhldKN6Dt+0eHmm+BNKuW54X5M7sq1bdwyXNwR606g7PJ7Lbii26VTLt++BbaNqtjgHdwR407ZbbP4SfGRjNuvcHimt2XpPuYeqT/h036nereEP8GbBRu3u2pLS9UKpmtzqfSG0flqrXHSb032y5qtMtjwH1aTxj3y1nK+Jrdp5995n8mp1n222e/THKtuxWMad3sA2r7nDp932cXbPoVvs1+cvSO9V/PxamBLdLK1V1y4jPmp1X0b1b+aym8czj7pjfH8z9eNS9S8hul1Yq71aUt0srlXarZETo9YXaSrpVxOQ+u0xhtwyPjG69ChV273mu2XkF3bPjhueanXfXLYfU/2TGym33LNlQei2psd/dKl478oF7v7pVSvkRZy25brn6Yj+NZ7JuuY24r9l5Wfc5YPX5DVV+umepA2t23ne3ir9cWLPzTHeYbPo+jKfz/HPszIfk5nifJ24fQWRn6s6aDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbPwFoto0lZUp3cEAAAAASUVORK5CYII=',
    },
    heading: { text: 'Welcome to UCI', size: 'md', margin: '0px 0px 0px 0px', width: '100%' },
    tab: {
      bots: { text: 'Bots', borderRadius: '0.5vw' },
      Starredchat: { text: 'Starred Chat', borderRadius: 'md' },
    },
    icon: {
      chat: {
        colorScheme: 'teal.500',
        size: 'xl',
        variant: 'solid',
        label: 'Chat',
        margin: '0 0 0 20px',
        icon: {
          prefix: 'fas',
          iconName: 'comment',
          icon: [
            512,
            512,
            [128489, 61669],
            'f075',
            'M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z',
          ],
        },
      },
    },
    search: {
      placeholder: 'Search',
      size: 'lg',
      variant: 'none',
      margin: '0vw 0vw 4vw 3vw',
      borderRadius: '6vw',
      icon: RW,
      iconPadding: '10px 0 0px 20px',
      outline: 'none',
    },
    chatList: {},
    chatItem: {
      width: '100%',
      height: '100%',
      expiredColor: 'white',
      fontWeight: 'bold',
      padding: '1vw',
      opacity: '0.6',
      margin: '0 0 0 20px',
      avatar: { borderRadius: '50%', height: '48px', width: '48px' },
    },
    message: {
      icon: r.botImage,
      iconSize: 10,
      userInput: { position: 'left', background: 'white', padding: '1vw', borderRadius: '0.5vw' },
      botMsg: {
        fontSize: 'lg',
        starredColor: 'red',
        borderRadius: '1vw',
        padding: '1vw',
        margin: '0 2vw 0 1vw',
      },
      listItem: {},
    },
    chatWindow: {
      margin: '0vw',
      borderRadius: '0vw',
      topbar: {
        icon: {
          prefix: 'fas',
          iconName: 'chevron-left',
          icon: [
            320,
            512,
            [9001],
            'f053',
            'M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z',
          ],
        },
        iconSize: 'sm',
        textMargin: '0 0 0 10px',
        fontSize: 'md',
        image: r.profilePic,
        height: '200px',
        padding: '10px 0 10px 20px',
      },
      window: { padding: '0vw', width: '100%', height: '100%' },
      innerWindow: {
        borderRadius: '2vw',
        input: {
          icon: {
            prefix: 'fas',
            iconName: 'paper-plane',
            icon: [
              512,
              512,
              [61913],
              'f1d8',
              'M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z',
            ],
          },
        },
      },
    },
  };
  var IW = function (e) {
    var t,
      n,
      r,
      a = e.disabled,
      i = e.onClick;
    return (
      hD('Composer').trans,
      o.default.createElement(
        'div',
        { className: 'Composer-actions' },
        o.default.createElement(
          'button',
          { className: 'Composer-sendBtn', disabled: a, onClick: i },
          o.default.createElement(CW, {
            icon:
              null == jW ||
              null === (t = jW.chatWindow) ||
              void 0 === t ||
              null === (n = t.innerWindow) ||
              void 0 === n ||
              null === (r = n.input) ||
              void 0 === r
                ? void 0
                : r.icon,
          }),
        ),
      )
    );
  };
  function PW(e, t) {
    var n = Qg(e);
    if ($w) {
      var r = $w(e);
      t &&
        (r = lS(r).call(r, function (t) {
          return ox(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function MW(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? PW(Object(n), !0).forEach(function (t) {
            Hk(e, t, n[t]);
          })
        : dx
        ? xx(e, dx(n))
        : PW(Object(n)).forEach(function (t) {
            Rx(e, t, ox(n, t));
          });
    }
    return e;
  }
  var LW = 'S--focusing',
    _W = o.default.forwardRef(function (e, n) {
      var r = e.text,
        a = void 0 === r ? '' : r,
        i = e.textOnce,
        c = e.inputType,
        l = void 0 === c ? 'text' : c,
        s = e.wideBreakpoint,
        f = e.placeholder,
        d = void 0 === f ? '请输入...' : f,
        m = e.recorder,
        p = void 0 === m ? {} : m,
        v = e.onInputTypeChange,
        h = e.onFocus,
        g = e.onBlur,
        y = e.onChange,
        b = e.onSend,
        w = e.disableSend,
        x = void 0 !== w && w,
        E = e.onImageSend,
        k = e.onAccessoryToggle,
        S = e.toolbar,
        N = void 0 === S ? [] : S,
        O = e.onToolbarClick,
        T = e.rightAction,
        C = e.inputOptions,
        A = Nk(t.useState(a), 2),
        R = A[0],
        j = A[1],
        I = Nk(t.useState(''), 2),
        P = I[0],
        M = I[1],
        L = Nk(t.useState(d), 2),
        _ = L[0],
        D = L[1],
        F = Nk(t.useState(l || 'text'), 2),
        z = F[0],
        H = F[1],
        B = Nk(t.useState(!1), 2),
        U = B[0],
        Y = B[1],
        V = Nk(t.useState(''), 2),
        W = V[0],
        G = V[1],
        X = t.useRef(null),
        $ = t.useRef(!1),
        q = t.useRef(),
        K = t.useRef(),
        J = t.useRef(!1),
        Z = Nk(t.useState(!1), 2),
        Q = Z[0],
        ee = Z[1];
      t.useEffect(
        function () {
          var e = !(!s || !window.matchMedia) && window.matchMedia('(min-width: '.concat(s, ')'));
          function t(e) {
            ee(e.matches);
          }
          return (
            ee(e && e.matches),
            e && e.addListener(t),
            function () {
              e && e.removeListener(t);
            }
          );
        },
        [s],
      ),
        t.useEffect(
          function () {
            PD('S--wide', Q), Q || G('');
          },
          [Q],
        ),
        t.useEffect(
          function () {
            J.current && k && k(U);
          },
          [U, k],
        ),
        t.useEffect(
          function () {
            i ? (M(i), D(i)) : (M(''), D(d));
          },
          [d, i],
        ),
        t.useEffect(function () {
          J.current = !0;
        }, []),
        t.useImperativeHandle(n, function () {
          return { setText: j };
        });
      var te = t.useCallback(
          function () {
            var e = 'voice' === z,
              t = e ? 'text' : 'voice';
            if ((H(t), e)) {
              var n = X.current;
              n.focus(), (n.selectionStart = n.selectionEnd = n.value.length);
            }
            v && v(t);
          },
          [z, v],
        ),
        ne = t.useCallback(
          function (e) {
            clearTimeout(q.current), PD(LW, !0), ($.current = !0), h && h(e);
          },
          [h],
        ),
        re = t.useCallback(
          function (e) {
            (q.current = setTimeout(function () {
              PD(LW, !1), ($.current = !1);
            }, 0)),
              g && g(e);
          },
          [g],
        ),
        ae = t.useCallback(
          function () {
            R ? (b('text', R), j('')) : P && b('text', P),
              P && (M(''), D(d)),
              $.current && X.current.focus();
          },
          [d, b, R, P],
        ),
        oe = t.useCallback(
          function (e) {
            e.shiftKey || 13 !== e.keyCode || (ae(), e.preventDefault());
          },
          [ae],
        ),
        ie = t.useCallback(
          function (e, t) {
            j(e), y && y(e, t);
          },
          [y],
        ),
        ce = t.useCallback(
          function (e) {
            ae(), e.preventDefault();
          },
          [ae],
        ),
        ue = t.useCallback(
          function () {
            Y(!U);
          },
          [U],
        ),
        le = t.useCallback(function () {
          setTimeout(function () {
            Y(!1), G('');
          });
        }, []),
        se = t.useCallback(
          function (e, t) {
            O && O(e, t), e.render && ((K.current = t.currentTarget), G(e.render));
          },
          [O],
        ),
        fe = t.useCallback(function () {
          G('');
        }, []),
        de = 'text' === z,
        me = de ? 'volume-circle' : 'keyboard-circle',
        pe = N.length > 0,
        ve = MW(
          MW({}, C),
          {},
          {
            value: R,
            inputRef: X,
            placeholder: _,
            onFocus: ne,
            onBlur: re,
            onKeyDown: oe,
            onChange: ie,
            onImageSend: E,
          },
        );
      return Q
        ? o.default.createElement(
            'div',
            { className: 'Composer Composer--lg' },
            pe &&
              $k(N).call(N, function (e) {
                return o.default.createElement(sB, {
                  item: e,
                  onClick: function (t) {
                    return se(e, t);
                  },
                  key: e.type,
                });
              }),
            W && o.default.createElement(uB, { active: !!W, target: K.current, onClose: fe }, W),
            o.default.createElement(
              'div',
              { className: 'Composer-inputWrap' },
              o.default.createElement(AB, wN({ invisible: !1 }, ve, { disabled: x })),
            ),
            o.default.createElement(IW, { onClick: ce, disabled: !R || x }),
          )
        : o.default.createElement(
            o.default.Fragment,
            null,
            o.default.createElement(
              'div',
              { className: 'Composer' },
              p.canRecord &&
                o.default.createElement(lB, {
                  className: 'Composer-inputTypeBtn',
                  'data-icon': me,
                  icon: me,
                  onClick: te,
                  'aria-label': de ? '切换到语音输入' : '切换到键盘输入',
                }),
              o.default.createElement(
                'div',
                { className: 'Composer-inputWrap' },
                o.default.createElement(AB, wN({ invisible: !de }, ve, { disabled: x })),
                !de && o.default.createElement(iB, p),
              ),
              !R && T && o.default.createElement(lB, T),
              pe &&
                o.default.createElement(lB, {
                  className: u('Composer-toggleBtn', { active: U }),
                  icon: 'plus-circle',
                  onClick: ue,
                  'aria-label': U ? '关闭工具栏' : '展开工具栏',
                }),
              (R || P) && o.default.createElement(IW, { onClick: ce, disabled: x }),
            ),
            U &&
              o.default.createElement(
                cB,
                { onClickOutside: le },
                W || o.default.createElement(sH, { items: N, onClick: se }),
              ),
          );
    }),
    DW = o.default.forwardRef(function (e, n) {
      var r = e.wideBreakpoint,
        a = e.locale,
        i = void 0 === a ? 'zh-CN' : a,
        c = e.locales,
        u = e.navbar,
        l = e.renderNavbar,
        s = e.loadMoreText,
        f = e.renderBeforeMessageList,
        d = e.messagesRef,
        m = e.onRefresh,
        p = e.onScroll,
        v = e.messages,
        h = void 0 === v ? [] : v,
        g = e.renderMessageContent,
        y = e.onBackBottomShow,
        b = e.onBackBottomClick,
        w = e.quickReplies,
        x = void 0 === w ? [] : w,
        E = e.quickRepliesVisible,
        k = e.onQuickReplyClick,
        S = void 0 === k ? function () {} : k,
        N = e.onQuickReplyScroll,
        O = e.renderQuickReplies,
        T = e.text,
        C = e.textOnce,
        A = e.placeholder,
        R = e.onInputFocus,
        j = e.onInputChange,
        I = e.onInputBlur,
        P = e.onSend,
        M = e.disableSend,
        L = void 0 !== M && M,
        _ = e.onImageSend,
        D = e.inputOptions,
        F = e.composerRef,
        z = e.inputType,
        H = e.onInputTypeChange,
        B = e.recorder,
        U = e.toolbar,
        Y = e.onToolbarClick,
        V = e.onAccessoryToggle,
        W = e.rightAction,
        G = e.Composer,
        X = void 0 === G ? _W : G;
      return (
        t.useEffect(function () {
          var e = document.documentElement;
          /^((?!chrome|android|crios|fxios).)*safari/i.test(xB) && (e.dataset.safari = '');
          var t = EB();
          t && t < 11 && (e.dataset.oldIos = '');
        }, []),
        o.default.createElement(
          vD,
          { locale: i, locales: c },
          o.default.createElement(
            'div',
            { className: 'ChatApp', ref: n },
            l ? l() : u && o.default.createElement(CF, u),
            o.default.createElement(QH, {
              ref: d,
              loadMoreText: s,
              messages: h,
              renderBeforeMessageList: f,
              renderMessageContent: g,
              onRefresh: m,
              onScroll: p,
              onBackBottomShow: y,
              onBackBottomClick: b,
            }),
            o.default.createElement(
              'div',
              { className: 'ChatFooter' },
              O
                ? O()
                : o.default.createElement(_z, { items: x, visible: E, onClick: S, onScroll: N }),
              o.default.createElement(X, {
                wideBreakpoint: r,
                ref: F,
                inputType: z,
                text: T,
                textOnce: C,
                inputOptions: D,
                placeholder: A,
                onAccessoryToggle: V,
                recorder: B,
                toolbar: U,
                onToolbarClick: Y,
                onInputTypeChange: H,
                onFocus: function (e) {
                  d && d.current && d.current.scrollToEnd({ animated: !1, force: !0 }), R && R(e);
                },
                onChange: j,
                onBlur: I,
                onSend: P,
                disableSend: L,
                onImageSend: _,
                rightAction: W,
              }),
            ),
          ),
        )
      );
    });
  (e.Avatar = BO),
    (e.Backdrop = YO),
    (e.Bubble = WO),
    (e.Button = KO),
    (e.Card = ZO),
    (e.CardActions = function (e) {
      var t = e.children,
        n = e.className,
        r = e.direction,
        a = WN(e, mT);
      return o.default.createElement(
        'div',
        wN({ className: u('CardActions', n, r && 'CardActions--'.concat(r)) }, a),
        t,
      );
    }),
    (e.CardContent = function (e) {
      var t = e.className,
        n = e.children,
        r = WN(e, sT);
      return o.default.createElement('div', wN({ className: u('CardContent', t) }, r), n);
    }),
    (e.CardMedia = function (e) {
      var t = e.className,
        n = e.aspectRatio,
        r = void 0 === n ? 'square' : n,
        a = e.color,
        i = e.image,
        c = e.children,
        l = WN(e, lT),
        s = {
          backgroundColor: a || void 0,
          backgroundImage: 'string' == typeof i ? "url('".concat(i, "')") : void 0,
        };
      return o.default.createElement(
        'div',
        wN(
          {
            className: u(
              'CardMedia',
              { 'CardMedia--wide': 'wide' === r, 'CardMedia--square': 'square' === r },
              t,
            ),
            style: s,
          },
          l,
        ),
        c &&
          o.default.createElement(
            aT,
            { className: 'CardMedia-content', direction: 'column', center: !0 },
            c,
          ),
      );
    }),
    (e.CardText = function (e) {
      var t = e.className,
        n = e.children,
        r = WN(e, dT);
      return o.default.createElement(
        'div',
        wN({ className: u('CardText', t) }, r),
        'string' == typeof n ? o.default.createElement('p', null, n) : n,
      );
    }),
    (e.CardTitle = function (e) {
      var t = e.className,
        n = e.title,
        r = e.subtitle,
        a = e.center,
        i = e.children,
        c = WN(e, fT);
      return o.default.createElement(
        'div',
        wN({ className: u('CardTitle', { 'CardTitle--center': a }, t) }, c),
        n && o.default.createElement('h5', { className: 'CardTitle-title' }, n),
        i &&
          'string' == typeof i &&
          o.default.createElement('h5', { className: 'CardTitle-title' }, i),
        r && o.default.createElement('p', { className: 'CardTitle-subtitle' }, r),
        i && 'string' != typeof i && i,
      );
    }),
    (e.Carousel = UP),
    (e.Checkbox = VP),
    (e.CheckboxGroup = function (e) {
      var t = e.className,
        n = e.options,
        r = e.value,
        a = e.name,
        i = e.disabled,
        c = e.block,
        l = e.onChange;
      function s(e, t) {
        var n = t.target.checked
          ? tS(r).call(r, e)
          : lS(r).call(r, function (t) {
              return t !== e;
            });
        l(n, t);
      }
      return o.default.createElement(
        'div',
        { className: u('CheckboxGroup', { 'CheckboxGroup--block': c }, t) },
        $k(n).call(n, function (e) {
          return o.default.createElement(VP, {
            label: e.label || e.value,
            value: e.value,
            name: a,
            checked: sP(r).call(r, e.value),
            disabled: 'disabled' in e ? e.disabled : i,
            onChange: function (t) {
              s(e.value, t);
            },
            key: e.value,
          });
        }),
      );
    }),
    (e.ClickOutside = $P),
    (e.ComponentsProvider = function (e) {
      var n = e.components,
        r = e.children,
        a = o.default.useRef(HO({}, n));
      return (
        t.useEffect(
          function () {
            a.current = HO(HO({}, n), a.current);
          },
          [n],
        ),
        o.default.createElement(
          MO.Provider,
          {
            value: {
              addComponent: function (e, t) {
                a.current[e] = t;
              },
              hasComponent: function (e) {
                return a.current.hasOwnProperty(e);
              },
              getComponent: function (e) {
                var t =
                    arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function () {},
                  n = a.current[e];
                if (!n) return t({ code: e, errCode: 'NO_CODE' }), null;
                if ('component' in n)
                  return (
                    'decorator' !== n.type && t({ code: e, async: !1, component: n.component }),
                    n.component
                  );
                if ('decorator' in n) {
                  var r = function (e) {
                    return o.default.createElement(
                      FO,
                      wN({ code: n.decorator, decoratorData: n.data, onLoad: t }, e),
                    );
                  };
                  return (a.current[e] = { component: r, type: 'decorator' }), r;
                }
                if ('url' in n) {
                  var i = Kd(
                    n.url,
                    n.name,
                    function () {
                      (a.current[e] = { component: i }), t({ code: e, async: !0, component: i });
                    },
                    function () {
                      t({ code: e, errCode: 'ERR_IMPORT_SCRIPT' });
                    },
                  );
                  return i;
                }
                return t({ code: e, errCode: 'NO_HANDLER' }), null;
              },
            },
          },
          r,
        )
      );
    }),
    (e.Confirm = OF),
    (e.DOMPurify = ue),
    (e.Divider = function (e) {
      var t = e.className,
        n = e.position,
        r = void 0 === n ? 'center' : n,
        a = e.children,
        i = WN(e, qP);
      return o.default.createElement(
        'div',
        wN({ className: u('Divider', !!a && 'Divider--text-'.concat(r), t), role: 'separator' }, i),
        a,
      );
    }),
    (e.Empty = function (e) {
      var t = e.className,
        n = e.type,
        r = e.image,
        a = e.tip,
        i = e.children,
        c =
          r ||
          ('error' === n
            ? '//gw.alicdn.com/tfs/TB1lRjJRbvpK1RjSZPiXXbmwXXa-300-250.svg'
            : '//gw.alicdn.com/tfs/TB1fnnLRkvoK1RjSZFDXXXY3pXa-300-250.svg');
      return o.default.createElement(
        aT,
        { className: u('Empty', t), direction: 'column', center: !0 },
        o.default.createElement('img', { className: 'Empty-img', src: c, alt: a }),
        a && o.default.createElement('p', { className: 'Empty-tip' }, a),
        i,
      );
    }),
    (e.ErrorBoundary = jO),
    (e.FileCard = function (e) {
      var t,
        n = e.className,
        r = e.file,
        a = e.extension,
        i = e.children,
        c = r.name,
        l = r.size,
        s = a || hH((t = c)).call(t, 2 + ((PH(t).call(t, '.') - 1) >>> 0));
      return o.default.createElement(
        ZO,
        { className: u('FileCard', n), size: 'xl' },
        o.default.createElement(
          aT,
          null,
          o.default.createElement(
            'div',
            { className: 'FileCard-icon', 'data-type': s },
            o.default.createElement(XO, { type: 'file' }),
            o.default.createElement(LF, { truncate: !0, as: 'span', className: 'FileCard-ext' }, s),
          ),
          o.default.createElement(
            uT,
            null,
            o.default.createElement(
              LF,
              { truncate: 2, breakWord: !0, className: 'FileCard-name' },
              c,
            ),
            o.default.createElement(
              'div',
              { className: 'FileCard-meta' },
              null != l &&
                o.default.createElement(
                  'span',
                  { className: 'FileCard-size' },
                  (function (e, t) {
                    var n, r;
                    if (e < 1) return tS((r = ''.concat(e, ' '))).call(r, XH[0]);
                    var a = t || 2,
                      o = Math.floor(Math.log(e) / Math.log(1024));
                    return tS((n = ''.concat(GH((e / Math.pow(1024, o)).toFixed(a)), ' '))).call(
                      n,
                      XH[o],
                    );
                  })(l),
                ),
              i,
            ),
          ),
        ),
      );
    }),
    (e.Flex = aT),
    (e.FlexItem = uT),
    (e.Form = function (e) {
      var t = e.className,
        n = e.theme,
        r = void 0 === n ? '' : n,
        a = e.children,
        i = WN(e, KP);
      return o.default.createElement(
        JP.Provider,
        { value: r },
        o.default.createElement(
          'form',
          wN({ className: u('Form', { 'is-light': 'light' === r }, t) }, i),
          a,
        ),
      );
    }),
    (e.FormActions = function (e) {
      var t = e.children,
        n = WN(e, nM);
      return o.default.createElement('div', wN({ className: u('FormActions') }, n), t);
    }),
    (e.FormItem = function (e) {
      var t = e.label,
        n = e.help,
        r = e.required,
        a = e.invalid,
        i = e.hidden,
        c = e.children;
      return o.default.createElement(
        'div',
        { className: u('FormItem', { required: r, 'is-invalid': a }), hidden: i },
        t && o.default.createElement(QP, null, t),
        c,
        n && o.default.createElement(tM, null, n),
      );
    }),
    (e.Goods = qH),
    (e.Icon = XO),
    (e.IconButton = aM),
    (e.Image = iM),
    (e.InfiniteScroll = lM),
    (e.Input = iD),
    (e.LazyComponent = function (e) {
      var t = e.component,
        n = e.code,
        r = e.onLoad,
        a = WN(e, DO);
      return t
        ? (r && r({ async: !1, component: t }),
          o.default.createElement(PO, wN({ component: t }, a)))
        : o.default.createElement(FO, wN({ code: n, onLoad: r }, a));
    }),
    (e.List = function (e) {
      var t = e.bordered,
        n = void 0 !== t && t,
        r = e.className,
        a = e.children;
      return o.default.createElement(
        'div',
        { className: u('List', { 'List--bordered': n }, r), role: 'list' },
        a,
      );
    }),
    (e.ListItem = function (e) {
      var t = e.className,
        n = e.as,
        r = void 0 === n ? 'div' : n,
        a = e.content,
        i = e.rightIcon,
        c = e.children,
        l = e.onClick,
        s = WN(e, cD);
      return o.default.createElement(
        r,
        wN({ className: u('ListItem', t), onClick: l, role: 'listitem' }, s),
        o.default.createElement('div', { className: 'ListItem-content' }, a || c),
        i && o.default.createElement(XO, { type: i }),
      );
    }),
    (e.Loading = function (e) {
      var t = e.tip,
        n = e.children;
      return o.default.createElement(
        aT,
        { className: 'Loading', center: !0 },
        o.default.createElement(XO, { type: 'spinner', spin: !0 }),
        t && o.default.createElement('p', { className: 'Loading-tip' }, t),
        n,
      );
    }),
    (e.LocaleContext = mD),
    (e.LocaleProvider = vD),
    (e.MediaObject = function (e) {
      var t = e.className,
        n = e.picUrl,
        r = e.picSize,
        a = e.title,
        i = e.picAlt,
        c = e.meta;
      return o.default.createElement(
        'div',
        { className: u('MediaObject', t) },
        n &&
          o.default.createElement(
            'div',
            { className: u('MediaObject-pic', r && 'MediaObject-pic--'.concat(r)) },
            o.default.createElement('img', { src: n, alt: i || a }),
          ),
        o.default.createElement(
          'div',
          { className: 'MediaObject-info' },
          o.default.createElement('h3', { className: 'MediaObject-title' }, a),
          o.default.createElement('div', { className: 'MediaObject-meta' }, c),
        ),
      );
    }),
    (e.Message = RD),
    (e.MessageStatus = function (e) {
      var n = e.status,
        r = e.delay,
        a = void 0 === r ? 1500 : r,
        i = e.maxDelay,
        c = void 0 === i ? 5e3 : i,
        u = e.onRetry,
        l = e.onChange,
        s = Nk(t.useState(''), 2),
        f = s[0],
        d = s[1],
        m = t.useRef(),
        p = t.useRef(),
        v = t.useCallback(
          function () {
            (m.current = setTimeout(function () {
              d('loading');
            }, a)),
              (p.current = setTimeout(function () {
                d('fail');
              }, c));
          },
          [a, c],
        );
      function h() {
        m.current && clearTimeout(m.current), p.current && clearTimeout(p.current);
      }
      function g() {
        d('loading'), v(), u && u();
      }
      return (
        t.useEffect(
          function () {
            return h(), 'pending' === n ? v() : 'sent' === n ? d('') : 'fail' === n && d('fail'), h;
          },
          [n, v],
        ),
        t.useEffect(
          function () {
            l && l(f);
          },
          [l, f],
        ),
        f
          ? o.default.createElement(
              'div',
              { className: 'MessageStatus', 'data-status': f },
              'fail' === f
                ? o.default.createElement(aM, { icon: 'warning-circle-fill', onClick: g })
                : o.default.createElement(XO, { type: 'spinner', spin: !0, onClick: g }),
            )
          : null
      );
    }),
    (e.Modal = _D),
    (e.Navbar = CF),
    (e.Notice = function (e) {
      var t = e.content,
        n = e.closable,
        r = void 0 === n || n,
        a = e.leftIcon,
        i = void 0 === a ? 'bullhorn' : a,
        c = e.onClick,
        u = e.onClose;
      return o.default.createElement(
        'div',
        { className: 'Notice', role: 'alert', 'aria-atomic': !0, 'aria-live': 'assertive' },
        i && o.default.createElement(XO, { className: 'Notice-icon', type: i }),
        o.default.createElement(
          'div',
          { className: 'Notice-content', onClick: c },
          o.default.createElement(LF, { className: 'Notice-text', truncate: !0 }, t),
        ),
        r &&
          o.default.createElement(aM, {
            className: 'Notice-close',
            icon: 'close',
            onClick: u,
            'aria-label': '关闭通知',
          }),
      );
    }),
    (e.Popup = TF),
    (e.Portal = function (e) {
      var r = e.children,
        a = e.container,
        o = void 0 === a ? document.body : a,
        i = e.onRendered,
        c = Nk(t.useState(null), 2),
        u = c[0],
        l = c[1];
      return (
        t.useEffect(
          function () {
            var e;
            l(
              (e = o)
                ? e instanceof Element
                  ? e
                  : 'function' == typeof e
                  ? e()
                  : e.current || e
                : null,
            );
          },
          [o],
        ),
        t.useLayoutEffect(
          function () {
            i && u && i();
          },
          [u, i],
        ),
        u ? n.createPortal(r, u) : u
      );
    }),
    (e.Price = wz),
    (e.Progress = Ez),
    (e.PullToRefresh = Cz),
    (e.QuickReplies = _z),
    (e.Radio = Fz),
    (e.RadioGroup = function (e) {
      var t = e.className,
        n = e.options,
        r = e.value,
        a = e.name,
        i = e.disabled,
        c = e.block,
        l = e.onChange;
      return o.default.createElement(
        'div',
        { className: u('RadioGroup', { 'RadioGroup--block': c }, t) },
        $k(n).call(n, function (e) {
          return o.default.createElement(Fz, {
            label: e.label || e.value,
            value: e.value,
            name: a,
            checked: r === e.value,
            disabled: 'disabled' in e ? e.disabled : i,
            onChange: function (t) {
              l(e.value, t);
            },
            key: e.value,
          });
        }),
      );
    }),
    (e.RateActions = function (e) {
      var n = hD('RateActions', { up: '赞同', down: '反对' }).trans,
        r = e.upTitle,
        a = void 0 === r ? n('up') : r,
        i = e.downTitle,
        c = void 0 === i ? n('down') : i,
        l = e.onClick,
        s = Nk(t.useState(''), 2),
        f = s[0],
        d = s[1];
      function m(e) {
        f || (d(e), l(e));
      }
      return o.default.createElement(
        'div',
        { className: 'RateActions' },
        f !== Hz &&
          o.default.createElement(aM, {
            className: u('RateBtn', { active: f === zz }),
            title: a,
            'data-type': zz,
            icon: 'thumbs-up',
            onClick: function () {
              m(zz);
            },
          }),
        f !== zz &&
          o.default.createElement(aM, {
            className: u('RateBtn', { active: f === Hz }),
            title: c,
            'data-type': Hz,
            icon: 'thumbs-down',
            onClick: function () {
              m(Hz);
            },
          }),
      );
    }),
    (e.RichText = Uz),
    (e.ScrollView = Pz),
    (e.Search = function (e) {
      var n = e.className,
        r = e.onSearch,
        a = e.onChange,
        i = e.onClear,
        c = e.value,
        l = e.clearable,
        s = void 0 === l || l,
        f = e.showSearch,
        d = void 0 === f || f,
        m = WN(e, Yz),
        p = Nk(t.useState(c || ''), 2),
        v = p[0],
        h = p[1],
        g = hD('Search').trans;
      return o.default.createElement(
        'div',
        { className: u('Search', n) },
        o.default.createElement(XO, { className: 'Search-icon', type: 'search' }),
        o.default.createElement(
          iD,
          wN(
            {
              className: 'Search-input',
              type: 'search',
              value: v,
              enterKeyHint: 'search',
              onChange: function (e) {
                h(e), a && a(e);
              },
              onKeyDown: function (e) {
                13 === e.keyCode && (r && r(v, e), e.preventDefault());
              },
            },
            m,
          ),
        ),
        s &&
          v &&
          o.default.createElement(aM, {
            className: 'Search-clear',
            icon: 'x-circle-fill',
            onClick: function () {
              h(''), i && i();
            },
          }),
        d &&
          o.default.createElement(
            KO,
            {
              className: 'Search-btn',
              color: 'primary',
              onClick: function (e) {
                r && r(v, e);
              },
            },
            g('search'),
          ),
      );
    }),
    (e.Select = Wz),
    (e.Skeleton = function (e) {
      var t = e.className,
        n = e.w,
        r = e.h,
        a = e.mb,
        i = e.r,
        c = e.style;
      return o.default.createElement('div', {
        className: u('Skeleton', i && 'Skeleton--r-'.concat(i), t),
        style: Xz(Xz({}, c), {}, { width: n, height: r, marginBottom: a }),
      });
    }),
    (e.Step = Qz),
    (e.Stepper = Jz),
    (e.SystemMessage = gD),
    (e.Tab = function (e) {
      var t = e.children;
      return o.default.createElement('div', null, t);
    }),
    (e.Tabs = function (e) {
      var n = e.className,
        r = e.index,
        a = void 0 === r ? 0 : r,
        i = e.scrollable,
        c = e.hideNavIfOnlyOne,
        l = e.children,
        s = e.onChange,
        f = Nk(t.useState({}), 2),
        d = f[0],
        m = f[1],
        p = Nk(t.useState(a || 0), 2),
        v = p[0],
        h = p[1],
        g = t.useRef(v),
        y = t.useRef(null),
        b = [],
        w = [],
        x = ID('tabs-');
      function E(e, t) {
        h(e), s && s(e, t);
      }
      o.default.Children.forEach(l, function (e, t) {
        var n;
        if (e) {
          var r = v === t,
            a = tS((n = ''.concat(x, '-'))).call(n, t);
          b.push(
            o.default.createElement(
              nH,
              { active: r, index: t, key: a, onClick: E, 'aria-controls': a, tabIndex: r ? -1 : 0 },
              e.props.label,
            ),
          ),
            e.props.children &&
              w.push(o.default.createElement(rH, { active: r, key: a, id: a }, e.props.children));
        }
      }),
        t.useEffect(
          function () {
            h(a);
          },
          [a],
        );
      var k = t.useCallback(
        function () {
          var e = y.current;
          if (e) {
            var t = e.children[g.current];
            if (t) {
              var n = t.querySelector('span');
              if (n) {
                var r = t,
                  a = r.offsetWidth,
                  o = r.offsetLeft,
                  c = n.getBoundingClientRect().width,
                  u = Math.max(c - 16, 26),
                  l = o + a / 2;
                m({ transform: 'translateX('.concat(l - u / 2, 'px)'), width: ''.concat(u, 'px') }),
                  i && Sz({ el: e, to: l - e.offsetWidth / 2, x: !0 });
              }
            }
          }
        },
        [i],
      );
      t.useEffect(
        function () {
          var e,
            t = y.current;
          return (
            t && 'ResizeObserver' in window && (e = new ResizeObserver(k)).observe(t),
            function () {
              e && t && e.unobserve(t);
            }
          );
        },
        [k],
      ),
        t.useEffect(
          function () {
            (g.current = v), k();
          },
          [v, k],
        );
      var S = b.length > (c ? 1 : 0);
      return o.default.createElement(
        'div',
        { className: u('Tabs', { 'Tabs--scrollable': i }, n) },
        S &&
          o.default.createElement(
            'div',
            { className: 'Tabs-nav', role: 'tablist', ref: y },
            b,
            o.default.createElement('span', { className: 'Tabs-navPointer', style: d }),
          ),
        o.default.createElement('div', { className: 'Tabs-content' }, w),
      );
    }),
    (e.Tag = oH),
    (e.Text = LF),
    (e.Time = OD),
    (e.Toast = iH),
    (e.Toolbar = sH),
    (e.Tree = function (e) {
      var t = e.className,
        n = e.children;
      return o.default.createElement('div', { className: u('Tree', t), role: 'tree' }, n);
    }),
    (e.TreeNode = function (e) {
      var n = e.title,
        r = e.content,
        a = e.link,
        i = e.children,
        c = void 0 === i ? [] : i,
        l = e.onClick,
        s = e.onExpand,
        f = Nk(t.useState(!1), 2),
        d = f[0],
        m = f[1],
        p = c.length > 0;
      return o.default.createElement(
        'div',
        { className: 'TreeNode', role: 'treeitem', 'aria-expanded': d },
        o.default.createElement(
          'div',
          {
            className: 'TreeNode-title',
            onClick: function () {
              p ? (m(!d), s(n, !d)) : l({ title: n, content: r, link: a });
            },
            role: 'treeitem',
            'aria-expanded': d,
            tabIndex: 0,
          },
          o.default.createElement('span', { className: 'TreeNode-title-text' }, n),
          p
            ? o.default.createElement(XO, {
                className: 'TreeNode-title-icon',
                type: d ? 'chevron-up' : 'chevron-down',
              })
            : null,
        ),
        p
          ? $k(c).call(c, function (e, t) {
              return o.default.createElement(
                'div',
                { className: u('TreeNode-children', { 'TreeNode-children-active': d }), key: t },
                o.default.createElement(
                  'div',
                  {
                    className: 'TreeNode-title TreeNode-children-title',
                    onClick: function () {
                      return l(dH(dH({}, e), { index: t }));
                    },
                    role: 'treeitem',
                  },
                  o.default.createElement('span', { className: 'TreeNode-title-text' }, e.title),
                ),
              );
            })
          : null,
      );
    }),
    (e.Typing = TD),
    (e.Video = function (e) {
      var n = e.className,
        r = e.src,
        a = e.cover,
        i = e.duration,
        c = e.onClick,
        l = e.onCoverLoad,
        s = e.style,
        f = e.videoRef,
        d = e.children,
        m = WN(e, mH),
        p = t.useRef(null),
        v = f || p,
        h = Nk(t.useState(!1), 2),
        g = h[0],
        y = h[1],
        b = Nk(t.useState(!0), 2),
        w = b[0],
        x = b[1];
      function E() {
        x(!0);
      }
      var k = !g && !!a,
        S = k && !!i;
      return o.default.createElement(
        'div',
        { className: u('Video', 'Video--'.concat(w ? 'paused' : 'playing'), n), style: s },
        k &&
          o.default.createElement('img', { className: 'Video-cover', src: a, onLoad: l, alt: '' }),
        S && o.default.createElement('span', { className: 'Video-duration' }, i),
        o.default.createElement(
          'video',
          wN(
            {
              className: 'Video-video',
              src: r,
              ref: v,
              hidden: k,
              controls: !0,
              onPlay: function () {
                x(!1);
              },
              onPause: E,
              onEnded: E,
            },
            m,
          ),
          d,
        ),
        k &&
          o.default.createElement(
            'button',
            {
              className: u('Video-playBtn', { paused: w }),
              type: 'button',
              onClick: function (e) {
                y(!0);
                var t = v.current;
                t && (t.ended || t.paused ? t.play() : t.pause()), c && c(w, e);
              },
            },
            o.default.createElement('span', { className: 'Video-playIcon' }),
          ),
      );
    }),
    (e.VisuallyHidden = function (e) {
      return o.default.createElement('span', wN({ style: pH }, e));
    }),
    (e.clsx = u),
    (e.default = DW),
    (e.importScript = qd),
    (e.lazyComponent = Kd),
    (e.mountComponent = Jd),
    (e.toast = uH),
    (e.useClickOutside = Zd),
    (e.useComponents = LO),
    (e.useForwardRef = Qd),
    (e.useLocale = hD),
    (e.useMessages = function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
        n = t.useMemo(
          function () {
            return $k(e).call(e, function (e) {
              return PS(e);
            });
          },
          [e],
        ),
        r = Nk(t.useState(n), 2),
        a = r[0],
        o = r[1],
        i = t.useRef(!1),
        c = t.useCallback(function (e) {
          o(function (t) {
            var n;
            return tS((n = [])).call(n, Sk(e), Sk(t));
          });
        }, []),
        u = t.useCallback(function (e, t) {
          o(function (n) {
            return $k(n).call(n, function (n) {
              return n._id === e ? PS(t, e) : n;
            });
          });
        }, []),
        l = t.useCallback(
          function (e) {
            var t = PS(e);
            i.current
              ? ((i.current = !1), u(MS, t))
              : o(function (e) {
                  var n;
                  return tS((n = [])).call(n, Sk(e), [t]);
                });
          },
          [u],
        ),
        s = t.useCallback(function (e) {
          o(function (t) {
            return lS(t).call(t, function (t) {
              return t._id !== e;
            });
          });
        }, []),
        f = t.useCallback(function () {
          o(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []);
        }, []),
        d = t.useCallback(
          function (e) {
            e !== i.current && (e ? l({ _id: MS, type: 'typing' }) : s(MS), (i.current = e));
          },
          [l, s],
        );
      return {
        messages: a,
        prependMsgs: c,
        appendMsg: l,
        updateMsg: u,
        deleteMsg: s,
        resetList: f,
        setTyping: d,
      };
    }),
    (e.useMount = LS),
    (e.useQuickReplies = function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
        n = Nk(t.useState(e), 2),
        r = n[0],
        a = n[1],
        o = Nk(t.useState(!0), 2),
        i = o[0],
        c = o[1],
        u = t.useRef(),
        l = t.useRef();
      return (
        t.useEffect(
          function () {
            u.current = r;
          },
          [r],
        ),
        {
          quickReplies: r,
          prepend: function (e) {
            a(function (t) {
              var n;
              return tS((n = [])).call(n, Sk(e), Sk(t));
            });
          },
          replace: a,
          visible: i,
          setVisible: c,
          save: function () {
            l.current = u.current;
          },
          pop: function () {
            l.current && a(l.current);
          },
        }
      );
    }),
    Object.defineProperty(e, '__esModule', { value: !0 });
});
