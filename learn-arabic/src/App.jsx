import { useState, useEffect, useCallback, useRef } from "react";

const GOLD = "#C5A55A";
const GUMROAD = "https://geebereal.gumroad.com/l/learnarabicbeginner";

const LEVELS = [
  { label: "Zero — I don't speak any Arabic", tag: "Total beginner" },
  { label: "I know a few words (shukran, yalla, habibi)", tag: "Just starting" },
  { label: "I can do basic greetings", tag: "Getting there" },
  { label: "I can hold simple conversations", tag: "Some practice" },
];

const TOPICS = [
  "Everyday greetings & conversations",
  "Arabic slang & street talk",
  "Emirati dialect & Gulf Arabic",
  "Arabic for travel & restaurants",
  "Reading & writing Arabic script",
  "Arabic for social media & texting",
  "Cultural etiquette & traditions",
  "Arabic music, poetry & media",
];

const PACKAGES = [
  { id: "b5", s: "5 sessions", p: "$350", per: "$70/session", desc: "45 min each", benefits: ["5 weekly private sessions (45 min)", "Learning plan based on your level", "WhatsApp support between sessions"] },
  { id: "b7", s: "7 sessions", p: "$450", per: "$64/session", desc: "45 min each", pop: true, benefits: ["7 weekly private sessions (45 min)", "Learning plan based on your level", "WhatsApp support between sessions"] },
  { id: "b10", s: "10 sessions", p: "$500", per: "$50/session", desc: "45 min each", benefits: ["10 weekly private sessions (45 min)", "Learning plan based on your level", "WhatsApp support between sessions", "The full journey"] },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  ::selection{background:#C5A55A44;color:#fff}
  ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#333;border-radius:4px}
  input::placeholder{color:#3a3a3a!important;font-style:italic}
  @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
  @keyframes slideIn{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:translateX(0)}}
  @keyframes pulse{0%,100%{opacity:.4}50%{opacity:.85}}
  @keyframes spinGlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes glowPulse{0%,100%{box-shadow:0 4px 24px #C5A55A30}50%{box-shadow:0 4px 36px #C5A55A55}}
  @keyframes checkIn{0%{transform:scale(0)}60%{transform:scale(1.2)}100%{transform:scale(1)}}
  @keyframes orbFloat1{0%{transform:translate(0,0)}33%{transform:translate(30px,-40px)}66%{transform:translate(-20px,20px)}100%{transform:translate(0,0)}}
  @keyframes orbFloat2{0%{transform:translate(0,0)}50%{transform:translate(-30px,25px)}100%{transform:translate(0,0)}}
  @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
`;

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return [ref, v];
}

function Reveal({ children, delay = 0, style }) {
  const [ref, v] = useInView();
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`, ...style }}>{children}</div>;
}

function FadeUp({ delay = 0, children, style }) {
  return <div style={{ opacity: 0, animation: "fadeUp 0.6s ease forwards", animationDelay: `${delay}s`, ...style }}>{children}</div>;
}

function Screen({ active, children, centered, padTop }) {
  const [phase, setPhase] = useState("idle");
  const [render, setRender] = useState(active);
  useEffect(() => {
    if (active) { setRender(true); setPhase("entering"); const t = setTimeout(() => setPhase("visible"), 40); return () => clearTimeout(t); }
    else if (phase !== "idle") { setPhase("exiting"); const t = setTimeout(() => { setPhase("idle"); setRender(false); }, 400); return () => clearTimeout(t); }
  }, [active]);
  if (!render) return null;
  const vis = phase === "visible";
  return <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: centered ? "center" : "flex-start", padding: padTop ? "90px 24px 40px" : "24px 24px", zIndex: 1, overflowY: "auto", opacity: vis ? 1 : 0, transform: vis ? "translateY(0) scale(1)" : phase === "entering" ? "translateY(20px) scale(.985)" : "translateY(-12px) scale(.995)", filter: vis ? "blur(0)" : "blur(2px)", transition: "opacity .4s cubic-bezier(.22,1,.36,1), transform .4s cubic-bezier(.22,1,.36,1), filter .4s ease" }}><div style={{ maxWidth: 480, width: "100%" }}>{children}</div></div>;
}

function NavBar({ current, total, onBack }) {
  return <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "linear-gradient(180deg, #08080Aee, #08080A00)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", padding: "14px 24px 16px" }}><div style={{ maxWidth: 480, margin: "0 auto" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}><button onClick={onBack} style={{ background: "none", border: "none", color: "#666", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", padding: "4px 0", display: "flex", alignItems: "center", gap: 6 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>Back</button><span style={{ fontSize: 12, color: "#444", fontWeight: 500 }}>Step {current} of {total}</span></div><div style={{ height: 2, borderRadius: 2, background: "#1A1A1D" }}><div style={{ height: "100%", borderRadius: 2, background: `linear-gradient(90deg, ${GOLD}, #D4B96A)`, width: `${Math.round((current / total) * 100)}%`, transition: "width .5s cubic-bezier(.4,0,.2,1)", boxShadow: "0 0 12px #C5A55A33" }} /></div></div></div>;
}

function Opt({ label, tag, selected, onClick, multi, delay = 0 }) {
  return <button onClick={onClick} style={{ width: "100%", textAlign: "left", padding: "16px 18px", borderRadius: 12, border: `1.5px solid ${selected ? GOLD : "#1E1E1E"}`, background: selected ? "#C5A55A0D" : "#111", cursor: "pointer", transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "'DM Sans', sans-serif", opacity: 0, animation: "slideIn .5s ease forwards", animationDelay: `${delay}s` }}><div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ width: 20, height: 20, minWidth: 20, borderRadius: multi ? 5 : "50%", border: `2px solid ${selected ? GOLD : "#333"}`, background: selected ? GOLD : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}>{selected && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>}</div><span style={{ color: "#ddd", fontSize: 14, fontWeight: 500 }}>{label}</span></div>{tag && <span style={{ fontSize: 10, color: selected ? GOLD : "#444", fontWeight: 600, letterSpacing: ".05em", padding: "3px 8px", borderRadius: 5, background: selected ? "#C5A55A12" : "#181818" }}>{tag}</span>}</button>;
}

function Inp({ label, type = "text", value, onChange, placeholder, required, error }) {
  const [f, setF] = useState(false);
  return <div style={{ marginBottom: 18 }}><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: error ? "#e05555" : "#666", marginBottom: 6, letterSpacing: ".04em", textTransform: "uppercase" }}>{label}{required && <span style={{ color: GOLD, marginLeft: 3 }}>*</span>}</label><input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} onFocus={() => setF(true)} onBlur={() => setF(false)} style={{ width: "100%", padding: "14px 16px", borderRadius: 10, border: `1.5px solid ${error ? "#e05555" : f ? GOLD : "#222"}`, background: "#111", color: "#E8E6E1", fontSize: 14, outline: "none", fontFamily: "'DM Sans', sans-serif", transition: "border-color .2s, box-shadow .2s", boxShadow: f ? "0 0 0 3px #C5A55A18" : error ? "0 0 0 3px #e0555518" : "none" }} />{error && <p style={{ color: "#e05555", fontSize: 11, marginTop: 4 }}>{error}</p>}</div>;
}

function Hd({ children, size = 26, style: sx, delay = 0.1 }) {
  return <FadeUp delay={delay}><h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-.02em", fontSize: size, color: "#E8E6E1", ...sx }}>{children}</h2></FadeUp>;
}

function Sub({ children, delay = 0.2, style: sx }) {
  return <FadeUp delay={delay}><p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, marginBottom: 24, ...sx }}>{children}</p></FadeUp>;
}

function GoldBtn({ children, onClick, full, glow, loading, style: sx }) {
  return <button onClick={onClick} disabled={loading} style={{ padding: "18px 48px", borderRadius: 12, border: "none", background: `linear-gradient(135deg, ${GOLD}, #B8963F)`, color: "#0A0A0A", fontSize: 15, fontWeight: 700, letterSpacing: ".04em", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 24px #C5A55A30", width: full ? "100%" : "auto", ...(glow ? { animation: "glowPulse 3s ease infinite" } : {}), ...sx }}>{loading ? "Submitting..." : children}</button>;
}

export default function App() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [level, setLevel] = useState(null);
  const [topics, setTopics] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedPkg, setSelectedPkg] = useState(null);

  const go = useCallback(n => { setStep(n); window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
  const goBack = useCallback(() => { if (step > 0) go(step - 1); }, [step, go]);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Required";
    if (!email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Invalid";
    if (!whatsapp.trim()) e.whatsapp = "Required";
    if (!location.trim()) e.location = "Required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async () => {
    setSubmitting(true);
    const fd = new FormData();
    fd.append("_subject", "New Beginner Arabic Application (Ad)");
    fd.append("track", "Learn Arabic Beginner (Ad)");
    fd.append("name", name); fd.append("email", email);
    fd.append("whatsapp", whatsapp); fd.append("location", location);
    fd.append("arabic_level", level);
    fd.append("interested_topics", topics.join(", "));
    fd.append("selected_package", selectedPkg || "Not specified");
    try { await fetch("https://formspree.io/f/mojkbbbw", { method: "POST", body: fd, headers: { Accept: "application/json" } }); } catch {}
    setSubmitting(false);
    window.location.href = GUMROAD;
  };

  const sec = { padding: "70px 24px", borderTop: "1px solid #141416" };
  const wrap = { maxWidth: 560, margin: "0 auto" };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#E8E6E1", background: "linear-gradient(165deg, #08080A 0%, #0D0D10 40%, #0A0A0D 100%)", minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
      <style>{css}</style>

      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", width: 420, height: 420, top: "-12%", right: "-6%", borderRadius: "50%", filter: "blur(80px)", opacity: 0.25, background: `radial-gradient(circle, ${GOLD}22, transparent 70%)`, animation: "orbFloat1 12s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 350, height: 350, bottom: "5%", left: "-8%", borderRadius: "50%", filter: "blur(80px)", opacity: 0.2, background: "radial-gradient(circle, #8B6B3018, transparent 70%)", animation: "orbFloat2 10s ease-in-out infinite" }} />
      </div>

      {step >= 1 && step <= 4 && <NavBar current={step} total={4} onBack={goBack} />}

      {/* STEP 0: SCROLLABLE LANDING */}
      {step === 0 && (
        <div style={{ position: "relative", zIndex: 1 }}>

          <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 24px", textAlign: "center" }}>
            <div style={{ maxWidth: 560 }}>
              <FadeUp delay={0.05} style={{ marginBottom: 18 }}>
                <div style={{ position: "relative", width: 90, height: 90, margin: "0 auto" }}>
                  <div style={{ position: "absolute", inset: -3, borderRadius: "50%", background: `conic-gradient(from 0deg, ${GOLD}, #8B6B30, ${GOLD})`, animation: "spinGlow 4s linear infinite", opacity: 0.5 }} />
                  <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#08080A", padding: 2 }}>
                    <img src="https://geebereal.com/GABRIEL_FOTO.png" alt="Gabriel F Harris" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                  </div>
                </div>
              </FadeUp>
              <FadeUp delay={0.1}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 100, border: "1px solid #C5A55A22", background: "#C5A55A08", marginBottom: 22 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: GOLD, animation: "pulse 2s infinite" }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: GOLD, letterSpacing: ".12em", textTransform: "uppercase" }}>Beginner friendly</span>
                </div>
              </FadeUp>
              <FadeUp delay={0.2}>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-.03em", fontSize: "clamp(32px, 6vw, 52px)", margin: "0 auto" }}>Speak Arabic in<br /><span style={{ color: GOLD, fontStyle: "italic" }}>weeks, not years.</span></h1>
              </FadeUp>
              <FadeUp delay={0.35}>
                <p style={{ fontSize: 16, color: "#888", lineHeight: 1.7, maxWidth: 440, margin: "16px auto 32px" }}>Private 1-on-1 Arabic lessons that actually teach you to speak. Real Arabic, not textbook Arabic. From zero to your first conversation.</p>
              </FadeUp>
              <FadeUp delay={0.5}>
                <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 32 }}>
                  {[{ n: "14yr", l: "Arab world" }, { n: "M.A.", l: "Arabic" }, { n: "110K+", l: "Threads" }, { n: "3yr", l: "Teaching" }].map((s, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: GOLD, fontFamily: "'Playfair Display', serif" }}>{s.n}</div>
                      <div style={{ fontSize: 9, color: "#666", marginTop: 2, textTransform: "uppercase", letterSpacing: ".04em" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </FadeUp>
              <FadeUp delay={0.6}>
                <div style={{ animation: "bounce 2s ease-in-out infinite", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                  <span style={{ fontSize: 11, color: "#555", fontWeight: 500 }}>Scroll down</span>
                </div>
              </FadeUp>
            </div>
          </section>

          <section style={sec}>
            <div style={wrap}>
              <Reveal><span style={{ fontSize: 11, fontWeight: 600, color: "#555", letterSpacing: ".15em", textTransform: "uppercase" }}>The truth</span></Reveal>
              <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(24px, 4vw, 34px)", lineHeight: 1.25, margin: "16px 0 20px", letterSpacing: "-.02em" }}>Apps don't teach you to <span style={{ color: GOLD, fontStyle: "italic" }}>speak Arabic.</span></h2></Reveal>
              <Reveal delay={0.2}><p style={{ fontSize: 15, color: "#777", lineHeight: 1.8, marginBottom: 24 }}>You've tried Duolingo. You've watched YouTube videos. You can read words but you can't actually have a conversation. The textbook Arabic doesn't match what people actually say in the streets, in WhatsApp, or at family dinners.</p></Reveal>
              <Reveal delay={0.3}><div style={{ padding: "20px 24px", borderRadius: 12, border: "1px solid #1A1A1D", background: "#0C0C0E" }}><p style={{ fontSize: 14, color: "#999", lineHeight: 1.6, fontStyle: "italic" }}>"You don't learn a language. You live it. The fastest way to speak Arabic is to talk to someone who speaks it — not study an app for two years."</p><p style={{ fontSize: 12, color: GOLD, marginTop: 10, fontWeight: 600 }}>— Gabriel F Harris, @geebereal</p></div></Reveal>
            </div>
          </section>

          <section style={sec}>
            <div style={wrap}>
              <Reveal><span style={{ fontSize: 11, fontWeight: 600, color: "#555", letterSpacing: ".15em", textTransform: "uppercase" }}>What you get</span></Reveal>
              <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 26, margin: "16px 0 24px", letterSpacing: "-.02em" }}>Real lessons, real <span style={{ color: GOLD, fontStyle: "italic" }}>conversations.</span></h2></Reveal>
              {[
                { title: "1-on-1 with a real teacher", desc: "Private sessions with someone who has a Master's degree in Arabic. Not a chatbot, not a recording. A real conversation every time." },
                { title: "Lessons built around YOUR interests", desc: "Want to learn slang? Travel phrases? Music? Reading & writing? You pick the topics, I build the lessons around what you actually want." },
                { title: "Real Arabic, not textbook Arabic", desc: "Learn how Arabs actually speak — the slang, the dialect, the phrases you'll hear in the streets. Not the formal stuff nobody uses." },
                { title: "WhatsApp support between sessions", desc: "Practice with me anytime. Ask questions, get corrections, send voice notes. Your Arabic teacher in your pocket." },
              ].map((item, i) => (
                <Reveal key={i} delay={0.15 + i * 0.08}><div style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "flex-start" }}><div style={{ width: 24, height: 24, minWidth: 24, borderRadius: 6, border: "1.5px solid #C5A55A44", background: "#C5A55A0A", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg></div><div><div style={{ fontSize: 15, fontWeight: 600, color: "#ddd", marginBottom: 3 }}>{item.title}</div><div style={{ fontSize: 13, color: "#777", lineHeight: 1.5 }}>{item.desc}</div></div></div></Reveal>
              ))}
            </div>
          </section>

          <section style={sec}>
            <div style={{ ...wrap, textAlign: "center" }}>
              <Reveal><span style={{ fontSize: 11, fontWeight: 600, color: "#555", letterSpacing: ".15em", textTransform: "uppercase" }}>Pricing</span></Reveal>
              <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 26, margin: "16px 0 8px", letterSpacing: "-.02em" }}>Starting from <span style={{ color: GOLD }}>$350</span></h2></Reveal>
              <Reveal delay={0.15}><p style={{ fontSize: 14, color: "#666", marginBottom: 28 }}>5–10 private sessions. The more you book, the lower the price per session.</p></Reveal>
              <Reveal delay={0.2}>
                <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
                  {PACKAGES.map((p, i) => (
                    <div key={i} style={{ padding: "18px 22px", borderRadius: 12, minWidth: 130, border: `1.5px solid ${p.pop ? GOLD : "#1E1E1E"}`, background: p.pop ? "#C5A55A08" : "#0C0C0E" }}>
                      <div style={{ fontSize: 28, fontWeight: 700, color: "#E8E6E1", fontFamily: "'Playfair Display', serif" }}>{p.s.split(" ")[0]}</div>
                      <div style={{ fontSize: 11, color: "#777", marginTop: 2 }}>sessions</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: p.pop ? GOLD : "#ccc", marginTop: 8 }}>{p.p}</div>
                      <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{p.per}</div>
                      {p.pop && <div style={{ fontSize: 9, fontWeight: 600, color: GOLD, letterSpacing: ".06em", marginTop: 8, textTransform: "uppercase" }}>Most popular</div>}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          <section style={{ padding: "80px 24px", textAlign: "center" }}>
            <Reveal><h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(24px, 4vw, 32px)", marginBottom: 12, letterSpacing: "-.02em" }}>Yalla, let's get you <span style={{ color: GOLD, fontStyle: "italic" }}>speaking Arabic.</span></h2></Reveal>
            <Reveal delay={0.1}><p style={{ fontSize: 14, color: "#777", marginBottom: 28, maxWidth: 400, margin: "0 auto 28px" }}>Application takes 60 seconds. I'll reach out on WhatsApp to schedule your first session.</p></Reveal>
            <Reveal delay={0.2}><GoldBtn onClick={() => go(1)} glow>APPLY NOW</GoldBtn></Reveal>
            <Reveal delay={0.3}><p style={{ fontSize: 11, color: "#444", marginTop: 16 }}>Gabriel F Harris · <a href="https://www.threads.com/@geebereal" target="_blank" rel="noopener noreferrer" style={{ color: GOLD, textDecoration: "none" }}>@geebereal</a></p></Reveal>
          </section>
        </div>
      )}

      {/* LEVEL */}
      <Screen active={step === 1} padTop>
        <Hd style={{ marginBottom: 8 }}>What's your Arabic level?</Hd>
        <Sub>No wrong answer. We start wherever you are.</Sub>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {LEVELS.map((o, i) => <Opt key={o.label} label={o.label} tag={o.tag} selected={level === o.label} onClick={() => { setLevel(o.label); setTimeout(() => go(2), 300); }} delay={0.2 + i * 0.07} />)}
        </div>
      </Screen>

      {/* TOPICS */}
      <Screen active={step === 2} padTop>
        <Hd style={{ marginBottom: 8 }}>What interests you most?</Hd>
        <Sub style={{ color: "#555" }}>Pick as many as you like. I'll build your lessons around these.</Sub>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {TOPICS.map((t, i) => <Opt key={t} label={t} multi selected={topics.includes(t)} onClick={() => setTopics(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t])} delay={0.2 + i * 0.05} />)}
        </div>
        <FadeUp delay={0.6} style={{ marginTop: 24 }}>
          <GoldBtn onClick={() => { if (topics.length) go(3); }} style={{ opacity: topics.length ? 1 : 0.4, cursor: topics.length ? "pointer" : "not-allowed" }}>Continue →</GoldBtn>
        </FadeUp>
      </Screen>

      {/* CONTACT */}
      <Screen active={step === 3} padTop>
        <Hd style={{ marginBottom: 8 }}>Almost done. How do I reach you?</Hd>
        <Sub>I'll message you on WhatsApp to schedule your first session.</Sub>
        <Inp label="Your Name" value={name} onChange={setName} required error={errors.name} />
        <Inp label="Email" value={email} onChange={setEmail} type="email" required error={errors.email} />
        <Inp label="WhatsApp" value={whatsapp} onChange={setWhatsapp} type="tel" required error={errors.whatsapp} />
        <Inp label="Location" value={location} onChange={setLocation} required error={errors.location} />
        <GoldBtn onClick={() => { if (validate()) go(4); }}>Continue →</GoldBtn>
      </Screen>

      {/* CHECKOUT */}
      <Screen active={step === 4} padTop>
        <Hd style={{ marginBottom: 10 }}>Choose your package.</Hd>
        <Sub>Tap a package to see what's included.</Sub>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {PACKAGES.map((item, i) => {
            const sel = selectedPkg === item.id;
            return (
              <button key={i} onClick={() => setSelectedPkg(sel ? null : item.id)} style={{
                width: "100%", textAlign: "left", padding: "16px 18px", borderRadius: 12,
                border: `1.5px solid ${sel ? GOLD : "#1E1E1E"}`,
                background: sel ? "#C5A55A08" : "#0C0C0E",
                cursor: "pointer", transition: "all 0.25s ease",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: sel ? "#fff" : "#ddd" }}>{item.s}{item.pop ? " ⭐" : ""}</div>
                    <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{item.desc}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: sel ? GOLD : "#ccc" }}>{item.p}</div>
                    <div style={{ fontSize: 10, color: "#666" }}>{item.per}</div>
                  </div>
                </div>
                {sel && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #1A1A1D", display: "flex", flexDirection: "column", gap: 7 }}>
                    {item.benefits.map((b, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                        <span style={{ fontSize: 12, color: "#aaa" }}>{b}</span>
                      </div>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {selectedPkg && (
          <GoldBtn onClick={submit} loading={submitting} glow full>Continue to Checkout →</GoldBtn>
        )}
      </Screen>
    </div>
  );
}
