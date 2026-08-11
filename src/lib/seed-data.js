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
      title: "Электрификация объектов любой сложности",
      titleHighlight: "любой сложности",
      subtitle:
        "Современные инженерные решения по электрификации промышленных, коммерческих, общественных и частных объектов. Пять направлений: электромонтаж, электроизмерения, слаботочные системы, электрощиты и автоматизация.",
      ctaText: "Обсудить проект",
      ctaSecondaryText: "Смотреть услуги",
      ctaHref: "#contacts",
      bgImageUrl:
        "/img/hero-bg.webp",
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
        "/img/hero-bg.webp",
    },
    contentEn: {
      locationTag: "RIGA · LATVIA",
      title: "Electrification of facilities of any complexity",
      titleHighlight: "any complexity",
      subtitle:
        "Modern engineering solutions for electrification of industrial, commercial, public and private facilities. Five areas: electrical installation, electrical measurements, low-current systems, electrical switchboards and automation.",
      ctaText: "Discuss project",
      ctaSecondaryText: "View services",
      ctaHref: "#contacts",
      bgImageUrl:
        "/img/hero-bg.webp",
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
      imageUrl:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
      intro:
        "Мы убеждены, что качественная электрика начинается не со штробления стен, а с грамотного планирования. Именно поэтому предлагаем услугу комплексного планирования электрики с предварительной визуализацией всех электроустановочных изделий в масштабе 1:1.",
      paragraphs: [
        "По индивидуальному проекту изготавливаются полноразмерные трафареты из фанеры, которые временно устанавливаются на стены. Это позволяет заказчику увидеть будущий результат еще до начала монтажных работ, оценить удобство расположения розеток, выключателей и других элементов, а при необходимости внести изменения без лишних затрат.",
        "После утверждения расположения трафареты используются как высокоточные кондукторы для сверления отверстий коронкой, обеспечивая безупречную геометрию, идеальное выравнивание и точность монтажа.",
      ],
      advantagesTitle: "Наши преимущества",
      advantages: [
        "Визуализация электрики в масштабе 1:1.",
        "Индивидуальные трафареты под каждый объект.",
        "Возможность скорректировать расположение до начала монтажа.",
        "Абсолютно точная разметка и сверление.",
        "Идеально ровные блоки розеток и выключателей.",
        "Минимизация ошибок, переделок и дополнительных расходов.",
        "Соблюдение всех проектных размеров и высот.",
      ],
      cultureTitle: "Культура выполнения работ",
      cultureIntro:
        "Мы уделяем внимание не только качеству монтажа, но и культуре производства работ.",
      cultureItems: [
        "Работаем аккуратно, чисто и профессионально.",
        "Используем современный профессиональный инструмент.",
        "Защищаем помещения и бережно относимся к имуществу заказчика.",
        "По окончании каждого этапа убираем строительный мусор и оставляем рабочее место в чистоте и порядке.",
        "Соблюдаем сроки, договоренности и высокие стандарты качества.",
      ],
      closing:
        "Наша цель — не просто выполнить электромонтаж, а создать безупречный результат, которым вы будете пользоваться десятилетиями. Мы продумываем каждую деталь, исключаем ошибки еще до начала работ и выполняем монтаж так, как сделали бы его для собственного дома.",
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
      imageUrl:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
      intro:
        "Mēs esam pārliecināti, ka kvalitatīva elektroinstalācija sākas nevis ar sienu štrobešanu, bet ar pareizu plānošanu. Tieši tāpēc piedāvājam kompleksas elektroinstalācijas plānošanas pakalpojumu ar visu elektroinstalācijas elementu sākotnēju vizualizāciju mērogā 1:1.",
      paragraphs: [
        "Pēc individuāla projekta tiek izgatavotas pilna izmēra finiera veidnes, kuras īslaicīgi tiek uzstādītas uz sienām. Tas ļauj pasūtītājam redzēt rezultātu vēl pirms montāžas darbu sākuma, novērtēt kontaktligzdu, slēdžu un citu elementu izvietojuma ērtumu un, ja nepieciešams, veikt izmaiņas bez papildu izmaksām.",
        "Pēc izvietojuma apstiprināšanas veidnes tiek izmantotas kā augstas precizitātes vadotnes urbšanai ar kronu, nodrošinot nevainojamu ģeometriju, ideālu līdzinājumu un precīzu montāžu.",
      ],
      advantagesTitle: "Mūsu priekšrocības",
      advantages: [
        "Elektroinstalācijas vizualizācija mērogā 1:1.",
        "Individuālas veidnes katram objektam.",
        "Iespēja koriģēt izvietojumu pirms montāžas sākuma.",
        "Absolūti precīza atzīmēšana un urbšana.",
        "Ideāli līdzināti kontaktligzdu un slēdžu bloki.",
        "Kļūdu, pārtaisījumu un papildu izmaksu samazināšana.",
        "Visu projekta izmēru un augstumu ievērošana.",
      ],
      cultureTitle: "Darbu izpildes kultūra",
      cultureIntro:
        "Mēs pievēršam uzmanību ne tikai montāžas kvalitātei, bet arī darbu izpildes kultūrai.",
      cultureItems: [
        "Strādājam rūpīgi, tīri un profesionāli.",
        "Izmantojam modernu profesionālu instrumentu.",
        "Aizsargājam telpas un rūpīgi izturamies pret pasūtītāja īpašumu.",
        "Pēc katras darba posma novācam būvgružus un atstājam darba vietu tīrībā un kārtībā.",
        "Ievērojam termiņus, vienošanās un augstus kvalitātes standartus.",
      ],
      closing:
        "Mūsu mērķis nav vienkārši veikt elektroinstalācijas darbus, bet radīt nevainojamu rezultātu, ko izmantosiet desmit gadī ilgi. Iedomājam katru detaļu, novēršam kļūdas vēl pirms darbu sākuma un veicam montāžu tā, kā to darītu savā mājā.",
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
      imageUrl:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
      intro:
        "We believe that quality electrical work does not begin with chasing walls — it begins with proper planning. That is why we offer comprehensive electrical planning with preliminary visualization of all electrical fittings at 1:1 scale.",
      paragraphs: [
        "Based on an individual project, full-size plywood templates are produced and temporarily mounted on walls. This allows the client to see the future result before installation begins, assess the convenience of socket, switch and other element placement, and make changes if needed without extra cost.",
        "Once the layout is approved, the templates are used as high-precision guides for core drilling, ensuring flawless geometry, perfect alignment and accurate installation.",
      ],
      advantagesTitle: "Our advantages",
      advantages: [
        "Electrical visualization at 1:1 scale.",
        "Individual templates for each project.",
        "Ability to adjust placement before installation begins.",
        "Absolutely precise marking and drilling.",
        "Perfectly aligned socket and switch blocks.",
        "Minimization of errors, rework and additional costs.",
        "Compliance with all design dimensions and heights.",
      ],
      cultureTitle: "Workmanship standards",
      cultureIntro:
        "We pay attention not only to installation quality, but also to the culture of how work is carried out.",
      cultureItems: [
        "We work carefully, cleanly and professionally.",
        "We use modern professional tools.",
        "We protect premises and treat the client's property with care.",
        "At the end of each stage we remove construction debris and leave the work area clean and tidy.",
        "We meet deadlines, agreements and high quality standards.",
      ],
      closing:
        "Our goal is not simply to carry out electrical installation, but to create a flawless result you will use for decades. We think through every detail, eliminate errors before work begins, and install as we would in our own home.",
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
          title: "Эксперты электрификации",
          text: "Проектируем и монтируем электросети, слаботочные системы и системы автоматизации для объектов любой сложности.",
        },
        {
          title: "Сертифицированные специалисты",
          text: "Зарегистрированы в реестре строительных коммерсантов Латвии. Все необходимые сертификаты.",
        },
        {
          title: "Полный цикл сервиса",
          text: "От технического решения и сметы до монтажа, документации и гарантийного обслуживания.",
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
          title: "Elektroinstalācijas eksperti",
          text: "Projektējam un montējam elektrotīklus, vājstrāvas sistēmas un automatizācijas sistēmas objektiem jebkurā sarežģītībā.",
        },
        {
          title: "Sertificēti speciālisti",
          text: "Reģistrēti Latvijas būvkomersantu reģistrā. Visas nepieciešamās sertifikātes.",
        },
        {
          title: "Pilns servisa cikls",
          text: "No tehniskā risinājuma un tāmes līdz montāžai, dokumentācijai un garantijas apkalpošanai.",
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
          title: "Electrification experts",
          text: "We design and install power networks, low-current systems and automation systems for facilities of any complexity.",
        },
        {
          title: "Certified specialists",
          text: "Registered in the Latvian Register of Construction Merchants. All required certificates.",
        },
        {
          title: "Full service cycle",
          text: "From technical solution and estimate to installation, documentation and warranty service.",
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
        "От квартир и частных домов до магазинов, складов и производственных площадок — типы объектов, с которыми мы работаем.",
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
        "No dzīvokļiem un privātmājām līdz veikaliem, noliktavām un ražošanas objektiem — projektu veidi, ar kuriem strādājam.",
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
        "From apartments and private homes to shops, warehouses and production sites — the types of projects we work on.",
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
        "С ростом числа и масштаба проектов мы активно развиваемся и ищем новых коллег — инженеров, монтажников и специалистов по автоматике.",
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
        "Ar projektu skaita un apjoma pieaugumu mēs aktīvi attīstāmies un meklējam jaunus kolēģus — inženierus, montētājus un automatizācijas speciālistus.",
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
        "As the number and scale of projects grow, we are actively expanding and looking for new colleagues — engineers, installers and automation specialists.",
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
      detailsVisible: false,
      detailVisibility: {
        phone: false,
        email: false,
        address: false,
        hours: false,
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
      detailsVisible: false,
      detailVisibility: {
        phone: false,
        email: false,
        address: false,
        hours: false,
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
      detailsVisible: false,
      detailVisibility: {
        phone: false,
        email: false,
        address: false,
        hours: false,
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
      subtitle:
        "Рекомендуем и внедряем устройства, которым достаточно питания и Wi‑Fi — без сложного хаба как обязательного условия.",
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
      subtitle:
        "Iesakām un uzstādām ierīces, kurām pietiek ar barošanu un Wi‑Fi — bez sarežģīta huba kā obligāta priekšnoteikuma.",
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
      pageTitle: "Wi‑Fi smart home",
      subtitle:
        "We recommend and install devices that only need power and Wi‑Fi — no complex hub as a hard requirement.",
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
        "Проектируем и реализуем инженерные системы для частных, коммерческих и промышленных объектов по всей Латвии.",
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
        "Projektējam un īstenojam inženiersistēmas privātiem, komerciāliem un rūpniecības objektiem visā Latvijā.",
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
        "We design and deliver engineering systems for private, commercial and industrial facilities throughout Latvia.",
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
