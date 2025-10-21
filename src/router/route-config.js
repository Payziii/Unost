export const routeConfig = {
  // Основные (/)
  '/': 'HomeView',
  '/kontakty': 'ContactsView',
  '/login': 'LoginView',
  '/profile': 'ProfileView',
  '/kniga-zhalob': 'KnigaZhalob',
  '/admin/kniga-zhalob': 'AdminPanel',
  
  // Абитуриенты (/applicants)
  '/applicants/priem': 'PriemView',
  '/applicants/reyting_abiturientov': 'RatingView',
  '/applicants/professionalitet': 'ProfessionalitetView',
  '/applicants/kadetskaya_shkola-internat': 'KadetiView',
  '/applicants/faq': 'FaqView',
  
  // Студентики (/students)
  '/students/raspisanie_zanyatiy': 'RaspView',
  '/students/uchebnye_plany': 'UchebplanView',
  '/students/graphici': 'GraphiciView',
  '/students/promezhut': 'promezhutView',
  '/students/gia': 'GiaView',
  '/students/konkursi': 'KonkursiView',
  '/students/credit': 'CreditView',
  '/students/library': 'LibraryView',
  '/students/links': 'LinksView',
  '/students/pedagog': 'PedagogView',
  
  // Структура (/structure)
  '/structure/avtoshkola': 'AutoshkolaView',
  '/structure/simvolika': 'AboutUs',
  '/structure/gde_torguyut_smertyu_': 'Smert',
  '/structure/informatsiya_o_dostupnosti_obyektov_uchrejdeniya': 'InfoDostup.vue',
  '/structure/raskrytie_informatsii': 'RaskInfo',
  '/structure/profsoyuz': 'Profsouth',
  '/structure/studencheskiy_sportivnyy_klub': 'ssc',
  '/structure/uchebno-proizvodstvennyy_kompleks': 'UpkView',
  
  
  // О техникуме (/info)
  '/info/maininfo': 'MainView',
  '/info/structure': 'StructureView',
  '/info/rukovodstvo': 'RukovodstvoView',
  '/info/pedsostav': 'PedSostavView',
  '/info/standarty': 'StandartiView',
  '/info/mto': 'MtoView',
  '/info/dostupnaya_sreda': 'SredaView',
  '/info/platnye_obrazovatelnye_uslugi': 'PlatnieUslugiView',
  '/info/fhd': 'FinHozView',
  '/info/vakantnye_mesta': 'MestaView',
  '/info/matpodderjka': 'StepuhaView',
  '/info/sotsialnye_partnery_': 'SotrudView',
  '/info/predpisaniya': 'PredpisView',
  '/info/nezavisimaya_otsenka_kachestva_okazaniya_uslug': 'OcenkaView',
  '/info/trudoustroystvo': 'CareerView',
  '/info/vakansii' : 'VakansiiView',




  
  
}

export const routeMeta = {
  '/profile': { requiresAuth: true },
  '/admin/kniga-zhalob': { requiresAuth: true, requiresAdmin: true }
}


export const routeSettings = {
  customPaths: {
    // Кастомный путь к файлу
    // Пример: '/special-path': 'special/SpecialComponent'
  },
  
  folders: {
    'applicants': 'applicants',
    'students': 'students', 
    'structure': 'struktura',
    'info': 'info'
  }
}