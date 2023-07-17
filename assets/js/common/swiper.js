function ee(e) {
  return (
    e !== null &&
    typeof e == 'object' &&
    'constructor' in e &&
    e.constructor === Object
  );
}
function U(e = {}, t = {}) {
  Object.keys(t).forEach((i) => {
    typeof e[i] > 'u'
      ? (e[i] = t[i])
      : ee(t[i]) && ee(e[i]) && Object.keys(t[i]).length > 0 && U(e[i], t[i]);
  });
}
const le = {
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
  const e = typeof document < 'u' ? document : {};
  return U(e, le), e;
}
const Se = {
  document: le,
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
function I() {
  const e = typeof window < 'u' ? window : {};
  return U(e, Se), e;
}
function we(e) {
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
function Y(e, t = 0) {
  return setTimeout(e, t);
}
function N() {
  return Date.now();
}
function Te(e) {
  const t = I();
  let i;
  return (
    t.getComputedStyle && (i = t.getComputedStyle(e, null)),
    !i && e.currentStyle && (i = e.currentStyle),
    i || (i = e.style),
    i
  );
}
function be(e, t = 'x') {
  const i = I();
  let s, r, n;
  const l = Te(e);
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
function D(e) {
  return (
    typeof e == 'object' &&
    e !== null &&
    e.constructor &&
    Object.prototype.toString.call(e).slice(8, -1) === 'Object'
  );
}
function xe(e) {
  return typeof window < 'u' && typeof window.HTMLElement < 'u'
    ? e instanceof HTMLElement
    : e && (e.nodeType === 1 || e.nodeType === 11);
}
function L(...e) {
  const t = Object(e[0]),
    i = ['__proto__', 'constructor', 'prototype'];
  for (let s = 1; s < e.length; s += 1) {
    const r = e[s];
    if (r != null && !xe(r)) {
      const n = Object.keys(Object(r)).filter((l) => i.indexOf(l) < 0);
      for (let l = 0, a = n.length; l < a; l += 1) {
        const o = n[l],
          d = Object.getOwnPropertyDescriptor(r, o);
        d !== void 0 &&
          d.enumerable &&
          (D(t[o]) && D(r[o])
            ? r[o].__swiper__
              ? (t[o] = r[o])
              : L(t[o], r[o])
            : !D(t[o]) && D(r[o])
            ? ((t[o] = {}), r[o].__swiper__ ? (t[o] = r[o]) : L(t[o], r[o]))
            : (t[o] = r[o]));
      }
    }
  }
  return t;
}
function _(e, t, i) {
  e.style.setProperty(t, i);
}
function oe({ swiper: e, targetPosition: t, side: i }) {
  const s = I(),
    r = -e.translate;
  let n = null,
    l;
  const a = e.params.speed;
  (e.wrapperEl.style.scrollSnapType = 'none'),
    s.cancelAnimationFrame(e.cssModeFrameID);
  const o = t > r ? 'next' : 'prev',
    d = (u, m) => (o === 'next' && u >= m) || (o === 'prev' && u <= m),
    h = () => {
      (l = new Date().getTime()), n === null && (n = l);
      const u = Math.max(Math.min((l - n) / a, 1), 0),
        m = 0.5 - Math.cos(u * Math.PI) / 2;
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
function k(e, t = '') {
  return [...e.children].filter((i) => i.matches(t));
}
function de(e, t = []) {
  const i = document.createElement(e);
  return i.classList.add(...(Array.isArray(t) ? t : [t])), i;
}
function ye(e, t) {
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
function G(e, t) {
  return I().getComputedStyle(e, null).getPropertyValue(t);
}
function te(e) {
  let t = e,
    i;
  if (t) {
    for (i = 0; (t = t.previousSibling) !== null; )
      t.nodeType === 1 && (i += 1);
    return i;
  }
}
function Ce(e, t) {
  const i = [];
  let s = e.parentElement;
  for (; s; ) t ? s.matches(t) && i.push(s) : i.push(s), (s = s.parentElement);
  return i;
}
function ie(e, t, i) {
  const s = I();
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
let H;
function Me() {
  const e = I(),
    t = V();
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
function ce() {
  return H || (H = Me()), H;
}
let $;
function Pe({ userAgent: e } = {}) {
  const t = ce(),
    i = I(),
    s = i.navigator.platform,
    r = e || i.navigator.userAgent,
    n = { ios: !1, android: !1 },
    l = i.screen.width,
    a = i.screen.height,
    o = r.match(/(Android);?[\s\/]+([\d.]+)?/);
  let d = r.match(/(iPad).*OS\s([\d_]+)/);
  const h = r.match(/(iPod)(.*OS\s([\d_]+))?/),
    u = !d && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    m = s === 'Win32';
  let c = s === 'MacIntel';
  const f = [
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
      f.indexOf(`${l}x${a}`) >= 0 &&
      ((d = r.match(/(Version)\/([\d.]+)/)),
      d || (d = [0, 1, '13_0_0']),
      (c = !1)),
    o && !m && ((n.os = 'android'), (n.android = !0)),
    (d || u || h) && ((n.os = 'ios'), (n.ios = !0)),
    n
  );
}
function Le(e = {}) {
  return $ || ($ = Pe(e)), $;
}
let j;
function Ie() {
  const e = I();
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
function Oe() {
  return j || (j = Ie()), j;
}
function ze({ swiper: e, on: t, emit: i }) {
  const s = I();
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
            const { width: u, height: m } = e;
            let c = u,
              f = m;
            h.forEach(({ contentBoxSize: p, contentRect: v, target: g }) => {
              (g && g !== e.el) ||
                ((c = v ? v.width : (p[0] || p).inlineSize),
                (f = v ? v.height : (p[0] || p).blockSize));
            }),
              (c !== u || f !== m) && l();
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
    n = I(),
    l = (d, h = {}) => {
      const u = n.MutationObserver || n.WebkitMutationObserver,
        m = new u((c) => {
          if (e.__preventObserver__) return;
          if (c.length === 1) {
            s('observerUpdate', c[0]);
            return;
          }
          const f = function () {
            s('observerUpdate', c[0]);
          };
          n.requestAnimationFrame
            ? n.requestAnimationFrame(f)
            : n.setTimeout(f, 0);
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
          const d = Ce(e.el);
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
        parseInt(G(s, 'padding-left') || 0, 10) -
        parseInt(G(s, 'padding-right') || 0, 10)),
      (i =
        i -
        parseInt(G(s, 'padding-top') || 0, 10) -
        parseInt(G(s, 'padding-bottom') || 0, 10)),
      Number.isNaN(t) && (t = 0),
      Number.isNaN(i) && (i = 0),
      Object.assign(e, {
        width: t,
        height: i,
        size: e.isHorizontal() ? t : i
      }));
}
function Ve() {
  const e = this;
  function t(T) {
    return e.isHorizontal()
      ? T
      : {
          width: 'height',
          'margin-top': 'margin-left',
          'margin-bottom ': 'margin-right',
          'margin-left': 'margin-top',
          'margin-right': 'margin-bottom',
          'padding-left': 'padding-top',
          'padding-right': 'padding-bottom',
          marginRight: 'marginBottom'
        }[T];
  }
  function i(T, y) {
    return parseFloat(T.getPropertyValue(t(y)) || 0);
  }
  const s = e.params,
    { wrapperEl: r, slidesEl: n, size: l, rtlTranslate: a, wrongRTL: o } = e,
    d = e.virtual && s.virtual.enabled,
    h = d ? e.virtual.slides.length : e.slides.length,
    u = k(n, `.${e.params.slideClass}, swiper-slide`),
    m = d ? e.virtual.slides.length : u.length;
  let c = [];
  const f = [],
    p = [];
  let v = s.slidesOffsetBefore;
  typeof v == 'function' && (v = s.slidesOffsetBefore.call(e));
  let g = s.slidesOffsetAfter;
  typeof g == 'function' && (g = s.slidesOffsetAfter.call(e));
  const b = e.snapGrid.length,
    S = e.slidesGrid.length;
  let w = s.spaceBetween,
    E = -v,
    x = 0,
    P = 0;
  if (typeof l > 'u') return;
  typeof w == 'string' && w.indexOf('%') >= 0
    ? (w = (parseFloat(w.replace('%', '')) / 100) * l)
    : typeof w == 'string' && (w = parseFloat(w)),
    (e.virtualSize = -w),
    u.forEach((T) => {
      a ? (T.style.marginLeft = '') : (T.style.marginRight = ''),
        (T.style.marginBottom = ''),
        (T.style.marginTop = '');
    }),
    s.centeredSlides &&
      s.cssMode &&
      (_(r, '--swiper-centered-offset-before', ''),
      _(r, '--swiper-centered-offset-after', ''));
  const A = s.grid && s.grid.rows > 1 && e.grid;
  A && e.grid.initSlides(m);
  let M;
  const pe =
    s.slidesPerView === 'auto' &&
    s.breakpoints &&
    Object.keys(s.breakpoints).filter(
      (T) => typeof s.breakpoints[T].slidesPerView < 'u'
    ).length > 0;
  for (let T = 0; T < m; T += 1) {
    M = 0;
    let y;
    if (
      (u[T] && (y = u[T]),
      A && e.grid.updateSlide(T, y, m, t),
      !(u[T] && G(y, 'display') === 'none'))
    ) {
      if (s.slidesPerView === 'auto') {
        pe && (u[T].style[t('width')] = '');
        const C = getComputedStyle(y),
          z = y.style.transform,
          F = y.style.webkitTransform;
        if (
          (z && (y.style.transform = 'none'),
          F && (y.style.webkitTransform = 'none'),
          s.roundLengths)
        )
          M = e.isHorizontal() ? ie(y, 'width', !0) : ie(y, 'height', !0);
        else {
          const K = i(C, 'width'),
            me = i(C, 'padding-left'),
            he = i(C, 'padding-right'),
            J = i(C, 'margin-left'),
            Q = i(C, 'margin-right'),
            Z = C.getPropertyValue('box-sizing');
          if (Z && Z === 'border-box') M = K + J + Q;
          else {
            const { clientWidth: ge, offsetWidth: ve } = y;
            M = K + me + he + J + Q + (ve - ge);
          }
        }
        z && (y.style.transform = z),
          F && (y.style.webkitTransform = F),
          s.roundLengths && (M = Math.floor(M));
      } else
        (M = (l - (s.slidesPerView - 1) * w) / s.slidesPerView),
          s.roundLengths && (M = Math.floor(M)),
          u[T] && (u[T].style[t('width')] = `${M}px`);
      u[T] && (u[T].swiperSlideSize = M),
        p.push(M),
        s.centeredSlides
          ? ((E = E + M / 2 + x / 2 + w),
            x === 0 && T !== 0 && (E = E - l / 2 - w),
            T === 0 && (E = E - l / 2 - w),
            Math.abs(E) < 1 / 1e3 && (E = 0),
            s.roundLengths && (E = Math.floor(E)),
            P % s.slidesPerGroup === 0 && c.push(E),
            f.push(E))
          : (s.roundLengths && (E = Math.floor(E)),
            (P - Math.min(e.params.slidesPerGroupSkip, P)) %
              e.params.slidesPerGroup ===
              0 && c.push(E),
            f.push(E),
            (E = E + M + w)),
        (e.virtualSize += M + w),
        (x = M),
        (P += 1);
    }
  }
  if (
    ((e.virtualSize = Math.max(e.virtualSize, l) + g),
    a &&
      o &&
      (s.effect === 'slide' || s.effect === 'coverflow') &&
      (r.style.width = `${e.virtualSize + w}px`),
    s.setWrapperSize && (r.style[t('width')] = `${e.virtualSize + w}px`),
    A && e.grid.updateWrapperSize(M, c, t),
    !s.centeredSlides)
  ) {
    const T = [];
    for (let y = 0; y < c.length; y += 1) {
      let C = c[y];
      s.roundLengths && (C = Math.floor(C)),
        c[y] <= e.virtualSize - l && T.push(C);
    }
    (c = T),
      Math.floor(e.virtualSize - l) - Math.floor(c[c.length - 1]) > 1 &&
        c.push(e.virtualSize - l);
  }
  if (d && s.loop) {
    const T = p[0] + w;
    if (s.slidesPerGroup > 1) {
      const y = Math.ceil(
          (e.virtual.slidesBefore + e.virtual.slidesAfter) / s.slidesPerGroup
        ),
        C = T * s.slidesPerGroup;
      for (let z = 0; z < y; z += 1) c.push(c[c.length - 1] + C);
    }
    for (let y = 0; y < e.virtual.slidesBefore + e.virtual.slidesAfter; y += 1)
      s.slidesPerGroup === 1 && c.push(c[c.length - 1] + T),
        f.push(f[f.length - 1] + T),
        (e.virtualSize += T);
  }
  if ((c.length === 0 && (c = [0]), w !== 0)) {
    const T = e.isHorizontal() && a ? 'marginLeft' : t('marginRight');
    u.filter((y, C) =>
      !s.cssMode || s.loop ? !0 : C !== u.length - 1
    ).forEach((y) => {
      y.style[T] = `${w}px`;
    });
  }
  if (s.centeredSlides && s.centeredSlidesBounds) {
    let T = 0;
    p.forEach((C) => {
      T += C + (w || 0);
    }),
      (T -= w);
    const y = T - l;
    c = c.map((C) => (C <= 0 ? -v : C > y ? y + g : C));
  }
  if (s.centerInsufficientSlides) {
    let T = 0;
    if (
      (p.forEach((y) => {
        T += y + (w || 0);
      }),
      (T -= w),
      T < l)
    ) {
      const y = (l - T) / 2;
      c.forEach((C, z) => {
        c[z] = C - y;
      }),
        f.forEach((C, z) => {
          f[z] = C + y;
        });
    }
  }
  if (
    (Object.assign(e, {
      slides: u,
      snapGrid: c,
      slidesGrid: f,
      slidesSizesGrid: p
    }),
    s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
  ) {
    _(r, '--swiper-centered-offset-before', `${-c[0]}px`),
      _(
        r,
        '--swiper-centered-offset-after',
        `${e.size / 2 - p[p.length - 1] / 2}px`
      );
    const T = -e.snapGrid[0],
      y = -e.slidesGrid[0];
    (e.snapGrid = e.snapGrid.map((C) => C + T)),
      (e.slidesGrid = e.slidesGrid.map((C) => C + y));
  }
  if (
    (m !== h && e.emit('slidesLengthChange'),
    c.length !== b &&
      (e.params.watchOverflow && e.checkOverflow(),
      e.emit('snapGridLengthChange')),
    f.length !== S && e.emit('slidesGridLengthChange'),
    s.watchSlidesProgress && e.updateSlidesOffset(),
    !d && !s.cssMode && (s.effect === 'slide' || s.effect === 'fade'))
  ) {
    const T = `${s.containerModifierClass}backface-hidden`,
      y = e.el.classList.contains(T);
    m <= s.maxBackfaceHiddenSlides
      ? y || e.el.classList.add(T)
      : y && e.el.classList.remove(T);
  }
}
function De(e) {
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
    const u =
        (l + (i.centeredSlides ? t.minTranslate() : 0) - h) /
        (d.swiperSlideSize + a),
      m =
        (l - n[0] + (i.centeredSlides ? t.minTranslate() : 0) - h) /
        (d.swiperSlideSize + a),
      c = -(l - h),
      f = c + t.slidesSizesGrid[o];
    ((c >= 0 && c < t.size - 1) ||
      (f > 1 && f <= t.size) ||
      (c <= 0 && f >= t.size)) &&
      (t.visibleSlides.push(d),
      t.visibleSlidesIndexes.push(o),
      s[o].classList.add(i.slideVisibleClass)),
      (d.progress = r ? -u : u),
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
      u = Math.abs(e - t.maxTranslate()) < 1;
    (n = h || r <= 0), (l = u || r >= 1), h && (r = 0), u && (r = 1);
  }
  if (i.loop) {
    const h = t.getSlideIndexByData(0),
      u = t.getSlideIndexByData(t.slides.length - 1),
      m = t.slidesGrid[h],
      c = t.slidesGrid[u],
      f = t.slidesGrid[t.slidesGrid.length - 1],
      p = Math.abs(e);
    p >= m ? (a = (p - m) / f) : (a = (p + f - c) / f), a > 1 && (a -= 1);
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
    l = (o) => k(s, `.${i.slideClass}${o}, swiper-slide${o}`)[0];
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
    let d = ye(a, `.${i.slideClass}, swiper-slide`)[0];
    i.loop && !d === 0 && (d = t[t.length - 1]),
      d && d.classList.add(i.slidePrevClass);
  }
  e.emitSlidesClasses();
}
const B = (e, t) => {
    if (!e || e.destroyed || !e.params) return;
    const i = () => (e.isElement ? 'swiper-slide' : `.${e.params.slideClass}`),
      s = t.closest(i());
    if (s) {
      const r = s.querySelector(`.${e.params.lazyPreloaderClass}`);
      r && r.remove();
    }
  },
  W = (e, t) => {
    if (!e.slides[t]) return;
    const i = e.slides[t].querySelector('[loading="lazy"]');
    i && i.removeAttribute('loading');
  },
  q = (e) => {
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
          a.includes(o.column) && W(e, d);
        });
      return;
    }
    const n = r + s - 1;
    if (e.params.rewind || e.params.loop)
      for (let l = r - t; l <= n + t; l += 1) {
        const a = ((l % i) + i) % i;
        (a < r || a > n) && W(e, a);
      }
    else
      for (let l = Math.max(r - t, 0); l <= Math.min(n + t, i - 1); l += 1)
        l !== r && (l > n || l < r) && W(e, l);
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
  let u;
  t.virtual && r.virtual.enabled && r.loop
    ? (u = h(o))
    : t.slides[o]
    ? (u = parseInt(
        t.slides[o].getAttribute('data-swiper-slide-index') || o,
        10
      ))
    : (u = o),
    Object.assign(t, {
      previousSnapIndex: a,
      snapIndex: d,
      previousRealIndex: l,
      realIndex: u,
      previousIndex: n,
      activeIndex: o
    }),
    t.initialized && q(t),
    t.emit('activeIndexChange'),
    t.emit('snapIndexChange'),
    l !== u && t.emit('realIndexChange'),
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
  updateSlides: Ve,
  updateAutoHeight: De,
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
function Xe(e, t) {
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
  const u = i.maxTranslate() - i.minTranslate();
  u === 0 ? (h = 0) : (h = (e - i.minTranslate()) / u),
    h !== l && i.updateProgress(e),
    i.emit('setTranslate', i.translate, t);
}
function Ye() {
  return -this.snapGrid[0];
}
function qe() {
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
    const u = n.isHorizontal();
    if (t === 0) a[u ? 'scrollLeft' : 'scrollTop'] = -h;
    else {
      if (!n.support.smoothScroll)
        return (
          oe({ swiper: n, targetPosition: -h, side: u ? 'left' : 'top' }), !0
        );
      a.scrollTo({ [u ? 'left' : 'top']: -h, behavior: 'smooth' });
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
  setTranslate: Xe,
  minTranslate: Ye,
  maxTranslate: qe,
  translateTo: Ue
};
function Je(e, t) {
  const i = this;
  i.params.cssMode || (i.wrapperEl.style.transitionDuration = `${e}ms`),
    i.emit('setTransition', e, t);
}
function fe({ swiper: e, runCallbacks: t, direction: i, step: s }) {
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
    fe({ swiper: i, runCallbacks: e, direction: t, step: 'Start' }));
}
function Ze(e = !0, t) {
  const i = this,
    { params: s } = i;
  (i.animating = !1),
    !s.cssMode &&
      (i.setTransition(0),
      fe({ swiper: i, runCallbacks: e, direction: t, step: 'End' }));
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
    activeIndex: u,
    rtlTranslate: m,
    wrapperEl: c,
    enabled: f
  } = n;
  if ((n.animating && a.preventInteractionOnTransition) || (!f && !s && !r))
    return !1;
  const p = Math.min(n.params.slidesPerGroupSkip, l);
  let v = p + Math.floor((l - p) / n.params.slidesPerGroup);
  v >= o.length && (v = o.length - 1);
  const g = -o[v];
  if (a.normalizeSlideIndex)
    for (let S = 0; S < d.length; S += 1) {
      const w = -Math.floor(g * 100),
        E = Math.floor(d[S] * 100),
        x = Math.floor(d[S + 1] * 100);
      typeof d[S + 1] < 'u'
        ? w >= E && w < x - (x - E) / 2
          ? (l = S)
          : w >= E && w < x && (l = S + 1)
        : w >= E && (l = S);
    }
  if (
    n.initialized &&
    l !== u &&
    ((!n.allowSlideNext &&
      (m
        ? g > n.translate && g > n.minTranslate()
        : g < n.translate && g < n.minTranslate())) ||
      (!n.allowSlidePrev &&
        g > n.translate &&
        g > n.maxTranslate() &&
        (u || 0) !== l))
  )
    return !1;
  l !== (h || 0) && i && n.emit('beforeSlideChangeStart'), n.updateProgress(g);
  let b;
  if (
    (l > u ? (b = 'next') : l < u ? (b = 'prev') : (b = 'reset'),
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
    const S = n.isHorizontal(),
      w = m ? g : -g;
    if (t === 0) {
      const E = n.virtual && n.params.virtual.enabled;
      E &&
        ((n.wrapperEl.style.scrollSnapType = 'none'),
        (n._immediateVirtual = !0)),
        E && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0
          ? ((n._cssModeVirtualInitialSet = !0),
            requestAnimationFrame(() => {
              c[S ? 'scrollLeft' : 'scrollTop'] = w;
            }))
          : (c[S ? 'scrollLeft' : 'scrollTop'] = w),
        E &&
          requestAnimationFrame(() => {
            (n.wrapperEl.style.scrollSnapType = ''), (n._immediateVirtual = !1);
          });
    } else {
      if (!n.support.smoothScroll)
        return (
          oe({ swiper: n, targetPosition: w, side: S ? 'left' : 'top' }), !0
        );
      c.scrollTo({ [S ? 'left' : 'top']: w, behavior: 'smooth' });
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
          (n.onSlideToWrapperTransitionEnd = function (w) {
            !n ||
              n.destroyed ||
              (w.target === this &&
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
  const u = a ? s.translate : -s.translate;
  function m(g) {
    return g < 0 ? -Math.floor(Math.abs(g)) : Math.floor(g);
  }
  const c = m(u),
    f = n.map((g) => m(g));
  let p = n[f.indexOf(c) - 1];
  if (typeof p > 'u' && r.cssMode) {
    let g;
    n.forEach((b, S) => {
      c >= b && (g = S);
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
              k(i, `${l}[data-swiper-slide-index="${n}"]`)[0]
            )),
            Y(() => {
              e.slideTo(r);
            }))
          : e.slideTo(r)
        : r > e.slides.length - s
        ? (e.loopFix(),
          (r = e.getSlideIndex(
            k(i, `${l}[data-swiper-slide-index="${n}"]`)[0]
          )),
          Y(() => {
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
  k(s, `.${i.slideClass}, swiper-slide`).forEach((n, l) => {
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
    slidesEl: u,
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
  let f = m.loopedSlides || c;
  f % m.slidesPerGroup !== 0 &&
    (f += m.slidesPerGroup - (f % m.slidesPerGroup)),
    (a.loopedSlides = f);
  const p = [],
    v = [];
  let g = a.activeIndex;
  typeof r > 'u'
    ? (r = a.getSlideIndex(
        a.slides.filter((x) => x.classList.contains(m.slideActiveClass))[0]
      ))
    : (g = r);
  const b = i === 'next' || !i,
    S = i === 'prev' || !i;
  let w = 0,
    E = 0;
  if (r < f) {
    w = Math.max(f - r, m.slidesPerGroup);
    for (let x = 0; x < f - r; x += 1) {
      const P = x - Math.floor(x / o.length) * o.length;
      p.push(o.length - P - 1);
    }
  } else if (r > a.slides.length - f * 2) {
    E = Math.max(r - (a.slides.length - f * 2), m.slidesPerGroup);
    for (let x = 0; x < E; x += 1) {
      const P = x - Math.floor(x / o.length) * o.length;
      v.push(P);
    }
  }
  if (
    (S &&
      p.forEach((x) => {
        (a.slides[x].swiperLoopMoveDOM = !0),
          u.prepend(a.slides[x]),
          (a.slides[x].swiperLoopMoveDOM = !1);
      }),
    b &&
      v.forEach((x) => {
        (a.slides[x].swiperLoopMoveDOM = !0),
          u.append(a.slides[x]),
          (a.slides[x].swiperLoopMoveDOM = !1);
      }),
    a.recalcSlides(),
    m.slidesPerView === 'auto' && a.updateSlides(),
    m.watchSlidesProgress && a.updateSlidesOffset(),
    t)
  ) {
    if (p.length > 0 && S)
      if (typeof e > 'u') {
        const x = a.slidesGrid[g],
          A = a.slidesGrid[g + w] - x;
        l
          ? a.setTranslate(a.translate - A)
          : (a.slideTo(g + w, 0, !1, !0),
            s && (a.touches[a.isHorizontal() ? 'startX' : 'startY'] += A));
      } else s && a.slideToLoop(e, 0, !1, !0);
    else if (v.length > 0 && b)
      if (typeof e > 'u') {
        const x = a.slidesGrid[g],
          A = a.slidesGrid[g - E] - x;
        l
          ? a.setTranslate(a.translate - A)
          : (a.slideTo(g - E, 0, !1, !0),
            s && (a.touches[a.isHorizontal() ? 'startX' : 'startY'] += A));
      } else a.slideToLoop(e, 0, !1, !0);
  }
  if (
    ((a.allowSlidePrev = d),
    (a.allowSlideNext = h),
    a.controller && a.controller.control && !n)
  ) {
    const x = {
      slideRealIndex: e,
      slideTo: !1,
      direction: i,
      setTranslate: s,
      activeSlideIndex: r,
      byController: !0
    };
    Array.isArray(a.controller.control)
      ? a.controller.control.forEach((P) => {
          !P.destroyed && P.params.loop && P.loopFix(x);
        })
      : a.controller.control instanceof a.constructor &&
        a.controller.control.params.loop &&
        a.controller.control.loopFix(x);
  }
  a.emit('loopFix');
}
function ft() {
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
const ut = { loopCreate: dt, loopFix: ct, loopDestroy: ft };
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
    if (!s || s === V() || s === I()) return null;
    s.assignedSlot && (s = s.assignedSlot);
    const r = s.closest(e);
    return !r && !s.getRootNode ? null : r || i(s.getRootNode().host);
  }
  return i(t);
}
function vt(e) {
  const t = this,
    i = V(),
    s = I(),
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
    u = e.composedPath ? e.composedPath() : e.path;
  h && o.target && o.target.shadowRoot && u && (d = u[0]);
  const m = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`,
    c = !!(o.target && o.target.shadowRoot);
  if (n.noSwiping && (c ? gt(m, d) : d.closest(m))) {
    t.allowClick = !0;
    return;
  }
  if (n.swipeHandler && !d.closest(n.swipeHandler)) return;
  (l.currentX = o.pageX), (l.currentY = o.pageY);
  const f = l.currentX,
    p = l.currentY,
    v = n.edgeSwipeDetection || n.iOSEdgeSwipeDetection,
    g = n.edgeSwipeThreshold || n.iOSEdgeSwipeThreshold;
  if (v && (f <= g || f >= s.innerWidth - g))
    if (v === 'prevent') e.preventDefault();
    else return;
  Object.assign(r, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0
  }),
    (l.startX = f),
    (l.startY = p),
    (r.touchStartTime = N()),
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
  const S = b && t.allowTouchMove && n.touchStartPreventDefault;
  (n.touchStartForcePreventDefault || S) &&
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
  const t = V(),
    i = this,
    s = i.touchEventsData,
    { params: r, touches: n, rtlTranslate: l, enabled: a } = i;
  if (!a || (!r.simulateTouch && e.pointerType === 'mouse')) return;
  let o = e;
  if ((o.originalEvent && (o = o.originalEvent), !s.isTouched)) {
    s.startMoving && s.isScrolling && i.emit('touchMoveOpposite', o);
    return;
  }
  const d = s.evCache.findIndex((x) => x.pointerId === o.pointerId);
  d >= 0 && (s.evCache[d] = o);
  const h = s.evCache.length > 1 ? s.evCache[0] : o,
    u = h.pageX,
    m = h.pageY;
  if (o.preventedByNestedSwiper) {
    (n.startX = u), (n.startY = m);
    return;
  }
  if (!i.allowTouchMove) {
    o.target.matches(s.focusableElements) || (i.allowClick = !1),
      s.isTouched &&
        (Object.assign(n, {
          startX: u,
          startY: m,
          prevX: i.touches.currentX,
          prevY: i.touches.currentY,
          currentX: u,
          currentY: m
        }),
        (s.touchStartTime = N()));
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
      (u < n.startX && i.translate <= i.maxTranslate()) ||
      (u > n.startX && i.translate >= i.minTranslate())
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
  (n.currentX = u), (n.currentY = m);
  const c = n.currentX - n.startX,
    f = n.currentY - n.startY;
  if (i.params.threshold && Math.sqrt(c ** 2 + f ** 2) < i.params.threshold)
    return;
  if (typeof s.isScrolling > 'u') {
    let x;
    (i.isHorizontal() && n.currentY === n.startY) ||
    (i.isVertical() && n.currentX === n.startX)
      ? (s.isScrolling = !1)
      : c * c + f * f >= 25 &&
        ((x = (Math.atan2(Math.abs(f), Math.abs(c)) * 180) / Math.PI),
        (s.isScrolling = i.isHorizontal()
          ? x > r.touchAngle
          : 90 - x > r.touchAngle));
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
  let p = i.isHorizontal() ? c : f,
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
      const x = new window.CustomEvent('transitionend', {
        bubbles: !0,
        cancelable: !0
      });
      i.wrapperEl.dispatchEvent(x);
    }
    (s.allowMomentumBounce = !1),
      r.grabCursor &&
        (i.allowSlideNext === !0 || i.allowSlidePrev === !0) &&
        i.setGrabCursor(!0),
      i.emit('sliderFirstMove', o);
  }
  let S;
  s.isMoved &&
    g !== i.touchesDirection &&
    b &&
    Math.abs(p) >= 1 &&
    (i.loopFix({ direction: i.swipeDirection, setTranslate: !0 }), (S = !0)),
    i.emit('sliderMove', o),
    (s.isMoved = !0),
    (s.currentTranslate = p + s.startTranslate);
  let w = !0,
    E = r.resistanceRatio;
  if (
    (r.touchReleaseOnEdges && (E = 0),
    p > 0
      ? (b &&
          !S &&
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
          ((w = !1),
          r.resistance &&
            (s.currentTranslate =
              i.minTranslate() -
              1 +
              (-i.minTranslate() + s.startTranslate + p) ** E)))
      : p < 0 &&
        (b &&
          !S &&
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
          ((w = !1),
          r.resistance &&
            (s.currentTranslate =
              i.maxTranslate() +
              1 -
              (i.maxTranslate() - s.startTranslate - p) ** E))),
    w && (o.preventedByNestedSwiper = !0),
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
function wt(e) {
  const t = this,
    i = t.touchEventsData,
    s = i.evCache.findIndex((S) => S.pointerId === e.pointerId);
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
  const h = N(),
    u = h - i.touchStartTime;
  if (t.allowClick) {
    const S = d.path || (d.composedPath && d.composedPath());
    t.updateClickedSlide((S && S[0]) || d.target),
      t.emit('tap click', d),
      u < 300 &&
        h - i.lastClickTime < 300 &&
        t.emit('doubleTap doubleClick', d);
  }
  if (
    ((i.lastClickTime = N()),
    Y(() => {
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
    f = t.slidesSizesGrid[0];
  for (
    let S = 0;
    S < a.length;
    S += S < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup
  ) {
    const w = S < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
    typeof a[S + w] < 'u'
      ? m >= a[S] && m < a[S + w] && ((c = S), (f = a[S + w] - a[S]))
      : m >= a[S] && ((c = S), (f = a[a.length - 1] - a[a.length - 2]));
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
  const g = (m - a[c]) / f,
    b = c < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
  if (u > r.longSwipesMs) {
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
function se() {
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
function Tt(e) {
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
function xt(e) {
  const t = this;
  B(t, e.target),
    !(
      t.params.cssMode ||
      (t.params.slidesPerView !== 'auto' && !t.params.autoHeight)
    ) && t.update();
}
let ne = !1;
function yt() {}
const ue = (e, t) => {
  const i = V(),
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
          se,
          !0
        )
      : e[d]('observerUpdate', se, !0),
    r[o]('load', e.onLoad, { capture: !0 });
};
function Et() {
  const e = this,
    t = V(),
    { params: i } = e;
  (e.onTouchStart = vt.bind(e)),
    (e.onTouchMove = St.bind(e)),
    (e.onTouchEnd = wt.bind(e)),
    i.cssMode && (e.onScroll = bt.bind(e)),
    (e.onClick = Tt.bind(e)),
    (e.onLoad = xt.bind(e)),
    ne || (t.addEventListener('touchstart', yt), (ne = !0)),
    ue(e, 'on');
}
function Ct() {
  ue(this, 'off');
}
const Mt = { attachEvents: Et, detachEvents: Ct },
  re = (e, t) => e.grid && t.grid && t.grid.rows > 1;
function Pt() {
  const e = this,
    { realIndex: t, initialized: i, params: s, el: r } = e,
    n = s.breakpoints;
  if (!n || (n && Object.keys(n).length === 0)) return;
  const l = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
  if (!l || e.currentBreakpoint === l) return;
  const o = (l in n ? n[l] : void 0) || e.originalParams,
    d = re(e, s),
    h = re(e, o),
    u = s.enabled;
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
  m && i && e.changeDirection(), L(e.params, o);
  const f = e.params.enabled;
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev
  }),
    u && !f ? e.disable() : !u && f && e.enable(),
    (e.currentBreakpoint = l),
    e.emit('_beforeBreakpoint', o),
    c && i && (e.loopDestroy(), e.loopCreate(t), e.updateSlides()),
    e.emit('breakpoint', o);
}
function Lt(e, t = 'window', i) {
  if (!e || (t === 'container' && !i)) return;
  let s = !1;
  const r = I(),
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
const It = { setBreakpoint: Pt, getBreakpoint: Lt };
function Ot(e, t) {
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
    l = Ot(
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
const Vt = { checkOverflow: Gt },
  ae = {
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
function Dt(e, t) {
  return function (s = {}) {
    const r = Object.keys(s)[0],
      n = s[r];
    if (typeof n != 'object' || n === null) {
      L(t, s);
      return;
    }
    if (
      (['navigation', 'pagination', 'scrollbar'].indexOf(r) >= 0 &&
        e[r] === !0 &&
        (e[r] = { auto: !0 }),
      !(r in e && 'enabled' in n))
    ) {
      L(t, s);
      return;
    }
    e[r] === !0 && (e[r] = { enabled: !0 }),
      typeof e[r] == 'object' && !('enabled' in e[r]) && (e[r].enabled = !0),
      e[r] || (e[r] = { enabled: !1 }),
      L(t, s);
  };
}
const R = {
    eventsEmitter: Ae,
    update: We,
    translate: Ke,
    transition: et,
    slide: ot,
    loop: ut,
    grabCursor: ht,
    events: Mt,
    breakpoints: It,
    checkOverflow: Vt,
    classes: At
  },
  X = {};
class O {
  constructor(...t) {
    let i, s;
    t.length === 1 &&
    t[0].constructor &&
    Object.prototype.toString.call(t[0]).slice(8, -1) === 'Object'
      ? (s = t[0])
      : ([i, s] = t),
      s || (s = {}),
      (s = L({}, s)),
      i && !s.el && (s.el = i);
    const r = V();
    if (
      s.el &&
      typeof s.el == 'string' &&
      r.querySelectorAll(s.el).length > 1
    ) {
      const o = [];
      return (
        r.querySelectorAll(s.el).forEach((d) => {
          const h = L({}, s, { el: d });
          o.push(new O(h));
        }),
        o
      );
    }
    const n = this;
    (n.__swiper__ = !0),
      (n.support = ce()),
      (n.device = Le({ userAgent: s.userAgent })),
      (n.browser = Oe()),
      (n.eventsListeners = {}),
      (n.eventsAnyListeners = []),
      (n.modules = [...n.__modules__]),
      s.modules && Array.isArray(s.modules) && n.modules.push(...s.modules);
    const l = {};
    n.modules.forEach((o) => {
      o({
        params: s,
        swiper: n,
        extendParams: Dt(s, l),
        on: n.on.bind(n),
        once: n.once.bind(n),
        off: n.off.bind(n),
        emit: n.emit.bind(n)
      });
    });
    const a = L({}, ae, l);
    return (
      (n.params = L({}, a, X, s)),
      (n.originalParams = L({}, n.params)),
      (n.passedParams = L({}, s)),
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
      r = k(i, `.${s.slideClass}, swiper-slide`),
      n = te(r[0]);
    return te(t) - n;
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
    t.slides = k(i, `.${s.slideClass}, swiper-slide`);
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
      let u = n[d] ? n[d].swiperSlideSize : 0,
        m;
      for (let c = d + 1; c < n.length; c += 1)
        n[c] &&
          !m &&
          ((u += n[c].swiperSlideSize), (h += 1), u > o && (m = !0));
      for (let c = d - 1; c >= 0; c -= 1)
        n[c] &&
          !m &&
          ((u += n[c].swiperSlideSize), (h += 1), u > o && (m = !0));
    } else if (t === 'current')
      for (let u = d + 1; u < n.length; u += 1)
        (i ? l[u] + a[u] - l[d] < o : l[u] - l[d] < o) && (h += 1);
    else for (let u = d - 1; u >= 0; u -= 1) l[d] - l[u] < o && (h += 1);
    return h;
  }
  update() {
    const t = this;
    if (!t || t.destroyed) return;
    const { snapGrid: i, params: s } = t;
    s.breakpoints && t.setBreakpoint(),
      [...t.el.querySelectorAll('[loading="lazy"]')].forEach((l) => {
        l.complete && B(t, l);
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
        : k(s, r())[0])();
    return (
      !l &&
        i.params.createElements &&
        ((l = de('div', i.params.wrapperClass)),
        s.append(l),
        k(s, `.${i.params.slideClass}`).forEach((a) => {
          l.append(a);
        })),
      Object.assign(i, {
        el: s,
        wrapperEl: l,
        slidesEl: i.isElement ? s : l,
        mounted: !0,
        rtl: s.dir.toLowerCase() === 'rtl' || G(s, 'direction') === 'rtl',
        rtlTranslate:
          i.params.direction === 'horizontal' &&
          (s.dir.toLowerCase() === 'rtl' || G(s, 'direction') === 'rtl'),
        wrongRTL: G(l, 'display') === '-webkit-box'
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
            ? B(i, r)
            : r.addEventListener('load', (n) => {
                B(i, n.target);
              });
        }),
        q(i),
        (i.initialized = !0),
        q(i),
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
        t !== !1 && ((s.el.swiper = null), we(s)),
        (s.destroyed = !0)),
      null
    );
  }
  static extendDefaults(t) {
    L(X, t);
  }
  static get extendedDefaults() {
    return X;
  }
  static get defaults() {
    return ae;
  }
  static installModule(t) {
    O.prototype.__modules__ || (O.prototype.__modules__ = []);
    const i = O.prototype.__modules__;
    typeof t == 'function' && i.indexOf(t) < 0 && i.push(t);
  }
  static use(t) {
    return Array.isArray(t)
      ? (t.forEach((i) => O.installModule(i)), O)
      : (O.installModule(t), O);
  }
}
Object.keys(R).forEach((e) => {
  Object.keys(R[e]).forEach((t) => {
    O.prototype[t] = R[e][t];
  });
});
O.use([ze, ke]);
function _t(e, t, i, s) {
  return (
    e.params.createElements &&
      Object.keys(s).forEach((r) => {
        if (!i[r] && i.auto === !0) {
          let n = k(e.el, `.${s[r]}`)[0];
          n || ((n = de('div', s[r])), (n.className = s[r]), e.el.append(n)),
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
  const r = (f) => (Array.isArray(f) || (f = [f].filter((p) => !!p)), f);
  function n(f) {
    let p;
    return f &&
      typeof f == 'string' &&
      e.isElement &&
      ((p = e.el.shadowRoot.querySelector(f)), p)
      ? p
      : (f &&
          (typeof f == 'string' && (p = [...document.querySelectorAll(f)]),
          e.params.uniqueNavElements &&
            typeof f == 'string' &&
            p.length > 1 &&
            e.el.querySelectorAll(f).length === 1 &&
            (p = e.el.querySelector(f))),
        f && !p ? f : p);
  }
  function l(f, p) {
    const v = e.params.navigation;
    (f = r(f)),
      f.forEach((g) => {
        g &&
          (g.classList[p ? 'add' : 'remove'](...v.disabledClass.split(' ')),
          g.tagName === 'BUTTON' && (g.disabled = p),
          e.params.watchOverflow &&
            e.enabled &&
            g.classList[e.isLocked ? 'add' : 'remove'](v.lockClass));
      });
  }
  function a() {
    const { nextEl: f, prevEl: p } = e.navigation;
    if (e.params.loop) {
      l(p, !1), l(f, !1);
      return;
    }
    l(p, e.isBeginning && !e.params.rewind), l(f, e.isEnd && !e.params.rewind);
  }
  function o(f) {
    f.preventDefault(),
      !(e.isBeginning && !e.params.loop && !e.params.rewind) &&
        (e.slidePrev(), s('navigationPrev'));
  }
  function d(f) {
    f.preventDefault(),
      !(e.isEnd && !e.params.loop && !e.params.rewind) &&
        (e.slideNext(), s('navigationNext'));
  }
  function h() {
    const f = e.params.navigation;
    if (
      ((e.params.navigation = _t(
        e,
        e.originalParams.navigation,
        e.params.navigation,
        { nextEl: 'swiper-button-next', prevEl: 'swiper-button-prev' }
      )),
      !(f.nextEl || f.prevEl))
    )
      return;
    let p = n(f.nextEl),
      v = n(f.prevEl);
    Object.assign(e.navigation, { nextEl: p, prevEl: v }),
      (p = r(p)),
      (v = r(v));
    const g = (b, S) => {
      b && b.addEventListener('click', S === 'next' ? d : o),
        !e.enabled && b && b.classList.add(...f.lockClass.split(' '));
    };
    p.forEach((b) => g(b, 'next')), v.forEach((b) => g(b, 'prev'));
  }
  function u() {
    let { nextEl: f, prevEl: p } = e.navigation;
    (f = r(f)), (p = r(p));
    const v = (g, b) => {
      g.removeEventListener('click', b === 'next' ? d : o),
        g.classList.remove(...e.params.navigation.disabledClass.split(' '));
    };
    f.forEach((g) => v(g, 'next')), p.forEach((g) => v(g, 'prev'));
  }
  i('init', () => {
    e.params.navigation.enabled === !1 ? c() : (h(), a());
  }),
    i('toEdge fromEdge lock unlock', () => {
      a();
    }),
    i('destroy', () => {
      u();
    }),
    i('enable disable', () => {
      let { nextEl: f, prevEl: p } = e.navigation;
      (f = r(f)),
        (p = r(p)),
        [...f, ...p]
          .filter((v) => !!v)
          .forEach((v) =>
            v.classList[e.enabled ? 'remove' : 'add'](
              e.params.navigation.lockClass
            )
          );
    }),
    i('click', (f, p) => {
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
        let S;
        v.length
          ? (S = v[0].classList.contains(e.params.navigation.hiddenClass))
          : g.length &&
            (S = g[0].classList.contains(e.params.navigation.hiddenClass)),
          s(S === !0 ? 'navigationShow' : 'navigationHide'),
          [...v, ...g]
            .filter((w) => !!w)
            .forEach((w) =>
              w.classList.toggle(e.params.navigation.hiddenClass)
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
        u();
    };
  Object.assign(e.navigation, {
    enable: m,
    disable: c,
    update: a,
    init: h,
    destroy: u
  });
}
document.addEventListener('alpine:initialized', () => {
  const e = document.querySelector('[data-case-slider]'),
    t = e.querySelector('.swiper-button-prev'),
    i = e.querySelector('.swiper-button-next');
  new O(e, {
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