import { useState } from "react";
import Icon from "@/components/ui/icon";

const POET_IMG = "https://cdn.poehali.dev/projects/be7fb421-a900-4276-9f1e-e2465fe8af37/files/d528b5dd-95be-402c-9fe9-74bb3a9616bb.jpg";

const POEMS = [
  { id: 1, title: "Осенний вечер", year: 1842, theme: "природа", author: "Поэт", excerpt: "Как осени вечерней тишь / Ложится на остывший лист, / Так дума горестная лишь / Скользит сквозь сумерки и свист..." },
  { id: 2, title: "Родина", year: 1845, theme: "родина", author: "Поэт", excerpt: "Люблю тебя, земля родная, / Твои поля, твои леса, / Где ива плачет, вспоминая / Забытые голоса..." },
  { id: 3, title: "Зимняя дорога", year: 1838, theme: "лирика", author: "Поэт", excerpt: "По дороге зимней, скучной / Тройка борзая бежит, / Колокольчик однозвучный / Утомительно гремит..." },
  { id: 4, title: "Письмо другу", year: 1851, theme: "дружба", author: "Поэт", excerpt: "Пишу тебе в часы ночные, / Когда весь мир объят молчаньем, / И мысли, прежде молодые, / Теперь сочатся воспоминаньем..." },
  { id: 5, title: "Весенний гром", year: 1847, theme: "природа", author: "Поэт", excerpt: "Люблю грозу в начале мая, / Когда весенний, первый гром, / Как бы резвяся и играя, / Грохочет в небе голубом..." },
  { id: 6, title: "Элегия", year: 1853, theme: "лирика", author: "Поэт", excerpt: "Безумных лет угасшее веселье / Мне тяжело, как смутное похмелье, / Но, как вино — печаль минувших дней / В моей душе чем старше, тем сильней..." },
];

const TIMELINE = [
  { year: "1814", event: "Рождение в семье потомственного дворянина в Москве" },
  { year: "1826", event: "Поступление в Московский университет на словесный факультет" },
  { year: "1831", event: "Первая публикация стихотворений в «Литературной газете»" },
  { year: "1835", event: "Выход первого поэтического сборника «Ранние стихи»" },
  { year: "1840", event: "Знакомство с Белинским, начало литературной деятельности" },
  { year: "1847", event: "Главный труд — поэма «Родные просторы»" },
  { year: "1855", event: "Избрание в Российскую академию наук" },
  { year: "1863", event: "Кончина. Похоронен на Новодевичьем кладбище" },
];

const GALLERY = [
  { id: 1, src: POET_IMG, caption: "Портрет поэта. Неизвестный художник, 1848 г." },
  { id: 2, src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80", caption: "Рукопись «Родных просторов», 1847 г." },
  { id: 3, src: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80", caption: "Дом-музей поэта в Москве" },
  { id: 4, src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80", caption: "Рабочий стол. Перо и чернильница" },
];

const ARCHIVE = [
  { year: "1835", title: "Ранние стихи", type: "сборник", pages: 112 },
  { year: "1841", title: "Думы и образы", type: "сборник", pages: 198 },
  { year: "1847", title: "Родные просторы", type: "поэма", pages: 64 },
  { year: "1850", title: "Письма к друзьям", type: "переписка", pages: 312 },
  { year: "1855", title: "Избранное", type: "сборник", pages: 440 },
  { year: "1860", title: "Последние стихи", type: "сборник", pages: 88 },
];

const THEMES = ["все", "природа", "родина", "лирика", "дружба"];

const SECTIONS = ["Биография", "Стихи", "Галерея", "Архив", "Хронология"];

export default function Index() {
  const [active, setActive] = useState("Биография");
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("все");
  const [openPoem, setOpenPoem] = useState<number | null>(null);

  const filteredPoems = POEMS.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      String(p.year).includes(q) ||
      p.theme.includes(q);
    const matchTheme = theme === "все" || p.theme === theme;
    return matchSearch && matchTheme;
  });

  const filteredArchive = ARCHIVE.filter((a) => {
    const q = search.toLowerCase();
    return !q || a.title.toLowerCase().includes(q) || String(a.year).includes(q) || a.type.includes(q);
  });

  return (
    <div className="paper min-h-screen">
      {/* Header */}
      <header className="border-b border-border/60 bg-card/60 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl tracking-widest uppercase" style={{ fontFamily: "'Cormorant', serif", letterSpacing: "0.15em" }}>
              Александр Н. Ветров
            </h1>
            <p className="text-xs text-muted-foreground tracking-widest uppercase" style={{ letterSpacing: "0.2em" }}>
              1814 — 1863 · Поэт
            </p>
          </div>
          <nav className="hidden md:flex items-center gap-7">
            {SECTIONS.map((s) => (
              <button key={s} onClick={() => setActive(s)} className={`nav-link ${active === s ? "active" : ""}`}>
                {s}
              </button>
            ))}
          </nav>
          {/* Mobile nav */}
          <div className="flex md:hidden gap-3">
            {SECTIONS.map((s) => (
              <button key={s} onClick={() => setActive(s)} className={`text-xs nav-link ${active === s ? "active" : ""}`}>
                {s.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">

        {/* ── БИОГРАФИЯ ── */}
        {active === "Биография" && (
          <div>
            {/* Hero */}
            <div className="grid md:grid-cols-2 gap-14 items-start mb-16 fade-up d1">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">Биография</p>
                <h2 className="text-5xl md:text-6xl leading-tight mb-6" style={{ fontFamily: "'Cormorant', serif" }}>
                  Александр<br /><em>Николаевич</em><br />Ветров
                </h2>
                <div className="divider"><span style={{ color: "hsl(var(--gold))", fontSize: "1.1rem" }}>✦</span></div>
                <p className="mt-5 text-muted-foreground leading-8">
                  Один из наиболее значимых русских поэтов второй трети XIX века. 
                  Родился в Москве в семье потомственного дворянина, получил блестящее 
                  образование в Московском университете, где сблизился с кружком 
                  любомудров.
                </p>
                <p className="mt-4 text-muted-foreground leading-8">
                  Лирика Ветрова отличается тонким психологизмом, глубоким чувством 
                  природы и неизменным обращением к теме родины. Его поэма «Родные 
                  просторы» (1847) стала вершиной творчества и вошла в золотой фонд 
                  русской литературы.
                </p>
              </div>
              <div className="gallery-item fade-up d2">
                <img
                  src={POET_IMG}
                  alt="Портрет Александра Ветрова"
                  className="w-full object-cover"
                  style={{ aspectRatio: "3/4", filter: "sepia(20%) contrast(1.05)" }}
                />
                <p className="text-center text-xs text-muted-foreground mt-2 italic">
                  Портрет поэта. Неизвестный художник, 1848 г.
                </p>
              </div>
            </div>

            {/* Bio blocks */}
            <div className="grid md:grid-cols-3 gap-8 mb-14">
              {[
                { icon: "BookOpen", title: "Образование", text: "Московский университет, словесный факультет (1826–1830). Ученик профессора Мерзлякова." },
                { icon: "Feather", title: "Творчество", text: "Автор шести поэтических сборников, поэмы и обширной переписки. Более 400 стихотворений." },
                { icon: "Award", title: "Признание", text: "Действительный член Российской академии наук (1855). Почётный гражданин Москвы." },
              ].map((b, i) => (
                <div key={i} className={`p-6 border border-border/50 fade-up d${i + 3}`} style={{ background: "hsl(var(--card))" }}>
                  <Icon name={b.icon as any} size={20} className="mb-3" style={{ color: "hsl(var(--gold))" }} />
                  <h3 className="text-lg mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-7">{b.text}</p>
                </div>
              ))}
            </div>

            <div className="prose-like fade-up d5 border-l-2 pl-6" style={{ borderColor: "hsl(var(--gold))" }}>
              <h3 className="text-2xl mb-4">Последние годы</h3>
              <p className="text-muted-foreground leading-8">
                В 1855 году Ветров избирается в Российскую академию наук, что становится 
                высочайшим признанием его заслуг перед отечественной словесностью. Последние 
                годы жизни поэт провёл в своём подмосковном имении Ясная Поляна, работая 
                над итоговым сборником и мемуарами. Скончался 12 марта 1863 года, оставив 
                незавершённую поэму «Осенние думы».
              </p>
            </div>
          </div>
        )}

        {/* ── СТИХИ ── */}
        {active === "Стихи" && (
          <div>
            <div className="mb-8 fade-up d1">
              <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-2">Творческое наследие</p>
              <h2 className="text-4xl mb-6">Стихотворения</h2>

              {/* Search + filters */}
              <div className="search-wrap mb-4">
                <div className="relative">
                  <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Поиск по названию, теме, году..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-sm"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {THEMES.map((t) => (
                  <button key={t} onClick={() => setTheme(t)} className={`filter-tag ${theme === t ? "active" : ""}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              {filteredPoems.length === 0 && (
                <p className="text-muted-foreground py-8 text-center">Ничего не найдено</p>
              )}
              {filteredPoems.map((p, i) => (
                <div key={p.id} className={`poem-card py-5 border-b border-border/40 cursor-pointer fade-up d${Math.min(i + 2, 6)}`} onClick={() => setOpenPoem(openPoem === p.id ? null : p.id)}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl">{p.title}</h3>
                      <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                        <span>{p.year} г.</span>
                        <span className="capitalize">{p.theme}</span>
                      </div>
                    </div>
                    <Icon name={openPoem === p.id ? "ChevronUp" : "ChevronDown"} size={16} className="text-muted-foreground mt-1.5 flex-shrink-0" />
                  </div>
                  {openPoem === p.id && (
                    <div className="mt-4 pl-4 border-l border-border italic text-muted-foreground leading-8">
                      {p.excerpt}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ГАЛЕРЕЯ ── */}
        {active === "Галерея" && (
          <div>
            <div className="mb-8 fade-up d1">
              <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-2">Фотографии и рукописи</p>
              <h2 className="text-4xl">Галерея</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {GALLERY.map((g, i) => (
                <div key={g.id} className={`gallery-item fade-up d${i + 2}`}>
                  <div className="overflow-hidden border border-border/50">
                    <img src={g.src} alt={g.caption} className="w-full object-cover" style={{ aspectRatio: "4/3" }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 italic text-center">{g.caption}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── АРХИВ ── */}
        {active === "Архив" && (
          <div>
            <div className="mb-8 fade-up d1">
              <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-2">Литературный архив</p>
              <h2 className="text-4xl mb-6">Архив произведений</h2>
              <div className="search-wrap">
                <div className="relative">
                  <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Поиск по названию, году, типу..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-sm"
                  />
                </div>
              </div>
            </div>

            <table className="w-full fade-up d2">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-widest text-muted-foreground">
                  <th className="pb-3 pr-6">Год</th>
                  <th className="pb-3 pr-6">Название</th>
                  <th className="pb-3 pr-6">Тип</th>
                  <th className="pb-3 text-right">Стр.</th>
                </tr>
              </thead>
              <tbody>
                {filteredArchive.map((a, i) => (
                  <tr key={i} className="border-b border-border/40 hover:bg-card/60 transition-colors">
                    <td className="py-4 pr-6 text-muted-foreground text-sm">{a.year}</td>
                    <td className="py-4 pr-6 font-medium">{a.title}</td>
                    <td className="py-4 pr-6">
                      <span className="filter-tag capitalize text-xs px-2 py-0.5">{a.type}</span>
                    </td>
                    <td className="py-4 text-right text-muted-foreground text-sm">{a.pages}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredArchive.length === 0 && (
              <p className="text-muted-foreground py-8 text-center">Ничего не найдено</p>
            )}
          </div>
        )}

        {/* ── ХРОНОЛОГИЯ ── */}
        {active === "Хронология" && (
          <div>
            <div className="mb-10 fade-up d1">
              <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-2">Жизнь и творчество</p>
              <h2 className="text-4xl">Хронология</h2>
            </div>
            <div className="space-y-8 max-w-2xl">
              {TIMELINE.map((t, i) => (
                <div key={i} className={`timeline-item fade-up d${Math.min(i + 2, 6)}`}>
                  <div className="flex items-baseline gap-4">
                    <span className="text-lg font-semibold" style={{ color: "hsl(var(--gold))", fontFamily: "'Cormorant', serif", minWidth: "3rem" }}>
                      {t.year}
                    </span>
                    <p className="text-foreground/85 leading-7">{t.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Александр Николаевич Ветров · 1814—1863
          </p>
          <div className="divider mt-3 max-w-xs mx-auto">
            <span style={{ color: "hsl(var(--gold))" }}>✦</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
