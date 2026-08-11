/** Default section content for seed / memory fallback — Makuzo Figma */

export const SECTION_KEYS = [
  "hero",
  "design",
  "services",
  "projects",
  "about",
  "careers",
  "contacts",
  "smartHome",
  "footer",
];

export const DEFAULT_SECTIONS = [
  {
    key: "hero",
    visible: true,
    contentRu: {
      locationTag: "РИГА · ЛАТВИЯ",
      title: "Электромонтаж объектов любой сложности",
      titleHighlight: "любой сложности",
      subtitle:
        "Современные инженерные решения по электромонтажу промышленных, коммерческих, общественных и частных объектов. Пять направлений: электромонтаж, электроизмерения, слаботочные системы, электрощиты и автоматизация.",
      ctaText: "Обсудить проект",
      ctaSecondaryText: "Смотреть услуги",
      ctaHref: "#contacts",
      bgImageUrl:
        "/img/hero-bg.png",
    },
    contentLv: {
      locationTag: "RĪGA · LATVIJA",
      title: "Objektu elektroinstalācija jebkurā sarežģītībā",
      titleHighlight: "jebkurā sarežģītībā",
      subtitle:
        "Mūsdienīgi inženiertehniskie risinājumi rūpniecības, komerciālo, publisko un privāto objektu elektroinstalācijai. Pieci virzieni: elektroinstalācija, elektromērījumi, vājstrāvas sistēmas, elektrosadales skapji un automatizācija.",
      ctaText: "Apspriest projektu",
      ctaSecondaryText: "Skatīt pakalpojumus",
      ctaHref: "#contacts",
      bgImageUrl:
        "/img/hero-bg.png",
    },
    contentEn: {
      locationTag: "RIGA · LATVIA",
      title: "Electrical installation of facilities of any complexity",
      titleHighlight: "any complexity",
      subtitle:
        "Modern engineering solutions for electrical installation of industrial, commercial, public and private facilities. Five areas: electrical installation, electrical measurements, low-current systems, electrical switchboards and automation.",
      ctaText: "Discuss project",
      ctaSecondaryText: "View services",
      ctaHref: "#contacts",
      bgImageUrl:
        "/img/hero-bg.png",
    },
  },
  {
    key: "design",
    visible: true,
    contentRu: {
      label: "ДИЗАЙН",
      title: "Дизайнерское сопровождение",
      pageTitle: "Комплексное планирование электрики",
      subtitle: "Точность. Эстетика. Профессионализм.",
      teaser:
        "Качественная электрика начинается не со штробления стен, а с грамотного планирования. Визуализация всех электроустановочных изделий в масштабе 1:1 — ещё до начала монтажа.",
      ctaText: "Подробнее о сервисе",
      ctaHref: "/design",
      imageUrl: "/img/design-neon.png",
      gallery: [
        "/img/design-template-mount.jpg",
        "/img/design-templates-wall.jpg",
        "/img/design-template-drill.jpg",
        "/img/design-templates-set.jpg",
        "/img/design-template-5gang.jpg",
        "/img/design-template-2gang.jpg",
        "/img/design-neon.png",
        "/img/design-wiring.png",
      ],
      galleryPreviewCount: 3,
      galleryLabel: "ГАЛЕРЕЯ",
      galleryTitle: "Как это выглядит",
      galleryCta: "Посмотреть все",
      galleryPageTitle: "Галерея дизайнерского сопровождения",
      galleryPageIntro: "Шаблоны, разметка и монтаж — нажмите на фото, чтобы открыть крупнее.",
      headline: "Увидеть электрику до начала монтажа.",
      heroImageUrl: "/img/design-templates-wall.jpg",
      featureImageUrl: "/img/design-template-mount.jpg",
      intro:
        "Качественная электрика начинается не со штробления стен, а с грамотного планирования. Поэтому до начала монтажа мы предлагаем увидеть расположение электроустановочных изделий в масштабе 1:1.",
      featureEyebrow: "Шаблоны",
      featureTitle: "Шаблоны 1:1",
      featureText:
        "Полноразмерные шаблоны из фанеры позволяют заранее увидеть расположение розеток, выключателей и других элементов непосредственно в помещении.",
      paragraphs: [
        "По проекту мы изготавливаем шаблоны и временно устанавливаем их на стены — можно оценить удобство и внести изменения до начала монтажа.",
        "После утверждения шаблоны используются как кондукторы для сверления: согласованная разметка точно переносится на стену.",
      ],
      designerNote:
        "Работаем по дизайн-проекту и согласовываем расположение электроустановочных изделий с заказчиком и дизайнером.",
      processLabel: "Всё просто",
      processSteps: ["Проект", "Шаблон 1:1", "Согласование", "Монтаж"],
      advantagesTitle: "Наши преимущества",
      advantages: [
        "Визуализация электрики в масштабе 1:1",
        "Возможность изменить расположение до начала монтажа",
        "Точная разметка и сверление",
        "Ровные блоки розеток и выключателей",
        "Минимум ошибок и переделок",
      ],
      advantageCards: [
        { title: "Масштаб 1:1", text: "Всё видно в реальном размере." },
        { title: "Проверка на месте", text: "Можно оценить расположение непосредственно в помещении." },
        { title: "Корректировки", text: "Изменения до сверления и штробления." },
        { title: "Точная разметка", text: "Шаблон используется как кондуктор." },
        { title: "Ровный результат", text: "Точная геометрия блоков." },
      ],
      cultureTitle: "Работаем аккуратно",
      cultureIntro:
        "Профессиональный инструмент, аккуратный монтаж, защита помещения и порядок после каждого этапа работ.",
      cultureItems: [],
      closing:
        "Наша задача — заранее продумать каждую деталь, согласовать её с заказчиком и выполнить монтаж точно по утверждённому решению.",
      detailCta: "Узнать подробнее",
      detail: {
        title: "Комплексное планирование электрики",
        subtitle: "Точность. Эстетика. Профессионализм.",
        intro:
          "Качественная электрика начинается с грамотного планирования. Поэтому ещё до начала монтажа мы предлагаем увидеть будущий результат в реальном масштабе.",
        sectionTitle: "Увидеть электрику до монтажа",
        paragraphs: [
          "Мы изготавливаем полноразмерные шаблоны в масштабе 1:1 по проекту.",
          "Шаблоны временно устанавливаются на стены, чтобы заказчик мог заранее увидеть расположение розеток, выключателей и других элементов непосредственно в помещении.",
          "Это позволяет проверить удобство, высоты, расстояния и соответствие интерьеру до сверления и штробления стен.",
          "При работе по дизайн-проекту мы также можем согласовать расположение электроустановочных изделий с дизайнером.",
        ],
        processLabel: "Всё просто",
        processSteps: ["Проект", "шаблоны 1:1", "согласование", "точный монтаж"],
        processNote:
          "После утверждения расположения шаблоны используются как кондукторы для сверления, что позволяет точно перенести согласованную схему на стены.",
        advantagesTitle: "Что это даёт",
        advantages: [
          "Визуализация электрики в масштабе 1:1",
          "Возможность изменить расположение до начала монтажа",
          "Точная разметка и сверление",
          "Ровные блоки розеток и выключателей",
          "Соблюдение проектных размеров и высот",
          "Меньше ошибок и переделок",
        ],
        cultureTitle: "Работаем аккуратно",
        cultureIntro:
          "Профессиональный инструмент, аккуратный монтаж, защита помещения и порядок после каждого этапа работ.",
        closing:
          "Наша задача — сделать электрику точной, удобной и продуманной ещё до того, как начинается монтаж.",
      },
    },
    contentLv: {
      label: "DIZAINS",
      title: "Dizaina atbalsts",
      pageTitle: "Kompleksā elektroinstalācijas plānošana",
      subtitle: "Precizitāte. Estētika. Profesionālisms.",
      teaser:
        "Kvalitatīva elektroinstalācija sākas nevis ar sienu štrobešanu, bet ar pareizu plānošanu. Visu elektroinstalācijas elementu vizualizācija mērogā 1:1 — vēl pirms montāžas sākuma.",
      ctaText: "Vairāk par pakalpojumu",
      ctaHref: "/design",
      imageUrl: "/img/design-neon.png",
      gallery: [
        "/img/design-template-mount.jpg",
        "/img/design-templates-wall.jpg",
        "/img/design-template-drill.jpg",
        "/img/design-templates-set.jpg",
        "/img/design-template-5gang.jpg",
        "/img/design-template-2gang.jpg",
        "/img/design-neon.png",
        "/img/design-wiring.png",
      ],
      galleryPreviewCount: 3,
      galleryLabel: "GALERIJA",
      galleryTitle: "Kā tas izskatās",
      galleryCta: "Skatīt visu",
      galleryPageTitle: "Dizaina atbalsta galerija",
      galleryPageIntro: "Veidnes, atzīmēšana un montāža — noklikšķiniet uz foto, lai apskatītu lielākā izmērā.",
      headline: "Ieraudzīt elektroinstalāciju pirms montāžas.",
      heroImageUrl: "/img/design-templates-wall.jpg",
      featureImageUrl: "/img/design-template-mount.jpg",
      intro:
        "Kvalitatīva elektroinstalācija sākas nevis ar sienu štrobešanu, bet ar pārdomātu plānošanu. Tāpēc pirms montāžas piedāvājam ieraudzīt elektroinstalācijas izstrādājumu izvietojumu mērogā 1:1.",
      featureEyebrow: "Veidnes",
      featureTitle: "Veidnes 1:1",
      featureText:
        "Pilna izmēra finiera veidnes ļauj iepriekš ieraudzīt kontaktligzdu, slēdžu un citu elementu izvietojumu tieši telpā.",
      paragraphs: [
        "Pēc projekta izgatavojam pilna izmēra finiera veidnes un īslaicīgi uzstādām tās uz sienām. Pasūtītājs var ieraudzīt nākamo kontaktligzdu, slēdžu un citu elementu izvietojumu tieši telpā un vajadzības gadījumā veikt izmaiņas pirms montāžas.",
        "Pēc izvietojuma apstiprināšanas veidnes tiek izmantotas kā vadotnes urbšanai. Tas ļauj precīzi pārnest saskaņoto atzīmi uz sienu un iegūt līdzinātu visu elementu izvietojumu.",
      ],
      designerNote:
        "Strādājam pēc dizaina projekta un saskaņojam elektroinstalācijas izstrādājumu izvietojumu ar pasūtītāju un dizaineru.",
      processLabel: "Viss vienkārši",
      processSteps: ["Projekts", "Veidne 1:1", "Saskaņošana", "Montāža"],
      advantagesTitle: "Mūsu priekšrocības",
      advantages: [
        "Elektroinstalācijas vizualizācija mērogā 1:1",
        "Iespēja mainīt izvietojumu pirms montāžas",
        "Precīza atzīmēšana un urbšana",
        "Līdzināti kontaktligzdu un slēdžu bloki",
        "Mazāk kļūdu un pārtaisījumu",
      ],
      advantageCards: [
        { title: "Mērogs 1:1", text: "Viss redzams reālā izmērā." },
        { title: "Pārbaude uz vietas", text: "Izvietojumu var novērtēt tieši telpā." },
        { title: "Korekcijas", text: "Izmaiņas pirms urbšanas un štrobešanas." },
        { title: "Precīza atzīme", text: "Veidne darbojas kā vadotne." },
        { title: "Līdzināts rezultāts", text: "Precīza bloku ģeometrija." },
      ],
      cultureTitle: "Strādājam rūpīgi",
      cultureIntro:
        "Profesionāls instruments, rūpīga montāža, telpu aizsardzība un kārtība pēc katra darba posma.",
      cultureItems: [],
      closing:
        "Mūsu uzdevums — iepriekš pārdomāt katru detaļu, saskaņot to ar pasūtītāju un veikt montāžu precīzi pēc apstiprinātā risinājuma.",
      detailCta: "Uzzināt vairāk",
      detail: {
        title: "Kompleksā elektroinstalācijas plānošana",
        subtitle: "Precizitāte. Estētika. Profesionālisms.",
        intro:
          "Kvalitatīva elektroinstalācija sākas ar pārdomātu plānošanu. Tāpēc vēl pirms montāžas sākuma piedāvājam ieraudzīt nākamo rezultātu reālā mērogā.",
        sectionTitle: "Ieraudzīt elektroinstalāciju pirms montāžas",
        paragraphs: [
          "Mēs izgatavojam pilna izmēra veidnes mērogā 1:1 pēc projekta.",
          "Veidnes īslaicīgi tiek uzstādītas uz sienām, lai pasūtītājs iepriekš ieraudzītu kontaktligzdu, slēdžu un citu elementu izvietojumu tieši telpā.",
          "Tas ļauj pārbaudīt ērtumu, augstumus, attālumus un atbilstību interjeram pirms urbšanas un sienu štrobešanas.",
          "Strādājot pēc dizaina projekta, elektroinstalācijas izstrādājumu izvietojumu varam saskaņot arī ar dizaineru.",
        ],
        processLabel: "Viss vienkārši",
        processSteps: ["Projekts", "veidnes 1:1", "saskaņošana", "precīza montāža"],
        processNote:
          "Pēc izvietojuma apstiprināšanas veidnes tiek izmantotas kā vadotnes urbšanai — saskaņotā shēma precīzi tiek pārnesta uz sienām.",
        advantagesTitle: "Ko tas dod",
        advantages: [
          "Elektroinstalācijas vizualizācija mērogā 1:1",
          "Iespēja mainīt izvietojumu pirms montāžas sākuma",
          "Precīza atzīmēšana un urbšana",
          "Līdzināti kontaktligzdu un slēdžu bloki",
          "Projekta izmēru un augstumu ievērošana",
          "Mazāk kļūdu un pārtaisījumu",
        ],
        cultureTitle: "Strādājam rūpīgi",
        cultureIntro:
          "Profesionāls instruments, rūpīga montāža, telpu aizsardzība un kārtība pēc katra darba posma.",
        closing:
          "Mūsu uzdevums — padarīt elektroinstalāciju precīzu, ērtu un pārdomātu vēl pirms montāžas sākuma.",
      },
    },
    contentEn: {
      label: "DESIGN",
      title: "Design support",
      pageTitle: "Comprehensive electrical planning",
      subtitle: "Precision. Aesthetics. Professionalism.",
      teaser:
        "Quality electrical work does not begin with chasing walls — it begins with proper planning. Visualization of all electrical fittings at 1:1 scale — before installation even starts.",
      ctaText: "Learn more about the service",
      ctaHref: "/design",
      imageUrl: "/img/design-neon.png",
      gallery: [
        "/img/design-template-mount.jpg",
        "/img/design-templates-wall.jpg",
        "/img/design-template-drill.jpg",
        "/img/design-templates-set.jpg",
        "/img/design-template-5gang.jpg",
        "/img/design-template-2gang.jpg",
        "/img/design-neon.png",
        "/img/design-wiring.png",
      ],
      galleryPreviewCount: 3,
      galleryLabel: "GALLERY",
      galleryTitle: "Work in photos",
      galleryCta: "View all",
      galleryPageTitle: "Design support gallery",
      galleryPageIntro: "Templates, marking and installation — click any photo to open it larger.",
      headline: "See the electrics before installation.",
      heroImageUrl: "/img/design-templates-wall.jpg",
      featureImageUrl: "/img/design-template-mount.jpg",
      intro:
        "Quality electrics starts not with chasing walls, but with proper planning. So before installation we offer to see the layout of electrical fittings at 1:1 scale.",
      featureEyebrow: "Templates",
      featureTitle: "1:1 templates",
      featureText:
        "Full-size plywood templates let you see socket, switch and fitting placement in the room itself — before any drilling.",
      paragraphs: [
        "From the project we make full-size plywood templates and temporarily mount them on walls. The client can see the future placement of sockets, switches and other fittings in the room and adjust it before installation starts.",
        "After approval, templates are used as drilling guides. That transfers the agreed layout to the wall and keeps every block aligned.",
      ],
      designerNote:
        "We work from the design project and align electrical fitting positions with the client and the designer.",
      processLabel: "It's simple",
      processSteps: ["Project", "1:1 template", "Alignment", "Install"],
      advantagesTitle: "What you get",
      advantages: [
        "Electrical visualization at 1:1 scale",
        "Ability to change placement before installation",
        "Precise marking and drilling",
        "Even socket and switch blocks",
        "Fewer errors and rework",
      ],
      advantageCards: [
        { title: "1:1 scale", text: "Everything visible at real size." },
        { title: "On-site check", text: "Assess placement in the room itself." },
        { title: "Adjustments", text: "Changes before drilling and chasing." },
        { title: "Precise marking", text: "The template becomes a drill guide." },
        { title: "Clean result", text: "Accurate geometry of every block." },
      ],
      cultureTitle: "We work carefully",
      cultureIntro:
        "Professional tools, careful installation, room protection and order after every stage of work.",
      cultureItems: [],
      closing:
        "Our job is to think through every detail in advance, align it with the client, and install exactly to the approved plan.",
      detailCta: "Learn more",
      detail: {
        title: "Comprehensive electrical planning",
        subtitle: "Precision. Aesthetics. Professionalism.",
        intro:
          "Quality electrics starts with proper planning. That is why, before installation begins, we offer to see the future result at real scale.",
        sectionTitle: "See the electrics before installation",
        paragraphs: [
          "We manufacture full-size templates at 1:1 scale from the project.",
          "Templates are temporarily mounted on walls so the client can see the placement of sockets, switches and other fittings in the room itself.",
          "This lets you check convenience, heights, distances and how it fits the interior before any drilling or chasing.",
          "When working from a design project, we can also align electrical fitting positions with the designer.",
        ],
        processLabel: "It's simple",
        processSteps: ["Project", "1:1 templates", "alignment", "precise install"],
        processNote:
          "After the layout is approved, templates are used as drilling guides so the agreed scheme is transferred to the walls with accuracy.",
        advantagesTitle: "What you get",
        advantages: [
          "Electrical visualization at 1:1 scale",
          "Ability to change placement before installation",
          "Precise marking and drilling",
          "Even socket and switch blocks",
          "Project dimensions and heights respected",
          "Fewer errors and rework",
        ],
        cultureTitle: "We work carefully",
        cultureIntro:
          "Professional tools, careful installation, room protection and order after every stage of work.",
        closing:
          "Our job is to make the electrics precise, convenient and thought through before installation even starts.",
      },
    },
  },
  {
    key: "about",
    visible: true,
    contentRu: {
      label: "О КОМПАНИИ",
      title: "Кто мы",
      description:
        "Работаем с торговыми центрами, больницами, складами, промышленными предприятиями, госучреждениями и частными домами по всей Латвии.",
      statsVisible: false,
      stats: [
        { value: "15+", label: "лет опыта в отрасли" },
        { value: "500+", label: "объектов по всей LV" },
        { value: "24/7", label: "поддержка и гарантия" },
        { value: "36+", label: "партнёров и заказчиков" },
      ],
      features: [
        {
          title: "Электромонтаж",
          text: "Сети, слаботочка и автоматика — от квартиры до цеха.",
        },
        {
          title: "Сертифицированные специалисты",
          text: "В реестре строительных коммерсантов Латвии, с нужными сертификатами.",
        },
        {
          title: "Полный цикл",
          text: "Решение, смета, монтаж, документы и гарантия.",
        },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80",
    },
    contentLv: {
      label: "PAR UZNĒMUMU",
      title: "Kas mēs esam",
      description:
        "Strādājam ar tirdzniecības centriem, slimnīcām, noliktavām, rūpniecības uzņēmumiem, valsts iestādēm un privātmājām visā Latvijā.",
      statsVisible: false,
      stats: [
        { value: "15+", label: "gadu pieredze nozarē" },
        { value: "500+", label: "objekti visā Latvijā" },
        { value: "24/7", label: "atbalsts un garantija" },
        { value: "36+", label: "partneri un pasūtītāji" },
      ],
      features: [
        {
          title: "Elektroinstalācija",
          text: "Tīkli, vājstrāva un automatizācija — no dzīvokļa līdz ceham.",
        },
        {
          title: "Sertificēti speciālisti",
          text: "Latvijas būvkomersantu reģistrā, ar nepieciešamajiem sertifikātiem.",
        },
        {
          title: "Pilns cikls",
          text: "Risinājums, tāme, montāža, dokumenti un garantija.",
        },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80",
    },
    contentEn: {
      label: "ABOUT",
      title: "Who we are",
      description:
        "We work with shopping malls, hospitals, warehouses, industrial enterprises, government institutions and private homes throughout Latvia.",
      statsVisible: false,
      stats: [
        { value: "15+", label: "years of industry experience" },
        { value: "500+", label: "projects across Latvia" },
        { value: "24/7", label: "support and warranty" },
        { value: "36+", label: "partners and clients" },
      ],
      features: [
        {
          title: "Electrical installation",
          text: "Power, low-current and automation — from apartments to workshops.",
        },
        {
          title: "Certified specialists",
          text: "Listed in Latvia’s construction merchants register, with required certificates.",
        },
        {
          title: "Full cycle",
          text: "Solution, estimate, install, paperwork and warranty.",
        },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80",
    },
  },
  {
    key: "services",
    visible: true,
    contentRu: {
      label: "УСЛУГИ",
      title: "Что мы делаем",
      description:
        "Пять направлений: электромонтаж, электроизмерения, слаботочные системы, электрощиты и автоматизация.",
      items: [
        {
          num: "01",
          visible: true,
          title: "Электромонтаж",
          description: "Монтаж силовых и осветительных сетей, оборудования и систем «Умный дом».",
          bullets: [
            "Замена электропроводки",
            "Монтаж наружных и внутренних силовых линий",
            "Монтаж наружных и внутренних сетей освещения",
            "Установка силового электрооборудования",
            "Сборка щитов управления и автоматизации",
            "Монтаж осветительного оборудования",
            "Монтаж систем заземления, защиты от перенапряжений и молниезащиты",
            "Подключение электрического оборудования",
            "Разработка и монтаж систем «Умный дом»",
            "Проектирование и подготовка исполнительной документации",
          ],
        },
        {
          num: "02",
          visible: true,
          title: "Электроизмерения",
          description: "Измерения, аудит и тепловизионная диагностика электроустановок.",
          bullets: [
            "Измерение сопротивления изоляции",
            "Измерение параметров заземления",
            "Проверка целостности электрических цепей",
            "Проверка устройств защиты электрической сети",
            "Измерение максимальной и фактической мощности",
            "Аудит электроустановок",
            "Тепловизионная диагностика электрических контактов",
            "Измерение сопротивления контура заземления",
            "Проектирование и подготовка исполнительной документации",
          ],
        },
        {
          num: "03",
          visible: true,
          title: "Слаботочные системы",
          description: "Пожарная и охранная сигнализация, видеонаблюдение, СКУД и СКС.",
          bullets: [
            "Монтаж пожарной сигнализации",
            "Монтаж видеонаблюдения",
            "Монтаж систем контроля доступа",
            "Монтаж структурированных кабельных систем (СКС)",
            "Монтаж охранной сигнализации",
            "Проектирование и подготовка исполнительной документации",
          ],
        },
        {
          num: "04",
          visible: true,
          title: "Электрощиты",
          description: "Вводно-распределительные, учёта, силовые, освещения и управления.",
          bullets: [
            "Вводно-распределительные щиты",
            "Щиты учета электроэнергии",
            "Силовые распределительные щиты",
            "Щиты освещения",
            "Щиты управления",
          ],
        },
        {
          num: "05",
          visible: true,
          title: "Автоматизация",
          description: "Промышленная автоматика, управление освещением, вентиляцией и процессами.",
          bullets: [
            "Автоматизация производственных линий",
            "Системы управления освещением и вентиляцией",
            "Интеграция BMS и диспетчеризация",
            "Проектирование и подготовка исполнительной документации",
          ],
        },
      ],
    },
    contentLv: {
      label: "PAKALPOJUMI",
      title: "Ko mēs darām",
      description:
        "Pieci virzieni: elektroinstalācija, elektromērījumi, vājstrāvas sistēmas, elektrosadales skapji un automatizācija.",
      items: [
        {
          num: "01",
          visible: true,
          title: "Elektroinstalācija",
          description:
            "Spēka un apgaismojuma tīklu, iekārtu un «Viedās mājas» sistēmu montāža.",
          bullets: [
            "Elektroinstalācijas nomaiņa",
            "Ārējo un iekšējo spēka līniju montāža",
            "Ārējo un iekšējo apgaismojuma tīklu montāža",
            "Spēka elektroiekārtu uzstādīšana",
            "Vadības un automatizācijas skapju montāža",
            "Apgaismojuma iekārtu montāža",
            "Zemējuma, pārsprieguma aizsardzības un zibensnovedēju sistēmu montāža",
            "Elektroiekārtu pievienošana",
            "«Viedās mājas» sistēmu izstrāde un montāža",
            "Projektu izstrāde un izpilddokumentācijas sagatavošana",
          ],
        },
        {
          num: "02",
          visible: true,
          title: "Elektromērījumi",
          description:
            "Mērījumi, audits un elektroinstalāciju termogrāfiskā diagnostika.",
          bullets: [
            "Izolācijas pretestības mērījumi",
            "Zemējuma parametru mērījumi",
            "Elektrisko ķēžu nepārtrauktības pārbaude",
            "Elektriskā tīkla aizsardzības ierīču pārbaude",
            "Maksimālās un faktiskās jaudas mērījumi",
            "Elektroinstalāciju audits",
            "Elektrisko kontaktu termogrāfiskā diagnostika",
            "Zemējuma kontūra pretestības mērījums",
            "Projektu izstrāde un izpilddokumentācijas sagatavošana",
          ],
        },
        {
          num: "03",
          visible: true,
          title: "Vājstrāvas sistēmas",
          description:
            "Ugunsgrēka un apsardzes signalizācija, video novērošana, pieejas kontrole un SKS.",
          bullets: [
            "Ugunsgrēka signalizācijas montāža",
            "Video novērošanas montāža",
            "Pieejas kontroles sistēmu montāža",
            "Strukturēto kabeļu sistēmu (SKS) montāža",
            "Apsardzes signalizācijas montāža",
            "Projektu izstrāde un izpilddokumentācijas sagatavošana",
          ],
        },
        {
          num: "04",
          visible: true,
          title: "Elektrosadales skapji",
          description:
            "Ievada un sadalības, uzskaites, spēka, apgaismojuma un vadības skapji.",
          bullets: [
            "Ievada un sadalības skapji",
            "Elektroenerģijas uzskaites skapji",
            "Spēka sadalības skapji",
            "Apgaismojuma skapji",
            "Vadības skapji",
          ],
        },
        {
          num: "05",
          visible: true,
          title: "Automatizācija",
          description:
            "Rūpnieciskā automatizācija, apgaismojuma, ventilācijas un procesu vadība.",
          bullets: [
            "Ražošanas līniju automatizācija",
            "Apgaismojuma un ventilācijas vadības sistēmas",
            "BMS integrācija un dispečerizācija",
            "Projektu izstrāde un izpilddokumentācijas sagatavošana",
          ],
        },
      ],
    },
    contentEn: {
      label: "SERVICES",
      title: "What we do",
      description:
        "Five areas: electrical installation, electrical measurements, low-current systems, electrical switchboards and automation.",
      items: [
        {
          num: "01",
          visible: true,
          title: "Electrical installation",
          description: "Installation of power and lighting networks, equipment and smart home systems.",
          bullets: [
            "Electrical wiring replacement",
            "Installation of external and internal power lines",
            "Installation of external and internal lighting networks",
            "Installation of power electrical equipment",
            "Assembly of control and automation panels",
            "Installation of lighting equipment",
            "Installation of grounding, surge protection and lightning protection systems",
            "Connection of electrical equipment",
            "Design and installation of smart home systems",
            "Design and preparation of as-built documentation",
          ],
        },
        {
          num: "02",
          visible: true,
          title: "Electrical measurements",
          description: "Measurements, audits and thermal imaging diagnostics of electrical installations.",
          bullets: [
            "Insulation resistance measurement",
            "Grounding parameter measurement",
            "Electrical circuit continuity testing",
            "Electrical network protection device testing",
            "Maximum and actual power measurement",
            "Electrical installation audit",
            "Thermal imaging diagnostics of electrical contacts",
            "Grounding loop resistance measurement",
            "Design and preparation of as-built documentation",
          ],
        },
        {
          num: "03",
          visible: true,
          title: "Low-current systems",
          description: "Fire and security alarms, video surveillance, access control and structured cabling.",
          bullets: [
            "Fire alarm installation",
            "Video surveillance installation",
            "Access control system installation",
            "Structured cabling system (SCS) installation",
            "Security alarm installation",
            "Design and preparation of as-built documentation",
          ],
        },
        {
          num: "04",
          visible: true,
          title: "Electrical switchboards",
          description: "Main distribution, metering, power, lighting and control panels.",
          bullets: [
            "Main distribution panels",
            "Electricity metering panels",
            "Power distribution panels",
            "Lighting panels",
            "Control panels",
          ],
        },
        {
          num: "05",
          visible: true,
          title: "Automation",
          description: "Industrial automation, lighting, ventilation and process control.",
          bullets: [
            "Production line automation",
            "Lighting and ventilation control systems",
            "BMS integration and building management",
            "Design and preparation of as-built documentation",
          ],
        },
      ],
    },
  },
  {
    key: "projects",
    visible: true,
    contentRu: {
      label: "ПРОЕКТЫ",
      title: "Наши проекты",
      description:
        "От квартир и домов до магазинов, складов и производств.",
      items: [
        {
          tag: "ЧАСТНЫЙ СЕКТОР",
          title: "Квартиры, дома и городская среда",
          meta: "Жилая застройка",
          description:
            "Электромонтаж в квартирах и частных домах, уличное освещение, благоустройство дворов, парков и общественных зон.",
          imageUrl:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        },
        {
          tag: "ИНДУСТРИАЛЬНОЕ",
          title: "Магазины, склады и торговые объекты",
          meta: "Коммерция и логистика",
          description:
            "Освещение, силовые и слаботочные сети для магазинов, складов, офисов и коммерческих помещений.",
          imageUrl:
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
        },
        {
          tag: "ПРОМЗОНА",
          title: "Производство и конвейерные линии",
          meta: "Промышленные площадки",
          description:
            "Электроснабжение цехов, промышленных линий и конвейерного оборудования — от щитов до автоматики производства.",
          imageUrl:
            "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
        },
      ],
    },
    contentLv: {
      label: "PROJEKTI",
      title: "Mūsu projekti",
      description:
        "No dzīvokļiem un mājām līdz veikaliem, noliktavām un ražošanai.",
      items: [
        {
          tag: "PRIVĀTAIS SEKTORS",
          title: "Dzīvokļi, mājas un pilsētvide",
          meta: "Dzīvojamā vide",
          description:
            "Elektroinstalācija dzīvokļos un privātmājās, ielu apgaismojums, pagalmu, parku un publisko zonu labiekārtošana.",
          imageUrl:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        },
        {
          tag: "INDUSTRIĀLAIS",
          title: "Veikali, noliktavas un tirdzniecības objekti",
          meta: "Komercija un loģistika",
          description:
            "Apgaismojums, spēka un vājstrāvas tīkli veikaliem, noliktavām, birojiem un komerciālām telpām.",
          imageUrl:
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
        },
        {
          tag: "RŪPNIECĪBAS ZONA",
          title: "Ražošana un konveijera līnijas",
          meta: "Rūpniecības objekti",
          description:
            "Ražošanas cehu, industriālo līniju un konveijera iekārtu elektroapgāde — no skapjiem līdz ražošanas automatizācijai.",
          imageUrl:
            "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
        },
      ],
    },
    contentEn: {
      label: "PROJECTS",
      title: "Our projects",
      description:
        "From apartments and homes to shops, warehouses and production sites.",
      items: [
        {
          tag: "PRIVATE SECTOR",
          title: "Apartments, homes and urban environment",
          meta: "Residential",
          description:
            "Electrical work in apartments and private homes, street lighting, courtyards, parks and public spaces.",
          imageUrl:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        },
        {
          tag: "INDUSTRIAL",
          title: "Shops, warehouses and retail facilities",
          meta: "Commerce and logistics",
          description:
            "Lighting, power and low-current systems for shops, warehouses, offices and commercial premises.",
          imageUrl:
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
        },
        {
          tag: "INDUSTRIAL ZONE",
          title: "Production and conveyor lines",
          meta: "Manufacturing sites",
          description:
            "Power supply for workshops, industrial lines and conveyor equipment — from panels to production automation.",
          imageUrl:
            "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
        },
      ],
    },
  },
  {
    key: "careers",
    visible: true,
    contentRu: {
      label: "КАРЬЕРА",
      title: "Присоединяйтесь к команде",
      description:
        "Ищем инженеров, монтажников и специалистов по автоматике.",
      buttonText: "Узнать больше",
      buttonHref: "#contacts",
      roles: [
        { title: "Электромонтажник", meta: "Полная занятость · Рига" },
        { title: "Инженер-проектировщик", meta: "Полная занятость · Рига" },
        { title: "Специалист по автоматике", meta: "Полная занятость · Рига" },
        { title: "Мастер участка", meta: "Полная занятость · регионы" },
      ],
    },
    contentLv: {
      label: "KARJERA",
      title: "Pievienojieties komandai",
      description:
        "Meklējam inženierus, montētājus un automatizācijas speciālistus.",
      buttonText: "Uzzināt vairāk",
      buttonHref: "#contacts",
      roles: [
        { title: "Elektromontētājs", meta: "Pilna laika · Rīga" },
        { title: "Projektēšanas inženieris", meta: "Pilna laika · Rīga" },
        { title: "Automatizācijas speciālists", meta: "Pilna laika · Rīga" },
        { title: "Objekta vadītājs", meta: "Pilna laika · reģioni" },
      ],
    },
    contentEn: {
      label: "CAREERS",
      title: "Join our team",
      description:
        "Looking for engineers, installers and automation specialists.",
      buttonText: "Learn more",
      buttonHref: "#contacts",
      roles: [
        { title: "Electrician", meta: "Full-time · Riga" },
        { title: "Design engineer", meta: "Full-time · Riga" },
        { title: "Automation specialist", meta: "Full-time · Riga" },
        { title: "Site supervisor", meta: "Full-time · regions" },
      ],
    },
  },
  {
    key: "contacts",
    visible: true,
    contentRu: {
      label: "КОНТАКТЫ",
      title: "Обсудим ваш проект?",
      description:
        "Напишите нам — подготовим техническое решение и предварительную смету под ваш объект.",
      primaryCta: "Написать нам",
      secondaryCta: "Позвонить",
      detailsVisible: true,
      detailVisibility: {
        phone: true,
        email: true,
        address: false,
        hours: true,
      },
      address: "Kaibalas iela 25, Rīga",
      phones: ["+371 23887028"],
      email: "info@makuzo.lv",
      hoursWeekday: "Пн.–Пт. 8:00–17:00",
      hoursSaturday: "",
      map: {
        placeName: "Makuzo",
        latitude: 56.9678,
        longitude: 24.1725,
        zoom: 16,
      },
      formTitle: "Оставить заявку",
      formNameLabel: "Имя",
      formPhoneLabel: "Телефон",
      formEmailLabel: "Email",
      formMessageLabel: "Сообщение",
      formSubmitLabel: "Отправить",
      detailLabels: {
        phone: "ТЕЛЕФОН",
        email: "EMAIL",
        address: "АДРЕС",
        hours: "ЧАСЫ",
      },
    },
    contentLv: {
      label: "KONTAKTI",
      title: "Apspriedīsim jūsu projektu?",
      description:
        "Rakstiet mums — sagatavosim tehnisko risinājumu un provizorisko tāmi jūsu objektam.",
      primaryCta: "Rakstīt mums",
      secondaryCta: "Zvanīt",
      detailsVisible: true,
      detailVisibility: {
        phone: true,
        email: true,
        address: false,
        hours: true,
      },
      address: "Kaibalas iela 25, Rīga",
      phones: ["+371 23887028"],
      email: "info@makuzo.lv",
      hoursWeekday: "P.–Pk. 8:00–17:00",
      hoursSaturday: "",
      map: {
        placeName: "Makuzo",
        latitude: 56.9678,
        longitude: 24.1725,
        zoom: 16,
      },
      formTitle: "Iesniegt pieteikumu",
      formNameLabel: "Vārds",
      formPhoneLabel: "Tālrunis",
      formEmailLabel: "E-pasts",
      formMessageLabel: "Ziņojums",
      formSubmitLabel: "Nosūtīt",
      detailLabels: {
        phone: "TĀLRUNIS",
        email: "E-PASTS",
        address: "ADRESE",
        hours: "DARBA LAIKS",
      },
    },
    contentEn: {
      label: "CONTACTS",
      title: "Shall we discuss your project?",
      description:
        "Write to us — we will prepare a technical solution and preliminary estimate for your facility.",
      primaryCta: "Write to us",
      secondaryCta: "Call",
      detailsVisible: true,
      detailVisibility: {
        phone: true,
        email: true,
        address: false,
        hours: true,
      },
      address: "Kaibalas iela 25, Rīga",
      phones: ["+371 23887028"],
      email: "info@makuzo.lv",
      hoursWeekday: "Mon–Fri 8:00–17:00",
      hoursSaturday: "",
      map: {
        placeName: "Makuzo",
        latitude: 56.9678,
        longitude: 24.1725,
        zoom: 16,
      },
      formTitle: "Submit enquiry",
      formNameLabel: "Name",
      formPhoneLabel: "Phone",
      formEmailLabel: "Email",
      formMessageLabel: "Message",
      formSubmitLabel: "Send",
      detailLabels: {
        phone: "PHONE",
        email: "EMAIL",
        address: "ADDRESS",
        hours: "HOURS",
      },
    },
  },
  {
    key: "smartHome",
    visible: true,
    contentRu: {
      label: "УМНЫЙ ДОМ",
      title: "Умный дом",
      pageTitle: "Умный дом на Wi‑Fi",
      lead: "Умный дом без лишней сложности.",
      subtitle:
        "Подбираем и внедряем Wi‑Fi устройства для освещения, климата, безопасности и автоматизации.",
      pillPower: "Питание",
      ctaText: "Обсудить проект",
      imageUrl:
        "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1600&q=80",
      stepsLabel: "КАК ЭТО РАБОТАЕТ",
      stepsTitle: "Три шага до умного пространства",
      steps: [
        {
          title: "Питание",
          text: "Устройство подключается к сети 230V или к розетке — как обычный электроприбор.",
        },
        {
          title: "Wi‑Fi",
          text: "Связь с домом и приложением идёт по Wi‑Fi. Не нужен отдельный Zigbee‑хаб «чтобы хоть что‑то заработало».",
        },
        {
          title: "Сценарии",
          text: "Свет, розетки, датчики и автоматизации настраиваются под ваш объект — мы помогаем на этапе проекта и монтажа.",
        },
      ],
      categoriesLabel: "КАТЕГОРИИ",
      categoriesTitle: "Что рекомендуем и внедряем",
      categoriesIntro:
        "Не интернет‑магазин — инженерный подбор и установка под вашу электрику и задачи объекта.",
      categories: [
        {
          title: "Свет",
          text: "Лампы, реле и сценарии освещения: включение по расписанию, присутствию или с телефона.",
          imageUrl:
            "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=800&q=80",
        },
        {
          title: "Розетки и реле",
          text: "Управление нагрузками, учёт энергии, отключение «забытых» приборов удалённо.",
          imageUrl:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
        },
        {
          title: "Датчики",
          text: "Движение, открытие дверей, температура и влажность — сигналы для автоматизаций и безопасности.",
          imageUrl:
            "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80",
        },
        {
          title: "Камеры и безопасность",
          text: "Видеонаблюдение и оповещения, согласованные с электрикой и слаботочными трассами объекта.",
          imageUrl:
            "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
        },
        {
          title: "Шторы и приводы",
          text: "Моторизация штор и роллет с управлением по Wi‑Fi и сценариями «утро / вечер / отпуск».",
          imageUrl:
            "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=800&q=80",
        },
      ],
      roomsLabel: "ГДЕ ЭТО РАБОТАЕТ",
      roomsTitle: "Сценарии для реальных объектов",
      rooms: [
        {
          title: "Квартира и дом",
          text: "Свет и розетки по сценариям, датчики протечки и открытия, удалённый контроль во время отпуска.",
        },
        {
          title: "Офис",
          text: "Экономия энергии вне рабочих часов, зоны освещения, простой контроль без сложной BMS.",
        },
        {
          title: "Склад и производство",
          text: "Мониторинг зон, оповещения, управление отдельными нагрузками через понятный Wi‑Fi‑контур.",
        },
        {
          title: "Коммерческие помещения",
          text: "Витрины, залы, подсобки — единый подход: питание, сеть и сценарии под режим работы.",
        },
      ],
      closingPill: "Питание + Wi‑Fi",
      closingTitle: "Сделаем объект умнее.",
      closingText:
        "Подберём устройства под вашу электрику, смонтируем и настроим сценарии — от подключения до автоматизации.",
    },
    contentLv: {
      label: "VIEDĀ MĀJA",
      title: "Viedā māja",
      pageTitle: "Viedā māja ar Wi‑Fi",
      lead: "Viedā māja bez liekas sarežģītības.",
      subtitle:
        "Atlasām un uzstādām Wi‑Fi ierīces apgaismojumam, klimatam, drošībai un automatizācijai.",
      pillPower: "Barošana",
      ctaText: "Apspriest projektu",
      imageUrl:
        "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1600&q=80",
      stepsLabel: "KĀ TAS STRĀDĀ",
      stepsTitle: "Trīs soļi līdz viedai telpai",
      steps: [
        {
          title: "Barošana",
          text: "Ierīce tiek pieslēgta 230V tīklam vai kontaktligzdai — kā parasts elektroaparāts.",
        },
        {
          title: "Wi‑Fi",
          text: "Savienojums ar mājokli un lietotni notiek caur Wi‑Fi. Nav nepieciešams atsevišķs Zigbee hubs «lai kaut kas strādātu».",
        },
        {
          title: "Scenāriji",
          text: "Apgaismojums, kontaktligzdas, sensori un automatizācijas tiek pielāgotas jūsu objektam — palīdzam projektā un montāžā.",
        },
      ],
      categoriesLabel: "KATEGORIJAS",
      categoriesTitle: "Ko iesakām un uzstādām",
      categoriesIntro:
        "Nav interneta veikals — inženiertehniska atlase un uzstādīšana atbilstoši jūsu elektroinstalācijai un uzdevumiem.",
      categories: [
        {
          title: "Apgaismojums",
          text: "Spuldzes, releji un apgaismojuma scenāriji: ieslēgšana pēc grafika, klātbūtnes vai no tālruņa.",
          imageUrl:
            "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=800&q=80",
        },
        {
          title: "Kontaktligzdas un releji",
          text: "Slodžu vadība, enerģijas uzskaite, «aizmirsto» ierīču atslēgšana attālināti.",
          imageUrl:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
        },
        {
          title: "Sensori",
          text: "Kustība, durvju atvēršana, temperatūra un mitrums — signāli automatizācijai un drošībai.",
          imageUrl:
            "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80",
        },
        {
          title: "Kameras un drošība",
          text: "Videonovērošana un paziņojumi, saskaņoti ar objekta elektroinstalāciju un vājstrāvas trasēm.",
          imageUrl:
            "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
        },
        {
          title: "Aizkari un piedziņas",
          text: "Aizkaru un rolešu motorizācija ar Wi‑Fi vadību un scenārijiem «rīts / vakars / atvaļinājums».",
          imageUrl:
            "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=800&q=80",
        },
      ],
      roomsLabel: "KUR TAS STRĀDĀ",
      roomsTitle: "Scenāriji reālām telpām",
      rooms: [
        {
          title: "Dzīvoklis un māja",
          text: "Gaisma un kontaktligzdas pēc scenārijiem, noplūdes un atvēršanas sensori, attālināta kontrole atvaļinājumā.",
        },
        {
          title: "Birojs",
          text: "Enerģijas taupīšana ārpus darba laika, apgaismojuma zonas, vienkārša kontrole bez sarežģītas BMS.",
        },
        {
          title: "Noliktava un ražošana",
          text: "Zonu monitorings, paziņojumi, atsevišķu slodžu vadība caur skaidru Wi‑Fi kontūru.",
        },
        {
          title: "Komerciālas telpas",
          text: "Vitrīnas, zāles, palīgtelpas — vienota pieeja: barošana, tīkls un scenāriji atbilstoši darba režīmam.",
        },
      ],
      closingPill: "Barošana + Wi‑Fi",
      closingTitle: "Padarīsim jūsu objektu viedāku.",
      closingText:
        "Izvēlēsimies ierīces atbilstoši jūsu elektroinstalācijai, uzstādīsim un noskaņosim scenārijus — no pieslēguma līdz automatizācijai.",
    },
    contentEn: {
      label: "SMART HOME",
      title: "Smart home",
      pageTitle: "Smart home on Wi‑Fi",
      lead: "Smart home without unnecessary complexity.",
      subtitle:
        "We select and install Wi‑Fi devices for lighting, climate, security and automation.",
      pillPower: "Power",
      ctaText: "Discuss a project",
      imageUrl:
        "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1600&q=80",
      stepsLabel: "HOW IT WORKS",
      stepsTitle: "Three steps to a smart space",
      steps: [
        {
          title: "Power",
          text: "The device connects to 230V mains or a wall outlet — like any regular appliance.",
        },
        {
          title: "Wi‑Fi",
          text: "It talks to your home and app over Wi‑Fi. You do not need a separate Zigbee hub just to get started.",
        },
        {
          title: "Scenes",
          text: "Lighting, outlets, sensors and automations are tuned to your facility — we help at design and installation.",
        },
      ],
      categoriesLabel: "CATEGORIES",
      categoriesTitle: "What we recommend and install",
      categoriesIntro:
        "Not an online shop — engineering selection and installation matched to your electrics and goals.",
      categories: [
        {
          title: "Lighting",
          text: "Bulbs, relays and lighting scenes: schedules, occupancy, or phone control.",
          imageUrl:
            "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=800&q=80",
        },
        {
          title: "Outlets and relays",
          text: "Load control, energy awareness, remote cut-off for devices left on.",
          imageUrl:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
        },
        {
          title: "Sensors",
          text: "Motion, door contact, temperature and humidity — inputs for automation and safety.",
          imageUrl:
            "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80",
        },
        {
          title: "Cameras and security",
          text: "Video and alerts coordinated with power and low-current routing on site.",
          imageUrl:
            "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
        },
        {
          title: "Curtains and drives",
          text: "Motorised curtains and blinds with Wi‑Fi control and morning / evening / away scenes.",
          imageUrl:
            "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=800&q=80",
        },
      ],
      roomsLabel: "WHERE IT WORKS",
      roomsTitle: "Scenarios for real spaces",
      rooms: [
        {
          title: "Apartment and house",
          text: "Lighting and outlets by scene, leak and open-door sensors, remote control while away.",
        },
        {
          title: "Office",
          text: "Energy saving after hours, lighting zones, simple control without a heavy BMS.",
        },
        {
          title: "Warehouse and industry",
          text: "Zone monitoring, alerts, selective load control over a clear Wi‑Fi path.",
        },
        {
          title: "Commercial spaces",
          text: "Storefronts, halls, back rooms — one approach: power, network and scenes for your hours.",
        },
      ],
      closingPill: "Power + Wi‑Fi",
      closingTitle: "Shall we make your facility smarter.",
      closingText:
        "We will pick devices for your electrics, install them and set up scenes — from power-up to automation.",
    },
  },
  {
    key: "footer",
    visible: true,
    contentRu: {
      brandText:
        "Электромонтаж и инженерия для частных, коммерческих и промышленных объектов по Латвии.",
      navTitle: "РАЗДЕЛЫ",
      companyTitle: "КОМПАНИЯ",
      navLinks: [
        { label: "Дизайн", href: "#design" },
        { label: "Умный дом", href: "/smart-home" },
        { label: "Услуги", href: "#services" },
        { label: "Проекты", href: "#projects" },
        { label: "О компании", href: "#about" },
        { label: "Контакты", href: "#contacts" },
      ],
      copyrightLocation: "Все права защищены.",
      privacyLabel: "Политика конфиденциальности",
      privacyHref: "/privacy",
    },
    contentLv: {
      brandText:
        "Elektroinstalācija un inženierija privātiem, komerciāliem un rūpniecības objektiem Latvijā.",
      navTitle: "SADAĻAS",
      companyTitle: "UZŅĒMUMS",
      navLinks: [
        { label: "Dizains", href: "#design" },
        { label: "Viedā māja", href: "/smart-home" },
        { label: "Pakalpojumi", href: "#services" },
        { label: "Projekti", href: "#projects" },
        { label: "Par uzņēmumu", href: "#about" },
        { label: "Kontakti", href: "#contacts" },
      ],
      copyrightLocation: "Visas tiesības aizsargātas.",
      privacyLabel: "Privātuma politika",
      privacyHref: "/privacy",
    },
    contentEn: {
      brandText:
        "Electrical installation and engineering for private, commercial and industrial sites across Latvia.",
      navTitle: "SECTIONS",
      companyTitle: "COMPANY",
      navLinks: [
        { label: "Design", href: "#design" },
        { label: "Smart home", href: "/smart-home" },
        { label: "Services", href: "#services" },
        { label: "Projects", href: "#projects" },
        { label: "About", href: "#about" },
        { label: "Contacts", href: "#contacts" },
      ],
      copyrightLocation: "All rights reserved.",
      privacyLabel: "Privacy policy",
      privacyHref: "/privacy",
    },
  },
];

export const DEFAULT_SITE_SETTINGS = {
  logoUrl: "",
  seoTitleRu: "Makuzo — Электромонтаж и инженерия в Риге",
  seoTitleLv: "Makuzo — Elektroinstalācijas un inženierija Rīgā",
  seoDescRu:
    "Электромонтаж, электроизмерения, слаботочные системы, электрощиты и автоматизация. Рига, Латвия.",
  seoDescLv:
    "Elektroinstalācijas, elektromērījumi, vājstrāvas sistēmas, elektrosadales skapji un automatizācija. Rīga, Latvija.",
  seoTitleEn: "Makuzo — Electrical installation and engineering in Riga",
  seoDescEn:
    "Electrical installation, measurements, low-current systems, switchboards and automation. Riga, Latvia.",
  sectionSpacing: { defaultGap: 0, overrides: {} },
  companyProfile: {
    legalName: "SIA MAKUZO",
    regNumber: "40103386423",
    builderRegNumber: "13248",
    email: "info@makuzo.lv",
    phone: "+371 23887028",
    streetAddress: "Kaibalas iela 25",
    cityRu: "Рига",
    cityLv: "Rīga",
    cityEn: "Riga",
    country: "LV",
    countryNameRu: "Латвия",
    countryNameLv: "Latvija",
    countryNameEn: "Latvia",
    postalCode: "LV-1035",
    latitude: 56.9678,
    longitude: 24.1725,
    instagramUrl: "",
    instagramVisible: false,
    footerCompanyVisible: false,
  },
};
