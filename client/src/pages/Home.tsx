import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, ChevronDown, ExternalLink, Menu, Moon, Settings2, ShieldAlert, Sparkles, Star, Sun, X } from "lucide-react";

const SEO_TITLE = "أفضل أنواع الدخان للبالغين | مقارنة واختيار واعٍ";
const buttonDefaults = {
  primary: { label: "ابدأ المقارنة", href: "#compare", color: "#d7a66a" },
  secondary: { label: "تعرّف على الأنواع", href: "#types", color: "#20324d" },
};

const types = [
  { icon: "01", title: "السجائر التقليدية", tag: "احتراق مباشر", text: "ملف نكهة مألوف وإيقاع سريع، لكن الدخان الناتج عن الاحتراق يغيّر تجربة الاستخدام ومخاطرها.", tone: "قوي", time: "قصيرة" },
  { icon: "02", title: "التبغ المُسخّن", tag: "بدون احتراق مباشر", text: "يسخّن تبغًا حقيقيًا بدل حرقه. قد يختلف الإحساس والرائحة، لكنه ليس منتجًا آمنًا ولا وسيلة مثبتة للإقلاع.", tone: "متوسط", time: "قصيرة" },
  { icon: "03", title: "معسل الشيشة", tag: "نكهة وجلسة", text: "اختيار اجتماعي بنكهة واضحة ووقت أطول. الماء لا يجعل الدخان آمنًا، والفحم يضيف ملوّثات خاصة.", tone: "متدرّج", time: "طويلة" },
  { icon: "04", title: "السيجار والغليون", tag: "طقس بطيء", text: "تجربة تعتمد على الرائحة وطبقات النكهة والوقت. ليست أقل ضررًا لمجرد أن الدخان لا يُستنشق دائمًا.", tone: "عميق", time: "طويلة" },
];

const flavors = [
  { title: "تبغ مُحمّص", note: "جاف · خشبي · دافئ", color: "#a97145" },
  { title: "نعناع بارد", note: "منعش · خفيف · واضح", color: "#659b83" },
  { title: "فاكهة ناضجة", note: "حلو · عطري · اجتماعي", color: "#c76d58" },
  { title: "توابل شرقية", note: "عميق · عطري · طويل", color: "#c89a52" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [buttons, setButtons] = useState(buttonDefaults);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = SEO_TITLE;
    const storedButtons = localStorage.getItem("mizaj-buttons");
    const storedRatings = localStorage.getItem("mizaj-ratings");
    if (storedButtons) setButtons(JSON.parse(storedButtons));
    if (storedRatings) setRatings(JSON.parse(storedRatings));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  const averageRating = useMemo(() => {
    const values = Object.values(ratings);
    return values.length ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1) : "—";
  }, [ratings]);

  const ratedCount = Object.keys(ratings).length;

  const saveButtons = (next: typeof buttons) => {
    setButtons(next);
    localStorage.setItem("mizaj-buttons", JSON.stringify(next));
  };

  const rate = (name: string, value: number) => {
    const next = { ...ratings, [name]: value };
    setRatings(next);
    localStorage.setItem("mizaj-ratings", JSON.stringify(next));
  };

  return (
    <div className="site-shell">
      <div className="adult-strip"><ShieldAlert size={15} /> هذا الدليل للبالغين فقط. لا يوجد منتج تبغ آمن، والمقارنة هنا وصفية وليست توصية صحية.</div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="مَزاج الصفحة الرئيسية"><span className="brand-mark">م</span><span><b>مَزاج</b><small>دليل الدخان والتبغ</small></span></a>
        <nav className={menuOpen ? "main-nav open" : "main-nav"}>
          <a href="#types" onClick={() => setMenuOpen(false)}>الأنواع</a>
          <a href="#compare" onClick={() => setMenuOpen(false)}>المقارنة</a>
          <a href="#flavors" onClick={() => setMenuOpen(false)}>النكهات</a>
          <a href="#safety" onClick={() => setMenuOpen(false)}>سلامتك أولًا</a>
        </nav>
        <div className="header-actions"><button className="icon-button" onClick={() => setDark(!dark)} aria-label="تبديل الوضع">{dark ? <Sun size={18} /> : <Moon size={18} />}</button><button className="customize-trigger" onClick={() => setCustomizerOpen(true)}><Settings2 size={16} /> تخصيص الأزرار</button><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="القائمة">{menuOpen ? <X /> : <Menu />}</button></div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy"><div className="eyebrow"><Sparkles size={15} /> اختيارات محرّرة · 2026</div><h1>اختَر الدخان<br /><em>على ذوقك،</em><br />لا على الضجيج.</h1><p className="hero-lead">دليل عربي هادئ لفهم الفرق بين الأنواع، النكهات، وطقوس الاستخدام — مع مقارنة صريحة لا تخلط بين «الأفضل للتجربة» و«الأفضل للصحة».</p><div className="hero-actions"><a className="site-button primary" style={{ backgroundColor: buttons.primary.color }} href={buttons.primary.href}>{buttons.primary.label}<ArrowLeft size={17} /></a><a className="site-button secondary" style={{ backgroundColor: buttons.secondary.color }} href={buttons.secondary.href}>{buttons.secondary.label}</a></div><div className="hero-proof"><span><b>4</b><small>فئات رئيسية</small></span><span><b>12</b><small>محور مقارنة</small></span><span><b>{averageRating}</b><small>متوسط القرّاء</small></span></div></div>
          <div className="hero-visual"><div className="glow-orb" /><div className="tobacco-pouch"><span className="pouch-seal">MZ</span><b>مَزاج</b><small>اختيارك يبدأ بالفهم</small><i>دليل التبغ</i></div><div className="smoke-line smoke-one" /><div className="smoke-line smoke-two" /><div className="visual-caption"><span>01</span><p>النكهة<br /><b>ليست معيار الأمان</b></p></div></div>
        </section>

        <section className="notice-card"><ShieldAlert size={24} /><div><b>ملاحظة قبل الاختيار</b><p>وفق منظمة الصحة العالمية، كل أشكال استخدام التبغ ضارة ولا يوجد مستوى تعرّض آمن. إن كنت لا تستخدم التبغ، فلا تبدأ. وإن كنت تفكر في الإقلاع، فاستشر خدمة صحية موثوقة.</p></div><a href="#safety">اقرأ التنبيه الكامل <ArrowLeft size={16} /></a></section>

        <section className="section-block" id="types"><div className="section-heading"><div><span className="kicker">01 / افهم المشهد</span><h2>أربعة عوالم،<br /><em>أربع تجارب مختلفة.</em></h2></div><p>لا نضع ترتيبًا مطلقًا للمنتجات؛ نرسم خريطة تساعدك على فهم الملف الحسي، الوقت، وطريقة الاستخدام قبل أي قرار.</p></div><div className="type-grid">{types.map((item) => <article className="type-card" key={item.title}><div className="type-top"><span className="number-badge">{item.icon}</span><span className="type-tag">{item.tag}</span></div><h3>{item.title}</h3><p>{item.text}</p><div className="type-meta"><span><small>الطابع</small><b>{item.tone}</b></span><span><small>الإيقاع</small><b>{item.time}</b></span></div><a href="#compare">تفاصيل المقارنة <ArrowLeft size={15} /></a></article>)}</div></section>

        <section className="comparison-section" id="compare"><div className="section-heading compact"><div><span className="kicker">02 / قارن بذكاء</span><h2>مصفوفة الاختيار<br /><em>من دون ادعاءات.</em></h2></div><span className="editorial-stamp">اختيار تحريري<br /><b>لا تصنيف صحي</b></span></div><div className="comparison-table"><div className="comparison-head"><span>الفئة</span><span>النكهة</span><span>الوقت</span><span>الرماد / الدخان</span></div>{types.map((item, i) => <div className="comparison-row" key={item.title}><div><b>0{i + 1}</b><strong>{item.title}</strong></div><span>{i === 0 ? "مباشرة" : i === 1 ? "أنظف رائحة" : i === 2 ? "واسعة" : "طبقية"}</span><span>{item.time}</span><span className={i === 1 ? "muted-value" : ""}>{i === 1 ? "أقل رمادًا" : i === 2 ? "كثيف" : "مرتفع"}</span></div>)}</div></section>

        <section className="section-block flavor-section" id="flavors"><div className="section-heading"><div><span className="kicker">03 / مزاجك أولًا</span><h2>نكهات يصفها<br /><em>الذوق لا الدعاية.</em></h2></div><p>قيّم النكهات لتظهر لنا خريطة تفضيلات المجتمع. التقييم شخصي ولا يعني أن المنتج أقل ضررًا.</p></div><div className="flavor-toolbar"><div className="flavor-summary"><span className="summary-orb"><Star size={18} fill="currentColor" /></span><span><b>{averageRating}</b><small>متوسط تقييماتك</small></span></div><div className="flavor-progress"><span><b>{ratedCount}</b> من {flavors.length} نكهات مقيمة</span><div><i style={{ width: `${(ratedCount / flavors.length) * 100}%` }} /></div></div><span className="touch-hint">اضغط على نجمة للتقييم</span></div><div className="flavor-grid">{flavors.map((flavor) => { const currentRating = ratings[flavor.title] || 0; return <article className={currentRating ? "flavor-card is-rated" : "flavor-card"} key={flavor.title}><div className="flavor-swatch" style={{ background: flavor.color }}><span>{flavor.title.slice(0, 1)}</span></div><div className="flavor-info"><div className="flavor-card-head"><div><h3>{flavor.title}</h3><p>{flavor.note}</p></div>{currentRating > 0 && <span className="rated-pill"><Check size={12} /> {currentRating}/5</span>}</div><div className="rating" aria-label={`قيّم ${flavor.title} من 1 إلى 5 نجوم`}>{[1, 2, 3, 4, 5].map((n) => <button key={n} type="button" className={n <= currentRating ? "active" : ""} aria-label={`${n} نجوم`} aria-pressed={n === currentRating} onClick={() => rate(flavor.title, n)}><Star size={19} fill="currentColor" /></button>)}</div><span className="rating-label">{currentRating ? `قيّمتها بـ ${currentRating} من 5` : "لم تقيّم هذه النكهة بعد"}</span></div></article>; })}</div><div className="flavor-footnote"><ShieldAlert size={15} /> التقييم يعبّر عن الذوق والرائحة فقط، ولا يقيس السلامة أو الضرر الصحي.</div></section>

        <section className="safety-section" id="safety"><div className="safety-copy"><span className="kicker">04 / بلا مواربة</span><h2>التجربة قد تكون شخصية،<br /><em>لكن الضرر ليس تفصيلًا.</em></h2><p>التبغ يحتوي على النيكوتين المسبب للاعتماد. التبغ المسخن ليس آمنًا، والشيشة ليست بديلًا آمنًا للسجائر، كما أن «العشبي» أو المنكّه لا يعني تلقائيًا خلو الدخان من المواد الضارة.</p><a className="text-link" href="https://www.who.int/news-room/fact-sheets/detail/tobacco" target="_blank" rel="noreferrer">المصدر: منظمة الصحة العالمية <ExternalLink size={14} /></a></div><div className="safety-points"><div><b>01</b><span>لا تبدأ إذا لم تكن مستخدمًا للتبغ.</span></div><div><b>02</b><span>أبعد الدخان عن الأطفال والحوامل وغير المستخدمين.</span></div><div><b>03</b><span>اطلب مساعدة مختص إذا رغبت في الإقلاع.</span></div></div></section>

        <section className="faq-section"><div className="section-heading compact"><div><span className="kicker">أسئلة شائعة</span><h2>قبل أن تكمل<br /><em>اختيارك.</em></h2></div></div><div className="faq-list">{[{ q: "هل يوجد نوع دخان أكثر أمانًا؟", a: "لا. الجهات الصحية تؤكد أن جميع أشكال استخدام التبغ ضارة، ولا ينبغي تحويل مقارنة النكهة أو الرائحة إلى ادعاء صحي." }, { q: "هل التبغ المسخن هو نفسه السيجارة الإلكترونية؟", a: "لا. التبغ المسخن يسخّن تبغًا حقيقيًا، بينما السيجارة الإلكترونية تسخّن سائلًا. كلاهما ليس خاليًا من المخاطر." }, { q: "هل الماء يفلتر دخان الشيشة؟", a: "لا. الماء لا يزيل المواد الضارة من الدخان، وقد يضيف الفحم تعرضًا لأول أكسيد الكربون ومواد أخرى." }].map((faq, i) => <div className={openFaq === i ? "faq-item open" : "faq-item"} key={faq.q}><button onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{faq.q}</span><ChevronDown size={18} /></button>{openFaq === i && <p>{faq.a}</p>}</div>)}</div></section>
      </main>

      <footer className="site-footer"><div><a className="brand" href="#top"><span className="brand-mark">م</span><span><b>مَزاج</b><small>دليل الدخان والتبغ</small></span></a><p>محتوى تحريري للبالغين، لا يقدّم توصيات صحية ولا يدّعي أن منتجًا آمن.</p></div><div className="footer-links"><a href="https://www.who.int/news-room/fact-sheets/detail/tobacco" target="_blank" rel="noreferrer">WHO Tobacco <ExternalLink size={13} /></a><a href="https://www.cdc.gov/tobacco/other-tobacco-products/hookahs.html" target="_blank" rel="noreferrer">CDC Hookahs <ExternalLink size={13} /></a></div><span>© 2026 مَزاج</span></footer>

      {customizerOpen && <div className="modal-backdrop" onClick={() => setCustomizerOpen(false)}><aside className="customizer-panel" onClick={(e) => e.stopPropagation()}><div className="panel-head"><div><span className="kicker">لوحة التحكم</span><h2>خصّص أزرارك</h2></div><button className="icon-button" onClick={() => setCustomizerOpen(false)}><X size={18} /></button></div><p>غيّر النص والرابط واللون، ثم شاهد النتيجة مباشرة.</p>{(["primary", "secondary"] as const).map((key) => <div className="control-group" key={key}><label>{key === "primary" ? "الزر الرئيسي" : "الزر الثانوي"}</label><input value={buttons[key].label} onChange={(e) => saveButtons({ ...buttons, [key]: { ...buttons[key], label: e.target.value } })} /><input value={buttons[key].href} onChange={(e) => saveButtons({ ...buttons, [key]: { ...buttons[key], href: e.target.value } })} /><div className="color-control"><input type="color" value={buttons[key].color} onChange={(e) => saveButtons({ ...buttons, [key]: { ...buttons[key], color: e.target.value } })} /><span>{buttons[key].color}</span></div></div>)}<div className="live-preview"><span>معاينة</span><a className="site-button primary" style={{ backgroundColor: buttons.primary.color }} href="#">{buttons.primary.label}<Check size={16} /></a></div></aside></div>}
    </div>
  );
}
