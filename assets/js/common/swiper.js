import { m as ve } from './module.esm.js';
function se(t) {
  return (
    t !== null &&
    typeof t == 'object' &&
    'constructor' in t &&
    t.constructor === Object
  );
}
function ie(t, e) {
  t === void 0 && (t = {}),
    e === void 0 && (e = {}),
    Object.keys(e).forEach((i) => {
      typeof t[i] > 'u'
        ? (t[i] = e[i])
        : se(e[i]) &&
          se(t[i]) &&
          Object.keys(e[i]).length > 0 &&
          ie(t[i], e[i]);
    });
}
const ue = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: { blur() {}, nodeName: '' },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return { initEvent() {} };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: ''
  }
};
function V() {
  const t = typeof document < 'u' ? document : {};
  return ie(t, ue), t;
}
const we = {
  document: ue,
  navigator: { userAgent: '' },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: ''
  },
  history: { replaceState() {}, pushState() {}, go() {}, back() {} },
  CustomEvent: function () {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return '';
      }
    };
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {};
  },
  requestAnimationFrame(t) {
    return typeof setTimeout > 'u' ? (t(), null) : setTimeout(t, 0);
  },
  cancelAnimationFrame(t) {
    typeof setTimeout > 'u' || clearTimeout(t);
  }
};
function A() {
  const t = typeof window < 'u' ? window : {};
  return ie(t, we), t;
}
function Se(t) {
  const e = t;
  Object.keys(e).forEach((i) => {
    try {
      e[i] = null;
    } catch {}
    try {
      delete e[i];
    } catch {}
  });
}
function ee(t, e) {
  return e === void 0 && (e = 0), setTimeout(t, e);
}
function Y() {
  return Date.now();
}
function Te(t) {
  const e = A();
  let i;
  return (
    e.getComputedStyle && (i = e.getComputedStyle(t, null)),
    !i && t.currentStyle && (i = t.currentStyle),
    i || (i = t.style),
    i
  );
}
function ye(t, e) {
  e === void 0 && (e = 'x');
  const i = A();
  let s, n, r;
  const o = Te(t);
  return (
    i.WebKitCSSMatrix
      ? ((n = o.transform || o.webkitTransform),
        n.split(',').length > 6 &&
          (n = n
            .split(', ')
            .map((l) => l.replace(',', '.'))
            .join(', ')),
        (r = new i.WebKitCSSMatrix(n === 'none' ? '' : n)))
      : ((r =
          o.MozTransform ||
          o.OTransform ||
          o.MsTransform ||
          o.msTransform ||
          o.transform ||
          o
            .getPropertyValue('transform')
            .replace('translate(', 'matrix(1, 0, 0, 1,')),
        (s = r.toString().split(','))),
    e === 'x' &&
      (i.WebKitCSSMatrix
        ? (n = r.m41)
        : s.length === 16
        ? (n = parseFloat(s[12]))
        : (n = parseFloat(s[4]))),
    e === 'y' &&
      (i.WebKitCSSMatrix
        ? (n = r.m42)
        : s.length === 16
        ? (n = parseFloat(s[13]))
        : (n = parseFloat(s[5]))),
    n || 0
  );
}
function W(t) {
  return (
    typeof t == 'object' &&
    t !== null &&
    t.constructor &&
    Object.prototype.toString.call(t).slice(8, -1) === 'Object'
  );
}
function xe(t) {
  return typeof window < 'u' && typeof window.HTMLElement < 'u'
    ? t instanceof HTMLElement
    : t && (t.nodeType === 1 || t.nodeType === 11);
}
function z() {
  const t = Object(arguments.length <= 0 ? void 0 : arguments[0]),
    e = ['__proto__', 'constructor', 'prototype'];
  for (let i = 1; i < arguments.length; i += 1) {
    const s = i < 0 || arguments.length <= i ? void 0 : arguments[i];
    if (s != null && !xe(s)) {
      const n = Object.keys(Object(s)).filter((r) => e.indexOf(r) < 0);
      for (let r = 0, o = n.length; r < o; r += 1) {
        const l = n[r],
          a = Object.getOwnPropertyDescriptor(s, l);
        a !== void 0 &&
          a.enumerable &&
          (W(t[l]) && W(s[l])
            ? s[l].__swiper__
              ? (t[l] = s[l])
              : z(t[l], s[l])
            : !W(t[l]) && W(s[l])
            ? ((t[l] = {}), s[l].__swiper__ ? (t[l] = s[l]) : z(t[l], s[l]))
            : (t[l] = s[l]));
      }
    }
  }
  return t;
}
function j(t, e, i) {
  t.style.setProperty(e, i);
}
function ce(t) {
  let { swiper: e, targetPosition: i, side: s } = t;
  const n = A(),
    r = -e.translate;
  let o = null,
    l;
  const a = e.params.speed;
  (e.wrapperEl.style.scrollSnapType = 'none'),
    n.cancelAnimationFrame(e.cssModeFrameID);
  const d = i > r ? 'next' : 'prev',
    f = (p, u) => (d === 'next' && p >= u) || (d === 'prev' && p <= u),
    c = () => {
      (l = new Date().getTime()), o === null && (o = l);
      const p = Math.max(Math.min((l - o) / a, 1), 0),
        u = 0.5 - Math.cos(p * Math.PI) / 2;
      let g = r + u * (i - r);
      if ((f(g, i) && (g = i), e.wrapperEl.scrollTo({ [s]: g }), f(g, i))) {
        (e.wrapperEl.style.overflow = 'hidden'),
          (e.wrapperEl.style.scrollSnapType = ''),
          setTimeout(() => {
            (e.wrapperEl.style.overflow = ''), e.wrapperEl.scrollTo({ [s]: g });
          }),
          n.cancelAnimationFrame(e.cssModeFrameID);
        return;
      }
      e.cssModeFrameID = n.requestAnimationFrame(c);
    };
  c();
}
function B(t, e) {
  return e === void 0 && (e = ''), [...t.children].filter((i) => i.matches(e));
}
function be(t, e) {
  e === void 0 && (e = []);
  const i = document.createElement(t);
  return i.classList.add(...(Array.isArray(e) ? e : [e])), i;
}
function Ee(t, e) {
  const i = [];
  for (; t.previousElementSibling; ) {
    const s = t.previousElementSibling;
    e ? s.matches(e) && i.push(s) : i.push(s), (t = s);
  }
  return i;
}
function Pe(t, e) {
  const i = [];
  for (; t.nextElementSibling; ) {
    const s = t.nextElementSibling;
    e ? s.matches(e) && i.push(s) : i.push(s), (t = s);
  }
  return i;
}
function F(t, e) {
  return A().getComputedStyle(t, null).getPropertyValue(e);
}
function re(t) {
  let e = t,
    i;
  if (e) {
    for (i = 0; (e = e.previousSibling) !== null; )
      e.nodeType === 1 && (i += 1);
    return i;
  }
}
function Me(t, e) {
  const i = [];
  let s = t.parentElement;
  for (; s; ) e ? s.matches(e) && i.push(s) : i.push(s), (s = s.parentElement);
  return i;
}
function ne(t, e, i) {
  const s = A();
  return i
    ? t[e === 'width' ? 'offsetWidth' : 'offsetHeight'] +
        parseFloat(
          s
            .getComputedStyle(t, null)
            .getPropertyValue(e === 'width' ? 'margin-right' : 'margin-top')
        ) +
        parseFloat(
          s
            .getComputedStyle(t, null)
            .getPropertyValue(e === 'width' ? 'margin-left' : 'margin-bottom')
        )
    : t.offsetWidth;
}
let q;
function Ce() {
  const t = A(),
    e = V();
  return {
    smoothScroll:
      e.documentElement &&
      e.documentElement.style &&
      'scrollBehavior' in e.documentElement.style,
    touch: !!(
      'ontouchstart' in t ||
      (t.DocumentTouch && e instanceof t.DocumentTouch)
    )
  };
}
function fe() {
  return q || (q = Ce()), q;
}
let K;
function Ie(t) {
  let { userAgent: e } = t === void 0 ? {} : t;
  const i = fe(),
    s = A(),
    n = s.navigator.platform,
    r = e || s.navigator.userAgent,
    o = { ios: !1, android: !1 },
    l = s.screen.width,
    a = s.screen.height,
    d = r.match(/(Android);?[\s\/]+([\d.]+)?/);
  let f = r.match(/(iPad).*OS\s([\d_]+)/);
  const c = r.match(/(iPod)(.*OS\s([\d_]+))?/),
    p = !f && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    u = n === 'Win32';
  let g = n === 'MacIntel';
  const m = [
    '1024x1366',
    '1366x1024',
    '834x1194',
    '1194x834',
    '834x1112',
    '1112x834',
    '768x1024',
    '1024x768',
    '820x1180',
    '1180x820',
    '810x1080',
    '1080x810'
  ];
  return (
    !f &&
      g &&
      i.touch &&
      m.indexOf(`${l}x${a}`) >= 0 &&
      ((f = r.match(/(Version)\/([\d.]+)/)),
      f || (f = [0, 1, '13_0_0']),
      (g = !1)),
    d && !u && ((o.os = 'android'), (o.android = !0)),
    (f || p || c) && ((o.os = 'ios'), (o.ios = !0)),
    o
  );
}
function Le(t) {
  return t === void 0 && (t = {}), K || (K = Ie(t)), K;
}
let U;
function Oe() {
  const t = A();
  let e = !1;
  function i() {
    const s = t.navigator.userAgent.toLowerCase();
    return (
      s.indexOf('safari') >= 0 &&
      s.indexOf('chrome') < 0 &&
      s.indexOf('android') < 0
    );
  }
  if (i()) {
    const s = String(t.navigator.userAgent);
    if (s.includes('Version/')) {
      const [n, r] = s
        .split('Version/')[1]
        .split(' ')[0]
        .split('.')
        .map((o) => Number(o));
      e = n < 16 || (n === 16 && r < 2);
    }
  }
  return {
    isSafari: e || i(),
    needPerspectiveFix: e,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      t.navigator.userAgent
    )
  };
}
function ze() {
  return U || (U = Oe()), U;
}
function Ae(t) {
  let { swiper: e, on: i, emit: s } = t;
  const n = A();
  let r = null,
    o = null;
  const l = () => {
      !e || e.destroyed || !e.initialized || (s('beforeResize'), s('resize'));
    },
    a = () => {
      !e ||
        e.destroyed ||
        !e.initialized ||
        ((r = new ResizeObserver((c) => {
          o = n.requestAnimationFrame(() => {
            const { width: p, height: u } = e;
            let g = p,
              m = u;
            c.forEach((T) => {
              let { contentBoxSize: h, contentRect: x, target: v } = T;
              (v && v !== e.el) ||
                ((g = x ? x.width : (h[0] || h).inlineSize),
                (m = x ? x.height : (h[0] || h).blockSize));
            }),
              (g !== p || m !== u) && l();
          });
        })),
        r.observe(e.el));
    },
    d = () => {
      o && n.cancelAnimationFrame(o),
        r && r.unobserve && e.el && (r.unobserve(e.el), (r = null));
    },
    f = () => {
      !e || e.destroyed || !e.initialized || s('orientationchange');
    };
  i('init', () => {
    if (e.params.resizeObserver && typeof n.ResizeObserver < 'u') {
      a();
      return;
    }
    n.addEventListener('resize', l), n.addEventListener('orientationchange', f);
  }),
    i('destroy', () => {
      d(),
        n.removeEventListener('resize', l),
        n.removeEventListener('orientationchange', f);
    });
}
function Ge(t) {
  let { swiper: e, extendParams: i, on: s, emit: n } = t;
  const r = [],
    o = A(),
    l = function (f, c) {
      c === void 0 && (c = {});
      const p = o.MutationObserver || o.WebkitMutationObserver,
        u = new p((g) => {
          if (e.__preventObserver__) return;
          if (g.length === 1) {
            n('observerUpdate', g[0]);
            return;
          }
          const m = function () {
            n('observerUpdate', g[0]);
          };
          o.requestAnimationFrame
            ? o.requestAnimationFrame(m)
            : o.setTimeout(m, 0);
        });
      u.observe(f, {
        attributes: typeof c.attributes > 'u' ? !0 : c.attributes,
        childList: typeof c.childList > 'u' ? !0 : c.childList,
        characterData: typeof c.characterData > 'u' ? !0 : c.characterData
      }),
        r.push(u);
    },
    a = () => {
      if (e.params.observer) {
        if (e.params.observeParents) {
          const f = Me(e.hostEl);
          for (let c = 0; c < f.length; c += 1) l(f[c]);
        }
        l(e.hostEl, { childList: e.params.observeSlideChildren }),
          l(e.wrapperEl, { attributes: !1 });
      }
    },
    d = () => {
      r.forEach((f) => {
        f.disconnect();
      }),
        r.splice(0, r.length);
    };
  i({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
    s('init', a),
    s('destroy', d);
}
var De = {
  on(t, e, i) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof e != 'function') return s;
    const n = i ? 'unshift' : 'push';
    return (
      t.split(' ').forEach((r) => {
        s.eventsListeners[r] || (s.eventsListeners[r] = []),
          s.eventsListeners[r][n](e);
      }),
      s
    );
  },
  once(t, e, i) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof e != 'function') return s;
    function n() {
      s.off(t, n), n.__emitterProxy && delete n.__emitterProxy;
      for (var r = arguments.length, o = new Array(r), l = 0; l < r; l++)
        o[l] = arguments[l];
      e.apply(s, o);
    }
    return (n.__emitterProxy = e), s.on(t, n, i);
  },
  onAny(t, e) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof t != 'function') return i;
    const s = e ? 'unshift' : 'push';
    return i.eventsAnyListeners.indexOf(t) < 0 && i.eventsAnyListeners[s](t), i;
  },
  offAny(t) {
    const e = this;
    if (!e.eventsListeners || e.destroyed || !e.eventsAnyListeners) return e;
    const i = e.eventsAnyListeners.indexOf(t);
    return i >= 0 && e.eventsAnyListeners.splice(i, 1), e;
  },
  off(t, e) {
    const i = this;
    return (
      !i.eventsListeners ||
        i.destroyed ||
        !i.eventsListeners ||
        t.split(' ').forEach((s) => {
          typeof e > 'u'
            ? (i.eventsListeners[s] = [])
            : i.eventsListeners[s] &&
              i.eventsListeners[s].forEach((n, r) => {
                (n === e || (n.__emitterProxy && n.__emitterProxy === e)) &&
                  i.eventsListeners[s].splice(r, 1);
              });
        }),
      i
    );
  },
  emit() {
    const t = this;
    if (!t.eventsListeners || t.destroyed || !t.eventsListeners) return t;
    let e, i, s;
    for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
      r[o] = arguments[o];
    return (
      typeof r[0] == 'string' || Array.isArray(r[0])
        ? ((e = r[0]), (i = r.slice(1, r.length)), (s = t))
        : ((e = r[0].events), (i = r[0].data), (s = r[0].context || t)),
      i.unshift(s),
      (Array.isArray(e) ? e : e.split(' ')).forEach((a) => {
        t.eventsAnyListeners &&
          t.eventsAnyListeners.length &&
          t.eventsAnyListeners.forEach((d) => {
            d.apply(s, [a, ...i]);
          }),
          t.eventsListeners &&
            t.eventsListeners[a] &&
            t.eventsListeners[a].forEach((d) => {
              d.apply(s, i);
            });
      }),
      t
    );
  }
};
function ke() {
  const t = this;
  let e, i;
  const s = t.el;
  typeof t.params.width < 'u' && t.params.width !== null
    ? (e = t.params.width)
    : (e = s.clientWidth),
    typeof t.params.height < 'u' && t.params.height !== null
      ? (i = t.params.height)
      : (i = s.clientHeight),
    !((e === 0 && t.isHorizontal()) || (i === 0 && t.isVertical())) &&
      ((e =
        e -
        parseInt(F(s, 'padding-left') || 0, 10) -
        parseInt(F(s, 'padding-right') || 0, 10)),
      (i =
        i -
        parseInt(F(s, 'padding-top') || 0, 10) -
        parseInt(F(s, 'padding-bottom') || 0, 10)),
      Number.isNaN(e) && (e = 0),
      Number.isNaN(i) && (i = 0),
      Object.assign(t, {
        width: e,
        height: i,
        size: t.isHorizontal() ? e : i
      }));
}
function Ve() {
  const t = this;
  function e(w) {
    return t.isHorizontal()
      ? w
      : {
          width: 'height',
          'margin-top': 'margin-left',
          'margin-bottom ': 'margin-right',
          'margin-left': 'margin-top',
          'margin-right': 'margin-bottom',
          'padding-left': 'padding-top',
          'padding-right': 'padding-bottom',
          marginRight: 'marginBottom'
        }[w];
  }
  function i(w, y) {
    return parseFloat(w.getPropertyValue(e(y)) || 0);
  }
  const s = t.params,
    { wrapperEl: n, slidesEl: r, size: o, rtlTranslate: l, wrongRTL: a } = t,
    d = t.virtual && s.virtual.enabled,
    f = d ? t.virtual.slides.length : t.slides.length,
    c = B(r, `.${t.params.slideClass}, swiper-slide`),
    p = d ? t.virtual.slides.length : c.length;
  let u = [];
  const g = [],
    m = [];
  let T = s.slidesOffsetBefore;
  typeof T == 'function' && (T = s.slidesOffsetBefore.call(t));
  let h = s.slidesOffsetAfter;
  typeof h == 'function' && (h = s.slidesOffsetAfter.call(t));
  const x = t.snapGrid.length,
    v = t.slidesGrid.length;
  let S = s.spaceBetween,
    b = -T,
    I = 0,
    E = 0;
  if (typeof o > 'u') return;
  typeof S == 'string' && S.indexOf('%') >= 0
    ? (S = (parseFloat(S.replace('%', '')) / 100) * o)
    : typeof S == 'string' && (S = parseFloat(S)),
    (t.virtualSize = -S),
    c.forEach((w) => {
      l ? (w.style.marginLeft = '') : (w.style.marginRight = ''),
        (w.style.marginBottom = ''),
        (w.style.marginTop = '');
    }),
    s.centeredSlides &&
      s.cssMode &&
      (j(n, '--swiper-centered-offset-before', ''),
      j(n, '--swiper-centered-offset-after', ''));
  const L = s.grid && s.grid.rows > 1 && t.grid;
  L && t.grid.initSlides(p);
  let P;
  const H =
    s.slidesPerView === 'auto' &&
    s.breakpoints &&
    Object.keys(s.breakpoints).filter(
      (w) => typeof s.breakpoints[w].slidesPerView < 'u'
    ).length > 0;
  for (let w = 0; w < p; w += 1) {
    P = 0;
    let y;
    if (
      (c[w] && (y = c[w]),
      L && t.grid.updateSlide(w, y, p, e),
      !(c[w] && F(y, 'display') === 'none'))
    ) {
      if (s.slidesPerView === 'auto') {
        H && (c[w].style[e('width')] = '');
        const M = getComputedStyle(y),
          G = y.style.transform,
          _ = y.style.webkitTransform;
        if (
          (G && (y.style.transform = 'none'),
          _ && (y.style.webkitTransform = 'none'),
          s.roundLengths)
        )
          P = t.isHorizontal() ? ne(y, 'width', !0) : ne(y, 'height', !0);
        else {
          const R = i(M, 'width'),
            C = i(M, 'padding-left'),
            k = i(M, 'padding-right'),
            O = i(M, 'margin-left'),
            N = i(M, 'margin-right'),
            $ = M.getPropertyValue('box-sizing');
          if ($ && $ === 'border-box') P = R + O + N;
          else {
            const { clientWidth: he, offsetWidth: ge } = y;
            P = R + C + k + O + N + (ge - he);
          }
        }
        G && (y.style.transform = G),
          _ && (y.style.webkitTransform = _),
          s.roundLengths && (P = Math.floor(P));
      } else
        (P = (o - (s.slidesPerView - 1) * S) / s.slidesPerView),
          s.roundLengths && (P = Math.floor(P)),
          c[w] && (c[w].style[e('width')] = `${P}px`);
      c[w] && (c[w].swiperSlideSize = P),
        m.push(P),
        s.centeredSlides
          ? ((b = b + P / 2 + I / 2 + S),
            I === 0 && w !== 0 && (b = b - o / 2 - S),
            w === 0 && (b = b - o / 2 - S),
            Math.abs(b) < 1 / 1e3 && (b = 0),
            s.roundLengths && (b = Math.floor(b)),
            E % s.slidesPerGroup === 0 && u.push(b),
            g.push(b))
          : (s.roundLengths && (b = Math.floor(b)),
            (E - Math.min(t.params.slidesPerGroupSkip, E)) %
              t.params.slidesPerGroup ===
              0 && u.push(b),
            g.push(b),
            (b = b + P + S)),
        (t.virtualSize += P + S),
        (I = P),
        (E += 1);
    }
  }
  if (
    ((t.virtualSize = Math.max(t.virtualSize, o) + h),
    l &&
      a &&
      (s.effect === 'slide' || s.effect === 'coverflow') &&
      (n.style.width = `${t.virtualSize + S}px`),
    s.setWrapperSize && (n.style[e('width')] = `${t.virtualSize + S}px`),
    L && t.grid.updateWrapperSize(P, u, e),
    !s.centeredSlides)
  ) {
    const w = [];
    for (let y = 0; y < u.length; y += 1) {
      let M = u[y];
      s.roundLengths && (M = Math.floor(M)),
        u[y] <= t.virtualSize - o && w.push(M);
    }
    (u = w),
      Math.floor(t.virtualSize - o) - Math.floor(u[u.length - 1]) > 1 &&
        u.push(t.virtualSize - o);
  }
  if (d && s.loop) {
    const w = m[0] + S;
    if (s.slidesPerGroup > 1) {
      const y = Math.ceil(
          (t.virtual.slidesBefore + t.virtual.slidesAfter) / s.slidesPerGroup
        ),
        M = w * s.slidesPerGroup;
      for (let G = 0; G < y; G += 1) u.push(u[u.length - 1] + M);
    }
    for (let y = 0; y < t.virtual.slidesBefore + t.virtual.slidesAfter; y += 1)
      s.slidesPerGroup === 1 && u.push(u[u.length - 1] + w),
        g.push(g[g.length - 1] + w),
        (t.virtualSize += w);
  }
  if ((u.length === 0 && (u = [0]), S !== 0)) {
    const w = t.isHorizontal() && l ? 'marginLeft' : e('marginRight');
    c.filter((y, M) =>
      !s.cssMode || s.loop ? !0 : M !== c.length - 1
    ).forEach((y) => {
      y.style[w] = `${S}px`;
    });
  }
  if (s.centeredSlides && s.centeredSlidesBounds) {
    let w = 0;
    m.forEach((M) => {
      w += M + (S || 0);
    }),
      (w -= S);
    const y = w - o;
    u = u.map((M) => (M <= 0 ? -T : M > y ? y + h : M));
  }
  if (s.centerInsufficientSlides) {
    let w = 0;
    if (
      (m.forEach((y) => {
        w += y + (S || 0);
      }),
      (w -= S),
      w < o)
    ) {
      const y = (o - w) / 2;
      u.forEach((M, G) => {
        u[G] = M - y;
      }),
        g.forEach((M, G) => {
          g[G] = M + y;
        });
    }
  }
  if (
    (Object.assign(t, {
      slides: c,
      snapGrid: u,
      slidesGrid: g,
      slidesSizesGrid: m
    }),
    s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
  ) {
    j(n, '--swiper-centered-offset-before', `${-u[0]}px`),
      j(
        n,
        '--swiper-centered-offset-after',
        `${t.size / 2 - m[m.length - 1] / 2}px`
      );
    const w = -t.snapGrid[0],
      y = -t.slidesGrid[0];
    (t.snapGrid = t.snapGrid.map((M) => M + w)),
      (t.slidesGrid = t.slidesGrid.map((M) => M + y));
  }
  if (
    (p !== f && t.emit('slidesLengthChange'),
    u.length !== x &&
      (t.params.watchOverflow && t.checkOverflow(),
      t.emit('snapGridLengthChange')),
    g.length !== v && t.emit('slidesGridLengthChange'),
    s.watchSlidesProgress && t.updateSlidesOffset(),
    !d && !s.cssMode && (s.effect === 'slide' || s.effect === 'fade'))
  ) {
    const w = `${s.containerModifierClass}backface-hidden`,
      y = t.el.classList.contains(w);
    p <= s.maxBackfaceHiddenSlides
      ? y || t.el.classList.add(w)
      : y && t.el.classList.remove(w);
  }
}
function Be(t) {
  const e = this,
    i = [],
    s = e.virtual && e.params.virtual.enabled;
  let n = 0,
    r;
  typeof t == 'number'
    ? e.setTransition(t)
    : t === !0 && e.setTransition(e.params.speed);
  const o = (l) => (s ? e.slides[e.getSlideIndexByData(l)] : e.slides[l]);
  if (e.params.slidesPerView !== 'auto' && e.params.slidesPerView > 1)
    if (e.params.centeredSlides)
      (e.visibleSlides || []).forEach((l) => {
        i.push(l);
      });
    else
      for (r = 0; r < Math.ceil(e.params.slidesPerView); r += 1) {
        const l = e.activeIndex + r;
        if (l > e.slides.length && !s) break;
        i.push(o(l));
      }
  else i.push(o(e.activeIndex));
  for (r = 0; r < i.length; r += 1)
    if (typeof i[r] < 'u') {
      const l = i[r].offsetHeight;
      n = l > n ? l : n;
    }
  (n || n === 0) && (e.wrapperEl.style.height = `${n}px`);
}
function Ne() {
  const t = this,
    e = t.slides,
    i = t.isElement
      ? t.isHorizontal()
        ? t.wrapperEl.offsetLeft
        : t.wrapperEl.offsetTop
      : 0;
  for (let s = 0; s < e.length; s += 1)
    e[s].swiperSlideOffset =
      (t.isHorizontal() ? e[s].offsetLeft : e[s].offsetTop) -
      i -
      t.cssOverflowAdjustment();
}
function Fe(t) {
  t === void 0 && (t = (this && this.translate) || 0);
  const e = this,
    i = e.params,
    { slides: s, rtlTranslate: n, snapGrid: r } = e;
  if (s.length === 0) return;
  typeof s[0].swiperSlideOffset > 'u' && e.updateSlidesOffset();
  let o = -t;
  n && (o = t),
    s.forEach((a) => {
      a.classList.remove(i.slideVisibleClass);
    }),
    (e.visibleSlidesIndexes = []),
    (e.visibleSlides = []);
  let l = i.spaceBetween;
  typeof l == 'string' && l.indexOf('%') >= 0
    ? (l = (parseFloat(l.replace('%', '')) / 100) * e.size)
    : typeof l == 'string' && (l = parseFloat(l));
  for (let a = 0; a < s.length; a += 1) {
    const d = s[a];
    let f = d.swiperSlideOffset;
    i.cssMode && i.centeredSlides && (f -= s[0].swiperSlideOffset);
    const c =
        (o + (i.centeredSlides ? e.minTranslate() : 0) - f) /
        (d.swiperSlideSize + l),
      p =
        (o - r[0] + (i.centeredSlides ? e.minTranslate() : 0) - f) /
        (d.swiperSlideSize + l),
      u = -(o - f),
      g = u + e.slidesSizesGrid[a];
    ((u >= 0 && u < e.size - 1) ||
      (g > 1 && g <= e.size) ||
      (u <= 0 && g >= e.size)) &&
      (e.visibleSlides.push(d),
      e.visibleSlidesIndexes.push(a),
      s[a].classList.add(i.slideVisibleClass)),
      (d.progress = n ? -c : c),
      (d.originalProgress = n ? -p : p);
  }
}
function _e(t) {
  const e = this;
  if (typeof t > 'u') {
    const f = e.rtlTranslate ? -1 : 1;
    t = (e && e.translate && e.translate * f) || 0;
  }
  const i = e.params,
    s = e.maxTranslate() - e.minTranslate();
  let { progress: n, isBeginning: r, isEnd: o, progressLoop: l } = e;
  const a = r,
    d = o;
  if (s === 0) (n = 0), (r = !0), (o = !0);
  else {
    n = (t - e.minTranslate()) / s;
    const f = Math.abs(t - e.minTranslate()) < 1,
      c = Math.abs(t - e.maxTranslate()) < 1;
    (r = f || n <= 0), (o = c || n >= 1), f && (n = 0), c && (n = 1);
  }
  if (i.loop) {
    const f = e.getSlideIndexByData(0),
      c = e.getSlideIndexByData(e.slides.length - 1),
      p = e.slidesGrid[f],
      u = e.slidesGrid[c],
      g = e.slidesGrid[e.slidesGrid.length - 1],
      m = Math.abs(t);
    m >= p ? (l = (m - p) / g) : (l = (m + g - u) / g), l > 1 && (l -= 1);
  }
  Object.assign(e, { progress: n, progressLoop: l, isBeginning: r, isEnd: o }),
    (i.watchSlidesProgress || (i.centeredSlides && i.autoHeight)) &&
      e.updateSlidesProgress(t),
    r && !a && e.emit('reachBeginning toEdge'),
    o && !d && e.emit('reachEnd toEdge'),
    ((a && !r) || (d && !o)) && e.emit('fromEdge'),
    e.emit('progress', n);
}
function $e() {
  const t = this,
    { slides: e, params: i, slidesEl: s, activeIndex: n } = t,
    r = t.virtual && i.virtual.enabled,
    o = (a) => B(s, `.${i.slideClass}${a}, swiper-slide${a}`)[0];
  e.forEach((a) => {
    a.classList.remove(i.slideActiveClass, i.slideNextClass, i.slidePrevClass);
  });
  let l;
  if (r)
    if (i.loop) {
      let a = n - t.virtual.slidesBefore;
      a < 0 && (a = t.virtual.slides.length + a),
        a >= t.virtual.slides.length && (a -= t.virtual.slides.length),
        (l = o(`[data-swiper-slide-index="${a}"]`));
    } else l = o(`[data-swiper-slide-index="${n}"]`);
  else l = e[n];
  if (l) {
    l.classList.add(i.slideActiveClass);
    let a = Pe(l, `.${i.slideClass}, swiper-slide`)[0];
    i.loop && !a && (a = e[0]), a && a.classList.add(i.slideNextClass);
    let d = Ee(l, `.${i.slideClass}, swiper-slide`)[0];
    i.loop && !d === 0 && (d = e[e.length - 1]),
      d && d.classList.add(i.slidePrevClass);
  }
  t.emitSlidesClasses();
}
const X = (t, e) => {
    if (!t || t.destroyed || !t.params) return;
    const i = () => (t.isElement ? 'swiper-slide' : `.${t.params.slideClass}`),
      s = e.closest(i());
    if (s) {
      let n = s.querySelector(`.${t.params.lazyPreloaderClass}`);
      !n &&
        t.isElement &&
        (n = s.shadowRoot.querySelector(`.${t.params.lazyPreloaderClass}`)),
        n && n.remove();
    }
  },
  J = (t, e) => {
    if (!t.slides[e]) return;
    const i = t.slides[e].querySelector('[loading="lazy"]');
    i && i.removeAttribute('loading');
  },
  te = (t) => {
    if (!t || t.destroyed || !t.params) return;
    let e = t.params.lazyPreloadPrevNext;
    const i = t.slides.length;
    if (!i || !e || e < 0) return;
    e = Math.min(e, i);
    const s =
        t.params.slidesPerView === 'auto'
          ? t.slidesPerViewDynamic()
          : Math.ceil(t.params.slidesPerView),
      n = t.activeIndex;
    if (t.params.grid && t.params.grid.rows > 1) {
      const o = n,
        l = [o - e];
      l.push(...Array.from({ length: e }).map((a, d) => o + s + d)),
        t.slides.forEach((a, d) => {
          l.includes(a.column) && J(t, d);
        });
      return;
    }
    const r = n + s - 1;
    if (t.params.rewind || t.params.loop)
      for (let o = n - e; o <= r + e; o += 1) {
        const l = ((o % i) + i) % i;
        (l < n || l > r) && J(t, l);
      }
    else
      for (let o = Math.max(n - e, 0); o <= Math.min(r + e, i - 1); o += 1)
        o !== n && (o > r || o < n) && J(t, o);
  };
function He(t) {
  const { slidesGrid: e, params: i } = t,
    s = t.rtlTranslate ? t.translate : -t.translate;
  let n;
  for (let r = 0; r < e.length; r += 1)
    typeof e[r + 1] < 'u'
      ? s >= e[r] && s < e[r + 1] - (e[r + 1] - e[r]) / 2
        ? (n = r)
        : s >= e[r] && s < e[r + 1] && (n = r + 1)
      : s >= e[r] && (n = r);
  return i.normalizeSlideIndex && (n < 0 || typeof n > 'u') && (n = 0), n;
}
function Re(t) {
  const e = this,
    i = e.rtlTranslate ? e.translate : -e.translate,
    { snapGrid: s, params: n, activeIndex: r, realIndex: o, snapIndex: l } = e;
  let a = t,
    d;
  const f = (p) => {
    let u = p - e.virtual.slidesBefore;
    return (
      u < 0 && (u = e.virtual.slides.length + u),
      u >= e.virtual.slides.length && (u -= e.virtual.slides.length),
      u
    );
  };
  if ((typeof a > 'u' && (a = He(e)), s.indexOf(i) >= 0)) d = s.indexOf(i);
  else {
    const p = Math.min(n.slidesPerGroupSkip, a);
    d = p + Math.floor((a - p) / n.slidesPerGroup);
  }
  if ((d >= s.length && (d = s.length - 1), a === r)) {
    d !== l && ((e.snapIndex = d), e.emit('snapIndexChange')),
      e.params.loop &&
        e.virtual &&
        e.params.virtual.enabled &&
        (e.realIndex = f(a));
    return;
  }
  let c;
  e.virtual && n.virtual.enabled && n.loop
    ? (c = f(a))
    : e.slides[a]
    ? (c = parseInt(
        e.slides[a].getAttribute('data-swiper-slide-index') || a,
        10
      ))
    : (c = a),
    Object.assign(e, {
      previousSnapIndex: l,
      snapIndex: d,
      previousRealIndex: o,
      realIndex: c,
      previousIndex: r,
      activeIndex: a
    }),
    e.initialized && te(e),
    e.emit('activeIndexChange'),
    e.emit('snapIndexChange'),
    o !== c && e.emit('realIndexChange'),
    (e.initialized || e.params.runCallbacksOnInit) && e.emit('slideChange');
}
function We(t) {
  const e = this,
    i = e.params,
    s = t.closest(`.${i.slideClass}, swiper-slide`);
  let n = !1,
    r;
  if (s) {
    for (let o = 0; o < e.slides.length; o += 1)
      if (e.slides[o] === s) {
        (n = !0), (r = o);
        break;
      }
  }
  if (s && n)
    (e.clickedSlide = s),
      e.virtual && e.params.virtual.enabled
        ? (e.clickedIndex = parseInt(
            s.getAttribute('data-swiper-slide-index'),
            10
          ))
        : (e.clickedIndex = r);
  else {
    (e.clickedSlide = void 0), (e.clickedIndex = void 0);
    return;
  }
  i.slideToClickedSlide &&
    e.clickedIndex !== void 0 &&
    e.clickedIndex !== e.activeIndex &&
    e.slideToClickedSlide();
}
var je = {
  updateSize: ke,
  updateSlides: Ve,
  updateAutoHeight: Be,
  updateSlidesOffset: Ne,
  updateSlidesProgress: Fe,
  updateProgress: _e,
  updateSlidesClasses: $e,
  updateActiveIndex: Re,
  updateClickedSlide: We
};
function Xe(t) {
  t === void 0 && (t = this.isHorizontal() ? 'x' : 'y');
  const e = this,
    { params: i, rtlTranslate: s, translate: n, wrapperEl: r } = e;
  if (i.virtualTranslate) return s ? -n : n;
  if (i.cssMode) return n;
  let o = ye(r, t);
  return (o += e.cssOverflowAdjustment()), s && (o = -o), o || 0;
}
function Ye(t, e) {
  const i = this,
    { rtlTranslate: s, params: n, wrapperEl: r, progress: o } = i;
  let l = 0,
    a = 0;
  const d = 0;
  i.isHorizontal() ? (l = s ? -t : t) : (a = t),
    n.roundLengths && ((l = Math.floor(l)), (a = Math.floor(a))),
    (i.previousTranslate = i.translate),
    (i.translate = i.isHorizontal() ? l : a),
    n.cssMode
      ? (r[i.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = i.isHorizontal()
          ? -l
          : -a)
      : n.virtualTranslate ||
        (i.isHorizontal()
          ? (l -= i.cssOverflowAdjustment())
          : (a -= i.cssOverflowAdjustment()),
        (r.style.transform = `translate3d(${l}px, ${a}px, ${d}px)`));
  let f;
  const c = i.maxTranslate() - i.minTranslate();
  c === 0 ? (f = 0) : (f = (t - i.minTranslate()) / c),
    f !== o && i.updateProgress(t),
    i.emit('setTranslate', i.translate, e);
}
function qe() {
  return -this.snapGrid[0];
}
function Ke() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function Ue(t, e, i, s, n) {
  t === void 0 && (t = 0),
    e === void 0 && (e = this.params.speed),
    i === void 0 && (i = !0),
    s === void 0 && (s = !0);
  const r = this,
    { params: o, wrapperEl: l } = r;
  if (r.animating && o.preventInteractionOnTransition) return !1;
  const a = r.minTranslate(),
    d = r.maxTranslate();
  let f;
  if (
    (s && t > a ? (f = a) : s && t < d ? (f = d) : (f = t),
    r.updateProgress(f),
    o.cssMode)
  ) {
    const c = r.isHorizontal();
    if (e === 0) l[c ? 'scrollLeft' : 'scrollTop'] = -f;
    else {
      if (!r.support.smoothScroll)
        return (
          ce({ swiper: r, targetPosition: -f, side: c ? 'left' : 'top' }), !0
        );
      l.scrollTo({ [c ? 'left' : 'top']: -f, behavior: 'smooth' });
    }
    return !0;
  }
  return (
    e === 0
      ? (r.setTransition(0),
        r.setTranslate(f),
        i && (r.emit('beforeTransitionStart', e, n), r.emit('transitionEnd')))
      : (r.setTransition(e),
        r.setTranslate(f),
        i && (r.emit('beforeTransitionStart', e, n), r.emit('transitionStart')),
        r.animating ||
          ((r.animating = !0),
          r.onTranslateToWrapperTransitionEnd ||
            (r.onTranslateToWrapperTransitionEnd = function (p) {
              !r ||
                r.destroyed ||
                (p.target === this &&
                  (r.wrapperEl.removeEventListener(
                    'transitionend',
                    r.onTranslateToWrapperTransitionEnd
                  ),
                  (r.onTranslateToWrapperTransitionEnd = null),
                  delete r.onTranslateToWrapperTransitionEnd,
                  i && r.emit('transitionEnd')));
            }),
          r.wrapperEl.addEventListener(
            'transitionend',
            r.onTranslateToWrapperTransitionEnd
          ))),
    !0
  );
}
var Je = {
  getTranslate: Xe,
  setTranslate: Ye,
  minTranslate: qe,
  maxTranslate: Ke,
  translateTo: Ue
};
function Qe(t, e) {
  const i = this;
  i.params.cssMode ||
    ((i.wrapperEl.style.transitionDuration = `${t}ms`),
    (i.wrapperEl.style.transitionDelay = t === 0 ? '0ms' : '')),
    i.emit('setTransition', t, e);
}
function pe(t) {
  let { swiper: e, runCallbacks: i, direction: s, step: n } = t;
  const { activeIndex: r, previousIndex: o } = e;
  let l = s;
  if (
    (l || (r > o ? (l = 'next') : r < o ? (l = 'prev') : (l = 'reset')),
    e.emit(`transition${n}`),
    i && r !== o)
  ) {
    if (l === 'reset') {
      e.emit(`slideResetTransition${n}`);
      return;
    }
    e.emit(`slideChangeTransition${n}`),
      l === 'next'
        ? e.emit(`slideNextTransition${n}`)
        : e.emit(`slidePrevTransition${n}`);
  }
}
function Ze(t, e) {
  t === void 0 && (t = !0);
  const i = this,
    { params: s } = i;
  s.cssMode ||
    (s.autoHeight && i.updateAutoHeight(),
    pe({ swiper: i, runCallbacks: t, direction: e, step: 'Start' }));
}
function et(t, e) {
  t === void 0 && (t = !0);
  const i = this,
    { params: s } = i;
  (i.animating = !1),
    !s.cssMode &&
      (i.setTransition(0),
      pe({ swiper: i, runCallbacks: t, direction: e, step: 'End' }));
}
var tt = { setTransition: Qe, transitionStart: Ze, transitionEnd: et };
function it(t, e, i, s, n) {
  t === void 0 && (t = 0),
    e === void 0 && (e = this.params.speed),
    i === void 0 && (i = !0),
    typeof t == 'string' && (t = parseInt(t, 10));
  const r = this;
  let o = t;
  o < 0 && (o = 0);
  const {
    params: l,
    snapGrid: a,
    slidesGrid: d,
    previousIndex: f,
    activeIndex: c,
    rtlTranslate: p,
    wrapperEl: u,
    enabled: g
  } = r;
  if ((r.animating && l.preventInteractionOnTransition) || (!g && !s && !n))
    return !1;
  const m = Math.min(r.params.slidesPerGroupSkip, o);
  let T = m + Math.floor((o - m) / r.params.slidesPerGroup);
  T >= a.length && (T = a.length - 1);
  const h = -a[T];
  if (l.normalizeSlideIndex)
    for (let v = 0; v < d.length; v += 1) {
      const S = -Math.floor(h * 100),
        b = Math.floor(d[v] * 100),
        I = Math.floor(d[v + 1] * 100);
      typeof d[v + 1] < 'u'
        ? S >= b && S < I - (I - b) / 2
          ? (o = v)
          : S >= b && S < I && (o = v + 1)
        : S >= b && (o = v);
    }
  if (
    r.initialized &&
    o !== c &&
    ((!r.allowSlideNext &&
      (p
        ? h > r.translate && h > r.minTranslate()
        : h < r.translate && h < r.minTranslate())) ||
      (!r.allowSlidePrev &&
        h > r.translate &&
        h > r.maxTranslate() &&
        (c || 0) !== o))
  )
    return !1;
  o !== (f || 0) && i && r.emit('beforeSlideChangeStart'), r.updateProgress(h);
  let x;
  if (
    (o > c ? (x = 'next') : o < c ? (x = 'prev') : (x = 'reset'),
    (p && -h === r.translate) || (!p && h === r.translate))
  )
    return (
      r.updateActiveIndex(o),
      l.autoHeight && r.updateAutoHeight(),
      r.updateSlidesClasses(),
      l.effect !== 'slide' && r.setTranslate(h),
      x !== 'reset' && (r.transitionStart(i, x), r.transitionEnd(i, x)),
      !1
    );
  if (l.cssMode) {
    const v = r.isHorizontal(),
      S = p ? h : -h;
    if (e === 0) {
      const b = r.virtual && r.params.virtual.enabled;
      b &&
        ((r.wrapperEl.style.scrollSnapType = 'none'),
        (r._immediateVirtual = !0)),
        b && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
          ? ((r._cssModeVirtualInitialSet = !0),
            requestAnimationFrame(() => {
              u[v ? 'scrollLeft' : 'scrollTop'] = S;
            }))
          : (u[v ? 'scrollLeft' : 'scrollTop'] = S),
        b &&
          requestAnimationFrame(() => {
            (r.wrapperEl.style.scrollSnapType = ''), (r._immediateVirtual = !1);
          });
    } else {
      if (!r.support.smoothScroll)
        return (
          ce({ swiper: r, targetPosition: S, side: v ? 'left' : 'top' }), !0
        );
      u.scrollTo({ [v ? 'left' : 'top']: S, behavior: 'smooth' });
    }
    return !0;
  }
  return (
    r.setTransition(e),
    r.setTranslate(h),
    r.updateActiveIndex(o),
    r.updateSlidesClasses(),
    r.emit('beforeTransitionStart', e, s),
    r.transitionStart(i, x),
    e === 0
      ? r.transitionEnd(i, x)
      : r.animating ||
        ((r.animating = !0),
        r.onSlideToWrapperTransitionEnd ||
          (r.onSlideToWrapperTransitionEnd = function (S) {
            !r ||
              r.destroyed ||
              (S.target === this &&
                (r.wrapperEl.removeEventListener(
                  'transitionend',
                  r.onSlideToWrapperTransitionEnd
                ),
                (r.onSlideToWrapperTransitionEnd = null),
                delete r.onSlideToWrapperTransitionEnd,
                r.transitionEnd(i, x)));
          }),
        r.wrapperEl.addEventListener(
          'transitionend',
          r.onSlideToWrapperTransitionEnd
        )),
    !0
  );
}
function st(t, e, i, s) {
  t === void 0 && (t = 0),
    e === void 0 && (e = this.params.speed),
    i === void 0 && (i = !0),
    typeof t == 'string' && (t = parseInt(t, 10));
  const n = this;
  let r = t;
  return (
    n.params.loop &&
      (n.virtual && n.params.virtual.enabled
        ? (r = r + n.virtual.slidesBefore)
        : (r = n.getSlideIndexByData(r))),
    n.slideTo(r, e, i, s)
  );
}
function rt(t, e, i) {
  t === void 0 && (t = this.params.speed), e === void 0 && (e = !0);
  const s = this,
    { enabled: n, params: r, animating: o } = s;
  if (!n) return s;
  let l = r.slidesPerGroup;
  r.slidesPerView === 'auto' &&
    r.slidesPerGroup === 1 &&
    r.slidesPerGroupAuto &&
    (l = Math.max(s.slidesPerViewDynamic('current', !0), 1));
  const a = s.activeIndex < r.slidesPerGroupSkip ? 1 : l,
    d = s.virtual && r.virtual.enabled;
  if (r.loop) {
    if (o && !d && r.loopPreventsSliding) return !1;
    s.loopFix({ direction: 'next' }), (s._clientLeft = s.wrapperEl.clientLeft);
  }
  return r.rewind && s.isEnd
    ? s.slideTo(0, t, e, i)
    : s.slideTo(s.activeIndex + a, t, e, i);
}
function nt(t, e, i) {
  t === void 0 && (t = this.params.speed), e === void 0 && (e = !0);
  const s = this,
    {
      params: n,
      snapGrid: r,
      slidesGrid: o,
      rtlTranslate: l,
      enabled: a,
      animating: d
    } = s;
  if (!a) return s;
  const f = s.virtual && n.virtual.enabled;
  if (n.loop) {
    if (d && !f && n.loopPreventsSliding) return !1;
    s.loopFix({ direction: 'prev' }), (s._clientLeft = s.wrapperEl.clientLeft);
  }
  const c = l ? s.translate : -s.translate;
  function p(h) {
    return h < 0 ? -Math.floor(Math.abs(h)) : Math.floor(h);
  }
  const u = p(c),
    g = r.map((h) => p(h));
  let m = r[g.indexOf(u) - 1];
  if (typeof m > 'u' && n.cssMode) {
    let h;
    r.forEach((x, v) => {
      u >= x && (h = v);
    }),
      typeof h < 'u' && (m = r[h > 0 ? h - 1 : h]);
  }
  let T = 0;
  if (
    (typeof m < 'u' &&
      ((T = o.indexOf(m)),
      T < 0 && (T = s.activeIndex - 1),
      n.slidesPerView === 'auto' &&
        n.slidesPerGroup === 1 &&
        n.slidesPerGroupAuto &&
        ((T = T - s.slidesPerViewDynamic('previous', !0) + 1),
        (T = Math.max(T, 0)))),
    n.rewind && s.isBeginning)
  ) {
    const h =
      s.params.virtual && s.params.virtual.enabled && s.virtual
        ? s.virtual.slides.length - 1
        : s.slides.length - 1;
    return s.slideTo(h, t, e, i);
  }
  return s.slideTo(T, t, e, i);
}
function at(t, e, i) {
  t === void 0 && (t = this.params.speed), e === void 0 && (e = !0);
  const s = this;
  return s.slideTo(s.activeIndex, t, e, i);
}
function lt(t, e, i, s) {
  t === void 0 && (t = this.params.speed),
    e === void 0 && (e = !0),
    s === void 0 && (s = 0.5);
  const n = this;
  let r = n.activeIndex;
  const o = Math.min(n.params.slidesPerGroupSkip, r),
    l = o + Math.floor((r - o) / n.params.slidesPerGroup),
    a = n.rtlTranslate ? n.translate : -n.translate;
  if (a >= n.snapGrid[l]) {
    const d = n.snapGrid[l],
      f = n.snapGrid[l + 1];
    a - d > (f - d) * s && (r += n.params.slidesPerGroup);
  } else {
    const d = n.snapGrid[l - 1],
      f = n.snapGrid[l];
    a - d <= (f - d) * s && (r -= n.params.slidesPerGroup);
  }
  return (
    (r = Math.max(r, 0)),
    (r = Math.min(r, n.slidesGrid.length - 1)),
    n.slideTo(r, t, e, i)
  );
}
function ot() {
  const t = this,
    { params: e, slidesEl: i } = t,
    s = e.slidesPerView === 'auto' ? t.slidesPerViewDynamic() : e.slidesPerView;
  let n = t.clickedIndex,
    r;
  const o = t.isElement ? 'swiper-slide' : `.${e.slideClass}`;
  if (e.loop) {
    if (t.animating) return;
    (r = parseInt(t.clickedSlide.getAttribute('data-swiper-slide-index'), 10)),
      e.centeredSlides
        ? n < t.loopedSlides - s / 2 ||
          n > t.slides.length - t.loopedSlides + s / 2
          ? (t.loopFix(),
            (n = t.getSlideIndex(
              B(i, `${o}[data-swiper-slide-index="${r}"]`)[0]
            )),
            ee(() => {
              t.slideTo(n);
            }))
          : t.slideTo(n)
        : n > t.slides.length - s
        ? (t.loopFix(),
          (n = t.getSlideIndex(
            B(i, `${o}[data-swiper-slide-index="${r}"]`)[0]
          )),
          ee(() => {
            t.slideTo(n);
          }))
        : t.slideTo(n);
  } else t.slideTo(n);
}
var dt = {
  slideTo: it,
  slideToLoop: st,
  slideNext: rt,
  slidePrev: nt,
  slideReset: at,
  slideToClosest: lt,
  slideToClickedSlide: ot
};
function ut(t) {
  const e = this,
    { params: i, slidesEl: s } = e;
  if (!i.loop || (e.virtual && e.params.virtual.enabled)) return;
  B(s, `.${i.slideClass}, swiper-slide`).forEach((r, o) => {
    r.setAttribute('data-swiper-slide-index', o);
  }),
    e.loopFix({
      slideRealIndex: t,
      direction: i.centeredSlides ? void 0 : 'next'
    });
}
function ct(t) {
  let {
    slideRealIndex: e,
    slideTo: i = !0,
    direction: s,
    setTranslate: n,
    activeSlideIndex: r,
    byController: o,
    byMousewheel: l
  } = t === void 0 ? {} : t;
  const a = this;
  if (!a.params.loop) return;
  a.emit('beforeLoopFix');
  const {
    slides: d,
    allowSlidePrev: f,
    allowSlideNext: c,
    slidesEl: p,
    params: u
  } = a;
  if (
    ((a.allowSlidePrev = !0),
    (a.allowSlideNext = !0),
    a.virtual && u.virtual.enabled)
  ) {
    i &&
      (!u.centeredSlides && a.snapIndex === 0
        ? a.slideTo(a.virtual.slides.length, 0, !1, !0)
        : u.centeredSlides && a.snapIndex < u.slidesPerView
        ? a.slideTo(a.virtual.slides.length + a.snapIndex, 0, !1, !0)
        : a.snapIndex === a.snapGrid.length - 1 &&
          a.slideTo(a.virtual.slidesBefore, 0, !1, !0)),
      (a.allowSlidePrev = f),
      (a.allowSlideNext = c),
      a.emit('loopFix');
    return;
  }
  const g =
    u.slidesPerView === 'auto'
      ? a.slidesPerViewDynamic()
      : Math.ceil(parseFloat(u.slidesPerView, 10));
  let m = u.loopedSlides || g;
  m % u.slidesPerGroup !== 0 &&
    (m += u.slidesPerGroup - (m % u.slidesPerGroup)),
    (a.loopedSlides = m);
  const T = [],
    h = [];
  let x = a.activeIndex;
  typeof r > 'u'
    ? (r = a.getSlideIndex(
        a.slides.filter((E) => E.classList.contains(u.slideActiveClass))[0]
      ))
    : (x = r);
  const v = s === 'next' || !s,
    S = s === 'prev' || !s;
  let b = 0,
    I = 0;
  if (r < m) {
    b = Math.max(m - r, u.slidesPerGroup);
    for (let E = 0; E < m - r; E += 1) {
      const L = E - Math.floor(E / d.length) * d.length;
      T.push(d.length - L - 1);
    }
  } else if (r > a.slides.length - m * 2) {
    I = Math.max(r - (a.slides.length - m * 2), u.slidesPerGroup);
    for (let E = 0; E < I; E += 1) {
      const L = E - Math.floor(E / d.length) * d.length;
      h.push(L);
    }
  }
  if (
    (S &&
      T.forEach((E) => {
        (a.slides[E].swiperLoopMoveDOM = !0),
          p.prepend(a.slides[E]),
          (a.slides[E].swiperLoopMoveDOM = !1);
      }),
    v &&
      h.forEach((E) => {
        (a.slides[E].swiperLoopMoveDOM = !0),
          p.append(a.slides[E]),
          (a.slides[E].swiperLoopMoveDOM = !1);
      }),
    a.recalcSlides(),
    u.slidesPerView === 'auto' && a.updateSlides(),
    u.watchSlidesProgress && a.updateSlidesOffset(),
    i)
  ) {
    if (T.length > 0 && S)
      if (typeof e > 'u') {
        const E = a.slidesGrid[x],
          P = a.slidesGrid[x + b] - E;
        l
          ? a.setTranslate(a.translate - P)
          : (a.slideTo(x + b, 0, !1, !0),
            n &&
              ((a.touches[a.isHorizontal() ? 'startX' : 'startY'] += P),
              (a.touchEventsData.currentTranslate = a.translate)));
      } else
        n &&
          (a.slideToLoop(e, 0, !1, !0),
          (a.touchEventsData.currentTranslate = a.translate));
    else if (h.length > 0 && v)
      if (typeof e > 'u') {
        const E = a.slidesGrid[x],
          P = a.slidesGrid[x - I] - E;
        l
          ? a.setTranslate(a.translate - P)
          : (a.slideTo(x - I, 0, !1, !0),
            n &&
              ((a.touches[a.isHorizontal() ? 'startX' : 'startY'] += P),
              (a.touchEventsData.currentTranslate = a.translate)));
      } else a.slideToLoop(e, 0, !1, !0);
  }
  if (
    ((a.allowSlidePrev = f),
    (a.allowSlideNext = c),
    a.controller && a.controller.control && !o)
  ) {
    const E = {
      slideRealIndex: e,
      direction: s,
      setTranslate: n,
      activeSlideIndex: r,
      byController: !0
    };
    Array.isArray(a.controller.control)
      ? a.controller.control.forEach((L) => {
          !L.destroyed &&
            L.params.loop &&
            L.loopFix({
              ...E,
              slideTo: L.params.slidesPerView === u.slidesPerView ? i : !1
            });
        })
      : a.controller.control instanceof a.constructor &&
        a.controller.control.params.loop &&
        a.controller.control.loopFix({
          ...E,
          slideTo:
            a.controller.control.params.slidesPerView === u.slidesPerView
              ? i
              : !1
        });
  }
  a.emit('loopFix');
}
function ft() {
  const t = this,
    { params: e, slidesEl: i } = t;
  if (!e.loop || (t.virtual && t.params.virtual.enabled)) return;
  t.recalcSlides();
  const s = [];
  t.slides.forEach((n) => {
    const r =
      typeof n.swiperSlideIndex > 'u'
        ? n.getAttribute('data-swiper-slide-index') * 1
        : n.swiperSlideIndex;
    s[r] = n;
  }),
    t.slides.forEach((n) => {
      n.removeAttribute('data-swiper-slide-index');
    }),
    s.forEach((n) => {
      i.append(n);
    }),
    t.recalcSlides(),
    t.slideTo(t.realIndex, 0);
}
var pt = { loopCreate: ut, loopFix: ct, loopDestroy: ft };
function mt(t) {
  const e = this;
  if (
    !e.params.simulateTouch ||
    (e.params.watchOverflow && e.isLocked) ||
    e.params.cssMode
  )
    return;
  const i = e.params.touchEventsTarget === 'container' ? e.el : e.wrapperEl;
  e.isElement && (e.__preventObserver__ = !0),
    (i.style.cursor = 'move'),
    (i.style.cursor = t ? 'grabbing' : 'grab'),
    e.isElement &&
      requestAnimationFrame(() => {
        e.__preventObserver__ = !1;
      });
}
function ht() {
  const t = this;
  (t.params.watchOverflow && t.isLocked) ||
    t.params.cssMode ||
    (t.isElement && (t.__preventObserver__ = !0),
    (t[
      t.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'
    ].style.cursor = ''),
    t.isElement &&
      requestAnimationFrame(() => {
        t.__preventObserver__ = !1;
      }));
}
var gt = { setGrabCursor: mt, unsetGrabCursor: ht };
function vt(t, e) {
  e === void 0 && (e = this);
  function i(s) {
    if (!s || s === V() || s === A()) return null;
    s.assignedSlot && (s = s.assignedSlot);
    const n = s.closest(t);
    return !n && !s.getRootNode ? null : n || i(s.getRootNode().host);
  }
  return i(e);
}
function wt(t) {
  const e = this,
    i = V(),
    s = A(),
    n = e.touchEventsData;
  n.evCache.push(t);
  const { params: r, touches: o, enabled: l } = e;
  if (
    !l ||
    (!r.simulateTouch && t.pointerType === 'mouse') ||
    (e.animating && r.preventInteractionOnTransition)
  )
    return;
  !e.animating && r.cssMode && r.loop && e.loopFix();
  let a = t;
  a.originalEvent && (a = a.originalEvent);
  let d = a.target;
  if (
    (r.touchEventsTarget === 'wrapper' && !e.wrapperEl.contains(d)) ||
    ('which' in a && a.which === 3) ||
    ('button' in a && a.button > 0) ||
    (n.isTouched && n.isMoved)
  )
    return;
  const f = !!r.noSwipingClass && r.noSwipingClass !== '',
    c = t.composedPath ? t.composedPath() : t.path;
  f && a.target && a.target.shadowRoot && c && (d = c[0]);
  const p = r.noSwipingSelector ? r.noSwipingSelector : `.${r.noSwipingClass}`,
    u = !!(a.target && a.target.shadowRoot);
  if (r.noSwiping && (u ? vt(p, d) : d.closest(p))) {
    e.allowClick = !0;
    return;
  }
  if (r.swipeHandler && !d.closest(r.swipeHandler)) return;
  (o.currentX = a.pageX), (o.currentY = a.pageY);
  const g = o.currentX,
    m = o.currentY,
    T = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
    h = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
  if (T && (g <= h || g >= s.innerWidth - h))
    if (T === 'prevent') t.preventDefault();
    else return;
  Object.assign(n, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0
  }),
    (o.startX = g),
    (o.startY = m),
    (n.touchStartTime = Y()),
    (e.allowClick = !0),
    e.updateSize(),
    (e.swipeDirection = void 0),
    r.threshold > 0 && (n.allowThresholdMove = !1);
  let x = !0;
  d.matches(n.focusableElements) &&
    ((x = !1), d.nodeName === 'SELECT' && (n.isTouched = !1)),
    i.activeElement &&
      i.activeElement.matches(n.focusableElements) &&
      i.activeElement !== d &&
      i.activeElement.blur();
  const v = x && e.allowTouchMove && r.touchStartPreventDefault;
  (r.touchStartForcePreventDefault || v) &&
    !d.isContentEditable &&
    a.preventDefault(),
    r.freeMode &&
      r.freeMode.enabled &&
      e.freeMode &&
      e.animating &&
      !r.cssMode &&
      e.freeMode.onTouchStart(),
    e.emit('touchStart', a);
}
function St(t) {
  const e = V(),
    i = this,
    s = i.touchEventsData,
    { params: n, touches: r, rtlTranslate: o, enabled: l } = i;
  if (!l || (!n.simulateTouch && t.pointerType === 'mouse')) return;
  let a = t;
  if ((a.originalEvent && (a = a.originalEvent), !s.isTouched)) {
    s.startMoving && s.isScrolling && i.emit('touchMoveOpposite', a);
    return;
  }
  const d = s.evCache.findIndex((I) => I.pointerId === a.pointerId);
  d >= 0 && (s.evCache[d] = a);
  const f = s.evCache.length > 1 ? s.evCache[0] : a,
    c = f.pageX,
    p = f.pageY;
  if (a.preventedByNestedSwiper) {
    (r.startX = c), (r.startY = p);
    return;
  }
  if (!i.allowTouchMove) {
    a.target.matches(s.focusableElements) || (i.allowClick = !1),
      s.isTouched &&
        (Object.assign(r, {
          startX: c,
          startY: p,
          prevX: i.touches.currentX,
          prevY: i.touches.currentY,
          currentX: c,
          currentY: p
        }),
        (s.touchStartTime = Y()));
    return;
  }
  if (n.touchReleaseOnEdges && !n.loop) {
    if (i.isVertical()) {
      if (
        (p < r.startY && i.translate <= i.maxTranslate()) ||
        (p > r.startY && i.translate >= i.minTranslate())
      ) {
        (s.isTouched = !1), (s.isMoved = !1);
        return;
      }
    } else if (
      (c < r.startX && i.translate <= i.maxTranslate()) ||
      (c > r.startX && i.translate >= i.minTranslate())
    )
      return;
  }
  if (
    e.activeElement &&
    a.target === e.activeElement &&
    a.target.matches(s.focusableElements)
  ) {
    (s.isMoved = !0), (i.allowClick = !1);
    return;
  }
  if (
    (s.allowTouchCallbacks && i.emit('touchMove', a),
    a.targetTouches && a.targetTouches.length > 1)
  )
    return;
  (r.currentX = c), (r.currentY = p);
  const u = r.currentX - r.startX,
    g = r.currentY - r.startY;
  if (i.params.threshold && Math.sqrt(u ** 2 + g ** 2) < i.params.threshold)
    return;
  if (typeof s.isScrolling > 'u') {
    let I;
    (i.isHorizontal() && r.currentY === r.startY) ||
    (i.isVertical() && r.currentX === r.startX)
      ? (s.isScrolling = !1)
      : u * u + g * g >= 25 &&
        ((I = (Math.atan2(Math.abs(g), Math.abs(u)) * 180) / Math.PI),
        (s.isScrolling = i.isHorizontal()
          ? I > n.touchAngle
          : 90 - I > n.touchAngle));
  }
  if (
    (s.isScrolling && i.emit('touchMoveOpposite', a),
    typeof s.startMoving > 'u' &&
      (r.currentX !== r.startX || r.currentY !== r.startY) &&
      (s.startMoving = !0),
    s.isScrolling ||
      (i.zoom &&
        i.params.zoom &&
        i.params.zoom.enabled &&
        s.evCache.length > 1))
  ) {
    s.isTouched = !1;
    return;
  }
  if (!s.startMoving) return;
  (i.allowClick = !1),
    !n.cssMode && a.cancelable && a.preventDefault(),
    n.touchMoveStopPropagation && !n.nested && a.stopPropagation();
  let m = i.isHorizontal() ? u : g,
    T = i.isHorizontal() ? r.currentX - r.previousX : r.currentY - r.previousY;
  n.oneWayMovement &&
    ((m = Math.abs(m) * (o ? 1 : -1)), (T = Math.abs(T) * (o ? 1 : -1))),
    (r.diff = m),
    (m *= n.touchRatio),
    o && ((m = -m), (T = -T));
  const h = i.touchesDirection;
  (i.swipeDirection = m > 0 ? 'prev' : 'next'),
    (i.touchesDirection = T > 0 ? 'prev' : 'next');
  const x = i.params.loop && !n.cssMode;
  if (!s.isMoved) {
    if (
      (x && i.loopFix({ direction: i.swipeDirection }),
      (s.startTranslate = i.getTranslate()),
      i.setTransition(0),
      i.animating)
    ) {
      const I = new window.CustomEvent('transitionend', {
        bubbles: !0,
        cancelable: !0
      });
      i.wrapperEl.dispatchEvent(I);
    }
    (s.allowMomentumBounce = !1),
      n.grabCursor &&
        (i.allowSlideNext === !0 || i.allowSlidePrev === !0) &&
        i.setGrabCursor(!0),
      i.emit('sliderFirstMove', a);
  }
  let v;
  s.isMoved &&
    h !== i.touchesDirection &&
    x &&
    Math.abs(m) >= 1 &&
    (i.loopFix({ direction: i.swipeDirection, setTranslate: !0 }), (v = !0)),
    i.emit('sliderMove', a),
    (s.isMoved = !0),
    (s.currentTranslate = m + s.startTranslate);
  let S = !0,
    b = n.resistanceRatio;
  if (
    (n.touchReleaseOnEdges && (b = 0),
    m > 0
      ? (x &&
          !v &&
          s.currentTranslate >
            (n.centeredSlides
              ? i.minTranslate() - i.size / 2
              : i.minTranslate()) &&
          i.loopFix({
            direction: 'prev',
            setTranslate: !0,
            activeSlideIndex: 0
          }),
        s.currentTranslate > i.minTranslate() &&
          ((S = !1),
          n.resistance &&
            (s.currentTranslate =
              i.minTranslate() -
              1 +
              (-i.minTranslate() + s.startTranslate + m) ** b)))
      : m < 0 &&
        (x &&
          !v &&
          s.currentTranslate <
            (n.centeredSlides
              ? i.maxTranslate() + i.size / 2
              : i.maxTranslate()) &&
          i.loopFix({
            direction: 'next',
            setTranslate: !0,
            activeSlideIndex:
              i.slides.length -
              (n.slidesPerView === 'auto'
                ? i.slidesPerViewDynamic()
                : Math.ceil(parseFloat(n.slidesPerView, 10)))
          }),
        s.currentTranslate < i.maxTranslate() &&
          ((S = !1),
          n.resistance &&
            (s.currentTranslate =
              i.maxTranslate() +
              1 -
              (i.maxTranslate() - s.startTranslate - m) ** b))),
    S && (a.preventedByNestedSwiper = !0),
    !i.allowSlideNext &&
      i.swipeDirection === 'next' &&
      s.currentTranslate < s.startTranslate &&
      (s.currentTranslate = s.startTranslate),
    !i.allowSlidePrev &&
      i.swipeDirection === 'prev' &&
      s.currentTranslate > s.startTranslate &&
      (s.currentTranslate = s.startTranslate),
    !i.allowSlidePrev &&
      !i.allowSlideNext &&
      (s.currentTranslate = s.startTranslate),
    n.threshold > 0)
  )
    if (Math.abs(m) > n.threshold || s.allowThresholdMove) {
      if (!s.allowThresholdMove) {
        (s.allowThresholdMove = !0),
          (r.startX = r.currentX),
          (r.startY = r.currentY),
          (s.currentTranslate = s.startTranslate),
          (r.diff = i.isHorizontal()
            ? r.currentX - r.startX
            : r.currentY - r.startY);
        return;
      }
    } else {
      s.currentTranslate = s.startTranslate;
      return;
    }
  !n.followFinger ||
    n.cssMode ||
    (((n.freeMode && n.freeMode.enabled && i.freeMode) ||
      n.watchSlidesProgress) &&
      (i.updateActiveIndex(), i.updateSlidesClasses()),
    n.freeMode && n.freeMode.enabled && i.freeMode && i.freeMode.onTouchMove(),
    i.updateProgress(s.currentTranslate),
    i.setTranslate(s.currentTranslate));
}
function Tt(t) {
  const e = this,
    i = e.touchEventsData,
    s = i.evCache.findIndex((v) => v.pointerId === t.pointerId);
  if (
    (s >= 0 && i.evCache.splice(s, 1),
    ['pointercancel', 'pointerout', 'pointerleave', 'contextmenu'].includes(
      t.type
    ) &&
      !(
        ['pointercancel', 'contextmenu'].includes(t.type) &&
        (e.browser.isSafari || e.browser.isWebView)
      ))
  )
    return;
  const {
    params: n,
    touches: r,
    rtlTranslate: o,
    slidesGrid: l,
    enabled: a
  } = e;
  if (!a || (!n.simulateTouch && t.pointerType === 'mouse')) return;
  let d = t;
  if (
    (d.originalEvent && (d = d.originalEvent),
    i.allowTouchCallbacks && e.emit('touchEnd', d),
    (i.allowTouchCallbacks = !1),
    !i.isTouched)
  ) {
    i.isMoved && n.grabCursor && e.setGrabCursor(!1),
      (i.isMoved = !1),
      (i.startMoving = !1);
    return;
  }
  n.grabCursor &&
    i.isMoved &&
    i.isTouched &&
    (e.allowSlideNext === !0 || e.allowSlidePrev === !0) &&
    e.setGrabCursor(!1);
  const f = Y(),
    c = f - i.touchStartTime;
  if (e.allowClick) {
    const v = d.path || (d.composedPath && d.composedPath());
    e.updateClickedSlide((v && v[0]) || d.target),
      e.emit('tap click', d),
      c < 300 &&
        f - i.lastClickTime < 300 &&
        e.emit('doubleTap doubleClick', d);
  }
  if (
    ((i.lastClickTime = Y()),
    ee(() => {
      e.destroyed || (e.allowClick = !0);
    }),
    !i.isTouched ||
      !i.isMoved ||
      !e.swipeDirection ||
      r.diff === 0 ||
      i.currentTranslate === i.startTranslate)
  ) {
    (i.isTouched = !1), (i.isMoved = !1), (i.startMoving = !1);
    return;
  }
  (i.isTouched = !1), (i.isMoved = !1), (i.startMoving = !1);
  let p;
  if (
    (n.followFinger
      ? (p = o ? e.translate : -e.translate)
      : (p = -i.currentTranslate),
    n.cssMode)
  )
    return;
  if (n.freeMode && n.freeMode.enabled) {
    e.freeMode.onTouchEnd({ currentPos: p });
    return;
  }
  let u = 0,
    g = e.slidesSizesGrid[0];
  for (
    let v = 0;
    v < l.length;
    v += v < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup
  ) {
    const S = v < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
    typeof l[v + S] < 'u'
      ? p >= l[v] && p < l[v + S] && ((u = v), (g = l[v + S] - l[v]))
      : p >= l[v] && ((u = v), (g = l[l.length - 1] - l[l.length - 2]));
  }
  let m = null,
    T = null;
  n.rewind &&
    (e.isBeginning
      ? (T =
          n.virtual && n.virtual.enabled && e.virtual
            ? e.virtual.slides.length - 1
            : e.slides.length - 1)
      : e.isEnd && (m = 0));
  const h = (p - l[u]) / g,
    x = u < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
  if (c > n.longSwipesMs) {
    if (!n.longSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.swipeDirection === 'next' &&
      (h >= n.longSwipesRatio
        ? e.slideTo(n.rewind && e.isEnd ? m : u + x)
        : e.slideTo(u)),
      e.swipeDirection === 'prev' &&
        (h > 1 - n.longSwipesRatio
          ? e.slideTo(u + x)
          : T !== null && h < 0 && Math.abs(h) > n.longSwipesRatio
          ? e.slideTo(T)
          : e.slideTo(u));
  } else {
    if (!n.shortSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.navigation &&
    (d.target === e.navigation.nextEl || d.target === e.navigation.prevEl)
      ? d.target === e.navigation.nextEl
        ? e.slideTo(u + x)
        : e.slideTo(u)
      : (e.swipeDirection === 'next' && e.slideTo(m !== null ? m : u + x),
        e.swipeDirection === 'prev' && e.slideTo(T !== null ? T : u));
  }
}
function ae() {
  const t = this,
    { params: e, el: i } = t;
  if (i && i.offsetWidth === 0) return;
  e.breakpoints && t.setBreakpoint();
  const { allowSlideNext: s, allowSlidePrev: n, snapGrid: r } = t,
    o = t.virtual && t.params.virtual.enabled;
  (t.allowSlideNext = !0),
    (t.allowSlidePrev = !0),
    t.updateSize(),
    t.updateSlides(),
    t.updateSlidesClasses();
  const l = o && e.loop;
  (e.slidesPerView === 'auto' || e.slidesPerView > 1) &&
  t.isEnd &&
  !t.isBeginning &&
  !t.params.centeredSlides &&
  !l
    ? t.slideTo(t.slides.length - 1, 0, !1, !0)
    : t.params.loop && !o
    ? t.slideToLoop(t.realIndex, 0, !1, !0)
    : t.slideTo(t.activeIndex, 0, !1, !0),
    t.autoplay &&
      t.autoplay.running &&
      t.autoplay.paused &&
      (clearTimeout(t.autoplay.resizeTimeout),
      (t.autoplay.resizeTimeout = setTimeout(() => {
        t.autoplay &&
          t.autoplay.running &&
          t.autoplay.paused &&
          t.autoplay.resume();
      }, 500))),
    (t.allowSlidePrev = n),
    (t.allowSlideNext = s),
    t.params.watchOverflow && r !== t.snapGrid && t.checkOverflow();
}
function yt(t) {
  const e = this;
  e.enabled &&
    (e.allowClick ||
      (e.params.preventClicks && t.preventDefault(),
      e.params.preventClicksPropagation &&
        e.animating &&
        (t.stopPropagation(), t.stopImmediatePropagation())));
}
function xt() {
  const t = this,
    { wrapperEl: e, rtlTranslate: i, enabled: s } = t;
  if (!s) return;
  (t.previousTranslate = t.translate),
    t.isHorizontal()
      ? (t.translate = -e.scrollLeft)
      : (t.translate = -e.scrollTop),
    t.translate === 0 && (t.translate = 0),
    t.updateActiveIndex(),
    t.updateSlidesClasses();
  let n;
  const r = t.maxTranslate() - t.minTranslate();
  r === 0 ? (n = 0) : (n = (t.translate - t.minTranslate()) / r),
    n !== t.progress && t.updateProgress(i ? -t.translate : t.translate),
    t.emit('setTranslate', t.translate, !1);
}
function bt(t) {
  const e = this;
  X(e, t.target),
    !(
      e.params.cssMode ||
      (e.params.slidesPerView !== 'auto' && !e.params.autoHeight)
    ) && e.update();
}
let le = !1;
function Et() {}
const me = (t, e) => {
  const i = V(),
    { params: s, el: n, wrapperEl: r, device: o } = t,
    l = !!s.nested,
    a = e === 'on' ? 'addEventListener' : 'removeEventListener',
    d = e;
  n[a]('pointerdown', t.onTouchStart, { passive: !1 }),
    i[a]('pointermove', t.onTouchMove, { passive: !1, capture: l }),
    i[a]('pointerup', t.onTouchEnd, { passive: !0 }),
    i[a]('pointercancel', t.onTouchEnd, { passive: !0 }),
    i[a]('pointerout', t.onTouchEnd, { passive: !0 }),
    i[a]('pointerleave', t.onTouchEnd, { passive: !0 }),
    i[a]('contextmenu', t.onTouchEnd, { passive: !0 }),
    (s.preventClicks || s.preventClicksPropagation) &&
      n[a]('click', t.onClick, !0),
    s.cssMode && r[a]('scroll', t.onScroll),
    s.updateOnWindowResize
      ? t[d](
          o.ios || o.android
            ? 'resize orientationchange observerUpdate'
            : 'resize observerUpdate',
          ae,
          !0
        )
      : t[d]('observerUpdate', ae, !0),
    n[a]('load', t.onLoad, { capture: !0 });
};
function Pt() {
  const t = this,
    e = V(),
    { params: i } = t;
  (t.onTouchStart = wt.bind(t)),
    (t.onTouchMove = St.bind(t)),
    (t.onTouchEnd = Tt.bind(t)),
    i.cssMode && (t.onScroll = xt.bind(t)),
    (t.onClick = yt.bind(t)),
    (t.onLoad = bt.bind(t)),
    le || (e.addEventListener('touchstart', Et), (le = !0)),
    me(t, 'on');
}
function Mt() {
  me(this, 'off');
}
var Ct = { attachEvents: Pt, detachEvents: Mt };
const oe = (t, e) => t.grid && e.grid && e.grid.rows > 1;
function It() {
  const t = this,
    { realIndex: e, initialized: i, params: s, el: n } = t,
    r = s.breakpoints;
  if (!r || (r && Object.keys(r).length === 0)) return;
  const o = t.getBreakpoint(r, t.params.breakpointsBase, t.el);
  if (!o || t.currentBreakpoint === o) return;
  const a = (o in r ? r[o] : void 0) || t.originalParams,
    d = oe(t, s),
    f = oe(t, a),
    c = s.enabled;
  d && !f
    ? (n.classList.remove(
        `${s.containerModifierClass}grid`,
        `${s.containerModifierClass}grid-column`
      ),
      t.emitContainerClasses())
    : !d &&
      f &&
      (n.classList.add(`${s.containerModifierClass}grid`),
      ((a.grid.fill && a.grid.fill === 'column') ||
        (!a.grid.fill && s.grid.fill === 'column')) &&
        n.classList.add(`${s.containerModifierClass}grid-column`),
      t.emitContainerClasses()),
    ['navigation', 'pagination', 'scrollbar'].forEach((m) => {
      if (typeof a[m] > 'u') return;
      const T = s[m] && s[m].enabled,
        h = a[m] && a[m].enabled;
      T && !h && t[m].disable(), !T && h && t[m].enable();
    });
  const p = a.direction && a.direction !== s.direction,
    u = s.loop && (a.slidesPerView !== s.slidesPerView || p);
  p && i && t.changeDirection(), z(t.params, a);
  const g = t.params.enabled;
  Object.assign(t, {
    allowTouchMove: t.params.allowTouchMove,
    allowSlideNext: t.params.allowSlideNext,
    allowSlidePrev: t.params.allowSlidePrev
  }),
    c && !g ? t.disable() : !c && g && t.enable(),
    (t.currentBreakpoint = o),
    t.emit('_beforeBreakpoint', a),
    u && i && (t.loopDestroy(), t.loopCreate(e), t.updateSlides()),
    t.emit('breakpoint', a);
}
function Lt(t, e, i) {
  if ((e === void 0 && (e = 'window'), !t || (e === 'container' && !i))) return;
  let s = !1;
  const n = A(),
    r = e === 'window' ? n.innerHeight : i.clientHeight,
    o = Object.keys(t).map((l) => {
      if (typeof l == 'string' && l.indexOf('@') === 0) {
        const a = parseFloat(l.substr(1));
        return { value: r * a, point: l };
      }
      return { value: l, point: l };
    });
  o.sort((l, a) => parseInt(l.value, 10) - parseInt(a.value, 10));
  for (let l = 0; l < o.length; l += 1) {
    const { point: a, value: d } = o[l];
    e === 'window'
      ? n.matchMedia(`(min-width: ${d}px)`).matches && (s = a)
      : d <= i.clientWidth && (s = a);
  }
  return s || 'max';
}
var Ot = { setBreakpoint: It, getBreakpoint: Lt };
function zt(t, e) {
  const i = [];
  return (
    t.forEach((s) => {
      typeof s == 'object'
        ? Object.keys(s).forEach((n) => {
            s[n] && i.push(e + n);
          })
        : typeof s == 'string' && i.push(e + s);
    }),
    i
  );
}
function At() {
  const t = this,
    { classNames: e, params: i, rtl: s, el: n, device: r } = t,
    o = zt(
      [
        'initialized',
        i.direction,
        { 'free-mode': t.params.freeMode && i.freeMode.enabled },
        { autoheight: i.autoHeight },
        { rtl: s },
        { grid: i.grid && i.grid.rows > 1 },
        {
          'grid-column': i.grid && i.grid.rows > 1 && i.grid.fill === 'column'
        },
        { android: r.android },
        { ios: r.ios },
        { 'css-mode': i.cssMode },
        { centered: i.cssMode && i.centeredSlides },
        { 'watch-progress': i.watchSlidesProgress }
      ],
      i.containerModifierClass
    );
  e.push(...o), n.classList.add(...e), t.emitContainerClasses();
}
function Gt() {
  const t = this,
    { el: e, classNames: i } = t;
  e.classList.remove(...i), t.emitContainerClasses();
}
var Dt = { addClasses: At, removeClasses: Gt };
function kt() {
  const t = this,
    { isLocked: e, params: i } = t,
    { slidesOffsetBefore: s } = i;
  if (s) {
    const n = t.slides.length - 1,
      r = t.slidesGrid[n] + t.slidesSizesGrid[n] + s * 2;
    t.isLocked = t.size > r;
  } else t.isLocked = t.snapGrid.length === 1;
  i.allowSlideNext === !0 && (t.allowSlideNext = !t.isLocked),
    i.allowSlidePrev === !0 && (t.allowSlidePrev = !t.isLocked),
    e && e !== t.isLocked && (t.isEnd = !1),
    e !== t.isLocked && t.emit(t.isLocked ? 'lock' : 'unlock');
}
var Vt = { checkOverflow: kt },
  de = {
    init: !0,
    direction: 'horizontal',
    oneWayMovement: !1,
    touchEventsTarget: 'wrapper',
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: 'input, select, option, textarea, button, video, label',
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: 'slide',
    breakpoints: void 0,
    breakpointsBase: 'window',
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopedSlides: null,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: 'swiper-no-swiping',
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: 'swiper-',
    slideClass: 'swiper-slide',
    slideActiveClass: 'swiper-slide-active',
    slideVisibleClass: 'swiper-slide-visible',
    slideNextClass: 'swiper-slide-next',
    slidePrevClass: 'swiper-slide-prev',
    wrapperClass: 'swiper-wrapper',
    lazyPreloaderClass: 'swiper-lazy-preloader',
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1
  };
function Bt(t, e) {
  return function (s) {
    s === void 0 && (s = {});
    const n = Object.keys(s)[0],
      r = s[n];
    if (typeof r != 'object' || r === null) {
      z(e, s);
      return;
    }
    if (
      (['navigation', 'pagination', 'scrollbar'].indexOf(n) >= 0 &&
        t[n] === !0 &&
        (t[n] = { auto: !0 }),
      !(n in t && 'enabled' in r))
    ) {
      z(e, s);
      return;
    }
    t[n] === !0 && (t[n] = { enabled: !0 }),
      typeof t[n] == 'object' && !('enabled' in t[n]) && (t[n].enabled = !0),
      t[n] || (t[n] = { enabled: !1 }),
      z(e, s);
  };
}
const Q = {
    eventsEmitter: De,
    update: je,
    translate: Je,
    transition: tt,
    slide: dt,
    loop: pt,
    grabCursor: gt,
    events: Ct,
    breakpoints: Ot,
    checkOverflow: Vt,
    classes: Dt
  },
  Z = {};
class D {
  constructor() {
    let e, i;
    for (var s = arguments.length, n = new Array(s), r = 0; r < s; r++)
      n[r] = arguments[r];
    n.length === 1 &&
    n[0].constructor &&
    Object.prototype.toString.call(n[0]).slice(8, -1) === 'Object'
      ? (i = n[0])
      : ([e, i] = n),
      i || (i = {}),
      (i = z({}, i)),
      e && !i.el && (i.el = e);
    const o = V();
    if (
      i.el &&
      typeof i.el == 'string' &&
      o.querySelectorAll(i.el).length > 1
    ) {
      const f = [];
      return (
        o.querySelectorAll(i.el).forEach((c) => {
          const p = z({}, i, { el: c });
          f.push(new D(p));
        }),
        f
      );
    }
    const l = this;
    (l.__swiper__ = !0),
      (l.support = fe()),
      (l.device = Le({ userAgent: i.userAgent })),
      (l.browser = ze()),
      (l.eventsListeners = {}),
      (l.eventsAnyListeners = []),
      (l.modules = [...l.__modules__]),
      i.modules && Array.isArray(i.modules) && l.modules.push(...i.modules);
    const a = {};
    l.modules.forEach((f) => {
      f({
        params: i,
        swiper: l,
        extendParams: Bt(i, a),
        on: l.on.bind(l),
        once: l.once.bind(l),
        off: l.off.bind(l),
        emit: l.emit.bind(l)
      });
    });
    const d = z({}, de, a);
    return (
      (l.params = z({}, d, Z, i)),
      (l.originalParams = z({}, l.params)),
      (l.passedParams = z({}, i)),
      l.params &&
        l.params.on &&
        Object.keys(l.params.on).forEach((f) => {
          l.on(f, l.params.on[f]);
        }),
      l.params && l.params.onAny && l.onAny(l.params.onAny),
      Object.assign(l, {
        enabled: l.params.enabled,
        el: e,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return l.params.direction === 'horizontal';
        },
        isVertical() {
          return l.params.direction === 'vertical';
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
        },
        allowSlideNext: l.params.allowSlideNext,
        allowSlidePrev: l.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: l.params.focusableElements,
          lastClickTime: 0,
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          evCache: []
        },
        allowClick: !0,
        allowTouchMove: l.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0
      }),
      l.emit('_swiper'),
      l.params.init && l.init(),
      l
    );
  }
  getSlideIndex(e) {
    const { slidesEl: i, params: s } = this,
      n = B(i, `.${s.slideClass}, swiper-slide`),
      r = re(n[0]);
    return re(e) - r;
  }
  getSlideIndexByData(e) {
    return this.getSlideIndex(
      this.slides.filter(
        (i) => i.getAttribute('data-swiper-slide-index') * 1 === e
      )[0]
    );
  }
  recalcSlides() {
    const e = this,
      { slidesEl: i, params: s } = e;
    e.slides = B(i, `.${s.slideClass}, swiper-slide`);
  }
  enable() {
    const e = this;
    e.enabled ||
      ((e.enabled = !0),
      e.params.grabCursor && e.setGrabCursor(),
      e.emit('enable'));
  }
  disable() {
    const e = this;
    e.enabled &&
      ((e.enabled = !1),
      e.params.grabCursor && e.unsetGrabCursor(),
      e.emit('disable'));
  }
  setProgress(e, i) {
    const s = this;
    e = Math.min(Math.max(e, 0), 1);
    const n = s.minTranslate(),
      o = (s.maxTranslate() - n) * e + n;
    s.translateTo(o, typeof i > 'u' ? 0 : i),
      s.updateActiveIndex(),
      s.updateSlidesClasses();
  }
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const i = e.el.className
      .split(' ')
      .filter(
        (s) =>
          s.indexOf('swiper') === 0 ||
          s.indexOf(e.params.containerModifierClass) === 0
      );
    e.emit('_containerClasses', i.join(' '));
  }
  getSlideClasses(e) {
    const i = this;
    return i.destroyed
      ? ''
      : e.className
          .split(' ')
          .filter(
            (s) =>
              s.indexOf('swiper-slide') === 0 ||
              s.indexOf(i.params.slideClass) === 0
          )
          .join(' ');
  }
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const i = [];
    e.slides.forEach((s) => {
      const n = e.getSlideClasses(s);
      i.push({ slideEl: s, classNames: n }), e.emit('_slideClass', s, n);
    }),
      e.emit('_slideClasses', i);
  }
  slidesPerViewDynamic(e, i) {
    e === void 0 && (e = 'current'), i === void 0 && (i = !1);
    const s = this,
      {
        params: n,
        slides: r,
        slidesGrid: o,
        slidesSizesGrid: l,
        size: a,
        activeIndex: d
      } = s;
    let f = 1;
    if (n.centeredSlides) {
      let c = r[d] ? r[d].swiperSlideSize : 0,
        p;
      for (let u = d + 1; u < r.length; u += 1)
        r[u] &&
          !p &&
          ((c += r[u].swiperSlideSize), (f += 1), c > a && (p = !0));
      for (let u = d - 1; u >= 0; u -= 1)
        r[u] &&
          !p &&
          ((c += r[u].swiperSlideSize), (f += 1), c > a && (p = !0));
    } else if (e === 'current')
      for (let c = d + 1; c < r.length; c += 1)
        (i ? o[c] + l[c] - o[d] < a : o[c] - o[d] < a) && (f += 1);
    else for (let c = d - 1; c >= 0; c -= 1) o[d] - o[c] < a && (f += 1);
    return f;
  }
  update() {
    const e = this;
    if (!e || e.destroyed) return;
    const { snapGrid: i, params: s } = e;
    s.breakpoints && e.setBreakpoint(),
      [...e.el.querySelectorAll('[loading="lazy"]')].forEach((o) => {
        o.complete && X(e, o);
      }),
      e.updateSize(),
      e.updateSlides(),
      e.updateProgress(),
      e.updateSlidesClasses();
    function n() {
      const o = e.rtlTranslate ? e.translate * -1 : e.translate,
        l = Math.min(Math.max(o, e.maxTranslate()), e.minTranslate());
      e.setTranslate(l), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    let r;
    if (s.freeMode && s.freeMode.enabled && !s.cssMode)
      n(), s.autoHeight && e.updateAutoHeight();
    else {
      if (
        (s.slidesPerView === 'auto' || s.slidesPerView > 1) &&
        e.isEnd &&
        !s.centeredSlides
      ) {
        const o = e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
        r = e.slideTo(o.length - 1, 0, !1, !0);
      } else r = e.slideTo(e.activeIndex, 0, !1, !0);
      r || n();
    }
    s.watchOverflow && i !== e.snapGrid && e.checkOverflow(), e.emit('update');
  }
  changeDirection(e, i) {
    i === void 0 && (i = !0);
    const s = this,
      n = s.params.direction;
    return (
      e || (e = n === 'horizontal' ? 'vertical' : 'horizontal'),
      e === n ||
        (e !== 'horizontal' && e !== 'vertical') ||
        (s.el.classList.remove(`${s.params.containerModifierClass}${n}`),
        s.el.classList.add(`${s.params.containerModifierClass}${e}`),
        s.emitContainerClasses(),
        (s.params.direction = e),
        s.slides.forEach((r) => {
          e === 'vertical' ? (r.style.width = '') : (r.style.height = '');
        }),
        s.emit('changeDirection'),
        i && s.update()),
      s
    );
  }
  changeLanguageDirection(e) {
    const i = this;
    (i.rtl && e === 'rtl') ||
      (!i.rtl && e === 'ltr') ||
      ((i.rtl = e === 'rtl'),
      (i.rtlTranslate = i.params.direction === 'horizontal' && i.rtl),
      i.rtl
        ? (i.el.classList.add(`${i.params.containerModifierClass}rtl`),
          (i.el.dir = 'rtl'))
        : (i.el.classList.remove(`${i.params.containerModifierClass}rtl`),
          (i.el.dir = 'ltr')),
      i.update());
  }
  mount(e) {
    const i = this;
    if (i.mounted) return !0;
    let s = e || i.params.el;
    if ((typeof s == 'string' && (s = document.querySelector(s)), !s))
      return !1;
    (s.swiper = i),
      s.parentNode &&
        s.parentNode.host &&
        s.parentNode.host.nodeName === 'SWIPER-CONTAINER' &&
        (i.isElement = !0);
    const n = () =>
      `.${(i.params.wrapperClass || '').trim().split(' ').join('.')}`;
    let o = (() =>
      s && s.shadowRoot && s.shadowRoot.querySelector
        ? s.shadowRoot.querySelector(n())
        : B(s, n())[0])();
    return (
      !o &&
        i.params.createElements &&
        ((o = be('div', i.params.wrapperClass)),
        s.append(o),
        B(s, `.${i.params.slideClass}`).forEach((l) => {
          o.append(l);
        })),
      Object.assign(i, {
        el: s,
        wrapperEl: o,
        slidesEl:
          i.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : o,
        hostEl: i.isElement ? s.parentNode.host : s,
        mounted: !0,
        rtl: s.dir.toLowerCase() === 'rtl' || F(s, 'direction') === 'rtl',
        rtlTranslate:
          i.params.direction === 'horizontal' &&
          (s.dir.toLowerCase() === 'rtl' || F(s, 'direction') === 'rtl'),
        wrongRTL: F(o, 'display') === '-webkit-box'
      }),
      !0
    );
  }
  init(e) {
    const i = this;
    if (i.initialized || i.mount(e) === !1) return i;
    i.emit('beforeInit'),
      i.params.breakpoints && i.setBreakpoint(),
      i.addClasses(),
      i.updateSize(),
      i.updateSlides(),
      i.params.watchOverflow && i.checkOverflow(),
      i.params.grabCursor && i.enabled && i.setGrabCursor(),
      i.params.loop && i.virtual && i.params.virtual.enabled
        ? i.slideTo(
            i.params.initialSlide + i.virtual.slidesBefore,
            0,
            i.params.runCallbacksOnInit,
            !1,
            !0
          )
        : i.slideTo(
            i.params.initialSlide,
            0,
            i.params.runCallbacksOnInit,
            !1,
            !0
          ),
      i.params.loop && i.loopCreate(),
      i.attachEvents();
    const n = [...i.el.querySelectorAll('[loading="lazy"]')];
    return (
      i.isElement && n.push(...i.hostEl.querySelectorAll('[loading="lazy"]')),
      n.forEach((r) => {
        r.complete
          ? X(i, r)
          : r.addEventListener('load', (o) => {
              X(i, o.target);
            });
      }),
      te(i),
      (i.initialized = !0),
      te(i),
      i.emit('init'),
      i.emit('afterInit'),
      i
    );
  }
  destroy(e, i) {
    e === void 0 && (e = !0), i === void 0 && (i = !0);
    const s = this,
      { params: n, el: r, wrapperEl: o, slides: l } = s;
    return (
      typeof s.params > 'u' ||
        s.destroyed ||
        (s.emit('beforeDestroy'),
        (s.initialized = !1),
        s.detachEvents(),
        n.loop && s.loopDestroy(),
        i &&
          (s.removeClasses(),
          r.removeAttribute('style'),
          o.removeAttribute('style'),
          l &&
            l.length &&
            l.forEach((a) => {
              a.classList.remove(
                n.slideVisibleClass,
                n.slideActiveClass,
                n.slideNextClass,
                n.slidePrevClass
              ),
                a.removeAttribute('style'),
                a.removeAttribute('data-swiper-slide-index');
            })),
        s.emit('destroy'),
        Object.keys(s.eventsListeners).forEach((a) => {
          s.off(a);
        }),
        e !== !1 && ((s.el.swiper = null), Se(s)),
        (s.destroyed = !0)),
      null
    );
  }
  static extendDefaults(e) {
    z(Z, e);
  }
  static get extendedDefaults() {
    return Z;
  }
  static get defaults() {
    return de;
  }
  static installModule(e) {
    D.prototype.__modules__ || (D.prototype.__modules__ = []);
    const i = D.prototype.__modules__;
    typeof e == 'function' && i.indexOf(e) < 0 && i.push(e);
  }
  static use(e) {
    return Array.isArray(e)
      ? (e.forEach((i) => D.installModule(i)), D)
      : (D.installModule(e), D);
  }
}
Object.keys(Q).forEach((t) => {
  Object.keys(Q[t]).forEach((e) => {
    D.prototype[e] = Q[t][e];
  });
});
D.use([Ae, Ge]);
function Nt(t) {
  let { swiper: e, extendParams: i, on: s, emit: n, params: r } = t;
  (e.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
    i({
      autoplay: {
        enabled: !1,
        delay: 3e3,
        waitForTransition: !0,
        disableOnInteraction: !0,
        stopOnLastSlide: !1,
        reverseDirection: !1,
        pauseOnMouseEnter: !1
      }
    });
  let o,
    l,
    a = r && r.autoplay ? r.autoplay.delay : 3e3,
    d = r && r.autoplay ? r.autoplay.delay : 3e3,
    f,
    c = new Date().getTime,
    p,
    u,
    g,
    m,
    T,
    h;
  function x(C) {
    !e ||
      e.destroyed ||
      !e.wrapperEl ||
      (C.target === e.wrapperEl &&
        (e.wrapperEl.removeEventListener('transitionend', x), P()));
  }
  const v = () => {
      if (e.destroyed || !e.autoplay.running) return;
      e.autoplay.paused ? (p = !0) : p && ((d = f), (p = !1));
      const C = e.autoplay.paused ? f : c + d - new Date().getTime();
      (e.autoplay.timeLeft = C),
        n('autoplayTimeLeft', C, C / a),
        (l = requestAnimationFrame(() => {
          v();
        }));
    },
    S = () => {
      let C;
      return (
        e.virtual && e.params.virtual.enabled
          ? (C = e.slides.filter((O) =>
              O.classList.contains('swiper-slide-active')
            )[0])
          : (C = e.slides[e.activeIndex]),
        C ? parseInt(C.getAttribute('data-swiper-autoplay'), 10) : void 0
      );
    },
    b = (C) => {
      if (e.destroyed || !e.autoplay.running) return;
      cancelAnimationFrame(l), v();
      let k = typeof C > 'u' ? e.params.autoplay.delay : C;
      (a = e.params.autoplay.delay), (d = e.params.autoplay.delay);
      const O = S();
      !Number.isNaN(O) &&
        O > 0 &&
        typeof C > 'u' &&
        ((k = O), (a = O), (d = O)),
        (f = k);
      const N = e.params.speed,
        $ = () => {
          !e ||
            e.destroyed ||
            (e.params.autoplay.reverseDirection
              ? !e.isBeginning || e.params.loop || e.params.rewind
                ? (e.slidePrev(N, !0, !0), n('autoplay'))
                : e.params.autoplay.stopOnLastSlide ||
                  (e.slideTo(e.slides.length - 1, N, !0, !0), n('autoplay'))
              : !e.isEnd || e.params.loop || e.params.rewind
              ? (e.slideNext(N, !0, !0), n('autoplay'))
              : e.params.autoplay.stopOnLastSlide ||
                (e.slideTo(0, N, !0, !0), n('autoplay')),
            e.params.cssMode &&
              ((c = new Date().getTime()),
              requestAnimationFrame(() => {
                b();
              })));
        };
      return (
        k > 0
          ? (clearTimeout(o),
            (o = setTimeout(() => {
              $();
            }, k)))
          : requestAnimationFrame(() => {
              $();
            }),
        k
      );
    },
    I = () => {
      (e.autoplay.running = !0), b(), n('autoplayStart');
    },
    E = () => {
      (e.autoplay.running = !1),
        clearTimeout(o),
        cancelAnimationFrame(l),
        n('autoplayStop');
    },
    L = (C, k) => {
      if (e.destroyed || !e.autoplay.running) return;
      clearTimeout(o), C || (h = !0);
      const O = () => {
        n('autoplayPause'),
          e.params.autoplay.waitForTransition
            ? e.wrapperEl.addEventListener('transitionend', x)
            : P();
      };
      if (((e.autoplay.paused = !0), k)) {
        T && (f = e.params.autoplay.delay), (T = !1), O();
        return;
      }
      (f = (f || e.params.autoplay.delay) - (new Date().getTime() - c)),
        !(e.isEnd && f < 0 && !e.params.loop) && (f < 0 && (f = 0), O());
    },
    P = () => {
      (e.isEnd && f < 0 && !e.params.loop) ||
        e.destroyed ||
        !e.autoplay.running ||
        ((c = new Date().getTime()),
        h ? ((h = !1), b(f)) : b(),
        (e.autoplay.paused = !1),
        n('autoplayResume'));
    },
    H = () => {
      if (e.destroyed || !e.autoplay.running) return;
      const C = V();
      C.visibilityState === 'hidden' && ((h = !0), L(!0)),
        C.visibilityState === 'visible' && P();
    },
    w = (C) => {
      C.pointerType === 'mouse' &&
        ((h = !0), !(e.animating || e.autoplay.paused) && L(!0));
    },
    y = (C) => {
      C.pointerType === 'mouse' && e.autoplay.paused && P();
    },
    M = () => {
      e.params.autoplay.pauseOnMouseEnter &&
        (e.el.addEventListener('pointerenter', w),
        e.el.addEventListener('pointerleave', y));
    },
    G = () => {
      e.el.removeEventListener('pointerenter', w),
        e.el.removeEventListener('pointerleave', y);
    },
    _ = () => {
      V().addEventListener('visibilitychange', H);
    },
    R = () => {
      V().removeEventListener('visibilitychange', H);
    };
  s('init', () => {
    e.params.autoplay.enabled && (M(), _(), (c = new Date().getTime()), I());
  }),
    s('destroy', () => {
      G(), R(), e.autoplay.running && E();
    }),
    s('beforeTransitionStart', (C, k, O) => {
      e.destroyed ||
        !e.autoplay.running ||
        (O || !e.params.autoplay.disableOnInteraction ? L(!0, !0) : E());
    }),
    s('sliderFirstMove', () => {
      if (!(e.destroyed || !e.autoplay.running)) {
        if (e.params.autoplay.disableOnInteraction) {
          E();
          return;
        }
        (u = !0),
          (g = !1),
          (h = !1),
          (m = setTimeout(() => {
            (h = !0), (g = !0), L(!0);
          }, 200));
      }
    }),
    s('touchEnd', () => {
      if (!(e.destroyed || !e.autoplay.running || !u)) {
        if (
          (clearTimeout(m),
          clearTimeout(o),
          e.params.autoplay.disableOnInteraction)
        ) {
          (g = !1), (u = !1);
          return;
        }
        g && e.params.cssMode && P(), (g = !1), (u = !1);
      }
    }),
    s('slideChange', () => {
      e.destroyed || !e.autoplay.running || (T = !0);
    }),
    Object.assign(e.autoplay, { start: I, stop: E, pause: L, resume: P });
}
ve.data('caseSlider', () => ({
  init() {
    const t = this.$el.querySelector('.swiper');
    this.slider = new D(t, {
      modules: [Nt],
      autoplay: { delay: 0, disableOnInteraction: !1 },
      loop: !0,
      centeredSlides: !0,
      centeredSlidesBounds: !0,
      slidesPerView: 'auto',
      spaceBetween: 20,
      speed: 5e3,
      breakpoints: {
        760: { spaceBetween: 24, centeredSlides: !1, centeredSlidesBounds: !1 }
      },
      on: {
        init: (e) => {
          setTimeout(() => {
            e.update();
          }, 120);
        },
        resize: (e) => {
          setTimeout(() => {
            e.update();
          }, 120);
        }
      }
    });
  },
  slider: null,
  pauseSlider() {
    this.slider.autoplay.running &&
      setTimeout(() => {
        this.slider.autoplay.stop();
      }, 120);
  },
  resumeSlider() {
    setTimeout(() => {
      this.slider.autoplay.start();
    }, 120);
  }
}));
