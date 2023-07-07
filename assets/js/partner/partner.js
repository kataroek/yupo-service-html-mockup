import { m as c } from '../common/module.esm.js';
const o = [
  {
    title: 'スクリーン印刷',
    content:
      '<p>FGS、FEB(G)、FEBA、FPU、SGS、QJJなどのグレードをおすすめします。</p><ul><li>風雨にさらされる屋外用途や耐水性を要求される用途の場合は二液型インキを使用してください。また印刷物をラミネート加工してください。（PP貼りなど）</li><li>インキの選択については、インキメーカーに必ず相談してください。また事前に必ずテストをしてください。</li><li>大判の用途では事前にテストを行なってください。</li></ul><p>（1）溶剤乾燥型インキの場合</p><ul><li>特に強いインキ密着性を要求される用途には、二液型インキを使用してください。</li><li>溶剤によるボコつきが起こりやすいので、厚手グレードの使用をおすすめします。</li></ul><p>（2）UVインキの場合</p><ul><li>カールを防ぐため、UVランプは低温型を使用してください。</li><li>UVの照射条件によってはインキ密着が不十分だったり、熱のためユポがカールする場合がありますので事前にテストをしてください（発熱の少ないUVランプや冷却装置をおすすめします）。</li></ul>'
  },
  {
    title: 'UVシール印刷',
    content:
      '<ul><li>※SGS（タック紙）、SGP（タック紙）、FGS、FEB(G)、FEBA、QJJをおすすめします。</li><li>インキの選択についてはインキメーカーに必ず相談してください。</li><li>見当不良を防ぐため、UVランプは低温型（赤外線カット方式）を使用してください。</li><li>印刷機は平圧式、半輪転式、輪転式、いずれも使用できますが、ベタ絵柄がある場合は、半輪転式か輪転式をおすすめします。</li><li>間欠輪転式印刷機ではテンション変動による見当合わせに十分に留意してください。必要あれば事前テストで確認してください。</li><li>コート紙用よりも軟らかいインキの方がインキ転移性が向上します。</li><li>UV照射量が不足すると、印刷直後のインキ密着強度が不十分になることがあります。事前に確認してください。</li><li>紙面が冷えていると結露してインキ転移が悪くなることがありますので、あらかじめあたためてください。</li><li>見当不良を防ぐため、テンションはできるだけ低く設定してください。</li><li>FEB(G)は事前にテストを行い印刷機適性を確認してください（走行性、見当ズレ）。</li></ul>'
  },
  {
    title: 'グラビア印刷',
    content:
      '<ul><li>密着強度が重要な場合は、2液タイプのインキを使用してください。インキ選択はインキメーカーに相談してください。</li><li>基本的な印刷条件はBOPPフィルム印刷と同様の条件に設定してください。</li><li>見当不良を防ぐためテンションをできるだけ低く設定してください。</li><li>ドライヤー直後にユポをできる限り室温近くまで冷却してください。</li><li>ドライヤーでの熱風温度が80℃を越えないように条件設定してください。乾燥効率を上げるためには熱風温度を上げるより、風速および風量を上げるのが有効です。</li><li>ベタ絵柄では白抜けトラブルを生ずることがあります。事前にテストして確認してください。</li></ul>'
  },
  {
    title: 'フレキソ印刷',
    content:
      '<ul><li>基本的な印刷条件は、BOPPフィルム印刷と同様の条件に設定してください。</li><li>インキの選択はインキメーカーと相談してください。</li><li>見当不良を防ぐため、テンションをできるだけ低く設定してください。</li><li>紙面温度が80℃を越えないように設定し、ドライヤー直後にユポをできる限り室温近くまで冷却してください。</li></ul><dl><dt>（1）水性フレキソ印刷</dt><dd>推奨グレードがありますので当社までご相談ください。</dd><dt>（2）UVフレキソ印刷（ナローウェブ機）</dt><dd>インキ選定はインキメーカーにご相談し、事前テストで確認してください。<br>UVランプは低温型（赤外線カット方式）を使用してください。</dd></dl>'
  },
  {
    title: 'ビジネスフォーム印刷',
    content:
      '<ul><li>裏付きを防ぐためUV印刷方式を使用してください。</li><li>見当不良を防ぐためUVランプは低温型（赤外線カット方式）を使用してください。</li><li>インキの選択はインキメーカーにご相談のうえ事前にテストをしてください。</li><li>オフセット印刷の場合は、湿し水をギリギリに絞ってください。</li><li>見当不良を防ぐため、テンションはできるだけ低く設定してください（20Kg/m以下）。テンションが高いと特にスプロケットホールのピッチが合わずコレーターでトラブルを起こします。</li><li>裏カーボンを印刷する場合、ユポの伸縮を起こさないように、乾燥温度に注意してください。</li><li>ミシン目入れでは刃の間隔に注意してください。</li></ul><dl><dt>■縦ミシン</dt><dd>uncut ・・・ 0.5mm以下<br>cut ・・・ 2～4mm</dd><dt>■横ミシン</dt><dd>uncut ・・・ 0.8～1.0mm<br>cut ・・・ 2～3mm</dd></dl><ul><li>ミシン目CUT部がエッジにかかると、裂けやすくなります。</li><li>排紙の折り方はスパイラル方式が適しています。また薄手のユポの場合、タイミング調整を事前におこなってください。</li></ul>'
  },
  {
    title: '枚葉活版印刷',
    content:
      '<ul><li>通常の活版インキ（浸透型）は使用できません。ユポ用オフセットインキを使用してください。</li><li>裏付きを防ぐためにスプレーパウダーを使用してください。</li></ul>'
  },
  {
    title: '非対応印刷方式（高速輪転印刷）',
    content:
      '<p>ヒートセットタイプのインキが使用される高速輪転印刷には、ユポは適性がありません。</p>'
  }
];
c.data('popup', () => ({
  showpopup: !1,
  data: o,
  activePopup: {},
  getContent(t) {
    this.activePopup = this.data[t];
  }
}));
const n = [
  {
    title: '油性オフセット',
    subCat: [
      {
        title: '環境対応製品',
        items: [
          'スーパーユポダブル［ユポグリーンシリーズ］',
          'スーパーユポ®［ユポグリーンシリーズ］',
          'ウルトラユポ®［ユポグリーンシリーズ］'
        ]
      },
      {
        title: '一般品',
        items: [
          'ニューユポ',
          'ウルトラユポ®［ユポグリーンシリーズ］',
          'スーパーユポ®［ユポグリーンシリーズ］',
          'スーパーユポダブル［ユポグリーンシリーズ］',
          'ユポ®イッパン'
        ]
      },
      { title: '高光沢品', items: ['ユポ®ハイグロス'] },
      {
        title: '半透明品',
        items: ['ユポトレース®', 'ユポ®電飾用紙［ユポグリーンシリーズ］']
      },
      {
        title: '厚手品',
        items: ['アルファユポ®［一般品］', 'アルファユポ®［半透明］']
      },
      { title: '吸着品', items: ['ユポ®・サクションタック®', 'ユポ静電吸着®'] },
      {
        title: 'コート品',
        items: [
          '印字用ユポコート［片面コート］',
          '印字用ユポコート［両面コート］',
          'ユポ®カーボンレス'
        ]
      },
      {
        title: '貼合品',
        items: [
          'クロスユポ®［ダブル］',
          'メタリックユポ',
          'ハイティアーユポ®',
          'コンシールユポ®'
        ]
      }
    ]
  },
  {
    title: 'UVオフセット',
    subCat: [
      {
        title: '環境対応製品',
        items: [
          'ユポエアー',
          'ウルトラユポ®［ユポグリーンシリーズ］',
          'ユポタック®原紙［ユポグリーンシリーズ］',
          'アクアユポ®[ユポグリーンシリーズ]'
        ]
      },
      {
        title: '一般品',
        items: [
          'ウルトラユポ®［ユポグリーンシリーズ］',
          'ニューユポ',
          'ユポ®デジタル印刷用紙［HP Indigo／プロダクションプリンター用］'
        ]
      },
      { title: '高光沢品', items: ['ユポ®ハイグロス'] },
      {
        title: '半透明品',
        items: ['ユポトレース®', 'ユポ®電飾用紙［ユポグリーンシリーズ］']
      },
      {
        title: '厚手品',
        items: ['アルファユポ®［一般品］', 'アルファユポ®［半透明］']
      },
      {
        title: 'ラベル用',
        items: [
          'ユポエアー',
          'ユポタック®原紙',
          'ユポタック®原紙［ユポグリーンシリーズ］',
          'ユポタック®原紙［熱転写印字対応］',
          'ユポタック®原紙［高機能品］',
          '易剥離ユポ',
          '易破壊ユポ',
          'アクアユポ®[ユポグリーンシリーズ]',
          'ユポ®インモールドラベル［ブロー/インジェクション成形用］',
          'ユポ®インモールドラベル［インジェクション成形用］'
        ]
      },
      {
        title: '吸着品',
        items: [
          'ユポ®・サクションタック®・アウトドア',
          'ユポ®透明吸着',
          'ユポ静電吸着®',
          'ユポ静電吸着®［透明タイプ］'
        ]
      },
      { title: '貼合品', items: ['コンシールユポ®'] }
    ]
  },
  {
    title: 'デジタル印刷',
    subCat: [
      {
        title: '環境対応製品',
        items: ['ユポ®電飾用紙［ユポグリーンシリーズ］']
      },
      {
        title: '一般品',
        items: [
          'ユポ®デジタル印刷用紙［HP Indigo／プロダクションプリンター用］',
          'ユポ®デジタル印刷用紙［HP Indigo用／厚手品］',
          'ユポ®デジタル印刷用紙［UVインクジェット用］',
          'ユポジェット®［インクジェット用］'
        ]
      },
      { title: '高光沢品', items: ['ユポ®電飾用紙［ユポグリーンシリーズ］'] },
      { title: 'ラベル用', items: ['ユポタック®原紙［高機能品］'] },
      {
        title: '吸着品',
        items: [
          'ユポ®・サクションタック®［インクジェット用］',
          'ユポ®・サクションタック®［UVインクジェット用］',
          'ユポ®・サクションタック®［HP Indigo用］',
          'ユポ®透明吸着',
          'ユポ静電吸着®［UVオフセット・UVインクジェット印刷用］',
          'ユポ静電吸着®［HP Indigo用］'
        ]
      }
    ]
  },
  {
    title: 'その他',
    items: [
      'スクリーン印刷',
      'UVシール印刷',
      'グラビア印刷',
      'フレキソ印刷',
      'ビジネスフォーム印刷',
      '枚葉活版印刷',
      '非対応印刷方式'
    ]
  }
];
c.data('products_pc', () => ({
  init() {
    this.intialView();
  },
  data: n,
  intialView() {
    (this.optionA = this.data.map((t) => t.title)),
      (this.optionB = this.data[0].subCat.map((t) => t.title)),
      (this.optionC = this.data[0].subCat[0].items.map((t) => t)),
      (this.selectedOptionC = [0]),
      (this.selectedProducts = [this.data[0].subCat[0].items[0]]);
  },
  optionA: [],
  optionB: [],
  optionC: [],
  selectedOptionA: 0,
  selectedOptionB: 0,
  selectedOptionC: [],
  selectedProducts: [],
  reloadData() {
    const t =
        this.data[this.selectedOptionA].subCat ??
        this.data[this.selectedOptionA].items,
      e = this.data[this.selectedOptionA]?.subCat
        ? this.data[this.selectedOptionA].subCat[this.selectedOptionB].items
        : [];
    setTimeout(() => {
      (this.optionB = t.map((i) => i.title ?? i)),
        (this.optionC = e.length ? e.map((i) => i) : null);
    }, 60);
  },
  resetOptionB() {
    (this.selectedOptionB = 0),
      (this.selectedOptionC = []),
      parseInt(this.selectedOptionA) !== 3 &&
        (setTimeout(() => {
          document
            .querySelectorAll('input[name="checkToggle"]')
            .forEach((i) => (i.checked = !1)),
            (this.selectedOptionC = [0]),
            this.pushProducts();
        }, 120),
        [...document.querySelectorAll('input[name="optionB"]')].forEach(
          (i, l) => {
            l === 0 ? (i.checked = !0) : (i.checked = !1);
          }
        ),
        [...document.querySelectorAll('input[name="optionC"]')].forEach(
          (i, l) => {
            l === 0 ? (i.checked = !0) : (i.checked = !1);
          }
        ));
  },
  resetOptionC() {
    (this.selectedOptionC = []),
      setTimeout(() => {
        document
          .querySelectorAll('input[name="checkToggle"]')
          .forEach((t) => (t.checked = !1)),
          (this.selectedOptionC = [0]),
          this.pushProducts();
      }, 120);
  },
  pushProducts(t = this.selectedOptionC) {
    const e =
      this.data[this.selectedOptionA].subCat[this.selectedOptionB].items;
    this.selectedProducts = this.selectedOptionC.map((i) => e[i]);
  },
  removeProduct(t) {
    this.selectedProducts.splice(t, 1),
      this.selectedOptionC.splice(t, 1),
      document
        .querySelectorAll('input[name="checkToggle"]')
        .forEach((e) => (e.checked = !1));
  },
  showPopup(t) {
    const e = document.querySelector('.js-popup');
    e._x_dataStack[0].getContent(t),
      setTimeout(() => {
        e._x_dataStack[0].showpopup = !0;
      }, 120);
  },
  toggleCheckAll() {
    document
      .querySelectorAll('input[name="checkToggle"]')
      .forEach((e) => (e.checked = !1));
  },
  checkAll() {
    const t = document.querySelectorAll('input[name="optionC[]"]');
    (this.selectedOptionC = [...t].map((e) => e.value)), this.pushProducts();
  },
  uncheckAll() {
    document
      .querySelectorAll('input[name="optionC[]"]:checked')
      .forEach((e) => (e.checked = !1)),
      (this.selectedOptionC = []),
      (this.selectedProducts = []);
  }
}));
const d = [
  {
    title: '油性オフセット',
    subCat: [
      {
        title: '環境対応製品',
        items: [
          'スーパーユポダブル［ユポグリーンシリーズ］',
          'スーパーユポ®［ユポグリーンシリーズ］',
          'ウルトラユポ®［ユポグリーンシリーズ］'
        ]
      },
      {
        title: '一般品',
        items: [
          'ニューユポ',
          'ウルトラユポ®［ユポグリーンシリーズ］',
          'スーパーユポ®［ユポグリーンシリーズ］',
          'スーパーユポダブル［ユポグリーンシリーズ］',
          'ユポ®イッパン'
        ]
      },
      { title: '高光沢品', items: ['ユポ®ハイグロス'] },
      {
        title: '半透明品',
        items: ['ユポトレース®', 'ユポ®電飾用紙［ユポグリーンシリーズ］']
      },
      {
        title: '厚手品',
        items: ['アルファユポ®［一般品］', 'アルファユポ®［半透明］']
      },
      { title: '吸着品', items: ['ユポ®・サクションタック®', 'ユポ静電吸着®'] },
      {
        title: 'コート品',
        items: [
          '印字用ユポコート［片面コート］',
          '印字用ユポコート［両面コート］',
          'ユポ®カーボンレス'
        ]
      },
      {
        title: '貼合品',
        items: [
          'クロスユポ®［ダブル］',
          'メタリックユポ',
          'ハイティアーユポ®',
          'コンシールユポ®'
        ]
      }
    ]
  },
  {
    title: 'UVオフセット',
    subCat: [
      {
        title: '環境対応製品',
        items: [
          'ユポエアー',
          'ウルトラユポ®［ユポグリーンシリーズ］',
          'ユポタック®原紙［ユポグリーンシリーズ］',
          'アクアユポ®[ユポグリーンシリーズ]'
        ]
      },
      {
        title: '一般品',
        items: [
          'ウルトラユポ®［ユポグリーンシリーズ］',
          'ニューユポ',
          'ユポ®デジタル印刷用紙［HP Indigo／プロダクションプリンター用］'
        ]
      },
      { title: '高光沢品', items: ['ユポ®ハイグロス'] },
      {
        title: '半透明品',
        items: ['ユポトレース®', 'ユポ®電飾用紙［ユポグリーンシリーズ］']
      },
      {
        title: '厚手品',
        items: ['アルファユポ®［一般品］', 'アルファユポ®［半透明］']
      },
      {
        title: 'ラベル用',
        items: [
          'ユポエアー',
          'ユポタック®原紙',
          'ユポタック®原紙［ユポグリーンシリーズ］',
          'ユポタック®原紙［熱転写印字対応］',
          'ユポタック®原紙［高機能品］',
          '易剥離ユポ',
          '易破壊ユポ',
          'アクアユポ®[ユポグリーンシリーズ]',
          'ユポ®インモールドラベル［ブロー/インジェクション成形用］',
          'ユポ®インモールドラベル［インジェクション成形用］'
        ]
      },
      {
        title: '吸着品',
        items: [
          'ユポ®・サクションタック®・アウトドア',
          'ユポ®透明吸着',
          'ユポ静電吸着®',
          'ユポ静電吸着®［透明タイプ］'
        ]
      },
      { title: '貼合品', items: ['コンシールユポ®'] }
    ]
  },
  {
    title: 'デジタル印刷',
    subCat: [
      {
        title: '環境対応製品',
        items: ['ユポ®電飾用紙［ユポグリーンシリーズ］']
      },
      {
        title: '一般品',
        items: [
          'ユポ®デジタル印刷用紙［HP Indigo／プロダクションプリンター用］',
          'ユポ®デジタル印刷用紙［HP Indigo用／厚手品］',
          'ユポ®デジタル印刷用紙［UVインクジェット用］',
          'ユポジェット®［インクジェット用］'
        ]
      },
      { title: '高光沢品', items: ['ユポ®電飾用紙［ユポグリーンシリーズ］'] },
      { title: 'ラベル用', items: ['ユポタック®原紙［高機能品］'] },
      {
        title: '吸着品',
        items: [
          'ユポ®・サクションタック®［インクジェット用］',
          'ユポ®・サクションタック®［UVインクジェット用］',
          'ユポ®・サクションタック®［HP Indigo用］',
          'ユポ®透明吸着',
          'ユポ静電吸着®［UVオフセット・UVインクジェット印刷用］',
          'ユポ静電吸着®［HP Indigo用］'
        ]
      }
    ]
  },
  {
    title: 'その他',
    items: [
      'スクリーン印刷',
      'UVシール印刷',
      'グラビア印刷',
      'フレキソ印刷',
      'ビジネスフォーム印刷',
      '枚葉活版印刷',
      '非対応印刷方式'
    ]
  }
];
c.data('products_sp', () => ({
  data: d,
  selectedOptionA: 0,
  selectedOptionB: 0,
  selectedOptionC: [],
  selectedProducts: [],
  pushProducts(t) {
    this.selectedOptionC.includes(t)
      ? this.selectedOptionC.splice(this.selectedOptionC.indexOf(t), 1)
      : this.selectedOptionC.push(t),
      (this.selectedProducts = this.data[this.selectedOptionA].subCat[
        this.selectedOptionB
      ].items.filter((e) => this.selectedOptionC.indexOf(e) > -1));
  },
  removeProduct(t) {
    const e = this.selectedProducts.indexOf(t);
    document.querySelectorAll('input[value="' + t + '"]').forEach((l) => {
      (l.checked = !1),
        setTimeout(() => {
          l.dispatchEvent(new CustomEvent('change'));
        }, 120);
    }),
      this.selectedProducts.splice(e, 1),
      this.selectedOptionC.splice(e, 1),
      document
        .querySelectorAll('input[name="checkToggleSP"]')
        .forEach((l) => (l.checked = !1));
  },
  resetInputs(t) {
    t.querySelectorAll('input').forEach((e) => (e.checked = !1)),
      (this.selectedOptionC = []);
  },
  setActiveInput(t) {
    const i = t.parentElement.querySelector('input');
    setTimeout(() => {
      (i.checked = !0), i.dispatchEvent(new CustomEvent('change'));
    }, 120);
  },
  showPopup(t) {
    const e = document.querySelector('.js-popup');
    e._x_dataStack[0].getContent(t),
      setTimeout(() => {
        e._x_dataStack[0].showpopup = !0;
      }, 120);
  },
  toggleCheckAll() {
    document
      .querySelectorAll('input[name="checkToggleSP"]')
      .forEach((e) => (e.checked = !1));
  },
  checkAll(t) {
    const i = t.closest('div').querySelectorAll('input[name="optionC_sp[]"]');
    i.forEach((l) => (l.checked = !0)),
      (this.selectedOptionC = [...i].map((l) => l.value)),
      this.pushProducts();
  },
  uncheckAll() {
    document
      .querySelectorAll('input[name="optionC_sp[]"]:checked')
      .forEach((e) => (e.checked = !1)),
      (this.selectedOptionC = []),
      (this.selectedProducts = []);
  },
  closeOtherBlocks(t, e) {
    [...e.querySelectorAll(':scope > div')]
      .filter((l) => l !== t)
      .forEach((l) => {
        l.querySelectorAll('input').forEach((s) => (s.checked = !1)),
          l
            .querySelectorAll('div[x-data]')
            .forEach((s) => (s._x_dataStack[0].open = !1)),
          (l._x_dataStack[0].open = !1),
          (this.selectedOptionC = []),
          this.pushProducts();
      });
  }
}));
