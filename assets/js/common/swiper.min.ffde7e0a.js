function Z(e) {
  return (
    e !== null &&
    typeof e == 'object' &&
    'constructor' in e &&
    e.constructor === Object
  );
}
function q(e = {}, t = {}) {
  Object.keys(t).forEach((s) => {
    typeof e[s] > 'u'
      ? (e[s] = t[s])
      : Z(t[s]) && Z(e[s]) && Object.keys(t[s]).length > 0 && q(e[s], t[s]);
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
function D() {
  const e = typeof document < 'u' ? document : {};
  return q(e, le), e;
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
  return q(e, Se), e;
}
function we(e) {
  const t = e;
  Object.keys(t).forEach((s) => {
    try {
      t[s] = null;
    } catch {}
    try {
      delete t[s];
    } catch {}
  });
}
function X(e, t = 0) {
  return setTimeout(e, t);
}
function N() {
  return Date.now();
}
function Te(e) {
  const t = I();
  let s;
  return (
    t.getComputedStyle && (s = t.getComputedStyle(e, null)),
    !s && e.currentStyle && (s = e.currentStyle),
    s || (s = e.style),
    s
  );
}
function be(e, t = 'x') {
  const s = I();
  let i, r, n;
  const l = Te(e);
  return (
    s.WebKitCSSMatrix
      ? ((r = l.transform || l.webkitTransform),
        r.split(',').length > 6 &&
          (r = r
            .split(', ')
            .map((a) => a.replace(',', '.'))
            .join(', ')),
        (n = new s.WebKitCSSMatrix(r === 'none' ? '' : r)))
      : ((n =
          l.MozTransform ||
          l.OTransform ||
          l.MsTransform ||
          l.msTransform ||
          l.transform ||
          l
            .getPropertyValue('transform')
            .replace('translate(', 'matrix(1, 0, 0, 1,')),
        (i = n.toString().split(','))),
    t === 'x' &&
      (s.WebKitCSSMatrix
        ? (r = n.m41)
        : i.length === 16
        ? (r = parseFloat(i[12]))
        : (r = parseFloat(i[4]))),
    t === 'y' &&
      (s.WebKitCSSMatrix
        ? (r = n.m42)
        : i.length === 16
        ? (r = parseFloat(i[13]))
        : (r = parseFloat(i[5]))),
    r || 0
  );
}
function V(e) {
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
    s = ['__proto__', 'constructor', 'prototype'];
  for (let i = 1; i < e.length; i += 1) {
    const r = e[i];
    if (r != null && !xe(r)) {
      const n = Object.keys(Object(r)).filter((l) => s.indexOf(l) < 0);
      for (let l = 0, a = n.length; l < a; l += 1) {
        const o = n[l],
          d = Object.getOwnPropertyDescriptor(r, o);
        d !== void 0 &&
          d.enumerable &&
          (V(t[o]) && V(r[o])
            ? r[o].__swiper__
              ? (t[o] = r[o])
              : L(t[o], r[o])
            : !V(t[o]) && V(r[o])
            ? ((t[o] = {}), r[o].__swiper__ ? (t[o] = r[o]) : L(t[o], r[o]))
            : (t[o] = r[o]));
      }
    }
  }
  return t;
}
function _(e, t, s) {
  e.style.setProperty(t, s);
}
function oe({ swiper: e, targetPosition: t, side: s }) {
  const i = I(),
    r = -e.translate;
  let n = null,
    l;
  const a = e.params.speed;
  (e.wrapperEl.style.scrollSnapType = 'none'),
    i.cancelAnimationFrame(e.cssModeFrameID);
  const o = t > r ? 'next' : 'prev',
    d = (u, m) => (o === 'next' && u >= m) || (o === 'prev' && u <= m),
    h = () => {
      (l = new Date().getTime()), n === null && (n = l);
      const u = Math.max(Math.min((l - n) / a, 1), 0),
        m = 0.5 - Math.cos(u * Math.PI) / 2;
      let c = r + m * (t - r);
      if ((d(c, t) && (c = t), e.wrapperEl.scrollTo({ [s]: c }), d(c, t))) {
        (e.wrapperEl.style.overflow = 'hidden'),
          (e.wrapperEl.style.scrollSnapType = ''),
          setTimeout(() => {
            (e.wrapperEl.style.overflow = ''), e.wrapperEl.scrollTo({ [s]: c });
          }),
          i.cancelAnimationFrame(e.cssModeFrameID);
        return;
      }
      e.cssModeFrameID = i.requestAnimationFrame(h);
    };
  h();
}
function k(e, t = '') {
  return [...e.children].filter((s) => s.matches(t));
}
function de(e, t = []) {
  const s = document.createElement(e);
  return s.classList.add(...(Array.isArray(t) ? t : [t])), s;
}
function ye(e, t) {
  const s = [];
  for (; e.previousElementSibling; ) {
    const i = e.previousElementSibling;
    t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
  }
  return s;
}
function Ee(e, t) {
  const s = [];
  for (; e.nextElementSibling; ) {
    const i = e.nextElementSibling;
    t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
  }
  return s;
}
function G(e, t) {
  return I().getComputedStyle(e, null).getPropertyValue(t);
}
function ee(e) {
  let t = e,
    s;
  if (t) {
    for (s = 0; (t = t.previousSibling) !== null; )
      t.nodeType === 1 && (s += 1);
    return s;
  }
}
function Ce(e, t) {
  const s = [];
  let i = e.parentElement;
  for (; i; ) t ? i.matches(t) && s.push(i) : s.push(i), (i = i.parentElement);
  return s;
}
function Bt(e, t) {
  function s(i) {
    i.target === e && (t.call(e, i), e.removeEventListener('transitionend', s));
  }
  t && e.addEventListener('transitionend', s);
}
function te(e, t, s) {
  const i = I();
  return s
    ? e[t === 'width' ? 'offsetWidth' : 'offsetHeight'] +
        parseFloat(
          i
            .getComputedStyle(e, null)
            .getPropertyValue(t === 'width' ? 'margin-right' : 'margin-top')
        ) +
        parseFloat(
          i
            .getComputedStyle(e, null)
            .getPropertyValue(t === 'width' ? 'margin-left' : 'margin-bottom')
        )
    : e.offsetWidth;
}
let H;
function Me() {
  const e = I(),
    t = D();
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
    s = I(),
    i = s.navigator.platform,
    r = e || s.navigator.userAgent,
    n = { ios: !1, android: !1 },
    l = s.screen.width,
    a = s.screen.height,
    o = r.match(/(Android);?[\s\/]+([\d.]+)?/);
  let d = r.match(/(iPad).*OS\s([\d_]+)/);
  const h = r.match(/(iPod)(.*OS\s([\d_]+))?/),
    u = !d && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    m = i === 'Win32';
  let c = i === 'MacIntel';
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
  function s() {
    const i = e.navigator.userAgent.toLowerCase();
    return (
      i.indexOf('safari') >= 0 &&
      i.indexOf('chrome') < 0 &&
      i.indexOf('android') < 0
    );
  }
  if (s()) {
    const i = String(e.navigator.userAgent);
    if (i.includes('Version/')) {
      const [r, n] = i
        .split('Version/')[1]
        .split(' ')[0]
        .split('.')
        .map((l) => Number(l));
      t = r < 16 || (r === 16 && n < 2);
    }
  }
  return {
    isSafari: t || s(),
    needPerspectiveFix: t,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      e.navigator.userAgent
    )
  };
}
function Oe() {
  return j || (j = Ie()), j;
}
function ze({ swiper: e, on: t, emit: s }) {
  const i = I();
  let r = null,
    n = null;
  const l = () => {
      !e || e.destroyed || !e.initialized || (s('beforeResize'), s('resize'));
    },
    a = () => {
      !e ||
        e.destroyed ||
        !e.initialized ||
        ((r = new ResizeObserver((h) => {
          n = i.requestAnimationFrame(() => {
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
      n && i.cancelAnimationFrame(n),
        r && r.unobserve && e.el && (r.unobserve(e.el), (r = null));
    },
    d = () => {
      !e || e.destroyed || !e.initialized || s('orientationchange');
    };
  t('init', () => {
    if (e.params.resizeObserver && typeof i.ResizeObserver < 'u') {
      a();
      return;
    }
    i.addEventListener('resize', l), i.addEventListener('orientationchange', d);
  }),
    t('destroy', () => {
      o(),
        i.removeEventListener('resize', l),
        i.removeEventListener('orientationchange', d);
    });
}
function ke({ swiper: e, extendParams: t, on: s, emit: i }) {
  const r = [],
    n = I(),
    l = (d, h = {}) => {
      const u = n.MutationObserver || n.WebkitMutationObserver,
        m = new u((c) => {
          if (e.__preventObserver__) return;
          if (c.length === 1) {
            i('observerUpdate', c[0]);
            return;
          }
          const f = function () {
            i('observerUpdate', c[0]);
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
    s('init', a),
    s('destroy', o);
}
const Ae = {
  on(e, t, s) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof t != 'function') return i;
    const r = s ? 'unshift' : 'push';
    return (
      e.split(' ').forEach((n) => {
        i.eventsListeners[n] || (i.eventsListeners[n] = []),
          i.eventsListeners[n][r](t);
      }),
      i
    );
  },
  once(e, t, s) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof t != 'function') return i;
    function r(...n) {
      i.off(e, r), r.__emitterProxy && delete r.__emitterProxy, t.apply(i, n);
    }
    return (r.__emitterProxy = t), i.on(e, r, s);
  },
  onAny(e, t) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof e != 'function') return s;
    const i = t ? 'unshift' : 'push';
    return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s;
  },
  offAny(e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || !t.eventsAnyListeners) return t;
    const s = t.eventsAnyListeners.indexOf(e);
    return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
  },
  off(e, t) {
    const s = this;
    return (
      !s.eventsListeners ||
        s.destroyed ||
        !s.eventsListeners ||
        e.split(' ').forEach((i) => {
          typeof t > 'u'
            ? (s.eventsListeners[i] = [])
            : s.eventsListeners[i] &&
              s.eventsListeners[i].forEach((r, n) => {
                (r === t || (r.__emitterProxy && r.__emitterProxy === t)) &&
                  s.eventsListeners[i].splice(n, 1);
              });
        }),
      s
    );
  },
  emit(...e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || !t.eventsListeners) return t;
    let s, i, r;
    return (
      typeof e[0] == 'string' || Array.isArray(e[0])
        ? ((s = e[0]), (i = e.slice(1, e.length)), (r = t))
        : ((s = e[0].events), (i = e[0].data), (r = e[0].context || t)),
      i.unshift(r),
      (Array.isArray(s) ? s : s.split(' ')).forEach((l) => {
        t.eventsAnyListeners &&
          t.eventsAnyListeners.length &&
          t.eventsAnyListeners.forEach((a) => {
            a.apply(r, [l, ...i]);
          }),
          t.eventsListeners &&
            t.eventsListeners[l] &&
            t.eventsListeners[l].forEach((a) => {
              a.apply(r, i);
            });
      }),
      t
    );
  }
};
function Ge() {
  const e = this;
  let t, s;
  const i = e.el;
  typeof e.params.width < 'u' && e.params.width !== null
    ? (t = e.params.width)
    : (t = i.clientWidth),
    typeof e.params.height < 'u' && e.params.height !== null
      ? (s = e.params.height)
      : (s = i.clientHeight),
    !((t === 0 && e.isHorizontal()) || (s === 0 && e.isVertical())) &&
      ((t =
        t -
        parseInt(G(i, 'padding-left') || 0, 10) -
        parseInt(G(i, 'padding-right') || 0, 10)),
      (s =
        s -
        parseInt(G(i, 'padding-top') || 0, 10) -
        parseInt(G(i, 'padding-bottom') || 0, 10)),
      Number.isNaN(t) && (t = 0),
      Number.isNaN(s) && (s = 0),
      Object.assign(e, {
        width: t,
        height: s,
        size: e.isHorizontal() ? t : s
      }));
}
function De() {
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
  function s(T, y) {
    return parseFloat(T.getPropertyValue(t(y)) || 0);
  }
  const i = e.params,
    { wrapperEl: r, slidesEl: n, size: l, rtlTranslate: a, wrongRTL: o } = e,
    d = e.virtual && i.virtual.enabled,
    h = d ? e.virtual.slides.length : e.slides.length,
    u = k(n, `.${e.params.slideClass}, swiper-slide`),
    m = d ? e.virtual.slides.length : u.length;
  let c = [];
  const f = [],
    p = [];
  let v = i.slidesOffsetBefore;
  typeof v == 'function' && (v = i.slidesOffsetBefore.call(e));
  let g = i.slidesOffsetAfter;
  typeof g == 'function' && (g = i.slidesOffsetAfter.call(e));
  const b = e.snapGrid.length,
    S = e.slidesGrid.length;
  let w = i.spaceBetween,
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
    i.centeredSlides &&
      i.cssMode &&
      (_(r, '--swiper-centered-offset-before', ''),
      _(r, '--swiper-centered-offset-after', ''));
  const A = i.grid && i.grid.rows > 1 && e.grid;
  A && e.grid.initSlides(m);
  let M;
  const pe =
    i.slidesPerView === 'auto' &&
    i.breakpoints &&
    Object.keys(i.breakpoints).filter(
      (T) => typeof i.breakpoints[T].slidesPerView < 'u'
    ).length > 0;
  for (let T = 0; T < m; T += 1) {
    M = 0;
    let y;
    if (
      (u[T] && (y = u[T]),
      A && e.grid.updateSlide(T, y, m, t),
      !(u[T] && G(y, 'display') === 'none'))
    ) {
      if (i.slidesPerView === 'auto') {
        pe && (u[T].style[t('width')] = '');
        const C = getComputedStyle(y),
          z = y.style.transform,
          F = y.style.webkitTransform;
        if (
          (z && (y.style.transform = 'none'),
          F && (y.style.webkitTransform = 'none'),
          i.roundLengths)
        )
          M = e.isHorizontal() ? te(y, 'width', !0) : te(y, 'height', !0);
        else {
          const U = s(C, 'width'),
            me = s(C, 'padding-left'),
            he = s(C, 'padding-right'),
            K = s(C, 'margin-left'),
            J = s(C, 'margin-right'),
            Q = C.getPropertyValue('box-sizing');
          if (Q && Q === 'border-box') M = U + K + J;
          else {
            const { clientWidth: ge, offsetWidth: ve } = y;
            M = U + me + he + K + J + (ve - ge);
          }
        }
        z && (y.style.transform = z),
          F && (y.style.webkitTransform = F),
          i.roundLengths && (M = Math.floor(M));
      } else
        (M = (l - (i.slidesPerView - 1) * w) / i.slidesPerView),
          i.roundLengths && (M = Math.floor(M)),
          u[T] && (u[T].style[t('width')] = `${M}px`);
      u[T] && (u[T].swiperSlideSize = M),
        p.push(M),
        i.centeredSlides
          ? ((E = E + M / 2 + x / 2 + w),
            x === 0 && T !== 0 && (E = E - l / 2 - w),
            T === 0 && (E = E - l / 2 - w),
            Math.abs(E) < 1 / 1e3 && (E = 0),
            i.roundLengths && (E = Math.floor(E)),
            P % i.slidesPerGroup === 0 && c.push(E),
            f.push(E))
          : (i.roundLengths && (E = Math.floor(E)),
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
      (i.effect === 'slide' || i.effect === 'coverflow') &&
      (r.style.width = `${e.virtualSize + w}px`),
    i.setWrapperSize && (r.style[t('width')] = `${e.virtualSize + w}px`),
    A && e.grid.updateWrapperSize(M, c, t),
    !i.centeredSlides)
  ) {
    const T = [];
    for (let y = 0; y < c.length; y += 1) {
      let C = c[y];
      i.roundLengths && (C = Math.floor(C)),
        c[y] <= e.virtualSize - l && T.push(C);
    }
    (c = T),
      Math.floor(e.virtualSize - l) - Math.floor(c[c.length - 1]) > 1 &&
        c.push(e.virtualSize - l);
  }
  if (d && i.loop) {
    const T = p[0] + w;
    if (i.slidesPerGroup > 1) {
      const y = Math.ceil(
          (e.virtual.slidesBefore + e.virtual.slidesAfter) / i.slidesPerGroup
        ),
        C = T * i.slidesPerGroup;
      for (let z = 0; z < y; z += 1) c.push(c[c.length - 1] + C);
    }
    for (let y = 0; y < e.virtual.slidesBefore + e.virtual.slidesAfter; y += 1)
      i.slidesPerGroup === 1 && c.push(c[c.length - 1] + T),
        f.push(f[f.length - 1] + T),
        (e.virtualSize += T);
  }
  if ((c.length === 0 && (c = [0]), w !== 0)) {
    const T = e.isHorizontal() && a ? 'marginLeft' : t('marginRight');
    u.filter((y, C) =>
      !i.cssMode || i.loop ? !0 : C !== u.length - 1
    ).forEach((y) => {
      y.style[T] = `${w}px`;
    });
  }
  if (i.centeredSlides && i.centeredSlidesBounds) {
    let T = 0;
    p.forEach((C) => {
      T += C + (w || 0);
    }),
      (T -= w);
    const y = T - l;
    c = c.map((C) => (C < 0 ? -v : C > y ? y + g : C));
  }
  if (i.centerInsufficientSlides) {
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
    i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
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
    i.watchSlidesProgress && e.updateSlidesOffset(),
    !d && !i.cssMode && (i.effect === 'slide' || i.effect === 'fade'))
  ) {
    const T = `${i.containerModifierClass}backface-hidden`,
      y = e.el.classList.contains(T);
    m <= i.maxBackfaceHiddenSlides
      ? y || e.el.classList.add(T)
      : y && e.el.classList.remove(T);
  }
}
function Ve(e) {
  const t = this,
    s = [],
    i = t.virtual && t.params.virtual.enabled;
  let r = 0,
    n;
  typeof e == 'number'
    ? t.setTransition(e)
    : e === !0 && t.setTransition(t.params.speed);
  const l = (a) => (i ? t.slides[t.getSlideIndexByData(a)] : t.slides[a]);
  if (t.params.slidesPerView !== 'auto' && t.params.slidesPerView > 1)
    if (t.params.centeredSlides)
      (t.visibleSlides || []).forEach((a) => {
        s.push(a);
      });
    else
      for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
        const a = t.activeIndex + n;
        if (a > t.slides.length && !i) break;
        s.push(l(a));
      }
  else s.push(l(t.activeIndex));
  for (n = 0; n < s.length; n += 1)
    if (typeof s[n] < 'u') {
      const a = s[n].offsetHeight;
      r = a > r ? a : r;
    }
  (r || r === 0) && (t.wrapperEl.style.height = `${r}px`);
}
function _e() {
  const e = this,
    t = e.slides,
    s = e.isElement
      ? e.isHorizontal()
        ? e.wrapperEl.offsetLeft
        : e.wrapperEl.offsetTop
      : 0;
  for (let i = 0; i < t.length; i += 1)
    t[i].swiperSlideOffset =
      (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) -
      s -
      e.cssOverflowAdjustment();
}
function Be(e = (this && this.translate) || 0) {
  const t = this,
    s = t.params,
    { slides: i, rtlTranslate: r, snapGrid: n } = t;
  if (i.length === 0) return;
  typeof i[0].swiperSlideOffset > 'u' && t.updateSlidesOffset();
  let l = -e;
  r && (l = e),
    i.forEach((o) => {
      o.classList.remove(s.slideVisibleClass);
    }),
    (t.visibleSlidesIndexes = []),
    (t.visibleSlides = []);
  let a = s.spaceBetween;
  typeof a == 'string' && a.indexOf('%') >= 0
    ? (a = (parseFloat(a.replace('%', '')) / 100) * t.size)
    : typeof a == 'string' && (a = parseFloat(a));
  for (let o = 0; o < i.length; o += 1) {
    const d = i[o];
    let h = d.swiperSlideOffset;
    s.cssMode && s.centeredSlides && (h -= i[0].swiperSlideOffset);
    const u =
        (l + (s.centeredSlides ? t.minTranslate() : 0) - h) /
        (d.swiperSlideSize + a),
      m =
        (l - n[0] + (s.centeredSlides ? t.minTranslate() : 0) - h) /
        (d.swiperSlideSize + a),
      c = -(l - h),
      f = c + t.slidesSizesGrid[o];
    ((c >= 0 && c < t.size - 1) ||
      (f > 1 && f <= t.size) ||
      (c <= 0 && f >= t.size)) &&
      (t.visibleSlides.push(d),
      t.visibleSlidesIndexes.push(o),
      i[o].classList.add(s.slideVisibleClass)),
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
  const s = t.params,
    i = t.maxTranslate() - t.minTranslate();
  let { progress: r, isBeginning: n, isEnd: l, progressLoop: a } = t;
  const o = n,
    d = l;
  if (i === 0) (r = 0), (n = !0), (l = !0);
  else {
    r = (e - t.minTranslate()) / i;
    const h = Math.abs(e - t.minTranslate()) < 1,
      u = Math.abs(e - t.maxTranslate()) < 1;
    (n = h || r <= 0), (l = u || r >= 1), h && (r = 0), u && (r = 1);
  }
  if (s.loop) {
    const h = t.getSlideIndexByData(0),
      u = t.getSlideIndexByData(t.slides.length - 1),
      m = t.slidesGrid[h],
      c = t.slidesGrid[u],
      f = t.slidesGrid[t.slidesGrid.length - 1],
      p = Math.abs(e);
    p >= m ? (a = (p - m) / f) : (a = (p + f - c) / f), a > 1 && (a -= 1);
  }
  Object.assign(t, { progress: r, progressLoop: a, isBeginning: n, isEnd: l }),
    (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
      t.updateSlidesProgress(e),
    n && !o && t.emit('reachBeginning toEdge'),
    l && !d && t.emit('reachEnd toEdge'),
    ((o && !n) || (d && !l)) && t.emit('fromEdge'),
    t.emit('progress', r);
}
function Fe() {
  const e = this,
    { slides: t, params: s, slidesEl: i, activeIndex: r } = e,
    n = e.virtual && s.virtual.enabled,
    l = (o) => k(i, `.${s.slideClass}${o}, swiper-slide${o}`)[0];
  t.forEach((o) => {
    o.classList.remove(s.slideActiveClass, s.slideNextClass, s.slidePrevClass);
  });
  let a;
  if (n)
    if (s.loop) {
      let o = r - e.virtual.slidesBefore;
      o < 0 && (o = e.virtual.slides.length + o),
        o >= e.virtual.slides.length && (o -= e.virtual.slides.length),
        (a = l(`[data-swiper-slide-index="${o}"]`));
    } else a = l(`[data-swiper-slide-index="${r}"]`);
  else a = t[r];
  if (a) {
    a.classList.add(s.slideActiveClass);
    let o = Ee(a, `.${s.slideClass}, swiper-slide`)[0];
    s.loop && !o && (o = t[0]), o && o.classList.add(s.slideNextClass);
    let d = ye(a, `.${s.slideClass}, swiper-slide`)[0];
    s.loop && !d === 0 && (d = t[t.length - 1]),
      d && d.classList.add(s.slidePrevClass);
  }
  e.emitSlidesClasses();
}
const B = (e, t) => {
    if (!e || e.destroyed || !e.params) return;
    const s = () => (e.isElement ? 'swiper-slide' : `.${e.params.slideClass}`),
      i = t.closest(s());
    if (i) {
      const r = i.querySelector(`.${e.params.lazyPreloaderClass}`);
      r && r.remove();
    }
  },
  se = (e, t) => {
    if (!e.slides[t]) return;
    const s = e.slides[t].querySelector('[loading="lazy"]');
    s && s.removeAttribute('loading');
  },
  Y = (e) => {
    if (!e || e.destroyed || !e.params) return;
    let t = e.params.lazyPreloadPrevNext;
    const s = e.slides.length;
    if (!s || !t || t < 0) return;
    t = Math.min(t, s);
    const i =
        e.params.slidesPerView === 'auto'
          ? e.slidesPerViewDynamic()
          : Math.ceil(e.params.slidesPerView),
      r = e.activeIndex,
      n = r + i - 1;
    if (e.params.rewind)
      for (let l = r - t; l <= n + t; l += 1) {
        const a = ((l % s) + s) % s;
        a !== r && a > n && se(e, a);
      }
    else
      for (let l = Math.max(n - t, 0); l <= Math.min(n + t, s - 1); l += 1)
        l !== r && l > n && se(e, l);
  };
function He(e) {
  const { slidesGrid: t, params: s } = e,
    i = e.rtlTranslate ? e.translate : -e.translate;
  let r;
  for (let n = 0; n < t.length; n += 1)
    typeof t[n + 1] < 'u'
      ? i >= t[n] && i < t[n + 1] - (t[n + 1] - t[n]) / 2
        ? (r = n)
        : i >= t[n] && i < t[n + 1] && (r = n + 1)
      : i >= t[n] && (r = n);
  return s.normalizeSlideIndex && (r < 0 || typeof r > 'u') && (r = 0), r;
}
function $e(e) {
  const t = this,
    s = t.rtlTranslate ? t.translate : -t.translate,
    { snapGrid: i, params: r, activeIndex: n, realIndex: l, snapIndex: a } = t;
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
  if ((typeof o > 'u' && (o = He(t)), i.indexOf(s) >= 0)) d = i.indexOf(s);
  else {
    const m = Math.min(r.slidesPerGroupSkip, o);
    d = m + Math.floor((o - m) / r.slidesPerGroup);
  }
  if ((d >= i.length && (d = i.length - 1), o === n)) {
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
    t.initialized && Y(t),
    t.emit('activeIndexChange'),
    t.emit('snapIndexChange'),
    l !== u && t.emit('realIndexChange'),
    (t.initialized || t.params.runCallbacksOnInit) && t.emit('slideChange');
}
function je(e) {
  const t = this,
    s = t.params,
    i = e.closest(`.${s.slideClass}, swiper-slide`);
  let r = !1,
    n;
  if (i) {
    for (let l = 0; l < t.slides.length; l += 1)
      if (t.slides[l] === i) {
        (r = !0), (n = l);
        break;
      }
  }
  if (i && r)
    (t.clickedSlide = i),
      t.virtual && t.params.virtual.enabled
        ? (t.clickedIndex = parseInt(
            i.getAttribute('data-swiper-slide-index'),
            10
          ))
        : (t.clickedIndex = n);
  else {
    (t.clickedSlide = void 0), (t.clickedIndex = void 0);
    return;
  }
  s.slideToClickedSlide &&
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
    { params: s, rtlTranslate: i, translate: r, wrapperEl: n } = t;
  if (s.virtualTranslate) return i ? -r : r;
  if (s.cssMode) return r;
  let l = be(n, e);
  return (l += t.cssOverflowAdjustment()), i && (l = -l), l || 0;
}
function Xe(e, t) {
  const s = this,
    { rtlTranslate: i, params: r, wrapperEl: n, progress: l } = s;
  let a = 0,
    o = 0;
  const d = 0;
  s.isHorizontal() ? (a = i ? -e : e) : (o = e),
    r.roundLengths && ((a = Math.floor(a)), (o = Math.floor(o))),
    (s.previousTranslate = s.translate),
    (s.translate = s.isHorizontal() ? a : o),
    r.cssMode
      ? (n[s.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = s.isHorizontal()
          ? -a
          : -o)
      : r.virtualTranslate ||
        (s.isHorizontal()
          ? (a -= s.cssOverflowAdjustment())
          : (o -= s.cssOverflowAdjustment()),
        (n.style.transform = `translate3d(${a}px, ${o}px, ${d}px)`));
  let h;
  const u = s.maxTranslate() - s.minTranslate();
  u === 0 ? (h = 0) : (h = (e - s.minTranslate()) / u),
    h !== l && s.updateProgress(e),
    s.emit('setTranslate', s.translate, t);
}
function Ye() {
  return -this.snapGrid[0];
}
function qe() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function Ue(e = 0, t = this.params.speed, s = !0, i = !0, r) {
  const n = this,
    { params: l, wrapperEl: a } = n;
  if (n.animating && l.preventInteractionOnTransition) return !1;
  const o = n.minTranslate(),
    d = n.maxTranslate();
  let h;
  if (
    (i && e > o ? (h = o) : i && e < d ? (h = d) : (h = e),
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
        s && (n.emit('beforeTransitionStart', t, r), n.emit('transitionEnd')))
      : (n.setTransition(t),
        n.setTranslate(h),
        s && (n.emit('beforeTransitionStart', t, r), n.emit('transitionStart')),
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
                  s && n.emit('transitionEnd')));
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
  const s = this;
  s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${e}ms`),
    s.emit('setTransition', e, t);
}
function fe({ swiper: e, runCallbacks: t, direction: s, step: i }) {
  const { activeIndex: r, previousIndex: n } = e;
  let l = s;
  if (
    (l || (r > n ? (l = 'next') : r < n ? (l = 'prev') : (l = 'reset')),
    e.emit(`transition${i}`),
    t && r !== n)
  ) {
    if (l === 'reset') {
      e.emit(`slideResetTransition${i}`);
      return;
    }
    e.emit(`slideChangeTransition${i}`),
      l === 'next'
        ? e.emit(`slideNextTransition${i}`)
        : e.emit(`slidePrevTransition${i}`);
  }
}
function Qe(e = !0, t) {
  const s = this,
    { params: i } = s;
  i.cssMode ||
    (i.autoHeight && s.updateAutoHeight(),
    fe({ swiper: s, runCallbacks: e, direction: t, step: 'Start' }));
}
function Ze(e = !0, t) {
  const s = this,
    { params: i } = s;
  (s.animating = !1),
    !i.cssMode &&
      (s.setTransition(0),
      fe({ swiper: s, runCallbacks: e, direction: t, step: 'End' }));
}
const et = { setTransition: Je, transitionStart: Qe, transitionEnd: Ze };
function tt(e = 0, t = this.params.speed, s = !0, i, r) {
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
  if ((n.animating && a.preventInteractionOnTransition) || (!f && !i && !r))
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
    ((!n.allowSlideNext && g < n.translate && g < n.minTranslate()) ||
      (!n.allowSlidePrev &&
        g > n.translate &&
        g > n.maxTranslate() &&
        (u || 0) !== l))
  )
    return !1;
  l !== (h || 0) && s && n.emit('beforeSlideChangeStart'), n.updateProgress(g);
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
      b !== 'reset' && (n.transitionStart(s, b), n.transitionEnd(s, b)),
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
    n.emit('beforeTransitionStart', t, i),
    n.transitionStart(s, b),
    t === 0
      ? n.transitionEnd(s, b)
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
                n.transitionEnd(s, b)));
          }),
        n.wrapperEl.addEventListener(
          'transitionend',
          n.onSlideToWrapperTransitionEnd
        )),
    !0
  );
}
function st(e = 0, t = this.params.speed, s = !0, i) {
  typeof e == 'string' && (e = parseInt(e, 10));
  const r = this;
  let n = e;
  return (
    r.params.loop &&
      (r.virtual && r.params.virtual.enabled
        ? (n = n + r.virtual.slidesBefore)
        : (n = r.getSlideIndexByData(n))),
    r.slideTo(n, t, s, i)
  );
}
function it(e = this.params.speed, t = !0, s) {
  const i = this,
    { enabled: r, params: n, animating: l } = i;
  if (!r) return i;
  let a = n.slidesPerGroup;
  n.slidesPerView === 'auto' &&
    n.slidesPerGroup === 1 &&
    n.slidesPerGroupAuto &&
    (a = Math.max(i.slidesPerViewDynamic('current', !0), 1));
  const o = i.activeIndex < n.slidesPerGroupSkip ? 1 : a,
    d = i.virtual && n.virtual.enabled;
  if (n.loop) {
    if (l && !d && n.loopPreventsSliding) return !1;
    i.loopFix({ direction: 'next' }), (i._clientLeft = i.wrapperEl.clientLeft);
  }
  return n.rewind && i.isEnd
    ? i.slideTo(0, e, t, s)
    : i.slideTo(i.activeIndex + o, e, t, s);
}
function nt(e = this.params.speed, t = !0, s) {
  const i = this,
    {
      params: r,
      snapGrid: n,
      slidesGrid: l,
      rtlTranslate: a,
      enabled: o,
      animating: d
    } = i;
  if (!o) return i;
  const h = i.virtual && r.virtual.enabled;
  if (r.loop) {
    if (d && !h && r.loopPreventsSliding) return !1;
    i.loopFix({ direction: 'prev' }), (i._clientLeft = i.wrapperEl.clientLeft);
  }
  const u = a ? i.translate : -i.translate;
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
      v < 0 && (v = i.activeIndex - 1),
      r.slidesPerView === 'auto' &&
        r.slidesPerGroup === 1 &&
        r.slidesPerGroupAuto &&
        ((v = v - i.slidesPerViewDynamic('previous', !0) + 1),
        (v = Math.max(v, 0)))),
    r.rewind && i.isBeginning)
  ) {
    const g =
      i.params.virtual && i.params.virtual.enabled && i.virtual
        ? i.virtual.slides.length - 1
        : i.slides.length - 1;
    return i.slideTo(g, e, t, s);
  }
  return i.slideTo(v, e, t, s);
}
function rt(e = this.params.speed, t = !0, s) {
  const i = this;
  return i.slideTo(i.activeIndex, e, t, s);
}
function at(e = this.params.speed, t = !0, s, i = 0.5) {
  const r = this;
  let n = r.activeIndex;
  const l = Math.min(r.params.slidesPerGroupSkip, n),
    a = l + Math.floor((n - l) / r.params.slidesPerGroup),
    o = r.rtlTranslate ? r.translate : -r.translate;
  if (o >= r.snapGrid[a]) {
    const d = r.snapGrid[a],
      h = r.snapGrid[a + 1];
    o - d > (h - d) * i && (n += r.params.slidesPerGroup);
  } else {
    const d = r.snapGrid[a - 1],
      h = r.snapGrid[a];
    o - d <= (h - d) * i && (n -= r.params.slidesPerGroup);
  }
  return (
    (n = Math.max(n, 0)),
    (n = Math.min(n, r.slidesGrid.length - 1)),
    r.slideTo(n, e, t, s)
  );
}
function lt() {
  const e = this,
    { params: t, slidesEl: s } = e,
    i = t.slidesPerView === 'auto' ? e.slidesPerViewDynamic() : t.slidesPerView;
  let r = e.clickedIndex,
    n;
  const l = e.isElement ? 'swiper-slide' : `.${t.slideClass}`;
  if (t.loop) {
    if (e.animating) return;
    (n = parseInt(e.clickedSlide.getAttribute('data-swiper-slide-index'), 10)),
      t.centeredSlides
        ? r < e.loopedSlides - i / 2 ||
          r > e.slides.length - e.loopedSlides + i / 2
          ? (e.loopFix(),
            (r = e.getSlideIndex(
              k(s, `${l}[data-swiper-slide-index="${n}"]`)[0]
            )),
            X(() => {
              e.slideTo(r);
            }))
          : e.slideTo(r)
        : r > e.slides.length - i
        ? (e.loopFix(),
          (r = e.getSlideIndex(
            k(s, `${l}[data-swiper-slide-index="${n}"]`)[0]
          )),
          X(() => {
            e.slideTo(r);
          }))
        : e.slideTo(r);
  } else e.slideTo(r);
}
const ot = {
  slideTo: tt,
  slideToLoop: st,
  slideNext: it,
  slidePrev: nt,
  slideReset: rt,
  slideToClosest: at,
  slideToClickedSlide: lt
};
function dt(e) {
  const t = this,
    { params: s, slidesEl: i } = t;
  if (!s.loop || (t.virtual && t.params.virtual.enabled)) return;
  k(i, `.${s.slideClass}, swiper-slide`).forEach((n, l) => {
    n.setAttribute('data-swiper-slide-index', l);
  }),
    t.loopFix({
      slideRealIndex: e,
      direction: s.centeredSlides ? void 0 : 'next'
    });
}
function ct({
  slideRealIndex: e,
  slideTo: t = !0,
  direction: s,
  setTranslate: i,
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
  const b = s === 'next' || !s,
    S = s === 'prev' || !s;
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
            i && (a.touches[a.isHorizontal() ? 'startX' : 'startY'] += A));
      } else i && a.slideToLoop(e, 0, !1, !0);
    else if (v.length > 0 && b)
      if (typeof e > 'u') {
        const x = a.slidesGrid[g],
          A = a.slidesGrid[g - E] - x;
        l
          ? a.setTranslate(a.translate - A)
          : (a.slideTo(g - E, 0, !1, !0),
            i && (a.touches[a.isHorizontal() ? 'startX' : 'startY'] += A));
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
      direction: s,
      setTranslate: i,
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
    { params: t, slidesEl: s } = e;
  if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
  e.recalcSlides();
  const i = [];
  e.slides.forEach((r) => {
    const n =
      typeof r.swiperSlideIndex > 'u'
        ? r.getAttribute('data-swiper-slide-index') * 1
        : r.swiperSlideIndex;
    i[n] = r;
  }),
    e.slides.forEach((r) => {
      r.removeAttribute('data-swiper-slide-index');
    }),
    i.forEach((r) => {
      s.append(r);
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
  const s = t.params.touchEventsTarget === 'container' ? t.el : t.wrapperEl;
  t.isElement && (t.__preventObserver__ = !0),
    (s.style.cursor = 'move'),
    (s.style.cursor = e ? 'grabbing' : 'grab'),
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
  function s(i) {
    if (!i || i === D() || i === I()) return null;
    i.assignedSlot && (i = i.assignedSlot);
    const r = i.closest(e);
    return !r && !i.getRootNode ? null : r || s(i.getRootNode().host);
  }
  return s(t);
}
function vt(e) {
  const t = this,
    s = D(),
    i = I(),
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
  if (v && (f <= g || f >= i.innerWidth - g))
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
    s.activeElement &&
      s.activeElement.matches(r.focusableElements) &&
      s.activeElement !== d &&
      s.activeElement.blur();
  const S = b && t.allowTouchMove && n.touchStartPreventDefault;
  (n.touchStartForcePreventDefault || S) &&
    !d.isContentEditable &&
    o.preventDefault(),
    t.params.freeMode &&
      t.params.freeMode.enabled &&
      t.freeMode &&
      t.animating &&
      !n.cssMode &&
      t.freeMode.onTouchStart(),
    t.emit('touchStart', o);
}
function St(e) {
  const t = D(),
    s = this,
    i = s.touchEventsData,
    { params: r, touches: n, rtlTranslate: l, enabled: a } = s;
  if (!a || (!r.simulateTouch && e.pointerType === 'mouse')) return;
  let o = e;
  if ((o.originalEvent && (o = o.originalEvent), !i.isTouched)) {
    i.startMoving && i.isScrolling && s.emit('touchMoveOpposite', o);
    return;
  }
  const d = i.evCache.findIndex((x) => x.pointerId === o.pointerId);
  d >= 0 && (i.evCache[d] = o);
  const h = i.evCache.length > 1 ? i.evCache[0] : o,
    u = h.pageX,
    m = h.pageY;
  if (o.preventedByNestedSwiper) {
    (n.startX = u), (n.startY = m);
    return;
  }
  if (!s.allowTouchMove) {
    o.target.matches(i.focusableElements) || (s.allowClick = !1),
      i.isTouched &&
        (Object.assign(n, {
          startX: u,
          startY: m,
          prevX: s.touches.currentX,
          prevY: s.touches.currentY,
          currentX: u,
          currentY: m
        }),
        (i.touchStartTime = N()));
    return;
  }
  if (r.touchReleaseOnEdges && !r.loop) {
    if (s.isVertical()) {
      if (
        (m < n.startY && s.translate <= s.maxTranslate()) ||
        (m > n.startY && s.translate >= s.minTranslate())
      ) {
        (i.isTouched = !1), (i.isMoved = !1);
        return;
      }
    } else if (
      (u < n.startX && s.translate <= s.maxTranslate()) ||
      (u > n.startX && s.translate >= s.minTranslate())
    )
      return;
  }
  if (
    t.activeElement &&
    o.target === t.activeElement &&
    o.target.matches(i.focusableElements)
  ) {
    (i.isMoved = !0), (s.allowClick = !1);
    return;
  }
  if (
    (i.allowTouchCallbacks && s.emit('touchMove', o),
    o.targetTouches && o.targetTouches.length > 1)
  )
    return;
  (n.currentX = u), (n.currentY = m);
  const c = n.currentX - n.startX,
    f = n.currentY - n.startY;
  if (s.params.threshold && Math.sqrt(c ** 2 + f ** 2) < s.params.threshold)
    return;
  if (typeof i.isScrolling > 'u') {
    let x;
    (s.isHorizontal() && n.currentY === n.startY) ||
    (s.isVertical() && n.currentX === n.startX)
      ? (i.isScrolling = !1)
      : c * c + f * f >= 25 &&
        ((x = (Math.atan2(Math.abs(f), Math.abs(c)) * 180) / Math.PI),
        (i.isScrolling = s.isHorizontal()
          ? x > r.touchAngle
          : 90 - x > r.touchAngle));
  }
  if (
    (i.isScrolling && s.emit('touchMoveOpposite', o),
    typeof i.startMoving > 'u' &&
      (n.currentX !== n.startX || n.currentY !== n.startY) &&
      (i.startMoving = !0),
    i.isScrolling ||
      (s.zoom &&
        s.params.zoom &&
        s.params.zoom.enabled &&
        i.evCache.length > 1))
  ) {
    i.isTouched = !1;
    return;
  }
  if (!i.startMoving) return;
  (s.allowClick = !1),
    !r.cssMode && o.cancelable && o.preventDefault(),
    r.touchMoveStopPropagation && !r.nested && o.stopPropagation();
  let p = s.isHorizontal() ? c : f,
    v = s.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
  r.oneWayMovement &&
    ((p = Math.abs(p) * (l ? 1 : -1)), (v = Math.abs(v) * (l ? 1 : -1))),
    (n.diff = p),
    (p *= r.touchRatio),
    l && ((p = -p), (v = -v));
  const g = s.touchesDirection;
  (s.swipeDirection = p > 0 ? 'prev' : 'next'),
    (s.touchesDirection = v > 0 ? 'prev' : 'next');
  const b = s.params.loop && !r.cssMode;
  if (!i.isMoved) {
    if (
      (b && s.loopFix({ direction: s.swipeDirection }),
      (i.startTranslate = s.getTranslate()),
      s.setTransition(0),
      s.animating)
    ) {
      const x = new window.CustomEvent('transitionend', {
        bubbles: !0,
        cancelable: !0
      });
      s.wrapperEl.dispatchEvent(x);
    }
    (i.allowMomentumBounce = !1),
      r.grabCursor &&
        (s.allowSlideNext === !0 || s.allowSlidePrev === !0) &&
        s.setGrabCursor(!0),
      s.emit('sliderFirstMove', o);
  }
  let S;
  i.isMoved &&
    g !== s.touchesDirection &&
    b &&
    Math.abs(p) >= 1 &&
    (s.loopFix({ direction: s.swipeDirection, setTranslate: !0 }), (S = !0)),
    s.emit('sliderMove', o),
    (i.isMoved = !0),
    (i.currentTranslate = p + i.startTranslate);
  let w = !0,
    E = r.resistanceRatio;
  if (
    (r.touchReleaseOnEdges && (E = 0),
    p > 0
      ? (b &&
          !S &&
          i.currentTranslate >
            (r.centeredSlides
              ? s.minTranslate() - s.size / 2
              : s.minTranslate()) &&
          s.loopFix({
            direction: 'prev',
            setTranslate: !0,
            activeSlideIndex: 0
          }),
        i.currentTranslate > s.minTranslate() &&
          ((w = !1),
          r.resistance &&
            (i.currentTranslate =
              s.minTranslate() -
              1 +
              (-s.minTranslate() + i.startTranslate + p) ** E)))
      : p < 0 &&
        (b &&
          !S &&
          i.currentTranslate <
            (r.centeredSlides
              ? s.maxTranslate() + s.size / 2
              : s.maxTranslate()) &&
          s.loopFix({
            direction: 'next',
            setTranslate: !0,
            activeSlideIndex:
              s.slides.length -
              (r.slidesPerView === 'auto'
                ? s.slidesPerViewDynamic()
                : Math.ceil(parseFloat(r.slidesPerView, 10)))
          }),
        i.currentTranslate < s.maxTranslate() &&
          ((w = !1),
          r.resistance &&
            (i.currentTranslate =
              s.maxTranslate() +
              1 -
              (s.maxTranslate() - i.startTranslate - p) ** E))),
    w && (o.preventedByNestedSwiper = !0),
    !s.allowSlideNext &&
      s.swipeDirection === 'next' &&
      i.currentTranslate < i.startTranslate &&
      (i.currentTranslate = i.startTranslate),
    !s.allowSlidePrev &&
      s.swipeDirection === 'prev' &&
      i.currentTranslate > i.startTranslate &&
      (i.currentTranslate = i.startTranslate),
    !s.allowSlidePrev &&
      !s.allowSlideNext &&
      (i.currentTranslate = i.startTranslate),
    r.threshold > 0)
  )
    if (Math.abs(p) > r.threshold || i.allowThresholdMove) {
      if (!i.allowThresholdMove) {
        (i.allowThresholdMove = !0),
          (n.startX = n.currentX),
          (n.startY = n.currentY),
          (i.currentTranslate = i.startTranslate),
          (n.diff = s.isHorizontal()
            ? n.currentX - n.startX
            : n.currentY - n.startY);
        return;
      }
    } else {
      i.currentTranslate = i.startTranslate;
      return;
    }
  !r.followFinger ||
    r.cssMode ||
    (((r.freeMode && r.freeMode.enabled && s.freeMode) ||
      r.watchSlidesProgress) &&
      (s.updateActiveIndex(), s.updateSlidesClasses()),
    s.params.freeMode &&
      r.freeMode.enabled &&
      s.freeMode &&
      s.freeMode.onTouchMove(),
    s.updateProgress(i.currentTranslate),
    s.setTranslate(i.currentTranslate));
}
function wt(e) {
  const t = this,
    s = t.touchEventsData,
    i = s.evCache.findIndex((S) => S.pointerId === e.pointerId);
  if (
    (i >= 0 && s.evCache.splice(i, 1),
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
    s.allowTouchCallbacks && t.emit('touchEnd', d),
    (s.allowTouchCallbacks = !1),
    !s.isTouched)
  ) {
    s.isMoved && r.grabCursor && t.setGrabCursor(!1),
      (s.isMoved = !1),
      (s.startMoving = !1);
    return;
  }
  r.grabCursor &&
    s.isMoved &&
    s.isTouched &&
    (t.allowSlideNext === !0 || t.allowSlidePrev === !0) &&
    t.setGrabCursor(!1);
  const h = N(),
    u = h - s.touchStartTime;
  if (t.allowClick) {
    const S = d.path || (d.composedPath && d.composedPath());
    t.updateClickedSlide((S && S[0]) || d.target),
      t.emit('tap click', d),
      u < 300 &&
        h - s.lastClickTime < 300 &&
        t.emit('doubleTap doubleClick', d);
  }
  if (
    ((s.lastClickTime = N()),
    X(() => {
      t.destroyed || (t.allowClick = !0);
    }),
    !s.isTouched ||
      !s.isMoved ||
      !t.swipeDirection ||
      n.diff === 0 ||
      s.currentTranslate === s.startTranslate)
  ) {
    (s.isTouched = !1), (s.isMoved = !1), (s.startMoving = !1);
    return;
  }
  (s.isTouched = !1), (s.isMoved = !1), (s.startMoving = !1);
  let m;
  if (
    (r.followFinger
      ? (m = l ? t.translate : -t.translate)
      : (m = -s.currentTranslate),
    r.cssMode)
  )
    return;
  if (t.params.freeMode && r.freeMode.enabled) {
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
          t.params.virtual && t.params.virtual.enabled && t.virtual
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
function ie() {
  const e = this,
    { params: t, el: s } = e;
  if (s && s.offsetWidth === 0) return;
  t.breakpoints && e.setBreakpoint();
  const { allowSlideNext: i, allowSlidePrev: r, snapGrid: n } = e,
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
    (e.allowSlideNext = i),
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
    { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
  if (!i) return;
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
    r !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
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
  const s = D(),
    { params: i, el: r, wrapperEl: n, device: l } = e,
    a = !!i.nested,
    o = t === 'on' ? 'addEventListener' : 'removeEventListener',
    d = t;
  r[o]('pointerdown', e.onTouchStart, { passive: !1 }),
    s[o]('pointermove', e.onTouchMove, { passive: !1, capture: a }),
    s[o]('pointerup', e.onTouchEnd, { passive: !0 }),
    s[o]('pointercancel', e.onTouchEnd, { passive: !0 }),
    s[o]('pointerout', e.onTouchEnd, { passive: !0 }),
    s[o]('pointerleave', e.onTouchEnd, { passive: !0 }),
    (i.preventClicks || i.preventClicksPropagation) &&
      r[o]('click', e.onClick, !0),
    i.cssMode && n[o]('scroll', e.onScroll),
    i.updateOnWindowResize
      ? e[d](
          l.ios || l.android
            ? 'resize orientationchange observerUpdate'
            : 'resize observerUpdate',
          ie,
          !0
        )
      : e[d]('observerUpdate', ie, !0),
    r[o]('load', e.onLoad, { capture: !0 });
};
function Et() {
  const e = this,
    t = D(),
    { params: s } = e;
  (e.onTouchStart = vt.bind(e)),
    (e.onTouchMove = St.bind(e)),
    (e.onTouchEnd = wt.bind(e)),
    s.cssMode && (e.onScroll = bt.bind(e)),
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
    { realIndex: t, initialized: s, params: i, el: r } = e,
    n = i.breakpoints;
  if (!n || (n && Object.keys(n).length === 0)) return;
  const l = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
  if (!l || e.currentBreakpoint === l) return;
  const o = (l in n ? n[l] : void 0) || e.originalParams,
    d = re(e, i),
    h = re(e, o),
    u = i.enabled;
  d && !h
    ? (r.classList.remove(
        `${i.containerModifierClass}grid`,
        `${i.containerModifierClass}grid-column`
      ),
      e.emitContainerClasses())
    : !d &&
      h &&
      (r.classList.add(`${i.containerModifierClass}grid`),
      ((o.grid.fill && o.grid.fill === 'column') ||
        (!o.grid.fill && i.grid.fill === 'column')) &&
        r.classList.add(`${i.containerModifierClass}grid-column`),
      e.emitContainerClasses()),
    ['navigation', 'pagination', 'scrollbar'].forEach((p) => {
      const v = i[p] && i[p].enabled,
        g = o[p] && o[p].enabled;
      v && !g && e[p].disable(), !v && g && e[p].enable();
    });
  const m = o.direction && o.direction !== i.direction,
    c = i.loop && (o.slidesPerView !== i.slidesPerView || m);
  m && s && e.changeDirection(), L(e.params, o);
  const f = e.params.enabled;
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev
  }),
    u && !f ? e.disable() : !u && f && e.enable(),
    (e.currentBreakpoint = l),
    e.emit('_beforeBreakpoint', o),
    c && s && (e.loopDestroy(), e.loopCreate(t), e.updateSlides()),
    e.emit('breakpoint', o);
}
function Lt(e, t = 'window', s) {
  if (!e || (t === 'container' && !s)) return;
  let i = !1;
  const r = I(),
    n = t === 'window' ? r.innerHeight : s.clientHeight,
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
      ? r.matchMedia(`(min-width: ${d}px)`).matches && (i = o)
      : d <= s.clientWidth && (i = o);
  }
  return i || 'max';
}
const It = { setBreakpoint: Pt, getBreakpoint: Lt };
function Ot(e, t) {
  const s = [];
  return (
    e.forEach((i) => {
      typeof i == 'object'
        ? Object.keys(i).forEach((r) => {
            i[r] && s.push(t + r);
          })
        : typeof i == 'string' && s.push(t + i);
    }),
    s
  );
}
function zt() {
  const e = this,
    { classNames: t, params: s, rtl: i, el: r, device: n } = e,
    l = Ot(
      [
        'initialized',
        s.direction,
        { 'free-mode': e.params.freeMode && s.freeMode.enabled },
        { autoheight: s.autoHeight },
        { rtl: i },
        { grid: s.grid && s.grid.rows > 1 },
        {
          'grid-column': s.grid && s.grid.rows > 1 && s.grid.fill === 'column'
        },
        { android: n.android },
        { ios: n.ios },
        { 'css-mode': s.cssMode },
        { centered: s.cssMode && s.centeredSlides },
        { 'watch-progress': s.watchSlidesProgress }
      ],
      s.containerModifierClass
    );
  t.push(...l), r.classList.add(...t), e.emitContainerClasses();
}
function kt() {
  const e = this,
    { el: t, classNames: s } = e;
  t.classList.remove(...s), e.emitContainerClasses();
}
const At = { addClasses: zt, removeClasses: kt };
function Gt() {
  const e = this,
    { isLocked: t, params: s } = e,
    { slidesOffsetBefore: i } = s;
  if (i) {
    const r = e.slides.length - 1,
      n = e.slidesGrid[r] + e.slidesSizesGrid[r] + i * 2;
    e.isLocked = e.size > n;
  } else e.isLocked = e.snapGrid.length === 1;
  s.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked),
    s.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked),
    t && t !== e.isLocked && (e.isEnd = !1),
    t !== e.isLocked && e.emit(e.isLocked ? 'lock' : 'unlock');
}
const Dt = { checkOverflow: Gt },
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
function Vt(e, t) {
  return function (i = {}) {
    const r = Object.keys(i)[0],
      n = i[r];
    if (typeof n != 'object' || n === null) {
      L(t, i);
      return;
    }
    if (
      (['navigation', 'pagination', 'scrollbar'].indexOf(r) >= 0 &&
        e[r] === !0 &&
        (e[r] = { auto: !0 }),
      !(r in e && 'enabled' in n))
    ) {
      L(t, i);
      return;
    }
    e[r] === !0 && (e[r] = { enabled: !0 }),
      typeof e[r] == 'object' && !('enabled' in e[r]) && (e[r].enabled = !0),
      e[r] || (e[r] = { enabled: !1 }),
      L(t, i);
  };
}
const W = {
    eventsEmitter: Ae,
    update: We,
    translate: Ke,
    transition: et,
    slide: ot,
    loop: ut,
    grabCursor: ht,
    events: Mt,
    breakpoints: It,
    checkOverflow: Dt,
    classes: At
  },
  R = {};
class O {
  constructor(...t) {
    let s, i;
    t.length === 1 &&
    t[0].constructor &&
    Object.prototype.toString.call(t[0]).slice(8, -1) === 'Object'
      ? (i = t[0])
      : ([s, i] = t),
      i || (i = {}),
      (i = L({}, i)),
      s && !i.el && (i.el = s);
    const r = D();
    if (
      i.el &&
      typeof i.el == 'string' &&
      r.querySelectorAll(i.el).length > 1
    ) {
      const o = [];
      return (
        r.querySelectorAll(i.el).forEach((d) => {
          const h = L({}, i, { el: d });
          o.push(new O(h));
        }),
        o
      );
    }
    const n = this;
    (n.__swiper__ = !0),
      (n.support = ce()),
      (n.device = Le({ userAgent: i.userAgent })),
      (n.browser = Oe()),
      (n.eventsListeners = {}),
      (n.eventsAnyListeners = []),
      (n.modules = [...n.__modules__]),
      i.modules && Array.isArray(i.modules) && n.modules.push(...i.modules);
    const l = {};
    n.modules.forEach((o) => {
      o({
        params: i,
        swiper: n,
        extendParams: Vt(i, l),
        on: n.on.bind(n),
        once: n.once.bind(n),
        off: n.off.bind(n),
        emit: n.emit.bind(n)
      });
    });
    const a = L({}, ae, l);
    return (
      (n.params = L({}, a, R, i)),
      (n.originalParams = L({}, n.params)),
      (n.passedParams = L({}, i)),
      n.params &&
        n.params.on &&
        Object.keys(n.params.on).forEach((o) => {
          n.on(o, n.params.on[o]);
        }),
      n.params && n.params.onAny && n.onAny(n.params.onAny),
      Object.assign(n, {
        enabled: n.params.enabled,
        el: s,
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
    const { slidesEl: s, params: i } = this,
      r = k(s, `.${i.slideClass}, swiper-slide`),
      n = ee(r[0]);
    return ee(t) - n;
  }
  getSlideIndexByData(t) {
    return this.getSlideIndex(
      this.slides.filter(
        (s) => s.getAttribute('data-swiper-slide-index') * 1 === t
      )[0]
    );
  }
  recalcSlides() {
    const t = this,
      { slidesEl: s, params: i } = t;
    t.slides = k(s, `.${i.slideClass}, swiper-slide`);
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
  setProgress(t, s) {
    const i = this;
    t = Math.min(Math.max(t, 0), 1);
    const r = i.minTranslate(),
      l = (i.maxTranslate() - r) * t + r;
    i.translateTo(l, typeof s > 'u' ? 0 : s),
      i.updateActiveIndex(),
      i.updateSlidesClasses();
  }
  emitContainerClasses() {
    const t = this;
    if (!t.params._emitClasses || !t.el) return;
    const s = t.el.className
      .split(' ')
      .filter(
        (i) =>
          i.indexOf('swiper') === 0 ||
          i.indexOf(t.params.containerModifierClass) === 0
      );
    t.emit('_containerClasses', s.join(' '));
  }
  getSlideClasses(t) {
    const s = this;
    return s.destroyed
      ? ''
      : t.className
          .split(' ')
          .filter(
            (i) =>
              i.indexOf('swiper-slide') === 0 ||
              i.indexOf(s.params.slideClass) === 0
          )
          .join(' ');
  }
  emitSlidesClasses() {
    const t = this;
    if (!t.params._emitClasses || !t.el) return;
    const s = [];
    t.slides.forEach((i) => {
      const r = t.getSlideClasses(i);
      s.push({ slideEl: i, classNames: r }), t.emit('_slideClass', i, r);
    }),
      t.emit('_slideClasses', s);
  }
  slidesPerViewDynamic(t = 'current', s = !1) {
    const i = this,
      {
        params: r,
        slides: n,
        slidesGrid: l,
        slidesSizesGrid: a,
        size: o,
        activeIndex: d
      } = i;
    let h = 1;
    if (r.centeredSlides) {
      let u = n[d].swiperSlideSize,
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
        (s ? l[u] + a[u] - l[d] < o : l[u] - l[d] < o) && (h += 1);
    else for (let u = d - 1; u >= 0; u -= 1) l[d] - l[u] < o && (h += 1);
    return h;
  }
  update() {
    const t = this;
    if (!t || t.destroyed) return;
    const { snapGrid: s, params: i } = t;
    i.breakpoints && t.setBreakpoint(),
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
    if (t.params.freeMode && t.params.freeMode.enabled)
      r(), t.params.autoHeight && t.updateAutoHeight();
    else {
      if (
        (t.params.slidesPerView === 'auto' || t.params.slidesPerView > 1) &&
        t.isEnd &&
        !t.params.centeredSlides
      ) {
        const l =
          t.virtual && t.params.virtual.enabled ? t.virtual.slides : t.slides;
        n = t.slideTo(l.length - 1, 0, !1, !0);
      } else n = t.slideTo(t.activeIndex, 0, !1, !0);
      n || r();
    }
    i.watchOverflow && s !== t.snapGrid && t.checkOverflow(), t.emit('update');
  }
  changeDirection(t, s = !0) {
    const i = this,
      r = i.params.direction;
    return (
      t || (t = r === 'horizontal' ? 'vertical' : 'horizontal'),
      t === r ||
        (t !== 'horizontal' && t !== 'vertical') ||
        (i.el.classList.remove(`${i.params.containerModifierClass}${r}`),
        i.el.classList.add(`${i.params.containerModifierClass}${t}`),
        i.emitContainerClasses(),
        (i.params.direction = t),
        i.slides.forEach((n) => {
          t === 'vertical' ? (n.style.width = '') : (n.style.height = '');
        }),
        i.emit('changeDirection'),
        s && i.update()),
      i
    );
  }
  changeLanguageDirection(t) {
    const s = this;
    (s.rtl && t === 'rtl') ||
      (!s.rtl && t === 'ltr') ||
      ((s.rtl = t === 'rtl'),
      (s.rtlTranslate = s.params.direction === 'horizontal' && s.rtl),
      s.rtl
        ? (s.el.classList.add(`${s.params.containerModifierClass}rtl`),
          (s.el.dir = 'rtl'))
        : (s.el.classList.remove(`${s.params.containerModifierClass}rtl`),
          (s.el.dir = 'ltr')),
      s.update());
  }
  mount(t) {
    const s = this;
    if (s.mounted) return !0;
    let i = t || s.params.el;
    if ((typeof i == 'string' && (i = document.querySelector(i)), !i))
      return !1;
    (i.swiper = s), i.shadowEl && (s.isElement = !0);
    const r = () =>
      `.${(s.params.wrapperClass || '').trim().split(' ').join('.')}`;
    let l = (() =>
      i && i.shadowRoot && i.shadowRoot.querySelector
        ? i.shadowRoot.querySelector(r())
        : k(i, r())[0])();
    return (
      !l &&
        s.params.createElements &&
        ((l = de('div', s.params.wrapperClass)),
        i.append(l),
        k(i, `.${s.params.slideClass}`).forEach((a) => {
          l.append(a);
        })),
      Object.assign(s, {
        el: i,
        wrapperEl: l,
        slidesEl: s.isElement ? i : l,
        mounted: !0,
        rtl: i.dir.toLowerCase() === 'rtl' || G(i, 'direction') === 'rtl',
        rtlTranslate:
          s.params.direction === 'horizontal' &&
          (i.dir.toLowerCase() === 'rtl' || G(i, 'direction') === 'rtl'),
        wrongRTL: G(l, 'display') === '-webkit-box'
      }),
      !0
    );
  }
  init(t) {
    const s = this;
    return (
      s.initialized ||
        s.mount(t) === !1 ||
        (s.emit('beforeInit'),
        s.params.breakpoints && s.setBreakpoint(),
        s.addClasses(),
        s.updateSize(),
        s.updateSlides(),
        s.params.watchOverflow && s.checkOverflow(),
        s.params.grabCursor && s.enabled && s.setGrabCursor(),
        s.params.loop && s.virtual && s.params.virtual.enabled
          ? s.slideTo(
              s.params.initialSlide + s.virtual.slidesBefore,
              0,
              s.params.runCallbacksOnInit,
              !1,
              !0
            )
          : s.slideTo(
              s.params.initialSlide,
              0,
              s.params.runCallbacksOnInit,
              !1,
              !0
            ),
        s.params.loop && s.loopCreate(),
        s.attachEvents(),
        [...s.el.querySelectorAll('[loading="lazy"]')].forEach((r) => {
          r.complete
            ? B(s, r)
            : r.addEventListener('load', (n) => {
                B(s, n.target);
              });
        }),
        Y(s),
        (s.initialized = !0),
        Y(s),
        s.emit('init'),
        s.emit('afterInit')),
      s
    );
  }
  destroy(t = !0, s = !0) {
    const i = this,
      { params: r, el: n, wrapperEl: l, slides: a } = i;
    return (
      typeof i.params > 'u' ||
        i.destroyed ||
        (i.emit('beforeDestroy'),
        (i.initialized = !1),
        i.detachEvents(),
        r.loop && i.loopDestroy(),
        s &&
          (i.removeClasses(),
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
        i.emit('destroy'),
        Object.keys(i.eventsListeners).forEach((o) => {
          i.off(o);
        }),
        t !== !1 && ((i.el.swiper = null), we(i)),
        (i.destroyed = !0)),
      null
    );
  }
  static extendDefaults(t) {
    L(R, t);
  }
  static get extendedDefaults() {
    return R;
  }
  static get defaults() {
    return ae;
  }
  static installModule(t) {
    O.prototype.__modules__ || (O.prototype.__modules__ = []);
    const s = O.prototype.__modules__;
    typeof t == 'function' && s.indexOf(t) < 0 && s.push(t);
  }
  static use(t) {
    return Array.isArray(t)
      ? (t.forEach((s) => O.installModule(s)), O)
      : (O.installModule(t), O);
  }
}
Object.keys(W).forEach((e) => {
  Object.keys(W[e]).forEach((t) => {
    O.prototype[t] = W[e][t];
  });
});
O.use([ze, ke]);
function _t(e, t, s, i) {
  return (
    e.params.createElements &&
      Object.keys(i).forEach((r) => {
        if (!s[r] && s.auto === !0) {
          let n = k(e.el, `.${i[r]}`)[0];
          n || ((n = de('div', i[r])), (n.className = i[r]), e.el.append(n)),
            (s[r] = n),
            (t[r] = n);
        }
      }),
    s
  );
}
function Nt({ swiper: e, extendParams: t, on: s, emit: i }) {
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
        (e.slidePrev(), i('navigationPrev'));
  }
  function d(f) {
    f.preventDefault(),
      !(e.isEnd && !e.params.loop && !e.params.rewind) &&
        (e.slideNext(), i('navigationNext'));
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
  s('init', () => {
    e.params.navigation.enabled === !1 ? c() : (h(), a());
  }),
    s('toEdge fromEdge lock unlock', () => {
      a();
    }),
    s('destroy', () => {
      u();
    }),
    s('enable disable', () => {
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
    s('click', (f, p) => {
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
          i(S === !0 ? 'navigationShow' : 'navigationHide'),
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
export { Nt as N, O as S, Bt as e, D as g, N as n };
