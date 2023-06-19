import {
  g as O,
  n as V,
  e as A,
  S as F,
  N as j
} from './swiper.min.js';
function G({ swiper: e, extendParams: L, on: r, emit: u, params: M }) {
  (e.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
    L({
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
  let S,
    x,
    s = M && M.autoplay ? M.autoplay.delay : 3e3,
    t = M && M.autoplay ? M.autoplay.delay : 3e3,
    i,
    y = new Date().getTime,
    c,
    d,
    E,
    I,
    m,
    v;
  function a(n) {
    !e ||
      e.destroyed ||
      !e.wrapperEl ||
      (n.target === e.wrapperEl &&
        (e.wrapperEl.removeEventListener('transitionend', a), h()));
  }
  const b = () => {
      if (e.destroyed || !e.autoplay.running) return;
      e.autoplay.paused ? (c = !0) : c && ((t = i), (c = !1));
      const n = e.autoplay.paused ? i : y + t - new Date().getTime();
      (e.autoplay.timeLeft = n),
        u('autoplayTimeLeft', n, n / s),
        (x = requestAnimationFrame(() => {
          b();
        }));
    },
    D = () => {
      let n;
      return (
        e.virtual && e.params.virtual.enabled
          ? (n = e.slides.filter((f) =>
              f.classList.contains('swiper-slide-active')
            )[0])
          : (n = e.slides[e.activeIndex]),
        n ? parseInt(n.getAttribute('data-swiper-autoplay'), 10) : void 0
      );
    },
    T = (n) => {
      if (e.destroyed || !e.autoplay.running) return;
      cancelAnimationFrame(x), b();
      let g = typeof n > 'u' ? e.params.autoplay.delay : n;
      (s = e.params.autoplay.delay), (t = e.params.autoplay.delay);
      const f = D();
      !Number.isNaN(f) &&
        f > 0 &&
        typeof n > 'u' &&
        ((g = f), (s = f), (t = f)),
        (i = g);
      const p = e.params.speed,
        C = () => {
          !e ||
            e.destroyed ||
            (e.params.autoplay.reverseDirection
              ? !e.isBeginning || e.params.loop || e.params.rewind
                ? (e.slidePrev(p, !0, !0), u('autoplay'))
                : e.params.autoplay.stopOnLastSlide ||
                  (e.slideTo(e.slides.length - 1, p, !0, !0), u('autoplay'))
              : !e.isEnd || e.params.loop || e.params.rewind
              ? (e.slideNext(p, !0, !0), u('autoplay'))
              : e.params.autoplay.stopOnLastSlide ||
                (e.slideTo(0, p, !0, !0), u('autoplay')),
            e.params.cssMode &&
              ((y = new Date().getTime()),
              requestAnimationFrame(() => {
                T();
              })));
        };
      return (
        g > 0
          ? (clearTimeout(S),
            (S = setTimeout(() => {
              C();
            }, g)))
          : requestAnimationFrame(() => {
              C();
            }),
        g
      );
    },
    B = () => {
      (e.autoplay.running = !0), T(), u('autoplayStart');
    },
    o = () => {
      (e.autoplay.running = !1),
        clearTimeout(S),
        cancelAnimationFrame(x),
        u('autoplayStop');
    },
    l = (n, g) => {
      if (e.destroyed || !e.autoplay.running) return;
      clearTimeout(S), n || (v = !0);
      const f = () => {
        u('autoplayPause'),
          e.params.autoplay.waitForTransition
            ? e.wrapperEl.addEventListener('transitionend', a)
            : h();
      };
      if (((e.autoplay.paused = !0), g)) {
        m && (i = e.params.autoplay.delay), (m = !1), f();
        return;
      }
      (i = (i || e.params.autoplay.delay) - (new Date().getTime() - y)),
        !(e.isEnd && i < 0 && !e.params.loop) && (i < 0 && (i = 0), f());
    },
    h = () => {
      (e.isEnd && i < 0 && !e.params.loop) ||
        e.destroyed ||
        !e.autoplay.running ||
        ((y = new Date().getTime()),
        v ? ((v = !1), T(i)) : T(),
        (e.autoplay.paused = !1),
        u('autoplayResume'));
    },
    P = () => {
      if (e.destroyed || !e.autoplay.running) return;
      const n = O();
      n.visibilityState === 'hidden' && ((v = !0), l(!0)),
        n.visibilityState === 'visible' && h();
    },
    R = (n) => {
      n.pointerType === 'mouse' && ((v = !0), l(!0));
    },
    q = (n) => {
      n.pointerType === 'mouse' && e.autoplay.paused && h();
    },
    N = () => {
      e.params.autoplay.pauseOnMouseEnter &&
        (e.el.addEventListener('pointerenter', R),
        e.el.addEventListener('pointerleave', q));
    },
    k = () => {
      e.el.removeEventListener('pointerenter', R),
        e.el.removeEventListener('pointerleave', q);
    },
    z = () => {
      O().addEventListener('visibilitychange', P);
    },
    _ = () => {
      O().removeEventListener('visibilitychange', P);
    };
  r('init', () => {
    e.params.autoplay.enabled && (N(), z(), (y = new Date().getTime()), B());
  }),
    r('destroy', () => {
      k(), _(), e.autoplay.running && o();
    }),
    r('beforeTransitionStart', (n, g, f) => {
      e.destroyed ||
        !e.autoplay.running ||
        (f || !e.params.autoplay.disableOnInteraction ? l(!0, !0) : o());
    }),
    r('sliderFirstMove', () => {
      if (!(e.destroyed || !e.autoplay.running)) {
        if (e.params.autoplay.disableOnInteraction) {
          o();
          return;
        }
        (d = !0),
          (E = !1),
          (v = !1),
          (I = setTimeout(() => {
            (v = !0), (E = !0), l(!0);
          }, 200));
      }
    }),
    r('touchEnd', () => {
      if (!(e.destroyed || !e.autoplay.running || !d)) {
        if (
          (clearTimeout(I),
          clearTimeout(S),
          e.params.autoplay.disableOnInteraction)
        ) {
          (E = !1), (d = !1);
          return;
        }
        E && e.params.cssMode && h(), (E = !1), (d = !1);
      }
    }),
    r('slideChange', () => {
      e.destroyed || !e.autoplay.running || (m = !0);
    }),
    Object.assign(e.autoplay, { start: B, stop: o, pause: l, resume: h });
}
function H({ swiper: e, extendParams: L, emit: r, once: u }) {
  L({
    freeMode: {
      enabled: !1,
      momentum: !0,
      momentumRatio: 1,
      momentumBounce: !0,
      momentumBounceRatio: 1,
      momentumVelocityRatio: 1,
      sticky: !1,
      minimumVelocity: 0.02
    }
  });
  function M() {
    if (e.params.cssMode) return;
    const s = e.getTranslate();
    e.setTranslate(s),
      e.setTransition(0),
      (e.touchEventsData.velocities.length = 0),
      e.freeMode.onTouchEnd({ currentPos: e.rtl ? e.translate : -e.translate });
  }
  function S() {
    if (e.params.cssMode) return;
    const { touchEventsData: s, touches: t } = e;
    s.velocities.length === 0 &&
      s.velocities.push({
        position: t[e.isHorizontal() ? 'startX' : 'startY'],
        time: s.touchStartTime
      }),
      s.velocities.push({
        position: t[e.isHorizontal() ? 'currentX' : 'currentY'],
        time: V()
      });
  }
  function x({ currentPos: s }) {
    if (e.params.cssMode) return;
    const {
        params: t,
        wrapperEl: i,
        rtlTranslate: y,
        snapGrid: c,
        touchEventsData: d
      } = e,
      I = V() - d.touchStartTime;
    if (s < -e.minTranslate()) {
      e.slideTo(e.activeIndex);
      return;
    }
    if (s > -e.maxTranslate()) {
      e.slides.length < c.length
        ? e.slideTo(c.length - 1)
        : e.slideTo(e.slides.length - 1);
      return;
    }
    if (t.freeMode.momentum) {
      if (d.velocities.length > 1) {
        const o = d.velocities.pop(),
          l = d.velocities.pop(),
          h = o.position - l.position,
          P = o.time - l.time;
        (e.velocity = h / P),
          (e.velocity /= 2),
          Math.abs(e.velocity) < t.freeMode.minimumVelocity && (e.velocity = 0),
          (P > 150 || V() - o.time > 300) && (e.velocity = 0);
      } else e.velocity = 0;
      (e.velocity *= t.freeMode.momentumVelocityRatio),
        (d.velocities.length = 0);
      let m = 1e3 * t.freeMode.momentumRatio;
      const v = e.velocity * m;
      let a = e.translate + v;
      y && (a = -a);
      let b = !1,
        D;
      const T = Math.abs(e.velocity) * 20 * t.freeMode.momentumBounceRatio;
      let B;
      if (a < e.maxTranslate())
        t.freeMode.momentumBounce
          ? (a + e.maxTranslate() < -T && (a = e.maxTranslate() - T),
            (D = e.maxTranslate()),
            (b = !0),
            (d.allowMomentumBounce = !0))
          : (a = e.maxTranslate()),
          t.loop && t.centeredSlides && (B = !0);
      else if (a > e.minTranslate())
        t.freeMode.momentumBounce
          ? (a - e.minTranslate() > T && (a = e.minTranslate() + T),
            (D = e.minTranslate()),
            (b = !0),
            (d.allowMomentumBounce = !0))
          : (a = e.minTranslate()),
          t.loop && t.centeredSlides && (B = !0);
      else if (t.freeMode.sticky) {
        let o;
        for (let l = 0; l < c.length; l += 1)
          if (c[l] > -a) {
            o = l;
            break;
          }
        Math.abs(c[o] - a) < Math.abs(c[o - 1] - a) ||
        e.swipeDirection === 'next'
          ? (a = c[o])
          : (a = c[o - 1]),
          (a = -a);
      }
      if (
        (B &&
          u('transitionEnd', () => {
            e.loopFix();
          }),
        e.velocity !== 0)
      ) {
        if (
          (y
            ? (m = Math.abs((-a - e.translate) / e.velocity))
            : (m = Math.abs((a - e.translate) / e.velocity)),
          t.freeMode.sticky)
        ) {
          const o = Math.abs((y ? -a : a) - e.translate),
            l = e.slidesSizesGrid[e.activeIndex];
          o < l
            ? (m = t.speed)
            : o < 2 * l
            ? (m = t.speed * 1.5)
            : (m = t.speed * 2.5);
        }
      } else if (t.freeMode.sticky) {
        e.slideToClosest();
        return;
      }
      t.freeMode.momentumBounce && b
        ? (e.updateProgress(D),
          e.setTransition(m),
          e.setTranslate(a),
          e.transitionStart(!0, e.swipeDirection),
          (e.animating = !0),
          A(i, () => {
            !e ||
              e.destroyed ||
              !d.allowMomentumBounce ||
              (r('momentumBounce'),
              e.setTransition(t.speed),
              setTimeout(() => {
                e.setTranslate(D),
                  A(i, () => {
                    !e || e.destroyed || e.transitionEnd();
                  });
              }, 0));
          }))
        : e.velocity
        ? (r('_freeModeNoMomentumRelease'),
          e.updateProgress(a),
          e.setTransition(m),
          e.setTranslate(a),
          e.transitionStart(!0, e.swipeDirection),
          e.animating ||
            ((e.animating = !0),
            A(i, () => {
              !e || e.destroyed || e.transitionEnd();
            })))
        : e.updateProgress(a),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
    } else if (t.freeMode.sticky) {
      e.slideToClosest();
      return;
    } else t.freeMode && r('_freeModeNoMomentumRelease');
    (!t.freeMode.momentum || I >= t.longSwipesMs) &&
      (e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses());
  }
  Object.assign(e, {
    freeMode: { onTouchStart: M, onTouchMove: S, onTouchEnd: x }
  });
}
const X = document.querySelector('.logo-scroll'),
  Y = X.querySelector('.swiper');
new F(Y, {
  modules: [G, H],
  loop: !0,
  loopedSlides: 16,
  slidesPerView: 'auto',
  speed: 2e3,
  allowTouchMove: !1,
  autoplay: { delay: 0, disableOnInteraction: !1 },
  freeMode: { enabled: !0, momentum: !1 }
});
document.addEventListener('alpine:initialized', () => {
  const e = document.querySelector('[data-case-slider]'),
    L = e.querySelector('.swiper-button-prev'),
    r = e.querySelector('.swiper-button-next');
  new F(e, {
    modules: [j],
    loop: !0,
    slidesPerView: 2,
    navigation: { prevEl: L, nextEl: r },
    breakpoints: {
      760: { centeredSlides: !0, centeredSlidesBounds: !0, slidesPerView: 2 },
      1020: { centeredSlides: !0, centeredSlidesBounds: !0, slidesPerView: 4 },
      1300: { centeredSlides: !0, centeredSlidesBounds: !0, slidesPerView: 6 },
      1600: { centeredSlides: !0, centeredSlidesBounds: !0, slidesPerView: 8 }
    },
    on: {
      init: function (u) {
        u.update();
      },
      resize: function (u) {
        u.update();
      }
    }
  });
});
