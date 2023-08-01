import { m as p } from '../common/module.esm.js';
p.data('productFilter', () => ({
  init() {
    this.getProducts(),
      setTimeout(() => {
        const t = document.querySelector('input[name="optionA"]');
        t.checked = !0;
        const e = document.querySelector('input[name="optionB"]');
        e.checked = !0;
        const s = document.querySelector('input[name="optionA"]');
        t.checked = !0;
        const o = document.querySelector('input[name="optionB"]');
        e.checked = !0;
        const c = document.querySelector('input[name="products"]');
        (c.checked = !0),
          (this.optionA = t.value),
          (this.optionB = e.value),
          (this.optionA_SP = s.value),
          (this.optionB_SP = o.value),
          (this.products = [c].map((n) => n.value));
      }, 120);
  },
  activePopup: null,
  showProductPopup: !1,
  optionA: null,
  optionB: null,
  optionA_SP: null,
  optionB_SP: null,
  products: [],
  productsData: [],
  productsList: [],
  getProducts() {
    fetch('/data/products-new.json')
      .then((t) => t.json())
      .then((t) => {
        this.productsData = t;
      });
  },
  selectedProducts() {
    this.productsList = [];
    const t = this.products.map((e) => e.split('/'));
    console.log(t),
      t.forEach((e) => {
        const c = this.productsData
          .filter((n) => n.title === e.at(0))
          .at(0)
          .subCat.filter((n) => n.title === e.at(1))
          .at(0)
          .items.filter((n) => n.name === e.at(2));
        this.productsList.push(c.at(0));
      }),
      console.log(this.productsList);
  },
  selectOptionB(t) {
    setTimeout(() => {
      this.products = [];
      const o = [...document.querySelectorAll('input[name="optionB"]')]
        .filter((u) => u.parentElement.getClientRects().length)
        .at(0);
      (o.checked = !0), o.dispatchEvent(new CustomEvent('change'));
      const i = [...document.querySelectorAll('input[name="optionB_SP"]')]
        .filter((u) => u.parentElement.getClientRects().length)
        .at(0);
      (i.checked = !0), i.dispatchEvent(new CustomEvent('change'));
    }, 120);
  },
  selectProduct(t) {
    setTimeout(() => {
      this.products = [];
      const o = [...document.querySelectorAll('input[name="products"]')]
        .filter((c) => c.parentElement.getClientRects().length)
        .at(0);
      (o.checked = !0), (this.products[0] = o.value);
    }, 120);
  },
  checkAll(t) {
    const e = t.closest('div').querySelectorAll('input[name=products]');
    this.products = [...e].map((s) => s.value);
  },
  uncheckAll(t) {
    t.closest('div').querySelectorAll('input[name=products]'),
      (this.products = []);
  },
  clearToggleCheckbox() {
    document
      .querySelectorAll('input[name=checkToggle]')
      .forEach((e) => (e.checked = !1));
  }
}));
