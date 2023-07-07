function se(e) {
  return (
    e !== null &&
    typeof e == 'object' &&
    'constructor' in e &&
    e.constructor === Object
  );
}
function te(e = {}, t = {}) {
  Object.keys(t).forEach((i) => {
    typeof e[i] > 'u'
      ? (e[i] = t[i])
      : se(t[i]) && se(e[i]) && Object.keys(t[i]).length > 0 && te(e[i], t[i]);
  });
}
const ce = {
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
function _() {
  const e = typeof document < 'u' ? document : {};
  return te(e, ce), e;
}
const Se = {
  document: ce,
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
  requestAnimationFrame(e) {
    return typeof setTimeout > 'u' ? (e(), null) : setTimeout(e, 0);
  },
  cancelAnimationFrame(e) {
    typeof setTimeout > 'u' || clearTimeout(e);
  }
};
function A() {
  const e = typeof window < 'u' ? window : {};
  return te(e, Se), e;
}
function Te(e) {
  const t = e;
  Object.keys(t).forEach((i) => {
    try {
      t[i] = null;
    } catch {}
    try {
      delete t[i];
    } catch {}
  });
}
function Z(e, t = 0) {
  return setTimeout(e, t);
}
function q() {
  return Date.now();
}
function ye(e) {
  const t = A();
  let i;
  return (
    t.getComputedStyle && (i = t.getComputedStyle(e, null)),
    !i && e.currentStyle && (i = e.currentStyle),
    i || (i = e.style),
    i
  );
}
function be(e, t = 'x') {
  const i = A();
  let s, r, n;
  const l = ye(e);
  return (
    i.WebKitCSSMatrix
      ? ((r = l.transform || l.webkitTransform),
        r.split(',').length > 6 &&
          (r = r
            .split(', ')
            .map((a) => a.replace(',', '.'))
            .join(', ')),
        (n = new i.WebKitCSSMatrix(r === 'none' ? '' : r)))
      : ((n =
          l.MozTransform ||
          l.OTransform ||
          l.MsTransform ||
          l.msTransform ||
          l.transform ||
          l
            .getPropertyValue('transform')
            .replace('translate(', 'matrix(1, 0, 0, 1,')),
        (s = n.toString().split(','))),
    t === 'x' &&
      (i.WebKitCSSMatrix
        ? (r = n.m41)
        : s.length === 16
        ? (r = parseFloat(s[12]))
        : (r = parseFloat(s[4]))),
    t === 'y' &&
      (i.WebKitCSSMatrix
        ? (r = n.m42)
        : s.length === 16
        ? (r = parseFloat(s[13]))
        : (r = parseFloat(s[5]))),
    r || 0
  );
}
function j(e) {
  return (
    typeof e == 'object' &&
    e !== null &&
    e.constructor &&
    Object.prototype.toString.call(e).slice(8, -1) === 'Object'
  );
}
function we(e) {
  return typeof window < 'u' && typeof window.HTMLElement < 'u'
    ? e instanceof HTMLElement
    : e && (e.nodeType === 1 || e.nodeType === 11);
}
function k(...e) {
  const t = Object(e[0]),
    i = ['__proto__', 'constructor', 'prototype'];
  for (let s = 1; s < e.length; s += 1) {
    const r = e[s];
    if (r != null && !we(r)) {
      const n = Object.keys(Object(r)).filter((l) => i.indexOf(l) < 0);
      for (let l = 0, a = n.length; l < a; l += 1) {
        const o = n[l],
          d = Object.getOwnPropertyDescriptor(r, o);
        d !== void 0 &&
          d.enumerable &&
          (j(t[o]) && j(r[o])
            ? r[o].__swiper__
              ? (t[o] = r[o])
              : k(t[o], r[o])
            : !j(t[o]) && j(r[o])
            ? ((t[o] = {}), r[o].__swiper__ ? (t[o] = r[o]) : k(t[o], r[o]))
            : (t[o] = r[o]));
      }
    }
  }
  return t;
}
function W(e, t, i) {
  e.style.setProperty(t, i);
}
function ue({ swiper: e, targetPosition: t, side: i }) {
  const s = A(),
    r = -e.translate;
  let n = null,
    l;
  const a = e.params.speed;
  (e.wrapperEl.style.scrollSnapType = 'none'),
    s.cancelAnimationFrame(e.cssModeFrameID);
  const o = t > r ? 'next' : 'prev',
    d = (f, m) => (o === 'next' && f >= m) || (o === 'prev' && f <= m),
    h = () => {
      (l = new Date().getTime()), n === null && (n = l);
      const f = Math.max(Math.min((l - n) / a, 1), 0),
        m = 0.5 - Math.cos(f * Math.PI) / 2;
      let c = r + m * (t - r);
      if ((d(c, t) && (c = t), e.wrapperEl.scrollTo({ [i]: c }), d(c, t))) {
        (e.wrapperEl.style.overflow = 'hidden'),
          (e.wrapperEl.style.scrollSnapType = ''),
          setTimeout(() => {
            (e.wrapperEl.style.overflow = ''), e.wrapperEl.scrollTo({ [i]: c });
          }),
          s.cancelAnimationFrame(e.cssModeFrameID);
        return;
      }
      e.cssModeFrameID = s.requestAnimationFrame(h);
    };
  h();
}
function V(e, t = '') {
  return [...e.children].filter((i) => i.matches(t));
}
function fe(e, t = []) {
  const i = document.createElement(e);
  return i.classList.add(...(Array.isArray(t) ? t : [t])), i;
}
function xe(e, t) {
  const i = [];
  for (; e.previousElementSibling; ) {
    const s = e.previousElementSibling;
    t ? s.matches(t) && i.push(s) : i.push(s), (e = s);
  }
  return i;
}
function Ee(e, t) {
  const i = [];
  for (; e.nextElementSibling; ) {
    const s = e.nextElementSibling;
    t ? s.matches(t) && i.push(s) : i.push(s), (e = s);
  }
  return i;
}
function N(e, t) {
  return A().getComputedStyle(e, null).getPropertyValue(t);
}
function ne(e) {
  let t = e,
    i;
  if (t) {
    for (i = 0; (t = t.previousSibling) !== null; )
      t.nodeType === 1 && (i += 1);
    return i;
  }
}
function Me(e, t) {
  const i = [];
  let s = e.parentElement;
  for (; s; ) t ? s.matches(t) && i.push(s) : i.push(s), (s = s.parentElement);
  return i;
}
function re(e, t, i) {
  const s = A();
  return i
    ? e[t === 'width' ? 'offsetWidth' : 'offsetHeight'] +
        parseFloat(
          s
            .getComputedStyle(e, null)
            .getPropertyValue(t === 'width' ? 'margin-right' : 'margin-top')
        ) +
        parseFloat(
          s
            .getComputedStyle(e, null)
            .getPropertyValue(t === 'width' ? 'margin-left' : 'margin-bottom')
        )
    : e.offsetWidth;
}
let X;
function Ce() {
  const e = A(),
    t = _();
  return {
    smoothScroll:
      t.documentElement &&
      t.documentElement.style &&
      'scrollBehavior' in t.documentElement.style,
    touch: !!(
      'ontouchstart' in e ||
      (e.DocumentTouch && t instanceof e.DocumentTouch)
    )
  };
}
function pe() {
  return X || (X = Ce()), X;
}
let Y;
function Pe({ userAgent: e } = {}) {
  const t = pe(),
    i = A(),
    s = i.navigator.platform,
    r = e || i.navigator.userAgent,
    n = { ios: !1, android: !1 },
    l = i.screen.width,
    a = i.screen.height,
    o = r.match(/(Android);?[\s\/]+([\d.]+)?/);
  let d = r.match(/(iPad).*OS\s([\d_]+)/);
  const h = r.match(/(iPod)(.*OS\s([\d_]+))?/),
    f = !d && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    m = s === 'Win32';
  let c = s === 'MacIntel';
  const u = [
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
    !d &&
      c &&
      t.touch &&
      u.indexOf(`${l}x${a}`) >= 0 &&
      ((d = r.match(/(Version)\/([\d.]+)/)),
      d || (d = [0, 1, '13_0_0']),
      (c = !1)),
    o && !m && ((n.os = 'android'), (n.android = !0)),
    (d || f || h) && ((n.os = 'ios'), (n.ios = !0)),
    n
  );
}
function Le(e = {}) {
  return Y || (Y = Pe(e)), Y;
}
let U;
function Oe() {
  const e = A();
  let t = !1;
  function i() {
    const s = e.navigator.userAgent.toLowerCase();
    return (
      s.indexOf('safari') >= 0 &&
      s.indexOf('chrome') < 0 &&
      s.indexOf('android') < 0
    );
  }
  if (i()) {
    const s = String(e.navigator.userAgent);
    if (s.includes('Version/')) {
      const [r, n] = s
        .split('Version/')[1]
        .split(' ')[0]
        .split('.')
        .map((l) => Number(l));
      t = r < 16 || (r === 16 && n < 2);
    }
  }
  return {
    isSafari: t || i(),
    needPerspectiveFix: t,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      e.navigator.userAgent
    )
  };
}
function Ie() {
  return U || (U = Oe()), U;
}
function ze({ swiper: e, on: t, emit: i }) {
  const s = A();
  let r = null,
    n = null;
  const l = () => {
      !e || e.destroyed || !e.initialized || (i('beforeResize'), i('resize'));
    },
    a = () => {
      !e ||
        e.destroyed ||
        !e.initialized ||
        ((r = new ResizeObserver((h) => {
          n = s.requestAnimationFrame(() => {
            const { width: f, height: m } = e;
            let c = f,
              u = m;
            h.forEach(({ contentBoxSize: p, contentRect: v, target: g }) => {
              (g && g !== e.el) ||
                ((c = v ? v.width : (p[0] || p).inlineSize),
                (u = v ? v.height : (p[0] || p).blockSize));
            }),
              (c !== f || u !== m) && l();
          });
        })),
        r.observe(e.el));
    },
    o = () => {
      n && s.cancelAnimationFrame(n),
        r && r.unobserve && e.el && (r.unobserve(e.el), (r = null));
    },
    d = () => {
      !e || e.destroyed || !e.initialized || i('orientationchange');
    };
  t('init', () => {
    if (e.params.resizeObserver && typeof s.ResizeObserver < 'u') {
      a();
      return;
    }
    s.addEventListener('resize', l), s.addEventListener('orientationchange', d);
  }),
    t('destroy', () => {
      o(),
        s.removeEventListener('resize', l),
        s.removeEventListener('orientationchange', d);
    });
}
function ke({ swiper: e, extendParams: t, on: i, emit: s }) {
  const r = [],
    n = A(),
    l = (d, h = {}) => {
      const f = n.MutationObserver || n.WebkitMutationObserver,
        m = new f((c) => {
          if (e.__preventObserver__) return;
          if (c.length === 1) {
            s('observerUpdate', c[0]);
            return;
          }
          const u = function () {
            s('observerUpdate', c[0]);
          };
          n.requestAnimationFrame
            ? n.requestAnimationFrame(u)
            : n.setTimeout(u, 0);
        });
      m.observe(d, {
        attributes: typeof h.attributes > 'u' ? !0 : h.attributes,
        childList: typeof h.childList > 'u' ? !0 : h.childList,
        characterData: typeof h.characterData > 'u' ? !0 : h.characterData
      }),
        r.push(m);
    },
    a = () => {
      if (e.params.observer) {
        if (e.params.observeParents) {
          const d = Me(e.el);
          for (let h = 0; h < d.length; h += 1) l(d[h]);
        }
        l(e.el, { childList: e.params.observeSlideChildren }),
          l(e.wrapperEl, { attributes: !1 });
      }
    },
    o = () => {
      r.forEach((d) => {
        d.disconnect();
      }),
        r.splice(0, r.length);
    };
  t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
    i('init', a),
    i('destroy', o);
}
const Ae = {
  on(e, t, i) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof t != 'function') return s;
    const r = i ? 'unshift' : 'push';
    return (
      e.split(' ').forEach((n) => {
        s.eventsListeners[n] || (s.eventsListeners[n] = []),
          s.eventsListeners[n][r](t);
      }),
      s
    );
  },
  once(e, t, i) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof t != 'function') return s;
    function r(...n) {
      s.off(e, r), r.__emitterProxy && delete r.__emitterProxy, t.apply(s, n);
    }
    return (r.__emitterProxy = t), s.on(e, r, i);
  },
  onAny(e, t) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof e != 'function') return i;
    const s = t ? 'unshift' : 'push';
    return i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[s](e), i;
  },
  offAny(e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || !t.eventsAnyListeners) return t;
    const i = t.eventsAnyListeners.indexOf(e);
    return i >= 0 && t.eventsAnyListeners.splice(i, 1), t;
  },
  off(e, t) {
    const i = this;
    return (
      !i.eventsListeners ||
        i.destroyed ||
        !i.eventsListeners ||
        e.split(' ').forEach((s) => {
          typeof t > 'u'
            ? (i.eventsListeners[s] = [])
            : i.eventsListeners[s] &&
              i.eventsListeners[s].forEach((r, n) => {
                (r === t || (r.__emitterProxy && r.__emitterProxy === t)) &&
                  i.eventsListeners[s].splice(n, 1);
              });
        }),
      i
    );
  },
  emit(...e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || !t.eventsListeners) return t;
    let i, s, r;
    return (
      typeof e[0] == 'string' || Array.isArray(e[0])
        ? ((i = e[0]), (s = e.slice(1, e.length)), (r = t))
        : ((i = e[0].events), (s = e[0].data), (r = e[0].context || t)),
      s.unshift(r),
      (Array.isArray(i) ? i : i.split(' ')).forEach((l) => {
        t.eventsAnyListeners &&
          t.eventsAnyListeners.length &&
          t.eventsAnyListeners.forEach((a) => {
            a.apply(r, [l, ...s]);
          }),
          t.eventsListeners &&
            t.eventsListeners[l] &&
            t.eventsListeners[l].forEach((a) => {
              a.apply(r, s);
            });
      }),
      t
    );
  }
};
function Ge() {
  const e = this;
  let t, i;
  const s = e.el;
  typeof e.params.width < 'u' && e.params.width !== null
    ? (t = e.params.width)
    : (t = s.clientWidth),
    typeof e.params.height < 'u' && e.params.height !== null
      ? (i = e.params.height)
      : (i = s.clientHeight),
    !((t === 0 && e.isHorizontal()) || (i === 0 && e.isVertical())) &&
      ((t =
        t -
        parseInt(N(s, 'padding-left') || 0, 10) -
        parseInt(N(s, 'padding-right') || 0, 10)),
      (i =
        i -
        parseInt(N(s, 'padding-top') || 0, 10) -
        parseInt(N(s, 'padding-bottom') || 0, 10)),
      Number.isNaN(t) && (t = 0),
      Number.isNaN(i) && (i = 0),
      Object.assign(e, {
        width: t,
        height: i,
        size: e.isHorizontal() ? t : i
      }));
}
function De() {
  const e = this;
  function t(y) {
    return e.isHorizontal()
      ? y
      : {
          width: 'height',
          'margin-top': 'margin-left',
          'margin-bottom ': 'margin-right',
          'margin-left': 'margin-top',
          'margin-right': 'margin-bottom',
          'padding-left': 'padding-top',
          'padding-right': 'padding-bottom',
          marginRight: 'marginBottom'
        }[y];
  }
  function i(y, x) {
    return parseFloat(y.getPropertyValue(t(x)) || 0);
  }
  const s = e.params,
    { wrapperEl: r, slidesEl: n, size: l, rtlTranslate: a, wrongRTL: o } = e,
    d = e.virtual && s.virtual.enabled,
    h = d ? e.virtual.slides.length : e.slides.length,
    f = V(n, `.${e.params.slideClass}, swiper-slide`),
    m = d ? e.virtual.slides.length : f.length;
  let c = [];
  const u = [],
    p = [];
  let v = s.slidesOffsetBefore;
  typeof v == 'function' && (v = s.slidesOffsetBefore.call(e));
  let g = s.slidesOffsetAfter;
  typeof g == 'function' && (g = s.slidesOffsetAfter.call(e));
  const b = e.snapGrid.length,
    T = e.slidesGrid.length;
  let S = s.spaceBetween,
    E = -v,
    w = 0,
    P = 0;
  if (typeof l > 'u') return;
  typeof S == 'string' && S.indexOf('%') >= 0
    ? (S = (parseFloat(S.replace('%', '')) / 100) * l)
    : typeof S == 'string' && (S = parseFloat(S)),
    (e.virtualSize = -S),
    f.forEach((y) => {
      a ? (y.style.marginLeft = '') : (y.style.marginRight = ''),
        (y.style.marginBottom = ''),
        (y.style.marginTop = '');
    }),
    s.centeredSlides &&
      s.cssMode &&
      (W(r, '--swiper-centered-offset-before', ''),
      W(r, '--swiper-centered-offset-after', ''));
  const O = s.grid && s.grid.rows > 1 && e.grid;
  O && e.grid.initSlides(m);
  let L;
  const $ =
    s.slidesPerView === 'auto' &&
    s.breakpoints &&
    Object.keys(s.breakpoints).filter(
      (y) => typeof s.breakpoints[y].slidesPerView < 'u'
    ).length > 0;
  for (let y = 0; y < m; y += 1) {
    L = 0;
    let x;
    if (
      (f[y] && (x = f[y]),
      O && e.grid.updateSlide(y, x, m, t),
      !(f[y] && N(x, 'display') === 'none'))
    ) {
      if (s.slidesPerView === 'auto') {
        $ && (f[y].style[t('width')] = '');
        const M = getComputedStyle(x),
          G = x.style.transform,
          F = x.style.webkitTransform;
        if (
          (G && (x.style.transform = 'none'),
          F && (x.style.webkitTransform = 'none'),
          s.roundLengths)
        )
          L = e.isHorizontal() ? re(x, 'width', !0) : re(x, 'height', !0);
        else {
          const C = i(M, 'width'),
            D = i(M, 'padding-left'),
            I = i(M, 'padding-right'),
            B = i(M, 'margin-left'),
            H = i(M, 'margin-right'),
            ie = M.getPropertyValue('box-sizing');
          if (ie && ie === 'border-box') L = C + B + H;
          else {
            const { clientWidth: ge, offsetWidth: ve } = x;
            L = C + D + I + B + H + (ve - ge);
          }
        }
        G && (x.style.transform = G),
          F && (x.style.webkitTransform = F),
          s.roundLengths && (L = Math.floor(L));
      } else
        (L = (l - (s.slidesPerView - 1) * S) / s.slidesPerView),
          s.roundLengths && (L = Math.floor(L)),
          f[y] && (f[y].style[t('width')] = `${L}px`);
      f[y] && (f[y].swiperSlideSize = L),
        p.push(L),
        s.centeredSlides
          ? ((E = E + L / 2 + w / 2 + S),
            w === 0 && y !== 0 && (E = E - l / 2 - S),
            y === 0 && (E = E - l / 2 - S),
            Math.abs(E) < 1 / 1e3 && (E = 0),
            s.roundLengths && (E = Math.floor(E)),
            P % s.slidesPerGroup === 0 && c.push(E),
            u.push(E))
          : (s.roundLengths && (E = Math.floor(E)),
            (P - Math.min(e.params.slidesPerGroupSkip, P)) %
              e.params.slidesPerGroup ===
              0 && c.push(E),
            u.push(E),
            (E = E + L + S)),
        (e.virtualSize += L + S),
        (w = L),
        (P += 1);
    }
  }
  if (
    ((e.virtualSize = Math.max(e.virtualSize, l) + g),
    a &&
      o &&
      (s.effect === 'slide' || s.effect === 'coverflow') &&
      (r.style.width = `${e.virtualSize + S}px`),
    s.setWrapperSize && (r.style[t('width')] = `${e.virtualSize + S}px`),
    O && e.grid.updateWrapperSize(L, c, t),
    !s.centeredSlides)
  ) {
    const y = [];
    for (let x = 0; x < c.length; x += 1) {
      let M = c[x];
      s.roundLengths && (M = Math.floor(M)),
        c[x] <= e.virtualSize - l && y.push(M);
    }
    (c = y),
      Math.floor(e.virtualSize - l) - Math.floor(c[c.length - 1]) > 1 &&
        c.push(e.virtualSize - l);
  }
  if (d && s.loop) {
    const y = p[0] + S;
    if (s.slidesPerGroup > 1) {
      const x = Math.ceil(
          (e.virtual.slidesBefore + e.virtual.slidesAfter) / s.slidesPerGroup
        ),
        M = y * s.slidesPerGroup;
      for (let G = 0; G < x; G += 1) c.push(c[c.length - 1] + M);
    }
    for (let x = 0; x < e.virtual.slidesBefore + e.virtual.slidesAfter; x += 1)
      s.slidesPerGroup === 1 && c.push(c[c.length - 1] + y),
        u.push(u[u.length - 1] + y),
        (e.virtualSize += y);
  }
  if ((c.length === 0 && (c = [0]), S !== 0)) {
    const y = e.isHorizontal() && a ? 'marginLeft' : t('marginRight');
    f.filter((x, M) =>
      !s.cssMode || s.loop ? !0 : M !== f.length - 1
    ).forEach((x) => {
      x.style[y] = `${S}px`;
    });
  }
  if (s.centeredSlides && s.centeredSlidesBounds) {
    let y = 0;
    p.forEach((M) => {
      y += M + (S || 0);
    }),
      (y -= S);
    const x = y - l;
    c = c.map((M) => (M <= 0 ? -v : M > x ? x + g : M));
  }
  if (s.centerInsufficientSlides) {
    let y = 0;
    if (
      (p.forEach((x) => {
        y += x + (S || 0);
      }),
      (y -= S),
      y < l)
    ) {
      const x = (l - y) / 2;
      c.forEach((M, G) => {
        c[G] = M - x;
      }),
        u.forEach((M, G) => {
          u[G] = M + x;
        });
    }
  }
  if (
    (Object.assign(e, {
      slides: f,
      snapGrid: c,
      slidesGrid: u,
      slidesSizesGrid: p
    }),
    s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
  ) {
    W(r, '--swiper-centered-offset-before', `${-c[0]}px`),
      W(
        r,
        '--swiper-centered-offset-after',
        `${e.size / 2 - p[p.length - 1] / 2}px`
      );
    const y = -e.snapGrid[0],
      x = -e.slidesGrid[0];
    (e.snapGrid = e.snapGrid.map((M) => M + y)),
      (e.slidesGrid = e.slidesGrid.map((M) => M + x));
  }
  if (
    (m !== h && e.emit('slidesLengthChange'),
    c.length !== b &&
      (e.params.watchOverflow && e.checkOverflow(),
      e.emit('snapGridLengthChange')),
    u.length !== T && e.emit('slidesGridLengthChange'),
    s.watchSlidesProgress && e.updateSlidesOffset(),
    !d && !s.cssMode && (s.effect === 'slide' || s.effect === 'fade'))
  ) {
    const y = `${s.containerModifierClass}backface-hidden`,
      x = e.el.classList.contains(y);
    m <= s.maxBackfaceHiddenSlides
      ? x || e.el.classList.add(y)
      : x && e.el.classList.remove(y);
  }
}
function Ve(e) {
  const t = this,
    i = [],
    s = t.virtual && t.params.virtual.enabled;
  let r = 0,
    n;
  typeof e == 'number'
    ? t.setTransition(e)
    : e === !0 && t.setTransition(t.params.speed);
  const l = (a) => (s ? t.slides[t.getSlideIndexByData(a)] : t.slides[a]);
  if (t.params.slidesPerView !== 'auto' && t.params.slidesPerView > 1)
    if (t.params.centeredSlides)
      (t.visibleSlides || []).forEach((a) => {
        i.push(a);
      });
    else
      for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
        const a = t.activeIndex + n;
        if (a > t.slides.length && !s) break;
        i.push(l(a));
      }
  else i.push(l(t.activeIndex));
  for (n = 0; n < i.length; n += 1)
    if (typeof i[n] < 'u') {
      const a = i[n].offsetHeight;
      r = a > r ? a : r;
    }
  (r || r === 0) && (t.wrapperEl.style.height = `${r}px`);
}
function _e() {
  const e = this,
    t = e.slides,
    i = e.isElement
      ? e.isHorizontal()
        ? e.wrapperEl.offsetLeft
        : e.wrapperEl.offsetTop
      : 0;
  for (let s = 0; s < t.length; s += 1)
    t[s].swiperSlideOffset =
      (e.isHorizontal() ? t[s].offsetLeft : t[s].offsetTop) -
      i -
      e.cssOverflowAdjustment();
}
function Be(e = (this && this.translate) || 0) {
  const t = this,
    i = t.params,
    { slides: s, rtlTranslate: r, snapGrid: n } = t;
  if (s.length === 0) return;
  typeof s[0].swiperSlideOffset > 'u' && t.updateSlidesOffset();
  let l = -e;
  r && (l = e),
    s.forEach((o) => {
      o.classList.remove(i.slideVisibleClass);
    }),
    (t.visibleSlidesIndexes = []),
    (t.visibleSlides = []);
  let a = i.spaceBetween;
  typeof a == 'string' && a.indexOf('%') >= 0
    ? (a = (parseFloat(a.replace('%', '')) / 100) * t.size)
    : typeof a == 'string' && (a = parseFloat(a));
  for (let o = 0; o < s.length; o += 1) {
    const d = s[o];
    let h = d.swiperSlideOffset;
    i.cssMode && i.centeredSlides && (h -= s[0].swiperSlideOffset);
    const f =
        (l + (i.centeredSlides ? t.minTranslate() : 0) - h) /
        (d.swiperSlideSize + a),
      m =
        (l - n[0] + (i.centeredSlides ? t.minTranslate() : 0) - h) /
        (d.swiperSlideSize + a),
      c = -(l - h),
      u = c + t.slidesSizesGrid[o];
    ((c >= 0 && c < t.size - 1) ||
      (u > 1 && u <= t.size) ||
      (c <= 0 && u >= t.size)) &&
      (t.visibleSlides.push(d),
      t.visibleSlidesIndexes.push(o),
      s[o].classList.add(i.slideVisibleClass)),
      (d.progress = r ? -f : f),
      (d.originalProgress = r ? -m : m);
  }
}
function Ne(e) {
  const t = this;
  if (typeof e > 'u') {
    const h = t.rtlTranslate ? -1 : 1;
    e = (t && t.translate && t.translate * h) || 0;
  }
  const i = t.params,
    s = t.maxTranslate() - t.minTranslate();
  let { progress: r, isBeginning: n, isEnd: l, progressLoop: a } = t;
  const o = n,
    d = l;
  if (s === 0) (r = 0), (n = !0), (l = !0);
  else {
    r = (e - t.minTranslate()) / s;
    const h = Math.abs(e - t.minTranslate()) < 1,
      f = Math.abs(e - t.maxTranslate()) < 1;
    (n = h || r <= 0), (l = f || r >= 1), h && (r = 0), f && (r = 1);
  }
  if (i.loop) {
    const h = t.getSlideIndexByData(0),
      f = t.getSlideIndexByData(t.slides.length - 1),
      m = t.slidesGrid[h],
      c = t.slidesGrid[f],
      u = t.slidesGrid[t.slidesGrid.length - 1],
      p = Math.abs(e);
    p >= m ? (a = (p - m) / u) : (a = (p + u - c) / u), a > 1 && (a -= 1);
  }
  Object.assign(t, { progress: r, progressLoop: a, isBeginning: n, isEnd: l }),
    (i.watchSlidesProgress || (i.centeredSlides && i.autoHeight)) &&
      t.updateSlidesProgress(e),
    n && !o && t.emit('reachBeginning toEdge'),
    l && !d && t.emit('reachEnd toEdge'),
    ((o && !n) || (d && !l)) && t.emit('fromEdge'),
    t.emit('progress', r);
}
function Fe() {
  const e = this,
    { slides: t, params: i, slidesEl: s, activeIndex: r } = e,
    n = e.virtual && i.virtual.enabled,
    l = (o) => V(s, `.${i.slideClass}${o}, swiper-slide${o}`)[0];
  t.forEach((o) => {
    o.classList.remove(i.slideActiveClass, i.slideNextClass, i.slidePrevClass);
  });
  let a;
  if (n)
    if (i.loop) {
      let o = r - e.virtual.slidesBefore;
      o < 0 && (o = e.virtual.slides.length + o),
        o >= e.virtual.slides.length && (o -= e.virtual.slides.length),
        (a = l(`[data-swiper-slide-index="${o}"]`));
    } else a = l(`[data-swiper-slide-index="${r}"]`);
  else a = t[r];
  if (a) {
    a.classList.add(i.slideActiveClass);
    let o = Ee(a, `.${i.slideClass}, swiper-slide`)[0];
    i.loop && !o && (o = t[0]), o && o.classList.add(i.slideNextClass);
    let d = xe(a, `.${i.slideClass}, swiper-slide`)[0];
    i.loop && !d === 0 && (d = t[t.length - 1]),
      d && d.classList.add(i.slidePrevClass);
  }
  e.emitSlidesClasses();
}
const R = (e, t) => {
    if (!e || e.destroyed || !e.params) return;
    const i = () => (e.isElement ? 'swiper-slide' : `.${e.params.slideClass}`),
      s = t.closest(i());
    if (s) {
      const r = s.querySelector(`.${e.params.lazyPreloaderClass}`);
      r && r.remove();
    }
  },
  K = (e, t) => {
    if (!e.slides[t]) return;
    const i = e.slides[t].querySelector('[loading="lazy"]');
    i && i.removeAttribute('loading');
  },
  ee = (e) => {
    if (!e || e.destroyed || !e.params) return;
    let t = e.params.lazyPreloadPrevNext;
    const i = e.slides.length;
    if (!i || !t || t < 0) return;
    t = Math.min(t, i);
    const s =
        e.params.slidesPerView === 'auto'
          ? e.slidesPerViewDynamic()
          : Math.ceil(e.params.slidesPerView),
      r = e.activeIndex;
    if (e.params.grid && e.params.grid.rows > 1) {
      const l = r,
        a = [l - t];
      a.push(...Array.from({ length: t }).map((o, d) => l + s + d)),
        e.slides.forEach((o, d) => {
          a.includes(o.column) && K(e, d);
        });
      return;
    }
    const n = r + s - 1;
    if (e.params.rewind || e.params.loop)
      for (let l = r - t; l <= n + t; l += 1) {
        const a = ((l % i) + i) % i;
        (a < r || a > n) && K(e, a);
      }
    else
      for (let l = Math.max(r - t, 0); l <= Math.min(n + t, i - 1); l += 1)
        l !== r && (l > n || l < r) && K(e, l);
  };
function He(e) {
  const { slidesGrid: t, params: i } = e,
    s = e.rtlTranslate ? e.translate : -e.translate;
  let r;
  for (let n = 0; n < t.length; n += 1)
    typeof t[n + 1] < 'u'
      ? s >= t[n] && s < t[n + 1] - (t[n + 1] - t[n]) / 2
        ? (r = n)
        : s >= t[n] && s < t[n + 1] && (r = n + 1)
      : s >= t[n] && (r = n);
  return i.normalizeSlideIndex && (r < 0 || typeof r > 'u') && (r = 0), r;
}
function $e(e) {
  const t = this,
    i = t.rtlTranslate ? t.translate : -t.translate,
    { snapGrid: s, params: r, activeIndex: n, realIndex: l, snapIndex: a } = t;
  let o = e,
    d;
  const h = (m) => {
    let c = m - t.virtual.slidesBefore;
    return (
      c < 0 && (c = t.virtual.slides.length + c),
      c >= t.virtual.slides.length && (c -= t.virtual.slides.length),
      c
    );
  };
  if ((typeof o > 'u' && (o = He(t)), s.indexOf(i) >= 0)) d = s.indexOf(i);
  else {
    const m = Math.min(r.slidesPerGroupSkip, o);
    d = m + Math.floor((o - m) / r.slidesPerGroup);
  }
  if ((d >= s.length && (d = s.length - 1), o === n)) {
    d !== a && ((t.snapIndex = d), t.emit('snapIndexChange')),
      t.params.loop &&
        t.virtual &&
        t.params.virtual.enabled &&
        (t.realIndex = h(o));
    return;
  }
  let f;
  t.virtual && r.virtual.enabled && r.loop
    ? (f = h(o))
    : t.slides[o]
    ? (f = parseInt(
        t.slides[o].getAttribute('data-swiper-slide-index') || o,
        10
      ))
    : (f = o),
    Object.assign(t, {
      previousSnapIndex: a,
      snapIndex: d,
      previousRealIndex: l,
      realIndex: f,
      previousIndex: n,
      activeIndex: o
    }),
    t.initialized && ee(t),
    t.emit('activeIndexChange'),
    t.emit('snapIndexChange'),
    l !== f && t.emit('realIndexChange'),
    (t.initialized || t.params.runCallbacksOnInit) && t.emit('slideChange');
}
function je(e) {
  const t = this,
    i = t.params,
    s = e.closest(`.${i.slideClass}, swiper-slide`);
  let r = !1,
    n;
  if (s) {
    for (let l = 0; l < t.slides.length; l += 1)
      if (t.slides[l] === s) {
        (r = !0), (n = l);
        break;
      }
  }
  if (s && r)
    (t.clickedSlide = s),
      t.virtual && t.params.virtual.enabled
        ? (t.clickedIndex = parseInt(
            s.getAttribute('data-swiper-slide-index'),
            10
          ))
        : (t.clickedIndex = n);
  else {
    (t.clickedSlide = void 0), (t.clickedIndex = void 0);
    return;
  }
  i.slideToClickedSlide &&
    t.clickedIndex !== void 0 &&
    t.clickedIndex !== t.activeIndex &&
    t.slideToClickedSlide();
}
const We = {
  updateSize: Ge,
  updateSlides: De,
  updateAutoHeight: Ve,
  updateSlidesOffset: _e,
  updateSlidesProgress: Be,
  updateProgress: Ne,
  updateSlidesClasses: Fe,
  updateActiveIndex: $e,
  updateClickedSlide: je
};
function Re(e = this.isHorizontal() ? 'x' : 'y') {
  const t = this,
    { params: i, rtlTranslate: s, translate: r, wrapperEl: n } = t;
  if (i.virtualTranslate) return s ? -r : r;
  if (i.cssMode) return r;
  let l = be(n, e);
  return (l += t.cssOverflowAdjustment()), s && (l = -l), l || 0;
}
function qe(e, t) {
  const i = this,
    { rtlTranslate: s, params: r, wrapperEl: n, progress: l } = i;
  let a = 0,
    o = 0;
  const d = 0;
  i.isHorizontal() ? (a = s ? -e : e) : (o = e),
    r.roundLengths && ((a = Math.floor(a)), (o = Math.floor(o))),
    (i.previousTranslate = i.translate),
    (i.translate = i.isHorizontal() ? a : o),
    r.cssMode
      ? (n[i.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = i.isHorizontal()
          ? -a
          : -o)
      : r.virtualTranslate ||
        (i.isHorizontal()
          ? (a -= i.cssOverflowAdjustment())
          : (o -= i.cssOverflowAdjustment()),
        (n.style.transform = `translate3d(${a}px, ${o}px, ${d}px)`));
  let h;
  const f = i.maxTranslate() - i.minTranslate();
  f === 0 ? (h = 0) : (h = (e - i.minTranslate()) / f),
    h !== l && i.updateProgress(e),
    i.emit('setTranslate', i.translate, t);
}
function Xe() {
  return -this.snapGrid[0];
}
function Ye() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function Ue(e = 0, t = this.params.speed, i = !0, s = !0, r) {
  const n = this,
    { params: l, wrapperEl: a } = n;
  if (n.animating && l.preventInteractionOnTransition) return !1;
  const o = n.minTranslate(),
    d = n.maxTranslate();
  let h;
  if (
    (s && e > o ? (h = o) : s && e < d ? (h = d) : (h = e),
    n.updateProgress(h),
    l.cssMode)
  ) {
    const f = n.isHorizontal();
    if (t === 0) a[f ? 'scrollLeft' : 'scrollTop'] = -h;
    else {
      if (!n.support.smoothScroll)
        return (
          ue({ swiper: n, targetPosition: -h, side: f ? 'left' : 'top' }), !0
        );
      a.scrollTo({ [f ? 'left' : 'top']: -h, behavior: 'smooth' });
    }
    return !0;
  }
  return (
    t === 0
      ? (n.setTransition(0),
        n.setTranslate(h),
        i && (n.emit('beforeTransitionStart', t, r), n.emit('transitionEnd')))
      : (n.setTransition(t),
        n.setTranslate(h),
        i && (n.emit('beforeTransitionStart', t, r), n.emit('transitionStart')),
        n.animating ||
          ((n.animating = !0),
          n.onTranslateToWrapperTransitionEnd ||
            (n.onTranslateToWrapperTransitionEnd = function (m) {
              !n ||
                n.destroyed ||
                (m.target === this &&
                  (n.wrapperEl.removeEventListener(
                    'transitionend',
                    n.onTranslateToWrapperTransitionEnd
                  ),
                  (n.onTranslateToWrapperTransitionEnd = null),
                  delete n.onTranslateToWrapperTransitionEnd,
                  i && n.emit('transitionEnd')));
            }),
          n.wrapperEl.addEventListener(
            'transitionend',
            n.onTranslateToWrapperTransitionEnd
          ))),
    !0
  );
}
const Ke = {
  getTranslate: Re,
  setTranslate: qe,
  minTranslate: Xe,
  maxTranslate: Ye,
  translateTo: Ue
};
function Je(e, t) {
  const i = this;
  i.params.cssMode || (i.wrapperEl.style.transitionDuration = `${e}ms`),
    i.emit('setTransition', e, t);
}
function me({ swiper: e, runCallbacks: t, direction: i, step: s }) {
  const { activeIndex: r, previousIndex: n } = e;
  let l = i;
  if (
    (l || (r > n ? (l = 'next') : r < n ? (l = 'prev') : (l = 'reset')),
    e.emit(`transition${s}`),
    t && r !== n)
  ) {
    if (l === 'reset') {
      e.emit(`slideResetTransition${s}`);
      return;
    }
    e.emit(`slideChangeTransition${s}`),
      l === 'next'
        ? e.emit(`slideNextTransition${s}`)
        : e.emit(`slidePrevTransition${s}`);
  }
}
function Qe(e = !0, t) {
  const i = this,
    { params: s } = i;
  s.cssMode ||
    (s.autoHeight && i.updateAutoHeight(),
    me({ swiper: i, runCallbacks: e, direction: t, step: 'Start' }));
}
function Ze(e = !0, t) {
  const i = this,
    { params: s } = i;
  (i.animating = !1),
    !s.cssMode &&
      (i.setTransition(0),
      me({ swiper: i, runCallbacks: e, direction: t, step: 'End' }));
}
const et = { setTransition: Je, transitionStart: Qe, transitionEnd: Ze };
function tt(e = 0, t = this.params.speed, i = !0, s, r) {
  typeof e == 'string' && (e = parseInt(e, 10));
  const n = this;
  let l = e;
  l < 0 && (l = 0);
  const {
    params: a,
    snapGrid: o,
    slidesGrid: d,
    previousIndex: h,
    activeIndex: f,
    rtlTranslate: m,
    wrapperEl: c,
    enabled: u
  } = n;
  if ((n.animating && a.preventInteractionOnTransition) || (!u && !s && !r))
    return !1;
  const p = Math.min(n.params.slidesPerGroupSkip, l);
  let v = p + Math.floor((l - p) / n.params.slidesPerGroup);
  v >= o.length && (v = o.length - 1);
  const g = -o[v];
  if (a.normalizeSlideIndex)
    for (let T = 0; T < d.length; T += 1) {
      const S = -Math.floor(g * 100),
        E = Math.floor(d[T] * 100),
        w = Math.floor(d[T + 1] * 100);
      typeof d[T + 1] < 'u'
        ? S >= E && S < w - (w - E) / 2
          ? (l = T)
          : S >= E && S < w && (l = T + 1)
        : S >= E && (l = T);
    }
  if (
    n.initialized &&
    l !== f &&
    ((!n.allowSlideNext &&
      (m
        ? g > n.translate && g > n.minTranslate()
        : g < n.translate && g < n.minTranslate())) ||
      (!n.allowSlidePrev &&
        g > n.translate &&
        g > n.maxTranslate() &&
        (f || 0) !== l))
  )
    return !1;
  l !== (h || 0) && i && n.emit('beforeSlideChangeStart'), n.updateProgress(g);
  let b;
  if (
    (l > f ? (b = 'next') : l < f ? (b = 'prev') : (b = 'reset'),
    (m && -g === n.translate) || (!m && g === n.translate))
  )
    return (
      n.updateActiveIndex(l),
      a.autoHeight && n.updateAutoHeight(),
      n.updateSlidesClasses(),
      a.effect !== 'slide' && n.setTranslate(g),
      b !== 'reset' && (n.transitionStart(i, b), n.transitionEnd(i, b)),
      !1
    );
  if (a.cssMode) {
    const T = n.isHorizontal(),
      S = m ? g : -g;
    if (t === 0) {
      const E = n.virtual && n.params.virtual.enabled;
      E &&
        ((n.wrapperEl.style.scrollSnapType = 'none'),
        (n._immediateVirtual = !0)),
        E && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0
          ? ((n._cssModeVirtualInitialSet = !0),
            requestAnimationFrame(() => {
              c[T ? 'scrollLeft' : 'scrollTop'] = S;
            }))
          : (c[T ? 'scrollLeft' : 'scrollTop'] = S),
        E &&
          requestAnimationFrame(() => {
            (n.wrapperEl.style.scrollSnapType = ''), (n._immediateVirtual = !1);
          });
    } else {
      if (!n.support.smoothScroll)
        return (
          ue({ swiper: n, targetPosition: S, side: T ? 'left' : 'top' }), !0
        );
      c.scrollTo({ [T ? 'left' : 'top']: S, behavior: 'smooth' });
    }
    return !0;
  }
  return (
    n.setTransition(t),
    n.setTranslate(g),
    n.updateActiveIndex(l),
    n.updateSlidesClasses(),
    n.emit('beforeTransitionStart', t, s),
    n.transitionStart(i, b),
    t === 0
      ? n.transitionEnd(i, b)
      : n.animating ||
        ((n.animating = !0),
        n.onSlideToWrapperTransitionEnd ||
          (n.onSlideToWrapperTransitionEnd = function (S) {
            !n ||
              n.destroyed ||
              (S.target === this &&
                (n.wrapperEl.removeEventListener(
                  'transitionend',
                  n.onSlideToWrapperTransitionEnd
                ),
                (n.onSlideToWrapperTransitionEnd = null),
                delete n.onSlideToWrapperTransitionEnd,
                n.transitionEnd(i, b)));
          }),
        n.wrapperEl.addEventListener(
          'transitionend',
          n.onSlideToWrapperTransitionEnd
        )),
    !0
  );
}
function it(e = 0, t = this.params.speed, i = !0, s) {
  typeof e == 'string' && (e = parseInt(e, 10));
  const r = this;
  let n = e;
  return (
    r.params.loop &&
      (r.virtual && r.params.virtual.enabled
        ? (n = n + r.virtual.slidesBefore)
        : (n = r.getSlideIndexByData(n))),
    r.slideTo(n, t, i, s)
  );
}
function st(e = this.params.speed, t = !0, i) {
  const s = this,
    { enabled: r, params: n, animating: l } = s;
  if (!r) return s;
  let a = n.slidesPerGroup;
  n.slidesPerView === 'auto' &&
    n.slidesPerGroup === 1 &&
    n.slidesPerGroupAuto &&
    (a = Math.max(s.slidesPerViewDynamic('current', !0), 1));
  const o = s.activeIndex < n.slidesPerGroupSkip ? 1 : a,
    d = s.virtual && n.virtual.enabled;
  if (n.loop) {
    if (l && !d && n.loopPreventsSliding) return !1;
    s.loopFix({ direction: 'next' }), (s._clientLeft = s.wrapperEl.clientLeft);
  }
  return n.rewind && s.isEnd
    ? s.slideTo(0, e, t, i)
    : s.slideTo(s.activeIndex + o, e, t, i);
}
function nt(e = this.params.speed, t = !0, i) {
  const s = this,
    {
      params: r,
      snapGrid: n,
      slidesGrid: l,
      rtlTranslate: a,
      enabled: o,
      animating: d
    } = s;
  if (!o) return s;
  const h = s.virtual && r.virtual.enabled;
  if (r.loop) {
    if (d && !h && r.loopPreventsSliding) return !1;
    s.loopFix({ direction: 'prev' }), (s._clientLeft = s.wrapperEl.clientLeft);
  }
  const f = a ? s.translate : -s.translate;
  function m(g) {
    return g < 0 ? -Math.floor(Math.abs(g)) : Math.floor(g);
  }
  const c = m(f),
    u = n.map((g) => m(g));
  let p = n[u.indexOf(c) - 1];
  if (typeof p > 'u' && r.cssMode) {
    let g;
    n.forEach((b, T) => {
      c >= b && (g = T);
    }),
      typeof g < 'u' && (p = n[g > 0 ? g - 1 : g]);
  }
  let v = 0;
  if (
    (typeof p < 'u' &&
      ((v = l.indexOf(p)),
      v < 0 && (v = s.activeIndex - 1),
      r.slidesPerView === 'auto' &&
        r.slidesPerGroup === 1 &&
        r.slidesPerGroupAuto &&
        ((v = v - s.slidesPerViewDynamic('previous', !0) + 1),
        (v = Math.max(v, 0)))),
    r.rewind && s.isBeginning)
  ) {
    const g =
      s.params.virtual && s.params.virtual.enabled && s.virtual
        ? s.virtual.slides.length - 1
        : s.slides.length - 1;
    return s.slideTo(g, e, t, i);
  }
  return s.slideTo(v, e, t, i);
}
function rt(e = this.params.speed, t = !0, i) {
  const s = this;
  return s.slideTo(s.activeIndex, e, t, i);
}
function at(e = this.params.speed, t = !0, i, s = 0.5) {
  const r = this;
  let n = r.activeIndex;
  const l = Math.min(r.params.slidesPerGroupSkip, n),
    a = l + Math.floor((n - l) / r.params.slidesPerGroup),
    o = r.rtlTranslate ? r.translate : -r.translate;
  if (o >= r.snapGrid[a]) {
    const d = r.snapGrid[a],
      h = r.snapGrid[a + 1];
    o - d > (h - d) * s && (n += r.params.slidesPerGroup);
  } else {
    const d = r.snapGrid[a - 1],
      h = r.snapGrid[a];
    o - d <= (h - d) * s && (n -= r.params.slidesPerGroup);
  }
  return (
    (n = Math.max(n, 0)),
    (n = Math.min(n, r.slidesGrid.length - 1)),
    r.slideTo(n, e, t, i)
  );
}
function lt() {
  const e = this,
    { params: t, slidesEl: i } = e,
    s = t.slidesPerView === 'auto' ? e.slidesPerViewDynamic() : t.slidesPerView;
  let r = e.clickedIndex,
    n;
  const l = e.isElement ? 'swiper-slide' : `.${t.slideClass}`;
  if (t.loop) {
    if (e.animating) return;
    (n = parseInt(e.clickedSlide.getAttribute('data-swiper-slide-index'), 10)),
      t.centeredSlides
        ? r < e.loopedSlides - s / 2 ||
          r > e.slides.length - e.loopedSlides + s / 2
          ? (e.loopFix(),
            (r = e.getSlideIndex(
              V(i, `${l}[data-swiper-slide-index="${n}"]`)[0]
            )),
            Z(() => {
              e.slideTo(r);
            }))
          : e.slideTo(r)
        : r > e.slides.length - s
        ? (e.loopFix(),
          (r = e.getSlideIndex(
            V(i, `${l}[data-swiper-slide-index="${n}"]`)[0]
          )),
          Z(() => {
            e.slideTo(r);
          }))
        : e.slideTo(r);
  } else e.slideTo(r);
}
const ot = {
  slideTo: tt,
  slideToLoop: it,
  slideNext: st,
  slidePrev: nt,
  slideReset: rt,
  slideToClosest: at,
  slideToClickedSlide: lt
};
function dt(e) {
  const t = this,
    { params: i, slidesEl: s } = t;
  if (!i.loop || (t.virtual && t.params.virtual.enabled)) return;
  V(s, `.${i.slideClass}, swiper-slide`).forEach((n, l) => {
    n.setAttribute('data-swiper-slide-index', l);
  }),
    t.loopFix({
      slideRealIndex: e,
      direction: i.centeredSlides ? void 0 : 'next'
    });
}
function ct({
  slideRealIndex: e,
  slideTo: t = !0,
  direction: i,
  setTranslate: s,
  activeSlideIndex: r,
  byController: n,
  byMousewheel: l
} = {}) {
  const a = this;
  if (!a.params.loop) return;
  a.emit('beforeLoopFix');
  const {
    slides: o,
    allowSlidePrev: d,
    allowSlideNext: h,
    slidesEl: f,
    params: m
  } = a;
  if (
    ((a.allowSlidePrev = !0),
    (a.allowSlideNext = !0),
    a.virtual && m.virtual.enabled)
  ) {
    t &&
      (!m.centeredSlides && a.snapIndex === 0
        ? a.slideTo(a.virtual.slides.length, 0, !1, !0)
        : m.centeredSlides && a.snapIndex < m.slidesPerView
        ? a.slideTo(a.virtual.slides.length + a.snapIndex, 0, !1, !0)
        : a.snapIndex === a.snapGrid.length - 1 &&
          a.slideTo(a.virtual.slidesBefore, 0, !1, !0)),
      (a.allowSlidePrev = d),
      (a.allowSlideNext = h),
      a.emit('loopFix');
    return;
  }
  const c =
    m.slidesPerView === 'auto'
      ? a.slidesPerViewDynamic()
      : Math.ceil(parseFloat(m.slidesPerView, 10));
  let u = m.loopedSlides || c;
  u % m.slidesPerGroup !== 0 &&
    (u += m.slidesPerGroup - (u % m.slidesPerGroup)),
    (a.loopedSlides = u);
  const p = [],
    v = [];
  let g = a.activeIndex;
  typeof r > 'u'
    ? (r = a.getSlideIndex(
        a.slides.filter((w) => w.classList.contains(m.slideActiveClass))[0]
      ))
    : (g = r);
  const b = i === 'next' || !i,
    T = i === 'prev' || !i;
  let S = 0,
    E = 0;
  if (r < u) {
    S = Math.max(u - r, m.slidesPerGroup);
    for (let w = 0; w < u - r; w += 1) {
      const P = w - Math.floor(w / o.length) * o.length;
      p.push(o.length - P - 1);
    }
  } else if (r > a.slides.length - u * 2) {
    E = Math.max(r - (a.slides.length - u * 2), m.slidesPerGroup);
    for (let w = 0; w < E; w += 1) {
      const P = w - Math.floor(w / o.length) * o.length;
      v.push(P);
    }
  }
  if (
    (T &&
      p.forEach((w) => {
        (a.slides[w].swiperLoopMoveDOM = !0),
          f.prepend(a.slides[w]),
          (a.slides[w].swiperLoopMoveDOM = !1);
      }),
    b &&
      v.forEach((w) => {
        (a.slides[w].swiperLoopMoveDOM = !0),
          f.append(a.slides[w]),
          (a.slides[w].swiperLoopMoveDOM = !1);
      }),
    a.recalcSlides(),
    m.slidesPerView === 'auto' && a.updateSlides(),
    m.watchSlidesProgress && a.updateSlidesOffset(),
    t)
  ) {
    if (p.length > 0 && T)
      if (typeof e > 'u') {
        const w = a.slidesGrid[g],
          O = a.slidesGrid[g + S] - w;
        l
          ? a.setTranslate(a.translate - O)
          : (a.slideTo(g + S, 0, !1, !0),
            s && (a.touches[a.isHorizontal() ? 'startX' : 'startY'] += O));
      } else s && a.slideToLoop(e, 0, !1, !0);
    else if (v.length > 0 && b)
      if (typeof e > 'u') {
        const w = a.slidesGrid[g],
          O = a.slidesGrid[g - E] - w;
        l
          ? a.setTranslate(a.translate - O)
          : (a.slideTo(g - E, 0, !1, !0),
            s && (a.touches[a.isHorizontal() ? 'startX' : 'startY'] += O));
      } else a.slideToLoop(e, 0, !1, !0);
  }
  if (
    ((a.allowSlidePrev = d),
    (a.allowSlideNext = h),
    a.controller && a.controller.control && !n)
  ) {
    const w = {
      slideRealIndex: e,
      slideTo: !1,
      direction: i,
      setTranslate: s,
      activeSlideIndex: r,
      byController: !0
    };
    Array.isArray(a.controller.control)
      ? a.controller.control.forEach((P) => {
          !P.destroyed && P.params.loop && P.loopFix(w);
        })
      : a.controller.control instanceof a.constructor &&
        a.controller.control.params.loop &&
        a.controller.control.loopFix(w);
  }
  a.emit('loopFix');
}
function ut() {
  const e = this,
    { params: t, slidesEl: i } = e;
  if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
  e.recalcSlides();
  const s = [];
  e.slides.forEach((r) => {
    const n =
      typeof r.swiperSlideIndex > 'u'
        ? r.getAttribute('data-swiper-slide-index') * 1
        : r.swiperSlideIndex;
    s[n] = r;
  }),
    e.slides.forEach((r) => {
      r.removeAttribute('data-swiper-slide-index');
    }),
    s.forEach((r) => {
      i.append(r);
    }),
    e.recalcSlides(),
    e.slideTo(e.realIndex, 0);
}
const ft = { loopCreate: dt, loopFix: ct, loopDestroy: ut };
function pt(e) {
  const t = this;
  if (
    !t.params.simulateTouch ||
    (t.params.watchOverflow && t.isLocked) ||
    t.params.cssMode
  )
    return;
  const i = t.params.touchEventsTarget === 'container' ? t.el : t.wrapperEl;
  t.isElement && (t.__preventObserver__ = !0),
    (i.style.cursor = 'move'),
    (i.style.cursor = e ? 'grabbing' : 'grab'),
    t.isElement &&
      requestAnimationFrame(() => {
        t.__preventObserver__ = !1;
      });
}
function mt() {
  const e = this;
  (e.params.watchOverflow && e.isLocked) ||
    e.params.cssMode ||
    (e.isElement && (e.__preventObserver__ = !0),
    (e[
      e.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'
    ].style.cursor = ''),
    e.isElement &&
      requestAnimationFrame(() => {
        e.__preventObserver__ = !1;
      }));
}
const ht = { setGrabCursor: pt, unsetGrabCursor: mt };
function gt(e, t = this) {
  function i(s) {
    if (!s || s === _() || s === A()) return null;
    s.assignedSlot && (s = s.assignedSlot);
    const r = s.closest(e);
    return !r && !s.getRootNode ? null : r || i(s.getRootNode().host);
  }
  return i(t);
}
function vt(e) {
  const t = this,
    i = _(),
    s = A(),
    r = t.touchEventsData;
  r.evCache.push(e);
  const { params: n, touches: l, enabled: a } = t;
  if (
    !a ||
    (!n.simulateTouch && e.pointerType === 'mouse') ||
    (t.animating && n.preventInteractionOnTransition)
  )
    return;
  !t.animating && n.cssMode && n.loop && t.loopFix();
  let o = e;
  o.originalEvent && (o = o.originalEvent);
  let d = o.target;
  if (
    (n.touchEventsTarget === 'wrapper' && !t.wrapperEl.contains(d)) ||
    ('which' in o && o.which === 3) ||
    ('button' in o && o.button > 0) ||
    (r.isTouched && r.isMoved)
  )
    return;
  const h = !!n.noSwipingClass && n.noSwipingClass !== '',
    f = e.composedPath ? e.composedPath() : e.path;
  h && o.target && o.target.shadowRoot && f && (d = f[0]);
  const m = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`,
    c = !!(o.target && o.target.shadowRoot);
  if (n.noSwiping && (c ? gt(m, d) : d.closest(m))) {
    t.allowClick = !0;
    return;
  }
  if (n.swipeHandler && !d.closest(n.swipeHandler)) return;
  (l.currentX = o.pageX), (l.currentY = o.pageY);
  const u = l.currentX,
    p = l.currentY,
    v = n.edgeSwipeDetection || n.iOSEdgeSwipeDetection,
    g = n.edgeSwipeThreshold || n.iOSEdgeSwipeThreshold;
  if (v && (u <= g || u >= s.innerWidth - g))
    if (v === 'prevent') e.preventDefault();
    else return;
  Object.assign(r, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0
  }),
    (l.startX = u),
    (l.startY = p),
    (r.touchStartTime = q()),
    (t.allowClick = !0),
    t.updateSize(),
    (t.swipeDirection = void 0),
    n.threshold > 0 && (r.allowThresholdMove = !1);
  let b = !0;
  d.matches(r.focusableElements) &&
    ((b = !1), d.nodeName === 'SELECT' && (r.isTouched = !1)),
    i.activeElement &&
      i.activeElement.matches(r.focusableElements) &&
      i.activeElement !== d &&
      i.activeElement.blur();
  const T = b && t.allowTouchMove && n.touchStartPreventDefault;
  (n.touchStartForcePreventDefault || T) &&
    !d.isContentEditable &&
    o.preventDefault(),
    n.freeMode &&
      n.freeMode.enabled &&
      t.freeMode &&
      t.animating &&
      !n.cssMode &&
      t.freeMode.onTouchStart(),
    t.emit('touchStart', o);
}
function St(e) {
  const t = _(),
    i = this,
    s = i.touchEventsData,
    { params: r, touches: n, rtlTranslate: l, enabled: a } = i;
  if (!a || (!r.simulateTouch && e.pointerType === 'mouse')) return;
  let o = e;
  if ((o.originalEvent && (o = o.originalEvent), !s.isTouched)) {
    s.startMoving && s.isScrolling && i.emit('touchMoveOpposite', o);
    return;
  }
  const d = s.evCache.findIndex((w) => w.pointerId === o.pointerId);
  d >= 0 && (s.evCache[d] = o);
  const h = s.evCache.length > 1 ? s.evCache[0] : o,
    f = h.pageX,
    m = h.pageY;
  if (o.preventedByNestedSwiper) {
    (n.startX = f), (n.startY = m);
    return;
  }
  if (!i.allowTouchMove) {
    o.target.matches(s.focusableElements) || (i.allowClick = !1),
      s.isTouched &&
        (Object.assign(n, {
          startX: f,
          startY: m,
          prevX: i.touches.currentX,
          prevY: i.touches.currentY,
          currentX: f,
          currentY: m
        }),
        (s.touchStartTime = q()));
    return;
  }
  if (r.touchReleaseOnEdges && !r.loop) {
    if (i.isVertical()) {
      if (
        (m < n.startY && i.translate <= i.maxTranslate()) ||
        (m > n.startY && i.translate >= i.minTranslate())
      ) {
        (s.isTouched = !1), (s.isMoved = !1);
        return;
      }
    } else if (
      (f < n.startX && i.translate <= i.maxTranslate()) ||
      (f > n.startX && i.translate >= i.minTranslate())
    )
      return;
  }
  if (
    t.activeElement &&
    o.target === t.activeElement &&
    o.target.matches(s.focusableElements)
  ) {
    (s.isMoved = !0), (i.allowClick = !1);
    return;
  }
  if (
    (s.allowTouchCallbacks && i.emit('touchMove', o),
    o.targetTouches && o.targetTouches.length > 1)
  )
    return;
  (n.currentX = f), (n.currentY = m);
  const c = n.currentX - n.startX,
    u = n.currentY - n.startY;
  if (i.params.threshold && Math.sqrt(c ** 2 + u ** 2) < i.params.threshold)
    return;
  if (typeof s.isScrolling > 'u') {
    let w;
    (i.isHorizontal() && n.currentY === n.startY) ||
    (i.isVertical() && n.currentX === n.startX)
      ? (s.isScrolling = !1)
      : c * c + u * u >= 25 &&
        ((w = (Math.atan2(Math.abs(u), Math.abs(c)) * 180) / Math.PI),
        (s.isScrolling = i.isHorizontal()
          ? w > r.touchAngle
          : 90 - w > r.touchAngle));
  }
  if (
    (s.isScrolling && i.emit('touchMoveOpposite', o),
    typeof s.startMoving > 'u' &&
      (n.currentX !== n.startX || n.currentY !== n.startY) &&
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
    !r.cssMode && o.cancelable && o.preventDefault(),
    r.touchMoveStopPropagation && !r.nested && o.stopPropagation();
  let p = i.isHorizontal() ? c : u,
    v = i.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
  r.oneWayMovement &&
    ((p = Math.abs(p) * (l ? 1 : -1)), (v = Math.abs(v) * (l ? 1 : -1))),
    (n.diff = p),
    (p *= r.touchRatio),
    l && ((p = -p), (v = -v));
  const g = i.touchesDirection;
  (i.swipeDirection = p > 0 ? 'prev' : 'next'),
    (i.touchesDirection = v > 0 ? 'prev' : 'next');
  const b = i.params.loop && !r.cssMode;
  if (!s.isMoved) {
    if (
      (b && i.loopFix({ direction: i.swipeDirection }),
      (s.startTranslate = i.getTranslate()),
      i.setTransition(0),
      i.animating)
    ) {
      const w = new window.CustomEvent('transitionend', {
        bubbles: !0,
        cancelable: !0
      });
      i.wrapperEl.dispatchEvent(w);
    }
    (s.allowMomentumBounce = !1),
      r.grabCursor &&
        (i.allowSlideNext === !0 || i.allowSlidePrev === !0) &&
        i.setGrabCursor(!0),
      i.emit('sliderFirstMove', o);
  }
  let T;
  s.isMoved &&
    g !== i.touchesDirection &&
    b &&
    Math.abs(p) >= 1 &&
    (i.loopFix({ direction: i.swipeDirection, setTranslate: !0 }), (T = !0)),
    i.emit('sliderMove', o),
    (s.isMoved = !0),
    (s.currentTranslate = p + s.startTranslate);
  let S = !0,
    E = r.resistanceRatio;
  if (
    (r.touchReleaseOnEdges && (E = 0),
    p > 0
      ? (b &&
          !T &&
          s.currentTranslate >
            (r.centeredSlides
              ? i.minTranslate() - i.size / 2
              : i.minTranslate()) &&
          i.loopFix({
            direction: 'prev',
            setTranslate: !0,
            activeSlideIndex: 0
          }),
        s.currentTranslate > i.minTranslate() &&
          ((S = !1),
          r.resistance &&
            (s.currentTranslate =
              i.minTranslate() -
              1 +
              (-i.minTranslate() + s.startTranslate + p) ** E)))
      : p < 0 &&
        (b &&
          !T &&
          s.currentTranslate <
            (r.centeredSlides
              ? i.maxTranslate() + i.size / 2
              : i.maxTranslate()) &&
          i.loopFix({
            direction: 'next',
            setTranslate: !0,
            activeSlideIndex:
              i.slides.length -
              (r.slidesPerView === 'auto'
                ? i.slidesPerViewDynamic()
                : Math.ceil(parseFloat(r.slidesPerView, 10)))
          }),
        s.currentTranslate < i.maxTranslate() &&
          ((S = !1),
          r.resistance &&
            (s.currentTranslate =
              i.maxTranslate() +
              1 -
              (i.maxTranslate() - s.startTranslate - p) ** E))),
    S && (o.preventedByNestedSwiper = !0),
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
    r.threshold > 0)
  )
    if (Math.abs(p) > r.threshold || s.allowThresholdMove) {
      if (!s.allowThresholdMove) {
        (s.allowThresholdMove = !0),
          (n.startX = n.currentX),
          (n.startY = n.currentY),
          (s.currentTranslate = s.startTranslate),
          (n.diff = i.isHorizontal()
            ? n.currentX - n.startX
            : n.currentY - n.startY);
        return;
      }
    } else {
      s.currentTranslate = s.startTranslate;
      return;
    }
  !r.followFinger ||
    r.cssMode ||
    (((r.freeMode && r.freeMode.enabled && i.freeMode) ||
      r.watchSlidesProgress) &&
      (i.updateActiveIndex(), i.updateSlidesClasses()),
    r.freeMode && r.freeMode.enabled && i.freeMode && i.freeMode.onTouchMove(),
    i.updateProgress(s.currentTranslate),
    i.setTranslate(s.currentTranslate));
}
function Tt(e) {
  const t = this,
    i = t.touchEventsData,
    s = i.evCache.findIndex((T) => T.pointerId === e.pointerId);
  if (
    (s >= 0 && i.evCache.splice(s, 1),
    ['pointercancel', 'pointerout', 'pointerleave'].includes(e.type) &&
      !(
        e.type === 'pointercancel' &&
        (t.browser.isSafari || t.browser.isWebView)
      ))
  )
    return;
  const {
    params: r,
    touches: n,
    rtlTranslate: l,
    slidesGrid: a,
    enabled: o
  } = t;
  if (!o || (!r.simulateTouch && e.pointerType === 'mouse')) return;
  let d = e;
  if (
    (d.originalEvent && (d = d.originalEvent),
    i.allowTouchCallbacks && t.emit('touchEnd', d),
    (i.allowTouchCallbacks = !1),
    !i.isTouched)
  ) {
    i.isMoved && r.grabCursor && t.setGrabCursor(!1),
      (i.isMoved = !1),
      (i.startMoving = !1);
    return;
  }
  r.grabCursor &&
    i.isMoved &&
    i.isTouched &&
    (t.allowSlideNext === !0 || t.allowSlidePrev === !0) &&
    t.setGrabCursor(!1);
  const h = q(),
    f = h - i.touchStartTime;
  if (t.allowClick) {
    const T = d.path || (d.composedPath && d.composedPath());
    t.updateClickedSlide((T && T[0]) || d.target),
      t.emit('tap click', d),
      f < 300 &&
        h - i.lastClickTime < 300 &&
        t.emit('doubleTap doubleClick', d);
  }
  if (
    ((i.lastClickTime = q()),
    Z(() => {
      t.destroyed || (t.allowClick = !0);
    }),
    !i.isTouched ||
      !i.isMoved ||
      !t.swipeDirection ||
      n.diff === 0 ||
      i.currentTranslate === i.startTranslate)
  ) {
    (i.isTouched = !1), (i.isMoved = !1), (i.startMoving = !1);
    return;
  }
  (i.isTouched = !1), (i.isMoved = !1), (i.startMoving = !1);
  let m;
  if (
    (r.followFinger
      ? (m = l ? t.translate : -t.translate)
      : (m = -i.currentTranslate),
    r.cssMode)
  )
    return;
  if (r.freeMode && r.freeMode.enabled) {
    t.freeMode.onTouchEnd({ currentPos: m });
    return;
  }
  let c = 0,
    u = t.slidesSizesGrid[0];
  for (
    let T = 0;
    T < a.length;
    T += T < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup
  ) {
    const S = T < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
    typeof a[T + S] < 'u'
      ? m >= a[T] && m < a[T + S] && ((c = T), (u = a[T + S] - a[T]))
      : m >= a[T] && ((c = T), (u = a[a.length - 1] - a[a.length - 2]));
  }
  let p = null,
    v = null;
  r.rewind &&
    (t.isBeginning
      ? (v =
          r.virtual && r.virtual.enabled && t.virtual
            ? t.virtual.slides.length - 1
            : t.slides.length - 1)
      : t.isEnd && (p = 0));
  const g = (m - a[c]) / u,
    b = c < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
  if (f > r.longSwipesMs) {
    if (!r.longSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    t.swipeDirection === 'next' &&
      (g >= r.longSwipesRatio
        ? t.slideTo(r.rewind && t.isEnd ? p : c + b)
        : t.slideTo(c)),
      t.swipeDirection === 'prev' &&
        (g > 1 - r.longSwipesRatio
          ? t.slideTo(c + b)
          : v !== null && g < 0 && Math.abs(g) > r.longSwipesRatio
          ? t.slideTo(v)
          : t.slideTo(c));
  } else {
    if (!r.shortSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    t.navigation &&
    (d.target === t.navigation.nextEl || d.target === t.navigation.prevEl)
      ? d.target === t.navigation.nextEl
        ? t.slideTo(c + b)
        : t.slideTo(c)
      : (t.swipeDirection === 'next' && t.slideTo(p !== null ? p : c + b),
        t.swipeDirection === 'prev' && t.slideTo(v !== null ? v : c));
  }
}
function ae() {
  const e = this,
    { params: t, el: i } = e;
  if (i && i.offsetWidth === 0) return;
  t.breakpoints && e.setBreakpoint();
  const { allowSlideNext: s, allowSlidePrev: r, snapGrid: n } = e,
    l = e.virtual && e.params.virtual.enabled;
  (e.allowSlideNext = !0),
    (e.allowSlidePrev = !0),
    e.updateSize(),
    e.updateSlides(),
    e.updateSlidesClasses();
  const a = l && t.loop;
  (t.slidesPerView === 'auto' || t.slidesPerView > 1) &&
  e.isEnd &&
  !e.isBeginning &&
  !e.params.centeredSlides &&
  !a
    ? e.slideTo(e.slides.length - 1, 0, !1, !0)
    : e.params.loop && !l
    ? e.slideToLoop(e.realIndex, 0, !1, !0)
    : e.slideTo(e.activeIndex, 0, !1, !0),
    e.autoplay &&
      e.autoplay.running &&
      e.autoplay.paused &&
      (clearTimeout(e.autoplay.resizeTimeout),
      (e.autoplay.resizeTimeout = setTimeout(() => {
        e.autoplay &&
          e.autoplay.running &&
          e.autoplay.paused &&
          e.autoplay.resume();
      }, 500))),
    (e.allowSlidePrev = r),
    (e.allowSlideNext = s),
    e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow();
}
function yt(e) {
  const t = this;
  t.enabled &&
    (t.allowClick ||
      (t.params.preventClicks && e.preventDefault(),
      t.params.preventClicksPropagation &&
        t.animating &&
        (e.stopPropagation(), e.stopImmediatePropagation())));
}
function bt() {
  const e = this,
    { wrapperEl: t, rtlTranslate: i, enabled: s } = e;
  if (!s) return;
  (e.previousTranslate = e.translate),
    e.isHorizontal()
      ? (e.translate = -t.scrollLeft)
      : (e.translate = -t.scrollTop),
    e.translate === 0 && (e.translate = 0),
    e.updateActiveIndex(),
    e.updateSlidesClasses();
  let r;
  const n = e.maxTranslate() - e.minTranslate();
  n === 0 ? (r = 0) : (r = (e.translate - e.minTranslate()) / n),
    r !== e.progress && e.updateProgress(i ? -e.translate : e.translate),
    e.emit('setTranslate', e.translate, !1);
}
function wt(e) {
  const t = this;
  R(t, e.target),
    !(
      t.params.cssMode ||
      (t.params.slidesPerView !== 'auto' && !t.params.autoHeight)
    ) && t.update();
}
let le = !1;
function xt() {}
const he = (e, t) => {
  const i = _(),
    { params: s, el: r, wrapperEl: n, device: l } = e,
    a = !!s.nested,
    o = t === 'on' ? 'addEventListener' : 'removeEventListener',
    d = t;
  r[o]('pointerdown', e.onTouchStart, { passive: !1 }),
    i[o]('pointermove', e.onTouchMove, { passive: !1, capture: a }),
    i[o]('pointerup', e.onTouchEnd, { passive: !0 }),
    i[o]('pointercancel', e.onTouchEnd, { passive: !0 }),
    i[o]('pointerout', e.onTouchEnd, { passive: !0 }),
    i[o]('pointerleave', e.onTouchEnd, { passive: !0 }),
    (s.preventClicks || s.preventClicksPropagation) &&
      r[o]('click', e.onClick, !0),
    s.cssMode && n[o]('scroll', e.onScroll),
    s.updateOnWindowResize
      ? e[d](
          l.ios || l.android
            ? 'resize orientationchange observerUpdate'
            : 'resize observerUpdate',
          ae,
          !0
        )
      : e[d]('observerUpdate', ae, !0),
    r[o]('load', e.onLoad, { capture: !0 });
};
function Et() {
  const e = this,
    t = _(),
    { params: i } = e;
  (e.onTouchStart = vt.bind(e)),
    (e.onTouchMove = St.bind(e)),
    (e.onTouchEnd = Tt.bind(e)),
    i.cssMode && (e.onScroll = bt.bind(e)),
    (e.onClick = yt.bind(e)),
    (e.onLoad = wt.bind(e)),
    le || (t.addEventListener('touchstart', xt), (le = !0)),
    he(e, 'on');
}
function Mt() {
  he(this, 'off');
}
const Ct = { attachEvents: Et, detachEvents: Mt },
  oe = (e, t) => e.grid && t.grid && t.grid.rows > 1;
function Pt() {
  const e = this,
    { realIndex: t, initialized: i, params: s, el: r } = e,
    n = s.breakpoints;
  if (!n || (n && Object.keys(n).length === 0)) return;
  const l = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
  if (!l || e.currentBreakpoint === l) return;
  const o = (l in n ? n[l] : void 0) || e.originalParams,
    d = oe(e, s),
    h = oe(e, o),
    f = s.enabled;
  d && !h
    ? (r.classList.remove(
        `${s.containerModifierClass}grid`,
        `${s.containerModifierClass}grid-column`
      ),
      e.emitContainerClasses())
    : !d &&
      h &&
      (r.classList.add(`${s.containerModifierClass}grid`),
      ((o.grid.fill && o.grid.fill === 'column') ||
        (!o.grid.fill && s.grid.fill === 'column')) &&
        r.classList.add(`${s.containerModifierClass}grid-column`),
      e.emitContainerClasses()),
    ['navigation', 'pagination', 'scrollbar'].forEach((p) => {
      if (typeof o[p] > 'u') return;
      const v = s[p] && s[p].enabled,
        g = o[p] && o[p].enabled;
      v && !g && e[p].disable(), !v && g && e[p].enable();
    });
  const m = o.direction && o.direction !== s.direction,
    c = s.loop && (o.slidesPerView !== s.slidesPerView || m);
  m && i && e.changeDirection(), k(e.params, o);
  const u = e.params.enabled;
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev
  }),
    f && !u ? e.disable() : !f && u && e.enable(),
    (e.currentBreakpoint = l),
    e.emit('_beforeBreakpoint', o),
    c && i && (e.loopDestroy(), e.loopCreate(t), e.updateSlides()),
    e.emit('breakpoint', o);
}
function Lt(e, t = 'window', i) {
  if (!e || (t === 'container' && !i)) return;
  let s = !1;
  const r = A(),
    n = t === 'window' ? r.innerHeight : i.clientHeight,
    l = Object.keys(e).map((a) => {
      if (typeof a == 'string' && a.indexOf('@') === 0) {
        const o = parseFloat(a.substr(1));
        return { value: n * o, point: a };
      }
      return { value: a, point: a };
    });
  l.sort((a, o) => parseInt(a.value, 10) - parseInt(o.value, 10));
  for (let a = 0; a < l.length; a += 1) {
    const { point: o, value: d } = l[a];
    t === 'window'
      ? r.matchMedia(`(min-width: ${d}px)`).matches && (s = o)
      : d <= i.clientWidth && (s = o);
  }
  return s || 'max';
}
const Ot = { setBreakpoint: Pt, getBreakpoint: Lt };
function It(e, t) {
  const i = [];
  return (
    e.forEach((s) => {
      typeof s == 'object'
        ? Object.keys(s).forEach((r) => {
            s[r] && i.push(t + r);
          })
        : typeof s == 'string' && i.push(t + s);
    }),
    i
  );
}
function zt() {
  const e = this,
    { classNames: t, params: i, rtl: s, el: r, device: n } = e,
    l = It(
      [
        'initialized',
        i.direction,
        { 'free-mode': e.params.freeMode && i.freeMode.enabled },
        { autoheight: i.autoHeight },
        { rtl: s },
        { grid: i.grid && i.grid.rows > 1 },
        {
          'grid-column': i.grid && i.grid.rows > 1 && i.grid.fill === 'column'
        },
        { android: n.android },
        { ios: n.ios },
        { 'css-mode': i.cssMode },
        { centered: i.cssMode && i.centeredSlides },
        { 'watch-progress': i.watchSlidesProgress }
      ],
      i.containerModifierClass
    );
  t.push(...l), r.classList.add(...t), e.emitContainerClasses();
}
function kt() {
  const e = this,
    { el: t, classNames: i } = e;
  t.classList.remove(...i), e.emitContainerClasses();
}
const At = { addClasses: zt, removeClasses: kt };
function Gt() {
  const e = this,
    { isLocked: t, params: i } = e,
    { slidesOffsetBefore: s } = i;
  if (s) {
    const r = e.slides.length - 1,
      n = e.slidesGrid[r] + e.slidesSizesGrid[r] + s * 2;
    e.isLocked = e.size > n;
  } else e.isLocked = e.snapGrid.length === 1;
  i.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked),
    i.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked),
    t && t !== e.isLocked && (e.isEnd = !1),
    t !== e.isLocked && e.emit(e.isLocked ? 'lock' : 'unlock');
}
const Dt = { checkOverflow: Gt },
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
function Vt(e, t) {
  return function (s = {}) {
    const r = Object.keys(s)[0],
      n = s[r];
    if (typeof n != 'object' || n === null) {
      k(t, s);
      return;
    }
    if (
      (['navigation', 'pagination', 'scrollbar'].indexOf(r) >= 0 &&
        e[r] === !0 &&
        (e[r] = { auto: !0 }),
      !(r in e && 'enabled' in n))
    ) {
      k(t, s);
      return;
    }
    e[r] === !0 && (e[r] = { enabled: !0 }),
      typeof e[r] == 'object' && !('enabled' in e[r]) && (e[r].enabled = !0),
      e[r] || (e[r] = { enabled: !1 }),
      k(t, s);
  };
}
const J = {
    eventsEmitter: Ae,
    update: We,
    translate: Ke,
    transition: et,
    slide: ot,
    loop: ft,
    grabCursor: ht,
    events: Ct,
    breakpoints: Ot,
    checkOverflow: Dt,
    classes: At
  },
  Q = {};
class z {
  constructor(...t) {
    let i, s;
    t.length === 1 &&
    t[0].constructor &&
    Object.prototype.toString.call(t[0]).slice(8, -1) === 'Object'
      ? (s = t[0])
      : ([i, s] = t),
      s || (s = {}),
      (s = k({}, s)),
      i && !s.el && (s.el = i);
    const r = _();
    if (
      s.el &&
      typeof s.el == 'string' &&
      r.querySelectorAll(s.el).length > 1
    ) {
      const o = [];
      return (
        r.querySelectorAll(s.el).forEach((d) => {
          const h = k({}, s, { el: d });
          o.push(new z(h));
        }),
        o
      );
    }
    const n = this;
    (n.__swiper__ = !0),
      (n.support = pe()),
      (n.device = Le({ userAgent: s.userAgent })),
      (n.browser = Ie()),
      (n.eventsListeners = {}),
      (n.eventsAnyListeners = []),
      (n.modules = [...n.__modules__]),
      s.modules && Array.isArray(s.modules) && n.modules.push(...s.modules);
    const l = {};
    n.modules.forEach((o) => {
      o({
        params: s,
        swiper: n,
        extendParams: Vt(s, l),
        on: n.on.bind(n),
        once: n.once.bind(n),
        off: n.off.bind(n),
        emit: n.emit.bind(n)
      });
    });
    const a = k({}, de, l);
    return (
      (n.params = k({}, a, Q, s)),
      (n.originalParams = k({}, n.params)),
      (n.passedParams = k({}, s)),
      n.params &&
        n.params.on &&
        Object.keys(n.params.on).forEach((o) => {
          n.on(o, n.params.on[o]);
        }),
      n.params && n.params.onAny && n.onAny(n.params.onAny),
      Object.assign(n, {
        enabled: n.params.enabled,
        el: i,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return n.params.direction === 'horizontal';
        },
        isVertical() {
          return n.params.direction === 'vertical';
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
        allowSlideNext: n.params.allowSlideNext,
        allowSlidePrev: n.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: n.params.focusableElements,
          lastClickTime: 0,
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          evCache: []
        },
        allowClick: !0,
        allowTouchMove: n.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0
      }),
      n.emit('_swiper'),
      n.params.init && n.init(),
      n
    );
  }
  getSlideIndex(t) {
    const { slidesEl: i, params: s } = this,
      r = V(i, `.${s.slideClass}, swiper-slide`),
      n = ne(r[0]);
    return ne(t) - n;
  }
  getSlideIndexByData(t) {
    return this.getSlideIndex(
      this.slides.filter(
        (i) => i.getAttribute('data-swiper-slide-index') * 1 === t
      )[0]
    );
  }
  recalcSlides() {
    const t = this,
      { slidesEl: i, params: s } = t;
    t.slides = V(i, `.${s.slideClass}, swiper-slide`);
  }
  enable() {
    const t = this;
    t.enabled ||
      ((t.enabled = !0),
      t.params.grabCursor && t.setGrabCursor(),
      t.emit('enable'));
  }
  disable() {
    const t = this;
    t.enabled &&
      ((t.enabled = !1),
      t.params.grabCursor && t.unsetGrabCursor(),
      t.emit('disable'));
  }
  setProgress(t, i) {
    const s = this;
    t = Math.min(Math.max(t, 0), 1);
    const r = s.minTranslate(),
      l = (s.maxTranslate() - r) * t + r;
    s.translateTo(l, typeof i > 'u' ? 0 : i),
      s.updateActiveIndex(),
      s.updateSlidesClasses();
  }
  emitContainerClasses() {
    const t = this;
    if (!t.params._emitClasses || !t.el) return;
    const i = t.el.className
      .split(' ')
      .filter(
        (s) =>
          s.indexOf('swiper') === 0 ||
          s.indexOf(t.params.containerModifierClass) === 0
      );
    t.emit('_containerClasses', i.join(' '));
  }
  getSlideClasses(t) {
    const i = this;
    return i.destroyed
      ? ''
      : t.className
          .split(' ')
          .filter(
            (s) =>
              s.indexOf('swiper-slide') === 0 ||
              s.indexOf(i.params.slideClass) === 0
          )
          .join(' ');
  }
  emitSlidesClasses() {
    const t = this;
    if (!t.params._emitClasses || !t.el) return;
    const i = [];
    t.slides.forEach((s) => {
      const r = t.getSlideClasses(s);
      i.push({ slideEl: s, classNames: r }), t.emit('_slideClass', s, r);
    }),
      t.emit('_slideClasses', i);
  }
  slidesPerViewDynamic(t = 'current', i = !1) {
    const s = this,
      {
        params: r,
        slides: n,
        slidesGrid: l,
        slidesSizesGrid: a,
        size: o,
        activeIndex: d
      } = s;
    let h = 1;
    if (r.centeredSlides) {
      let f = n[d] ? n[d].swiperSlideSize : 0,
        m;
      for (let c = d + 1; c < n.length; c += 1)
        n[c] &&
          !m &&
          ((f += n[c].swiperSlideSize), (h += 1), f > o && (m = !0));
      for (let c = d - 1; c >= 0; c -= 1)
        n[c] &&
          !m &&
          ((f += n[c].swiperSlideSize), (h += 1), f > o && (m = !0));
    } else if (t === 'current')
      for (let f = d + 1; f < n.length; f += 1)
        (i ? l[f] + a[f] - l[d] < o : l[f] - l[d] < o) && (h += 1);
    else for (let f = d - 1; f >= 0; f -= 1) l[d] - l[f] < o && (h += 1);
    return h;
  }
  update() {
    const t = this;
    if (!t || t.destroyed) return;
    const { snapGrid: i, params: s } = t;
    s.breakpoints && t.setBreakpoint(),
      [...t.el.querySelectorAll('[loading="lazy"]')].forEach((l) => {
        l.complete && R(t, l);
      }),
      t.updateSize(),
      t.updateSlides(),
      t.updateProgress(),
      t.updateSlidesClasses();
    function r() {
      const l = t.rtlTranslate ? t.translate * -1 : t.translate,
        a = Math.min(Math.max(l, t.maxTranslate()), t.minTranslate());
      t.setTranslate(a), t.updateActiveIndex(), t.updateSlidesClasses();
    }
    let n;
    if (s.freeMode && s.freeMode.enabled && !s.cssMode)
      r(), s.autoHeight && t.updateAutoHeight();
    else {
      if (
        (s.slidesPerView === 'auto' || s.slidesPerView > 1) &&
        t.isEnd &&
        !s.centeredSlides
      ) {
        const l = t.virtual && s.virtual.enabled ? t.virtual.slides : t.slides;
        n = t.slideTo(l.length - 1, 0, !1, !0);
      } else n = t.slideTo(t.activeIndex, 0, !1, !0);
      n || r();
    }
    s.watchOverflow && i !== t.snapGrid && t.checkOverflow(), t.emit('update');
  }
  changeDirection(t, i = !0) {
    const s = this,
      r = s.params.direction;
    return (
      t || (t = r === 'horizontal' ? 'vertical' : 'horizontal'),
      t === r ||
        (t !== 'horizontal' && t !== 'vertical') ||
        (s.el.classList.remove(`${s.params.containerModifierClass}${r}`),
        s.el.classList.add(`${s.params.containerModifierClass}${t}`),
        s.emitContainerClasses(),
        (s.params.direction = t),
        s.slides.forEach((n) => {
          t === 'vertical' ? (n.style.width = '') : (n.style.height = '');
        }),
        s.emit('changeDirection'),
        i && s.update()),
      s
    );
  }
  changeLanguageDirection(t) {
    const i = this;
    (i.rtl && t === 'rtl') ||
      (!i.rtl && t === 'ltr') ||
      ((i.rtl = t === 'rtl'),
      (i.rtlTranslate = i.params.direction === 'horizontal' && i.rtl),
      i.rtl
        ? (i.el.classList.add(`${i.params.containerModifierClass}rtl`),
          (i.el.dir = 'rtl'))
        : (i.el.classList.remove(`${i.params.containerModifierClass}rtl`),
          (i.el.dir = 'ltr')),
      i.update());
  }
  mount(t) {
    const i = this;
    if (i.mounted) return !0;
    let s = t || i.params.el;
    if ((typeof s == 'string' && (s = document.querySelector(s)), !s))
      return !1;
    (s.swiper = i), s.shadowEl && (i.isElement = !0);
    const r = () =>
      `.${(i.params.wrapperClass || '').trim().split(' ').join('.')}`;
    let l = (() =>
      s && s.shadowRoot && s.shadowRoot.querySelector
        ? s.shadowRoot.querySelector(r())
        : V(s, r())[0])();
    return (
      !l &&
        i.params.createElements &&
        ((l = fe('div', i.params.wrapperClass)),
        s.append(l),
        V(s, `.${i.params.slideClass}`).forEach((a) => {
          l.append(a);
        })),
      Object.assign(i, {
        el: s,
        wrapperEl: l,
        slidesEl: i.isElement ? s : l,
        mounted: !0,
        rtl: s.dir.toLowerCase() === 'rtl' || N(s, 'direction') === 'rtl',
        rtlTranslate:
          i.params.direction === 'horizontal' &&
          (s.dir.toLowerCase() === 'rtl' || N(s, 'direction') === 'rtl'),
        wrongRTL: N(l, 'display') === '-webkit-box'
      }),
      !0
    );
  }
  init(t) {
    const i = this;
    return (
      i.initialized ||
        i.mount(t) === !1 ||
        (i.emit('beforeInit'),
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
        i.attachEvents(),
        [...i.el.querySelectorAll('[loading="lazy"]')].forEach((r) => {
          r.complete
            ? R(i, r)
            : r.addEventListener('load', (n) => {
                R(i, n.target);
              });
        }),
        ee(i),
        (i.initialized = !0),
        ee(i),
        i.emit('init'),
        i.emit('afterInit')),
      i
    );
  }
  destroy(t = !0, i = !0) {
    const s = this,
      { params: r, el: n, wrapperEl: l, slides: a } = s;
    return (
      typeof s.params > 'u' ||
        s.destroyed ||
        (s.emit('beforeDestroy'),
        (s.initialized = !1),
        s.detachEvents(),
        r.loop && s.loopDestroy(),
        i &&
          (s.removeClasses(),
          n.removeAttribute('style'),
          l.removeAttribute('style'),
          a &&
            a.length &&
            a.forEach((o) => {
              o.classList.remove(
                r.slideVisibleClass,
                r.slideActiveClass,
                r.slideNextClass,
                r.slidePrevClass
              ),
                o.removeAttribute('style'),
                o.removeAttribute('data-swiper-slide-index');
            })),
        s.emit('destroy'),
        Object.keys(s.eventsListeners).forEach((o) => {
          s.off(o);
        }),
        t !== !1 && ((s.el.swiper = null), Te(s)),
        (s.destroyed = !0)),
      null
    );
  }
  static extendDefaults(t) {
    k(Q, t);
  }
  static get extendedDefaults() {
    return Q;
  }
  static get defaults() {
    return de;
  }
  static installModule(t) {
    z.prototype.__modules__ || (z.prototype.__modules__ = []);
    const i = z.prototype.__modules__;
    typeof t == 'function' && i.indexOf(t) < 0 && i.push(t);
  }
  static use(t) {
    return Array.isArray(t)
      ? (t.forEach((i) => z.installModule(i)), z)
      : (z.installModule(t), z);
  }
}
Object.keys(J).forEach((e) => {
  Object.keys(J[e]).forEach((t) => {
    z.prototype[t] = J[e][t];
  });
});
z.use([ze, ke]);
function _t(e, t, i, s) {
  return (
    e.params.createElements &&
      Object.keys(s).forEach((r) => {
        if (!i[r] && i.auto === !0) {
          let n = V(e.el, `.${s[r]}`)[0];
          n || ((n = fe('div', s[r])), (n.className = s[r]), e.el.append(n)),
            (i[r] = n),
            (t[r] = n);
        }
      }),
    i
  );
}
function Bt({ swiper: e, extendParams: t, on: i, emit: s }) {
  t({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: 'swiper-button-disabled',
      hiddenClass: 'swiper-button-hidden',
      lockClass: 'swiper-button-lock',
      navigationDisabledClass: 'swiper-navigation-disabled'
    }
  }),
    (e.navigation = { nextEl: null, prevEl: null });
  const r = (u) => (Array.isArray(u) || (u = [u].filter((p) => !!p)), u);
  function n(u) {
    let p;
    return u &&
      typeof u == 'string' &&
      e.isElement &&
      ((p = e.el.shadowRoot.querySelector(u)), p)
      ? p
      : (u &&
          (typeof u == 'string' && (p = [...document.querySelectorAll(u)]),
          e.params.uniqueNavElements &&
            typeof u == 'string' &&
            p.length > 1 &&
            e.el.querySelectorAll(u).length === 1 &&
            (p = e.el.querySelector(u))),
        u && !p ? u : p);
  }
  function l(u, p) {
    const v = e.params.navigation;
    (u = r(u)),
      u.forEach((g) => {
        g &&
          (g.classList[p ? 'add' : 'remove'](...v.disabledClass.split(' ')),
          g.tagName === 'BUTTON' && (g.disabled = p),
          e.params.watchOverflow &&
            e.enabled &&
            g.classList[e.isLocked ? 'add' : 'remove'](v.lockClass));
      });
  }
  function a() {
    const { nextEl: u, prevEl: p } = e.navigation;
    if (e.params.loop) {
      l(p, !1), l(u, !1);
      return;
    }
    l(p, e.isBeginning && !e.params.rewind), l(u, e.isEnd && !e.params.rewind);
  }
  function o(u) {
    u.preventDefault(),
      !(e.isBeginning && !e.params.loop && !e.params.rewind) &&
        (e.slidePrev(), s('navigationPrev'));
  }
  function d(u) {
    u.preventDefault(),
      !(e.isEnd && !e.params.loop && !e.params.rewind) &&
        (e.slideNext(), s('navigationNext'));
  }
  function h() {
    const u = e.params.navigation;
    if (
      ((e.params.navigation = _t(
        e,
        e.originalParams.navigation,
        e.params.navigation,
        { nextEl: 'swiper-button-next', prevEl: 'swiper-button-prev' }
      )),
      !(u.nextEl || u.prevEl))
    )
      return;
    let p = n(u.nextEl),
      v = n(u.prevEl);
    Object.assign(e.navigation, { nextEl: p, prevEl: v }),
      (p = r(p)),
      (v = r(v));
    const g = (b, T) => {
      b && b.addEventListener('click', T === 'next' ? d : o),
        !e.enabled && b && b.classList.add(...u.lockClass.split(' '));
    };
    p.forEach((b) => g(b, 'next')), v.forEach((b) => g(b, 'prev'));
  }
  function f() {
    let { nextEl: u, prevEl: p } = e.navigation;
    (u = r(u)), (p = r(p));
    const v = (g, b) => {
      g.removeEventListener('click', b === 'next' ? d : o),
        g.classList.remove(...e.params.navigation.disabledClass.split(' '));
    };
    u.forEach((g) => v(g, 'next')), p.forEach((g) => v(g, 'prev'));
  }
  i('init', () => {
    e.params.navigation.enabled === !1 ? c() : (h(), a());
  }),
    i('toEdge fromEdge lock unlock', () => {
      a();
    }),
    i('destroy', () => {
      f();
    }),
    i('enable disable', () => {
      let { nextEl: u, prevEl: p } = e.navigation;
      (u = r(u)),
        (p = r(p)),
        [...u, ...p]
          .filter((v) => !!v)
          .forEach((v) =>
            v.classList[e.enabled ? 'remove' : 'add'](
              e.params.navigation.lockClass
            )
          );
    }),
    i('click', (u, p) => {
      let { nextEl: v, prevEl: g } = e.navigation;
      (v = r(v)), (g = r(g));
      const b = p.target;
      if (e.params.navigation.hideOnClick && !g.includes(b) && !v.includes(b)) {
        if (
          e.pagination &&
          e.params.pagination &&
          e.params.pagination.clickable &&
          (e.pagination.el === b || e.pagination.el.contains(b))
        )
          return;
        let T;
        v.length
          ? (T = v[0].classList.contains(e.params.navigation.hiddenClass))
          : g.length &&
            (T = g[0].classList.contains(e.params.navigation.hiddenClass)),
          s(T === !0 ? 'navigationShow' : 'navigationHide'),
          [...v, ...g]
            .filter((S) => !!S)
            .forEach((S) =>
              S.classList.toggle(e.params.navigation.hiddenClass)
            );
      }
    });
  const m = () => {
      e.el.classList.remove(
        ...e.params.navigation.navigationDisabledClass.split(' ')
      ),
        h(),
        a();
    },
    c = () => {
      e.el.classList.add(
        ...e.params.navigation.navigationDisabledClass.split(' ')
      ),
        f();
    };
  Object.assign(e.navigation, {
    enable: m,
    disable: c,
    update: a,
    init: h,
    destroy: f
  });
}
function Nt({ swiper: e, extendParams: t, on: i, emit: s, params: r }) {
  (e.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
    t({
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
  let n,
    l,
    a = r && r.autoplay ? r.autoplay.delay : 3e3,
    o = r && r.autoplay ? r.autoplay.delay : 3e3,
    d,
    h = new Date().getTime,
    f,
    m,
    c,
    u,
    p,
    v;
  function g(C) {
    !e ||
      e.destroyed ||
      !e.wrapperEl ||
      (C.target === e.wrapperEl &&
        (e.wrapperEl.removeEventListener('transitionend', g), O()));
  }
  const b = () => {
      if (e.destroyed || !e.autoplay.running) return;
      e.autoplay.paused ? (f = !0) : f && ((o = d), (f = !1));
      const C = e.autoplay.paused ? d : h + o - new Date().getTime();
      (e.autoplay.timeLeft = C),
        s('autoplayTimeLeft', C, C / a),
        (l = requestAnimationFrame(() => {
          b();
        }));
    },
    T = () => {
      let C;
      return (
        e.virtual && e.params.virtual.enabled
          ? (C = e.slides.filter((I) =>
              I.classList.contains('swiper-slide-active')
            )[0])
          : (C = e.slides[e.activeIndex]),
        C ? parseInt(C.getAttribute('data-swiper-autoplay'), 10) : void 0
      );
    },
    S = (C) => {
      if (e.destroyed || !e.autoplay.running) return;
      cancelAnimationFrame(l), b();
      let D = typeof C > 'u' ? e.params.autoplay.delay : C;
      (a = e.params.autoplay.delay), (o = e.params.autoplay.delay);
      const I = T();
      !Number.isNaN(I) &&
        I > 0 &&
        typeof C > 'u' &&
        ((D = I), (a = I), (o = I)),
        (d = D);
      const B = e.params.speed,
        H = () => {
          !e ||
            e.destroyed ||
            (e.params.autoplay.reverseDirection
              ? !e.isBeginning || e.params.loop || e.params.rewind
                ? (e.slidePrev(B, !0, !0), s('autoplay'))
                : e.params.autoplay.stopOnLastSlide ||
                  (e.slideTo(e.slides.length - 1, B, !0, !0), s('autoplay'))
              : !e.isEnd || e.params.loop || e.params.rewind
              ? (e.slideNext(B, !0, !0), s('autoplay'))
              : e.params.autoplay.stopOnLastSlide ||
                (e.slideTo(0, B, !0, !0), s('autoplay')),
            e.params.cssMode &&
              ((h = new Date().getTime()),
              requestAnimationFrame(() => {
                S();
              })));
        };
      return (
        D > 0
          ? (clearTimeout(n),
            (n = setTimeout(() => {
              H();
            }, D)))
          : requestAnimationFrame(() => {
              H();
            }),
        D
      );
    },
    E = () => {
      (e.autoplay.running = !0), S(), s('autoplayStart');
    },
    w = () => {
      (e.autoplay.running = !1),
        clearTimeout(n),
        cancelAnimationFrame(l),
        s('autoplayStop');
    },
    P = (C, D) => {
      if (e.destroyed || !e.autoplay.running) return;
      clearTimeout(n), C || (v = !0);
      const I = () => {
        s('autoplayPause'),
          e.params.autoplay.waitForTransition
            ? e.wrapperEl.addEventListener('transitionend', g)
            : O();
      };
      if (((e.autoplay.paused = !0), D)) {
        p && (d = e.params.autoplay.delay), (p = !1), I();
        return;
      }
      (d = (d || e.params.autoplay.delay) - (new Date().getTime() - h)),
        !(e.isEnd && d < 0 && !e.params.loop) && (d < 0 && (d = 0), I());
    },
    O = () => {
      (e.isEnd && d < 0 && !e.params.loop) ||
        e.destroyed ||
        !e.autoplay.running ||
        ((h = new Date().getTime()),
        v ? ((v = !1), S(d)) : S(),
        (e.autoplay.paused = !1),
        s('autoplayResume'));
    },
    L = () => {
      if (e.destroyed || !e.autoplay.running) return;
      const C = _();
      C.visibilityState === 'hidden' && ((v = !0), P(!0)),
        C.visibilityState === 'visible' && O();
    },
    $ = (C) => {
      C.pointerType === 'mouse' && ((v = !0), P(!0));
    },
    y = (C) => {
      C.pointerType === 'mouse' && e.autoplay.paused && O();
    },
    x = () => {
      e.params.autoplay.pauseOnMouseEnter &&
        (e.el.addEventListener('pointerenter', $),
        e.el.addEventListener('pointerleave', y));
    },
    M = () => {
      e.el.removeEventListener('pointerenter', $),
        e.el.removeEventListener('pointerleave', y);
    },
    G = () => {
      _().addEventListener('visibilitychange', L);
    },
    F = () => {
      _().removeEventListener('visibilitychange', L);
    };
  i('init', () => {
    e.params.autoplay.enabled && (x(), G(), (h = new Date().getTime()), E());
  }),
    i('destroy', () => {
      M(), F(), e.autoplay.running && w();
    }),
    i('beforeTransitionStart', (C, D, I) => {
      e.destroyed ||
        !e.autoplay.running ||
        (I || !e.params.autoplay.disableOnInteraction ? P(!0, !0) : w());
    }),
    i('sliderFirstMove', () => {
      if (!(e.destroyed || !e.autoplay.running)) {
        if (e.params.autoplay.disableOnInteraction) {
          w();
          return;
        }
        (m = !0),
          (c = !1),
          (v = !1),
          (u = setTimeout(() => {
            (v = !0), (c = !0), P(!0);
          }, 200));
      }
    }),
    i('touchEnd', () => {
      if (!(e.destroyed || !e.autoplay.running || !m)) {
        if (
          (clearTimeout(u),
          clearTimeout(n),
          e.params.autoplay.disableOnInteraction)
        ) {
          (c = !1), (m = !1);
          return;
        }
        c && e.params.cssMode && O(), (c = !1), (m = !1);
      }
    }),
    i('slideChange', () => {
      e.destroyed || !e.autoplay.running || (p = !0);
    }),
    Object.assign(e.autoplay, { start: E, stop: w, pause: P, resume: O });
}
const Ft = document.querySelector('.logo-scroll'),
  Ht = Ft.querySelectorAll('.swiper');
Ht.forEach((e) => {
  new z(e, {
    modules: [Nt],
    loop: !0,
    loopedSlides: 4,
    slidesPerView: 'auto',
    speed: 12e3,
    allowTouchMove: !1,
    autoplay: { delay: 0, disableOnInteraction: !1 }
  });
});
document.addEventListener('alpine:initialized', () => {
  const e = document.querySelector('[data-case-slider]'),
    t = e.querySelector('.swiper-button-prev'),
    i = e.querySelector('.swiper-button-next');
  new z(e, {
    modules: [Bt],
    loop: !0,
    slidesPerView: 2,
    navigation: { prevEl: t, nextEl: i },
    breakpoints: {
      760: { centeredSlides: !0, centeredSlidesBounds: !0, slidesPerView: 2 },
      1020: { centeredSlides: !0, centeredSlidesBounds: !0, slidesPerView: 4 },
      1300: { centeredSlides: !0, centeredSlidesBounds: !0, slidesPerView: 6 },
      1600: { centeredSlides: !0, centeredSlidesBounds: !0, slidesPerView: 8 }
    },
    on: {
      init: function (s) {
        s.update();
      },
      resize: function (s) {
        s.update();
      }
    }
  });
});
