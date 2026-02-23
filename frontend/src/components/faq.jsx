import React, { useMemo, useState } from "react";
import { ChevronDown, Search, Sparkles, Layers3, Building2, LineChart } from "lucide-react";

const FAQ_SECTIONS = [
  {
    title: "FAQ - For Individuals",
    subtitle: "AI programs, internships, mentorship, career development",
    items: [
      {
        q: "1. What is Praktix and how does it help individuals build real-world skills?",
        a: "Praktix is a real-world execution platform that helps students, graduates, and professionals develop practical skills through AI programs, internships, mentorship, and industry-based projects. Unlike traditional courses, Praktix focuses on measurable outcomes and structured capability building.",
      },
      {
        q: "2. What types of AI programs does Praktix offer for individuals?",
        a: "Praktix offers industry-focused AI programs, digital transformation tracks, real-world internships, and 1-to-1 career mentorship. Programs are designed for different sectors including technology, product management, data, UX, business strategy, healthcare, and finance.",
      },
      {
        q: "3. Are Praktix programs online or in-person?",
        a: "Praktix programs are delivered online, hybrid, or on-site depending on the program format and institutional partnerships. Most AI and professional tracks are accessible globally.",
      },
      {
        q: "4. How long do Praktix programs last?",
        a: "Individual programs typically run between 3 to 7 weeks. Internship programs range from 3 to 6 months depending on specialization and structure.",
      },
      {
        q: "5. Do I need previous experience to join?",
        a: "Some programs are beginner-friendly, while advanced AI and professional tracks may require foundational knowledge. Each program includes clear eligibility criteria.",
      },
      {
        q: "6. Do participants work on real-world projects?",
        a: "Yes. All Praktix programs include real-world projects designed around industry scenarios. Participants build portfolio-ready work evaluated by experts.",
      },
      {
        q: "7. Who are the mentors and experts at Praktix?",
        a: "Praktix mentors include industry professionals, European experts, startup founders, and university professors with hands-on experience in their fields.",
      },
      {
        q: "8. Will I receive a certificate after completing a program?",
        a: "Yes. Participants receive a verified certificate based on project completion, performance evaluation, and demonstrated capability.",
      },
      {
        q: "9. Does Praktix support career growth and employability?",
        a: "Yes. Praktix supports career development through mentorship, structured execution frameworks, hiring initiatives, and ecosystem exposure.",
      },
      {
        q: "10. Can working professionals enroll in Praktix programs?",
        a: "Yes. Many programs are designed for working professionals seeking AI upskilling, career advancement, or digital transformation knowledge.",
      },
    ],
  },
  {
    title: "FAQ - For Organizations",
    subtitle: "Universities, corporations, government institutions",
    items: [
      {
        q: "1. What services does Praktix provide for organizations?",
        a: "Praktix provides customized AI training, structured internships, corporate workshops, industry-aligned programs, and digital transformation tracks for universities, companies, and public institutions.",
      },
      {
        q: "2. Does Praktix offer customized corporate training programs?",
        a: "Yes. Praktix designs tailored AI and digital capability programs aligned with organizational goals, industry requirements, and workforce transformation strategies.",
      },
      {
        q: "3. How long do corporate AI training programs last?",
        a: "Corporate programs typically run between 1 to 2 weeks for intensive tracks. Longer structured partnerships are also available.",
      },
      {
        q: "4. Can universities partner with Praktix for internships?",
        a: "Yes. Universities can co-host structured internships, industry-based projects, and applied programs for students across multiple disciplines.",
      },
      {
        q: "5. Are Praktix programs measurable and outcome-based?",
        a: "Yes. All programs include defined KPIs, structured evaluation frameworks, and measurable learning and performance outcomes.",
      },
      {
        q: "6. Does Praktix offer AI training for non-technical teams?",
        a: "Yes. AI programs are available for HR, finance, leadership, strategy, operations, and executive teams.",
      },
      {
        q: "7. Can organizations build long-term strategic partnerships with Praktix?",
        a: "Yes. Praktix supports ecosystem partnerships, program licensing, co-branded initiatives, and strategic innovation collaborations.",
      },
      {
        q: "8. Do you provide AI programs for schools or youth initiatives?",
        a: "Yes. Praktix offers early talent programs focused on AI, coding, game development, data skills, and digital literacy for students aged 9 to 18.",
      },
    ],
  },
  {
    title: "FAQ - Insights & Outcomes",
    subtitle: "Impact, measurable results, execution model",
    items: [
      {
        q: "1. How does Praktix measure learning outcomes and impact?",
        a: "Praktix measures impact through structured project evaluation, expert feedback, skill assessment frameworks, and career progression indicators.",
      },
      {
        q: "2. What are Real Outcomes at Praktix?",
        a: "Real outcomes refer to verified project completion, applied capability, portfolio development, career advancement, and measurable performance growth.",
      },
      {
        q: "3. What is the Praktix Real Experience model?",
        a: "The Real Experience model combines industry projects, expert mentorship, structured execution systems, and verified evaluation to ensure practical capability development.",
      },
      {
        q: "4. Do participants build professional portfolios?",
        a: "Yes. Every program includes project outputs designed to be portfolio-ready and aligned with industry expectations.",
      },
      {
        q: "5. What industries does Praktix support?",
        a: "Praktix supports AI, technology, digital product development, data science, healthcare, finance, strategy, UX design, and innovation ecosystems.",
      },
      {
        q: "6. Is Praktix aligned with current market needs?",
        a: "Yes. Programs are designed based on industry collaboration, expert input, and real-world execution requirements.",
      },
    ],
  },
  {
    title: "FAQ - About Praktix",
    subtitle: "Brand, mission, ecosystem, positioning",
    items: [
      {
        q: "1. What is Praktix?",
        a: "Praktix is a structured real-world execution ecosystem connecting experts, institutions, and industry to build measurable professional capability.",
      },
      {
        q: "2. Is Praktix an online learning platform?",
        a: "No. Praktix is not a traditional course platform. It is an execution-focused system that integrates mentorship, applied projects, and measurable outcomes.",
      },
      {
        q: "3. Where does Praktix operate?",
        a: "Praktix operates across Europe and collaborates with international institutions, organizations, and experts.",
      },
      {
        q: "4. What is the mission of Praktix?",
        a: "The mission of Praktix is to transform potential into measurable capability through structured, expert-driven real-world execution.",
      },
      {
        q: "5. How does the Praktix ecosystem work?",
        a: "The Praktix ecosystem connects experts, universities, organizations, and industry partners within a structured framework designed to deliver real outcomes.",
      },
      {
        q: "6. How can experts collaborate with Praktix?",
        a: "Professionals and university faculty can apply through the Become an Expert section to join the Praktix expert network.",
      },
      {
        q: "7. How can organizations partner with Praktix?",
        a: "Organizations can apply through the Partnerships section to explore customized training, internships, and strategic collaborations.",
      },
    ],
  },
];

const SECTION_ICONS = [Sparkles, Building2, LineChart, Layers3];

function FaqRow({ item, open, onToggle }) {
  return (
    <div
      className={[
        "group relative overflow-hidden rounded-2xl border bg-white/75",
        "border-black/10 shadow-[0_14px_40px_rgba(20,29,38,0.08)]",
        "backdrop-blur-md transition-all duration-200",
        open ? "ring-1 ring-black/10" : "hover:-translate-y-[1px] hover:shadow-[0_18px_55px_rgba(20,29,38,0.10)]",
      ].join(" ")}
    >
      {/* subtle accent */}
      <div
        className={[
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200",
          "bg-[radial-gradient(700px_250px_at_20%_0%,rgba(197,31,93,0.10),transparent_60%),radial-gradient(650px_240px_at_90%_0%,rgba(36,52,71,0.10),transparent_62%)]",
          open ? "opacity-100" : "group-hover:opacity-100",
        ].join(" ")}
      />

      <button
        type="button"
        onClick={onToggle}
        className="relative flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
        aria-expanded={open}
      >
        <span className="text-base font-extrabold text-[#141D26] sm:text-lg">
          {item.q}
        </span>

        <span className="flex items-center gap-2">
          <span
            className={[
              "hidden rounded-full border px-2 py-1 text-[11px] font-semibold sm:inline-flex",
              "border-black/10 bg-white/70 text-[#243447]/70",
              open ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
            ].join(" ")}
          >
            {open ? "Hide" : "View"}
          </span>

          <ChevronDown
            size={20}
            className={[
              "shrink-0 text-[#243447] transition-transform duration-200",
              open ? "rotate-180" : "rotate-0",
            ].join(" ")}
          />
        </span>
      </button>

      <div
        className={[
          "grid transition-[grid-template-rows] duration-250 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <div className="relative border-t border-black/10 px-5 py-4 text-sm font-medium leading-relaxed text-[#243447]/85 sm:px-6 sm:text-base">
            {item.a}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionCard({ section, sectionIdx, openKey, setOpenKey }) {
  const Icon = SECTION_ICONS[sectionIdx % SECTION_ICONS.length];

  return (
    <div className="rounded-[22px] border border-black/10 bg-white/55 p-5 shadow-[0_16px_50px_rgba(20,29,38,0.06)] backdrop-blur-md sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 bg-white/70 shadow-sm">
              <Icon className="h-5 w-5 text-[#243447]" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-[#141D26] sm:text-2xl">{section.title}</h2>
              <p className="mt-1 text-sm font-medium text-[#243447]/75 sm:text-base">{section.subtitle}</p>
            </div>
          </div>
        </div>

        <span className="hidden rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold text-[#243447]/80 sm:inline-flex">
          {section.items.length} items
        </span>
      </div>

      <div className="mt-5 grid gap-4">
        {section.items.map((item, itemIdx) => {
          const key = `${sectionIdx}-${itemIdx}`;
          return (
            <FaqRow
              key={item.q}
              item={item}
              open={openKey === key}
              onToggle={() => setOpenKey((prev) => (prev === key ? "" : key))}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function FaqPage() {
  const [openKey, setOpenKey] = useState("0-0");
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState(-1); // -1 = all

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = FAQ_SECTIONS.map((s) => ({
      ...s,
      items: s.items,
    }));

    const filtered = base
      .map((section) => {
        if (!q) return section;
        const items = section.items.filter((it) => {
          const hay = `${it.q} ${it.a}`.toLowerCase();
          return hay.includes(q);
        });
        return { ...section, items };
      })
      .filter((section) => section.items.length > 0);

    if (activeSection === -1) return filtered;

    // keep same behavior but scoped to a specific section index (if it still exists)
    const byIndex = filtered.filter((_, idx) => idx === activeSection);
    return byIndex.length ? byIndex : filtered;
  }, [query, activeSection]);

  const totalItems = useMemo(
    () => FAQ_SECTIONS.reduce((acc, s) => acc + s.items.length, 0),
    []
  );

  const visibleItems = useMemo(
    () => sections.reduce((acc, s) => acc + s.items.length, 0),
    [sections]
  );

  return (
    <main className="min-h-screen bg-[radial-gradient(1100px_520px_at_12%_0%,rgba(36,52,71,0.12),transparent_62%),radial-gradient(900px_420px_at_96%_0%,rgba(197,31,93,0.12),transparent_60%),linear-gradient(180deg,#F6F4EC,rgba(246,244,236,0.65))] px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-black/10 bg-[#FCFBF8]/85 shadow-[0_22px_70px_rgba(20,29,38,0.12)] backdrop-blur">
        {/* header */}
        <div className="relative border-b border-black/10 bg-[linear-gradient(135deg,#243447,#1C2733)] px-6 py-7 sm:px-10">
          <div className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(800px_250px_at_20%_0%,black,transparent_65%)] bg-[radial-gradient(900px_280px_at_10%_0%,rgba(255,255,255,0.16),transparent_60%)]" />

          <div className="relative">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  FAQ
                </h1>
                <p className="mt-2 text-sm font-medium text-[#E2E2D2]/85 sm:text-base">
                  Answers to common questions about programs, mentorship, and partnerships.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                  {visibleItems}/{totalItems} showing
                </span>
                <button
                  type="button"
                  onClick={() => setOpenKey("")}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 hover:bg-white/15"
                >
                  Collapse all
                </button>
              </div>
            </div>

            {/* search + filters */}
            <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search questions or keywords…"
                  className="w-full rounded-2xl border border-white/10 bg-white/10 py-3 pl-10 pr-4 text-sm font-semibold text-white placeholder:text-white/55 outline-none ring-0 transition focus:border-white/20 focus:bg-white/15"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSection(-1)}
                  className={[
                    "rounded-full px-3 py-2 text-xs font-bold transition",
                    activeSection === -1
                      ? "bg-white text-[#141D26]"
                      : "border border-white/10 bg-white/10 text-white/90 hover:bg-white/15",
                  ].join(" ")}
                >
                  All
                </button>

                {FAQ_SECTIONS.map((s, idx) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => setActiveSection(idx)}
                    className={[
                      "rounded-full px-3 py-2 text-xs font-bold transition",
                      activeSection === idx
                        ? "bg-white text-[#141D26]"
                        : "border border-white/10 bg-white/10 text-white/90 hover:bg-white/15",
                    ].join(" ")}
                    title={s.title}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* body */}
        <div className="grid gap-6 px-6 py-8 sm:px-10 sm:py-10">
          {sections.length ? (
            sections.map((section, sectionIdx) => (
              <SectionCard
                key={section.title}
                section={section}
                sectionIdx={sectionIdx}
                openKey={openKey}
                setOpenKey={setOpenKey}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-black/10 bg-white/70 p-8 text-center shadow-sm">
              <p className="text-base font-extrabold text-[#141D26]">No results found</p>
              <p className="mt-2 text-sm font-medium text-[#243447]/75">
                Try a different keyword (e.g., “internship”, “certificate”, “partnership”).
              </p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-4 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-bold text-[#141D26] hover:bg-[#FCFBF8]"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* footer hint */}
      
    </main>
  );
}