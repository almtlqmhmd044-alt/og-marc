import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  BookOpen,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  ExternalLink,
  Flame,
  Menu,
  Moon,
  Palette,
  RotateCcw,
  Search,
  Settings2,
  Sparkles,
  Star,
  X,
} from "lucide-react";

type ButtonConfig = {
  label: string;
  href: string;
  color: string;
};

type ButtonKey = "primary" | "secondary" | "newsletter";

const defaultButtons: Record<ButtonKey, ButtonConfig> = {
  primary: { label: "ابدأ من هنا", href: "#guides", color: "#d18452" },
  secondary: { label: "استكشف المقارنات", href: "#comparisons", color: "#e7b97d" },
  newsletter: { label: "سجّل اهتمامك", href: "#newsletter", color: "#d18452" },
};

const articles = [
  {
    category: "دليل المبتدئين",
    title: "كيف تختار أركيلة أولى بدون ما تتوه بين التفاصيل؟",
    excerpt: "من حجم القاعدة إلى نوع العمود، هذه خريطة بسيطة تساعدك على بداية هادئة وذكية.",
    time: "6 دقائق قراءة",
    accent: "sand",
    number: "01",
  },
  {
    category: "نكهات وتجارب",
    title: "خلطات شيشة متوازنة: 5 تركيبات تستحق التجربة",
    excerpt: "وصفات ناعمة، منعشة، وثقيلة قليلًا مع ملاحظات تساعدك على ضبط النكهة.",
    time: "4 دقائق قراءة",
    accent: "copper",
    number: "02",
  },
  {
    category: "العناية والتنظيف",
    title: "روتين 10 دقائق يحافظ على صفاء الجلسة",
    excerpt: "خطوات قصيرة بعد كل استخدام لتنظيف الزجاجة والخرطوم والحجر من دون تعقيد.",
    time: "5 دقائق قراءة",
    accent: "olive",
    number: "03",
  },
];

const comparisons = [
  { name: "أركيلة سفر خفيفة", type: "للجلسات السريعة", rating: "4.8", detail: "حجم صغير • تنظيف أسرع", badge: "الأكثر مرونة" },
  { name: "أركيلة زجاجية أنيقة", type: "للبيت والضيوف", rating: "4.7", detail: "ثبات ممتاز • حضور بصري", badge: "اختيار المحررين" },
  { name: "رأس فخار كلاسيكي", type: "لنكهة أعمق", rating: "4.6", detail: "توزيع حرارة • تحكم أكبر", badge: "للهواة" },
];

const flavors = [
  { id: "mint", name: "نعناع بارد", family: "منعشة", note: "بداية نظيفة ونهاية باردة", rating: 4.8, votes: 128, color: "mint" },
  { id: "double-apple", name: "تفاحتين كلاسيك", family: "شرقية", note: "حلوة، عميقة، ومألوفة", rating: 4.6, votes: 96, color: "apple" },
  { id: "grape", name: "عنب وتوت", family: "فواكه", note: "فاكهية ناعمة مع لمسة حامضة", rating: 4.7, votes: 84, color: "grape" },
  { id: "lemon", name: "ليمون ونعناع", family: "منعشة", note: "خفيفة ومناسبة للجلسات الطويلة", rating: 4.5, votes: 72, color: "lemon" },
];

const faqs = [
  ["ما الفرق بين الأركيلة التقليدية والحديثة؟", "التقليدية تركّز على الخشب والمعدن وإحساس الجلسة الكلاسيكية، بينما الحديثة تستخدم الزجاج والفولاذ المقاوم للصدأ لسهولة التنظيف والتحكم."],
  ["كيف أختار نكهة شيشة مناسبة؟", "ابدأ بنكهة منفردة تعرفها، ثم جرّب خلطات من عائلتين متقاربتين مثل الفواكه والنعناع. لا تكثر المكونات في التجربة الأولى."],
  ["كم مرة يجب تنظيف الأركيلة؟", "يفضّل شطف الأجزاء بعد كل جلسة وتنظيفًا أعمق مرة أسبوعيًا عند الاستخدام المتكرر، مع تجفيف القطع قبل التخزين."],
  ["هل الحجم الأكبر يعني سحبة أفضل؟", "ليس بالضرورة. جودة الإغلاق وتدفق الهواء ونظافة الخرطوم أهم من الارتفاع وحده، لذلك اختر الحجم الذي يناسب استخدامك."],
];

function AppButton({ config, variant = "filled", onClick }: { config: ButtonConfig; variant?: "filled" | "outline"; onClick?: () => void }) {
  return (
    <a
      href={config.href}
      onClick={onClick}
      className={`site-button ${variant === "outline" ? "site-button--outline" : ""}`}
      style={variant === "filled" ? { backgroundColor: config.color, borderColor: config.color } : { color: config.color, borderColor: `${config.color}70` }}
    >
      {config.label}
      <ArrowUpLeft size={16} strokeWidth={2.2} />
    </a>
  );
}

function ArtTile({ accent, number }: { accent: string; number: string }) {
  return (
    <div className={`art-tile art-tile--${accent}`} aria-hidden="true">
      <span className="art-number">{number}</span>
      <div className="hookah-art">
        <div className="hookah-smoke smoke-one" />
        <div className="hookah-smoke smoke-two" />
        <div className="hookah-bowl" />
        <div className="hookah-stem" />
        <div className="hookah-base" />
        <div className="hookah-hose" />
      </div>
      <span className="art-orbit orbit-one" />
      <span className="art-orbit orbit-two" />
    </div>
  );
}

export default function Home() {
  const [buttons, setButtons] = useState<Record<ButtonKey, ButtonConfig>>(defaultButtons);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [activeButton, setActiveButton] = useState<ButtonKey>("primary");
  const [openFaq, setOpenFaq] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userRatings, setUserRatings] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem("nafas-button-config");
    if (saved) {
      try {
        setButtons({ ...defaultButtons, ...JSON.parse(saved) });
      } catch {
        localStorage.removeItem("nafas-button-config");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("nafas-button-config", JSON.stringify(buttons));
  }, [buttons]);

  useEffect(() => {
    const saved = localStorage.getItem("nafas-flavor-ratings");
    if (saved) {
      try {
        setUserRatings(JSON.parse(saved));
      } catch {
        localStorage.removeItem("nafas-flavor-ratings");
      }
    }
  }, []);

  const currentButton = buttons[activeButton];
  const buttonLabel = useMemo(() => ({ primary: "الزر الرئيسي", secondary: "زر المقارنات", newsletter: "زر النشرة" }[activeButton]), [activeButton]);

  function updateCurrent(field: keyof ButtonConfig, value: string) {
    setButtons((current) => ({ ...current, [activeButton]: { ...current[activeButton], [field]: value } }));
  }

  function resetButtons() {
    setButtons(defaultButtons);
  }

  function rateFlavor(flavorId: string, rating: number) {
    setUserRatings((current) => {
      const next = { ...current, [flavorId]: rating };
      localStorage.setItem("nafas-flavor-ratings", JSON.stringify(next));
      return next;
    });
  }

  return (
    <div className="site-shell" dir="rtl">
      <div className="topline"><span>محتوى هادئ، اختيارات أذكى</span><span>آخر تحديث: نوفمبر 2026</span></div>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="نَفَس، الصفحة الرئيسية">
          <span className="brand-mark"><Moon size={18} fill="currentColor" /></span>
          <span><strong>نَفَس</strong><small>دليل الأراكيل والشيشة</small></span>
        </a>
        <nav className={`main-nav ${mobileOpen ? "is-open" : ""}`}>
          <a href="#guides" onClick={() => setMobileOpen(false)}>الأدلة</a>
          <a href="#comparisons" onClick={() => setMobileOpen(false)}>المقارنات</a>
          <a href="#flavors" onClick={() => setMobileOpen(false)}>النكهات</a>
          <a href="#tips" onClick={() => setMobileOpen(false)}>نصائح سريعة</a>
          <a href="#faq" onClick={() => setMobileOpen(false)}>الأسئلة الشائعة</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button" aria-label="بحث"><Search size={18} /></button>
          <button className="customize-trigger" onClick={() => setCustomizerOpen(true)}><Settings2 size={15} /> تخصيص الأزرار</button>
          <button className="mobile-toggle" onClick={() => setMobileOpen((open) => !open)} aria-label="فتح القائمة">{mobileOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section container">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> مساحة للذوق الهادئ</div>
            <h1>خذ نفسًا…<br /><em>واختَر على مهل.</em></h1>
            <p className="hero-lead">دليلك العربي للأراكيل والشيشة. مراجعات بسيطة، مقارنات صادقة، وتفاصيل صغيرة تصنع جلسة أجمل.</p>
            <div className="hero-actions">
              <AppButton config={buttons.primary} />
              <AppButton config={buttons.secondary} variant="outline" />
            </div>
            <div className="hero-note"><Check size={15} /> محتوى مستقل بلا مبالغة في الوعود</div>
          </div>
          <div className="hero-visual">
            <div className="visual-label label-top">01 / بداية ناعمة</div>
            <div className="hero-art">
              <div className="hero-glow" />
              <div className="hero-smoke smoke-a" /><div className="hero-smoke smoke-b" /><div className="hero-smoke smoke-c" />
              <div className="hero-hookah">
                <div className="hero-bowl"><span /></div>
                <div className="hero-neck" />
                <div className="hero-base"><i /><b /></div>
                <div className="hero-hose" />
              </div>
              <div className="hero-stamp"><span>مختارات</span><strong>نَفَس</strong><small>منذ ٢٠٢٦</small></div>
            </div>
            <div className="visual-label label-bottom"><span>دفء</span><span>ذوق</span><span>تجربة</span></div>
          </div>
        </section>

        <section className="signal-strip">
          <div className="container signal-grid">
            <div><strong>12</strong><span>دليلًا عمليًا</span></div><div><strong>08</strong><span>مقارنات مختصرة</span></div><div><strong>24</strong><span>نصيحة مجرّبة</span></div><div className="signal-quote">«الجلسة الحلوة تبدأ باختيار يعرف سببه»</div>
          </div>
        </section>

        <section className="content-section container" id="guides">
          <div className="section-heading"><div><span className="section-kicker">مختارات المحررين</span><h2>أدلة تبدأ معك من الصفر</h2></div><a className="text-link" href="#guides">كل الأدلة <ArrowLeft size={17} /></a></div>
          <div className="article-grid">
            {articles.map((article) => <article className="article-card" key={article.number}><ArtTile accent={article.accent} number={article.number} /><div className="article-body"><div className="card-meta"><span>{article.category}</span><span><Clock3 size={14} />{article.time}</span></div><h3>{article.title}</h3><p>{article.excerpt}</p><a href="#faq" className="read-link">اقرأ الدليل <ArrowUpLeft size={16} /></a></div></article>)}
          </div>
        </section>

        <section className="comparison-section" id="comparisons">
          <div className="container comparison-layout">
            <div className="comparison-intro"><span className="section-kicker">دليل الشراء الهادئ</span><h2>قارن قبل أن<br /><em>تختار.</em></h2><p>لا نبحث عن الأكثر لمعانًا، بل عن الأنسب لروتينك وذوقك وميزانيتك.</p><AppButton config={buttons.secondary} /></div>
            <div className="comparison-list">{comparisons.map((item, index) => <div className="comparison-row" key={item.name}><div className="row-index">0{index + 1}</div><div className={`mini-art mini-art--${index}`}><div className="mini-base" /><div className="mini-stem" /><div className="mini-bowl" /></div><div className="comparison-main"><span className="comparison-badge">{item.badge}</span><h3>{item.name}</h3><p>{item.type} <span>·</span> {item.detail}</p></div><div className="rating"><Star size={15} fill="currentColor" /><strong>{item.rating}</strong><small>تقييم نَفَس</small></div><ArrowLeft className="row-arrow" size={18} /></div>)}</div>
          </div>
        </section>

        <section className="flavors-section container" id="flavors">
          <div className="section-heading"><div><span className="section-kicker">دليل النكهات</span><h2>معسل يستحق التجربة</h2></div><span className="heading-aside">قيّم نكهتك المفضلة</span></div>
          <div className="flavors-intro"><p>من البارد والمنعش إلى الشرقي العميق، اختر نكهة وشارك ذوقك مع بقية محبي الجلسات الهادئة.</p><div className="rating-legend"><Star size={15} fill="currentColor" /> التقييمات من مجتمع نَفَس</div></div>
          <div className="flavors-grid">{flavors.map((flavor) => { const selectedRating = userRatings[flavor.id]; const displayRating = selectedRating ? Math.min(5, (flavor.rating + selectedRating / 20)).toFixed(1) : flavor.rating.toFixed(1); return <article className={`flavor-card flavor-card--${flavor.color}`} key={flavor.id}><div className="flavor-orb"><span>{flavor.name.slice(0, 1)}</span></div><div className="flavor-card-copy"><div className="flavor-meta"><span>{flavor.family}</span><span>{flavor.votes + (selectedRating ? 1 : 0)} تقييم</span></div><h3>{flavor.name}</h3><p>{flavor.note}</p><div className="flavor-rating"><div className="stars" aria-label={`تقييم ${displayRating} من 5`}>{[1, 2, 3, 4, 5].map((star) => <button className={star <= Math.round(Number(displayRating)) ? "is-filled" : ""} key={star} onClick={() => rateFlavor(flavor.id, star)} aria-label={`قيّم ${star} نجوم`}><Star size={16} fill="currentColor" /></button>)}</div><strong>{displayRating}</strong></div>{selectedRating ? <span className="rated-note"><Check size={13} /> قيّمت هذه النكهة بـ {selectedRating}/5</span> : <span className="rate-hint">اضغط على النجوم للتقييم</span>}</div></article> })}</div>
        </section>

        <section className="tips-section container" id="tips">
          <div className="section-heading"><div><span className="section-kicker">خذها معك</span><h2>ثلاثة أشياء تغيّر الجلسة</h2></div><span className="heading-aside">نصيحة قصيرة، فرق كبير</span></div>
          <div className="tips-grid"><div className="tip-card tip-card--dark"><Flame size={22} /><span>01</span><h3>لا تملأ الرأس زيادة</h3><p>اترك مسافة صغيرة بين المعسل والقصدير حتى تتنفس النكهة ولا تحترق بسرعة.</p></div><div className="tip-card"><Sparkles size={22} /><span>02</span><h3>الماء ليس للزينة</h3><p>ارتفاع الماء المناسب يخفف السحبة ويحافظ على انسيابية التجربة، لا تغمر الأنبوب كاملًا.</p></div><div className="tip-card"><BookOpen size={22} /><span>03</span><h3>النظافة تصنع الفرق</h3><p>الرائحة القديمة تختفي عندما تشطف القاعدة والخرطوم مباشرة بعد نهاية كل جلسة.</p></div></div>
        </section>

        <section className="faq-section container" id="faq"><div className="faq-intro"><span className="section-kicker">أسئلة على السريع</span><h2>ما يدور في بالك،<br /><em>له جواب.</em></h2><p>معلومات واضحة تساعدك تستمتع بتجربتك بوعي واعتدال.</p></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "is-open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><ChevronDown size={18} /></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></section>

        <section className="newsletter-section container" id="newsletter"><div><span className="section-kicker">رسالة خفيفة</span><h2>دليل جديد، عندما<br /><em>يستحق وقتك.</em></h2></div><div className="newsletter-form"><p>اشترك لتصلك اختياراتنا ومراجعاتنا الجديدة بدون ضجيج.</p><div className="newsletter-input"><input placeholder="بريدك الإلكتروني" aria-label="بريدك الإلكتروني" /><AppButton config={buttons.newsletter} /></div><small>لن نرسل إلا ما نحب أن نقرأه نحن أيضًا.</small></div></section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><div className="brand footer-brand"><span className="brand-mark"><Moon size={18} fill="currentColor" /></span><span><strong>نَفَس</strong><small>دليل الأراكيل والشيشة</small></span></div><p>محتوى مستقل لجلسات أهدأ واختيارات أذكى.</p><span>© 2026 نَفَس</span></div></footer>

      {customizerOpen && <div className="modal-backdrop" onClick={() => setCustomizerOpen(false)}><aside className="customizer-panel" onClick={(event) => event.stopPropagation()}><div className="customizer-head"><div><span className="section-kicker">لوحة التحكم</span><h2>خصّص أزرارك</h2></div><button className="close-button" onClick={() => setCustomizerOpen(false)} aria-label="إغلاق"><X size={20} /></button></div><p className="panel-description">غيّر النص واللون والرابط، وستظهر النتيجة مباشرة في الصفحة. نحفظ اختياراتك على هذا الجهاز.</p><div className="button-switcher">{(Object.keys(buttons) as ButtonKey[]).map((key) => <button className={activeButton === key ? "is-active" : ""} key={key} onClick={() => setActiveButton(key)}>{key === "primary" ? "الرئيسي" : key === "secondary" ? "المقارنات" : "النشرة"}</button>)}</div><div className="field"><label htmlFor="button-label">نص {buttonLabel}</label><input id="button-label" value={currentButton.label} onChange={(event) => updateCurrent("label", event.target.value)} /></div><div className="field"><label htmlFor="button-href">الرابط</label><input id="button-href" value={currentButton.href} onChange={(event) => updateCurrent("href", event.target.value)} placeholder="#section أو رابط خارجي" /></div><div className="field"><label htmlFor="button-color">لون الزر</label><div className="color-row"><input id="button-color" type="color" value={currentButton.color} onChange={(event) => updateCurrent("color", event.target.value)} /><input value={currentButton.color} onChange={(event) => updateCurrent("color", event.target.value)} aria-label="قيمة لون الزر" /></div></div><div className="live-preview"><span>معاينة فورية</span><AppButton config={currentButton} /></div><div className="panel-actions"><button className="reset-button" onClick={resetButtons}><RotateCcw size={16} /> استعادة الافتراضي</button><button className="done-button" onClick={() => setCustomizerOpen(false)}><Check size={16} /> تم</button></div><div className="customizer-foot"><Palette size={15} /> يمكنك تعديل كل زر بشكل مستقل</div></aside></div>}
    </div>
  );
}
