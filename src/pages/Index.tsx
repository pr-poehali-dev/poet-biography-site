import { useState } from "react";
import Icon from "@/components/ui/icon";

const PORTRAIT = "https://cdn.poehali.dev/projects/be7fb421-a900-4276-9f1e-e2465fe8af37/files/72faac81-e0d3-44f0-99b0-da6924ee0849.jpg";

const SECTIONS = [
  { id: "bio", label: "Биография" },
  { id: "early", label: "Раннее творчество" },
  { id: "time", label: "Время написания" },
  { id: "hero", label: "Лирический герой" },
  { id: "devices", label: "Средства выразительности" },
  { id: "symbols", label: "Символика" },
  { id: "poems", label: "Тексты стихов" },
];

const POEMS = [
  {
    id: 1, title: "Звезда по имени Солнце", year: 1989, album: "Звезда по имени Солнце",
    tags: ["война", "свобода", "символизм"],
    text: `Белый снег, серый лёд
На растрескавшейся земле.
Одинокий, как волк,
Стоял он у реки.

Его манила звезда
По имени Солнце,
Звезда по имени Солнце,
Звезда по имени Солнце.

Красная-красная кровь
Через час уже просто земля,
Через два здесь уже
Ничего не найдёшь...

И никто не узнает,
Где могила его,
Если только не знал он сам —
Звезда по имени Солнце.`,
  },
  {
    id: 2, title: "Группа крови", year: 1988, album: "Группа крови",
    tags: ["война", "выбор", "герой"],
    text: `Тёплое место, но улицы ждут
Отпечатков наших ног.
Звёздная пыль на сапогах,
Мягкое кресло, клетчатый плед...

Группа крови — на рукаве,
Мой порядковый номер — на рукаве.
Пожелай мне удачи в бою,
Пожелай мне —
Не остаться в этой траве,
Не остаться в этой траве.`,
  },
  {
    id: 3, title: "Перемен!", year: 1986, album: "Ночь",
    tags: ["свобода", "протест", "поколение"],
    text: `Перемен требуют наши сердца,
Перемен требуют наши глаза.
В нашем смехе и в наших слезах,
И в пульсации вен:
«Перемен!»
Мы ждём перемен.`,
  },
  {
    id: 4, title: "Троллейбус", year: 1983, album: "45",
    tags: ["городской романтизм", "одиночество"],
    text: `Последний троллейбус,
Последний троллейбус,
Последний троллейбус,
По улице мчит.
Последний троллейбус,
Ночные тревоги,
Последний троллейбус
Меня подберёт.`,
  },
  {
    id: 5, title: "Мама, мы все тяжело больны", year: 1987, album: "Группа крови",
    tags: ["поколение", "время", "бунт"],
    text: `Мама, мы все тяжело больны,
Мама, я знаю, мы все сошли с ума.
Сигареты в руках, чай на столе —
Эта схема проста.

И больно ступать,
И хочется пить.
Мы прокляты — нам не забыть
Эту ночь, эти дни.`,
  },
  {
    id: 6, title: "Алюминиевые огурцы", year: 1982, album: "45",
    tags: ["абсурдизм", "ранний период"],
    text: `На поле танки грохотали,
Солдаты шли в последний бой,
А молодого командира
Несли с пробитой головой.

Но в пустоте меж строк звенит
Стекло и алюминий,
Огурцы как символ воли —
Абсурд, возведённый в гимн.`,
  },
];

const ALL_TAGS = ["все", "война", "свобода", "символизм", "герой", "протест", "поколение", "одиночество", "абсурдизм"];

const TIMELINE = [
  { year: "1962", text: "Виктор Цой родился 21 июня в Ленинграде в семье учителя физкультуры и преподавателя корейского происхождения" },
  { year: "1977", text: "Увлечение рок-музыкой, первые попытки написания песен, знакомство с панком и новой волной" },
  { year: "1981", text: "Основание группы «Кино» совместно с Алексеем Рыбиным и Олегом Валинским" },
  { year: "1982", text: "Первый альбом «45» — рождение неповторимого звука и поэтики Цоя" },
  { year: "1984", text: "Альбом «Начальник Камчатки», укрепление позиций в ленинградском рок-клубе" },
  { year: "1986", text: "Альбом «Ночь» и гимн поколения «Перемен!» — пик социального высказывания" },
  { year: "1988", text: "«Группа крови» — признание всесоюзного масштаба, главный альбом в творчестве" },
  { year: "1989", text: "«Звезда по имени Солнце» — вершина лирического и символического мышления" },
  { year: "1990", text: "Трагическая гибель 15 августа в Латвии. Последний альбом «Чёрный альбом» выходит посмертно" },
];

export default function Index() {
  const [active, setActive] = useState("bio");
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("все");
  const [openPoem, setOpenPoem] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filteredPoems = POEMS.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || String(p.year).includes(q) || p.tags.some((t) => t.includes(q));
    const matchTag = tag === "все" || p.tags.includes(tag);
    return matchSearch && matchTag;
  });

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      {/* ── HEADER ── */}
      <header style={{ background: "hsl(0 0% 5%)", borderBottom: "1px solid hsl(var(--border))" }} className="sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 flex-shrink-0">
            <div style={{ width: 3, height: 36, background: "hsl(var(--red))" }} />
            <div>
              <h1 className="text-lg tracking-widest uppercase leading-none" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.2em" }}>
                Виктор Цой
              </h1>
              <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))", letterSpacing: "0.15em" }}>
                1962 — 1990
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 flex-wrap">
            {SECTIONS.map((s) => (
              <button key={s.id} onClick={() => setActive(s.id)} className={`nav-link ${active === s.id ? "active" : ""}`}>
                {s.label}
              </button>
            ))}
          </nav>

          <button className="lg:hidden" onClick={() => setMobileMenu(!mobileMenu)} style={{ color: "hsl(var(--foreground))" }}>
            <Icon name={mobileMenu ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {mobileMenu && (
          <div style={{ background: "hsl(0 0% 7%)", borderTop: "1px solid hsl(var(--border))" }} className="lg:hidden px-5 py-4">
            <div className="flex flex-col gap-4">
              {SECTIONS.map((s) => (
                <button key={s.id} onClick={() => { setActive(s.id); setMobileMenu(false); }} className={`nav-link text-left ${active === s.id ? "active" : ""}`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-5 py-12">

        {/* ══ БИОГРАФИЯ ══ */}
        {active === "bio" && (
          <div>
            <div className="grid md:grid-cols-5 gap-12 items-start mb-16">
              <div className="md:col-span-3">
                <p className="section-label mb-3 fu d1">Биография</p>
                <h2 className="text-5xl md:text-7xl leading-none mb-6 fu d2" style={{ letterSpacing: "0.02em" }}>
                  ВИКТОР<br /><span style={{ color: "hsl(var(--red))" }}>ЦОЙ</span>
                </h2>
                <p className="text-sm mb-6 fu d3" style={{ color: "hsl(var(--muted-foreground))", letterSpacing: "0.1em" }}>
                  21 ИЮНЯ 1962 — 15 АВГУСТА 1990 · ЛЕНИНГРАД
                </p>
                <p className="mb-4 fu d4" style={{ color: "hsl(var(--foreground) / 0.8)" }}>
                  Виктор Робертович Цой — советский рок-музыкант, поэт, художник и киноактёр.
                  Основатель и лидер группы «Кино», одной из самых влиятельных в истории
                  советского и российского рока. Его песни стали голосом целого поколения,
                  жаждавшего перемен и свободы в эпоху позднего СССР.
                </p>
                <p className="mb-6 fu d5" style={{ color: "hsl(var(--foreground) / 0.8)" }}>
                  Цой окончил художественное училище имени В. А. Серова, работал кочегаром
                  в котельной «Камчатка» — легендарном месте ленинградского андеграунда.
                  Его творческий путь — от панк-экспериментов начала 1980-х до монументальной
                  лирики «Чёрного альбома» — занял всего десятилетие, но изменил русскую
                  культуру навсегда.
                </p>
                <div className="big-quote fu d6">
                  «Цой жив» — надпись появилась на Арбате сразу после его гибели и не стёрта до сих пор.
                </div>
              </div>
              <div className="md:col-span-2 fu d2">
                <div className="relative">
                  <img
                    src={PORTRAIT}
                    alt="Виктор Цой"
                    className="w-full object-cover"
                    style={{ aspectRatio: "3/4", filter: "grayscale(60%) contrast(1.1)" }}
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-14">
              {[
                { label: "Альбомов", value: "9" },
                { label: "Лет на сцене", value: "9" },
                { label: "Песен", value: "100+" },
                { label: "Концертов", value: "300+" },
              ].map((f, i) => (
                <div key={i} className={`tsoi-card p-6 text-center fu d${i + 2}`}>
                  <div className="text-4xl mb-1" style={{ fontFamily: "'Oswald', sans-serif", color: "hsl(var(--red))" }}>{f.value}</div>
                  <div className="text-xs tracking-widest uppercase" style={{ color: "hsl(var(--muted-foreground))" }}>{f.label}</div>
                </div>
              ))}
            </div>

            <div className="fu d5">
              <p className="section-label mb-6">Хронология жизни</p>
              <div className="space-y-6">
                {TIMELINE.map((t, i) => (
                  <div key={i} className="tl-item">
                    <span className="text-sm font-medium mr-3" style={{ color: "hsl(var(--red))", fontFamily: "'Oswald', sans-serif" }}>{t.year}</span>
                    <span style={{ color: "hsl(var(--foreground) / 0.8)", fontSize: "0.93rem" }}>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ РАННЕЕ ТВОРЧЕСТВО ══ */}
        {active === "early" && (
          <div>
            <p className="section-label mb-3 fu d1">1981–1985</p>
            <h2 className="text-5xl mb-8 fu d2">Раннее творчество</h2>
            <div className="big-quote mb-10 fu d3">
              Первые работы Цоя — смесь панка, новой волны и советского дворового романса,
              ещё без монументальности поздних альбомов, но уже с узнаваемым голосом.
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                { year: "1982", title: "Альбом «45»", text: "Первый альбом группы «Кино», записанный с Борисом Гребенщиковым как звукорежиссёром. Название — от хронометража. Здесь ещё слышны неровности, эксперименты с темпом, панковская дерзость. «Троллейбус», «Алюминиевые огурцы» — стилистические провокации, отрицающие советскую эстраду." },
                { year: "1983", title: "Альбом «46»", text: "Промежуточная работа, фиксирующая поиск собственного языка. Песни более меланхоличны, текстово — первые образы «ночного города» и одинокого наблюдателя, которые станут сквозными мотивами всего творчества." },
                { year: "1984", title: "«Начальник Камчатки»", text: "Название — отсылка к котельной, где работал Цой. Альбом демонстрирует зрелость: ритмическая жёсткость, лаконичный текст, афористичность. «Здесь нет ничего» — первая формула экзистенциального минимализма." },
                { year: "1985", title: "«Ночь»", text: "Переходный альбом к зрелому периоду. Здесь впервые звучат политически заряженные тексты («Перемен!»). Звук становится плотнее, образы — масштабнее. Цой нащупывает язык поколения." },
              ].map((a, i) => (
                <div key={i} className={`tsoi-card p-6 fu d${i + 3}`}>
                  <div className="section-label mb-1">{a.year}</div>
                  <h3 className="text-xl mb-3">{a.title}</h3>
                  <p style={{ color: "hsl(var(--foreground) / 0.75)", fontSize: "0.92rem" }}>{a.text}</p>
                </div>
              ))}
            </div>
            <div className="tsoi-card p-8 fu d5">
              <h3 className="text-2xl mb-4">Влияния и контекст</h3>
              <p className="mb-3" style={{ color: "hsl(var(--foreground) / 0.8)" }}>
                На раннего Цоя оказали влияние <span className="hl">The Cure, Joy Division, Siouxsie and the Banshees</span> —
                мрачная романтика постпанка наложилась на советскую действительность и породила
                уникальную смесь. В отличие от западных прототипов, у Цоя нет нигилизма —
                есть достоинство и сдержанная надежда.
              </p>
              <p style={{ color: "hsl(var(--foreground) / 0.8)" }}>
                Борис Гребенщиков и ленинградский рок-клуб дали Цою платформу. Но уже в первых
                альбомах видно: он идёт своим путём — минимализм текста, прямолинейность образа,
                отказ от многословия.
              </p>
            </div>
          </div>
        )}

        {/* ══ ВРЕМЯ НАПИСАНИЯ ══ */}
        {active === "time" && (
          <div>
            <p className="section-label mb-3 fu d1">Хронология творчества</p>
            <h2 className="text-5xl mb-8 fu d2">Время написания стихов</h2>
            <div className="big-quote mb-10 fu d3">
              За 9 лет активного творчества Цой прошёл путь от дворовых трёхаккордных
              зарисовок до философской лирики, ставшей частью национальной памяти.
            </div>
            <div className="space-y-0 fu d4">
              {[
                { period: "1981–1983", label: "Панк и поиск", width: "30%", desc: "Первые песни в духе британского постпанка. Абсурдистские тексты, ироничный взгляд на советский быт. Короткие, рваные формы. «Алюминиевые огурцы», «Троллейбус»." },
                { period: "1984–1985", label: "Городская лирика", width: "50%", desc: "Образ ночного города, одинокий герой на улицах Ленинграда. Нарастает тема выбора и ответственности. «Последний герой», ранние баллады." },
                { period: "1986–1987", label: "Социальный протест", width: "70%", desc: "«Перемен!» — гимн поколения. Тексты становятся политически заряженными. Метафоры расширяются до масштаба страны." },
                { period: "1988–1989", label: "Зрелая философия", width: "90%", desc: "«Группа крови» и «Звезда по имени Солнце» — вершина. Военная образность, тема смерти и бессмертия, архетипический герой." },
                { period: "1990", label: "Чёрный альбом", width: "100%", desc: "Записан незадолго до гибели, вышел посмертно. Самые зрелые тексты — спокойная сосредоточенность, отсутствие пафоса, предчувствие финала." },
              ].map((p, i) => (
                <div key={i} className={`py-6 border-b fu d${Math.min(i + 3, 7)}`} style={{ borderColor: "hsl(var(--border))" }}>
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-lg" style={{ fontFamily: "'Oswald', sans-serif", color: "hsl(var(--red))", minWidth: "7rem" }}>{p.period}</span>
                    <span className="text-sm tracking-widest uppercase" style={{ color: "hsl(var(--muted-foreground))" }}>{p.label}</span>
                  </div>
                  <div className="mb-3" style={{ height: 3, background: "hsl(var(--border))" }}>
                    <div style={{ height: 3, width: p.width, background: "hsl(var(--red))" }} />
                  </div>
                  <p style={{ color: "hsl(var(--foreground) / 0.75)", fontSize: "0.92rem" }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ ЛИРИЧЕСКИЙ ГЕРОЙ ══ */}
        {active === "hero" && (
          <div>
            <p className="section-label mb-3 fu d1">Образ и язык</p>
            <h2 className="text-5xl mb-2 fu d2">Лирический герой</h2>
            <h2 className="text-5xl mb-8 fu d2" style={{ color: "hsl(var(--red))" }}>и его лексика</h2>
            <div className="big-quote mb-10 fu d3">
              Герой Цоя — не конкретная личность. Это архетип: воин без войны,
              искатель без карты, одиночка внутри толпы.
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="fu d3">
                <h3 className="text-2xl mb-4">Образ героя</h3>
                <div className="space-y-4">
                  {[
                    { title: "Воин", desc: "Военная лексика — «группа крови», «порядковый номер», «рукав» — переносится в мирный контекст. Герой готов к бою, но война неназвана. Это экзистенциальное противостояние с системой, временем, смертью." },
                    { title: "Одиночка", desc: "«Одинокий, как волк» — базовая самоидентификация. Герой всегда на краю: города, времени, жизни. Он не вписан в коллектив, но говорит от имени поколения — парадокс индивидуального и хорового." },
                    { title: "Наблюдатель ночи", desc: "Ночь — главное пространство героя. Не тьма как угроза, а ночь как свобода от дневного контроля. Троллейбусы, фонари, пустые улицы — топография внутренней свободы." },
                    { title: "Ищущий", desc: "«Звезда по имени Солнце» — метафора недостижимого идеала. Герой всегда в движении, устремлён к цели. Цель важнее достижения — романтическая традиция на языке рока." },
                  ].map((item, i) => (
                    <div key={i} className="tsoi-card p-4">
                      <h4 className="text-base mb-1" style={{ color: "hsl(var(--red))" }}>{item.title}</h4>
                      <p style={{ color: "hsl(var(--foreground) / 0.75)", fontSize: "0.9rem" }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="fu d4">
                <h3 className="text-2xl mb-4">Лексические особенности</h3>
                <div className="space-y-4">
                  {[
                    { chip: "Минимализм", desc: "Цой использует слова точечно. Текст среднего стихотворения — 80–120 слов. Нет украшений, нет лишних прилагательных. Каждое слово — несущая конструкция." },
                    { chip: "Конкретная образность", desc: "«Белый снег», «серый лёд», «красная кровь» — цвет как носитель смысла. Абстракция достигается через предельно конкретные детали: «сапоги», «кресло», «рукав»." },
                    { chip: "Повторы-рефрены", desc: "Анафора и кольцевые повторы создают гипнотический ритм. «Группа крови — на рукаве» возникает дважды, усиливая магию. Это техника мантры, а не куплета." },
                    { chip: "Назывные предложения", desc: "Назывные конструкции («Белый снег. Серый лёд.») — синтаксис молчания. Глагол убран, действие остановлено. Читатель сам достраивает смысл." },
                    { chip: "Советизмы и их отрицание", desc: "Цой берёт советскую военную лексику и вырывает её из идеологического контекста. «Порядковый номер» — уже не солдат армии, а человек перед лицом вечности." },
                  ].map((item, i) => (
                    <div key={i} className="tsoi-card p-4">
                      <span className="device-chip mb-2 inline-block">{item.chip}</span>
                      <p style={{ color: "hsl(var(--foreground) / 0.75)", fontSize: "0.9rem" }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ СРЕДСТВА ВЫРАЗИТЕЛЬНОСТИ ══ */}
        {active === "devices" && (
          <div>
            <p className="section-label mb-3 fu d1">Поэтика</p>
            <h2 className="text-4xl mb-1 fu d2">Художественно-изобразительные</h2>
            <h2 className="text-4xl mb-8 fu d2" style={{ color: "hsl(var(--red))" }}>средства выразительности</h2>
            <div className="big-quote mb-10 fu d3">
              Цой — поэт-минималист, но его минимализм насыщен: каждый приём выверен,
              каждый образ работает сразу на нескольких уровнях.
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Метафора", count: "основной приём", desc: "Метафоры Цоя работают на двух уровнях: бытовой и экзистенциальный. Это делает их универсальными.", examples: ["«Звезда по имени Солнце» — недостижимый идеал, смерть как свет", "«Группа крови» — принадлежность к поколению, судьба как диагноз", "«Троллейбус» — последний шанс, ночной ковчег"] },
                { name: "Антитеза", count: "контраст как основа", desc: "Контраст — структурный принцип. Мир у Цоя всегда бинарен: выбор неизбежен, третьего не дано.", examples: ["«Белый снег — красная кровь» (цветовая антитеза)", "«Тёплое место — ждущие улицы» (покой vs движение)", "«Живой — мёртвый», «свет — тьма», «я — мы»"] },
                { name: "Анафора", count: "ритмический повтор", desc: "Повтор у Цоя — не бедность словаря, а намеренный приём. Рефрен превращает стихотворение в ритуал.", examples: ["«Группа крови — на рукаве / Мой порядковый номер — на рукаве»", "«Перемен требуют наши сердца / Перемен требуют наши глаза»", "«Последний троллейбус / Последний троллейбус...»"] },
                { name: "Эпитет", count: "точная деталь", desc: "Эпитеты Цоя — не украшение, а диагноз. Они называют суть явления через единственную точную черту.", examples: ["«Растрескавшаяся земля» — трагический пейзаж", "«Борзая тройка» — советская инверсия классики", "«Однозвучный колокольчик» — одиночество в движении"] },
                { name: "Символ", count: "сквозные образы", desc: "Символы Цоя многозначны и устойчивы — они повторяются из альбома в альбом, создавая единую мифологию.", examples: ["Звезда — идеал, смерть, свобода", "Ночь — пространство свободы и тревоги", "Кровь — принадлежность, цена выбора"] },
                { name: "Умолчание", count: "тишина как смысл", desc: "Цой не договаривает — и это сильнейший приём. Пространство недосказанного читатель заполняет собой.", examples: ["Война не названа — есть только её атрибуты", "«Здесь нет ничего» — что именно нет, не объяснено", "Финал многих стихов обрывается без ответа"] },
              ].map((d, i) => (
                <div key={i} className={`tsoi-card p-6 fu d${Math.min(i + 3, 7)}`}>
                  <div className="flex items-start justify-between mb-3 gap-2 flex-wrap">
                    <h3 className="text-xl">{d.name}</h3>
                    <span className="device-chip">{d.count}</span>
                  </div>
                  <p className="text-xs mb-4" style={{ color: "hsl(var(--foreground) / 0.7)" }}>{d.desc}</p>
                  <ul className="space-y-2">
                    {d.examples.map((ex, j) => (
                      <li key={j} className="text-xs pl-3 border-l" style={{ borderColor: "hsl(var(--red) / 0.5)", color: "hsl(var(--foreground) / 0.65)" }}>
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ СИМВОЛИКА ══ */}
        {active === "symbols" && (
          <div>
            <p className="section-label mb-3 fu d1">Смыслы и образы</p>
            <h2 className="text-5xl mb-8 fu d2">Символика поэзии Цоя</h2>
            <div className="big-quote mb-12 fu d3">
              Поэтический мир Цоя — замкнутая мифология с собственными символами,
              которые складываются в систему от альбома к альбому.
            </div>
            <div className="space-y-6">
              {[
                { symbol: "☀ Солнце / Звезда", songs: ["Звезда по имени Солнце", "Последний герой"], meaning: "Центральный символ. Солнце у Цоя — не источник тепла, а далёкая недостижимая цель. «Звезда по имени Солнце» — парадокс: звезда (холодная, далёкая) названа именем Солнца (близкого, тёплого). Это мечта, которую невозможно достичь — и ради которой стоит умереть. Также солнце традиционно связано со смертью и возрождением в архаической символике." },
                { symbol: "🩸 Кровь", songs: ["Группа крови", "Звезда по имени Солнце"], meaning: "Кровь у Цоя — одновременно биологическое (группа, тип) и экзистенциальное. «Группа крови» — принадлежность к поколению, к числу тех, кто выбрал борьбу. Кровь обозначает цену выбора: «красная-красная кровь / через час уже просто земля» — жизнь конечна, смерть неизбежна, но выбор был сделан." },
                { symbol: "🌙 Ночь", songs: ["Троллейбус", "Ночь", "Последний герой"], meaning: "Ночь — главное хронотопическое пространство Цоя. В советском контексте ночь — время, когда ослабевает контроль, когда можно быть собой. Ночные улицы, троллейбусы, фонари — топография свободы и одиночества одновременно." },
                { symbol: "⚔ Война / Оружие", songs: ["Группа крови", "Перемен!", "Мама, мы все тяжело больны"], meaning: "Военная символика у Цоя лишена конкретики. Нет врага, нет фронта — есть атрибуты: группа крови, порядковый номер, трава. Это война как экзистенциальное состояние, метафора противостояния системе, времени, смерти. Отказ называть врага делает символ универсальным." },
                { symbol: "🐺 Волк / Одиночка", songs: ["Звезда по имени Солнце", "Группа крови"], meaning: "«Одинокий, как волк» — ключевое самоопределение героя. Волк в русской традиции — изгой, но и свободный. Цой берёт этот образ без сентиментальности: одиночество — не жалоба, а выбор и достоинство. Герой стоит в стороне от толпы, но говорит от её имени." },
                { symbol: "🖤 Чёрный цвет", songs: ["Чёрный альбом (весь)"], meaning: "Последний альбом называется «Чёрный». Чёрный у Цоя — не цвет смерти, а цвет молчания, концентрации, финала. Это цвет кожаной куртки — символа субкультурной идентичности. Чёрный альбом — обнажение до основания, снятие всех масок." },
              ].map((s, i) => (
                <div key={i} className={`tsoi-card p-7 fu d${Math.min(i + 2, 7)}`}>
                  <div className="flex flex-col md:flex-row md:gap-8">
                    <div className="md:w-1/4 mb-3 md:mb-0">
                      <h3 className="text-xl mb-2">{s.symbol}</h3>
                      <div className="flex flex-wrap gap-1">
                        {s.songs.map((song, j) => (
                          <span key={j} className="device-chip">{song}</span>
                        ))}
                      </div>
                    </div>
                    <p className="md:w-3/4" style={{ color: "hsl(var(--foreground) / 0.75)", fontSize: "0.92rem" }}>{s.meaning}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ ТЕКСТЫ СТИХОВ ══ */}
        {active === "poems" && (
          <div>
            <p className="section-label mb-3 fu d1">Архив</p>
            <h2 className="text-5xl mb-8 fu d2">Тексты стихов</h2>
            <div className="mb-6 fu d3">
              <div className="relative mb-4">
                <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(var(--muted-foreground))" }} />
                <input
                  type="text"
                  placeholder="Поиск по названию, году, теме..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="s-input"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {ALL_TAGS.map((t) => (
                  <button key={t} onClick={() => setTag(t)} className={`tag ${tag === t ? "active" : ""}`}>{t}</button>
                ))}
              </div>
            </div>
            <div className="space-y-2 fu d4">
              {filteredPoems.length === 0 && (
                <p className="text-center py-12" style={{ color: "hsl(var(--muted-foreground))" }}>Ничего не найдено</p>
              )}
              {filteredPoems.map((p) => (
                <div
                  key={p.id}
                  className={`poem-block py-5 border-b ${openPoem === p.id ? "open" : ""}`}
                  style={{ borderColor: "hsl(var(--border))" }}
                  onClick={() => setOpenPoem(openPoem === p.id ? null : p.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl mb-1">{p.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs mb-2" style={{ color: "hsl(var(--muted-foreground))" }}>
                        <span>{p.year} г.</span>
                        <span>·</span>
                        <span>{p.album}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {p.tags.map((t, i) => (
                          <span key={i} className="device-chip">{t}</span>
                        ))}
                      </div>
                    </div>
                    <Icon name={openPoem === p.id ? "ChevronUp" : "ChevronDown"} size={18} className="flex-shrink-0 mt-2" style={{ color: "hsl(var(--muted-foreground))" }} />
                  </div>
                  {openPoem === p.id && (
                    <div className="mt-6 pl-4">
                      <p className="poem-text">{p.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <footer style={{ borderTop: "1px solid hsl(var(--border))", background: "hsl(0 0% 5%)" }} className="mt-20 py-8">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs tracking-widest uppercase" style={{ color: "hsl(var(--muted-foreground))", fontFamily: "'Oswald', sans-serif" }}>
            Виктор Цой · 1962—1990
          </span>
          <span className="text-xs" style={{ color: "hsl(var(--muted-foreground) / 0.5)" }}>Цой жив</span>
        </div>
      </footer>
    </div>
  );
}
