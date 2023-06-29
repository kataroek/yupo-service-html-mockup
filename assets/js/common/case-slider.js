import { g as D, S as F, N as j } from './swiper.min.js';
function k({ swiper: e, extendParams: T, on: u, emit: a, params: i }) {
  (e.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
    T({
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
  let d,
    E,
    b = i && i.autoplay ? i.autoplay.delay : 3e3,
    p = i && i.autoplay ? i.autoplay.delay : 3e3,
    o,
    c = new Date().getTime,
    L,
    v,
    y,
    O,
    h,
    r;
  function P(t) {
    !e ||
      e.destroyed ||
      !e.wrapperEl ||
      (t.target === e.wrapperEl &&
        (e.wrapperEl.removeEventListener('transitionend', P), s()));
  }
  const B = () => {
      if (e.destroyed || !e.autoplay.running) return;
      e.autoplay.paused ? (L = !0) : L && ((p = o), (L = !1));
      const t = e.autoplay.paused ? o : c + p - new Date().getTime();
      (e.autoplay.timeLeft = t),
        a('autoplayTimeLeft', t, t / b),
        (E = requestAnimationFrame(() => {
          B();
        }));
    },
    N = () => {
      let t;
      return (
        e.virtual && e.params.virtual.enabled
          ? (t = e.slides.filter((n) =>
              n.classList.contains('swiper-slide-active')
            )[0])
          : (t = e.slides[e.activeIndex]),
        t ? parseInt(t.getAttribute('data-swiper-autoplay'), 10) : void 0
      );
    },
    g = (t) => {
      if (e.destroyed || !e.autoplay.running) return;
      cancelAnimationFrame(E), B();
      let l = typeof t > 'u' ? e.params.autoplay.delay : t;
      (b = e.params.autoplay.delay), (p = e.params.autoplay.delay);
      const n = N();
      !Number.isNaN(n) &&
        n > 0 &&
        typeof t > 'u' &&
        ((l = n), (b = n), (p = n)),
        (o = l);
      const m = e.params.speed,
        V = () => {
          !e ||
            e.destroyed ||
            (e.params.autoplay.reverseDirection
              ? !e.isBeginning || e.params.loop || e.params.rewind
                ? (e.slidePrev(m, !0, !0), a('autoplay'))
                : e.params.autoplay.stopOnLastSlide ||
                  (e.slideTo(e.slides.length - 1, m, !0, !0), a('autoplay'))
              : !e.isEnd || e.params.loop || e.params.rewind
              ? (e.slideNext(m, !0, !0), a('autoplay'))
              : e.params.autoplay.stopOnLastSlide ||
                (e.slideTo(0, m, !0, !0), a('autoplay')),
            e.params.cssMode &&
              ((c = new Date().getTime()),
              requestAnimationFrame(() => {
                g();
              })));
        };
      return (
        l > 0
          ? (clearTimeout(d),
            (d = setTimeout(() => {
              V();
            }, l)))
          : requestAnimationFrame(() => {
              V();
            }),
        l
      );
    },
    q = () => {
      (e.autoplay.running = !0), g(), a('autoplayStart');
    },
    S = () => {
      (e.autoplay.running = !1),
        clearTimeout(d),
        cancelAnimationFrame(E),
        a('autoplayStop');
    },
    f = (t, l) => {
      if (e.destroyed || !e.autoplay.running) return;
      clearTimeout(d), t || (r = !0);
      const n = () => {
        a('autoplayPause'),
          e.params.autoplay.waitForTransition
            ? e.wrapperEl.addEventListener('transitionend', P)
            : s();
      };
      if (((e.autoplay.paused = !0), l)) {
        h && (o = e.params.autoplay.delay), (h = !1), n();
        return;
      }
      (o = (o || e.params.autoplay.delay) - (new Date().getTime() - c)),
        !(e.isEnd && o < 0 && !e.params.loop) && (o < 0 && (o = 0), n());
    },
    s = () => {
      (e.isEnd && o < 0 && !e.params.loop) ||
        e.destroyed ||
        !e.autoplay.running ||
        ((c = new Date().getTime()),
        r ? ((r = !1), g(o)) : g(),
        (e.autoplay.paused = !1),
        a('autoplayResume'));
    },
    A = () => {
      if (e.destroyed || !e.autoplay.running) return;
      const t = D();
      t.visibilityState === 'hidden' && ((r = !0), f(!0)),
        t.visibilityState === 'visible' && s();
    },
    I = (t) => {
      t.pointerType === 'mouse' && ((r = !0), f(!0));
    },
    M = (t) => {
      t.pointerType === 'mouse' && e.autoplay.paused && s();
    },
    x = () => {
      e.params.autoplay.pauseOnMouseEnter &&
        (e.el.addEventListener('pointerenter', I),
        e.el.addEventListener('pointerleave', M));
    },
    C = () => {
      e.el.removeEventListener('pointerenter', I),
        e.el.removeEventListener('pointerleave', M);
    },
    z = () => {
      D().addEventListener('visibilitychange', A);
    },
    _ = () => {
      D().removeEventListener('visibilitychange', A);
    };
  u('init', () => {
    e.params.autoplay.enabled && (x(), z(), (c = new Date().getTime()), q());
  }),
    u('destroy', () => {
      C(), _(), e.autoplay.running && S();
    }),
    u('beforeTransitionStart', (t, l, n) => {
      e.destroyed ||
        !e.autoplay.running ||
        (n || !e.params.autoplay.disableOnInteraction ? f(!0, !0) : S());
    }),
    u('sliderFirstMove', () => {
      if (!(e.destroyed || !e.autoplay.running)) {
        if (e.params.autoplay.disableOnInteraction) {
          S();
          return;
        }
        (v = !0),
          (y = !1),
          (r = !1),
          (O = setTimeout(() => {
            (r = !0), (y = !0), f(!0);
          }, 200));
      }
    }),
    u('touchEnd', () => {
      if (!(e.destroyed || !e.autoplay.running || !v)) {
        if (
          (clearTimeout(O),
          clearTimeout(d),
          e.params.autoplay.disableOnInteraction)
        ) {
          (y = !1), (v = !1);
          return;
        }
        y && e.params.cssMode && s(), (y = !1), (v = !1);
      }
    }),
    u('slideChange', () => {
      e.destroyed || !e.autoplay.running || (h = !0);
    }),
    Object.assign(e.autoplay, { start: q, stop: S, pause: f, resume: s });
}
const R = document.querySelector('.logo-scroll'),
  G = R.querySelectorAll('.swiper');
G.forEach((e) => {
  new F(e, {
    modules: [k],
    loop: !0,
    loopedSlides: 14,
    slidesPerView: 'auto',
    speed: 2e3,
    allowTouchMove: !1,
    autoplay: { delay: 0, disableOnInteraction: !1 }
  });
});
document.addEventListener('alpine:initialized', () => {
  const e = document.querySelector('[data-case-slider]'),
    T = e.querySelector('.swiper-button-prev'),
    u = e.querySelector('.swiper-button-next');
  new F(e, {
    modules: [j],
    loop: !0,
    slidesPerView: 2,
    navigation: { prevEl: T, nextEl: u },
    breakpoints: {
      760: { centeredSlides: !0, centeredSlidesBounds: !0, slidesPerView: 2 },
      1020: { centeredSlides: !0, centeredSlidesBounds: !0, slidesPerView: 4 },
      1300: { centeredSlides: !0, centeredSlidesBounds: !0, slidesPerView: 6 },
      1600: { centeredSlides: !0, centeredSlidesBounds: !0, slidesPerView: 8 }
    },
    on: {
      init: function (a) {
        a.update();
      },
      resize: function (a) {
        a.update();
      }
    }
  });
});
