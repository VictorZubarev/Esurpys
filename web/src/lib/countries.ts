export type Language = "en" | "ru";

export type CountrySection = {
  title: Record<Language, string>;
  description: Record<Language, string>;
  points: Record<Language, string[]>;
};

export type Country = {
  slug: string;
  name: Record<Language, string>;
  flag: string;
  region: Record<Language, string>;
  summary: Record<Language, string>;
  categories: Record<Language, string[]>;
  sections: CountrySection[];
};

export const countries: Country[] = [
  {
    slug: "united-states",
    name: { en: "United States", ru: "США" },
    flag: "US",
    region: { en: "North America", ru: "Северная Америка" },
    summary: {
      en: "A large and diverse country with opportunities in technology, business, research and education.",
      ru: "Большая и разнообразная страна с возможностями в технологиях, бизнесе, науке и образовании.",
    },
    categories: {
      en: ["Work", "Study", "Business", "Relocation"],
      ru: ["Работа", "Учёба", "Бизнес", "Переезд"],
    },
    sections: [
      {
        title: { en: "Living", ru: "Жизнь" },
        description: {
          en: "Living conditions differ considerably by state, city and neighbourhood.",
          ru: "Условия жизни существенно различаются в зависимости от штата, города и района.",
        },
        points: {
          en: [
            "Compare housing costs and healthcare options.",
            "Research public transport and everyday expenses.",
            "Consider climate, safety and lifestyle.",
          ],
          ru: [
            "Сравни стоимость жилья и варианты медицинского обслуживания.",
            "Изучи общественный транспорт и повседневные расходы.",
            "Учитывай климат, безопасность и образ жизни.",
          ],
        },
      },
      {
        title: { en: "Working", ru: "Работа" },
        description: {
          en: "The country has major technology, finance, healthcare and research industries.",
          ru: "В стране развиты технологии, финансы, здравоохранение и научные исследования.",
        },
        points: {
          en: [
            "Research employers and salary ranges.",
            "Check professional licensing requirements where applicable.",
            "Verify work authorisation and visa requirements.",
          ],
          ru: [
            "Изучи работодателей и диапазоны зарплат.",
            "Проверь требования к профессиональным лицензиям, если они нужны.",
            "Уточни правила получения разрешения на работу и визы.",
          ],
        },
      },
      {
        title: { en: "Studying", ru: "Учёба" },
        description: {
          en: "Universities and colleges offer a wide range of academic and professional programmes.",
          ru: "Университеты и колледжи предлагают широкий выбор академических и профессиональных программ.",
        },
        points: {
          en: [
            "Compare tuition fees and financial aid.",
            "Check admission and English-language requirements.",
            "Review student visa rules and permitted work.",
          ],
          ru: [
            "Сравни стоимость обучения и доступную финансовую помощь.",
            "Проверь требования к поступлению и английскому языку.",
            "Изучи правила студенческой визы и разрешённой работы.",
          ],
        },
      },
      {
        title: { en: "Relocation", ru: "Переезд" },
        description: {
          en: "Immigration pathways depend on your circumstances and the purpose of your stay.",
          ru: "Варианты иммиграции зависят от твоих обстоятельств и цели пребывания.",
        },
        points: {
          en: [
            "Identify a suitable immigration category.",
            "Prepare documents and a realistic budget.",
            "Verify current requirements through official US government sources.",
          ],
          ru: [
            "Определи подходящую иммиграционную категорию.",
            "Подготовь документы и реалистичный бюджет.",
            "Проверяй актуальные требования на официальных сайтах правительства США.",
          ],
        },
      },
    ],
  },
  {
    slug: "germany",
    name: { en: "Germany", ru: "Германия" },
    flag: "DE",
    region: { en: "Europe", ru: "Европа" },
    summary: {
      en: "A major European economy with opportunities in engineering, industry, research and education.",
      ru: "Крупная европейская экономика с возможностями в инженерии, промышленности, науке и образовании.",
    },
    categories: {
      en: ["Work", "Study", "Family", "Relocation"],
      ru: ["Работа", "Учёба", "Семья", "Переезд"],
    },
    sections: [
      {
        title: { en: "Living", ru: "Жизнь" },
        description: {
          en: "Costs and housing availability vary between cities and regions.",
          ru: "Стоимость жизни и доступность жилья различаются между городами и регионами.",
        },
        points: {
          en: [
            "Compare rent and local living costs.",
            "Research health insurance and public transport.",
            "Learn about registration and everyday administration.",
          ],
          ru: [
            "Сравни аренду и местные расходы.",
            "Изучи медицинское страхование и общественный транспорт.",
            "Разберись с регистрацией и повседневными формальностями.",
          ],
        },
      },
      {
        title: { en: "Working", ru: "Работа" },
        description: {
          en: "Engineering, manufacturing, IT and healthcare are important employment areas.",
          ru: "Инженерия, производство, IT и здравоохранение — важные сферы занятости.",
        },
        points: {
          en: [
            "Check qualifications and recognition requirements.",
            "Compare salaries and employment conditions.",
            "Verify work and residence permit requirements.",
          ],
          ru: [
            "Проверь квалификационные требования и признание дипломов.",
            "Сравни зарплаты и условия трудоустройства.",
            "Уточни требования к разрешению на работу и проживание.",
          ],
        },
      },
      {
        title: { en: "Studying", ru: "Учёба" },
        description: {
          en: "Universities and universities of applied sciences offer diverse programmes.",
          ru: "Университеты и университеты прикладных наук предлагают разнообразные программы.",
        },
        points: {
          en: [
            "Check programme language and entry requirements.",
            "Calculate semester contributions and living expenses.",
            "Review student residence rules.",
          ],
          ru: [
            "Проверь язык программы и требования к поступлению.",
            "Рассчитай семестровые взносы и расходы на жизнь.",
            "Изучи правила проживания для студентов.",
          ],
        },
      },
      {
        title: { en: "Relocation", ru: "Переезд" },
        description: {
          en: "Residence routes vary depending on citizenship, employment, family and other circumstances.",
          ru: "Варианты проживания зависят от гражданства, работы, семьи и других обстоятельств.",
        },
        points: {
          en: [
            "Identify the relevant residence route.",
            "Prepare proof of funds and required documents.",
            "Check official German government guidance.",
          ],
          ru: [
            "Определи подходящий вариант получения ВНЖ.",
            "Подготовь подтверждение средств и необходимые документы.",
            "Проверяй официальные рекомендации немецких государственных органов.",
          ],
        },
      },
    ],
  },
  {
    slug: "united-kingdom",
    name: { en: "United Kingdom", ru: "Великобритания" },
    flag: "GB",
    region: { en: "Europe", ru: "Европа" },
    summary: {
      en: "An international destination for finance, technology, education, healthcare and creative industries.",
      ru: "Международный центр финансов, технологий, образования, здравоохранения и творческих индустрий.",
    },
    categories: {
      en: ["Work", "Study", "Business", "Family"],
      ru: ["Работа", "Учёба", "Бизнес", "Семья"],
    },
    sections: [
      {
        title: { en: "Living", ru: "Жизнь" },
        description: {
          en: "Housing costs and lifestyle vary considerably across the UK.",
          ru: "Стоимость жилья и образ жизни заметно различаются по регионам Великобритании.",
        },
        points: {
          en: [
            "Compare costs between cities.",
            "Research transport and healthcare access.",
            "Consider regional differences and climate.",
          ],
          ru: [
            "Сравни расходы в разных городах.",
            "Изучи транспорт и доступ к медицине.",
            "Учитывай региональные различия и климат.",
          ],
        },
      },
      {
        title: { en: "Working", ru: "Работа" },
        description: {
          en: "The job market includes finance, technology, healthcare and creative sectors.",
          ru: "Рынок труда включает финансы, технологии, здравоохранение и творческие отрасли.",
        },
        points: {
          en: [
            "Research employers and salary expectations.",
            "Check qualification and sponsorship requirements.",
            "Verify the visa route for your circumstances.",
          ],
          ru: [
            "Изучи работодателей и ожидаемые зарплаты.",
            "Проверь требования к квалификации и спонсорству.",
            "Уточни подходящий визовый маршрут.",
          ],
        },
      },
      {
        title: { en: "Studying", ru: "Учёба" },
        description: {
          en: "The UK offers a wide range of universities and specialist institutions.",
          ru: "Великобритания предлагает большой выбор университетов и специализированных учебных заведений.",
        },
        points: {
          en: [
            "Compare tuition and living costs.",
            "Check admissions and English-language requirements.",
            "Review student visa conditions.",
          ],
          ru: [
            "Сравни стоимость обучения и жизни.",
            "Проверь требования к поступлению и английскому языку.",
            "Изучи условия студенческой визы.",
          ],
        },
      },
      {
        title: { en: "Relocation", ru: "Переезд" },
        description: {
          en: "Immigration options depend on the reason for moving and individual eligibility.",
          ru: "Иммиграционные варианты зависят от цели переезда и индивидуальных условий.",
        },
        points: {
          en: [
            "Identify the correct visa category.",
            "Prepare the required evidence and budget.",
            "Use official GOV.UK guidance to confirm current rules.",
          ],
          ru: [
            "Определи подходящую категорию визы.",
            "Подготовь необходимые документы и бюджет.",
            "Проверяй актуальные правила на официальном сайте GOV.UK.",
          ],
        },
      },
    ],
  },
  {
    slug: "canada",
    name: { en: "Canada", ru: "Канада" },
    flag: "CA",
    region: { en: "North America", ru: "Северная Америка" },
    summary: {
      en: "A large country with opportunities in technology, natural resources, research and education.",
      ru: "Большая страна с возможностями в технологиях, природных ресурсах, науке и образовании.",
    },
    categories: {
      en: ["Work", "Study", "Family", "Relocation"],
      ru: ["Работа", "Учёба", "Семья", "Переезд"],
    },
    sections: [
      {
        title: { en: "Living", ru: "Жизнь" },
        description: {
          en: "Climate, housing and everyday expenses vary between provinces and cities.",
          ru: "Климат, жильё и повседневные расходы различаются между провинциями и городами.",
        },
        points: {
          en: [
            "Compare housing and transport costs.",
            "Research provincial healthcare arrangements.",
            "Consider climate and regional distances.",
          ],
          ru: [
            "Сравни стоимость жилья и транспорта.",
            "Изучи систему медицинского обслуживания провинции.",
            "Учитывай климат и расстояния между регионами.",
          ],
        },
      },
      {
        title: { en: "Working", ru: "Работа" },
        description: {
          en: "Employment opportunities vary by province, occupation and local demand.",
          ru: "Возможности трудоустройства зависят от провинции, профессии и местного спроса.",
        },
        points: {
          en: [
            "Research regional job markets.",
            "Check licensing for regulated professions.",
            "Confirm work permit eligibility.",
          ],
          ru: [
            "Изучи региональный рынок труда.",
            "Проверь лицензирование регулируемых профессий.",
            "Уточни право на получение разрешения на работу.",
          ],
        },
      },
      {
        title: { en: "Studying", ru: "Учёба" },
        description: {
          en: "Colleges and universities offer academic and career-focused programmes.",
          ru: "Колледжи и университеты предлагают академические и профессиональные программы.",
        },
        points: {
          en: [
            "Compare tuition and living expenses.",
            "Check admission and language requirements.",
            "Verify current study permit rules.",
          ],
          ru: [
            "Сравни стоимость обучения и жизни.",
            "Проверь требования к поступлению и языку.",
            "Уточни актуальные правила учебного разрешения.",
          ],
        },
      },
      {
        title: { en: "Relocation", ru: "Переезд" },
        description: {
          en: "Immigration pathways include different programmes with distinct eligibility rules.",
          ru: "Иммиграционные программы имеют разные требования к кандидатам.",
        },
        points: {
          en: [
            "Research available immigration programmes.",
            "Prepare documents and language test results if required.",
            "Check official Canadian immigration guidance.",
          ],
          ru: [
            "Изучи доступные иммиграционные программы.",
            "Подготовь документы и результаты языковых тестов, если они нужны.",
            "Проверяй официальные рекомендации канадских иммиграционных органов.",
          ],
        },
      },
    ],
  },
  {
    slug: "australia",
    name: { en: "Australia", ru: "Австралия" },
    flag: "AU",
    region: { en: "Oceania", ru: "Океания" },
    summary: {
      en: "A destination with opportunities in education, healthcare, technology and skilled occupations.",
      ru: "Страна с возможностями в образовании, здравоохранении, технологиях и квалифицированных профессиях.",
    },
    categories: {
      en: ["Work", "Study", "Lifestyle", "Relocation"],
      ru: ["Работа", "Учёба", "Образ жизни", "Переезд"],
    },
    sections: [
      {
        title: { en: "Living", ru: "Жизнь" },
        description: {
          en: "Lifestyle, climate and living costs vary across Australian cities and regions.",
          ru: "Образ жизни, климат и стоимость жизни различаются между городами и регионами Австралии.",
        },
        points: {
          en: [
            "Compare rent and transport.",
            "Research healthcare access and insurance.",
            "Consider climate and distance from other countries.",
          ],
          ru: [
            "Сравни аренду и транспорт.",
            "Изучи доступ к медицине и страхованию.",
            "Учитывай климат и расстояние до других стран.",
          ],
        },
      },
      {
        title: { en: "Working", ru: "Работа" },
        description: {
          en: "Demand differs by occupation, region and current labour market conditions.",
          ru: "Спрос зависит от профессии, региона и текущего состояния рынка труда.",
        },
        points: {
          en: [
            "Research occupations and employers.",
            "Check skills assessment and licensing where relevant.",
            "Verify visa and work conditions.",
          ],
          ru: [
            "Изучи востребованные профессии и работодателей.",
            "Проверь оценку квалификации и лицензирование, если требуется.",
            "Уточни условия визы и работы.",
          ],
        },
      },
      {
        title: { en: "Studying", ru: "Учёба" },
        description: {
          en: "Australian institutions offer a range of vocational and university programmes.",
          ru: "Австралийские учебные заведения предлагают профессиональные и университетские программы.",
        },
        points: {
          en: [
            "Compare programme fees and living expenses.",
            "Check English and admission requirements.",
            "Review student visa conditions.",
          ],
          ru: [
            "Сравни стоимость программ и жизни.",
            "Проверь требования к английскому языку и поступлению.",
            "Изучи условия студенческой визы.",
          ],
        },
      },
      {
        title: { en: "Relocation", ru: "Переезд" },
        description: {
          en: "Visa options depend on skills, family circumstances and purpose of stay.",
          ru: "Визовые варианты зависят от квалификации, семейных обстоятельств и цели пребывания.",
        },
        points: {
          en: [
            "Identify the relevant visa category.",
            "Prepare evidence of qualifications and finances.",
            "Check official Australian immigration guidance.",
          ],
          ru: [
            "Определи подходящую категорию визы.",
            "Подготовь подтверждения квалификации и финансов.",
            "Проверяй официальные рекомендации австралийских иммиграционных органов.",
          ],
        },
      },
    ],
  },
  {
    slug: "netherlands",
    name: { en: "Netherlands", ru: "Нидерланды" },
    flag: "NL",
    region: { en: "Europe", ru: "Европа" },
    summary: {
      en: "An internationally connected country with opportunities in technology, logistics, research and business.",
      ru: "Международно ориентированная страна с возможностями в технологиях, логистике, науке и бизнесе.",
    },
    categories: {
      en: ["Work", "Study", "Business", "Relocation"],
      ru: ["Работа", "Учёба", "Бизнес", "Переезд"],
    },
    sections: [
      {
        title: { en: "Living", ru: "Жизнь" },
        description: {
          en: "Housing availability and costs vary by city, with demand high in some areas.",
          ru: "Доступность и стоимость жилья зависят от города; в некоторых районах спрос высокий.",
        },
        points: {
          en: [
            "Research housing availability before moving.",
            "Compare transport and insurance costs.",
            "Learn about municipal registration.",
          ],
          ru: [
            "Изучи доступность жилья до переезда.",
            "Сравни расходы на транспорт и страхование.",
            "Разберись с регистрацией в муниципалитете.",
          ],
        },
      },
      {
        title: { en: "Working", ru: "Работа" },
        description: {
          en: "Technology, logistics, agriculture, research and international business are notable sectors.",
          ru: "Технологии, логистика, сельское хозяйство, наука и международный бизнес — заметные отрасли.",
        },
        points: {
          en: [
            "Research employers and language requirements.",
            "Check recognition of qualifications if applicable.",
            "Verify work and residence conditions.",
          ],
          ru: [
            "Изучи работодателей и языковые требования.",
            "Проверь признание квалификации, если это необходимо.",
            "Уточни условия работы и проживания.",
          ],
        },
      },
      {
        title: { en: "Studying", ru: "Учёба" },
        description: {
          en: "Many institutions offer international programmes, including courses taught in English.",
          ru: "Многие учебные заведения предлагают международные программы, в том числе на английском языке.",
        },
        points: {
          en: [
            "Check programme language and admission requirements.",
            "Compare tuition and housing costs.",
            "Review student residence rules.",
          ],
          ru: [
            "Проверь язык программы и требования к поступлению.",
            "Сравни стоимость обучения и жилья.",
            "Изучи правила проживания для студентов.",
          ],
        },
      },
      {
        title: { en: "Relocation", ru: "Переезд" },
        description: {
          en: "Residence routes depend on citizenship, work, study, family and other circumstances.",
          ru: "Варианты проживания зависят от гражданства, работы, учёбы, семьи и других обстоятельств.",
        },
        points: {
          en: [
            "Identify the appropriate residence category.",
            "Prepare required documents and financial evidence.",
            "Check official Dutch government guidance.",
          ],
          ru: [
            "Определи подходящую категорию проживания.",
            "Подготовь необходимые документы и подтверждение финансов.",
            "Проверяй официальные рекомендации правительства Нидерландов.",
          ],
        },
      },
    ],
  },
];
