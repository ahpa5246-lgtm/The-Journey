"use client";

import dynamic from "next/dynamic";
import LazyIraqExplorerMap from "@/components/LazyIraqExplorerMap";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  BadgeCheck,
  BarChart3,
  Database,
  Handshake,
  ShieldCheck,
  Building2,
  Globe2,
  Hotel,
  Languages,
  MapPinned,
  Search,
  Sparkles,
  TicketCheck,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { copy, places, type Audience, type Locale, type Place } from "@/lib/content";

const IntroMapScene = dynamic(() => import("@/components/IntroMapScene"), {
  ssr: false,
  loading: () => <div className="intro-map-loading" aria-hidden="true" />,
});

type FinderState = {
  query: string;
  people: number;
  budget: "low" | "mid" | "high";
  party: "solo" | "friends" | "family";
  interest: "heritage" | "nature" | "food" | "stay";
};

const essentials = [
  {
    icon: Globe2,
    en: "Entry & official travel information",
    ar: "الدخول ومعلومات السفر الرسمية",
    noteEn: "Check visa rules by nationality on Iraq's official e-Visa service instead of relying on copied requirements.",
    noteAr: "تحقق من شروط السمة حسب الجنسية عبر خدمة الفيزا العراقية الرسمية بدل الاعتماد على معلومات منسوخة.",
    href: "https://evisa.iq/en/Instructions",
    ctaEn: "Check official visa requirements",
    ctaAr: "تحقق من شروط الفيزا الرسمية",
  },
  {
    icon: TicketCheck,
    en: "Getting around",
    ar: "التنقل",
    noteEn: "Routes, local transport context and practical arrival notes can live beside each place.",
    noteAr: "طرق الوصول وملاحظات النقل المحلية تظهر بجانب كل مكان.",
  },
  {
    icon: Languages,
    en: "Language & cultural context",
    ar: "اللغة والسياق الثقافي",
    noteEn: "Useful phrases and etiquette belong inside place pages, not in a separate dictionary product.",
    noteAr: "العبارات المفيدة وآداب التعامل تظهر داخل صفحات الأماكن بدل قاموس منفصل.",
  },
  {
    icon: BadgeCheck,
    en: "Source & freshness",
    ar: "المصدر وآخر تحديث",
    noteEn: "Every published listing carries its source and review state. Verified does not mean a safety guarantee.",
    noteAr: "كل مكان منشور يحمل مصدره وحالة مراجعته. التوثيق لا يعني ضمان الأمان الشخصي.",
  },
];

const creatorCards = [
  {
    titleEn: "Baghdad cafés in one afternoon",
    titleAr: "كافيهات بغداد في طلعة واحدة",
    metaEn: "Creator-submitted trail • Demo slot",
    metaAr: "رحلة يضيفها صانع المحتوى • نموذج تجريبي",
  },
  {
    titleEn: "A family weekend route",
    titleAr: "مسار عائلي لنهاية الأسبوع",
    metaEn: "Creator-submitted trail • Demo slot",
    metaAr: "رحلة يضيفها صانع المحتوى • نموذج تجريبي",
  },
  {
    titleEn: "New places worth saving",
    titleAr: "أماكن جديدة تستحق الحفظ",
    metaEn: "Creator-submitted trail • Demo slot",
    metaAr: "رحلة يضيفها صانع المحتوى • نموذج تجريبي",
  },
];

function PlaceArtwork({ place }: { place: Place }) {
  const kind = place.id === "ahwar" ? "marsh" : place.id === "erbil-citadel" ? "citadel" : "ziggurat";
  return (
    <div className={`place-artwork ${kind}`} aria-hidden="true">
      <span className="art-sun" />
      <span className="art-ground" />
      <span className="art-structure" />
      <span className="art-structure secondary" />
    </div>
  );
}

function IntroSequence({ onFinish }: { onFinish: () => void }) {
  const [stage, setStage] = useState<"splash" | "map" | "triptych">("splash");
  const locked = useRef(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setStage("map"), 1750);
    return () => window.clearTimeout(timer);
  }, []);

  function move(direction: 1 | -1) {
    if (locked.current || stage === "splash") return;
    locked.current = true;
    window.setTimeout(() => {
      locked.current = false;
    }, 650);

    if (direction > 0 && stage === "map") setStage("triptych");
    else if (direction > 0 && stage === "triptych") onFinish();
    else if (direction < 0 && stage === "triptych") setStage("map");
  }

  return (
    <div
      className={`intro-overlay stage-${stage}`}
      role="dialog"
      aria-label="The Journey introduction"
      onWheel={(event) => {
        if (Math.abs(event.deltaY) > 18) move(event.deltaY > 0 ? 1 : -1);
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientY ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current == null) return;
        const end = event.changedTouches[0]?.clientY ?? touchStart.current;
        const delta = touchStart.current - end;
        touchStart.current = null;
        if (Math.abs(delta) > 42) move(delta > 0 ? 1 : -1);
      }}
    >
      <button className="intro-skip" type="button" onClick={onFinish}>
        Skip intro
      </button>

      <section className="intro-title-lockup" aria-hidden={stage !== "splash"}>
        <p>THE JOURNEY</p>
        <span>The journey feels different here.</span>
      </section>

      <section className="intro-map-scene" aria-hidden={stage !== "map"}>
        <IntroMapScene locale="en" places={places} />
        <button className="intro-continue" type="button" onClick={() => move(1)}>
          Scroll to continue <ArrowDown size={17} />
        </button>
      </section>

      <section className="intro-triptych" aria-hidden={stage !== "triptych"}>
        <div className="intro-panel heritage"><span>Heritage</span></div>
        <div className="intro-panel stay"><span>Stay</span></div>
        <div className="intro-panel taste"><span>Taste</span></div>
        <strong>THE JOURNEY FEELS DIFFERENT HERE</strong>
        <button className="intro-enter" type="button" onClick={onFinish}>
          Enter The Journey <ArrowDown size={17} />
        </button>
      </section>
    </div>
  );
}

export default function JourneyExperience() {
  const [locale, setLocale] = useState<Locale>("en");
  const [audience, setAudience] = useState<Audience>("visitor");
  const [intro, setIntro] = useState<boolean | null>(null);
  const [finder, setFinder] = useState<FinderState>({
    query: "",
    people: 2,
    budget: "mid",
    party: "family",
    interest: "heritage",
  });

  useEffect(() => {
    const seen = window.localStorage.getItem("journey-intro-seen") === "1";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      setIntro(false);
      return;
    }
    setIntro(true);
  }, []);

  function finishIntro() {
    window.localStorage.setItem("journey-intro-seen", "1");
    setIntro(false);
  }

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);


  function interpretTripQuery() {
    const q = finder.query.toLowerCase();
    const next = { ...finder };
    const count = q.match(/\b([1-9]|1[0-2])\b/);
    if (count) next.people = Number(count[1]);
    if (/family|kids|children|عائل|اطفال|أطفال/.test(q)) next.party = "family";
    else if (/friends|friend|اصدقاء|أصدقاء/.test(q)) next.party = "friends";
    else if (/solo|alone|وحدي|فرد/.test(q)) next.party = "solo";

    if (/heritage|history|historic|archae|آثار|اثار|تراث|تاريخ/.test(q)) next.interest = "heritage";
    else if (/food|restaurant|cafe|مطعم|كافيه|اكل|أكل/.test(q)) next.interest = "food";
    else if (/hotel|stay|sleep|فندق|اقامة|إقامة/.test(q)) next.interest = "stay";
    else if (/nature|marsh|park|طبيعة|اهوار|أهوار|متنزه/.test(q)) next.interest = "nature";

    if (/cheap|budget|low cost|اقتصاد|رخيص/.test(q)) next.budget = "low";
    else if (/luxury|premium|high end|فاخر|فخمة/.test(q)) next.budget = "high";

    setFinder(next);
  }

  const t = copy[locale];
  const isArabic = locale === "ar";
  const recommended = useMemo(() => {
    const matching = places.filter((place) => place.category === finder.interest);
    return (matching.length ? matching : places).slice(0, 3);
  }, [finder.interest]);

  return (
    <main dir={isArabic ? "rtl" : "ltr"} className={isArabic ? "site arabic" : "site"}>
      {intro === null ? <div className="intro-pending" /> : null}
      {intro ? <IntroSequence onFinish={finishIntro} /> : null}

      <header className="topbar">
        <a className="brand" href="#top" aria-label="The Journey home">
          <span className="brand-mark"><MapPinned size={20} /></span>
          <span>{t.brand}</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#discover">{t.nav.discover}</a>
          <a href="#map" className="map-nav-link">{t.nav.map}</a>
          <a href="#creators">{t.nav.creators}</a>
        </nav>
        <button className="language-switch" type="button" onClick={() => setLocale(isArabic ? "en" : "ar")}>
          <Languages size={18} />
          {isArabic ? "EN" : "العربية"}
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-map-ghost" aria-hidden="true"><div className="hero-iraq-shape" /><span>IRAQ</span></div>
        <div className="hero-copy">
          <div className="audience-switch" role="group" aria-label="Choose experience">
            <button className={audience === "visitor" ? "is-active" : ""} onClick={() => setAudience("visitor")} type="button">
              {t.visitor}
            </button>
            <button className={audience === "local" ? "is-active" : ""} onClick={() => setAudience("local")} type="button">
              {t.local}
            </button>
          </div>
          <h1>{audience === "visitor" ? t.heroVisitor : t.heroLocal}</h1>
          <p>{audience === "visitor" ? t.heroSubVisitor : t.heroSubLocal}</p>
          <div className="hero-actions">
            <a className="primary-action" href="#discover">{t.explore}</a>
            <a className="text-action" href="#planner"><Search size={18} /> {t.planner}</a>
          </div>
        </div>
        <div className="hero-proof">
          <span>6</span>
          <p>{isArabic ? "مواقع عراقية مدرجة على قائمة التراث العالمي لليونسكو" : "Iraqi properties on UNESCO's World Heritage List"}</p>
        </div>
        <a className="scroll-cue" href="#discover" aria-label="Scroll to discovery"><ArrowDown size={20} /></a>
      </section>

      <section className="section" id="discover">
        <div className="section-heading">
          <div>
            <p>{isArabic ? "مختار بعناية" : "Curated first"}</p>
            <h2>{isArabic ? "ابدأ بالأماكن التي تروي قصة العراق." : "Start with places that tell Iraq's story."}</h2>
          </div>
          <span>{isArabic ? "المحتوى الحالي يعتمد على مصادر موثوقة، ويكبر تدريجياً." : "The current catalogue starts with sourced places, then grows through review."}</span>
        </div>
        <div className="rail" aria-label="Featured places">
          {places.filter((p) => p.featured).map((place, index) => (
            <article className="place-card" key={place.id}>
              <PlaceArtwork place={place} />
              <div className="place-card-body">
                <div className="place-card-meta"><span>{String(index + 1).padStart(2, "0")}</span><BadgeCheck size={17} /></div>
                <h3>{place.name[locale]}</h3>
                <p>{place.summary[locale]}</p>
                <a href={place.sourceUrl} target="_blank" rel="noreferrer">{place.sourceLabel}</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section map-section" id="map">
        <div className="section-heading compact">
          <div>
            <p>{isArabic ? "التبويب الثاني" : "Map-first discovery"}</p>
            <h2>{t.mapTitle}</h2>
          </div>
          <span>{isArabic ? "اضغط على المحافظة، ثم استخدم التصنيف للوصول إلى ما تحتاجه." : "Choose a governorate, then filter down to what matters."}</span>
        </div>
        <LazyIraqExplorerMap locale={locale} places={places} />
      </section>

      <section className="section essentials-section">
        <div className="section-heading compact">
          <div>
            <p>{isArabic ? "معلومات عملية" : "Practical layer"}</p>
            <h2>{t.essentials}</h2>
          </div>
          <span>{isArabic ? "المعلومات المتغيرة لا تُعرض بلا مصدر وتاريخ تحديث." : "Changing travel facts are never published without a source and review date."}</span>
        </div>
        <div className="essentials-grid">
          {essentials.map((item) => {
            const Icon = item.icon;
            return (
              <article className="essential-card" key={item.en}>
                <Icon size={24} strokeWidth={1.6} />
                <h3>{isArabic ? item.ar : item.en}</h3>
                <p>{isArabic ? item.noteAr : item.noteEn}</p>
                {"href" in item && item.href ? (
                  <a className="essential-link" href={item.href} target="_blank" rel="noreferrer">
                    {isArabic ? item.ctaAr : item.ctaEn}
                  </a>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="section planner-section" id="planner">
        <div className="planner-copy">
          <p>{isArabic ? "بدل شات بوت فارغ" : "Useful before flashy AI"}</p>
          <h2>{t.planner}</h2>
          <span>{isArabic ? "أعطنا شكل الطلعة، ونرجع لك باقتراحات قابلة للتفسير من البيانات المراجعة." : "Tell us the shape of the trip and get explainable suggestions from reviewed data."}</span>
        </div>
        <div className="planner-card">
          <div className="planner-query">
            <label>
              {isArabic ? "اكتب طلعتك بطريقتك" : "Describe the trip in your own words"}
              <div>
                <input
                  type="text"
                  value={finder.query}
                  onChange={(e) => setFinder({ ...finder, query: e.target.value })}
                  placeholder={isArabic ? "عائلة من 5 أشخاص، ميزانية متوسطة، نريد آثار وطبيعة" : "Family of 5, medium budget, heritage and nature"}
                />
                <button type="button" onClick={interpretTripQuery}>{isArabic ? "فسّر الطلب" : "Interpret"}</button>
              </div>
            </label>
          </div>
          <label>
            {isArabic ? "عدد الأشخاص" : "People"}
            <input min="1" max="12" type="number" value={finder.people} onChange={(e) => setFinder({ ...finder, people: Number(e.target.value) })} />
          </label>
          <label>
            {isArabic ? "نوع المجموعة" : "Group"}
            <select value={finder.party} onChange={(e) => setFinder({ ...finder, party: e.target.value as FinderState["party"] })}>
              <option value="family">{isArabic ? "عائلة" : "Family"}</option>
              <option value="friends">{isArabic ? "أصدقاء" : "Friends"}</option>
              <option value="solo">{isArabic ? "فرد واحد" : "Solo"}</option>
            </select>
          </label>
          <label>
            {isArabic ? "الميزانية" : "Budget"}
            <select value={finder.budget} onChange={(e) => setFinder({ ...finder, budget: e.target.value as FinderState["budget"] })}>
              <option value="low">{isArabic ? "اقتصادية" : "Low"}</option>
              <option value="mid">{isArabic ? "متوسطة" : "Mid"}</option>
              <option value="high">{isArabic ? "مرنة" : "Flexible"}</option>
            </select>
          </label>
          <label>
            {isArabic ? "الاهتمام" : "Interest"}
            <select value={finder.interest} onChange={(e) => setFinder({ ...finder, interest: e.target.value as FinderState["interest"] })}>
              <option value="heritage">{isArabic ? "آثار وتراث" : "Heritage"}</option>
              <option value="nature">{isArabic ? "طبيعة" : "Nature"}</option>
              <option value="food">{isArabic ? "مطاعم" : "Food"}</option>
              <option value="stay">{isArabic ? "إقامة" : "Stay"}</option>
            </select>
          </label>
          <div className="planner-readback">
            <span>{finder.people} {isArabic ? "أشخاص" : "people"}</span>
            <span>{isArabic ? (finder.party === "family" ? "عائلة" : finder.party === "friends" ? "أصدقاء" : "فرد") : finder.party}</span>
            <span>{isArabic ? (finder.budget === "low" ? "اقتصادية" : finder.budget === "mid" ? "متوسطة" : "مرنة") : `${finder.budget} budget`}</span>
            <span>{isArabic ? "الاقتراحات الحالية تعتمد فقط على الحقول الموثقة" : "Recommendations only use fields the catalogue can currently source."}</span>
          </div>
          <div className="planner-results">
            {recommended.map((place) => (
              <a key={place.id} href={place.sourceUrl} target="_blank" rel="noreferrer">
                <strong>{place.name[locale]}</strong>
                <span>{place.governorate}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section trust-section" id="trust">
        <div className="section-heading compact">
          <div>
            <p>{isArabic ? "من أين تأتي الأماكن؟" : "Where places come from"}</p>
            <h2>{isArabic ? "نكتشف على نطاق واسع، وننشر بعد المراجعة." : "Discover broadly. Publish carefully."}</h2>
          </div>
          <span>{isArabic ? "لا نعتمد على مصدر واحد، ولا نعامل البيانات الخام كحقيقة جاهزة للنشر." : "No single provider is treated as the source of truth, and raw discovery data is never published as verified."}</span>
        </div>
        <div className="trust-grid">
          <article className="trust-card">
            <Database size={25} />
            <span>01</span>
            <h3>{isArabic ? "الاكتشاف" : "Discovery"}</h3>
            <p>{isArabic ? "OpenStreetMap وOverpass ومصادر مفتوحة أخرى تعطينا قائمة مرشحين واسعة. هذه البيانات تساعدنا على العثور على الأماكن، لكنها لا تمنحها ختم ثقة." : "OpenStreetMap, Overpass and other open sources create a broad candidate queue. They help us find places; they do not make a listing verified."}</p>
          </article>
          <article className="trust-card">
            <ShieldCheck size={25} />
            <span>02</span>
            <h3>{isArabic ? "المراجعة" : "Review"}</h3>
            <p>{isArabic ? "نطابق الاسم والموقع والتصنيف والبيانات المتغيرة مع مصدر رسمي أو مصدر أولي، ثم نحتفظ بحالة المراجعة وتاريخها." : "We check identity, location, category and changing facts against authoritative or first-party sources, then retain review state and date."}</p>
          </article>
          <article className="trust-card">
            <Handshake size={25} />
            <span>03</span>
            <h3>{isArabic ? "مطالبة صاحب المكان" : "Owner claim"}</h3>
            <p>{isArabic ? "يمكن لصاحب المطعم أو الفندق المطالبة بصفحته وتحديث بياناته. الدفع لا يغيّر حالة التوثيق ولا يشتري ترتيباً تحريرياً." : "A restaurant or hotel can claim its listing and update first-party details. Payment never changes verification or buys editorial trust."}</p>
          </article>
        </div>
        <div className="trust-note">
          <strong>{isArabic ? "القاعدة البسيطة:" : "The rule:"}</strong>
          <span>{isArabic ? "المصدر يحدد الحقيقة، والمراجعة تحدد ما ننشره، والدفع يشتري خدمة تجارية فقط." : "Sources establish facts, review determines what we publish, and payment buys a commercial service only."}</span>
        </div>
      </section>

      <section className="section business-section" id="business">
        <div className="section-heading compact">
          <div>
            <p>{isArabic ? "نموذج العمل" : "Business model"}</p>
            <h2>{isArabic ? "نربح عندما نخلق قيمة قابلة للقياس." : "We monetize measurable value."}</h2>
          </div>
          <span>{isArabic ? "الإدراج الأساسي مجاني. الشركات تدفع مقابل أدوات تجارية واضحة أو عمولة عندما نساعدها على إتمام حجز." : "Basic listings stay free. Businesses pay for clear commercial tools or a commission when we help generate a booking."}</span>
        </div>
        <div className="business-grid">
          <article className="business-card business-main">
            <div className="business-icon"><BarChart3 size={24} /></div>
            <p>{isArabic ? "للأعمال" : "For businesses"}</p>
            <h3>{isArabic ? "صفحة مجانية → ظهور مدفوع → حجوزات قابلة للقياس" : "Free listing → paid visibility → measurable bookings"}</h3>
            <div className="business-prices">
              <span><b>Free</b><small>{isArabic ? "إدراج أساسي" : "Basic listing"}</small></span>
              <span><b>25–50K</b><small>{isArabic ? "د.ع / شهر" : "IQD / month"}</small></span>
              <span><b>5–10%</b><small>{isArabic ? "عمولة الحجز" : "booking commission"}</small></span>
            </div>
          </article>
          <article className="business-card">
            <p>{isArabic ? "حملات" : "Campaigns"}</p>
            <h3>{isArabic ? "مطاعم، فنادق، منتجعات وعلامات تجارية" : "Restaurants, hotels, resorts and brands"}</h3>
            <span>{isArabic ? "حملات مؤثرين وظهور ممول، مع وسم واضح وعدم خلط الإعلان بالتوثيق." : "Creator campaigns and sponsored placements, clearly labeled and kept separate from verification."}</span>
          </article>
          <article className="business-card">
            <p>{isArabic ? "ما نقيسه" : "What we measure"}</p>
            <h3>{isArabic ? "زيارة → تواصل → حجز → إيراد" : "Visit → lead → booking → revenue"}</h3>
            <span>{isArabic ? "الهدف ليس بيع مساحة إعلانية؛ الهدف إثبات أن The Journey تجلب طلباً يمكن للأعمال رؤيته." : "The goal is not to sell ad space; it is to prove that The Journey generates demand businesses can see."}</span>
          </article>
        </div>
      </section>

      <section className="section creators-section" id="creators">
        <div className="section-heading">
          <div>
            <p>{isArabic ? "رحلات المؤثرين" : "Creator trails"}</p>
            <h2>{t.creatorsTitle}</h2>
          </div>
          <span>{isArabic ? "صانع المحتوى يضيف رابط الفيديو والثامبنايل بنفسه؛ الموقع يرسل الزيارة إلى المصدر الأصلي." : "Creators submit their own links and thumbnails; the click returns traffic to the original platform."}</span>
        </div>
        <div className="creator-grid">
          {creatorCards.map((card, index) => (
            <article className="creator-card" key={card.titleEn}>
              <div className={`creator-thumb thumb-${index + 1}`}><Sparkles size={24} /></div>
              <div>
                <h3>{isArabic ? card.titleAr : card.titleEn}</h3>
                <p>{isArabic ? card.metaAr : card.metaEn}</p>
              </div>
            </article>
          ))}
          <article className="creator-card creator-cta">
            <Users size={25} />
            <div>
              <h3>{isArabic ? "هل أنت صانع محتوى؟" : "Are you a creator?"}</h3>
              <p>{isArabic ? "سيضاف نموذج إرسال واضح بدل سحب محتواك بلا إذن." : "A submission flow will let creators opt in instead of being scraped without permission."}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section revenue-strip">
        <div>
          <Building2 size={22} />
          <span>{isArabic ? "ملف تجاري مميز" : "Premium business profile"}</span>
        </div>
        <div>
          <Hotel size={22} />
          <span>{isArabic ? "إحالات وحجوزات" : "Referral & booking revenue"}</span>
        </div>
        <div>
          <UtensilsCrossed size={22} />
          <span>{isArabic ? "ظهور ممول ومعلن بوضوح" : "Clearly labeled sponsored placement"}</span>
        </div>
      </section>

      <footer>
        <div className="brand"><span className="brand-mark"><MapPinned size={20} /></span><span>{t.brand}</span></div>
        <p>{isArabic ? "منصة لاكتشاف العراق القديم والحديث بمصادر أوضح وتجربة أبسط." : "A clearer way to discover ancient and modern Iraq."}</p>
      </footer>
    </main>
  );
}
