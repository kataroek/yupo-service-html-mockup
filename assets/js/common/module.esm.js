var Ce = !1,
  Me = !1,
  j = [],
  Te = -1;
function Kn(e) {
  Dn(e);
}
function Dn(e) {
  j.includes(e) || j.push(e), zn();
}
function yt(e) {
  let t = j.indexOf(e);
  t !== -1 && t > Te && j.splice(t, 1);
}
function zn() {
  !Me && !Ce && ((Ce = !0), queueMicrotask(kn));
}
function kn() {
  (Ce = !1), (Me = !0);
  for (let e = 0; e < j.length; e++) j[e](), (Te = e);
  (j.length = 0), (Te = -1), (Me = !1);
}
var z,
  k,
  Z,
  vt,
  Ie = !0;
function Hn(e) {
  (Ie = !1), e(), (Ie = !0);
}
function qn(e) {
  (z = e.reactive),
    (Z = e.release),
    (k = (t) =>
      e.effect(t, {
        scheduler: (n) => {
          Ie ? Kn(n) : n();
        }
      })),
    (vt = e.raw);
}
function lt(e) {
  k = e;
}
function Wn(e) {
  let t = () => {};
  return [
    (r) => {
      let i = k(r);
      return (
        e._x_effects ||
          ((e._x_effects = new Set()),
          (e._x_runEffects = () => {
            e._x_effects.forEach((o) => o());
          })),
        e._x_effects.add(i),
        (t = () => {
          i !== void 0 && (e._x_effects.delete(i), Z(i));
        }),
        i
      );
    },
    () => {
      t();
    }
  ];
}
var bt = [],
  mt = [],
  wt = [];
function Un(e) {
  wt.push(e);
}
function Et(e, t) {
  typeof t == 'function'
    ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t))
    : ((t = e), mt.push(t));
}
function Vn(e) {
  bt.push(e);
}
function Jn(e, t, n) {
  e._x_attributeCleanups || (e._x_attributeCleanups = {}),
    e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []),
    e._x_attributeCleanups[t].push(n);
}
function St(e, t) {
  e._x_attributeCleanups &&
    Object.entries(e._x_attributeCleanups).forEach(([n, r]) => {
      (t === void 0 || t.includes(n)) &&
        (r.forEach((i) => i()), delete e._x_attributeCleanups[n]);
    });
}
var qe = new MutationObserver(Je),
  We = !1;
function Ue() {
  qe.observe(document, {
    subtree: !0,
    childList: !0,
    attributes: !0,
    attributeOldValue: !0
  }),
    (We = !0);
}
function At() {
  Gn(), qe.disconnect(), (We = !1);
}
var J = [],
  Ee = !1;
function Gn() {
  (J = J.concat(qe.takeRecords())),
    J.length &&
      !Ee &&
      ((Ee = !0),
      queueMicrotask(() => {
        Yn(), (Ee = !1);
      }));
}
function Yn() {
  Je(J), (J.length = 0);
}
function v(e) {
  if (!We) return e();
  At();
  let t = e();
  return Ue(), t;
}
var Ve = !1,
  ae = [];
function Xn() {
  Ve = !0;
}
function Qn() {
  (Ve = !1), Je(ae), (ae = []);
}
function Je(e) {
  if (Ve) {
    ae = ae.concat(e);
    return;
  }
  let t = [],
    n = [],
    r = new Map(),
    i = new Map();
  for (let o = 0; o < e.length; o++)
    if (
      !e[o].target._x_ignoreMutationObserver &&
      (e[o].type === 'childList' &&
        (e[o].addedNodes.forEach((s) => s.nodeType === 1 && t.push(s)),
        e[o].removedNodes.forEach((s) => s.nodeType === 1 && n.push(s))),
      e[o].type === 'attributes')
    ) {
      let s = e[o].target,
        a = e[o].attributeName,
        u = e[o].oldValue,
        c = () => {
          r.has(s) || r.set(s, []),
            r.get(s).push({ name: a, value: s.getAttribute(a) });
        },
        l = () => {
          i.has(s) || i.set(s, []), i.get(s).push(a);
        };
      s.hasAttribute(a) && u === null
        ? c()
        : s.hasAttribute(a)
        ? (l(), c())
        : l();
    }
  i.forEach((o, s) => {
    St(s, o);
  }),
    r.forEach((o, s) => {
      bt.forEach((a) => a(s, o));
    });
  for (let o of n)
    if (!t.includes(o) && (mt.forEach((s) => s(o)), o._x_cleanups))
      for (; o._x_cleanups.length; ) o._x_cleanups.pop()();
  t.forEach((o) => {
    (o._x_ignoreSelf = !0), (o._x_ignore = !0);
  });
  for (let o of t)
    n.includes(o) ||
      (o.isConnected &&
        (delete o._x_ignoreSelf,
        delete o._x_ignore,
        wt.forEach((s) => s(o)),
        (o._x_ignore = !0),
        (o._x_ignoreSelf = !0)));
  t.forEach((o) => {
    delete o._x_ignoreSelf, delete o._x_ignore;
  }),
    (t = null),
    (n = null),
    (r = null),
    (i = null);
}
function Ot(e) {
  return te(K(e));
}
function ee(e, t, n) {
  return (
    (e._x_dataStack = [t, ...K(n || e)]),
    () => {
      e._x_dataStack = e._x_dataStack.filter((r) => r !== t);
    }
  );
}
function K(e) {
  return e._x_dataStack
    ? e._x_dataStack
    : typeof ShadowRoot == 'function' && e instanceof ShadowRoot
    ? K(e.host)
    : e.parentNode
    ? K(e.parentNode)
    : [];
}
function te(e) {
  let t = new Proxy(
    {},
    {
      ownKeys: () => Array.from(new Set(e.flatMap((n) => Object.keys(n)))),
      has: (n, r) => e.some((i) => i.hasOwnProperty(r)),
      get: (n, r) =>
        (e.find((i) => {
          if (i.hasOwnProperty(r)) {
            let o = Object.getOwnPropertyDescriptor(i, r);
            if (
              (o.get && o.get._x_alreadyBound) ||
              (o.set && o.set._x_alreadyBound)
            )
              return !0;
            if ((o.get || o.set) && o.enumerable) {
              let s = o.get,
                a = o.set,
                u = o;
              (s = s && s.bind(t)),
                (a = a && a.bind(t)),
                s && (s._x_alreadyBound = !0),
                a && (a._x_alreadyBound = !0),
                Object.defineProperty(i, r, { ...u, get: s, set: a });
            }
            return !0;
          }
          return !1;
        }) || {})[r],
      set: (n, r, i) => {
        let o = e.find((s) => s.hasOwnProperty(r));
        return o ? (o[r] = i) : (e[e.length - 1][r] = i), !0;
      }
    }
  );
  return t;
}
function Ct(e) {
  let t = (r) => typeof r == 'object' && !Array.isArray(r) && r !== null,
    n = (r, i = '') => {
      Object.entries(Object.getOwnPropertyDescriptors(r)).forEach(
        ([o, { value: s, enumerable: a }]) => {
          if (a === !1 || s === void 0) return;
          let u = i === '' ? o : `${i}.${o}`;
          typeof s == 'object' && s !== null && s._x_interceptor
            ? (r[o] = s.initialize(e, u, o))
            : t(s) && s !== r && !(s instanceof Element) && n(s, u);
        }
      );
    };
  return n(e);
}
function Mt(e, t = () => {}) {
  let n = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(r, i, o) {
      return e(
        this.initialValue,
        () => Zn(r, i),
        (s) => Pe(r, i, s),
        i,
        o
      );
    }
  };
  return (
    t(n),
    (r) => {
      if (typeof r == 'object' && r !== null && r._x_interceptor) {
        let i = n.initialize.bind(n);
        n.initialize = (o, s, a) => {
          let u = r.initialize(o, s, a);
          return (n.initialValue = u), i(o, s, a);
        };
      } else n.initialValue = r;
      return n;
    }
  );
}
function Zn(e, t) {
  return t.split('.').reduce((n, r) => n[r], e);
}
function Pe(e, t, n) {
  if ((typeof t == 'string' && (t = t.split('.')), t.length === 1)) e[t[0]] = n;
  else {
    if (t.length === 0) throw error;
    return e[t[0]] || (e[t[0]] = {}), Pe(e[t[0]], t.slice(1), n);
  }
}
var Tt = {};
function S(e, t) {
  Tt[e] = t;
}
function $e(e, t) {
  return (
    Object.entries(Tt).forEach(([n, r]) => {
      let i = null;
      function o() {
        if (i) return i;
        {
          let [s, a] = Lt(t);
          return (i = { interceptor: Mt, ...s }), Et(t, a), i;
        }
      }
      Object.defineProperty(e, `$${n}`, {
        get() {
          return r(t, o());
        },
        enumerable: !1
      });
    }),
    e
  );
}
function er(e, t, n, ...r) {
  try {
    return n(...r);
  } catch (i) {
    X(i, e, t);
  }
}
function X(e, t, n = void 0) {
  Object.assign(e, { el: t, expression: n }),
    console.warn(
      `Alpine Expression Error: ${e.message}

${
  n
    ? 'Expression: "' +
      n +
      `"

`
    : ''
}`,
      t
    ),
    setTimeout(() => {
      throw e;
    }, 0);
}
var se = !0;
function It(e) {
  let t = se;
  se = !1;
  let n = e();
  return (se = t), n;
}
function L(e, t, n = {}) {
  let r;
  return m(e, t)((i) => (r = i), n), r;
}
function m(...e) {
  return Pt(...e);
}
var Pt = $t;
function tr(e) {
  Pt = e;
}
function $t(e, t) {
  let n = {};
  $e(n, e);
  let r = [n, ...K(e)],
    i = typeof t == 'function' ? nr(r, t) : ir(r, t, e);
  return er.bind(null, e, t, i);
}
function nr(e, t) {
  return (n = () => {}, { scope: r = {}, params: i = [] } = {}) => {
    let o = t.apply(te([r, ...e]), i);
    ue(n, o);
  };
}
var Se = {};
function rr(e, t) {
  if (Se[e]) return Se[e];
  let n = Object.getPrototypeOf(async function () {}).constructor,
    r =
      /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e)
        ? `(async()=>{ ${e} })()`
        : e,
    o = (() => {
      try {
        return new n(
          ['__self', 'scope'],
          `with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`
        );
      } catch (s) {
        return X(s, t, e), Promise.resolve();
      }
    })();
  return (Se[e] = o), o;
}
function ir(e, t, n) {
  let r = rr(t, n);
  return (i = () => {}, { scope: o = {}, params: s = [] } = {}) => {
    (r.result = void 0), (r.finished = !1);
    let a = te([o, ...e]);
    if (typeof r == 'function') {
      let u = r(r, a).catch((c) => X(c, n, t));
      r.finished
        ? (ue(i, r.result, a, s, n), (r.result = void 0))
        : u
            .then((c) => {
              ue(i, c, a, s, n);
            })
            .catch((c) => X(c, n, t))
            .finally(() => (r.result = void 0));
    }
  };
}
function ue(e, t, n, r, i) {
  if (se && typeof t == 'function') {
    let o = t.apply(n, r);
    o instanceof Promise
      ? o.then((s) => ue(e, s, n, r)).catch((s) => X(s, i, t))
      : e(o);
  } else
    typeof t == 'object' && t instanceof Promise ? t.then((o) => e(o)) : e(t);
}
var Ge = 'x-';
function H(e = '') {
  return Ge + e;
}
function or(e) {
  Ge = e;
}
var Re = {};
function g(e, t) {
  return (
    (Re[e] = t),
    {
      before(n) {
        if (!Re[n]) {
          console.warn(
            'Cannot find directive `${directive}`. `${name}` will use the default order of execution'
          );
          return;
        }
        const r = R.indexOf(n);
        R.splice(r >= 0 ? r : R.indexOf('DEFAULT'), 0, e);
      }
    }
  );
}
function Ye(e, t, n) {
  if (((t = Array.from(t)), e._x_virtualDirectives)) {
    let o = Object.entries(e._x_virtualDirectives).map(([a, u]) => ({
        name: a,
        value: u
      })),
      s = Rt(o);
    (o = o.map((a) =>
      s.find((u) => u.name === a.name)
        ? { name: `x-bind:${a.name}`, value: `"${a.value}"` }
        : a
    )),
      (t = t.concat(o));
  }
  let r = {};
  return t
    .map(Bt((o, s) => (r[o] = s)))
    .filter(Dt)
    .map(ur(r, n))
    .sort(cr)
    .map((o) => ar(e, o));
}
function Rt(e) {
  return Array.from(e)
    .map(Bt())
    .filter((t) => !Dt(t));
}
var je = !1,
  V = new Map(),
  jt = Symbol();
function sr(e) {
  je = !0;
  let t = Symbol();
  (jt = t), V.set(t, []);
  let n = () => {
      for (; V.get(t).length; ) V.get(t).shift()();
      V.delete(t);
    },
    r = () => {
      (je = !1), n();
    };
  e(n), r();
}
function Lt(e) {
  let t = [],
    n = (a) => t.push(a),
    [r, i] = Wn(e);
  return (
    t.push(i),
    [
      {
        Alpine: re,
        effect: r,
        cleanup: n,
        evaluateLater: m.bind(m, e),
        evaluate: L.bind(L, e)
      },
      () => t.forEach((a) => a())
    ]
  );
}
function ar(e, t) {
  let n = () => {},
    r = Re[t.type] || n,
    [i, o] = Lt(e);
  Jn(e, t.original, o);
  let s = () => {
    e._x_ignore ||
      e._x_ignoreSelf ||
      (r.inline && r.inline(e, t, i),
      (r = r.bind(r, e, t, i)),
      je ? V.get(jt).push(r) : r());
  };
  return (s.runCleanups = o), s;
}
var Nt =
    (e, t) =>
    ({ name: n, value: r }) => (
      n.startsWith(e) && (n = n.replace(e, t)), { name: n, value: r }
    ),
  Ft = (e) => e;
function Bt(e = () => {}) {
  return ({ name: t, value: n }) => {
    let { name: r, value: i } = Kt.reduce((o, s) => s(o), {
      name: t,
      value: n
    });
    return r !== t && e(r, t), { name: r, value: i };
  };
}
var Kt = [];
function Xe(e) {
  Kt.push(e);
}
function Dt({ name: e }) {
  return zt().test(e);
}
var zt = () => new RegExp(`^${Ge}([^:^.]+)\\b`);
function ur(e, t) {
  return ({ name: n, value: r }) => {
    let i = n.match(zt()),
      o = n.match(/:([a-zA-Z0-9\-:]+)/),
      s = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
      a = t || e[n] || n;
    return {
      type: i ? i[1] : null,
      value: o ? o[1] : null,
      modifiers: s.map((u) => u.replace('.', '')),
      expression: r,
      original: a
    };
  };
}
var Le = 'DEFAULT',
  R = [
    'ignore',
    'ref',
    'data',
    'id',
    'bind',
    'init',
    'for',
    'model',
    'modelable',
    'transition',
    'show',
    'if',
    Le,
    'teleport'
  ];
function cr(e, t) {
  let n = R.indexOf(e.type) === -1 ? Le : e.type,
    r = R.indexOf(t.type) === -1 ? Le : t.type;
  return R.indexOf(n) - R.indexOf(r);
}
function G(e, t, n = {}) {
  e.dispatchEvent(
    new CustomEvent(t, { detail: n, bubbles: !0, composed: !0, cancelable: !0 })
  );
}
function M(e, t) {
  if (typeof ShadowRoot == 'function' && e instanceof ShadowRoot) {
    Array.from(e.children).forEach((i) => M(i, t));
    return;
  }
  let n = !1;
  if ((t(e, () => (n = !0)), n)) return;
  let r = e.firstElementChild;
  for (; r; ) M(r, t), (r = r.nextElementSibling);
}
function T(e, ...t) {
  console.warn(`Alpine Warning: ${e}`, ...t);
}
var ft = !1;
function lr() {
  ft &&
    T(
      'Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.'
    ),
    (ft = !0),
    document.body ||
      T(
        "Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"
      ),
    G(document, 'alpine:init'),
    G(document, 'alpine:initializing'),
    Ue(),
    Un((t) => I(t, M)),
    Et((t) => Jt(t)),
    Vn((t, n) => {
      Ye(t, n).forEach((r) => r());
    });
  let e = (t) => !fe(t.parentElement, !0);
  Array.from(document.querySelectorAll(qt()))
    .filter(e)
    .forEach((t) => {
      I(t);
    }),
    G(document, 'alpine:initialized');
}
var Qe = [],
  kt = [];
function Ht() {
  return Qe.map((e) => e());
}
function qt() {
  return Qe.concat(kt).map((e) => e());
}
function Wt(e) {
  Qe.push(e);
}
function Ut(e) {
  kt.push(e);
}
function fe(e, t = !1) {
  return de(e, (n) => {
    if ((t ? qt() : Ht()).some((i) => n.matches(i))) return !0;
  });
}
function de(e, t) {
  if (e) {
    if (t(e)) return e;
    if ((e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement))
      return de(e.parentElement, t);
  }
}
function fr(e) {
  return Ht().some((t) => e.matches(t));
}
var Vt = [];
function dr(e) {
  Vt.push(e);
}
function I(e, t = M, n = () => {}) {
  sr(() => {
    t(e, (r, i) => {
      n(r, i),
        Vt.forEach((o) => o(r, i)),
        Ye(r, r.attributes).forEach((o) => o()),
        r._x_ignore && i();
    });
  });
}
function Jt(e) {
  M(e, (t) => St(t));
}
var Ne = [],
  Ze = !1;
function et(e = () => {}) {
  return (
    queueMicrotask(() => {
      Ze ||
        setTimeout(() => {
          Fe();
        });
    }),
    new Promise((t) => {
      Ne.push(() => {
        e(), t();
      });
    })
  );
}
function Fe() {
  for (Ze = !1; Ne.length; ) Ne.shift()();
}
function pr() {
  Ze = !0;
}
function tt(e, t) {
  return Array.isArray(t)
    ? dt(e, t.join(' '))
    : typeof t == 'object' && t !== null
    ? _r(e, t)
    : typeof t == 'function'
    ? tt(e, t())
    : dt(e, t);
}
function dt(e, t) {
  let n = (i) =>
      i
        .split(' ')
        .filter((o) => !e.classList.contains(o))
        .filter(Boolean),
    r = (i) => (
      e.classList.add(...i),
      () => {
        e.classList.remove(...i);
      }
    );
  return (t = t === !0 ? (t = '') : t || ''), r(n(t));
}
function _r(e, t) {
  let n = (a) => a.split(' ').filter(Boolean),
    r = Object.entries(t)
      .flatMap(([a, u]) => (u ? n(a) : !1))
      .filter(Boolean),
    i = Object.entries(t)
      .flatMap(([a, u]) => (u ? !1 : n(a)))
      .filter(Boolean),
    o = [],
    s = [];
  return (
    i.forEach((a) => {
      e.classList.contains(a) && (e.classList.remove(a), s.push(a));
    }),
    r.forEach((a) => {
      e.classList.contains(a) || (e.classList.add(a), o.push(a));
    }),
    () => {
      s.forEach((a) => e.classList.add(a)),
        o.forEach((a) => e.classList.remove(a));
    }
  );
}
function pe(e, t) {
  return typeof t == 'object' && t !== null ? hr(e, t) : gr(e, t);
}
function hr(e, t) {
  let n = {};
  return (
    Object.entries(t).forEach(([r, i]) => {
      (n[r] = e.style[r]),
        r.startsWith('--') || (r = xr(r)),
        e.style.setProperty(r, i);
    }),
    setTimeout(() => {
      e.style.length === 0 && e.removeAttribute('style');
    }),
    () => {
      pe(e, n);
    }
  );
}
function gr(e, t) {
  let n = e.getAttribute('style', t);
  return (
    e.setAttribute('style', t),
    () => {
      e.setAttribute('style', n || '');
    }
  );
}
function xr(e) {
  return e.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function Be(e, t = () => {}) {
  let n = !1;
  return function () {
    n ? t.apply(this, arguments) : ((n = !0), e.apply(this, arguments));
  };
}
g(
  'transition',
  (e, { value: t, modifiers: n, expression: r }, { evaluate: i }) => {
    typeof r == 'function' && (r = i(r)),
      r !== !1 && (!r || typeof r == 'boolean' ? vr(e, n, t) : yr(e, r, t));
  }
);
function yr(e, t, n) {
  Gt(e, tt, ''),
    {
      enter: (i) => {
        e._x_transition.enter.during = i;
      },
      'enter-start': (i) => {
        e._x_transition.enter.start = i;
      },
      'enter-end': (i) => {
        e._x_transition.enter.end = i;
      },
      leave: (i) => {
        e._x_transition.leave.during = i;
      },
      'leave-start': (i) => {
        e._x_transition.leave.start = i;
      },
      'leave-end': (i) => {
        e._x_transition.leave.end = i;
      }
    }[n](t);
}
function vr(e, t, n) {
  Gt(e, pe);
  let r = !t.includes('in') && !t.includes('out') && !n,
    i = r || t.includes('in') || ['enter'].includes(n),
    o = r || t.includes('out') || ['leave'].includes(n);
  t.includes('in') && !r && (t = t.filter((_, x) => x < t.indexOf('out'))),
    t.includes('out') && !r && (t = t.filter((_, x) => x > t.indexOf('out')));
  let s = !t.includes('opacity') && !t.includes('scale'),
    a = s || t.includes('opacity'),
    u = s || t.includes('scale'),
    c = a ? 0 : 1,
    l = u ? W(t, 'scale', 95) / 100 : 1,
    p = W(t, 'delay', 0) / 1e3,
    d = W(t, 'origin', 'center'),
    y = 'opacity, transform',
    O = W(t, 'duration', 150) / 1e3,
    ie = W(t, 'duration', 75) / 1e3,
    f = 'cubic-bezier(0.4, 0.0, 0.2, 1)';
  i &&
    ((e._x_transition.enter.during = {
      transformOrigin: d,
      transitionDelay: `${p}s`,
      transitionProperty: y,
      transitionDuration: `${O}s`,
      transitionTimingFunction: f
    }),
    (e._x_transition.enter.start = { opacity: c, transform: `scale(${l})` }),
    (e._x_transition.enter.end = { opacity: 1, transform: 'scale(1)' })),
    o &&
      ((e._x_transition.leave.during = {
        transformOrigin: d,
        transitionDelay: `${p}s`,
        transitionProperty: y,
        transitionDuration: `${ie}s`,
        transitionTimingFunction: f
      }),
      (e._x_transition.leave.start = { opacity: 1, transform: 'scale(1)' }),
      (e._x_transition.leave.end = { opacity: c, transform: `scale(${l})` }));
}
function Gt(e, t, n = {}) {
  e._x_transition ||
    (e._x_transition = {
      enter: { during: n, start: n, end: n },
      leave: { during: n, start: n, end: n },
      in(r = () => {}, i = () => {}) {
        Ke(
          e,
          t,
          {
            during: this.enter.during,
            start: this.enter.start,
            end: this.enter.end
          },
          r,
          i
        );
      },
      out(r = () => {}, i = () => {}) {
        Ke(
          e,
          t,
          {
            during: this.leave.during,
            start: this.leave.start,
            end: this.leave.end
          },
          r,
          i
        );
      }
    });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function (
  e,
  t,
  n,
  r
) {
  const i =
    document.visibilityState === 'visible' ? requestAnimationFrame : setTimeout;
  let o = () => i(n);
  if (t) {
    e._x_transition && (e._x_transition.enter || e._x_transition.leave)
      ? e._x_transition.enter &&
        (Object.entries(e._x_transition.enter.during).length ||
          Object.entries(e._x_transition.enter.start).length ||
          Object.entries(e._x_transition.enter.end).length)
        ? e._x_transition.in(n)
        : o()
      : e._x_transition
      ? e._x_transition.in(n)
      : o();
    return;
  }
  (e._x_hidePromise = e._x_transition
    ? new Promise((s, a) => {
        e._x_transition.out(
          () => {},
          () => s(r)
        ),
          e._x_transitioning.beforeCancel(() =>
            a({ isFromCancelledTransition: !0 })
          );
      })
    : Promise.resolve(r)),
    queueMicrotask(() => {
      let s = Yt(e);
      s
        ? (s._x_hideChildren || (s._x_hideChildren = []),
          s._x_hideChildren.push(e))
        : i(() => {
            let a = (u) => {
              let c = Promise.all([
                u._x_hidePromise,
                ...(u._x_hideChildren || []).map(a)
              ]).then(([l]) => l());
              return delete u._x_hidePromise, delete u._x_hideChildren, c;
            };
            a(e).catch((u) => {
              if (!u.isFromCancelledTransition) throw u;
            });
          });
    });
};
function Yt(e) {
  let t = e.parentNode;
  if (t) return t._x_hidePromise ? t : Yt(t);
}
function Ke(
  e,
  t,
  { during: n, start: r, end: i } = {},
  o = () => {},
  s = () => {}
) {
  if (
    (e._x_transitioning && e._x_transitioning.cancel(),
    Object.keys(n).length === 0 &&
      Object.keys(r).length === 0 &&
      Object.keys(i).length === 0)
  ) {
    o(), s();
    return;
  }
  let a, u, c;
  br(e, {
    start() {
      a = t(e, r);
    },
    during() {
      u = t(e, n);
    },
    before: o,
    end() {
      a(), (c = t(e, i));
    },
    after: s,
    cleanup() {
      u(), c();
    }
  });
}
function br(e, t) {
  let n,
    r,
    i,
    o = Be(() => {
      v(() => {
        (n = !0),
          r || t.before(),
          i || (t.end(), Fe()),
          t.after(),
          e.isConnected && t.cleanup(),
          delete e._x_transitioning;
      });
    });
  (e._x_transitioning = {
    beforeCancels: [],
    beforeCancel(s) {
      this.beforeCancels.push(s);
    },
    cancel: Be(function () {
      for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
      o();
    }),
    finish: o
  }),
    v(() => {
      t.start(), t.during();
    }),
    pr(),
    requestAnimationFrame(() => {
      if (n) return;
      let s =
          Number(
            getComputedStyle(e)
              .transitionDuration.replace(/,.*/, '')
              .replace('s', '')
          ) * 1e3,
        a =
          Number(
            getComputedStyle(e)
              .transitionDelay.replace(/,.*/, '')
              .replace('s', '')
          ) * 1e3;
      s === 0 &&
        (s =
          Number(getComputedStyle(e).animationDuration.replace('s', '')) * 1e3),
        v(() => {
          t.before();
        }),
        (r = !0),
        requestAnimationFrame(() => {
          n ||
            (v(() => {
              t.end();
            }),
            Fe(),
            setTimeout(e._x_transitioning.finish, s + a),
            (i = !0));
        });
    });
}
function W(e, t, n) {
  if (e.indexOf(t) === -1) return n;
  const r = e[e.indexOf(t) + 1];
  if (!r || (t === 'scale' && isNaN(r))) return n;
  if (t === 'duration' || t === 'delay') {
    let i = r.match(/([0-9]+)ms/);
    if (i) return i[1];
  }
  return t === 'origin' &&
    ['top', 'right', 'left', 'center', 'bottom'].includes(e[e.indexOf(t) + 2])
    ? [r, e[e.indexOf(t) + 2]].join(' ')
    : r;
}
var Q = !1;
function ne(e, t = () => {}) {
  return (...n) => (Q ? t(...n) : e(...n));
}
function mr(e) {
  return (...t) => Q && e(...t);
}
function wr(e, t) {
  t._x_dataStack || (t._x_dataStack = e._x_dataStack),
    (Q = !0),
    Sr(() => {
      Er(t);
    }),
    (Q = !1);
}
function Er(e) {
  let t = !1;
  I(e, (r, i) => {
    M(r, (o, s) => {
      if (t && fr(o)) return s();
      (t = !0), i(o, s);
    });
  });
}
function Sr(e) {
  let t = k;
  lt((n, r) => {
    let i = t(n);
    return Z(i), () => {};
  }),
    e(),
    lt(t);
}
function Xt(e, t, n, r = []) {
  switch (
    (e._x_bindings || (e._x_bindings = z({})),
    (e._x_bindings[t] = n),
    (t = r.includes('camel') ? $r(t) : t),
    t)
  ) {
    case 'value':
      Ar(e, n);
      break;
    case 'style':
      Cr(e, n);
      break;
    case 'class':
      Or(e, n);
      break;
    case 'selected':
    case 'checked':
      Mr(e, t, n);
      break;
    default:
      Qt(e, t, n);
      break;
  }
}
function Ar(e, t) {
  if (e.type === 'radio')
    e.attributes.value === void 0 && (e.value = t),
      window.fromModel && (e.checked = pt(e.value, t));
  else if (e.type === 'checkbox')
    Number.isInteger(t)
      ? (e.value = t)
      : !Number.isInteger(t) &&
        !Array.isArray(t) &&
        typeof t != 'boolean' &&
        ![null, void 0].includes(t)
      ? (e.value = String(t))
      : Array.isArray(t)
      ? (e.checked = t.some((n) => pt(n, e.value)))
      : (e.checked = !!t);
  else if (e.tagName === 'SELECT') Pr(e, t);
  else {
    if (e.value === t) return;
    e.value = t;
  }
}
function Or(e, t) {
  e._x_undoAddedClasses && e._x_undoAddedClasses(),
    (e._x_undoAddedClasses = tt(e, t));
}
function Cr(e, t) {
  e._x_undoAddedStyles && e._x_undoAddedStyles(),
    (e._x_undoAddedStyles = pe(e, t));
}
function Mr(e, t, n) {
  Qt(e, t, n), Ir(e, t, n);
}
function Qt(e, t, n) {
  [null, void 0, !1].includes(n) && Rr(t)
    ? e.removeAttribute(t)
    : (Zt(t) && (n = t), Tr(e, t, n));
}
function Tr(e, t, n) {
  e.getAttribute(t) != n && e.setAttribute(t, n);
}
function Ir(e, t, n) {
  e[t] !== n && (e[t] = n);
}
function Pr(e, t) {
  const n = [].concat(t).map((r) => r + '');
  Array.from(e.options).forEach((r) => {
    r.selected = n.includes(r.value);
  });
}
function $r(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function pt(e, t) {
  return e == t;
}
function Zt(e) {
  return [
    'disabled',
    'checked',
    'required',
    'readonly',
    'hidden',
    'open',
    'selected',
    'autofocus',
    'itemscope',
    'multiple',
    'novalidate',
    'allowfullscreen',
    'allowpaymentrequest',
    'formnovalidate',
    'autoplay',
    'controls',
    'loop',
    'muted',
    'playsinline',
    'default',
    'ismap',
    'reversed',
    'async',
    'defer',
    'nomodule'
  ].includes(e);
}
function Rr(e) {
  return ![
    'aria-pressed',
    'aria-checked',
    'aria-expanded',
    'aria-selected'
  ].includes(e);
}
function jr(e, t, n) {
  return e._x_bindings && e._x_bindings[t] !== void 0
    ? e._x_bindings[t]
    : en(e, t, n);
}
function Lr(e, t, n, r = !0) {
  if (e._x_bindings && e._x_bindings[t] !== void 0) return e._x_bindings[t];
  if (e._x_inlineBindings && e._x_inlineBindings[t] !== void 0) {
    let i = e._x_inlineBindings[t];
    return (i.extract = r), It(() => L(e, i.expression));
  }
  return en(e, t, n);
}
function en(e, t, n) {
  let r = e.getAttribute(t);
  return r === null
    ? typeof n == 'function'
      ? n()
      : n
    : r === ''
    ? !0
    : Zt(t)
    ? !![t, 'true'].includes(r)
    : r;
}
function tn(e, t) {
  var n;
  return function () {
    var r = this,
      i = arguments,
      o = function () {
        (n = null), e.apply(r, i);
      };
    clearTimeout(n), (n = setTimeout(o, t));
  };
}
function nn(e, t) {
  let n;
  return function () {
    let r = this,
      i = arguments;
    n || (e.apply(r, i), (n = !0), setTimeout(() => (n = !1), t));
  };
}
function Nr(e) {
  (Array.isArray(e) ? e : [e]).forEach((n) => n(re));
}
var $ = {},
  _t = !1;
function Fr(e, t) {
  if ((_t || (($ = z($)), (_t = !0)), t === void 0)) return $[e];
  ($[e] = t),
    typeof t == 'object' &&
      t !== null &&
      t.hasOwnProperty('init') &&
      typeof t.init == 'function' &&
      $[e].init(),
    Ct($[e]);
}
function Br() {
  return $;
}
var rn = {};
function Kr(e, t) {
  let n = typeof t != 'function' ? () => t : t;
  e instanceof Element ? on(e, n()) : (rn[e] = n);
}
function Dr(e) {
  return (
    Object.entries(rn).forEach(([t, n]) => {
      Object.defineProperty(e, t, {
        get() {
          return (...r) => n(...r);
        }
      });
    }),
    e
  );
}
function on(e, t, n) {
  let r = [];
  for (; r.length; ) r.pop()();
  let i = Object.entries(t).map(([s, a]) => ({ name: s, value: a })),
    o = Rt(i);
  (i = i.map((s) =>
    o.find((a) => a.name === s.name)
      ? { name: `x-bind:${s.name}`, value: `"${s.value}"` }
      : s
  )),
    Ye(e, i, n).map((s) => {
      r.push(s.runCleanups), s();
    });
}
var sn = {};
function zr(e, t) {
  sn[e] = t;
}
function kr(e, t) {
  return (
    Object.entries(sn).forEach(([n, r]) => {
      Object.defineProperty(e, n, {
        get() {
          return (...i) => r.bind(t)(...i);
        },
        enumerable: !1
      });
    }),
    e
  );
}
var Hr = {
    get reactive() {
      return z;
    },
    get release() {
      return Z;
    },
    get effect() {
      return k;
    },
    get raw() {
      return vt;
    },
    version: '3.12.3',
    flushAndStopDeferringMutations: Qn,
    dontAutoEvaluateFunctions: It,
    disableEffectScheduling: Hn,
    startObservingMutations: Ue,
    stopObservingMutations: At,
    setReactivityEngine: qn,
    closestDataStack: K,
    skipDuringClone: ne,
    onlyDuringClone: mr,
    addRootSelector: Wt,
    addInitSelector: Ut,
    addScopeToNode: ee,
    deferMutations: Xn,
    mapAttributes: Xe,
    evaluateLater: m,
    interceptInit: dr,
    setEvaluator: tr,
    mergeProxies: te,
    extractProp: Lr,
    findClosest: de,
    closestRoot: fe,
    destroyTree: Jt,
    interceptor: Mt,
    transition: Ke,
    setStyles: pe,
    mutateDom: v,
    directive: g,
    throttle: nn,
    debounce: tn,
    evaluate: L,
    initTree: I,
    nextTick: et,
    prefixed: H,
    prefix: or,
    plugin: Nr,
    magic: S,
    store: Fr,
    start: lr,
    clone: wr,
    bound: jr,
    $data: Ot,
    walk: M,
    data: zr,
    bind: Kr
  },
  re = Hr;
function qr(e, t) {
  const n = Object.create(null),
    r = e.split(',');
  for (let i = 0; i < r.length; i++) n[r[i]] = !0;
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
var Wr = Object.freeze({}),
  an = Object.assign,
  Ur = Object.prototype.hasOwnProperty,
  _e = (e, t) => Ur.call(e, t),
  N = Array.isArray,
  Y = (e) => un(e) === '[object Map]',
  Vr = (e) => typeof e == 'string',
  nt = (e) => typeof e == 'symbol',
  he = (e) => e !== null && typeof e == 'object',
  Jr = Object.prototype.toString,
  un = (e) => Jr.call(e),
  cn = (e) => un(e).slice(8, -1),
  rt = (e) =>
    Vr(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  Gr = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Yr = Gr((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  ln = (e, t) => e !== t && (e === e || t === t),
  De = new WeakMap(),
  U = [],
  A,
  F = Symbol('iterate'),
  ze = Symbol('Map key iterate');
function Xr(e) {
  return e && e._isEffect === !0;
}
function Qr(e, t = Wr) {
  Xr(e) && (e = e.raw);
  const n = ti(e, t);
  return t.lazy || n(), n;
}
function Zr(e) {
  e.active && (fn(e), e.options.onStop && e.options.onStop(), (e.active = !1));
}
var ei = 0;
function ti(e, t) {
  const n = function () {
    if (!n.active) return e();
    if (!U.includes(n)) {
      fn(n);
      try {
        return ri(), U.push(n), (A = n), e();
      } finally {
        U.pop(), dn(), (A = U[U.length - 1]);
      }
    }
  };
  return (
    (n.id = ei++),
    (n.allowRecurse = !!t.allowRecurse),
    (n._isEffect = !0),
    (n.active = !0),
    (n.raw = e),
    (n.deps = []),
    (n.options = t),
    n
  );
}
function fn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
var D = !0,
  it = [];
function ni() {
  it.push(D), (D = !1);
}
function ri() {
  it.push(D), (D = !0);
}
function dn() {
  const e = it.pop();
  D = e === void 0 ? !0 : e;
}
function E(e, t, n) {
  if (!D || A === void 0) return;
  let r = De.get(e);
  r || De.set(e, (r = new Map()));
  let i = r.get(n);
  i || r.set(n, (i = new Set())),
    i.has(A) ||
      (i.add(A),
      A.deps.push(i),
      A.options.onTrack &&
        A.options.onTrack({ effect: A, target: e, type: t, key: n }));
}
function P(e, t, n, r, i, o) {
  const s = De.get(e);
  if (!s) return;
  const a = new Set(),
    u = (l) => {
      l &&
        l.forEach((p) => {
          (p !== A || p.allowRecurse) && a.add(p);
        });
    };
  if (t === 'clear') s.forEach(u);
  else if (n === 'length' && N(e))
    s.forEach((l, p) => {
      (p === 'length' || p >= r) && u(l);
    });
  else
    switch ((n !== void 0 && u(s.get(n)), t)) {
      case 'add':
        N(e)
          ? rt(n) && u(s.get('length'))
          : (u(s.get(F)), Y(e) && u(s.get(ze)));
        break;
      case 'delete':
        N(e) || (u(s.get(F)), Y(e) && u(s.get(ze)));
        break;
      case 'set':
        Y(e) && u(s.get(F));
        break;
    }
  const c = (l) => {
    l.options.onTrigger &&
      l.options.onTrigger({
        effect: l,
        target: e,
        key: n,
        type: t,
        newValue: r,
        oldValue: i,
        oldTarget: o
      }),
      l.options.scheduler ? l.options.scheduler(l) : l();
  };
  a.forEach(c);
}
var ii = qr('__proto__,__v_isRef,__isVue'),
  pn = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((e) => Symbol[e])
      .filter(nt)
  ),
  oi = ge(),
  si = ge(!1, !0),
  ai = ge(!0),
  ui = ge(!0, !0),
  ce = {};
['includes', 'indexOf', 'lastIndexOf'].forEach((e) => {
  const t = Array.prototype[e];
  ce[e] = function (...n) {
    const r = h(this);
    for (let o = 0, s = this.length; o < s; o++) E(r, 'get', o + '');
    const i = t.apply(r, n);
    return i === -1 || i === !1 ? t.apply(r, n.map(h)) : i;
  };
});
['push', 'pop', 'shift', 'unshift', 'splice'].forEach((e) => {
  const t = Array.prototype[e];
  ce[e] = function (...n) {
    ni();
    const r = t.apply(this, n);
    return dn(), r;
  };
});
function ge(e = !1, t = !1) {
  return function (r, i, o) {
    if (i === '__v_isReactive') return !e;
    if (i === '__v_isReadonly') return e;
    if (i === '__v_raw' && o === (e ? (t ? yi : Mn) : t ? xi : Cn).get(r))
      return r;
    const s = N(r);
    if (!e && s && _e(ce, i)) return Reflect.get(ce, i, o);
    const a = Reflect.get(r, i, o);
    return (nt(i) ? pn.has(i) : ii(i)) || (e || E(r, 'get', i), t)
      ? a
      : ke(a)
      ? !s || !rt(i)
        ? a.value
        : a
      : he(a)
      ? e
        ? Tn(a)
        : ut(a)
      : a;
  };
}
var ci = _n(),
  li = _n(!0);
function _n(e = !1) {
  return function (n, r, i, o) {
    let s = n[r];
    if (!e && ((i = h(i)), (s = h(s)), !N(n) && ke(s) && !ke(i)))
      return (s.value = i), !0;
    const a = N(n) && rt(r) ? Number(r) < n.length : _e(n, r),
      u = Reflect.set(n, r, i, o);
    return (
      n === h(o) && (a ? ln(i, s) && P(n, 'set', r, i, s) : P(n, 'add', r, i)),
      u
    );
  };
}
function fi(e, t) {
  const n = _e(e, t),
    r = e[t],
    i = Reflect.deleteProperty(e, t);
  return i && n && P(e, 'delete', t, void 0, r), i;
}
function di(e, t) {
  const n = Reflect.has(e, t);
  return (!nt(t) || !pn.has(t)) && E(e, 'has', t), n;
}
function pi(e) {
  return E(e, 'iterate', N(e) ? 'length' : F), Reflect.ownKeys(e);
}
var hn = { get: oi, set: ci, deleteProperty: fi, has: di, ownKeys: pi },
  gn = {
    get: ai,
    set(e, t) {
      return (
        console.warn(
          `Set operation on key "${String(t)}" failed: target is readonly.`,
          e
        ),
        !0
      );
    },
    deleteProperty(e, t) {
      return (
        console.warn(
          `Delete operation on key "${String(t)}" failed: target is readonly.`,
          e
        ),
        !0
      );
    }
  };
an({}, hn, { get: si, set: li });
an({}, gn, { get: ui });
var ot = (e) => (he(e) ? ut(e) : e),
  st = (e) => (he(e) ? Tn(e) : e),
  at = (e) => e,
  xe = (e) => Reflect.getPrototypeOf(e);
function ye(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const i = h(e),
    o = h(t);
  t !== o && !n && E(i, 'get', t), !n && E(i, 'get', o);
  const { has: s } = xe(i),
    a = r ? at : n ? st : ot;
  if (s.call(i, t)) return a(e.get(t));
  if (s.call(i, o)) return a(e.get(o));
  e !== i && e.get(t);
}
function ve(e, t = !1) {
  const n = this.__v_raw,
    r = h(n),
    i = h(e);
  return (
    e !== i && !t && E(r, 'has', e),
    !t && E(r, 'has', i),
    e === i ? n.has(e) : n.has(e) || n.has(i)
  );
}
function be(e, t = !1) {
  return (
    (e = e.__v_raw), !t && E(h(e), 'iterate', F), Reflect.get(e, 'size', e)
  );
}
function xn(e) {
  e = h(e);
  const t = h(this);
  return xe(t).has.call(t, e) || (t.add(e), P(t, 'add', e, e)), this;
}
function yn(e, t) {
  t = h(t);
  const n = h(this),
    { has: r, get: i } = xe(n);
  let o = r.call(n, e);
  o ? On(n, r, e) : ((e = h(e)), (o = r.call(n, e)));
  const s = i.call(n, e);
  return (
    n.set(e, t), o ? ln(t, s) && P(n, 'set', e, t, s) : P(n, 'add', e, t), this
  );
}
function vn(e) {
  const t = h(this),
    { has: n, get: r } = xe(t);
  let i = n.call(t, e);
  i ? On(t, n, e) : ((e = h(e)), (i = n.call(t, e)));
  const o = r ? r.call(t, e) : void 0,
    s = t.delete(e);
  return i && P(t, 'delete', e, void 0, o), s;
}
function bn() {
  const e = h(this),
    t = e.size !== 0,
    n = Y(e) ? new Map(e) : new Set(e),
    r = e.clear();
  return t && P(e, 'clear', void 0, void 0, n), r;
}
function me(e, t) {
  return function (r, i) {
    const o = this,
      s = o.__v_raw,
      a = h(s),
      u = t ? at : e ? st : ot;
    return (
      !e && E(a, 'iterate', F), s.forEach((c, l) => r.call(i, u(c), u(l), o))
    );
  };
}
function oe(e, t, n) {
  return function (...r) {
    const i = this.__v_raw,
      o = h(i),
      s = Y(o),
      a = e === 'entries' || (e === Symbol.iterator && s),
      u = e === 'keys' && s,
      c = i[e](...r),
      l = n ? at : t ? st : ot;
    return (
      !t && E(o, 'iterate', u ? ze : F),
      {
        next() {
          const { value: p, done: d } = c.next();
          return d
            ? { value: p, done: d }
            : { value: a ? [l(p[0]), l(p[1])] : l(p), done: d };
        },
        [Symbol.iterator]() {
          return this;
        }
      }
    );
  };
}
function C(e) {
  return function (...t) {
    {
      const n = t[0] ? `on key "${t[0]}" ` : '';
      console.warn(
        `${Yr(e)} operation ${n}failed: target is readonly.`,
        h(this)
      );
    }
    return e === 'delete' ? !1 : this;
  };
}
var mn = {
    get(e) {
      return ye(this, e);
    },
    get size() {
      return be(this);
    },
    has: ve,
    add: xn,
    set: yn,
    delete: vn,
    clear: bn,
    forEach: me(!1, !1)
  },
  wn = {
    get(e) {
      return ye(this, e, !1, !0);
    },
    get size() {
      return be(this);
    },
    has: ve,
    add: xn,
    set: yn,
    delete: vn,
    clear: bn,
    forEach: me(!1, !0)
  },
  En = {
    get(e) {
      return ye(this, e, !0);
    },
    get size() {
      return be(this, !0);
    },
    has(e) {
      return ve.call(this, e, !0);
    },
    add: C('add'),
    set: C('set'),
    delete: C('delete'),
    clear: C('clear'),
    forEach: me(!0, !1)
  },
  Sn = {
    get(e) {
      return ye(this, e, !0, !0);
    },
    get size() {
      return be(this, !0);
    },
    has(e) {
      return ve.call(this, e, !0);
    },
    add: C('add'),
    set: C('set'),
    delete: C('delete'),
    clear: C('clear'),
    forEach: me(!0, !0)
  },
  _i = ['keys', 'values', 'entries', Symbol.iterator];
_i.forEach((e) => {
  (mn[e] = oe(e, !1, !1)),
    (En[e] = oe(e, !0, !1)),
    (wn[e] = oe(e, !1, !0)),
    (Sn[e] = oe(e, !0, !0));
});
function An(e, t) {
  const n = t ? (e ? Sn : wn) : e ? En : mn;
  return (r, i, o) =>
    i === '__v_isReactive'
      ? !e
      : i === '__v_isReadonly'
      ? e
      : i === '__v_raw'
      ? r
      : Reflect.get(_e(n, i) && i in r ? n : r, i, o);
}
var hi = { get: An(!1, !1) },
  gi = { get: An(!0, !1) };
function On(e, t, n) {
  const r = h(n);
  if (r !== n && t.call(e, r)) {
    const i = cn(e);
    console.warn(
      `Reactive ${i} contains both the raw and reactive versions of the same object${
        i === 'Map' ? ' as keys' : ''
      }, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
var Cn = new WeakMap(),
  xi = new WeakMap(),
  Mn = new WeakMap(),
  yi = new WeakMap();
function vi(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2;
    default:
      return 0;
  }
}
function bi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : vi(cn(e));
}
function ut(e) {
  return e && e.__v_isReadonly ? e : In(e, !1, hn, hi, Cn);
}
function Tn(e) {
  return In(e, !0, gn, gi, Mn);
}
function In(e, t, n, r, i) {
  if (!he(e))
    return console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive)) return e;
  const o = i.get(e);
  if (o) return o;
  const s = bi(e);
  if (s === 0) return e;
  const a = new Proxy(e, s === 2 ? r : n);
  return i.set(e, a), a;
}
function h(e) {
  return (e && h(e.__v_raw)) || e;
}
function ke(e) {
  return !!(e && e.__v_isRef === !0);
}
S('nextTick', () => et);
S('dispatch', (e) => G.bind(G, e));
S('watch', (e, { evaluateLater: t, effect: n }) => (r, i) => {
  let o = t(r),
    s = !0,
    a,
    u = n(() =>
      o((c) => {
        JSON.stringify(c),
          s
            ? (a = c)
            : queueMicrotask(() => {
                i(c, a), (a = c);
              }),
          (s = !1);
      })
    );
  e._x_effects.delete(u);
});
S('store', Br);
S('data', (e) => Ot(e));
S('root', (e) => fe(e));
S(
  'refs',
  (e) => (e._x_refs_proxy || (e._x_refs_proxy = te(mi(e))), e._x_refs_proxy)
);
function mi(e) {
  let t = [],
    n = e;
  for (; n; ) n._x_refs && t.push(n._x_refs), (n = n.parentNode);
  return t;
}
var Ae = {};
function Pn(e) {
  return Ae[e] || (Ae[e] = 0), ++Ae[e];
}
function wi(e, t) {
  return de(e, (n) => {
    if (n._x_ids && n._x_ids[t]) return !0;
  });
}
function Ei(e, t) {
  e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = Pn(t));
}
S('id', (e) => (t, n = null) => {
  let r = wi(e, t),
    i = r ? r._x_ids[t] : Pn(t);
  return n ? `${t}-${i}-${n}` : `${t}-${i}`;
});
S('el', (e) => e);
$n('Focus', 'focus', 'focus');
$n('Persist', 'persist', 'persist');
function $n(e, t, n) {
  S(t, (r) =>
    T(
      `You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,
      r
    )
  );
}
function Si({ get: e, set: t }, { get: n, set: r }) {
  let i = !0,
    o,
    s,
    a = k(() => {
      let u, c;
      i
        ? ((u = e()), r(u), (c = n()), (i = !1))
        : ((u = e()),
          (c = n()),
          (s = JSON.stringify(u)),
          JSON.stringify(c),
          s !== o ? ((c = n()), r(u), (c = u)) : (t(c), (u = c))),
        (o = JSON.stringify(u)),
        JSON.stringify(c);
    });
  return () => {
    Z(a);
  };
}
g(
  'modelable',
  (e, { expression: t }, { effect: n, evaluateLater: r, cleanup: i }) => {
    let o = r(t),
      s = () => {
        let l;
        return o((p) => (l = p)), l;
      },
      a = r(`${t} = __placeholder`),
      u = (l) => a(() => {}, { scope: { __placeholder: l } }),
      c = s();
    u(c),
      queueMicrotask(() => {
        if (!e._x_model) return;
        e._x_removeModelListeners.default();
        let l = e._x_model.get,
          p = e._x_model.set,
          d = Si(
            {
              get() {
                return l();
              },
              set(y) {
                p(y);
              }
            },
            {
              get() {
                return s();
              },
              set(y) {
                u(y);
              }
            }
          );
        i(d);
      });
  }
);
var Ai = document.createElement('div');
g('teleport', (e, { modifiers: t, expression: n }, { cleanup: r }) => {
  e.tagName.toLowerCase() !== 'template' &&
    T('x-teleport can only be used on a <template> tag', e);
  let i = ne(
    () => document.querySelector(n),
    () => Ai
  )();
  i || T(`Cannot find x-teleport element for selector: "${n}"`);
  let o = e.content.cloneNode(!0).firstElementChild;
  (e._x_teleport = o),
    (o._x_teleportBack = e),
    e._x_forwardEvents &&
      e._x_forwardEvents.forEach((s) => {
        o.addEventListener(s, (a) => {
          a.stopPropagation(), e.dispatchEvent(new a.constructor(a.type, a));
        });
      }),
    ee(o, {}, e),
    v(() => {
      t.includes('prepend')
        ? i.parentNode.insertBefore(o, i)
        : t.includes('append')
        ? i.parentNode.insertBefore(o, i.nextSibling)
        : i.appendChild(o),
        I(o),
        (o._x_ignore = !0);
    }),
    r(() => o.remove());
});
var Rn = () => {};
Rn.inline = (e, { modifiers: t }, { cleanup: n }) => {
  t.includes('self') ? (e._x_ignoreSelf = !0) : (e._x_ignore = !0),
    n(() => {
      t.includes('self') ? delete e._x_ignoreSelf : delete e._x_ignore;
    });
};
g('ignore', Rn);
g('effect', (e, { expression: t }, { effect: n }) => n(m(e, t)));
function He(e, t, n, r) {
  let i = e,
    o = (u) => r(u),
    s = {},
    a = (u, c) => (l) => c(u, l);
  if (
    (n.includes('dot') && (t = Oi(t)),
    n.includes('camel') && (t = Ci(t)),
    n.includes('passive') && (s.passive = !0),
    n.includes('capture') && (s.capture = !0),
    n.includes('window') && (i = window),
    n.includes('document') && (i = document),
    n.includes('debounce'))
  ) {
    let u = n[n.indexOf('debounce') + 1] || 'invalid-wait',
      c = le(u.split('ms')[0]) ? Number(u.split('ms')[0]) : 250;
    o = tn(o, c);
  }
  if (n.includes('throttle')) {
    let u = n[n.indexOf('throttle') + 1] || 'invalid-wait',
      c = le(u.split('ms')[0]) ? Number(u.split('ms')[0]) : 250;
    o = nn(o, c);
  }
  return (
    n.includes('prevent') &&
      (o = a(o, (u, c) => {
        c.preventDefault(), u(c);
      })),
    n.includes('stop') &&
      (o = a(o, (u, c) => {
        c.stopPropagation(), u(c);
      })),
    n.includes('self') &&
      (o = a(o, (u, c) => {
        c.target === e && u(c);
      })),
    (n.includes('away') || n.includes('outside')) &&
      ((i = document),
      (o = a(o, (u, c) => {
        e.contains(c.target) ||
          (c.target.isConnected !== !1 &&
            ((e.offsetWidth < 1 && e.offsetHeight < 1) ||
              (e._x_isShown !== !1 && u(c))));
      }))),
    n.includes('once') &&
      (o = a(o, (u, c) => {
        u(c), i.removeEventListener(t, o, s);
      })),
    (o = a(o, (u, c) => {
      (Ti(t) && Ii(c, n)) || u(c);
    })),
    i.addEventListener(t, o, s),
    () => {
      i.removeEventListener(t, o, s);
    }
  );
}
function Oi(e) {
  return e.replace(/-/g, '.');
}
function Ci(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function le(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Mi(e) {
  return [' ', '_'].includes(e)
    ? e
    : e
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[_\s]/, '-')
        .toLowerCase();
}
function Ti(e) {
  return ['keydown', 'keyup'].includes(e);
}
function Ii(e, t) {
  let n = t.filter(
    (o) =>
      !['window', 'document', 'prevent', 'stop', 'once', 'capture'].includes(o)
  );
  if (n.includes('debounce')) {
    let o = n.indexOf('debounce');
    n.splice(o, le((n[o + 1] || 'invalid-wait').split('ms')[0]) ? 2 : 1);
  }
  if (n.includes('throttle')) {
    let o = n.indexOf('throttle');
    n.splice(o, le((n[o + 1] || 'invalid-wait').split('ms')[0]) ? 2 : 1);
  }
  if (n.length === 0 || (n.length === 1 && ht(e.key).includes(n[0]))) return !1;
  const i = ['ctrl', 'shift', 'alt', 'meta', 'cmd', 'super'].filter((o) =>
    n.includes(o)
  );
  return (
    (n = n.filter((o) => !i.includes(o))),
    !(
      i.length > 0 &&
      i.filter(
        (s) => ((s === 'cmd' || s === 'super') && (s = 'meta'), e[`${s}Key`])
      ).length === i.length &&
      ht(e.key).includes(n[0])
    )
  );
}
function ht(e) {
  if (!e) return [];
  e = Mi(e);
  let t = {
    ctrl: 'control',
    slash: '/',
    space: ' ',
    spacebar: ' ',
    cmd: 'meta',
    esc: 'escape',
    up: 'arrow-up',
    down: 'arrow-down',
    left: 'arrow-left',
    right: 'arrow-right',
    period: '.',
    equal: '=',
    minus: '-',
    underscore: '_'
  };
  return (
    (t[e] = e),
    Object.keys(t)
      .map((n) => {
        if (t[n] === e) return n;
      })
      .filter((n) => n)
  );
}
g('model', (e, { modifiers: t, expression: n }, { effect: r, cleanup: i }) => {
  let o = e;
  t.includes('parent') && (o = e.parentNode);
  let s = m(o, n),
    a;
  typeof n == 'string'
    ? (a = m(o, `${n} = __placeholder`))
    : typeof n == 'function' && typeof n() == 'string'
    ? (a = m(o, `${n()} = __placeholder`))
    : (a = () => {});
  let u = () => {
      let d;
      return s((y) => (d = y)), gt(d) ? d.get() : d;
    },
    c = (d) => {
      let y;
      s((O) => (y = O)),
        gt(y) ? y.set(d) : a(() => {}, { scope: { __placeholder: d } });
    };
  typeof n == 'string' &&
    e.type === 'radio' &&
    v(() => {
      e.hasAttribute('name') || e.setAttribute('name', n);
    });
  var l =
    e.tagName.toLowerCase() === 'select' ||
    ['checkbox', 'radio'].includes(e.type) ||
    t.includes('lazy')
      ? 'change'
      : 'input';
  let p = Q
    ? () => {}
    : He(e, l, t, (d) => {
        c(Pi(e, t, d, u()));
      });
  if (
    (t.includes('fill') &&
      [null, ''].includes(u()) &&
      e.dispatchEvent(new Event(l, {})),
    e._x_removeModelListeners || (e._x_removeModelListeners = {}),
    (e._x_removeModelListeners.default = p),
    i(() => e._x_removeModelListeners.default()),
    e.form)
  ) {
    let d = He(e.form, 'reset', [], (y) => {
      et(() => e._x_model && e._x_model.set(e.value));
    });
    i(() => d());
  }
  (e._x_model = {
    get() {
      return u();
    },
    set(d) {
      c(d);
    }
  }),
    (e._x_forceModelUpdate = (d) => {
      (d = d === void 0 ? u() : d),
        d === void 0 && typeof n == 'string' && n.match(/\./) && (d = ''),
        (window.fromModel = !0),
        v(() => Xt(e, 'value', d)),
        delete window.fromModel;
    }),
    r(() => {
      let d = u();
      (t.includes('unintrusive') && document.activeElement.isSameNode(e)) ||
        e._x_forceModelUpdate(d);
    });
});
function Pi(e, t, n, r) {
  return v(() => {
    if (n instanceof CustomEvent && n.detail !== void 0)
      return n.detail ?? n.target.value;
    if (e.type === 'checkbox')
      if (Array.isArray(r)) {
        let i = t.includes('number') ? Oe(n.target.value) : n.target.value;
        return n.target.checked ? r.concat([i]) : r.filter((o) => !$i(o, i));
      } else return n.target.checked;
    else {
      if (e.tagName.toLowerCase() === 'select' && e.multiple)
        return t.includes('number')
          ? Array.from(n.target.selectedOptions).map((i) => {
              let o = i.value || i.text;
              return Oe(o);
            })
          : Array.from(n.target.selectedOptions).map((i) => i.value || i.text);
      {
        let i = n.target.value;
        return t.includes('number') ? Oe(i) : t.includes('trim') ? i.trim() : i;
      }
    }
  });
}
function Oe(e) {
  let t = e ? parseFloat(e) : null;
  return Ri(t) ? t : e;
}
function $i(e, t) {
  return e == t;
}
function Ri(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function gt(e) {
  return (
    e !== null &&
    typeof e == 'object' &&
    typeof e.get == 'function' &&
    typeof e.set == 'function'
  );
}
g('cloak', (e) => queueMicrotask(() => v(() => e.removeAttribute(H('cloak')))));
Ut(() => `[${H('init')}]`);
g(
  'init',
  ne((e, { expression: t }, { evaluate: n }) =>
    typeof t == 'string' ? !!t.trim() && n(t, {}, !1) : n(t, {}, !1)
  )
);
g('text', (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
    i((o) => {
      v(() => {
        e.textContent = o;
      });
    });
  });
});
g('html', (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
    i((o) => {
      v(() => {
        (e.innerHTML = o), (e._x_ignoreSelf = !0), I(e), delete e._x_ignoreSelf;
      });
    });
  });
});
Xe(Nt(':', Ft(H('bind:'))));
var jn = (
  e,
  { value: t, modifiers: n, expression: r, original: i },
  { effect: o }
) => {
  if (!t) {
    let a = {};
    Dr(a),
      m(e, r)(
        (c) => {
          on(e, c, i);
        },
        { scope: a }
      );
    return;
  }
  if (t === 'key') return ji(e, r);
  if (
    e._x_inlineBindings &&
    e._x_inlineBindings[t] &&
    e._x_inlineBindings[t].extract
  )
    return;
  let s = m(e, r);
  o(() =>
    s((a) => {
      a === void 0 && typeof r == 'string' && r.match(/\./) && (a = ''),
        v(() => Xt(e, t, a, n));
    })
  );
};
jn.inline = (e, { value: t, modifiers: n, expression: r }) => {
  t &&
    (e._x_inlineBindings || (e._x_inlineBindings = {}),
    (e._x_inlineBindings[t] = { expression: r, extract: !1 }));
};
g('bind', jn);
function ji(e, t) {
  e._x_keyExpression = t;
}
Wt(() => `[${H('data')}]`);
g(
  'data',
  ne((e, { expression: t }, { cleanup: n }) => {
    t = t === '' ? '{}' : t;
    let r = {};
    $e(r, e);
    let i = {};
    kr(i, r);
    let o = L(e, t, { scope: i });
    (o === void 0 || o === !0) && (o = {}), $e(o, e);
    let s = z(o);
    Ct(s);
    let a = ee(e, s);
    s.init && L(e, s.init),
      n(() => {
        s.destroy && L(e, s.destroy), a();
      });
  })
);
g('show', (e, { modifiers: t, expression: n }, { effect: r }) => {
  let i = m(e, n);
  e._x_doHide ||
    (e._x_doHide = () => {
      v(() => {
        e.style.setProperty(
          'display',
          'none',
          t.includes('important') ? 'important' : void 0
        );
      });
    }),
    e._x_doShow ||
      (e._x_doShow = () => {
        v(() => {
          e.style.length === 1 && e.style.display === 'none'
            ? e.removeAttribute('style')
            : e.style.removeProperty('display');
        });
      });
  let o = () => {
      e._x_doHide(), (e._x_isShown = !1);
    },
    s = () => {
      e._x_doShow(), (e._x_isShown = !0);
    },
    a = () => setTimeout(s),
    u = Be(
      (p) => (p ? s() : o()),
      (p) => {
        typeof e._x_toggleAndCascadeWithTransitions == 'function'
          ? e._x_toggleAndCascadeWithTransitions(e, p, s, o)
          : p
          ? a()
          : o();
      }
    ),
    c,
    l = !0;
  r(() =>
    i((p) => {
      (!l && p === c) ||
        (t.includes('immediate') && (p ? a() : o()), u(p), (c = p), (l = !1));
    })
  );
});
g('for', (e, { expression: t }, { effect: n, cleanup: r }) => {
  let i = Ni(t),
    o = m(e, i.items),
    s = m(e, e._x_keyExpression || 'index');
  (e._x_prevKeys = []),
    (e._x_lookup = {}),
    n(() => Li(e, i, o, s)),
    r(() => {
      Object.values(e._x_lookup).forEach((a) => a.remove()),
        delete e._x_prevKeys,
        delete e._x_lookup;
    });
});
function Li(e, t, n, r) {
  let i = (s) => typeof s == 'object' && !Array.isArray(s),
    o = e;
  n((s) => {
    Fi(s) && s >= 0 && (s = Array.from(Array(s).keys(), (f) => f + 1)),
      s === void 0 && (s = []);
    let a = e._x_lookup,
      u = e._x_prevKeys,
      c = [],
      l = [];
    if (i(s))
      s = Object.entries(s).map(([f, _]) => {
        let x = xt(t, _, f, s);
        r((b) => l.push(b), { scope: { index: f, ...x } }), c.push(x);
      });
    else
      for (let f = 0; f < s.length; f++) {
        let _ = xt(t, s[f], f, s);
        r((x) => l.push(x), { scope: { index: f, ..._ } }), c.push(_);
      }
    let p = [],
      d = [],
      y = [],
      O = [];
    for (let f = 0; f < u.length; f++) {
      let _ = u[f];
      l.indexOf(_) === -1 && y.push(_);
    }
    u = u.filter((f) => !y.includes(f));
    let ie = 'template';
    for (let f = 0; f < l.length; f++) {
      let _ = l[f],
        x = u.indexOf(_);
      if (x === -1) u.splice(f, 0, _), p.push([ie, f]);
      else if (x !== f) {
        let b = u.splice(f, 1)[0],
          w = u.splice(x - 1, 1)[0];
        u.splice(f, 0, w), u.splice(x, 0, b), d.push([b, w]);
      } else O.push(_);
      ie = _;
    }
    for (let f = 0; f < y.length; f++) {
      let _ = y[f];
      a[_]._x_effects && a[_]._x_effects.forEach(yt),
        a[_].remove(),
        (a[_] = null),
        delete a[_];
    }
    for (let f = 0; f < d.length; f++) {
      let [_, x] = d[f],
        b = a[_],
        w = a[x],
        B = document.createElement('div');
      v(() => {
        w || T('x-for ":key" is undefined or invalid', o),
          w.after(B),
          b.after(w),
          w._x_currentIfEl && w.after(w._x_currentIfEl),
          B.before(b),
          b._x_currentIfEl && b.after(b._x_currentIfEl),
          B.remove();
      }),
        w._x_refreshXForScope(c[l.indexOf(x)]);
    }
    for (let f = 0; f < p.length; f++) {
      let [_, x] = p[f],
        b = _ === 'template' ? o : a[_];
      b._x_currentIfEl && (b = b._x_currentIfEl);
      let w = c[x],
        B = l[x],
        q = document.importNode(o.content, !0).firstElementChild,
        ct = z(w);
      ee(q, ct, o),
        (q._x_refreshXForScope = (Nn) => {
          Object.entries(Nn).forEach(([Fn, Bn]) => {
            ct[Fn] = Bn;
          });
        }),
        v(() => {
          b.after(q), I(q);
        }),
        typeof B == 'object' &&
          T(
            'x-for key cannot be an object, it must be a string or an integer',
            o
          ),
        (a[B] = q);
    }
    for (let f = 0; f < O.length; f++)
      a[O[f]]._x_refreshXForScope(c[l.indexOf(O[f])]);
    o._x_prevKeys = l;
  });
}
function Ni(e) {
  let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
    n = /^\s*\(|\)\s*$/g,
    r = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
    i = e.match(r);
  if (!i) return;
  let o = {};
  o.items = i[2].trim();
  let s = i[1].replace(n, '').trim(),
    a = s.match(t);
  return (
    a
      ? ((o.item = s.replace(t, '').trim()),
        (o.index = a[1].trim()),
        a[2] && (o.collection = a[2].trim()))
      : (o.item = s),
    o
  );
}
function xt(e, t, n, r) {
  let i = {};
  return (
    /^\[.*\]$/.test(e.item) && Array.isArray(t)
      ? e.item
          .replace('[', '')
          .replace(']', '')
          .split(',')
          .map((s) => s.trim())
          .forEach((s, a) => {
            i[s] = t[a];
          })
      : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == 'object'
      ? e.item
          .replace('{', '')
          .replace('}', '')
          .split(',')
          .map((s) => s.trim())
          .forEach((s) => {
            i[s] = t[s];
          })
      : (i[e.item] = t),
    e.index && (i[e.index] = n),
    e.collection && (i[e.collection] = r),
    i
  );
}
function Fi(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Ln() {}
Ln.inline = (e, { expression: t }, { cleanup: n }) => {
  let r = fe(e);
  r._x_refs || (r._x_refs = {}),
    (r._x_refs[t] = e),
    n(() => delete r._x_refs[t]);
};
g('ref', Ln);
g('if', (e, { expression: t }, { effect: n, cleanup: r }) => {
  let i = m(e, t),
    o = () => {
      if (e._x_currentIfEl) return e._x_currentIfEl;
      let a = e.content.cloneNode(!0).firstElementChild;
      return (
        ee(a, {}, e),
        v(() => {
          e.after(a), I(a);
        }),
        (e._x_currentIfEl = a),
        (e._x_undoIf = () => {
          M(a, (u) => {
            u._x_effects && u._x_effects.forEach(yt);
          }),
            a.remove(),
            delete e._x_currentIfEl;
        }),
        a
      );
    },
    s = () => {
      e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
    };
  n(() =>
    i((a) => {
      a ? o() : s();
    })
  ),
    r(() => e._x_undoIf && e._x_undoIf());
});
g('id', (e, { expression: t }, { evaluate: n }) => {
  n(t).forEach((i) => Ei(e, i));
});
Xe(Nt('@', Ft(H('on:'))));
g(
  'on',
  ne((e, { value: t, modifiers: n, expression: r }, { cleanup: i }) => {
    let o = r ? m(e, r) : () => {};
    e.tagName.toLowerCase() === 'template' &&
      (e._x_forwardEvents || (e._x_forwardEvents = []),
      e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
    let s = He(e, t, n, (a) => {
      o(() => {}, { scope: { $event: a }, params: [a] });
    });
    i(() => s());
  })
);
we('Collapse', 'collapse', 'collapse');
we('Intersect', 'intersect', 'intersect');
we('Focus', 'trap', 'focus');
we('Mask', 'mask', 'mask');
function we(e, t, n) {
  g(t, (r) =>
    T(
      `You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,
      r
    )
  );
}
re.setEvaluator($t);
re.setReactivityEngine({ reactive: ut, effect: Qr, release: Zr, raw: h });
var Bi = re,
  Ki = Bi;
export { Ki as m };
