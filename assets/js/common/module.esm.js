var Ae = !1,
  Oe = !1,
  N = [],
  Ce = -1;
function Ln(e) {
  Fn(e);
}
function Fn(e) {
  N.includes(e) || N.push(e), Bn();
}
function St(e) {
  let t = N.indexOf(e);
  t !== -1 && t > Ce && N.splice(t, 1);
}
function Bn() {
  !Oe && !Ae && ((Ae = !0), queueMicrotask(Kn));
}
function Kn() {
  (Ae = !1), (Oe = !0);
  for (let e = 0; e < N.length; e++) N[e](), (Ce = e);
  (N.length = 0), (Ce = -1), (Oe = !1);
}
var z,
  H,
  Z,
  At,
  Me = !0;
function Dn(e) {
  (Me = !1), e(), (Me = !0);
}
function kn(e) {
  (z = e.reactive),
    (Z = e.release),
    (H = (t) =>
      e.effect(t, {
        scheduler: (n) => {
          Me ? Ln(n) : n();
        }
      })),
    (At = e.raw);
}
function ft(e) {
  H = e;
}
function zn(e) {
  let t = () => {};
  return [
    (r) => {
      let i = H(r);
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
function Y(e, t, n = {}) {
  e.dispatchEvent(
    new CustomEvent(t, { detail: n, bubbles: !0, composed: !0, cancelable: !0 })
  );
}
function T(e, t) {
  if (typeof ShadowRoot == 'function' && e instanceof ShadowRoot) {
    Array.from(e.children).forEach((i) => T(i, t));
    return;
  }
  let n = !1;
  if ((t(e, () => (n = !0)), n)) return;
  let r = e.firstElementChild;
  for (; r; ) T(r, t), (r = r.nextElementSibling);
}
function I(e, ...t) {
  console.warn(`Alpine Warning: ${e}`, ...t);
}
var dt = !1;
function Hn() {
  dt &&
    I(
      'Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.'
    ),
    (dt = !0),
    document.body ||
      I(
        "Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"
      ),
    Y(document, 'alpine:init'),
    Y(document, 'alpine:initializing'),
    Je(),
    Un((t) => O(t, T)),
    We((t) => qe(t)),
    Nt((t, n) => {
      Qe(t, n).forEach((r) => r());
    });
  let e = (t) => !pe(t.parentElement, !0);
  Array.from(document.querySelectorAll(Mt()))
    .filter(e)
    .forEach((t) => {
      O(t);
    }),
    Y(document, 'alpine:initialized');
}
var He = [],
  Ot = [];
function Ct() {
  return He.map((e) => e());
}
function Mt() {
  return He.concat(Ot).map((e) => e());
}
function Tt(e) {
  He.push(e);
}
function It(e) {
  Ot.push(e);
}
function pe(e, t = !1) {
  return _e(e, (n) => {
    if ((t ? Mt() : Ct()).some((i) => n.matches(i))) return !0;
  });
}
function _e(e, t) {
  if (e) {
    if (t(e)) return e;
    if ((e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement))
      return _e(e.parentElement, t);
  }
}
function qn(e) {
  return Ct().some((t) => e.matches(t));
}
var Pt = [];
function Wn(e) {
  Pt.push(e);
}
function O(e, t = T, n = () => {}) {
  or(() => {
    t(e, (r, i) => {
      n(r, i),
        Pt.forEach((o) => o(r, i)),
        Qe(r, r.attributes).forEach((o) => o()),
        r._x_ignore && i();
    });
  });
}
function qe(e) {
  T(e, (t) => {
    Ft(t), Vn(t);
  });
}
var $t = [],
  Rt = [],
  jt = [];
function Un(e) {
  jt.push(e);
}
function We(e, t) {
  typeof t == 'function'
    ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t))
    : ((t = e), Rt.push(t));
}
function Nt(e) {
  $t.push(e);
}
function Lt(e, t, n) {
  e._x_attributeCleanups || (e._x_attributeCleanups = {}),
    e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []),
    e._x_attributeCleanups[t].push(n);
}
function Ft(e, t) {
  e._x_attributeCleanups &&
    Object.entries(e._x_attributeCleanups).forEach(([n, r]) => {
      (t === void 0 || t.includes(n)) &&
        (r.forEach((i) => i()), delete e._x_attributeCleanups[n]);
    });
}
function Vn(e) {
  if (e._x_cleanups) for (; e._x_cleanups.length; ) e._x_cleanups.pop()();
}
var Ue = new MutationObserver(Ge),
  Ve = !1;
function Je() {
  Ue.observe(document, {
    subtree: !0,
    childList: !0,
    attributes: !0,
    attributeOldValue: !0
  }),
    (Ve = !0);
}
function Bt() {
  Jn(), Ue.disconnect(), (Ve = !1);
}
var G = [],
  me = !1;
function Jn() {
  (G = G.concat(Ue.takeRecords())),
    G.length &&
      !me &&
      ((me = !0),
      queueMicrotask(() => {
        Yn(), (me = !1);
      }));
}
function Yn() {
  Ge(G), (G.length = 0);
}
function v(e) {
  if (!Ve) return e();
  Bt();
  let t = e();
  return Je(), t;
}
var Ye = !1,
  le = [];
function Gn() {
  Ye = !0;
}
function Xn() {
  (Ye = !1), Ge(le), (le = []);
}
function Ge(e) {
  if (Ye) {
    le = le.concat(e);
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
    Ft(s, o);
  }),
    r.forEach((o, s) => {
      $t.forEach((a) => a(s, o));
    });
  for (let o of n) t.includes(o) || (Rt.forEach((s) => s(o)), qe(o));
  t.forEach((o) => {
    (o._x_ignoreSelf = !0), (o._x_ignore = !0);
  });
  for (let o of t)
    n.includes(o) ||
      (o.isConnected &&
        (delete o._x_ignoreSelf,
        delete o._x_ignore,
        jt.forEach((s) => s(o)),
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
function Kt(e) {
  return te(D(e));
}
function ee(e, t, n) {
  return (
    (e._x_dataStack = [t, ...D(n || e)]),
    () => {
      e._x_dataStack = e._x_dataStack.filter((r) => r !== t);
    }
  );
}
function D(e) {
  return e._x_dataStack
    ? e._x_dataStack
    : typeof ShadowRoot == 'function' && e instanceof ShadowRoot
    ? D(e.host)
    : e.parentNode
    ? D(e.parentNode)
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
function Dt(e) {
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
function kt(e, t = () => {}) {
  let n = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(r, i, o) {
      return e(
        this.initialValue,
        () => Qn(r, i),
        (s) => Te(r, i, s),
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
function Qn(e, t) {
  return t.split('.').reduce((n, r) => n[r], e);
}
function Te(e, t, n) {
  if ((typeof t == 'string' && (t = t.split('.')), t.length === 1)) e[t[0]] = n;
  else {
    if (t.length === 0) throw error;
    return e[t[0]] || (e[t[0]] = {}), Te(e[t[0]], t.slice(1), n);
  }
}
var zt = {};
function S(e, t) {
  zt[e] = t;
}
function Ie(e, t) {
  return (
    Object.entries(zt).forEach(([n, r]) => {
      let i = null;
      function o() {
        if (i) return i;
        {
          let [s, a] = Jt(t);
          return (i = { interceptor: kt, ...s }), We(t, a), i;
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
function Zn(e, t, n, ...r) {
  try {
    return n(...r);
  } catch (i) {
    Q(i, e, t);
  }
}
function Q(e, t, n = void 0) {
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
var ce = !0;
function Ht(e) {
  let t = ce;
  ce = !1;
  let n = e();
  return (ce = t), n;
}
function L(e, t, n = {}) {
  let r;
  return m(e, t)((i) => (r = i), n), r;
}
function m(...e) {
  return qt(...e);
}
var qt = Wt;
function er(e) {
  qt = e;
}
function Wt(e, t) {
  let n = {};
  Ie(n, e);
  let r = [n, ...D(e)],
    i = typeof t == 'function' ? tr(r, t) : rr(r, t, e);
  return Zn.bind(null, e, t, i);
}
function tr(e, t) {
  return (n = () => {}, { scope: r = {}, params: i = [] } = {}) => {
    let o = t.apply(te([r, ...e]), i);
    fe(n, o);
  };
}
var we = {};
function nr(e, t) {
  if (we[e]) return we[e];
  let n = Object.getPrototypeOf(async function () {}).constructor,
    r =
      /^[\n\s]*if.*\(.*\)/.test(e.trim()) || /^(let|const)\s/.test(e.trim())
        ? `(async()=>{ ${e} })()`
        : e,
    o = (() => {
      try {
        return new n(
          ['__self', 'scope'],
          `with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`
        );
      } catch (s) {
        return Q(s, t, e), Promise.resolve();
      }
    })();
  return (we[e] = o), o;
}
function rr(e, t, n) {
  let r = nr(t, n);
  return (i = () => {}, { scope: o = {}, params: s = [] } = {}) => {
    (r.result = void 0), (r.finished = !1);
    let a = te([o, ...e]);
    if (typeof r == 'function') {
      let u = r(r, a).catch((c) => Q(c, n, t));
      r.finished
        ? (fe(i, r.result, a, s, n), (r.result = void 0))
        : u
            .then((c) => {
              fe(i, c, a, s, n);
            })
            .catch((c) => Q(c, n, t))
            .finally(() => (r.result = void 0));
    }
  };
}
function fe(e, t, n, r, i) {
  if (ce && typeof t == 'function') {
    let o = t.apply(n, r);
    o instanceof Promise
      ? o.then((s) => fe(e, s, n, r)).catch((s) => Q(s, i, t))
      : e(o);
  } else
    typeof t == 'object' && t instanceof Promise ? t.then((o) => e(o)) : e(t);
}
var Xe = 'x-';
function q(e = '') {
  return Xe + e;
}
function ir(e) {
  Xe = e;
}
var Pe = {};
function g(e, t) {
  return (
    (Pe[e] = t),
    {
      before(n) {
        if (!Pe[n]) {
          console.warn(
            'Cannot find directive `${directive}`. `${name}` will use the default order of execution'
          );
          return;
        }
        const r = j.indexOf(n);
        j.splice(r >= 0 ? r : j.indexOf('DEFAULT'), 0, e);
      }
    }
  );
}
function Qe(e, t, n) {
  if (((t = Array.from(t)), e._x_virtualDirectives)) {
    let o = Object.entries(e._x_virtualDirectives).map(([a, u]) => ({
        name: a,
        value: u
      })),
      s = Ut(o);
    (o = o.map((a) =>
      s.find((u) => u.name === a.name)
        ? { name: `x-bind:${a.name}`, value: `"${a.value}"` }
        : a
    )),
      (t = t.concat(o));
  }
  let r = {};
  return t
    .map(Xt((o, s) => (r[o] = s)))
    .filter(Zt)
    .map(ar(r, n))
    .sort(ur)
    .map((o) => sr(e, o));
}
function Ut(e) {
  return Array.from(e)
    .map(Xt())
    .filter((t) => !Zt(t));
}
var $e = !1,
  J = new Map(),
  Vt = Symbol();
function or(e) {
  $e = !0;
  let t = Symbol();
  (Vt = t), J.set(t, []);
  let n = () => {
      for (; J.get(t).length; ) J.get(t).shift()();
      J.delete(t);
    },
    r = () => {
      ($e = !1), n();
    };
  e(n), r();
}
function Jt(e) {
  let t = [],
    n = (a) => t.push(a),
    [r, i] = zn(e);
  return (
    t.push(i),
    [
      {
        Alpine: ne,
        effect: r,
        cleanup: n,
        evaluateLater: m.bind(m, e),
        evaluate: L.bind(L, e)
      },
      () => t.forEach((a) => a())
    ]
  );
}
function sr(e, t) {
  let n = () => {},
    r = Pe[t.type] || n,
    [i, o] = Jt(e);
  Lt(e, t.original, o);
  let s = () => {
    e._x_ignore ||
      e._x_ignoreSelf ||
      (r.inline && r.inline(e, t, i),
      (r = r.bind(r, e, t, i)),
      $e ? J.get(Vt).push(r) : r());
  };
  return (s.runCleanups = o), s;
}
var Yt =
    (e, t) =>
    ({ name: n, value: r }) => (
      n.startsWith(e) && (n = n.replace(e, t)), { name: n, value: r }
    ),
  Gt = (e) => e;
function Xt(e = () => {}) {
  return ({ name: t, value: n }) => {
    let { name: r, value: i } = Qt.reduce((o, s) => s(o), {
      name: t,
      value: n
    });
    return r !== t && e(r, t), { name: r, value: i };
  };
}
var Qt = [];
function Ze(e) {
  Qt.push(e);
}
function Zt({ name: e }) {
  return en().test(e);
}
var en = () => new RegExp(`^${Xe}([^:^.]+)\\b`);
function ar(e, t) {
  return ({ name: n, value: r }) => {
    let i = n.match(en()),
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
var Re = 'DEFAULT',
  j = [
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
    Re,
    'teleport'
  ];
function ur(e, t) {
  let n = j.indexOf(e.type) === -1 ? Re : e.type,
    r = j.indexOf(t.type) === -1 ? Re : t.type;
  return j.indexOf(n) - j.indexOf(r);
}
var je = [],
  et = !1;
function tt(e = () => {}) {
  return (
    queueMicrotask(() => {
      et ||
        setTimeout(() => {
          Ne();
        });
    }),
    new Promise((t) => {
      je.push(() => {
        e(), t();
      });
    })
  );
}
function Ne() {
  for (et = !1; je.length; ) je.shift()();
}
function cr() {
  et = !0;
}
function nt(e, t) {
  return Array.isArray(t)
    ? pt(e, t.join(' '))
    : typeof t == 'object' && t !== null
    ? lr(e, t)
    : typeof t == 'function'
    ? nt(e, t())
    : pt(e, t);
}
function pt(e, t) {
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
function lr(e, t) {
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
function he(e, t) {
  return typeof t == 'object' && t !== null ? fr(e, t) : dr(e, t);
}
function fr(e, t) {
  let n = {};
  return (
    Object.entries(t).forEach(([r, i]) => {
      (n[r] = e.style[r]),
        r.startsWith('--') || (r = pr(r)),
        e.style.setProperty(r, i);
    }),
    setTimeout(() => {
      e.style.length === 0 && e.removeAttribute('style');
    }),
    () => {
      he(e, n);
    }
  );
}
function dr(e, t) {
  let n = e.getAttribute('style', t);
  return (
    e.setAttribute('style', t),
    () => {
      e.setAttribute('style', n || '');
    }
  );
}
function pr(e) {
  return e.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function Le(e, t = () => {}) {
  let n = !1;
  return function () {
    n ? t.apply(this, arguments) : ((n = !0), e.apply(this, arguments));
  };
}
g(
  'transition',
  (e, { value: t, modifiers: n, expression: r }, { evaluate: i }) => {
    typeof r == 'function' && (r = i(r)),
      r !== !1 && (!r || typeof r == 'boolean' ? hr(e, n, t) : _r(e, r, t));
  }
);
function _r(e, t, n) {
  tn(e, nt, ''),
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
function hr(e, t, n) {
  tn(e, he);
  let r = !t.includes('in') && !t.includes('out') && !n,
    i = r || t.includes('in') || ['enter'].includes(n),
    o = r || t.includes('out') || ['leave'].includes(n);
  t.includes('in') && !r && (t = t.filter((_, x) => x < t.indexOf('out'))),
    t.includes('out') && !r && (t = t.filter((_, x) => x > t.indexOf('out')));
  let s = !t.includes('opacity') && !t.includes('scale'),
    a = s || t.includes('opacity'),
    u = s || t.includes('scale'),
    c = a ? 0 : 1,
    l = u ? U(t, 'scale', 95) / 100 : 1,
    d = U(t, 'delay', 0) / 1e3,
    p = U(t, 'origin', 'center'),
    y = 'opacity, transform',
    C = U(t, 'duration', 150) / 1e3,
    re = U(t, 'duration', 75) / 1e3,
    f = 'cubic-bezier(0.4, 0.0, 0.2, 1)';
  i &&
    ((e._x_transition.enter.during = {
      transformOrigin: p,
      transitionDelay: `${d}s`,
      transitionProperty: y,
      transitionDuration: `${C}s`,
      transitionTimingFunction: f
    }),
    (e._x_transition.enter.start = { opacity: c, transform: `scale(${l})` }),
    (e._x_transition.enter.end = { opacity: 1, transform: 'scale(1)' })),
    o &&
      ((e._x_transition.leave.during = {
        transformOrigin: p,
        transitionDelay: `${d}s`,
        transitionProperty: y,
        transitionDuration: `${re}s`,
        transitionTimingFunction: f
      }),
      (e._x_transition.leave.start = { opacity: 1, transform: 'scale(1)' }),
      (e._x_transition.leave.end = { opacity: c, transform: `scale(${l})` }));
}
function tn(e, t, n = {}) {
  e._x_transition ||
    (e._x_transition = {
      enter: { during: n, start: n, end: n },
      leave: { during: n, start: n, end: n },
      in(r = () => {}, i = () => {}) {
        Fe(
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
        Fe(
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
      let s = nn(e);
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
function nn(e) {
  let t = e.parentNode;
  if (t) return t._x_hidePromise ? t : nn(t);
}
function Fe(
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
  gr(e, {
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
function gr(e, t) {
  let n,
    r,
    i,
    o = Le(() => {
      v(() => {
        (n = !0),
          r || t.before(),
          i || (t.end(), Ne()),
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
    cancel: Le(function () {
      for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
      o();
    }),
    finish: o
  }),
    v(() => {
      t.start(), t.during();
    }),
    cr(),
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
            Ne(),
            setTimeout(e._x_transitioning.finish, s + a),
            (i = !0));
        });
    });
}
function U(e, t, n) {
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
var P = !1;
function ge(e, t = () => {}) {
  return (...n) => (P ? t(...n) : e(...n));
}
function xr(e) {
  return (...t) => P && e(...t);
}
function yr(e, t) {
  e._x_dataStack &&
    ((t._x_dataStack = e._x_dataStack),
    t.setAttribute('data-has-alpine-state', !0)),
    (P = !0),
    rn(() => {
      O(t, (n, r) => {
        r(n, () => {});
      });
    }),
    (P = !1);
}
var Be = !1;
function vr(e, t) {
  t._x_dataStack || (t._x_dataStack = e._x_dataStack),
    (P = !0),
    (Be = !0),
    rn(() => {
      br(t);
    }),
    (P = !1),
    (Be = !1);
}
function br(e) {
  let t = !1;
  O(e, (r, i) => {
    T(r, (o, s) => {
      if (t && qn(o)) return s();
      (t = !0), i(o, s);
    });
  });
}
function rn(e) {
  let t = H;
  ft((n, r) => {
    let i = t(n);
    return Z(i), () => {};
  }),
    e(),
    ft(t);
}
function mr(e) {
  return P ? (Be ? !0 : e.hasAttribute('data-has-alpine-state')) : !1;
}
function on(e, t, n, r = []) {
  switch (
    (e._x_bindings || (e._x_bindings = z({})),
    (e._x_bindings[t] = n),
    (t = r.includes('camel') ? Tr(t) : t),
    t)
  ) {
    case 'value':
      wr(e, n);
      break;
    case 'style':
      Sr(e, n);
      break;
    case 'class':
      Er(e, n);
      break;
    case 'selected':
    case 'checked':
      Ar(e, t, n);
      break;
    default:
      sn(e, t, n);
      break;
  }
}
function wr(e, t) {
  if (e.type === 'radio')
    e.attributes.value === void 0 && (e.value = t),
      window.fromModel && (e.checked = _t(e.value, t));
  else if (e.type === 'checkbox')
    Number.isInteger(t)
      ? (e.value = t)
      : !Array.isArray(t) &&
        typeof t != 'boolean' &&
        ![null, void 0].includes(t)
      ? (e.value = String(t))
      : Array.isArray(t)
      ? (e.checked = t.some((n) => _t(n, e.value)))
      : (e.checked = !!t);
  else if (e.tagName === 'SELECT') Mr(e, t);
  else {
    if (e.value === t) return;
    e.value = t === void 0 ? '' : t;
  }
}
function Er(e, t) {
  e._x_undoAddedClasses && e._x_undoAddedClasses(),
    (e._x_undoAddedClasses = nt(e, t));
}
function Sr(e, t) {
  e._x_undoAddedStyles && e._x_undoAddedStyles(),
    (e._x_undoAddedStyles = he(e, t));
}
function Ar(e, t, n) {
  sn(e, t, n), Cr(e, t, n);
}
function sn(e, t, n) {
  [null, void 0, !1].includes(n) && Ir(t)
    ? e.removeAttribute(t)
    : (an(t) && (n = t), Or(e, t, n));
}
function Or(e, t, n) {
  e.getAttribute(t) != n && e.setAttribute(t, n);
}
function Cr(e, t, n) {
  e[t] !== n && (e[t] = n);
}
function Mr(e, t) {
  const n = [].concat(t).map((r) => r + '');
  Array.from(e.options).forEach((r) => {
    r.selected = n.includes(r.value);
  });
}
function Tr(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function _t(e, t) {
  return e == t;
}
function an(e) {
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
function Ir(e) {
  return ![
    'aria-pressed',
    'aria-checked',
    'aria-expanded',
    'aria-selected'
  ].includes(e);
}
function Pr(e, t, n) {
  return e._x_bindings && e._x_bindings[t] !== void 0
    ? e._x_bindings[t]
    : un(e, t, n);
}
function $r(e, t, n, r = !0) {
  if (e._x_bindings && e._x_bindings[t] !== void 0) return e._x_bindings[t];
  if (e._x_inlineBindings && e._x_inlineBindings[t] !== void 0) {
    let i = e._x_inlineBindings[t];
    return (i.extract = r), Ht(() => L(e, i.expression));
  }
  return un(e, t, n);
}
function un(e, t, n) {
  let r = e.getAttribute(t);
  return r === null
    ? typeof n == 'function'
      ? n()
      : n
    : r === ''
    ? !0
    : an(t)
    ? !![t, 'true'].includes(r)
    : r;
}
function cn(e, t) {
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
function ln(e, t) {
  let n;
  return function () {
    let r = this,
      i = arguments;
    n || (e.apply(r, i), (n = !0), setTimeout(() => (n = !1), t));
  };
}
function fn({ get: e, set: t }, { get: n, set: r }) {
  let i = !0,
    o,
    s,
    a,
    u = H(() => {
      let c, l;
      i
        ? ((c = e()), r(JSON.parse(JSON.stringify(c))), (l = n()), (i = !1))
        : ((c = e()),
          (l = n()),
          (s = JSON.stringify(c)),
          (a = JSON.stringify(l)),
          s !== o
            ? ((l = n()), r(c), (l = c))
            : (t(JSON.parse(a ?? null)), (c = l))),
        (o = JSON.stringify(c)),
        JSON.stringify(l);
    });
  return () => {
    Z(u);
  };
}
function Rr(e) {
  (Array.isArray(e) ? e : [e]).forEach((n) => n(ne));
}
var R = {},
  ht = !1;
function jr(e, t) {
  if ((ht || ((R = z(R)), (ht = !0)), t === void 0)) return R[e];
  (R[e] = t),
    typeof t == 'object' &&
      t !== null &&
      t.hasOwnProperty('init') &&
      typeof t.init == 'function' &&
      R[e].init(),
    Dt(R[e]);
}
function Nr() {
  return R;
}
var dn = {};
function Lr(e, t) {
  let n = typeof t != 'function' ? () => t : t;
  return e instanceof Element ? pn(e, n()) : ((dn[e] = n), () => {});
}
function Fr(e) {
  return (
    Object.entries(dn).forEach(([t, n]) => {
      Object.defineProperty(e, t, {
        get() {
          return (...r) => n(...r);
        }
      });
    }),
    e
  );
}
function pn(e, t, n) {
  let r = [];
  for (; r.length; ) r.pop()();
  let i = Object.entries(t).map(([s, a]) => ({ name: s, value: a })),
    o = Ut(i);
  return (
    (i = i.map((s) =>
      o.find((a) => a.name === s.name)
        ? { name: `x-bind:${s.name}`, value: `"${s.value}"` }
        : s
    )),
    Qe(e, i, n).map((s) => {
      r.push(s.runCleanups), s();
    }),
    () => {
      for (; r.length; ) r.pop()();
    }
  );
}
var _n = {};
function Br(e, t) {
  _n[e] = t;
}
function Kr(e, t) {
  return (
    Object.entries(_n).forEach(([n, r]) => {
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
var Dr = {
    get reactive() {
      return z;
    },
    get release() {
      return Z;
    },
    get effect() {
      return H;
    },
    get raw() {
      return At;
    },
    version: '3.13.0',
    flushAndStopDeferringMutations: Xn,
    dontAutoEvaluateFunctions: Ht,
    disableEffectScheduling: Dn,
    startObservingMutations: Je,
    stopObservingMutations: Bt,
    setReactivityEngine: kn,
    onAttributeRemoved: Lt,
    onAttributesAdded: Nt,
    closestDataStack: D,
    skipDuringClone: ge,
    onlyDuringClone: xr,
    addRootSelector: Tt,
    addInitSelector: It,
    addScopeToNode: ee,
    deferMutations: Gn,
    mapAttributes: Ze,
    evaluateLater: m,
    interceptInit: Wn,
    setEvaluator: er,
    mergeProxies: te,
    extractProp: $r,
    findClosest: _e,
    onElRemoved: We,
    closestRoot: pe,
    destroyTree: qe,
    interceptor: kt,
    transition: Fe,
    setStyles: he,
    mutateDom: v,
    directive: g,
    entangle: fn,
    throttle: ln,
    debounce: cn,
    evaluate: L,
    initTree: O,
    nextTick: tt,
    prefixed: q,
    prefix: ir,
    plugin: Rr,
    magic: S,
    store: jr,
    start: Hn,
    clone: vr,
    cloneNode: yr,
    bound: Pr,
    $data: Kt,
    walk: T,
    data: Br,
    bind: Lr
  },
  ne = Dr;
function kr(e, t) {
  const n = Object.create(null),
    r = e.split(',');
  for (let i = 0; i < r.length; i++) n[r[i]] = !0;
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
var zr = Object.freeze({}),
  Hr = Object.prototype.hasOwnProperty,
  xe = (e, t) => Hr.call(e, t),
  F = Array.isArray,
  X = (e) => hn(e) === '[object Map]',
  qr = (e) => typeof e == 'string',
  rt = (e) => typeof e == 'symbol',
  ye = (e) => e !== null && typeof e == 'object',
  Wr = Object.prototype.toString,
  hn = (e) => Wr.call(e),
  gn = (e) => hn(e).slice(8, -1),
  it = (e) =>
    qr(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  Ur = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Vr = Ur((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  xn = (e, t) => e !== t && (e === e || t === t),
  Ke = new WeakMap(),
  V = [],
  A,
  B = Symbol('iterate'),
  De = Symbol('Map key iterate');
function Jr(e) {
  return e && e._isEffect === !0;
}
function Yr(e, t = zr) {
  Jr(e) && (e = e.raw);
  const n = Qr(e, t);
  return t.lazy || n(), n;
}
function Gr(e) {
  e.active && (yn(e), e.options.onStop && e.options.onStop(), (e.active = !1));
}
var Xr = 0;
function Qr(e, t) {
  const n = function () {
    if (!n.active) return e();
    if (!V.includes(n)) {
      yn(n);
      try {
        return ei(), V.push(n), (A = n), e();
      } finally {
        V.pop(), vn(), (A = V[V.length - 1]);
      }
    }
  };
  return (
    (n.id = Xr++),
    (n.allowRecurse = !!t.allowRecurse),
    (n._isEffect = !0),
    (n.active = !0),
    (n.raw = e),
    (n.deps = []),
    (n.options = t),
    n
  );
}
function yn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
var k = !0,
  ot = [];
function Zr() {
  ot.push(k), (k = !1);
}
function ei() {
  ot.push(k), (k = !0);
}
function vn() {
  const e = ot.pop();
  k = e === void 0 ? !0 : e;
}
function E(e, t, n) {
  if (!k || A === void 0) return;
  let r = Ke.get(e);
  r || Ke.set(e, (r = new Map()));
  let i = r.get(n);
  i || r.set(n, (i = new Set())),
    i.has(A) ||
      (i.add(A),
      A.deps.push(i),
      A.options.onTrack &&
        A.options.onTrack({ effect: A, target: e, type: t, key: n }));
}
function $(e, t, n, r, i, o) {
  const s = Ke.get(e);
  if (!s) return;
  const a = new Set(),
    u = (l) => {
      l &&
        l.forEach((d) => {
          (d !== A || d.allowRecurse) && a.add(d);
        });
    };
  if (t === 'clear') s.forEach(u);
  else if (n === 'length' && F(e))
    s.forEach((l, d) => {
      (d === 'length' || d >= r) && u(l);
    });
  else
    switch ((n !== void 0 && u(s.get(n)), t)) {
      case 'add':
        F(e)
          ? it(n) && u(s.get('length'))
          : (u(s.get(B)), X(e) && u(s.get(De)));
        break;
      case 'delete':
        F(e) || (u(s.get(B)), X(e) && u(s.get(De)));
        break;
      case 'set':
        X(e) && u(s.get(B));
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
var ti = kr('__proto__,__v_isRef,__isVue'),
  bn = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((e) => Symbol[e])
      .filter(rt)
  ),
  ni = mn(),
  ri = mn(!0),
  gt = ii();
function ii() {
  const e = {};
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      e[t] = function (...n) {
        const r = h(this);
        for (let o = 0, s = this.length; o < s; o++) E(r, 'get', o + '');
        const i = r[t](...n);
        return i === -1 || i === !1 ? r[t](...n.map(h)) : i;
      };
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      e[t] = function (...n) {
        Zr();
        const r = h(this)[t].apply(this, n);
        return vn(), r;
      };
    }),
    e
  );
}
function mn(e = !1, t = !1) {
  return function (r, i, o) {
    if (i === '__v_isReactive') return !e;
    if (i === '__v_isReadonly') return e;
    if (i === '__v_raw' && o === (e ? (t ? bi : An) : t ? vi : Sn).get(r))
      return r;
    const s = F(r);
    if (!e && s && xe(gt, i)) return Reflect.get(gt, i, o);
    const a = Reflect.get(r, i, o);
    return (rt(i) ? bn.has(i) : ti(i)) || (e || E(r, 'get', i), t)
      ? a
      : ke(a)
      ? !s || !it(i)
        ? a.value
        : a
      : ye(a)
      ? e
        ? On(a)
        : ct(a)
      : a;
  };
}
var oi = si();
function si(e = !1) {
  return function (n, r, i, o) {
    let s = n[r];
    if (!e && ((i = h(i)), (s = h(s)), !F(n) && ke(s) && !ke(i)))
      return (s.value = i), !0;
    const a = F(n) && it(r) ? Number(r) < n.length : xe(n, r),
      u = Reflect.set(n, r, i, o);
    return (
      n === h(o) && (a ? xn(i, s) && $(n, 'set', r, i, s) : $(n, 'add', r, i)),
      u
    );
  };
}
function ai(e, t) {
  const n = xe(e, t),
    r = e[t],
    i = Reflect.deleteProperty(e, t);
  return i && n && $(e, 'delete', t, void 0, r), i;
}
function ui(e, t) {
  const n = Reflect.has(e, t);
  return (!rt(t) || !bn.has(t)) && E(e, 'has', t), n;
}
function ci(e) {
  return E(e, 'iterate', F(e) ? 'length' : B), Reflect.ownKeys(e);
}
var li = { get: ni, set: oi, deleteProperty: ai, has: ui, ownKeys: ci },
  fi = {
    get: ri,
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
  },
  st = (e) => (ye(e) ? ct(e) : e),
  at = (e) => (ye(e) ? On(e) : e),
  ut = (e) => e,
  ve = (e) => Reflect.getPrototypeOf(e);
function ie(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const i = h(e),
    o = h(t);
  t !== o && !n && E(i, 'get', t), !n && E(i, 'get', o);
  const { has: s } = ve(i),
    a = r ? ut : n ? at : st;
  if (s.call(i, t)) return a(e.get(t));
  if (s.call(i, o)) return a(e.get(o));
  e !== i && e.get(t);
}
function oe(e, t = !1) {
  const n = this.__v_raw,
    r = h(n),
    i = h(e);
  return (
    e !== i && !t && E(r, 'has', e),
    !t && E(r, 'has', i),
    e === i ? n.has(e) : n.has(e) || n.has(i)
  );
}
function se(e, t = !1) {
  return (
    (e = e.__v_raw), !t && E(h(e), 'iterate', B), Reflect.get(e, 'size', e)
  );
}
function xt(e) {
  e = h(e);
  const t = h(this);
  return ve(t).has.call(t, e) || (t.add(e), $(t, 'add', e, e)), this;
}
function yt(e, t) {
  t = h(t);
  const n = h(this),
    { has: r, get: i } = ve(n);
  let o = r.call(n, e);
  o ? En(n, r, e) : ((e = h(e)), (o = r.call(n, e)));
  const s = i.call(n, e);
  return (
    n.set(e, t), o ? xn(t, s) && $(n, 'set', e, t, s) : $(n, 'add', e, t), this
  );
}
function vt(e) {
  const t = h(this),
    { has: n, get: r } = ve(t);
  let i = n.call(t, e);
  i ? En(t, n, e) : ((e = h(e)), (i = n.call(t, e)));
  const o = r ? r.call(t, e) : void 0,
    s = t.delete(e);
  return i && $(t, 'delete', e, void 0, o), s;
}
function bt() {
  const e = h(this),
    t = e.size !== 0,
    n = X(e) ? new Map(e) : new Set(e),
    r = e.clear();
  return t && $(e, 'clear', void 0, void 0, n), r;
}
function ae(e, t) {
  return function (r, i) {
    const o = this,
      s = o.__v_raw,
      a = h(s),
      u = t ? ut : e ? at : st;
    return (
      !e && E(a, 'iterate', B), s.forEach((c, l) => r.call(i, u(c), u(l), o))
    );
  };
}
function ue(e, t, n) {
  return function (...r) {
    const i = this.__v_raw,
      o = h(i),
      s = X(o),
      a = e === 'entries' || (e === Symbol.iterator && s),
      u = e === 'keys' && s,
      c = i[e](...r),
      l = n ? ut : t ? at : st;
    return (
      !t && E(o, 'iterate', u ? De : B),
      {
        next() {
          const { value: d, done: p } = c.next();
          return p
            ? { value: d, done: p }
            : { value: a ? [l(d[0]), l(d[1])] : l(d), done: p };
        },
        [Symbol.iterator]() {
          return this;
        }
      }
    );
  };
}
function M(e) {
  return function (...t) {
    {
      const n = t[0] ? `on key "${t[0]}" ` : '';
      console.warn(
        `${Vr(e)} operation ${n}failed: target is readonly.`,
        h(this)
      );
    }
    return e === 'delete' ? !1 : this;
  };
}
function di() {
  const e = {
      get(o) {
        return ie(this, o);
      },
      get size() {
        return se(this);
      },
      has: oe,
      add: xt,
      set: yt,
      delete: vt,
      clear: bt,
      forEach: ae(!1, !1)
    },
    t = {
      get(o) {
        return ie(this, o, !1, !0);
      },
      get size() {
        return se(this);
      },
      has: oe,
      add: xt,
      set: yt,
      delete: vt,
      clear: bt,
      forEach: ae(!1, !0)
    },
    n = {
      get(o) {
        return ie(this, o, !0);
      },
      get size() {
        return se(this, !0);
      },
      has(o) {
        return oe.call(this, o, !0);
      },
      add: M('add'),
      set: M('set'),
      delete: M('delete'),
      clear: M('clear'),
      forEach: ae(!0, !1)
    },
    r = {
      get(o) {
        return ie(this, o, !0, !0);
      },
      get size() {
        return se(this, !0);
      },
      has(o) {
        return oe.call(this, o, !0);
      },
      add: M('add'),
      set: M('set'),
      delete: M('delete'),
      clear: M('clear'),
      forEach: ae(!0, !0)
    };
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((o) => {
      (e[o] = ue(o, !1, !1)),
        (n[o] = ue(o, !0, !1)),
        (t[o] = ue(o, !1, !0)),
        (r[o] = ue(o, !0, !0));
    }),
    [e, n, t, r]
  );
}
var [pi, _i, hi, gi] = di();
function wn(e, t) {
  const n = t ? (e ? gi : hi) : e ? _i : pi;
  return (r, i, o) =>
    i === '__v_isReactive'
      ? !e
      : i === '__v_isReadonly'
      ? e
      : i === '__v_raw'
      ? r
      : Reflect.get(xe(n, i) && i in r ? n : r, i, o);
}
var xi = { get: wn(!1, !1) },
  yi = { get: wn(!0, !1) };
function En(e, t, n) {
  const r = h(n);
  if (r !== n && t.call(e, r)) {
    const i = gn(e);
    console.warn(
      `Reactive ${i} contains both the raw and reactive versions of the same object${
        i === 'Map' ? ' as keys' : ''
      }, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
var Sn = new WeakMap(),
  vi = new WeakMap(),
  An = new WeakMap(),
  bi = new WeakMap();
function mi(e) {
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
function wi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : mi(gn(e));
}
function ct(e) {
  return e && e.__v_isReadonly ? e : Cn(e, !1, li, xi, Sn);
}
function On(e) {
  return Cn(e, !0, fi, yi, An);
}
function Cn(e, t, n, r, i) {
  if (!ye(e))
    return console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive)) return e;
  const o = i.get(e);
  if (o) return o;
  const s = wi(e);
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
S('nextTick', () => tt);
S('dispatch', (e) => Y.bind(Y, e));
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
S('store', Nr);
S('data', (e) => Kt(e));
S('root', (e) => pe(e));
S(
  'refs',
  (e) => (e._x_refs_proxy || (e._x_refs_proxy = te(Ei(e))), e._x_refs_proxy)
);
function Ei(e) {
  let t = [],
    n = e;
  for (; n; ) n._x_refs && t.push(n._x_refs), (n = n.parentNode);
  return t;
}
var Ee = {};
function Mn(e) {
  return Ee[e] || (Ee[e] = 0), ++Ee[e];
}
function Si(e, t) {
  return _e(e, (n) => {
    if (n._x_ids && n._x_ids[t]) return !0;
  });
}
function Ai(e, t) {
  e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = Mn(t));
}
S('id', (e) => (t, n = null) => {
  let r = Si(e, t),
    i = r ? r._x_ids[t] : Mn(t);
  return n ? `${t}-${i}-${n}` : `${t}-${i}`;
});
S('el', (e) => e);
Tn('Focus', 'focus', 'focus');
Tn('Persist', 'persist', 'persist');
function Tn(e, t, n) {
  S(t, (r) =>
    I(
      `You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,
      r
    )
  );
}
g(
  'modelable',
  (e, { expression: t }, { effect: n, evaluateLater: r, cleanup: i }) => {
    let o = r(t),
      s = () => {
        let l;
        return o((d) => (l = d)), l;
      },
      a = r(`${t} = __placeholder`),
      u = (l) => a(() => {}, { scope: { __placeholder: l } }),
      c = s();
    u(c),
      queueMicrotask(() => {
        if (!e._x_model) return;
        e._x_removeModelListeners.default();
        let l = e._x_model.get,
          d = e._x_model.set,
          p = fn(
            {
              get() {
                return l();
              },
              set(y) {
                d(y);
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
        i(p);
      });
  }
);
var Oi = document.createElement('div');
g('teleport', (e, { modifiers: t, expression: n }, { cleanup: r }) => {
  e.tagName.toLowerCase() !== 'template' &&
    I('x-teleport can only be used on a <template> tag', e);
  let i = ge(
    () => document.querySelector(n),
    () => Oi
  )();
  i || I(`Cannot find x-teleport element for selector: "${n}"`);
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
        O(o),
        (o._x_ignore = !0);
    }),
    r(() => o.remove());
});
var In = () => {};
In.inline = (e, { modifiers: t }, { cleanup: n }) => {
  t.includes('self') ? (e._x_ignoreSelf = !0) : (e._x_ignore = !0),
    n(() => {
      t.includes('self') ? delete e._x_ignoreSelf : delete e._x_ignore;
    });
};
g('ignore', In);
g('effect', (e, { expression: t }, { effect: n }) => n(m(e, t)));
function ze(e, t, n, r) {
  let i = e,
    o = (u) => r(u),
    s = {},
    a = (u, c) => (l) => c(u, l);
  if (
    (n.includes('dot') && (t = Ci(t)),
    n.includes('camel') && (t = Mi(t)),
    n.includes('passive') && (s.passive = !0),
    n.includes('capture') && (s.capture = !0),
    n.includes('window') && (i = window),
    n.includes('document') && (i = document),
    n.includes('debounce'))
  ) {
    let u = n[n.indexOf('debounce') + 1] || 'invalid-wait',
      c = de(u.split('ms')[0]) ? Number(u.split('ms')[0]) : 250;
    o = cn(o, c);
  }
  if (n.includes('throttle')) {
    let u = n[n.indexOf('throttle') + 1] || 'invalid-wait',
      c = de(u.split('ms')[0]) ? Number(u.split('ms')[0]) : 250;
    o = ln(o, c);
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
      (Ii(t) && Pi(c, n)) || u(c);
    })),
    i.addEventListener(t, o, s),
    () => {
      i.removeEventListener(t, o, s);
    }
  );
}
function Ci(e) {
  return e.replace(/-/g, '.');
}
function Mi(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function de(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Ti(e) {
  return [' ', '_'].includes(e)
    ? e
    : e
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[_\s]/, '-')
        .toLowerCase();
}
function Ii(e) {
  return ['keydown', 'keyup'].includes(e);
}
function Pi(e, t) {
  let n = t.filter(
    (o) =>
      !['window', 'document', 'prevent', 'stop', 'once', 'capture'].includes(o)
  );
  if (n.includes('debounce')) {
    let o = n.indexOf('debounce');
    n.splice(o, de((n[o + 1] || 'invalid-wait').split('ms')[0]) ? 2 : 1);
  }
  if (n.includes('throttle')) {
    let o = n.indexOf('throttle');
    n.splice(o, de((n[o + 1] || 'invalid-wait').split('ms')[0]) ? 2 : 1);
  }
  if (n.length === 0 || (n.length === 1 && mt(e.key).includes(n[0]))) return !1;
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
      mt(e.key).includes(n[0])
    )
  );
}
function mt(e) {
  if (!e) return [];
  e = Ti(e);
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
      let p;
      return s((y) => (p = y)), wt(p) ? p.get() : p;
    },
    c = (p) => {
      let y;
      s((C) => (y = C)),
        wt(y) ? y.set(p) : a(() => {}, { scope: { __placeholder: p } });
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
  let d = P
    ? () => {}
    : ze(e, l, t, (p) => {
        c($i(e, t, p, u()));
      });
  if (
    (t.includes('fill') &&
      ([null, ''].includes(u()) ||
        (e.type === 'checkbox' && Array.isArray(u()))) &&
      e.dispatchEvent(new Event(l, {})),
    e._x_removeModelListeners || (e._x_removeModelListeners = {}),
    (e._x_removeModelListeners.default = d),
    i(() => e._x_removeModelListeners.default()),
    e.form)
  ) {
    let p = ze(e.form, 'reset', [], (y) => {
      tt(() => e._x_model && e._x_model.set(e.value));
    });
    i(() => p());
  }
  (e._x_model = {
    get() {
      return u();
    },
    set(p) {
      c(p);
    }
  }),
    (e._x_forceModelUpdate = (p) => {
      p === void 0 && typeof n == 'string' && n.match(/\./) && (p = ''),
        (window.fromModel = !0),
        v(() => on(e, 'value', p)),
        delete window.fromModel;
    }),
    r(() => {
      let p = u();
      (t.includes('unintrusive') && document.activeElement.isSameNode(e)) ||
        e._x_forceModelUpdate(p);
    });
});
function $i(e, t, n, r) {
  return v(() => {
    if (n instanceof CustomEvent && n.detail !== void 0)
      return n.detail ?? n.target.value;
    if (e.type === 'checkbox')
      if (Array.isArray(r)) {
        let i = t.includes('number') ? Se(n.target.value) : n.target.value;
        return n.target.checked ? r.concat([i]) : r.filter((o) => !Ri(o, i));
      } else return n.target.checked;
    else {
      if (e.tagName.toLowerCase() === 'select' && e.multiple)
        return t.includes('number')
          ? Array.from(n.target.selectedOptions).map((i) => {
              let o = i.value || i.text;
              return Se(o);
            })
          : Array.from(n.target.selectedOptions).map((i) => i.value || i.text);
      {
        let i = n.target.value;
        return t.includes('number') ? Se(i) : t.includes('trim') ? i.trim() : i;
      }
    }
  });
}
function Se(e) {
  let t = e ? parseFloat(e) : null;
  return ji(t) ? t : e;
}
function Ri(e, t) {
  return e == t;
}
function ji(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function wt(e) {
  return (
    e !== null &&
    typeof e == 'object' &&
    typeof e.get == 'function' &&
    typeof e.set == 'function'
  );
}
g('cloak', (e) => queueMicrotask(() => v(() => e.removeAttribute(q('cloak')))));
It(() => `[${q('init')}]`);
g(
  'init',
  ge((e, { expression: t }, { evaluate: n }) =>
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
        (e.innerHTML = o), (e._x_ignoreSelf = !0), O(e), delete e._x_ignoreSelf;
      });
    });
  });
});
Ze(Yt(':', Gt(q('bind:'))));
var Pn = (
  e,
  { value: t, modifiers: n, expression: r, original: i },
  { effect: o }
) => {
  if (!t) {
    let a = {};
    Fr(a),
      m(e, r)(
        (c) => {
          pn(e, c, i);
        },
        { scope: a }
      );
    return;
  }
  if (t === 'key') return Ni(e, r);
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
        v(() => on(e, t, a, n));
    })
  );
};
Pn.inline = (e, { value: t, modifiers: n, expression: r }) => {
  t &&
    (e._x_inlineBindings || (e._x_inlineBindings = {}),
    (e._x_inlineBindings[t] = { expression: r, extract: !1 }));
};
g('bind', Pn);
function Ni(e, t) {
  e._x_keyExpression = t;
}
Tt(() => `[${q('data')}]`);
g('data', (e, { expression: t }, { cleanup: n }) => {
  if (mr(e)) return;
  t = t === '' ? '{}' : t;
  let r = {};
  Ie(r, e);
  let i = {};
  Kr(i, r);
  let o = L(e, t, { scope: i });
  (o === void 0 || o === !0) && (o = {}), Ie(o, e);
  let s = z(o);
  Dt(s);
  let a = ee(e, s);
  s.init && L(e, s.init),
    n(() => {
      s.destroy && L(e, s.destroy), a();
    });
});
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
    u = Le(
      (d) => (d ? s() : o()),
      (d) => {
        typeof e._x_toggleAndCascadeWithTransitions == 'function'
          ? e._x_toggleAndCascadeWithTransitions(e, d, s, o)
          : d
          ? a()
          : o();
      }
    ),
    c,
    l = !0;
  r(() =>
    i((d) => {
      (!l && d === c) ||
        (t.includes('immediate') && (d ? a() : o()), u(d), (c = d), (l = !1));
    })
  );
});
g('for', (e, { expression: t }, { effect: n, cleanup: r }) => {
  let i = Fi(t),
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
    Bi(s) && s >= 0 && (s = Array.from(Array(s).keys(), (f) => f + 1)),
      s === void 0 && (s = []);
    let a = e._x_lookup,
      u = e._x_prevKeys,
      c = [],
      l = [];
    if (i(s))
      s = Object.entries(s).map(([f, _]) => {
        let x = Et(t, _, f, s);
        r((b) => l.push(b), { scope: { index: f, ...x } }), c.push(x);
      });
    else
      for (let f = 0; f < s.length; f++) {
        let _ = Et(t, s[f], f, s);
        r((x) => l.push(x), { scope: { index: f, ..._ } }), c.push(_);
      }
    let d = [],
      p = [],
      y = [],
      C = [];
    for (let f = 0; f < u.length; f++) {
      let _ = u[f];
      l.indexOf(_) === -1 && y.push(_);
    }
    u = u.filter((f) => !y.includes(f));
    let re = 'template';
    for (let f = 0; f < l.length; f++) {
      let _ = l[f],
        x = u.indexOf(_);
      if (x === -1) u.splice(f, 0, _), d.push([re, f]);
      else if (x !== f) {
        let b = u.splice(f, 1)[0],
          w = u.splice(x - 1, 1)[0];
        u.splice(f, 0, w), u.splice(x, 0, b), p.push([b, w]);
      } else C.push(_);
      re = _;
    }
    for (let f = 0; f < y.length; f++) {
      let _ = y[f];
      a[_]._x_effects && a[_]._x_effects.forEach(St),
        a[_].remove(),
        (a[_] = null),
        delete a[_];
    }
    for (let f = 0; f < p.length; f++) {
      let [_, x] = p[f],
        b = a[_],
        w = a[x],
        K = document.createElement('div');
      v(() => {
        w || I('x-for ":key" is undefined or invalid', o),
          w.after(K),
          b.after(w),
          w._x_currentIfEl && w.after(w._x_currentIfEl),
          K.before(b),
          b._x_currentIfEl && b.after(b._x_currentIfEl),
          K.remove();
      }),
        w._x_refreshXForScope(c[l.indexOf(x)]);
    }
    for (let f = 0; f < d.length; f++) {
      let [_, x] = d[f],
        b = _ === 'template' ? o : a[_];
      b._x_currentIfEl && (b = b._x_currentIfEl);
      let w = c[x],
        K = l[x],
        W = document.importNode(o.content, !0).firstElementChild,
        lt = z(w);
      ee(W, lt, o),
        (W._x_refreshXForScope = (Rn) => {
          Object.entries(Rn).forEach(([jn, Nn]) => {
            lt[jn] = Nn;
          });
        }),
        v(() => {
          b.after(W), O(W);
        }),
        typeof K == 'object' &&
          I(
            'x-for key cannot be an object, it must be a string or an integer',
            o
          ),
        (a[K] = W);
    }
    for (let f = 0; f < C.length; f++)
      a[C[f]]._x_refreshXForScope(c[l.indexOf(C[f])]);
    o._x_prevKeys = l;
  });
}
function Fi(e) {
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
function Et(e, t, n, r) {
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
function Bi(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function $n() {}
$n.inline = (e, { expression: t }, { cleanup: n }) => {
  let r = pe(e);
  r._x_refs || (r._x_refs = {}),
    (r._x_refs[t] = e),
    n(() => delete r._x_refs[t]);
};
g('ref', $n);
g('if', (e, { expression: t }, { effect: n, cleanup: r }) => {
  let i = m(e, t),
    o = () => {
      if (e._x_currentIfEl) return e._x_currentIfEl;
      let a = e.content.cloneNode(!0).firstElementChild;
      return (
        ee(a, {}, e),
        v(() => {
          e.after(a), O(a);
        }),
        (e._x_currentIfEl = a),
        (e._x_undoIf = () => {
          T(a, (u) => {
            u._x_effects && u._x_effects.forEach(St);
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
  n(t).forEach((i) => Ai(e, i));
});
Ze(Yt('@', Gt(q('on:'))));
g(
  'on',
  ge((e, { value: t, modifiers: n, expression: r }, { cleanup: i }) => {
    let o = r ? m(e, r) : () => {};
    e.tagName.toLowerCase() === 'template' &&
      (e._x_forwardEvents || (e._x_forwardEvents = []),
      e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
    let s = ze(e, t, n, (a) => {
      o(() => {}, { scope: { $event: a }, params: [a] });
    });
    i(() => s());
  })
);
be('Collapse', 'collapse', 'collapse');
be('Intersect', 'intersect', 'intersect');
be('Focus', 'trap', 'focus');
be('Mask', 'mask', 'mask');
function be(e, t, n) {
  g(t, (r) =>
    I(
      `You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,
      r
    )
  );
}
ne.setEvaluator(Wt);
ne.setReactivityEngine({ reactive: ct, effect: Yr, release: Gr, raw: h });
var Ki = ne,
  Di = Ki;
export { Di as m };
