import { S as B, N as y } from './swiper.min.ffde7e0a.js';
function E({ swiper: t, extendParams: f }) {
  f({ grid: { rows: 1, fill: 'column' } });
  let s, p, c;
  const g = () => {
      let e = t.params.spaceBetween;
      return (
        typeof e == 'string' && e.indexOf('%') >= 0
          ? (e = (parseFloat(e.replace('%', '')) / 100) * t.size)
          : typeof e == 'string' && (e = parseFloat(e)),
        e
      );
    },
    M = (e) => {
      const { slidesPerView: o } = t.params,
        { rows: r, fill: m } = t.params.grid;
      (p = s / r),
        (c = Math.floor(e / r)),
        Math.floor(e / r) === e / r ? (s = e) : (s = Math.ceil(e / r) * r),
        o !== 'auto' && m === 'row' && (s = Math.max(s, o * r));
    },
    x = (e, o, r, m) => {
      const { slidesPerGroup: a } = t.params,
        d = g(),
        { rows: n, fill: w } = t.params.grid;
      let u, l, i;
      if (w === 'row' && a > 1) {
        const S = Math.floor(e / (a * n)),
          h = e - n * a * S,
          v = S === 0 ? a : Math.min(Math.ceil((r - S * n * a) / n), a);
        (i = Math.floor(h / v)),
          (l = h - i * v + S * a),
          (u = l + (i * s) / n),
          (o.style.order = u);
      } else
        w === 'column'
          ? ((l = Math.floor(e / n)),
            (i = e - l * n),
            (l > c || (l === c && i === n - 1)) &&
              ((i += 1), i >= n && ((i = 0), (l += 1))))
          : ((i = Math.floor(e / p)), (l = e - i * p));
      o.style[m('margin-top')] = i !== 0 ? d && `${d}px` : '';
    },
    z = (e, o, r) => {
      const { centeredSlides: m, roundLengths: a } = t.params,
        d = g(),
        { rows: n } = t.params.grid;
      if (
        ((t.virtualSize = (e + d) * s),
        (t.virtualSize = Math.ceil(t.virtualSize / n) - d),
        (t.wrapperEl.style[r('width')] = `${t.virtualSize + d}px`),
        m)
      ) {
        const w = [];
        for (let u = 0; u < o.length; u += 1) {
          let l = o[u];
          a && (l = Math.floor(l)), o[u] < t.virtualSize + o[0] && w.push(l);
        }
        o.splice(0, o.length), o.push(...w);
      }
    };
  t.grid = { initSlides: M, updateSlide: x, updateWrapperSize: z };
}
document.addEventListener('alpine:initialized', () => {
  document.querySelectorAll('.swiper').forEach((f) => {
    const s = f.querySelector('.swiper-button-prev'),
      p = f.querySelector('.swiper-button-next');
    new B(f, {
      modules: [y, E],
      slidesPerView: 1,
      spaceBetween: 20,
      grid: { fill: 'row', rows: 9 },
      navigation: { prevEl: s, nextEl: p },
      breakpoints: {
        768: { slidesPerView: 2, grid: { fill: 'row', rows: 9 } },
        1024: {
          spaceBetween: 40,
          slidesPerView: 3,
          grid: { fill: 'row', rows: 7 }
        }
      },
      on: {
        init: function (c) {
          c.update();
        },
        resize: function (c) {
          c.update();
        }
      }
    });
  });
});
