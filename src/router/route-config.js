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
  
  // О техникуме (/info)
  '/info/maininfo': 'MainView',
  '/info/structure': 'StructureView',
  '/info/rukovodstvo': 'RukovodstvoView',
  '/info/pedsostav': 'PedSostavView'
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