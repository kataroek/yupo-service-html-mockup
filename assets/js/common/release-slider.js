import { S as B, N as y } from './swiper.min.js';
function P({ swiper: t, extendParams: f }) {
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
        { rows: n, fill: m } = t.params.grid;
      (c = Math.floor(e / n)),
        Math.floor(e / n) === e / n ? (s = e) : (s = Math.ceil(e / n) * n),
        o !== 'auto' && m === 'row' && (s = Math.max(s, o * n)),
        (p = s / n);
    },
    x = (e, o, n, m) => {
      const { slidesPerGroup: a } = t.params,
        d = g(),
        { rows: i, fill: w } = t.params.grid;
      let u, r, l;
      if (w === 'row' && a > 1) {
        const S = Math.floor(e / (a * i)),
          h = e - i * a * S,
          v = S === 0 ? a : Math.min(Math.ceil((n - S * i * a) / i), a);
        (l = Math.floor(h / v)),
          (r = h - l * v + S * a),
          (u = r + (l * s) / i),
          (o.style.order = u);
      } else
        w === 'column'
          ? ((r = Math.floor(e / i)),
            (l = e - r * i),
            (r > c || (r === c && l === i - 1)) &&
              ((l += 1), l >= i && ((l = 0), (r += 1))))
          : ((l = Math.floor(e / p)), (r = e - l * p));
      (o.row = l),
        (o.column = r),
        (o.style[m('margin-top')] = l !== 0 ? d && `${d}px` : '');
    },
    z = (e, o, n) => {
      const { centeredSlides: m, roundLengths: a } = t.params,
        d = g(),
        { rows: i } = t.params.grid;
      if (
        ((t.virtualSize = (e + d) * s),
        (t.virtualSize = Math.ceil(t.virtualSize / i) - d),
        (t.wrapperEl.style[n('width')] = `${t.virtualSize + d}px`),
        m)
      ) {
        const w = [];
        for (let u = 0; u < o.length; u += 1) {
          let r = o[u];
          a && (r = Math.floor(r)), o[u] < t.virtualSize + o[0] && w.push(r);
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
      modules: [y, P],
      slidesPerView: 1,
      spaceBetween: 20,
      grid: { fill: 'row', rows: 9 },
      navigation: { prevEl: s, nextEl: p },
      breakpoints: {
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          grid: { fill: 'row', rows: 9 }
        },
        1024: {
          spaceBetween: 40,
          slidesPerView: 3,
          slidesPerGroup: 3,
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
