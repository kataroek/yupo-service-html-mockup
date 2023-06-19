import { S as B, N as y } from './swiper.min.js';
function E({ swiper: t, extendParams: d }) {
  d({ grid: { rows: 1, fill: 'column' } });
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
        { rows: n, fill: m } = t.params.grid;
      (c = Math.floor(e / n)),
        Math.floor(e / n) === e / n ? (s = e) : (s = Math.ceil(e / n) * n),
        o !== 'auto' && m === 'row' && (s = Math.max(s, o * n)),
        (p = s / n);
    },
    x = (e, o, n, m) => {
      const { slidesPerGroup: a } = t.params,
        f = g(),
        { rows: i, fill: w } = t.params.grid;
      let u, l, r;
      if (w === 'row' && a > 1) {
        const S = Math.floor(e / (a * i)),
          h = e - i * a * S,
          v = S === 0 ? a : Math.min(Math.ceil((n - S * i * a) / i), a);
        (r = Math.floor(h / v)),
          (l = h - r * v + S * a),
          (u = l + (r * s) / i),
          (o.style.order = u);
      } else
        w === 'column'
          ? ((l = Math.floor(e / i)),
            (r = e - l * i),
            (l > c || (l === c && r === i - 1)) &&
              ((r += 1), r >= i && ((r = 0), (l += 1))))
          : ((r = Math.floor(e / p)), (l = e - r * p));
      (o.row = r),
        (o.column = l),
        (o.style[m('margin-top')] = r !== 0 ? f && `${f}px` : '');
    },
    z = (e, o, n) => {
      const { centeredSlides: m, roundLengths: a } = t.params,
        f = g(),
        { rows: i } = t.params.grid;
      if (
        ((t.virtualSize = (e + f) * s),
        (t.virtualSize = Math.ceil(t.virtualSize / i) - f),
        (t.wrapperEl.style[n('width')] = `${t.virtualSize + f}px`),
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
  document.querySelectorAll('.swiper').forEach((d) => {
    const s = d.querySelector('.swiper-button-prev'),
      p = d.querySelector('.swiper-button-next');
    new B(d, {
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
