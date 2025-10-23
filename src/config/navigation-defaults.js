export const defaultNavigationSections = [
  { id: 'basicInfo', label: 'О техникуме' },
  { id: 'students', label: 'Студентам' },
  { id: 'applicants', label: 'Абитуриентам' },
  { id: 'structure', label: 'Структура' }
]

export const defaultMenuItems = {
  basicInfo: [
    { text: 'Основные сведения', route: '/info/maininfo' },
    { text: 'Структура и органы управления образовательной организацией', route: '/info/structure' },
    {
      text: 'Документы',
      subitems: [
        { text: 'Учредительные документы', route: '/dokumenty/uchreditelnye_dokumenty' },
        { text: 'Локальные нормативные акты', route: '/dokumenty/lokalnye_akty' },
        { text: 'Нормативные документы', route: '/dokumenty/normativnye_dokumenty' },
        { text: 'Программа развития 2018–2022', route: '/dokumenty/razvitie' },
        { text: 'Программа модернизации 2020–2022', route: '/dokumenty/modern' },
        { text: 'Отчёты по самообследованию', route: '/dokumenty/otchety_po_samoobsledovaniyu' },
        { text: 'Документы по учебной и производственной практике', route: '/dokumenty/dokumenty_po_uchebnoy_i_proizvodstvennoy_praktiki' },
        { text: 'Предписания контролирующих органов', route: '/dokumenty/predpisaniya' },
        { text: 'Информация о мероприятиях', route: '/dokumenty/informatsiya_o_meropriyatiyah' },
        { text: 'Наставничество', route: '/dokumenty/nastavnichestvo' }
      ]
    },
    {
      text: 'Образовательные программы',
      subitems: [
        { text: 'Кадетская школа-интернат', route: '/info/kshi' },
        { text: 'Среднее профессиональное образование', route: '/info/spo' },
        { text: 'Профессиональное обучение', route: '/info/prof' },
        { text: 'Дополнительное образование', route: '/info/dopobraz' }
      ]
    },
    { text: 'Руководство', route: '/info/rukovodstvo' },
    { text: 'Педагогический состав', route: '/info/pedsostav' },
    { text: 'Образовательные стандарты и требования', route: '/info/standarty' },
    { text: 'Материально-техническое обеспечение', route: '/info/mto' },
    { text: 'Доступная среда', route: '/info/dostupnaya_sreda' },
    { text: 'Платные образовательные услуги', route: '/info/platnye_obrazovatelnye_uslugi' },
    { text: 'Финансово-хозяйственная деятельность', route: '/info/fhd' },
    { text: 'Вакантные места для приёма (перевода)', route: '/info/vakantnye_mesta' },
    { text: 'Материальная поддержка обучающихся', route: '/info/matpodderjka' },
    { text: 'Социальные партнёры', route: '/info/sotsialnye_partnery_' },
    { text: 'Мониторинг качества', route: '/info/monitoring' },
    { text: 'Противодействие коррупции', route: '/info/protivodeystvie_korruptsii' },
    { text: 'Независимая оценка качества оказания услуг', route: '/info/nezavisimaya_otsenka_kachestva_okazaniya_uslug' },
    { text: 'Трудоустройство выпускников', route: '/info/trudoustroystvo' },
    { text: 'Вакансии', route: '/info/vakansii' }
  ],
  students: [
    { text: 'Расписание занятий', route: '/students/raspisanie_zanyatiy' },
    { text: 'Учебные планы', route: '/students/uchebnye_plany' },
    { text: 'Графики учебного процесса', route: '/students/graphici' },
    { text: 'Промежуточная аттестация', route: '/students/promezhut' },
    { text: 'Государственная итоговая аттестация', route: '/students/gia' },
    { text: 'Конкурсы и мероприятия', route: '/students/konkursi' },
    { text: 'Стипендии и иные выплаты', route: '/students/credit' },
    { text: 'Библиотека и медиаресурсы', route: '/students/library' },
    { text: 'Полезные ссылки', route: '/students/links' },
    { text: 'Педагог-психолог', route: '/students/pedagog' },
    {
      text: 'Безопасность обучающихся',
      subitems: [
        { text: 'Профилактика употребления ПАВ', route: '/bezopasnost/profilaktika_upotrebleniya_pav' },
        { text: 'Экстремистские материалы', route: '/bezopasnost/ekstremistskie_materialy' },
        { text: 'Телефоны экстренных служб', route: '/bezopasnost/telefony_ekstrennyh_slujb_' },
        { text: 'Защита прав ребёнка', route: '/bezopasnost/zaschita_prav_rebenka' },
        { text: 'Здравоохранение и профилактика', route: '/bezopasnost/zdravoohranenie' },
        { text: 'Информационная безопасность', route: '/bezopasnost/informatsionnaya' },
        { text: 'Пожарная безопасность', route: '/bezopasnost/pojarnaya' },
        { text: 'Дорожная безопасность', route: '/bezopasnost/dorojnaya' }
      ]
    }
  ],
  applicants: [
    { text: 'Рейтинг абитуриентов', route: '/applicants/reyting_abiturientov' },
    { text: 'Поступление в рамках проекта «Профессионалитет»', route: '/applicants/professionalitet' },
    { text: 'Правила приёма', route: '/applicants/priem' },
    { text: 'Кадетская школа-интернат', route: '/applicants/kadetskaya_shkola-internat' },
    { text: 'Часто задаваемые вопросы', route: '/applicants/faq' }
  ],
  structure: [
    { text: 'Символика', route: '/structure/simvolika' },
    {
      text: 'Кадетская школа-интернат',
      subitems: [
        { text: 'Общие сведения', route: '/info/kshi' },
        { text: 'Учебные планы', route: '/info/uchebplankshi' },
        { text: 'Расписание занятий', route: '/students/raspisanie_zanyatiy' },
        { text: 'Документы', route: '/kshi/dokymenty' }
      ]
    },
    { text: 'Центр ПВиДП', route: '/structure/tsentr_pvidp_' },
    { text: 'Центр демонстрационного экзамена WorldSkills', route: '/structure/tsentr_provedeniya_demonstratsionnyh_ekzamenov_world_skills' },
    { text: 'Федеральный проект «Содействие занятости»', route: '/structure/federalnyy_proekt_sodeystvie_zanyatosti' },
    {
      text: 'Партнёрские проекты',
      subitems: [
        { text: 'Федеральные проекты', route: '/structure/federalnye' },
        { text: 'Региональные проекты', route: '/structure/regionalnie' }
      ]
    },
    { text: 'Лаборатория безопасности', route: '/structure/laboratoriya_bezopasnosti_sverdlovskaya_oblast' },
    { text: 'Учебно-производственный комплекс', route: '/structure/uchebno-proizvodstvennyy_kompleks' },
    { text: 'Автошкола', route: '/structure/avtoshkola' },
    { text: 'Студенческий спортивный клуб', route: '/structure/studencheskiy_sportivnyy_klub' },
    { text: 'Профсоюзная организация', route: '/structure/profsoyuz' },
    { text: 'Координационный совет добровольцев', route: '/structure/volonterstvo' },
    { text: 'Центр содействия трудоустройству', route: '/structure/sodeistvie' },
    { text: 'Корпус общественных наблюдателей', route: '/structure/korpus_obschestvennyh_nablyudateley' },
    { text: 'Национальная система квалификаций', route: '/structure/natsionalnaya_sistema_kvalifikatsiy' },
    { text: 'Раскрытие информации', route: '/structure/raskrytie_informatsii' },
    { text: 'Организация питания', route: '/structure/food' },
    { text: 'Доступная среда', route: '/structure/informatsiya_o_dostupnosti_obyektov_uchrejdeniya' },
    { text: 'Антинаркотическая деятельность', route: '/structure/gde_torguyut_smertyu_' }
  ]
}

const deepClone = (value) => {
  try {
    return JSON.parse(JSON.stringify(value))
  } catch (_) {
    if (Array.isArray(value)) {
      return value.map((item) => deepClone(item))
    }
    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value).map(([key, entry]) => [key, deepClone(entry)])
      )
    }
    return value
  }
}

export const getDefaultNavigationConfig = () =>
  defaultNavigationSections.map((section) => ({
    ...section,
    items: deepClone(defaultMenuItems[section.id] || [])
  }))

